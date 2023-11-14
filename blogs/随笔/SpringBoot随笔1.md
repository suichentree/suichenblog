---
title: springboot整合日志+Mybatis+自定义拦截器+自定义异常+统一返回对象
date: 2021-03-18
sidebar: 'auto'
categories: 
 - 后端
tags:
 - SpringBoot
---

[toc]

### 2. SpringBoot与Mybtis的整合

#### 1. 依赖导入和配置

pom.xml
```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.4</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

application.properties

```properties
#数据库配置
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/shu_wx_miniprogram?useUnicode=true&characterEncoding=utf-8&useSSL=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root

# mybatis配置
# 指定mapper映射文件位置
mybatis.mapper-locations=classpath:mapperImpl/*.xml
```

#### 2.创建entity,mapper,service,controller层

![20210129170957.png](../blog_img/20210129170957.png)

1. 创建实体类

MpUserEntity.java
```java
public class MpUserEntity implements Serializable {
    //实现serializable接口。
    private static final long serialVersionUID = 1L;

    //用户id
    private Integer id;
    //微信昵称
    private String name;
    //电话
    private String phone;
    //密码
    private String password;
    //头像
    private String headUrl;
    //年龄
    private Integer age;
    //性别
    private Integer gender;
    //住址
    private String address;
    //邮箱
    private String email;
    //登录次数
    private Integer loginCount;
    //最后登录时间
    private Date lastLoginTime;
    //是否是管理员 1是 0不是
    private Integer isAdmin;
    //微信小程序的openid
    private String openId;
    //微信小程序的unionId
    private String unionId;

    public Integer getId() {
        return id;
    }

    ...

}

```

2. 创建mapper层

**创建mapper映射类 MpUserMapper.java，若想该接口被springboot管理，则需要在工程启动类中添加@MaperScan注解。**

工程启动类
```java
@SpringBootApplication
@MapperScan("com.shu.wxprogram.mapper")
// com.shu.wxprogram.mapper 为mapper类所在位置
public class WxprogramApplication {

    public static void main(String[] args) {
        SpringApplication.run(WxprogramApplication.class, args);
    }
}
```

```java
@Repository
public interface MpUserMapper {
    //查询全部
    public List<MpUserEntity> findAll();
    //查询
    public MpUserEntity findOne(Integer id);
    //添加数据
    public Integer addMpUser(MpUserEntity entity);
    //删除数据
    public Integer deleteMpUser(Integer id);
    //修改数据
    public Integer upDateMpUser(MpUserEntity entity);
}
```

**对于IDEA系列编辑器，XML文件是不能放在java文件夹中的，IDEA默认不会编译源码文件夹中的XML文件，可以将配置文件放在resource文件夹中。**

**在resources目录下新建mapperImpl目录，该文件存放建mapper映射文件。并且配置一处地方，让该映射文件被springboot管理。**

application.properties
```properties
# 指定mapper映射文件位置
mybatis.mapper-locations=classpath:mapperImpl/*.xml
```

MpUserMapper.xml
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.shu.wxprogram.mapper.MpUserMapper">
    <!--类与表的映射1-->
    <resultMap type="com.shu.wxprogram.entity.MpUserEntity" id="oneResultMap">
        <!-- id 标签指的是该列为主键列，result标签代表普通列-->
        <id property="id" column="id"/>
        <result property="name" column="name"/>
        <result property="phone" column="phone"/>
        <result property="password" column="password"/>
        <result property="headUrl" column="head_url"/>
        <result property="age" column="age"/>
        <result property="gender" column="gender"/>
        <result property="address" column="address"/>
        <result property="email" column="email"/>
        <result property="loginCount" column="login_count"/>
        <result property="lastLoginTime" column="last_login_time"/>
        <result property="isAdmin" column="is_admin"/>
        <result property="openId" column="wx_openid"/>
        <result property="unionId" column="wx_unionid"/>
    </resultMap>

    <select id="findAll" resultMap="oneResultMap">
        select * from mp_user
    </select>

    <select id="findOne" resultMap="oneResultMap">
        select * from mp_user where id = #{id}
    </select>

    <!--动态插入数据-->
    <insert id="addMpUser" parameterType="com.shu.wxprogram.entity.MpUserEntity">
        insert into mp_user
        <trim prefix="(" suffix=")" suffixOverrides="," >
            <if test='name != null'>name,</if>
            <if test='phone != null'>phone,</if>
            <if test='password != null'>password,</if>
            <if test='headUrl != null'>headUrl,</if>
            <if test='age != null'>age,</if>
            <if test='gender != null'>gender,</if>
            <if test='address != null'>address,</if>
            <if test='email != null'>email,</if>
            <if test='loginCount != null'>loginCount,</if>
            <if test='lastLoginTime != null'>lastLoginTime,</if>
            <if test='isAdmin != null'>isAdmin,</if>
            <if test='openId != null'>openId,</if>
            <if test='unionId != null'>unionId,</if>
        </trim>
        <trim prefix="values (" suffix=")" suffixOverrides="," >
            <if test='name != null'>#{name},</if>
            <if test='phone != null'>#{phone},</if>
            <if test='password != null'>#{password},</if>
            <if test='headUrl != null'>#{headUrl},</if>
            <if test='age != null'>#{age},</if>
            <if test='gender != null'>#{gender},</if>
            <if test='address != null'>#{address},</if>
            <if test='email != null'>#{email},</if>
            <if test='loginCount != null'>#{loginCount},</if>
            <if test='lastLoginTime != null'>#{lastLoginTime},</if>
            <if test='isAdmin != null'>#{isAdmin},</if>
            <if test='openId != null'>#{openId},</if>
            <if test='unionId != null'>#{unionId},</if>
        </trim>
    </insert>
</mapper>

```

3. service层

创建MpUserService接口及其实现类

MpUserService.java
```java
public interface MpUserService {
    //查询全部
    public List<MpUserEntity> findAll();
    //查询
    public MpUserEntity findOne(Integer id);
    //添加数据
    public Integer addMpUser(MpUserEntity entity);
    //删除数据
    public Integer deleteMpUser(Integer id);
    //修改数据
    public Integer upDateMpUser(MpUserEntity entity);
}
```

MpUserServiceImpl.java
```java
@Service
public class MpUserServiceImpl implements MpUserService {
    @Autowired
    private MpUserMapper mapper;

    @Override
    public List<MpUserEntity> findAll() {
        return mapper.findAll();
    }

    @Override
    public MpUserEntity findOne(Integer id) {
        return mapper.findOne(id);
    }

    @Override
    public Integer addMpUser(MpUserEntity entity) {
        return mapper.addMpUser(entity);
    }

    @Override
    public Integer deleteMpUser(Integer id) {
        return mapper.deleteMpUser(id);
    }

    @Override
    public Integer upDateMpUser(MpUserEntity entity) {
        return mapper.upDateMpUser(entity);
    }
}
```

4. controller层

MpUserController.java
```java
@RestController
@RequestMapping("/mpUser")
public class MpUserController {
    //日志
    private static final Logger logger = LoggerFactory.getLogger(MpUserController.class);

    @Autowired
    private MpUserService mpUserService;

    @GetMapping("/find/{id}")
    public void find(@PathVariable("id") Integer id){
        logger.info("id="+id);
        MpUserEntity one = mpUserService.findOne(id);
        System.out.println("one = "+one.toString());
    }
}

```

<h3>运行工程，并且使用postman调接口测试</h3>

