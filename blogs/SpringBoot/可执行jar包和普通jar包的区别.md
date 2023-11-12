---
title: 可执行jar包和普通jar包的区别
date: 2023-11-12
sidebar: 'auto'
categories: 
 - 后端
tags:
 - SpringBoot
 - maven
---

# 可执行jar包和普通jar包的区别


通常情况下对Spring Boot项目执行 mvn package 命令，默认打包成的jar包叫做可执行jar包。

而对普通java项目执行mvn package命令，打包成的jar包是普通jar包。

> 可执行jar包和普通jar包的区别

1. 可执行jar包可以通过java -jar xxx.jar 命令执行。而普通jar包不可以通过java -jar xxx.jar 命令执行，普通jar包只能当作依赖包，被其他应用依赖。

2. 可执行jar包与普通jar包中的目录结构不同

可执行jar包中存放了需要依赖的jar包，解压打开后会有一个BOOT-INF目录，里面存放了这个jar包需要依赖的其他jar包。相当于所有的jar包都存放在一起。这也是可执行jar包能直接用java -jar命令执行的原因。

而普通jar包没有需要依赖的jar包，解压打开后只有源代码。

主要区别就是可执行jar包中会存放其他依赖jar包，而普通jar包没有存放。

> 如何打出可执行jar包

springboot项目能打出可执行jar包，主要是因为spring-boot-maven-plugin插件。

当在项目的pom文件中配置了spring-boot-maven-plugin插件。那么该项目就能打出可执行jar包。

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

> 如何一次打出可执行jar包和普通jar包

一般来说，SpringBoot项目直接打包成可执行jar包即可，不建议将打出普通的jar包被其他的项目所依赖。

给spring-boot-maven-plugin插件添加如下配置,就可以让SpringBoot项目同时打包出可执行jar包和普通jar包。

```xml
<build>
<plugins>
    <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
            <classifier>exec</classifier>
        </configuration>
    </plugin>
</plugins>
</build>
```

classifier表示可执行jar包的名字，配置了这个之后，在插件执行命令时，就不会给可执行jar包重命名。
