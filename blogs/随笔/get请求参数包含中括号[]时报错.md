---
title: Get请求的参数包含中括号[]时，报错400
date: 2022-06-13
sidebar: 'auto'
categories:
 - 随笔
---


## get请求的参数包含中括号[]时，报错400

> 问题描述

当上传下载文件 abc[123].xlsx 时，报错400。但是只有此文件上传下载时会报错，其他文件是正常的。经排查最终发现是由于文件名包含中括号[]导致请求的错误。

> 问题分析

经百度，发现是由于tomcat版本过高导致的。tomcat9(9.022)有一个新特性如下：

严格按照 RFC 3986规范进行访问解析，而 RFC 3986规范定义了Url中只允许包含英文字母（a-zA-Z）、数字（0-9）、-_.~4个特殊字符以及所有保留字符

因为get请求的参数是拼接在url后面的，所以参数中只要包含 [ 或 ] 都会报错400。


> 总结

tomcat高版本中，不允许url中有特殊字符。当请求的url地址中会包括特殊字符[ 和 ] ，被tomcat直接拦下，报错400。

解决方法：
1. 用低版本的tomcat，tomcat 7.0.76之前的版本不会出现这个问题

2. 修改高版本tomcat的配置。修改tomcat目录底下的/conf/server.xml

```
打开tomcat目录底下/conf/server.xml
往Connector中添加relaxedQueryChars和relaxedPathChars,直接复制下面的relaxedQueryChars和relaxedPathChars即可。
<Connector port="xxx" relaxedQueryChars="[]|{}-^\`<>" relaxedPathChars="[]|{}-^\`<>"/>
```

3. 把拼在url后面的参数，用encodeURI()转换














