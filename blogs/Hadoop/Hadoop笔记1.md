---
title: Hadoop笔记1
date: 2024-07-01
sidebar: 'auto'
categories: 
 - 大数据
tags:
 - Hadoop
---

[toc]

# Hadoop笔记1

## 大数据介绍

狭义上：大数据是指一类技术栈，用来对海量数据进行处理的软件技术体系。
广义上：大数据是指数字化时代，信息化时代的基础数据支撑，用数据为生活赋能。

> 大数据的核心工作是什么？

- 数据存储：可以存储海量待处理数据。
- 数据计算：可以从海量数据中计算挖掘出有价值的数据结果。
- 数据传输：可以将海量数据传输给各个目标。

> 大数据软件技术生态有哪些？

由于大数据的核心工作分别是: 数据存储，数据计算，数据传输。

对于数据存储方面：

- Apache Hadoop框架的HDFS组件是大数据技术体系中使用最广泛的分布式存储技术。
- Apache HBase是大数据技术体系中使用最广泛的NoSQL，K-V键值对数据库技术。HBase是在HDFS的基础上构建的。
- Apache KUDU 也是大数据技术系统中使用较多的分布式存储引擎。
- 除此之外，还有各个云平台提供的大数据存储服务。例如阿里云的OSS等。

对于数据计算方面：

- Apache Hadoop框架的MapReduce组件是最早的大数据分布式计算引擎。
- Apache Hive 是一款以SQL为开发语言的分布式计算框架。其底层使用了Hadoop框架的MapReduce组件技术。至今有许多公司使用它。
- Apache Spark 是目前全球内最火热的分布式内存计算引擎技术。
- Apache Flink 同样也是一款大数据分布式内存计算引擎，主要在实时计算（流计算）领域，Flink占据主流。

对于数据传输方面：

- Apache Kafka 是一款分布式消息系统，可以完成海量数据的数据传输工作。
- Apache Pulsar 同样也是一款分布式的消息系统。
- Apache Flume 是一款流式数据采集工具，可以从非常多的数据源中进行数据采集。
- ..............

## Hadoop介绍

Hadoop的全称应该是Apache Hadoop。

Hadoop是Apache软件基金会下的顶级开源项目。Hadoop的主要功能如下。
- 分布式数据存储
- 分布式数据计算
- 分布式资源调度

总结：Hadoop是一个开源的分布式软件框架。提供分布式存储，计算，资源调度的解决方案。开发者可以通过Hadoop来实现海量数据的存储和计算。

> Hadoop内部存在三大组件，分别是：

- HDFS组件： HDFS是Hadoop内部的分布式存储组件。可以用来构建分布式文件系统，存储海量数据。
- MapReduce组件：MapReduce是Hadoop内部的分布式计算组件，提供接口给用户进行分布式计算。
- YARN组件: YARN是Hadoop内部的分布式资源调度组件。可以帮助用户实现大规模集群的资源调度。

![hadoop_20240701173106.png](../blog_img/hadoop_20240701173106.png)


## HDFS 分布式文件系统

HDFS 分布式文件系统 是 Hadoop 的三大组件之一。

- HDFS 全称是 Hadoop Distribued File System (Hadoop 分布式文件系统)
- HDFS 是 Hadoop内部的分布式数据存储解决方案。
- HDFS 可以在多台服务器上进行集群部署，并且存储海量的数据。

> 为什么需要分布式文件存储？

由于单个服务器的数据存储能力是有上限的，因此当数据量大到一定程度的时候，需要多台服务器一起存储数据才行。

### HDFS的集群架构

HDFS的集群架构是主从模式的，即有一个主节点，多个从节点，共同组成的集群。

在HDFS的集群架构中，主要有三种不同的角色。
- 主角色 NameNode ：主角色是一个独立进程。主要负责管理整个HDFS系统，管理DataNode从角色。
- 从角色 DataNode ：从角色也是一个独立进程。主要负责数据存储。
- 辅助角色 SecondaryNameNode ：辅助角色也是一个独立进程。主要负责辅助主角色，帮助主角色完成元数据整理工作。

HDFS的集群架构如下图所示
![hadoop_20240702165036.png](../blog_img/hadoop_20240702165036.png)

## Hadoop的安装和部署

下面是在docker环境中安装和部署Hadoop的。

由于目前dockerhub中的Hadoop镜像都是旧的镜像格式，最新版本的docker无法下载该镜像。

当尝试下载官方的Hadoop镜像时，会提示该Hadoop镜像是旧的镜像格式，不建议下载使用。
![hadoop_20240703161546.png](../blog_img/hadoop_20240703161546.png)

因此下面的笔记是先在centos镜像的基础上安装部署java和hadoop。从而构建出Hadoop镜像。

### 制作镜像

1. 先下载centos镜像

```bash
docker pull centos:7
docker images #查看镜像
```

2. 构建Hadoop镜像

通过Dockerfile，在centos镜像的基础上安装SSH服务,java环境，hadoop环境。

步骤1：创建Dockerfile文件。该文件名称就是Dockerfile，注意该文件没有后缀名。

步骤2：编辑Dockerfile文件。内容如下所示。

注意：在Dockerfile所在目录下提前准备好 jdk-8u202-linux-x64.tar.gz 与 hadoop-3.3.6.tar.gz 安装包。你也可以准备其他版本的安装包。

```docker
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
 
# 安装 which 和 sudo 这两个命令行工具
RUN yum install -y which sudo

```

步骤3：在Dockerfile文件的同目录中，使用下面的命令，创建新镜像my-hadoop-image

```docker
# "."表示当前目录，即Dockerfile所在的位置
# my-hadoop-image 为新镜像的名称
docker build -t my-hadoop-image .
```

### 创建容器

1. 先创建一个docker网络。这样才能很方便的让多个Hadoop容器之间互相通信。

```bash
# 创建一个docker网络
docker network create my-hadoop-net
# 查询网络
docker network ls
```

2. 创建多个Hadoop容器

```bash
docker run -itd --network my-hadoop-net --name hadoop01 -p 50070:50070 -p 38088:8088 my-hadoop-image

docker run -itd --network my-hadoop-net --name hadoop02 my-hadoop-image

docker run -itd --network my-hadoop-net --name hadoop03 my-hadoop-image
```






