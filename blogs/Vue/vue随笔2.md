---
title: vue项目直接点击dist文件夹下面的index.html文件使项目在浏览器显示。不通过nginx部署的方式
date: 2021-03-15
sidebar: 'auto'
categories:
 - 随笔
---



## vue项目直接点击dist文件夹下面的index.html文件使项目在浏览器显示。不通过nginx部署的方式？

vue项目直接点击dist文件夹下面的index.html文件使项目在浏览器显示，需修改两个文件：

1. 对于vue-cli4的vue工程,直接在工程根目录创建vue.config.js

```js
module.exports = {
    publicPath: './',
}
```

2. 对于vue工程的路由模式修改为hash

```js
const router = new VueRouter({
  mode: 'hash',  //默认为hash
  routes
})

```

做完以上两点，即可直接点击dist文件夹下面的index.html文件使项目在浏览器显示。

<font color="red">PS:可以直接把打包后的dist目录文件。复制到springboot后台项目的main/resources/static/下。当运行后台项目时，也可以通过浏览器直接访问前台页面.例如：http://localhost/index.html可以直接访问到static/index.html文件</font>
