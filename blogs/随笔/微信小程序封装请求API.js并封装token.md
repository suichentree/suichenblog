---
title: 微信小程序封装请求API.js并封装token
date: 2021-03-19
sidebar: 'auto'
categories: 
 - 随笔
tags:
 - 微信小程序
---


API.js-封装请求的js文件

```js
//API_BASE_URL 首域名
const API_BASE_URL = "http://localhost:9666";
// const API_BASE_URL = "https://www.xxxx.com:9090";

//内容配置1,用于表单传参
const contentType1 = "application/x-www-form-urlencoded";
//内容配置2,用于json传参，
const contentType2 = "application/json"; 

//创建header请求头对象
//若全局变量包含token,就将token写入到header中。供后台请求拦截器拦截读取校验token
function createHeader(contentType){
  let h={};
  if(getApp().globalData.token != null){
    h['token'] = getApp().globalData.token;
  }
  h['Content-Type'] =contentType;
  return h;
}

//封装request方法
const request = (url, method, data,contentType) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: API_BASE_URL + url,
      method: method,
      data: data,
      header: createHeader(contentType),
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete() {
        // 加载完成
      }
    })
  })
}

module.exports = {
  //微信登录
  xxxx: data => request('/api/applet/xxx/xxx', 'POST', data, contentType1),
}

```

其他页面js使用：

```js
//导入API对象
const API = require('../../utils/api')
// pages/exam/exam.js
Page({
  data: {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that =this;
     //获取测试菜单
    API.xxxx({user:"xxx",password:"xxxx"})
    .then(res=>{
      console.log(res);
    }).catch(e=>{
      console.log(e);
    });
  }
  
})
```