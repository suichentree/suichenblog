---
title: FastAPI笔记2
date: 2024-05-03
sidebar: 'auto'
categories: 
 - Python
tags:
 - FastAPI
---

[toc]

# FastAPI笔记2

## Pydantic 模型

Pydantic 是一个用于数据验证和序列化的 Python 数据模型库。

它在 FastAPI 中广泛使用，用于定义请求体、响应体和其他数据模型，提供了强大的类型检查和自动文档生成功能。

### 定义模型

使用 Pydantic 定义一个模型非常简单，只需创建一个继承自 pydantic.BaseModel 的类，并在其中定义字段。字段的类型可以是任何有效的 Python 类型，也可以是 Pydantic 内置的类型。

```py
# 导入Pydantic包的 BaseModel类
from pydantic import BaseModel
# 定义Item模型类及其属性字段，继承BaseModel类
class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None
```

description 和 tax 是可选的字段，并且默认值都为 None。

### 使用模型

在 FastAPI 中，可以将 Pydantic 模型用作请求体（Request Body），以自动验证和解析客户端发送的数据。

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.post("/items/")
def create_item(item: Item):
    return item
```

上面代码中，函数接受一个名为 item 的参数，其类型是 Item 模型。FastAPI 将自动验证传入的 JSON 数据是否符合模型的定义，并将其转换为 Item 类型的实例对象。

> 参数验证

Pydantic 模型还可以用于验证查询参数、路径参数等。

```py
from fastapi import FastAPI, Query
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.get("/items/")
def read_item(item: Item, q: str = Query(..., max_length=10)):
    return {"item": item, "q": q}
```

通过使用 Query 函数，我们还可以为参数指定更多的验证规则，如最大长度限制。


## FastAPI 路径操作依赖项

FastAPI 提供了路径操作依赖项的机制，允许你在路由处理函数执行之前或之后运行一些额外的逻辑。

### 依赖项

依赖项是在路由操作函数执行前或后运行的可复用的函数或对象。它们被用于执行一些通用的逻辑，如验证、身份验证、数据库连接等。

在 FastAPI 中，依赖项通常用于两个方面：
- 预处理（Before）依赖项： 在路由操作函数执行前运行，用于预处理输入数据，验证请求等。
- 后处理（After）依赖项： 在路由操作函数执行后运行，用于执行一些后处理逻辑，如日志记录、清理等。

### 预处理（Before）依赖项

```py
from fastapi import Depends, FastAPI

app = FastAPI()

# 依赖项函数
def common_parameters(q: str = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}

# 路由操作函数
@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons

```

- 上面代码中依赖项函数接受参数 q、skip 和 limit，并返回一个包含这些参数的字典数据。
- `commons: dict = Depends(common_parameters)`路由操作函数 接收 依赖项函数的返回值 作为参数。


### 后处理（After）依赖项

```py
from fastapi import Depends, FastAPI
app = FastAPI()

# 后处理依赖项函数
async def after_request():
    # 这里可以执行一些后处理逻辑，比如记录日志
    pass

# 路由操作函数
@app.get("/items/", response_model=dict)
async def read_items_after(request: dict = Depends(after_request)):
    return {"message": "Items returned successfully"}
```

### 多个依赖项函数组合使用

```py
from fastapi import Depends, FastAPI
app = FastAPI()

# 依赖项函数1
def common_parameters(q: str = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}

# 依赖项函数2, 依赖于依赖项函数common_parameters
def verify_token(token: str = Depends(common_parameters)):
    return token

# 路由操作函数, 依赖于依赖项函数verify_token
@app.get("/items/")
async def read_items(token: dict = Depends(verify_token)):
    return token
```

### 异步依赖项

依赖项函数和路由处理函数可以是异步的，允许在它们内部执行异步操作。

```py
from fastapi import Depends, FastAPI
from typing import Optional
import asyncio

app = FastAPI()

# 异步依赖项函数
async def get_token():
    # 模拟异步操作
    await asyncio.sleep(2)
    return "fake-token"

# 异步路由操作函数
@app.get("/items/")
async def read_items(token: Optional[str] = Depends(get_token)):
    return {"token": token}
```

上面代码中，get_token 是一个异步的依赖项函数，模拟了一个异步操作。

