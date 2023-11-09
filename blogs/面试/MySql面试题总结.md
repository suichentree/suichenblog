---
title: MySql面试题总结
date: 2022-10-31
sidebar: 'auto'
categories: 
 - 面试
tags:
 - MySql
---

[toc]

# MySql面试题总结


## 常见的sql优化有哪些？

1、查询语句中不要使用select *
2、在需要多表查询的情况下，减少使用子查询，多使用关联查询（left join,right join,inner join）替代
3、减少使用IN或者NOT IN ,使用exists，not exists或者关联查询语句替代
4、or 的查询尽量用 union或者union all 代替(在确认没有重复数据或者不用剔除重复数据时，union all会更好)
5、应尽量避免在 where 子句中使用!=或<>操作符，否则存储引擎会放弃使用索引而进行全表扫描。
6、应尽量避免在 where 子句中对字段进行 null 值判断，否则将导致引擎放弃使用索引而进行全表扫描，如： select id from t where num is null 可以在num上设置默认值0，确保表中num列没有null值，然后这样查询： select id from t where num=0


## 分库分表之后,id 主键如何处理？

当分库分表后，若每个表的id都是从1开始自增，则容易出现相同id的问题。因此我们需要一个生成全局的id的方式。

生成全局 id 有下面这几种方式
- uuid: 不适合作为主键，因为太长了。并且无序性不可读，查询效率低。比较适合用于生成唯一的名字的标示比如文件的名字。
- 数据库自增 id : 两台数据库分别设置不同步长，生成不重复ID的策略来实现高可用。这种方式生成的 id 有序，但是需要独立部署数据库实例，成本高，还会有性能瓶颈。
- 利用 redis 生成 id : 性能比较好，灵活方便，不依赖于数据库。但是，引入了新的组件造成系统更加复杂，可用性降低，编码更加复杂，增加了系统成本。
- 美团的Leaf分布式ID生成系统 ：Leaf 是美团开源的分布式ID生成器，能保证全局唯一性、趋势递增、单调递增、信息安全，里面也提到了几种分布式方案的对比，但也需要依赖关系数据库、Zookeeper等中间件。

## 说一说drop、delete与truncate的区别

SQL中的drop、delete、truncate都表示删除，但是三者有一些差别。

- delete和truncate只删除表的数据不删除表的结构
- 速度,一般来说: drop> truncate >delete 
- delete语句是dml,这个操作会放到rollback segement中,事务提交之后才生效;如果有相应的trigger,执行的时候将被触发. 
- truncate,drop是ddl, 操作立即生效,原数据不放到rollback segment中,不能回滚. 操作不触发trigger.


## 什么是视图

视图是一种虚拟的表，具有和物理表相同的功能。可以对视图进行增，改，查等操作。

试图通常是有一个表或者多个表的行或列的子集。对视图的修改不影响基本表。它使得我们获取数据更容易，相比多表查询

## 什么是内联接、左外联接、右外联接？

- 内联接（Inner Join）：匹配2张表中相关联的记录。
- 左外联接（Left Outer Join）：除了匹配2张表中相关联的记录外，还会匹配左表中剩余的记录，右表中未匹配到的字段用NULL表示。
- 右外联接（Right Outer Join）：除了匹配2张表中相关联的记录外，还会匹配右表中剩余的记录，左表中未匹配到的字段用NULL表示。在判定左表和右表时，要根据表名出现在Outer Join的左右位置关系。





## mysql有关权限的表都有哪几个

MySQL服务器通过权限表来控制用户对数据库的访问，权限表存放在mysql数据库里，由mysql_install_db脚本初始化。这些权限表分别user，db，table_priv，columns_priv和host。

下面分别介绍一下这些表的结构和内容：
- user权限表：记录允许连接到服务器的用户帐号信息，里面的权限是全局级的。
- db权限表：记录各个帐号在各个数据库上的操作权限。
- table_priv权限表：记录数据表级的操作权限。
- columns_priv权限表：记录数据列级的操作权限。
- host权限表：配合db权限表对给定主机上数据库级操作权限作更细致的控制。这个权限表不受
- GRANT和REVOKE语句的影响。

## mysql有哪些数据类型

整数类型包括TINYINT、SMALLINT、MEDIUMINT、INT、BIGINT，分别表示1字节、2字节、3字节、4字节、8字节整数。

实数类型，包括FLOAT、DOUBLE、DECIMAL。

字符串类型，包括VARCHAR、CHAR、TEXT、BLOB

枚举类型（ENUM），把不重复的数据存储为一个预定义的集合。

日期和时间类型，尽量使用timestamp，空间效率高于datetime，

>使用策略：
- 对于经常变更的数据来说，CHAR比VARCHAR更好，因为CHAR不容易产生碎片。
- 对于非常短的列，CHAR比VARCHAR在存储空间上更有效率。
- 使用时要注意只分配需要的空间，更长的列排序时会消耗更多内存。
- 尽量避免使用TEXT/BLOB类型，查询时会使用临时表，导致严重的性能开销。

## 创建索引的三种方式

第一种方式：在执行CREATE TABLE时创建索引。

第二种方式：使用ALTER TABLE命令去增加索引。

第三种方式：使用CREATE INDEX命令创建。

## MySQL中InnoDB引擎的行锁是怎么实现的？

答：InnoDB是基于索引来完成行锁?


可以根据条件来完成行锁锁定，并且 id 是有索引键的列，如果 id不是索引键那么InnoDB将完成表锁，并发将无从谈起。

## 当WHERE子句、GROUP BY子句、HAVING子句、ORDER BY子句同时出现在一个SQL查询语块中时，执行顺序为？

常见的一些语句执行顺序： 1 from 2 where 3 group by 4 having 5 select 6 order by 7 limit 


