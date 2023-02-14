---
title: vue工程使用blob对象下载大文件，下载等待时间过长的问题
date: 2021-03-14
sidebar: 'auto'
categories: 
 - 前端
tags:
 - Vue
---

[toc]

## vue工程使用blob对象下载大文件，下载等待时间过长的问题

在vue工程中，通过前端页面调接口下载大文件时，若使用blob对象接受文件数据流，由于文件太大会使blob对象接受文件数据流的时间过长。从而使下载文件时间过长，而页面毫无反应的问题。

<font color="red">通过blob对象来下载文件。原理是浏览器先把文件数据缓存完，之后才弹出下载提示框下载。但是当文件太大，文件转换为blob对象的时间过长。即缓存时间过长。会导致浏览器在缓存文件数据期间。页面毫无反应。让用户以为下载有问题。</font>

<font color="red">解决方式：可以通过a标签的形式下载文件。浏览器会一边缓存一边下载。而不会出现缓存完，才显示下载提示框的问题。</font>

```js
      //通过把文件数据转换为blob对象来下载文件
      //（当下载大文件时,会等待一段时间，才会出现下载提示。原因：把文件数据转换为blob对象时间过长）
      //通过nginx来进行前后端的请求转发
      //所以接口路径为 /fileManager/file/download/
      downloadFile(fName){
        let that = this;
          axios({
              // url: 'https://ip:port/aaa/file/download/{{fileName}}',
              url: '/aaa/file/download/{{fileName}}',
              method: 'get',
              responseType: 'blob',
              headers:{ 'Content-Type': 'application/json; application/octet-stream'}
          }).then(res => {
              console.log("res",res);
              //把接口响应的文件数据转换为blob对象
              //若文件数据过大会导致转换时间过长。即浏览器下载提示框很久之后才会出现。
              const content = res.data;
              const blob = new Blob([content])
              if ('download' in document.createElement('a')) { // 非IE下载
                  const elink = document.createElement('a')
                  elink.download = fName
                  elink.style.display = 'none'
                  elink.href = URL.createObjectURL(blob)
                  document.body.appendChild(elink)
                  elink.click()
                  URL.revokeObjectURL(elink.href)  //释放URL对象
                  document.body.removeChild(elink)
              } else { // IE10+下载
                  navigator.msSaveBlob(blob,fName)
              }
          }).catch(function(error){
              console.log("upFile error",error.response);
          });
      },
      //通过a标签来下载文件
      downloadFile2(fName){
        debugger
        let alink = document.createElement("a");
        alink.download=fName; //文件名
        //href会拼接服务器的前缀
        alink.href="/aaa/file/download/{{fileName}}";
        alink.click(); //自动点击
      }
```

