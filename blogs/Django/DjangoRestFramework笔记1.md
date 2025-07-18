---
title: DjangoRestFramework笔记1
date: 2025-07-11
sidebar: 'auto'
categories: 
 - Python
tags:
 - Django
 - DjangoRestFramework
---

[toc]

# DjangoRestFramework笔记1

## DRF 介绍

![drf_20250711095451162.png](../blog_img/drf_20250711095451162.png)

Django REST Framework（简称 DRF）是一个基于 Django 框架的Web应用开发框架。其专门用于快速构建 Restful API接口应用程序。

Django REST Framework 通过扩展 Django框架的功能，提供了一系列标准化的组件和便捷的开发模式，显著降低了构建高性能、可维护 API 的复杂度。

[Django Rest Framework 官网 https://www.django-rest-framework.org/](https://www.django-rest-framework.org/)

> Django REST Framework 优点
- 深度集成 Django：充分利用 Django 的 ORM、模板、管理后台等功能，与 Django 生态无缝衔接。
- 功能全面：覆盖 API 开发全流程（序列化、视图、认证、分页、过滤等），减少第三方库依赖。
- 灵活性与可扩展性：支持自定义序列化器、视图逻辑、权限策略等，适应复杂业务需求。
- 社区活跃：拥有庞大的开发者社区和丰富的第三方插件（如 drf-yasg 用于增强文档），问题解决成本低。

> Django REST Framework 特性
- 序列化：提供 Serializer 和 ModelSerializer 类，支持将 Django 模型对象、查询集（QuerySet）等数据结构直接转换为 JSON/XML 等格式，同时支持反序列化（即将外部请求数据转换为 Django 模型对象）。
- 视图：封装了多种视图类（如 APIView、GenericAPIView、ModelViewSet），支持快速实现增删改查（CRUD）操作。
- 路由：提供 DefaultRouter、SimpleRouter 等路由类，自动为视图生成 URL 映射，避免手动编写大量 URL 配置。
- 认证与权限：内置多种认证方式和权限控制，支持自定义策略，确保 API 的安全性。
- 模式与文档：集成 OpenAPI 规范（如 Swagger/Redoc），自动生成 API 文档，支持交互式测试，提升接口文档的维护效率。

> Django REST Framework 使用场景
- 前后端分离项目（如 Vue/React 前端 + DRF 后端）。
- 移动应用（iOS/Android）的后端数据接口。
- 第三方开放平台（如提供给合作伙伴的 API 服务）。
- 需要快速迭代的 API 服务（利用 DRF 的自动化特性缩短开发周期）。

## DRF 环境搭建与基础配置

### 安装DRF

DRF依赖Django，需先确保已安装Django。

```bash
# 安装DRF
pip install djangorestframework
```

### Django项目集成DRF（settings.py配置）

在Django项目的全局配置文件settings.py中，将rest_framework添加到INSTALLED_APPS配置列表中，确保Django识别DRF。

```py
# settings.py
INSTALLED_APPS = [
    # .....
    # 注册DRF
    'rest_framework',
]
```

在Django项目的全局配置文件settings.py中，新建DRF全局设置。

```py
# settings.py
REST_FRAMEWORK = {
    # 默认认证类（全局生效）
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',  # Session认证
        'rest_framework.authentication.TokenAuthentication',
        # Token认证
    ],
    # 默认权限类（全局生效）
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',  # 仅认证用户可访问
    ],
    # 默认分页类（全局生效）
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,  # 每页默认返回10条数据
}
```



## DRF 序列化器（Serializers）

DRF框架提供了一个序列化模块。该模块中包含了所有可用的序列化器类。

> 序列化器的作用

- 序列化：将Django模型对象/查询集对象转换为JSON/XML等格式的响应数据（用于API返回数据）
- 反序列化：将客户端发送的请求数据（如JSON数据）转换为Django模型对象（用于API接收数据）
- 数据验证：可以对数据进行合法性校验（如字段类型、业务规则等）
- 数据转换：处理不同格式间的类型转换（如日期字符串转datetime对象）

DRF框架中最常用的序列化器类有两个。
- Serializer 序列化器基类，DRF中所有的序列化器类都必须直接或间接继承于 Serializer 序列化器基类。
- ModelSerializer 模型序列化器类。在工作中，除了Serializer基类以外，ModelSerializer是最常用的序列化器类。


### 继承 Serializer 序列化器基类

DRF 中的 `Serializer` 是所有序列化器的基类，提供了序列化、反序列化和数据验证的基础功能。

如果我们想要实现序列化的功能，需要做到以下几点。
1. 自定义一个序列化器类，需要继承Serializer类。
2. 构建自定义序列化器类的字段。需要与模型类的字段是需要一一对应的。只有这样才能将模型类对象进行序列化和反序列化。
3. 自定义序列化器类的验证方法,确保数据在序列化和反序列化的过程中符合要求。(可选)
    - 通过`validate_<字段名>`方法对单个字段进行验证。(可选)
    - 通过`validate`方法对多个字段进行验证。(可选)


#### 常用字段类型

> Serializer 序列化器基类提供了许多常用字段类型。如下所示

通常根据模型字段类型选择匹配的序列化器字段类型，以确保数据类型和校验规则的一致性。

| Django 模型字段类型 | DRF 序列化器字段类型 | 说明  |
|----------|--------|---------|
| `models.CharField`  | `serializers.CharField`    | 字符串字段，需通过 `max_length` 限制长度（与模型保持一致） |
| `models.TextField`  | `serializers.CharField`    | 长文本字段 |
| `models.IntegerField` | `serializers.IntegerField` | 整数字段，可通过 `min_value`/`max_value` 限制范围（与模型一致）|
| `models.EmailField`| `serializers.EmailField`   | 邮箱字段，自动校验邮箱格式（与模型 `EmailField` 强关联）  |
| `models.DateTimeField` | `serializers.DateTimeField`| 日期时间字段，支持 `format` 参数指定输出格式（如 `%Y-%m-%d %H:%M:%S`）|
| `models.BooleanField`| `serializers.BooleanField` | 布尔字段，默认值通过 `default` 参数设置（与模型 `default` 一致） |
| `models.FloatField`  | `serializers.FloatField`   | 浮点数字段，自动处理浮点数转换    |
| `models.DecimalField`  | `serializers.DecimalField` | 高精度十进制字段，需通过 `max_digits`/`decimal_places` 参数匹配模型设置 |
| `models.FileField`  | `serializers.FileField`    | 文件上传字段，序列化时返回文件 URL，反序列化时处理文件对象    |
| `models.ImageField`  | `serializers.ImageField`   | 图片上传字段（依赖 Pillow 库），额外校验图片格式（如 PNG/JPG） |
| `models.JSONField`  | `serializers.JSONField`    | JSON 字段（DRF 3.13+ 支持），自动序列化/反序列化 JSON 对象   |

> 字段类型中常用参数如下所示

| 参数名 | 作用说明 | 示例 | 
|---------|------------|--------| 
| max_length | 限制字符串字段的最大长度 | CharField(max_length=100)（用户名最多100字符） | 
| min_length | 限制字符串字段的最小长度 | CharField(min_length=2)（用户名至少2字符） | 
| min_value | 限制数值字段的最小值 | IntegerField(min_value=0)（年龄最小0岁） | 
| max_value | 限制数值字段的最大值 | IntegerField(max_value=150)（年龄最大150岁） | 
| allow_blank | 允许字符串字段为空字符串 | CharField(allow_blank=True)（允许空字符串） | 
| allow_null | 允许字段值为None（null） | EmailField(allow_null=True)（允许邮箱为空） | 
| default | 当数据未提供时，字段的默认值（反序列化时自动填充） | BooleanField(default=False)（默认未激活） | 
| required | 是否为必填字段（默认True） | IntegerField(required=False)（年龄可选填） | 
| read_only | 标记字段为只读（序列化时包含该字段，但反序列化时忽略输入） | DateTimeField(read_only=True)（创建时间由服务端自动生成） | 
| write_only | 标记字段为只写（反序列化时使用，但序列化时不包含） | CharField(write_only=True)（密码仅用于提交，不返回给前端） | 
| format | 指定日期/时间字段的输出格式（适用于DateTimeField、DateField等） | DateTimeField(format="%Y-%m-%d %H:%M:%S")（输出格式如2025-07-11 10:00:00） | 
| child | 指定复合字段（如ListField）的子字段类型 | ListField(child=CharField(max_length=20))（列表元素为最多20字符的字符串） | 
| source | 映射模型字段的源名称（用于序列化器字段与模型属性名不一致的场景） | CharField(source='user_name')（序列化器字段username对应模型的user_name属性） | 
| label | 字段的显示名称（用于API文档或表单展示） | CharField(label="用户姓名")（文档中显示为“用户姓名”） | 
| help_text | 字段的帮助文本（用于API文档说明字段用途） | IntegerField(help_text="用户年龄，范围1-150")（文档中提示年龄范围） | 

#### 构造方法

Serializer 序列化器基类的构造方法，需要传入模型对象。语法如下

```py
# 构造语法
自定义序列化器(instance=None, data=requpst.body, many=False, context=None, **kwargs)

# 序列化单个模型对象为dict字典，返回序列化器对象。
serializer = UserSerializer(instance=模型对象)

# 序列化多个模型对象为list列表，返回序列化器对象。
serializer = UserSerializer(instance=模型对象列表, many=True)

# 如果传递数据到序列化器中，可以使用context，返回序列化器对象。
# 通过context参数附加的数据，可以通过Serializer对象的context属性获取
serializer = UserSerializer(instance=模型对象, context={'a': a})

# 可以通过Serializer对象的data属性获取模型对象序列化后的结果
print(serializer.data)

```

- instance参数：模型对象。用于序列化时把模型类对象传入instance参数。
- data参数：请求数据。用于反序列化时把请求数据传入data参数。
- many参数：默认为False，当需要对多个模型对象进行序列化（即instance参数为模型对象列表），则需要声明many=True。
- context参数：上下文数据，用于在构造Serializer对象时可以添加额外数据。可以通过Serializer对象的context属性获取额外数据。
- **kwargs参数：其他自定义参数。


#### 序列化，反序列化

> ① 在models.py文件中定义一个模型类。

```py
from django.db import models

# 假设这是 Django 模型类
class UserModel:
    # 模型类的字段如下
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField()
    is_active = models.BooleanField(default=False)
    tags = models.JSONField()

```

> ② 创建serializers.py文件，并且自定义一个序列化器类。自定义的序列化器类需要与模型类的字段一一对应。

```py
# 导入DRF中的序列化器模块  
from rest_framework import serializers
# 自定义一个序列化器类UserInfoSerializer需要继承Serializer类
class UserSerializer(serializers.Serializer):
    # read_only 表示该字段，在序列化时包含该字段，但反序列化时忽略输入
    id = serializers.IntegerField(read_only=True)
    # 必传字符串字段（默认required=True），最长100字符
    username = serializers.CharField(max_length=100)
    # 可选整数字段（允许为空），年龄范围1-150
    age = serializers.IntegerField(required=False, min_value=1, max_value=150)
    # 邮箱字段
    email = serializers.EmailField()
    # 布尔字段（默认值False）
    is_active = serializers.BooleanField(default=False)
    # 列表字段（元素为字符串）
    tags = serializers.ListField(child=serializers.CharField(max_length=20))

```

> ③ 序列化（模型对象 → JSON）的代码示例

```py
from django.http import JsonResponse
from .models import UserModel
from .serializers import UserInfoSerializer

def user_get1(request, pk):
    # 从数据库中查询单个模型对象
    user = UserModel.objects.get(pk=pk)  
    # 将对象传入序列化器中，返回序列化器对象
    serializer = UserInfoSerializer(user)  
    # 调用序列化器对象的data属性，返回模型对象序列化后的字典数据
    a = serializer.data
    print(a)
    # 通过JsonResponse将字典数据打包为json，并返回给客户端
    return JsonResponse(a) 


```

> ④ 反序列化（JSON → 模型对象）的代码示例

使用序列化器进行反序列化时，必须先调用is_valid()方法对数据进行验证，验证成功返回True，否则返回False。
- 验证失败，可以通过序列化器对象的errors属性获取错误信息。
- 验证成功，可以通过序列化器对象的validated_data属性获取反序列化之后的模型对象。

```py
from django.http import JsonResponse
import json
from .models import UserModel
from .serializers import UserInfoSerializer

def user_get2(request):
    # 将请求中的Json数据传入序列化器构造方法的data参数中，进行反序列化
    serializer = UserInfoSerializer(data=request.data)
    # 验证反序列化是否有效
    if serializer.is_valid():
        # 调用序列化器对象的validated_data属性，返回反序列化之后的模型对象
        user_obj = serializer.validated_data
        return JsonResponse(user_obj, status=200)
    else:
        # 验证失败，返回验证错误信息
        return JsonResponse(serializer.errors, status=400)
        
```

#### 数据验证

当我们由于业务要求，需要自定义序列化器的验证规则时。可以在自定义序列化器类中定义验证方法。
1. 通过`validate_<字段名>`方法对单个字段进行验证。(可选)
2. 通过`validate`方法对多个字段进行验证。(可选)

注意
- 自定义验证方法的参数：需要验证的字段值。
- 自定义验证方法的返回值：验证通过后的字段值，或抛出ValidationError异常。
- 验证方法的最后必须把验证数据作为返回值返回，否则序列化器会丢失验证的数据。


```py
from rest_framework import serializers
class UserSerializer(serializers.Serializer):
    # ...原有字段定义...

    # 对单个字段验证：检查邮箱格式（DRF已通过EmailField自动校验，此处演示自定义逻辑）
    def validate_email(self, value):
        if 'test.com' in value:
            raise ValidationError("禁止使用测试邮箱域名")
        return value

    # 对多个字段验证：检查年龄与监护人邮箱的关联逻辑
    def validate(self, attrs):
        age = attrs.get('age')
        email = attrs.get('email')
        
        if age and age < 18 and 'guardian_' not in email:
            raise ValidationError("18岁以下用户邮箱需包含'guardian_'前缀（如guardian_123@example.com）")
        return attrs

```

#### 数据保存

DRF 序列化器通过 `save()` 方法可以实现数据持久化。

自定义序列化器类需手动重写 `create()` 和 `update()`方法完成数据保存。

> 核心方法说明
- `save()`：判断方法内部根据参数的`instance`是否存在，决定调用 `create()` 或 `update()`。
- `create(validated_data)`：用于将模型对象插入到数据库中（当未传入 `instance` 时调用）
- `update(instance, validated_data)`：用于更新数据库中的模型对象（当传入 `instance` 时调用）


代码示例
① 在自定义序列化器类中重写 `create(),update()` 方法。
```py
from rest_framework import serializers
from .models import UserModel

class UserSerializer(serializers.Serializer):
    # ...（已有字段定义和验证方法）...

    def create(self, validated_data):
        """插入数据（需手动写入数据库）"""
        return UserModel.objects.create(**validated_data)  # 调用 ORM create 方法

    def update(self, instance, validated_data):
        """更新数据（需手动更新数据库字段）"""
        instance.username = validated_data.get('username', instance.username)
        instance.age = validated_data.get('age', instance.age)
        # ...其他字段更新...
        instance.save()  # 调用 Django ORM的save 方法更新数据

        return instance

```

② 视图函数中使用序列化器进行数据保存。

```py
from rest_framework import serializers
from .models import UserModel
from .serializers import UserSerializer

def user_post(request):
    # 从请求中获取数据
    data = request.data
    # 初始化序列化器，传入数据
    serializer = UserSerializer(data=data)
    # 验证数据是否有效
    if serializer.is_valid():

        # save源代码中，判断实例化序列化器时是否传递instance
        # 如果传递了instance参数，则serializer.save()会自动调用序列化器内部的update,并把instance与验证后的validated data作为参数
        # 如果没有传递instance参数，则serializer,save()会自动调用序列化器内部的create方法，并把验证后的validated data作为参数
        serializer.save()

        return JsonResponse(serializer.data, status=201)
    else:
        return JsonResponse(serializer.errors, status=400)
```


### 继承 ModelSerializer 模型序列化器类

ModelSerializer 是 DRF 提供的**模型专用序列化器**。大幅简化了基于模型的序列化器开发流程。适用于需要快速实现模型数据序列化/反序列化的场景（如CRUD接口）。

ModelSerializer与Serializer的用法相同，但额外提供了:
- 自动映射模型字段：无需手动声明所有字段。
- 自动实现 CRUD 方法：默认提供了 `create()` 和 `update()` 方法，无需手动实现。
- 字段校验规则：ModelSerializer 会根据模型字段的校验规则自动生成校验参数（如 `max_length`）。


> ModelSerializer 模型序列化器类和 Serializer 自定义序列化器类的区别

| 特性  | Serializer | ModelSerializer |
|----------|---------|----------|
| 字段定义 | 需手动声明所有字段 | 自动根据模型生成字段（可配置） |
| 模型关联   | 需手动处理模型实例 | 自动关联模型类（通过 `model` 属性） |
| CRUD 方法  | 需手动实现 `create()`/`update()` | 默认提供基础 `create()`/`update()` 实现 |
| 字段校验规则 | 需手动声明校验参数（如 `max_length`） | 自动继承模型字段的校验规则（如 `max_length` 来自 `models.CharField`） |

> ModelSerializer 模型序列化器类的构造方法

```py
# 构造方法语法（与 Serializer 一致）
ModelSerializer(
    instance=None,  # 序列化时传入的模型实例/查询集
    data=empty,     # 反序列化时传入的请求数据（如 request.data）
    many=False,     # 是否处理多个对象（True 时 instance 应为集合）
    context=None,   # 额外添加数据
    **kwargs        # 其他自定义参数
)
```

#### 序列化，反序列化

> ① 定义模型类

```py
from django.db import models

# 假设这是 Django 模型类
class UserModel:
    # 模型类的字段如下
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField()
    is_active = models.BooleanField(default=False)
    tags = models.JSONField()

```

> ② 创建serializers.py文件，并且自定义一个序列化器类。需要继承ModelSerializer 模型序列化器类

```py
# 导入DRF中的序列化器
from rest_framework import serializers
# # 导入模型类
from .models import UserModel  

# 自定义一个序列化器类。继承ModelSerializer 模型序列化器类
class UserModelSerializer(serializers.ModelSerializer):
    # 元数据配置
    class Meta:
        model = UserModel  # 关联模型类
        
        fields = "__all__"  # 包含模型所有字段
        # fields = ['id', 'username', 'age']  # 或指定字段列表

        # exclude = ['tags']  # 排除指定字段（与fields互斥）
        
        # read_only_fields = ['id']  # 指定只读字段（序列化时返回，反序列化时忽略）
        
        # extra_kwargs = {  # 额外字段参数（覆盖模型默认规则）
        #     'age': {'min_value': 0, 'max_value': 200}
        # }

```

元数据配置选项
- model：必选，指定关联的模型类
- fields：指定包含的字段（`__all__` 表示所有字段，或指定字段列表）
- exclude：指定排除的字段（与 fields 互斥）
- read_only_fields：指定只读字段（序列化时返回，反序列化时忽略）
- extra_kwargs：为字段添加额外参数（覆盖模型默认规则）

> ③ 序列化与反序列化示例

```py
from django.http import JsonResponse
from .models import UserModel
from .serializers import UserModelSerializer

# 序列化单个/多个模型对象（模型对象→JSON数据）
def user_detail(request, pk):
    # 从数据库获取单个用户实例
    user = UserModel.objects.get(pk=pk)
    # 构造 ModelSerializer 实例（指定 instance 参数）
    serializer = UserModelSerializer(instance=user) 
    # 获取序列化后的 JSON 数据
    print(serializer.data)

    # 获取所有用户的查询集
    users = UserModel.objects.all()
    # 设置 many=True（处理查询集）
    serializer = UserModelSerializer(instance=users, many=True)
    # 输出列表形式的 JSON 数据
    print(serializer.data) 

    return JsonResponse(serializer.data)

# 反序列化创建新对象（JSON数据→模型对象）
def user_create(request):
    # 假设 request.data 是前端提交的 JSON 数据
    serializer = UserModelSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        # 调用 save() 触发内置的 create() 方法，默认将 validated_data属性值保存/更新到数据库中
        user = serializer.save()

        # 打印Json数据反序列化之后的模型对象
        print(serializer.validated_data)
        return JsonResponse(serializer.validated_data, status=201)
```

#### 数据保存

Serializer类中并没有内置create与update方法，所以如果要让Serializer类实现数据保存功能，则务必手动实现create与update方法。

而ModelSerializer类内置了create与update方法，所以在使用过程中，实际上不需要手写create与update方法的。

> 核心方法说明
- `save()`：判断方法内部根据参数的`instance`是否存在，决定调用 `create()` 或 `update()`。
- `create(validated_data)`：用于将模型对象插入到数据库中（当未传入 `instance` 时调用）
- `update(instance, validated_data)`：用于更新数据库中的模型对象（当传入 `instance` 时调用）

代码示例
```py
# 创建新对象（自动调用 create()）
def user_create(request):
    # 假设 request.data 是前端提交的 JSON 数据
    print(request.data)
    # 构造 ModelSerializer 实例（指定 data 参数）
    serializer = UserModelSerializer(data=request.data)
    # 若验证成功
    if serializer.is_valid():
        # 调用save方法，自动将反序列化后的模型对象保存到数据库中
        user = serializer.save() 

        # 打印反序列化后的模型对象
        print(serializer.validated_data)
        return JsonResponse(serializer.validated_data, status=200)

# 完整更新对象（自动调用 update()）
def user_update(request, pk):
    # 从数据库中查询
    user = UserModel.objects.get(pk=pk)
    # 构造 ModelSerializer 实例（指定 instance,data参数）
    serializer = UserModelSerializer(instance=user, data=request.data)
    # 验证数据
    if serializer.is_valid():
        # 保存反序列化后的模型对象到数据库中
        updated_user = serializer.save()  

        # 打印反序列化后的模型对象
        print(serializer.validated_data)
        return JsonResponse(serializer.validated_data, status=200)


```

注意事项
- 必须先调用 is_valid()方法 且返回 True 后，才能调用 save()方法,否则 validated_data 不存在。
- 自定义逻辑：若需添加额外业务逻辑（如记录操作日志），可重写 create()/update() 方法
- 返回值：save()方法返回保存后的模型对象，可直接用于后续操作（如关联数据处理等）


## DRF 视图（Views）

DRF 视图是核心组件，主要负责：
- 控制序列化器的执行（校验、保存、转换数据）
- 操作数据库（查询、新增、更新、删除）
- 处理请求与响应（解析请求数据、生成响应数据）

### Request 请求对象

DRF框架扩展了原生HttpRequest类,提供更强大的Request请求对象。

DRF会根据请求头的`Content-Type`指明的请求数据类型,自动解析请求体数据（如 JSON、表单、XML 等），并将解析后的结果存储在Request请求对象的`data`属性中。

然后在视图中就可以通过`request.data`获取解析之后的请求体数据（支持 JSON、表单等格式）,也可以通过`request.query_params`获取请求URL的查询参数。

> Request请求对象常用属性

- request.data：解析后的请求体数据（类似 Django 的 request.POST，但支持更多格式）。
- request.query_params：解析后的请求 URL 查询参数（等价于 Django 的 request.GET）。
- request._request：获取原始的 HttpRequest 对象（django的HttpRequest对象）。
- request.user：通过认证后的用户对象（未认证时为 AnonymousUser）。
- request.auth：认证后的凭证对象（如 Token 认证中的 Token）。

### Response 响应对象

DRF框架提供了一个Response类，用来替代了Django原生的 HttpResponse 类。

Response类支持内容协商，即使用Response类构造Response响应对象时，Response类会根据请求头的属性（如 application/json），使用对应的渲染器（Renderer）将请求数据转换为目标格式（默认支持JSON、HTML等）。 


> Response类构造Response响应对象
```py

from rest_framework.response import Response
response = Response(
    data,                # 待渲染的 Python 数据（如字典、列表）
    status=None,         # HTTP 状态码（如 201、400）
    headers=None,        # 自定义响应头（如 {'X-Custom': 'value'}）
    content_type=None    # 响应头的content-type属性。通常无需赋值，会根据返回的响应数据来自动设置。
)

```

> DRF的Response类和Django的JsonResponse类的区别

- DRF的Response类是基于Django的HttpResponse类的封装，提供了更多的功能和选项。
- DRF的Response类可以自动处理内容协商，无需手动设置`Content-Type`属性。
- Response类支持多种渲染格式（JSON、XML、HTML 等），而 JsonResponse类仅支持 JSON。


### 视图函数

DRF 支持基于视图函数的写法，主要通过 @api_view 装饰器实现。

- 使用 @api_view 装饰器声明允许的 HTTP 方法（如 GET、POST）。
- 自动解析请求数据并转换（支持JSON、表单等格式）,然后通过 `request.data` 访问。
- 返回 Response 对象（DRF 提供的响应类，支持自动序列化和内容协商）。

#### 基本使用

```py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserModel
from .serializers import UserModelSerializer

# @api_view 装饰器声明允许 GET 和 POST 方法
@api_view(['GET', 'POST'])
def user_list(request):
    # GET 请求
    if request.method == 'GET':
        # 获取所有用户
        users = UserModel.objects.all()
        # 序列化
        serializer = UserModelSerializer(users, many=True)
        return Response(data=serializer.data)  # 返回 JSON 格式数据


    # POST 请求
    elif request.method == 'POST':
        # 反序列化
        serializer = UserModelSerializer(data=request.data)
        # 验证数据
        if serializer.is_valid():
            # 持久化到数据库中
            serializer.save()
            # 返回数据
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        # 验证失败返回数据
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


```

- @api_view 装饰器：指定允许的 HTTP 方式列表（如 ['GET', 'POST']），未声明的HTTP 方式会返回 405 Method Not Allowed。
- 请求对象：DRF 会将 Django 原生的 HttpRequest 封装为 Request 对象，通过 request.data 可直接获取解析后的请求体数据（支持 JSON、表单等格式）。
- 响应对象：使用 Response 类替代 Django 原生的 JsonResponse，支持自动根据客户端 `Accept` 请求头来返回不同格式的响应数据。
- 状态码：推荐使用 rest_framework.status 模块中的常量，提高代码可读性。


### 视图类

在 DRF 中，视图类是更推荐的开发方式，支持继承和复用，适合复杂业务场景。

DRF 提供了多种视图类，包括 APIView、GenericAPIView 等。

#### APIView（基础视图类）

APIView 是 DRF 框架中所有视图类的基类，并且继承自Django的View类。APIView类提供了请求解析、认证、权限校验等基础功能。需手动实现 HTTP 方法（get、post 等）。

> APIView类和View类的区别

- 使用APIView类的时候，传入到视图中的是 Request对象，而不是Django的HttpRequeset对象;
- 使用APIView类的时候，视图可以返回Response对象，视图会自动为响应数据设置(renderer)符合前端期望要求的格
式;
- 使用APIView类的时候，任何 APIException 异常都会被捕获到，并且处理成合适格式的响应信息返回给客户端;而使用 View类的时候，所有异常全部以HTML格式显示。
- APIView类除了继承了View类原有的属性方法，还新增了如下类属性
    - authentication_classes列表或元组，身份认证类
    - permission_classes列表或元组，权限检查类
    - throttle_classes列表或元祖，流量控制类

代码示例
```py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserModel
from .serializers import UserModelSerializer

# 自定义视图类，继承APIView
class UserListAPIView(APIView):
    # 处理get请求
    def get(self, request):
        # 从数据库中获取所有用户
        user_list = UserModel.objects.all()
        # 序列化操作,设置many=True 表示要序列化多个模型对象
        serializer = UserModelSerializer(user_list, many=True)
        # 返回序列化后的数据
        return Response(serializer.data)

    # 处理post请求
    def post(self, request):
        # 将请求数据进行反序列化
        serializer = UserModelSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # 将反序列化后的数据，持久化到数据库中
            serializer.save()
            # 返回反序列化的数据
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        # 验证失败返回数据
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```

#### GenericAPIView（通用视图类）

`GenericAPIView` 是 DRF 中一个非常实用的通用视图类，它继承自 `APIView`，在其基础上增加了操作序列化器和数据库查询的方法，旨在让开发者能更便捷地处理常见的 API 操作，如列表查询、单个对象查询、创建、更新和删除等。

通常，`GenericAPIView` 会搭配一个或多个 `Mixin` 扩展类一起使用，以进一步简化代码。

> 主要功能与特性

- **查询集管理**：通过 `queryset` 属性管理数据库查询集，方便对数据库中的数据进行操作。
- **序列化器管理**：使用 `serializer_class` 属性指定序列化器类，实现数据的序列化和反序列化。
- **对象查找**：支持通过 `lookup_field` 和 `lookup_url_kwarg` 属性在 URL 中查找特定对象。
- **分页和过滤**：提供内置的分页和过滤功能，可轻松实现数据的分页展示和筛选。

> GenericAPIView类的常用属性

- `queryset`：指定视图使用的查询集，用于从数据库中获取数据。
- `serializer_class`：指定视图使用的序列化器类，用于处理数据的序列化和反序列化。
- `lookup_field`：指定用于查找单个对象的模型字段，默认为 `'pk'`。
- `lookup_url_kwarg`：指定 URL 中用于查找对象的关键字参数名，默认与 `lookup_field` 相同。
- `pagination_class`：指定分页类，用于对查询集进行分页处理。
- `filter_backends`：指定过滤后端类，用于对查询集进行过滤操作。

> GenericAPIView类的常用方法

- `get_queryset()`：返回视图使用的查询集，可重写该方法实现自定义的查询逻辑。
- `get_serializer_class()`：返回视图使用的序列化器类，可重写该方法实现动态选择序列化器。
- `get_serializer(instance=None, data=None, many=False, **kwargs)`：返回序列化器实例，用于处理数据的序列化和反序列化。
- `get_object()`：根据 `lookup_field` 和 `lookup_url_kwarg` 从查询集中获取单个对象。
- `paginate_queryset(queryset)`：对查询集进行分页处理，返回分页后的查询集。
- `get_paginated_response(data)`：返回分页后的响应数据。

> GenericAPIView 通常会与以下 Mixin 扩展类搭配使用，以实现常见的 CRUD 操作

- `ListModelMixin`：提供 `list()` 方法，用于处理 GET 请求，获取对象列表。
- `CreateModelMixin`：提供 `create()` 方法，用于处理 POST 请求，创建新对象。
- `RetrieveModelMixin`：提供 `retrieve()` 方法，用于处理 GET 请求，获取单个对象。
- `UpdateModelMixin`：提供 `update()` 和 `partial_update()` 方法，分别用于处理 PUT 和 PATCH 请求，更新对象。
- `DestroyModelMixin`：提供 `destroy()` 方法，用于处理 DELETE 请求，删除对象。


代码示例
```py
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import (
    ListModelMixin,  # 提供 list() 方法（GET获取列表）
    CreateModelMixin,  # 提供 create() 方法（POST创建）
    RetrieveModelMixin,  # 提供 retrieve() 方法（GET获取单个）
    UpdateModelMixin,  # 提供 update() 方法（PUT/PATCH更新）
    DestroyModelMixin   # 提供 destroy() 方法（DELETE删除）
)
from .models import UserModel
from .serializers import UserModelSerializer

# 自定义视图类，继承GenericAPIView类和Mixin类，用于处理用户列表和创建操作
class UserListCreateView(ListModelMixin, CreateModelMixin, GenericAPIView):
    # 从数据库中获取用户查询集
    queryset = UserModel.objects.all()
    # 配置序列化器
    serializer_class = UserModelSerializer

    def get(self, request, *args, **kwargs):
        # 调用 ListModelMixin 的 list() 方法，获取用户列表
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        # 调用 CreateModelMixin 的 create() 方法，创建新用户
        return self.create(request, *args, **kwargs)


# 自定义视图类，继承GenericAPIView类和Mixin类，用于处理用户详情、更新和删除操作
class UserRetrieveUpdateDestroyView(RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    # 从数据库中获取用户查询集
    queryset = UserModel.objects.all()
    # 配置序列化器
    serializer_class = UserModelSerializer
    lookup_field = 'pk'  # URL 中通过 pk 匹配对象（默认）

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)  # 获取单个用户信息

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)    # 完整更新用户信息

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)  # 部分更新用户信息

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)  # 删除用户信息

```

#### 5个视图扩展类

通常，`GenericAPIView` 会搭配一个或多个 `Mixin` 扩展类一起使用，以进一步简化代码。

这些 `Mixin` 扩展类为 `GenericAPIView` 提供了常见的 CRUD（创建、读取、更新、删除）操作方法，让开发者可以更高效地实现 API 接口。下面详细介绍各个常用的 `Mixin` 扩展类。

==注意在实际开发中，通常会将多个 Mixin 类与 GenericAPIView 组合使用，以实现更完整的 API 功能。==

##### ListModelMixin扩展类

istModelMixin扩展类提供 `list()` 方法，用于处理 GET 请求，获取对象列表。

ListModelMixin扩展类的基本使用
```py
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from .models import UserModel
from .serializers import UserModelSerializer

# 自定义视图类，继承ListModelMixin和GenericAPIView类，用于处理用户列表获取操作
class UserListView(ListModelMixin, GenericAPIView):
    # 从数据库中获取查询集
    queryset = UserModel.objects.all()
    # 初始化序列器
    serializer_class = UserModelSerializer

    # 获取用户列表
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

```

这是ListModelMixin扩展类中的list方法的源代码
```py
class ListModelMixin:
    def list(self, request, *args, **kwargs):
        # 获取查询集
        queryset = self.filter_queryset(self.get_queryset())

        # 对查询集进行分页处理
        page = self.paginate_queryset(queryset)
        if page is not None:
            # 获取分页后的响应数据
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        # 若未分页，直接序列化查询集
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
```

##### CreateModelMixin扩展类

提供 create() 方法，用于处理 POST 请求，创建新对象。

代码示例
```py
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from .models import UserModel
from .serializers import UserModelSerializer

# 自定义视图类，继承CreateModelMixin和GenericAPIView类，用于处理用户创建操作
class UserCreateView(CreateModelMixin, GenericAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer

    # 定义POST请求的处理方法，调用CreateModelMixin的create()方法创建新用户
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

```


以下是CreateModelMixin扩展类中的create方法的源代码
```py
class CreateModelMixin:
    def create(self, request, *args, **kwargs):
        # 获取序列化器实例，传入请求数据
        serializer = self.get_serializer(data=request.data)
        # 验证数据是否有效，若无效则抛出异常
        serializer.is_valid(raise_exception=True)
        # 调用 perform_create 方法保存实例
        self.perform_create(serializer)
        # 获取请求头
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        # 实际执行创建操作，保存序列化器实例
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}
```

##### RetrieveModelMixin扩展类

提供 retrieve() 方法，用于处理 GET 请求，获取单个对象。

```py
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import RetrieveModelMixin
from .models import UserModel
from .serializers import UserModelSerializer

# 自定义视图类，继承RetrieveModelMixin和GenericAPIView类，用于处理用户详情获取操作
class UserRetrieveView(RetrieveModelMixin, GenericAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = 'pk'  # URL 中通过 pk 匹配对象（默认）

    # 定义GET请求的处理方法，调用RetrieveModelMixin的retrieve()方法获取用户详情
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

```


以下是RetrieveModelMixin扩展类中的retrieve方法的源代码
```py
class RetrieveModelMixin:
    def retrieve(self, request, *args, **kwargs):
        # 获取单个对象
        instance = self.get_object()
        # 获取序列化器实例，传入对象
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

```

##### UpdateModelMixin扩展类

提供 update() 和 partial_update() 方法，分别用于处理 PUT 和 PATCH 请求，更新对象。
- update()：处理 PUT 请求，要求提供完整的对象数据进行更新。
- partial_update()：处理 PATCH 请求，允许只提供部分字段数据进行更新。

代码示例
```py
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from .models import UserModel
from .serializers import UserModelSerializer

class UserUpdateView(UpdateModelMixin, GenericAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = 'pk'

    # 定义PUT请求的处理方法，调用UpdateModelMixin的update()方法更新用户信息
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    # 定义PATCH请求的处理方法，调用UpdateModelMixin的partial_update()方法部分更新用户信息
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

```


以下是UpdateModelMixin扩展类中的update和partial_update方法的源代码
```py
class UpdateModelMixin:
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        # 获取单个对象
        instance = self.get_object()
        # 获取序列化器实例，传入对象和请求数据，partial 表示是否部分更新
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        # 验证数据是否有效，若无效则抛出异常
        serializer.is_valid(raise_exception=True)
        # 调用 perform_update 方法更新实例
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            # 如果对查询集应用了 'prefetch_related'，需要强制使实例上的预取缓存无效
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        # 实际执行更新操作，保存序列化器实例
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

```

##### DestroyModelMixin扩展类

提供 destroy() 方法，用于处理 DELETE 请求，删除对象。

```py
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import DestroyModelMixin
from .models import UserModel
from .serializers import UserModelSerializer

class UserDestroyView(DestroyModelMixin, GenericAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = 'pk'
    
    # 定义DELETE请求的处理方法，调用DestroyModelMixin的destroy()方法删除用户
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

```

以下是DestroyModelMixin扩展类中的destroy方法的源代码
```py
class DestroyModelMixin:
    def destroy(self, request, *args, **kwargs):
        # 获取单个对象
        instance = self.get_object()
        # 调用 perform_destroy 方法删除实例
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        # 实际执行删除操作
        instance.delete()
```


### 视图集类ViewSet

在 DRF 中，视图集类（ViewSet）是一种面向资源的视图组织方式，通过将资源相关的 CRUD 操作封装为类方法（如 list、create、retrieve 等）。结合路由自动生成 URL 映射，显著提升 API 开发效率。它本质是对传统视图类（APIView/GenericAPIView）的高阶封装，更符合 RESTful 的设计理念。

> 视图集类ViewSet 与 传统视图类（APIView）的区别

通常情况下，传统视图类的方法名与 HTTP 动词（get/post/put/delete）强绑定。

传统视图类中必须使用 HTTP 动词作为方法名（如 get 对应 GET 请求），且一个视图类最多只能处理 4 种标准 HTTP 方法（GET/POST/PUT/DELETE），即一个视图类最多对应 4 个接口( 4 个方法名)。若需要实现更多接口（如批量删除、用户激活等自定义方法），则必须新建另一个视图类，导致代码冗余且逻辑分散。

而视图集类可以将同一资源的所有操作（标准 CRUD + 自定义操作）集中在一个类中，逻辑高度内聚，代码结构更清晰。例如，用户资源的所有操作（增删改查、激活、批量删除）均可在 UserViewSet 中实现，无需额外创建 UserActivateView、UserBatchDeleteView 等类。


> 视图集类（ViewSet）的作用：

- 视图集类中的方法名可以自定义，开发者可以根据需要定义不同的方法名。
- 视图集类中的方法名可以通过路由进行动态映射。即在路由中使用 as_view() 方法时,可以设置字典参数从而将视图集类中的方法名动态映射到路由中的 URL 路径。
- 通过 @action 装饰器，视图集类中可以添加任意数量的自定义方法。

DRF 提供了多种视图集类，下面介绍几种常用的。

#### ViewSet 基础视图集类

ViewSet 是 DRF 提供的一个基础视图集类，它继承自 APIView 类，提供了 CRUD 操作的默认实现。

开发者可以根据需要自定义视图集类，继承 ViewSet 类，并重写其中的方法，实现自定义的视图逻辑。通常结合 `@action` 装饰器定义自定义操作。

代码示例

```py
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import UserModel
from .serializers import UserModelSerializer

# 自定义视图集类，继承ViewSet类
class UserViewSet(ViewSet):
    def list(self, request):
        """获取用户列表"""
        queryset = UserModel.objects.all()
        serializer = UserModelSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        """创建新用户"""
        serializer = UserModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        """获取单个用户详情"""
        user = UserModel.objects.get(pk=pk)
        serializer = UserModelSerializer(user)
        return Response(serializer.data)

    def update(self, request, pk=None):
        """更新用户信息"""
        user = UserModel.objects.get(pk=pk)
        serializer = UserModelSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        """删除用户"""
        user = UserModel.objects.get(pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 对应的路由写法
# urls.py
  

```

#### GenericViewSet 通用视图集类

GenericViewSet视图集类 继承自 GenericAPIView类。提供了查询集管理、序列化器管理等通用功能，常和 Mixin 扩展类搭配使用。

代码示例
```py
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    ListModelMixin,
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin
)
from .models import UserModel
from .serializers import UserModelSerializer

# 自定义视图集类，继承GenericViewSet类和其他扩展类
class UserGenericViewSet(ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    # 定义视图集的查询集，用于获取所有用户对象
    queryset = UserModel.objects.all()
    # 定义视图集的序列化器类，用于将查询集转换为 JSON 格式
    serializer_class = UserModelSerializer

```

#### ModelViewSet 模型视图集类

ModelViewSet 继承自 GenericViewSet，并集成了 ListModelMixin、CreateModelMixin、RetrieveModelMixin、UpdateModelMixin 和 DestroyModelMixin，能快速实现完整的 CRUD 操作。

代码示例
```py
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import UserModel
from .serializers import UserModelSerializer

# 自定义视图集类，继承ModelViewSet类
class UserModelViewSet(ModelViewSet):
    # 定义视图集的查询集，用于获取所有用户对象
    queryset = UserModel.objects.all()
    # 定义视图集的序列化器类，用于将查询集转换为 JSON 格式
    serializer_class = UserModelSerializer
    # .....
    
```

#### @action装饰器

在 DRF 的视图集类（ViewSet）中，`@action` 装饰器是一个非常实用的工具，它允许开发者在视图集类里添加自定义的 API 方法，让视图集类不仅能处理标准的 CRUD 方法，还能实现各种复杂的业务逻辑。下面详细介绍 `@action` 装饰器的使用方法、参数以及更多应用场景。


> @action装饰器参数详解

- **detail**：指定该自定义方法是针对单个对象还是对象集合。若为 `True`，表示操作针对单个对象，URL 中需要包含对象的主键（`pk`）；若为 `False`，表示操作针对对象集合，则 URL 中不包含主键。示例如下
    ```python
    @action(detail=True)  # URL 包含 <pk>，如 /users/<pk>/activate_user/
    def activate_user(self, request, pk=None):
        pass

    @action(detail=False)  # URL 不包含 <pk>，如 /users/batch_delete_users/
    def batch_delete_users(self, request):
        pass
    ```

- **methods**：指定该自定义操作允许的 HTTP 动词列表，默认值为 `['get']`。示例如下
    ```python
    # 该方法对应的 URL 是 /users/create_custom_object/ ，并且仅允许 POST 请求
    @action(methods=['post'])
    def create_custom_object(self, request):
        pass
    ```

- **url_path**：自定义该操作对应的 URL 路径，默认使用被装饰方法的名称。示例如下
    ```python
    @action(url_path='activate-user')  # URL 为 /users/activate-user/
    def activate(self, request):
        pass

    @action(detail=True,url_path='activate-user')  # URL 为 /users/<pk>/activate-user/
    def activate2(self, request,pk=None):
        pass    
    ```

- **url_name**：为该操作的 URL 生成路由别名，用于反向解析，默认使用被装饰方法的名称。示例如下
    ```python
    @action(url_name='user-activate')  # 可使用 reverse('user-activate') 进行反向解析
    def activate_user(self, request):
        pass
    ```

- **serializer_class**：自定义该操作使用的序列化器类，默认使用视图集的`serializer_class`。示例如下
    ```python
    @action(serializer_class=CustomSerializer)  # 使用自定义的序列化器
    def get_custom_data(self, request):
        pass
    ```

- **permission_classes**：自定义该操作的权限类列表，默认使用视图集的 `permission_classes`。该参数会覆盖视图集的默认权限配置，仅对该自定义操作生效。示例如下
    ```python
    from rest_framework.permissions import IsAdminUser

    @action(permission_classes=[IsAdminUser])  # 仅管理员可访问该操作
    def admin_only_operation(self, request):
        pass
    ```

- **throttle_classes**：自定义该操作的限流类列表，默认使用视图集的 `throttle_classes`。该参数会覆盖视图集的默认限流配置，仅对该自定义操作生效。示例如下
    ```python
    from rest_framework.throttling import AnonRateThrottle

    @action(throttle_classes=[AnonRateThrottle])  # 对匿名用户限流
    def anonymous_throttled_operation(self, request):
        pass
    ```


代码示例
```py
# views.py
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import UserModel
from .serializers import UserModelSerializer, CustomSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.throttling import AnonRateThrottle

class UserModelViewSet(ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer

    # 自定义操作：激活单个用户（detail=True，需 pk）
    @action(
        detail=True,          # 针对单个对象（需要 URL 中的 pk）
        methods=['post'],     # 仅允许 POST 请求
        url_path='activate',  # URL 路径为 /users/<pk>/activate/
        url_name='activate',  # 路由别名为 'activate'
        permission_classes=[IsAdminUser]  # 仅管理员可操作
    )
    def activate_user(self, request, pk=None):
        user = self.get_object()
        user.is_active = True
        user.save()
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    # 自定义操作：批量删除用户（detail=False，针对集合）
    @action(
        detail=False,         # 针对集合（无需 pk）
        methods=['delete'],   # 仅允许 DELETE 请求
        url_path='batch-delete',  # URL 路径为 /users/batch-delete/
        throttle_classes=[AnonRateThrottle]  # 对匿名用户限流
    )
    def batch_delete_users(self, request):
        user_ids = request.data.get('ids', [])
        UserModel.objects.filter(id__in=user_ids).delete()
        return Response({"status": "success", "deleted_count": len(user_ids)})

    # 自定义操作：获取用户详细信息，使用自定义序列化器
    @action(
        detail=True,
        methods=['get'],
        serializer_class=CustomSerializer  # 使用自定义序列化器
    )
    def user_detail(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(user)
        return Response(serializer.data)

```


注意事项
1. URL 结构：
    - 当 detail=True 时，URL 会包含对象的主键（pk），例如 /users/`<pk>`/custom-action/。
    - 当 detail=False 时，URL 不会包含主键，例如 /users/custom-action/。
2. 权限与限流：
    - @action 装饰器中的 permission_classes 和 throttle_classes 参数会覆盖视图集的默认配置，仅对该自定义操作生效。
3. 序列化器：
    - 若指定了 serializer_class 参数，该自定义操作会使用指定的序列化器，否则使用视图集类中默认的 serializer_class。
4. 反向解析：
    - 通过 url_name 参数可以为自定义操作的 URL 生成别名，方便在代码中使用 reverse 函数进行反向解析。


## DRF 路由（Routers）

DRF 路由（Routers）是用于自动生成视图集类（ViewSet）对应 URL路由 映射的工具。DRF 会根据视图集类中的方法名（如 list、create）和自定义操作（@action 装饰器）自动生成符合 RESTful 规范的 URL路由。

注意如果使用的是非视图集类，则不需要使用路由 Routers。

DRF 提供了两种路由类：SimpleRouter类 和 DefaultRouter类。这两个类的使用方式差不多。

> SimpleRouter类与DefaultRouter类的区别

| 路由类 | 继承关系 | 核心功能 | 适用场景 | 
|------|-----------|---------|-----------| 
| SimpleRouter | BaseRouter | 生成基础 URL 映射（如 /users/、/users/<pk>/） | 简单 API 项目（无需根视图） | 
| DefaultRouter | SimpleRouter | 继承 SimpleRouter 所有功能，额外生成 API 根视图（访问 / 时返回所有 API 链接） | 需清晰 API 的正式项目 |

### 路由注册（配合ViewSet自动生成URL）

路由注册的核心步骤是：创建路由实例 → 注册视图集 → 将路由 URL 添加到项目配置。

实现步骤如下
1. 在视图集中定义自定义方法：使用 `@action` 装饰器在视图集中添加自定义方法，通过该装饰器的参数配置操作的相关属性，如是否针对单个对象、允许的 HTTP 方法、自定义 URL 路径等。
2.  配置路由：使用 DRF 提供的 `SimpleRouter` 或 `DefaultRouter` 进行路由注册，路由会自动根据视图集中的方法和 `@action` 装饰器生成对应的 URL 映射。

假设已定义视图集 UserModelViewSet（继承 ModelViewSet），则在项目的 urls.py 中配置路由
```py
# urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter,SimpleRouter
from .views import UserModelViewSet  # 导入视图集

# 1. 创建路由实例（推荐使用 DefaultRouter）
router = DefaultRouter()

# 2. 注册视图集（参数：URL前缀、视图集、路由别名）
router.register(
    prefix=r'users',  # URL 前缀（生成 /users/、/users/<pk>/ 等路径）
    viewset=UserModelViewSet,  # 关联的视图集
    basename='user'  # 路由别名（用于反向解析，如 reverse('user-list')）
)

# 3. 将路由实例router 的 URL信息 添加到项目的 URL 配置中
urlpatterns = [
    path('', include(router.urls)),  # 所有路由由 router 管理
    # 其他自定义 URL（如登录接口）...
]
```

