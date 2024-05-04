---
title: Http请求笔记
date: 2024-03-30
sidebar: 'auto'
categories: 
 - 随笔
---

[toc]

# Http请求笔记

GET请求没有请求体。因此GET请求的请求参数是在请求路径上的。可以在浏览器的地址栏上看到GET请求的请求参数。是以键值对字符串的格式展示。

POST请求有请求体。因此POST请求的请求参数是可以放到请求路径或者请求体中的。

另外，如果是表单数据和JSON数据，那么这两种数据都是存放在请求体中的。

## content-type

> 什么是Content-Type？

Content-Type是HTTP协议中的一个请求字段，用于指示请求或响应中传输数据的类型。

> 为什么使用Content-Type？

在Http请求中，通过设置Content-Type，发送方可以告知接受方如何解析和处理返回的数据，而接受方可以根据Content-Type来选择合适的方式来处理接收到的数据。

> 如果没有Content-Type的话，会引发什么问题？

如果请求或响应中没有正确设置Content-Type，可能会引发以下问题:
- 数据解析错误：接收方无法准确地解析数据，因为没有明确指定数据的格式。
- 乱码问题：如果没有指定数据的字符集编码格式，接收方可能无法正确地解码数据，导致数据显示为乱码。
- 安全问题：Content-Type还可以用于安全机制，如防止跨站脚本攻击（XSS）。

> Content-Type的常见类型有哪些？

常见的Content-Type类型包括

```js
// 应用数据格式类型
"application/x-www-form-urlencoded"     // 表单默认格式
"application/json"                      // JSON数据格式
"application/octet-stream"              // 二进制流格式
"application/xml"                       // XML格式
"application/pdf"                       // PDF格式

//表单文件上传格式
"multipart/form-data"                    

//图片格式类型
"image/bmp"                             // BMP图片格式
"image/gif"                             // GIF图片格式
"image/jpeg"                            // JPEG图片格式
"image/png"                             // PND图片格式

//音频视频格式
"audio/mp3"
"video/mp4"

//文件格式类型
"text/html"                         // HTML格式
"text/plain"                        // 纯文本格式
"text/xml"                          // XML格式
```


① "application/x-www-form-urlencoded" 格式

这个格式就是form表单数据格式。当请求方向接收方发送form表单数据的时候，Content-Type类型设置为"application/x-www-form-urlencoded" 格式即可。

② "application/json"  格式

这个格式就是json数据格式。当请求方向接收方发送json数据的时候，Content-Type类型设置为"application/json" 格式即可。

③ "multipart/form-data" 格式

当请求方向接收方发送文件的二进制数据的时候，Content-Type类型设置为"multipart/form-data" 格式即可。