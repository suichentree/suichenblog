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

## DRF 过滤

在开发 API 时，常常需要根据不同的条件对数据进行过滤，以返回符合特定要求的结果集。

DRF 提供了一些内置的过滤方式，方便开发者根据实际需求进行数据筛选。
- 查询参数过滤（Query Parameters）：通过在 URL 中添加查询参数来指定过滤条件。
- 路径参数过滤（Path Parameters）：通过 URL 中的路径参数来指定过滤条件。
- 自定义过滤类（Custom Filter Backends）：开发者可以自定义过滤类，根据业务需求进行实现。

如果想要使用 DRF过滤，需要先安装 django-filter 库。然后再配置文件中注册django-filter 库

```py
# 下载并按照要求安装django-filter库
pip install django-filter
```

```py
# 注册django-filter库
INSTALLED_APPS = [
    # ...
    'django_filters',
]
```


### DjangoFilterBackend 过滤类

DjangoFilterBackend 是 DRF 提供的一个强大的过滤类，用于处理复杂的查询参数过滤。

先在 settings.py 中配置
```py
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
}
```

在视图类中配置过滤类
```py
from django_filters.rest_framework import DjangoFilterBackend
class MyModelViewSet(ModelViewSet):
    # 其他代码...
    # 配置自定义过滤类，根据指定字段进行过滤
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['field1', 'field2']
    # 其他代码...
```

### SearchFilter 过滤类

SearchFilter 提供了简单的搜索功能，支持对多个字段进行模糊查询。

先在 settings.py 中配置（可选，若已有全局配置可省略）
```py
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['rest_framework.filters.SearchFilter']
}
```

在视图类中配置过滤类
```py
from django_filters.rest_framework import SearchFilter
class MyModelViewSet(ModelViewSet):
    # 其他代码...
    # 配置自定义过滤类，根据指定字段进行过滤
    filter_backends = [SearchFilter]
    search_fields = ['field1', 'field2']
    # 其他代码...
```


### 自定义过滤类

在实际开发中，内置的过滤类可能无法满足复杂的业务需求，这时可以自定义过滤类。自定义过滤类需要继承 BaseFilterBackend 类，并实现 filter_queryset 方法。

然后就可以再视图集类中配置自定义过滤类

代码如下
```py
from rest_framework.filters import BaseFilterBackend
class CustomFilterBackend(BaseFilterBackend):
    # 实现 filter_queryset 方法
    def filter_queryset(self, request, queryset, view):
        # 可以根据请求参数进行过滤
        # 例如：根据请求参数中的字段进行过滤
        field1 = request.query_params.get('field1')
        if field1:
            queryset = queryset.filter(field1__icontains=field1)
        return queryset


### 视图集类中配置自定义过滤类
from .filters import CustomBookFilter
from rest_framework.viewsets import ModelViewSet
class BookViewSet(ModelViewSet):
    # 其他代码。。。。
    # 配置自定义过滤类
    filter_backends = [CustomBookFilter]

```


## DRF 排序

DRF 提供了`rest_framework.filters.OrderingFilter`过滤器类来快速指明数据按照指定字段进行排序。支持根据指定字段对结果进行升序或降序排列。

DRF 会在请求的查询字符串参数中检查是否包含了ordering参数，如果包含了ordering参数，则按照ordering参数指明的排序字段对数据集进行排序。

前端可以传递的ordering参数的可选字段值需要在ordering_fields中指明。


先在 settings.py 中配置（可选，若已有全局配置可省略）
```py
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['rest_framework.filters.OrderingFilter']
}
```

在视图类中配置过滤类
```py
from django_filters.rest_framework import OrderingFilter
class MyModelViewSet(ModelViewSet):
    # 其他代码...
    # 配置自定义过滤类，根据指定字段进行排序
    filter_backends = [OrderingFilter]
    ordering_fields = ['field1', 'field2']
    ordering = ['field1'] # 默认按照字段filed1进行排序
    # 其他代码...
```


## DRF 分页

当数据量较大时，一次性返回所有数据会导致响应时间过长，影响用户体验，同时也会增加服务器的负担。

DRF 提供了多个内部分页类，开发者从而根据业务需求，实现分页功能。

> 分页的作用
- **提升性能**：减少单次请求的数据量，降低服务器负载，加快响应速度。
- **优化体验**：客户端可以根据需要逐步加载数据，提升用户体验。
- **节省带宽**：避免传输大量不必要的数据，节省网络带宽。

### 分页类的配置方式

> 全局配置:会对所有视图生效，需要在 settings.py 中进行配置

```py
REST_FRAMEWORK = {
'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
'PAGE_SIZE': 10
}
```

> 视图中配置：置只对特定的视图生效，会覆盖全局配置。

```py
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

class BookViewSet(ModelViewSet):
    # 再该视图中配置分页类
    pagination_class = LimitOffsetPagination
```

### PageNumberPagination 分页类

`PageNumberPagination` 分页类是基于页码的分页方式，客户端通过指定页码和每页数据量来获取数据。

1. 在 `settings.py` 中进行全局配置（可选）：
```py
REST_FRAMEWORK = {
'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
'PAGE_SIZE': 10,  # 每页数据量
}
```

2. 创建自定义分页类，继承 `PageNumberPagination`分页类。

```py
from rest_framework.pagination import PageNumberPagination
class CustomPageNumberPagination(PageNumberPagination):
    page_size = 20  # 自定义每页显示 20 条数据
    page_size_query_param = 'page_size'  # 允许客户端通过该参数指定每页数据量
    max_page_size = 100  # 限制客户端最大可指定的每页数据量
```

3. 在视图中使用（若全局配置不符合需求，可在视图中单独配置）：

```py
from .paginations import CustomPageNumberPagination
from rest_framework.viewsets import ModelViewSet

class BookViewSet(ModelViewSet):
    # 其他代码....
    # 配置分页类
    pagination_class = CustomPageNumberPagination
```

### LimitOffsetPagination 分页类

LimitOffsetPagination 是基于偏移量的分页方式，客户端通过指定返回数据的数量（limit）和起始偏移量（offset）来获取数据。

1. 在 `settings.py` 中进行全局配置（可选）：
```py
REST_FRAMEWORK = {
'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
'PAGE_SIZE': 10  # 默认每页显示 10 条数据
}
```

2. 创建自定义分页类，继承 `LimitOffsetPagination`分页类。

```py
from rest_framework.pagination import LimitOffsetPagination
class CustomLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20  # 默认返回 20 条数据
    max_limit = 100  # 限制客户端最大可指定的返回数据量
```

3. 在视图中使用（若全局配置不符合需求，可在视图中单独配置）：

```py
from .paginations import CustomLimitOffsetPagination
from rest_framework.viewsets import ModelViewSet
class BookViewSet(ModelViewSet):
    # 其他代码....
    # 配置分页类
    pagination_class = CustomLimitOffsetPagination

```

### CursorPagination 分页类

CursorPagination 是基于游标（cursor）的分页方式，适用于需要高效处理大量数据的场景，特别是数据会动态变化的情况。它不支持任意页码访问，只能按顺序前后翻页。

1. 在 `settings.py` 中进行全局配置（可选）：
```py
REST_FRAMEWORK = {
'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.CursorPagination',
'PAGE_SIZE': 10  # 默认每页显示 10 条数据
}
```

2. 创建自定义分页类，继承 `CursorPagination`分页类。

```py
from rest_framework.pagination import CursorPagination
class CustomCursorPagination(CursorPagination):
    page_size = 20  # 自定义每页显示 20 条数据
    ordering = '-created_at'  # 根据创建时间倒序排序
```

3. 在视图中使用（若全局配置不符合需求，可在视图中单独配置）：

```py
from .paginations import CustomCursorPagination
from rest_framework.viewsets import ModelViewSet
class BookViewSet(ModelViewSet):
    # 其他代码....
    # 配置分页类
    pagination_class = CustomCursorPagination

```

### 自定义分页类

内置的分页类可能无法满足复杂的业务需求，这时可以自定义分页类。自定义分页类需要继承相应的分页基类，并根据需求重写相关属性和方法。

1. 创建自定义分页类，继承某个内置分页类，并写相关属性和方法。
```py
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
# 自定义分页类，继承PageNumberPagination分页类
class CustomPageNumberPagination(PageNumberPagination):
    # 设置相关属性
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
    # 重写相关方法
    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'results': data
        })
```

2. 将自定义分页类应用到视图中。
```py
from .pagination import CustomPageNumberPagination
from rest_framework.viewsets import ModelViewSet
class BookViewSet(ModelViewSet):
    # 其他代码.....
    pagination_class = CustomPageNumberPagination
```

## DRF 异常

DRF 提供了一套完善的异常处理机制，能将异常转换为合适的 HTTP 响应返回给客户端，同时也支持开发者自定义异常处理逻辑，以满足不同业务场景的需求。


DRF 也提供了几个内置的异常类型。

### PermissionDenied 异常

当用户没有足够的权限执行某个操作时抛出。

```py
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied

class AdminOnlyView(APIView):
    def get(self, request):
        raise PermissionDenied("只有管理员可以访问此接口")
```

### NotFound 异常

当请求的资源不存在时抛出。

```py
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound

class BookDetailView(APIView):
    def get(self, request, pk):
        raise NotFound("未找到对应的资源")
```

### AuthenticationFailed

当认证过程失败时抛出。

```py
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CustomTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        raise AuthenticationFailed("无效的 Token")
```

### 自定义异常函数

在实际开发中，内置的异常处理可能无法满足业务需求，这时可以自定义异常处理函数。一般我们编写的异常处理函数，会写一个公共的目录下或者主应用目录下。直接创建一个`excepitions.py`

实现步骤
1. 定义异常处理函数，接收 exc（异常对象）和 context（上下文信息）作为参数，返回一个 Response 对象。
2. 在 settings.py 中配置自定义异常处理函数。

```py
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    # 先调用默认的异常处理函数
    response = exception_handler(exc, context)

    if response is not None:
        if isinstance(exc, (ValidationError,)):
            response.data = {
                "code": 400,
                "message": "数据验证失败",
                "errors": response.data
            }
        elif isinstance(exc, (PermissionDenied,)):
            response.data = {
                "code": 403,
                "message": "权限不足"
            }
        elif isinstance(exc, (NotFound,)):
            response.data = {
                "code": 404,
                "message": "资源不存在"
            }
        elif isinstance(exc, (AuthenticationFailed,)):
            response.data = {
                "code": 401,
                "message": "认证失败"
            }
        else:
            response.data = {
                "code": 500,
                "message": "服务器内部错误"
            }

    return response
```

全局配置自定义异常函数

```py
REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'your_app.exceptions.custom_exception_handler'
}
```

### 自定义异常类

除了自定义异常处理函数，还可以自定义异常类，以满足特定业务场景的需求。

```py
from rest_framework.exceptions import APIException
from rest_framework import status

class CustomAPIException(APIException):
    status_code = status.HTTP_429_TOO_MANY_REQUESTS
    default_detail = '请求过于频繁，请稍后再试'
    default_code = 'too_many_requests'

    def __init__(self, detail=None, status_code=None):
        if status_code is not None:
            self.status_code = status_code
        if detail is not None:
            self.detail = detail
        else:
            self.detail = self.default_detail
```


在视图中使用自定义异常类
```py
from .exceptions import CustomAPIException
from rest_framework.views import APIView

class CustomExceptionView(APIView):
    def get(self, request):
        # 模拟请求过于频繁的场景
        raise CustomAPIException()
```


## DRF API文档

DRF 本身提供了一定的文档支持，同时也可以借助第三方插件生成更美观、交互性更强的 API 文档。下面将介绍几种常见的生成 API 文档的方式。

### drf-yasg

drf-yasg 是一个基于 DRF 框架的 API 文档生成插件，它提供了 Swagger 2.0 规范的支持，能够自动生成 API 文档。

1. 安装插件
```bash
pip install drf-yasg
```

2. 注册drf-yasg到项目中

```py
# settings.py
INSTALLED_APPS = [
    # ...
    'drf_yasg',
]
```

3. 配置drf-yasg到项目中

```py
from django.urls import path, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# get_schema_view类是drf-yasg插件提供的一个视图类，用于生成 API 文档。它接收一些参数，如 API 信息、公开性、权限类等，用于配置drf-yasg 生成的文档。
schema_view = get_schema_view(
   openapi.Info(
      title="Your API Title",   # 文档标题
      default_version='v1',     # 文档版本
      description="Your API description",  # 文档描述
      terms_of_service="https://www.example.com/terms/", # 站点 
      contact=openapi.Contact(email="contact@example.com"), # 联系人
      license=openapi.License(name="BSD License"), # 协议
   ),
   public=True, # 是否公开
   permission_classes=(permissions.AllowAny,), # 权限
)

urlpatterns = [
    # schema_view.with_ui是一个方法，用于将生成的文档与 UI 绑定。它接收两个参数：
    # 第一个参数是 UI 类型，可选值为 'swagger' 或 'redoc'，分别对应 Swagger UI 和 Redoc UI。
    # 第二个参数是缓存时间，单位为秒，用于设置文档的缓存时间。

   # 这段代码将路由与drf-yasg插件生成的文档绑定。
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

```


4. 访问drf-yasg生成的文档

配置完成后，启动 Django 项目，访问以下 URL 即可查看 API 文档：
- Swagger 文档：http://yourdomain.com/swagger/
- Redoc 文档：http://yourdomain.com/redoc/

