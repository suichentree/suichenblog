---
title: Hive笔记1
date: 2024-07-10
sidebar: 'auto'
categories: 
 - 大数据
tags:
 - Hive
---

[toc]

# Hive笔记1

Hive版本为4.0.0，而hadoop的版本为3.3.6。

目前Hive 4.0.0 是与 Hadoop 3.3.x 兼容的最新版本。

## Hive介绍

> Hive是什么?

Hive 全称是Apache Hive。

Hive 是一个建立在 Hadoop 上的数据仓库基础设施，它提供了类似于 SQL 的查询语言（称为 HiveQL 或 HQL），是用于分析存储在 Hadoop 分布式文件系统（HDFS）中的大规模数据。

[Hive官网 https://hive.apache.org/](https://hive.apache.org/)

> Hive的功能和特性
1. HQL 是 Hive 提供的查询语言，类似于传统的 SQL。允许用户使用类似 SQL 的语法进行数据查询、分析和操作。
2. Hive 被用作数据仓库，用于存储和管理大数据集。它支持对结构化数据（如表格数据）和半结构化数据（如日志文件）的处理和分析。
3. Hive 建立在 Hadoop 的 MapReduce 框架之上，利用其高度的扩展性和容错性来处理大规模数据集。
4. Hive 使用 Hadoop HDFS 来存储数据，并通过 MapReduce 进行数据的处理和分析。
5. Hive 提供了用户界面，方便用户与 Hive 交互和管理。此外，Hive 还管理和存储了关于表结构、列类型等元数据信息，使得用户可以轻松地管理和查询数据。

总体来说，Hive 是一个基于 Hadoop 的数据仓库解决方案。


> Hive的执行流程

用户可以在Hive中使用 HQL 语句（类SQL语句）进行查询和操作大数据集。

即Hive将 HQL 语句转换为MapReduce程序，之后MapReduce程序在Hadoop的MapReduce组件中进行分布式计算，最后得出计算结果。

![hive_20240711162718.png](../blog_img/hive_20240711162718.png)

> Hive 内部有两大组件
- 元数据存储：Hive中的元数据，通常是指表名，列名，表的属性，表数据所在目录等。可以使用第三方数据库来进行数据存储。
- SQL解析器：该解析器用于对HQL查询语句的解析。并将解析的结果存储在Hadoop的HDFS文件系统中。

## Hive的安装部署

注意事项
1. Hive需要依赖Hadoop。因此Hive容器要与Hadoop容器互相通信。即两个容器之间要在用一个网络中。
2. Hive的元数据需要存储在数据库中，因此我们可以先搭建了Mysql容器，然后再Mysql容器的基础上安装Hive。

> ① 搭建Mysql容器

之前Hadoop笔记中hadoop容器都是在my-hadoop-net网络中，因此也需要把该容器添加到my-hadoop-net网络中。

```shell
# 下载mysql 8.0.20版本的镜像
docker pull mysql:8.0.20

# 运行容器
docker run -d --name="myHive" --network my-hadoop-net -p 33306:3306 -e MYSQL_ROOT_PASSWORD=123456 -v /e/DockerVolumes/Hive/data:/var/lib/mysql mysql:8.0.20 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

- `/e/DockerVolumes/Hive/data`是windows系统中E盘的DockerVolumes目录...


> ② 安装Hive

现在windows系统的终端中，执行下面命令。
```shell
# 将windwos系统中的hive安装包，复制到myHive容器中
docker cp apache-hive-4.0.0-bin.tar.gz myHive:/usr/local
```

进入到myHive容器的终端中，执行下面命令
```shell
# 进入到/usr/local目录
cd /usr/local
# 解压hive安装包到当前目录中
tar -zxvf apache-hive-4.0.0-bin.tar.gz
# 进入到解压后的hive安装包
cd apache-hive-4.0.0-bin

# 编辑环境变量
vim /etc/profile

```

### 1.构建Hive镜像

1. 先下载centos镜像

```bash
docker pull centos:7
docker images #查看镜像
```

2. 构建Hadoop镜像

在centos镜像的基础上安装SSH服务,mysql服务,hive服务。然后通过Dockerfile构建出一个新镜像。

步骤1：创建Dockerfile文件。该文件名称就是Dockerfile，注意该文件没有后缀名。

步骤2：编辑Dockerfile文件。内容如下所示。

注意：在Dockerfile所在目录下提前准备好 jdk-8u202-linux-x64.tar.gz 与 hadoop-3.3.6.tar.gz 安装包。当然你也可以准备其他版本的安装包。

```shell
# FROM:基于什么镜像来制作自己的镜像
FROM centos:7
# MAINTAINER:表示该镜像的作者（维护者）
MAINTAINER shuyx

# 配置yum源，包括修改仓库地址、提速、更新
RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://mirrors.aliyun.com|g' /etc/yum.repos.d/CentOS-*
RUN yum makecache
RUN yum update -y

# 安装ssh服务和ssh客户端。
RUN yum install -y openssh-server sudo
RUN sed -i 's/UsePAM yes/UsePAM no/g' /etc/ssh/sshd_config
RUN yum install -y openssh-clients

# 生成ssh密钥，注意此处设置了root用户的密码为root
RUN echo "root:root" | chpasswd
RUN echo "root   ALL=(ALL)       ALL" >> /etc/sudoers
RUN ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key
RUN ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key

# 开启ssh服务，暴露SSH的默认端口22。
RUN mkdir /var/run/sshd
EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]

# 在线下载mysql8
RUN yum -y install https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
RUN yum -y install mysql-community-server
# 设置 MySQL root 密码（你可以根据需要自定义密码）
ENV MYSQL_ROOT_PASSWORD=123456
# 修改 MySQL 配置文件以允许远程连接
RUN sed -i 's/127.0.0.1/0.0.0.0/' /etc/my.cnf

# 将本地的jdk安装包，复制到容器的/usr/local/目录中。并进行解压，配置环境变量
ADD jdk-8u202-linux-x64.tar.gz /usr/local/
RUN mv /usr/local/jdk1.8.0_202 /usr/local/jdk1.8
ENV JAVA_HOME /usr/local/jdk1.8
ENV PATH $JAVA_HOME/bin:$PATH

# 将本地的hadoop安装包，复制到容器的/usr/local/目录中。并进行解压，配置环境变量
ADD hadoop-3.3.6.tar.gz /usr/local
RUN mv /usr/local/hadoop-3.3.6 /usr/local/hadoop
ENV HADOOP_HOME /usr/local/hadoop
ENV PATH $HADOOP_HOME/bin:$PATH
ENV PATH $HADOOP_HOME/sbin:$PATH

# 指定root用户访问
ENV HDFS_NAMENODE_USER root
ENV HDFS_DATANODE_USER root
ENV HDFS_SECONDARYNAMENODE_USER root
ENV YARN_RESOURCEMANAGER_USER root
ENV YARN_NODEMANAGER_USER root

# 安装 which,sudo,vim 命令行工具
RUN yum install -y which sudo vim
```

步骤3：在Dockerfile文件的同目录中，使用下面的命令，创建新镜像my-hadoop-image

```sh
# "."表示当前目录，即Dockerfile所在的位置
# my-hadoop-image 为新镜像的名称
docker build -t my-hadoop-image .

# 查询新镜像my-hadoop-image
docker images
```
