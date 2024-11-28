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

会在脚本所在目录中，创建一个数据库 json文件 用来存储数据。

```py
# 导入tinydb库
from tinydb import TinyDB, Query

# 创建数据库 db.json
db = TinyDB('db.json')
# 创建表
table = db.table('users')

# 删除表中所有数据
def clean_all():
    users_table.truncate()

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

# 或者可以批量插入数据
table.insert_multiple(user_list)

```

数据在数据库json文件中是以下面的格式存储的
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

# 条件查询名为jack的数据
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

### 清空数据库

```py
from tinydb import TinyDB, Query
# 创建数据库  db.json
db = TinyDB('db.json')

# 清空数据库的数据
db.truncate()

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

### 中文乱码

> 问题

一般情况下，使用tinydb存储中文数据的时候，json文件中存储的是中文对应的unicode编码。这使得json文件的数据可读性不好。

示例
```py
from tinydb import TinyDB, Query
import json

# 创建数据库  db.json
db = TinyDB('db.json',encoding='utf-8')
# 创建表
table = db.table('t_user')

if __name__ == '__main__':

    # 清空表中数据
    table.truncate()
    # 用户数据
    userlist = [{'name': '小明11', 'pwd': 'a123456', 'idCard': 'XXXXXXX',
                 'remark': '焊接与热切割作业111'},
                {'name': '小明12', 'pwd': 'a123456', 'idCard': 'XXXXXXX',
                 'remark': '焊接与热切割作业222'}
                ]
    # 插入数据
    for user in userlist:
        table.insert(user)

    # 关闭数据库以确保所有数据写入文件
    db.close()

```

db.json文件中的数据如下所示
```json
{"t_user": {"1": {"name": "\u5c0f\u660e11", "pwd": "a123456", "idCard": "XXXXXXX", "remark": "\u710a\u63a5\u4e0e\u70ed\u5207\u5272\u4f5c\u4e1a111"}, "2": {"name": "\u5c0f\u660e12", "pwd": "a123456", "idCard": "XXXXXXX", "remark": "\u710a\u63a5\u4e0e\u70ed\u5207\u5272\u4f5c\u4e1a222"}}}
```

可以看到中文被转换为unicode编码，并且文件中的json数据没有进行格式化处理。


> 解决方式

解决办法：我们可以把json文件中的数据读取出来，然后把unicode编码转换为中文，再次写入到json文件中。

例子
```py
from tinydb import TinyDB, Query
import json

# 创建数据库  db.json
db = TinyDB('db.json',encoding='utf-8')
# 创建表
table = db.table('t_user')

if __name__ == '__main__':

    # 清空表中数据
    table.truncate()
    # 用户数据
    userlist = [{'name': '小明11', 'pwd': 'a123456', 'idCard': 'XXXXXXX',
                 'remark': '焊接与热切割作业111'},
                {'name': '小明12', 'pwd': 'a123456', 'idCard': 'XXXXXXX',
                 'remark': '焊接与热切割作业222'}
                ]
    # 插入数据
    for user in userlist:
        table.insert(user)

    # 关闭数据库以确保所有数据写入文件
    db.close()


    # 读取 TinyDB 数据库文件
    with open('db.json', 'r', encoding='utf-8') as file:
        data = json.load(file)

    # 写回 JSON 文件，确保中文不被转义
    with open('db.json', 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

```

- 最下面的代码，是把json文件中的数据读取了一遍，然后再写入了一遍。在写入数据的过程中，把unicode编码转换为中文字符。
- `ensure_ascii=False` 作用是将非 ASCII 字符转义为 Unicode 编码。设置为 False 时，中文等非 ASCII 字符将以原始字符输出，而不是转义为 Unicode 编码。
- `indent=4` 作用是将 JSON 数据以 4 个空格的缩进格式输出，使其更具可读性。


db.json文件中的数据如下所示
```json
{
    "t_user": {
        "1": {
            "name": "小明11",
            "pwd": "a123456",
            "idCard": "XXXXXXX",
            "remark": "焊接与热切割作业111"
        },
        "2": {
            "name": "小明12",
            "pwd": "a123456",
            "idCard": "XXXXXXX",
            "remark": "焊接与热切割作业222"
        }
    }
}
```