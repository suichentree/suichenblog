---
title: Json Web Token 笔记
date: 2023-11-15
sidebar: 'auto'
categories:
 - 开发
tags:
 - 开发
 - JWT
---

[toc]

# Json Web Token 笔记

## 什么是用户认证？

对于系统中的大多数业务操作来说。系统必须首先要确认用户身份后，才会允许你进行业务。用户认证的形式有多种，最常见的有输入用户名密码、手机验证码、人脸识别、指纹识别等，但其目的都是为了确认用户在系统中的身份并为之提供服务。


## 用户认证方案的演变

> 单体应用的用户认证

一般用户认证的流程如下
1. 用户向服务器发送用户名和密码。
2. 服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。
3. 服务器向用户返回一个 session_id，写入用户的 Cookie。
4. 用户随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器。
5. 服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。

![jwt_20231115220507.png](../blog_img/jwt_20231115220507.png)

> 集群应用的用户认证

随着系统流量的增高，单点应用以无法支撑业务运行。因此单体应用变成了集群应用。由于之前的是一台服务器存储session，现在为了用户认证必须要每台服务器都存储session。这样在集群环境下必须保证每一个服务器节点的session状态一致的才不会出问题。

因此基于Redis的分布式会话存储方案应运而生，将用户session数据统一转存至 Redis 中，因为该session数据是集中存储的，所以不会出现session数据一致性的问题。

![jwt_20231115221308.png](../blog_img/jwt_20231115221308.png)

> 客户端存储的用户认证

上面两个方式都是在服务器上存储用户数据的用户认证方案。但是我们可以让用户数据不在从服务器上存储，改为在客户端上存储。

客户端每一次发送请求时附带用户数据到服务器，然后服务器读取用户数据并进行业务处理，因为用户数据分散存储在客户端中，因此并不会对服务端产生额外的负担，此时认证架构会变成下面的情况。

![jwt_20231115221819.png](../blog_img/jwt_20231115221819.png)


## 客户端用户认证方案-Json Web Token（JWT）

Json Web Token（JWT）：java web 令牌

### JWT介绍

一般在客户端存储并加密用户数据时有一个通用的用户认证方案：Json Web Token（JWT），JWT是一个经过加密的，包含用户信息的且具有时效性的固定格式字符串，即token。

JWT进行用户认证的流程：
1. 用户使用用户名密码来请求服务器进行用户认证。
2. 服务器通过验证后，会发送给用户一个token。这个token包含了用户的信息。
4. 客户端存储这个token，并在每次请求服务端的同时附加上这个token
5. 服务端接收到请求后，会首先验证token，服务端通过token来验证用户信息。
6. 验证成功后，服务端才允许请求办理后面的业务。

<font color="red">token必须要在每次请求时传递给服务端，它应该保存在请求头里， 另外，服务端要支持CORS(跨来源资源共享)策略，一般我们在服务端这么做就可以了Access-Control-Allow-Origin: *。</font>

### JWT字符串token的组成

一个标准的JWT字符串token如下所示。

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjoyLFw9.NT8QBdoK4S-PbnhS0msJAqL0FG2aruvlsBSyG226HiU  
```

这个加密的字符串token由3个部分组成，中间由点“.”分隔。
- 第一部分：Header（头部）
- 第二部分：Payload（载荷）
- 第三部分：Signature（签名）

token范例：Header.Payload.Signature

> 第一部分：Header（头部）

Header是一个JSON对象，用于描述字符串的元数据。alg表示算法，默认是HS256。typ表示字符串的类型，即JWT。

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

然后这个JSON对象就会被加密为JWT字符串的第一部分。

```
eyJhbGciOiJIUzI1NiJ9
```

> 第二部分：Payload（载荷）

载荷就是实际存储的用户数据以及其他自定义数据。如下所示

```json
{  
  "sub": "1234567890",  
  "name": "小明",  
  "admin": true  
}  
```

然后这个对象也会被加密为JWR字符串的第二部分。

```
eyJzdWIiOiJ7XCJ1c2VySWRcIjoyLFw9
```

> 第三部分：Signature（签名）

签名就是通过将前面两部分的字符串+密钥再配合指定的算法，生成一个特殊加密字符串。这个加密字符串可以用来校验前面两个部分是否被篡改过。

```
NT8QBdoK4S-PbnhS0msJAqL0FG2aruvlsBSyG226HiU
```

最后将上面三个加密的字符串通过“.”连接在一起，就是一个标准的JWT字符串了。

### JWT中token的创建与验证

首先导入jwt的依赖包
```xml
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>3.4.0</version>
</dependency>
```

测试代码
```java

/**
 * jwt的工具类
 *
 */
public class ShuJWTUtils {

    //密钥
    private static final String key = "1234567890_1234567890_1234567890";

    /**
     * 创建token
     */
    public static String createToken(Map<String,String> map){
        //设置过期时间,1小时过期
        Calendar instance = Calendar.getInstance();
        instance.add(Calendar.HOUR,1);

        //创建token基础数据
        Builder builder = JWT.create();
        //添加playload
        for (Map.Entry<String, String> entry : map.entrySet()) {
            builder.withClaim(entry.getKey(), entry.getValue());
        }
        //添加过期时间
        builder.withExpiresAt(instance.getTime());
        //添加signature
        String token = builder.sign(Algorithm.HMAC256(key));
        return token;
    }

    /**
     * 验证token并返回token中的信息
     * @param token
     */
    public static DecodedJWT tokenVerify(String token){
        DecodedJWT verify = JWT.require(Algorithm.HMAC256(key)).build().verify(token);
        return verify;
    }

    /**
     * 验证token是否成功
     * @param token
     * @return
     */
    public static Boolean tookenIsRight(String token){
        //验证token
        try {
            DecodedJWT tokenVerify = ShuJWTUtils.tokenVerify(token);
            //验证成功
            if(tokenVerify!=null){
                System.out.println("token验证成功");
                return true;
            }else{
                System.out.println("token验证失败");
                return false;
            }
        } catch (SignatureVerificationException e) {
            System.out.println("token无效签名");
            return false;
        } catch (TokenExpiredException e) {
            System.out.println("token过期");
            return false;
        } catch (AlgorithmMismatchException e) {
            System.out.println("token算法错误");
            return false;
        } catch (Exception e) {
            System.out.println("无效token");
            return false;
        }
    }

    public static void main(String[] args) {
        //放入token中的信息
        Map<String,String> map = new HashMap<String, String>();
        map.put("username","shu-yx");
        map.put("password", "123456");
        //创建token
        String token = ShuJWTUtils.createToken(map);
        System.out.println("token = "+token);
        //验证token
        Boolean isToken = tookenIsRight(token);
        System.out.println("token是否正确：isToken = "+isToken);
    }
}

```
