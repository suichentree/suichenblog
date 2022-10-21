---
title: Axios基础
date: 2019-06-12
sidebar: 'auto'
categories: 
 - 前端
tags:
 - Axios
---

# Axios基础

Axios是一个HTTP库，可以用在浏览器和node.js中。Vue推荐使用axios来完成ajax请求。

[axios官方教程](https://github.com/axios/axios)

## 1. Http请求的相关知识

> 1. Http请求报文：

Http请求报文由请求行，多个请求头，请求体组成。


**当http请求头中的Content-Type:application/x-www-form-urlencoded时，对于请求体中的数据格式为name=tom&age=12**

**当http请求头中的Content-Type:application/json时，对于请求体中的数据格式为{"name":"tom","age":12}**

**当http请求头中的Content-Type:multipart/form-data时，对于请求体中的数据格式为文件，主要用户文件上传**

```
Content-Type:application/x-www-form-urlencoded ---->  name=tom&age=12
Content-Type:application/json ---> {"name":"tom","age":12}
Content-Type:multipart/form-data ---> 主要用户文件上传
```

> 2. Http响应报文

Http响应报文由响应状态行，多个响应头，响应体组成。

```
常见响应状态码：
200 ： （OK）  服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。 
201 ： （Created）  请求成功并且服务器创建了新的资源。
304 ： （Not Modified） 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。 
400 ： （Bad Request） 服务器不理解请求的语法。
401 ： （Unauthorized） 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
403 ： （Forbidden） 服务器拒绝请求。 
404 ： （Not Found ） 服务器找不到请求的网页。
500 ： （Internal Server Error）  服务器遇到错误，无法完成请求。
```

**响应头中的Content-Type是用于描述响应体的数据格式**

> 3. 不同类似的请求及其作用

GET : get请求常用于获取数据
POST : post请求常用于添加数据
PUT ： put请求常用于更新数据
DELETE ：delete请求常用于删除数据

<h3>restful风格（REST API）的请求Api的特征：</h3>

1. 发送请求进行CRUD,是通过不同的请求来决定的。
2. 同一个请求路径，可以进行多个不同的操作
3. 请求方式会用到get/post/put/delete

```
例如： /user/1 ,对于该请求接口，若使用get请求方式调用时，是获取id=1的用户。若使用delete请求方式调用时，是删除id=1的用户。
```

## 2. axios的使用

### 1. 安装

1. CDN：`<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`
2. NPM：`$ npm install axios`

### 2. 使用aixos的写好的请求方法

```js
<script>

//引入axios(当使用npm安装的时候，cdn方式可以直接使用)
const axios = require('axios');
//或者
// import axios from "axios"

//调用get请求方法
axios.get('/user?ID=12345')
  .then(function (response) {
    //响应成功会执行
    console.log(response);
  })
  .catch(function (error) {
    //响应失败会执行
    console.log(error);
  })
  .then(function () {
    //无论响应是否成功，都会执行该方法
    console.log(ok);
  });


//调用post请求方法
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
 .then(function (response) {
    //响应成功会执行
    console.log(response);
  })
  .catch(function (error) {
    //响应失败会执行
    console.log(error);
  })
  .then(function () {
    //无论响应是否成功，都会执行该方法
    console.log(ok);
  });

</script>

```

> 1.GET请求

==GET请求传递参数(两种)==

```js
// 直接在 URL 上添加参数 ID=12345
axios.get('/user?ID=12345').then(...}).catch(...});

// 也可以通过 params 设置参数：
axios.get('/user',{params: { ID: 12345 } }).then(...}).catch(...});
```

> 2.POST请求

**POST请求传递参数**

```js
axios.post('/user', {
    firstName: 'Fred',        // 参数 firstName
    lastName: 'Flintstone'    // 参数 lastName
  }).then().catch();
  ...
  ;
```

> 3.多个请求并发执行

```js
function a() {
  return axios.get('/user/12345');
}

function b() {
  return axios.get('/user/12345/permissions');
}

axios.all([a(), b()])
  .then(axios.spread(function (acct, perms) {
    // acct,perms是两个请求返回的值
  }));
```

> 4.请求后返回的响应数据结构

```js
{
  // `data` 由服务器提供的响应
  data: {},
  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,
  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',
  // `headers` 服务器响应的头
  headers: {},
  // `config` 是为请求提供的配置信息
  config: {}
}

```

**把请求返回的响应数据打印出来**

```js
axios.get('/login')
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```


### 3. 使用aixos的自定义请求配置

```js
//默认为get请求
axios('/user/12345');

//post请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

//get请求，获取远程图片
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
}).then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });

```


## 3. axios的配置

```js
<script>
const axios = require('axios');

//配置url前缀
axios.defaults.baseURL="https://localhost:443";
//配置请求头请求类型
axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';

</script>
```

>axios允许创建axios对象实例
```js
//axios允许创建axios对象实例。来自定义axios对象
var instance = axios.create({
  baseURL:"https://xxx.xxx.com/api/",
  timeout:1000
});

```

具体配置信息
```js
{
  //`url`是请求的服务器地址
  url:'/user',
  //`method`是请求资源的方式
  method:'get'//default
  //如果`url`不是绝对地址，那么`baseURL`将会加到`url`的前面
  //当`url`是相对地址的时候，设置`baseURL`会非常的方便
  baseURL:'https://some-domain.com/api/',
  //`transformRequest`选项允许我们在请求发送到服务器之前对请求的数据做出一些改动
  //该选项只适用于以下请求方式：`put/post/patch`
  //数组里面的最后一个函数必须返回一个字符串、-一个`ArrayBuffer`或者`Stream`
  transformRequest:[function(data){
    //在这里根据自己的需求改变数据
    return data;
  }],
  //`transformResponse`选项允许我们在数据传送到`then/catch`方法之前对数据进行改动
  transformResponse:[function(data){
    //在这里根据自己的需求改变数据
    return data;
  }],
  //`headers`选项是需要被发送的自定义请求头信息
  headers: {'X-Requested-With':'XMLHttpRequest'},
  //`params`选项是要随请求一起发送的请求参数----一般链接在URL后面
  //他的类型必须是一个纯对象或者是URLSearchParams对象
  params: {
    ID:12345
  },
  //`paramsSerializer`是一个可选的函数，起作用是让参数（params）序列化
  //例如(https://www.npmjs.com/package/qs,http://api.jquery.com/jquery.param)
  paramsSerializer: function(params){
    return Qs.stringify(params,{arrayFormat:'brackets'})
  },
  //`data`选项是作为一个请求体而需要被发送的数据
  //该选项只适用于方法：`put/post/patch`
  //当没有设置`transformRequest`选项时dada必须是以下几种类型之一
  //string/plain/object/ArrayBuffer/ArrayBufferView/URLSearchParams
  //仅仅浏览器：FormData/File/Bold
  //仅node:Stream
  data {
    firstName:"Fred"
  },
  //`timeout`选项定义了请求发出的延迟毫秒数
  //如果请求花费的时间超过延迟的时间，那么请求会被终止

  timeout:1000,
  //`withCredentails`选项表明了是否是跨域请求
  
  withCredentials:false,//default
  //`adapter`适配器选项允许自定义处理请求，这会使得测试变得方便
  //返回一个promise,并提供验证返回
  adapter: function(config){
    /*..........*/
  },
  //`auth`表明HTTP基础的认证应该被使用，并提供证书
  //这会设置一个authorization头（header）,并覆盖你在header设置的Authorization头信息
  auth: {
    username:"zhangsan",
    password: "s00sdkf"
  },
  //返回数据的格式
  //其可选项是arraybuffer,blob,document,json,text,stream
  responseType:'json',//default
  //
  xsrfCookieName: 'XSRF-TOKEN',//default
  xsrfHeaderName:'X-XSRF-TOKEN',//default
  //`onUploadProgress`上传进度事件
  onUploadProgress:function(progressEvent){
    //下载进度的事件
onDownloadProgress:function(progressEvent){
}
  },
  //相应内容的最大值
  maxContentLength:2000,
  //`validateStatus`定义了是否根据http相应状态码，来resolve或者reject promise
  //如果`validateStatus`返回true(或者设置为`null`或者`undefined`),那么promise的状态将会是resolved,否则其状态就是rejected
  validateStatus:function(status){
    return status &gt;= 200 &amp;&amp; status &lt;300;//default
  },
  //`maxRedirects`定义了在nodejs中重定向的最大数量
  maxRedirects: 5,//default
  //`httpAgent/httpsAgent`定义了当发送http/https请求要用到的自定义代理
  //keeyAlive在选项中没有被默认激活
  httpAgent: new http.Agent({keeyAlive:true}),
  httpsAgent: new https.Agent({keeyAlive:true}),
  //proxy定义了主机名字和端口号，
  //`auth`表明http基本认证应该与proxy代理链接，并提供证书
  //这将会设置一个`Proxy-Authorization` header,并且会覆盖掉已经存在的`Proxy-Authorization`  header
  proxy: {
    host:'127.0.0.1',
    port: 9000,
    auth: {
      username:'skda',
      password:'radsd'
    }
  },
  //`cancelToken`定义了一个用于取消请求的cancel token
  //详见cancelation部分
  cancelToken: new cancelToken(function(cancel){
  })
}

```



## 3. axios设置请求头中的Content-Type:application/x-www-form-urlencoded

axios默认把请求头中的Content-Type设置为application/json;。但是后端常常要求的 'Content-Type':'application/x-www-form-urlencoded'

> 常见的数据格式（content-type）
```
Content-Type: application/json ： 请求体中的数据会以json字符串的形式发送到后端
Content-Type: application/x-www-form-urlencoded：请求体中的数据会以普通表单形式（键值对）发送到后端
Content-Type: multipart/form-data： 它会将请求体的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件。
```

    
>方法1:用 URLSearchParams 传递参数（代码简单，省事）

```js
let param = new URLSearchParams()
param.append('username', 'admin')
param.append('pwd', 'admin')
axios({
    method: 'post',
    url: '/api/xxx/xxx',
    data: param
})

```

**PS:注意URLSearchParams 不支持所有的浏览器，只支持主流浏览器。**