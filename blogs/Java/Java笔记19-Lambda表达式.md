---
title: Java笔记19-Lambda表达式
date: 2023-06-16
sidebar: 'auto'
categories: 
 - Java
---

[toc]

# Java笔记19-Lambda表达式

Lambda表达式是JAVA8中提供的一种新的特性，是一个匿名函数方法。

Lambda表达式使用条件：只有函数式接口的匿名内部类才可以使用Lambda表达式来进行简化。

函数式接口: 函数式接口不同于普通接口，该接口中有且仅有一个抽象方法。

## 入门案例

Runable是一个接口，里面只有一个抽象方法是需要强制实现的，因此Runable接口就是一个函数式接口。
```java
public interface Runnable{
    void run();
}
```

用匿名内部类的方式创建线程：
```java
public class carDemo {
    public static void main(String[] args) {
        Thread t1=new Thread(new Runnable() {
            @Override         //这里重写Runnable接口里面的run()方法
            public void run() {
                System.out.println("匿名内部类方式-启动线程");
            }
        });
        t1.start();
    }
}
```

上面的例子用Lambda表达式的形式创建线程：
```java
public static void main(String[] args) {
    Thread t1=new Thread(() -> System.out.println("匿名内部类方式-启动线程"));
    t1.start();
}
```

## Lambda语法格式

Lambda表达式就是对函数式接口中抽象方法的实现，也是对匿名内部类的一个简写，只保留了方法的参数列表和方法体，其他的成分可以省略。因此，Lambda表达式的格式非常简洁，只有三部分组成：
* 参数列表
* 箭头
* 方法体

总结：(参数列表)->{方法体}
* 小括号内参数的参数类型可以省略。
* 小括号有且只有一个参数，则小括号可以直接省略。
* 如果大括号有且只有一个语句，无论是否有返回值。大括号、return关键字、分号可以省略。