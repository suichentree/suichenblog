---
title: Java面试题-jdbc/反射
date: 2019-11-10
sidebar: 'auto'
categories:
 - 面试
tags:
 - Java
---

[toc]

## Java面试题-jdbc/反射

### 1.JDBC 操作数据库的步骤?
（1）  加载JDBC驱动
（2）  建立并获取数据库连接
（3）  创建 JDBC Statements 对象
（4）  设置SQL语句的传入参数
（5）  执行SQL语句并获得查询结果
（6）  对查询结果进行转换处理并将处理结果返回
（7）  释放相关资源（关闭Connection，关闭Statement，关闭ResultSet）

下面的代码以连接Mysql数据库为例，演示 JDBC 操作数据库的步骤。

1. 加载驱动
```java
Class.forName("com.mysql.jdbc.Driver");
```
2.  创建连接
```java
String url = "jdbc:mysql://127.0.0.1:3306/TestDataBase1";
String user = "root";
String password = "root";
Connection connection = DriverManager.getConnection(url, user, password);
```
3. 创建语句并执行
```java
PreparedStatement ps = connection.prepareStatement("select * from A where age between ? and ?");
ps.setint(1, 10);
ps.setint(2, 30);
ResultSet rs = ps.executeQuery();
```
4. 处理结果
```java
while (rs.next()) {
    String userName = rs.getString("username");
    String realname = rs.getString("realname");
}
```
5. 关闭资源
```java
finally {
	if(connection != null) {
		try {
			connection.close();
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
```

下面是完整代码：

```java
public class JdbcDemo {
  //加载JDBC驱动配置,创建数据库连接对象
  private Connection getConnection() {
    Connection connection = null;
    try {
      Class.forName("com.mysql.jdbc.Driver");
      String url = "jdbc:mysql://127.0.0.1:3306/imooc";
      String user = "root";
      String password = "root";
      connection = DriverManager.getConnection(url, user, password);

    } catch (Exception e) {
      e.printStackTrace();
    }
    return connection;
  }
  public UserInfo getRole(Long id) throws SQLException {
    //获取数据库连接对象
    Connection connection = getConnection();
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
        //创建Statement或PreparedStatement对象（每一个Statement或PreparedStatement为一次数据库执行请求）
      ps = connection.prepareStatement("select * from user_info where id = ?");
      //传参
      ps.setLong(1, id);
      //执行sql语句
      rs = ps.executeQuery();
       //处理查询结果
      while (rs.next()) {
        Long roleId = rs.getLong("id");
        String userName = rs.getString("username");
        String realname = rs.getString("realname");
        UserInfo userInfo = new UserInfo();
        userInfo.id = roleId.intValue();
        userInfo.username = userName;
        userInfo.realname = realname;
        return userInfo;
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      //关闭数据库连接对象以及其他
      connection.close();
      ps.close();
      rs.close();
    }
    return null;
  }
  public static void main(String[] args) throws SQLException {
    JdbcDemo jdbcDemo = new JdbcDemo();
    UserInfo userInfo = jdbcDemo.getRole(1L);
    System.out.println(userInfo);
  }
}
```

### 2.Statement 和 PreparedStatement 有什么区别？哪个性能更好？
PreparedStatement与 Statement 相比：
* PreparedStatement 接口代表预编译的语句，它主要的优势在于可以减少 SQL 的编译错误并增加 SQL 的安全性（减少 SQL 注射攻击的可能性）；
* PreparedStatement 中的 SQL 语句是可以带参数的，避免了用字符串连接拼接 SQL 语句的麻烦和不安全；
* 当批量处理 SQL 或频繁执行相同的查询时，PreparedStatement 有明显的性能上的优势，由于数据库可以将编译优化后的SQL 语句缓存起来，下次执行相同结构的语句时就会很快。

### 3.在进行数据库编程时，连接池有什么作用？
由于创建连接和释放连接都有很大的开销（尤其是数据库服务器不在本地时，每次建立连接都需要进行 TCP 的三次握手，释放连接需要进行 TCP 四次握手，造成的开销是不可忽视的），为了提升系统访问数据库的性能，可以事先创建若干连接置于连接池中，需要时直接从连接池获取，使用结束时归还连接池而不必关闭连接，从而避免频繁创建和释放连接所造成的开销，

基于 Java 的开源数据库连接池主要有：C3P0、Proxool、DBCP、BoneCP、Druid 等。缓存跟上面讲的连接池道理非常类似，也是使用空间换时间的策略。可以将热点数据置于缓存中，当用户查询这些数据时可以直接从缓存中得到，这无论如何也快过去数据库中查询。

### 4.事务的 ACID 是指什么，事务的四个特性是什么？

* （1）原子性(Atomic)：事务中各项操作，要么全做要么全不做，任何一项操作的失败都会导致整个事务的失败；
* （2）一致性(Consistent)：事务结束后系统状态是一致的；
* （3）隔离性(Isolated)：并发执行的事务彼此无法看到对方的中间状态；
* （4）持久性(Durable)：事务完成后所做的改动都会被持久化，即使发生灾难性的失败。通过日志和同步备份可以在故障发生后重建数据。

**只有存在并发数据访问时才需要事务。当多个事务访问同一数据时，可能会存在 5 类问题，包括 3 类数据读取问题（脏读、不可重复读和幻读）和 2 类数据更新问题（第 1 类丢失更新和第 2 类丢失更新）。**

### 5.事务导致的脏读、不可重复读和幻读是什么？第 1 类丢失更新和第 2 类丢失更新分别是什么？

脏读：A 事务读取 B 事务尚未提交的数据并在此基础上操作，而 B事务执行回滚，那么 A 读取到的数据就是脏数据。
![20201110220835.png](../../blogs/blog_img/20201110220835.png)

不可重复读：事务 A 重新读取前面读取过的数据，发现该数据已经被另一个已提交的事务 B 修改过了。
![20201110220835.png](../../blogs/blog_img/20201110221055.png)

幻读：事务 A 重新执行一个查询，返回一系列符合查询条件的行，发现其中插入了被事务 B 提交的行。
![20201110220835.png](../../blogs/blog_img/20201110221127.png)

第 1 类丢失更新：事务 A 撤销时，把已经提交的事务 B 的更新数据覆盖了。
![20201110220835.png](../../blogs/blog_img/20201110221143.png)

第 2 类丢失更新：事务 A 覆盖事务 B 已经提交的数据，造成事务 B 所做的操作丢失。
![20201110220835.png](../../blogs/blog_img/20201110221156.png)

### 6.JDBC 中如何进行事务处理？
Connection提供了事务处理的方法，通过调用 setAutoCommit(false)可以设置手动提交事务；当事务完成后用 commit()显式提交事务；如果在事务处理过程中发生异常则通过 rollback()进行事务回滚。除此之外，从 JDBC 3.0 中还引入了Savepoint（保存点）的概念，允许通过代码设置保存点并让事务回滚到指定的保存点。

### 7.JDBC 能否处理 Blob 和 Clob？
Blob 是指二进制大对象（Binary Large Object），而 Clob 是指大字符对象（Character Large Objec），因此其中 Blob 是为存储大的二进制数据而设计的，而 Clob 是为存储大的文本数据而设计的。JDBC 的 PreparedStatement 和ResultSet 都提供了相应的方法来支持 Blob 和 Clob 操作。

### 8.Statement和PreparedStatement有什么区别？哪个性能更好？

与Statement相比，
①PreparedStatement接口代表预编译的语句，比Statement快
②PreparedStatement中的SQL语句是可以带参数的，避免了用字符串连接拼接SQL语句的麻烦和不安全；
③PreparedStatement可以防止sql注入攻击。

### 9. 在进行数据库编程时，连接池有什么作用？

由于创建连接和释放连接都有很大的开销（每次建立连接都需要进行TCP的三次握手，释放连接需要进行TCP四次握手，造成的开销是不可忽视的），为了提升系统访问数据库的性能，可以事先创建若干连接置于连接池中，需要时直接从连接池获取，使用结束时归还连接池而不必关闭连接，从而避免频繁创建和释放连接所造成的开销.
池化技术在Java开发中是很常见的，在使用线程时创建线程池的道理与此相同。基于Java的开源数据库连接池主要有：C3P0、Proxool、DBCP、BoneCP、Druid等。



## 反射

### 0.反射的介绍

JAVA反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性。

<font color="red">通常情况下对于private修饰符。只有在同类的情景下才能调用。但是通过反射可以在任何地方调用它。</font>

Java反射相关的类

```
java.lang.Class 	代表类的实体，在运行的Java应用程序中表示类和接口
java.lang.reflect.Field 	代表类的成员变量
java.lang.reflect.Method 	代表类的方法
java.lang.reflect.Constructor 	代表类的构造方法
```

<h3>Class 类</h3>

```
=========获取类
getClassLoader() 	获得类的加载器
getClasses() 	返回一个数组，数组中包含该类中所有公共类和接口类的对象
getDeclaredClasses() 	返回一个数组，数组中包含该类中所有类和接口类的对象
forName(String className) 	根据类名返回类的对象
getName() 	获得类的完整路径名字
newInstance() 	创建类的实例
getPackage() 	获得类的包
getSimpleName() 	获得类的名字
getSuperclass() 	获得当前类继承的父类的名字
getInterfaces() 	获得当前类实现的类或是接口

==========获取属性变量
getField(String name) 	获得某个公有的属性对象
getFields() 	获得所有公有的属性对象
getDeclaredField(String name) 	获得某个属性对象
getDeclaredFields() 	获得所有属性对象

==============获取构造方法
getConstructor(Class...<?> parameterTypes) 	获得该类中与参数类型匹配的公有构造方法
getConstructors() 	获得该类的所有公有构造方法
getDeclaredConstructor(Class...<?> parameterTypes) 	获得该类中与参数类型匹配的构造方法
getDeclaredConstructors() 	获得该类所有构造方法

=============获得类中方法相关的方法
getMethod(String name, Class...<?> parameterTypes) 	获得该类某个公有的方法
getMethods() 	获得该类所有公有的方法
getDeclaredMethod(String name, Class...<?> parameterTypes) 	获得该类某个方法
getDeclaredMethods() 	获得该类所有方法
```

<h3>Constructor类</h3>

```
newInstance(Object... initargs) 	根据传递的参数创建类的对象.
```

<h3>Method类</h3>

```
invoke(Object obj, Object... args) 	传递object对象及参数调用该对象对应的方法
```

<h3>Field类</h3>

```
newInstance(Object... initargs) 	根据传递的参数创建类的对象.
```


例子：通过反射实例化对象

>1. 获取类对象 Class clazz = Class.forName("com.xxx.xxx.Student");
>2. 获取构造器对象 Constructor con = clazz.getConstructor(形参.class);
>3. 获取对象 Student stu1 =con.newInstance(实参);

```java
//传统实例化对象的方式
Student stu1 = new Student();
System.out.println(stu1.toString());
//通过反射的方式实例化对象
Class stuClass = Student.class;
Constructor c = stuClass.getConstructor(); //获取无参构造方法
Object obj = c.newInstance(); //创建实例
Student stu2 = (Student)obj;
System.out.println(stu2.toString());

-----------下面是反射的两种方式获得对象
//第1种方式获取Class对象
Class stuClass2 = Student.class;
//第2种方式获取Class对象
try {
    Class stuClass3 = Class.forName("com.xxx.xxx.Student");//注意此字符串必须是真实路径，就是带包名的类路径，包名.类名
} catch (ClassNotFoundException e) {
    e.printStackTrace();
}

```

例子：通过反射获取对象的构造方法

```java
//1.加载Class对象
Class clazz = Class.forName("com.xxx.xxx.Student");
//2.获取所有公有构造方法
System.out.println("**********************所有公有构造方法*********************************");
Constructor[] conArray = clazz.getConstructors();
System.out.println("************所有的构造方法(包括：私有、受保护、默认、公有)***************");
conArray = clazz.getDeclaredConstructors();
System.out.println("*****************获取公有、无参的构造方法*******************************");
Constructor con = clazz.getConstructor(null);
Constructor con = clazz.getConstructor();
System.out.println("******************获取私有构造方法，并调用*******************************");
con = clazz.getDeclaredConstructor(float.class);
System.out.println(con);//调用构造方法
con.setAccessible(true);//暴力访问(忽略掉访问修饰符)
obj = con.newInstance(100);
```

> 反射在spring中的应用

Spring的IOC的实现原理利用的就是Java的反射机制。Spring的工厂类利用反射机制将对象实例化并且把对象注入到spring容器中。

过程：1.通过解析xml文件，获取到id属性和class属性里面的内容。2.利用反射原理获取到配置里面类的实例对象，存入到Spring的bean容器中。 

<font color="red">只要在代码或配置文件中看到类的完整路径（包.类），其底层原理基本上使用的就是Java的反射机制。</font>


### 1.获得一个类的类对象有哪些方式？

* （1）方法 1：类型.class，例如：String.class
* （2）方法 2：对象.getClass()，例如：”hello”.getClass()
* （3）方法 3：Class.forName()，例如：Class.forName(“java.lang.String”)

### 2.如何通过反射创建对象？通过反射调用对象方法？
方法 1：通过类对象调用 newInstance()方法，例如：String.class.newInstance()

方法 2：通过类对象的 getConstructor()或 getDeclaredConstructor()方法获得构造器（Constructor）对象并调用其 newInstance()方法创建对象。

例如：
```java
String.class.getConstructor(String.class).newInstance(“Hello”);
```

反射调用对象方法：
```java
String str = "hello";
Method m = str.getClass().getMethod("toUpperCase");
System.out.println(m.invoke(str));
// HELLO
```