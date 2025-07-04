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

## 视图（View）

在Django框架中，视图（View）是用于处理Web请求和生成响应的核心组件。即接收一个 Web 请求对象，并返回一个 Web 响应对象。

视图的主要作用包含业务逻辑处理，决定如何处理输入、验证表单数据、调用模型更新数据库等。

Django中的视图有两种：视图函数和视图类。

### 简单视图函数

视图函数本质上就是一个Python函数，用于接收Web请求并且返回Web响应。

对于基于Django框架的Web项目而言，通常约定将视图函数写在项目或应用目录中名称为“views.py”的文件中。

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

### 接收request请求

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

### HttpResponse响应对象

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


## URL 路由

Django 的 URL 路由是其核心组件之一，它负责将用户的 HTTP 请求（即 URL）映射到相应的视图函数上。

> URL 路由的作用

客户端发来的HTTP请求经过URL路由映射处理后，会发送到相应的View视图处理函数进行处理，View视图函数处理完成后，再通过HtpResponse对象返回具体信息到客户端进行显示。

> URL 路由文件

在 Django 中，URL路由通常写在工程的 `urls.py` 文件中。这个文件定义了 URL 路由和它们对应的视图函数。

> 路由文件的基本示例

```py
from django.urls import path
from .views import get_info

urlpatterns = [
    ## 通过path函数，将`get_info/`路由与get_request_info视图函数进行绑定。
    path('get_info/',get_request_info)
]
```

### 路由与视图函数绑定

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

### 路由模块化管理 include函数


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

### 路由传递额外参数给视图函数

在 Django 中，有多种方式可以将额外参数传递给视图函数。

> 方式1：定义路由时，可以设置额外参数

```py
# urls.py 文件中
from django.urls import path
from. import views
urlpatterns = [
    path('example/', views.example_view, {'extra_param': '额外参数值'}),
]

# views.py文件中
from django.http import HttpResponse
def example_view(request,extra_param):
    print(f"extra_param: {extra_param}")
    return HttpResponse("视图函数执行成功")

```

> 方式2：使用查询字符串

可以在 URL 中通过查询字符串的形式传递参数，然后在视图函数中从request.GET获取。

```py
# urls.py 文件中
from django.urls import path
from. import views
urlpatterns = [
    path('example/<int:id>/', views.example_view),
]

# views.py文件中
from django.http import HttpResponse
def example_view(request, id):
    print(f"id: {id}")
    return HttpResponse("视图函数执行成功")

```

> 方式3：使用类视图的as_view()方法传入额外参数

```py
# urls.py 文件中
from django.urls import path
from. import views
urlpatterns = [
    path('example/<int:id>/', views.ExampleView.as_view(extra_param='额外参数值')),
]

# views.py文件中
from django.views.generic import View
from django.http import HttpResponse
class ExampleView(View):
    def get(self, request, id, extra_param):
        print(f"id: {id}, extra_param: {extra_param}")
        return HttpResponse("类视图执行成功")

```

以上几种方式可以根据实际业务需求灵活选择，实现将额外参数传递给视图函数的目的。

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
