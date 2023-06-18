---
title: Java异常
date: 2020-06-10
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Java
---

[toc]

## java 异常和错误

![20220531152054.png](../blog_img/20220531152054.png)

1. Throwable 类是 Java 语言中所有错误或异常的顶层父类，其他异常类都继承于该类。Throwable类有两个子类，Error类（错误）和Exception类（异常），各自都包含大量子类。 
2. Error（错误）:是程序无法处理的错误，表示运行应用程序中较严重问题。大多数错误与代码编写者执行的操作无关。例如栈溢出等错误。这些错误是不可查的，因为它们在应用程序的控制和处理能力之外。
3. Exception（异常）:代表程序运行时发送的各种不期望发生的事件。可以被Java异常处理机制使用，是异常处理的核心。


#### 1. Exception（异常）

Exception（异常）主要分为非检查性异常和检查性异常两大类。

> 非检查性异常：包括RuntimeException及其子类和Error。
对于非检查性异常，Java不会强制要求为这样的异常做处理工作。这些异常发生的原因多半是由于我们的代码逻辑出现了问题。例如：空指针异常，数组越界异常等。需要主动去修改代码逻辑。

> 检查性异常: 除了Error 和 RuntimeException的其它异常
对于检查性异常，就是指编译器在编译期间要求必须得到处理的那些异常，否则编译不会通过。这些异常发生的原因主要是程序运行环境导致的。例如SQLException，IOException，ClassNotFoundException等。


#### 2. 异常处理机制

java通过抛出异常和处理异常的方式来对异常进行处理。

抛出异常：throw和throws
处理异常：try...catch...finally...

#### 3. 异常处理的五个关键字

> 1. try – 用于监听可能抛出异常的代码。当try语句块内的代码发生异常时，异常就会被捕获。

> 2. catch – 用来捕获try语句块中发生的异常。如果try中没有发生异常，则所有的catch块将被忽略。

> 3. finally – finally语句块总是会被执行。它主要用于做一些清理工作(如关闭数据库连接、网络连接和磁盘文件等)。当finally块执行完成之后，才会回来执行try或者catch块中的return。

> 4. throws :若某个方法内可能会发生异常。而方法内部又没有处理这些异常。则可以再方法声明上使用throws关键字。将方法内部的异常抛出给使用者去处理。

注意：方法的使用若不通过try catch代码块处理方法内抛出的异常。也可以通过throws继续向上抛出异常。

> 5. throw ：可以通过关键字throw手动抛出一个具体的异常对象。若再方法内使用，则方法要用throw关键字将该异常向上抛出。或者使用try catch代码块处理这个异常。

```java
public class bb {
    public static void main(String[] args){
        try {
            aa();                //捕获该方法的异常，并进行处理
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void aa () throws Exception {
        System.out.println("aa");
        throw new Exception();   //主动抛出一个异常，若不处理则需要再方法上通过throws关键字来抛出该异常
    }
}
```

```java
try{
   // 程序代码
}catch(异常类型1 异常的变量名1){
  // 程序代码
}catch(异常类型2 异常的变量名2){
  // 程序代码
}catch(异常类型2 异常的变量名2){
  // 程序代码
}

如果try中代码中发生异常，异常被抛给第一个 catch 块。 
如果抛出异常的数据类型与异常类型1匹配，它在这里就会被捕获。 
如果不匹配，它会被传递给第二个catch块。 如此，直到异常被捕获或者通过所有的 catch 块。
```


#### 4.自定义异常

通过自定义异常类型来向上报告某些错误信息。自定义异常类型可以选择继承 Throwable，Exception 或它们的子类。

```java
public class MyException extends Exception {
    public MyException() {
        super();
    }
    public MyException(String message) {
        super(message);
    }
}

//通常自定义的异常应该总是包含如下的构造函数：
//一个无参构造函数
//一个带有String参数的构造函数，并传递给父类的构造函数。

```

后续编写
