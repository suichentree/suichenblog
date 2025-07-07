---
title: Django笔记2
date: 2025-07-02
sidebar: 'auto'
categories: 
 - Python
tags:
 - Django
---

[toc]

# Django笔记2

![django_20250612171640.png](../blog_img/django_20250612171640.png)

目前最新的Django LTS版本为5.2.3


## Django 路由

Django 的路由是其核心组件之一，它负责将用户的 HTTP 请求（即 URL）映射到相应的视图函数上。

> 路由的作用

Django框架会将客户端发来的HTTP请求交给路由进行处理。路由会根据请求的URL来确定应该调用哪个视图函数来处理请求。当视图函数处理完成后，再通过视图函数的返回值将数据返回给客户端。

> 路由文件

在 Django 中，路由通常写在工程的 `urls.py` 文件中。这个文件定义了路由和它们对应的视图函数。

路由文件的基本示例
```py
from django.urls import path
from .views import get_info

urlpatterns = [
    ## 通过path函数，将`get_info/`路由与get_request_info视图函数进行绑定。
    path('get_info/',get_request_info)
]
```

### 路由与视图函数绑定

> 使用 path()函数 定义路由

path()函数 是 Django 配置路由的推荐方式，它使用简洁的字符串匹配模式。

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

> 路由中设置动态参数

```py
urlpatterns = [
    ## /profile/???/ 路由映射到 views.profile 视图函数。
    path('profile/<int:user_id>/', views.profile, name='profile'),
]
```

URL 中的 `<int:user_id>` 会被动态替换为实际的 user_id，并传递给视图函数 profile()。其中int表示动态参数的类型。例如`/profile/111/，/profile/222/`等

> 使用 re_path()函数 定义路由

re_path() 函数允许你使用正则表达式来匹配更复杂的路由。它的基本语法与 path() 类似，但它允许你使用正则表达式进行灵活的匹配。

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

## Django 模板

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

### render()方法

render函数可以将一个模板和一个上下文字典，返回一个渲染后的HttpResponse对象。

render函数语法格式
```py
render(request, template_name, context=None, content_type=None, status=None, using=
None)
```

- request:视图函数正在处理的当前请求，封装了请求头(Header)的所有数据，其实就是视图请求参数。
- template_name:视图要使用的模板的完整名称或者模板名称的列表。如果是一个列表，将使用其中能够查找到的第一个模板。
- context:将要添加到模板上下文中的字典类型值。默认情况下，这是一个空的字典值。如
果字典中的值是可调用的，则视图将在渲染模板之前调用该参数。
- content_type:响应内容的类型，默认设置为“text/html”。
- status:响应的状态代码，默认值为“200”。
- using:用于加载模板的模板引擎名称。

### Django模板语言（DTL）

Django 模板基于 Django模板语言（DTL），它提供了一些强大的功能，如模板标签、过滤器、条件语句和循环等，可以动态地渲染和控制模板页面的内容。

Django模板语言（DTL）主要包括以下几个部分。
- 模板变量：用于显示动态数据。
- 模板标签：控制模板的逻辑（如条件语句、循环等）。
- 模板过滤器：用于修改变量的输出内容。

#### 模板变量

模板变量用 `{{ }}` 包裹。表示从视图函数中传递过来的数据会被填充到这里,具体填充什么数据,根据模板变量中参数而定。

模板变量的名称由字母、数字和下划线任意组合组成，但注意不能以下划线开头。另外，变量名称中还不能包含空格或标点符号(“.”除外，其具有特殊含义)。

示例如下

创建一个视图函数user_show
```py
from django.shortcuts import render
def user_show(request):
    user = {id:1,name:'xiaoming',phone:'13888888888',idCard:'111111111111111111',email:'123456@qq.com'}
    # 将user的值，传递给模板。
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

render方法会将user数据传递给模板，模板会根据模板变量和传递过来的参数，进行匹配。如果模板变量和参数名称相同，则将参数值填充到模板变量中。最终动态渲染成全新的HTML页面。



#### 模板标签

模板标签用于实现更复杂的功能，如条件判断、循环等。模板标签使用 `{% %}` 包裹。

常用的模板标签如下所示
- if标签:逻辑条件判断。
- for标签:用于循环遍历（如列表、字典等）。
- autoescape标签:自动转义。可以对超链接地址进行自动转义。
- cycle标签:循环对象的值。
- ifchanged标签:判断一个值是否在上一次的选代中被改变了
- regroup标签:用于重组对象。
- resetcycle标签:用于重置通过cycle标签操作的循环对象
- ur1标签:定义链接的标签。
- templatetag标签:用于输出模板标签字符。
- widthratio标签:用于计算比率
- now标签:用于显示当前时间。

代码示例如下
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

    {% if user.name == 'A' %}
        <p>姓名 {{ user.name }}!</p>
    {% elif user.name == 'B' %}
    <p>姓名 {{ user.name }}!</p>
    {% else %}
        <p>user name is C</p>
    {% endif %}

    <!--这是 for 循环模板标签的示例-->
    <ul>
    {% for post in post_list %}
        <li>{{ post.id }} - {{ post.title }}</li>
    {% endfor %}
    </ul>

    当时时间为{% now"H:i:s DY/M/d"%}

</body>
</html>
```


#### 模板过滤器

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


## Django 模型

Diango框架提供了对各种主流数据库很友好的支持，这些数据库包括PostgreSQL、SQLite、MySQL、MariaDB和Oracle等，Django也为这些数据库提供了统一的API调用接口。

而Diango框架中的模型主要用来关联并操作数据库，Diango模型包含了储存数据的字段与行为,一般每个模型都会映射一张数据库表。

在Django官方文档中，关于Diango模型有如下的说法:
- 一个Django模型相当于一个Python的类，该类继承自diango.db.models.Model
- Diango模型类的每个属性都相当于一个数据库的字段。
- Diango模型会自动生成访问对应数据库的API

### Django ORM

ORM 的作用是描述模型对象和数据库之间的映射，将程序中的模型对象自动持久化到数据库中。

因此 Django ORM 在业务逻辑层和数据库层之间充当了桥梁的作用。通过描述模型对象和实体数据库之间的映射的元数据,将程序中的模型对象自动持久化到实体数据库中。

Django ORM的作用如图所示
1. Django ORM 会自动将相关的 Python 代码转为 SQL 语句。
2. SQL 语句通过 数据库驱动(例如pymysql) 传送到数据库服务端。
3. 然后在数据库中执行 SQL 语句并将结果返回。

![python_20240427133356.png](../blog_img/python_20240427133356.png)

### Django 连接数据库 sqlite

Django 默认情况下是可以直接使用 sqlite数据库的。

settings.py 文件中
```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

## NAME是SQLite 数据库文件的路径。db.sqlite3 是默认的 SQLite 数据库文件名
```

### Django 连接数据库 mysql

① 安装mysql驱动

```py
# 使用 pymysql 数据库驱动
pip install pymysql
```

若使用 pymysql，需在项目的 `__init__.py` 中添加下面这段代码。作用是让Django内置的ORM能以mysqldb的方式来调用pymysql

```py
# 在项目根目录的 __init__.py 中添加下面这段代码
import pymysql
pymysql.install_as_MySQLdb()
```

② 提前在mysql中创建数据库和数据表。

③ 配置mysql数据库配置

在setting.py中配置数据库的连接信息。Django默认初始配置使用sqlite数据库。因此需要替换为mysql数据库的配置。

```py
# setting.py 文件
# Database 数据库配置
DATABASES = {
    # 使用mysql数据库
    'default': {
        'ENGINE': 'django.db.backends.mysql', #数据库引擎
        'NAME': 'your_database_name',  # 数据库名
        'USER': 'your_username',      # 用户名
        'PASSWORD': 'your_password',  # 密码
        'HOST': 'localhost',          # 主机
        'PORT': '3306',               # 端口
        'OPTIONS': {
            'charset': 'utf8mb4',     # 字符集
        },
    }
}
```

④ 测试连接

```py
python manage.py migrate  # 执行迁移，验证连接是否正常
```

### 定义模型类

在 Django 中，模型是对数据库表的抽象。每个模型类对应一个数据库表，模型类的属性则对应数据库表中的字段。

注意事项
- 模型类通常定义在子工程（子应用）的`models.py`文件中。
- 模型类必须直接或间接继承 django.db.models.Model 类来定义的
- 每个模型类的属性代表数据库表中的字段。


代码如下
```py
from django.db import models
# 定义一个User模型类，以及模型类中的一些属性。
class User(models.Model):
    ## 该主键字段id。Django会为每个模型类生成id主键字段，可以不显式定义。
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100,verbose_name="姓名")
    phone = models.CharField(max_length=100,verbose_name="手机号")
    idCard = models.CharField(max_length=100,db_column='id_card',verbose_name="身份证号")
    desc = models.TextField(verbose_name="描述",null=True)
    create_time = models.DateTimeField(auto_now_add=True,verbose_name="创建时间")
    updated_time = models.DateTimeField(auto_now=True,verbose_name="更新时间")

    def __str__(self):
        # 当使用print打印模型类对象的输出内容。类似java类的toString方法。
        return self.name

    # 添加 Meta 类定义元数据
    class Meta:
        verbose_name = "用户"  # Admin 界面显示的单数名称（替代默认的 "user"）
        verbose_name_plural = "用户列表"  # 复数名称（替代默认的 "users"）
        db_table = "t_user"  # 自定义数据库表名（Django 默认表名为 {应用名}_{模型类名小写}）
        ordering = ["-create_time"]  # 默认按创建时间倒序排序（最新的在前）

```

- 上面代码中定义一个模型类，该类对应数据库中的一个表。
- 默认情况下 Django 会自动为每个模型类添加一个自增的整数类型主键（字段名为 id），可以不显式自定义主键字段。但在以下场景中可能需要自定义主键：
    - 使用 UUID 作为主键
    - 使用业务唯一编号作为主键
- 每个模型类可以定义多个属性，每个属性对应数据库表中的一个列。
- 每个属性都有一个名称，用于标识该列。属性的名称通常是小写字母，多个单词之间用下划线分隔。
- 每个属性都可以有一些选项，用于指定该属性的默认配置，例如最大长度、是否为空等。


### 模型类中的常用字段

字段类型用以指定数据库的数据类型，例如Integer、VARCHAR和TEXT这几种比较常用的数据类型。

Diango模型一共内置了多种字段类型,基本能够满足一般的设计需求。Diango模型的主要字段类型说明如下:

> 常用的字段类型如下

自动增长整数
- AutoField:一个自动增加的Integer类型。一般情况下,AutoField类型是不需要直接使用的。
- BigAutoField:类似AutoField类型，一个自动增加的长Integer(64-bit)类型。

整数
- IntegerField:一个Integer类型
- BigIntegerField:一个长Integer类型
- SmallIntegerField:一个SmallInteger类型(-32768~32767)

二进制数据
- BinaryField:一个用来存储二进制数据的类型。

布尔值
- BooleanField:一个用来存储布尔值(True/False)的类型。实际在数据库中用0/1表示。
- NullBooleanField:类似BooleanField(null=True)类型。

浮点数
- FloatField:一个用来存储浮点型数据的类型。

字符串
- CharField:一个用来存储字符串的类型。CharField类型必须额外定义一个表示最大长度的参数（max_length）
- EmailField:一个CharField类型的域，用于表示电子邮件类型。
- TextField:一个用于存储长文本的类型。

日期
- DateTimeField 字段表示年月日时分秒
- TimeField 字段表示时分秒
- DateField 字段表示年月日。

日期类型字段可以额外定义两个可选参数（auto_now和auto_now_add）。其中auto_now参数用表示每次修改时都会自动设置改字段的值为当前时间。auto_now_add参数表示创建时自动填充当前时间，与auto_now属性是互斥的。

文件
- FileField:一个用于文件上传的类型。需要定义两个必选参数（upload_to和 storage）其中upload_to参数表示存储路径,storage参数表示存储对象。
- ImageField:一个用来存储图片文件的类型，继承自FileField类型。需要定义两个必选参数（height_field和width_field）其中height_field参数表示图片的高度，width_field数表示图片的宽度。



> 常用字段属性如下

- max_length属性 指定该字段的最大存储长度。
- null	如果为 True，表示允许为空，默认值是 False。相当于 python 的 None
- blank	如果为 True，则该字段允许为空白，默认值是 False。 相当于 python 的空字符串：""
- db_column	数据表中真实的字段名称，如果未指定，则使用模型类属性的名称。防止数据字段是 python 的关键字。
- db_index	若值为 True, 则在表中会为此字段创建索引，默认值是 False。相当于 SQL 语句中的 key
- default	默认值，当不填写数据时，使用该选项的值作为字段的默认值。
- primary_key	如果为 True，则该字段在表中设置为主键，默认值是 False，一般不用设置，系统默认设置。
- unique	如果为 True，则该字段在表中创建唯一索引，默认值是 False。相当于 SQL 语句中的 unique
- verbose_name：设置该字段在 Admin 后台的显示名称（如 "姓名"）。


### 模型中的Meat类

在Django模型中，使用Meta类用于定义模型类的元数据配置（如后台显示名称、数据库表名、排序规则等）

> 什么是模型的“元数据”呢?

模型的“元数据”即是“所有不是字段的东西”。具体来讲，如排序选项ordering、数据库表名dbtable等这些在模型中都不是必需的,因此通过Meta类来定义,并且在Diango模型中,是否通过添加Meta类来定义元数据也完全是可选的。

示例代码如下
```py
from django.db import models
class User(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100,verbose_name="姓名")
    # ....

    # 添加 Meta 类给User模型类添加元数据
    class Meta:
        verbose_name = "用户"  # Admin 界面显示的单数名称（替代默认的 "user"）
        verbose_name_plural = "用户列表"  # 复数名称（替代默认的 "users"）
        db_table = "t_user"  # 自定义数据库表名（Django 默认表名为 {应用名}_{模型类名小写}）
        ordering = ["-create_time"]  # 默认按创建时间倒序排序（最新的在前）
```



### 数据迁移

当在Django工程中完成模型类的定义时。就需要通过迁移命令来创建和管理数据库。Django 会根据模型类的定义来自动生成数据库迁移文件并同步到数据库中。

① 创建数据库迁移文件。这个命令会在django工程目录中为模型类生成对应的迁移文件和数据库文件。
```py
python manage.py makemigrations
```

② 应用迁移。这个命令会将迁移应用到你的数据库中。它会更新数据库文件以匹配模型类中的定义。
```py
python manage.py migrate
```


> 数据库回滚迁移操作

在django中针对数据库的每一次数据迁移操作都会在数据库中的django_migrations表中有对应的历史记录。django_migrations表中的app字段表示迁移文件对应的应用名称，name字段表示迁移文件的名称。

```py

python manage.py migrate 应用名 迁移文件名 --fake  # 回滚指定迁移

python manage.py migrate --fake 应用名 zero  # 回滚所有迁移

python manage.py migrate --fake 应用名 迁移文件名 zero  # 回滚指定迁移之前的所有迁移
```

### 使用模型操作数据库






## 中间件MiddleWare

中间件是 Django 请求 / 响应处理机制里的钩子（hooks）框架，是轻量级、底层的插件系统 。

它能在全局改变 Django 的请求输入或响应输出，比如实现权限校验、日志记录、请求限流、添加自定义响应头这类功能，对请求和响应进行统一的预处理和后处理。

> Django 处理 HTTP 请求的大致流程如下

```
HttpRequest（用户请求） → 中间件（按顺序处理请求） → View（视图函数处理） → 中间件（按逆序处理响应） → HttpResponse（返回给用户）
```

也就是说，一个URL请求在视图函数处理前，要依次经过配置的中间件处理；视图处理完生成响应后，响应要按相反顺序再经过中间件处理，之后才返回给客户端 。

比如，你配置了 A、B、C 三个中间件，请求阶段会按 A→B→C 的顺序执行各个中间件里的请求处理逻辑；响应阶段则按 C→B→A 的顺序执行各个中间件里的响应处理逻辑 。


> Django提供两种中间件自定义方式

- 函数式中间件
- 类中间件

### 函数式中间件

① 创建一个xxx_middleware.py文件，在该文件中编写自定义中间件的代码。

示例如下
```py
def simple_middleware(get_response):
    """
    simple_middleware 自定义中间件的名称

    get_response 这个参数可以理解为视图

    middleware(request)方法就是中间件的具体业务方法。request就是请求本身
    """

    # 一次性初始化配置（服务器启动时执行，只会执行一次）
    print("中间件初始化，这段只执行一次")

    def middleware(request):
        # 1. 请求到达视图前执行的逻辑
        print("请求处理前的逻辑，每次请求都会执行")

        # 2. 传递请求给下一个中间件或视图，获取响应
        response = get_response(request)  

        # 3. 响应返回给客户端前执行的逻辑
        print("响应处理后的逻辑，每次响应都会执行")

        return response

    return middleware
```

> 自定义中间件工作流程
1. 服务器启动时，simple_middleware 外层函数执行，做初始化（如打印 “中间件初始化，只执行一次” ），返回 middleware 内层函数。
2. 每次有请求时，先执行 middleware 里 “请求处理前的逻辑”，再通过 get_response 把请求传递给下一个中间件或视图。
3. 视图处理完生成响应后，回到当前中间件执行 “响应处理后的逻辑”，最后返回响应。


② 将自定义中间件注册到Django中

```py
MIDDLEWARE = [
    # 自定义中间件（按需要的顺序添加，假设自定义中间件在myapp子应用目录中）
    'myapp.middleware.simple_middleware',  
]
```


### 类中间件

自定义的类中间件需要继承MiddlewareMixin类。

示例如下
```py
from django.utils.deprecation import MiddlewareMixin

class CustomMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        # 初始化，保存 get_response 方法，服务器启动时执行
        self.get_response = get_response
        print("类式中间件初始化，只执行一次")

    def process_request(self, request):
        # 请求到达视图前执行（按中间件顺序依次执行）
        print("process_request：请求处理前逻辑")
        # 返回 None 则继续往下走；返回 HttpResponse 则直接返回响应，不再执行后续中间件和视图
        return None  

    def process_view(self, request, view_func, view_args, view_kwargs):
        # 视图函数调用前执行（在 process_request 之后，视图执行前）
        print(f"process_view：即将调用视图 {view_func.__name__}")
        # 返回 None 则继续执行视图；返回 HttpResponse 则直接返回响应
        return None  

    def process_exception(self, request, exception):
        # 视图执行过程中抛出异常时执行
        print(f"process_exception：捕获到异常 {exception}")
        # 返回 None 则继续抛出异常给下一个中间件；返回 HttpResponse 则返回自定义响应
        return None  

    def process_response(self, request, response):
        # 响应返回给客户端前执行（按中间件逆序执行）
        print("process_response：响应处理后逻辑")
        # 必须返回 response 对象
        return response  
```

在项目 settings.py 的 MIDDLEWARE 列表里添加自定义中间件
```py
MIDDLEWARE = [
    # 自定义中间件（按需要的顺序添加）
    'myapp.middleware.CustomMiddleware',  
]
```


## Django 后台管理

当我们创建好一个Django工程的时候，Django工程会默认自带一个后台管理应用admin，用于管理 Django 工程中的数据。

Django 自带的后台管理应用admin提供了以下功能：
- 模型管理：可以直接在后台管理页面中对模型进行增删改查操作。
- 权限管理：可以对用户进行权限分组和授权，限制不同用户对不同模型的操作权限。
- 日志查看：可以查看后台管理系统的操作日志，方便排查问题。
- 数据导入导出：可以将数据库中的数据导出为 CSV、JSON 等格式，也可以从 CSV、JSON 等格式文件中导入数据。
- 自定义页面：可以根据项目需求自定义后台管理页面，添加自定义的功能模块。

### Django 登录后台管理页面

当我们运行Django工程的时候，访问Django默认的后台管理页面(`http://127.0.0.1:8000/admin/login/`)。如图所示。此时需要用户名和密码才能进行后台管理内部。

![django_20250707174620424.png](../blog_img/django_20250707174620424.png)

默认情况下Django的后台管理应用是没有配置用户名和密码的。需要在命令行中通过如下指令创建管理员超级账户

```py
# 该指令用于创建后台管理应用的管理员账户
python manage.py createsuperuser
```

如图所示
![django_20250707173615006.png](../blog_img/django_20250707173615006.png)

当管理员超级账户创建好后，输入用户名和密码登录后台管理页面。如图所示

![django_20250707174704568.png](../blog_img/django_20250707174704568.png)


### 开启后台管理功能

1. 在项目的 settings.py 文件中，找到 INSTALLED_APPS 列表，添加 'django.contrib.admin' 应用。

```py
INSTALLED_APPS = [
    # ...
    'django.contrib.admin',
    # ...
]
```

2. 运行数据库迁移命令，创建默认的管理员用户和相关数据表。

```py
python manage.py migrate
```

3. 创建一个管理员账号。

```py
python manage.py createsuperuser
```

4. 启动 Django 开发服务器。

```py
python manage.py runserver
```

5. 在浏览器中访问 `http://localhost:8000/admin`，输入之前创建的管理员账号密码，即可登录后台管理系统。

### 自定义后台管理页面

1. 在应用的 admin.py 文件中，注册模型类。

```py
from django.contrib import admin
from .models import MyModel

@admin.register(MyModel)
class MyModelAdmin(admin.ModelAdmin):
    # 自定义列表页显示的字段（默认显示所有字段）
    list_display = ('title', 'author', 'created_at')
    # 自定义搜索字段（根据指定字段进行搜索）
    search_fields = ('title', 'author')
    # 自定义筛选字段（根据指定字段进行筛选）
    list_filter = ('created_at',)
    # 自定义只读字段（在添加或编辑页面禁用指定字段）
    readonly_fields = ('created_at',)
    # 自定义字段集（将字段分组显示）
    fieldsets = (
        ('基本信息', {'fields': ('title', 'author')}),
        ('详细信息', {'fields': ('content', 'created_at')}),
    )
```

2. 重启 Django 开发服务器，刷新后台管理页面，即可看到自定义的模型类。
3. 可以根据需要自定义列表页显示的字段、搜索字段、筛选字段、只读字段等。

### 总结

Django 后台管理系统提供了方便的方式来管理项目中的数据。通过自定义后台管理页面，可以根据项目需求对数据进行增删改查操作，提高开发效率。

> 注意：自定义后台管理页面需要谨慎操作，确保只有授权的用户才能访问并操作后台管理系统。






