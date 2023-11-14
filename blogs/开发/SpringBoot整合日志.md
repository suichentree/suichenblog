---
title: SpringBoot整合日志
date: 2023-11-14
sidebar: 'auto'
tags:
 - 开发
tags:
 - 开发
 - SpringBoot
---

[toc]

# SpringBoot整合日志

## SpringBoot中日志的使用？

市面上常见的日志框架有很多，比如：JCL、SLF4J、Jboss-logging、jUL、log4j、log4j2、logback等等。

<font color="red">通常情况下，日志是由一个抽象层 + 实现层的组合来搭建的。这样可以方便随时替换不同的实现层日志框架，而不影响项目整体代码的改动。</font>

<font color="blue">并且开发的时候，日志记录方法的调用，不应该来直接调用日志的实现类，而是调用日志抽象层里面的方法。这样可以实现业务代码与日志实现层的解耦</font>


|  抽象层   | 实现层  |
|  ----  | ----  |
| JCL、SLF4J、jboss-logging  | jul、log4j、log4j2、logback |


**SpringBoot选择的是SLF4J+Logback的组合。由于Hibernate Mybatis这些框架有自己的日志框架使用。所有我们需要统一进行日志管理。即排除掉其他日志框架，只使用SLF4J+Logback的组合。**

重点👇(在springboot中)

1. 配置文件只需要配置实现层日志框架,即logback的配置,抽象层不需要配置。
2. 与上述相反 , 在调用API时,调用的则是抽象层slf4j的API。


## Springboot统一日志管理

统一日志管理只使用SLF4J+Logback日志组合,排除到其他日志框架。

```xml
<!--spring框架使用的是commons-logging-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <exclusions>
        <exclusion>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

<font color="red">PS:SpringBoot自带的spring-boot-starter-web,spring-boot-starter-test这两个依赖，包含了SLF4J和Logback依赖包。无需额外导入</font>


## 日志默认配置-在application.properties中配置

日志输出格式：
```js
%d表示日期时间，
%thread表示线程名，
%-5level：级别从左显示5个字符宽度
%logger{50} 表示logger名字最长50个字符，否则按照句点分割。
%msg：日志消息，
%n是换行符

//标准日志输出格式
%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n
```

SpringBoot修改日志的默认配置

1. `logging.file.name` 和 `logging.file.path`不能同时生效,二者只可以存在一个。
2. `logging.file.name` 可以指定路径和log文件的名字
3. `logging.file.path` 只可以只当log的路径, 不能指定log的名字, 文件名称默认为spring.log

```properties
# 默认在当前项目下生成springboot.log日志
# 指定日志文件的完整的路径；
logging.file.name=C:\Users\Administrator\Desktop\springboot.log

# 在当前磁盘的根路径下创建spring文件夹和里面的log文件夹；使用 spring.log 作为默认文件
logging.file.path=/spring/log

# 在控制台输出的日志的格式
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{100} - %msg%n

# 在文件中日志输出的格式
logging.pattern.file=%d{yyyy-MM-dd HH:mm:ss} === [%thread] === %-5level === %logger{100} ==== %msg%n
```


## 自定义配置logback日志


SpringBoot默认的配置文件是application.properties文件。你可以自定义配置文件。

```properties
# 自定义配置文件位置
logging.config = classpath:logback-spring.xml
```

在resource目录下创建一个logback-spring.xml文件。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration debug="false">
    <!--自定义logback配置文件-->

    <!--控制台日志-->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!--打印格式-->
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{100} - %msg%n</pattern>
        </encoder>
    </appender>

    <!--文件日志-->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!--按分钟输出日志文件-->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <FileNamePattern>C:\\Users\\Administrator\\Desktop\\TestWeb.log.%d{yyyy-MM-dd-HH-mm}.log</FileNamePattern>
        </rollingPolicy>
        <!--打印格式-->
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{100} - %msg%n</pattern>
        </encoder>
    </appender>


    <!-- 日志输出级别 TRACE < DEBUG < INFO < WARN < ERROR < FATA-->
    <root level="INFO">
        <!--加载配置项-->
        <appender-ref ref="STDOUT" />
        <appender-ref ref="FILE"/>
    </root>
</configuration>
```

## 使用日志

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("test")
public class testController {
    //创建日志类
    private static final Logger logger = LoggerFactory.getLogger(testController.class);

    @RequestMapping("/demo1")
    public String test(){
        System.out.println("测试成功");
        //输出日志
        logger.info("这是在方法里边");
        return "Test is success !!!";
    }
}
```

