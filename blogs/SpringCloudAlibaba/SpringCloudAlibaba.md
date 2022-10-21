---
title: SpringCloudAlibaba笔记
date: 2022-07-26
sidebar: 'auto'
categories: 
 - 后端
tags:
 - SpringCloudAlibaba
---

[toc]

## SpringCloudAlibaba笔记

## 1.什么是SpringCloud,SpringCloudAlibaba?

* SpringCloud是微服务架构下的一站式解决方案。
* SpringCloud是一个包含多个开发框架的工具集，集合了一套解决微服务问题的技术。让用户可以直接使用，不需要关心技术整合的问题。
* SpringCloud使用了SpringBoot作为底层，通过SpringBoot的自动配置来简化分布式架构的开发

* SpringCloudAlibaba 是阿里巴巴的微服务开发一站式解决方案

|  组件上的区别   | SpringCloud  | 	SpringCloudAlibaba  |
|  ----  | ----  | ----  |
| 注册中心  | Eureka、Consul | Nacos |
| 配置中心  | SpringCloud Config | Nacos |
| 网关      | SpringCloud Zuul | SpringCloud Gateway |
| 负载均衡	| Ribbon | Loadbalancer |
| 熔断降级  | Hystrix | Sentinel |
| 服务调用  | Feign | OpenFeign |

下图是微服务架构图
![20220728161129.png](../blog_img/20220728161129.png)

## 2.版本说明

注意：在搭建微服务框架的时候，要注意SpringCloudAlibaba，SpringCloud，SpringBoot三者的版本，不要各自使用最新的版本。

目前三者之间推荐的版本搭配

|  Spring Cloud Alibaba Version   | Spring Cloud Version | 	Spring Boot Version  |
|  ----  | ----  | ----  |
| 2.2.8.RELEASE  | Spring Cloud Hoxton.SR12 | 2.3.12.RELEASE |

目前SpringCloudAlibaba中各个组件的版本搭配

|  Spring Cloud Alibaba Version | Sentinel Version | Nacos Version | RocketMQ Version | Dubbo Version | Seata Version | 
|  ----  | ----  | ----  | ----  | ----  | ----  |
| 2.2.8.RELEASE  | 1.8.4 | 2.1.0 | 4.9.3 | ~ | 1.5.1 |

## 3.maven项目中引入SpringCloudAlibaba依赖

1. 百度IDEA如何创建父子模块maven项目

```
1. idea创建一个springboot项目，注意SpringBoot的版本。
2. 删除项目中其余文件，只保留pom文件。注意修改pom文件中的springboot的版本，修改为2.3.12.RELEASE
3. 右键该项目，给该项目创建新的子项目。指定子项目的父项目。
```

2. 引入SpringCloudAlibaba，SpringCloud依赖,注意SpringCloudAlibaba，SpringCloud，SpringBoot三者的版本

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR12</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.2.8.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

