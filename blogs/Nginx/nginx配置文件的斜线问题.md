---
title: 关于Nginx配置文件中的斜线(/)问题
date: 2023-02-14
sidebar: 'auto'
categories: 
 - 服务器
tags:
 - Nginx
---

[toc]

## 关于Nginx配置文件中的斜线(/)问题

在nginx配置文件中 location 和 proxy_pass加不加斜线/，最终的效果是不一样的。

> 比如说，前端服务访问URL地址是：`http://localhost:8080/elecapi/test/home/getInfo`，根据关键词elecapi实现请求转发到后台接口

1. location不加斜线、proxy_pass不加斜线

```js
location /elecapi {
    proxy_pass http://192.168.0.1:13314;
}
实际访问地址：http://192.168.0.1:13314/elecapi/test/home/getInfo
```

2. location加斜线、proxy_pass不加斜线

```js
location /elecapi/ {
    proxy_pass http://192.168.0.1:13314;
}
实际访问地址：http://192.168.0.1:13314/elecapi/test/home/getInfo
```

3. location不加斜线、proxy_pass加斜线

```js
location /elecapi {
    proxy_pass http://192.168.0.1:13314/;
}
实际访问地址：http://192.168.0.1:13314/test/home/getInfo
```

4. location加斜线、proxy_pass加斜线

```js
location /elecapi/ {
    proxy_pass http://192.168.0.1:13314/;
}
实际访问地址：http://192.168.0.1:13314/test/home/getInfo
```

总结：
1. 当proxy_pass 转发地址最后一个字符不是斜线/的时候。最终地址 = 转发地址 + localtion部分 + 访问URL地址（去除localtion部分）
2. 当proxy_pass 转发地址最后一个字符是斜线/的时候。最终的地址 = 转发地址 + 访问URL地址（去除localtion部分）
3. 通俗的讲，当加上斜线/的时候，最终的转发地址会去除localtion部分。
PS；本示例中的localtion部分为 /elecapi。访问URL地址为/test/home/getInfo
