---
title: Mybatis-Plus基础
date: 2019-06-12
sidebar: 'auto'
categories: 
 - 后端
tags:
 - MybatisPlus
---


# Mybatis-Plus基础

MyBatis-Plus是一个 MyBatis 的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

[Mybatis-Plus 官网](https://mp.baomidou.com/)

## 1.快速开始

①：创建springboot项目（maven工程）
②：使用MySQL，常见数据库
③：导入Mybatsi-Plus的依赖jar包（**注意Mybatis的依赖 和 Mybatis-plus的依赖只能二选一**）

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
</dependency>
<!--上面是创建springboot项目自带的依赖包，下面是mybatis-plus的依赖-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.2.0</version>
</dependency>

```

④：application.properties中编写数据配置

**useSSL=true&serverTimezone=UTC 这个配置必须的，防止springboot工程连接数据库时出问题。**

```properties
## dataSource config
spring.datasource.url=jdbc:mysql://localhost:3306/test_shu?useSSL=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
#修改为8088端口启动
server.port=8088
```

⑤：编写实体类

>@TableName(value = "mp_user")
该注解是将实体类与数据库中的表进行绑定

>@TableId(value = "id",type =IdType.AUTO)
把实体类的某个属性与表的id字段进行绑定。并且设置该字段与该属性为自动增长

```java
package com.example.demo.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.Serializable;

@TableName(value = "mp_user")
public class UserEntity implements Serializable {
    @TableId(value = "id",type =IdType.AUTO)
    private Integer id;
    @TableField(value = "name")
    private String name;
    @TableField(value = "phone")
    private String phone;
    @TableField(value = "password")
    private String password;
    @TableField(value = "wx_openid")
    private String openId;
    @TableField(value = "wx_unionid")
    private String unionId;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getOpenId() {
        return openId;
    }
    public void setOpenId(String openId) {
        this.openId = openId;
    }
    public String getUnionId() {
        return unionId;
    }
    public void setUnionId(String unionId) {
        this.unionId = unionId;
    }
    public UserEntity() {
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", password='" + password + '\'' +
                ", openId='" + openId + '\'' +
                ", unionId='" + unionId + '\'' +
                '}';
    }
}

```

⑥：编写dao层（mapper类）

Mybatis-Plus框架中通过封装BaseMapper接口，该接口中封装好了常用的增删改查方法。

注意将该类用@Repository注解标记，让springboot能够找到它

```java
@Repository
public interface UserMapper extends BaseMapper<UserEntity> {

}
```

⑥：编写service层

1. 创建service接口类，并继承封装好的IService接口
```java
public interface UserService extends IService<UserEntity> {

}
```

2. 编写service的接口实现类，并继承封装好的ServiceImpl类（IService接口的实现类）
```java
//该service层实现类已继承实现了mybatis-plus通用的service接口
@Service
public class UserServieImpl extends ServiceImpl<UserMapper, UserEntity> implements UserService {

}

```



⑦:编写controller层

> `QueryWrapper<UserEntity> queryWrapper = new QueryWrapper<>();`

条件构造器，通过条件构造器来创建条件语句，作为参数，来调用crud接口

[官网文档-条件构造器](https://mp.baomidou.com/guide/wrapper.html#abstractwrapper)

```java
@RestController
public class userController {

    @Autowired
    private UserMapper mapper;

    @PostMapping("/shu/user/register")
    public String register(String phone,String password) throws Exception {
        JSONObject jsonObject = new JSONObject();
        System.out.println("注册接口，参数： password ="+password+", phone = "+phone);
        UserEntity entity = new UserEntity();
        entity.setPassword(password);
        entity.setPhone(phone);
        int insert = mapper.insert(entity);
        //若返回0表示注册失败，否则注册成功
        if(insert==1){
            System.out.println("注册成功");
        }else{
            System.out.println("注册失败");
        }
        jsonObject.put("isRegister",insert);
        return jsonObject.toString();
    }

    @PostMapping("/shu/user/login")
    public String login(String phone,String password) throws JSONException {
        JSONObject jsonObject = new JSONObject();
        System.out.println("登录接口，参数：phone="+phone+", pass = "+password);
        QueryWrapper<UserEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("phone", phone);
        queryWrapper.eq("password",password);
        UserEntity entity = mapper.selectOne(queryWrapper);
        if(entity!=null){
            System.out.println("登录成功");
            jsonObject.put("userId",entity.getId());
            jsonObject.put("isLogin",1);
        }else{
            System.out.println("登录失败");
            jsonObject.put("userId",0);
            jsonObject.put("isLogin",0);
        }
        return jsonObject.toString();
    }
}

```

⑧：编写springboot项目的启动类

>@MapperScan("com.example.demo.mapper")
>让springboot能够找到该dao层

**ps:注意启动类所在的位置必须其他层所在包的最外面。因为springboot只会从启动类所在包及其子包中寻找。**

```java
@SpringBootApplication
@MapperScan("com.example.demo.mapper")
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
```

## 2.条件构造器

父类：
AbstractWrapper
子类：
QueryWrapper 和 UpdateWrapper

构建条件构造器对象：
```java
QueryWrapper<T> queryWrapper=new QueryWrapper();
UpdateWrapper<T> updateWrapper = new UpdateWrapper();
```


下面是条件构造器对象的各个方法：

> 1. 条件查询
eq = 等于
ne = 不等于
gt = 大于
ge = 大于等于
lt = 小于
le = 小于等于
between = 在两个值之间
notBetween = 不在两个值之间
in = 在那些值之中
notIn = 不在那些值之中
isNull = is null
isNotNull = is not null 
inSql = in (select * ~~)
notInSql = not in 

groupBy = group by ~

ps:举例

```xml
between("age", 18, 30)--->age between 18 and 30
notBetween("age", 18, 30)--->age not between 18 and 30
===
in("age",{1,2,3})--->age in (1,2,3)
notIn("age",{1,2,3})--->age not in (1,2,3)
===
inSql("age", "1,2,3,4,5,6")--->age in (1,2,3,4,5,6)
inSql("id", "select id from table where id < 3")--->id in (select id from table where id < 3)

notInSql("age", "1,2,3,4,5,6")--->age not in (1,2,3,4,5,6)
notInSql("id", "select id from table where id < 3")--->age not in (select id from table where id < 3)
===
groupBy("id", "name")--->group by id,name
```

> 2. 模糊查询
like = like %value%
notLike = not like %value%
likeLeft = like %value
likeRight = like value%

> 3. 排序
orderBy = 默认为升序（从小到大）
orderByAsc = 升序（从小到大）
orderByDesc = 降序(从大到小)

> 4. 条件连接and，or

不写or()的时候，默认为and
or() ： 该方法在sql语句中作为or存在

ps:举例
```xml
eq("id",1).or().eq("name","老王")--->id = 1 or name = '老王'

or嵌套用法：
or(i -> i.eq("name", "李白").ne("status", "活着"))--->or (name = '李白' and status <> '活着')
```



```java

    /**
     * 测试and，or
     */
    @RequestMapping("/shu/test/andOr")
    public void testAndOr(){
        QueryWrapper<UserEntity> queryWrapper = new QueryWrapper<>();
        //FROM mp_user WHERE (phone = ? OR password = ?) 
        queryWrapper.eq("phone","18271801652").or().eq("password","aaaaaa");
        List<UserEntity> list = userMapper.selectList(queryWrapper);
        for(UserEntity u:list){
            System.out.println(u.toString());
        }
    }
```



## 3.CRUD

### 0.设置控制台打印sql语句

```xml
#mybatis-plus配置控制台打印完整带参数SQL语句
mybatis-plus.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

### 1.插入数据的时候，返回新插入数据的主键值（id值）

当向数据库中插入数据后，mybatis-plus会给实体对象的主键值id属性,调用setId()方法，将数据库中对应记录的id数值赋值过去。

```java
 @RequestMapping(value = "/shu/test/insert")
    public void test1(){
        UserEntity entity=new UserEntity();
        entity.setName("小明");
        entity.setPhone("13256987452");
        int insert = userMapper.insert(entity);
        // insert 是指对表的行数影响记录
        System.out.println("insert ="+insert);
        // 直接对实体对象id属性打印，就能得到该对象对应的主键值
        System.out.println("插入记录的主键值 id = "+entity.getId());
    }
```

### 2.通过UpdateWrapper 条件构造器来更新数据

使用UpdateWrapper条件构造器，就可以通过该对象来编写sql语句。

```java
 @RequestMapping(value = "/shu/test/update")
    public void testUpdate(){
        UpdateWrapper<UserEntity> updateWrapper = new UpdateWrapper();
        // update mp_user set password = 'aaaaaa' , set phone = '110' where name = '小明'
        updateWrapper.set("password","aaaaaa").set("phone","110").eq("name","小明");
        //当通过条件构造器编写sql语句时，可以不传entity对象
        int update = userMapper.update(null, updateWrapper);
        System.out.println("update = > "+update);
    }
```

### 3.通过deleteByMap方法，多条件删除数据

```java
    /**
     * 将删除条件保存在map中，根据多条件来删除数据
     */
    @RequestMapping("/shu/test/deleteByMap")
    public void testdeleteByMap(){
        Map<String,Object> map=new HashMap<>();
        map.put("phone","13563569856");
        map.put("password","321654");
        // DELETE FROM mp_user WHERE password = ? AND phone = ? 
        int i = userMapper.deleteByMap(map);
        System.out.println("i = "+i);
    }

```

### 4.Mybatis-plus 分页查询

①：配置mybatis-plus 分页插件

1. 于启动类所在包（主包）中，创建mybatis-plus配置类

**可以选择把启动类中扫描mapper的配置，放到新创建mybatis-plus配置类中**

```java
@Configuration
//@MapperScan("com.example.demo.mapper")
public class MybatisPlusConfig {

    //mybatis-plus 分页插件配置
    //将其注入到spring容器中
    @Bean
    public PaginationInterceptor paginationInterceptor(){
        return new PaginationInterceptor();
    }
}
```

②：编写代码：

```java
    /**
     * 分页查询
     */
    @RequestMapping("/shu/test/selectPage")
    public void testSelectPage() throws JSONException {
        Page<UserEntity> page = new Page<>();
        //current 当前页,size 每页显示条数
        page.setCurrent(1);
        page.setSize(2);
        QueryWrapper queryWrapper=new QueryWrapper();
        queryWrapper.gt("id",1);
        //FROM mp_user WHERE (id > 1) LIMIT 1,2 
        IPage iPage = userMapper.selectPage(page, queryWrapper);

        List<UserEntity> records = iPage.getRecords();
        System.out.println("当前页查询记录 records = "+records);
        for(UserEntity u:records){
            System.out.println(u.convertToJson().toString());
        }
        System.out.println("一共查询的数据数 total = "+iPage.getTotal());
        System.out.println("当前页数是第 "+iPage.getCurrent()+" 页");
        System.out.println("一共的页数为 = "+iPage.getPages());
    }

```

## 4.常用配置

### 1.在mybatis-plus中添加mybatis全局配置文件

1. 在resource目录下创建 mybatis-config.xml

2. 在applicaton.properties 中标记配置文件的位置

```xml
//指定mybatis全局配置文件
mybatis-plus.config-location=classpath:mybatis-config.xml
```

### 2.mybatis-plus配置控制台打印完整带参数SQL语句

```xml
#mybatis-plus配置控制台打印完整带参数SQL语句
mybatis-plus.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

## 5.编写自定义sql语句，扩充dao层（mapper接口）（通过使用注解的形式）

1. 在dao层编写方法

```java
@Repository
public interface UserMapper extends BaseMapper<UserEntity> {

    //编写自定义方法,该方法在BaseMapper中没有
    @Select("select * from mp_user where id = #{id}")
    public UserEntity findByid(Integer id);

}
```

2. 调用该方法

```java
    @RequestMapping("/shu/test/findByid")
    public void testFindByid(){
        Integer id = 1;
        UserEntity entity = userMapper.findByid(id);
        System.out.println("entity = "+entity);
    }

```

## 6.编写自定义方法，扩充service层

**在service层编写自定义方法，本质上是调用dao层的方法**

1. 在service接口中定义方法
```java
public interface UserService extends IService<UserEntity> {
    public UserEntity findone(Integer id);
}
```

2. 在service接口实现类中，注入mapper
```java
@Service
public class UserServieImpl extends ServiceImpl<UserMapper, UserEntity> implements UserService {
    @Autowired
    private UserMapper mapper;

    @Override
    public UserEntity findone(Integer id) {
        UserEntity entity = mapper.findByid(id);
        return entity;
    }
}
```

3. 在controller层中调用

```java
@RestController
public class testController {

    @Autowired
    private UserService service;

    @RequestMapping("/shu/test/findByid")
    public void testFindByid(){
        Integer id = 1;
        UserEntity entity = service.findone(1);
        System.out.println("entity = "+entity);
    }
}

```