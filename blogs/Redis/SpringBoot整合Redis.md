---
title: SpringBoot整合Redis
date: 2023-07-27
sidebar: 'auto'
categories: 
 - 数据库
tags:
 - Redis
---

[toc]

# SpringBoot整合Redis

目前大部分的java项目，都是基于 SpringBoot 框架进行快速开发，在  SpringBoot 项目中我们应该如何使用 Redis。

① 创建springboot项目
② 添加springboot的redis启动包。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

上面的springboot的redis整合依赖没有标注版本号。主要是因为springboot项目默认继承一个父工程。而这个父工程就已经存在了redis整合依赖。因此springboot项目中的redis整合依赖是直接继承父工程的，所以不用标注版本号。

如果标注了版本号，就表示这个springboot项目不使用父工程的redis整合依赖。而使用自定义的redis整合依赖。

③ 在配置文件中配置redis

```properties
# Redis数据库索引（默认为0）
spring.redis.database=0
# Redis服务器地址
spring.redis.host=127.0.0.1
# Redis服务器连接端口
spring.redis.port=6379
# Redis服务器连接密码（默认为空）
spring.redis.password=
# 连接池最大连接数（使用负值表示没有限制） 默认 8
spring.redis.lettuce.pool.max-active=8
# 连接池最大阻塞等待时间（使用负值表示没有限制） 默认 -1
spring.redis.lettuce.pool.max-wait=-1
# 连接池中的最大空闲连接 默认 8
spring.redis.lettuce.pool.max-idle=8
# 连接池中的最小空闲连接 默认 0
spring.redis.lettuce.pool.min-idle=0
```

注意从SpringBoot 2.x开始，spring-boot-starter-data-redis默认集成的java客户端是Lettuce。

④ 测试代码

SpringBoot的redis整合依赖jar包中提供了一个高度封装的RedisTemplate类来操作redis的各个命令，通过RedisTemplate提供的方法，就可以直接操作redis。

> RedisTemplate工具类常用方法
![redis20221011154818.png](../blog_img/redis20221011154818.png)

测试代码如下
```java
@RestController
@RequestMapping("/redis")
public class redisController {

    @Autowired
    private RedisTemplate redisTemplate;

    //StringRedisTemplate是RedisTemplate的子类
    //StringRedisTemplate专门用于处理String类型的key和value
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @RequestMapping("/testGet")
    public Object testGet(){
        // 获取String数据
        Object obj = stringRedisTemplate.opsForValue().get("project1:order:3");
        System.out.println("obj = " + obj);
        return obj;
    }
    @RequestMapping("/testSet")
    public void testSet(){
        System.out.println("testSet----");
        // 写入一条String数据
        stringRedisTemplate.opsForValue().set("project1:order:3","order3333");
    }
}
```

## RedisTemplate的乱码问题

当使用RedisTemplate类向Redis写入或读取数据时，由于RedisTemplate默认是采用JDK序列化，因此得到的结果是这样的：

![redis20221011162513.png](../blog_img/redis20221011162513.png)

> 什么是序列化？

序列化就是把java对象转换为IO流，然后持久化到硬盘上。

反序列化就是在硬盘上读取IO流，然后将其转换为java对象。

序列化机制的意义：序列化可以允许将实现序列化的Java对象，通过IO流的方式保存在硬盘上，或者通过网络传输把IO流发送到其他地方。最终使得Java对象可以脱离Java程序而独立存在在硬盘上。

> 解决方法

不使用RedisTemplate默认的JDK序列号方式。而是自定义RedisTemplate的序列化方式。

由于redis的键值对数据。所以对redis的数据进行序列化。需要同时对key和value都要进行序列化。


> 有多种方式去实现RedisTemplate的序列化。

名称 | 说明 | 特点
------------ | ------------- | ------------- 
StringRedisSerializer |	简单的字符串序列化 | 推荐给key进行序列化
Jackson2JsonRedisSerializer	| 使用Jackson序列化对象为json | 推荐给value进行序列化

还有很多其他序列化方式，但是效率不高，因此不推荐。

> 自定义RedisTemplate的序列化方式。代码如下

```java
@Configuration
public class RedisTemplateConfig {
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory){
        // 创建RedisTemplate对象
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        // 设置连接工厂
        template.setConnectionFactory(connectionFactory);
        // 创建JSON序列化工具
        GenericJackson2JsonRedisSerializer jsonRedisSerializer = new GenericJackson2JsonRedisSerializer();
        // 设置Key的序列化
        template.setKeySerializer(RedisSerializer.string());
        template.setHashKeySerializer(RedisSerializer.string());
        // 设置Value的序列化
        template.setValueSerializer(jsonRedisSerializer);
        template.setHashValueSerializer(jsonRedisSerializer);
        // 返回
        return template;
    }
}
```

> 解决方式2：直接使用StringRedisTemplate，它的key和value的序列化方式默认就是String。

- 优点：不需要自定义RedisTemplate的序列化方式。
- 缺点：StringRedisTemplate只能处理String类型的key和value。对于其他类型的数据还是需要自定义RedisTemplate的序列化方式。


