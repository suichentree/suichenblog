---
title: Python使用selenium库笔记
date: 2024-05-18
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
---

[toc]

# Python使用selenium库笔记

Selenium 是一个用于 Web 应用程序测试的工具。常用于网站的自动化测试。

Selenium 本质上是通过驱动浏览器，彻底模拟浏览器的操作，好比跳转、输入、点击、下拉等，来拿到网页渲染之后的结果。

有人用python编写了一个使用selenium的第三方库。从而可以很方便的通过python语言来使用selenium。

## 安装

安装 selenium 库

```bash
pip install selenium
```

## Selenium的使用


```py
# 导入selenium库的webdriver类
from selenium import webdriver
# 创建Edge浏览器操作对象
browser = webdriver.Edge()
# 网站链接
url = 'https://www.baidu.com'
# 访问网站
browser.get(url)

```
