---
title: unraid笔记7-虚拟机
date: 2023-06-14
sidebar: 'auto'
categories: 
 - NAS
tags:
 - unraid
---

[toc]

# unraid笔记7-虚拟机

unraid提供丰富的虚拟机模板可供创建。

![unraid_20230614001912.png](../blog_img/unraid_20230614001912.png)


## win10虚拟机

### 准备

[msdn我告诉你](https://msdn.itellyou.cn/)

1. 先在msdn我告诉你网站上下载win10镜像。所选win10镜像：cn_windows_10_enterprise_ltsc_2019_x64_dvd.iso
2. 把镜像上传到isos目录中。
3. 在unraid虚拟机管理器中下载win10虚拟总线驱动程序。会自动下载到isos目录中。
![unraid_20230622232715.png](../blog_img/unraid_20230622232715.png)

### 开始安装

1. 进入到unraid 的虚拟机界面，点击创建虚拟机。
2. 选择win10虚拟机模板
3. 虚拟机配置如图，内存4g以上，图片中的两个iso路径分别对应win10镜像和win10虚拟总线驱动。
![unraid_20230622210425.png](../blog_img/unraid_20230622210425.png)
4. 创建虚拟机后进入 VNC 查看显示画面。
![unraid_20230622233547.png](../blog_img/unraid_20230622233547.png)
5. 一路点击下一步。选择自定义安装。选择系统安装的位置。
![unraid_20230622233632.png](../blog_img/unraid_20230622233632.png)
![unraid_20230622233721.png](../blog_img/unraid_20230622233721.png)
6. 等待安装完成。然后开始进行账户密码等设置。
7. 登录win10
![unraid_20230622234056.png](../blog_img/unraid_20230622234056.png)
8. 此时的win10系统有些驱动都没有，无法连接网络等。需要安装驱动。
![unraid_20230622234346.png](../blog_img/unraid_20230622234346.png)
9. 在此处双击之前导入的win10虚拟总线驱动程序。运行该驱动程序，安装驱动。
![unraid_20230622234301.png](../blog_img/unraid_20230622234301.png)
![unraid_20230622234557.png](../blog_img/unraid_20230622234557.png)
10. 重启虚拟机，开始使用win10把。

### 虚拟机win10访问UNRAID共享文件夹，及其他网络共享

虚拟机win10需要设置一下，才能访问访问UNRAID共享文件夹。

1. 按window+R键打开运行 - > 在运行中输入“gpedit.msc”来启动本地组策略编辑器。
2. 计算机配置->管理模板->网络->Lanman工作站->启用不安全的来宾登录->已启用。
![unraid_20230623193855.png](../blog_img/unraid_20230623193855.png)

3. 然后再访问UNRAID共享文件夹即可。
![unraid_20230623194750.png](../blog_img/unraid_20230623194750.png)


## win10虚拟机-荒野无灯版

为什么创建win10虚拟机？
1. 用于没有windows环境时执行一些轻量级的应用，比如在NAS和Linux服务器上运行QQ等
2. 用于运行需要长时间（比如7x24小时）运行的windows应用，比如运行购票软件, bt客户端等。

使用的镜像文件是荒野无灯大佬的精简版windows10系统镜像，文件名为win10.qcow2

win10.qcow2镜像：
* 文件大小： 8.4 GiB
* 运行时内存占用： ~ 600 MB
* 运行时系统磁盘占用：7.9 GiB 
* 系统是英文的（不可添加中文语言）
* 中文字体已内置
* 非unicode程序的编码已调整为cp936 (中国)
* VC Redist 运行时库已安装
* .NET 4.0 运行时已安装
* 由于该镜像过度精简，qemu guest agent无法安装
* 输入法暂时默认是英文的，得手动点击切换


### 开始安装

1. 先把win10.qcow2上传到isos共享文件夹中。
2. 进入到unraid 的虚拟机界面，创建虚拟机。
3. 选择win10虚拟机模板
4. 虚拟机配置如图，内存4g左右，主要磁盘选择镜像文件所在路径。注意磁盘总线选择virtio 类型。
![unraid_20230614003550.png](../blog_img/unraid_20230614003550.png)
5. 其他配置默认即可。注意网卡的类型选择为virtio-net或者virbr0，建议virbr0。
![unraid_20230614005521.png](../blog_img/unraid_20230614005521.png)
6. 点击安装。安装好后，点击图标进行vnc remote远程桌面。
7. 这个win10镜像内置了一些工具。
![unraid_20230614005657.png](../blog_img/unraid_20230614005657.png)


## 安装群晖虚拟机：

1. 虚拟机界面-》添加虚拟机-》选择linux虚拟机
2. 进行虚拟机配置。
![unraid_20230610200824.png](../blog_img/unraid_20230610200824.png)

3. 主要硬盘（第一块硬盘）配置：路径选择引导文件arpl.img的位置。总线选择为usb,启动顺序改为1.
![unraid_20230610201630.png](../blog_img/unraid_20230610201630.png)

4. 第二块硬盘配置：第二块硬盘手动选择一个文件夹作为虚拟硬盘。并给虚拟硬盘30g空间。硬盘类型要选择raw,不能选择qcow2。
![unraid_20230611020342.png](../blog_img/unraid_20230611020342.png)

磁盘类型qcow2的意思是动态空间，磁盘的空间会随着数据的增长而增长。
磁盘类型raw的意思是固定空间，硬盘空间大小是固定的。

<font color="red">
注意：群晖在安装的时候必须要有一个固定大小的硬盘用来初始化系统。所以第二块硬盘的空间必须要大。太小了会导致系统安装失败（提示格式化硬盘失败）。所以第二块硬盘最好就是一个大空间的虚拟硬盘即可。
</font>

5. 上面设置完了后，下面的其他设置默认即可。然后点击创建按钮。
6. 当虚拟机创建好后，重新编辑虚拟机设置，再右上角选择表单视图，然后更改网卡。
![unraid_20230102028.png](../blog_img/unraid_20230102028.png)
7. 更改完后，重启虚拟机。点击虚拟机图标 选择VNC远程操控。
![unraid_202306102035.png](../blog_img/unraid_202306102035.png)

8. 浏览器访问ip地址，就可以进入到引导配置界面
![unraid_20230610204000.png](../blog_img/unraid_20230610204000.png)
    1. 点击choose a model，选择ds920+版本
    2. 点击 choose a build number ,选择42962固件
    3. 点击 choose a serial number,选择随机生成序列号
9. 此时会多处一些选择。
    ![unraid_20230610204207.png](../blog_img/unraid_20230610204207.png)
    1. 点击 build the loader。开始编译引导程序。
    2. 成功编译完引导程序。会出现boot the loader选择，点击它。
    3. 最后会显示这个界面，表示群晖引导成功。
![unraid_20230610203313.png](../blog_img/unraid_20230610203313.png)

10.  输入界面上的ip地址，进入群晖安装界面。
![unraid_202306102049.png](../blog_img/unraid_202306102049.png)
11.  手动上传DSM_DS920+_42962.pat文件。该文件可以在群晖官网上下载。上传后点击下一步。
12.  之后格式化硬盘，自动安装，等待即可。
![unraid_202306102051.png](../blog_img/unraid_202306102051.png)


## ubuntu虚拟机

1. 先把ubuntu的iso镜像文件上传到isos共享文件夹中。
2. 进入到虚拟机界面，创建虚拟机。
3. 选择ubuntu虚拟机模板
4. 虚拟机配置如图所示。其余配置默认即可。注意：硬盘类型要选择raw，硬盘容量30g左右。
![unraid_20230620210946.png](../blog_img/unraid_20230620210946.png)
5. 虚拟机启动后，选择VNC远程操控。可以看到系统安装界面。一路点击下一步即可。
![unraid_20230620202713.png](../blog_img/unraid_20230620202713.png)

### ubuntu挂载unraid共享文件夹

共享文件夹是smb文件协议的。

1. ubuntu安装smb客户端工具

```
apt install smbclient
```

2. 查看要访问的ip地址下的共享目录。

```
语法：smbclient -L [IP地址] -U [用户名]

smbclient -L 192.168.1.167 -U rootadmin
```

3. 使用mount挂载共享文件夹，就能像访问本地文件一样访问

```
语法：mount -o username=[账号],password=[密码] //[服务器IP]/[共享目录] /[挂载点]

mount -o username=rootadmin,password=****** //192.168.1.167/download /home/unraidshare/download
```