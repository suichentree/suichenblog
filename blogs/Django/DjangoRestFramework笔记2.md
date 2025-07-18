---
title: DjangoRestFramework笔记2
date: 2025-07-18
sidebar: 'auto'
categories: 
 - Python
tags:
 - Django
 - DjangoRestFramework
---

[toc]

# DjangoRestFramework笔记2

## DRF 认证

DRF（Django Rest Framework）提供了强大的认证和权限机制，能够帮助我们有效控制对 API 的访问，确保只有经过授权的用户才能执行相应操作。

### basic认证

basic认证是DRF默认的认证方式，它依赖于 HTTP 协议的 Basic 认证机制。用户在请求中提供用户名和密码，服务端通过验证用户名和密码来确认用户身份。

```py
REST_FRAMEWORK = {
    # 配置认证方式的选项
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',# basic认证[基于账号密码]
    ]
}
```

可以在这个配置选项中配置多个认证类，DRF会按照配置的顺序依次尝试认证。一般认证失败，会返回401 Unauthorized响应，提示用户认证失败。



### Session认证

Session认证是DRF默认的认证方式，它依赖于 Django框架 的会话机制。用户登录后，服务器会为用户创建一个会话，会话中包含用户的认证信息。当用户后续请求API时，会话认证会检查请求中的会话ID是否有效，确保用户已登录。


> Session认证的使用场景

- 适用于前后端不分离，且用户通过浏览器访问的应用。

> Session认证的注意事项：

- 会话ID的有效期：默认情况下，会话ID的有效期为2周。可以通过 `SESSION_COOKIE_AGE` 配置项进行调整。
- 跨域请求：如果前端应用与后端应用不在同一个域名下，需要配置跨域请求相关的Cookie设置，确保浏览器能够正确处理会话ID。
- 安全考虑：为了防止会话劫持攻击，建议使用 HTTPS 协议，确保会话ID在传输过程中不会被窃取。


> 配置步骤

在 `settings.py` 中添加以下配置Session认证
```py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ]
}
```

###  Token认证

Token 认证是一种简单的基于令牌的认证方式。用户登录成功后，服务端会生成一个唯一的 Token 并返回给客户端，客户端在后续请求中将 Token 放在请求头中发送给服务端，服务端通过验证 Token 来确认用户身份。

> Token认证的使用场景

- 适用于前后端分离，且用户通过浏览器访问的应用。
- 适用于移动端应用，如React Native、Flutter等。

> Token认证的注意事项：

- 安全性：Token 认证依赖于服务端生成的唯一 Token，客户端需要确保 Token 不会被泄露。
- 有效期：可以设置 Token 的有效期，确保用户在有效期内才能访问 API。
- 跨域请求：如果前端应用与后端应用不在同一个域名下，需要配置跨域请求相关的设置，确保浏览器能够正确处理 Token。
- 刷新 Token：为了延长用户会话有效期，服务端可以支持刷新 Token 的机制，让用户在有效期接近结束时可以刷新 Token。

> 配置步骤

1. 在 `settings.py` 中添加以下配置Token认证
```py
INSTALLED_APPS = [
    # ...
    'rest_framework.authtoken',
]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ]
}
```

2. 还需要迁移数据库，从而让Token认证的相关表创建出来。

```
python manage.py migrate
```

### JWT认证

JWT（JSON Web Token）认证是一种无状态的认证方式，用户登录成功后，服务端会生成一个包含用户信息的 JWT 并返回给客户端，客户端在后续请求中将 JWT 放在请求头中发送给服务端，服务端通过验证 JWT 的签名来确认用户身份。

> 配置步骤

1. 安装依赖
```
pip install djangorestframework-simplejwt
```

2. 在 `settings.py` 中添加以下配置JWT认证
```py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}
```

3. 还需要迁移数据库，从而让JWT认证的相关表创建出来。

```
python manage.py migrate
```

### 自定义认证

在实际开发中，自定义认证可以帮助我们实现一些特殊的认证逻辑，比如与第三方系统集成、使用特定的认证协议等。

> 自定义认证的注意事项

- 认证顺序：DRF 会按照配置的顺序依次尝试认证，因此需要根据实际需求合理安排认证类的顺序。
- 异常处理：在 authenticate 方法中，如果认证失败，建议抛出 AuthenticationFailed 异常，这样 DRF 会返回 401 Unauthorized 响应。
- 性能考虑：如果自定义认证类需要频繁调用外部 API 或进行复杂的数据库查询，可能会影响系统性能，需要进行优化。


> 自定义认证类的实现步骤

1. 创建自定义认证类：需要继承 `rest_framework.authentication.BaseAuthentication` 类，并实现 `authenticate` 方法。
2. `authenticate` 方法接收一个 `request` 对象作为参数，该方法需要完成以下操作：
    - 从请求中提取认证信息（如 Token、用户名和密码等）。
    - 验证提取的认证信息是否有效。
    - 如果认证成功，返回一个包含用户对象和认证信息的元组 `(user, auth)`；如果认证失败，返回 `None`。
3. 注册自定义认证类：在 `settings.py` 中配置自定义认证类，将其添加到 `DEFAULT_AUTHENTICATION_CLASSES` 列表中。


代码示例如下
```py
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import User  # 假设使用自定义的 User 模型

# 创建自定义认证类，继承BaseAuthentication类，实现authenticate方法
class CustomTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # 从请求头中提取自定义 Token
        custom_token = request.headers.get('X-Custom-Token')
        if not custom_token:
            return None  # 没有提供 Token，不进行认证

        try:
            # 根据 Token 查找用户
            user = User.objects.get(custom_token=custom_token)
        except User.DoesNotExist:
            raise AuthenticationFailed('Invalid custom token')  # Token 无效

        return (user, custom_token)  # 认证成功，返回用户对象和 Token

```

在`settings.py`中配置自定义认证类，使其生效。
```py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'your_app.authentication.CustomTokenAuthentication',  # 替换为自定义认证类的路径
    ]
}
```


## DRF 权限控制

在 DRF 中，认证机制用于确认用户的身份，而权限控制则决定了经过认证的用户是否有权限执行特定的操作。权限控制可以在视图级别或对象级别进行设置，确保 API 的安全性和数据的完整性。

### 内置权限类

#### IsAuthenticated

`IsAuthenticated` 权限类要求用户必须经过认证才能访问 API，未认证的用户将被拒绝访问。

**使用场景**：适用于需要用户登录后才能访问的 API，如用户个人信息的查看、修改等操作。

示例代码
```python
# views.py
from rest_framework.permissions import IsAuthenticated

class UserProfileViewSet(ModelViewSet):
    # .....
    # 视图级权限控制
    permission_classes = [IsAuthenticated]
```

在该代码中，视图集类的 `permission_classes` 配置为 `[IsAuthenticated]`，表示只有经过认证的用户才能访问该视图集的 API。


#### IsAdminUser

IsAdminUser 权限类要求用户必须是管理员（即 is_staff 或 is_superuser 为 True）才能访问 API。

**使用场景**：适用于需要管理员权限的 API，如用户管理、配置管理等操作。


示例代码
```py
from rest_framework.permissions import IsAdminUser

class SystemLogViewSet(ModelViewSet):
    # .....
    # 视图级权限控制
    permission_classes = [IsAdminUser]
```

在该代码中，视图集类的 `permission_classes` 配置为 `[IsAdminUser]`，表示只有管理员用户才能访问该视图集的 API。

#### IsAuthenticatedOrReadOnly

IsAuthenticatedOrReadOnly 权限类允许未认证的用户进行只读操作（如 GET、HEAD、OPTIONS 请求），而写操作（如 POST、PUT、DELETE 请求）则需要用户进行认证。

**使用场景**：适用于公开数据的展示，但需要用户登录才能进行修改的场景，如博客文章的查看和评论。

示例代码
```py
from rest_framework.permissions import IsAuthenticatedOrReadOnly
class BlogPostViewSet(ModelViewSet):
    # .....
    # 视图级权限控制
    permission_classes = [IsAuthenticatedOrReadOnly]
```

在该代码中，视图集类的 `permission_classes` 配置为 `[IsAuthenticatedOrReadOnly]`，表示未认证用户可以进行只读操作，而认证用户可以进行写操作。

### 自定义权限类

自定义权限类允许我们根据业务需求定义更复杂的权限逻辑。自定义权限类需要继承 `BasePermission` 类，并实现 `has_permission` 或 `has_object_permission` 方法。
- `has_permission` 方法用于判断用户是否有权限访问视图集的所有对象。
- `has_object_permission` 方法用于判断用户是否有权限访问单个对象。


**使用场景**：适用于需要根据用户角色、权限等自定义条件进行访问控制的场景。

示例代码
```py
from rest_framework.permissions import BasePermission

# 自定义权限类1
class IsPremiumUser(BasePermission):
    # view表示当前视图 
    def has_permission(self, request, view):
        # 检查用户是否为高级用户
        return request.user.is_authenticated and request.user.is_premium

# 自定义权限类2
class IsOwnerOrReadOnly(BasePermission):
    # view表示当前视图 , obj表示模型对象
    def has_object_permission(self, request, view, obj):
        # 只读请求（GET, HEAD, OPTIONS）允许所有用户
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        # 写操作（POST, PUT, DELETE）只允许对象所有者
        return obj.owner == request.user


# 在某个视图集类中使用自定义权限类
class UserContentViewSet(ModelViewSet):
    # ....
    permission_classes = [IsPremiumUser, IsOwnerOrReadOnly]
```


### 权限配置方式

#### 全局配置

全局配置会对所有视图生效，需要在 settings.py 中进行配置。
```py
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'your_app.permissions.IsPremiumUser',  # 替换为自定义权限类的路径
    ]
}
```

#### 视图级别的配置

视图级别的配置会对指定视图生效，需要在视图类中进行配置。会覆盖全局配置。

示例代码
```py
## 某个视图集类中配置权限类
class AdminContentViewSet(ModelViewSet):
    # ....
    permission_classes = [IsAdminUser]
```

#### 方法级别配置

在视图类中，可以通过重写 get_permissions 方法为不同的请求方法设置不同的权限。

```py
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

class PublicContentView(APIView):
    # 重写 get_permissions 方法
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    # ...其他代码
```

在该代码中，`get_permissions` 方法根据请求方法返回不同的权限类列表。GET 请求使用 AllowAny 权限，POST、PUT、DELETE 请求使用 IsAuthenticated 权限。

其中
- AllowAny：允许所有用户访问，不进行认证。
- IsAuthenticated：要求用户进行认证才能访问。
- IsAdminUser 仅管理员用户
- IsAuthenticatedOrReadOnly 已登陆认证的用户可以对数据进行增删改操作，没有登陆认证的只能查看数据。

## DRF 限流

DRF 提供了限流功能，允许我们根据用户请求的频率进行限制，防止恶意请求对服务器造成压力。

> 限流的作用
- **防止恶意攻击**：通过限制请求频率，能有效抵御 DDoS 等恶意攻击，保护服务器资源不被过度消耗。
- **资源保护**：避免因大量请求导致服务器性能下降，确保正常用户的请求能得到及时响应。
- **公平使用**：保证每个用户都能合理使用 API 资源，防止个别用户过度占用。


> 限流的注意事项
- 缓存设置：限流功能依赖于 Django 的缓存机制，需要确保缓存配置正确，否则限流规则可能无法正常生效。
- 限流粒度：需要根据实际业务需求合理设置限流的粒度和频率，避免影响正常用户的使用体验。
- 异常处理：可以在视图中捕获 throttled 异常，自定义限流响应信息。


### 内置限流类

#### AnonRateThrottle

AnonRateThrottle类用于对匿名用户（未认证用户）的请求进行限流。

在'settings.py'配置文件中配置限流
```py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',  # ，根据用户 ID 限制请求频率。匿名用户每天最多 100 次请求
    }
}
```

#### UserRateThrottle

UserRateThrottle类用于对认证用户（已认证用户）的请求进行限流。


在'settings.py'配置文件中配置限流
```py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'user': '1000/day',  # 认证用户每天最多 1000 次请求
    }
}
```

#### ScopedRateThrottle

ScopedRateThrottle 允许为不同的视图或视图集设置不同的限流规则，通过throttle_scope 属性来指定作用范围。

代码示例
```py
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.viewsets import ModelViewSet
# 给该视图类添加限流类
class SpecialViewSet(ModelViewSet):
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'special'
    # 其他代码...
```

然后在'settings.py'配置文件中配置限流类的限流规则
```py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'special': '50/hour',  # 该视图集每小时最多 50 次请求
    }
}
```


### 限流配置

> 全局配置

全局配置会对所有视图生效。

在 settings.py 中进行配置
```py
REST_FRAMEWORK = {
    # 对未认证和认证用户分别进行限流
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    # 未认证用户每天最多 100 次请求
    # 认证用户每天最多 1000 次请求
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day',
    }
}
```

> 视图级别配置

视图级别配置只对特定的视图生效，会覆盖全局配置。

先在视图类中配置限流类
```py
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from rest_framework.viewsets import ModelViewSet

class MyModelViewSet(ModelViewSet):
    throttle_classes = [AnonRateThrottle, UserRateThrottle]
    throttle_scope = 'custom'
    # 其他...
```

然后再配置中给限流类配置限流规则
```py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'custom': '100/day',  # 该视图集类每小时最多 50 次请求
    }
}
```

### 自定义限流类

在实际开发中，内置的限流类可能无法满足复杂的业务需求，这时可以自定义限流类。自定义限流类需要继承 SimpleRateThrottle 类，并实现 get_cache_key 方法。

先创建自定义限流类
```py
from rest_framework.throttling import SimpleRateThrottle

class CustomIPRateThrottle(SimpleRateThrottle):
    scope = 'custom_ip'
    def get_cache_key(self, request, view):
        if request.user.is_authenticated:
            return None  # 认证用户不进行 IP 限流

        return self.cache_format % {
            'scope': self.scope,
            'ident': self.get_ident(request)
        }
```

然后再配置文件中配置自定义限流类
```py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'your_app.throttling.CustomIPRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'custom_ip': '300/hour',  # 匿名用户根据 IP 每小时最多 300 次请求
    }
}
```



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