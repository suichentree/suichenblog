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


## Django ORM

Django 对各种数据库提供了很好的支持，包括：PostgreSQL、MySQL、SQLite、Oracle。Django 为这些数据库提供了统一的调用API。 

Django 可以使用内置的 ORM 框架来描述对象和数据库之间的映射，将程序中的对象自动持久化到数据库中。

因此 ORM 在业务逻辑层和数据库层之间充当了桥梁的作用。

1. ORM 会将 Python 代码转成为 SQL 语句。
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

- 模型类通常定义在子工程（子应用）的`models.py`文件中。
- 模型类必须直接或间接继承 django.db.models.Model 类来定义的
- 每个模型类的属性代表数据库表中的字段，Django 会根据模型类自动生成数据库迁移文件并同步到数据库。

示例如下
```py
from django.db import models
# 定义一个User模型类，以及模型类中的一些属性。
class User(models.Model):
    ## 该主键字段id，可以不显式定义
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
- 在 Django 模型类中，默认情况下不需要显式自定义主键字段，Django 会自动为每个模型添加一个自增的整数类型主键（字段名为 id）。但在以下场景中可能需要自定义主键：
    - 使用 UUID 作为主键
    - 使用业务唯一编号作为主键
- 每个模型类可以定义多个属性，每个属性对应数据库表中的一个列。
- 每个属性都有一个名称，用于标识该列。属性的名称通常是小写字母，多个单词之间用下划线分隔。
- 每个属性都可以有一些选项，用于指定该属性的默认配置，例如最大长度、是否为空等。

> 常用的字段类型如下
- 整数（IntegerField）：用于存储整数。对应mysql中的int
- 浮点数（FloatField、DecimalField）：用于存储浮点数
- 字符串（CharField、TextField）:用于存储文本
    - CharField 短文本
    - TextField 长文本
- 布尔值（BooleanField）：用于存储布尔值（True 或 False）。实际在数据库中用0/1表示。
- 文件（FileField、ImageField）：用于存储图像，支持文件上传。
    - FileField字段继承于CharField字段，本质上保存文件的访问路径。
    - ImageField字段继承于FileField字段，主要用于存储图像文件。
- 关系字段（ForeignKey、ManyToManyField、OneToOneField）：表示外键，一对多，多对多关系。
- 日期时间（DateTimeField、DateField、TimeField）：用于存储日期和时间
    - TimeField 字段表示时分秒
    - DateField 字段表示年月日
    - DateTimeField 字段表示年月日时分秒
    - auto_now=True 属性表示每次修改时都会自动设置改字段的值为当前时间。
    - auto_now_add=True 属性表示创建时自动填充当前时间。与auto_now属性是互斥的。

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


> 模型类的元数据配置

class Meta 用于定义模型类的元数据配置（如后台显示名称、数据库表名、排序规则等）

- verbose_name：优化 Admin 后台的菜单显示。
- db_table：自定义数据库表名（避免使用 Django 默认的 {应用名}_{模型名小写} 格式，例如表名是 t_user）。
- ordering：设置查询时的默认排序规则（"-create_time" 表示按 create_time 降序排列，最新创建的用户排在最前）


### 数据迁移

当在Django工程中完成模型类的定义时。就需要通过迁移命令来创建和管理数据库。并更新模型类对应的数据库结构到数据库中。

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





