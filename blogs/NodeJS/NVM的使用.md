---
title: NVM的使用
date: 2022-07-05
sidebar: 'auto'
categories: 
 - 前端
tags:
 - NodeJS
---

## windows下NVM的使用

nvm是一个nodejs的版本管理工具。通过它可以安装和切换不同版本的node.js。用来解决多个项目使用不同版本node.js的现象。


### nvm的安装

百度

* 注意安装nvm前，需要先将之前安装的nodejs卸载。
* 在安装nvm的过程中要指定nvm的安装目录，也要指定nodejs快捷方式的安装目录。
* 通过nvm下载的各个nodejs版本。其实际的安装目录与nvm安装目录是一个目录下的。通过nvm切换nodejs版本，就是改变快捷方式的指向地址。

### nvm的使用命令

```
nvm list available      ##显示可下载版本的部分列表
nvm install 版本号      ##安装指定的版本的nodejs
nvm list                ##查看目前已经安装的版本
nvm use 版本号          ##使用指定版本的nodejs
nvm uninstall 版本号    ##卸载指定版本的nodejs

// 注意不同版本的nodejs的设置是互相隔离的。互不影响。
// npm 源地址
npm config set registry http://registry.npmjs.org
//设置淘宝源
npm config set registry https://registry.npm.taobao.org
//查看当前仓库源
npm config get registry

```

<font color="red">注意：不同版本的nodejs的设置是互相隔离的。互不影响。例如在版本a的nodejs设置淘宝源，不会同步到版本b的nodejs。</font>


### nvm的配置文件

可在nvm的配置文件settings.txt中，添加npm仓库地址。

```
root: C:\Users\shuyx\AppData\Roaming\nvm    ##root是nvm的安装目录
path: C:\Program Files\nodejs               ##path是当前nodejs快捷方式的存放目录
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```
