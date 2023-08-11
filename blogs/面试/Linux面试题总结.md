---
title: Linux面试题总结
date: 2020-11-24
sidebar: 'auto'
categories:
 - 面试
tags:
 - Linux
---

[toc]

## Linux面试题总结

### 1.绝对路径用什么符号表示？当前目录、上层目录用什么表示？主目录用什么表示? 切换目录用什么命令？

* 绝对路径： 如/etc/init.d
* 当前目录： ./
* 上层目录 ../
* 主目录： ~/
* 切换目录： cd

### 2.怎么查看当前进程？怎么执行退出？怎么查看当前路径？

* 查看当前进程： ps
* 执行退出： exit
* 查看当前路径： pwd

### 3.怎么清屏？怎么退出当前命令？怎么执行睡眠？怎么查看当前用户 id？

* 清屏： clear
* 退出当前命令： ctrl+c 彻底退出
* 执行睡眠 ： ctrl+z 挂起当前进程 fg 恢复后台
* 查看当前用户 id： ”id“：查看显示目前登陆账户的 uid 和 gid 及所属分组及用户名

### 4.目录创建用什么命令？创建文件用什么命令？复制文件用什么命令？

* 创建目录： mkdir 
* 创建文件：典型的如 touch，vi 也可以创建文件，其实只要向一个不存在的文件输出，都会创建文件
* 复制文件： cp 

### 5.查看文件内容有哪些命令可以使用？

```
vi 文件名 #编辑方式查看，可修改
cat 文件名 #显示全部文件内容
more 文件名 #分页显示文件内容
less 文件名 #与 more 相似，更好的是可以往前翻页
tail 文件名 #仅查看尾部，还可以指定行数
head 文件名 #仅查看头部,还可以指定行数
```

### 6.如何向屏幕输出带空格的字符串，比如”hello world”?
向屏幕输出带空格的字符串:echo hello world

### 7.终端是哪个文件夹下的哪个文件？黑洞文件是哪个文件夹下的哪个命令？
终端 /dev/tty  , 黑洞文件 /dev/null

### 8.利用 ps 怎么显示所有的进程? 怎么利用 ps 查看指定进程的信息？

```
ps -ef (system v 输出)
ps -aux bsd 格式输出
ps -ef | grep pid
```

### 9.哪个命令专门用来查看后台任务?
job -l

### 10.搜索文件用什么命令? 格式是怎么样的?

```
find <指定目录> <指定条件> <指定动作>
whereis 加参数与文件名
locate 只加文件名
find 直接搜索磁盘，较慢。
find / -name "string*"
```

### 11.使用什么命令查看用过的命令列表?
history

### 12.使用什么命令查看网络是否连通?使用什么命令查看 ip 地址及接口信息？
netstat , ifconfig

### 13.打印出当前系统所有支持的命令列表？

使用命令 compgen -c，可以打印出所有支持的命令列表。

```
[root@localhost ~]$ compgen -c
l.
ll
ls
which
if
then else
elif
fi
case
esac
for
select
while
until
do
done
…
```

### 14.怎样查看一个 linux 命令的概要与用法？假设你在/bin 目录中偶然看到一个你从没见过的的命令，怎样才能知道它的作用和用法呢？

使用命令 whatis 可以先出显示出这个命令的用法简要，比如，你可以使用 whatis zcat 去查看‘zcat’的介绍以及使用简要。
```
[root@localhost ~]# whatis zcat
zcat [gzip] (1) – compress or expand files
```