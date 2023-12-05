---
title: SpringCloudGateway面试题总结
date: 2023-12-05
sidebar: 'auto'
categories: 
 - 面试
tags:
 - SpringCloudGateway
---

[toc]

# SpringCloudGateway面试题总结

## 有没有使用过网关的全局过滤器 ?

主要通过自定义全局过滤器实现对请求的统一权限校验：客户端发送请求携带token到网关, 由网关负责统一的token解析, 解析完毕之后获取token中的用户信息, 保存到请求头中, 然后把请求路由到某个服务中。



