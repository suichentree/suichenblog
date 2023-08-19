---
title: Java面试题总结-事务与反射
date: 2019-11-10
sidebar: 'auto'
categories:
 - 面试
tags:
 - Java
---

[toc]

# Java面试题总结-事务与反射

## 说说你对 Java 反射的理解

在运行状态中，对任意一个类，都能知道这个类的所有属性和方法，对任意一个对象，都能调用它的任意一个方法和属性。这种能动态获取信息及动态调用对象方法的功能称为 java 语言的反射机制。

反射的作用：开发过程中，经常会遇到某个类的某个成员变量、方法或属性是私有的，或只对系统应用开放，这里就可以利用 java 的反射机制通过反射来获取所需的私有成员或是方法。

```
1) 获取类的 Class 对象实例 Class clz = Class.forName("com.zhenai.api.Apple");
2) 根 据 Class 对 象 实 例 获 取 Constructor 对 象 Constructor appConstructor =
clz.getConstructor();
3) 使 用 Constructor 对 象 的 newInstance 方 法 获 取 反 射 类 对 象 Object appleObj =
appConstructor.newInstance();
4) 获取方法的 Method 对象 Method setPriceMethod = clz.getMethod("setPrice", int.class);
5) 利用 invoke 方法调用方法 setPriceMethod.invoke(appleObj, 14);
```

## 事务的 ACID 是指什么，事务的四个特性是什么？

* （1）原子性(Atomic)：事务中各项操作，要么全做要么全不做，任何一项操作的失败都会导致整个事务的失败；
* （2）一致性(Consistent)：事务结束后系统状态是一致的；
* （3）隔离性(Isolated)：并发执行的事务彼此无法看到对方的中间状态；
* （4）持久性(Durable)：事务完成后所做的改动都会被持久化，即使发生灾难性的失败。通过日志和同步备份可以在故障发生后重建数据。

## 反射在spring中的应用

Spring的IOC的实现原理利用的就是Java的反射机制。Spring的工厂类利用反射机制将对象实例化并且把对象注入到spring容器中。

过程：1.通过解析xml文件，获取到id属性和class属性里面的内容。2.利用反射原理获取到配置里面类的实例对象，存入到Spring的bean容器中。 

<font color="red">只要在代码或配置文件中看到类的完整路径（包.类），其底层原理基本上使用的就是Java的反射机制。</font>


## 反射获得一个类的类对象有哪些方式？

* （1）方法 1：类型.class，例如：String.class
* （2）方法 2：对象.getClass()，例如：”hello”.getClass()
* （3）方法 3：Class.forName()，例如：Class.forName(“java.lang.String”)

## 如何通过反射创建对象？通过反射调用对象方法？
方法 1：通过类对象调用 newInstance()方法，例如：String.class.newInstance()

方法 2：通过类对象的 getConstructor()或 getDeclaredConstructor()方法获得构造器（Constructor）对象并调用其 newInstance()方法创建对象。

例如：
```java
String.class.getConstructor(String.class).newInstance(“Hello”);
```

反射调用对象方法：
```java
String str = "hello";
Method m = str.getClass().getMethod("toUpperCase");
System.out.println(m.invoke(str));
// HELLO
```