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

### 制作Hadoop镜像

1. 先下载centos镜像

```bash
docker pull centos:7
docker images #查看镜像
```

2. 构建Hadoop镜像

在centos镜像的基础上安装SSH服务,java环境，hadoop环境。然后通过Dockerfile构建出一个新镜像。

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
ENV PATH $HADOOP_HOME/sbin:$PATH

# 安装 which 和 sudo 这两个命令行工具
RUN yum install -y which sudo

```

步骤3：在Dockerfile文件的同目录中，使用下面的命令，创建新镜像my-hadoop-image

```sh
# "."表示当前目录，即Dockerfile所在的位置
# my-hadoop-image 为新镜像的名称
docker build -t my-hadoop-image .
```

### 创建Hadoop容器

1. 先创建一个docker网络。这样能很方便的让多个Hadoop容器之间互相通信。

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

50070和8088端口，主要是用来在浏览器中访问hadoop WEB界面的。

3. 在每个Hadoop容器中配置环境变量

在每一个Hadoop容器终端中,执行下面步骤。

```sh
# 1. 如果没有vim命令,可以通过下面的命令安装vim
yum install vim 

# 2. 编辑/etc/profile文件，添加环境变量。
vim /etc/profile
# 添加这行内容
export PATH=$PATH:/usr/local/hadoop/bin:/usr/local/hadoop/sbin
export PATH=$PATH:/usr/local/hadoop/bin:/usr/local/hadoop/sbin

export PATH=$PATH:/usr/local/jdk1.8/bin

# 3.保存退出
```

4. 测试容器内的java，hadoop是否安装成功

```bash
# 进入到hadoop容器内
docker exec -it hadoop01 /bin/bash
docker exec -it hadoop02 /bin/bash
docker exec -it hadoop03 /bin/bash

# 查询安装的java,hadoop版本
java -version
hadoop version

```

如下图所示
![hadoop_20240704093254.png](../blog_img/hadoop_20240704093254.png)

4. hadoop中的目录结构

![hadoop_20240704102116.png](../blog_img/hadoop_20240704102116.png)

### Hadoop容器中的HDFS集群配置

由于HDFS分布式存储系统有三个角色，NameNode主角色，DataNode从角色，辅助角色SecondaryNameNode。

因此我们需要给每个hadoop容器去分配这些角色。分配结果如下表所示。

节点容器 | 所分配的角色
------------ | -------------
hadoop01 容器 | NameNode主角色，DataNode从角色，辅助角色SecondaryNameNode。
hadoop02 容器 | DataNode从角色 
hadoop03 容器 | DataNode从角色

每个角色都是一个进程或者一个节点，因此可以理解为三个Hadoop容器中存在5个进程节点。其中一个主进程节点NameNode，三个从进程节点DataNode，以及一个辅助进程节点SecondaryNameNode。

> 配置方式有两种：

方式1：给每个hadoop容器，进行单独配置。

方式2：<font color="red">先配置hadoop01容器，然后将hadoop01容器中的配置文件复制到其他容器中即可。下面是在配置hadoop01容器</font>

下面采用的是方式2

> 当hadoop容器部署成功后,HDFS集群配置需要对如下文件的修改

- workers 配置DataNode从角色是哪些。
- hadoop-env.sh 配置hadoop的环境变量文件，需要将jdk的路径配置进去。
- core-site.xml 是hadoop的核心配置，需要指定hadoop的基本配置信息。
- hdfs-site.xml 是hadoop中的HDFS组件的配置文件。

> 配置 workers 文件

编辑/usr/local/hadoop/etc/hadoop/workers文件。配置三个DataNode从角色，所在的hadoop容器名称。

由于三个hadoop容器都是在一个网络my-hadoop-net下，因此容器可以用容器名称来找到其他hadoop容器。

```
hadoop01
hadoop02
hadoop03
```

> 配置 `hadoop-env.sh`

编辑 /usr/local/hadoop/etc/hadoop/hadoop-env.sh

```sh
# 指定hadoop使用java的安装路径
export JAVA_HOME=/usr/local/jdk1.8
# 指定hadoop的安装目录位置
export HADOOP_HOME=/usr/local/hadoop
# 指定hadoop配置文件的目录位置
export HADOOP_CONF_DIR=/usr/local/hadoop/etc/hadoop
# 指定hadoop运行日志目录位置
export HADOOP_LOG_DIR=/usr/local/hadoop/logs
```

> 配置core-site.xml

编辑 /usr/local/hadoop/etc/hadoop/core-site.xml。

由于三个hadoop容器都是在一个网络my-hadoop-net下，因此容器可以用容器名称来找到其他hadoop容器。

```xml
<configuration>
    <!-- 指定NameNode主角色，hadoop01为NameNode主角色所在的容器名称。8020为通讯端口，端口可以随意指定，默认为8020端口-->
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://hadoop01:8020</value>
    </property>
    <!--文件缓冲区大小，为131702比特-->
    <property>
        <name>io.file.buffer.size</name>
        <value>131702</value>
    </property>
</configuration>

```

> HDFS配置文件 hdfs-site.xml

编辑 /usr/local/hadoop/etc/hadoop/hdfs-site.xml

```xml
<configuration>
    <!-- 设置hdfs文件系统中，默认创建的文件权限-->
    <property>
        <name>dfs.datanode.data.dir.perm</name>
        <value>700</value>
    </property>
    <!-- NameNode主角色节点中元数据存储位置 -->
    <property>
        <name>dfs.namenode.name.dir</name>
        <value>file:/usr/local/hadoop/hdfs/namenode</value>
    </property>
    <!-- NameNode主角色节点允许哪些DataNode从角色节点进行授权连接 -->
    <property>
        <name>dfs.namenode.hosts</name>
        <value>hadoop01,hadoop02,hadoop03</value>
    </property>
    <!-- DataNode从角色节点的数据存储目录 -->
    <property>
        <name>dfs.datanode.data.dir</name>
        <value>file:/usr/local/hadoop/hdfs/datanode</value>
    </property>
    <!-- 数据块副本数量 -->
    <property>
        <name>dfs.replication</name>
        <value>2</value>
    </property>
    <!-- hdfs数据块大小（以字节为单位，默认为128MB）-->
    <property>
        <name>dfs.blocksize</name>
        <value>134217728</value>
    </property>
    <!-- 指定了 NameNode 提供 HTTP 服务的地址。通常用于浏览器访问 Hadoop 的管理界面 -->
    <property>
        <name>dfs.namenode.http-address</name>
        <value>hadoop01:50070</value>
    </property>
</configuration>
```

由于我们在hdfs-site.xml配置文件中，指定了namenode目录和datanode目录。因此我们需要在NameNode主角色所在的hadoop容器中（即hadoop01容器），创建这两个目录。 

```sh
mkdir -p /usr/local/hadoop/hdfs/namenode
mkdir -p /usr/local/hadoop/hdfs/datanode
```

> 将hadoop01容器中的hadoop目录，复制到其他hadoop容器中

```sh
# 在hadoop02容器终端中，删除/user/local/hadoop目录
rm -r /usr/local/hadoop
# 在hadoop03容器终端中，删除/user/local/hadoop目录
rm -r /usr/local/hadoop

# 在 hadoop01 容器的终端中把 /usr/local/hadoop 目录复制到 hadoop02容器的 /usr/local 目录中
scp -r /usr/local/hadoop hadoop02:/usr/local
# 在 hadoop01 容器的终端中把 /usr/local/hadoop 目录复制到 hadoop03容器的 /usr/local 目录中
scp -r /usr/local/hadoop hadoop03:/usr/local
```

scp命令需要输入root用户的密码，此处root用户密码为root。

以上关于Hadoop容器中的HDFS集群配置就完成了。

### 在Hadoop容器中创建普通用户hadoop

通常在生产环境中，强烈建议避免以 root 用户身份直接操作 Hadoop 的组件，这有助于减少安全风险。

因此为了确保数据安全，hadoop系统不以root用户启动，我们需要创建普通用户hadoop，并且以普通用户hadoop来启动整个hadoop服务。

在每一个Hadoop容器终端中,执行下面几条命令
```sh
# 创建普通用户hadoop
useradd hadoop
# 设置hadoop用户的密码为123456
passwd hadoop
# 将当前用户从root用户切换到hadoop用户
su - hadoop
```

### 在Hadoop容器中配置SSH免密登录

之前我们在每个容器中创建了hadoop用户。现在在每个Hadoop容器中，配置免密码互相SSH登录。

1. 在每一个Hadoop容器终端中,执行下面几条命令
```sh
# 将当前用户从root用户切换到hadoop用户
su - hadoop

# 生成SSH密钥
ssh-keygen -t rsa -b 4096

# 设置SSH免密登录。注意 hadoop01,hadoop02,hadoop03 是各个hadoop容器的名称。
# 该命令会让你输入hadoop用户的密码。
ssh-copy-id hadoop01
ssh-copy-id hadoop02
ssh-copy-id hadoop03
```

由于多个hadoop容器在同一个网络中，因此hadoop容器互相可以通过容器名称找到其他hadoop容器。

2. 执行命令完毕后，hadoop01,hadoop02,hadoop03 三个容器之间就可以完成hadoop用户之间的免密登录。
3. 测试

```sh
# 通过ssh登录到hadoop01容器中
ssh hadoop01
# 通过ssh登录到hadoop02容器中
ssh hadoop02
# 通过ssh登录到hadoop03容器中
ssh hadoop03
```

### Hadoop容器中的hadoop相关目录文件授权给普通用户hadoop

我们需要把Hadoop容器中的hadoop相关目录文件授权给之前创建的普通用户hadoop

在每一个Hadoop容器终端中,执行下面命令。注意需要用root用户来执行该命令
```sh
# 先切换到root用户，该命令需要输入root用户密码
su - root
# 执行授权命令
chown -R hadoop:hadoop /usr/local/hadoop
```

上面命令需要输入root用户密码，在构建hadoop镜像的时候，就设置了root用户密码为root。


### 格式化整个HDFS系统

先格式化整个HDFS系统，清除现有的文件系统数据和元数据。这个命令在第一次启动 HDFS 时使用，从而确保 NameNode 和 DataNode 存储数据是干净的。

注意：只需要在NameNode主角色节点的Hadoop容器上执行下面命令即可。

```sh
# 先切换到hadoop用户
su - hadoop

# 格式化namenode
hdfs namenode -format

# 假如格式化，遇到命令未找到的错误。表示环境变量可能未配置好。可以用绝对路径来运行该命令。
/usr/local/hadoop/bin/hdfs namenode -format
```

如图所示表示格式化成功
![hadoop_20240704170512.png](../blog_img/hadoop_20240704170512.png)

### 启动HDFS系统

```sh
# 启动hdfs集群
start-dfs.sh
# 或者绝对路径下的启动hdfs集群
/usr/local/hadoop/sbin/start-dfs.sh

# 关闭hdfs集群
stop-dfs.sh
# 或者绝对路径下的关闭hdfs集群
/usr/local/hadoop/sbin/stop-dfs.sh
```
















































- yarn-site.xml 是hadoop中的Yarn组件的配置文件。
- mapred-site.xml 是hadoop中的MapReduce组件的配置文件。


