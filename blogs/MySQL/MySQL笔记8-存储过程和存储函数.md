---
title: MySQL笔记8-存储过程和存储函数
date: 2023-07-18
sidebar: 'auto'
categories: 
 - 数据库
tags:
 - MySql
---

[toc]

# MySQL笔记8-存储过程和存储函数

## 存储过程

存储过程是一组为了完成特定功能的SQL语句集合。使用存储过程的目的是将常用或复杂的工作预先用SQL语句写好并用一个指定名称存储起来。这个过程经编译和优化后存储在数据库服务器中，因此称为存储过程。如果某个操作需要执行多次SQL，使用存储过程比单纯SQL语句执行要快。

>存储过程的优点
1. 存储过程是预编译过的，执行效率高，执行速度快。
2. 存储过程的代码直接存放于数据库中，通过存储过程名直接调用，减少网络通讯。
3. 安全性高，执行存储过程需要有一定权限的用户。
4. 存储过程可以重复使用，减少数据库开发人员的工作量。

>存储过程的缺点
1. 如果在一个程序系统中大量的使用存储过程，到程序交付使用的时候随着用户需求的增加会导致数据结构的变化，若用户想维护该系统可以说是很难很难、而且代价是空前的，维护起来更麻烦。


### delimiter 命令

在存储过程的创建中，经常会用到一个十分重要的 MySQL 命令，即 delimiter 命令。

在 MySQL 中，服务器处理 SQL 语句默认是以分号作为语句结束标志的。然而，在创建存储过程时，存储过程体可能包含有多条 SQL 语句，这些 SQL 语句如果仍以分号作为语句结束符，那么 MySQL在处理时会以遇到的第一条 SQL 语句结尾处的分号作为整个程序的结束符，而不再去处理存储过程体中后面的 SQL 语句，这样显然不行。

为解决以上问题，通常在创建存储过程之前使用 delimiter 命令将结束命令修改为其他字符。创建存储过程之后，再用delimiter 命令将结束命令符改回分号。

```sql
## 执行这条 SQL 语句后，任何命令、语句或程序的结束标志就换为两个问号“??”
mysql> delimiter ??

## 执行这条 SQL 语句后，任何命令、语句或程序的结束标志就换为;
mysql> delimiter ;
```

<font color="red">注意：delimiter命令和符号之间一定要有一个空格。</font>

### 创建存储过程

> 语法
```sql
-- 语法如下
CREATE PROCEDURE 过程名 (过程参数,…) 
<过程体>

-- 过程参数的格式如下
[ IN | OUT | INOUT ] <参数名> <类型>
```

* 过程参数：存储过程支持的参数有3种，输入参数，输出参数，输入输出参数。
    * 输入参数格式：(in 参数名 参数类型)
    * 输出参数格式：(out 参数名 参数类型)
    * 输入输出参数格式：(inout 参数名 参数类型)
* 过程体：存储过程的主体部分。以关键字 BEGIN 开始，以关键字 END 结束。

>例子

```sql
-- 创建存储过程之前，先把结束标志换成//
-- 创建存储过程之后，把结束标志换回分号

-- 创建存储过程aaa，没有参数
delimiter //
create procedure aaa()
begin
    select * from students;
end //
delimiter ;


-- 创建有参存储过程，输入参数为name
delimiter //
CREATE PROCEDURE GetScoreByStu (IN name VARCHAR(30))
BEGIN
    SELECT * FROM students WHERE student_name=name;
END //
delimiter ;
```


### 查询存储过程

> 查询存储过程的状态

MySQL 中可以通过 SHOW PROCEDURE STATUS LIKE语句查看存储过程的状态。主要包括存储过程的创建时间、修改时间和字符集等信息。

```sql
-- 语法如下
SHOW PROCEDURE STATUS LIKE 存储过程名;

-- 例子
-- 查询show开头的存储过程名称
mysql> SHOW PROCEDURE STATUS LIKE 'show%';
*************************** 1. row ***************************
                  Db: test
                Name: showstuscore
                Type: PROCEDURE
             Definer: root@localhost
            Modified: 2020-02-20 13:34:50
             Created: 2020-02-20 13:34:50
       Security_type: DEFINER
             Comment:
character_set_client: gbk
collation_connection: gbk_chinese_ci
  Database Collation: latin1_swedish_ci
1 row in set (0.01 sec)

```

> 查看存储过程的定义

MySQL 中可以通过 SHOW CREATE PROCEDURE 语句查看存储过程的定义信息。

```sql
-- 语法如下
SHOW CREATE PROCEDURE 存储过程名;

-- 例子
-- 查询show开头的存储过程名称
mysql> SHOW CREATE PROCEDURE showstuscore;
*************************** 1. row ***************************
           Procedure: showstuscore
            sql_mode: STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
    Create Procedure: CREATE DEFINER=`root`@`localhost` PROCEDURE `showstuscore`()
BEGIN
SELECT id,name,score FROM studentinfo;
END
character_set_client: gbk
collation_connection: gbk_chinese_ci
  Database Collation: latin1_swedish_ci
1 row in set (0.01 sec)

```


### 修改存储过程

MySQL 中通过 ALTER PROCEDURE 语句用于修改存储过程的某些属性。如果要修改存储过程的内容体，可以先删除原存储过程，再创建新的存储过程。

```sql
-- 语法如下
ALTER PROCEDURE 存储过程名 [ 属性 ... ]

-- 修改存储过程 showstuscore 的定义，将读写权限改为 MODIFIES SQL DATA，并指明调用者可以执行
ALTER PROCEDURE showstuscore MODIFIES SQL DATA SQL SECURITY INVOKER;

```

特征指定了存储过程的属性，可能的取值有：
* CONTAINS SQL 表示子程序包含 SQL 语句，但不包含读或写数据的语句。
* NO SQL 表示子程序中不包含 SQL 语句。
* READS SQL DATA 表示子程序中包含读数据的语句。
* MODIFIES SQL DATA 表示子程序中包含写数据的语句。
* SQL SECURITY { DEFINER |INVOKER } 指明谁有权限来执行。
* DEFINER 表示只有定义者自己才能够执行。
* INVOKER 表示调用者可以执行。
* COMMENT 'string' 表示注释信息。


### 删除存储过程

MySQL 中使用 DROP PROCEDURE 语句来删除数据库中已经存在的存储过程。

```sql
-- 语法如下
DROP PROCEDURE [ IF EXISTS ] <过程名>

-- 例子
-- 删除存储过程showstuscore
DROP PROCEDURE showstuscore;
```

### 调用存储过程

MySQL 中使用 CALL 语句来调用存储过程。调用存储过程后，数据库系统将执行存储过程中的 SQL 语句，然后将结果返回给输出值。

```sql
-- 语法如下
CALL 存储过程名(参数列表);

-- 例子
-- 调用存储过程showstuscore
CALL showstuscore();
CALL showstuscore2('Green');
```

## 存储函数

存储函数和存储过程一样，都是在数据库中定义一些 SQL 语句的集合。存储函数可以通过 return 语句返回函数值，主要用于计算并返回一个值。而存储过程没有直接返回值，主要用于执行操作。

### 创建存储函数

在 MySQL 中，使用 create function 语句来创建存储函数
```sql
-- 语法如下
create function 函数名 (参数列表)
returns 返回值类型
函数体

-- 参数分为输入参数，输出参数，输入输出参数。
-- 参数列表的格式
[IN | OUT | INOUT] 参数名称 数据类型;
```

* 参数列表：存储函数支持的参数有3种，输入参数，输出参数，输入输出参数。
    * 输入参数格式：(in 参数名 参数类型)
    * 输出参数格式：(out 参数名 参数类型)
    * 输入输出参数格式：(inout 参数名 参数类型)
* 函数体：存储函数的主体部分。以关键字 BEGIN 开始，以关键字 END 结束。


> 例子
```sql
delimiter //
CREATE FUNCTION func_student(id INT(11))
-- 声明返回值类型
RETURNS VARCHAR(20)
BEGIN
-- 返回查询结果
RETURN(SELECT name FROM tb_student WHERE tb_student.id = id);
END //
delimiter ;
```

### 查询，修改，删除存储函数

> 查看存储函数的语法
```sql
SHOW FUNCTION STATUS LIKE 存储函数名;
SHOW CREATE FUNCTION 存储函数名;
```

> 修改存储函数的属性，可参数修改存储过程的属性。
```sql
ALTER FUNCTION 存储函数名 [ 属性 ... ]
```

> 删除存储过程
```sql
DROP FUNCTION [ IF EXISTS ] <存储函数名>
```

### 调用存储函数

在MySQL中，存储函数的使用方法与MySQL内部函数的使用方法是一样的。

```sql
-- 创建存储函数func_student
delimiter //
CREATE FUNCTION func_student(id INT(11))
-- 声明返回值类型
RETURNS VARCHAR(20)
BEGIN
-- 返回查询结果
RETURN(SELECT name FROM tb_student WHERE tb_student.id = id);
END //
delimiter ;

-- 调用存储函数func_student
SELECT func_student(3);

```

## 变量

变量是表达式语句中最基本的元素，可以用来临时存储数据。在存储过程和函数中都可以定义和使用变量。变量的作用范围是 BEGIN...END 程序段中。


> 定义变量

MySQL 中可以使用 DECLARE 关键字来定义变量。

```sql
-- 语法如下
DECLARE 变量名 变量类型 [DEFAULT 默认值]

-- 例如，定义变量 my_i，数据类型为 INT 类型，默认值为 10
DECLARE my_i INT DEFAULT 10;
-- 同时定义3个变量
DECLARE my_i,my_j,my_x INT DEFAULT 10;
```


> 赋值变量

MySQL 中可以使用 SET 关键字来为变量赋值。

```sql
-- 语法如下
SET 变量名称 = 赋值表达式

-- 例如，为变量 my_i 赋值为 30
SET my_i=30;
```

## 流程控制语句

在存储过程和自定义函数中可以使用流程控制语句来控制程序的流程。

MySQL 中流程控制语句有：IF 语句、CASE 语句、LOOP 语句、LEAVE 语句、ITERATE 语句、REPEAT 语句和 WHILE 语句等。

### IF语句

IF 语句用来进行条件判断。IF 语句都需要使用 END IF 来结束。

```sql
-- 语法如下
IF 判断表达式 THEN 执行语句1
    [ELSEIF 判断表达式 THEN 执行语句2]...
    [ELSE 执行语句3]
END IF


-- 例子
-- 根据 age 与 20 的大小关系来执行不同的 SET 语句。
-- 如果 age 值大于20，那么将 count1 的值加 1；
-- 如果 age 值等于 20，那么将 count2 的值加 1；
-- 其他情况将 count3 的值加 1。
IF age>20 THEN SET @count1=@count1+1;
    ELSEIF age=20 THEN @count2=@count2+1;
    ELSE @count3=@count3+1;
END lF;

```

### CASE语句

CASE 语句也是用来进行条件判断的，它提供了多个条件进行选择。CASE 语句都要使用 END CASE 结束。

```sql
-- 语法如下
-- 当变量的值与变量值相同时，就执行对应的语句
CASE 变量
    WHEN 变量值 THEN 执行语句
    [WHEN 变量值 THEN 执行语句]...
    [ELSE 执行语句]
END CASE


-- 例子
-- 如果 age 值为 20，count1 的值加 1，否则 count2 的值加 1。
CASE age
    WHEN 20 THEN SET @count1=@count1+1;
    ELSE SET @count2=@count2+1;
END CASE;
```

### LOOP 语句

LOOP 语句可以使某些特定的语句重复执行。LOOP 循环都以 END LOOP 结束。

LOOP 语句本身没有停止循环的语句，必须使用 LEAVE 语句等才能停止循环，跳出循环过程。

> loop语句语法如下
```sql
[begin_label:]LOOP
    执行语句
END LOOP [end_label]
```

* begin_label 和 end_label 分别表示循环开始和结束的标志，这两个标志必须相同，而且都可以省略

> 例子
```sql
-- 循环执行 count 加 1 的操作。因为没有跳出循环的语句，这个循环成了一个死循环。
add_num:LOOP
    SET @count=@count+1;
END LOOP add_num;
```


### LEAVE 语句

LEAVE 语句主要用于跳出循环控制。LEAVE 语句主要用于在Loop语句中结束循环。

> LEAVE语句语法如下
```sql
LEAVE label;
```

* label 表示循环的标志,即loop语句设置的循环标志。

> 例子
```sql
-- 循环执行 count 加 1 的操作。当 count 的值等于 100 时，跳出循环。
add_num:LOOP
    SET @count=@count+1;
    IF @count=100 THEN
        LEAVE add_num;
END LOOP add num;
```

### ITERATE 语句

ITERATE 是“再次循环”的意思，用来跳出本次循环，直接进入下一次循环。

> ITERATE语句语法如下
```sql
ITERATE label;
```

* label 表示循环的标志,即loop语句设置的循环标志。

> 例子
```sql
-- 循环执行 count 加 1 的操作，count 值为 100 时结束循环。
-- 如果 count 的值能够整除 3，则跳出本次循环，不再执行下面的 SELECT 语句。
add_num:LOOP
    SET @count=@count+1;
    IF @count=100 THEN
        LEAVE add_num;
    ELSE IF MOD(@count,3)=0 THEN
        ITERATE add_num;
    SELECT * FROM employee;
END LOOP add_num;
```

### REPEAT 语句

REPEAT 语句是有条件控制的循环语句，每次语句执行完毕后，会对条件表达式进行判断，如果表达式返回值为 TRUE，则循环结束，否则重复执行循环中的语句。

> REPEAT语句语法如下
```sql
[begin_label:] REPEAT
    执行语句
    UNTIL 条件表达式
END REPEAT [end_label]
```

* begin_label 和 end_label 分别表示循环开始和结束的标志，这两个标志必须相同，而且都可以省略

> 例子
```sql
-- 循环执行 count 加 1 的操作，count 值为 100 时结束循环。
REPEAT
    SET @count=@count+1;
    UNTIL @count=100
END REPEAT;
```

### WHILE 语句

WHILE 语句也是有条件控制的循环语句。WHILE 语句和 REPEAT 语句不同的是，WHILE 语句是当满足条件时，执行循环内的语句，否则退出循环。

> WHILE 语句语法如下
```sql
[begin_label:] WHILE 条件表达式 DO
    执行语句
END WHILE [end label]
```

* begin_label 和 end_label 分别表示循环开始和结束的标志，这两个标志必须相同，而且都可以省略


> 例子
```sql
-- 循环执行 count 加 1 的操作，count 值小于 100 时执行循环。
-- 如果 count 值等于 100 了，则跳出循环。
WHILE @count<100 DO
    SET @count=@count+1;
END WHILE;
```


## 游标

在 MySQL 中，存储过程或函数中的查询有时会返回多条记录，而使用简单的 SELECT 语句，没有办法得到第一行，第二行或前十行的数据，这时可以使用游标来逐条读取中SELECT 语句返回的记录。

<font color="red">因此mysql的游标只能用于存储过程，存储函数。</font>

mysql游标的使用步骤：
1. 使用游标前，先声明定义它
2. 打开游标（此时游标会将数据查询出来）
3. 获取游标查询出来的数据
4. 游标使用完后，需要关闭游标。释放占用的内存资源

<font color="red">注意：在一个游标关闭后，如果没有重新打开，则不能使用它。如果存储过程中没明确关闭游标，则mysql会在执行end语句的时候自动关闭存储过程中的游标。</font>

> 语法如下
```sql
-- 创建游标语法：DECLARE 游标名称 CURSOR FOR 查询语句
-- 创建游标
declare cursor_a cursor for select * from students;

-- 打开游标（使用游标，此时游标会执行sql语句）
open cursor_a

-- 将sql的数据结果集保存到变量参数var_name中
-- 变量参数 var_name 必须在游标使用之前定义
fetch cursor_a into var_name

-- 关闭游标
close cursor_a;

-- 释放游标
deallocate cursor_a;
```

> 例子
```sql
delimiter //
create procedure p12()
begin
  -- 定义三个变量用于存放商品id,商品名称，商品库存量
  declare row_gid int ; 
  declare row_name varchar(20);
  declare row_num int;
  -- 定义游标
  declare cursor_a cursor for select gid,name,num from goods;
  -- 打开游标（执行游标中的sql语句）
  open cursor_a;
  -- 将游标的执行结果集，遍历赋值给三个变量
  fetch cursor_a into row_gid,row_name,row_num;
  -- 显示3个变量
  select row_gid,row_name,row_num;
  -- 关闭游标
  close cursor_a; 
end //
delimiter ;         

```

