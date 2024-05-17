---
title: SQLite笔记1
date: 2024-05-16
sidebar: 'auto'
categories: 
 - SQLite
tags:
 - SQLite
---

[toc]

# SQLite笔记1

当前日期为2024-05-16。当前SQLite的版本为3.45.3

## SQLite介绍

SQLite是一个实现了自给自足的、无服务器的、零配置的、事务性的 SQL 数据库引擎。

SQLite是一个零配置的数据库，这意味着与其他数据库不一样，您不需要在系统中配置。

> 为什么要用 SQLite？
- SQLite是无服务器的、零配置的，即不需要一个单独的服务器，不需要安装或管理。
- SQLite 是自给自足的，这意味着不需要任何外部的依赖。
- SQLite 是非常小的，是轻量级的，完全配置时小于 400KiB。一个完整的 SQLite 数据库就是存储在一个单一的跨平台的磁盘文件。
- SQLite 事务是完全兼容 ACID 的，允许从多个进程或线程安全访问。

[SQLite官网地址：https://www.sqlite.org/index.html](https://www.sqlite.org/index.html)

## SQLite安装

> 在 Windows 上安装 SQLite

1. 先在SQLite官网下载SQLite相关文件。如sqlite-tools-win32-*.zip 和 sqlite-dll-win32-*.zip 压缩文件。
2. 然后可以在桌面创建文件夹 sqlite3 , 在该文件夹中解压上面两个下载文件。将得到 sqlite3.def、sqlite3.dll 和 sqlite3.exe 等文件。
3. 然后把sqlite3文件夹的路径 `C:\Users\18271\Desktop\sqlite3`，添加到windows系统的环境变量中。
4. 最后在windows的终端中，使用 sqlite3 命令，将显示如下结果。

![sqlite_20240516105902.png](../blog_img/sqlite_20240516105902.png)

## SQLite 点命令

之前我们可以在windows终端中输入sqlite3 命令，从而进入到sqlite 终端中。

现在在sqlite 终端中，我们可以使用sqlite提供的命令，来对sqlite进行各种操作。这些命令称为 SQLite 的点命令，因为这些命令的不同之处在于它们不以分号 ; 结束。

sqlite中一些常用的点命令如下所示
```bash
.help	            # 显示帮助消息。
.databases	        # 列出数据库的名称及其所依附的文件。
.tables             # 列出表
.echo ON|OFF	    # 开启或关闭 echo 命令。
.exit	            # 退出 SQLite 终端
.quit	            # 退出 SQLite 提示符。
.explain ON|OFF	    # 开启或关闭适合于 EXPLAIN 的输出模式。如果没有带参数，则为 EXPLAIN on，即开启 EXPLAIN。
.show	            # 显示各种设置的当前值。
.stats ON|OFF	    # 开启或关闭统计。
.schema table_name  # 显示表 CREATE 语句


.import FILE TABLE	# 导入来自 FILE 文件的数据到 TABLE 表中。
.log FILE|off	    # 开启或关闭日志。FILE 文件可以是 stderr（标准错误）/stdout（标准输出）。

# 设置输出模式，MODE 可以是下列之一：
# csv 逗号分隔的值
# column 左对齐的列
# html HTML 的 <table> 代码
# insert TABLE 表的 SQL 插入（insert）语句
# line 每行一个值
# list 由 .separator 字符串分隔的值
# tabs 由 Tab 分隔的值
# tcl TCL 列表元素
.mode MODE

.output FILENAME	# 发送输出到 FILENAME 文件。
.output stdout	    # 发送输出到屏幕。

```


## SQLite 数据类型

在 SQLite 中，值的数据类型与值本身是相关的，而不是与它的容器相关。相比其他数据库的数据类型，SQLite的数据类型更为动态。

SQLite有如下的5种数据类型。
```
NULL	    值是一个 NULL 值。
INTEGER	    值是一个带符号的整数，根据值的大小存储在 1、2、3、4、6 或 8 字节中。
REAL	    值是一个浮点值，存储为 8 字节的 IEEE 浮点数字。
TEXT	    值是一个文本字符串，使用数据库编码（UTF-8、UTF-16BE 或 UTF-16LE）存储。
BLOB	    值是一个 blob 数据，完全根据它的输入存储。
```

SQLite的数据类型相比其他数据库的数据类型更加动态。SQLite的一种数据类型相当于其他数据库的多种数据类型。 例如 INTEGER 数据类型，代表整数。可以包含6 种不同的不同长度的整数数据类型。


下面是其他数据库的数据类型 和 SQLite数据类型的对比。
```bash
# 其他数据库的多个整数数据类型，相当于SQLite的一种整数数据类型
INT                     vs      INTEGER
INTEGER
TINYINT
SMALLINT
MEDIUMINT
BIGINT

# 文本字符串数据类型对比
CHARACTER(20)           vs      TEXT
VARCHAR(255)
VARYING CHARACTER(255)
NCHAR(55)
TEXT

# 浮点数类型对比
REAL                 vs      REAL
DOUBLE
FLOAT

```


> Boolean 数据类型

SQLite 没有单独的 Boolean 数据类型。布尔值会被存储为整数 0（false）和 1（true）。

> Date 与 Time 数据类型

SQLite 没有一个单独的用于存储日期和/或时间的存储类，但 SQLite 能够把日期和时间设置为 TEXT、REAL 或 INTEGER 数据类型。

```
若TEXT数据类型 存储日期时间数据，则数据格式会为"YYYY-MM-DD HH:MM:SS.SSS"
若REAL数据类型 存储日期时间数据，则数据会是从公元前 4714 年 11 月 24 日格林尼治时间的正午开始算起的天数。
若INTEGER数据类型 存储日期时间数据，则数据会是从 1970-01-01 00:00:00 UTC 算起的秒数。
```

## 数据库

### 创建数据库

在SQLite中，我们可以使用 sqlite3 命令来用来创建新的 SQLite 数据库文件。

语法如下
```sql
# 在当前目录下创建一个db文件
sqlite3 DatabaseName.db
```

例子
```bash
# 此处是windows系统终端。在桌面创建一个test1.db的文件
C:\Users\18271\Desktop> sqlite3 test1.db
SQLite version 3.45.3 2024-04-15 13:34:05 (UTF-16 console I/O)
Enter ".help" for usage hints.

# 然后在sqlite终端中通过点命名 .databases 查看db文件的信息
sqlite> .databases
# 显示test1.db文件里有一个数据库，名称为main,拥有读写权限
main: C:\Users\18271\Desktop\test1.db r/w
```

总结：在SQLite中，我们创建数据库，需要先创建一个载体，即db文件。这个db文件里面包含了所有的数据，包含数据库，表，表中数据，配置数据等。并且默认的数据库名称就是main。


### 附加数据库

通常情况下,我们创建的db文件中，都会包含一个默认的数据库，该数据库名称为main。

但是如果我们想在一个db文件中创建多个数据库，我们可以通过 SQLite 的 ATTACH DATABASE 语句来创建一个附加数据库。

> 什么是附加数据库?

db文件中的main数据库就是主数据库，除了主数据库之外的数据库都是附加数据库。


> 语法

SQLite 的 ATTACH DATABASE 语句的基本语法如下

```sql
# 创建一个db文件，如果db文件已存在，则把db文件名称与附加数据库 'attach_database_name' 绑定在一起。
ATTACH DATABASE db_file_name AS attach_database_name;
```

> 例子

```bash
# 在sqlite终端中使用 ATTACH DATABASE 语句
sqlite> ATTACH DATABASE 'test1.db' as 'demo';
# 点命名 .databases 查看db文件的信息
sqlite> .databases
main: C:\Users\18271\Desktop\test1.db r/w
demo: C:\Users\18271\Desktop\test1.db r/w
```

可以看到test1.db文件中除了main主数据库之外，还多了一个附加数据库demo。


## 表

### 创建表

SQLite 的 CREATE TABLE 语句用于在任何给定的数据库创建一个新表。

CREATE TABLE 语句的基本语法如下
```sql
CREATE TABLE table_name(
   column1 datatype PRIMARY KEY,
   column2 datatype,
   column3 datatype,
   .....
   columnN datatype,
);

```

> 例子

```bash
# 先与test1.db文件建立链接，从而进入到sqlite终端中
C:\Users\18271\Desktop> sqlite3 test1.db
SQLite version 3.45.3 2024-04-15 13:34:05 (UTF-16 console I/O)
Enter ".help" for usage hints.

# 此处是sqlite终端,创建t_user表
sqlite> CREATE TABLE t_user(
   id             INT     PRIMARY KEY     NOT NULL,
   name           TEXT    NOT NULL,
   age            INT     NOT NULL,
   address        CHAR(50)
);

# 通过点命名.tables 显示数据库中的表
sqlite> .tables
t_user

# 通过点命名.schema 显示t_user表的create语句
sqlite> .schema t_user
CREATE TABLE t_user(
   id             INT     PRIMARY KEY     NOT NULL,
   name           TEXT    NOT NULL,
   age            INT     NOT NULL,
   address        CHAR(50)
);
```

### 删除表

可以使用 SQLite 的 DROP TABLE 语句用来删除表定义及其所有相关数据。

DROP TABLE 语句语法如下
```sql
# 语法1：直接删除db文件中的某个表
DROP TABLE database_name.table_name;

# 语法2: 删除某个表，这种方式需要先进入到db文件中
DROP TABLE table_name;
```

> 例子

```bash
# 先与test1.db文件建立链接
C:\Users\18271\Desktop> sqlite3 test1.db
# 先查询文件中有那些表
sqlite> .tables
t_user
# 删除文件中的t_user表
sqlite> DROP TABLE t_user;
```

### 约束

当我们在创建表的时候，我们可以给表的列添加一些约束，从而确保了数据库中数据的准确性和可靠性。

约束可以是列级或表级。列级约束仅适用于列，表级约束被应用到整个表。

以下是在 SQLite 中常用的约束。
- NOT NULL 约束：确保某列不能有 NULL 值。
- DEFAULT 约束：当某列没有指定值时，为该列提供默认值。
- UNIQUE 约束：确保表中某列的所有值是不同的。
- PRIMARY KEY 约束 用于标识数据库表中的主键。
- CHECK 约束：CHECK 约束确保某列中的所有值满足一定条件。

####  NOT NULL 约束

默认情况下，列可以保存 NULL 值。如果您不想某列有 NULL 值，那么需要在该列上定义此约束，指定在该列上不允许 NULL 值。

NULL 与没有数据是不一样的，NULL 代表着未知的数据。

> 例子

t_user表的NAME 和 AGE 列指定不接受 NULL 值：

```sql
CREATE TABLE t_user(
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL,
   ADDRESS        CHAR(50),
);
```

#### DEFAULT 约束

DEFAULT 约束在 INSERT INTO 语句没有提供一个特定的值时，为列提供一个默认值。

> 例子

t_user表的 ADDRESS 列默认值为beijing

```sql
CREATE TABLE t_user(
   NAME           TEXT    NOT NULL,
   ADDRESS        CHAR(50) DEFAULT 'beijing'
);

```


#### UNIQUE 约束

UNIQUE 约束防止在一个列的不同记录中都存在相同的值。

> 例子

t_user表的 NAME 列有 UNIQUE 约束。意思是指表中不能有相同的名称。

```sql
CREATE TABLE t_user(
   NAME TEXT UNIQUE,
);

```

#### CHECK 约束

CHECK 约束会检测记录中的数据是否符合条件。如果条件值为 false，则记录违反了约束，且不能输入到表。

> 例子

t_user表的 AGE 列有 CHECK 约束。因此 age 列的数值必须大于10,否则无法插入到表中。

```sql
CREATE TABLE t_user(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     CHECK(AGE > 10),
);

```

#### PRIMARY KEY 约束

PRIMARY KEY 约束 用于标识数据库表中的主键。

在一个表中可以有多个具有 UNIQUE约束 的列，但只能有一个主键。在设计数据库表时，主键是很重要的。

主键是用来唯一标识数据库表中的各行/记录。主键必须包含唯一值。主键列不能有 NULL 值。

<font color="red">注意在 SQLite 中，主键可以是 NULL，这是与其他数据库不同的地方。</font>

> 例子

t_user表的 ID列 为主键。

```sql
CREATE TABLE t_user(
   ID             INT     PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL
);

```


#### 删除约束

在 SQLite 中，要删除表的约束，通常需要使用 ALTER TABLE 语句，并指定要删除的约束类型。

> 删除主键约束

table_name 是你要操作的表名，primary_key_name 是要删除的主键约束的名称。

```sql
ALTER TABLE table_name DROP CONSTRAINT primary_key_name;
```

> 删除唯一约束

```sql
ALTER TABLE table_name DROP CONSTRAINT unique_constraint_name;
```

> 删除外键约束

```sql
ALTER TABLE table_name DROP CONSTRAINT foreign_key_constraint_name;
```



### Autoincrement（自动递增）

SQLite 的 AUTOINCREMENT 是一个关键字，用于表中的字段值自动递增。我们可以在创建表时在特定的列名称上使用 AUTOINCREMENT 关键字实现该字段值的自动增加。

关键字 AUTOINCREMENT 只能用于整型（INTEGER）字段。

AUTOINCREMENT 关键字的基本用法如下

```sql
CREATE TABLE table_name(
   column1 INTEGER AUTOINCREMENT,
   column2 INTEGER AUTOINCREMENT,
   ....
);

```


## 表中数据

### insert 语句

SQLite 的 INSERT INTO 语句用于向数据库的某个表中添加新的数据行。

INSERT INTO 语句如下所示
```sql
# 语法1 向表中所有列进行赋值
INSERT INTO TABLE_NAME VALUES ( value1,value2,value3,...valueN );

# 语法2 向表中指定列进行赋值
INSERT INTO TABLE_NAME [( column1, column2, column3,...columnN )]  VALUES (value1, value2, value3,...valueN);

```

> 例子

```bash
# 使用insert语句向表中插入两条记录
sqlite> INSERT INTO t_user VALUES ( 1, 'bob', 11, 'beijing' );
sqlite> INSERT INTO t_user (id,name,age,address) VALUES ( 2, 'Paul', 32, 'beijing' );
```

### select 语句

SELECT 语句用于从 SQLite 数据库表中获取数据，以结果集的形式返回数据。

SELECT 语句语法如下
```sql
# 语法1 从表中获取所有数据的所有列信息
SELECT * FROM table_name;

# 语法2 从表中获取所有数据的指定列信息
SELECT column1, column2, columnN FROM table_name;
```

> 例子

```bash
# 前两个命令被用来设置正确格式化的输出方式。
sqlite>.header on
sqlite>.mode column
# 获取表中所有记录数据
sqlite> SELECT * FROM t_user;
id  name  age  address
--  ----  ---  -------
1   bob   11   beijing
2   Paul  32   beijing
```

### where 语句

WHERE 子句用于对一个表或多个表的数据进行条件筛选。

WHERE 子句语法如下
```sql
## 从表中获取指定条件的记录数据
SELECT column1, column2, columnN FROM table_name WHERE [condition]

```

> 例子

```bash
# 获取age在 25-50 之间的记录
sqlite> SELECT * FROM t_user WHERE AGE >= 25 AND AGE <= 50;

# 获取name不为null的记录,并且记录只包含name和age列
sqlite> SELECT name,age FROM t_user WHERE name IS NOT NULL;

```


### update 语句

UPDATE 语句用于修改表中已有的记录。可以使用带有 WHERE 子句的 UPDATE 语句来更新选定行记录，否则所有的行记录都会被更新。

update 语句语法如下
```sql
## 更新指定条件的行记录中的某些列的数据
UPDATE table_name SET column1 = value1, column2 = value2...., columnN = valueN WHERE [condition];

```

> 例子

```bash
# 如果您想修改 t_user 表中 所有行记录中的 address ，则不需要使用 WHERE 子句
sqlite> UPDATE t_user SET address = 'Texas';

# 它会更新 ID 为 6 的行记录的地址为Texas
sqlite> UPDATE t_user SET address = 'Texas' WHERE id = 6;

```


### delete 语句

DELETE 语句用于删除表中已有的行记录。可以使用带有 WHERE 子句的 DELETE 语句来删除选定行记录，否则所有的记录都会被删除。

delete 语句语法如下
```sql
# 删除表中指定条的行记录
DELETE FROM table_name WHERE [condition];
```

> 例子

```bash
# 删除 ID 为 7 的行记录
sqlite> DELETE FROM t_user WHERE ID = 7;

# 删除 t_user表 所有的行记录
sqlite> DELETE FROM t_user;
```

### like 子句

like 子句主要是通过通配符来匹配文本值。like 子句通常会与 where 语句搭配使用。

> like 子句语法如下
```sql
# 从表中查询出 column 字段的数据匹配文本的行记录
SELECT column_list  FROM table_name WHERE column LIKE 通配符表达式
```

> like 子句使用的通配符如下：
- 百分号 （%） ：代表零个、一个或多个数字或字符。
- 下划线 （_） ：代表一个单一的数字或字符。


> 通配符具体用法如下
```bash
WHERE SALARY LIKE '200%'	#查找以 200 开头的任意值
WHERE SALARY LIKE '%200%'	#查找任意位置包含 200 的任意值
WHERE SALARY LIKE '_00%'	#查找第二位和第三位为 00 的任意值
WHERE SALARY LIKE '2_%_%'	#查找以 2 开头，且长度至少为 3 个字符的任意值
WHERE SALARY LIKE '%2'	    #查找以 2 结尾的任意值
WHERE SALARY LIKE '_2%3'	#查找第二位为 2，且以 3 结尾的任意值
WHERE SALARY LIKE '2___3'	#查找长度为 5 位数，且以 2 开头以 3 结尾的任意值
```


> 例子

```bash
# 查询表中 AGE 以 2 开头的所有记录：
sqlite> SELECT * FROM t_user WHERE age LIKE '2%';
# 查询表中 address 中包含一个连字符（-）的所有记录
sqlite> SELECT * FROM t_user WHERE address  LIKE '%-%';

```


### glob 子句

glob 子句也是用来匹配通配符指定模式的文本值。glob 子句 与 like 子句的功能相同，但是glob 子句是大小写敏感的。

> glob 子句语法如下
```sql
# 从表中查询出 column 字段的数据匹配文本的行记录
SELECT column_list  FROM table_name WHERE column GLOB 通配符表达式
```

> glob 子句使用的通配符如下：
- *：匹配零个、一个或多个数字或字符。
- ?：代表一个单一的数字或字符。
- `[...]`：匹配方括号内指定的字符之一。例如，[abc] 匹配 "a"、"b" 或 "c" 中的任何一个字符。
- `[^...]`：匹配不在方括号内指定的字符之一。例如，[^abc] 匹配不是 "a"、"b" 或 "c" 中的任何一个字符的字符。

> 通配符具体用法如下
```bash
WHERE SALARY GLOB '200*'	# 查找以 200 开头的任意值
WHERE SALARY GLOB '*200*'	# 查找任意位置包含 200 的任意值
WHERE SALARY GLOB '?00*'	# 查找第二位和第三位为 00 的任意值
WHERE SALARY GLOB '2??'	    # 查找以 2 开头，且长度为 3 个字符的任意值，例如，它可能匹配 "200"、"2A1"、"2B2" 等值。
WHERE SALARY GLOB '*2'	    # 查找以 2 结尾的任意值
WHERE SALARY GLOB '?2*3'	# 查找第二位为 2，且以 3 结尾的任意值
WHERE SALARY GLOB '2???3'	# 查找长度为 5 位数，且以 2 开头以 3 结尾的任意值
```


> 例子

```bash
# 查询表中 AGE 以 2 开头的所有记录：
sqlite> SELECT * FROM t_user WHERE age GLOB '2*';
# 查询表中 address 中包含一个连字符（-）的所有记录
sqlite> SELECT * FROM t_user WHERE address  GLOB '*-*';

# 匹配以 "A" 或 "B" 开头的产品名称。
sqlite> SELECT * FROM products WHERE product_name LIKE '[AB]%';

# 匹配不以 "X" 或 "Y" 开头的产品代码。
sqlite> SELECT * FROM products WHERE product_code LIKE '[^XY]%';
```


### limit 子句

LIMIT 子句用于限制由 SELECT 语句返回的数据数量。

> limit 子句语法如下
```sql
# 语法1：返回第一行到第num行的数据
SELECT column1, column2, columnN FROM table_name LIMIT num

# 语法2：返回从第(a+1)行后 num行数量的数据
SELECT column1, column2, columnN FROM table_name LIMIT num OFFSET a

```

> 例子

```bash
# 查询表中 从第1行开始的6行数据记录
sqlite> SELECT * FROM COMPANY LIMIT 6;

# 查询表中 从第3行开始的3行数据记录
sqlite> SELECT * FROM COMPANY LIMIT 3 OFFSET 2;
```


### order by 子句

ORDER BY 子句是用来对查询出来的数据记录，根据某个列，按升序或降序顺序排列。

> limit 子句语法如下
```sql
# ASC 默认值，可以不写，从小到大，升序排列
# DESC 从大到小，降序排列
SELECT column-list FROM table_name  [WHERE condition]  [ORDER BY column1, column2, .. columnN] [ASC | DESC];

# 例子1：从表中根据条件查询数据，然后对查询的数据，先根据 列1 按升序排列，后根据列2 按降序排列
SELECT select_list FROM table_name WHERE xxx ORDER BY column_1 ASC, column_2 DESC;

```

> 例子

```bash
# 查询t_user表的数据，先根据名称进行升序排列,后根据年龄进行降序排列
sqlite> SELECT * FROM t_user ORDER BY name ASC , age desc;

```


### Group By 子句

SQLite 的 GROUP BY 子句用于与 SELECT 语句一起使用，对查询的数据进行分组处理。

在 SELECT 语句中，GROUP BY 子句放在 WHERE 子句之后，放在 ORDER BY 子句之前。

> Group By 子句语法如下

GROUP BY 子句必须放在 WHERE 子句中的条件之后，必须放在 ORDER BY 子句之前。

```sql
SELECT xxx FROM table_name WHERE xxx GROUP BY column1, column2....columnN ORDER BY xxx
```

> 例子

```bash
# 查询t_course_score 课程分数表中每个人的课程总分
sqlite> SELECT name, SUM(score) FROM t_course_score GROUP BY name;
```


### Having 子句

WHERE 子句在所选列上设置条件，而 HAVING 子句则在由 GROUP BY 子句创建的分组上设置条件。

因此 HAVING 子句允许指定条件来过滤  GROUP BY 子句的分组结果。

> Having 子句语法如下

在一个查询中，HAVING 子句必须放在 GROUP BY 子句之后，必须放在 ORDER BY 子句之前。

```sql
SELECT xxx FROM table1, table2 WHERE xxx GROUP BY xxx HAVING [ conditions ] ORDER BY xxx
```

> 例子

```bash
# 先根据 name 对 t_user的行记录进行分组，然后从分组结果中 筛选出 名称计数 < 2 的行记录
sqlite > SELECT * FROM t_user GROUP BY name HAVING count(name) < 2;

```


### Join 子句

SQLite 的 Join 子句用于结合两个或多个数据库中表的记录。

SQLite 定义了三种类型的 Join 子句：
- 交叉连接 - CROSS JOIN
- 内连接 - INNER JOIN
- 外连接 - OUTER JOIN

#### 交叉连接 - CROSS JOIN

交叉连接会把第一个表的每一行与第二个表的每一行进行匹配。如果两个表分别有 x 和 y 行，则交叉连接的结果记录有 x*y 行。

<font color="red">由于交叉连接（CROSS JOIN）有可能产生非常大的表，使用时必须谨慎，只在适当的时候使用它们。</font>

> 交叉连接（CROSS JOIN）的语法

```sql
SELECT xxx FROM table1 CROSS JOIN table2 xxx
```

> 例子

对t_user表和t_department表进行交叉连接，返回查询结果
```bash
sqlite> SELECT ID, NAME, DEPT FROM t_user CROSS JOIN t_department;
```


#### 内连接 - INNER JOIN

内连接根据连接条件，把两个表（table1 和 table2）的结合起来创建一个新的结果表。

内连接查询会把 table1 中的每一行与 table2 中的每一行进行比较，找到所有满足连接条件的匹配行记录。当满足连接条件时，A 和 B 行的每个匹配对的列值会合并成一个结果行。

<font color="red">内连接（INNER JOIN）是最常见的连接类型，是默认的连接类型。INNER 关键字是可选的。</font>


>内连接（INNER JOIN）的语法

```sql
SELECT xxx FROM table1 [INNER] JOIN table2 ON 连接条件
```

> 例子

对t_user表和t_department表进行内连接，查询出满足连接条件（ID相同）的行记录。
```sql
SELECT ID, NAME, DEPT FROM t_user INNER JOIN t_department ON t_user.ID = t_department.EMP_ID;

```


#### 外连接 - OUTER JOIN

外连接（OUTER JOIN）是内连接（INNER JOIN）的扩展。

虽然 SQL 标准定义了三种类型的外连接：LEFT、RIGHT、FULL，但 SQLite 只支持 左外连接（LEFT OUTER JOIN）。


> 左外连接（LEFT OUTER JOIN）的语法

```sql
SELECT xxx FROM table1 LEFT OUTER JOIN table2 ON 连接条件 ...
```

> 例子

对t_user表和t_department表进行左外连接，查询出满足连接条件（ID相同）的行记录。
```sql
SELECT ID, NAME, DEPT FROM t_user LEFT OUTER JOIN t_department
        ON t_user.ID = t_department.EMP_ID;
```


## 索引

索引（Index）是一种特殊的查找表，用来加快数据检索。简单地说，索引是一个指向表中数据的指针。一个数据库中的索引与一本书的索引目录是非常相似的。

索引有助于加快 SELECT 查询和 WHERE 子句，但它会减慢使用 UPDATE 和 INSERT 语句时的数据输入。索引可以创建或删除，但不会影响数据。

SQLite 使用 CREATE INDEX 语句创建索引。

### 单列索引

单列索引是一个只基于表的一个列上创建的索引。

```sql
# 为表的某个列创建一个单列索引
CREATE INDEX index_name ON table_name (column_name);
```

### 唯一索引

使用唯一索引不仅是为了性能，同时也为了数据的完整性。唯一索引不允许任何重复的值插入到表中。

```sql
# 为表的某个列创建一个唯一索引
CREATE UNIQUE INDEX index_name on table_name (column_name);
```

### 组合索引

组合索引是基于一个表的两个或多个列上创建的索引。

```sql
# 将表中的多个列组合在一起， 创建一个组合索引
CREATE INDEX index_name on table_name (column1, column2);
```

### DROP INDEX 索引删除语句

一个索引可以使用 DROP INDEX 语句删除。当删除索引时应特别注意，因为性能可能会下降或提高。

```bash
DROP INDEX index_name;
```


## 事务

事务（Transaction）是一个完整的执行工作单元。这个工作单元通常可以包含多个数据库命令。

> 事务的ACID属性

- 原子性（Atomicity）：确保工作单位内的所有的数据库操作都成功完成，否则，事务会在出现故障时终止，之前的操作也会回滚到以前的状态。
- 一致性（Consistency）：确保数据库在成功提交的事务上正确地改变状态。
- 隔离性（Isolation）：使多个事务的操作相互独立和透明。
- 持久性（Durability）：确保已提交事务的结果或效果在系统发生故障的情况下仍然存在。

> 事务控制命令

- BEGIN TRANSACTION 或 BEGIN：开始事务操作。
- COMMIT：把事务中的数据操作更改保存到数据库中。
- ROLLBACK：用于撤消尚未保存到数据库的事务操作。

> 例子

```sql
# 开始一个事务，并从表中删除 age = 25 的记录，最后使用 ROLLBACK 命令撤消所有的更改。
sqlite> BEGIN;
sqlite> DELETE FROM t_user WHERE AGE = 25;
sqlite> ROLLBACK;

# 开始另一个事务，从表中删除 age = 25 的记录，最后使用 COMMIT 命令提交所有的更改。
sqlite> BEGIN;
sqlite> DELETE FROM t_user WHERE AGE = 25;
sqlite> COMMIT;
```
