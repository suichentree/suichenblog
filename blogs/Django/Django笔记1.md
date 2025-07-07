---
title: Django笔记1
date: 2025-06-12
sidebar: 'auto'
categories: 
 - Python
tags:
 - Django
---

[toc]

# Django笔记1

![django_20250612171640.png](../blog_img/django_20250612171640.png)

目前最新的Django LTS版本为5.2.3

Django 是一个由 Python 编写的一个重量级 Web 应用框架。使用 Django，只要很少的代码，Python 的程序开发人员就可以轻松地完成一个正式网站所需要的大部分内容，并进一步开发出全功能的 Web 服务。

[Django 官方网址 https://docs.djangoproject.com/zh-hans/5.2/contents/](https://docs.djangoproject.com/zh-hans/5.2/contents/)

> Django的特点

- 快速开发: Django的最大优势之一就是能够快速搭建Web应用。它通过提供开箱即用的组件，如认证、后台管理、表单、数据库管理等，使开发者能够专注于业务逻辑而不必从零开始编写大量的代码。
- ORM（对象关系映射）：Django 提供了一个强大的 ORM，允许开发者通过 Python 代码来定义和操作数据库模型，而无需直接使用 SQL。这使得数据库操作更加抽象和易于管理。
- 自带 admin 后台界面： Django 自动生成管理后台页面，使得管理和操作数据库的过程变得非常简单。
- 模板引擎： Django 使用模板引擎来生成 HTML，这使得前端和后端的代码分离更加容易。
- 表单处理： Django 提供了强大的表单处理工具，使得用户输入的验证和处理变得更加简单。
- 安全性： Django 内置了一些安全性功能，例如防止常见的 Web 攻击（如 CSRF 攻击），并提供了方便的用户身份验证和授权系统。
- 可扩展性： Django 的组件是松耦合的，允许开发者使用现有的组件或编写自己的应用程序来扩展框架功能。
- 社区支持： Django 拥有庞大的社区支持，提供了大量的文档、教程和第三方包，使得学习和使用 Django 变得更加容易。

## Django 安装

> 使用pip包管理工具安装Django

```shell
# 安装 django
pip install Django
```

安装Django之后，会默认安装 django-admin 命令行管理工具。

django-admin 命令行管理工具可以帮助开发者很方便的创建和管理Django工程。类似Django工程的脚手架。

## Django 工程的创建

① 创建Django工程

```shell
# 命令语法
django-admin startproject 工程名称
# 例子
django-admin startproject djangoDemo1
```

如下图所示为工程的目录结构。
![django_20250612163123.png](../blog_img/django_20250612163123.png)

django-admin 命令行管理工具会根据命令创建一个工程目录，然后再其中会创建一个同名子目录和一个 `manage.py` 文件。

```
djangoDemo1 工程的根目录
| - manage.py: 一个非常重要的脚本文件，位于工程的根目录中。它是管理 Django 工程的命令行工具，包含了许多常用的管理命令。
| - djangoDemo1 与根目录同名的目录是配置目录。存放工程的一些启动文件和核心配置文件。
| ---- `__init__`.py: 一个空文件，告诉 Python 该子目录是一个 Python 包。在 Django 工程中，这个文件是必需的，虽然它通常是空的，但它保证了该子目录会被 Python 识别为一个模块。
| ---- settings.py: 是 Django 工程的核心配置文件。如数据库配置、缓存设置、安全设置等。
| ---- urls.py: 是 Django 工程的 URL 路由配置文件。它定义了 URL 与函数之间的映射关系。
| ---- asgi.py: 这个文件可以让 Django 运行在异步模式的web服务器中。
| ---- wsgi.py: 这个文件是让工程运行在wsgi服务器的入口文件。
```

② 运行该Django工程

进入到工程所在目录。执行下面命令。

```shell
python manage.py runserver
```

运行命令如下图所示。端口号默认为 8000。
![django_20250612164818.png](../blog_img/django_20250612164818.png)

浏览器访问`http://127.0.0.1:8000/`。如下图所示
![django_20250612164929.png](../blog_img/django_20250612164929.png)

## Django 创建子工程(子应用)

当Django工程创建完之后，我们还需要写正式的业务代码。通常一个Django工程中可以有多个子工程，根据业务功能的不同，创建不同的子工程。不同的子工程就相当于项目中的不同功能模块。

```py
# 创建一个名为app01的子应用的命令 
python manage.py startapp app01

# 当创建子工程之后，还需要再settings.py配置文件中的INSTALLED APPS配置项添加该子工程
INSTALLED_APPS=[
    # ....
    'app01',
    # ....
]
```

会在当前的Django工程目录中新增一个子目录作为app01子工程。如图是子工程的目录结构

![django_20250613165604.png](../blog_img/django_20250613165604.png)

```
djangoDemo1 工程的根目录
| - manage.py: 一个非常重要的脚本文件，位于工程的根目录中。它是管理 Django 工程的命令行工具，包含了许多常用的管理命令。
| - djangoDemo1 与根目录同名的目录是配置目录。存放工程的主要配置文件。
| ---- `__init__`.py: 一个空文件，告诉 Python 该子目录是一个 Python 包。在 Django 工程中，这个文件是必需的，虽然它通常是空的，但它保证了该子目录会被 Python 识别为一个模块。
| ---- settings.py: 是 Django 工程的核心配置文件。如数据库配置、缓存设置、安全设置等。
| ---- urls.py: 是 Django 工程的 URL 路由配置文件。它定义了 URL 与函数之间的映射关系。
| ---- asgi.py: 这个文件可以让 Django 运行在异步模式的web服务器中。
| ---- wsgi.py: 这个文件是让工程运行在wsgi服务器的入口文件。
```

- views.py 在这个文件编写视图函数
- models.py 在这个文件编写模型。
- tests.py 用于测试

## Django的MTV架构模式

Django 采用了 MTV 架构，即模型（Model），视图（View）和模板（Template）。这与传统的 MVC 架构非常相似，但在实现上有所不同。

> 传统的MVC架构

MVC 架构由三个主要组件组成：模型（Model）、视图（View）和控制器（Controller）。它们之间的关系如下图所示。
![django_20250612173650.png](../blog_img/django_20250612173650.png)

- 模型（Model）：它负责与数据库交互，处理数据的存储、检索等操作。模型通常是数据库相关的，表示应用程序中的数据对象。
- 视图（View）：视图通常是HTML页面或类似模板的内容。视图负责向用户展示数据和接收用户输入。
- 控制器（Controller）：控制器负责接收用户输入并调用相应的模型和视图。它接收用户请求，处理业务逻辑，并将结果返回给视图进行展示。

> MTV 架构

![django_20250612174205.png](../blog_img/django_20250612174205.png)

Django 的 MTV 模式和 传统的MVC模式 本质上是一样的，都是为了各组件间保持松耦合关系，只是定义上有些许不同，Django 的 MTV 分别是指。

- M 模型（Model）：与 MVC中的模型类似，负责与数据库交互。
- T 模板 (Template)：模板负责数据的展示与布局。模板是 HTML 文件，并使用 Django 的模板语言（DTL）来动态填充数据。
- V 视图（View）：视图是一个函数或类，通常包含业务逻辑，决定如何处理输入、验证表单数据、调用模型更新数据库等。在 Django 中视图就是MVC模式中的控制器，接收 HTTP 请求并返回 HTTP 响应。


> 对应关系如表格所示

| MVC（传统） | MTV（Django） |
| :--: | :--: | 
| Model（模型）| Model（模型） |
| View（视图） | Template（模板） | 
| Controller（控制器） | View（视图） | 

> URL 路由控制器

除了以上MTV三层之外，还有一个 URL 路由控制器，它的作用是将一个个 URL 的请求分发给不同的 View视图处理，View视图再调用相应的 Model模型 和 Template模板。

大致操作流程如下
![python_20240427125050.png](../blog_img/python_20240427125050.png)



## Django 常用配置

在 Django 的核心包里面存在了一个全局默认配置文件`django/conf/global_settings.py`，同时在开发者创建Django工程的时候，也生成了一个项目配置文件在工程主目录下的 `setting.py` 文件中。

这两个配置文件，在 Django 项目运行时，Django 会先加载了 `global_settings.py` 中的所有配置项，接着加载 `setting.py` 的配置项。`settings.py` 文件中的配置项会优先覆盖 `global_settings.py` 文件的配置项。

==在Django中，配置变量被强制要求大写。否则Django无法识别。==

`setting.py` 文件示例如下
```py

from pathlib import Path

# BASE_DIR 代表工程的根路径，是当前文件的父级的父级目录的路径（即Django工程的根目录路径）。主要作用是提供给整个Django项目进行路径拼接用的。
BASE_DIR = Path(__file__).resolve().parent.parent

# SECRET_KEY 随机生成的，用于提供给加密算法的密钥。
SECRET_KEY = 'django-insecure-ant4q+=il*10^2(*%chbbw7$l^@xl+y-g9dumko(p#z2a)d(-a'

# 本地开发的时候，设置DEBUG = True 。当服务端出错，django会提示详细的错误信息
# 线上运行的时候，设置DEBUG = Flase。当服务端出错，django不会提示详细的错误信息，仅仅展示错误页面。
DEBUG = True

# 站点访问权限设置 ALLOWED_HOSTS ，设置当前Django项目允许哪些IP地址访问
### 当ALLOWED HOSTS配置项取值为[]，即空列表，表示只有127.0.0.1、localhost 能访问本项目。
### 当ALLOWED HOSTS配置项取值为['*']，表示任何网络地址IP都能访问当前项目。
### 当ALLOWED HOSTS配置项取值为['hostname.cn','diango.com']，表示只有当前这两个网络地址能访问当前项目
ALLOWED_HOSTS = []

# APP配置
# 已注册到Django项目的子应用列表。下面是Django官方内置的子应用。
# 当创建子应用的时候，需要在该列表中添加对应子应用名称。否则Django项目无法识别子应用。
INSTALLED_APPS = [
    'django.contrib.admin',         #django内置的admin子应用
    'django.contrib.auth',          #django内置的登录认证功能
    'django.contrib.contenttypes',  #django内置的内容类型管理
    'django.contrib.sessions',      #django内置的session功能
    'django.contrib.messages',      #django内置的消息功能
    'django.contrib.staticfiles',   #django内置的静态文件服务功能
    'app01',                        #自已创建的子应用
]

# 中间件配置
# 中间件（拦截器）MIDDLEWARE 实际就是django提供给开发者在http请求和响应过程中，进行数据拦截的插件系统。
# 中间件 主要用于拦截请求或响应，数据修饰，权限判断等功能。
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',        # 安全检测中间件（防止页面过期，脚本攻击，跨域判断等）
    'django.contrib.sessions.middleware.SessionMiddleware', # session中间件（提供session功能）
    'django.middleware.common.CommonMiddleware',            # 通用中间件（给url进行重写，给url后面加上/等）
    'django.middleware.csrf.CsrfViewMiddleware',            # Csrf中间件（防止网站收到Csrf攻击的）
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # 用户权限认证中间件
    'django.contrib.messages.middleware.MessageMiddleware',     # 消息中间件（提示错误消息等）
    'django.middleware.clickjacking.XFrameOptionsMiddleware',   # 网站安全中间件（用于防止iframe标签劫持攻击的）
]

# django工程中的根路由文件的地址
ROOT_URLCONF = 'djangoDemo1.urls'

# 模板配置
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates']    ## 配置模板目录所在的位置
        ,
        'APP_DIRS': True,  ## 表示在子应用中查找模板文件。DIRS的优先级高于APP_DIRS
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# web应用程序的模块配置
WSGI_APPLICATION = 'djangoDemo1.wsgi.application'


# DATABASES 数据库配置
DATABASES = {
    # Django默认使用sqlite3数据库
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',  ## ENGINE 表示数据库驱动位置
        'NAME': BASE_DIR / 'db.sqlite3',         ## NAME 表示数据库文件位置
    }
}


# Password validation 密码的加密方式
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# 项目的语言配置，默认英文
LANGUAGE_CODE = 'zh-hans'   #中文
# LANGUAGE_CODE = 'en-us'   # 英文

# 时区配置
# TIME_ZONE = 'UTC'                 #英国时间
TIME_ZONE = 'Asia/Shanghai'         #中国时间

# 是否开启国际化本地化功能
USE_I18N = True

# 是否启用时区转换
# 若为False,则django会基于TIME_ZONE来转换时间，若为True,则采用系统时间来转换时间。
USE_TZ = True

# 静态文件存放路径
STATIC_URL = 'static/'

# 默认情况下，django中数据表的主键ID的数据类型。默认为bigint
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

```

## Django 视图

在Django框架中，视图（View）是用于处理Web请求和生成响应的核心组件。即接收一个 Web 请求对象，并返回一个 Web 响应对象。

视图的主要作用包含业务逻辑处理，决定如何处理输入、验证表单数据、调用模型更新数据库等。

Django中的视图有两种：视图函数和视图类。

### 简单视图函数

视图函数本质上就是一个Python函数，用于接收Web请求并且返回Web响应。

对于基于Django框架的Web项目而言，通常约定将视图函数写在项目或应用目录中名称为`views.py`的文件中。

示例如下
```py
from django.http import HttpResponse
from django.shortcuts import render
 
# 简单的视图函数
def home(request):
    # 返回一个HttpResponse响应对象
    return HttpResponse("Welcome to the home page!")
 
# 返回模板的视图函数
def about(request):
    # render() 函数将一个模板页面包装为HttpResponse响应对象，并返回。   
    return render(request, 'about.html')
```

### 请求对象 HttpRequest类

在Django框架中，HttpRequest对象是由HttpRequest类来定义的。HttpRequest对象是组成HTTP数据包的核心部件之一，其中包含了非常多的、十分重要的信息和数据。

每当一个客户端请求发送过来时，Django框架负责将HTTP数据包中的相关内容打包成为一个HttpRequest对象，并传递给视图函数的第一个位置上的参数(request)。

#### HttpRequest类的常用属性

视图函数的第一个参数用于接受HttpRequest类的对象。注意：第一个参数的命名是任意的，通常取名为request。

部分代码示例如下
```py
def get_request_info(request):
    print(request.method)   #获取请求方式
    print(request.path)     #获取请求路径
    print(request.headers)  #获取请求头
    print(request.body)     #获取请求体
    print(request.META)     #获取原生请求头

    return HttpResponse("OK")
```

- HttpRequest.scheme: 字符串类型，表示请求的协议种类，通常为“http”或“https”。
- HttpRequest.body: Bytes类型，表示原始HTTP请求的正文。该属性对于处理非HTML形式的数据(例如二进制图像、XML等)非常有用。注意，如果要处理常规的表单数据，应该使用`HttpRequest.POST。`
- HttpRequest.path: 字符串类型，表示当前请求的路径，但是不包括协议名和域名。
- HttpRequest.method: 字符串类型，表示该HTTP请求的请求方式，默认为大写。
- HttpRequest.encoding: 字符串类型，表示提交数据的编码方式(如果属性值为None，则使用DEFAULT CHARSET默认设置)。
- HttpRequest.content_type:表示从CONTENT_TYPE头解析的请求的MIME类型。
- HttpRequest.content_params:包含在CONTENT_TYPE头标题中的键一值对参数字典。
- HttpRequest.GET:一个类似于字典的对象，包含GET请求中的所有参数。举例来讲，在链接地址`http://example.com/?name=jack&age=18`中,`name=jack&age=18`就是字典对象类型的键一值对参数。
- HttpRequest.POST:包含POST请求中的表单数据。如果需要访问请求中的原始或非表单数据，可以使用HttpRequest.body属性。注意，使用if条件语句通过判断`request.method=="POST`来甄别一个请求是否为POST类型，而不要直接使用request.POST进行判断。此外，POST中不包含上传的文件数据。
- HttpRequest.COOKIES:该属性包含所有Cookie信息的字典数据。
- HttpRequest.FILES:该属性为一个类似于字典的对象，包含上传的文件数据。在Django框架中，实现文件上传功能主要依靠该属性。另外需要注意，FILES属性只有在请求方法为POST，并且提交请求的表`<form>`具有`enctype=multipart/form-data`属性时才有效;否则FILES属性将为空。
- HttpRequest.META:该属性为一个包含所有HTTP头部信息的字典。具体示例如下。

```
CONTENT_LENGTH:请求正文的长度(以字符串计)。
CONTENT_TYPE:请求正文的MIME类型。
HTTP_ACCEPT:可接收的响应Content-Type。
HTTP_ACCEPT_ENCODING:可接收的响应编码类型。
HTTP_ACCEPT_LANGUAGE:可接收的响应语言种类。
HTTP_HOST:客服端发送的HOST头部。
HTTP_REFERER:Referring页面。
HTTP_USER_AGENT:客户端的“user-agent”字符串。
QUERY_STRING:查询字符串。
REMOTE_ADDR:客户端的IP地址，可以获取客户端的IP信息。
REMOTE_HOST:客户端的主机名。
REMOTE_USER:服务器认证后的用户，前提是用户可用。
REQUEST_METHOD:表示请求方式的字符串，例如“GET”或“POST”。
SERVER_NAME:服务器的主机名。
SERVER_PORT:服务器的端口(字符串)。
```

#### HttpRequest类的常用方法

- HttpRequest.get_host()方法:该方法返回根据HTTP_X_FORWARDED_HOST信息和HTTP_HOST头部信息获取的请求的原始主机。如果这两个头部信息没有提供相应的值，则使用SERVER_NAME和SERVER_PORT头部信息。
- HttpRequest.get_port()方法:该方法使用META中的HTTP_X_FORWARDED_PORT和SERVER_PORT的信息返回请求的始发端口。
- HttpRequest.get_full_path()方法:该方法返回包含完整参数列表的路径path，例如`/xxx/xxx/?a=true`。
- HttpRequest.build_absolute_uri(location)方法:该方法返回location的绝对URI形式。
- HttpRequest.get_signed_cookie(key)方法:该方法从Cookie中获取键值对数据。
- HttpRequest.is_secure()方法:如果使用的是HTTPS，则该方法返回True，表示链接是安全的。
- HttpRequest.accepts(mime_type)方法:如果请求头部接收的类型匹配mime_type参数，则该方法返回True，否则返回False。


#### 获取请求URL中请求参数

HttpRequest类的GET属性，专门用于获取 URL 中的请求参数（即 URL 中 ? 后面的键值对）,与请求方法无关（无论请求是 GET、POST 还是其他方式，只要 URL 包含请求参数，均可通过此属性获取）。

例如请求URL路径为`http://localhost:8000/app01/get_request/?a=1&b=2`,那么请求参数就是`a=1&b=2`。可以直接通过HttpRequest类的GET属性来获取路径上的请求参数。

使用场景
- 可以获取 GET 请求中 URL 携带的参数（如分页 page=1）。
- 可以获取 POST 请求中 URL 携带的参数（如 /xxx/xxx?a=1 中的 a=1）


示例如下
```py

# 视图函数的第一个参数用于接受路由转过来的HttpRequest类对象
def get_request_info2(request):

    print(request.GET) #获取请求路径上的请求参数

    ##若一个请求的路径为`http://localhost:8000/app01/get_request/?a=1&b=2`。
    ##则request.GET来获取请求路径上的参数为`{'a': ['1'], 'b': ['2']}`。

    ## 或者 获取单个参数
    print(request.GET.get('a'))
    print(request.GET.get('b'))

    # 获取 URL 查询参数（无论请求方法）
    a = request.GET.get('a', '默认值')  # 单个值
    b = request.GET.getlist('b', [])    # 多个值

    return HttpResponse("OK")
```

#### 获取请求体中的表单数据

HttpRequest类的POST属性。用于获取 POST 请求的表单数据（即请求体中提交的数据），仅在请求方法为 POST 时有效。

请求体的数据一般有两种。一种是表单数据，一种是json数据。

注意事项：
- 仅支持 POST 请求，且依赖正确的 Content-Type（若为 application/json 格式的 POST 数据，需通过 request.body 解析，而非 request.POST）。
- 数据不暴露在 URL 中，可传递较大量数据或敏感信息（需配合 HTTPS 加密）。
- 表单提交时需包含 {% csrf_token %} 标签（避免 CSRF 攻击）


示例如下
```py
# 视图函数中使用
def demo_view(request):
    # 获取 POST 表单数据（仅 POST 请求有效）
    if request.method == 'POST':
        username = request.POST.get('username')       # 单个值
        hobbies = request.POST.getlist('hobby')       # 多个值

    return HttpResponse("处理完成")
```

#### 获取请求体中的Json数据

HttpRequest类的POST属性，不能获取请求体中的json数据。只能通过HttpRequest类的body属性来获取请求体中的json数据。

示例如下
```py
import json
def get_request_info(request):
    #获取请求体中的json数据
    print(request.body)  
    # 将请求体中的json数据转换为字典格式
    print(json.loads(request.body))

    return HttpResponse("OK")
```

#### 获取请求中的上传文件

```py
def get_request_info(request):
    print(request.FILES)  #获取post请求上传的文件
    return HttpResponse("OK")
```

#### 获取请求URL中的动态参数

假设请求路径为`http://localhost:8000/app01/id/1/order/2/`。那么如何获取请求路径中的参数。

示例如下
```py
# urls.py路由文件
from django.urls import path
from . import views
urlpatterns = [
    # 传入占位符参数id和user_id
    path('/app01/id/<int:id>/order/<int:order_id>/', views.user_detail),
]

# views.py视图文件
# 视图函数接收请求路径中的占位符参数
def user_detail(request,id,order_id):
    print(id,order_id)
```

### 响应对象 HttpResponse类

在Django框架中HttpRequest对象是浏览器发送过来的请求数据的封装，而HttpResponse对象则是将要返回给浏览器的数据的封装，HttpResponse对象是由HttpResponse类来定义的。

HttpRequest对象由Django自动解析HTTP数据包而创建，而HttpResponse对象则是需要手动创建的。

通常每个视图函数的返回值就是一个HttpResponse对象。

#### HttpResponse类的常用属性

- content属性: 表示响应的内容。
- content_type属性：表示响应内容的类型。
- charset属性: 表示编码的字符集。如果没指定，将会从content_type中解析出来。
- status_code属性: 表示响应的状态码，例如200。
- reason_phrase属性: 表示响应的HTTP原因短语，一般使用HTTP标准的默认原因短语。除非明确设置，否则该属性将由status_code的值决定。
- streaming属性: 该属性的值总是False。由于该属性的存在，使得中间件能够区别对待流式响应和常规响应。
- closed属性:如果响应已关闭，那么该属性的值为True。


#### HttpResponse类的常用方法

- HttpResponse.init__(content=b",content_type=None,status=200,reason=None,charset=None)方法: 该方法为HttpResponse类的初始化方法。具体参数介绍如下:
    - content参数通常是一个迭代器、bytestring、memoryview或字符串类型。如果是其他类型，则将通过编码转换为bytestring类型;如果是迭代器,那么这个迭代器返回的应该是字符串，并且这些字符串连接起来形成response的内容。
    - content_type参数是可选的，用于填充HTTP的Content-Type头部。
    - status参数表示响应的状态码。
    - reason参数是HTTP响应短语。
    - charset参数是编码方式。

- `HttpResponse.__setitem__(header,value)`方法:该方法用于设置头部的键一值对。其中的两个参数都必须为字符串类型。
- `HttpResponse.__delitem__(header)`方法:该方法用于删除头部的某个键，如果键不存在也不会报错。该方法不区分字母大小写。
- `HttpResponse.__getitem__(header)`方法:该方法用于返回对应键的值。该方法不区分字母大小写。
- HttpResponse.get(header, alternate=None)方法:该方法用于返回给定的头部的值，当头部不存在时返回一个alternate参数。
- HttpResponse.has_header(header)方法:该方法用于检查头部中是否有给定的名称(不区分字母大小写)，结果返回布尔值(True或False)。
- HttpResponse.items()方法:该方法的行为类似于Python字典中的dict.items()方法，用于获取HTTP响应中的头部信息。
- HttpResponse.setdefault(header,value)方法:该方法用于设置一个头部，除非该头部已经设置过了。
- HttpResponse.set_cookie()方法:该方法用于设置一个Cookie。其中的参数如下:
    - max_age参数:用于定义生存周期，以秒为单位。如果设置为None，则在浏览器开启期间该Cookie一直保持，浏览器关闭后该Cookie一同删除。
    - expires参数:用于定义到期时间。
    - domain参数:用于设置跨域的Cookie。
    - secure参数:secure=True表明支持HTTPS安全协议,secure=False表明不支持HTTPS安全协议。
    - httponly=True:阻止客户端的Java Script代码访问Cookie。

- HttpResponse.set_signed_cookie()方法:该方法与set_cookie()方法类似，但是在设置
之前将对Cookie进行加密签名。
- HttpResponse.delete_cookie(key)方法:该方法用于删除Cookie中指定的key。
- HttpResponse.close()方法:在请求结束后WSGI服务器会调用此方法来关闭连接。
- HttpResponse.write(content)方法:该方法会将HttpResponse实例看作类似文件的对象，往里面添加内容。
- HttpResponse.flush()方法:该方法用于清空HttpResponse实例的内容。
- HttpResponse.getvalue()方法:该方法返回HttpResponse.content的值。同时，该方法将HttpResponse实例看作一个类似流的对象。

#### HttpResponse响应对象的用法

```py
from django.http import HttpResponse
import json

def response_str(request):
    # 返回文本数据
    return HttpResponse("OK")

def response_html(request):
    # 返回html数据
    return HttpResponse("<h1>html内容</h1>")

def response_json(request):
    # 返回json数据
    return HttpResponse(json.dumps({"name":"alex","age":18}))

def response_json(request):
    # 列表数据
    list_data = [
        {"id": 1, "name": 111},
        {"id": 2, "name": 222}
    ]
    # 将列表数据转换为json数组,并返回
    return HttpResponse(json.dumps(list_data))

def get_request_img(request):
    # 读取图片数据
    with open("app01/bg.png", "rb")as f:
        img = f.read()
    # 返回图片数据
    return HttpResponse(content=img,content_type="image/png")

def response_json(request):
    # 创建一个json数据
    json_data = json.dumps({"name":"alex","age":18})
    # 设置响应的响应头，响应状态等信息
    return HttpResponse(content=json_data, content_type="application/json", status=200,charset="utf-8", headers={"Content-Type": "application/json"})
```

### 响应对象 HttpResponse的子类

Django还包含了一系列的HttpResponse的衍生类(子类)，用来处理不同类型的HTTP响应。

同时，这些子类主要区别就是响应码的不同。HttpResponse衍生类的说明如下:
- HttpResponseRedirect类:重定向，返回302状态码。目前，已经被redirect()方法替代。
- HttpResponsePermanentRedirect类:永久重定向，返回301状态码。
- HttpResponseNotModified类:未修改的页面，返回304状态码。
- HttpResponseBadRequest类:错误的请求，返回400状态码。
- HttpResponseNotFound类:页面不存在，返回404状态码。
- HttpResponseForbidden类:禁止访问，返回403状态码。
- HttpResponseNotAllowed类:禁止访问，返回405状态码。
- HttpResponseGone类:响应过期，返回405状态码。
- HttpResponseServerError类:服务器错误，返回500状态码。

#### JsonResponse类-返回Json数据

JsonResponse对象是HttpResponse对象的子类。JsonResponse对象的内部直接将数据转换为json格式。（会默认设置 Content-Type: application/json）。

JsonResponse类的构造方法如下
```py
class JsonResponse(data,encoder=DjangoJSONEncoder,safe=True,json_dumps_params=None,**kwargs)
# JsonResponse类会默认Content-Type头部设置为application/json
# data参数应该是一个字典数据类型。如果后面的safe参数设置为False，则该参数可以为任意JSON对象。
# encoder参数默认设置为django.core.serializers.json.DjangoJSONEncoder，用于序列化数据。
# safe参数只有设置为False时，才可以将任何可JSON序列化的对象作为data参数的值。如果safe参数设置为True，则同时将一个非字典型对象传递给data参数时，会触发一个TypeError错误。
# json_dumps_params参数通过将一个字典类型关键字参数传递给json.dumps()方法,来生成一个响应。
```

代码示例如下
```py
from django.http import HttpResponse, JsonResponse
def response_json(request):
    return JsonResponse(data={"id": 1, "name": 111}) # 等价于 HttpResponse(json.dumps(data), content_type='application/json')

def response_json2(request):
    # 若要序列化一个非字典数据，则需要设置safe为False。否则会抛出异常。
    return JsonResponse(data=[1,2,3],safe=False)

```

#### FileResponse 对象-返回文件

在Django框架中,FileResponse类用于返回文件类型的响应数据。通常用于给浏览器返回一个文件附件。

对于FileResponse类而言，如果提供了WSGI服务器，则使用wsgi.file_wrapper，否则会将文件
分成小块进行传输。

FileResponse类的定义如下:
```py
class FileResponse(open_file, as_attachment=False, filename='',**kwargs)
```

- 如果设置as_attachment=True，则Content-Disposition被设置为attachment，通知浏览器这是一个以文件形式下载的附件;否则Content-Disposition会被设置为inline(浏览器默认行为)。
- 如果open_file参数传递的类文件对象没有名字，或者名字不合适，那么可以通过filename参数为文件对象指定一个合适的名字。


#### HttpResponseRedirect对象-重定向

HttpResponseRedirect对象是HttpResponse对象的子类。

重定向分为两种：
- 外链重定向。即跳转到外部网址。
- 路由重定向。即重新请求其他路由。

```py
def get_request_info(request):
    # 重定向外部网址
    return HttpResponseRedirect("http://www.baidu.com")

from django.shortcuts import redirect
def redirect_to_home(request):
    # 重定向其他路由
    return redirect('home/')
```

Django 提供了 redirect() 方法来处理 URL路由 的重定向。使用 redirect() 时，可以直接传入视图的名称来实现反向解析，即根据视图名称自动生成 URL。


> redirect() 方法

redirect() 方法会返回一个HttpResponseRedirect对象，并通过传递参数到适当的URL地址上。

redirect()方法语法格式：`redirect(to, *args, permanent=False, **kwargs)`

传递的参数:
- 一个模型:通过模型对象的get absolute_url()函数进行调用。
- 一个视图名称(可能带有参数):通过reverse()方法来进行反向解析的名称。
- 一个目前将要被重定向位置的绝对或相对URL地址。

示例
```py
from django.shortcuts import redirect

def my_view(request):
    # 调用对象的get_absolute_url()方法,获取模型对象的URL重定向地址
    obj = MyModel.objects.get_absolute_url(...)
    # redirect()函数传入地址，进行重定向
    return redirect(obj)

def my_view2(request):
    # 通过视图名称和一些参数返回重定向URL
    return redirect('some-view-name', foo='bar')

def my_view3(request):
    #通过硬编码返回重定向URL
    return redirect('https://www.redirect-url.com/')

def my_view(request):
    #通过硬编码返回重定向URL
    return redirect('/page/content/detail/')    

```


### 视图装饰器

视图装饰器用来对视图函数进行相关的控制操作，实现了对各种HTTP特性的支持功能。

在Django框架中，位于django.views.decorators.http模块的装饰器被用来限制可以访问该视图的HTTP请求方法。如果请求的HTTP方法不是指定的方法之一，则返回django.http.HttpResponseNotAllowed响应。


#### require_http_methods()装饰器

当视图方法被require_http_methods()装饰器修饰的时候，该视图方法仅能被特定的请求方式访问

```py
from django.views.decorators.http import require_http_methods

#请求方法应该是大写
@require_http_methods(["GET"， "POST"])
def my_view(request):
    # 现在可以假设只有GET或POST请求才能到达这里
    # ...

```

#### require_GET() require_POST() require_safe() 装饰器

- require_GET()装饰器:是require_http_methods()装饰器的简化版本，功能上只允许GET请求方式的访问。
- require_POST()装饰器：是require_http_methods()的简化版本，功能上只允许POST请求方式的访问。
- require_safe()装饰器：只允许安全的请求类型，也就是GET请求方式和HEAD请求方式的访问。这类请求通常用于读取数据。

代码示例
```py
from django.views.decorators.http import require_GET, require_POST, require_safe

# 仅处理 GET 请求
@require_GET
def my_view(request):
    # ... 业务代码

# 仅处理 POST 
@require_POST
def my_view2(request):
    # ... 业务代码

# 仅处理GET和HEAD请求
@require_safe
def my_view3(request):
    # ... 业务代码

```




### 简单视图类

视图即可以是一个函数，也可以是一个类。

视图类通过继承 Django 提供的基类来组织视图逻辑，使得视图的代码更加模块化、可复用，并且更符合面向对象的编程范式。

视图类需要通过继承 Django 的 View 类来定义，并覆写View类的方法。

View类提供了`get post put patch delete head options trace`等方法,不同的方法有不同的作用。

示例如下
```py
## views.py
## 定义视图类HomeView
from django.http import HttpResponse
from django.views import View
class HomeView(View):
    def get(self, request):
        ## 这里编写处理 get 请求的逻辑
        return HttpResponse("this is get request")
    
    def post(self, request):
        ## 这里编写处理 post 请求的逻辑
        return HttpResponse("this is post request")

    def put(self, request):
        ## 这里编写处理 put 请求的逻辑
        return HttpResponse("this is put request")

    def delete(self, request):
        ## 这里编写处理 delete 请求的逻辑
        return HttpResponse("this is delete request")


## urls.py
from django.urls import path
from myapp.views import HelloView  # 假设视图类定义在 myapp 的 views.py 中
## 给视图类配置 URL 路由
urlpatterns = [
    # 当路由绑定视图类的时候，需通过 as_view() 方法将视图类 “转换” 为可被路由识别的可调用对象。
    path('hello/', HelloView.as_view(), name='helloview'),
]

```

> as_view() 方法的作用

as_view() 方法会创建视图类的实例对象，然后在请求到来时，根据请求的 HTTP 类型（如 GET、POST ），调用实例中对应的方法（如 get、post ）来处理请求。

简而言之就是，GET类型的'hello/'请求会调用HelloView视图类的get方法,其他同理。

> 路由与视图类的自定义方法可以进行绑定吗？

路由只能通过 as_view() 绑定视图类中的 HTTP 方法（如 get/post/put 等 ），自定义方法无法直接被路由触发。

因为 Django 无法识别视图类中的自定义方法，因此不能直接通过路由触发。但是可以在视图类中的HTTP 方法（如 get/post/put 等 ）中调用自定义方法，从而实现间接触发。


#### 基本类视图的其他方法

> setup 方法

调用具体 HTTP 方法处理函数（如 get、post ）之前调用，可用于初始化。

```py
from django.views import View
class HomeView(View):
    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.some_attribute = "初始化的值"  # 自定义属性，后续方法可使用

```

> dispatch 方法

负责根据请求的 HTTP 方法，分发到对应的处理函数（如 get、post ）。也可重写它来添加统一的预处理或后处理逻辑，比如权限校验。

```py
from django.views import View
class HomeView(View):
    def dispatch(self, request, *args, **kwargs):
        # 预处理：检查用户是否登录
        if not request.user.is_authenticated:
            return HttpResponse("请先登录", status=401)
        # 调用父类的 dispatch 方法，继续向后处理请求
        return super().dispatch(request, *args, **kwargs)
    
    def get(self, request):
        return HttpResponse("已登录用户才能执行的GET请求方法")
```


### 模板类视图 TemplateView

Django 提供了 TemplateView 类视图来处理渲染模板的常见需求。

```py
from django.views.generic import TemplateView

class AboutUsView(TemplateView):
    template_name = 'about.html'
    
    # 向模板传递额外数据（可选）
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['current_year'] = datetime.now().year
        return context
```

### ListView 类视图

Django 提供了很多通用类视图，例如 ListView 用于查询列表数据

```py
from django.views.generic import ListView
from myapp.models import Product

class ProductListView(ListView):
    model = Product
    template_name = 'product/list.html'
    context_object_name = 'product_list'
    paginate_by = 12  # 每页显示12条数据
    ordering = ['-created_at']  # 按创建时间倒序排列
    
    # 自定义查询集（可选）
    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.GET.get('category')
        if category:
            return queryset.filter(category=category)
        return queryset
```

ProductListView 会自动查询数据库中的所有 Product 对象，并将它们传递给模板list.html。

