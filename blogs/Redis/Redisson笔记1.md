---
title: Redisson笔记1
date: 2023-12-24
sidebar: 'auto'
categories: 
 - 数据库
tags:
 - Redis
---

[toc]

# Redisson笔记1

Redisson是操作Redis数据库的Java客户端工具。

## Jedis、Lettuce、RedisTemplate、Redission的区别？

- Jedis是老牌的redis客户端，采用同步阻塞式IO，采用线程池时是线程安全的。优点是简单、灵活、api全面。缺点是某些redis高级功能需要自己封装。

- Lettuce是新的redis客户端，基于netty采用异步非阻塞式IO，是线程安全的。优点是提供了很多redis高级功能，例如集群、哨兵、管道等。缺点是api抽象，学习成本高。

- RedisTemplate是spring操作redis的封装工具类。比如说springBoot1.x时，具体实现是jedis；而到了springBoot2.x时，具体实现变成了lettuce。RedisTemplate的好处就是基于springBoot自动装配的原理，使得spring整合redis时比较简单。

- Redission是操作redis的分布式客户端，同样基于netty采用异步非阻塞式IO，是线程安全的，优点是提供了很多redis的分布式操作和高级功能，缺点是api抽象，学习成本高。

总结：Redission相比其他redis客户端，能够提供更高级的redis功能操作。


