---
title: java实体类为什么要序列化
date: 2024-04-10
sidebar: 'auto'
categories: 
 - 随笔
tags:
 - Java
---

[toc]

# java实体类为什么要序列化

> 什么是序列化和反序列化？

- 序列化：把java对象转换为字节序列的过程称为对象的序列化。
- 反序列化：把字节序列恢复为java对象的过程称为对象的反序列化。

例如当后端向前端发送响应消息时。我们通常会将java对象转化为Json数据，然后发送给前端。而这种java对象转化为Json字符串的过程就是序列化。反过来, 从 Json字符串转换成 Java 对象的过程就是反序列化的过程。


> 为什么序列化需要 implements Serialzable?

- 一个类只有实现了 Serializable 接口，它的实例化对象才是可序列化的。因此如果要序列化类的对象，类就必须实现 Serializable 接口。而实际上，Serializable 的源码是一个空接口，没有什么具体内容，它的目的只是简单的标识一个类的对象可以被序列化。
- serialization 允许你将实现了 Serializable 接口的对象转换为字节序列，这些字节序列可以被完全存储起来，以备以后重新生成原来的对象。

> 什么时候需要用到序列化？

当需要把一个 Java 对象中的各个信息保存到文件或者是数据库的时候。这个时候通常会把java对象进行序列化，从而方便保存java对象。

> 为什么要显示声明 serialVersionUID

serialVersionUID 的作用是验证java对象在序列化和反序列化的过程中，java对象是否保持一致(即java对象是否发生改变)。所以在一般情况下我们需要显示的声明serialVersionUID。

如果java对象在序列化和反序列化的过程中被修改了。那么serialVersionUID的数值就会发生改变。从而导致java报错，InvalidClassException 错误。

```java
//Student类实现Serializable接口。
//并且显示声明 serialVersionUID
public class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    //....
}
```