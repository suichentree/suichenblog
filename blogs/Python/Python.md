---
title: Python的学习笔记
date: 2021-03-30
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Python
---


>Python2.x 与 3​​.x 版本区别?

Python 3.0 在设计的时候没有考虑向下相容。Python 2.6 作为一个过渡版本，基本使用了 Python 2.x 的语法和库，同时考虑了向 Python 3.0 的迁移，允许使用部分 Python 3.0 的语法与函数。


Python参考教程
[廖雪峰的Python教程](https://www.liaoxuefeng.com/wiki/1016959663602400)

<font color="red">注意安装python需要将其添加到环境变量中。</font>

## 1.基础语法

### 变量

1. Python 中的变量不需要声明，每个变量在使用前都必须赋值，变量赋值以后该变量才会被创建。
2. Python可以把任意数据类型赋值给变量，同一个变量可以反复赋值，而且可以是不同类型的变量。类似于JS
3. 等号（=）用来给变量赋值。

### 标识符

1. 标识符的其他的部分由字母、数字和下划线组成。并且第一个字符必须是字母表中字母或下划线 _
2. <font color="red">标识符对大小写敏感</font>

python中有些关键字不能当作标识符,Python 的标准库提供了一个 keyword 模块，可以查询当前版本的所有关键字

```python
>>> import keyword
>>> keyword.kwlist
['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

### 注释

1. 单行注释以 # 开头
2. 多行注释可以用多个 # 号，或者 ''' 和 """

```python

# 第一个注释
# 第二个注释
 
'''
第三注释
第四注释
'''
 
"""
第五注释
第六注释
"""
```

### 行与缩进

python使用缩进来表示代码块，不需要使用大括号 {} 。

1. 同一个代码块的语句必须包含相同的缩进空格数
2. 最后一行语句缩进数的空格数不一致，会导致运行错误.

```python
if True:
    print ("Answer")
    print ("True")
else:
    print ("Answer")
  print ("False")    # 缩进不一致，会导致运行错误
```

### 多行语句

1. 使用反斜杠\来实现一条语句，多行编写
2. 使用分号(;)分割多条语句

```python
total = item_one + \
        item_two + \
        item_three

import sys; x = 'runoob'; sys.stdout.write(x + '\n')
```

### print 输出

print默认是换行输出的，如果要实现不换行需要在变量末尾加上 end=""

```python
x="a"
y="b"
# 换行输出
print( x )
print( y )
 
print('---------')
# 不换行输出
print( x, end=" " )
print( y, end=" " )
print()
```

### import 与 from...import 导入模块

```python
#整个模块(somemodule)导入，格式为： import somemodule
#从某个模块中导入某个函数,格式为： from somemodule import somefunction
#从某个模块中导入多个函数,格式为： from somemodule import firstfunc, secondfunc, thirdfunc
#将某个模块中的全部函数导入，格式为： from somemodule import *

import sys
from sys import argv,path  #  导入特定的成员
```

### end关键字
关键字end可以用于将结果输出到同一行，或者在输出的末尾添加不同的字符。

```python
a, b = 0, 1
while b < 1000:
    print(b, end=',')
    a, b = b, a+b

#=========输出结果
1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,
```

### del语句

可以用 del 语句从列表中删除一个元素，或清空整个列表
```python
>>> a = [-1, 1, 66.25, 333, 333, 1234.5]
>>> del a[0]
>>> a
[1, 66.25, 333, 333, 1234.5]
>>> del a[2:4]
>>> a
[1, 66.25, 1234.5]
>>> del a[:]
>>> a
[]

### 也可以用 del 删除实体变量
>>> del a

```

## 2.基本数据类型

Python3 的六个标准数据类型中：
>不可变数据类型（3 个）：Number（数字）、String（字符串）、Tuple（元组）；
>可变数据类型（3 个）：List（列表）、Dictionary（字典）、Set（集合）。

<font color="red">Number数据类型包含int、float、bool、complex（复数）</font>


### 1. String字符串数据类型的使用

python中的字符串是以Unicode编码的。


>1. ord() , chr()
```python
# 对于单个字符的编码，Python提供了ord()函数获取字符的整数表示，chr()函数把编码转换为对应的字符。
>>> ord('A')
65
>>> ord('中')
20013
>>> chr(66)
'B'
>>> chr(25991)
'文'
```

> 2. len()
```python
# 计算str包含多少个字符
>>> len('ABC')
3
>>> len('中文')
2
```

> 3. 字符串截取

语法规则：变量[头下标:尾下标]
字符串的截取从头下标开始，不算尾下标

![20210330171950.png](../blog_img/20210330171950.png)

```python
str = 'Runoob'

print (str)          # 输出字符串
print (str[0:-1])    # 输出第一个到倒数第二个的所有字符，-1 为从末尾的开始位置
print (str[0])       # 输出字符串第一个字符
print (str[2:5])     # 输出从第三个开始到第五个的字符
print (str[2:])      # 输出从第三个开始的后的所有字符
print (str * 2)      # * 表示复制当前字符串
print (str + "TEST") # 加号 + 是字符串的连接符

#-------------执行结果
Runoob
Runoo
R
noo
noob
RunoobRunoob
RunoobTEST
```

> 4. 字符转义

Python 使用反斜杠 \ 转义特殊字符，如果你不想让反斜杠发生转义，可以在字符串前面添加一个 r，表示原始字符串

```python
>>> print('Ru\noob')
Ru
oob
>>> print(r'Ru\noob')
Ru\noob
>>>
```

> 5. 字符格式化输出

```python
>>> 'Hello, %s' % 'world'
'Hello, world'
>>> 'Hi, %s, you have %d.' % ('Michael', 1000000)
'Hi, Michael, you have 1000000.'


print('%2d-%02d' % (3, 1))
print('%.2f' % 3.1415926)
#------输出结果
 3-01
3.14


#  %02d 用于补0
#  %.2f 用于指定浮点数的小数点后几位保留

```

字符串内部，%s表示用字符串替换，%d表示整数,%f表示为浮点数,%x表示为16进制整数。如果只有一个%?，括号可以省略。

<font color="red">注意：%s永远起作用，它会把任何数据类型转换为字符串</font>

<font color="red">注意：Python 字符串不能被改变。向一个索引位置赋值，比如word[0] = 'm'会导致错误。</font>


### 2. list列表数据类型的使用

列表是写在方括号 [ ] 之间、用逗号分隔开的元素列表。元素列表中的数据类型可以各不相同。

```python
>>> classmates = ['Michael', 'Bob', 'Tracy']
>>> classmates
['Michael', 'Bob', 'Tracy']

# 通过len方法，可以获取列表的元素个数
>>> len(classmates) 
3

# 可以通过索引的方式来获取列表中的元素
>>> classmates[0]
'Michael'
>>> classmates[1]
'Bob'
>>> classmates[2]
'Tracy'
>>> classmates[-1]
'Tracy'

# 通过append方法来追加列表元素到末尾
>>> classmates.append('Adam')
>>> classmates
['Michael', 'Bob', 'Tracy', 'Adam']

# 通过insert方法来把元素插入到指定的位置
>>> classmates.insert(1, 'Jack')
>>> classmates
['Michael', 'Jack', 'Bob', 'Tracy', 'Adam']

# 删除list末尾的元素，用pop()方法
>>> classmates.pop()
'Adam'
>>> classmates
['Michael', 'Jack', 'Bob', 'Tracy']

#删除指定位置的元素，用pop(i)方法
>>> classmates.pop(1)
'Jack'
>>> classmates
['Michael', 'Bob', 'Tracy']

#替换指定索引的元素
>>> classmates[1] = 'Sarah'
>>> classmates
['Michael', 'Sarah', 'Tracy']

# 列表中可以包含另一个列表
>>> s = ['python', 'java', ['asp', 'php'], 'scheme']
>>> len(s)
4
# 或者
>>> p = ['asp', 'php']
>>> s = ['python', 'java', p, 'scheme']
>>>print(s[2][1])
php

```

### 3.tuple元组的使用

<font color="red">tuple元组是写在方括号( )之间、用逗号分隔开的不能修改元素列表。即tuple元组是一旦初始化就不能修改的list列表,</font>

1. tuple元组不能修改其中元素，只能获取其中元素。方法与list列表相同

```python
# 定义两个元素的tuple
>>> t = (1, 2) 

# 定义1个元素的tuple,需要加上逗号，表示这是tuple
>>> c = (1,)

# 定义0个元素的tuple
>>> a = ()
```

>tuple的不可变指的是元素指向的地址不可变，而不是元素的值不可变

```python
# 元组t的第三个元素的地址没变，但是通过改变值来使元组变化
>>> t = ('a', 'b', ['A', 'B'])
>>> t[2][0] = 'X'
>>> t[2][1] = 'Y'
>>> t
('a', 'b', ['X', 'Y'])
```

### 4.dictionary（字典）

字典用 { } 标识，它是一个无序的 键(key) : 值(value) 的集合。键(key)必须是唯一的

1. dict的key必须是不可变对象,即字符串、整数。
2. 一个key只能对应一个value。多次对一个key放入value，后面的值会把前面的值冲掉
3. <font color="red">还可以用构造函数dist()来初始化字典</font>


```python
#创建一个空字典
dict = {} 

# 访问字典的值
d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
d['Michael']

# 修改字典中的元素
dict = {'Name': 'Runoob', 'Age': 7, 'Class': 'First'}
dict['Age'] = 8               # 更新 Age
dict['School'] = "菜鸟教程"  # 添加信息

# 删除字典元素，可使用del 或 pop方法
dict = {'Name': 'Runoob', 'Age': 7, 'Class': 'First'}
del dict['Name'] # 删除键 'Name'
d.pop('Name')    # 删除键 'Name'
dict.clear()     # 清空字典
del dict         # 删除整个字典

# 判断key是否在字典中
>>>d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
>>>print('Thomas' in d)
False
>>>print(d.get('Thomas'))
None

#用keys()方法输出所有的key
>>> d = {'Michael': 95, 'Tracy': 85}
>>> d.keys()
dict_keys(['Michael', 'Tracy'])

#用values()方法输出所有值
>>> d = {'Michael': 95, 'Tracy': 85}
>>> d.values()
dict_values([95,85])

#用构造函数dist()来初始化字典
>>> dict([('Runoob', 1), ('Google', 2), ('Taobao', 3)])
{'Runoob': 1, 'Google': 2, 'Taobao': 3}
>>> dict(Runoob=1, Google=2, Taobao=3)
{'Runoob': 1, 'Google': 2, 'Taobao': 3}

#用len()方法计算字段key总数
>>> dict = {'Name': 'Runoob', 'Age': 7, 'Class': 'First'}
>>> len(dict)
3

#用str()打印输出字典
>>> dict = {'Name': 'Runoob', 'Age': 7, 'Class': 'First'}
>>> str(dict)
"{'Name': 'Runoob', 'Class': 'First', 'Age': 7}"


# 还有很多方法，自行百度
```

### 5.set集合

集合（set）是一个无序的不重复元素序列。可使用 { } 或者 set() 构造函数创建集合。
<font color="red">创建一个空集合必须用 set() 而不是 { }，因为 { } 是用来创建一个空字典</font>

1. 在set中，没有重复的key

```python
# add方法添加元素
>>> thisset = set(("Google", "Runoob", "Taobao"))
>>> thisset.add("Facebook")
>>> print(thisset)
{'Taobao', 'Facebook', 'Google', 'Runoob'}

# update方法更新元素
>>> thisset = set(("Google", "Runoob", "Taobao"))
>>> thisset.update([1,4],[5,6])  
>>> print(thisset)
{1, 3, 4, 5, 6, 'Google', 'Taobao', 'Runoob'}

# remove移除元素
>>> thisset = set(("Google", "Runoob", "Taobao"))
>>> thisset.remove("Taobao")
>>> print(thisset)
{'Google', 'Runoob'}

# discard移除元素
>>> thisset = set(("Google", "Runoob", "Taobao"))
>>> thisset.discard("Facebook")  # 不存在不会发生错误
>>> print(thisset)
{'Taobao', 'Google', 'Runoob'}

# pop方法随机删除一个元素
# pop 方法会对集合进行无序的排列，然后将这个无序排列集合的左面第一个元素进行删除。
>>>thisset = set(("Google", "Runoob", "Taobao", "Facebook"))
>>>thisset.pop()

# len方法计算集合个数
>>> thisset = set(("Google", "Runoob", "Taobao"))
>>> len(thisset)
3

# clear方法清空集合
>>> thisset = set(("Google", "Runoob", "Taobao"))
>>> thisset.clear()

# in 判断元素是否在集合中
>>> thisset = set(("Google", "Runoob", "Taobao"))
>>> "Runoob" in thisset
True
>>> "Facebook" in thisset
False

```


## 3. if条件语句,while循环语句,for循环语句

>条件语句

1. Python 中用 elif 代替了 else if
2. 每个条件后面要使用冒号 : ，表示接下来是满足条件后要执行的语句块。
3. 相同缩进数的语句在一起组成一个语句块。
4. 在Python中没有switch – case语句。

```python
if condition_1:
    statement_block_1
elif condition_2:
    statement_block_2
else:
    statement_block_3
```

>while循环语句

1. 在 Python 中没有 do..while 循环

```python
# 普通while语句
n = 100
sum = 0
counter = 1

while counter <= n:
    sum = sum + counter
    counter += 1
 
print("1 到 %d 之和为: %d" % (n,sum))

# 执行结果
1 到 100 之和为: 5050


# while 循环使用 else 语句
# 条件语句为 false 时执行 else 的语句块
count = 0
while count < 5:
   print (count, " 小于 5")
   count = count + 1
else:
   print (count, " 大于或等于 5")

# 执行结果
0  小于 5
1  小于 5
2  小于 5
3  小于 5
4  小于 5
5  大于或等于 5
```

>for循环语句

break 语句用于跳出当前循环体

```python
sites = ["Baidu", "Google","Runoob","Taobao"]
for site in sites:
    if site == "Runoob":
        print("菜鸟教程!")
        break
    print("循环数据 " + site)
else:
    print("没有循环数据!")
print("完成循环!")

# 输出结果
循环数据 Baidu
循环数据 Google
菜鸟教程!
完成循环!

```



## 4.函数

Python内置了很多有用的函数。可以从python官方网站查询函数文档。

```python
# 通过help函数来查询abs函数的用法
>>>help(abs)

Help on built-in function abs in module builtins:
abs(x, /)
    Return the absolute value of the argument.
```


### 1.调用函数

<font color="red">当调用函数时，若传入的参数个数错误，类型错误。会出现错误提示。</font>

```python
# 调用abs函数，取绝对值
>>> abs(100)
100
>>> abs(-20)
20

# 下面是数据类型转换函数
>>> int('123')
123
>>> int(12.34)
12
>>> float('12.34')
12.34
>>> str(1.23)
'1.23'
>>> str(100)
'100'
>>> bool(1)
True
>>> bool('')
False
```

<font color="red">可以把函数名赋给一个变量，相当于给这个函数起了一个“别名”</font>

```python
>>> a = abs #变量a指向abs函数
>>> a(-1) # 所以也可以通过a调用abs函数
1
```


### 2.定义函数

1. 定义函数使用 def 关键字
2. python 使用 lambda 来创建匿名函数。不能访问参数列表之外的参数。
3. Python的函数返回多值其实就是返回一个tuple。所以可以返回多个返回值
4. 函数一旦执行到return时，函数就执行完毕。若函数没有return语句，也会返回结果，只是返回结果为None。即return None可以简写为return

```python
# 定义函数
def printme( str ):
   # 打印任何传入的字符串
   print (str)
   return

# 调用函数
printme("我要调用用户自定义函数!")
printme("再次调用同一函数")

# 输出结果
我要调用用户自定义函数!
再次调用同一函数

#--------------------------------------函数传入的是地址的应用
def changeme( mylist ):
   "修改传入的列表"
   mylist.append([1,2,3,4])
   print ("函数内取值: ", mylist)
   return
 
# 调用changeme函数
mylist = [10,20,30]
changeme( mylist )
print ("函数外取值: ", mylist)

#----------------------------------------return语句
def sum( arg1, arg2 ):
   # 返回2个参数的和."
   total = arg1 + arg2
   print ("函数内 : ", total)
   return total
 
# 调用sum函数
total = sum( 10, 20 )
print ("函数外 : ", total)

#输出结果
函数内 :  30
函数外 :  30


# ----------------------------------------匿名函数
sum = lambda arg1, arg2: arg1 + arg2
print ("相加后的值为 : ", sum( 10, 20 ))
print ("相加后的值为 : ", sum( 20, 20 ))
# 输出结果
相加后的值为 :  30
相加后的值为 :  40
```

> 函数多个返回值

```python
import math
def move(x, y, step, angle=0):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny

# 函数返回值被x,y接收
>>> x, y = move(100, 100, 60, math.pi / 6)
>>> print(x, y)
151.96152422706632 70.0

# 打印出来的r为元组类型
>>> r = move(100, 100, 60, math.pi / 6)
>>> print(r)
(151.96152422706632, 70.0)
```

## 5.高级用法

### 1.切片（Slice）操作符

切片（Slice）操作符，用于取指定索引范围的操作。

```python
>>> L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']

### L[0:3]表示，从索引0开始取，直到索引3为止，但不包括索引3
>>> L[0:3]
['Michael', 'Sarah', 'Tracy']
### 倒数第一个元素的索引是-1
>>> L[-2:-1]
['Bob']


>>> L = [0, 1, 2, 3, ..., 99]
### 前10个数，每两个取一个
>>> L[0:10:2]
[0, 2, 4, 6, 8]
### 所有数，每5个取一个， [::]表示全部
>>> L[::5]
[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]

### tuple也可以用切片操作
>>> (0, 1, 2, 3, 4, 5)[0:3]
(0, 1, 2)

### 字符串也可以用切片操作
>>> 'ABCDEFG'[0:3]
'ABC'
>>> 'ABCDEFG'[::2]
'ACEG'

```

### 2.迭代

1. 字符串和字典，列表数据类型可以通过for...in来进行迭代。
2. Python内置的enumerate函数可以把一个list变成索引-元素对，这样就可以在for循环中同时迭代索引和元素本身

> 1. for ... in 迭代

```python
## 迭代字典数据类型

## 方式1：迭代出key
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> for key in d:
...     print(key)
...
a
c
b

## 方式2 迭代出value
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> for value in d.values():
...     print(value)
...
1
2
3

## 方式3 迭代出 key 和 value
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> for k,v in d.items():
...     print(k,v)
...
a 1
b 2
c 3

#### 迭代字符串对象
>>> for ch in 'ABC':
...     print(ch)
...
A
B
C

#### Python内置的enumerate函数可以把一个list变成索引-元素对，这样可以同时迭代索引和元素本身
>>> for i, value in enumerate(['A', 'B', 'C']):
...     print(i, value)
...
0 A
1 B
2 C

### 迭代列表数据类型
>>> for x, y in [(1, 1), (2, 4), (3, 9)]:
...     print(x, y)
...
1 1
2 4
3 9


### 同时迭代多个列表，可以使用 zip() 组合
>>> questions = ['name', 'quest', 'favorite color']
>>> answers = ['lancelot', 'the holy grail', 'blue']
>>> for q, a in zip(questions, answers):
...     print('What is your {0}?  It is {1}.'.format(q, a))
...

What is your name?  It is lancelot.
What is your quest?  It is the holy grail.
What is your favorite color?  It is blue.


### 反向迭代一个列表，调用 reversed() 函数，将列表变为反序
>>> for i in reversed(range(1, 10, 2)):
...     print(i)
...
9
7
5
3
1



```

> 通过迭代器来进行迭代

1. 迭代器有两个基本的方法：iter() 和 next()。字符串，列表或元组对象都可用于创建迭代器。

```python
>>> list=[1,2,3,4]
>>> it = iter(list)    # 创建迭代器对象
>>> print (next(it))   # 输出迭代器的下一个元素
1
>>> print (next(it))
2

list=[1,2,3,4]
it = iter(list)    # 创建迭代器对象
for x in it:
    print (x, end=" ")

# 输出结果
1 2 3 4
```


### 3.列表生成式

1. 列表生成式是Python内置的用来创建list的。

```python
>>> list(range(1, 11))
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

## 生成[1x1, 2x2, 3x3, ..., 10x10]的格式
>>> [x * x for x in range(1, 11)]
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# 上面使用了列表生成式
# 写列表生成式时，把要生成的元素x * x放到前面，后面跟for循环，就可以把list创建出来。

# 增加if判断
>>> [x * x for x in range(1, 11) if x % 2 == 0]
[4, 16, 36, 64, 100]

# 使用两层循环，可以生成全排列
>>> [m + n for m in 'ABC' for n in 'XYZ']
['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']
```


## 6. Python 数据结构

python中list列表的部分方法：
```python
list.append(x)	把一个元素添加到列表的结尾，相当于 a[len(a):] = [x]。

list.pop([i])	从列表的指定位置移除元素，并将其返回。如果没有指定索引，a.pop()返回最后一个元素。元素随即从列表中被移除。（方法中 i 两边的方括号表示这个参数是可选的）
```


> 将列表作为栈使用

堆栈作为特定的数据结构，后进先出。
用 append() 方法可以把一个元素添加到堆栈顶。用不指定索引的 pop() 方法可以把一个元素从堆栈顶释放出来。

```python
>>> stack = [3, 4, 5]
>>> stack.append(6)
>>> stack.append(7)
>>> stack
[3, 4, 5, 6, 7]
>>> stack.pop()
7
>>> stack
[3, 4, 5, 6]
>>> stack.pop()
6
>>> stack.pop()
5
>>> stack
[3, 4]
```

> 将列表当作队列使用

列表作为特定的数据结构，先进先出。

```python
>>> from collections import deque
>>> queue = deque(["Eric", "John", "Michael"])
>>> queue.append("Terry")           
>>> queue.append("Graham")          
>>> queue.popleft()                 
'Eric'
>>> queue.popleft()                 
'John'
>>> queue                           
deque(['Michael', 'Terry', 'Graham'])


```


## 7.模块

1. 模块是一个包含所有你定义的函数和变量的文件。其后缀名为py
2. 模块可以被别的程序引入，以使用该模块中的函数等功能。

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