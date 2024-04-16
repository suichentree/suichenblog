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

下面记录SpringBoot面试题。用于快速记忆面试题。

## 什么是Spring Boot？

SpringBoot是基于spring的框架，主要是简化了使用 Spring框架的难度，简化了配置，提供了各种启动器，开发者能快速上手。

## Spring Boot比Spring做了哪些改进？

1. 内嵌tomcat服务器
2. 简化了配置方式，提供了yml的配置方式，也提供了java方式的配置，从而不需要XML配置。
3. 提供了各种启动依赖，避免了Maven的各种版本冲突。

## SpringBoot的核心注解是哪个？由哪几个注解组成的？

SpringBoot的核心注解是@SpringBootApplication。该注解用于启动类上。


@SpringBootApplication 注解包含了以下3个注解：
- @SpringBootConfiguration：组合了 @Configuration 注解，实现配置文件的功能。
- @EnableAutoConfiguration：用于打开自动装配的功能。
- @ComponentScan：用于spring扫描组件。

## Java Config是什么？

Spring JavaConfig 是 Spring 社区的产品。

一般情况下是用xml配置文件来配置 Spring IoC 容器。但是Spring Java Config 可以通过java 方法来配置 Spring IoC 容器。

> 使用 JavaConfig 的优点

1. 由于是通过java类来作为配置项。因此可以充分利用 Java 中的面向对象功能。例如配置类的继承，方法重写。
2. 减少或消除 XML 文件配置。Java Config 为开发人员提供了一种纯 Java 方法来配置 Spring 容器。

## Spring Boot 是否可以使用 XML 配置文件 ?

Spring Boot 推荐使用 Java 配置而非 XML 配置，但是 Spring Boot 中也可以使用 XML 配置。

通过@ImportResource 注解可以引入一个 XML 配置文件。

## bootstrap.properties 和 application.properties 有何区别 ?

Spring Boot 两个配置文件：bootstrap 和 application (. yml 或者 . properties)。

bootstrap配置文件通常由父容器加载。application配置文件由子容器加载。

- bootstrap配置文件要比application配置文件优先加载。
- 并且bootstrap配置文件的配置项不能覆盖application配置文件的配置项。

通过情况下，在微服务项目中才会用到bootstrap配置文件。主要用于配置一些系统级的配置信息。例如服务要用到的配置中心，注册中心的信息。


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

## @Component/@Controller/@Service/@Repository 注解的区别

@Component注解用于将java类标记为bean。当IOC容器启动后，会自动注入到容器中。

@Controller/@Service/@Repository注解功能与@Component注解类似，但是为了分辨服务层，控制层，数据层，而特别设计的注解。


## springboot打的jar包和普通jar包，有什么区别？

springboot项目打的jar包是可执行jar包，这种jar包可以直接通过java -jar命令来运行。

其他项目不能直接依赖可执行jar包。主要是因为可执行jar包的目录结构和普通jar包不同。

- 普通的 jar 包，解压后直接就是包名目录，目录里就是代码。
- 可执行 jar 解压后，在\BOOT-INF\classes 目录下才是代码，因此无法被直接引用。

可以在springboot项目的pom文件中增加配置，将项目打成两个jar包，一个可执行jar包，一个普通jar包。

## 微服务中如何实现 session 共享？

在微服务中，一个完整的项目被拆分成多个不相同的独立的服务，各个服务独立部署在不同的服务器上，各自的 session 被从物理空间上隔离开了。

> 如何在不同微服务之间共享 session？

常见的方案就是 将所有微服务的 session 统一保存在 Redis 上，当各个微服务对 session 有相关的读写操作时，都去操作 Redis 上的 session 。

## SpringBoot的启动步骤是什么？

1. 加载配置文件

springboot会读取配置文件中的信息。

2. 创建并启动Spring容器

springboot会创建一个IOC容器，这个容器用来管理所有的bean对象。

3. 扫描注解

springboot会扫描代码中的所有注解，并将这些注解修饰的java类，转换为bean对象。

对于@Controller等注解修饰的java类，实例化为bean对象后，放到IOC容器中进行管理。

对于@Configuration等注解修饰的java类，实例化bean对象后，会作为配置，参与到springboot的启动中。

4. 启动程序

Springboot的web依赖内置了一个tomcat容器。可以用来快速开发web程序。
