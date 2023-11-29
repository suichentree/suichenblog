---
title: Spring面试题总结1
date: 2023-08-11
sidebar: 'auto'
categories: 
 - 面试
tags:
 - Spring
---

[toc]

# Spring面试题总结1

## 基础部分

### 什么是 Spring Framework？

Spring是一个轻量级Java开发框架，可以简化Java应用程序的开发。主要是为了降低应用开发的业务逻辑层和其他各层的耦合问题。

之所以能够降低代码与代码之间的耦合问题。主要依赖于它的两个核心特性，也就是依赖注入DI和面向切面AOP。

> Spring Framework主要由以下几个模块组成
```
Spring Core：核心模块，提供IOC功能；
Spring AOP：AOP服务；
Spring DAO：对JDBC的抽象，简化了数据访问异常的处理；
Spring ORM：对现有的ORM框架的支持；
Spring Web：提供了基本的面向Web的综合特性；
Spring MVC：提供面向Web的MVC的实现方式。
Spring TEST：TEST模块主要整合了单元测试和集成测试
```

> 使用spring的好处？

- Spring 通过控制反转功能可以实现程序代码的解耦，简化代码的复杂程度。
- Spring 支持面向切面功能，可以把应用业务逻辑和系统服务分开。
- Spring 的IOC容器功能可以管理程序中的对象。

### 什么是IOC

IOC就是控制反转，以前创建对象的主动权和时机是由自己把控的，而现在由Spring容器根据配置文件去创建实例对象和管理各个实例对象之间的依赖关系。

简而言之，IOC让对象的创建不用去new了，可以由spring自动生产，使用java的反射机制，根据配置文件在运行时动态的去创建对象以及管理对象，并调用对象的方法。

> IOC的好处

- 它将最小化应用程序中的代码量。
- 即通过IOC容器让对象与对象之间实现了松耦合。

### 什么是IOC的实现机制？

Spring 中的 IoC 的实现原理就是工厂模式加反射机制。

```java
//接口Fruit
interface Fruit {
    public abstract void eat();
}

//接口实现类Apple
class Apple implements Fruit {
    public void eat(){
        System.out.println("Apple");
    }
}

//接口实现类Orange
class Orange implements Fruit {
    public void eat(){
        System.out.println("Orange");
    }
}
//工厂类
class BeanFactory {
    public static Fruit getInstance(String ClassName) {
        Fruit f=null;
        try {
            //通过类名，反射出某个对象。该对象可以转换为接口Fruit
            f=(Fruit)Class.forName(ClassName).newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return f;
    }
}
//使用类Test
class Test {
    public static void main(String[] a) {
        //通过工厂模式+反射，来实例化一个对象Fruit
        //此时这个Fruit对象和Test类是松耦合的关系。
        Fruit f=Factory.getInstance("io.github.dunwu.spring.Apple");
        if(f!=null){
            f.eat();
        }
    }
}
```

### 什么是Spring IOC容器？spring 中有多少种 IOC 容器？

IOC容器负责创建对象，管理对象（通过依赖注入（DI），装配对象，配置对象，并且管理这些对象的整个生命周期。

有两种IOC容器，分别是BeanFactory容器和ApplicationContext容器。

* BeanFactory容器 - BeanFactory 就像一个包含 bean 集合的工厂类。它会在客户端要求时实例化 bean。
* ApplicationContext容器  - ApplicationContext 接口扩展了 BeanFactory 接口。它在 BeanFactory 基础上提供了一些额外的功能。例如注解功能。

注意：bean的作用域有singleton(单例)，prototype(普通)，request,session,globalsession。后面3种只有ApplicationContext容器才提供。

### 什么是依赖注入(DI)？

依赖注入是用来维护IOC容器中bean与bean之间的依赖关系。

即bean与bean之间的依赖关系由IOC容器在应用系统运行期来决定，也就是由IOC容器动态地将某种依赖关系的目标对象实例注入到关联的Bean对象之中。

> 可以通过多少种方式完成依赖注入？

1. 构造函数注入。
2. setter注入。


### spring 提供了哪些配置方式？

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

### spring容器中bean的生命周期是什么样的？

生命周期流程: 实例化，初始init，接收请求service，销毁destroy；

### Spring中Bean有几种作用域？

Spring的IOC容器中的bean有5种作用域分别是：singleton、prototype、request、session和globalSession

* singleton 默认的,在IoC容器中仅有一个bean实例。每次请求，都只会拿掉这个bean实例。
* prototype 每次请求，IOC容器会产生一个新的bean实例来提供。
* request 每一次http请求都会产生一个新的bean实例，并且该 bean实例 仅在当前 HTTP 请求内有效。请求完成后，bean实例就会失效。
* session 每一次 HTTP 请求都会产生一个新的bean实例，同时该 bean实例 仅在当前HTTP session 内有效。
* globalSession 作用和session类似，只是使用portlet的时候使用。 


### Spring的自动装配有哪些方式？

bean装配是指在Spring容器中把bean组装到一起。意味着容器不需要和配置，能通过 Bean 工厂自动处理 bean 之间的组装。

* no - 这是默认设置，表示没有自动装配。应使用显式 bean 引用进行装配。
* byName - 它根据 bean 的名称注入对象依赖项。它匹配并装配其属性与 XML文件中由相同名称定义的 bean。
* byType - 它根据类型注入对象依赖项。如果属性的类型与 XML 文件中的一个 bean 名称匹配，则匹配并装配属性。
* constructor - 它通过调用类的构造函数来注入依赖项。根据构造器的参数与类型来从容器中找寻匹配的bean加载。

### Spring框架中的单例bean是线程安全的吗？

spring 中的bean默认是单例模式。单例bean不是线程安全的。

- 有状态就是有数据存储功能。
- 无状态就是不会保存数据。


### @Component, @Controller, @Repository的区别？

- @Component：将java 类标记为bean。然后IOC容器扫描到该注解后，会将这个bean注入到容器中。
- @Controller：将java 类标记为Spring Web MVC 控制器。然后注入到IOC容器中。
- @Service：功能与@Component注解类似。
- @Repository：功能与@Component注解类似。

### @Autowired注解自动装配的过程是怎样的？

当IOC容器扫描到@Autowied、@Resource时，就会在IoC容器自动查找需要的bean对象。然后装配给注解所在对象的属性中。

@Autowired注解首先在容器中查询对应类型的bean对象。 
- 如果查询结果刚好为一个，就将该bean装配给@Autowired指定的数据；
- 如果查询的结果不止一个，那么@Autowired会根据名称来查找；
- 如果上述查找的结果为空，那么会抛出异常。

### @Autowired和@Resource之间的区别

相同点：
* 两个注解都可以写在属性和setter方法上的。这两个注解都与自动装配有关。

不同点：
* @Autowired是按照类型（byType）装配，来注入依赖对象。如果我们想使用按照名称（byName）来装配，可以结合@Qualifier注解一起使用。
* @Resource默认按照ByName自动注入。如果找不到就按照byType的方式自动注入。





## 事务部分

### Spring的事务实现方式有哪些？

Spring支持两种类型的事务管理：
- 编程式事务管理：通过编程的方式管理事务。
- 声明式事务管理：将业务代码和事务管理分离，需用注解和XML配置来管理事务。

> 声明式事务

@Transactional注解标注一个方法。这样的写法相当于在进入方法前，使用BEGIN开启了一个事务，在执行完方法后，使用COMMIT提交事务。

> 编程式事务

在代码中，通过TransactionTemplate工具类来开启事务，提交事务，回滚事务。

### Spring事务的实现方式和实现原理？

Spring事务的本质其实就是数据库对事务的支持，没有数据库的事务支持，Spring是无法提供事务功能的。

真正的数据库层的事务提交和回滚是通过 binlog或者redo log实现的。

### Spring中事务的传播行为

Spring事务的传播级别描述的是：当一个使用了@Transactional注解的方法调用另一个使用@Transactional注解的方法时，Spring如何对多个事务方法进行处理。

> PROPAGATION_REQUIRED

如果当前没有事务，就创建一个新事务，如果当前存在事务，就加入该事务，这是最常见的选择，也是Spring默认的事务传播行为。

> PROPAGATION_SUPPORTS

如果当前存在事务，就加入该事务，如果当前不存在事务，就以非事务执行。如果外围事务回滚，内部事务也要回滚。

> PROPAGATION_MANDATORY

如果当前存在事务，就加入该事务，如果当前不存在事务，就抛出异常。

> PROPAGATION_REQUIRES_NEW

创建新事务，无论当前存不存在事务，都创建新事务。

> PROPAGATION_NOT_SUPPORTED

以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。

> PROPAGATION_NEVER

以非事务方式执行，如果当前存在事务，则抛出异常。

> PROPAGATION_NESTED

如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则按REQUIRED属性执行。


### spring的事务隔离级别？

当多个事务访问相同数据会产生脏写，脏读，幻读，不可重复读等问题。事务的隔离级别就是用于解决这些问题的。

Spring 有五大隔离级别，默认值为 ISOLATION_DEFAULT（使用数据库的设置），其他四个隔离级别和数据库的隔离级别一致。

在spring中通过设置事务的隔离级别，从而可以解决上述问题。

- default 默认隔离级别，是直接使用数据库的事务隔离级别。
- read_uncommited 读未提交隔离级别，最低的隔离级别。用于解决脏写问题。
- read_commited 读已提交隔离级别，用于解决脏写和脏读问题。
- repeatable_read 可重复读隔离级别，用于解决脏写，脏读，不可重复读问题。
- serlalizable 串行化，最高的隔离级别，用于解决脏写，脏读，不可重复度，幻读问题。

注意：隔离级别不是设置的越高越好，隔离级别越高，spring事务的效率越低。

## AOP部分

### 什么是 AOP？

AOP 称为面向切面编程，用于将那些与业务无关的公共行为和逻辑，抽取并封装为一个可重用的模块，这个模块被命名为“切面”（Aspect），减少系统中的重复代码，降低了模块间的耦合度，同时提高了系统的可维护性。可用于权限认证、日志、事务处理等。

### 什么是Aspect切面？

切面就是与业务无关的公共逻辑代码。例如日志，权限认证，事务等。

### 什么是连接点？

连接点就是切面代码需要插入到业务代码的位置。通常情况下连接点是一个方法。

### 什么是切点？

切入点本质上是一个或一组连接点，通知将在这些位置执行。

### 什么是AOP的通知？

Spring切面可以应用5种类型的通知：
1. 前置通知（Before）：在目标方法被调用之前调用通知功能；
2. 后置通知（After）：在目标方法完成之后调用通知，此时不会关心方法的输出是什么；
3. 返回通知（After-returning ）：在目标方法成功执行之后调用通知；
4. 异常通知（After-throwing）：在目标方法抛出异常后调用通知；
5. 环绕通知（Around）：通知包裹了被通知的方法，在被通知的方法调用之前和调用之后执行自定义的行为。

### Spring框架中都用到了哪些设计模式?

* （1）工厂模式：BeanFactory就是简单工厂模式的体现，用来创建对象的实例；
* （2）单例模式：Bean默认为单例模式。
* （3）代理模式：Spring的AOP功能用到了JDK的动态代理和CGLIB字节码生成技术；











## spring事务的实现方式

spring事务的实现方式有两种，分别是编程式事务和声明式事务。

- 编程式事务：通过编程的方式来管理事务，灵活但是难以维护。
- 声明式事务：通过注解和xml配置的方式来管理事务。

## spirng中的AOP有哪些通知类型？

通知是指在方法执行前或执行后要做的动作，实际上是程序执行时要通过 SpringAOP 框架触发的代码段。

Spring 切面可以应用五种类型的通知：
- before 前置通知，在一个方法执行前被调用。
- after 后置通知，在方法执行之后调用的通知，无论方法执行是否成功。
- after-returning 后置成功通知，仅当方法成功完成后执行的通知。
- after-throwing 后置异常通知，在方法抛出异常退出时执行的通知。
- around 环绕通知，在方法执行之前和之后调用的通知。

## spring中的依赖注入是什么？

依赖注入是指不需要你主动创建对象，而是在配置文件中配置你的对象，让容器帮你创建对象，并管理对象。你需要用到对象的时候，直接从容器中取出对象即可。

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


