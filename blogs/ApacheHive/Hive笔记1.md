---
title: Hive笔记1
date: 2024-07-10
sidebar: 'auto'
categories: 
 - 大数据
tags:
 - Hive
---

[toc]

# Hive笔记1

## Hive介绍

> Hive是什么?

Hive 全称是Apache Hive。是一款分布式SQL计算的工具。其主要功能就是将SQL语句翻译成MapReduce程序。

![hive_20240711162718.png](../blog_img/hive_20240711162718.png)

用户编写SQL语句，Hive将SQL语句转换为MapReduce程序，MapReduce程序在Hadoop的MapReduce组件中进行分布式计算，最后得出计算结果。

> Hive的优点
- 简单，容易上手，接口采用类SQL写法。
- 底层执行MapReduce，可以通过SQL语句来对海量数据进行分布式计算。

> Hive 内部有两大组件
- 元数据存储：Hive中的元数据，通常是指表名，列名，表的属性，表数据所在目录等。可以使用第三方数据库来进行数据存储。
- SQL解析器：该解析器用于对HQL查询语句的解析。并将解析的结果存储在Hadoop的HDFS文件系统中。

## Hive的安装部署



