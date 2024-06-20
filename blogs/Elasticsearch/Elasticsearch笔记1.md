---
title: Elasticsearch笔记1
date: 2024-06-20
sidebar: 'auto'
categories: 
 - Elasticsearch
tags:
 - Elasticsearch
---

[toc]

# Elasticsearch笔记1

## Elasticsearch介绍

> 什么是Elasticsearch？

Elasticsearch是一个知名的，开源的，免费的分布式搜索引擎，可以用来实现搜索、日志统计、分析、系统监控等功能。

> Elasticsearch的发展历史

elasticsearch底层是基于lucene来实现的。

- 1999年DougCutting研发了Lucene。Lucene是一个Java语言的搜索引擎类库，是Apache公司的顶级项目。
- 2004年Shay Banon基于Lucene开发了Compass
- 2010年Shay Banon 重写了Compass，取名为Elasticsearch。

## ELK 技术栈

elasticsearch结合beats、Logstash、kibana。可以组成一整套的技术栈，叫做ELK 技术栈。

ELK 技术栈目前广泛的应用在各个系统中的日志数据分析、实时监控等领域。

- elasticsearch是ELK技术栈的核心，负责存储、搜索、分析数据。
- kibana 负责数据的可视化。
- Logstash、Beats 负责抓取数据。

![elk_20240620162848.png](../blog_img/elk_20240620162848.png)

## Elasticsearch 和 kibana 安装

- elasticsearch是ELK技术栈的核心，负责存储、搜索、分析数据。
- kibana 负责数据的可视化。

### Docker环境下安装部署Elasticsearch容器

> 步骤① 先安装docker环境，自行百度。

> 步骤② 下载Elasticsearch镜像文件。最新版或某个版本

```shell
# 下载Elasticsearch镜像文件。版本为7.12.1
docker pull elasticsearch:7.12.1

# 查询镜像
docker images
```

> 步骤③ 创建Elasticsearch容器的存储目录

如果是windows系统，则可以在E:\DockerVolumes\Elasticsearch目录中创建data和plugins和logs目录。

- data目录存储Elasticsearch容器产生的数据。
- logs目录存储Elasticsearch容器的日志数据。
- plugins目录存储Elasticsearch容器的插件。


> 步骤④ 创建并启动Elasticsearch容器

```shell
# 创建容器并启动
docker run -d --name="myES" --privileged=true -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" -e "discovery.type=single-node" -p 39200:9200 -p 39300:9300 -v /e/DockerVolumes/Elasticsearch/data:/usr/share/elasticsearch/data -v /e/DockerVolumes/Elasticsearch/plugins:/usr/share/elasticsearch/plugins -v /e/DockerVolumes/Elasticsearch/logs:/usr/share/elasticsearch/logs  elasticsearch:7.12.1

# 查询容器日志，看是否成功启动。
docker logs myES
```

命令解释
```
-e "ES_JAVA_OPTS=-Xms512m -Xmx512m"：设置内存大小
-e "discovery.type=single-node"：非集群模式，单机模式
--privileged=true：授予逻辑卷访问权
-p 39200:9200：端口映射配置,宿主机的39200端口映射到容器的9200端口
-p 39300:9300：端口映射配置,宿主机的39300端口映射到容器的9300端口

-v /e/DockerVolumes/Elasticsearch/data:/usr/share/elasticsearch/data：挂载逻辑卷，绑定es的数据目录
-v /e/DockerVolumes/Elasticsearch/logs:/usr/share/elasticsearch/logs：挂载逻辑卷，绑定es的日志目录
-v /e/DockerVolumes/Elasticsearch/plugins:/usr/share/elasticsearch/plugins：挂载逻辑卷，绑定es的插件目录
```

- 注意：/e/DockerVolumes/... 是windows环境下E盘的DockerVolumes目录。如果宿主机是linux系统，可以设置其他目录。


> 步骤⑤ 测试

elasticsearch并没有提供可视化界面，因此我们需要通过调用elasticsearch的API接口，来测试elasticsearch是否成功运行。

在浏览器中输入：`http://localhost:39200/` 即可看到elasticsearch的响应结果。

如图所示
![es_20240620175036.png](../blog_img/es_20240620175036.png)

### Docker环境下安装部署kibana容器

kibana可以提供一个elasticsearch的可视化界面。方便我们可视化操作elasticsearch。

> 步骤① 下载 kibana 镜像文件。最新版或某个版本

```shell
# 下载 kibana 镜像文件。版本为7.12.1
docker pull kibana:7.12.1

# 查询镜像
docker images
```

> 步骤③ 创建并启动kibana容器

```shell
# 创建容器并启动
docker run -d --name="myKibana" -e "ELASTICSEARCH_HOSTS=http://localhost:39200" -p 35601:5601 kibana:7.12.1

# 查询容器日志，看是否成功启动。
docker logs myKibana
```

> 步骤⑤ 测试

elasticsearch并没有提供可视化界面，因此我们需要通过调用elasticsearch的API接口，来测试elasticsearch是否成功运行。

在浏览器中输入：`http://localhost:39200/` 即可看到elasticsearch的响应结果。


## Elasticsearch的基本概念




