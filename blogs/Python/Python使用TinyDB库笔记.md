---
title: Python使用TinyDB库笔记
date: 2024-08-01
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
 - TinyDB
---

[toc]

# Python使用TinyDB库笔记

TinyDB是一个轻量级的NoSQL数据库，适用于需要嵌入式数据库的小型项目。

它使用JSON文件存储数据，并提供了简单易用的API，支持多种查询和索引操作。

TinyDB非常适合那些不需要复杂数据库功能的小型应用，如配置管理、日志存储等。

## 安装

```py
# 使用pip安装tinydb
pip install tinydb
```

## 基本操作

### 创建数据库和表

会在脚本所在目录中，创建一个数据库文件用来存储数据。

```py
# 导入tinydb库
from tinydb import TinyDB, Query

# 创建数据库  db.json
db = TinyDB('db.json')
# 创建表
table = db.table('users')
```

- `TinyDB('db.json')`方法可以创建数据库，也可以获取数据库对象。
- `db.table('users')`方法可以创建表，也可以获取表对象。


### 插入数据

```py
from tinydb import TinyDB, Query
# 创建数据库  db.json
db = TinyDB('db.json')
# 创建表
table = db.table('users')

# 插入数据到表中
user_list = [
    {'name': 'jack', 'age': 12, 'city': 'New York'},
    {'name': 'tom', 'age': 22, 'city': 'New York'},
    {'name': 'mike', 'age': 32, 'city': 'New York'}
]
for user in user_list:
    table.insert(user)
```

数据在数据库文件中是以下面的格式存储的
```json
{"users": {"1": {"name": "jack", "age": 12, "city": "New York"}, "2": {"name": "tom", "age": 22, "city": "New York"}, "3": {"name": "mike", "age": 32, "city": "New York"}}}
```

### 查询数据

一般使用Query对象进行数据查询。例如，查询所有名为jack的数据。

```py
from tinydb import TinyDB, Query
# 创建数据库  db.json
db = TinyDB('db.json')
# 创建表
table = db.table('users')

# 创建Query对象
query = Query()

# 查询名为jack的数据
result = table.search(query.name == "jack")
print(result)

## 运行结果如下
# [{'name': 'jack', 'age': 12, 'city': 'New York'}]

# 查询全部数据
all_data = user_table.all()
print(all_data)

```

### 更新数据

可以使用update方法更新表中的数据。

```py
from tinydb import TinyDB, Query
# 创建数据库  db.json
db = TinyDB('db.json')
# 创建表
table = db.table('users')

# 创建Query对象
query = Query()

# 更新数据。将名为jack的用户的年龄更新为31
table.update({'age': 31}, query.name == 'jack')

# 查询数据
result = table.search(query.name == "jack")
print(result)

## 运行结果如下
# [{'name': 'jack', 'age': 31, 'city': 'New York'}]
```


### 删除数据

可以使用remove方法删除表中的数据。例如，删除名为jack的数据。

```py
from tinydb import TinyDB, Query
# 创建数据库  db.json
db = TinyDB('db.json')
# 创建表
table = db.table('users')

# 创建Query对象
query = Query()

# 删除数据（先查询，再删除）
table.remove(query.name == 'jack')
```


## 进阶操作

### 复杂查询

TinyDB支持复杂的查询条件和组合。例如，查询所有年龄大于25且居住在New York的用户。

```py
from tinydb import TinyDB, Query
# 创建数据库  db.json
db = TinyDB('db.json')
# 创建表
table = db.table('users')

# 创建Query对象
query = Query()

# 查询名字为jack，并且年龄>30的数据
result = table.search((query.name == "jack") & (query.age > 30))
print(result)

# 查询名字为jack 或者 年龄>30的数据
result = table.search((query.name == "jack") | (query.age > 30))
print(result)

## 运行结果如下
# []
# [{'name': 'mike', 'age': 32, 'city': 'New York'}]

```

### 创建索引

TinyDB允许为字段创建索引，提高查询性能。

```py
from tinydb import TinyDB, Query
# 创建数据库  db.json
db = TinyDB('db.json')
# 创建表
user_table = db.table('users')

# 插入数据到表中
user_table.insert({'name': 'jack', 'age': 12, 'city': 'New York'})

# 为user表中的name字段创建索引
user_table.create_index('name')
```

