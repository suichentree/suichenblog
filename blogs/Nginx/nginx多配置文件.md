---
title: nginx多配置文件
date: 2023-02-13
sidebar: 'auto'
categories: 
 - 服务器
tags:
 - Nginx
---

[toc]

## nginx多配置文件-include命令

在主配置文件nginx.conf中可以使用include命令。来加载其他nginx子配置文件，从而简化主配置文件nginx.conf。

1. include命令可以用在配置文件中的任何地方。
2. include指向的文件路径可以是绝对路径，也可以是相对路径，相对路径以主配置文件nginx.conf为基准，同时可以使用通配符。

```conf
# 绝对路径
include /etc/conf/nginx.conf
# 相对路径
include port/80.conf
# 通配符
include *.conf
```

例子：

主配置文件
```conf
# 主配置文件
http {
    # 重点,子配置文件放置路径
    # conf.d目录下的都是子配置文件
    include conf.d/*.conf;

    server {
        listen 80;
        charset     utf-8;
        client_max_body_size 75M;   # adjust to taste
        location / {
        }
    }

}
```

负载均衡配置文件。conf.d/upstream.conf
```conf
upstream aaa-server {
    server 10.87.8.115:8080;
    server 10.87.8.116:8080;
}
upstream bbb-server {
    server 10.87.8.7:8080; 
    server 10.87.8.8:8080;
}
```

a项目配置文件。conf.d/aaa.conf
```conf
server {
    listen 8000;
    location /test/a/ {
        proxy_pass http://aaa-server;
    }
}
```

b项目配置文件。conf.d/bbb.conf
```conf
server {
    listen 9000;
    location /test/b/ {
        proxy_pass http://bbb-server;
    }
}
```
