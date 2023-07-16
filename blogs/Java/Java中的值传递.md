---
title: Java中的值传递
date: 2023-07-14
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Java
---

[toc]

# Java中的值传递

将参数传给方法的方式目前有两种：一种是值传递，一种是引用传递。

>值传递：
在方法被调用时，实参把它的内容拷贝副本传递给方法的形参。因此在方法内对形参的任何操作，都仅仅是对这个副本的操作，不影响实参的内容。

>引用传递：
”引用”也就是地址值，在方法调用时，实参的地址传递给相应的形参，在方法体内，若形参和实参始终指向同一个内存地址，则对形参的操作会影响的真实内容。

<font color="red">注意：java只有值传递。对于基本数据类型，就是传递数值。对于引用类型和数组类型，就是传递引用地址。</font>

## 值传递

```java
public class test1 {
    public static void aaa(int age, float weight) {
        System.out.println("传入的age：" + age);
        System.out.println("传入的weight：" + weight);
        age = 33;
        weight = 89.5f;
        System.out.println("方法内重新赋值后的age：" + age);
        System.out.println("方法内重新赋值后的weight：" + weight);

    }
    public static void main(String[] args) {
        int a = 25;
        float w = 77.5f;
        aaa(a, w);
        System.out.println("方法执行后的age：" + a);
        System.out.println("方法执行后的weight：" + w);
    }

}

传入的age：25
传入的weight：77.5
方法内重新赋值后的age：33
方法内重新赋值后的weight：89.5
方法执行后的age：25
方法执行后的weight：77.5
```
1. 从上面例子可以看到变量a,w经过方法后，本身的值并没有改变。因此值传递传递的是实参的一个副本，也就是形参怎么变化，不会影响实参对应的内容。
2. 变量age,weight是属于方法aaa的局部变量，当方法aaa执行结束后，这两个局部变量会被销毁。

## 引用传递

>例子1
```java
public class test1 {
    private String name;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public static void aaa(test1 person) {
        System.out.println("传入的name：" + person.getName());
        person.setName("我是小红");
        System.out.println("方法内重新赋值后的name：" + person.getName());
    }
    public static void main(String[] args) {
        test1 p = new test1();
        p.setName("我是小明");
        aaa(p);
        System.out.println("方法执行后的name：" + p.getName());
    }
}

传入的name：我是小明
方法内重新赋值后的name：我是小红
方法执行后的name：我是小红
```

1. 对象中的name值经过aaa方法的执行之后,内容发生了改变。

>例子2：在举例1中的aaa方法中增加一行代码
```java
public class test1 {
    private String name;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public static void aaa(test1 person) {
        System.out.println("传入的name：" + person.getName());
        person = new test1(); //加此行代码
        person.setName("我是小红");
        System.out.println("方法内重新赋值后的name：" + person.getName());
    }
    public static void main(String[] args) {
        test1 p = new test1();
        p.setName("我是小明");
        aaa(p);
        System.out.println("方法执行后的name：" + p.getName());
    }
}

运行结果：
传入的person的name：我是小明
方法内重新赋值后的name：我是小红
方法执行后的name：我是小明
```

1. 方法中加入`person = new test1();`此行代码后，运行结果与第一个例子不相同了。
2. 当程序运行到新增代码之前，此时实参p和形参person的地址是一样的。对形参person的操作会影响到实参p。但是当程序运行到新增代码之后。形参person的地址被改变，形参person指向了一个新对象，此时实参p和形参person的地址不相同，对形参person的操作不会影响到实参p。
3. 当aaa方法执行完之后，形参person会被销毁。

<font color="red">
根据引用传递的含义：引用传递中形参实参指向同一个对象，形参的操作会改变实参对象的改变。在上面新增代码处，形参person的地址被改变了，因此实参p的地址也应该被改变。但是实际上，实参p的地址却没有改变。这表明无论是基本类型和是引用类型，在实参传入形参时，都是值传递，也就是说传递的都是一个实参的副本，而不是实参本身。因此Java没有引用传递，只有值传递。
</font>

## 结论

在Java中不管基本类型还是引用类型，都是值传递。

1. 对于基本类型，实参传递给形参的是数值的拷贝。因此对形参的操作，不影响原始内容。同时由于实参在方法外，形参在方法内。方法一旦执行完形参就会销毁。
2. 对于引用类型和数组类型，传递的是地址。主要分两种情况
    1. 在方法执行的过程中，若形参和实参始终保持指向同一个地址，则通过形参操作目标数据会影响到实参地址指向的目标数据。因为形参和实参都是指向同一个目标地址的.
    2. 在方法执行的过程中，形参重新指向新的对象地址（如被赋值引用），则形参的操作不会影响实参。因为形参是实参的副本,形参中的地址改变不会影响到实参中的地址改变.



