---
title: nginx中的try_files 和 alias,root 
date: 2021-07-12
sidebar: 'auto'
categories: 
 - 前端
 - 随笔
tags:
 - Nginx
---

## nginx中的try_files

1. try_files会按指定的顺序查找存在的文件，并对第一个找到的文件进行请求处理；
2. try_files也可以对请求进行重定向

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

当用户请求 `http://localhost/example` 时，这里的 `$uri` 就是 /example。 try_files 会到硬盘里尝试找这个文件。如果存在名为 `/$root/example`（其中 $root 是项目代码安装目录）的文件，就直接把这个文件的内容发送给用户。 

若目录中没有叫 example 的文件。然后就看 `$uri/`，增加了一个 /，也就是看有没有名为 `/$root/example/` 的目录。 找不到就会尝试最后一个选项 /index.html，此时nginx 发起一个 HTTP 请求到`http://localhost/index.html`上。 


```nginx
loaction / {
    try_files $uri @apache;  #重定向到@apache的请求上
}

loaction @apache{
    proxy_pass http://127.0.0.1:88
}
```

当try_files找不到指定文件时，可以让其实现请求重定向的功能


## nginx中的alias,root

> ①：root  

root的处理结果是：root路径 ＋ location路径

```nginx
location /request_path/image/ {
    root /local_path/image/;
}
```

当客户端请求 /request_path/image/cat.png 的时候，Nginx把请求映射为/local_path/image/request_path/image/cat.png。



> ②：alias

<font color="red">

1. alias后面必须要用`/`结束，否则会找不到文件的。而root则可有可无。
2. alias只能位于location块

</font>

alias的处理结果是：使用alias路径替换location路径

```nginx
location /request_path/image/ {
    alias /local_path/image/;
}
```

当客户端请求 /request_path/image/cat.png 的时候，Nginx把请求映射为/local_path/image/cat.png。
