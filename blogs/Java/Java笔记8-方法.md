---
title: Java笔记8-方法
date: 2023-06-16
sidebar: 'auto'
categories: 
 - Java
---

[toc]

# Java笔记8-方法

方法又名函数，是语句的集合，是实现一种功能而组成的代码组合。方法创建于类中，可以在其他地方被引用。

## 方法定义

```java
//语法
修饰符 返回值类型 方法名(参数类型 参数名){
    ...
    方法体
    ...
    return 返回值;
}

/*
1. 修饰符：定义了该方法的访问类型。
2. 返回值类型 ：方法中返回值的数据类型。若无返回值可以写成void
3. 方法名：方法的名称
4. 参数类型：当方法被调用时，传递值给参数。这个值被称为实参或变量。参数是可选的，方法可以不包含任何参数。
5. 方法体：方法体包含具体的语句代码。
*/

public static int max(int num1, int num2) {
   int result;
   if (num1 > num2)
      result = num1;
   else
      result = num2;
   return result; //返回值
}
```

## 方法调用

1. 当方法有返回值的时候，方法调用通常被当做一个值。例如：
int larger = max(30, 40);
2. 如果方法返回值类型是void（无返回值）,方法调用一定是一条语句。例如：
System.out.println("欢迎访问！");

## 方法的重载

1. 创建两个有相同名字但参数不同的方法，这叫做方法重载。

```java
//下面的两个max方法有相同名字但参数不同：
public static int max(int num1, int num2) {
   int result;
   if (num1 > num2)
      result = num1;
   else
      result = num2;
   return result; //返回值
}
public static double max(double num1, double num2) {
  if (num1 > num2)
    return num1;
  else
    return num2;
}
```

## 构造方法

构造方法是类的一种特殊方法，用来初始化类的一个新的对象，在创建对象（new 运算符）之后自动调用。Java 中的每个类都有一个默认的构造方法，并且可以有一个以上的构造方法。

Java 构造方法有以下特点：
* 方法名必须与类名相同
* 构造方法可以有 0 个、1 个或多个参数
* 没有任何返回值，包括 void。默认返回类型就是对象类型本身
* 只能与 new 运算符结合使用

注意：
1. 构造方法不能被 static、final、synchronized、abstract 和 native（类似于 abstract）修饰。
2. 构造方法用于初始化一个新对象，所以用 static 修饰没有意义。
3. 构造方法不能被子类继承，所以用 final 和 abstract 修饰没有意义。
4. 多个线程不会同时创建内存地址相同的同一个对象，所以用 synchronized 修饰没有必要。
5. 所有的类都有构造方法，因为Java默认自动提供了一个默认的无参构造方法.
6. 类为 public，构造函数也为 public；类改为 private，构造函数也改为 private
7. 一旦你定义了自己的构造方法，默认的无参构造方法就会失效。但是你可以自己将无参构造方法写在类中。
8. 构造方法不能被子类重写。

例子
```java
public class Worker {
    public String name;    // 姓名
    private int age;    // 年龄
    // 定义带有一个参数的构造方法
    public Worker(String name) {
        this.name = name;
    }
    // 定义带有两个参数的构造方法
    public Worker(String name,int age) {
        this.name = name;
        this.age = age;
    }
    public String toString() {
        return "大家好！我是新来的员工，我叫"+name+"，今年"+age+"岁。";
    }
}
//---------------------------------------------------
public class TestWorker {
    public static void main(String[] args) {
        System.out.println("-----------带有一个参数的构造方法-----------");
        // 调用带有一个参数的构造方法
        Worker worker1 = new Worker("张强");
        System.out.println(worker1);
        System.out.println("-----------带有两个参数的构造方法------------");
        // 调用带有两个参数的构造方法
        Worker worker2 = new Worker("李丽",25);
        System.out.println(worker2);
    }
}
```

运行 TestWorker 类，输出的结果如下：
```
-----------带有一个参数的构造方法-----------
大家好！我是新来的员工，我叫张强，今年0岁。
-----------带有两个参数的构造方法------------
大家好！我是新来的员工，我叫李丽，今年25岁。
```

## 方法的可变参数

在具体实际开发过程中，有时方法中参数的个数是不确定的。为了解决这个问题，在 J2SE 5.0 版本中引入了可变参数的概念。

声明可变参数的语法格式如下：

```
methodName({paramList},paramType…paramName)
```

* methodName 表示方法名称；
* paramList 表示方法的固定参数列表；
* paramType 表示可变参数的类型；
* … 是声明可变参数的标识；
* paramName 表示可变参数名称。

<font color="red">注意：可变参数必须定义在参数列表的最后。</font>

例子：
```java
public class StudentTestMethod {
    // 定义输出考试学生的人数及姓名的方法
    public void print(String...names) {
        int count = names.length;    // 获取总个数
        System.out.println("本次参加考试的有"+count+"人，名单如下：");
        for(int i = 0;i < names.length;i++) {
            System.out.println(names[i]);
        }
    }
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        StudentTestMethod student = new StudentTestMethod();
        student.print("张强","李成","王勇");    // 传入3个值
        student.print("马丽","陈玲");
    }
}
```

运行 StudentTestMethod 类，输出结果如下：
```
本次参加考试的有3人，名单如下：
张强
李成
王勇
本次参加考试的有2人，名单如下：
马丽
陈玲
```