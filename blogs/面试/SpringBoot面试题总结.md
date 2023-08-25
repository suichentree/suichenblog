---
title: SpringBoot面试题总结
date: 2023-08-11
sidebar: 'auto'
categories: 
 - 面试
tags:
 - SpringBoot
---

[toc]

# SpringBoot面试题总结

## 什么是Spring Boot？

Spring Boot 是在Spring框架的基础上简化了繁重的配置，提供了各种启动器，开发者能快速上手。

## 为什么要用SpringBoot？

Spring Boot而且内嵌了各种servlet容器，Tomcat、Jetty等，可以不需要打成war包部署到容器中，
Spring Boot只要打成一个可执行的jar包就能独立运行，所有的依赖包都在一个jar包内。

spring-boot 启动器自动依赖其他组件，大大简化了maven的配置。


## Spring Boot 的核心注解是哪个？它主要由哪几个注解组成的？

核心注解是@SpringBootApplication，

@SpringBootApplication 注解包含了以下 3 个注解：
- @SpringBootConfiguration：用于实现配置文件的功能。
- @EnableAutoConfiguration：用于实现自动装配的功能。
- @ComponentScan：用于扫描组件。

## 如何理解 Spring Boot 中的 Starters？

Starters启动依赖。它包含了一系列可以集成到应用里面的依赖包，你可以一站式集成Spring及其他技术，而不需要到处找依赖包。如你想使用Spring JPA访问数据库，只要加入spring-boot-starter-data-jpa启动器依赖就能使用了。Starters包含了许多项目中需要用到的依赖，它们能快速持续的运行，都是一系列得到支持的管理传递性依赖。

> Starters命名

Spring Boot官方的启动器都是以spring-boot-starter-命名的，代表了一个特定的应用类型。

第三方的启动器不能以spring-boot开头命名，它们都被Spring Boot官方保留。一般一个第三方的应该这样命名，像mybatis的mybatis-spring-boot-starter

> 常用的starter

```
spring-boot-starter-web 嵌入tomcat和web开发需要servlet与jsp支持
spring-boot-starter-data-jpa 数据库支持
spring-boot-starter-data-redis redis数据库支持
spring-boot-starter-data-solr solr支持
mybatis-spring-boot-starter 第三方的mybatis集成starter
```

## 如何使用Spring Boot实现异常处理？

Spring Boot 提供了一种使用ControllerAdvice处理异常的非常有用的方法。 我们通过实现一个ControlerAdvice类，来处理控制器类抛出的所有异常。

## Spring Boot 的核心配置文件有哪几个？它们的区别是什么？

Spring Boot 的核心配置文件是 application 和 bootstrap 配置文件。

application 配置文件这个容易理解，主要用于 Spring Boot 项目的自动化配置。

bootstrap 配置文件有以下几个应用场景。
- 使用 Spring Cloud Config 配置中心时，需要在 bootstrap 配置文件中添加配置中心的配置信息来加载外部配置中心；
- 一些固定的不能被覆盖的属性；
- 一些加密/解密的场景；

