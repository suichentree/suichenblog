---
title: Python使用BeautifulSoup4库笔记
date: 2024-08-02
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
---

[toc]

# Python使用BeautifulSoup4库笔记

Beautiful Soup 是一个可以从HTML或XML文件中提取数据的Python库。

目前 Beautiful Soup 库的最新版本为 Beautiful Soup 4

## 安装

```py
# 使用pip安装 beautifulsoup4
pip install beautifulsoup4  
```

## 基本用法

### 获取网页对象

方式1： 直接通过html文本获取网页对象

```py
from bs4 import BeautifulSoup

html_doc = """
<html><head><title>The Dormouse's story</title></head>
    <body>
<p class="title"><b>The Dormouse's story</b></p>

<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>

<p class="story">...</p>
"""
soup2 = BeautifulSoup(html_doc, 'html.parser')
print(soup2)
```


方式2：通过调用网址获取网页对象

```py
import requests
from bs4 import BeautifulSoup

# 先获取网页源代码
response = requests.get('https://www.baidu.com').text
# BeautifulSoup 加载html解析器 解析网页源代码,返回网页对象
soup = BeautifulSoup(response, 'html.parser')
print(soup)

```


### 根据元素标签名字找到网页中元素标签内容

```py
# 获取网页中的head元素标签（包含标签本身）
print(soup.head)

# 获取网页中的title元素标签（包含标签本身）
print(soup.title)

# 找出所有的 a 元素标签
print(soup.find_all('a'))

# 找出所有的 a 元素标签 和 b 元素标签
print(soup.find_all(["a", "b"]))

# 找出 id="link3"的元素标签
print(soup.find(id="link3"))

# 查找具有id="mylist" 的ul标签
print(soup.find("ul", id="mylist"))

```


### 网页对象soup的各种属性

> .contents 属性可以将 元素标签 的全部子节点以列表的方式输出。

```py
# 获取网页中的head元素标签
head_tag = soup.head
print(head_tag)
# <head><title>The Dormouse's story</title></head>

# 打印head标签的全部子节点
print(head_tag.contents)
# [<title>The Dormouse's story</title>]

title_tag = head_tag.contents[0]
print(title_tag)
# <title>The Dormouse's story</title>

```


> .string 属性可以获取元素标签中的内容。

```py
print(title_tag)
# <title>The Dormouse's story</title>

print(title_tag.string)
# 'The Dormouse's story'
```

> .parent 属性可以获取某个元素的父节点。例如`<head>`标签是 `<title>`标签的父节点

```py
print(title_tag)
# <title>The Dormouse's story</title>
print(title_tag.parent)
# <head><title>The Dormouse's story</title></head>
```

> .parents 属性可以递归得到元素的所有父辈节点。

```py
print(link)
# <a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>

for parent in link.parents:
    if parent is None:
        print(parent)
    else:
        print(parent.name)
# p
# body
# html
# [document]
# None
```

> .next_sibling 和 .previous_sibling 属性

.next_sibling 和 .previous_sibling 属性用来查询兄弟节点。

```py
sibling_soup = BeautifulSoup(
"""
<a>
    <b>text1</b>
    <c>text2</c>
</a>
""", 'html.parser')

# 获取b标签的下一个兄弟节点
print(sibling_soup.b.next_sibling)
# <c>text2</c>

# 获取c标签的上一个兄弟节点
print(sibling_soup.c.previous_sibling)
# <b>text1</b>
```


### BeautifulSoup 美化代码

使用prettify()方法，可以美化 HTML 代码。   

```py
from bs4 import BeautifulSoup
import requests
# 先获取网页源代码
response = requests.get('https://www.baidu.com').text
# BeautifulSoup 加载html解析器 解析网页源代码,返回网页对象
soup = BeautifulSoup(response, 'html.parser')
# 美化html代码
print(soup.prettify())

```

### BeautifulSoup 追加元素

append()方法将新标签附加到 HTML 文档。

```py
import requests
from bs4 import BeautifulSoup

# 先获取网页源代码
response = requests.get('https://www.baidu.com').text
# BeautifulSoup 加载html解析器 解析网页源代码,返回网页对象
soup = BeautifulSoup(response, 'html.parser')

# 获取ul元素
ultag = soup.ul

# 追加一个ul元素
newtag = soup.new_tag('li')
newtag.string='OpenBSD'
ultag.append(newtag)

```

### BeautifulSoup 插入元素

insert()方法在指定位置插入元素标签。

```py
import requests
from bs4 import BeautifulSoup

# 先获取网页源代码
response = requests.get('https://www.baidu.com').text
# BeautifulSoup 加载html解析器 解析网页源代码,返回网页对象
soup = BeautifulSoup(response, 'html.parser')

# 获取ul元素
ultag = soup.ul

# 插入一个ul元素
newtag = soup.new_tag('li')
newtag.string='OpenBSD'
ultag.insert(2, newtag)

```

### BeautifulSoup 删除元素标签

decompose()方法从dom树中删除元素标签并销毁它。

```py
import requests
from bs4 import BeautifulSoup

# 先获取网页源代码
response = requests.get('https://www.baidu.com').text
# BeautifulSoup 加载html解析器 解析网页源代码,返回网页对象
soup = BeautifulSoup(response, 'html.parser')

ptag2 = soup.select_one("p:nth-of-type(2)")
ptag2.decompose()

```

### BeautifulSoup 替换文字

replace_with()替换元素的文本。

```py
import requests
from bs4 import BeautifulSoup

# 先获取网页源代码
response = requests.get('https://www.baidu.com').text
# BeautifulSoup 加载html解析器 解析网页源代码,返回网页对象
soup = BeautifulSoup(response, 'html.parser')

tag = soup.find(text="Windows")
tag.replace_with("OpenBSD")

```