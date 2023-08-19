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

> 具体来说，多态分为编译时多态和运行时多态。
- 编译时多态主要是指方法的重载。即在同一个类中定义了多个同名但参数不同的方法，编译器根据调用方法时传递的参数类型来匹配具体要调用的方法。
- 运行时多态主要是指方法的重写。是指子类重写了父类的方法，当通过父类引用调用子类对象的方法时，会运行子类中重写的方法而不是父类中的方法。

> 多态的优点

- 可扩展性：通过多态，代码可以容易地扩展和修改，而不会影响现有的代码。通过继承子类并重写其父类的方法，开发者可以随意添加新的功能或修改现有的行为。
- 灵活性：多态使代码更具灵活性，因为它允许您在运行时动态地确定对象的类型和执行相应的方法。这意味着您可以编写更通用的代码，可以处理许多不同类型的对象，从而使代码更加灵活和可维护。
- 代码复用：多态提供了代码重用的机会。通过创建一个通用的父类来实现代码重用，并通过子类进行继承和重写，在不同的场景中使用相同的代码来处理不同的对象。
- 降低了耦合性：多态还有助于降低代码之间的耦合性。通过使用父类的引用来处理子类对象，您可以减少代码中的直接依赖关系，从而使代码更加松散耦合，更容易理解和维护。

> 实现多态的条件

Java 实现多态有 3 个必要条件：继承、重写和向上转型。只有满足这 3 个条件，开发人员才能够在同一个继承结构中使用统一的逻辑实现代码处理不同的对象，从而执行不同的行为。
* 继承：在多态中必须存在有继承关系的子类和父类。
* 重写：子类对父类中某些方法进行重新定义，在调用这些方法时就会调用子类的方法。
* 向上转型：在多态中需要将子类的引用赋给父类对象，只有这样该引用才既能可以调用父类的方法，又能调用子类的方法。

> 为什么多态是动态绑定的？

动态绑定是指在运行时根据对象的类型来调用不同的方法，它可以让程序更加灵活，可以根据不同的情况来选择不同的实现方式。

```java
Person p1 = new Student();  
```

父类引用指向子类对象。在编译期间，p1是Pserson类型的。但是在运行期间，p1变成了Student类型的。这就是动态绑定。

```java
//父类
class Person {
    public void mission() {	
        System.out.println("人要好好活着！");
    }
}
//子类
class Student extends Person {
    @Override
    public void mission() {	
        System.out.println("学生要好好学习！");
    }
}

//演示动态绑定
public class Test {
    public static void main(String[] args) {
        //程序在编译阶段只知道 p1 是 Person 类型
        //程序在运行的时候才知道堆中实际的对象是 Student 类型	
        Person p1 = new Student();  
            
        //程序在编译时 p1 被编译器看作 Person 类型
        //因此编译阶段只能调用 Person 类型中定义的方法
        //在编译阶段，p1 引用绑定的是 Person 类型中定义的 mission 方法（静态绑定）
        //程序在运行的时候，堆中的对象实际是一个 Student 类型，而 Student 类已经重写了 mission 方法
        //因此程序在运行阶段对象中绑定的方法是 Student 类中的 mission 方法（动态绑定）
        p1.mission();

    }
}
```


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

// 执行上述代码，输出结果如下：
// 长方形的面积：
// 81.0
// ===============================
// 三角形的面积：
// 24.0
// ===============================
// 父类中计算对象面积的方法，没有实际意义，需要在子类中重写。
// 0.0
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

abstract 关键字的注意事项如下：
1. 抽象类：包含抽象方法的类是抽象类，用abstract关键字修饰。
2. 抽象方法：没有方法体的方法，就是抽象方法，用abstract关键字修饰。
3. 抽象类不能被实例化。
4. 抽象类的子类，必须重写父类中的所有的抽象方法，否则编译无法通过，除非该子类也是抽象类。
5. 抽象类中的抽象方法必须为public或者protected（因为如果为private，则不能被子类继承，子类便无法实现该方法），缺省情况下默认为public。


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



抽象类是从多个类中抽象出来的模板，如果将这种抽象进行的更彻底，则可以提炼出一种更加特殊的“抽象类”——接口（Interface）。

接口是 Java 中最重要的概念之一，它可以被理解为一种特殊的类，不过接口是由全局常量和公共的抽象方法所组成。

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
1. 接口：若一个类中的方法全是抽象方法，则该类是接口,用interface关键字修饰。一般情况下不在接口中定义变量。
2. 接口中的变量会被隐式地指定为public static final 变量，即静态常量。所以接口中定义的变量必须初始化。
3. 接口中的方法会被隐式地指定为public abstract 方法
4. 接口支持多继承，即一个接口可以继承extends多个接口，一个类可以实现implements多个接口。
5. 接口没有构造方法，不能被实例化。

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

## 抽象类和接口的区别

抽象类：
1. 抽象类使用abstract关键字声明。一个类只能继承一个类。
1. 抽象类不能实例化。只能被继承。若子类不是抽象类，则子类需要实现抽象类中的抽象方法。
2. 抽象类有抽象方法和普通方法。可以是任意访问修饰符
3. 抽象类可以定义任何成员变量
4. 抽象类可以定义构造方法

接口：
1. 接口使用interface关键字声明。一个类可以实现多个接口。
1. 接口不能实例化。只能实现。若子类不是接口，则子类需要实现接口中的所有抽象方法。
2. 接口只有抽象方法，没有普通方法。并且只能是public或default访问修饰符。
3. 接口只能定义静态常量字段。即字段默认都是 static 和 final。
4. 接口不能定义构造方法


## 接口和抽象类在设计上的思路

抽象类是对事物的抽象。是对整个事物的整体进行抽象，包括事物本身的属性和行为。例如动物抽象类
接口是对某一种附加行为的抽象。例如，飞，游泳，遁地等附加行为。

```
举例：门都有open( )和close( )两个动作，如果我们需要设计一个门，其有报警alarm( )的功能，那么该如何实现？

方式1： 将这三个功能都放在抽象类里面，但是这样一来所有继承于这个抽象类的子类都具备了报警功能，但是有的门并不一定具备报警功能；

方式2：将这三个功能都放在接口里面，需要用到报警功能的类就需要实现这个接口中的open( )和close( )，也许这个类根本就不具备open( )和close( )这两个功能，比如火灾报警器。 

方式3：由于open( )和close( )是门的本身的功能，而报警alarm( )的功能是给门的附加功能。因此解决办法是单独将报警设计为一个接口，包含alarm()行为。Door设计为单独的一个抽象类，包含open和close两种行为。再设计一个报警门继承Door类和实现Alarm接口。
```

<font color="red">从上面的例子可以看出继承则是 "是不是"的关系，而接口实现则是 "有没有"的关系。</font>