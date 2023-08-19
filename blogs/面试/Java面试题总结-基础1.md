---
title: Java面试题总结-基础1
date: 2023-08-11
sidebar: 'auto'
categories: 
 - 面试
tags:
 - Java
---

[toc]

# Java面试题总结-基础1

## hashCode()与equals()
 
若两个对象相等，则hashcode一定也是相同的。

若两个对象有相同的hashcode值，它们也不一定是相等的。

## == 和 equals 的区别是什么

- 对于基本数据类型的变量， == 比较的是实际值。
- 对于引用类型的变量，==比较的是引用的地址。

<font color="red">一般情况下，equal都是比较地址。若类中重写了equal()的。equal()比较的是内容实际值。string类是重写了equal()方法，所以比较的是具体值。</font>

## 值传递和引用传递的区别

值传递：指的是在方法调用时，传递的参数是按值的拷贝传递，传递的是值的拷贝，也就是说传递后就互不相关了。 

引用传递：指的是在方法调用时，传递的参数是引用的地址，也就是变量所对应的内存空间的地址。也就是说传递前和传递后都指向同一个引用（也就是同一个内存空间）。

> Java 的值传递讲解一下?

Java总是采用按值传递。即方法形参是实参的拷贝。

例如：当一个实例对象作为一个参数被传递到方法中时，参数的值就是该实例对象的引用地址的拷贝。

在方法内，形参指向的对象属性值可以被改变。但是形参引用地址的改变是不会影响到实参的。因为方法结束后，形参就生命就结束了。


## +=有隐含的强制类型转换

short s1 = 1; s1 = s1 + 1; 会报错
* 由于 1 是 int 类型，因此 s1+1 运算结果也是 int型，需要强制转换类型才能赋值给short 型。

short s1 = 1; s1 += 1; 不会报错
* short s1 = 1; s1 += 1;可以正确编译，因为 s1+= 1;相当于 s1 = (short)(s1 + 1);其中有隐含的强制类型转换

## String、StringBuffer、StringBuilder 有什么区别？

String
- 底层使用的是 private final char[] value 保存字符串。因此String对象是不可变的。
- 因为对象不可变，线程安全

StringBuffer
- 底层用char[] value 保存字符串。因此StringBuffer对象是可变的。
- 内部方法都通过synchronized关键字修饰。线程安全

StringBuilder
- 底层用char[] value 保存字符串。因此StringBuilder对象是可变的。
- 非线程安全。

速度比较： StirngBuilder > StringBuffer > String


## final finally finalize区别

final可以修饰类、变量、方法。
* final 类：表示该类不能被继承。
* final 方法：表示该方法不能被重写。
* final 变量：表示该变量是一个常量。若是基本类型变量，则无法被再次赋值。若是引用变量，则引用地址不可变，但值可变。

finally一般作用在try-catch代码块中，在处理异常的时候，通常我们将一定要执行的代码方法写到finally代码块中，表示不管是否出现异常，该代码块都会执行，一般用来存放一些关闭资源的代码。

finalize是Object类中的一个方法，一般由垃圾回收器调用finalize()方法，用于判断一个对象是否可回收。

## is-a , has-a ,like-a ，uses-a 分别指什么意思？

is-a，是一个，代表继承关系。 如果A is-a B，那么B就是A的父类。
like-a，像一个，代表接口关系。 如果A like a B，那么B就是A的接口。
has-a，有一个，代表组合关系。 如果A has a B，那么B就是A的组成部分。
uses-a, 用一个，A uses a B 代表A类方法中的参数包含了B类。


## 垃圾回收器讲解一下

当程序员创建某个对象时，GC(垃圾收集器)就开始监控这个对象的地址、大小以及使用情况。

当程序员可以手动执行System.gc()，就会主动通知GC开始运行，但是Java虚拟机并不保证GC马上执行垃圾回收。

## 用最有效率的方法算出 2 乘以 8 等於几

2 << 3。相当于2乘以2的3次方，就等于2乘以8。

## Overload 和 Override 的区别？

重写 Overriding是父类与子类之间多态性的一种表现。如果在子类中定义某方法与其父类有相同的名称和参数，我们说该方法被重写 (Overriding)。子类的对象使用这个方法时，将调用子类中的定义，对它而言，父类中的定义如同被"屏蔽"了。

重载 Overloading 是一个类中多态性的一种表现。如果在一个类中定义了多个同名的方法，它们或有不同的参数个数或有不同的参数类型，则称为方法的重载(Overloading)。Overloaded 的方法是可以改变返回值的类型

## GC 是什么? 为什么要有 GC

GC 是垃圾收集的意思（Gabage Collection）,内存处理是编程人员容易出现问题的地方，忘记或者错误的内存回收会导致程序或系统的不稳定甚至崩溃，Java 提供的 GC 功能可以自动监测对象是否超过作用域从而达到自动回收内存的目的，Java 语言没有提供释放已分配内存的显示操作方法

## Java 中实现多态的机制是什么？

多态是指程序中定义的引用变量所指向的具体类型和通过该引用变量发出的方法调用在编译时不确定，在运行期间才确定，一个引用变量到底会指向哪个类的实例。这样就可以不用修改源程序，就可以让引用变量绑定到各种不同的类实现上。

Java 实现多态有三个必要条件：继承、重定、向上转型，在多态中需要将子类的引用赋值给父类对象，只有这样该引用才能够具备调用父类方法和子类的方法。

## 说说 Java 中 String 的了解

1）String 类是 final 型，固 String 类不能被继承，它的成员方法也都默认为 final 方法。String对象一旦创建就固定不变了，对 String 对象的任何改变都不影响到原对象，相关的任何改变操作都会生成新的 String 对象。

2）String 类是通过 char 数组来保存字符串的，String 对 equals 方法进行了重定，比较的是值相等。

```
String a = "test"; String b = "test"; String c = new String("test");
```

a、b 和字面上的 test 都是指向 JVM 字符串常量池中的"test"对象，他们指向同一个对象。而new 关键字一定会产生一个对象 test，该对象存储在堆中。所以 new String("test")产生了两个对象，保存在栈中的 c 和保存在堆中的 test。而在 java 中根本就不存在两个完全一模一样的字符串对象，故在堆中的 test 应该是引用字符串常量池中的 test。

```
String str1 = "abc"; //栈中开辟一块空间存放引用 str1，str1 指向池中 String 常量"abc" 

String str2 = "def"; //栈中开辟一块空间存放引用 str2，str2 指向池中 String 常量"def" 

String str3 = str1 + str2;//栈中开辟一块空间存放引用 str3
//str1+str2 通过 StringBuilder 的最后一步 toString()方法返回一个新的 String 对象"abcdef"
//会在堆中开辟一块空间存放此对象，引用str3指向堆中的(str1+str2)所返回的新String对象。

System.out.println(str3 == "abcdef");//返回 false 因为 str3 指向堆中的"abcdef"对象，而"abcdef"是字符池中的对象，所以结果为 false。JVM 对 String str="abc"对象放在常量池是在编译时做的，而 String str3=str1+str2 是在运行时才知道的，new 对象也是在运行时才做的。

```

## String 为什么要设计成不可变的？

1）字符串常量池需要 String 不可变。因为 String 设计成不可变，当创建一个 String 对象时，若此字符串值已经存在于常量池中，则不会创建一个新的对象，而是引用已经存在的对象。如果字符串变量允许必变，会导致各种逻辑错误，如改变一个对象会影响到另一个独立对象。

2）String 对象可以缓存 hashCode。字符串的不可变性保证了 hash 码的唯一性，因此可以缓存 String 的 hashCode，这样不用每次去重新计算哈希码。在进行字符串比较时，可以直接比较 hashCode，提高了比较性能；

3）安全性。String 被许多 java 类用来当作参数，如 url 地址，文件 path 路径，反射机制所需的 Strign 参数等，若 String 可变，将会引起各种安全隐患。

## Java 中的异常层次结构

- Throwable 类是异常层级中的基类。
- Error 类表示内部错误，这类错误使我们
无法控制的；
- Exception 表示异常，RuntimeException 及其子类属于未检查异常，这类异常包括 ArrayIndexOutOfBoundsException、NullPointerException 等，我们应该通过条件判断等方式语句避免未检查异常的发生。
- IOException 及其子类属于已检查异常，编译器会检查出来，若没有则会报错。对于未检查异常，我们无需捕获。