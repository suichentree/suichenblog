---
title: telnet命令测试端口连通性
date: 2022-10-20
sidebar: 'auto'
categories: 
 - 系统
tags:
 - Linux
---


# telnet命令测试端口连通性

telnet命令是TELNET协议的用户接口，它支持两种模式：命令模式和会话模式。

虽然telnet支持许多命令，但大部分情况下，我们只是使用它查看目标主机是否打开了某端口（默认是23）。

## 使用telnet命令

若端口未打开
```shell
$ telnet 101.199.97.65 62715  #测试101.199.97.65服务器是否开通62715端口
Trying 101.199.97.65...
telnet: connect to address 101.199.97.65: Connection refused
```

若端口已打开
```shell
$ telnet 101.199.97.65 62715
Trying 101.199.97.65...
Connected to 101.199.97.65.
Escape character is '^]'.
```

此时命令未退出窗口。
根据提示`Escape character is '^]'`.可知退出字符为`'^]'（CTRL+]）`。
此时输入其它字符不能使其退出，CTRL+C都不行。输入`CTRL+]`后会自动执行，进入命令模式：

```shell
^]
telnet>
```

此时再运行quit才会真正退出。

```shell
telnet> quit
Connection closed.
```