---
title: Nginx负载均衡配置-upstream模块
date: 2023-02-13
sidebar: 'auto'
categories: 
 - 服务器
tags:
 - Nginx
---

[toc]

## Nginx负载均衡配置-upstream模块

nginx的负载均衡需要配置upstream模块。

```shell

http {
    upstream test-servers{
        server 127.0.0.1:8081;
        server 127.0.0.2:8082;
    }

    server {
        listen 80;
        location /test/ {
            proxy_pass http://test-servers;
        }
    }
}

```

## upstream模块的各种调度算法

调度算法一般分为两类：
1. 静态调度算法，即负载均衡器根据自身设定的规则进行分配，不需要考虑后端节点服务器的情。
2. 动态调度算法，即负载均衡器会根据后端节点的当前状态来决定是否分发请求。

### 1 轮询

nginx默认使用的调度算法，静态调度算法。把客户端的请求逐一分配到不同的后端节点服务器，这相当于 LVS 中的 rr 算法，如果后端节点服务器宕机。宕机的服务器会自动从节点服务器池中剔除，以便客户端的用户访问不受影响。新的请求会分配给正常的服务器。

```shell
upstream test-servers{
    server 127.0.0.1:8081;
    server 127.0.0.2:8082;
}
```

### 2 权重轮询

静态调度算法。在轮循算法的基础上加上权重，即为权重轮循算法，当使用该算法时，权重和用户访问成正比，权重值越大，被转发的请求也就越多。可以根据服务器的配置和性能指定权重值大小，有效解决新旧服务器性能不均带来的请求分配问题。

```shell
upstream test-servers{
    server 127.0.0.1:8081 weight=1;
    server 127.0.0.2:8082 weight=2;
}
```

### 3 ip_hash算法

ip_hash是静态调度算法，每个请求按客户端 IP 的 hash 结果分配，当新的请求到达时，先将其客户端IP通过哈希算法哈希出一个值，在随后的客户端请求中，客户 IP 的哈希值只要相同，就会被分配至同一台服务器，该调度算法可以解决动态网页的 session 共享问题，但有时会导致请求分配不均，即无法保证 1:1 的负载均衡，因为在国内大多数公司都是 NAT 上网模式，多个客户端会对应一个外部 IP，所以，这些客户端都会被分配到同一节点服务器，从而导致请求分配不均。

```shell
upstream test-servers{
    ip_hash;
    server 127.0.0.1:8081;
    server 127.0.0.2:8082;
}
```

### 4 最小连接数

least_conn是动态调度算法，会根据后端节点的连接数来决定分配情况，哪个机器连接数少就分发。

```shell
upstream test-servers{
    least_conn;
    server 127.0.0.1:8081;
    server 127.0.0.2:8082;
}
```

### 5 最短响应时间

最短响应时间（fair）调度算法是动态调度算法，会根据后端节点服务器的响应时间来分配请求，响应时间端的优先分配。这是更加智能的调度算法。此种算法可以依据页面大小和加载时间长短只能地进行负载均衡，也就是根据后端服务器的响应时间来分配请求，响应时间短的优先分配。Nginx 本身是不支持 fair 调度算法的，如果需要使用这种调度算法，必须下载 Nginx 的相关模块 upstream_fair。

```shell
upstream test-servers{
    fair;
    server 127.0.0.1:8081;
    server 127.0.0.2:8082;
}
```

### 6 url_hash算法

url_hash算法是动态调度算法，按访问 URL 的 hash 结果来分配请求，使每个 URL 定向到同一个后端服务器，可以进一步提高后端缓存服务器的效率命中率。（多用于后端服务器为缓存时的场景下）Nginx 本身是不支持 rul_hash的，如果需要使用这种调度算法，必须安装 Nginx 的hash 模块软件包。

```shell
upstream test-servers{
    hash $request_uri;
    hash_method crc32;
    server 127.0.0.1:8081;
    server 127.0.0.2:8082;
}
```

## upstream名称带下划线 请求转发报400错误问题

参考链接：[https://mp.weixin.qq.com/s/A7j4lGshzfg2quE0Tzz8lQ](https://mp.weixin.qq.com/s/A7j4lGshzfg2quE0Tzz8lQ)

问题：当nginx配置文件中 upstream的名称带有下划线"_"时，nginx请求转发会直接报400错误。

原因：nginx进行请求转发时，无法识别带有下划线"_"的配置参数。

解决方式：将下划线换个横线。或者在location模块中加上配置`proxy_set_header HOST $host`

分析原因：

新版本的springboot内嵌了新版本的tomcat。​新版本的tomcat会对请求头进行校验，旧版本没有校验。而nginx会默认把upstream的名称作为Host头部的内容。而加上配置`proxy_set_header HOST $host`，nginx在转发htp请求的时候会加上实际的Host请求头。

