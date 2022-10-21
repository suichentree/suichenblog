---
title: MyBatis底层（1）
date: 2020-10-21
sidebar: 'auto'
categories: 
 - 后端
tags:
 - MyBatis
---

# MyBatis底层（1）

Mybatis底层是封装JDBC。

## 1. JDBC如何连接数据库，并查询数据

（1）  加载JDBC驱动
（2）  建立并获取数据库连接
（3）  创建 JDBC Statements 对象
（4）  设置SQL语句的传入参数
（5）  执行SQL语句并获得查询结果
（6）  对查询结果进行转换处理并将处理结果返回
（7）  释放相关资源（关闭Connection，关闭Statement，关闭ResultSet）

相关代码：

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

<h4>mybatis 对jdbc中7步的封装优化</h4>

>（1）  加载JDBC驱动
>（2）  建立并获取数据库连接
>（3）  创建 JDBC Statements 对象
>（4）  设置SQL语句的传入参数
>（5）  执行SQL语句并获得查询结果
>（6）  对查询结果进行转换处理并将处理结果返回
>（7）  释放相关资源（关闭Connection，关闭Statement，关闭ResultSet）

> 优化1：数据库连接获取和释放

在jdbc中每执行一次sql语句都需要创建数据库连接和释放数据库连接。多次连接开启和关闭本身就造成了资源的浪费，影响系统的性能。

在mybatis中通过配置数据库连接池来解决资源浪费的问题。连接池可以反复利用已经建立的连接去访问数据库了。减少连接的开启和关闭的时间。并且可以配置多个不同的连接池方式。

```xml
<environments default="mysql">
	<!-- mybatis 运行oracle的环境配置 -->
	<environment id="oracle">
		<!-- environment 标签中必须有 transactionManager，dataSource 标签 -->
		<transactionManager type="JDBC"/>  
		 <dataSource type="POOLED">  
		 		<!--${oracle.driver} 从配置文件获取driver的信息  
				 	注意：不同的数据库，你的驱动jar包要齐全。
				 -->
		 		<property name="driver" value="${oracle.driver}"/>
		 		<property name="url" value="${oracle.url}"/>   
		 		<property name="username" value="${oracle.username}"/>
		 		<property name="password" value="${oracle.password}"/>
		 </dataSource>
	</environment>
	<!-- mybatis 运行mysql的环境配置 -->
 	<environment id="mysql">
 		<transactionManager type="JDBC"/>   
		 <dataSource type="POOLED">  
		 		<!--${jdbc.driver} 从配置文件获取driver的信息  -->
		 		<property name="driver" value="${jdbc.driver}"/>
		 		<property name="url" value="${jdbc.url}"/>   
		 		<property name="username" value="${jdbc.username}"/>
		 		<property name="password" value="${jdbc.password}"/>
		 </dataSource>
	</environment>
</environments>

```

> 优化2：SQL语句统一存取，集中化管理

在jdbc中，sql语句是零散的存在业务代码中。这不利于后期维护sql语句

在mybatis中，把SQL语句统一集中放到配置文件(xml文件中)或者数据库里面（以key-value的格式存放）。然后通过SQL语句的key值去获取对应的SQL语句。  

> 优化3：参数映射和动态SQL

在jdbc中通过在SQL语句中设置占位符来达到使用传入参数的目的。
缺点：
1. 占位符和参数需要按照顺序一一对应
2. 无法根据前台传入参数的不同，动态生成对应的SQL语句。（比如分页列表查询，根据用户填写的查询条件不同，传入查询的参数也是不同的，有时是一个参数、有时可能是三个参数）。若jdbc需要动态传参，则需要编写多余的java代码来实现。

在mybatis中，通过使用xml标签的方式。来集中管理sql语句，并且对于占位符的问题，使用变量名称找到对应的值，这个时候我们想到了key-value的Map。解析的时候根据变量名的具体值来判断。而动态传参也可以通标签的形式解决。

```xml
<insert id="insertAuthor">
  insert into Author (id,username,password,email,bio)
  values (#{id},#{username},#{password},#{email},#{bio})
</insert>

<select id="select1" resultType="Student">  
  select * from User Where 1=1  
  <if test="name != null and phone != null">  
    and name like #{name} and phone = #{phone} 
  </if>  
  <if test="gender != null">  
    and gender = #{gender}  
  </if>  
</select>

<select id="select2"  resultType="Student">  
  select * from student Where 1=1   
  <choose>  
    <when test="id != null">  
      AND id =#{id}  
    </when>
	<when test="name != null">  
      AND name =#{name}  
    </when>    
    <otherwise>  
      	AND gender="男"  
    </otherwise>  
  </choose>  
</select> 
```


> 优化4：sql语句执行结果映射和结果缓存

在jdbc中