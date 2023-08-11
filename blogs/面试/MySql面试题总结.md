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

## 说说innodb存储引擎和myisam存储引擎的区别？

* 事务：InnoDB支持事务；MyISAM不支持。
* 锁：InnoDB支持行级锁；MyISAM只支持表级锁。
* 索引：InnoDB和MyISAM都用B+树的方式存储索引。
* 全文索引：InnoDB不支持（可通过插件等方式支持）；MyISAM默认支持。 
* 外键：InnoDB支持外键；MyISAM不支持。
* 读写性能：InnoDB增删改性能更优；MyISAM查询性能更优。
* 存储结构：InnoDB在磁盘存储为一个文件；MyISAM在磁盘上存储成三个文件（表定义、数据、索引）。

## MySQL中InnoDB引擎的行锁是怎么实现的？

答：InnoDB是基于索引来完成行锁?

例: select * from tab_with_index where id = 1 for update;for update 
可以根据条件来完成行锁锁定，并且 id 是有索引键的列，如果 id不是索引键那么InnoDB将完成表锁，并发将无从谈起。

## 当WHERE子句、GROUP BY子句、HAVING子句、ORDER BY子句同时出现在一个SQL查询语块中时，执行顺序为？

常见的一些语句执行顺序： 1 from 2 where 3 group by 4 having 5 select 6 order by 7 limit 