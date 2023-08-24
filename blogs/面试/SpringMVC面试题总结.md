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

![springmvc_20230731143158.png](../blog_img/springmvc_20230731143158.png)

```
（1）客户端（浏览器）发送请求到 DispatcherServlet前端控制器。
（2）DispatcherServlet 根据请求信息调用 HandlerMapping，解析请求对应的 Handler。
（3）解析到对应的 Handler（也就是我们平常说的 Controller 控制器）后，开始由 HandlerAdapter 适配器处理。
（4）HandlerAdapter 会根据 Handler 来调用真正的处理器开处理请求，并处理相应的业务逻辑。
（5）处理器处理完业务后，会返回一个 ModelAndView 对象，Model 是返回的数据对象，View 是个逻辑上的 View。
（6）ViewResolver 会根据逻辑 View 查找实际的 View。
（7）DispaterServlet 把返回的 Model 传给 View（视图渲染）。
（8）把 View 返回给请求者（浏览器）
```


简化：
- 前端控制器（DispatcherServlet）：接收请求，响应结果，相当于电脑的CPU。
- 处理映射器（HandlerMapping）：根据URL去查找处理器
- 处理器（Handler）：（需要程序员去写代码处理逻辑的）
- 处理器适配器（HandlerAdapter）：会把处理器包装成适配器，这样就可以支持多种类型的处理器，类比笔记本的适配器（适配器模式的应用）
- 视图解析器（ViewResovler）：进行视图解析，对返回的字符串进行处理，解析成对应的页面


## SpringMVC 拦截器怎么实现？

1. 创建一个自定义拦截器类，自定义拦截器类需要实现HandlerInterceptor接口，重写HandlerInterceptor接口中的三个方法。
2. 将自定义拦截器注入到配置类中。

## SpringMVC怎么样设定重定向和转发的？

* （1）转发：在return返回值前面加"forward:"，譬如"forward:user.do?name=method4
* （2）重定向：在return返回值前面加"redirect:"，譬如`redirect:http://www.baidu.com`

