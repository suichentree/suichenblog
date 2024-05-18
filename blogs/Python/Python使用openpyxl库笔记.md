---
title: Python使用openpyxl库笔记
date: 2024-05-18
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
---

[toc]

# Python使用openpyxl库笔记

openpyxl 是一个用于读写 Excel 文件（.xlsx）的 Python 库。

openpyxl 提供了一种方便的方式来操作 Excel 文件，包括读取和写入单元格数据、创建和修改工作表、设置样式以及执行其他与 Excel 相关的操作。


openyyxl 的特点
- 支持 .xlsx 格式。
- 读写 Excel 文件，操作工作表，单元格。
- 图表和公式：你可以通过 openpyxl 创建图表、添加公式等。
- 样式设置：openpyxl 允许你设置单元格的字体、颜色、边框等样式。


## 安装

通过pip安装openpyxl库

```bash
pip install openpyxl
```

## 基本用法

### 写入excel文件

1. 创建workbook，即创建excel文件
2. 打开workbook中的sheet
3. 写入数据到sheet中
4. 保存workbook，并关闭

```py
# 导入openpyxl库
import openpyxl

"""
workbook 工作簿 就是 excel文件。
worksheet 工作表 就是 excel文件中的sheet
"""

# 新建一个workbook(新建一个excel文件)
new_workbook = openpyxl.Workbook()
# 打开新建excel文件的默认sheet1
new_sheet1 = new_workbook.active
# 给sheet1重命名
new_sheet1.title = 'my_sheet1'

# 首行数据
row = ["序号","姓名","年龄","身份证","备注"]
# 把首行数据加入到new_sheet1中
new_sheet1.append(row)

# 遍历数据，并添加到excel文件中
for i in range(10):
    row = [i + 1,"aaa",12,"252525252525252","5月18日"]
    new_sheet1.append(row)

# 新的excel文件的所在路径
excel_file_path = "C:\\Users\\86182\\Desktop\\test.xlsx";
# 保存excel文件
new_workbook.save(excel_file_path)
# 关闭excel文件
new_workbook.close()

```

![python_20240518203549.png](../blog_img/python_20240518203549.png)


### 读取excel文件

```py
# 导入openpyxl库
import openpyxl

"""
workbook 工作簿 就是 excel文件。
worksheet 工作表 就是 excel文件中的sheet
"""

# excel文件的所在路径
excel_file_path = "C:\\Users\\86182\\Desktop\\test.xlsx";

# 加载excel文件
old_workbook= openpyxl.load_workbook(excel_file_path)
# 获取excel文件的活动sheet（默认为sheet1）
old_sheet1 = old_workbook.active

# 遍历读取excel的数据
for row in range(1, old_sheet1.max_row + 1):
    # 如果某一行的序号列的数据为空，则表示该行没有数据。直接跳过这次循环即可
    if (old_sheet1.cell(row, 1).value == None):
        continue

    # 输出excel中的这一行数据
    print(f'第 {row} 行 - {old_sheet1.cell(row, 1).value} -  {old_sheet1.cell(row, 2).value} - {old_sheet1.cell(row, 3).value} - {old_sheet1.cell(row, 4).value} - {old_sheet1.cell(row, 5).value}')

# 关闭excel文件
old_workbook.close()

```

![python_20240518205205.png](../blog_img/python_20240518205205.png)
