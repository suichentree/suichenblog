---
title: Python的DrissionPage网页自动化工具库笔记
date: 2025-02-21
sidebar: 'auto'
categories: 
 - Python
tags:
 - Pandas
---

[toc]

# Python的DrissionPage网页自动化工具库笔记

DrissionPage 是一个基于 Python 的网页自动化工具。既能控制浏览器，也能收发数据包，还能把两者合而为一。类似Selenium自动化测试工具。

[DrissionPage官网](https://drissionpage.cn/) 目前最新版本为DrissionPage 4.1.0.17

![python_20250221101442.png](../blog_img/python_20250221101442.png)

## 安装

支持的运行环境
- 操作系统：Windows、Linux 和 Mac。
- python 版本：3.6 及以上
- 支持浏览器：Chromium 内核（如 Chrome 和 Edge）

```py
# 使用 pip 安装 DrissionPage
pip install DrissionPage

# 升级命令
pip install DrissionPage --upgrade

# 升级指定版本
pip install DrissionPage==4.0.0b17
```

## 示范例子

控制浏览器，打开网页。

代码逻辑如下
1. 创建浏览器对象，用于启动或接管浏览器
2. 获取一个 Tab 标签页对象
3. 使用 Tab 标签页对象访问网址
4. 使用 Tab 标签页对象获取标签页内需要的元素对象
5. 使用元素对象进行交互操作。

```py
# 导入
from DrissionPage import Chromium,ChromiumOptions

# 浏览器设置
def getBrowser():
    # 浏览器的可执行文件路径
    path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'  
    # 浏览器启动设置对象
    co = ChromiumOptions()
    # 设置浏览器路径
    co.set_browser_path(path)
    # 自动获取空闲端口，从而启动一个全新浏览器
    co.auto_port()
    # 开启无头模式
    # co.headless(True)
    # 来宾模式
    co.set_argument('--guest')
    # 无痕模式
    co.incognito()
    # 设置浏览器的窗口大小
    co.set_argument('--window-size', '390,844')
    # 阻止“自动保存密码”的提示气泡
    co.set_pref('credentials_enable_service', False)
    # 阻止“要恢复页面吗？Chrome未正确关闭”的提示气泡
    co.set_argument('--hide-crash-restore-bubble')
    # 设置浏览器的UA，UA可选择设置为手机或者电脑的UA。
    co.set_user_agent(user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Mobile/14D27 MicroMessenger/6.5.5 NetType/WIFI Language/zh_CN')
    # 浏览器静音
    co.mute(True)
    # 传入浏览器配置，创建浏览器对象
    browser = Chromium(addr_or_opts=co)
    return browser

if __name__ == '__main__':
    # 连接浏览器
    browser = getBrowser()
    # 获取最后激活的标签页对象
    tab = browser.latest_tab
    # 标签页访问一个网址
    tab.get('https://www.baidu.com')
    # 获取文本框元素对象
    ele = tab.ele('#kw')
    # 向文本框元素对象输入文本
    ele.input('DrissionPage')  
    # 点击按钮，上两行的代码可以缩写成这样
    tab('#su').click()  
    # 获取所有<h3>元素
    links = tab.eles('tag:h3')  
    # 遍历并打印结果
    for link in links:  
        print(link.text)

```

## 创建浏览器

Chromium对象，用于管理浏览器整体相关的操作。如标签页管理、获取浏览器信息、设置浏览器的运行参数等。

注意：每个浏览器只能有一个Chromium对象（同一进程中）。对同一个浏览器重复使用Chromium()获取的都是同一个对象。

默认情况下，程序会使用 9222 端口来启动一个浏览器。

> 创建浏览器对象的方式

```py
from DrissionPage import Chromium, ChromiumOptions

# 方式1 默认创建
browser = Chromium()

# 方式2 指定端口或地址
browser = Chromium(9333)
browser = Chromium('127.0.0.1:9333')

# 方式3 通过配置信息
# 浏览器启动设置对象
co = ChromiumOptions()
# 设置浏览器路径
co.set_browser_path(r'D:\chrome.exe')
# 传入浏览器配置，创建浏览器对象
browser = Chromium(addr_or_opts=co)

```

更多的用法请自行在官网中查询。

### 浏览器启动设置类 ChromiumOptions

ChromiumOptions类是浏览器的启动配置。

```py
from DrissionPage import Chromium,ChromiumOptions
# 创建浏览器启动配置对象
co = ChromiumOptions()

# 设置浏览器路径
co.set_browser_path("XXXXX")
# 自动获取空闲端口，从而启动一个全新浏览器
co.auto_port()
# 开启无头模式
co.headless(True)
# 来宾模式
co.set_argument('--guest')
# 无痕模式
co.incognito()
# 设置浏览器的窗口大小
co.set_argument('--window-size', '390,844')
# 阻止“自动保存密码”的提示气泡
co.set_pref('credentials_enable_service', False)
# 阻止“要恢复页面吗？Chrome未正确关闭”的提示气泡
co.set_argument('--hide-crash-restore-bubble')
# 设置浏览器的UA
co.set_user_agent(user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Mobile/14D27 MicroMessenger/6.5.5 NetType/WIFI Language/zh_CN')
# 浏览器静音
co.mute(True)
# 传入浏览器配置，创建浏览器对象
browser = Chromium(addr_or_opts=co)

```

更多的用法请自行在官网中查询。

> 多浏览器共存

如果想要同时操作多个浏览器，或者自己在使用其中一个上网，同时控制另外几个跑自动化，就需要给这些被程序控制的浏览器设置单独的 端口 和 用户文件夹，否则会造成冲突。

使用ChromiumOptions对象的auto_port()方法，可以指定程序每次使用空闲的端口和临时用户文件夹创建浏览器。并且使用auto_port()的配置对象可由多个Chromium对象共用，不会出现冲突。

这种方式创建的浏览器是全新不带任何数据的，并且运行完毕后数据会自动清除。

注意：auto_port()支持多线程，多进程使用时由小概率出现端口冲突。多进程使用时，可用scope参数指定每个进程使用的端口范围，以免发生冲突。

```py
# 导入 
from DrissionPage import Chromium, ChromiumOptions

# ChromiumOptions对象的auto_port()方法
co = ChromiumOptions().auto_port()

# 创建多个浏览器对象
tab1 = Chromium(addr_or_opts=co).latest_tab
tab2 = Chromium(addr_or_opts=co).latest_tab

tab2.get('https://DrissionPage.cn')
tab1.get('https://www.baidu.com')
```

## 浏览器对象

更多的用法请自行在官网中查询。

```py
# 导入
from DrissionPage import Chromium
# 创建浏览器对象
browser = Chromium()  
```

> 标签页操作

```py
# get_tab() 获取一个标签页对象或它的 id
tab = browser.get_tab()
# get_tabs() 获取多个符合条件的标签页对象
tabs = browser.get_tabs()
# latest_tab获取最新的标签页对象
l_tab = browser.latest_tab
# new_tab() 新建一个标签页对象
a_tab = browser.new_tab()
# .....
```

> 浏览器运行参数

```py
# 设置一个或多个 cookie
browser.set.cookies()
# 用于清除浏览器所有 cookies
browser.set.cookies.clear()
# 设置是否启用自动处理 alert 弹窗
browser.set.auto_handle_alert()

# 返回浏览器所有域名的 cookies
browser.cookies()
# 清除浏览器的缓存
browser.clear_cache()
# 关闭浏览器
browser.quit()
```


## 标签页对象Tab

- Tab 对象从浏览器对象获取，每个 Tab 对象对应浏览器上一个实际的标签页。
- 大部分操作都使用 Tab 对象进行，如访问网页、调整窗口大小、监听网络等。
- 默认情况下每个标签页只有一个 Tab 对象，关闭单例模式后可用多个 Tab 对象同时控制一个标签页。

```py
from DrissionPage import Chromium
# 创建标签页对象
tab = Chromium().latest_tab
```

### 网页交互

标签页对象控制浏览器的标签页，是页面控制的主要单位。

更多的用法请自行在官网中查询。

> 页面跳转

```py
# get()方法用于跳转到一个网址。可指定本地文件路径。
tab.get('https://DrissionPage.cn')

# back() 此方法用于在浏览历史中后退若干步
tab.back(2)  # 后退两个网页

# refresh() 用于刷新当前页面
tab.refresh() 
```

> 设置cookies及缓存

```py
# 给页面设置一个或多个 cookie
tab.set.cookies()
# 用于清除页面所有 cookie
tab.set.cookies.clear()
# 删除页面中的一个cookie
tab.set.cookies.remove(name="xxxx")

# 设置某项 sessionStorage
tab.set.session_storage(item='abc', value='123')
# 设置某项 localStorage 信息
tab.set.local_storage(item='abc', value='123')
```

> 页面窗口管理

```py
# 窗口最大化
tab.set.window.max()
# 窗口最小化
tab.set.window.mini()
# 设置窗口大小
tab.set.window.size(500, 500)
```

> 关闭及重连

```py
# 关闭标签页
tab.close()
# 用于页面对象断开与页面的连接，但不关闭标签页。断开后，对象不能对标签页进行操作。
tab.disconnect()
# 用于关闭与页面连接，然后重建一个新连接。wait是等待重连时间
tab.reconnect(wait=10)
```

- reconnect() 主要用于应付长期运行导致内存占用过高，断开连接可释放内存，然后重连继续控制浏览器。

### 获取网页信息

成功访问网页后，可使用 Tab 对象属性和方法获取页面信息。

```py
from DrissionPage import Chromium

tab = Chromium().latest_tab
tab.get('https://www.baidu.com')

# 返回当前页面 html 文本
tab.html
# 返回当前页面title文本
tab.title
# 返回当前页面 user agent 信息
tab.user_agent
# 返回当前访问的 url
tab.url
# 返回cookies
tab.cookies()
# 返回sessionStorage 信息
tab.session_storage()
# 返回localStorage 信息
tab.local_storage()
```

## 定位元素

当我们获取到页面的html时，如何准确的定位元素是自动化重中之重的技能。

更多的用法请自行在官网中查询。

假设有这样一个页面
```html
<html>
<body>
<div id="one">
    <p class="p_cls" name="row1">第一行</p>
    <p class="p_cls" name="row2">第二行</p>
    <p class="p_cls">第三行</p>
</div>
<div id="two">
    第二个div
</div>
</body>
</html>
```

### 定位语法

> 基本定位语法

元素属性包括以下三种
- 标签名 @tag() 即`<div id="one">`中的div
- 标签体中的属性 @**** 如`<div id="one">`中的id，写作'@id'
- 元素文本 @text() 即`<p class="p_cls">第三行</p>`中的第三行

例子
```py
tab.ele('@id=one')  # 获取第一个id为one的元素
tab.ele('@tag()=div')  # 获取第一个div元素
tab.ele('@text()=第一行')  # 获取第一个文本为“第一行”的元素
```

单个@在只以一个属性作为匹配条件时使用，以'@'开头，后面跟属性名称。当需要多个条件同时确定一个元素时，每个属性需要用'@@'开头。

```py
# 查找class为p_cls且文本为“第三行”的元素
ele = tab.ele('@@class=p_cls@@text()=第三行') 
```

> 匹配模式

匹配模式指某个查询中匹配条件的方式，有精确匹配、模糊匹配、匹配开头、匹配结尾四种。
- 精确匹配 =
- 模糊匹配 :
- 匹配开头 ^
- 匹配结尾 $

例子
```py
ele = tab.ele('@id=row1')  # 获取id属性为'row1'的元素
ele = tab.ele('@id:ow')  # 获取id属性包含'ow'的元素
ele = tab.ele('@id^row')  # 获取id属性以'row'开头的元素
ele = tab.ele('@id$w1')  # 获取id属性以'w1'结尾的元素
```

### 页面内或元素内查找

页面对象和元素对象都拥有ele()和eles()方法，用于获取其内部指定子元素。

> ele()

用于查找其内部第一个符合条件的元素。

```py
from DrissionPage import Chromium
tab = Chromium().latest_tab
tab.get('https://www.baidu.com')

# 在页面内查找元素
ele = tab.ele('#one')
# 在元素内查找后代元素
ele = tab.ele('第二行')
```

> eles()

用于查找其内部符合条件的所有元素。返回的是匹配到的所有元素组成的列表。

```py
from DrissionPage import Chromium
tab = Chromium().latest_tab
tab.get('https://www.baidu.com')

# 获取页面内的所有p元素
p_eles = tab.eles('tag:p')
# 获取ele1元素内的所有p元素
p_eles = ele1.eles('tag:p')
# 打印第一个p元素的文本
print(p_eles[0])
```

## 获取元素信息

当我们定位到元素后，可用获取到元素的各种各样的信息。更多的用法请自行在官网中查询。

### 元素内容和元素属性

```py
from DrissionPage import Chromium
tab = Chromium().latest_tab
tab.get('https://www.baidu.com')

# 在页面内查找元素
ele = tab.ele('#one')

# 返回元素的标签名
ele.tag
# 返回元素的outerHTML文本
ele.html
# 返回元素的innerHTML文本
ele.inner_html
# 返回元素内所有文本组合成的字符串
ele.text
# 返回元素内未经处理的原始文本
ele.raw_text
# 以字典形式返回元素所有属性及值
ele.attrs
# 返回元素的href属性或src属性，没有这两个属性则返回None
ele.link
# 返回元素 css 样式属性值
ele.style()
```

### 元素状态信息

```py
from DrissionPage import Chromium
tab = Chromium().latest_tab
tab.get('https://www.baidu.com')

# 在页面内查找元素
ele = tab.ele('#one')

# 此属性返回获取内部或相对定位元素的超时时间，实际上是元素所在页面的超时设置。
ele.timeout
# 此属性以布尔值方式返回元素是否在视口中，以元素可以接受点击的点为判断。
ele.states.is_in_viewport
# 此属性以布尔值方式返回元素是否整个在视口中。
ele.states.is_whole_in_viewport
# 以布尔值返回表单单选或多选元素是否选中
ele.states.is_checked
# 以布尔值返回元素是否可见
ele.states.is_displayed
```

## 元素交互操作

当我们在页面内获取到元素信息后，可能需要与页面中的元素进行交互操作。如点击，输入，修改等。

更多的用法请自行在官网中查询。

### 点击元素

```py
from DrissionPage import Chromium
tab = Chromium().latest_tab
tab.get('https://www.baidu.com')

# 在页面内查找元素
ele = tab.ele('#one')

# 对ele元素进行模拟点击，如判断被遮挡也会点击
ele.click()
# 用js方式点击ele元素，无视遮罩层
ele.click(by_js=True)
# 如元素不被遮挡，用模拟点击，否则用js点击
ele.click(by_js=None)

# 点击元素，触发文件选择框，并把指定的文件路径添加到网页
ele.click.to_upload(file_paths="文件路径")

```

### 输入内容

```py
from DrissionPage import Chromium
tab = Chromium().latest_tab
tab.get('https://www.baidu.com')

# 在页面内查找元素
ele = tab.ele('#one')

# 清空元素文本
ele.clear() 
# 向元素输入文本
ele.input('Hello world!')
# 向元素输入文本并回车
ele.input('Hello world!\n')
```

### 修改元素

```py
from DrissionPage import Chromium
tab = Chromium().latest_tab
tab.get('https://www.baidu.com')

# 在页面内查找元素
ele = tab.ele('#one')

# 设置元素的 innerHTML 内容
ele.set.innerHTML(html="html文本")
# 设置元素property属性
ele.set.property('value', 'Hello world!')
# 设置元素 attribute 属性
ele.set.attr(name='href', value='https://DrissionPage.cn')
# 删除元素 attribute 属性
ele.remove_attr(name='href')
```

## 监听网络数据包

DrissionPage 在每个页面对象（包括 Tab 和 Frame 对象）内置了一个监听器，专门用于抓取浏览器数据包。

我们可用通过获取网络数据包，从而读取数据包中的内容。下面是两个示例。

更多的用法请自行在官网中查询。

> 示例1 等待并获取数据包

```py
from DrissionPage import Chromium

tab = Chromium().latest_tab
tab.get('https://gitee.com/explore/all')  # 访问网址，这行产生的数据包不监听

# 开启监听器，获取包含该文本的数据包
tab.listen.start('gitee.com/explore') 

# 循环5次
for _ in range(5):
    # 点击下一页，这个操作会产生数据包
    tab('@rel=next').click()  
    # 等待并获取一个数据包
    res = tab.listen.wait()  
    # 打印数据包url
    print(res.url)  
```

> 示例2 实时获取数据包

```py
from DrissionPage import Chromium

tab = Chromium().latest_tab
tab.listen.start('gitee.com/explore')  # 开启监听器，获取包含该文本的数据包
tab.get('https://gitee.com/explore/all')  # 访问网址

i = 0
for packet in tab.listen.steps():
    # 打印数据包url
    print(packet.url)
    # 点击下一页
    tab('@rel=next').click()  
    i += 1
    if i == 5:
        break
```

## 上传文件

更多的用法请自行在官网中查询。

上传文件有两种方式：
- 方式1 拦截文件输入框，自动填入路径。
- 方式2 找到`<input>`元素，填入文件路径。

> 方式1

```py
from DrissionPage import Chromium
tab = Chromium().latest_tab
# 获取上传按钮元素
ele = tab('#uploadButton')
# 点击上传按钮，并上传文件
ele.click.to_upload(r'C:\\text.txt')
```

> 方式2

如果`<input>`元素很好找，这种方式是很简便的。

```py
# 获取input元素
upload = tab('tag:input@type=file')

# 传入一个文件路径
upload.input('D:\\test1.txt')

# 传入多个文件路径，方式 1
paths = 'D:\\test1.txt\nD:\\test2.txt'
upload.input(paths)

# 传入多个文件路径，方式 2
paths = ['D:\\test1.txt', 'D:\\test2.txt']
upload.input(paths)s

```

## 写过的刷视频demo

这个demo是用来在某个视频网站中给用户刷视频的。完全是通过DrissionPage库模拟浏览器来刷视频的。与其他通过调用API接口来刷视频的方式不太一样，因此将代码记录在这里。

```py
import os
import glob
from DrissionPage import ChromiumPage, ChromiumOptions
from log.log_config import logger
import time
import threading
from datetime import datetime,timedelta
import cv2
import random
import re

# 浏览器页面对象设置
def getPage(user):
    path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'  # 浏览器的可执行文件路径
    # 设置无头模式
    # co = ChromiumOptions().headless()
    co = ChromiumOptions()
    # 设置浏览器路径
    co.set_browser_path(path)
    # 来宾模式
    co.set_argument('--guest')
    # 无痕模式
    co.incognito()
    # 设置初始窗口大小
    co.set_argument('--window-size', '390,844')
    # 阻止“自动保存密码”的提示气泡
    co.set_pref('credentials_enable_service', False)
    # 阻止“要恢复页面吗？Chrome未正确关闭”的提示气泡
    co.set_argument('--hide-crash-restore-bubble')
    # 设置浏览器的UA
    co.set_user_agent(user_agent=user['ua'])
    # 自动获取空闲端口，从而启动一个全新浏览器
    co.auto_port()
    # 浏览器静音
    co.mute(True)
    # 创建页面对象，并启动或接管浏览器,传入浏览器配置
    page = ChromiumPage(co)
    # 之后出现的弹窗都会自动确认
    page.set.auto_handle_alert()
    return page

# 将视频时长字符串和视频进度转换为对应的秒数
def convertTime(video_time,video_status):
    # 次数代码省略

# 登录页面
def toLoginPage(page,user):
    # 跳转到登录页面
    page.get('https://gd.aqscwlxy.com/h5/pages/login/login')
    # 定位到账号文本框和密码文本框，输入账号密码
    a_eles = page.eles('@class=uni-input-input')
    logger.info(f"{user['name']} {len(a_eles)}")
    if a_eles:
        a_eles[0].input(user['idCard'])
        a_eles[1].input(user['pwd'])
    else:
        raise Exception(f"{user["name"]} {len(a_eles)} 。没找到登录页面的元素，等待下次重启")

    # 点击我已阅读
    page.ele('@class=uni-checkbox-input').click()
    # 点击登录按钮,找到class为login_btn的元素节点
    page.ele('@class=login-btn').click()

# 新的视频截图方法，从多个视频中随机获得一个视频文件进行截图。
def new_video_capture(user):
    # 指定要查找文件的目录
    directory = user['face_path']
    # 使用glob模块查找文件名包含'名字+身份证'的文件
    files = glob.glob(os.path.join(directory, f'*{user['name']+user['idCard']}*'))
    if files:
        random_user_video_path = random.choice(files)
    else:
        raise Exception(f"{user["name"]} 。没有找到视频文件")

    logger.info(f"{user["name"]} 开始执行 new_video_capture 方法 进行人脸视频截图。人脸视频文件为 {random_user_video_path} ====================== ")
    # 打开视频文件
    video = cv2.VideoCapture(random_user_video_path)
    # 获取视频的总帧数
    frame_count = int(video.get(cv2.CAP_PROP_FRAME_COUNT))
    # 获取视频的帧率
    fps = int(video.get(cv2.CAP_PROP_FPS))
    # 计算出视频时长
    video_time = int(frame_count / fps)
    is_success = False
    while is_success is False:
        # 随机生成一个秒数，范围在1-video_time之间
        rand_int = random.randint(1, video_time)
        # 计算要截取的帧数
        frame_to_capture = int(rand_int * fps)
        # 跳到视频文件的指定帧数
        video.set(cv2.CAP_PROP_POS_FRAMES, frame_to_capture)
        # 读取该帧数
        ret, frame = video.read()
        # 截图路径
        imgPath = directory + "\\img\\" + user['idCard'] + '-' + str(random.randint(1,1000)) + '.jpeg'
        # 如果成功读取到帧，则保存为图片
        if ret:
            # 把视频截图保持到指定路径中，截图成功返回Ture
            is_success = cv2.imwrite(imgPath, frame)
            logger.info(f'{user["name"]} 截图成功。is_success 为 {is_success}')
        else:
            logger.error(f'{user["name"]} 截图失败，开始重新截图。is_success 为 {is_success}')

    # 释放视频文件
    video.release()
    newimgPath = directory + "\\img\\"  + user['idCard'] + '-' + str(random.randint(1,1000)) + '.jpeg'
    # 对图片进行处理
    resize_and_compress_image(imgPath,newimgPath)
    # 删除旧图片
    os.remove(imgPath)
    return newimgPath

# 图片大小压缩到90kb之内 和 重新设置图片尺寸
def resize_and_compress_image(input_path, output_path, target_size=90 * 1024):
    # 读取图片
    image = cv2.imread(input_path)
    # 调整图片分辨率尺寸
    # 获取原始图像的高度和宽度
    height,width = image.shape[:2]
    # 如果图片宽大于高，将设置图片宽为1170，高为对应的比例。如果图片高大于宽，将设置图片高为1170，宽为对应的比例。
    if width > height:
        # 定义目标宽度
        target_width = 1170
        # 根据原始宽高比计算目标高度
        target_height = int((target_width / width) * height)
    elif height > width:
        # 定义目标宽度
        target_height = 1170
        # 根据原始宽高比计算目标宽度
        target_width = int((target_height / height) * width)

    # 使用cv2.resize进行缩放，保持宽高比
    resized_img = cv2.resize(image, (target_width, target_height))

    # 重新赋值
    image = resized_img

    # 图片大小压缩
    # 设置图片初始质量
    quality = 95
    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), quality]
    while True:
        result, encimg = cv2.imencode('.jpeg', image, encode_param)
        if result:
            size = len(encimg)
            if size <= target_size:
                break
            quality -= 5
            encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), quality]

    with open(output_path, 'wb') as f:
        f.write(encimg)

# 主方法
def main(user):
    try:
        # 获取浏览器对象
        logger.info(f"{threading.current_thread().name} 线程开始运行。。。。")
        # 设置ua
        user['ua'] = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        page = getPage(user)

        # 开启监听器，监听数据包
        page.listen.start(targets=['gd.aqscwlxy.com/gd_api/study/studyrecord.php', 'gd.aqscwlxy.com/gd_api/face/study_face.php'])

        # 先检查是否有对应视频文件,使用glob模块查找文件名包含'名字+身份证'的文件
        files = glob.glob(os.path.join(user['face_path'], f'*{user['name'] + user['idCard']}*'))
        if files == []:
            raise Exception(f"{user["name"]} {user['idCard']} 没有找到视频文件")

        # 登录页面
        toLoginPage(page, user)

        # 此时进入到课程列表，查询有几个课程
        course_count = len(page.eles("@class=uni-list-item"))
        if course_count == 0:
            raise Exception(f"{user["name"]} {user['idCard']} course_count = {course_count} 没有找到对应课程。等待下次重启。")

        # 根据课程数量遍历几次
        for index in range(course_count):
            # 根据index获取第几个课程。
            course = page.eles("@class=uni-list-item")[index]
            # 课程名称
            course_name = course.ele("@class=uni-title").text
            # 查询课程是否完成
            course_progress = course.ele("@class=text-totalhour").text
            # 使用正则表达式提取两个数字
            numbers = re.findall(r"\d+\.\d+", course_progress)
            if numbers[0] < numbers[1]:
                logger.warning(f"{user["name"]} {course_name} {course_progress}  没学完。")

            # 点击课程
            course.click()

            # 查询是否有身份确认弹窗，若存在直接报异常
            identity_check = page.ele("@text()=系统已查询到您的培训班报名记录，请身份确认后开始学习。点击下方【身份确认】按钮进行身份确认！",timeout=2)
            if identity_check:
                # 若存在身份确认弹窗，则点击身份确认按钮。
                logger.info(f"{user['name']} 开始身份确认成功。")
                page.ele("@class=uni-modal__btn uni-modal__btn_primary").click()
                # 获取人脸文件
                imgPath = new_video_capture(user)
                logger.info(f"{user['name']} 人脸图片为 {imgPath}")
                # 触发文件上传按钮，并上传文件
                time.sleep(1)
                page.ele("@id=bt_selectphoto").click.to_upload(imgPath)
                # 找到提交按钮并点击
                time.sleep(1)
                page.ele("@id=bt_sendblog").click(by_js=True)
                # 找到马上开始学习按钮并点击
                time.sleep(3)
                page.ele("@id=gostudy").click()
                logger.success(f"{user['name']} 身份确认成功。开始学习。")
                # 后面会回到课程列表页面。此处会报一次异常。等重新运行后就正常了。

            # # 查询是否有确认提示弹窗，若存在则直接点击确认按钮
            check_model = page.ele("@text():学员无法在手机端和电脑端同时登录学习",timeout=2)
            if check_model:
                # 找到弹窗的确认按钮，有就点击，没有就不点击。
                c_ele = page.ele("@class=uni-modal__btn uni-modal__btn_primary",timeout=2)
                if c_ele:
                    c_ele.click()

            # 查询课程中的各个章节并遍历
            chapters = page.eles('@class=tab-item-box')[1].children()
            for chapter in chapters:
                # 查询章节中的各个视频并遍历
                videos = chapter.ele("@class=chapter-box").children()
                for video in videos:
                    a = video.text
                    video_str = a.split("\n")
                    video_time = video_str[0]
                    video_title = video_str[1]
                    video_status = video_str[3]

                    if video_status == "已观看100.00%":
                        continue
                    else:
                        # 将视频时长转换为秒数
                        sleep_time = convertTime(video_time,video_status)
                        logger.info(f"{user['name']} 开始看视频 {video_title}。视频总时长为 {video_time} 视频状态 {video_status} 。因此还需要看 {sleep_time} 秒")
                        # 点击视频标签
                        video.click(by_js=True)
                        # 点击是否播放弹窗的确认按钮
                        page.ele("@class=uni-modal__btn uni-modal__btn_primary").click()
                        # 等待检测是否有"前一次认证操作未完成"弹窗。如果有则点击确定
                        auth_tag = page.wait.ele_displayed("@@class=uni-modal__bd@@text():前一次认证操作未完成", raise_err=False,timeout=2)
                        if auth_tag:
                            page.ele("@class=uni-modal__btn uni-modal__btn_primary").click()

                        # 视频播放剩余的结束时间，额外加上120-180秒
                        target_time = datetime.now() + timedelta(seconds=sleep_time + random.randint(120,180))

                        # 若当前时间大于目标时间，则表示视频已经放完了
                        while datetime.now() < target_time:
                            logger.info(f"{user['name']} 视频 {video_title}。休眠60秒")
                            # 休眠60秒
                            time.sleep(60)
                            # 等待take-photo-box元素标签是否可用 (如果可用表示当前页面是上传照片页面)
                            photo_tag = page.wait.ele_displayed("@class=take-photo-box", raise_err=False)
                            if photo_tag:
                                logger.warning(f"{user['name']} 视频 {video_title}。检测到当前页面是人脸验证页面。开始上传人脸照片")
                                # 获取人脸文件
                                imgPath = new_video_capture(user)
                                logger.info(f"{user['name']} 人脸图片为 {imgPath}")
                                # 触发文件上传按钮，并上传文件
                                time.sleep(1)
                                page.ele("@class=take-photo-box").click.to_upload(imgPath)
                                # 找到提交按钮(标签为uni-button，标签文本包含'提交验证')
                                time.sleep(1)
                                b_tag = page.ele("@@tag()=uni-button@@text():提交验证")
                                if b_tag:
                                    b_tag.click(by_js=True)

                            # 监听数据包并打印
                            for packet in page.listen.steps(count=2,timeout=5):
                                response_info = packet.response
                                if response_info.url == "https://gd.aqscwlxy.com/gd_api/study/studyrecord.php" and response_info.body['msg'] == '更新成功':
                                    logger.success(f"{user['name']} 视频 {video_title}。打卡成功")
                                elif response_info.url == "https://gd.aqscwlxy.com/gd_api/face/study_face.php" and response_info.body['msg'] == '认证成功，请继续学习！':
                                    logger.success(f"{user['name']} 视频 {video_title}。人脸认证成功")
                                else:
                                    raise Exception(f"{user['name']} 视频 {video_title}。其他情况。response_info = {response_info.body} , {response_info.url} , {response_info.status} ")

                        # 当视频播放完毕后会出现是否做测试的弹框。点击取消
                        exam_tag = page.wait.ele_displayed("@@class=uni-modal__bd@@text():当前视频已播放完成，是否进行在线测试",raise_err=False)
                        if exam_tag:
                            page.ele("@class=uni-modal__btn uni-modal__btn_default").click()

                        logger.success(f"{user['name']} 视频 {video_title}。已看完")

            logger.success(f"{user['name']} 已看完课程 {course_name}。")
            # 返回上一个页面
            page.back(1)

        # 终止监听器
        page.listen.stop()
        logger.success(f"{user['name']} 已看完所有视频。")
        # 关闭当前页面
        page.close()
        # 关闭浏览器
        page.quit()
    except Exception as e:
        # 终止监听器
        page.listen.stop()
        # 关闭当前页面
        page.close()
        # 关闭浏览器
        page.quit()
        # 打印完整异常信息
        logger.exception(f"发生异常。异常信息为 {e}")
        # 如果脚本作为单文件运行时，想要循环刷的话，则直接休眠后重新开启线程即可。
        time.sleep(1200)
        main(user)

if __name__ == '__main__':
    """
        刷时程序。该脚本是使用DrissionPage库模拟浏览器，来刷时
        手机端：https://gd.aqscwlxy.com/h5/pages/login/login?f=%252F     注意：可以在微信开发者工具中打开，也可以在浏览器中打开。F12设置为手机尺寸
        PC端网址 https://gd.aqscwlxy.com/pc/login                          注意：F12设置为电脑尺寸
    """

    user_list = [
        {'name': '小明', 'idCard': 'XXXXXXXXXXXXXX', 'pwd': 'XXXXXX', 'org': 'XXX', 'face_path': 'C:\\Users\\18271\\Desktop\\face_video'},
    ]

    # 给这些未进行刷题并且未刷完视频的用户创建子线程
    for user in user_list:
        # 休眠
        time.sleep(3)
        # 创建一个子线程
        t = threading.Thread(target=main, name=f"{user['name']}", args=(user,))
        # 运行该子线程
        t.start()

```

