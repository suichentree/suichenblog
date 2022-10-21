---
title: GitHub网站无法访问
date: 2022-10-21
sidebar: 'auto'
categories:
 - 随笔
---

# GitHub网站无法访问

Github有时会出现突然连接失败的问题，有部分情况是地址解析错误导致的，本文介绍此类问题的解决方案。

问题原因：
* 网络不通
* 本地DNS无法正确解析地址

解决思路：
不管你能不能访问，github就在那里，主要是因为使用的网络在dns上找不到当前github网站的地址。从而导致的无法访问。

解决方案：
手动找到github网站的IP，填入到host中，这样我们在访问时会直接从host中读取IP并访问。而不是从dns上找。

解决步骤：

① 查找github网站的IP地址

[IP查询网站](https://www.ip.cn/ip/gist.github.com.html)

查询github.com的ip地址
查询github.global.ssl.fastly.net的ip地址

![github20221021145652.png](../blog_img/github20221021145652.png)

② 写入host文件

* windows系统
打开`C:\Windows\System32\drivers\etc`路径下的hosts文件

```
## github
20.205.243.166 github.com
173.252.108.21 github.global.ssl.fastly.net
```

* Linux系统
打开\etc\hosts文件

```
## github
20.205.243.166 github.com
173.252.108.21 github.global.ssl.fastly.net
```

③ 刷新dns

* Windows
打开CMD窗口,输入指令：`ipconfig /flushdns`

* Linux
在终端中输入：`sudo rcnscd restart`

④ 重启浏览器，重新访问github网站

