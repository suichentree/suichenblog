---
title: Java面试题JavaWeb
date: 2020-11-24
sidebar: 'auto'
categories:
 - 面试
tags:
 - Java
---

[toc]

## Java面试题-JavaWeb

### 1.Servlet

servlet是java定义的一套处理网络请求的规范。用于交互式地浏览和修改数据，生成Web内容
其中最主要的是两个生命周期方法init(),destroy(),还有一个处理请求的service().

>web运行过程主要有：（1）客户端发送请求到服务器端（2）服务器将请求信息发送至Servlet （3）Servlet生成响应内容并将其传给服务器。（4）服务器将响应返回给客户端。

servlet的生命周期
1. 客户端请求该Servlet;
2. 加载Servlet类到内存
3. 实例化并调用init（）方法初始化该Servlet；
4. service()(根据请求方法不同调用doGet（）或者doPost（），此外还有doHead()、doPut()、doTrace()、doDelete()、doOptions()；)
5. destroy（）销毁。

### 2. JSP和Servlet有哪些相同点和不同点，他们之间的联系是什么？

JSP本质上是Servlet的简易方式，所以的jsp都会翻译为一个继承servlet的类。
Servlet和JSP最主要的不同点在于，Servlet的应用逻辑是在Java文件中，并且完全从表示层中的HTML里分离开来。而JSP的情况是Java和HTML可以组合成一个扩展名为.jsp的文件。JSP侧重于视图，Servlet主要用于控制逻辑。

### 2. 如何利用ServletContext和ServletConfig对象获得初始化参数

String psw = config.getInitParameter("psw");		
ServletContext ss = config.getServletContext();
String ppp = ss.getInitParameter("name");

### 3. 描述forward 和redirect的区别

forward是服务器直接访问目标地址的URL，把那个URL的响应内容读取过来，然后把这些内容再发给浏览器，浏览器根本不知道服务器发送的内容是从哪儿来的，所以它的地址栏中还是原来的地址。

redirect就是服务端告诉浏览器重新去请求哪个地址，浏览器会重新进行请求，浏览器的地址栏会变成新的地址

若要跳转到一个其他服务器上的资源，要用sendRedirect()方法

### 4. Servlet是什么？说出Servlet的生命周期?

servlet使用java编写的服务器端程序（要实现servlet接口），其主要用于生成动态web内容，并且servlet运行在服务器中。

当Servlet被服务器实例化后，容器运行其init方法，请求到达时运行其service方法，service方法自动派遣运行与请求对应的doXXX方法（doGet，doPost）等，当服务器决定将实例销毁的时候调用其destroy方法。

### 5. get和post请求？什么情况下调用doget()和什么情况dopost?

get一般用于获取资源信息，post一般用于更新资源信息。
get请求提交的数据会在地址栏显示，post请求不会。
get请求传输的数据有限，因为地址栏有长度限制。
post请求的安全性高

当表单提交时method设置的 是 get 就调用 doget 方法，如果是 post 就调用 dopost方法。 http get方法请求一页面，调用doget() http post方法请求一页面，调用dopost()

### 6. jsp内置对象？

9个内置对象：
1. request 用户端请求，此请求会包含来自GET/POST请求的参数。它包含了有关浏览器请求的信息，并且提供了几个用于获取cookie, header, 和session数据的有用的方法。 
2. response response表示HttpServletResponse对象，并提供了几个用于设置送回 浏览器的响应的方法（如cookies,头信息等） 
3. pageContext 用于方便存取各种范围的名字空间、servlet相关的对象的API，并且包装了通用的servlet相关功能的方法。 
4. session 与请求有关的会话期。Session可以存贮用户的状态信息 
5. application servlet 查找有关servlet引擎和servlet环境的信息 
6. out 提供了几个方法使你能用于向浏览器回送输出结果。
7. config 该对象用于存取servlet实例的初始化参数。 
8. page JSP网页本身,page表示从该页面产生的一个servlet实例 
9. exception 针对错误网页，未捕捉的例外 

### 7. session 和 cookie的区别？

两个都是会话跟踪技术，cookie是在客户端记录用户信息，而session是在服务器端记录用户信息。session 是依赖于cookie 的

cookie存储的数据存放在浏览器上的。session是存储在服务器上的。
cookie是不安全的，并且保存数据不超过4k

### 8. MVC是什么？

"Model" 代表的是应用的业务逻辑（通过JavaBean，EJB组件实现）
 "View" 是应用的表示面（由JSP页面产生），
"Controller" 是提供应用的处理过程控制（一般是一个Servlet）

mvc模式就是把视图和逻辑分开来。通过这种设计模型把应用逻辑，处理过程和显示逻辑分成不同的组件实现。这些组件可以进行交互和重用。

### 9. JSP中动态include与静态include的区别？

动态include: `<jsp:include page="included.jsp" flush="true" />`它总是会检查所含文件中的变化，适合用于包含动态页面，并且可以带参数。
静态include: `<%@ include file="included.htm" %> ` 不会检查所含文件的变化，适用于包含静态页面

### 10. tcp/ip在连接是有几次握手？释放是有几次握手？

答：建立连接是2次,释放是3次。

### 11. Servlet的基本架构 

```java
public class ServletName extends HttpServlet { 
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws 
	ServletException, IOException { 
	} 
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws 
	ServletException, IOException { 
	} 
} 

```

### 12. jsp有哪些动作?作用分别是什么? 

答:JSP共有以下6种基本动作 
jsp:include：在页面被请求的时候引入一个文件。 
jsp:useBean：寻找或者实例化一个JavaBean。 
jsp:setProperty：设置JavaBean的属性。 
jsp:getProperty：输出某个JavaBean的属性。 
jsp:forward：把请求转到一个新的页面。 
jsp:plugin：根据浏览器类型为Java插件生成OBJECT或EMBED标记 

### 13. 如何现实servlet的单线程模式?

<%@ page isThreadSafe="false"%>

### 14. Request对象的主要方法：

setAttribute(String name,Object)：设置名字为name的request的参数值
getAttribute(String name)：返回由name指定的属性值
getAttributeNames()：返回request对象所有属性的名字集合，结果是一个枚举的实例
getCookies()：返回客户端的所有Cookie对象，结果是一个Cookie数组
getCharacterEncoding()：返回请求中的字符编码方式
getContentLength()：返回请求的Body的长度
getHeader(String name)：获得HTTP协议定义的文件头信息
getHeaders(String name)：返回指定名字的request Header的所有值，结果是一个枚举的实例

### 15. J2EE是技术还是平台还是框架？

J2EE本身是一个标准，一个为企业分布式应用的开发提供的标准平台。
J2EE也是一个框架，包括JDBC、JNDI、RMI、JMS、EJB、JTA等技术。

### 16. 我们在web应用开发过程中经常遇到输出某种编码的字符，如iso8859-1等，如何输出一个某种编码的字符串？

```java
  Public String translate (String str) {
    String tempStr = "";
    try {
      tempStr = new String(str.getBytes("ISO-8859-1"), "GBK");
      tempStr = tempStr.trim();
    }
    catch (Exception e) {
      System.err.println(e.getMessage());
    }
    return tempStr;
  }
```

### 17. Servlet执行时一般实现哪几个方法？

public void init(ServletConfig config)
public ServletConfig getServletConfig()
public String getServletInfo()
public void service(ServletRequest request,ServletResponse response)
public void destroy()

### 18. 请对以下在J2EE中常用的名词进行解释(或简单描述)

web容器：给应用程序组件JSP，SERVLET 提供一个环境，使JSP,SERVLET直接更容器中的环境变量接口交互，不必关注其它系统问题。主要有WEB服务器来实现。例如：TOMCAT,WEBLOGIC,WEBSPHERE等。

EJB容器：Enterprise java bean 容器。更具有行业领域特色。他提供给运行在其中的组件EJB各种管理功能。只要满足J2EE规范的EJB放入该容器，马上就会被容器进行高效率的管理。并且可以通过现成的接口来获得系统级别的服务。例如邮件服务、事务管理。

