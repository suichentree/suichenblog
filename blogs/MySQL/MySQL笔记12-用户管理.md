---
title: MySQL笔记12-用户管理
date: 2023-07-19
sidebar: 'auto'
categories: 
 - 数据库
tags:
 - MySql
---

[toc]

# MySQL笔记12-用户管理

MySQL安装时默认自动创建一个名为 mysql 的数据库，mysql 数据库中存储的都是用户权限表。

user 表是 mysql 数据库中最重要的一个权限表，用来记录允许连接到服务器的账号信息。

## 创建用户

在使用MySQL的过程中，为了避免有人恶意使用 root 用户控制数据库，我们通常创建一些具有适当权限的用户，尽可能地不用或少用 root 用户登录系统，以此来确保数据的安全访问。

<font color="red">root账号，它对整个mysql服务器具有完全的控制。应严格使用root账号,不应再日常的mysql操作中使用root账号。</font>

MySQL 提供了以下 3 种方法创建用户。
* 使用 CREATE USER 语句创建用户
* 在 mysql 数据库的 user 表中添加用户
* 使用 GRANT 语句创建用户

### CREATE USER 语句创建用户

```sql
-- 语法如下
CREATE USER 'username'@'host_name' IDENTIFIED BY 'password';

-- 例子
-- 创建一个用户，用户名是 test1，密码是 test1，主机名是 localhost。
CREATE USER 'test1'@'localhost' IDENTIFIED BY 'test1';

CREATE USER 'user1'@'localhost' IDENTIFIED BY '123456';
CREATE USER 'user1'@'192.168.xxx.xxx' IDENDIFIED BY '123456';
-- 密码为空的用户
CREATE USER 'user1'@'%' IDENTIFIED BY '';  
```

* username是用户名
* host_name是主机名，没有指定主机名。默认是‘%’ （全部）


### 在user表中新建用户

可以使用 INSERT 语句将用户的信息添加到 mysql.user 表中，但必须拥有对 mysql.user 表的 INSERT 权限。通常 INSERT 语句只添加 Host、User 和 authentication_string 这 3 个字段的值。

<font color="red">注意：MySQL 5.7 的 user 表中的密码字段从 Password 变成了 authentication_string。</font>

```sql
-- 语法如下
-- ssl_cipher、x509_issuer 和 x509_subject 这 3 个字段没有默认值，
-- 所以向 user 表插入新记录时，一定要设置这 3 个字段的值
INSERT INTO mysql.user(Host, User, authentication_string, ssl_cipher, x509_issuer, x509_subject) VALUES ('hostname', 'username', PASSWORD('password'), '', '', '');

-- 刷新系统权限后，新用户才能生效。
FLUSH PRIVILEGES;

```

### GRANT语句新建用户并给权限

GRANT 语句可以用来创建用户、修改用户密码和设置用户权限。

```sql
-- 语法如下
GRANT 权限 ON database.table TO 'username'@'host_name' IDENTIFIED BY [PASSWORD] 'password'

-- 例子
-- 创建用户test3,密码test3,并且给该用户所有表的select权限。
-- *.* 表示所有数据库下的所有表
GRANT SELECT ON *.* TO 'test3'@localhost IDENTIFIED BY 'test3';
```

## 修改用户

在 MySQL 中，我们可以使用 RENAME USER 语句修改一个或多个已经存在的用户账号。

```sql
-- 语法如下
RENAME USER <旧用户> TO <新用户>

-- 例子
-- 将用户名 test1 修改为 testUser1
RENAME USER 'test1'@'localhost' TO 'testUser1'@'localhost';

```


## 删除用户

在 MySQL 数据库中，可以使用 DROP USER 语句删除用户，也可以直接在 mysql.user 表中删除用户。

```sql
-- 语法如下
DROP USER <用户>
-- 语法如下
DELETE FROM mysql.user WHERE Host='hostname' AND User='username';

-- 例子
-- 删除用户test1
DROP USER 'test1'@'localhost';
-- 删除用户test2
DELETE FROM mysql.user WHERE Host='localhost'AND User='test2';
```

## 查看用户

在 MySQL 中，可以通过查看 mysql.user 表中的数据记录来查看相应的用户权限，也可以使用 SHOW GRANTS 语句查询用户的权限。

```sql
-- 通过查询user表来查看用户
SELECT * FROM mysql.user;

-- 语法如下
SHOW GRANTS FOR 'username'@'hostname';

-- 例子
-- 查看root用户的权限
SHOW GRANTS FOR 'root'@'localhost';

```

## 授权用户

GRANT 语句可授予SELECT，INSERT，UPDATE等，如果要授予所的权限则使用ALL

```sql
-- 语法如下
GRANT [SELECT|INSERT|...] ON databaseName.tableName TO 'username'@'host'

-- 例子
-- 给user1用户授予test数据库的user表的SELECT，INSERT权限
GRANT SELECT,INSERT ON test.user TO 'user1'@'%';
-- 给用户授予所有数据库所有表的所有权限
GRANT ALL ON *.* TO 'user1'@'%';                  
GRANT ALL ON test.* TO 'user1'@'%';
```

REVOKE 语句可以删除用户的权限。
```sql
-- 语法如下
REVOKE [SELECT|INSERT|...] ON databaseName.tableName FROM 'username'@'host'

-- 例子
--对user1用户删除所有数据库和所有表的select权限
REVOKE SELECT ON *.* FROM 'user1'@'%'; 
```


## 修改普通用户密码

在 MySQL 中，只有 root 用户可以通过更新 MySQL 数据库来更改普通用户的密码。

> 方式1：set 语句

```sql
-- 语法如下
SET PASSWORD FOR 'username'@'host' = PASSWORD('newpassword');

-- 例子，SET 语句将 testuser 用户的密码修改为“newpwd”
SET PASSWORD FOR 'testuser'@'localhost' = PASSWORD("newpwd");
```

> 方式2：update语句

```sql
-- 语法如下
UPDATE MySQL.user SET authentication_string = PASSWORD("newpwd") WHERE User = "username" AND Host = "hostname";

-- 例子，使用 UPDATE 语句将 testuser 用户的密码修改为“newpwd2”
UPDATE MySQL.user SET authentication_string = PASSWORD ("newpwd2") WHERE User = "testuser" AND Host = "localhost";
```

> 方式3：grant语句

```sql
-- 语法如下
GRANT USAGE ON *.* TO 'user'@'hostname' IDENTIFIED BY 'password';

-- 例子，使用 GRANT 语句将 testuser 用户的密码修改为“newpwd3”
GRANT USAGE ON *.* TO 'user'@’hostname’ IDENTIFIED BY 'newpwd';
```


## 修改root用户密码


> 方式1：mysqladmin命令，root 用户可以使用 mysqladmin 命令在终端来修改密码

```sql
-- 语法如下
mysqladmin -u username -h hostname -p password "newpwd"

-- 例子，SET 语句将 root 用户的密码修改为rootpwd
mysqladmin -u root -p password "rootpwd"
```

> 方式2：update语句

```sql
-- 语法如下
UPDATE mysql.user set authentication_string = PASSWORD ("rootpwd") WHERE User = "root" and Host="localhost";

-- 例子，使用 UPDATE 语句将 root 用户的密码修改为rootpwd2
UPDATE mysql.user set authentication_string = password ("rootpwd2") WHERE User = "root" and Host = "localhost";
```

> 方式3：set 语句

```sql
-- 语法如下
SET PASSWORD = PASSWORD ("rootpwd");

-- 例子，使用 GRANT 语句将 root 用户的密码修改为rootpwd3
SET PASSWORD = password ("rootpwd3");
```

