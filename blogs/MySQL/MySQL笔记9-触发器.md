---
title: MySQL笔记9-触发器
date: 2023-07-19
sidebar: 'auto'
categories: 
 - 数据库
tags:
 - MySql
---

[toc]

# MySQL笔记9-触发器

## 触发器的介绍

MySQL 的触发器和存储过程一样，都是嵌入到 MySQL 中的一段程序，不同的是触发器的执行是通过对数据表的相关操作来触发、激活从而实现执行。比如当对 student 表进行操作（INSERT，DELETE 或 UPDATE）时就会激活它执行。

> 触发器的优缺点
* 优点：触发器的执行是自动的，当对触发器相关表的数据做出相应的修改后立即执行。
* 优点：触发器可以实施比 FOREIGN KEY 约束、CHECK 约束更为复杂的检查和操作。
* 缺点：大量使用触发器容易导致代码结构被打乱，增加了程序的复杂性。
* 缺点：如果需要变动的数据量较大时，触发器的执行效率会非常低。

## 触发器的种类

MySQL 所支持的触发器有三种：INSERT 触发器、UPDATE 触发器和 DELETE 触发器。

> INSERT 触发器: 在INSERT 语句执行之前或之后响应的触发器。

注意
* 在 INSERT 触发器代码内，可使用一个名为 NEW（不区分大小写）的虚拟表来访问被插入的行。
* 在 BEFORE INSERT 触发器中，NEW 中的值也可以被更新，即允许更改被插入的值（只要具有对应的操作权限）。
* 对于 AUTO_INCREMENT 列，NEW 在 INSERT 执行之前包含的值是 0，在 INSERT 执行之后将包含新的自动生成值。


> UPDATE 触发器: 在 UPDATE 语句执行之前或之后响应的触发器。

注意
* 在 UPDATE 触发器代码内，可引用一个名为 NEW（不区分大小写）的虚拟表来访问更新的值。
* 在 UPDATE 触发器代码内，可引用一个名为 OLD（不区分大小写）的虚拟表来访问 UPDATE 语句执行前的值。
* 在 BEFORE UPDATE 触发器中，NEW 中的值可能也被更新，即允许更改将要用于 UPDATE 语句中的值（只要具有对应的操作权限）。
* OLD 中的值全部是只读的，不能被更新。


> DELETE  触发器: 在 DELETE  语句执行之前或之后响应的触发器。

注意
* 在 DELETE 触发器代码内，可以引用一个名为 OLD（不区分大小写）的虚拟表来访问被删除的行。
* OLD 中的值全部是只读的，不能被更新。


> 触发器的执行步骤
1. 若 BEFORE 触发失败，则 MySQL 将不执行相应行上的操作。
2. 若在 BEFORE 或 AFTER 触发的执行过程中出现错误，则将导致调用触发程序的整个语句失败。
3. 当 BEFORE 触发和行操作均已被成功执行，MySQL 才会执行 AFTER 触发程序。

## 创建触发器

在MySQL中使用 CREATE TRIGGER 语句创建触发器。

> 语法
```sql
-- 语法如下
CREATE TRIGGER <触发器名> 
<BEFORE | AFTER> <INSERT | UPDATE | DELETE >
ON <表名> 
FOR EACH Row
<触发器主体>
```

* BEFORE,AFTER :表示触发器被触发的时刻，即触发器是在语句之前或之后触发。
* INSERT,UPDATE,DELETE ：用于指定激活触发器的语句的种类。 
* 触发器主体： 触发器激活时将要执行的 MySQL 语句。多行sql语句的时候可使用 BEGIN…END 复合语句结构。
* FOR EACH Row ：表示行级触发，对于受触发事件影响的每一行都要激活触发器的动作。


> 例子
```sql
-- 创建一个名为 SumOfSalary 的BEFORE触发器
-- 触发的条件是向数据表 tb_emp8 中插入数据之前，对新插入的 salary 字段值进行求和计算。
-- new是代表正在插入表中的数据
-- NEW.salary就是新插入的 salary 字段值
CREATE TRIGGER SumOfSalary
BEFORE INSERT ON tb_emp8
FOR EACH ROW
SET @sum=@sum+NEW.salary;

-- 设置变量sum
SET @sum=0;
-- 插入数据到表中，插入之前会触发上面定义的触发器SumOfSalary
INSERT INTO tb_emp8 VALUES(1,'A',1,1000);


-- 创建一个名为 double_salary 的AFTER触发器
-- 触发的条件是向数据表 tb_emp6 中插入数据之后，再向数据表 tb_emp7 中插入相同的数据，
-- 并且 salary 为 tb_emp6 中新插入的 salary 字段值的 2 倍。
CREATE TRIGGER double_salary
AFTER INSERT ON tb_emp6
FOR EACH ROW
INSERT INTO tb_emp7 VALUES (NEW.id,NEW.name,deptId,2*NEW.salary);
```


## 查看触发器

查看触发器是指查看数据库中已经存在的触发器的定义、状态和语法信息等。可以通过 SHOW TRIGGERS 语句来查看触发器。

> 例子：(在SHOW TRIGGERS命令后添加\G，这样显示信息会比较有条理)
```sql
mysql> SHOW TRIGGERS \G
*************************** 1. row ***************************
             Trigger: trigupdate
               Event: UPDATE
               Table: account
           Statement: INSERT INTO myevent VALUES(1,'after update')
              Timing: AFTER
             Created: 2020-02-24 14:07:15.08
            sql_mode: STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
             Definer: root@localhost
character_set_client: gbk
collation_connection: gbk_chinese_ci
  Database Collation: latin1_swedish_ci
1 row in set (0.09 sec)
```

## 修改和删除触发器

修改触发器可以通过删除原触发器，再以相同的名称创建新的触发器。

```sql
-- 语法如下
DROP TRIGGER [IF EXISTS] [数据库名] <触发器名>

-- 例子
-- 删除当前数据库的触发器double_salary
DROP TRIGGER double_salary;

```

* 数据库名：可选项，若无指定，则默认为当前数据库。
* IF EXISTS：可选项，避免在没有触发器的情况下删除触发器。