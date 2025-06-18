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

> Django的特点

- 快速开发: Django的最大优势之一就是能够快速搭建Web应用。它通过提供开箱即用的组件，如认证、后台管理、表单、数据库管理等，使开发者能够专注于业务逻辑而不必从零开始编写大量的代码。
- ORM（对象关系映射）：Django 提供了一个强大的 ORM，允许开发者通过 Python 代码来定义和操作数据库模型，而无需直接使用 SQL。这使得数据库操作更加抽象和易于管理。
- 自动化 admin 后台界面： Django 自动生成管理后台页面，使得管理和操作数据库的过程变得非常简单。
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
# 语法
django-admin startproject 工程名称
# 例子
django-admin startproject djangoDemo1
```

django-admin 命令行管理工具会根据命令创建一个工程目录，然后再其中会创建一个同名子目录和一个 `manage.py` 文件。其中同名子目录包含了Django工程的一些启动文件和配置文件。

如下图所示为工程的目录结构。
![django_20250612163123.png](../blog_img/django_20250612163123.png)

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

② 运行该Django工程

进入到工程所在目录。执行下面命令。

```shell
python manage.py runserver
```

运行命令如下图所示。端口号默认为 8000。
![django_20250612164818.png](../blog_img/django_20250612164818.png)

浏览器访问`http://127.0.0.1:8000/`。如下图所示
![django_20250612164929.png](../blog_img/django_20250612164929.png)

③ 创建子工程(子应用)

当Django工程创建完之后，我们还需要写正式的业务代码。通常一个Django工程中可以有多个子工程，根据业务功能的不同，创建不同的子工程。类似功能模块的概念。

```py
# 创建一个名为app01的子应用的命令 
python manage.py startapp app01
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

Django5 采用了 MTV 架构，即模型（Model），视图（View）和模板（Template）。这与传统的 MVC 架构非常相似，但在实现上有所不同。

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


除了以上三层之外，还有一个 URL 路由控制器，它的作用是将一个个 URL 的请求分发给不同的 View视图处理，View视图再调用相应的 Model模型 和 Template模板。

大致操作流程如下
![python_20240427125050.png](../blog_img/python_20240427125050.png)

## 模型（Model）

在 Django 中，模型是对数据库表的抽象。每个模型类对应一个数据库表，模型类的属性则对应数据库表中的字段。

Django 的模型是通过继承 django.db.models.Model 类来定义的。每个模型类的属性代表数据库表中的字段，Django 会根据模型自动生成数据库迁移文件并同步到数据库。


示例如下
```py
from django.db import models
# 定义一个User模型类，以及模型类中的一些属性。
class User(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    idCard = models.CharField(max_length=100)
    create_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

```

- 上面代码中定义一个模型类，该类对应数据库中的一个表。
- 每个模型类都可以有主键属性，它是一个自增的整数，用于对应表中主键列。主键属性的名称通常是 id。
- 每个模型类可以定义多个属性，每个属性对应数据库表中的一个列。
- 每个属性都有一个名称，用于标识该列。属性的名称通常是小写字母，多个单词之间用下划线分隔。
- 每个属性都可以有一些选项，用于指定该属性的默认配置，例如最大长度、是否为空等。

> 常用的字段类型如下

- 整数（IntegerField）：用于存储整数。
- 浮点数（FloatField、DecimalField）：用于存储浮点数
- 字符串（CharField、TextField）:用于存储文本
- 布尔值（BooleanField）：用于存储布尔值（True 或 False）。
- 文件（FileField、ImageField）：用于存储图像，支持文件上传。
- 关系字段（ForeignKey、ManyToManyField、OneToOneField）：表示外键，一对多，多对多关系。
- 日期时间（DateTimeField、DateField、TimeField）：用于存储日期和时间
    - auto_now_add=True 表示创建时自动填充当前时间
    - auto_now=True 表示每次保存时都会自动更新时间。

## 视图（View）

视图本质是一个函数或类。主要作用是接收一个 request 对象，并返回一个 HttpResponse 或其他响应对象。

视图的主要作用包含业务逻辑，决定如何处理输入、验证表单数据、调用模型更新数据库等。

示例如下
```py
from django.http import HttpResponse
from django.shortcuts import render
 
# 简单的视图函数
def home(request):
    # 返回一个HttpResponse响应对象
    return HttpResponse("Welcome to the home page!")
 
# 使用模板的视图函数
def about(request):
    # render() 函数将一个模板页面包装为HttpResponse响应对象，并返回。   
    return render(request, 'about.html')

```

### request请求

#### 获取请求的基本信息

视图函数的第一个参数用于接收路由发送过来的HTTP请求的相关信息。第一个参数的命名是任意的，通常取名为request

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

#### 获取GET请求的请求参数

由于GET请求没有请求体，因此GET请求的请求参数都在请求路径上。

例如请求路径`http://localhost:8000/app01/get_request/?a=1&b=2`中的请求参数就是`a=1&b=2`

可以直接通过request.GET来获取请求路径上的参数。

示例如下
```py
def get_request_info2(request):
    ## 若是GET请求
    if request.method == "GET":
        print(request.GET) #获取请求路径上的请求参数

        ##若一个请求的路径为`http://localhost:8000/app01/get_request/?a=1&b=2`。
        ##则request.GET来获取请求路径上的参数为`{'a': ['1'], 'b': ['2']}`。

        ## 或者 获取单个参数
        print(request.GET.get('a'))
        print(request.GET.get('b'))

    return HttpResponse("OK")
```

#### 获取POST请求中的表单数据

POST请求有请求体，请求体的数据有两种存储方式。一种是表单数据，一种是json数据。

我们可以通过request.POST来获取请求体中的表据单数。

示例如下
```py
def get_request_info(request):
    ## 若是POST请求
    if request.method == "POST":
        print(request.POST) #获取请求体的表单数据

    return HttpResponse("OK")
```

#### 获取POST请求中的Json数据

request.POST不能获取请求体中的json数据，只能通过request.POST来获取请求体中的表据单数。。

示例如下
```py
import json

def get_request_info(request):
    print(request.body)  #获取请求体中的json数据

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

#### 获取请求路径中的参数

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

### HttpResponse对象

django针对Http请求的响应，提供2种方式。
- 方式1：响应内容：即直接响应数据给浏览器。
    - 响应html内容,一般用于web前后端不分离的方式。
    - 响应json内容，一般用于web前后端分离的方式。
- 方式2：重定向。即返回页面跳转的信息给浏览器，让浏览器自行页面跳转。


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
```

HttpResponse对象除了可以返回各种数据，还可以设置响应的各种信息。

示例如下
```py
from django.http import HttpResponse
import json

def response_json(request):
    
    json_data = json.dumps({"name":"alex","age":18})
    # 设置响应的响应头，响应状态等信息
    return HttpResponse(content=json_data, content_type="application/json", status=200,charset="utf-8", headers={"Content-Type": "application/json"})
```

#### JsonResponse对象-返回Json数据

JsonResponse对象的内部直接将数据转换为json格式。

```py
from django.http import HttpResponse, JsonResponse
def response_json(request):
    # 返回json数据
    json_data = {"id": 1, "name": 111}
    return JsonResponse(data=json_data)
```

#### HttpResponseRedirect对象-重定向

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


### 类视图

视图即可以是一个函数，也可以是一个类。

类视图通过继承 Django 提供的基类来组织视图逻辑，使得视图的代码更加模块化、可复用，并且更符合面向对象的编程范式。

类视图通过继承 Django 的 View 类来定义。

### 基本类视图 View

基本类视图通过继承 Django 的 View 类来定义。

```py
from django.http import HttpResponse
from django.views import View
class HomeView(View):
    def get(self, request):
        return HttpResponse("Welcome to the home page!")
```

在示例中，HomeView 继承了 View 类，并重写了 get() 方法来处理 GET 请求。

### 模板类视图 TemplateView

Django 提供了 TemplateView 类视图来处理渲染模板的常见需求。

```py
from django.views.generic import TemplateView
class AboutView(TemplateView):
    template_name = 'about.html'
```

### ListView 类视图

Django 提供了很多通用类视图，例如 ListView 用于列出对象

```py
from django.views.generic import ListView
from .models import Article
class ArticleListView(ListView):
    model = Article
    template_name = 'article_list.html'
    context_object_name = 'articles'
```

ListView 会自动查询数据库中的所有 Article 对象，并将它们传递给模板article_list.html。

## 模板（Template）

模板负责数据的展示与布局。模板本质上就是html页面。

我们可以在视图函数中，用render方法将html页面作为响应返回给客户端。需要3个步骤。
1. 在项目配置文件setting.py中设置模板目录的位置。一般模板目录创建在工程根目录下。
2. 在模板目录中创建对应的模板页面文件，并根据模板语法和视图函数传递过来的数据去填充页面。
3. 在视图函数中使用render方法将某个模板页面作为响应返回给客户端。

### 模板页面作为响应返回

① setting.py中设置模板目录位置

- 创建模板目录templates。
- 修改setting.py文件中的TEMPLATES的DIRS配置项。如下所示

```py
TEMPLATES = [
    {
        ......
        'DIRS': [BASE_DIR / 'templates'],
        .......
    },
]
```

② 创建模板页面文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>this is user.html</h1>
</body>
</html>
```

③ 视图函数中使用render方法将模板页面作为响应返回给客户端
```py
from django.shortcuts import render
def get_request_info(request):
    return render(request, template_name='user.html')
```

render方法本质上还是将模板页面封装为HttpResponse响应对象，并返回给客户端。

### Django模板语言（DTL）

Django 模板基于 Django模板语言（DTL），它提供了一些强大的功能，如模板标签、过滤器、条件语句和循环等，可以动态地渲染和控制页面内容。

Django模板语言（DTL）主要包括以下几个部分。
- 模板变量：用于显示动态数据。
- 模板标签：控制模板的逻辑（如条件语句、循环等）。
- 模板过滤器：用于修改变量的输出内容。

### 模板变量

模板变量用 `{{ }}` 包裹。表示从视图中传递过来的数据会被填充到这里,具体填充什么数据，根据模板变量中参数而定。

示例如下

创建一个视图函数user_show
```py
from django.shortcuts import render
def user_show(request, user):
    # 将user参数，传递给模板。
    return render(request, 'user.html', {'user': user})
```

创建一个user.html模板
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>ID {{ user.id }}!</h1>
    <h1>姓名 {{ user.name }}!</h1>
    <h1>电话 {{ user.phone }}!</h1>
    <h1>ID {{ user.idCard }}!</h1>
    <h1>邮箱 {{ user.email }}!</h1>
</body>
</html>
```

render方法会将user数据传递给模板，模板变量会根据视图传递的数据填充到HTML页面中。并动态生成全新的HTML页面。最终返回给客户端。


### 模板标签

模板标签用于实现更复杂的功能，如条件判断、循环等。标签使用 {% %} 包裹。常用的模板标签包括 if、for等。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>ID {{ user.id }}!</h1>
    <h1>姓名 {{ user.name }}!</h1>
    <h1>电话 {{ user.phone }}!</h1>
    <h1>ID {{ user.idCard }}!</h1>
    <h1>邮箱 {{ user.email }}!</h1>

    <!--这是 if 条件模板标签的示例-->

    {% if user.is_authenticated %}
        <p>姓名 {{ user.name }}!</p>
    {% else %}
        <p>Please log in to access your profile.</p>
    {% endif %}

    <!--这是 for 循环模板标签的示例-->
    <ul>
    {% for post in post_list %}
        <li>{{ post.title }} - {{ post.created_at }}</li>
    {% empty %}
        <li>No posts available.</li>
    {% endfor %}
    </ul>
</body>
</html>
```

- if 模板标签用于根据条件执行不同的代码块。在模板中，if 标签用于判断条件是否成立，如果成立则执行相应的代码。
- for 模板标签用于循环遍历一个序列（如列表、字典等）。


### 模板过滤器

模板过滤器本质上是一个函数。用于对模板变量进行输出和调整。它们在模板变量后面用 | 分隔表示。

例如，`{{ value|lower }}` 会将 value 模板变量转换为小写字母。

示例如下
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>ID {{ user.id }}!</h1>
    <h1>姓名 {{ user.name }}!</h1>
    <h1>电话 {{ user.phone }}!</h1>
    <h1>ID {{ user.idCard }}!</h1>
    <h1>邮箱 {{ user.email|lower }}!</h1>
    <h1>生日 {{ user.birth|date:'Y-m-d' }}!</h1>
</body>
</html>
```

常用的模板过滤器如图所示
![django_20250618163657.png](../blog_img/django_20250618163657.png)

## URL 路由

Django 的 URL 路由是其核心组件之一，它负责将用户的 HTTP 请求（即 URL）映射到相应的视图函数上。

每当用户在浏览器中访问某个 URL 时，Django 会根据项目的 URL 配置文件（urls.py）来匹配对应的视图函数，并调用它来处理请求。

在 Django 中，URL 路由配置通常位于 urls.py 文件中。这个文件定义了 URL 路由和它们对应的视图函数。

Django 通过 path()函数 和 re_path() 函数来配置 URL 路由。
- path()函数 是 Django 推荐的方式，它使用简洁的字符串匹配模式；
- re_path()函数 是使用正则表达式进行更复杂的匹配。

> 使用 path()函数 定义 URL 路由

path()函数 是 Django 配置 URL 路由的推荐方式，它使用简洁的字符串匹配模式。

```py
from django.urls import path
from . import views
 
urlpatterns = [
    ## /home/ 路由映射到 views.home 视图函数。
    path('home/', views.home, name='home'),
    ## /about/ 路由映射到 views.about 视图函数。
    path('about/', views.about, name='about'),
]
```

> URL 路由添加动态参数

```py
urlpatterns = [
    ## /profile/???/ 路由映射到 views.profile 视图函数。
    path('profile/<int:user_id>/', views.profile, name='profile'),
]
```

URL 中的 `<int:user_id>` 会被动态替换为实际的 user_id，并传递给视图函数 profile()。其中int表示动态参数的类型。例如`/profile/111/，/profile/222/`等

> 使用 re_path()函数 定义 URL 路由

re_path() 函数允许你使用正则表达式来匹配更复杂的 URL 模式。它的基本语法与 path() 类似，但它允许你使用正则表达式进行灵活的匹配。

```py
from django.urls import re_path
from . import views
urlpatterns = [
    re_path(r'^article/(?P<slug>[\w-]+)/$', views.article_detail, name='article_detail'),
]
```

### 路由模块化管理

> 使用include函数 引入子工程的路由。

当我们在Django工程中创建了多个子工程。每个子工程都有各自的路由urls文件。此时我们可以在Django主工程的urls文件中使用include函数来引入各个子工程的路由文件，从而实现路由的模块化管理。

```py
# 主路由配置（project/urls.py）
urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls')),   # 引入blog子工程的路由
]
```

`path('blog/', include('blog.urls'))` 这句话的作用是引入blog子工程中的urls路由文件。并设置'blog/'为该子工程路由的前缀。


## Django 配置文件

在 Django 的核心包里面存在了一个全局默认配置文件`django/conf/global_settings.py`，同时在开发者构建Django工程的时候，也生成了一个全局项目配置文件在工程主目录下的 `setting.py` 文件中。

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

# 设置当前Django项目允许哪些IP地址访问
# ALLOWED_HOSTS = ['*'] *代表任意IP都可以访问
ALLOWED_HOSTS = []


# 已注册到Django项目的子应用列表。下面是Django官方内置的子应用。
# 当创建子应用的时候，需要在该列表中添加对应子应用名称。否则Django项目无法识别子应用。
INSTALLED_APPS = [
    'django.contrib.admin',         #django内置的admin子应用
    'django.contrib.auth',          #django内置的登录认证功能
    'django.contrib.contenttypes',  #django内置的内容类型管理
    'django.contrib.sessions',      #django内置的session功能
    'django.contrib.messages',      #django内置的消息功能
    'django.contrib.staticfiles',   #django内置的静态文件服务功能
]

# 中间件（拦截器）MIDDLEWARE 实际就是django提供给开发者在http请求和响应过程中，进行数据拦截的插件系统。
# 中间件 主要用于拦截请求或响应，数据修饰，权限判断等功能。
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',        # 安全中间件（跨域判断等）
    'django.contrib.sessions.middleware.SessionMiddleware', # session中间件（提供session功能）
    'django.middleware.common.CommonMiddleware',            # 通用中间件
    'django.middleware.csrf.CsrfViewMiddleware',            # Csrf中间件
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # 权限认证中间件
    'django.contrib.messages.middleware.MessageMiddleware',     # 消息中间件
    'django.middleware.clickjacking.XFrameOptionsMiddleware',   # 网站安全中间件
]

# django工程中的根路由文件的地址
ROOT_URLCONF = 'djangoDemo1.urls'

# 模板引擎配置
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates']    ## 配置模板目录所在的位置
        ,
        'APP_DIRS': True,
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


# Database 数据库配置
DATABASES = {
    # 默认使用sqlite3数据库
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
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


# 国际化语言配置，默认英文
LANGUAGE_CODE = 'zh-hans'   #中文
# LANGUAGE_CODE = 'en-us'   # 英文

# 时区配置
# TIME_ZONE = 'UTC'     #英国时间
TIME_ZONE = 'Asia/Shanghai'       #中国时间

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


# 静态文件输出

通过下面的配置，django工程允许后，可以直接访问下面的静态文件，从而提供给客户端进行访问。






//////////////////////////////////////////////////////////////////








## Django ORM

Django 对各种数据库提供了很好的支持，包括：PostgreSQL、MySQL、SQLite、Oracle。Django 为这些数据库提供了统一的调用API。 

Django 可以使用自带的 ORM 描述对象和数据库之间的映射的元数据，将程序中的对象自动持久化到数据库中

因此 ORM 在业务逻辑层和数据库层之间充当了桥梁的作用。

1. ORM 会将 Python 代码转成为 SQL 语句。
2. SQL 语句通过 数据库驱动(例如pymysql) 传送到数据库服务端。
3. 然后在数据库中执行 SQL 语句并将结果返回。

![python_20240427133356.png](../blog_img/python_20240427133356.png)









