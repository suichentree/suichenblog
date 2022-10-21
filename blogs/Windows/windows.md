---
title: Windows命令行窗口命令
date: 2021-03-14
sidebar: 'auto'
categories: 
 - 系统
tags:
 - windows
---

[toc]

## 1.Windows命令行窗口命令

### 1. 切换盘：

```
D:\> c:    //从d盘切换到c盘。
``` 

### 2. dir命令 --显示当前目录下的所有文件：

```
. 表示当前目录
.. 表示上一级目录

D:\Github>dir           //显示github目录（文件）下的所有文件
 驱动器 D 中的卷是 文件盘
 卷的序列号是 C2D7-0FD5

 D:\Github 的目录

2018/04/08  21:47    <DIR>          .     // . 表示当前目录
2018/04/08  21:47    <DIR>          ..    // .. 表示上一级目录   
2018/04/08  21:58    <DIR>          a
2017/12/26  21:14    <DIR>          Browser_Label
2017/12/24  16:28    <DIR>          JavaWeb_Demo
2018/01/17  01:00    <DIR>          SSM-S-project
2018/04/07  11:21    <DIR>          SuichenTree.github.io
               0 个文件              0 字节
               7 个目录 241,880,633,344 可用字节

```

### 3. cd命令-切换目录：

①：显示当前目录：
cd
```
D:\Github>cd        //cd 显示当前目录是什么
D:\Github
```


②：切换当前目录：

cd. 
```
D:\Github>cd.     // cd. 切换到当前目录
D:\Github>
```


③：切换到上级目录：
cd..
```
D:\Github>cd..    // cd.. 切换到上一级目录
D:\>
```

④：进入到某个目录（文件夹）：
cd 目录名。      
```
D:\>cd github      //cd + 目录名，进入到某个目录，
D:\Github>
```

**若d盘没有github目录，则报错**


⑤：打开文件夹的某个文件
文件名
```
D:\Github\a>hello.txt      //打开Github 文件下的a文件下的hello.txt 文件
```


### 4. md  命令----创建文件夹

①： md + 目录名
```
D:\Github>md sss   //在Github 目录下创建 sss文件夹
```

②：md + 目录名 + 目录名
```
D:\Github>md hhh fff    //在Github 目录下创建 hhh与fff文件夹
```

③：md +目录名\目录名
```
D:\Github>md sss\as     //在当前目录下创建sss文件夹，在sss文件夹下创建as文件
```

④：md + 路径
```
D:\Github>md c:\sss\fa   //在c盘中创建sss文件夹，在sss文件夹下创建fa文件
```


### 5. rd 删除文件夹命令：

①：rd + 文件夹名  
**删除当前目录下空文件夹**
```
D:\Github>md sss     //创建sss 空文件夹
D:\Github>rd sss     //删除sss 空文件夹
```

②：rd /s 目录名  
**删除非空文件夹,需要输入 y/n**
```
D:\Github>rd /s a     //删除当前目录下的非空文件夹a
a, 是否确认(Y/N)? y
```

②：rd /q /s 目录名  
**删除非空文件夹,不需要输入 y/n**
```
D:\Github>rd /q /s sa    //删除当前目录下的非空文件夹sa,不需要输入y/n
```

③：rd + 路径  
**删除某个路径下的空文件夹**
```
D:\Github>rd c:\dsa       //删除 c盘下的dsa文件夹
```

###  6.exit 退出命令窗口命令

```
exit
```


## 2. path环境变量：

```
C:\ProgramData\Oracle\Java\javapath;
C:\Program Files (x86)\Intel\iCLS Client\;
C:\Program Files\Intel\iCLS Client\;
C:\Windows\system32;
C:\Windows;
C:\Windows\System32\Wbem;
C:\Windows\System32\WindowsPowerShell\v1.0\;
C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common;
C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\DAL;
C:\Program Files\Intel\Intel(R) Management Engine Components\DAL;
C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\IPT;
C:\Program Files\Intel\Intel(R) Management Engine Components\IPT;
C:\Program Files\Intel\WiFi\bin\;

```

<font color="red">当我们使用命令行窗口打开一个文件夹,打开一个文件或者调用一个程序时。
①：系统会首先到当前目录寻找。如果找到直接打开。
②：如果没有找到，系统会依次到path环境变量的路径中寻找，如果找到直接打开。
③：如果没有找到，直接报错
</font>

**path环境变量的意义：**

<font color="red">
我们可以把经常访问的程序或文件的路径添加到path环境变量中，
这样可以方便我们在任意位置访问它们。
</font>


## 3.线程与进程:

进程：
  -- 进程负责为程序的运行提供必要的环境
  -- 进行就相当与工厂的车间。

线程
  -- 线程是计算机中最小的计算单位,线程负责执行进程中的程序。
  -- 线程就相当与工厂的工人。

<font color="red">
在进程管理器中，不是每个程序都会运行，只有获得线程（cpu使用率）的进程才会被计算机执行。
</font>


## 4.windows 命令行切换目录

1. 切换到C盘根目录
打开终端cmd后，输入cd C:\（一定要加上后面的反斜扛）

2. 切换到C盘子目录
打开终端cmd后，输入cd C:\dir1（切换到C盘下目录dir1）

3. 切换到其他盘根目录
打开终端cmd后，输入D:（不需要加cd，一定不要加反斜扛）

4. 切换到其他盘子目录
打开终端cmd后，先切换到根目录，再使用cd命令切换到子目录