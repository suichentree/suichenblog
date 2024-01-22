---
title: MybatisPlus扩展笔记
date: 2023-09-23
sidebar: 'auto'
categories: 
 - 后端
tags:
 - MybatisPlus
---

[toc]

# MybatisPlus扩展笔记

## 分页

分页可分为逻辑分页和物理分页。

- 逻辑分页是指一次性把全部数据查询出来加载进内存中，然后通过逻辑操作将全部数据进行分页。优点是减少了数据库I/O次数（只查询一次），适合频繁访问、数据量少的情况。缺点是不适合大数据量，全部数据加载到内存中容易造成内存溢出。
- 物理分页是指利用SQL的limit 关键字。直接在数据库中进行分页查询。优点是适合大数据量。缺点是频繁查询数据库，增大了数据库的I/O次数，从而消耗数据库的性能。

> mybatisplus 实现分页的方式有2种
1. 直接使用内置的分页插件来进行分页。（不手写SQL的情况下）
2. 直接使用内置的分页插件来进行分页。（手写SQL的情况下）

首页先要配置mybatiplus的分页插件

```java
@Configuration
@MapperScan("com.shuyx.shuyxuser.mapper")  //指明mapper接口的位置
public class MybatisPlusConfig {
    /**
     * 添加分页插件
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));//如果配置多个插件,切记分页最后添加
        //interceptor.addInnerInterceptor(new PaginationInnerInterceptor()); 如果有多数据源可以不配具体类型 否则都建议配上具体的DbType
        return interceptor;
    }
}
```


### 不手写SQL的情况

不手写SQL的情况是指直接调用mybatisplus的分页方法来进行分页。
- 优点：对于单表分页查询，这样很方便。
- 确定：对于多表联查的分页查询。可以通过另一个框架mybatisplus-join来完成。

```java
//分页查询
@Override
public Object pagelist(UserDTO userDTO) {
    QueryWrapper<UserEntity> queryWrapper = new QueryWrapper<>();
    //用户名称查询
    if(StringUtils.isNotBlank(userDTO.getUserName())){
        queryWrapper.like("user_name",userDTO.getUserName());
    }
    //分页设置
    Page<UserEntity> page = new Page<>();
    page.setCurrent(userDTO.getPageNum());
    page.setSize(userDTO.getPageSize());
    //开始分页查询，直接调用selectPage分页方法进行分页查询
    Page<UserEntity> list = userMapper.selectPage(page, queryWrapper);
    //查询出来的分页数据
    system.out.println(list)
}
```

