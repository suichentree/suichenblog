---
title: Spring Data JPA笔记
date: 2024-06-01
sidebar: 'auto'
categories: 
 - 后端
tags:
 - SpringDataJPA
---

[toc]

# Spring Data JPA笔记

Spring Data JPA 是 Spring Data 框架中的一个子模块。

## Spring Data JPA 介绍

> JDBC的缺点？

由于JDBC是直接通过编写SQL语句来访问数据库的。但是不同的数据库的SQL语句是不通用的。

如果项目中需要更换数据库的话，那么项目中的SQL语句也需要进行更换，部分业务代码也需要更换。

因此使用JDBC会导致项目中的业务代码和数据持久层的耦合度过高。项目无法无损替换数据库。

最终SUN公司推出了JPA规范。用于将业务代码和数据持久层的代码（操作数据库的代码）进行解耦。

> 什么是JPA？

<font color="red">JPA 全称 Java Persistence API（java 持久性 API）。是 sun 公司提出的一个ORM （对象关系映射）规范。</font>

JPA规范的作用：
1. 简化数据持久层的操作，让开发者从JDBC的SQL语句脱离出来，以面向对象的方式来操作数据库。
2. SUN公司希望通过JPA规范，来将数据持久层的代码和数据库解耦，从而做到代码可以无损切换数据库。

> JPA的特性

1. JPA规范提供了对象关系映射。即类和数据库表的互相映射关系。并通过xml文本或注解的方式来维护这种关系。
2. JPA规范提供了一系列API接口。通过这些接口，可以很方便的执行CRUD操作。
3. JPA规范提供了JPQL查询语言。该语言可以使用面向对象的方式来查询数据。

> JPA 和 JDBC的区别？

相同点：
1. JDBC和JPA 都是一组规范接口。
2. JDBC和JPA 都是由SUN公司推出的。

不同点:
1. JPA是在JDBC的基础上进行封装的。JPA也需要依赖JDBC。
1. JDBC是由各个数据库厂商实现的。JPA是由各个ORM框架来实现的。
2. java 通过JDBC来直接操作数据库。JDBC通过执行SQL语句来直接操作数据库。
3. java 通过 JPA 来直接操作各个ORM框架。JPA用面向对象的方式，通过ORM框架来生成SQL语句，然后进行数据库的操作。

简而言之：
- JDBC -> 执行SQL -> 操作数据库
- JPA -> ORM框架 -> 生成SQL -> 调用JDBC -> 执行SQL -> 操作数据库

> 为什么需要JPA规范？

JPA规范的出现，其目的是统一各种ORM框架，包括著名的Hibernate、TopLink等。

当开发者实现一套JPA规范的代码后，代码底层的ORM框架可以任意切换：觉得Hibernate好的，可以选择Hibernate的JPA规范实现；觉得TopLink好的，可以选择TopLink的JPA规范实现……这样开发者可以避免为使用Hibernate学习一套ORM框架，为使用TopLink又要再学习一套ORM框架。

简而言之就是写一套JPA规范的代码，但是代码底层的ORM框架可以随时更换。

> JPA和Hibernate的关系

注意JPA不是ORM框架，而是一种 ORM 接口规范。

因此JPA规范的具体实现则由各个ORM框架来具体实现。

例如：Hibernate这个ORM框架就实现了JPA规范。

如图所示
![spring_data_jpa_1.png](../blog_img/springdata_img_spring_data_jpa_1.png)


> Spring Data JPA 与 JPA 的关系

JPA是一种规范，Hibernate是一个实现了JPA规范的框架，Spring Data JPA是对JPA规范的Repository层的再次封装，并实现了更多可用的接口。最后底层具体实现用了Hibernate。

另外不同的ORM框架实现JPA规范的代码还是有一些差异的。如果我们要更换ORM框架，那么还是需要更改一些代码的。而<font color="red">Spring Data Jpa能够方便大家在不同的ORM框架中间进行切换而不要更改代码。并且Spring Data Jpa 对 Repository层封装的很好，可以省去不少的麻烦。</font>

如图所示
![spring_data_jpa_2.png](../blog_img/springdata_img_spring_data_jpa_2.png)

## Spring Boot 整合 Spring Data jpa 

1. 新建一个spring boot 工程
2. 在pom文件中导入JPA依赖,数据库驱动依赖

```xml
<!--JPA依赖-->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<!-- MySQL连接驱动依赖 -->
<dependency>
	<groupId>com.mysql</groupId>
	<artifactId>mysql-connector-j</artifactId>
</dependency>
```

此处没有添加依赖版本号，主要是因为Spring Boot 内部已经指定了JPA依赖,数据库驱动依赖的版本号了。

另外自 Spring Boot 2.7.8 起，mysql驱动依赖的改为`mysql-connector-j`了。

spring-data-JPA依赖内部默认使用了 Hibernate依赖 作为 JPA规范的实现。因此导入spring-data-JPA依赖，相当于也导入了 Hibernate 依赖。


3. 在配置文件中添加配置

```properties
#数据库配置
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=123456

#JPA 配置
spring.jpa.database=MySQL
#是否显示SQL
spring.jpa.show-sql=true
spring.jpa.generate-ddl=true
#表生成策略，默认为none。update会实时更新表。create 每次创建表
spring.jpa.hibernate.ddl-auto=update

```

4. 创建实体类，并用注解配置实体类

```java
import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="sys_user")
public class SysUserEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)     // id字段使用数据库自增
    private Long id;                        //用户id
    @Column
    private String userName;                //用户名称
    @Column
    private String passWord;                //密码
    @Column
    private String gender;                 //性别 男‘0’女‘1’
    @Column
    private String email;                   //邮箱
    @Column
    private String phone;                   //电话
    @Column
    private String status;                 //用户状态 正常0 禁用1
	
	// get set 等方法....
}

```


- @Entity 注解用于表示这个类是一个实体类。
- @Table 注解用于指定了实体在数据库中所对应的表名称。
- @Id 注解用于指定 ID 主键字段
- @GeneratedValue(strategy = GenerationType.IDENTITY) 注解指定了 ID 主键字段值的生成方式，其中 GenerationType.IDENTITY 表示主键由数据库自动生成（自增）。
- @Column 注解表示类的属性和表的字段列的映射关系。






