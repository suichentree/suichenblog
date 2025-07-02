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
