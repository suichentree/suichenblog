---
title: win11 iot 企业版 ltsc 2024版本详细安装
date: 2025-03-21
sidebar: 'auto'
categories: 
 - 系统
tags:
 - windows
---

[toc]

# win11 iot 企业版 ltsc 2024版本详细安装

目前Win 11 2024 官方精简 LTSC 版发布了。

> 什么是LTSC版本

简单来说，Win 11 LTSC版本 是微软针对企业用户推出的长期服务版。相比win11的企业版或消费者版，LTSC版 去掉了很多不必要功能和软件，系统大幅精简，同时还没有频繁的更新打扰。

正因为这些特性，LTSC 版本才深受大量普通消费者喜爱。

目前有两个win11 ltsc版本。一个是iot版本的，一个是非iot版本的。

> 下载

推荐大家在 [itellyou网站 https://next.itellyou.cn/](https://next.itellyou.cn/) 中下载Win 11 LTSC版本的ISO镜像文件。

## 安装

自行百度

我在安装的过程，多次安装失败。结果发现是其他硬盘的原因。

可以先把电脑中的其他硬盘全部取出，只保留安装win11系统的硬盘。然后再开始安装win11 ltsc 2024。


## 初次使用

安装成功后，在系统初始化界面中，推荐使用本地账户进行登录。

### Windows 11 （24H2）LTSC KMS激活（非激活工具）

1. 打开PowerShell，选择以管理员身份运行 PowerShell。
2. 输入以下命令激活系统。

```sh
slmgr -ipk M7XTQ-FN8P6-TTKYV-9D4CC-J462D
slmgr -skms kms.0t.net.cn
slmgr -ato
```

### 删除C盘中多余的文件

当系统安装好后,会发现C盘占用在50G作用，我们需要清理C盘。可以分别删除 Win 11 默认的保留空间、休眠文件。

> 删除保留空间

1. 打开PowerShell，选择以管理员身份运行 PowerShell。
2. 输入以下命令并回车即可删除保留的储存空间。

```sh
dism.exe /online /set-reservedstoragestate /state:disabled
```

> 删除休眠文件

1. 打开PowerShell，选择以管理员身份运行 PowerShell。
2. 输入以下命令并回车即可删除休眠文件。

```sh
powercfg -h off
```

完成上面的配置，可以发现C盘占用10G左右。

### 安装微软商店

微软对 Win 11 LTSC 2024 进行了大量精简工作，系统仅自带 edge 浏览器和部分的必要软件，像微软商店和常用的新版照片查看器都已被砍掉。

> 安装微软商店

1. 打开PowerShell，选择以管理员身份运行 PowerShell。
2. 输入以下命令。

```sh
wsreset –i
```

当微软商店安装好后，就可以在商店中下载照片查看器了。


### 安装完整运行库和环境

在使用 Win 11 LTSC 2024 时会担心无法稳定兼容各类生产力和游戏环境，其实这是因为没有安装完整运行库和环境的原因。

可以前往以下地址下载最新微软`.NET`运行库。

[最新微软.NET 运行库下载 https://dotnet.microsoft.com/zh-cn/download](https://dotnet.microsoft.com/zh-cn/download)

可以前往以下地址下载最新 Visual C++ 运行库

[最新微软Visual C++ 运行库下载 https://learn.microsoft.com/zh-cn/cpp/windows/latest-supported-vc-redist?view=msvc-170](https://learn.microsoft.com/zh-cn/cpp/windows/latest-supported-vc-redist?view=msvc-170)







