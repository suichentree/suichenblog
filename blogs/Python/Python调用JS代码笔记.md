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
