---
title: Linux软件包管理器
date: 2025-03-11
sidebar: 'auto'
categories: 
 - 系统
tags:
 - Linux
---

[toc]

# Linux软件包管理器

> Linux 的软件包管理器 往往是系统的核心组件。主要作用如下
- 安装、更新、卸载软件
- 自动解决依赖关系
- 管理软件版本和系统补丁

不同的Linux 发行版使用的包管理器都不相同。

## Debian 系列的软件包管理器

Debian 系列的软件包管理器 主要应用于 Debian 派系下的 Debian、Ubuntu、Linux mint、elementary OS 等 Linux 发行版中。

### Dpkg 

dpkg 是 Debian Packager 的简写。为 “Debian” 专门开发的软件包管理系统，方便软件的安装、更新及移除。

dpkg 是 Debian 和基于 Debian 派系的Linux系统的软件包管理器的基础，用于安装、卸载、查询和管理 `.deb` 格式的软件包。

dpkg 本身是一个底层的工具,所以需要搭配前端工具使用。如APT等。

所有源自 Debian 的 Linux 发行版都使用 dpkg 作为包管理系统，例如：Knoppix、Debian、Ubuntu、Linux mint 等。

### APT 

APT（Advanced Packaging Tool,高级打包工具）是 dpkg 的前端管理工具。

APT 可以快速、实用、高效的安装/更新软件包，并且可以自动管理软件包的关联文件和维护软件包已有的配置文件。


## RedHat 系列的软件包管理器

RedHat 系列的软件包管理器 主要应用在 Red Hat 派系下的 Fedora、RHEL、SUSE 等 Linux 发行版中。

### RPM 

RPM 是 RedHat Package Manage 的简写，是一种由红帽公司开发的软件包管理方式。在 Linux 中通过以 .rmp 为扩展名的文件对应用程序包进行管理。

RPM 文件带有 .rpm 扩展名，使用 RPM 我们可以方便的进行软件的安装、查询、卸载、升级、校验等工作。

注意：RPM 是一个底层软件包管理器，需要搭配前端工具使用。

### YUM 

YUM 是一个用来便捷管理 RPM 软件包的前端工具。

YUM 能够从指定的服务器自动下载 RPM 包并且安装，可以自动处理软件包的依赖关系，并且一次安装所有依赖的包，无须繁琐地一次次下载、安装。

注意：YUM 是在 RPM 的基础上对软件包进行管理，实现了 RPM 软件包管理器在功能上的扩展。因此 YUM 必须依赖于 RPM，YUM 是不能脱离 RPM 而独立运行的。

### DNF 

DFN 是目前新一代的 RPM 软件包管理器。首次出现在 Fedora 18 这个 Linux 发行版中。而最近，它取代了 YUM，正式成为 Fedora 22 的软件包管理器。



