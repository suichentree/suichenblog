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
- request.user：通过认证后的用户对象（未认证时为 AnonymousUser）。
- request.auth：认证后的凭证对象（如 Token 认证中的 Token）。

### Response 响应对象

DRF框架提供了一个Response类，用来替代了Django原生的 HttpResponse 类。Response类支持内容协商。

当使用Response类构造Response响应对象时，Response类会根据请求头字段（如 application/json），使用对应的渲染器（Renderer）将请求数据转换为目标格式（默认支持JSON、HTML等）。


> Response类构造Response响应对象
```py

from rest_framework.response import Response
response = Response(
    data,                # 待渲染的 Python 数据（如字典、列表）
    status=None,         # HTTP 状态码（如 201、400）
    headers=None,        # 自定义响应头（如 {'X-Custom': 'value'}）
    content_type=None    # 强制指定内容类型（如 'application/json'）
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
        return Response(serializer.data)  # 返回 JSON 格式数据

    # POST 请求
    elif request.method == 'POST':
        # 反序列化
        serializer = UserModelSerializer(data=request.data)
        # 验证数据
        if serializer.is_valid():
            # 持久化到数据库中
            serializer.save()
            # 返回数据
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # 验证失败返回数据
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```

- @api_view 装饰器：指定允许的 HTTP 方式列表（如 ['GET', 'POST']），未声明的HTTP 方式会返回 405 Method Not Allowed。
- 请求对象：DRF 会将 Django 原生的 HttpRequest 封装为 Request 对象，通过 request.data 可直接获取解析后的请求体数据（支持 JSON、表单等格式）。
- 响应对象：使用 Response 类替代 Django 原生的 JsonResponse，支持自动根据客户端 `Accept` 请求头来返回不同格式的响应数据。
- 状态码：推荐使用 rest_framework.status 模块中的常量，提高代码可读性。


### 视图类

在 DRF 中，视图类是更推荐的开发方式，支持继承和复用，适合复杂业务场景。

DRF 提供了多种视图类，包括 APIView、GenericAPIView 等。

#### APIView（基础视图类）

APIView 是 DRF 框架中所有视图类的基类，提供了请求解析、认证、权限校验等基础功能。需手动实现 HTTP 方法（get、post 等）。


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
        users = UserModel.objects.all()
        # 序列化操作
        serializer = UserModelSerializer(users, many=True)
        # 返回序列化后的数据
        return Response(serializer.data)

    # 处理post请求
    def post(self, request):
        # 将请求数据进行反序列化
        serializer = UserModelSerializer(data=request.data)
        if serializer.is_valid():
            # 将反序列化后的数据，持久化到数据库中
            serializer.save()
            # 返回反序列化的数据
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # 验证失败返回数据
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```

#### GenericAPIView（通用视图类）

GenericAPIView 继承自 APIView，额外封装了模型查询集和序列化器的配置，通常与 Mixin 类结合使用，简化 CRUD 操作。

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

# 自定义视图类，继承GenericAPIView类和Mixin类
class UserListCreateView(ListModelMixin, CreateModelMixin, GenericAPIView):
    #
    queryset = UserModel.objects.all()  # 配置查询集
    serializer_class = UserModelSerializer  # 配置序列化器

    def get(self, request, *args, **kwargs):
        # 调用 ListModelMixin 的 list() 方法
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        # 调用 CreateModelMixin 的 create() 方法
        return self.create(request, *args, **kwargs)

class UserRetrieveUpdateDestroyView(RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = 'pk'  # URL 中通过 pk 匹配对象（默认）

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)  # 获取单个

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)    # 完整更新

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)  # 部分更新

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)  # 删除


```

## DRF 路由（Routers）

### SimpleRouter与DefaultRouter的区别

### 路由注册（配合ViewSet自动生成URL）

### 自定义路由（添加额外操作）

## 六、认证与权限——API的安全防线

### 6.1 内置认证方式（Session认证、Token认证、JWT认证）

### 6.2 权限控制（IsAuthenticated、IsAdminUser、自定义权限类）

### 6.3 视图级/全局级认证配置

## 七、分页与过滤——优化API体验

### 7.1 分页配置（PageNumberPagination、LimitOffsetPagination）

### 7.2 过滤后端（Django Filter集成，自定义过滤逻辑）

### 7.3 排序与搜索（结合DRF内置功能）

## 八、API文档生成——提升协作效率

### 8.1 集成Swagger/Redoc（使用drf-yasg插件）

### 8.2 自动生成与手动补充文档（注解与字段描述）

### 8.3 交互式测试（通过文档页面调试API）

## 九、实战：开发一个完整的用户管理API

### 9.1 需求分析（用户信息增删改查、分页、认证）

### 9.2 步骤分解（模型→序列化器→视图→路由→测试）

### 9.3 常见问题与解决方案（如跨域、性能优化）

## 十、总结与扩展

### 10.1 DRF的优势总结与适用场景

### 10.2 进阶学习方向（自定义渲染器、解析器、第三方插件推荐）