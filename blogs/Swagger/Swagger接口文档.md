---
title: Swagger接口文档
date: 2019-10-12
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Swagger
---

[toc]

# Swagger接口文档

## 1.介绍

Swagger是一个接口文档开发工具。按照它的规范去定义接口及接口相关的信息。再通过Swagger衍生出来的一系列项目和工具，就可以做到生成各种格式的接口文档，生成多种语言的客户端和服务端的代码，以及在线接口调试页面等等。

目前，Spring迅速将Swagger规范纳入自身的标准，建立了Spring-swagger项目，后面改成了现在的Springfox。通过在项目中引入Springfox，可以扫描相关的代码，生成该描述文件，进而生成与代码一致的接口文档和客户端代码。这种通过代码生成接口文档的形式，在后面需求持续迭代的项目中，显得尤为重要和高效。


## 2.简单将Swagger整合进spring boot项目中-----Springfox Swagger

springfox-swagger 是基于 Spring 生态系统的Swagger规范的实现。

1. 创建springboot项目，导入依赖

```
<!--SpringBoot整合Swagger2所需要的依赖 -->
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-swagger2</artifactId>
        <version>2.9.2</version>
    </dependency>
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-swagger-ui</artifactId>
        <version>2.9.2</version>
    </dependency>

```


2. 在项目中创建Swagger配置类

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {

}
```

3. 启动项目，访问网址http://localhost:9090/swagger-ui.html。即可看到最初是swagger模板

**如果配置https证书，你需要用https来访问该链接**


## 3.配置Swagger

### 1.设置Swagger页面信息

在之前创建的Swagger配置类中编写接口文档的作者信息等

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    //Docket是Swagger规范中的唯一的实体bean，它是生成API文档的核心对象，里面配置一些必要的信息
    @Bean
    public Docket customDocket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                //扫描指定包中的注解
                .apis(RequestHandlerSelectors.basePackage("com.shu.mpadmin.controller"))
                //paths为过滤指定的注解。例子为过滤mp开头的接口
                .paths(PathSelectors.ant("/mp/**"))
                .build();
    }
    //设置Swagger文档中的作者信息等
    private ApiInfo apiInfo() {
        Contact contact = new Contact("suichen", "https://suichentree.github.io/", "18271801652@163.com");
        return new ApiInfoBuilder()
                .title("Suichen后台Api接口文档")
                .description("小程序后台的接口文档")
                .contact(contact)
                .version("1.0")
                .build();
    }
}

```

### 2.通过为接口代码添加注解。来自动生成接口文档

```java

@Api(tags = "后台用户管理接口")
@RestController
@CrossOrigin
public class MpUserApi {
    @Autowired
    private MpUserMapper userMapper;
    //日志记录器
    private static final Logger logger = LoggerFactory.getLogger(MpUserController.class);

    @ApiOperation("用户登录")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userName", value = "用户名", defaultValue = "admin"),
            @ApiImplicitParam(name = "passWord", value = "密码", defaultValue = "123456")
    })
    @GetMapping("/shu/admin/login2")
    public String Login2(String userName,String passWord){
        logger.info("后台登录接口2,/shu/admin/login2,参数：userName = "+userName+", passWord="+passWord);
        JSONObject json=new JSONObject();

        QueryWrapper<MpUser> query1=new QueryWrapper<>();
        query1.eq("name",userName).eq("password",passWord);
        MpUser one = userMapper.selectOne(query1);
        if(one!=null&&one.getIsAdmin()==1){
            json.put("isAdmin",1);
            json.put("userId",one.getId());
            json.put("userName",one.getName());
            json.put("password",one.getPassword());
            json.put("headURL",one.getHeadUrl());
        }else{
            json.put("isAdmin",0);
        }
        return json.toString();
    }

}
```

注解说明：

1. @Api注解可以用来描述当前Controller的功能。
2. @ApiOperation注解用来描述一个方法的作用。
3. @ApiImplicitParam注解用来描述一个参数，可以配置参数的中文含义，也可以给参数设置默认值，这样在接口测试的时候可以避免手动输入。
4. @ApiImplicitParam注解来描述多个参数。如果有多个参数，则需要使用多个@ApiImplicitParam注解需要放在一个@ApiImplicitParams注解中。
 

