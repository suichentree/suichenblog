---
title: Ribbon面试题总结
date: 2023-12-05
sidebar: 'auto'
categories: 
 - 面试
tags:
 - Ribbon
---

[toc]

# Ribbon面试题总结

## Ribbon是如何实现负载均衡?

Ribbon是客户端负载均衡。即客户端自已通过负载均衡算法，来选择服务集群中的某个服务实例来调用。

Ribbon实现负载均衡的前提：客户端需要提前知道所有的服务实例信息。

例如系统中服务A调用服务B。Ribbon实现负载均衡的过程如下：
1. 服务A发送请求，调用服务B。服务B有多个实例节点在注册中心。
2. 请求被Ribbon拦截下来。并进行处理。
3. Ribbon先获取到在注册中心中服务B的所有服务实例信息。 
4. Ribbon根据负载均衡算法，选择服务B的其中一个实例。
5. 最后Ribbon将请求发送到服务B实例上。
6. 至此，Ribbon完成了服务A调用服务B的负载均衡。

## Ribbon支持的负载均衡策略有哪些?

Ribbon支持的负载均衡策略如下：
1. RoundRobinRule 轮询策略: 默认的负载均衡策略。
2. AvailabilityFilteringRule 可用性过滤策略：该策略根据服务的运行状态来分配权重，过滤掉连接失败或特别高并发的服务实例。
3. WeightedResponseTimeRule 加权响应时间策略: 它对轮询策略进行了扩展。首先根据每个服务实例的运行情况计算出权重，然后根据权重进行服务实例的挑选。
4. ZoneAvoidanceRule 区域感知轮询策略: 该策略以区域、可用的服务器为基础，选择服务实例并对服务实例进行分类。
5. BestAvailableRule 最空闲策略：选择并发请求最小的服务实例来提供服务。
6. RandomRule 随机策略: 随机选择一个可用的服务实例。
7. RetryRule 重试策略

## 如何修改Ribbon的负载均衡策略 ?

修改Ribbon负载均衡策略的方式有二种:
1. 如果负载均衡策略之前配置在Ribbo配置类中，那么直接在配置类中修改即可。
2. 如果负载均衡策略之前配置在application.yml文件中，那么直接在application.yml文件中修改即可。

## Ribbon如何自定义负载均衡策略?

1. 创建Ribbon配置类，该类实现IRule接口。
2. 实现IRule接口的choose方法即可。至于具体的负载均衡规则如何做，要看具体的需求。

