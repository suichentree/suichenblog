---
title: Mybatis面试题总结
date: 2019-11-12
sidebar: 'auto'
categories:
 - 面试
tags:
 - Mybatis
---

[toc]

# Mybatis面试题总结

## 什么是Mybatis？

Mybatis是一个半ORM（对象关系映射）框架，它内部封装了JDBC，开发时只需要关注SQL语句
本身，不需要花费精力去处理加载驱动、创建连接、创建statement等繁杂的过程。程序员直接编写原
生态sql，可以严格控制sql执行性能，灵活度高。

MyBatis 可以使用 XML 或注解来配置和映射原生信息，将 POJO映射成数据库中的记录，避免了
几乎所有的 JDBC 代码和手动设置参数以及获取结果集。

通过xml 文件或注解的方式将要执行的各种 statement 配置起来，并通过java对象和 statement
中sql的动态参数进行映射生成最终执行的sql语句，最后由mybatis框架执行sql并将结果映射为java对
象并返回。（从执行sql到返回result的过程）。

## Mybatis有什么优点和缺点？

优点：
* MyBatis 把 sql 语句从业务代码中独立出来，放在单独的 XML 文件中编写，将业务代码与sql语句分离开来。降低了程序的耦合度。并且提供XML标签，支持编写动态SQL语句，并可重用。
* MyBatis 封装了JDBC，可以自动将结果集转换成 Java Bean 对象，大大简化了代码。


缺点：
* MyBatis是基于SQL语句编程，相当灵活，因此 SQL 语句的编写工作量较大，尤其当字段多、关联表多时。
* MyBatis中的 SQL 语句依赖于数据库，从而导致数据库移植性差，无法随意更换数据库。

## MyBatis 与 Hibernate 有哪些不同？

* Hibernate 属于全自动 ORM 框架，Mybatis 是一个 半ORM 框架。
* 使用 Hibernate 查询关联对象或者关联集合对象时，可以根据对象关系模型直接获取，所以它是全自动的。而 Mybatis 在查询关联对象或关联集合对象时，需要手动编写 sql 来完成，所以，称之为半自动 ORM 映射工具。

## #{}和${}的区别是什么？

* #{}是预编译处理，${}是字符串替换。使用#{}可以有效的防止SQL注入，提高系统安全性。
* Mybatis 在处理#{}时，会将 #{}替换为?号，调用 PreparedStatement 的set 方法来赋值；
* Mybatis 在处理${}时，会把 ${}替换成对于的值。类似用 + 号来把参数和sql语句进行拼接。


## 当类的属性名和表中的字段名不一样怎么办？

方法1：可以通过在sql语句中定义字段名的别名，让字段名的别名和类的属性名一致。从而让数据结果集能够转换对应的java bean对象。

方法2： 通过`<resultMap>`标签自定义映射结果集。可以来把字段名和类属性名一一对应。


## 通常一个Mybatis的Xml映射文件，都会写一个Mapper接口与之对应，这个Mapper接口的工作原理是什么？Mapper接口里的方法能重载吗？

Mapper 接口就是Dao接口。在 Mybatis的xml文件中，每一个`<select>`、`<insert>`、`<update>`、`<delete>`标签，都会被解析为一个MapperStatement 对象。

举例：com.mybatis3.mappers.StudentDao.findStudentById，可以唯一找到 namespace 为 com.mybatis3.mappers.StudentDao 下面 id 为findStudentById 的 MapperStatement。

Mapper 接口里的方法，是不能重载的，因为是使用 全限名+方法名 的保存和寻找策略。

Mapper 接口的工作原理是 JDK 动态代理，Mybatis 运行时会使用 JDK动态代理为 Mapper 接口生成代理对象 proxy，代理对象会拦截接口方法，转而执行 MapperStatement 所代表的 sql，然后将 sql 执行结果返回。

## Mybatis 动态 sql 有什么用？执行原理？有哪些动态 sql？

Mybatis 动态 sql 可以让我们在 Xml 映射文件内，以标签的形式编写动态 sql，完成逻辑判断和动态拼接 sql 的功能。

Mybatis 提供了 9 种动态 sql 标签：trim | where | set | foreach | if | choose| when | otherwise | bind。

其执行原理为，从参数对象中获取表达式的值，根据表达式的值动态拼接sql，以此来完成动态 sql 的功能。

## 不同的 Xml 映射文件中，每个sql对应id 是否可以重复？

不同的 Xml 映射文件，如果配置了namespace，那么 id 可以重复；如果没有配置 namespace，那么 id 不能重复；

原因就是 namespace+id 是作为唯一key使用的，如果没有 namespace，就剩下 id，那么id重复会导致数据互相覆盖。有了namespace，namespace 不同，namespace+id 自然也就不同。


## 什么是 MyBatis 的接口绑定？有哪些实现方式？

接口绑定，就是在 MyBatis 中任意定义接口,然后把接口里面的方法和 SQL 语句绑定, 直接调用接口方法就相当于调用接口方法对应的sql语句,

接口绑定有两种实现方式,一种是通过注解绑定，就是在接口的方法上面加上@Select、@Update 等注解，里面包含 Sql 语句来绑定；另外一种就是通过 xml映射文件里面写 SQL 来绑定, 在这种情况下,要指定 xml 映射文件里面的 namespace 必须为接口的全路径名。

当 Sql 语句比较简单时候,用注解绑定, 当 SQL 语句比较复杂时候,用 xml 绑定,一般用 xml 绑定的比较多。

## Mybatis 是如何进行分页的？分页插件的原理是什么？

Mybatis可以在sql内直接书写 limit 关键字来完成分页功能，也可以使用分页插件来完成物理分页。

分页插件的基本原理是拦截待执行的sql，然后重写sql，添加对应的物理分页语句和物理分页参数。

举例：select * from student，拦截 sql 后重写为：select t.* from （select * from student）t limit 0，10

## Mybatis是如何将sql执行结果封装为目标对象并返回的？都有哪些映射形式？

第一种是使用`<resultMap>`标签，自定义数据库字段名和对象属性名之间的映射关系。

第二种是使用sql语句的别名，通过在sql语句中定义查询字段的别名，让别名与类的属性名相同。从而让Mybatis将sql执行结果封装为目标对象并返回。


## MyBatis 实现一对一有几种方式?具体怎么操作的？


实现一对一有联合查询和嵌套查询两种方式。

联合查询是把几个表联合查询,只查询一次, 然后通过在resultMap标签里面配置association节点配置一对一的关系就可以完成；

嵌套查询需要查询两次。主要是先查一个表，根据这个表里面的结果的外键，去再另外一个表里面查询数据,也是通过association配置，但另外一个表的查询通过select属性配置。

## Mybatis是否支持延迟加载？如果支持，它的实现原理是什么？

在Mybatis配置文件中，可以配置是否启用延迟加载。

不过，Mybatis仅支持在一对一关联对象查询和一对多关联查询上的延迟加载。

延迟加载的原理是，当调用目标方法时，进入拦截器方法，比如调用a.getB().getName()，拦截器invoke()方法发现a.getB()是null值，那么就会单独发送事先保存好的查询关联B对象的sql，把B查询上来，然后调用a.setB(b)，于是a的对象b属性就有值了，接着完成a.getB().getName()方法的调用。这就是延迟加载的基本原理。当然了，不光是Mybatis，几乎所有的包括Hibernate，支持延迟加载的原理都是一样的。

总结：延迟加载主要是通过动态代理的形式实现，通过代理拦截到指定⽅法，执⾏数据加载。

## Mybatis 的一级、二级缓存？

MyBatis 的缓存分为一级缓存和二级缓存。

一级缓存放在 session 里面,默认就有,二级缓存放在它的命名空间里,默认是不打开的,使用二级缓存属性类需要实现 Serializable 序列化接口(可用来保存对象的状态),可在它的映射文件中配置`<cache/>`