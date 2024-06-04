---
title: Junit基础
date: 2017-06-12
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Junit
---

[toc]

# Junit基础

## 概述

JUnit促进“先测试再编码”，它强调建立测试数据的一段代码可以被测试，先测试再编码实现的想法。这种做法就像是“试了一下，码了一点，测试了一下，再码一点点......”这增加了程序员的工作效率和程序代码的稳定性，减少程序员的压力和花在调试的时间。

## 1. @After,@Before,@Test
<font color="red">在运行@Test 注解标记的方法时，会先运行 ：
 @Before标记的方法——>@Test标记的方法——>@After标记的方法
 相当于达到面向切面的效果。</font>

```java
package com.test;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
public class junit {
		
	@Before
	public void init(){
		System.out.println("this is  init ");	
	}
	
	@After
	public void destory(){
		System.out.println("this is  destory");
	}
	
	
	@Test
	public void test1(){
		System.out.println("this  is test1 center");
	}
	
	
	@Test
	public void test2(){
		System.out.println("this  is test2  center");
	}
}

```

运行结果：
> 执行test1方法的运行结果：
> this is  init 
> this  is test1 center
> this is  destory

> 执行test2方法的运行结果：
> this is  init 
> this  is test2  center
> this is  destory