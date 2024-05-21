---
title: Python笔记5-常用的内置模块
date: 2024-05-21
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
---

[toc]

# Python笔记5-常用的内置模块

此笔记初次更新于2021-03-30。现在对该笔记进行重新编写。

目前此笔记中的Python版本为3.12.3

## os 模块

os 就是"operating system"的缩写。即 os 模块提供的就是各种 Python 程序与操作系统进行交互的接口。

<font color="red">注意：不要使用 `from os import *` 来导入os模块；否则os模块中的 open() 函数将会覆盖内置函数open()，从而造成预料之外的错误。</font>


### `os.name` 返回当前操作系统

os.environ属性可以返回当前操作系统的信息。

```py
# python终端
>>> import os
>>> os.name
'nt'
```

os.name属性会识别当前程序运行的操作系统是什么。os.name会返回三个值：posix，nt，java。
- posix 代表当前操作系统是 Linux 和 Mac OS
- nt 代表当前操作系统是 Windows 操作系统
- java 代表当前操作系统是 Java 虚拟机环境。

### os.environ 返回环境变量

os.environ属性可以返回环境相关的信息，主要是各类环境变量。

在windows系统下
```py
# python终端
# 读取环境变量中的HOMEPATH属性的值
>>> os.environ["HOMEPATH"]
 'd:\\justdopython'
```

在Linux系统下
```py
# 读取环境变量中的HOME属性的值
>>> os.environ["HOME"]
'/home/justdopython'
```

### os.listdir() 返回目录信息

os.listdir()方法会列出（当前）目录下的全部路径（及文件）。该函数存在一个参数，用以指定要列出子目录的路径。默认为“.”，即“当前路径”。

os.listdir()方法的返回值是一个列表，其中各元素均为字符串，分别是各路径名和文件名。

os.listdir() 通常在需要遍历某个文件夹中文件的场景下极为实用。

```py
# 当前程序所在的文件是test1.py
import os
print(os.listdir("."))

# 会列出当前文件所在目录下的所有文件和目录。运行结果如下
# ['test1.py', 'test2.py', 'test_excel.py', 'test_main.py', '测试demo.html']

# 列出桌面目录下的所有文件和目录
print(os.listdir("C:\\Users\\18271\\Desktop\\"))
```

### os.mkdir() os.makedirs() 新建目录

os.mkdir()方法需要传入一个路径参数。如果路径参数已存在，则会抛出FileExistsError异常。

os.mkdir()方法只能在已有的路径下新建一级路径，否则（即新建多级路径）会抛出`FileNotFoundError`异常。

os.makedirs()方法用来新建多级路径，即多级目录。


```py
import os
#在当前目录下创建一个新目录
os.mkdir("test_mkdir")
# 在桌面下新建一个aaa目录
os.mkdir("C:\\Users\\18271\\Desktop\\aaa")

# 在桌面下新建一个aaa目录,aaa目录里面新建一个bbb目录，bbb目录里面新建一个ccc目录
os.makedirs("C:\\Users\\18271\\Desktop\\aaa\\bbb\\ccc")
```


### os.rmdir() os.removedirs() 删除目录

os.rmdir() 用于删除目录 。 os.removedirs() 用于删除目录及其子目录

```py
# 如果aaa目录没有子目录，则删除aaa目录
os.rmdir("C:\\Users\\18271\\Desktop\\aaa")

# 如果aaa目录有子目录，则删除aaa目录及其子目录
os.removedirs("C:\\Users\\18271\\Desktop\\aaa\\bbb\\ccc")
```


### os.remove() 删除文件

os.remove() 用于删除文件，如果指定路径是目录而非文件的话，就会抛出IsADirectoryError异常。

```py
import os
#删除当前目录下a.txt文件
os.remove(a.txt)
```

### os.rename() 重命名文件或目录

os.rename() 函数的作用是将文件或目录重命名，格式为`os.rename(src, dst)`，即将src指向的文件或目录重命名为dst指定的名称。

注意，如果指定的路径在其他目录下，os.rename() 函数还可实现文件或目录的“剪切并粘贴”功能。

```py
import os
#当前目录下的 a.txt文件 重命名为 b.txt
os.rename(a.txt,b.txt)
```

### os.getcwd() 获取当前路径

getcwd 实际上是 “get the current working directory” 获取当前工作路径的简写。当前工作路径可认为是程序所在路径。

```py
import os
# 打印当前程序文件所在的路径
print(os.getcwd())
# C:\Users\18271\Desktop\xdj-watchvideo-demo1\test
```


## os.path 模块

os.path 模块是 os 模块的子模块。根据操作系统的不同，那么os.path模块就不同

比如os.name值为nt，则os.path 模块导入的是 import ntpath as path；如果os.name值为posix，则导入的是import posixpath as path。

### os.path.join() 组合拼接路径

os.path.join() 方法可以将多个路径组合为一个路径。实际上是将传入的几个字符串用系统的分隔符连接起来，组合成一个新的字符串。

一般的用法是将第一个参数作为父目录，之后每一个参数就是下一级目录，从而组合成一个新的路径。

```py
>>> os.path.join("just", "do", "python", "dot", "com")
'just\\do\\python\\dot\\com'

>>> os.path.join("d:/", "python", "dot", "com")
'd:/python\\dot\\com'
```

### os.path.basename() 返回当前目录的名称

该函数返回路径参数的“基名”，即路径参数的最下级目录。

返回的“基名”实际上是传入路径最后一个分隔符之后的子字符串，也就是说，如果最下级目录之后还有一个分隔符，得到的就会是一个空字符串。

```py
>>> os.path.basename("/ityouknow/justdopython/IAmBasename")
'IAmBasename'

>>> os.path.basename("/ityouknow/justdopython/IAmBasename/")
''
```

### os.path.dirname() 返回路径参数所在的路径

os.path.dirname() 返回的是最后一个分隔符前的整个字符串

```py
>>> os.path.dirname("/ityouknow/justdopython/IAmBasename")
'/ityouknow/justdopython'
>>> 
>>> os.path.dirname("/ityouknow/justdopython/IAmBasename/")
'/ityouknow/justdopython/IAmBasename'
```

还有另外一个用法 `os.path.dirname(__file__)`

```py
import os  
#该文件所在位置：D:\第1层\第2层\第3层\第4层\第5层\test11.py  

# 获取当前运行脚本的绝对路径  
path1 = os.path.dirname(__file__)  
print(path1)
# 运行结果 D:/第1层/第2层/第3层/第4层/第5层/test11.py  

# 获取当前运行脚本的绝对路径（去掉最后一个路径） 
path2 = os.path.dirname(os.path.dirname(__file__))
print(path2) 
# 运行结果 D:/第1层/第2层/第3层/第4层/第5层 
```


### os.path.exists() 判断路径参数是否存在

os.path.exists() 这个函数用于判断路径所指向的位置是否存在。若存在则返回True，不存在则返回False。

```py
>>> os.path.exists(".")
True
>>> os.path.exists("./just")
True
>>> os.path.exists("./Inexistence") # 不存在的路径
False
```

一般的用法是在需要保存某些文件的场景，为避免重复创建某个文件，需要在写入前用该函数检测一下相应文件是否存在，若不存在则新建，若存在则在文件内容之后增加新的内容。

### os.path.isfile() 和 os.path.isdir() 判断路径参数是文件还是目录

这两个函数分别判断传入路径是否是文件或路径，注意，此处会核验路径的有效性，如果是无效路径将会持续返回False。

```py
>>> # 无效路径
>>> os.path.isfile("a:/justdopython")
False
>>> 
>>> # 有效路径
>>> os.path.isfile("./just/plain_txt")
True
>>> 
>>> # 无效路径
>>> os.path.isdir("a:/justdopython/")
False
>>> # 有效路径
>>> os.path.isdir("./just/")
True
```
