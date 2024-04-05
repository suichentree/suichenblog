---
title: XXL-job笔记2
date: 2024-04-05
sidebar: 'auto'
categories: 
 - 后端
tags:
 - XXL-job
---

[toc]

# XXL-job笔记2

[xxl-job官网文档](https://www.xuxueli.com/xxl-job/)

## 系统组成

xxl-job把任务调度这个行为抽象为调度中心 + 执行器。

- 调度中心：用于管理调度任务信息，发出调度请求，自身不承担业务代码。支持可视化、简单且动态的管理调度信息，包括任务新建，更新，删除，GLUE开发和任务报警等。
- （服务端）执行器：负责接收调度中心的请求并执行任务逻辑。执行器专注于任务的执行等操作，开发和维护更加简单和高效；

