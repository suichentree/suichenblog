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

## Spring bean的作用域有什么区别？

Spring的 bean有5种作用域分别是：singleton、prototype、request、session和globalSession

* singleton 每个 Spring IoC 容器仅有一个单实例
* prototype 每次请求调用产生一个新的实例。
* request 每一次 HTTP 请求都会产生一个新的实例，并且该 bean 仅在当前 HTTP 请求内有效。
* session 每一次 HTTP 请求都会产生一个新的 bean，同时该 bean 仅在当前HTTP session 内有效。
* globalSession 作用和session类似，只是使用portlet的时候使用。 

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

## Spring 支持的事务管理类型

Spring 支持两种类型的事务管理，分别是编程式事务和声明式事务。

## 什么是 AOP？

面向切面的编程，或 AOP，是一种编程技术，允许程序模块化横向切割关注点，或横切典型的责任划分，如日志和事务管理。

## 什么是 Aspect切面？

AOP，一般称为面向切面。AOP可以把那些与业务无关，但却对业务有一定影响的公共行为和逻辑，封装为一个模块，这个模块被命名为“切面”（Aspect），减少系统中的重复代码，降低了模块间的耦合度，同时提高了系统的可维护性。


## 什么是连接点？

连接点代表一个应用程序的某个位置，在这个位置我们可以插入一个 AOP 切面，它实际上是个应用程序执行 SpringAOP 的位置。

简而言之，连接点就是切面切入到其他代码的位置。

## 什么是切点？

切入点本质上是一个或一组连接点，通知将在这些位置执行。

## 通知？

通知是个在方法执行前或执行后要做的动作，实际上是程序执行时要通过 SpringAOP 框架触发的代码段。

Spring 切面可以应用五种类型的通知：
- before：前置通知，在一个方法执行前被调用。
- after:在方法执行之后调用的通知，无论方法执行是否成功。
- after-returning:仅当方法成功完成后执行的通知。
- after-throwing:在方法抛出异常退出时执行的通知。
- around:在方法执行之前和之后调用的通知。

## Spring中@Autowired和@Resource的区别？

* @Autowired是按照类型（byType）装配依赖对象。默认情况下它要求依赖对象必须存在，如果允许null值，可以设置它的required属性为false。如果我们想使用按照名称（byName）来装配，可以结合@Qualifier注解一起使用。

* @Resource默认按照ByName自动注入。如果找不到就按照byType的方式自动注入。

## 依赖注入的方式有几种，分别是什么?

一、构造器注入
* 将被依赖对象通过构造函数的参数注入给依赖对象，并且在初始化对象的时候注入。
* 优点：对象初始化完成后便可获得可使用的对象。
* 缺点：当需要注入的对象很多时，构造器参数列表将会很长；不够灵活。若有多种注入方式，每种方式只需注入指定几个依赖，那么就需要提供多个重载的构造函数，麻烦。

二、setter方法注入
* IoC Service Provider通过调用成员变量提供的setter函数将被依赖对象注入给依赖类。
* 优点：灵活。可以选择性地注入需要的对象。
* 缺点：依赖对象初始化完成后由于尚未注入被依赖对象，因此还不能使用

三、接口注入
* 依赖类必须要实现指定的接口，然后实现该接口中的一个函数，该函数就是用于依赖注入。该函数的参数就是要注入的对象
* 优点接口注入中，接口的名字、函数的名字都不重要，只要保证函数的参数是要注入的对象类型即可。
* 缺点：侵入行太强，不建议使用。

## Spring框架中都用到了哪些设计模式?

* （1）工厂模式：BeanFactory就是简单工厂模式的体现，用来创建对象的实例；
* （2）单例模式：Bean默认为单例模式。
* （3）代理模式：Spring的AOP功能用到了JDK的动态代理和CGLIB字节码生成技术；

