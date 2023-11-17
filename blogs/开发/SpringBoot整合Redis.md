---
title: SpringBoot整合Redis
date: 2023-11-16
sidebar: 'auto'
categories: 
 - 开发
tags:
 - Redis
 - SpringBoot
---

[toc]

# SpringBoot整合Redis

目前大部分的微服务项目，都是基于 SpringBoot 框架进行快速开发，在 SpringBoot 项目中我们应该如何使用 Redis。

① 创建springboot项目
② 添加springboot的redis启动包。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

springboot项目默认继承一个父工程，而这个redis依赖的版本继承自父工程。


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

SpringBoot提供了一个高度封装的RedisTemplate类来操作redis的各个命令，通过RedisTemplate提供的方法，就可以操作redis。

> RedisTemplate工具类常用方法
![redis20221011154818.png](../blog_img/redis20221011154818.png)

代码如下
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

## RedisTemplate笔记

SpringBoot提供了一个高度封装的RedisTemplate类来操作redis的各个命令，通过RedisTemplate提供的方法，就可以操作redis。

> RedisTemplate工具类常用方法
![redis20221011154818.png](../blog_img/redis20221011154818.png)


### RedisTemplate 常用方法

> String字符串操作

```java
//设置key和value值
redisTemplate.opsForValue().set("key","value");

//通过key获取value值
String result = redisTemplate.opsForValue().get("key").toString();
```

> list列表操作

```java
//list数组对象和添加数组值
List<String> list = new ArrayList<String>();  
list.add("a1");  
list.add("a2");  
list.add("a3");  

//把list数组集合添加进Redis
redisTemplate.opsForList().leftPush("listkey",list);  

//根据key获取list集合
List<String> resultList = redisTemplate.opsForList().leftPop("listkey");  
```

> Hash数据操作

```java
//定义Map集合和类型
Map<String,String> map = new HashMap<String,String>();  
map.put("key1","value1");  
map.put("key2","value2");  
map.put("key3","value3");  

//把map设置到redis中
redisTemplate.opsForHash().putAll("map",map);
//根据key,获取全部Hash数据
Map<String,String> resultMap = redisTemplate.opsForHash().entries("map");
//根据key,获取Hash数据中的所有value值
List<String> reslutMapList = redisTemplate.opsForHash().values("map");
//根据key,获取Hash数据中的所有key值
Set<String> resultMapSet = redisTemplate.opsForHash().keys("map");  
//根据key,获取Hash数据中的某个value值
String value = (String)redisTemplate.opsForHash().get("map","key1");
```

> Set数据操作

```java
//定义一个set集合并设置集合值
SetOperations<String, String> set = redisTemplate.opsForSet();
set.add("set1","22");  
set.add("set1","33");  
set.add("set1","44");  

//通过key获取set集合中的对象值
Set<String> resultSet = redisTemplate.opsForSet().members("set1");  
```

## RedisTemplate的乱码问题

RedisTemplate向写入Redis数据时，由于默认是采用JDK序列化，因此得到的结果是这样的：

![redis20221011162513.png](../blog_img/redis20221011162513.png)

> 解决方式1：自定义RedisTemplate的序列化方式。下面用JSON序列化代替默认的JDK序列化

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


