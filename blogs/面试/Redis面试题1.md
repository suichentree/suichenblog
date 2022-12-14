---
title: Redis面试题
date: 2019-11-11
sidebar: 'auto'
categories:
 - 面试
tags:
 - Redis
---

[toc]


## Redis面试题

### 1.什么是 Redis?
Redis 是一个高性能的 key-value 数据库。其有三个特点：① Redis 支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。② Redis 不仅仅支持简单的 key-value 类型的数据，同时还提供 list，set，zset，hash 等数据结构的存储。③ Redis 支持数据的备份，即 master-slave 模式的数据备份。

### 2.Redis 的数据类型？
Redis 支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及 zsetsorted set：有序集合)。

### 3.Redis优势？
1. 速度快，因为数据存在内存中，类似于 HashMap，HashMap 的优势就是查找和操作的时间复杂度都是 O(1)
2. 支持丰富数据类型，支持 string，list，set，Zset，hash 等
3. 支持事务，操作都是原子性，所谓的原子性就是对数据的更改要么全部执行，要么全部不执行
4. 丰富的特性：可用于缓存，消息，按 key 设置过期时间，过期后将会自动删除。

### 4.Redis是单进程单线程的？
Redis是单进程单线程的，redis利用队列技术将并发访问变为串行访问，消除了传统数据库串行控制的开销。

### 5.Redis中一个字符串类型的值能存储最大容量是多少？
512M

### 6.Redis 的持久化机制是什么？各自的优缺点？
Redis提供两种持久化机制 RDB 和 AOF 机制。

#### 1.RDB（redis database）持久化方式

是指用数据集快照的方式半持久化模式记录 redis 数据库的所有键值对,在某个时间点将数据写入一个临时文件，持久化结束后，用这个临时文件替换上次持久化的文件，达到数据恢复。

优点：（1）只有一个文件 dump.rdb，方便持久化。（2）容灾性好，一个文件可以保存到安全的磁盘。（3）性能最大化，fork 子进程来完成写操作，让主进程继续处理命令，所以是 IO最大化。使用单独子进程来进行持久化，主进程不会进行任何 IO 操作，保证了 redis的高性能（4）相对于数据集大时，比 AOF 的启动效率更高。

缺点：数据安全性低。RDB持久化机制是间隔一段时间进行持久化，如果持久化之间 redis 发生故障，会发生数据丢失。所以这种方式更适合数据要求不严谨的时候

#### 2.AOF（Append-only file)持久化方式
是指所有的命令行记录以 redis 命令请求协议的格式完全持久化存储。保存为 aof 文件。

优点：（1）数据安全，aof 持久化可以配置 appendfsync 属性，有 always，每进行一次命令操作就记录到 aof 文件中一次。（2）通过 append 模式写文件，即使中途服务器宕机，可以通过 redis-check-aof 工具解决数据一致性问题。（3）AOF 机制的rewrite 模式。AOF 文件没被 rewrite 之前（文件过大时会对命令进行合并重写），可以删除其中的某些命令（比如误操作的 flushall）)

缺点：（1）AOF 文件比 RDB 文件大，且恢复速度慢。（2）数据集大的时候，比 rdb 启动效率低。

#### 3.Redis 常见性能问题和解决方案？
1. Master 最好不要写内存快照，如果 Master 写内存快照，save 命令调度 rdbSave函数，会阻塞主线程的工作，当快照比较大时对性能影响是非常大的，会间断性暂停服务
2. 如果数据比较重要，某个 Slave 开启 AOF 备份数据，策略设置为每秒同步一次   
3. 为了主从复制的速度和连接的稳定性，Master 和 Slave 最好在同一个局域网
4. 尽量避免在压力很大的主库上增加从库。
5. 主从复制不要用图状结构，用单向链表结构更为稳定，即：Master <- Slave1<- Slave2 <- Slave3…这样的结构方便解决单点故障问题，实现 Slave 对 Master的替换。如果 Master 挂了，可以立刻启用 Slave1 做 Master，其他不变。

### 7.redis过期键的删除策略？
1. 定时删除:在设置键的过期时间的同时，创建一个定时器 timer). 让定时器在键的过期时间来临时，立即执行对键的删除操作。
2. 惰性删除:放任键过期不管，但是每次从键空间中获取键时，都检查取得的键是否过期，如果过期的话，就删除该键;如果没有过期，就返回该键。
3. 定期删除:每隔一段时间程序就对数据库进行一次检查，删除里面的过期键。至于要删除多少过期键，以及要检查多少个数据库，则由算法决定。

### 8.Redis 如何设置密码及验证密码？
设置密码：config set requirepass 123456
授权密码：auth 123456

### 9.Redis提供几种回收策略（淘汰策略）?
Redis提供6种数据淘汰策略
1. volatile-lru：从已设置过期时间的数据集（server.db[i].expires）中挑选最近最少使用的数据淘汰
2. volatile-ttl：从已设置过期时间的数据集（server.db[i].expires）中挑选将要过期的数据淘汰
3. volatile-random：从已设置过期时间的数据集（server.db[i].expires）中任意选择数据淘汰
4. allkeys-lru：从数据集（server.db[i].dict）中挑选最近最少使用的数据淘汰。
5. allkeys-random：从数据集（server.db[i].dict）中任意选择数据淘汰
6. no-enviction（驱逐）：禁止驱逐淘汰数据

### 10.Redis 的内存用完了会发生什么？
如果达到设置的上限，Redis 的写命令会返回错误信息。但是读命令还可以正常返回。

### 11.MySQL 里有 2000w 数据，redis 中只存 20w 的数据，如何保证 redis 中的数据都是热点数据？
Redis 内存数据集大小上升到一定大小的时候，就会施行数据淘汰策略。可以使用allkeys-lru数据淘汰策略。

allkeys-lru数据淘汰策略：从数据集（server.db[i].dict）中挑选最近最少使用的数据淘汰

### 12.Redis最适合的场景？
1. 会话缓存（Session Cache）
最常用的一种使用 Redis 的情景是会话缓存（session cache）。
2. 全页缓存（FPC）
除基本的会话 token 之外，Redis 还提供很简便的 FPC 平台。回到一致性问题，即使重启了 Redis 实例，因为有磁盘的持久化，用户也不会看到页面加载速度的下降。
3. 队列
Reids 在内存存储中提供 list 和 set 操作，这使得 Redis能作为一个很好的消息队列平台来使用。Redis 作为队列使用的操作，就类似于程序语言对list的push/pop 操作。
4. 排行榜/计数器
Redis 在内存中对数字进行递增或递减的操作实现的非常好。集合（Set）和有序集合（Sorted Set）也使得我们在执行这些操作的时候变的非常简单，Redis 只是正好提供了这两种数据结构。
5. 发布/订阅
Redis 的发布/订阅功能。发布/订阅的使用场景确实非常多。我已看见人们在社交网络连接中使用，还可作为基于发布/订阅的脚本触发器，甚至用 Redis 的发布/订阅功能来建立聊天系统！

### 13.假如 Redis 里面有 1 亿个 key，其中有 10w 个 key 是以某个固定的已知的前缀开头的，如果将它们全部找出来？

<font color="red">使用 keys 指令可以扫出指定模式的 key 列表。</font>

注意：redis 的单线程的。keys 指令会导致线程阻塞一段时间，线上服务会停顿，直到指令执行完毕，服务才能恢复。因此可以使用 scan 指令，scan 指令可以无阻塞的提取出指定模式的 key 列表，但是会有一定的重复概率，在客户端做一次去重就可以了，但是整体所花费的时间会比直接用 keys 指令长。

### 14.如果有大量的 key 需要设置同一时间过期，一般需要注意什么？
如果大量的key过期时间设置的过于集中，到过期的那个时间点，redis 可能会出现短暂的卡顿现象。一般需要在时间上加一个随机值，使得过期时间分散一些。