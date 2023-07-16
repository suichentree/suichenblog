---
title: MySQL命令
date: 2021-03-15
sidebar: 'auto'
categories: 
 - 数据库
tags:
 - MySql
---

[toc]

# MySQL命令

## Mysql初步使用

<font color="red">注意-u 与 root之间可以有空格也可以没有空格，但是密码前必须没有空格</font>

```
1. 连接Mysql:
格式： mysql -h主机地址 -u用户名 －p用户密码

> mysql -u root -p
> Enter password:密码

若连接远程主机
(如果远程主机的IP为110.110.110.110，用户名为root,密码为abcd123)
> mysql -h110.110.110.110 -u root -p abcd123;

2.退出mysql命令模式
mysql>exit

3.修改密码:
格式：mysqladmin -u用户名 -p旧密码 password 新密码

mysql>mysqladmin -uroot -pabcd123 password abcd456;


4.创建数据库
mysql> create database 数据库名;

5. 显示数据库，修改数据库默认编码:
mysql> show databases;

6.删除数据库
mysql> drop database 数据库名;

7. 连接或切换数据库(用于在命令行中对其他数据库进行操作)：
mysql> use 数据库名;

8.显示当前使用的数据库名称：
mysql> select database();

9.显示MYSQL的版本
mysql> select version(); 

10.显示当前时间:
mysql> select now(); 
mysql> SELECT YEAR(CURRENT_DATE);    ##显示年月日
mysql> SELECT MONTH(CURRENT_DATE); 
mysql> SELECT DAYOFMONTH(CURRENT_DATE); 

11.显示字符串：
mysql> SELECT "welecome to my blog!"; 

12.当计算器用:
mysql> select ((4 * 4) / 10 ) + 25; 

```



## 操作表格

下面是操作表的结构的Mysql语法

### 创建表

> 创建表格语法：

```sql
create table 表名 ( <字段名1> <类型1> [,..<字段名n> <类型n>]);
```

>例子：创建Person表,表属性如下

字段名 | 数字类型 |	数据宽度 | 是否为空 | 是否主键 | 自动增加 | 默认值
------------ | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
id | int | 4 | 否 |	primary key | auto_increment	 
name | char | 20 | 否	 	 	 
sex | int |	4 |	否 | 0
degree | double | 16 | 是	 	

```sql
mysql> create table Person( id int(4) not null primary key auto_increment,
> name char(20) not null,
> sex int(4) not null default '0',
> degree double(16,2)
> );
```

### 展示表

> 展示表格语法：
```sql
show columns from table_name;
```

### 删除表

> 删除数据表的结构与数据语法：
```sql
drop table 表名;
```

<font color="red">DROP TABLE用于删除一个或多个表。您必须有每个表的DROP权限。DROP是删除表数据和表定义。</font>

### 添加字段到表中

> 使用 alter table ... add 来为表中添加字段 int类型的 id,长度为4，默认值为0
```sql
alter table 表名 add id int(4) default '0';
```

### 删除表中字段

> 使用 alter table ... drop来删除表的 id 字段
```sql
alter table 表名 drop id;
```

### 修改表中字段

> 方式1：使用 alter table ...  modify 修改字段类型,把字段 c 的类型从 CHAR(1) 改为 CHAR(10)
```sql
alter table 表名 modify c CHAR(10);
```

> 方式2：使用 alter table ... change 修改字段类型名称与类型(i是旧字段名，j是新字段名，int为j的数据类型)
```sql
alter table 表名 change i j int;
```

### 重命名表名

* 方式1: alter table 旧表名 rename to 新表名;
* 方式2: rename table 原表名 to 新表名;

## 设置索引

下面是设置索引的Mysql语法

### 设置表中字段为普通索引

>使用 alter table ... add index 为字段加索引。
> alter table 表名 add index 索引名 (字段名1[，字段名2 …]);

```sql
alter table employee add index emp_name (name);
```

### 设置表中字段为主键索引
> alter table 表名 add primary key (字段名);

```sql
alter table employee add primary key(id);
```

### 设置表中字段为唯一索引
> alter table 表名 add unique 索引名 (字段名);

```sql
alter table employee add unique emp_name2(cardnumber);
```

### 删除表中索引
> alter table 表名 drop index 索引名;

```sql
alter table employee drop index emp_name;
```

## 操作表格数据

### 删除表格的数据

```sql
delete from student [where 条件]
```

1. 如果没有指定 WHERE 子句，表格中的所有记录将被删除（不删除表的结构，表还存在数据库中，只是没有了数据）。
2. 可以在 WHERE 子句中指定任何条件

### 插入数据到表格中

```sql
//语法：
insert into <表名> [( <字段名1>[,..<字段名n > ])] values ( 值1 )[, ( 值n )]

//例子： 在student表中插入一条包含sid，sname,sgender的数据
insert into student(sid, sname,sgender) values ( 1, 'jim','男');
```

<font color="red">注意：字符数据，统一用单引号（' '）,引起来。</font>

### 修改表中数据

```sql
//语法：
update 表名 set 字段=新值,… where 条件

//例子： 针对student表中sid为1的记录，将sname设置为小明
update student set sname="小明" where sid = 1;
```

* 可以同时更新一个或多个字段。
* 可以在 WHERE 子句中指定任何条件。

### 查询数据

#### 查询表中全部数据

```sql
select * from 表名;  
```
<font color="red">* 表示全部的意思</font>

#### 查询表中前几行数据

```sql
select * from 表名 order by id limit 0,2;
```
<font color="red">查询表中前2行的数据</font>

#### 查询表中特定字段的数据

```sql
//语法
select <字段1，字段2，...> from < 表名 > where < 表达式 >
//例子
select sid,sname,.. from student where sid>10;
```

#### 查询多个表的数据

```sql
//语法
select 字段1,字段2, ...字段N from 表名1,表名2...where 条件1 [and /or] 条件
```

## like 语句

like 语句主要用于模糊查询：

```sql
//语法
select * 表名 where 字段1 like 条件

//例子,从student表中查询sname包含job的记录
select * student where sname like '%Job%';
```

**LIKE模糊查询使用到的通配符如下**

通配符 | 说明 | 举例
------------ | -------------  | ------------- 
% | 包含零个或多个字符的任意字符串。| where bookname LIKE '%computer%' 将查找在书名中任意位置包含单词 "computer" 的所有书名。
_（下划线）| 任何单个字符。| where name LIKE '_ean' 将查找以 ean结尾的所有 4 个字母的名字（例如 Dean、Sean等）
[ ]  | 指定范围 ([a-f]) 或集合([abcdef]) 中的任何单个字符。 | where name LIKE '[C-P]arsen' 将查找以 arsen 结尾并且以介于 C 与 P 之间的任何单个字符开始的作者姓氏，（例如Carsen、Larsen、Karsen 等。）
[^]  |  不属于指定范围 ([a-f]) 或集合([abcdef]) 的任何单个字符。 | where au_lname LIKE 'de[^l]%' 将查找以de 开始并且其后的字母不为 l 的所有作者的姓氏。

## order by子句

order by子句主要用于把查询出来的数据进行排序。

```sql
select 字段 from 表名 order by 字段1, [字段2...] [asc [desc]]
```

* 可以使用任何字段来作为排序的条件，从而返回排序后的查询结果。
* 可以设定多个字段来排序。
* ASC : 升序 。 DESC ：降序。 默认情况下，它是按升序排列。

## group by 子句

group by 语句主要用于把查询出来的数据进行分组。

```sql
//使用 GROUP BY 语句 把表按名字进行分组，并统计每个人有多少条记录
SELECT sname, COUNT(*) FROM  student group by sname;
```

## join 语句

join 语句按照功能大致分为如下三类：
* inner join（内连接,或等值连接）：获取两个表中字段匹配关系的记录。
* left join（左连接）：获取左表所有记录，即使右表没有对应匹配的记录。
* right join（右连接）：用于获取右表所有记录，即使左表没有对应匹配的记录。

### inner join

例如：读取 tbl表中所有 author字段在tb2表对应的 count字段值
```sql
select a.id, a.author, b.count from tbl a inner join tb2 b on a.author = b.author;
```

### left join

以 tbl 为左表，tb2 为右表
```sql
select a.id, a.author, b.count from tbl a left join tb2 b on a.author = b.author;
```

### right join

以 tbl 为左表，tb2 为右表
```sql
select b.id, b.author, a.count from tbl a right join tb2 b on a.author = b.author;
```

## NULL值处理

* is null: 当字段的值是NULL,此运算符返回true。
* is not null: 当字段的值不为NULL,此运算符返回true。
* <=>: 比较操作符（不同于=运算符），当比较的的两个值为NULL时返回true。
* 不能使用 = NULL 或 != NULL 在列中查找 NULL 值 。
* 在MySQL中，NULL值与任何其它值的比较（即使是NULL）永远返回false，即 NULL = NULL 返回false 。
* MySQL中判断字段的值是否是NULL，需要使用is null和is not null。

## UNION 语句

UNION 操作符主要用于连接多个SELECT语句，并把多个SELECT语句的查询结果组合到一个结果中

语法格式：
```sql
SELECT * FROM table1 [WHERE conditions] 
UNION [ALL]
SELECT * FROM table2 [WHERE conditions];
```

* 默认情况下 UNION 操作符已经删除了重复数据
* ALL: 可选，返回所有结果集，包含重复数据。


> 例子
```sql
SELECT country FROM t1
UNION
SELECT country FROM t2
ORDER BY country; 
//从 "t1" 和 "t2" 表中选取所有不同的country（只有不同的值,排除重复值）

SELECT country FROM t1
UNION ALL
SELECT country FROM t2
ORDER BY country;
//从 "t1" 和 "t2" 表中选取所有的country（包含重复的值）

SELECT country, app_name FROM t1 WHERE country='CN'
UNION ALL
SELECT country, app_name FROM t2 WHERE country='CN'
ORDER BY country; 
//从 "t1" 和 "t2" 表中选取所有的CN的数据（也有重复的值）
```