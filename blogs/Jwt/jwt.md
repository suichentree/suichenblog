---
title: JWT使用
date: 2021-03-15
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Jwt
---

## 1.Jwt介绍

Json web token (JWT), 一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该token也可直接被用于认证，也可被加密。

token鉴权认证流程：
1. 用户使用用户名密码来请求服务器
2. 服务器进行验证用户的信息
3. 服务器通过验证发送给用户一个token
4. 客户端存储token，并在每次请求时附送上这个token值
5. 服务端验证token值，并返回数据

<font color="red">token必须要在每次请求时传递给服务端，它应该保存在请求头里， 另外，服务端要支持CORS(跨来源资源共享)策略，一般我们在服务端这么做就可以了Access-Control-Allow-Origin: *。</font>


JWT由3部分组成。token = 头部（header) + 载荷（payload) + 签证（signature)
token范例：xxxxxx.aaaaaa.bbbbbbbbb


## 2.JWT中token的创建与验证

导入jwt依赖包
```xml
<!--jwt token验证-->
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>3.4.0</version>
</dependency>
```

测试代码
```java
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator.Builder;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.AlgorithmMismatchException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.Verification;

/**
 * jwt的工具类
 * 创建jwt
 * 验证jwt
 * @author Administrator
 *
 */
public class ShuJWTUtils {

    //密钥
    private static final String key = "token";

    /**
     * 创建token
     * token = header.playload.signature 三部分组成
     * header 自动生成
     * @param map
     * @return
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
