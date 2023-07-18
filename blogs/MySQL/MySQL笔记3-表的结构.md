---
title: MySQL笔记3-表的结构
date: 2023-07-15
sidebar: 'auto'
categories: 
 - 数据库
tags:
 - MySql
---

[toc]

# MySQL笔记3-表的结构

MySQL 数据表是由行和列构成的，通常把表的“列”称为字段（Field），把表的“行”称为记录（Record）。

下面是与表的结构相关的Mysql语法

## 创建表

> 在 MySQL 中，可以使用 CREATE TABLE 语句创建表。其语法格式为：

```sql
create table 表名 ( <字段名1> <类型1> [,..<字段名n> <类型n>]);

```

* 表名：表的名称，必须符合标识符命名规则。


>例子：创建Person表,表属性如下

字段名 | 数字类型 |	数据宽度 | 是否为空 | 是否主键 | 自动增加 | 默认值
------------ | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
id | int | 4 | 否 |	primary key | auto_increment	 
name | char | 20 | 否 | 否 | 否 | 无	 	 	 
sex | int |	4 |	否 | 0 | 否 | 无	 	
degree | double | 16 | 是 | 否 | 否 | 无	 		 	 

```sql
create table Person( 
id int(4) not null primary key auto_increment,
name char(20) not null,
sex int(4) not null default '0',
degree double(16,2)
);
```


## 查看表

### 表格的形式展示表结构

DESCRIBE/DESC 语句会以表格的形式来展示表的字段信息。

```sql
# 语法如下
DESCRIBE <表名>;
# 简写语法如下
DESC <表名>;

## 展示tb_emp1表
mysql> DESC tb_emp1;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| id     | int(11)     | YES  |     | NULL    |       |
| name   | varchar(25) | YES  |     | NULL    |       |
| deptId | int(11)     | YES  |     | NULL    |       |
| salary | float       | YES  |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+
4 rows in set (0.14 sec)
```

### SQL语句的形式展示表结构

SHOW CREATE TABLE 语句会以 SQL 语句的形式来展示表信息。

```sql
# 语法
SHOW CREATE TABLE <表名>;

# 查看表 tb_emp1 的详细信息
mysql> SHOW CREATE TABLE tb_emp1;
+---------+------------------------------------------------+
| Table   | Create Table                                   |
+---------+------------------------------------------------+
| tb_emp1 | CREATE TABLE `tb_emp1` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(25) DEFAULT NULL,
  `salary` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 |
+---------+------------------------------------------------+
1 row in set (0.01 sec)
```


## 修改表

### 在表中末尾添加字段

使用 alter table ... add... 在表的最后位置（最后一列的后面）添加新字段。

```sql
# 语法如下  
ALTER TABLE <表名> ADD <新字段名><数据类型>[约束条件];

# 添加字段age, int类型,长度为4，默认值为0
alter table 表名 add age int(4) default 0;
```

* 表名：为数据表的名字；
* 新字段名：为所要添加的字段的名字；
* 数据类型：为所要添加的字段能存储数据的数据类型；
* 约束条件：是可选的，可以用来对添加的字段进行约束。


### 在表的开头添加字段

使用 alter table ... add...first 在表的开头位置（第一列的前面）添加新字段。

```sql
# 语法如下  
ALTER TABLE <表名> ADD <新字段名> <数据类型> [约束条件] FIRST;

# 添加字段stuId, int类型,长度为4
ALTER TABLE student ADD stuId INT(4) FIRST;
```

### 在表的中间添加字段

使用 alter table ... add...AFTER.... 在表的中间位置（指定字段之后）添加新字段。

```sql
# 语法如下  
ALTER TABLE <表名> ADD <新字段名> <数据类型> [约束条件] AFTER <已经存在的字段名>;

# 在name字段之后，添加字段stuno, int类型,长度为11。
ALTER TABLE student ADD stuno INT(11) AFTER name;
```

### 同时修改字段的名称和数据类型

使用 alter table ... change 同时修改字段的名称与类型。

```sql
# 语法如下
ALTER TABLE <表名> CHANGE <旧字段名> <新字段名> <新数据类型>；

# 将 col1 字段名称改为 col3，同时将数据类型变为 CHAR(30)
ALTER TABLE tb_emp1 CHANGE col1 col3 CHAR(30);
```

### 只修改字段的数据类型

使用 alter table ... modify 只修改字段的数据类型。

```sql
# 语法如下
ALTER TABLE <表名> MODIFY <字段名> <新的数据类型>

# 将 name 字段的数据类型由 VARCHAR(22) 修改成 VARCHAR(30)
ALTER TABLE tb_emp1 MODIFY name VARCHAR(30);
```

### 删除表中字段


> 使用 alter table ... drop来删除表中的字段

```sql
# 语法如下
ALTER TABLE <表名> DROP <字段名>；

# 删除tb_emp1表中的 col2 字段
ALTER TABLE tb_emp1 DROP col2;
```

### 修改表名

mysql通过 ALTER TABLE 语句来实现表名的修改。

```sql
# 语法如下
ALTER TABLE <旧表名> RENAME <新表名>;

# 将数据表 student 改名为 tb_students_info
ALTER TABLE student RENAME tb_students_info;
```

### 修改表的字符集

MySQL 通过 ALTER TABLE 语句来实现表字符集的修改。

```sql
# 语法如下
ALTER TABLE 表名 CHARACTER SET <字符集名> COLLATE <校对规则名>;

# 将数据表 tb_students_info 的字符集修改为 gb2312，校对规则修改为 gb2312_chinese_ci。
ALTER TABLE tb_students_info CHARACTER SET gb2312 COLLATE gb2312_chinese_ci;
```

## 删除表

注意：删除表的同时，表的结构和表中所有的数据都会被删除。

> 使用 DROP TABLE 语句可以删除一个或多个数据表。语法如下

```sql
# 语法
DROP TABLE 表名1 [ ,表名2, 表名3 ...]

# 删除test_db表
drop table test_db;
```

<font color="red">DROP TABLE用于删除一个或多个表。您必须有每个表的DROP权限。DROP是删除表的数据和表的定义。</font>
