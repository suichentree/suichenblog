---
title: RESTful风格
date: 2021-01-06
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Java
---

## RESTful风格

在 RESTful风格 中，资源 通过 URL 进行识别和定位，通过行为(即 HTTP 方法)来定义完成怎样的功能。

在平时的 Java Web 开发中，常用的接口是get和post请求。但是实际上 HTTP 请求共有 put、delete、get,post 等其他方式。<font color="red">在 RESTful风格 中，每个不同的方式请求，对应不同的行为。</font>

CRUD | HTTP请求方式
------------ | -------------
C：创建 | POST请求
R：读取 | GET请求
U： 更新 | PUT请求
D：删除 | DELETE请求

因此RESTful风格就是使用同一个 URL ，通过约定不同的 HTTP 方法来实施不同的业务功能。下图为例：

![20210106150646.png](blog_img/20210106150646.png)


### springboot中编写RESTful风格接口：

```java
@RestController 
@RequestMapping(value="/users")     // 通过这里配置使下面的映射都在/users下 
public class UserController { 
 
    // 创建线程安全的Map 
    static Map<Long, User> users = Collections.synchronizedMap(new HashMap<Long, User>()); 
 
    @RequestMapping(value="/", method=RequestMethod.GET) 
    public List<User> getUserList() { 
        // 处理"/users/"的GET请求，用来获取用户列表 
        // 还可以通过@RequestParam从页面中传递参数来进行查询条件或者翻页信息的传递 
        List<User> r = new ArrayList<User>(users.values()); 
        return r; 
    } 
 
    @RequestMapping(value="/", method=RequestMethod.POST) 
    public String postUser(@RequestParam User user) { 
        // 处理"/users/"的POST请求，用来创建User 
        users.put(user.getId(), user); 
        return "success"; 
    } 
 
    @RequestMapping(value="/{id}", method=RequestMethod.GET) 
    public User getUser(@PathVariable Long id) { 
        // 处理"/users/{id}"的GET请求，用来获取url中id值的User信息 
        // url中的id可通过@PathVariable绑定到函数的参数中 
        return users.get(id); 
    } 
 
    @RequestMapping(value="/{id}", method=RequestMethod.PUT) 
    public String putUser(@PathVariable Long id, @RequestParam User user) { 
        // 处理"/users/{id}"的PUT请求，用来更新User信息 
        User u = users.get(id); 
        u.setName(user.getName()); 
        u.setAge(user.getAge()); 
        users.put(id, u); 
        return "success"; 
    } 
 
    @RequestMapping(value="/{id}", method=RequestMethod.DELETE) 
    public String deleteUser(@PathVariable Long id) { 
        // 处理"/users/{id}"的DELETE请求，用来删除User 
        users.remove(id); 
        return "success"; 
    } 
}

```

或者使用Spring 4.3之后的几个新注解：@PutMapping、@GetMapping、@DeleteMapping、@PostMapping对代码进行改造。
```java
//-----------改造前-----------
@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
public String deleteUser(@PathVariable Long id) {
    // 处理"/users/{id}"的DELETE请求，用来删除User
    users.remove(id);
    return "success";
}

//-----------改造后-----------
@DeleteMapping("/{id}")
public String deleteUser(@PathVariable Long id) {
    // 处理"/users/{id}"的DELETE请求，用来删除User
    users.remove(id);
    return "success";
}

```