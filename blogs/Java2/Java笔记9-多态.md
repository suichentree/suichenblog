---
title: Java笔记9-多态
date: 2023-06-16
sidebar: 'auto'
categories: 
 - Java
---

[toc]

# Java笔记9-多态

多态性是面向对象编程的又一个重要特征，它是指在父类中定义的属性和方法被子类继承之后，可以具有不同的数据类型或表现出不同的行为，这使得同一个属性或方法在父类及其各个子类中具有不同的含义。

对面向对象来说，多态分为编译时多态和运行时多态。其中编译时多态主要是指方法的重载。它是根据参数列表的不同来区分不同的方法，通过编译之后会变成两个不同的方法。而运行时多态主要是通过动态绑定来实现的，也就是大家通常所说的多态性。

Java 实现多态有 3 个必要条件：继承、重写和向上转型。只有满足这 3 个条件，开发人员才能够在同一个继承结构中使用统一的逻辑实现代码处理不同的对象，从而执行不同的行为。
* 继承：在多态中必须存在有继承关系的子类和父类。
* 重写：子类对父类中某些方法进行重新定义，在调用这些方法时就会调用子类的方法。
* 向上转型：在多态中需要将子类的引用赋给父类对象，只有这样该引用才既能可以调用父类的方法，又能调用子类的方法。


## 多态例子

下面通过一个例子来演示重写如何实现多态性。
```java
//创建 Figure 类
public class Figure {
    double dim1;
    double dim2;
    Figure(double d1, double d2) {
        // 有参的构造方法
        this.dim1 = d1;
        this.dim2 = d2;
    }
    double area() {
        // 用于计算对象的面积
        System.out.println("父类中计算对象面积的方法，没有实际意义，需要在子类中重写。");
        return 0;
    }
}

//--------------------------------

//创建继承自 Figure 类的 Rectangle 子类，
public class Rectangle extends Figure {
    Rectangle(double d1, double d2) {
        super(d1, d2);
    }

    double area() {
        System.out.println("长方形的面积：");
        return super.dim1 * super.dim2;
    }
}

//--------------------------------

//创建继承自 Figure 类的 Triangle 子类
public class Triangle extends Figure {
    Triangle(double d1, double d2) {
        super(d1, d2);
    }

    double area() {
        System.out.println("三角形的面积：");
        return super.dim1 * super.dim2 / 2;
    }
}

//--------------------------------

//创建 Test 测试类
public class Test {
    public static void main(String[] args) {
        Figure figure; // 声明Figure类的变量
        figure = new Rectangle(9, 9);
        System.out.println(figure.area());
        System.out.println("===============================");
        figure = new Triangle(6, 8);
        System.out.println(figure.area());
        System.out.println("===============================");
        figure = new Figure(10, 10);
        System.out.println(figure.area());
    }
}
```

执行上述代码，输出结果如下：
```
长方形的面积：
81.0
===============================
三角形的面积：
24.0
===============================
父类中计算对象面积的方法，没有实际意义，需要在子类中重写。
0.0
```

从上述代码可以发现，无论 figure 变量的对象是 Rectangle 还是 Triangle，它们都是 Figure 类的子类，因此可以向上转型为该类，从而实现多态。


## 抽象类

在面向对象的概念中，所有的对象都是通过类来描绘的，但是反过来，并不是所有的类都是用来描绘对象的，如果一个类中没有包含足够的信息来描绘一个具体的对象，那么这样的类称为抽象类。

抽象类的定义和使用规则如下：
* 抽象类和抽象方法都要使用 abstract 关键字声明。
* 如果一个方法被声明为抽象的，那么这个类也必须声明为抽象的。而一个抽象类中，可以有抽象方法和具体方法同时存在。
* 抽象类不能实例化，也就是不能使用 new 关键字创建对象。


在 Java 中抽象类的语法格式如下：
```java
<abstract> class <class_name> {
    <abstract> <type> <method_name>(parameter-iist);
}

//abstract 表示该类或该方法是抽象的
//class_name 表示抽象类的名称
//method_name 表示抽象方法名称
//parameter-list 表示参数列表
```

如果一个方法使用 abstract 来修饰，则说明该方法是抽象方法，抽象方法只有声明没有实现。需要注意的是 abstract 关键字只能用于普通方法，不能用于 static 方法或者构造方法中。

抽象方法的 3 个特征如下：
1. 抽象方法没有方法体
2. 抽象方法必须存在于抽象类中
3. 子类重写父类时，必须重写父类所有的抽象方法

注意：在使用 abstract 关键字修饰抽象方法时不能使用 private 修饰，因为抽象方法必须被子类重写，而如果使用了private 声明，则子类是无法重写的。

例子
```java
//定义抽象类
public abstract class Shape {
    public int width; // 几何图形的长
    public int height; // 几何图形的宽
    // 定义抽象方法，计算面积
    public abstract double area(); 
}

//继承抽象类
public class Square extends Shape {
    // 重写父类中的抽象方法，实现计算正方形面积的功能
    @Override
    public double area() {
        return width * height;
    }
}

```


## 接口

抽象类是从多个类中抽象出来的模板，如果将这种抽象进行的更彻底，则可以提炼出一种更加特殊的“抽象类”——接口（Interface）。接口是 Java 中最重要的概念之一，它可以被理解为一种特殊的类，不同的是接口的成员没有执行体，是由全局常量和公共的抽象方法所组成。

### 定义接口

Java 接口的定义方式与类基本相同，不过接口定义使用的关键字是 interface，接口定义的语法格式如下：

```java
[public] interface interface_name {
    // 接口体，其中可以包含定义常量和声明方法
    [public] [static] [final] type constant_name = value;    // 定义常量
    [public] [abstract] returnType method_name(parameter_list);    // 声明方法
}

//public 表示接口的修饰符，当没有修饰符时，则使用默认的修饰符，此时该接口的访问权限仅局限于所属的包；
//interface_name 表示接口的名称。
//constant_name 表示变量名称
//returnType 表示方法的返回值类型
//parameter_list 表示参数列表，在接口中的方法是没有方法体的。
```

接口的特征如下：
* 具有 public 访问修饰符的接口，允许任何类使用；没有指定 public 的接口，其访问将局限于所属的包。
* 方法的声明不需要其他修饰符，在接口中声明的方法，将隐式地声明为公有的（public）和抽象的（abstract）。
* 在 Java 接口中声明的变量其实都是常量，接口中的变量声明，将隐式地声明为 public、static 和 final，即常量，所以接口中定义的变量必须初始化。
* 接口没有构造方法，不能被实例化。

```java
// 接口myInterface
public interface MyInterface {    
    int age = 20;    // 合法，等同于 public static final int age = 20;
    void getInfo();  // 方法声明，等同于 public abstract void getInfo();
}
```

### 实现接口

接口的主要用途就是被类实现，一个类可以实现一个或多个接口，实现则使用 implements 关键字。因为一个类可以实现多个接口，这也是 Java 为单继承灵活性不足所作的补充。

类实现接口的语法格式如下：
```java
<public> class <class_name> [extends superclass_name] [implements interface1_name[, interface2_name…]] {
    // 主体
}

// public：类的修饰符；
// superclass_name：需要继承的父类名称；
// interface1_name：要实现的接口名称。
```

实现接口需要注意以下几点：
* 实现接口与继承父类相似，一样可以获得所实现接口里定义的常量和方法。如果一个类需要实现多个接口，则多个接口之间以逗号分隔。
* 一个类可以继承一个父类，并同时实现多个接口，implements 部分必须放在 extends 部分之后。
* 一个类实现了一个或多个接口之后，这个类必须完全实现这些接口里所定义的全部抽象方法（也就是重写这些抽象方法）；否则该类将保留从父接口那里继承到的抽象方法，该类也必须定义成抽象类。

例子
```java
//创建一个名称为 IMath 的接口
public interface IMath {
    public int sum();    // 完成两个数的相加
    public int maxNum(int a,int b);    // 获取较大的数
}

//=======================

//定义一个 MathClass 类并实现 IMath 接口
public class MathClass implements IMath {
    private int num1;    
    private int num2;

    // 实现接口中的求和方法
    public int sum() {
        return num1 + num2;
    }
    // 实现接口中的获取较大数的方法
    public int maxNum(int a,int b) {
        if(a >= b) {
            return a;
        } else {
            return b;
        }
    }
}
```

在实现类中，所有的方法都使用了 public 访问修饰符声明。无论何时实现一个由接口定义的方法，它都必须实现为 public，因为接口中的所有成员都显式声明为 public。