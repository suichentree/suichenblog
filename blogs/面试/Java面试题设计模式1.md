---
title: Java面试题-设计模式
date: 2019-11-10
sidebar: 'auto'
categories:
 - 面试
tags:
 - Java
---

[toc]

## Java面试题-设计模式

### 1.简述一下你了解的设计模式?
设计模式，就是一套被反复使用的代码设计经验的总结（情境中一个问题经过证实的一个解决方案）。使用设计模式是为了可重用代码、让代码更容易被他人理解、保证代码可靠性。

### 2.用 Java 写一个单例模式类?

* （1）饿汉式单例
```java
public class Singleton {
	private Singleton(){}
	private static Singleton instance = new Singleton();
	public static Singleton getInstance(){
		return instance;
	}
}
```
* （2）懒汉式单例
```java
public class Singleton {
	private static Singleton instance = null;
	private Singleton() {}
	public static synchronized Singleton getInstance(){
		if (instance == null) instance ＝ new Singleton();
		return instance;
	}
}
```

**注意：实现一个单例模式有两点注意事项，①将构造器私有，不允许外界通过构造器创建对象；②通过公开的静态方法向外界返回类的唯一实例。**
