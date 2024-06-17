---
title: Python使用PDFplumber库笔记
date: 2024-06-17
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
---

[toc]

# Python使用PDFplumber库笔记

PDFplumber是一个可以处理PDF文件的库。可以查找每个PDF文件中的文本字符、矩阵、和行的详细信息，也可以对PDF文件中的表格进行提取数据。


## 安装

pip的方式安装
```bash
pip install pdfplumber
```

## 简单用法

### 读取pdf文件中的封面数据

```py
import pdfplumber
with pdfplumber.open("C:\\Users\\18271\\Desktop\\test1.pdf") as pdf:
    first_page = pdf.pages[0]
    # 打印pdf文件封面的数据
    print(first_page.chars[0])

```

### 提取pdf文件中的数据

```py
import pdfplumber
import pandas as pd
with pdfplumber.open("C:\\Users\\18271\\Desktop\\test1.pdf") as pdf:
    # 页码为第一页的信息
    page = pdf.pages[1]  
    text = page.extract_text()
    # 打印第一页的信息
    print(text)
    # 读取第一页中的表格信息
    table = page.extract_tables()
    for t in table:
        # 得到的table是嵌套list类型，转化成DataFrame更加方便查看和分析
        df = pd.DataFrame(t[1:], columns=t[0])
        print(df)

```

- .extract_text() 用来提页面中的文本，将页面的所有字符对象转换为字符串。
- .extract_words() 返回的是所有的单词及其相关信息。
- .extract_tables() 提取页面的表格。
- .to_image() 用于可视化调试时，返回PageImage类的一个实例。


### 读取PDF文件中的所有内容（去除页码）

```py
# python 解析读取 pdf 测试代码
import pdfplumber

# 获取pdf文件中的所有内容
def get_all_pdf_conten(path):
    # 读取指定路径的pdf文件
    pdf = pdfplumber.open(path)
    # pdf全部内容
    all_content = ""
    # 一页一页的读取pdf的文档内容(去除页码)
    for i, page in enumerate(pdf.pages):
        # page.extract_text()函数是用来读取某一页的pdf内容
        # 然后根据 \n 换行符进行截取
        # 然后去除每一页pdf文档内容中最后面的页码。
        page_content = '\n'.join(page.extract_text().split('\n')[:-1])
        all_content = all_content + page_content
    return all_content


if __name__ == "__main__":
    # pdf文件路径
    path = "C:\\Users\\18271\\Desktop\\test1.pdf"
    all_content = get_all_pdf_conten(path)
    print(all_content)

```