---
title: IDEA常见问题汇总
date: 2022-06-28
sidebar: 'auto'
categories: 
 - 随笔
---

## 1. 所有Intellij IDEA Cannot Resolve Symbol XXX问题的解决方法汇总

当用idea导入maven项目的时候，会出现各种各样的问题。最常见的是Cannot Resolve Symbol XXX报错

解决方式：
1. 检查idea中的maven配置。若使用自己的maven。需要注意MAVEN_HOME和M2_HOME环境变量，以及对应的path系统变量是否在电脑系统中配置好。
2. 检查maven仓库目录中报错的依赖包，是否完全下载下来。若没有下载下来。先删除该依赖包，再重新下载。在编译器右侧中打开Maven Projects标签，先进行clean一下，再执行install。
3. 检查idea的sdk,选择自己本地安装的jdk,并检查JAVA_HOME环境变量有没有再系统中设置正确。
4. 若导入的maven项目没有蓝色小方块图标。需要右键-》maven->Generate Sources and Update Folder。 重新更新下maven项目
5. 或者右键-》maven->Reload Projects
6. 最后清除idea的编译器缓存。File->invalidate Caches / Restart



