---
title: Java笔记17-锁
date: 2023-08-24
sidebar: 'auto'
categories: 
 - Java
---

[toc]

# Java笔记17-锁

## 锁的介绍

Java提供了种类丰富的锁，每种锁因其特性的不同，在适当的场景下能够展现出非常高的效率。

> java锁的分类：
- 以锁住的目标分类：对象锁，类锁。


在java程序中，每一个实例化对象都有一个属于该实例化对象的锁。这个锁是互斥的。

## 对象锁（synchronized修饰方法或代码块）

当一个实例化对象中有synchronized 方法或synchronized 代码块的时候。若一个线程执行到实例化对象的同步方法或同步代码时，就必须先获得对象锁。如果该对象的对象锁已被其他线程占用，则需要等待此锁被释放。

线程进入synchronized方法的时候开始获取该对象的锁，若该对象的锁已被其他线程获取，那么当前线程会等待。

当线程执行synchronized方法正常返回或者抛异常的时候，线程会自动释放对象锁。

## 类锁（synchronized 修饰静态方法或静态代码块）

由于一个类不论被实例化多少次，其中的静态方法和静态变量在内存中都只有一份。所以，一旦一个静态方法或静态代码块被synchronized修饰。此类所有的实例化对象在调用此静态方法或静态代码块的时候，会共用同一把锁，这个锁称之为类锁。