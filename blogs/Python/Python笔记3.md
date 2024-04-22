---
title: Python笔记3
date: 2024-04-22
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Python
---

[toc]

# Python笔记3

此笔记初次更新于2021-03-30。现在对该笔记进行重新编写。

目前此笔记中的Python版本为3.12.3

## 模块

在Python中，模块就是一个包含所有你定义的函数和变量的文件，其后缀名是`.py`。模块可以被别的程序引入，从而使用该模块中的函数等功能。


<font color="red">Python解释器是怎样找到对应的模块文件？python会在当前目录或者一些特定目录中找寻这些模块文件。</font>


support.py
```python
#!/usr/bin/python3
# Filename: support.py
 
def print_func( par ):
    print ("Hello : ", par)
    return

```

test.py 
```python
#!/usr/bin/python3
# Filename: test.py
 
# 导入模块
import support
 
# 现在可以调用模块里包含的函数了
support.print_func("Runoob")

```

> __name__属性

1. 当模块被另一个程序引入时,模块的主程序会开始运行。若想模块中某些代码不运行。则可以用`__name__`属性来使该程序块仅在该模块自身运行时执行。
2. 说明：`__name__ `与 `__main__` 底下是双下划线， `_ _ `是这样去掉中间的那个空格。

```python
# 该代码，当自己运行时，会打印上面部分
# 该代码作为模块运行时，会打印下面部分
if __name__ == '__main__':
   print('程序自身在运行')
else:
   print('我来自另一模块')
```

## 8.输入与输出

### 读取键盘输入

```python
str = input("请输入：");
print ("你输入的内容是: ", str)

# 运行结果：
# 请输入：aaa
# 你输入的内容是:  aaa
```


### 不同格式输出

1. 使用 str.format() 函数来格式化输出值。
2. 使用 repr() 或 str() 函数来实现将输出的值转成字符串。

> str.format() 格式化输出值

```python
## {} 会被format() 中的参数替换
>>> print('{}网址： "{}!"'.format('菜鸟教程', 'www.runoob.com'))
菜鸟教程网址： "www.runoob.com!"

## {}符号中的数字，对应参数的位置
>>> print('{1} 和 {0}'.format('Google', 'Runoob'))
Runoob 和 Google

## {}中的关键字可以与format中的参数关键字一一对应
>>> print('站点列表 {0}, {1}, 和 {other}。'.format('Google', 'Runoob', other='Taobao'))
站点列表 Google, Runoob, 和 Taobao。

```

>str()： 函数返回一个用户易读的表达形式。
>repr()： 产生一个解释器易读的表达形式。


```python
>>> s = 'Hello, Runoob'
## str输出
>>> str(s)
'Hello, Runoob'

## repr输出
>>> repr(s)
"'Hello, Runoob'"
>>> # repr() 的参数可以是 Python 的任何对象
... repr((x, y, ('Google', 'Runoob')))
"(32.5, 40000, ('Google', 'Runoob'))"
```


## 9.文件

### 打开文件

```python
# open() 将会返回一个 file 对象。 
# filename 文件的绝对路径
# mode 打开文件的模式：只读，写入，追加等
open(filename, mode)
```

mode参数的部分取值：

模式    | 介绍 
------ | ------
r      | 默认模式。以只读方式打开文件。文件的指针将会放在文件的开头     
rb     | 以二进制格式打开一个文件用于只读。文件指针将会放在文件的开头。
r+     | 打开一个文件用于读写。文件指针将会放在文件的开头
rb+    | 以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头。
w      | 打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。
w+     | 打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。
a      | 打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。
a+     | 打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写。


```python
#!/usr/bin/python3

# 打开一个文件
f = open("/tmp/foo.txt", "w")
f.write( "Python 是一个非常好的语言。\n是的，的确非常好!!\n" )

# 关闭打开的文件
f.close()
```

运行结果
```shell
$ cat /tmp/foo.txt 
Python 是一个非常好的语言。
是的，的确非常好!!
```


### 文件对象的方法

> f.read(size)
读取文件中一定数目的数据, 然后作为字符串或字节对象返回。
size 是一个可选的数字类型的参数。 当 size 被忽略了或者为负, 那么该文件的所有内容都将被读取并且返回。

>f.write()
f.write(string) 将 string 写入到文件中, 然后返回写入的字符数。

>f.close()
关闭文件并释放系统的资源


```python
#!/usr/bin/python3

# 打开一个文件
f = open("/tmp/foo.txt", "r")

# 读取文件全部内容
str = f.read()
print(str)

# 写入文件数据
num = f.write( "Python 是一个非常好的语言。\n是的，的确非常好!!\n" )
print(num)

# 关闭打开的文件
f.close()
```