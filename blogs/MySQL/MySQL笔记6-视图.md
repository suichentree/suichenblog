---
title: MySQL笔记6-视图
date: 2023-07-18
sidebar: 'auto'
categories: 
 - 数据库
tags:
 - MySql
---

[toc]

# MySQL笔记6-视图

视图（View）是一种虚拟存在的表，同真实表一样，视图也由列和行构成，但视图并不实际存在于数据库中。视图中行和列的数据来自于定义视图的SELECT查询语句，并且还是在使用视图时动态生成的。视图的本质是SELECT语句。

数据库中只存放了视图的定义，并没有存放视图中的数据，这些数据都存放在定义视图查询所引用的真实表中。使用视图查询数据时，数据库会从真实表中取出对应的数据。因此，视图中的数据是依赖于真实表中的数据的。一旦真实表中的数据发生改变，显示在视图中的数据也会发生改变。

> 视图与表的区别？
* 视图不是数据库中真实的表，而是一张虚拟表，其结构和数据是建立在对真实表的查询基础上的。
* 视图是数据的窗口，而表是内容。表是实际数据的存放单位，而视图只是以不同的显示方式展示数据，其数据来源还是实际表。
* 从安全的角度来看，视图的数据安全性更高，使用视图的用户不接触数据表，不知道表结构。
* 视图的建立和删除只影响视图本身，不影响对应的基本表。

## 创建视图

```sql
# 语法如下
CREATE VIEW <视图名> AS <SELECT语句>

# 创建视图view_students，数据是年龄大于12的学生信息
CREATE VIEW view_students AS SELECT * FROM students where age > 12;

# 创建视图v_students_info，设置了视图中的字段
CREATE VIEW v_students_info (s_id,s_name,d_id,s_age,s_sex,s_height,s_date) AS SELECT id,name,dept_id,age,sex,height,login_date FROM tb_students_info;

# 使用视图view_students
select * from view_students;

```

## 查看视图

创建好视图后，可以通过查看视图的语句来查看视图的字段信息以及详细信息。

<font color="red">所有视图的定义都是存储在 information_schema 数据库下的 views 表中。</font>

```sql
# 语法如下
DESCRIBE 视图名;
# 或
DESC 视图名;

# 查询视频详细信息
SHOW CREATE VIEW 视图名;

# 查看视图v_studentinfo
mysql> DESC v_studentinfo;
+-------+--------------+------+-----+---------+-------+
| Field | Type         | Null | Key | Default | Extra |
+-------+--------------+------+-----+---------+-------+
| name  | varchar(20)  | YES  |     | NULL    |       |
| score | decimal(4,2) | YES  |     | NULL    |       |
+-------+--------------+------+-----+---------+-------+

# 查看视图v_studentinfo的详细信息
SHOW CREATE VIEW v_studentinfo;

```

## 修改视图

当表的某些字段发生变化时，可以通过修改视图来保持与表的一致性。

<font color="red">注意：对视图的修改只影响视图本身，不影响对应的基本表。</font>

```sql
# 语法如下
ALTER VIEW <视图名> AS <SELECT语句>

# 修改视图 view_students_info
ALTER VIEW view_students_info AS SELECT id,name,age FROM tb_students_info;

# 查询视图数据
SELECT * FROM view_students_info;
```

## 删除视图

对视图的删除只影响视图本身，不影响对应的基本表。

```sql
# 语法如下
DROP VIEW <视图名>

# 删除视图 view_students_info
DROP VIEW v_students_info;

```