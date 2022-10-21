---
title: vue工程部署的各种情况与问题
date: 2021-07-12
sidebar: 'auto'
categories: 
 - 前端
tags:
 - Vue
---

## vue工程中的publicPath

> 1. 在工程中publicPath的默认值为"/"

默认情况下，vue工程打包后是被部署在一个域名的根路径上，例如 https://www.my-app.com/。

如果部署在一个子路径上，你就需要用publicPath去指定这个子路径。例如部署在 https://www.my-app.com/my-app/。 则需要设置 publicPath 为 /my-app/


<font color="red">当publicPath为/my-app/时，就可以通过http://lcoalhost:8080/my-app/main.js 直接访问到静态资源路径。</font>


> 2. publicPath也可以设置为空字符串 ('') 或是相对路径 `./`

当publicPath设置为相对路径的时候，此时工程内的css,js,图片等资源都会被链接为相对路径，这样打出来的dist包可以被部署在任意路径。

<font color="red">publicPath设置成相对路径后，是相对于打包之后的index.html的。例如：设置 publicPath: './dist/' ，则打包后js的引用路径为 ./dist/main.js </font>


```
相对路径的 publicPath 有一些使用上的限制。在以下情况下，应当避免使用:
1. 当使用基于 HTML5 history.pushState 的路由时；
2. 当使用 pages 选项构建多页面应用时。
```

## vue-router中hash模式和history模式的区别

hash模式和history模式最直观的区别就是在hash模式下的地址栏里的URL夹杂着#号 ，而history模式下没有#号。

```js
const router = new VueRouter({
  // mode: 'history',  //去掉url中的#
  routes
})
```



> 1. hash模式

例如： `http://www.aaa.com/#/hello` 这个链接中，hash的值为 #/hello。

①它的特点在于：<font color="red">hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中</font>，因此改变 hash 不会重新向服务端发送请求。而是会在vue中会触发页面的修改。

②hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如 `http://www.aaa.com/#/hello` 只有 `http://www.aaa.com/` 会被包含在请求中 ，对于nginx来说就相当于是根路径'/'的请求。 


> 2. history模式

例如：`http://www.aaa.com/hello` 当页面重新刷新的时候，浏览器进行/hello的资源请求。如果Web服务器（nginx）中没有/hello的请求映射，则页面就会报404错误。


#### 对于history模式下页面刷新404的问题？

<font color="red">Vue是属于单页应用（SPA）,不管工程中有多少页面，打包后都只会产出一个index.html。路由本质上是通过JS来执行视图切换的。</font>

产生原因：进入到子路由刷新页面时，在history模式下web服务器（nginx）没有相对应的请求映射。此时页面会出现404。

解决方法：如果当前URL没匹配到任何资源，则直接重定向到 index.html，把路由交由index.html处理。

```nginx
server {
  listen  80;
  server_name  www.aaa.com;

  # 若在根路径下访问工程，则用这个
  location / {
    index  /data/dist/index.html;
    try_files $uri $uri/ /index.html;
  }

}
```

## hash模式部署到nginx上

<font color="red">hash模式下不用担心刷新404问题。</font>

1. 工程中的publicPath 改为 `./`相对路径 。在hash模式下直接打包的话，会找不到css、js和图片资源。
2. 设置mode为hash模式（默认）
3. nginx配置

```nginx
server {
       listen       9099;
       server_name  localhost;

	   location /chronic-pay/ {
		    alias C:/xxx/dist/;
       }

    }
```

4. 访问链接：`http://localhost:9099/chronic-pay/#/xxx`


## vue项目访问链接中携带一个#会对开发造成一定的影响

1、微信三方登录回调地址，有#号时，接收不到code参数。

2、微信H5支付的回调地址，不允许有#。

3、App分享，处理特殊字符时，可能会对#进行编译。


## history模式部署到nginx上

<font color="red">根据访问链接的不同要改不同的地方</font>

> ①若访问链接为：http://localhost:9099/chronic-pay/xxx

1. 首先判断打包后的工程是否通过某个域名下的子路径访问。例如：chronic-pay子路径
2. 若通过子路径访问页面，则要在vue-router中添加history模式，添加base路径

```js
const router = new VueRouter({
  mode: 'history',  //history模式
  base: '/chronic-pay/', //提供的可选的base文件路径
  routes
})
```

3. 把工程中vue.config.js文件的publicPath 改为子路径 `/chronic-pay/` 。

4. 修改nginx配置

```nginx
server {
       listen       9099;
       server_name  localhost;

	   location /chronic-pay/ {
            ## 刷新后当URL没匹配到任何资源，则直接重定向到 /chronic-pay/index.html
            try_files $uri $uri/ /chronic-pay/index.html;
            
            alias C:/xxx/dist/;
       }

    }
```

> ②若访问链接为：http://localhost:9099/xxx

1. 上面的链接就是直接通过根路径访问页面
2. 在vue-router中添加history模式，添加base路径

```js
const router = new VueRouter({
  mode: 'history',  //history模式
  base: '/', //提供的可选的base文件路径,根路径访问直接写为 /
  routes
})
```

3. 把工程中vue.config.js文件的publicPath 改为子路径 `/` 。

4. 修改nginx配置

```nginx
server {
       listen       9099;
       server_name  localhost;

	   location /{
            ## 刷新后当URL没匹配到任何资源，则直接重定向到 /index.html
            try_files $uri $uri/ /index.html;
            
            alias C:/xxx/dist/;
       }

    }
```