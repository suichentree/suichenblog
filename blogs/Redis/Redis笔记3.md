---
title: Redis笔记3
date: 2023-07-24
sidebar: 'auto'
categories: 
 - 数据库
tags:
 - Redis
---

[toc]

# Redis笔记3

## Redis的key键

在Redis中可以把 key 看成 value 的变量，通过 key 就可以找到对应的 value 值。


### key键的数据类型

key 的数据类型 对应着 value 的数据类型，同样也有五种（string、list、hash、set、zset）。如果 value 是一个字符串类型的值，那么 对应的 key 也是字符串类型。

TYPE命令查询key的数据类型。
```bash
# 字符串
redis> SET weather "sunny"
OK
redis> TYPE weather
string

# 列表
redis> LPUSH book_list "programming in scala"
(integer) 1
redis> TYPE book_list
list

# 集合
redis> SADD pat "dog"
(integer) 1
redis> TYPE pat
set

```


### key键的命名规范

Redis没有类似MySQL中的Table的概念，我们该如何命名不同类型的key呢？

例如，需要存储用户、商品信息到redis，有一个用户id是1，有一个商品id恰好也是1，此时如果使用id作为key，那就会冲突了，该怎么办？

答：可以通过给key添加前缀加以区分，不过这个前缀不是随便加的，有一定的规范：Redis的key允许有多个单词形成层级结构，多个单词之间用':'隔开，格式如下：

```
项目名:业务名:id
```

例如我们的项目名称叫project1，有user和product两种不同类型的数据，它们都有key为1的数据，此时我们可以这样定义key1

```
user相关的key：     project1:user:1
product相关的key：  project1:product:1
```

如果Value是一个Java对象，则可以将对象序列化为JSON字符串后存储：

| **KEY** | **VALUE** |
| ----| ----|
| project1:user:1    | {"id":1,  "name": "Jack", "age": 21}       |
| project1:product:1 | {"id":1,  "name": "小米11", "price": 4999} |

并且在Redis的图形客户端中，以相同前缀作为层级结构的key，让数据看起来层次分明，关系清晰：

![redis20221010150928.png](../blog_img/redis20221010150928.png)


### key键的过期时间

Redis 允许你为key设置一个过期时间。

Redis 会把每个设置了过期时间的 key 存放到一个独立的字典中，并且会定时遍历这个字典来删除到期的 key。除了定时遍历之外，它还会使用“惰性策略”来删除过期的 key。即当客户端访问这个 key 的时候，Redis再对 key 的过期时间进行检查，如果过期了就立即删除。Redis 使用两种方式相结合的方法来处理过期的 key。 

过期时间在实际业务中是非常有用的，一是它可以避免使用频率不高的 key 长期存在，从而占用内存资源；二是可以主动控制缓存的失效时间。

```bash
## 设置key1键10秒后过期
EXPIRE key1 10
```

### 关于key键的常用命令

![redis_20230724231023.png](../blog_img/redis_20230724231023.png)

> 例子
```bash
# DEL命令用于删除key
127.0.0.1:6379> SET www.biancheng.net "11111"
OK
#删除key
127.0.0.1:6379> DEL  www.biancheng.net
(integer) 1
#若key不存在，则删除失败
127.0.0.1:6379> DEL age
(integer) 0

# EXPIRE 设置key的过期时间
127.0.0.1:6379> set www.biancheng.net Python
OK
127.0.0.1:6379> EXPIRE www.biancheng.net 120
(integer) 1

# PEXPIREAT以时间戳格式设置过期时间，并以毫秒为单位
127.0.0.1:6379> set www.biancheng.net Python
OK
127.0.0.1:6379> PEXPIREAT www.biancheng.net 12000000000
(integer) 1

# KEYS命令查找指定模式的key
# 查询course开头的key
127.0.0.1:6379> keys course*
1) "course1"
2) "course2"
3) "course3"
# 查询所有的key
127.0.0.1:6379> keys *
1) "course1"
2) "course2"
3) "course3"
4) "www.biancheng.net"

# TTL命令检查 key 剩余的过期时间
# 当键没有设置过期时间，表示是永久有效时，TTL 命令返回 -1；
# 当键过期或者被删除时，TTL 命令返回 -2。
127.0.0.1:6379> SET www.biancheng.net hello
OK
127.0.0.1:6379> ttl www.biancheng.net
(integer) -1
127.0.0.1:6379> SET user:1 Jack 120
OK
127.0.0.1:6379> TTL user:1
(integer) 108
127.0.0.1:6379> DEL user:1
(integer) 1
127.0.0.1:6379> TTL user:1
(integer) -2

```
