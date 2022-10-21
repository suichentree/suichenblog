---
title: lombok的使用
date: 2021-03-19
sidebar: 'auto'
categories: 
 - 后端
 - 随笔
tags:
 - Java
---

lombok可以帮助我们减少一些重复java代码的编写。例如get，set,toString方法等

>1. 添加lombok依赖

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.16.18</version>
    <scope>provided</scope>
</dependency>
```

`<scope>provided</scope>`，说明它只在编译阶段生效，不需要打入包中。Lombok在编译期将把带Lombok注解的Java文件正确编译为完整的Class文件。

>2. lombok常用注解

```java
@Getter
@Setter  
//作用类上，生成所有成员变量的getter/setter方法；
//作用于成员变量上，生成该成员变量的getter/setter方法。

@ToString
//作用于类，覆盖默认的toString()方法

@EqualsAndHashCode
//作用于类，覆盖默认的equals和hashCode

@NonNull
//作用于成员变量和参数中，标识不能为空，否则抛出空指针异常。

@NoArgsConstructor
//生成无参构造器；

@RequiredArgsConstructor
//生成包含final和@NonNull注解的成员变量的构造器；

@AllArgsConstructor
//生成全参构造器

@Builder
//作用于类上，将类转变为建造者模式

@Data
//作用于类上，是以下注解的集合：@ToString @EqualsAndHashCode @Getter @Setter @RequiredArgsConstructor
```