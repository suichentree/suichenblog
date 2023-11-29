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

SpringBoot是基于spring的全新框架，目的是简化spring框架的搭建和开发过程。

SpringBoot框架根据约定大于配置的原则，在Spring框架的基础上进行了各种简化配置，提供了各种启动器，开发者能快速上手。

## SpringBoot的优点有哪些

- 独立运行：springboot打出的jar包，可以独立运行。因为jar包内嵌servlet容器，例如tomcat，jetty等。


## 如何理解 Spring Boot 中的 starter 依赖？

Starters启动依赖starter。它包含了一系列可以集成到应用里面的依赖包，你可以一站式集成Spring及其他技术，而不需要到处找依赖包。如你想使用Spring JPA访问数据库，只要加入spring-boot-starter-data-jpa启动器依赖就能使用了。Starters包含了许多项目中需要用到的依赖，它们能快速持续的运行，都是一系列得到支持的管理传递性依赖。

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

## bootstrap.yaml文件的作用

bootstrap.yaml文件在springboot中默认是不支持的，需要在springcloud中才支持它。bootstrap.yaml文件的作用是在springboot项目启动之前，启动一个父容器，这个父容器可以在springboot容器启动之前完成一些初始化加载操作。例如加载配置中心，注册中心的信息。

注意：这个父容器与sprntboot启动的容器是父子容器。

## @Component/@Controller/@Service/@Repository 注解的区别

@Component注解用于将java类标记为bean。当IOC容器启动后，会自动注入到容器中。

@Controller/@Service/@Repository注解功能与@Component注解类似，但是为了分辨服务层，控制层，数据层，而特别设计的注解。

## SpringBoot 的核心注解是哪个？由哪几个注解组成的？

核心注解是@SpringBootApplication。该注解是启动类注册。

@SpringBootApplication 注解包含了以下3个注解：
- @SpringBootConfiguration：用于实现配置文件的功能。包含了@Configuration注解。
- @EnableAutoConfiguration：用于打开自动装配的功能。
- @ComponentScan：用于spring扫描组件。

## springboot打的jar包和普通jar包，有什么区别？

springboot项目打的jar包是可执行jar包，这种jar包可以直接通过java -jar命令来运行。

其他项目不能直接依赖可执行jar包。依赖了也无法使用可执行jar包中的类。主要是因为可执行jar包的目录结构和普通jar包不同。

普通jar包解压之后就是代码。但是可执行jar包的代码在/BOOT-INF/classes目录下。

我们可以在springboot项目的pom文件中，将项目打成两个jar包，一个可执行jar包，一个普通jar包。
