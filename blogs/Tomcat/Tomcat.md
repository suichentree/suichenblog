---
title: Tomcat基础
date: 2018-10-12
sidebar: 'auto'
categories: 
 - 服务器
tags:
 - Tomcat
---

# Tomcat基础

## 概述：

&emsp;Tomcat 服务器是一个免费的开放源代码的Web 应用服务器，属于轻量级应用服务器，在中小型系统和并发访问用户不是很多的场合下被普遍使用，是开发和调试JSP 程序的首选。对于一个初学者来说，可以这样认为，当在一台机器上配置好Apache 服务器，可利用它响应HTML（标准通用标记语言下的一个应用）页面的访问请求。实际上Tomcat是Apache 服务器的扩展，但运行时它是独立运行的，所以当你运行tomcat 时，它实际上作为一个与Apache 独立的进程单独运行的。
&emsp;当配置正确时，Apache 为HTML页面服务，而Tomcat 实际上运行JSP 页面和Servlet。另外，Tomcat和IIS等Web服务器一样，具有处理HTML页面的功能，另外它还是一个Servlet和JSP容器，独立的Servlet容器是Tomcat的默认模式。不过，Tomcat处理静态HTML的能力不如Apache服务器。目前Tomcat最新版本为9.0。

## 目录结构：

/bin：脚本文件目录。
/common/lib：存放所有web项目都可以访问的公共jar包（使用Common类加载器加载）。
/conf：存放配置文件，最重要的是server.xml。
/logs：存放日志文件。
/server/webapps：来管理Tomcat-web服务用的。仅对TOMCAT可见，对所有的WEB APP都不可见（使用Catalina类加载器加载）。
/shared/lib：仅对所有WEB APP可见，对TOMCAT不可见（使用Shared类加载器加载）。
/temp：Tomcat运行时候存放临时文件用的。
/webapps：web应用发布目录。
/work：Tomcat把各种由jsp生成的servlet文件放在这个目录下。删除后，启动时会自动创建。

## windows下配置Tomcat环境变量：

0. 找到系统的环境变量设置。 
1. 新建变量名：CATALINA_BASE，变量值：C:\tomcat
2. 新建变量名：CATALINA_HOME，变量值：C:\tomcat
3. 打开PATH，添加变量值：%CATALINA_HOME%\lib;%CATALINA_HOME%\bin;
4. 打开下载的Tomcat文件夹中的<font color="blue">bin</font>文件。

<strong>其中有startup.bat 可执行文件（打开Tomcat服务器）,shutdown.bat(关闭Tomcat服务器)可执行文件。</strong>

5. <font color="red">运行startup.bat 可执行文件</font>，打开浏览器，在地址栏中输入"http://localhost:8080"回车，如果看到Tomcat自带的一个JSP页面，说明你的Tomcat已搭建成功。

