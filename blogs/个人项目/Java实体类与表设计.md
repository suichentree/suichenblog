---
title: Java实体类与表设计
date: 2024-02-04
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Java
---

[toc]

# Java实体类与表设计

通常在数据库中设计表的时候，会考虑到表与表的关系。例如 一对多，多对一，一对一和多对多的表关系。

而用java创建表对应的实体类的时候，由于表与表的关系，也要考虑到实体类与实体类的关系。

## 一对一关系

例如每个用户都有一个对应的身份证信息。

即用户表和身份证表是一对一的关系。一个用户对应一个身份证，一个身份证对应一个用户。

> 表的设计

```sql
-- 用户表
create table user(
    user_id int primary key,    -- 用户id
    user_name varchar(5),       -- 用户name
    idcard_id int,              -- 外键字段：身份证id，用来关联身份证表
);

-- 身份证表
create table idcard(
    idcard_id int primary key,    -- 身份证id
    idcard_name varchar(5),       -- 身份证name
);
```

如果两个表是一对一的关系。那么我们可以通过设置一个外键字段，来把两个表进行关联在一起。外键字段通常设置在查询频率高的一方。

> java实体类设计

```java
//用户实体类
public class UserEntity {
    private Integer userId;                 //用户id
    private String userName;                //用户名称
    private Integer idcardId;               //身份证id
    private IdCardEntity idcardEntity;      //额外添加。（不是强制的，后续可以在DTO类中设计这个属性）
}
//身份证实体类
public class IdCardEntity{
    private Integer idcardId;                 //身份证id
    private String idcardName;                //身份证名称
}

```

- 在设计实体类的时候，对于表中的每一个字段，都要有对应的属性。
- 另外对于外键字段，可以在实体类中额外添加外键字段关联的实体类属性。（不是强制的，后续可以在DTO类中设计这个属性）
    - 当进行数据库联查的时候，该属性用于存储用户的身份证信息。

## 一对多关系

比较经典的一对多的关系就是学生表与年级表，

即一个学生对应一个年级，一个年纪对应多个学生。

> 表的设计

```sql
-- 学生表
create table student ( 
    stu_id int primary key,
    stu_name varchar(5), 
    grade_id int     --外键字段，关联年级表
);
​-- 年级表
create table grade( 
    grade_id int primary key , 
    grade_name varchar(5) 
);
```

一对多关系本质上可以拆分为一对一关系和一对多关系。因此也可以通过设置外键字段的方式来把两个表进行关联在一起。外键字段通常设置在查询频率高的一方。

> java实体类设计

```java
//学生实体类
public class StudentEntity {
    private Integer stuId;                 
    private String stuName;
    private Integer gradeId;          //外键字段  
    private GradeEntity gradeEntity;  //额外添加（不是强制的，后续可以在DTO类中设计这个属性）
}
//年级实体类
public class GradeEntity{
    private Integer gradeId;                 
    private String gradeName;
    private List<StudentEntity> studentList; //额外添加（不是强制的，后续可以在DTO类中设计这个属性）
}
```

- 在设计实体类的时候，对于表中的每一个字段，都要有对应的属性。
- 另外由于一个学生对应一个年级，可以在学生实体类中额外添加年级属性。（不是强制的，后续可以在DTO类中设计这个属性）
    - 当进行数据库联查的时候，该属性用于存储学生的年级信息。
- 另外由于一个年级对应多个学生，可以在年级实体类中额外添加学生集合属性。（不是强制的，后续可以在DTO类中设计这个属性）
    - 当进行数据库联查的时候，该属性用于存储年级中的学生信息。

## 多对多关系

比较经典的多对多关系就是菜单表与角色。

即一个菜单对应多个角色，一个角色对应多个菜单。

> 表的设计

```sql
-- 菜单表
create table menu ( 
    menu_id int primary key,
    menu_name varchar(5),
);
-- 角色表
create table role ( 
    role_id int primary key,
    role_name varchar(5),
);
-- 菜单角色中间表
create table menu_role ( 
    id int primary key,     --主键id
    menu_id int,            --菜单id
    role_id int,            --角色id
);
```

对于多对多关系的两个表。我们通常需要设计中间表，来专门记录两个表的多对多关系。

> java实体类设计

```java
//菜单实体类
public class MenuEntity {
    private Integer menuId;                 
    private String menuName;
    private List<RoleEntity> roleList;  //额外添加（不是强制的，后续可以在DTO类中设计这个属性）
}
//角色实体类
public class RoleEntity{
    private Integer roleId;                 
    private String roleName;
    private List<MenuEntity> menuList;  //额外添加（不是强制的，后续可以在DTO类中设计这个属性）         
}
```

- 在设计实体类的时候，对于表中的每一个字段，都要有对应的属性。
- 另外由于一个菜单对应多个角色，可以在菜单实体类中额外添加角色集合属性。（不是强制的，后续可以在DTO类中设计这个属性）
    - 当进行数据库联查的时候，该属性用于存储菜单对应的角色信息。  
- 另外由于一个角色对应多个菜单，可以在角色实体类中额外添加菜单集合属性。（不是强制的，后续可以在DTO类中设计这个属性）
    - 当进行数据库联查的时候，该属性用于存储角色对应的菜单信息。  


### 中间表是否需要设计实体类？

如果这个中间表，仅仅记录两个表的多对多关系，那么中间表不需要设计实体类。但是如果中间表还记录了其他信息，那么可以考虑给中间表设计实体类。


## 实体类设计的额外属性

上述例子中，java实体类额外添加的属性。其实并没有对应数据表中的字段。而是为了方便后续数据库联查的时候才添加的。

我们也可以在实体类中不额外添加这个属性。而是通过设计dto类方式来添加。例如下面的例子。

实体类
```java
//菜单实体类
public class MenuEntity {
    private Integer menuId;                 
    private String menuName;
}
//角色实体类
public class RoleEntity{
    private Integer roleId;                 
    private String roleName;
}
```

DTO类
```java
//菜单dto类 继承 菜单实体类
public class MenuDTO extends MenuEntity{
    private List<RoleEntity> roleList;  //额外添加
}
//角色dto类 继承 角色实体类
public class RoleDTO extends RoleEntity{
    private List<MenuEntity> menuList;  //额外添加         
}
```

上面例子中的实体类，每一个属性都一一对应表中的字段。实体类中不添加除了表字段之外的属性。

而DTO类可以用来继承对应的实体类，并且添加了关联其他实体类的额外属性。










