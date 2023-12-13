---
title: Seata面试题总结
date: 2023-12-13
sidebar: 'auto'
categories: 
 - 面试
tags:
 - Seata
---

[toc]

# Seata面试题总结

## 2PC协议是什么？

目前分布式事务都是基于2PC协议来进行解决的。


## Seata的实现原理是什么？

Seata中分布式事务的实现方式通常是基于2PC的方式。

Seata是分布式事务的解决方案。

目前主流的分布式事务解决方案都是2PC协议的

> 2PC协议即两阶段提交协议:

阶段1(Prepare预处理阶段)：提交事务请求
阶段2(Commit提交阶段)：执行事务提交。分为两种情况，正常提交和回退。
