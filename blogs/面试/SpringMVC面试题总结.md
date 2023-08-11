---
title: SpringMVC面试题总结
date: 2023-08-11
sidebar: 'auto'
categories: 
 - 面试
tags:
 - SpringMVC
---

[toc]

# SpringMVC面试题总结

## 什么是 SpringMvc？

Spring MVC 是 Spring 创建的一个基于 MVC 模式的轻量级 Web 开发框架。

Spring MVC 本质上是对 Servlet 的进一步封装，其最核心的组件是 DispatcherServlet。由于 Spring MVC 本身就是 Spring 框架的一部分，可以和 Spring 框架无缝集成。性能方面具有先天的优越性，是当今业界最主流的 Web 开发框架。

## SpringMVC 工作流程？

1）用户发送请求至前端控制器 DispatcherServlet。

2）DispatcherServlet 收到请求调用 HandlerMapping 处理器映射器。

3）处理器映射器找到具体的处理器并返回给DispatcherServlet。

4）DispatcherServlet 调用 HandlerAdapter 处理适配器。找到具体的Controller处理器。

6）Controller 执行完成返回 ModelAndView。

7）HandlerAdapter 处理适配器 将 ModelAndView 返回给 DispatcherServlet。

8）DispatcherServlet 将 ModelAndView 传给 ViewReslover 视图解析器。

9）ViewReslover 解析后返回具体 View。

10）DispatcherServlet 根据 View 进行渲染视图（即将模型数据填充至视图中）。

11）DispatcherServlet 响应用户

简化：

用户发出请求-》前端控制器 DispatcherServlet -》 HandlerMapping 处理器映射器 -》HandlerAdapter 处理适配器 -》 具体的Controller处理器。

Controller处理器执行完后返回ModelAndView -》HandlerAdapter 处理适配器 -》DispatcherServlet -》ViewReslover视图解析器，解析ModelAndView,并返回具体的View -》DispatcherServlet 拿到view 进行渲染 -》响应给用户。

## SpringMVC 拦截器怎么实现？

1. 创建一个自定义拦截器类，自定义拦截器类需要实现HandlerInterceptor接口，重写HandlerInterceptor接口中的三个方法。
2. 将自定义拦截器注入到配置类中。