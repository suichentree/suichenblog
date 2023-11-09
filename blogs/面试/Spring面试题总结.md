---
title: Spring面试题总结
date: 2023-08-11
sidebar: 'auto'
categories: 
 - 面试
tags:
 - Spring
---

[toc]

# Spring面试题总结

## 什么是 Spring Framework？

Spring 是一款轻量级的开源框架，它的目标就是要简化 Java 企业级应用程序的开发。它使得开发者只需要关心业务需求。常见的配置方式有基于XML的配置、基于注解的配置。

主要由以下几个模块组成

```
Spring Core：核心模块，提供IOC功能；
Spring AOP：AOP服务；
Spring DAO：对JDBC的抽象，简化了数据访问异常的处理；
Spring ORM：对现有的ORM框架的支持；
Spring Web：提供了基本的面向Web的综合特性；
Spring MVC：提供面向Web的MVC的实现方式。
Spring TEST：TEST模块主要整合了单元测试和集成测试
```


## 使用spring的好处？

- Spring 通过控制反转功能可以实现程序代码的解耦，简化代码的复杂程度。
- Spring 支持面向切面功能，可以把应用业务逻辑和系统服务分开。
- Spring 的IOC容器功能可以管理程序中的对象。

## 什么是IOC

IOC就是控制反转，以前创建对象的主动权和时机是由自己把控的，而现在由Spring容器根据配置文件去创建实例对象和管理各个实例对象之间的依赖关系。

简而言之，IOC让对象的创建不用去new了，可以由spring自动生产，使用java的反射机
制，根据配置文件在运行时动态的去创建对象以及管理对象，并调用对象的方法。

## 什么是Spring IOC容器？spring 中有多少种 IOC 容器？

IOC容器负责创建对象，管理对象（通过依赖注入（DI），装配对象，配置对象，并且管理这些对象的整个生命周期。有两种IOC容器，分别是BeanFactory容器和ApplicationContext容器。

* BeanFactory容器 - BeanFactory 就像一个包含 bean 集合的工厂类。它会在客户端要求时实例化 bean。
* ApplicationContext容器  - ApplicationContext 接口扩展了 BeanFactory 接口。它在 BeanFactory 基础上提供了一些额外的功能。例如注解功能。

> ApplicationContext的实现方式？

ApplicationContext 容器已经包括 BeanFactory 容器的所有功能，通常不使用BeanFactory容器

ApplicationContext的实现方式：

```java
//1. ClassPathXmlApplicationContext：根据classpath中的xml配置文件来读取配置，并生成上下文对象
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

//2. FileSystemXmlApplicationContext 从文件系统中读取xml配置文件，来生成上下文对象。
ApplicationContext context = new FileSystemXmlApplicationContext("applicationContext.xml");

//3. WebXmlApplicationContext 会从web 应用程序的范围内加载在xml配置文件
```

## spring 提供了哪些配置方式？

1. 基于 xml 配置
bean 所需的依赖项和服务在 XML 格式的配置文件中指定。这些xml配置文件通常包含许多bean定义和配置选项。它们通常以bean标签开头。
例如：
```xml
<bean id="studentbean" class="org.edureka.firstSpring.StudentBean"> 
    <property name="name" value="Edureka"></property>
</bean>
```

2. 基于注解配置
可以通过在相关的类，方法或字段声明上使用注解，将 bean 配置为组件类本身，而不是使用 XML 来描述 bean 装配。**默认情况下Spring 容器中未打开注解装配。因此需要在使用它之前在 Spring 配置文件中启用它。**
例如：开启注解配置
```xml
<beans>
    <context:annotation-config/>
</beans>
```



## spring容器中bean的生命周期是什么样的？

生命周期流程: 实例化，初始init，接收请求service，销毁destroy；

## Spring基于xml注入bean的几种方式

基于xml配置文件的依赖注入方式有: setter注入，构造方法注入。

## Spring的自动装配有哪些方式？

bean装配是指在Spring容器中把bean组装到一起。意味着容器不需要和配置，能通过 Bean 工厂自动处理 bean 之间的组装。

* no - 这是默认设置，表示没有自动装配。应使用显式 bean 引用进行装配。
* byName - 它根据 bean 的名称注入对象依赖项。它匹配并装配其属性与 XML文件中由相同名称定义的 bean。
* byType - 它根据类型注入对象依赖项。如果属性的类型与 XML 文件中的一个 bean 名称匹配，则匹配并装配属性。
* constructor - 它通过调用类的构造函数来注入依赖项。根据构造器的参数与类型来从容器中找寻匹配的bean加载。


## 什么是 AOP？

面向切面的编程，或 AOP，是一种编程技术，允许程序模块化横向切割关注点，或横切典型的责任划分，如日志和事务管理。

## 什么是 Aspect切面？

AOP，一般称为面向切面。AOP可以把那些与业务无关，但却对业务有一定影响的公共行为和逻辑，封装为一个模块，这个模块被命名为“切面”（Aspect），减少系统中的重复代码，降低了模块间的耦合度，同时提高了系统的可维护性。


## 什么是连接点？

连接点代表一个应用程序的某个位置，在这个位置我们可以插入一个 AOP 切面，它实际上是个应用程序执行 SpringAOP 的位置。

简而言之，连接点就是切面切入到其他代码的位置。

## 什么是切点？

切入点本质上是一个或一组连接点，通知将在这些位置执行。


## Spring框架中都用到了哪些设计模式?

* （1）工厂模式：BeanFactory就是简单工厂模式的体现，用来创建对象的实例；
* （2）单例模式：Bean默认为单例模式。
* （3）代理模式：Spring的AOP功能用到了JDK的动态代理和CGLIB字节码生成技术；

