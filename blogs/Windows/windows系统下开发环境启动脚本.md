---
title: windows系统下开发环境启动脚本
date: 2023-03-07
sidebar: 'auto'
categories: 
 - 系统
tags:
 - windows
---

[toc]

## windows系统下开发环境启动脚本

使用场景：在windows系统下快速批量启动开发环境所需要的程序。

① 创建bat批处理文件，文件内容如下。

* 批量运行nacos程序
* 批量运行nginx程序

开发环境批量启动脚本.bat
```
:: 该脚本用于批量各种开发环境。例如nacos,nginx等

:: 命令解释：
:: start 用来启动一个应用
:: cmd /k 表示cmd后面的命令执行完后不关闭窗口。如果要在执行完成后关闭窗口可以用/c 
:: cd /d 表示运行到该目录下
:: 使用choice命令来延时1秒 choice /t 1 /d y
:: TIMEOUT /T 5 等待5秒


:: 进入到nacos集群1的bin目录
cd/d E:\CodeEnviroment\nacos-server-2.1.0\nacos-cluster1\bin
:: 不关闭窗口执行startup.cmd
start cmd /k startup.cmd
TIMEOUT /T 10

cd/d E:\CodeEnviroment\nacos-server-2.1.0\nacos-cluster2\bin
start cmd /k startup.cmd
TIMEOUT /T 10

cd/d E:\CodeEnviroment\nacos-server-2.1.0\nacos-cluster3\bin
start cmd /k startup.cmd
TIMEOUT /T 10

:: 进入到nginx的目录
:: 运行nginx
cd/d E:\CodeEnviroment\nginx-1.22.0
start nginx.exe

```

② 创建Sentinel启动脚本.bat，文件内容如下。

```
java -Dserver.port=8898 -jar E:\CodeEnviroment\sentinel-dashboard-1.8.4.jar
pause
```