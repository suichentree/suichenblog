---
title: bootstrap和application配置文件
date: 2023-11-15
sidebar: 'auto'
tags:
 - 开发
tags:
 - 开发
---

[toc]

# bootstrap和application配置文件

SpringBoot中有以下两种配置文件，bootstrap (.yml 或者 .properties)，application (.yml 或者 .properties)

1. 加载顺序的区别

- bootstrap.yml（bootstrap.properties）先加载，并且不能被本地配置重写。
- application.yml（application.properties）后加载

2. 应用场景的区别

- bootstrap配置文件和application配置文件都可以用来配置参数。
- bootstrap配置文件用来定义系统级别的配置，这些参数一般是不会变动的。
- application 配置文件用来定义应用级别的，主要是项目的本地配置。

例如在微服务项目中，每个服务项目的bootstrap配置文件主要配置使用到的注册中心，配置中心，流量控制中心，消息中心等系统级别的配置信息。

3. 为什么需要bootstrap配置文件

？？？








