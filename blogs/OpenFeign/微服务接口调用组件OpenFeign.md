---
title: 微服务接口调用组件OpenFeign 版本1.5.1
date: 2022-08-05
sidebar: 'auto'
categories: 
 - 后端
tags:
 - OpenFeign
---

[toc]

# 微服务接口调用组件OpenFeign 版本1.5.1

下图为微服务架构图
![20220728161129.png](../blog_img/20220728161129.png)

## 1. JAVA项目如何实现服务与服务之间的接口调用？

* Httpclient
HttpClient是Apache Jakarta Common下的子项目，提供功能丰富的支持 Http 协议的客户端编程工具包，并且它支持 HTTP 协议最新版本和建议。HttpClient 相比传统JDK 自带的 URLConnection，提升了易用性和灵活性，使客户端发送 HTTP 请求变得容易，提高了开发的效率。
* HttpURLConnection
HttpURLConnection是Java的标准类，它继承自 URLConnection，可用于向指定网站发送GET 请求、POST 请求。HttpURLConnection 使用比较复杂，不像HttpClient 那样容易使用。
* RestTemplate
RestTemplate 是 Spring 提供的用于访问 Rest 服务的客户端，RestTemplate 提供了多种便捷访问远程 HTTP 服务的方法，能够大大提高客户端的编写效率。

> 什么是Fegin?什么是OpenFegin?

* Feign是Netflix开发的声明式、模板化的HTTP客户端，Feign可帮助我们更加便捷、优雅地调用HTTP API。Feign可以做到使用 HTTP 请求远程服务时就像调用本地方法一样的体验，开发者完全感知不到这是远程方法，更感知不到这是个 HTTP 请求。
* Spring Cloud openfeign对Feign进行了增强，使其支持Spring MVC注解，另外还整合了Ribbon和Nacos，从而使得Feign的使用更加方便。


## 2. Spring Cloud Alibaba

① 引入starter-openfeign依赖
```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

②：在启动类上添加feign启动注解
```java
@SpringBootApplication
@EnableFeignClients   //feign启动注解
public class UserApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class,args);
    }
}
```

③ 创建Feign包，在其中编写openFeign服务调用接口
```java
// value = "order-service" 值为注册中心的服务名
// path = "/order" , 对应@RequestMapping("/order")。若被调用服务没有对应值，path可不填
// 综上意思就是调用order-service服务中的/order接口路径
@FeignClient(value = "order-service",path = "/order")
public interface OrderFeignService {
    //接口中的方法就是一一对应order-service服务中/order路径下的方法
    @RequestMapping("/get")
    String getOrder();
}
```

④：发起调用，像调用本地方式一样调用远程服务

```java
@RestController
@RequestMapping("/user")
public class UserController {
    //获取feign接口对象
    @Autowired
    OrderFeignService orderFeignService;

    @RequestMapping("/toOrder")
    public String test(){
        //这里调用feign接口中的getOrder方法
        //就相当于对order-service服务发起/order/get请求
        return orderFeignService.getOrder();
    }
}
```

## 3. OpenFeign日志配置

OpenFeign的日志级别
* NONE：默认级别，不显示日志
* BASIC：仅记录请求方法、URL、响应状态及执行时间
* HEADERS：除了BASIC中定义的信息之外，还有请求和响应头信息
* FULL：除了HEADERS中定义的信息之外，还有请求和响应正文及元数据信息

<font color="red">Openfeign调试日志是debug级别输出,而springboot默认的日志级别是info，info级别 > debug级别。所以feign的debug日志级别就不会输出。因此需要将springboot中openFeign服务类所在的包的日志级别调整为debug级别。</font>

### 全局配置

① 创建openFeign全局配置类

```java
package com.example.user.config;
import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
// 注意：此处配置@Configuration注解会全局生效，如果想指定某个微服务生效，就不能配置该注解
@Configuration
public class OpenFeignConfig {
    @Bean
    public Logger.Level openFeignLoggerLevel(){
        //设置日志级别为FULL
        return Logger.Level.FULL;
    }
}
```

② 配置openFeign服务类所在的包的日志级别为debug
```
#将openFeign服务类的日志级别调整为debug
logging.level.com.example.user.openFeign:debug
```

③ 重启服务

### 局部配置，只让某个微服务生效

> 方式1：配置类方式

① 创建openFeign配置类

```java
package com.example.user.config;
import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
// 注意：此处配置@Configuration注解会全局生效，如果想指定某个微服务生效，就不能配置该注解
// @Configuration
public class OpenFeignConfig {
    @Bean
    public Logger.Level openFeignLoggerLevel(){
        //设置日志级别为FULL
        return Logger.Level.FULL;
    }
}
```

② 配置openFeign服务类所在的包的日志级别为debug
```
#将openFeign服务类的日志级别调整为debug
logging.level.com.example.user.openFeign:debug
```

③ 单独配置某个openFeign服务类的日志配置

```java
//configuration = OpenFeignConfig.class
//单独给某个feign服务指定日志配置类
@FeignClient(value = "order-service",path = "/order",configuration = OpenFeignConfig.class)
public interface OrderFeignService {
    @RequestMapping("/get")
    String getOrder();
}
```

④ 重启服务

> 方式2：配置文件方式

① 配置openFeign服务类所在的包的日志级别为debug
```
#将openFeign服务类的日志级别调整为debug
logging.level.com.example.user.openFeign:debug
```

② 局部设置order-service服务的feign日志级别为basic

```java
feign.client.config.order-service.logger-level=basic
```

③ 重启服务

## 4. OpenFeign契约配置

SpringCloud在Feign的基础上做了扩展，使用SpringMVC的注解来完成Feign的功能。原生的Feign是不支持 Spring MVC 注解的，如果你想在Spring Cloud中使用Feign原生的注解方式，可以通过修改契约配置来实现。

### 全局契约配置

①：创建配置类
```java
package com.example.user.config;
import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
// 注意：此处配置@Configuration注解会全局生效，如果想指定某个微服务生效，就不能配置该注解
@Configuration
public class OpenFeignConfig {
    /**
     * 修改契约配置，支持Feign原生的注解
     * @return
     */
    @Bean
    public Contract feignContract(){
        return new Contract.Default();
    }
}
```

② 将Feign服务中的注解更改为feign原生注解
```java
//将RequestMapping注解更换为RequestLine注解
@FeignClient(value = "order-service",path = "/order")
public interface OrderFeignService {
    @RequestLine("GET /get")  //相当于@RequestMapping("/get")
    String getOrder();
}
```

③ 重启服务

### 局部契约配置

>方式1：局部配置类方式

①：创建配置类
```java
package com.example.user.config;
import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
// 注意：此处配置@Configuration注解会全局生效，如果想指定某个微服务生效，就不能配置该注解
// @Configuration
public class OpenFeignConfig {
    /**
     * 修改契约配置，支持Feign原生的注解
     * @return
     */
    @Bean
    public Contract feignContract(){
        return new Contract.Default();
    }
}
```

② 指定某个feign服务使用的配置类，并将Feign服务中的注解更改为feign原生注解
```java
//configuration = OpenFeignConfig.class
//单独给某个feign服务指定日志配置类
//将RequestMapping注解更换为RequestLine注解
@FeignClient(value = "order-service",path = "/order",configuration = OpenFeignConfig.class)
public interface OrderFeignService {
    @RequestLine("GET /get")  //相当于@RequestMapping("/get")
    String getOrder();
}
```

③ 重启服务

>方式2：配置文件方式

①修改配置文件的方式来指定某feign服务的契约配置
```
# 指定order-service服务为Feign原生注解契约配置
feign.client.config.order-service.contract=feign.Contract.Default
```

② 将Feign服务中的注解更改为feign原生注解

```java
//将RequestMapping注解更换为RequestLine注解
@FeignClient(value = "order-service",path = "/order")
public interface OrderFeignService {
    @RequestLine("GET /get")
    String getOrder();
}
```

③ 重启服务


## 5. 超时时间配置

```
# 设置order-service服务的feign连接超时时间。默认为2s
feign.client.config.order-service.connect-timeout=5000
# 设置order-service服务的feign读取超时时间。默认为5s
feign.client.config.order-service.read-timeout=5000
```

## 6 配置自定义拦截器

在微服务中,当服务使用者使用openFeign调用服务提供者时，可以设置自定义拦截器进行拦截设置。

### 全局拦截配置

①：自定义拦截器类

```java
public class openFeignInterceptor implements RequestInterceptor {
    Logger logger = LoggerFactory.getLogger(openFeignInterceptor.class);
    @Override
    public void apply(RequestTemplate requestTemplate) {
        logger.info("openFeign自定义拦截器");
        //给请求头设置参数
        requestTemplate.header("username","xiaoming");
    }
}
```
②将自定义拦截器类添加到全局配置类中

```java
@Configuration
public class OpenFeignConfig {
    //配置类中添加自定义拦截器
    @Bean
    public openFeignInterceptor customFeignInterceptor(){
        return new openFeignInterceptor();
    }
}
```

③ 重启服务。

### 局部拦截配置：配置文件方式

①：自定义拦截器类

```java
package com.example.user.interceptor;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * openFeign自定义拦截器
 */
public class openFeignInterceptor implements RequestInterceptor {
    Logger logger = LoggerFactory.getLogger(openFeignInterceptor.class);
    @Override
    public void apply(RequestTemplate requestTemplate) {
        logger.info("openFeign自定义拦截器");
        //给请求头设置参数
        requestTemplate.header("username","xiaoming");
    }
}

```
②在配置文件中添加自定义拦截器
```
# 针对order-service服务。设置自定义拦截器
feign.client.config.order-service.request-interceptors[0]=com.example.user.interceptor.openFeignInterceptor

```

③ 重启服务


