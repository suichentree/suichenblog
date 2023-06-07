---
title: unraid笔记3-插件与docker容器
date: 2023-05-31
sidebar: 'auto'
categories: 
 - NAS
tags:
 - unraid
---

[toc]

# unraid笔记3-插件与docker容器

unraid有丰富的插件和docker容器可供选择，下面是我用到的一些插件。

## unraid modify插件

unraid modify插件可以修改unraid系统的hosts文件来加快Docker，应用市场的加载速度。

插件地址：`http://plg.unraid.site:8/plg/UNRAID_Modify.plg`

>如何安装插件？
插件界面->安装插件-》输入插件地址-》点击安装按钮

## Community Applications 插件   

你只有安装了应用市场插件,才能下载其余的插件.

插件地址：`https://raw.githubusercontent.com/Squidly271/community.applications/master/plugins/community.applications.plg`

## 简体中文插件

1. 当安装好应用市场插件后,在应用界面搜索简体中文插件安装.
2. 插件安装成功后，设置界面->显示设置->语言选择简体中文即可.
3. 浏览器刷新页面,就会显示中文界面了.

![unraid_20230531224932.png](../blog_img/unraid_20230531224932.png)

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

