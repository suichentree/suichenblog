---
title: Java中常见的对象类型简述-(DO、BO、DTO、VO、AO、PO)
date: 2020-12-03
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Java
---

# Java中常见的对象类型简述-(DO、BO、DTO、VO、AO、PO)

## PO(Persistant Object) 持久对象
一个PO就是数据库中的一条记录,用于表示数据库中的一条记录映射成的 java 对象。PO仅仅用于表示数据，没有任何数据操作。通常遵守 Java Bean 的规范，拥有 getter/setter 方法。

好处是可以将一条记录最为一个对象处理，PO可以方便转化为其他对象

## VO(View Object) 视图对象
ViewObject视图对象。主要对应界面显示的数据对象。对于一个WEB页面，用一个VO对象对应整个界面的值。

<font color="red">注意VO只包含前端需要展示的数据，对于前端不需要的数据，比如数据创建和修改的时间等字段，出于减少传输数据量大小和保护数据库结构不外泄的目的，不应该在 VO 中体现出来。通常遵守 Java Bean 的规范，拥有 getter/setter 方法。</font>


## DTO(Data Transfer Object) 数据传输对象
比如一张表有100个字段，则对应的PO就有100个属性。但是界面上只显示10个字段，没有必要把整个PO对象传递到界面，这时就可以用只有这10个属性的DTO来传递结果到界面，<font color="red">这样不会暴露服务端表结构.如果用这个对象来对应界面显示，那此时它的身份就转为VO.</font>

DTO 通常用于不同服务或服务不同分层之间的数据传输。DTO 与 VO 概念相似，并且通常情况下字段也基本一致。但 DTO 与 VO 又有一些不同，比如 API 服务需要使用的 DTO 就可能与 VO 存在差异。通常遵守 Java Bean 的规范，拥有 getter/setter 方法。

## BO(Business Object) 业务对象
主要作用是把业务逻辑封装为一个对象。这个对象可以包括一个或多个其它的对象。

比如一个简历，有教育经历、工作经历、社会关系等等。可以把教育经历对应一个PO，工作经历对应一个PO，社会关系对应一个PO。建立一个对应简历的BO对象处理简历，每个BO包含这些PO。这样处理业务逻辑时，我们就可以针对BO去处理。

## DAO(Data access object) 数据访问对象
DAO用来封装对数据库的访问。通过它可以把POJO持久化为PO，用PO组装出来VO、DTO；

用于表示一个数据访问对象。使用 DAO 访问数据库，包括插入、更新、删除、查询等操作，与 PO 一起使用。DAO一般在持久层，完全封装数据库操作，对外暴露的方法使得上层应用不需要关注数据库相关的任何信息。

## POJO(Plain ordinary java object) 简单java对象
一个POJO持久化以后就是PO；直接用它传递、传递过程中就是DTO；直接用来对应表示层就是VO。