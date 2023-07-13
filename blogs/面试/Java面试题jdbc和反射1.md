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

### 反射在spring中的应用

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