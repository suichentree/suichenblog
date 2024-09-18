---
title: Nginx容器笔记
date: 2024-09-18
sidebar: 'auto'
tags:
 - Nginx
---

[toc]

# Nginx容器笔记

## 下载Nginx镜像

```shell
# 下载nginx镜像
docker pull nginx
```

## 部署Nginx容器

```shell

# 创建并后台启动nginx容器
# --name nginx01 容器名称为nginx01
# -p 38081:80 主机的38081端口映射到Nginx容器的80端口
# -d 后台运行，默认不会进入容器
# nginx 镜像名，指定生成该容器的镜像
docker run --name nginx01 -p 38081:80 -d nginx

# 进入到nginx容器的终端中
docker exec -it nginx01 /bin/bash

# 查询所有容器
docker ps

```

访问nginx首页 `http://localhost:38081`。若如图所示，则表示Nginx容器部署成功。 

![nginx_20240918155812.png](../blog_img/nginx_20240918155812.png)

如果是在云服务器上部署Nginx容器，记得在云服务器的防火墙上开通38081端口。

### 设置Nginx容器数据卷

Nginx容器中有三个目录需要设置数据卷。方便日后修改。

- /etc/nginx/conf.d 目录：nginx容器的配置文件
- /usr/share/nginx/html 目录：nginx容器的网页内容目录


因此部署Nginx容器的启动命令可以修改为下面的。
```shell
docker run -d -p 38081:80 --name nginx01 -v /xxx/nginx/config:/etc/nginx/conf.d -v /xxx/to/nginx/html:/usr/share/nginx/html --privileged=true nginx

# `/xxx` 是主机的某个目录，需要自己自定义。
# --privileged=true 特权模式，该设置可以让容器对外部数据卷拥有读写等特权。
```

### 通过 Docker Compose 部署Nginx容器并设置数据卷

```shell
version: '3'
services:
    nginx:
    image: nginx
    ports:
        - 80:80
    volumes:
        - /xxx/nginx/config:/etc/nginx/conf.d
        - /xxx/to/nginx/html:/usr/share/nginx/html
```

