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
# 安装DRF核心库
pip install djangorestframework

# 可选：安装DRF扩展库（如过滤、分页等增强功能）
pip install django-filter  # 用于过滤后端
```

### Django项目集成DRF（settings.py配置）

在Django项目的全局配置文件settings.py中，将rest_framework添加到INSTALLED_APPS配置列表中，确保Django识别DRF。

```py
# settings.py
INSTALLED_APPS = [
    # .....
    # 注册DRF
    'rest_framework',
    # 可选：注册DRF扩展库（如过滤）
    'django_filters',
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
    # 默认过滤后端（需安装django-filter）
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',  # 搜索过滤
    ],
}
```


## DRF 序列化器（Serializers）

DRF框架提供了一个序列化模块。该模块中包含了所有可用的序列化器类。

> 序列化器的作用

- 序列化：将Django模型对象/查询集对象转换为JSON/XML等格式的响应数据（用于API返回数据）
- 反序列化：将客户端发送的请求数据（如JSON数据）转换为Django模型对象（用于API接收数据）
- 验证：可以对数据进行合法性校验（字段类型、业务规则等）
- 数据转换：处理不同格式间的类型转换（如日期字符串转datetime对象）



DRF框架中最常用的序列化器类有两个。
- Serializer 序列化器基类，DRF中所有的序列化器类都必须直接或间接继承于 Serializer 序列化器基类。
- ModelSerializer 模型序列化器类。在工作中，除了Serializer基类以外，最常用的序列化器类。

### Serializer 序列化器基类

DRF 中的 `Serializer` 是所有序列化器的基类，为序列化、反序列化和数据验证提供了基础功能。

如果我们想要实现序列化的功能，需要做到以下几点。
1. 自定义一个序列化器类，需要继承Serializer类。
2. 构建自定义序列化器类的字段。需要与模型类的字段是一一对应的。只有这样才能将模型类对象进行序列化和反序列化。
3. 实现序列化方法。
4. 实现反序列化方法。

代码示例如下
在models.py文件中定义一个模型类。
```py
from django.db import models

# 假设这是 Django 模型类
class UserModel:
    # 模型类的字段如下
    username = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField()
    is_active = models.BooleanField(default=False)
    tags = models.JSONField()

```

创建serializers.py文件，并定义一个序列化器类。
```py
from rest_framework import serializers
# 自定义一个序列化器类UserInfoSerializer继承Serializer类
# 并且自定义的序列化器类需要与模型类的字段一一对应。
class UserInfoSerializer(serializers.Serializer):
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

> Serializer 序列化器基类中提供了许多创建字段的方法，如下所示

| 字段类型 | 说明 | 常用参数示例 | 
|--------|--------------|---------------| 
| CharField | 字符串字段 | max_length=100, min_length=2 | 
| IntegerField | 整数字段 | min_value=0, max_value=100 | 
| EmailField | 邮箱格式字段（自动验证邮箱） | allow_blank=False | 
| DateTimeField | 日期时间字段 | format="%Y-%m-%d %H:%M:%S" | 
| BooleanField | 布尔值字段 | default=False | 
| ListField | 列表字段（元素为指定类型） | child=IntegerField() |

> Serializer 序列化器基类的常用字段的字段参数如下所示

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



### ModelSerializer（模型序列化器类）

### 嵌套序列化器（处理关联模型）


## DRF 视图（Views）
### APIView：DRF最基础的视图类（请求/响应封装、异常处理）

### GenericAPIView：通用视图类（结合查询集与序列化器）

### 混合类（Mixins）：ListModelMixin、CreateModelMixin等组合使用

### ModelViewSet：一站式CRUD视图（自动绑定增删改查方法）


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