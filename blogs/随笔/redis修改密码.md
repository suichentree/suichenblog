---
title: redis修改密码
date: 2022-07-04
sidebar: 'auto'
categories: 
 - 随笔
tags:
 - Redis
---

## Windows下的redis修改密码

1 先右键此电脑-》管理。找到windows系统中的redis服务。关闭redis服务。 
2 在Redis安装目录下面，打开redis.windows-service.conf文件
3 找到# requirepass foobared行，去掉#号。改为requirepass 123456
4 重启windows系统中的redis服务。

PS:
* Windows版的Redis有2个配置文件，一个是：redis.windows.conf，另一个是redis.windows-service.conf。默认加载的配置文件是redis.windows-service.conf