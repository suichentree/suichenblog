---
title: Nacos面试题总结
date: 2023-12-05
sidebar: 'auto'
categories: 
 - 面试
tags:
 - Nacos
---

[toc]

# Nacos面试题总结

## Nacos作为配置中心的原理?


## Nacos如何实现配置环境隔离的?

Nacos配置中心有三个核心要点：命名空间Namespace,分组Group,配置集DataId。通过这三个要点来实现配置环境的隔离。

即namespace-> group -> service。

- namespace 命令空间相当于环境，如生产环境，开发环境。不同namespace之间相互隔离。
- group 相当于项目。如医疗项目，电商项目等。
- service 相当于服务。即用户服务，订单服务等

## Nacos中注册的服务有哪些 ?

Nacos注册的服务分为两种类型：
- 临时实例：如果服务宕机超过一定时间，会从服务列表剔除，默认的类型。
- 非临时实例：如果服务宕机，不会从服务列表剔除，也可以叫永久服务实例。

## Nacos和Eureka有什么区别 ? 

## 项目启动的时候是先加载本地配置文件还是Nacos中的配置文件 ? 

先加载本地配置文件,若在本地配置文件中配置了Nacos配置中心地址。那么会加载Nacos配置中心中的文件。

## Nacos如何实现配置的热更新?

