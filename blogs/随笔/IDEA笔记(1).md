---
title: IDEA的笔记
date: 2020-10-12
sidebar: 'auto'
categories:
 - 随笔
---



# IDEA的笔记

创建日期：2020-10-12
更新日期：2021-08-11


## 1.IDEA 与 Eclipse 的区别

1. IDEA是没有Eclipse的workspace的概念。取代workspace的是Project。

2. IDEA 的 Project 是一个没有具备任何编码设置、构建等开发功能的，主要起到一个项目定义、范围约束、规范等类型的效果，也许我们可以简单地理解为就是一个单纯的目录，只是这个目录命名上必须有其代表性的意义。

3. 在IDEA中 Project 是最顶级的级别，次级别是 Module。一个 Project 可以有多个 Module。目前主流的大型项目结构都是类似这种多 Module 结构。比如：core Module、web Module、plugin Module等，模块之间彼此可以相互依赖。这些 Module应该都是处于同一个项目业务情况下的模块，彼此之间是有不可分割的业务关系的。

下表是IDEA 与 Eclipse 之间一些概念的对比：

Eclipse | 	IntelliJ IDEA
-- | --
Workspace   |  Project
Project | Module
Facet | Facet
Library | Library
JRE | SDK
Classpath variable | Path variable

## 2. SDK（Software Development Kit）介绍

IDEA 的sdk（软件开发工具包）,就相当于 jre 运行环境。

----------------------

## 3.IDEAD的常用设置

> 1. 使用idea创建工程，会有两个特殊文件：.iml文件和.idea文件夹。

.iml文件是工程配置文件，里面是当前project的一些配置信息。
.Idea文件夹存放项目的配置信息，包括历史记录，版本控制信息等。

上传到git仓库的时候，可以不用上传它们。

> 2. 关闭自动更新

在File->Settings->Appearance & Behavior->System Settings->Updates下取消Automatically check updates for勾选 

> 3. 文件编码设置

File->Settings->Editor->File Encodings

推荐设置
```
Global Encoding:UTF-8
Projectt Encoding:UTF-8
Default encoding for properties files:UTF-8
勾选上Transparent native-to-ascii conversion
```


--------------------


## 4.IDEA中git的使用

### 1.IDEA 创建 spring boot项目

1. 安装IDEA
2. 创建spring boot项目（网上找教程）

```
Create New Project -> 在左侧菜单找到并点击 Spring Initializr，点击next -> 一直next,直到左面选择Web类别下的Spring Web Starter -> 设置项目名称Project name 和 工程保存路径 Project location。完成后，点击 Finish。
```

3. 如果pom文件中的maven依赖下载慢，就改变IDEA的maven设置（主要把setting.xml文件中的镜像设置为国内的）

### 2.IDEA创建本地git仓库并把代码push到github上

1. 在idea中配置git。
2. 为当前项目创建git本地仓库

```
选中当前项目-> 点击VCS -> import into version control -> create git repository
之后你能在项目文件中找到隐藏的git目录
```

3. 把项目文件存储到git本地的暂存区

```
右键项目->git->add
```

4. 把项目暂存区的文件推送到本地仓库中

```
右键项目->git->commit directory
```

5. 在github上创建仓库,然后再把远程仓库的代码，先pull到git本地仓库中

```
ps:注意创建github仓库时，不要建立readme文件。否则push的时候，容易发生本地仓库与github仓库代码冲突
```

6. 再把git本地仓库的代码push到github上

```
1.在idea中设置github全局信息,登录你的github账号(如果无法登录尝试使用vpn在登录)
2. 指定上传的github远程仓库的信息
右键项目->git->repository->remotes
填写刚刚创建的github远程仓库的信息。例如：xxx://xxx.com/xxx/xxx.git
3. push代码
右键项目->git->repository->push
```

### 3.IDEA 从github上clone一个项目到本地中

1. 复制远程仓库的链接。例如：`xxx://xxx.com/xxx/xxx.git`
2. 点击idea 的 vcs -> checkout from version control -> git
3. 把链接输入进去。选择新的目录。点击clone即可
4. 新开一个窗口，打开项目即可

### 4.IDEA 拉取远程仓库上最新的代码到本地仓库中

1. 右键项目->git->repository->pull

### 5.clone别人的项目，并提交代码到别人的github仓库。需要别人先把自己在github上设置为合作者才行。或者别人的项目是公共的。