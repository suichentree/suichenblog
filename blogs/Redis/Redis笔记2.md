---
title: Redis笔记2
date: 2023-07-24
sidebar: 'auto'
categories: 
 - 数据库
tags:
 - Redis
---

[toc]

# Redis笔记2

## 基础命令

* set命令：设置键值对。
* get命令：通过key值，获取键值对。
* select 命令：切换数据库。
* dbsize 命令：查看当前数据库的键值对的数量。
* flushdb 和 flushall 命令
* keys命令
* expire命令：指定某个key的过期时间

```bash
## 设置一个 key="k1",value="hello"的键值对,之前有的会覆盖
> set k1 hello

## 通过key值，获取当前数据库的对于的value值。
> get k1
> "hello"

## redis一共有16个数据库（0-15）。这里是切换到2号数据库
> select 2

> dbsize
## 表示当前数据库只有一个键值对
> 1

## flushdb 删除当前数据库的所有key-value
> flushdb

## flushall 命令：删除所有（16个）数据库的所有key-value
> flushall

## keys * 命令：查询当前数据库的所有key
> keys *
> "ks"
> "k1"
> "k2"
> "qwe"

## keys ？ 命令：通过占位符查询特定的key
## 查询当前数据库的以k为首字符的key
> keys k?
> "ks"
> "k1"
> "k2"

## 设置key1键10秒后过期
> EXPIRE key1 10
```

**其他基础命令**

命令 | 功能
---- | ---- 
DEL key | 此命令删除一个指定键(如果存在)。
DUMP key | 此命令返回存储在指定键的值的序列化版本。
EXISTS key | 此命令检查键是否存在。
TTL key | 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。-1表示永不过期，-2表示已经过期。
TYPE key | 返回存储在键中的值的数据类型
KEYS pattern | 查找与指定模式匹配的所有键。
MOVE key db | 将键移动到另一个数据库。
PERSIST key | 删除指定键的过期时间，得永生。
RANDOMKEY | 从Redis返回一个随机的键。
RENAME key newkey  | 更改键的名称。
PTTL key | 以毫秒为单位返回 key 的剩余的过期时间。
RENAMENX key newkey | 如果新键不存在，重命名键。
EXPIRE key seconds | 设置键在指定时间秒数之后到期/过期。
EXPIREAT key timestamp | 设置在指定时间戳之后键到期/过期。这里的时间是Unix时间戳格式。
PEXPIRE key milliseconds | 设置键的到期时间(以毫秒为单位)。
PEXPIREAT key milliseconds-timestamp | 以Unix时间戳形式来设置键的到期时间(以毫秒为单位)。


## 数据类型（value值的数据类型）

Redis是典型的key-value数据库，key一般是字符串，而value可以包含很多不同的数据类型。

如图所示
![redis20221010142951.png](../blog_img/redis20221010142951.png)

* 基本数据类型有5种：String（字符串）,Hash（哈希散列）,List（列表）,Set（集合）,Zset（有序集合，又名Sortedset）
* 特殊数据类型有3种：GEO,BitMap,HyperLog

<font color="red">注意：这里指的数据类型是 Value（值） 的数据类型。</font>

### String 字符串类型

String类型，也就是字符串类型。根据字符串的格式不同，又可以分为3类：

```
string：普通字符串
int：整数类型，可以做自增、自减操作
float：浮点类型，可以做自增、自减操作
```

不管是哪种格式，底层都是字节数组形式存储，只不过是编码方式不同。字符串类型的最大空间不能超过512m。如图是String类型value的存储形式。

![redis20221010145150.png](../blog_img/redis20221010145150.png)
![redis20221010173913.png](../blog_img/redis20221010173913.png)

> 针对String类型value的常见命令有：

命令 | 功能
---- | ---- 
append key value | 如果 key 已经存在并且是一个字符串，该命令将指定的 value 追加到该 key 原来值（value）的末尾。
strlen key | 返回 key 所储存的字符串值的长度。
getset key value | 先get返回key的旧值,再覆盖 key 的值为 value。
incr key | 将 key 中储存的数字值自增一。(注意必须是数字才能进行加减)
incrby key num | 将 key 所储存的值加上给定的num值。(注意必须是整型数字才能进行加减)
incrbyfloat key num | 将 key 所储存的值加上给定的num值。(注意必须是浮点型数字才能进行加减)
decr key | 将 key 中储存的数字值减一。(注意必须是数字才能进行加减)
decrby key num | key 所储存的值减去给定的num值 。 (注意必须是数字才能进行加减)
getrange key num1 num2 | 获取指定区间范围（num1-num2）的值
setrange key offset value | 从偏移量 offset 开始,重新设置key的值（会覆盖）。 
setex key seconds value | 设置键值对 ，并将 key 的过期时间设为 seconds (以秒为单位)。
setnx key value | 当key不存在时，设置键值对。用于避免set命令导致的覆盖
mget key1 [key2..] | 返回(一个或多个) key 的值。
mset key value [key value ...] | 同时设置一个或多个 key-value。
msetnx key value [key value ...] | 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。

> 例子

```bash
## INCR和INCRBY和DECY
127.0.0.1:6379> set age 10
127.0.0.1:6379> get age 
"10"
127.0.0.1:6379> incr age        ##增加1
(integer) 11
127.0.0.1:6379> get age         ##获得age
"11"
127.0.0.1:6379> incrby age 2    ##一次增加2
(integer) 13 
127.0.0.1:6379> incrby age 2
(integer) 15
127.0.0.1:6379> incrby age -1   ##也可以增加负数，相当于减
(integer) 14
127.0.0.1:6379> incrby age -2   ##一次减少2个
(integer) 12
127.0.0.1:6379> DECR age        ##相当于 incr 负数，减少正常用法
(integer) 11
127.0.0.1:6379> get age 
"11"

## SETNX
127.0.0.1:6379> set name Jack       ##设置名称
OK
127.0.0.1:6379> setnx name lisi     ##如果key不存在，则添加成功
(integer) 0
127.0.0.1:6379> get name            ##由于name已经存在，所以lisi的操作失败
"Jack"
127.0.0.1:6379> setnx name2 lisi    ##name2 不存在，所以操作成功
(integer) 1
127.0.0.1:6379> get name2 
"lisi"

## SETEX
127.0.0.1:6379> setex name 10 jack
OK
127.0.0.1:6379> ttl name    ## ttl查询剩余时间
(integer) 8
127.0.0.1:6379> ttl name
(integer) 5
```



### List 列表类型

Redis中的List类型与Java中的LinkedList类似，可以看做是一个双向链表结构。既可以支持正向检索和也可以支持反向检索。你可以添加一个元素到**列表的头部（左边）或者尾部（右边）。列表中的元素按照插入顺序排序。**

如图所示，list类型的存储结构。
![redis20221011170835.png](../blog_img/redis20221011170835.png)

List类型常用来存储一个有序数据，例如：朋友圈点赞列表，评论列表等。如图是List类型value的存储形式.
![redis20221010173519.png](../blog_img/redis20221010173519.png)

> List类型的特点：
1. 保证元素的顺序
2. 元素可以重复
3. 插入和删除快
4. 查询速度一般


> 针对List类型value的命令

命令      | 功能
----     | ---- 
lpush key value1 [value2] | 将一个或多个值插入到列表头部。注意是头插法
lpushx key value | 将一个值插入到已存在的列表头部
rpush key value1 [value2] | 在列表尾部中添加多个值
rpushx key value | 为已存在的列表尾部添加一个值
lindex key index | 通过索引获取列表中的元素
lrange key start stop | 获取列表范围内(start-stop)的元素，0~-1表示全部
linsert key before/after pivot value | 在列表的pivot元素前（后）插入value元素
llen key | 获取列表长度
lpop key | 移除并返回栈顶元素
rpop key | 移除并返回栈底元素
lrem key count value | 移除列表中的count个value值
ltrim key start stop | 对列表进行修剪(trim)，让列表只保留指定区间内的元素，其余元素删除。
rpoplpush source target | 移除source列表的栈底元素，并将该元素添加到target列表的栈顶
lset key index value  | 重新设置列表索引元素的值
blpop key1 [key2] timeout | 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
brpop key1 [key2] timeout | 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
brpoplpush source target timeout | 从source列表中弹出一个值，将弹出的元素插入到target列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。

> 例子

```bash
##创建k1列表，头插法存储1 2 3 4 5元素。
127.0.0.1:6379> lpush k1 1 2 3 4 5  
(integer) 5
127.0.0.1:6379> lrange k1 0 -1     ##显示k1列表的全部元素，从0~-1表示全部
1) "5"
2) "4"
3) "3"
4) "2"
5) "1"
127.0.0.1:6379> lrange k1 0 1     ##显示k1列表，0-1索引范围的元素
1) "5"
2) "4"
127.0.0.1:6379> lindex k1 0      ##获取k1列表索引0的元素
"5"
127.0.0.1:6379> llen k1          ##获取k1列表的长度
(integer) 5
127.0.0.1:6379> lpop k1         ##移除k1列表的栈顶元素并返回
"5"
 
127.0.0.1:6379> rpush k2 1 2 3 4 5   ##创建k2列表，尾插法存储1 2 3 4 5元素
(integer) 5
127.0.0.1:6379> lrange k2 0 -1
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
127.0.0.1:6379> lpop k2
"1"
127.0.0.1:6379> rpop k2 
"5"
127.0.0.1:6379> lrange k2 0 -1
1) "2"
2) "3"
3) "4"
127.0.0.1:6379> lrem k2 1 2     ##删除k2列表中的1个value为2的元素
(integer) 1
127.0.0.1:6379> lrange k2 0 -1
1) "3"
2) "4"


127.0.0.1:6379> del k1   ##删除之前的k1列表
(integer) 1
127.0.0.1:6379> lpush k1 1 2 3 4 5 6 7 8   ##重新设置k1列表
(integer) 8
127.0.0.1:6379> ltrim k1 0 4      ##截取k1列表中从栈顶开始计算的 0-4 个元素
OK
127.0.0.1:6379> lrange k1 0 -1
1) "8"
2) "7"
3) "6"
4) "5"
5) "4"
127.0.0.1:6379> rpoplpush k2 k1     ##从k2列表中取出栈底元素，放到k1列表的栈顶上
"4"
127.0.0.1:6379> lrange k1 0 -1
1) "4"
2) "8"
3) "7"
4) "6"
5) "5"
6) "4" 
127.0.0.1:6379> lset k1 0 9     ##重新设置k1列表栈顶元素为9
OK
127.0.0.1:6379> lrange k1 0 -1
1) "9"
2) "8"
3) "7"
4) "6"
5) "5"
6) "4"
127.0.0.1:6379> linsert k1 before 8 p    ##在k1列表的8元素前插入p元素
(integer) 7
127.0.0.1:6379> lrange k1 0 -1
1) "9"
2) "p"
3) "8"
4) "7"
5) "6"
6) "5"
7) "4"
```


   
### Set 集合类型

Redis的Set结构与Java中的HashSet类似，可以看做是无序集合，集合中的元素是String类型。集合成员是唯一的，即没有重复的数据。

如图是Set类型value的存储形式：
![redis20221010174142.png](../blog_img/redis20221010174142.png)

> Set 集合类型的特点：
1. 元素无序,即不按照插入顺序进行排序。
2. 元素不可重复
3. 查找快


> 针对Set类型value的命令

命令      | 功能
----     | ---- 
sadd key member1 [member2] | 向集合添加一个或多个元素
smembers key | 返回集合中的所有元素
sismember key member | 判断集合key中是否有 member 元素
srandmember key [count] | 随机返回集合中多个随机数
scard key | 获取集合中的元素个数
srem key member1 [member2] | 移除集合中多个成员
spop key | 随机取出集合中的一个元素
smove s1 s2 member | 把s1集合中的member元素移到s2集合中
sdiff key1 [key2] | 返回在key1集合不在key2集合中的元素（差集）
sdiffstore target key1 [key2] | 把key1,key2集合的差集存储在target集合中
sinter key1 [key2] | 返回key1集合与key2集合的交集元素
sinterstore target key1 [key2] | 把交集并存储在target集合中
sunion key1 [key2] | 返回所有给定集合的并集
sunionstore target key1 [key2] | 把并集存储在target集合中

> 例子

```bash
127.0.0.1:6379> sadd set1 1 2 3 4 5    ##添加元素到set1集合中
(integer) 5    
127.0.0.1:6379> smembers set1      ##返回set1集合中的所有元素
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
127.0.0.1:6379> sadd set1 1 2 6    ##再往集合set1中添加元素 1 2 6
(integer) 1                        ##结果显示添加成功1次
127.0.0.1:6379> smembers set1      ##只有6添加进去，1 2 元素重复
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
6) "6"
127.0.0.1:6379> sismember set1 2     ##判断 set1集合中是否有2元素
(integer) 1
127.0.0.1:6379> sismember set1 7     ##判断 set1集合中是否有7元素
(integer) 0

127.0.0.1:6379> srandmember set1    ##返回集合中的一个随机数
"5"
127.0.0.1:6379> srandmember set1 2
1) "6"
2) "2"

127.0.0.1:6379> sadd set2 5 6 7 8 9
(integer) 5
127.0.0.1:6379> smembers set2
1) "5"
2) "6"
3) "7"
4) "8"
5) "9"
127.0.0.1:6379> smembers set1
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
6) "6"
127.0.0.1:6379> sdiff set1 set2  ##返回在set1集合中，不再set2集合中的元素
1) "1"
2) "2"
3) "3"
4) "4"
127.0.0.1:6379> sdiffstore set3 set1 set2   ##把set1 与set2的插集的元素，存储在set3中
(integer) 4
127.0.0.1:6379> smembers set3
1) "1"
2) "2"
3) "3"
4) "4"
127.0.0.1:6379> sinter set1 set2    ##返回set1集合与set2集合中的交集元素
1) "5"
2) "6"
127.0.0.1:6379> sunion set1 set2   ##返回set1集合与set2集合中的并集元素
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
6) "6"
7) "7"
8) "8"
9) "9"
```


### Hash 哈希散列类型

Hash 哈希散列类型（key是键，value是一个map,value可以存储多个键值对）,hash类型特别适合用于存储对象。类似于Java中的HashMap结构。

Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD。如图是Hash类型value的存储形式
![redis20221010151943.png](../blog_img/redis20221010151943.png)
![redis20221010172434.png](../blog_img/redis20221010172434.png)

<font color="red">注意：一个key中最多包含 2^32-1 个键值对。</font>

> 针对Hash类型value的命令

命令  | 功能
----  | ---- 
hset key field value | 添加或者修改hash类型key的field的value值 。
hget key field | 获取哈希表key中field字段的value值。
hmset key field1 value1 [field2 value2 ] | 批量添加多个field-value到哈希表 key 中。
hmget key field1 [field2] | 批量获取多个哈希表key的field的值
hgetall key | 获取哈希表key中的所有字段和值
hdel key field1 [field2] | 删除多个哈希表字段
hkeys key | 获取哈希表key中的所有字段field
hvals key | 获取哈希表key中所有字段field对应所有value值
hlen key | 获取哈希表中字段的数量 
hexists key field | 查看哈希表key中指定的字段是否存在。
hincrby key field num | 为哈希表key中的指定字段的整数值加上增量num。
hincrbyfloat key field num | 为哈希表key中的指定字段的浮点数值加上增量num 。
hsetnx key field value | 只有在字段 field 不存在时，设置哈希表key中field字段的值。

> 例子

```bash
## HSET和HGET
127.0.0.1:6379> HSET heima:user:3 name Lucy   ##大key是 heima:user:3 小key是name，小value是Lucy
(integer) 1
127.0.0.1:6379> HSET heima:user:3 age 21      ## 如果操作不存在的数据，则是新增
(integer) 1
127.0.0.1:6379> HSET heima:user:3 age 17      ## 如果操作存在的数据，则是修改
(integer) 0
127.0.0.1:6379> HGET heima:user:3 name 
"Lucy"
127.0.0.1:6379> HGET heima:user:3 age
"17"

## HMSET和HMGET
127.0.0.1:6379> HMSET heima:user:4 name HanMeiMei
OK
127.0.0.1:6379> HMSET heima:user:4 name LiLei age 20 sex man
OK
127.0.0.1:6379> HMGET heima:user:4 name age sex
1) "LiLei"
2) "20"
3) "man"

## HGETALL
127.0.0.1:6379> HGETALL heima:user:4
1) "name"
2) "LiLei"
3) "age"
4) "20"
5) "sex"
6) "man"

## HKEYS和HVALS
127.0.0.1:6379> HKEYS heima:user:4
1) "name"
2) "age"
3) "sex"
127.0.0.1:6379> HVALS heima:user:4
1) "LiLei"
2) "20"
3) "man"

## HINCRBY
127.0.0.1:6379> HINCRBY  heima:user:4 age 2
(integer) 22
127.0.0.1:6379> HVALS heima:user:4
1) "LiLei"
2) "22"
3) "man"
127.0.0.1:6379> HINCRBY  heima:user:4 age -2
(integer) 20

## HSETNX
127.0.0.1:6379> HSETNX heima:user4 sex woman
(integer) 1
127.0.0.1:6379> HGETALL heima:user:3
1) "name"
2) "Lucy"
3) "age"
4) "17"
127.0.0.1:6379> HSETNX heima:user:3 sex woman
(integer) 1
127.0.0.1:6379> HGETALL heima:user:3
1) "name"
2) "Lucy"
3) "age"
4) "17"
5) "sex"
6) "woman"
```


### Zset 有序集合类型(又名 SortedSet)

Redis中Zset和set一样也是string类型元素的集合,并且不允许重复的成员。

但底层数据结构却差别很大。Zset中的每一个元素都会关联一个score属性，redis正是通过score属性来为Zset中的成员进行排序。Zset底层的实现是一个跳表+hash表。

<font color="red">例如：Zset在集合set的基础上，给每个元素都关联了一个score值。之前的set是(K,(v1,v2,v3,...))。现在的Zset是(K,((score1,v1),(score2,v2),(score3,v3)....) ,其中(score1,v1)是键值对。
</font> 

> Zset(SortedSet)的特点
- 可排序
- 元素不重复
- 查询速度快


> 如图是SortedSet类型value的存储形式

![redis20221010180048.png](../blog_img/redis20221010180048.png)

> 针对SortedSet类型value的命令

 命令  | 功能 
----  | ---- 
zadd key score1 member1 [score2 member2] | 向有序集合添加多个成员，或者更新已存在成员的分数
zcard key | 获取有序集合的成员数
zcount key min max | 计算在有序集合中指定区间分数的成员数
zscore key member | 返回有序集合中member成员的分数值
zrank key member | 返回指定成员的下标值（索引），从0开始
zrevrank key member | 逆序获得下标值。
zrange key start stop [withscores] | 返回有序集合中指定区间内的成员
zrangebyscore key min max [withscores] [limit] | 通过分数返回有序集合指定区间内的成员
zrevrange key start stop | 逆序返回指定区间内的成员
zrevrangebyscore key max min | 逆序返回指定分数区间内的成员（通过分数从高到低排序）
zrem key member [member ...] | 移除有序集合的多个成员
zremrangebyrank key start stop | 移除有序集合中给定索引的所有成员
zremrangebyscore key min max | 移除有序集合中给定分数区间的所有成员
zincrby key num member | 有序集合中对指定成员的分数加上增量 num
zinterscore target numkeys key [key ...] | 计算给定的多个有序集的交集并存储在新的有序集合target中
zunionstore target numkeys key [key ...] | 计算给定的多个有序集的并集，并存储在新的target中

> 例子

```bash
127.0.0.1:6379> zadd zset1 10 user1 20 user2 40 user4   ##设置有序集合zset1,其中10分的是user1,....
(integer) 3
127.0.0.1:6379> zrange zset1 0 -1    ##返回指定范围的有序集合的内容
1) "user1"
2) "user2"
3) "user4"
127.0.0.1:6379> zrange zset1 0 -1 withscores    ##返回指定范围的有序集合的内容，带分数
1) "user1"
2) "10"
3) "user2"
4) "20"
5) "user4"
6) "40"
127.0.0.1:6379> zrangebyscore zset1 10 40     ##找出10分到40分的元素成员
1) "user1"
2) "user2"
3) "user4"
127.0.0.1:6379> zrangebyscore zset1 10 40 limit 0 2      ##找出10分到40分的，从第0个开始选2个元素出来
1) "user1"
2) "user2"
127.0.0.1:6379> zcard zset1     ##返回有序集合的成员数
(integer) 3
127.0.0.1:6379> zcount zset1 10 40   ##返回有序集合中的10-40分的成员数
(integer) 3
```