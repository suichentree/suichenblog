---
title: nodemon笔记
date: 2023-01-19
sidebar: 'auto'
categories: 
 - 前端
tags:
 - NodeJs
---

[toc]

## nodemon笔记

当开发node项目时，若修改了代码，需要频繁的手动关闭和启动node项目。而nodemon可以监听项目中的文件更改，并自动重新启动该项目。极大的方便了node项目的开发和调试。

### 安装

```js
npm install nodemon -g //全局安装nodemon
```

### 使用

使用nodemon命令来运行项目即可。项目通过nodemon命令启动后，会被nodemon监听，从而实现自动重启项目的效果。

```js
// node命令启动项目
node test.js

// 将上面的替换为下面的
// nodemon命令启动项目
nodemon test.js
```



