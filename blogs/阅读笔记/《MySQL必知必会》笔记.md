---
title: 《MySQL必知必会》笔记
date: 2022-03-07
sidebar: 'auto'
categories: 
 - 笔记
tags:
 - MySql
---

[toc]

## 《MySQL必知必会》笔记

该文章是阅读《MySQL必知必会》这本书后的读后感，并且总结了这本书中的几个方面的笔记。

### 1 查询数据

<font color="red">注意SQL语句不区分大小写，因此 SELECT与select是相同的。同样，写成Select也没有关系。 许多SQL开发人员喜欢对所有SQL关键字使用大写，而对所有 列和表名使用小写，这样做使代码更易于阅读和调试。</font>

```sql
select age from students; //从学生表中查询所有年龄
```

#### ① distinct 关键字

distinct 关键字可以查询该列中所有不同的值，相同的值不会重复输出。

```sql
select distinct age from students;  //从学生表中查询所有年龄，重复的年龄只会出现一次

select distinct age,name from students; //从学生表中查询所有年龄和姓名的组合不重复的记录。

```

distinct关键字应用于所有列而不仅是前置它的列。例如select distinct name,age 会从表中查询name和age组合不重复的记录。

#### ② limit 关键字

limit关键字可以查询指定的几行记录，主要可以用于sql分页查询

```sql
select name from students limit 5;   //查询前5行记录，从第一行开始查询
select name from students limit 0,1; //从行0开始，查询一个记录
select name from students limit 3,5; //从行3(第4行记录)开始，查询5个记录

select name from students limit 3 offset 5; //从行5(第6行记录)开始，查询3个记录
```

1. 带一个值的limit是从第一行开始，给出的数为返回的行数。 
带两个值的limit可以指定从行号为第一个值的位置开始，返回具体行数的记录。
2. 行0: 检索出来的第一行为行0而不是行1。因此，limit 1,1 的意思是从第二行开始返回一行记录。因此将检索出第二行而不是第一行。
3. 当表中的行有限时，使用limit查询的行数大于实际表的行数时，limit只会查询到最后一行。
4. limit x offset y 意思是从行y开始查询x个记录。

<font color="red">PS： limit x offset y 是 mysql 5支持 limit 的另一种替代语法。</font>

#### ③ order by 对查询的数据进行排序

```sql
## order by 对单个列进行排序
select * from students order by name; //根据name排序查询出来的学生表记录

## order by 对多个列进行排序
select * from students order by name,age; //先对name进行排序，若有相同的多个记录，再对age进行排序

## order by xxx ASC
select * from students order by name ASC; //ASC升序排序，默认是可以不写的。升序：从小到大

## order by xxx DESC
select * from students order by name DESC; //DESC降序排序。升序：从大到小

## 针对多个列中的一个列进行降序排序
select * from students order by name DESC，age; //针对name进行降序排序,age则是升序排序

## 针对多个列都进行降序排序
select * from students order by name DESC,age DESC; //针对name和age进行降序排序

```

1.  order by name,age 意思是首先对name进行排序，当存在name相同的多个记录时，这多个记录再针对age进行排序。若表中不存在name相同的多个记录，则不会按照age进行排序了。
2. order by name 和 order by name ASC 都是升序排序。因为升序排序是默认的（如果既不指定ASC也不指定DESC，则假定为ASC）。
3. <font color="red">DESC关键字只应用到直接位于其前面的列名。如果想在多个列上进行降序排序，必须对每个列指定DESC关键字。</font>
4. ORDER BY子句的位置保证它位于FROM子句之后。如果使用LIMIT，它必须位于ORDER BY之后。使用子句的次序不对将产生错误消息。


### 2. 过滤数据（查询条件）


**关于SQL过滤与程序过滤**

数据也可以在程序端进行过滤。SQL的SELECT语句为客户机应用检索出超过实际所需的数据，然后客户机代码对返回数据进行循环，以提取出需要的行。 但是，如果在客户机上过滤数据,服务器不得不通过网络发送多余的数据，这将导致网络带宽的浪费。因此，可以通过进行SQL过滤，可以提高应用的性能并减少服务器的压力。


#### ① where 子句

在SELECT语句中，数据根据WHERE子句中指定的搜索条件进行过滤。 WHERE子句在表名（FROM子句）之后给出。

```sql
select name from students where name = 'jack';  //查询所有名字为jack的记录
select age from students where age <> 12;       //查询所有年龄不为12的记录
select age from students where age != 12;       //查询所有年龄不为12的记录
```

1. 尖括号`<>` 和 != 都是不等于的意思。尖括号`<>` 是新规范的语法。
2. 对于字符串类似的值，则需要用单引号' '括起来。数值型的值则不用。

#### ② between 关键字

```sql
select age from students where age between 5 and 10;  //查询age在5-10岁的学生

//between 5 and 10 就相当于 age >= 5 and age <= 10
```



#### ③ is null 关键字

```sql
select * from students where tel is null;  //查询tel没有填写的学生
```

NULL无值（no value），它与字段包含0、空字符串或仅仅包含空格不同。当一个列不包含值时，则称其为包含空值NULL。

#### ④ and，or 关键字

1. and关键字需要同时满足左右两个条件的记录，才能查询出来

```sql
select * from students where age > 12 and name = 'jack'; 
```

2. OR 关键字，只要左右两个条件满足其中一个都可以查询出来

```sql
select * from students where age > 12 or age < 6;
```

3. and 和 or 混合使用

```sql
select * from students where age > 12 or age < 6 and name = 'jack';
select * from students where ( age > 12 or age < 6 ) and name = 'jack';
```

<font color="red">操作符计算次序： 括号（） > AND 操作符 > OR 操作符</font>


#### ⑤ in 和 not 关键字

IN操作符用来指定条件范围，范围中的每个条件都可以进行匹配。

```sql
select * from students where age in (12,13); //查询age为12和13的记录
```

1. in操作符和or操作符的功能相当。age in (12,13) 就相当于 age = 12 or age = 13



NOT操作符有且只有一个功能，那就是否定它之后所跟的任何条件。

```sql
select * from students where age NOT in (12,13); //查询age不为12和13的记录
```

<font color="red">MySQL支持使用NOT对IN、BETWEEN和 EXISTS子句取反。</font>


#### ⑥ like 关键字

1. % 通配符。%表示任何字符出现任意次数。

```sql
select * from students where name LIKE '%ack';  //查询name以ack结尾的记录
select * from students where name LIKE 'jac%';  //查询name以jac开头的记录
select * from students where name LIKE '%ac%';  
```

虽然似乎%通配符可以匹配任何东西，但有一个例外，即NULL。即使是WHERE name LIKE '%'也不能匹配用值NULL作为产品名的行。

2. _ 下划线通配符。下划线只匹配单个字符而不是多个字符。_总是匹配一个字符，不能多也不能少。

```sql
select * from students where name LIKE '_ack';  
```

<font color="red">注意：当like没有和通配符配套使用时，like会失去作用。</font>

```sql
select * from students where name LIKE 'jack';  //注意，此处没有使用%和_通配符，就算表中有jack的列，也不会查询到。 
```


#### ⑦ REGEXP 关键字 正则表达式搜索

WHERE子句对正则表达式提供了初步的支持，允许你指定正则表达式， 过滤SELECT检索出的数据。需要注意：MySQL仅支持多数正则表达式实现的一个很小的子集。

REGEXP关键字的使用和LIKE关键字相似。REGEXP后所跟的东西作为正则表达式处理。


```sql
select * from students where name REGEXP 'jack';  //用正则表达式去匹配name列包含jack的记录

select * from students where name REGEXP 'jack|bob|mike';  //用正则表达式去匹配name列包含jack或bob或mike的记录
```

<font color="red">其余的正则表达式用法，请自行百度</font>



### 3 计算字段，处理数据

什么是计算字段？

有的时候，存储在表中的数据不是应用程序马上需要的。我们需要将从数据库中检索出的数据，经过转换格式、计算后，才能给应用程序使用。为什么不直接在应用程序中进行转换和计算的工作，是因为在数据库服务器上完成这些操作比在应用程序中完成要快得多，因为DBMS是设计来快速有效地完成这种处理的。

<font color="red">计算字段就是将查询出来的数据，经过二次加工。再把加工后的数据返回给应用程序。</font>


#### 1.concat()函数拼接字段

```sql
select concat(name,'(',age,')') from students;  //从表中查询名字和年龄的数据，并转换成name(age)的格式。
```

#### 2. as关键字 使用别名

别名可以给一个计算字段赋予一个列名。

```sql
select concat(name,'(',age,')') as title from students;  //将sql中的计算字段赋予列名 title
```

通过concat函数计算查询出来的数据，通常没有一个列名。因此这个计算字段无法给客户机的应用程序使用。为了解决这个问题，SQL支持列别名。别名是一个字段或值的替换名。别名用AS关键字赋予。


#### 3. 其余数据处理函数

UPPER()函数：将文本转换为大写
DATE()函数：返回日期时间中的日期部分

```sql
select UPPER(name) FROM students; //将name转变为大写
select * FROM students where DATE(birth) = '2000-02-02'; //查询2000年2月2日出生的学生记录
```

<font color="red">其实还有许多函数，请自行百度。</font>



### 4 聚集函数(聚合函数)，汇总数据

<font color="red">聚合函数（avg、sum、max、min、count），不能作为条件放在where子句之后，但可以放在having子句之后</font>

聚集函数主要用于汇总数据。例如查询表中的记录数，查询某个列的最大最小值等。这些都是对表中数据的汇总，并不是想要获取实际查询出来的数据。

① AVG()函数：返回特定列的平均值。

```sql
select AVG(age) as average from students; //查询表中学生的平均年龄

``` 

1. AVG()只能用来确定特定数值列的平均值，而 且列名必须作为函数参数给出。为了获得多个列的平均值， 必须使用多个AVG()函数。
2. AVG()函数忽略列值为NULL的行。


② COUNT()函数：用于计算表中行的数目或符合特定条件的行的数目。

1. 使用COUNT(*)会对表中行的数目进行计数，不管表列中包含的是空 值（NULL）还是非空值。 
2. 使用COUNT(column)对特定列中具有值的行进行计数，忽略NULL值。


```sql
select COUNT(*) as num from students;     //查询表中有多少条记录，即有多少个学生
```

③ max()，min(),sum()函数

```sql
select max(age) as max_age from students;   //查询出最大的年龄
select min(age) as min_age from students;   //查询最小的年龄
select sum(age) as sum_age from students;   //查询年龄的总和
```

1. max()函数：返回指定列的最大值。忽略列值为NULL的行。
2. min()函数：返回指定列的最小值。忽略列值为NULL的行。
3. sum()函数：返回指定列的总和。忽略列值为NULL的行。



### 4 分组数据，将数据分为多个逻辑组


#### 1. group by 子句

group by 子句用于根据字段来对数据进行分组。通常配合聚合函数来用，分组之后你可以计数（count），求和（sum），求平均数（avg）等

```sql
select grade,count(*) as num from students group by grade; //统计每个年级的学生人数

//解析：
// group by grade 将数据按年级分组
// count(*) as num 统计每个年级分组的学生个数

select * from students group by grade,name; //根据grade,name来对数据进行分组

```

1. group by子句必须出现在 where子句之后，order by子句之前。
2. group by grade,name  对多个字段进行分组时，需要将name和grade看成一个整体，只要是name和grade相同的可以分成一组；如果只是name相同，grade不同就不是一组。


#### 2. having子句，用于过滤分组数据

<font color="red">

having和where的区别？
where在数据分组前进行过滤，having在数据分组后进行过滤。这是一个重要的区别，where排除的行不包括在分组中。这可能会改变计算值，从而影响having子句中基于这些值过滤掉的分组。总而言之，如果你想要的查询结果是分组后的数据，则用having子句。否则用where子句。

</font>


```sql
select grade,count(*) as num from students group by grade having count(*) >10; 
// 统计每个年级的学生人数，过滤人数小于10人的年级

select grade,count(*) as num from students where grade > 3 group by grade having count(*) >10; 
// 统计3年级以上的学生人数，过滤人数小于10人的年级

select grade,count(*) as s_num from students where grade > 3 group by grade having count(*) >10 order by s_num desc; 
// 统计3年级以上的学生人数，过滤人数小于10人的年级,按人数从大到小的顺序排序

```

1. where子句应该在group by前， having子句在group by 之后
2. 聚合函数（avg、sum、max、min、count），不能作为条件放在where之后，但可以放在having之后
3. where子句是过滤具体的行，having子句过滤的是某个具体的分组数据。


### 5 子查询（嵌套查询）

子查询（嵌套查询）大多使用 in 关键字

```sql
select name,grade from students where sid in (select sid from students where grade = 3); 
//查询3年级的学生的姓名

select name from student where age = ( select max(age) from student); 
//查询年龄最大的学生的姓名

select xxx from (xxx);  
//子查询也可以写在from之后

```


### 6 连接表查询

连接表：根据表与表之间的共同点，将多个表联结在一起。注意：如果多个表中有相同字段，查询的时候需要区别表名，否则mysql不清楚是那个表的字段，从而报错。

#### 0 全相乘查询（不是连接表查询）

全相乘查询：若是两个表全相乘查询，则查询出所有两两组合的结果。

```sql
select st.name,sc.course,sc.num from students st ,scores sc;
// 直接从两个表中查询所有两两组合的结果

select st.name,sc.course,sc.num from students st ,scores sc where st.sid = sc.sid;
//从学生表和分数表中查询姓名，课程，分数的结果
```

<font color="red">

1. 如果一张表有10000条数据，另一张表有10000条数据，两表全相乘就是100W条数据，是非常消耗内存的。而且，全相乘不能好好的利用索引。因为全相乘查询会生成一张临时表，临时表里是没有索引的，大大降低了查询效率。
2. 保证所有连接都有WHERE子句，否则MySQL将查询许多无用数据

</font>

#### 1.左连接 left join ... on ...

左连接查询是以左表为主表，会先将左表所有数据查询出来，而右表则根据条件去匹配，如果右表没有满足条件的行，则查询出来的右表字段默认显示NULL。

```sql
select st.name,sc.course,sc.num from students st left join scores sc on st.sid = sc.sid;
// 学生表为左表，分数表为右表
```

1. 左连接查询速度快，消耗内存小，而且使用了索引。左连接查询效率相比于全相乘的查询效率快了10+倍以上
2. left join ... on ... 的另一种写法 left outer join ... on ...

#### 2 右连接 right join ... on ...

右连接查询是以右表为主表，会先将右表所有数据查询出来，而左表则根据条件去匹配，如果左表没有满足条件的行，则查询出来的左表字段默认显示NULL。

```sql
select st.name,sc.course,sc.num from students st right join scores sc on st.sid = sc.sid;
// 学生表为左表，分数表为右表
```
1. right join ... on ... 的另一种写法 right outer join ... on ...


#### 3.内连接 inner join ... on ...

内连接查询，就是取左连接和右连接的交集，如果两边不能匹配条件，则都不取出。

```sql
select st.name,sc.course,sc.num from students st inner join scores sc on st.sid = sc.sid;
//从学生表和分数表中查询姓名，课程，分数的结果
```

#### 4.全连接查询 full join ... on ...

全连接会将两个表的所有数据查询出来，不满足条件的为NULL。
全连接查询跟全相乘查询的区别在于，如果某个项不匹配，全相乘不会查出来，全连接会查出来，而连接的另一边则为NULL。

```sql
select st.name,sc.course,sc.num from students st full join scores sc on st.sid = sc.sid;
```


### 7 组合查询（多select语句联合查询）union，unoin all 

union可以将多条select语句组合在一起。并将结果作为单个查询结果集返回。

```sql
select name,age from students where age > 5 union select name,age from student where sid in (111,222)
//查询年龄大于5的学生和学号为111与112的学生，会过滤重复的行

select name,age from students where age > 5 union all select name,age from student where sid in (111,222)
//不会过滤重复的行
```

1. UNION中的每个查询必须包含相同的列、表达式或聚集函数。
2. UNION从查询结果集中自动去除了重复的行。
3. UNION ALL不会过滤查询出来的重复的行


### 8 插入数据和删除数据

① insert into 插入语句

语法：insert into table_name (列1, 列2,...) values (值1, 值2,....)

```sql
INSERT INTO Persons VALUES ('Gates', 'Bill', 'Xuanwumen 10', 'Beijing')
INSERT INTO Persons (LastName, age) VALUES ('Wilson', null)

//一次插入多行
INSERT INTO Persons (LastName, age) VALUES ('Wilson', null),('bill', 12),('jack', 12)
```

1. 如果某个列没有值，应该使用NULL值。NULL值会被MySQL忽略。
2. MySQL用单条INSERT语句处理多个插入比使用多条INSERT语句快。


②：insert into .... select .... 语句


```sql
INSERT INTO new_Persons (LastName, age) select LastName, age from old_Persons where ...
```

1. insert into ... select 语句主要用于从一个表复制数据，然后把数据插入到一个已存在的表中。
2. 两个表的列名不一定要求列名匹配。它使用的是列的位置，因此SELECT中的第一列（不管其列名）将用来填充表列中指定的第一个列，第二列将用来填充表列中指定的第二个列，如此等等。


③ update set ... where .... 更新语句

语法：update 表名称 set 列名称 = 新值 where 列名称 = 某值

```sql
UPDATE Person SET FirstName = 'Fred' WHERE LastName = 'Wilson' 
UPDATE Person SET age = 12, City = 'Nanjing' WHERE LastName = 'Wilson'
```

④ delete from .... where .... 删除语句

语法：DELETE FROM 表名称 WHERE 列名称 = 值

```sql
DELETE FROM Person WHERE LastName = 'Wilson'
//从person表中删除lastname值为wilson的记录

DELETE FROM Person
//删除表中所有记录

```

### 9 创建表和修改表结构


#### 1 CREATE TABLE 语句创建表 

```sql
CREATE TABLE Persons
(
Id int not null AUTO_INCREMENT,
LastName varchar(255),
FirstName varchar(255),
age int,
City varchar(255)
)

```

#### 2. alter table 修改表结构

语法：alter table 表名 add 列名 列名类型  //增加列
语法：alter table 表名 drop column 列名  //删除列

```sql
ALTER TABLE Person ADD birthday date       //给person表增加birthday列
ALTER TABLE Person DROP COLUMN Birthday     //删除person表的birthday列
```

#### 3. drop table 删除表

语法：DROP TABLE 表名

```sql
DROP TABLE Person     //删除person表
```


### 10 视图

视图（View）是一种虚拟存在的表，同真实表一样，视图也由列和行构成，但视图并不实际存在于数据库中。行和列的数据来自于定义视图的查询中所使用的SELECT语句，并且还是在使用视图时动态生成的。视图的本质是SELECT语句。

1. 视图的建立和删除只影响视图本身，不影响对应的基本表。
2. 视图是查看数据表的一种方法，可以查询数据表中某些字段构成的数据，只是一些 SQL 语句的集合。从安全的角度来看，视图的数据安全性更高，使用视图的用户不接触数据表，不知道表结构。

#### 1 创建视图

语法：CREATE VIEW 视图名 AS SELECT语句

```sql
CREATE VIEW view_students AS SELECT * FROM students where age > 12;
// 创建视图

select * from view_students;
// 使用视图

```

### 11 存储过程

存储过程是一组为了完成特定功能的SQL语句集合。使用存储过程的目的是将常用或复杂的工作预先用SQL语句写好并用一个指定名称存储起来。类似于函数

#### 1 创建存储过程

```sql
--创建存储过程
delimiter //
create procedure aaa()
begin
    select * from students;
end //
delimiter ;

--调用存储过程
call aaa;

--删除存储过程
drop procedure aaa;

```

由于存储过程中的sql语句都是以;结束。而mysql也使用;作为语句分隔符。如果mysql要解释存储过程自身内的;字符，则它们最终不会成为存储过程的成分，这会使存储过程中的SQL出现句法错误。解决办法是临时更改mysql语句分隔符。
其中，DELIMITER // 告诉mysql使用//作为新的语句结束分隔符，可以看到标志存储过程结束的END定义为END //而不是END;。这样存储过程体内的;仍然保持不动，并且正确地传递给数据库引擎。最后恢复为原来的语句分隔符。


**未完待续**


### 12 游标

MySQL中存储过程或函数中的查询有时会返回多条记录，而存储过程中简单的SELECT语句，没有办法得到第一行、下一行或前十行的数据，这时可以使用游标来逐条读取查询结果集中的记录。<font color="red">因此mysql的游标只能用于存储过程</font>

mysql游标的使用步骤：
1. 使用游标前，先声明定义它
2. 打开游标（此时游标会将数据查询出来）
3. 获取游标查询出来的数据
4. 游标使用完后，需要关闭游标。释放占用的内存资源

ps: 在一个游标关闭后，如果没有重新打开，则不能使用它。如果存储过程中没明确关闭游标，则mysql会在执行end语句的时候自动关闭存储过程中的游标。

```sql
-- 创建游标语法：DECLARE 游标名称 CURSOR FOR 查询语句
-- 创建游标
declare cursor_a cursor for select * from students;

-- 打开游标（使用游标，此时游标会执行sql语句）
open cursor_a

-- 获取游标中的数据结果集
-- 变量参数 var_name 必须在游标使用之前定义
FETCH cursor_a INTO var_name

-- 关闭游标
CLOSE cursor_a;

-- 释放游标
deallocate cursor_a;
```

例子
```sql
delimiter //
create procedure p12()
begin
  /*定义三个变量用于存放商品id,商品名称，商品库存量*/
  declare row_gid int ; 
  declare row_name varchar(20);
  declare row_num int;
  declare cursor_a cursor for select gid,name,num from goods;  --定义游标
  open cursor_a; --打开游标
  fetch cursor_a into row_gid,row_name,row_num;--从游标中取值
  select row_gid,row_name,row_num; --显示操作
  close cursor_a; --关闭游标
end //
delimiter ;         

```


### 13 触发器

另有笔记详细描写


### 14 事务处理

另有笔记详细描写

### 15 mysql服务器的用户管理

<font color="red">root账号，它对整个mysql服务器具有完全的控制。应严格使用root账号,不应再日常的mysql操作中使用root账号。</font>

① MySQL用户账号和信息存储在名为mysql的MySQL数据库中。

```sql
use mysql;   --切换为名为mysql的数据库
select user from user;  -- 查询目前mysql服务器中的账号
```

② 创建用户

语法：CREATE USER 'username'@'host' IDENTIFIED BY 'password';

host：指定该用户在哪个主机上可以登陆，本地用户可用localhost，如果想让该用户可以从任意远程主机登陆，可以使用通配符%

```sql
CREATE USER 'user1'@'localhost' IDENTIFIED BY '123456';
CREATE USER 'user1'@'192.168.xxx.xxx' IDENDIFIED BY '123456';
CREATE USER 'user1'@'%' IDENTIFIED BY '';  --密码为空
```

③ 授权

语法：GRANT [SELECT|INSERT|...] ON databaseName.tableName TO 'username'@'host'

可授予SELECT，INSERT，UPDATE等，如果要授予所的权限则使用ALL

```sql
GRANT SELECT,INSERT ON test.user TO 'user1'@'%';  --给user1用户授予test数据库的user表的SELECT，INSERT权限
GRANT ALL ON *.* TO 'user1'@'%';                  --给用户授予所有数据库所有表的所有权限
GRANT ALL ON test.* TO 'user1'@'%';
```

④ 设置密码

语法： SET PASSWORD FOR 'username'@'host' = PASSWORD('newpassword');

```sql
SET PASSWORD FOR 'user1'@'%' = PASSWORD("123456");
```

⑤ 撤销用户权限

语法：REVOKE [SELECT|INSERT|...] ON databaseName.tableName FROM 'username'@'host'

```sql
REVOKE SELECT ON *.* FROM 'user1'@'%'; --对user1用户撤销所有数据库和所有表的select权限
```
⑥ 删除用户

```sql
DROP USER 'username'@'host';
```
