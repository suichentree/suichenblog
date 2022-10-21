---
title: MySQL（持续更新）
date: 2021-03-15
sidebar: 'auto'
categories: 
 - 数据库
tags:
 - MySql
---

[toc]

## 1. Mysql命令

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

## 2 对表格操作:

### 1.创建数据表：

> create table 表名 ( <字段名1> <类型1> [,..<字段名n> <类型n>]);

<h3>例如：创建如下表</h3>

字段名 | 数字类型 |	数据宽度 | 是否为空 | 是否主键 | 自动增加 | 默认值
------------ | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
id | int | 4 | 否 |	primary key | auto_increment	 
name | char | 20 | 否	 	 	 
sex | int |	4 |	否 | 0
degree | double | 16 | 是	 	 	 


```
mysql> create table MyClass( id int(4) not null primary key auto_increment,
> name char(20) not null,
> sex int(4) not null default '0',
> degree double(16,2)
> );
```


### 2.展示表的结构：
> show columns from table_name;


### 3.删除数据表的结构与数据：

> drop table 表名

<font color="red">DROP TABLE用于删除一个或多个表。您必须有每个表的DROP权限。DROP是删除表数据和表定义。</font>


### 4.使用 alter table ... add 来为数据表中添加字段 int类型的 id,长度为4，默认值为0：
> alter table 表名 add id int(4) default '0';


### 5. 使用 alter table ... drop来删除表的 id 字段：
> alter table 表名 drop id;


### 6. 使用 alter table ...  modify 修改字段类型:

把字段 c 的类型从 CHAR(1) 改为 CHAR(10):

> alter table 表名 modify c CHAR(10);


### 7. 使用 alter table ... change 修改字段类型名称与类型:

在 change 关键字之后，紧跟着的是你要修改的字段名，然后指定新字段的类型及名称(**i是旧字段名，j是新字段名，int为j的数据类型**):

> alter table 表名 change i j int;


### 8. 重命名表格名:

>①：方式1
> alter table 旧表名 rename to 新表名;
>②：方式2
> rename table 原表名 to 新表名;


### 9. 使用 alter table ... add index 为字段加索引
mysql> alter table 表名 add index 索引名 (字段名1[，字段名2 …]);

> mysql> alter table employee add index  emp_name (name);


### 10. 加主关键字的索引
  mysql> alter table 表名 add primary key (字段名);
> mysql> alter table employee add primary key(id);


### 11. 加唯一限制条件的索引
  mysql> alter table 表名 add unique 索引名 (字段名);
> mysql> alter table employee add unique emp_name2(cardnumber);


### 12. 删除某个索引
   mysql> alter table 表名 drop index 索引名;
> mysql>alter table employee drop index emp_name;


## 3.对表格中的数据操作：

### 1. 删除表的数据：

> mysql> delete from student [where 条件]

①如果没有指定 WHERE 子句，表中的所有记录将被删除（不删除表的结构，表还存在数据库中，只是没有了数据）。
②你可以在 WHERE 子句中指定任何条件
③您可以在单个表中一次性删除记录。

### 2. 插入数据：

语法：
> insert into <表名> [( <字段名1>[,..<字段名n > ])] values ( 值1 )[, ( 值n )]

> insert into 表名 (sid, sname,sgender,... ) values ( 1, 'jim','男',...);

<font color="red">注意：字符数据，统一用单引号（' '）,引起来。</font>

### 3. 修改数据：

语法：
> update 表名 set 字段=新值,… where 条件

> update 表名 set sid=value1,sname=value2.... [where 条件]

<font color="red">

①你可以同时更新一个或多个字段。
②你可以在 WHERE 子句中指定任何条件。
③你可以在一个单独表中同时更新数据。

</font>


### 4. 查询数据：

#### ①：查询表中全部数据：

> select * from 表名;

<font color="red">* 表示全部的意思</font>


#### ②: 查询表中前几行数据

> select * from 表名 order by id limit 0,2;

<font color="red">查询表中前2行的数据</font>

#### ③：查询表中特定字段的数据：

语法：
> select <字段1，字段2，...> from < 表名 > where < 表达式 >
> select sid,sname,.. from student where sid>10;


#### ④：查询多个表的数据：

> select 字段1,字段2, ...字段N from 表名1,表名2...where 条件1 [and /or] 条件2.....

#### ⑤: 使用 LIKE 子句模糊查询：

**LIKE模糊查询的通配符:**

通配符 | 说明 | 举例
------------ | -------------  | ------------- 
% | 包含零个或多个字符的任意字符串。|WHERE bookname LIKE '%computer%' 将查找在书名中任意位置包含单词 "computer" 的所有书名。
_（下划线）| 任何单个字符。| WHERE name LIKE '_ean' 将查找以 ean结尾的所有 4 个字母的名字（例如 Dean、Sean等）
[ ]  | 指定范围 ([a-f]) 或集合([abcdef]) 中的任何单个字符。 | WHERE name LIKE '[C-P]arsen' 将查找以 arsen 结尾并且以介于 C 与 P 之间的任何单个字符开始的作者姓氏，（例如Carsen、Larsen、Karsen 等。）
[^]  |  不属于指定范围 ([a-f]) 或集合([abcdef]) 的任何单个字符。 | WHERE au_lname LIKE 'de[^l]%' 将查找以de 开始并且其后的字母不为 l 的所有作者的姓氏。


> select 字段1, 字段2,...字段N 表名1,表名2...where 字段1 like 条件1 [and /or] 字段2 = 条件2

<font color="red">

①如果没有使用百分号(%), LIKE 子句与等号（=）的效果是一样的。
② % 表示任意多个字符，_ 表示任意单个字符。

</font>


#### ⑥：使用 order by 子句将查询数据排序后再返回数据:

> select 字段1, 字段2,...字段N from 表名1, 表名2...
order by 字段1, [字段2...] [asc [desc]]

<font color="red">

①你可以使用任何字段来作为排序的条件，从而返回排序后的查询结果。
②你可以设定多个字段来排序。
③ASC : 升序 。 DESC ：降序。 默认情况下，它是按升序排列。
④你可以添加 WHERE...LIKE 子句来设置条件。

</font>

####  ⑦： group by 语句根据一个或多个列对结果集进行分组：
使用 GROUP BY 语句 把表按名字进行分组，并统计每个人有多少条记录：

> SELECT sname, COUNT(*) FROM  student group by sname;


## 4. join 的使用---连接多个表:

join 按照功能大致分为如下三类：
①： inner join（内连接,或等值连接）：获取两个表中字段匹配关系的记录。
②： left join（左连接）：获取左表所有记录，即使右表没有对应匹配的记录。
③： right join（右连接）：用于获取右表所有记录，即使左表没有对应匹配的记录。

### 1.inner join --- 连接两个表:

例如：读取 tbl表中所有 author字段在tb2表对应的 count字段值：

>select a.id, a.author, b.count from tbl a inner join tb2 b on a.author = b.author;    

### 2.left join:
以 tbl 为左表，tb2 为右表:

> select a.id, a.author, b.count from tbl a  left join tb2 b on a.author = b.author;


### 3.right join:
以 tbl 为左表，tb2 为右表:

> select b.id, b.author, a.count from   tbl a right join tb2 b on a.author = b.author;



## 5. NULL 值处理：

① is null: 当列的值是NULL,此运算符返回true。
② is not null: 当列的值不为NULL, 运算符返回true。
③ <=>: 比较操作符（不同于=运算符），当比较的的两个值为NULL时返回true。
④ 不能使用 = NULL 或 != NULL 在列中查找 NULL 值 。
> ⑤在MySQL中，NULL值与任何其它值的比较（即使是NULL）永远返回false，即 NULL = NULL 返回false 。

⑥MySQL中处理NULL使用is null和is not null运算符.


## 6.UNION 操作符(用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中)

语法格式：

```sql
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions]
UNION [ALL]
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions];
```

>默认情况下 UNION 操作符已经删除了重复数据
>ALL: 可选，返回所有结果集，包含重复数据。


<h3>UNION 实例</h3>

```sql
SELECT country FROM t1
UNION
SELECT country FROM t2
ORDER BY country; 
```

>从 "t1" 和 "t2" 表中选取所有不同的country（只有不同的值,排除重复值）：

<h3>UNION ALL 实例</h3>

```sql
SELECT country FROM t1
UNION ALL
SELECT country FROM t2
ORDER BY country;
```

>从 "t1" 和 "t2" 表中选取所有的country（包含重复的值）：

<h3>带有 WHERE 的UNION ALL 实例</h3>

```sql
SELECT country, name FROM t1
WHERE country='CN'
UNION ALL
SELECT country, app_name FROM t2
WHERE country='CN'
ORDER BY country; 
```

>从 "t1" 和 "t2" 表中选取所有的CN的数据（也有重复的值）：


