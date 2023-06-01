---
title: unraid插件与docker容器
date: 2023-05-31
sidebar: 'auto'
categories: 
 - NAS
tags:
 - unraid
---

[toc]

# unraid插件与docker容器

unraid有丰富的插件和docker容器可供选择，下面是我用到的一些插件。

## 安装Zerotier docker容器

1. 直接在应用市场中搜索Zerotier
2. 安装Zerotier docker容器
3. 在docker配置页面，填写在Zerotier网站中你注册的NETWORK ID即可。点击应用，该docker容器会自动下载安装。
4. 登录Zerotier官网，把nas端设备添加到你的网络中即可。
5. 然后再浏览器中访问nas端设备分配到的ip地址，即可远程访问nas

注意设置自动启动
![unraid_20230531234841.png](../blog_img/unraid_20230531234841.png)

## 安装 Unassigned Devices 插件

直接在应用市场中搜索Unassigned Devices，点击安装即可。

这个插件有两个功能：
1. 在主界面显示未分配的磁盘设备
2. 在主界面中可以添加局域网中的其他smb，nfs分享。

![unraid_20230602003620.png](../blog_img/unraid_20230602003620.png)

