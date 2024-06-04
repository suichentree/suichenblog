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
2. SUN公司希望通过JPA规范，把数据持久层的代码和数据库解耦，从而做到不改变代码就可以无损切换数据库。

> JPA的特性

1. JPA规范提供了对象关系映射。即类和数据库表的互相映射关系。并通过xml文本或注解的方式来维护这种关系。
2. JPA规范提供了一系列API接口。通过这些接口，可以很方便的执行CRUD操作。
3. JPA规范提供了JPQL查询语言。该语言可以使用面向对象的方式来查询数据。

> JPA 和 JDBC 的区别？

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


> 什么是 Spring Data JPA ？

Spring Data JPA 是 spring公司提供的一套简化JPA开发的框架。如果按照约定好的JPA规范去写数据持久层（Repository层，Dao层）的接口代码。就可以在不写接口实现的情况下，实现对数据库的访问和操作。同时提供很多额外功能，如分页，排序，复杂查询等。

简而言之，Spring Data JPA 可以让我们不用写数据持久层的具体实现代码。极大的提高开发者的工作效率。

推荐使用 Spring Data JPA + ORM框架 (Hibernate) 组合。

> Spring Data JPA 与 JPA 与 Hibernate 的关系

JPA是一种规范，Hibernate是一个实现了JPA规范的ORM框架，Spring Data JPA是对JPA规范的再次封装的框架，并实现了更多可用的功能。

如图所示
![spring_data_jpa_2.png](../blog_img/springdata_img_spring_data_jpa_2.png)

## Spring Boot 整合 Spring Data JPA

1. 新建一个spring boot 工程。
2. 在pom文件中导入JPA依赖,数据库驱动依赖

```xml
<!--web 依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
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
<!--测试依赖（可选）-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

此处没有添加依赖版本号，主要是因为Spring Boot 内部已经指定了JPA依赖,数据库驱动依赖的版本号了。

另外自 Spring Boot 2.7.8 起，mysql驱动依赖的改为`mysql-connector-j`了。

spring-data-JPA依赖内部默认使用了 Hibernate依赖 作为 JPA规范的实现。因此导入spring-data-JPA依赖，相当于也导入了 Hibernate 依赖。

<font color="red">注意：目前最新的springboot，hibernate等依赖包都是基于JDK17的，因此最好将项目工程中依赖的JDK版本调整到JDK17以上。</font>

3. 在application.properties配置文件中添加配置

```properties
#数据库配置
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/shuyx_website_db?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC
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

`spring.jpa.hibernate.ddl-auto`表生成策略配置比较重要。可选值如下。
- create: 不管表是否存在，每次启动都会重新建表（会导致数据丢失）。
- none：每次启动程序，不进行任何操作。
- update：每次启动程序，若表不存在则创建。若表存在，则检查表是否更新（不会删除已经存在的数据）。
- validate：启动的时候验证数据表的结构。验证不通过，启动不成功。


在开发阶段中，通常使用update。在生产阶段建议使用 none，手动维护数据表结构，以避免不小心修改了实体对象后导致表结构被修改，甚至是数据丢失。


4. 创建实体类，并用注解配置实体类 (相当于 Entity 层)

创建entity包，并创建SysUserEntity类

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
    @Column("user_name")
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
	
    // 无参，有参构造函数等
	// get set 等方法....
}

```

- 注意实体类中必须包含无参构造函数。
- @Entity 注解用于表示这个类是一个实体类。
- @Table 注解用于指定了实体在数据库中所对应的表名称。
- @Id 注解用于指定 ID 主键字段
- @GeneratedValue(strategy = GenerationType.IDENTITY) 注解指定了 ID 主键字段值的生成方式，其中 GenerationType.IDENTITY 表示主键由数据库自动生成（自增）。
- @Column 注解表示类的属性和表的字段列的映射关系。如果@Column 注解设置了name属性，则表的列名是name属性的值。


5. 创建Repository 接口 (相当于 Dao 层)

创建repository包，并创建SysUserRepository接口，并且继承JpaRepository接口。

```java
@Repository
public interface SysUserRepository extends JpaRepository<SysUserEntity, Long> {

}
```

- 使用@Repository注解表示这是一个 Repository 接口。
- 通过继承 JpaRepository接口。可以获得已经预定义的各种 CRUD 方法。

6. 配置启动类

之后需要在启动类上定义 `@EnableJpaRepositories`注解和`@EntityScan` 注解，分别指定 repository接口 和实体类所在的包。

```java
@SpringBootApplication
// 实体所在的包
@EntityScan(basePackages = "com.example.hibernatedemo.entity") 
// repository 所在的包
@EnableJpaRepositories(basePackages = "com.example.hibernatedemo.repository")  
public class HibernateDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(HibernateDemoApplication.class, args);
    }
}
```


7. 编写单元测试
```java
@SpringBootTest
class HibernateDemoApplicationTests {

    @Autowired
    private SysUserRepository sysUserRepository;

    @Test
    void contextLoads() {
        SysUserEntity one = new SysUserEntity();
        one.setUserName("xiaohong");
        one.setPassWord("123456");

        //新增操作
        SysUserEntity save = sysUserRepository.save(one);
        System.out.println("save="+save);

        //通过save方法来实现更新操作
        one.setEmail("xxx@xxx.com");
        one.setPassWord("456789");
        sysUserRepository.save(one);
        System.out.println("save2="+save);

        //查询操作
        Optional<SysUserEntity> s = sysUserRepository.findById(one.getId());
        System.out.println("s="+s);

        //删除操作
        sysUserRepository.delete(one);
    }
}

```

在单元测试类中，创建一个SysUserEntity对象，然后调用SysUserRepository的各个方法，将对象作为方法参数传入其中。

Spring Data JPA 会把Repository接口的各个方法会转换为对应的SQL语句，并让数据库表去执行。

执行日志如图所示。

![spring_data_jpa_20240603234433.png](../blog_img/spring_data_jpa_20240603234433.png)

8. 总结

- 当程序启动后,由于配置中的表生成策略是update,因此Spring Data JPA 或者说 Hibernate 会自动在对应的数据库中创建/更新表。

如图所示，是Hibernate自动创建的表
![spring_data_jpa_20240604111656.png](../blog_img/spring_data_jpa_20240604111656.png)

- Repository接口的各种方法，Spring data jpa 会将其转换为对应的SQL语句，然后传递给数据库执行。因此执行各种CRUD方法，就相当于在执行各种SQL语句。

## Repository 接口

Repository 接口是Spring Data JPA的核心概念。Repository 接口的作用是减少
数据持久层（dao层）的代码量。

常用的 Repository 接口如下
- CrudRepository接口
- 



如下是CrudRepository接口中的方法

```java
// save方法用来新增和更新。
//当实体对象参数没有主键id值的时候，就是新增。插入数据库后，新增的主键id字段值会与返回值一起返回。
//当实体对象参数有主键id值的时候，就是更新。
<S extends T> S save(S entity);

//传入实体对象集合，批量插入数据到数据库中
<S extends T> Iterable<S> saveAll(Iterable<S> entities);

//通过主键字段查询数据
Optional<T> findById(ID id);

// 通过主键字段查询数据是否存在
boolean existsById(ID id);

//查询所有数据
Iterable<T> findAll();

//传入实体对象集合，批量查询数据
Iterable<T> findAllById(Iterable<ID> ids);

//查询表的数据总量
long count();

//根据主键字段id，删除数据
void deleteById(ID id);

//传入实体对象，删除数据
void delete(T entity);

//传入id集合，批量删除多个数据
void deleteAllById(Iterable<? extends ID> ids);

//传入实体对象集合，批量删除多个数据
void deleteAll(Iterable<? extends T> entities);

//删除所有数据
void deleteAll();
```
