---
title: Python调用JS代码笔记
date: 2024-06-18
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
---

[toc]

# Python调用JS代码笔记

在某些情况下，我们需要通过Python代码去调用JS代码。

下面是Python执行JS代码的三种方式

## js2py

> 安装 js2py

```bash
pip install js2py
```

> 例子
```py
import js2py
 
# 执行单行js语句
js2py.eval_js("console.log(abcd)")
>>> abcd
 
# 执行js函数
add = js2py.eval_js("function add(a, b) {return a + b};")
print(add(1,2))
>>> 3
 
```

## pyexecjs2

> 安装 pyexecjs2

```bash
pip3 install pyexecjs2
```

> 例子1 直接执行JS代码

```py
import execjs
# 使用本地的Node.js作为JavaScript运行环境
# 直接编译一段js代码，JS代码中包含一个add方法
ctx = execjs.compile(
"""
  function add(x, y) {
    return x + y;
  }
""")

# 执行这段js代码，传入方法名和参数
result = ctx.call("add", 3, 4)
print(result)  # 输出 7

```

> 例子2 执行JS文件中的JS代码

a.js文件中的js代码如下
```js
//a.js
//计算两个数的和
function add(num1, num2) {
    return num1 + num2;
}
```

同目录下的py代码如下所示
```py
# 导入execjs库
import execjs

# 读取js文件
def js_from_file(file_name):
    with open(file_name, 'r', encoding='UTF-8') as file:
        result = file.read()
    return result

# 编译js文件
context1 = execjs.compile(js_from_file('./a.js'))

# 执行这段js代码，传入方法名和参数
result = context1.call("add", 3, 4)
print(result)  # 输出 7
```

### 遇到的问题

> 问题描述

当在代码中使用`execjs`类的方法的时候，可能会报如下错误。

```PY
# 读取js文件
def js_from_file():
    # 只读方式打开文件
    with open("./tool.js", 'r', encoding='UTF-8') as file:
        return file.read()

## AES解密
def AES_Decrypt_Functon(str):
    # 读取并编译js文件
    context1 = execjs.compile(js_from_file())
    # 此处可能会报如下错误
    result = context1.call("AES_Decrypt_Functon", str)
    return result

# UnicodeEncodeError: 'gbk' codec can't encode character '\u0192' in position 424: illegal multibyte sequence
```

这个错误表达的意思是代码尝试将一个包含不支持字符（在这里是ƒ，即“florin”符号，Unicode编码是 \u0192）的字符串文本，使用 gbk 编码格式进行编码时失败了。

> 解决方法

当我们在使用`execjs`类的时候，编辑器可能自动帮我们导入了pyexecjs库，使用这个库会导致上面错误的发生。然而我们真正需要导入的是pyexecjs2库。

### pyexecjs 和 pyexecjs2 的区别

pyexecjs 和 pyexecjs2 都是 Python 中用于执行 JavaScript 代码的库，它们提供了与 JavaScript 引擎（如 Node.js 或其他支持的 JavaScript 引擎）交互的能力。但是，它们之间有一些差异：

pyexecjs 是最早的 Python 封装库之一，用于执行 JavaScript 代码。目前可能已经停止更新或维护得较慢。

pyexecjs2 是 pyexecjs 的一个分支，解决了原库中的一些问题，特别是对 Python 3 的支持。