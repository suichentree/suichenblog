---
title: MySQL笔记5-约束
date: 2023-07-18
sidebar: 'auto'
categories: 
 - 数据库
tags:
 - MySql
---

[toc]

# MySQL笔记5-约束

在 MySQL 中，约束是指对表中数据的一种限制，来确保数据的正确性和唯一性。

在 MySQL 中，主t要支持以下 6 种约束：
* 主键约束
* 外键约束
* 唯一约束
* 检查约束
* 非空约束
* 默认值约束

## 检查表结构（可用于查看表中约束）

在 MySQL 中可以使用 SHOW CREATE TABLE 语句来查看表中结构与属性。

```sql
# 语法如下
SHOW CREATE TABLE <表名>;
```


## 主键（主键约束）

主键（PRIMARY KEY）的完整称呼是“主键约束”，是 MySQL 中使用最为频繁的约束。

主键是表的一个特殊字段，该字段能唯一标识该表中的每条信息。例如，学生信息表中的学号是唯一的。那么就可以将学号字段设置为表中的主键。

主键分为单字段主键和多字段联合主键。
* 单字段主键：就是将表中的一个字段设置为一个主键。
* 多字段联合主键：就是将表中的多个字段联合设置为一个主键。

> 主键注意事项：
1. 一个表中只能有一个主键。
2. 主键值必须唯一标识表中的每一行，且不能为 NULL，即表中不可能存在有相同主键值的两行数据。即主键值唯一。
3. 联合主键不能包含不必要的多余字段。一个字段名只能在联合主键字段表中出现一次。


### 在创建表的时候设置主键

> 设置单字段主键，有2种方式

```sql
# 语法如下
<字段名> <数据类型> PRIMARY KEY;

# 方式1
# 设置表中id为主键
CREATE TABLE test_db
(
id INT(11) PRIMARY KEY,
name VARCHAR(25),
deptId INT(11),
salary FLOAT
);

# 方式2
# 设置表中id为主键
CREATE TABLE test_db2
(
id INT(11),
name VARCHAR(25),
deptId INT(11),
salary FLOAT,
PRIMARY KEY(id)
);
```

> 设置多字段联合主键

<font color="red">注意：当主键是由多个字段组成时，不能直接在字段名后面声明主键约束。</font>

```sql
# 语法如下
PRIMARY KEY [字段1，字段2，…,字段n];

# 设置表中name与deptId为联合主键
CREATE TABLE tb_emp5
(
name VARCHAR(25),
deptId INT(11),
salary FLOAT,
PRIMARY KEY(name,deptId)
);
```

### 在修改表的时候设置主键

<font color="red">注意：设置成主键约束的字段中不能够有重复的，并且要保证是非空的。否则，无法设置主键约束。。</font>

```sql
# 语法如下
ALTER TABLE <数据表名> ADD PRIMARY KEY(<字段名>);

# 设置test_db表中id为主键
ALTER TABLE test_db ADD PRIMARY KEY(id);
```

### 删除表中的主键

```sql
# 语法如下
ALTER TABLE <数据表名> DROP PRIMARY KEY;

# 删除test_db表中的主键，不需要指定主键名称。
ALTER TABLE test_db DROP PRIMARY KEY;
```

### 设置主键自增长

在 MySQL 中，当主键设置为自增长后，这个主键的值就不再需要用户输入数据了，而由数据库系统自动赋值。每增加一条记录，主键会自动增长。

```sql
# 语法如下
字段名 数据类型 AUTO_INCREMENT;

# 设置id主键 自增长
# 设置后表中每插入一条新记录，id的值就会在前一条记录的基础上自动加 1。
CREATE TABLE tb_student(
id INT(4) PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(25) NOT NULL
);
```

> 自增长注意事项
* 默认情况下，AUTO_INCREMENT 的初始值是 1，每新增一条记录，字段值自动加 1。
* 一个表中只能有一个字段使用 AUTO_INCREMENT，即为主键或主键的一部分。
* AUTO_INCREMENT 的字段只能是整数类型（TINYINT、SMALLINT、INT、BIGINT 等）。
* AUTO_INCREMENT 字段的最大值受该字段的数据类型约束，如果达到上限，AUTO_INCREMENT 就会失效。


## 外键（外键约束）

外键（FOREIGN KEY）的完整称呼是“外键约束”。外键是一个特殊字段，经常与主键在一起使用。对于两个有关系的表来说，一个表的主键就相当于是另一个表的外键。

外键用来建立主表与从表的关联关系，为两个表的数据建立连接，约束两个表中数据的一致性和完整性。例如，一个水果摊只有苹果、桃子、李子、西瓜等 4 种水果，那么你买水果就只能选择苹果、桃子、李子和西瓜，其它的水果都是不能购买的。


> 外键注意事项:
* 定义某个字段为外键的时候，该字段必须是某个表的主键。
* 外键的数据类型和主键的数据类型必须相同。
* 一个表可以有一个或多个外键，外键可以为空值，若不为空值，则每一个外键的值必须等于主表中主键的某个值。

### 创建表的时候设置外键

```sql
# 语法如下
[CONSTRAINT 外键名] FOREIGN KEY (字段名) REFERENCES 表名(主键字段名)

# 设置外键
CREATE TABLE test_db2
(
id INT(11) PRIMARY KEY,
name VARCHAR(25),
deptId INT(11),
salary FLOAT,
FOREIGN KEY(deptId) REFERENCES tb_dept(id)
);

# 设置外键，并给外键约束起个名称
CREATE TABLE test_db
(
id INT(11) PRIMARY KEY,
name VARCHAR(25),
deptId INT(11),
salary FLOAT,
CONSTRAINT fk_1 FOREIGN KEY(deptId) REFERENCES tb_dept(id)
);

```

* [CONSTRAINT 外键名]：可省略。用于给外键约束起个名称。


### 修改表的时候设置外键

外键约束也可以在修改表时添加，但是添加外键约束的前提是：从表中外键列中的数据必须与主表中主键列中的数据一致或者是没有数据。

```sql
# 语法如下
ALTER TABLE <表名> ADD CONSTRAINT <外键名> FOREIGN KEY(字段名) REFERENCES <主表名> (<列名>);

# 将test_db表的deptId字段设置为外键，与tb_dept的id字段关联。
ALTER TABLE test_db ADD CONSTRAINT fk_1 FOREIGN KEY(deptId) REFERENCES tb_dept(id);
```

### 删除表中外键

外键一旦删除，就会解除主表和从表间的关联关系。

```sql
# 语法如下
ALTER TABLE <表名> DROP FOREIGN KEY <外键约束名>;

# 删除数据表 tb_emp2 中的外键约束 fk_tb_dept1
ALTER TABLE tb_emp2 DROP FOREIGN KEY fk_tb_dept1;
```


## 唯一约束（Unique Key）

MySQL 唯一约束（Unique Key）是指该字段的值不能重复出现。

> 唯一约束与主键约束的区别？
* 相同点：唯一约束与主键约束相似的是它们都可以确保列的唯一性。
* 区别点：唯一约束在一个表中可有多个，并且允许有空值。而主键约束在一个表中只能有一个，且不允许有空值。

### 创建表的时候设置唯一约束

唯一约束通常设置在除了主键以外的其他字段上。

```sql
# mysql使用 UNIQUE 关键字指定唯一约束。语法如下
<字段名> <数据类型> UNIQUE

# 给name字段设置唯一约束
CREATE TABLE test_db
(
id INT(11) PRIMARY KEY,
name VARCHAR(22) UNIQUE,
location VARCHAR(50)
);
```

### 修改表的时候设置唯一约束

唯一约束通常设置在除了主键以外的其他字段上。

```sql
# 语法如下
ALTER TABLE <数据表名> ADD CONSTRAINT <唯一约束名> UNIQUE(字段名);

# 在tb_dept1表中，给name字段设置唯一约束，约束名称为unique_name
ALTER TABLE tb_dept1 ADD CONSTRAINT unique_name UNIQUE(name);
```

### 删除表中的唯一约束

唯一约束通常设置在除了主键以外的其他字段上。

```sql
# 语法如下
ALTER TABLE <表名> DROP INDEX <唯一约束名称>;

# 删除tb_dept1表中的唯一约束unique_name
ALTER TABLE tb_dept1 DROP INDEX unique_name;
```

## 检查约束（check）

MySQL 检查约束（CHECK）是用来检查数据表中字段值有效性的一种手段。

> 如何检查？
> 当更新表数据的时候，mysql 会检查更新后的数据行是否满足检查约束（CHECK）中的限定条件。限定条件一般是sql表达式

### 创建表的时候设置检查约束

```sql
# 语法如下
CHECK(检查条件)

# 设置检查约束，要求 salary 字段值大于 0 且小于 10000
CREATE TABLE tb_emp7
(
id INT(11) PRIMARY KEY,
name VARCHAR(25),
deptId INT(11),
salary FLOAT,
CHECK(salary>0 AND salary<100)
);
```

### 修改表的时候设置检查约束

```sql
# 语法如下
ALTER TABLE 表名 ADD CONSTRAINT <检查约束名> CHECK(检查条件)

# 要求表中的id 字段值大于 0
ALTER TABLE test_db ADD CONSTRAINT check_id CHECK(id>0);
```

### 删除检查约束

```sql
# 语法如下
ALTER TABLE 表名 DROP CONSTRAINT <检查约束名>;

# 删除表中的检查约束check_id
ALTER TABLE test_db DROP CONSTRAINT check_id;
```

## 默认值约束

默认值约束（Default Constraint），用来指定某个字段的默认值。在表中插入一条新记录时，如果没有为某个字段赋值，系统就会自动为这个字段插入默认值。

### 创建表的时候设置默认值约束

```sql
# 语法如下
<字段名> <数据类型> DEFAULT <默认值>;

# location字段默认值为 Beijing
CREATE TABLE test_db
(
id INT(11) PRIMARY KEY,
name VARCHAR(22),
location VARCHAR(50) DEFAULT 'Beijing'
);
```

### 修改表的时候设置默认值约束

```sql
# 语法如下
ALTER TABLE <表名> CHANGE COLUMN <字段名> <数据类型> DEFAULT <默认值>;

# location字段默认值为 Beijing
ALTER TABLE test_db CHANGE COLUMN location VARCHAR(50) DEFAULT 'Shanghai';
```

### 删除默认值约束

```sql
# 语法如下
ALTER TABLE <表名> CHANGE COLUMN <字段名> <数据类型> DEFAULT NULL;

# 删除表中的默认值约束
ALTER TABLE test_db CHANGE COLUMN location VARCHAR(50) DEFAULT NULL;
```


## 非空约束

MySQL 非空约束（NOT NULL）指字段的值不能为空。对于使用了非空约束的字段，如果用户在添加数据时没有指定值，数据库系统就会报错。

### 创建表的时候设置非空约束

```sql
# 语法如下
<字段名> <数据类型> NOT NULL;

# name字段默认非空
CREATE TABLE test_db
(
id INT(11) PRIMARY KEY,
name VARCHAR(22) NOT NULL
);
```

### 修改表的时候设置非空约束

```sql
# 语法如下
ALTER TABLE <表名> CHANGE COLUMN <字段名> <数据类型> NOT NULL;

# location字段默认非空
ALTER TABLE test_db CHANGE COLUMN location VARCHAR(50) NOT NULL;
```

### 删除非空约束

```sql
# 语法如下
ALTER TABLE <数据表名> CHANGE COLUMN <字段名> <数据类型> NULL;

# 删除表中的非空约束
ALTER TABLE test_db CHANGE COLUMN location VARCHAR(50) NULL;
```