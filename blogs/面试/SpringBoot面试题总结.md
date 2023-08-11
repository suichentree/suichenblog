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

## 说说你对Spring Boot的理解

Spring Boot 主要是简化了使用 Spring 的难度，简省了繁重的配置，提供了各种启动器，开发者能快速上手。

## Spring Boot 的核心注解是哪个？它主要由哪几个注解组成的？

核心注解是@SpringBootApplication，

其主要包含了以下 3 个注解：
- @SpringBootConfiguration：用于实现配置文件的功能。
- @EnableAutoConfiguration：打开自动装配的功能。
- @ComponentScan：用于扫描组件。

## 如何理解 Spring Boot 中的 Starters？

Starters 起步依赖。它包含了一系列可以集成到应用里面的依赖包。

如你想使用 Spring JPA 访问数据库，只要加入 spring-boot-starter-data-jpa 启动器依赖就能使用了。




