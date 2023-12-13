---
title: SpringCloud面试题总结
date: 2020-11-24
sidebar: 'auto'
categories:
 - 面试
tags:
 - SpringCloud
 - SpringCloudAlibaba
---

[toc]

# SpringCloud面试题总结

## 什么是 Spring Cloud？

Spring cloud 是基于 Spring Boot 的分布式微服务架构解决方案。

Spring cloud 可以将基于Spring Boot开发的单体微服务整合并管理起来,是一系列框架的集合。

Spring cloud 提供如注册中心、配置中心、API网关、流量监控、断路器、链路追踪等功能。

## SpringBoot和SpringCloud的区别？

SpringBoot专注于开发单个微服务。

SpringCloud是分布式微服务系统解决方案。它将SpringBoot开发的单体微服务整合起来，提供如注册中心、配置中心、API网关、流量监控、断路器、链路追踪等功能。


## 什么是SpringCloudConfig?

在分布式系统中，由于服务数量巨多，为了方便服务配置文件统一管理，实时更新，所以需要分布式配置中心组件。在Spring Cloud中，有分布式配置中心组件spring cloud config ，它支持配置服务放在配置服务的内存中（即本地），也支持放在远程Git仓库中。

在spring cloud config 组件中，分两个角色，一是config server，二是config client。使用：（1）添加pom依赖（2）配置文件添加相关配置（3）启动类添加注解@EnableConfigServer


## SpringCloud涉及到的核心组件及其作用？

Spring cloud 是基于 Spring Boot 的微服务架构解决方案，是一套框架。专门用于解决微服务架构下的各种问题。

为了解决微服务架构下出现的各种问题，SpringCloud都提供了对于的解决方案。

SpringCloud的核心组件如下。
- 服务的注册与发现：eureka,Nacos
- 服务之间的互相调用：Ribbon,openFeign
- 服务熔断降级组件：Hystrix,Sentinel
- API网关：Zuul,SpringCloudGateway
- 配置中心：SpringCloudConfig
- 链路追踪：skywalking
- 分布式事务：Seata
