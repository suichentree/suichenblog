---
title: idea如何屏蔽.iml .idea等不需要的文件类型
date: 2023-02-16
sidebar: 'auto'
categories:
 - 随笔
---

## idea如何屏蔽.iml .idea等不需要的文件类型 避免commit提交无效文件

使用IDEA创建工程。会有很多.iml .idea文件。这些文件与工程代码并没什么关系，都是一些IDEA本地编译运行的文件。不仅没用，而且在协作开发中，如果你提交了自己本地的iml文件，被别人拉到其他机器上，还会影响别人运行。

屏蔽方式：

![20230216111414.png](../blog_img/20230216111414.png)




