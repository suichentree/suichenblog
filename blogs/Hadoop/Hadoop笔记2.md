---
title: Hadoop笔记2
date: 2024-07-05
sidebar: 'auto'
categories: 
 - 大数据
tags:
 - Hadoop
---

[toc]

# Hadoop笔记2

## HDFS文件系统的使用

### 命令行操作HDFS集群

当我们在Hadoop容器中配置好HDFS集群后，便可以操作HDFS集群。

> 启动HDFS集群/关闭HDFS集群

在NameNode主角色节点的容器中，执行下面命令。
```sh
# 启动hdfs集群
start-dfs.sh
# 关闭hdfs集群
stop-dfs.sh
```

> 单独启动或关闭某个角色的进程

在某一个Hadoop容器中执行下面命令

```sh
# 语法格式
hdfs --daemon (start|status|stop) (namenode|secondarynamenode|datanode)

# 例如关闭namenode进程
hdfs --daemon stop namenode
# 启动datanode进程
hdfs --daemon start datanode
# 查询secondarynamenode进程信息
hdfs --daemon status secondarynamenode

```

### HDFS文件系统的目录结构

HDFS文件系统的目录结构与Linux系统的目录结构是相似的。

![hadoop_20240705115335.png](../blog_img/hadoop_20240705115335.png)

一般情况下系统会自动识别出这个是linux系统的文件，还是hdfs系统的文件。从而自动添加协议头。

### 命令行操作HDFS文件系统

下面介绍一些常用的文件操作，更多操作请查看Hadoop官网。

> 在hdfs中查询目录

```sh
# 语法格式，path为目录完整路径,-h更好显示文件大小，-R 递归查询目录及其子目录
hdfs dfs -ls [-h] [-R] <path>

# 例如查询hdfs文件系统的根目录
hdfs dfs -ls /
# 递归查询根目录，及其子目录
hdfs dfs -ls -R /
```

> 在hdfs中创建目录

```sh
# 语法格式，path为目录完整路径,-p递归创建子目录
hdfs dfs -mkdir [-p] <path>

# 例如在根目录下创建一个shuyx目录
hdfs dfs -mkdir /shuyx
# 递归创建/aaa/bbb目录
hdfs dfs -mkdir -p /aaa/bbb
```

> 上传文件到hdfs中

```sh
# 语法格式，-f 覆盖目标文件，-p 保留权限，src 本地文件路径(linux系统的) ，dst 目标文件路径(hdfs系统的)
hdfs dfs -put [-f] [-p] <src> <dst>

# 创建a.txt文件
$ touch a.txt
# 把本地的a.txt文件 上传到hdfs系统的 /shuyx目录中
$ hdfs dfs -put a.txt /shuyx
# 查询hdfs的/shuyx目录
$ hdfs dfs -ls /shuyx
Found 2 items
-rw-r--r--   2 root supergroup          0 2024-07-05 06:35 /shuyx/a.txt
drwxr-xr-x   - root supergroup          0 2024-07-05 06:23 /shuyx/aaa
```

> 查看hdfs中的文件内容

```sh
# 语法格式 src 文件路径(hdfs系统的)
hdfs dfs -cat <src>
# 对于大文件，使用 管道符配合more。可以翻页查看
hdfs dfs -cat <src> | more 

# 查看hdfs系统中的/shuyx/a.txt文件内容
hdfs dfs -cat /shuyx/a.txt
# 若 a.txt是大文件,则可以使用下面命令
hdfs dfs -cat /shuyx/a.txt | more 
```

> 下载HDFS中的文件到本地系统中

```sh
# 语法格式 -f 覆盖目标文件，-p 保留权限，src 本地文件路径(hdfs系统的) ，dst 目标路径(linux系统的)
hdfs dfs -get [-f] [-p] <src> <dst>

# 下载hdfs系统中的/shuyx/a.txt文件，到当前目录中。 .表示当前目录
hdfs dfs -get -f /shuyx/a.txt .
```

> 复制HDFS中的文件

```sh
# 语法格式 -f 覆盖目标文件，src 本地文件路径(hdfs系统的) ，dst 目标路径(hdfs系统的)
hdfs dfs -cp [-f] <src> <dst>

# 复制hdfs系统中的/shuyx/a.txt文件，到/shuyx/aaa目录中
hdfs dfs -cp /shuyx/a.txt /shuyx/aaa
# 复制hdfs系统中的/shuyx/a.txt文件，到/shuyx目录中,并重命名为aa.txt
hdfs dfs -cp /shuyx/a.txt /shuyx/aa.txt
```

> 将本地文件的内容追加数据到hdfs的文件中

```sh
# 语法格式 src 本地文件路径(linux系统的) ，dst 目标路径(hdfs系统的)
hdfs dfs -appendToFile <src> <dst>

# 把本地的a.txt的文件内容，追加到hdfs系统的/shuyx/a.txt文件中。
hdfs dfs -appendToFile a.txt /shuyx/a.txt
```

> hdfs中的文件移动

```sh
# 语法格式 src 本地文件路径(hdfs系统的) ，dst 目标路径(hdfs系统的)
hdfs dfs -mv <src> <dst>

# 移动/shuyx/a.txt文件，到/shuyx/aaa目录中,并重命名为ccc.txt
hdfs dfs -mv /shuyx/a.txt /shuyx/aaa/ccc.txt
``` 

> hdfs中的文件删除

```sh
# 语法格式 -r 递归删除，适用于删除目录及其子目录
hdfs dfs -rm -r <src>

# 删除/shuyx/a.txt文件
hdfs dfs -rm /shuyx/a.txt
# 删除/shuyx/aaa 目录
hdfs dfs -rm -r /shuyx/aaa
``` 

### 图形化界面操作HDFS文件系统

点击导航栏的Utilities -> Browse the file system。就可以看到下面的界面。

在该界面中，可以简单的查看HDFS文件系统中的文件。
![hadoop_20240705153609.png](../blog_img/hadoop_20240705153609.png)

注意：界面上操作是有权限限制的，无法新增，删除，修改文件。

## HDFS文件系统存储原理

