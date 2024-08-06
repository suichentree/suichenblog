---
title: Python使用Requests库笔记
date: 2024-08-02
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
---

[toc]

# Python使用Requests库笔记

Requests 是一个常用的第三方 HTTP 请求库，可以方便地发送 HTTP 请求，并获取响应结果。

Requests 请求库比 urllib 请求库更简洁。

## 安装

```py
pip install requests  
```

## GET请求

```py
import requests
# 请求参数
payload = {'key1': 'value1', 'key2': ['value2', 'value3']}
# 发送get请求，并携带请求参数
response = requests.get("http://httpbin.org/get", params=payload)
print("response = ",response)
print("response 转换为json类型数据 = ",response.json())
print("response 中请求路径URL = ",response.url)
print("response 中响应体content = ",response.content)
print("response 中响应内容text = ",response.text)

## 运行结果
# response =  <Response [200]>
# response 转换为json类型数据 =  {'args': {'key1': 'value1', 'key2': ['value2', 'value3']}, 'headers': {'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate', 'Host': 'httpbin.org', 'User-Agent': 'python-requests/2.32.3', 'X-Amzn-Trace-Id': 'Root=1-66b19f73-6b4eb9a1255a34791a9f9088'}, 'origin': '116.23.30.224', 'url': 'http://httpbin.org/get?key1=value1&key2=value2&key2=value3'}
# response 中请求路径URL =  http://httpbin.org/get?key1=value1&key2=value2&key2=value3
# response 中响应体content =  b'{\n  "args": {\n    "key1": "value1", \n    "key2": [\n      "value2", \n      "value3"\n    ]\n  }, \n  "headers": {\n    "Accept": "*/*", \n    "Accept-Encoding": "gzip, deflate", \n    "Host": "httpbin.org", \n    "User-Agent": "python-requests/2.32.3", \n    "X-Amzn-Trace-Id": "Root=1-66b19f73-6b4eb9a1255a34791a9f9088"\n  }, \n  "origin": "116.23.30.224", \n  "url": "http://httpbin.org/get?key1=value1&key2=value2&key2=value3"\n}\n'
# response 中响应内容text =  {
#   "args": {
#     "key1": "value1", 
#     "key2": [
#       "value2", 
#       "value3"
#     ]
#   }, 
#   "headers": {
#     "Accept": "*/*", 
#     "Accept-Encoding": "gzip, deflate", 
#     "Host": "httpbin.org", 
#     "User-Agent": "python-requests/2.32.3", 
#     "X-Amzn-Trace-Id": "Root=1-66b19f73-6b4eb9a1255a34791a9f9088"
#   }, 
#   "origin": "116.23.30.224", 
#   "url": "http://httpbin.org/get?key1=value1&key2=value2&key2=value3"
# }
```

可以看到返回的响应结果response是一个Response类型的对象。

### GET请求传参

```py
import requests
# 请求参数
payload = {'key1': 'value1', 'key2': ['value2', 'value3']}
# 发送get请求，并携带请求参数
response = requests.get("http://httpbin.org/get", params=payload)
print("response 中请求路径URL = ",response.url)

## 运行结果
# response 中请求路径URL =  http://httpbin.org/get?key1=value1&key2=value2&key2=value3

```

### 响应内容

拿到响应对象后，我们可以读取响应对象中的响应内容。

text属性存储响应内容。

```py
import requests
response = requests.get("http://www.baidu.com")
print("response 中响应内容text = ",response.text)
```

### json响应内容

Requests 中也有一个内置的 JSON 解码器，助你处理 JSON 数据。

如果响应内容的格式不是json格式的，那么json()方法会抛出异常。

```py
import requests
response = requests.get("http://www.baidu.com")
print("response 转换为json类型数据 = ",response.json())
```

### 请求头

Requests发送请求的时候，可以自定义设置请求头。

```py
import requests
response = requests.get("http://www.baidu.com",headers = {'user-agent': 'xxx/xxxx'})
print("response 中响应内容text = ",response.text)
```

注意：
- 如果被重定向到别的主机，那么自定义的 header 就会被删除。
- 如果被重定向到别的主机，那么自定义的 header 就会被覆盖。
- 所有的 header 值必须是 string、bytestring 或者 unicode格式。

### 响应状态码

当发送请求后，响应对象中包含响应状态码。我们可以通过响应状态码来判断请求是否成功。

```py
import requests
response = requests.get('http://httpbin.org/get')
print("response 中的响应状态码 = ",response.status_code)

# 运行结果
# response 中的响应状态码 =  200
```

### 根据响应状态码抛出响应异常

如果请求响应失败(例如一个 4XX 客户端错误，或者 5XX 服务器错误响应)，我们可以通过 Response.raise_for_status() 来抛出响应异常信息。

```py
import requests
response = requests.get('http://httpbin.org/status/404')
print("response 中的响应状态码 = ",response.status_code)
response.raise_for_status()

# 运行结果
# response 中的响应状态码 =  404
# Traceback (most recent call last):
#   File "C:\Users\18271\Desktop\xdj_jieyoubao_gui\test\test03.py", line 4, in <module>
#     response.raise_for_status()
#   File "C:\Users\18271\Desktop\xdj_jieyoubao_gui\.venv\Lib\site-packages\requests\models.py", line 1024, in raise_for_status
#     raise HTTPError(http_error_msg, response=self)
# requests.exceptions.HTTPError: 404 Client Error: NOT FOUND for url: http://httpbin.org/status/404

```

如果一个请求响应成功。当我们调用 raise_for_status() 时，不会抛出异常,方法返回值为None。

```py
import requests
response = requests.get('http://httpbin.org/get')
print("response 中的响应状态码 = ",response.status_code)
print("抛出响应的异常 = ",response.raise_for_status())

# 运行结果
# response 中的响应状态码 =  200
# 抛出响应的异常 =  None
```

### Cookie

> 获取响应中的cookie

```py
import requests
response = requests.get('http://example.com/some/cookie/setting/url')
print("response 中的cookie = ",response.cookies)
```

> 发送请求时，携带cookie

```py
import requests
response = requests.get('http://httpbin.org/cookies',cookies={"xxx":"xxx"})
print("response 响应内容 = ",response.text)
# 运行结果
# response 响应内容 =  {
#   "cookies": {
#     "xxx": "xxx"
#   }
# }
```

### 设置超时时间

设置 requests 在经过以 timeout 参数设定的秒数时间之后停止等待响应。

```py
import requests
# 设置超时时间为1秒
response = requests.get('http://github.com', timeout=1)
print("response 响应内容 = ",response.text)
```

注意超时时间仅仅与请求与响应的连接过程有关。当响应的数据过大的时候，超时时间不会影响到响应数据的下载。

准确的说，超时时间是指服务器在 timeout 秒内没有接收到数据的时候，将会引发一个异常。


## POST请求

```py
import requests
import json
data = {
    'xxx': 1,
    'xxx': "xxx"
}
headers = {
    'User-Agent': 'xxxx',
}
response = requests.post('https://www.baidu.com', headers=headers,data=data)
# 把响应结果数据转换为 python的 dict类型数据
response_dict_info = json.loads(response.text)
print(response_dict_info)
```

### 上传文件

```py
import requests
url = 'http://httpbin.org/post'
files = {'file': open('report.xls', 'rb')}
response = requests.post(url, files=files)
print(response.text)

## 或者显示设置文件名，文件类型和请求头：
url = 'http://httpbin.org/post'
files = {'file': ('report.xls', open('report.xls', 'rb'), 'application/vnd.ms-excel', {'Expires': '0'})}
response = requests.post(url, files=files)
print(response.text)

```


## 高级用法

暂无

