---
title: Java面试错题本
date: 2022-04-25
sidebar: 'auto'
categories: 
 - 面试
tags:
 - Java
---

[toc]

### 1.  | 和 || ， & 和 && 的区别？

| ：按位或   
& ：按位与

```
按位运算符是将两边转换为二进制数字，然后再按位（不足位补零），一位一位的进行比较


按位与运算规则: 1&1=1，1&0=0，0&1=0，0&0=0
举例：
15二进制： （0000 1111）
127二进制： （1111 1111）
15&127就是（0000 1111）＝15(0000 1111)


按位或运算规则：1|1=1，1|0=1，0|1=1，0|0=0
举例：
128二进制： （0001 0000 0000）
127二进制： （0000 1111 1111）
128&127就是（0001 1111 1111） = 255

```


|| ：逻辑或 
&& ：逻辑与

```
逻辑运算符是针对两边的boolean值进行比较。

&&(逻辑与)：两边为ture时，整个运算结果才是ture。若左边为flase时，可以不计算右边，运算的结果为false。
&&(逻辑与)：两边为false时，整个运算结果才是false。若左边为true时，可以不计算右边，运算的结果为true。
```

### 2. a++ 和 ++a 的区别？

1. a++ 先使用变量a,之后再让a的值+1。
2. ++a 先让a的值+1，之后再使用变量a。

```java
//举例1 
public class Test{ 
    private static int i=1;
    public int getNext(){ 
         return i++;
    } 
    public static void main(String [] args){ 
        Test test=new Test(); 
        Test testObject=new Test(); 
        test.getNext(); 
        testObject.getNext(); 
        System.out.println(testObject.getNext()); 
    } 
}

//运行结果：3
//分析：return i++ 是先把i的值返回，然后让i的值+1

```
```java
//举例2
int a = 1;
System.out.println(--a+1);
System.out.println(a+++1);
//运行结果：1 1
//分析: --a+1 是先把a的值-1，然后a的值+1。最后得到的值+1
//      a+++1 是先使用变量a，将a的值+1。之后直接返回

```

### 3. try catch finally 中 return 的执行顺序

```java
public class Test {
    public static void main(String[] args) {
        System.out.println(test());
    }
    private static int test() {
        int temp = 1;
        try {
            System.out.println(temp);
            return ++temp;
        } catch (Exception e) {
            System.out.println(temp);
            return ++temp;
        } finally {
            ++temp;
            System.out.println(temp);
        }
    }
}

//运行结果：1 3 2
//分析
执行顺序为：
输出try里面的初始temp：1；
++temp之后，temp=2；
保存return里面temp的值：2；
执行finally的语句temp：3，输出temp：3；
返回try中的return语句，返回存在里面的temp的值：2；
输出temp：2。
```

知识点：
1. 若try代码块内含有return，同时存在finally代码块（代码块内无return值）时，先保存return结果，然后执行finally，最后返回return结果。
2. 若try代码块内含有return，同时存在finally代码块且代码块内含有return值时，此时finally代码块内的return值将覆盖掉try代码块中的return值，然后返回覆盖后的return结果。


### 4 try块后必须有catch块？

try的形式有三种：
try-catch
try-finally
try-catch-finally
但catch和finally语句不能同时省略。


### 5. 表达式中 字符串与+号的优先级

```java
public static void main(String[] args) {
    String a = "7";
    int b = 1;
    int c = 2;
    System.out.println(a+b+c);  //由于a是字符串类型，则后面的b,c会转换为字符串类型
    System.out.println(b+c+a);  //从左到右，先计算出b+c的值，再与a连接输出
    System.out.println((b+c)+a); //先计算出括号的值，在从左到右进行计算
}
//运行结果：
712
37
37
```
知识点：
1. 当字符串类型与其他类型通过 + 号连接时，java会将其他类型数据转换为字符串类型，然后将其连接输出。





### 6. 在基本JAVA类型中，如果不明确指定，整数型的默认是什么类型？带小数的默认是什么类型？

整数类型 默认为 int
带小数的默认为 double

### 8. is-a , has-a ,like-a ，uses-a 分别指什么意思？

is-a，是一个，代表继承关系。 如果A is-a B，那么B就是A的父类。
like-a，像一个，代表接口关系。 如果A like a B，那么B就是A的接口。
has-a，有一个，代表组合关系。 如果A has a B，那么B就是A的组成部分。
uses-a, 用一个，A uses a B 代表A类方法中的参数包含了B类。

### 9. 关于equals和==和hashCode的描述？

1. `==` : 对于基本数据类型，判断值是否相等。对于引用类型，判断两个对象的地址是否相等。
2. `equal` : 主要判断两个对象的地址是否相等。但一般有两种使用情况
    1. 若类没有重写equals()方法,则相当于通过`==`比较。对于对象，则判断地址是否相等
    2. 若类重写了equals()方法。则一般通过equals()方法中的代码来比较两个对象的内容是否相等，相等则返回true。

对象的hashcode值是对地址进行hash算法加密得到的。因此
①对象相等 -》 地址相同 -》 hashcode相等
②对象不相等 -》 地址不相同-》 hashcode可能相等，因为不同的地址经过hash算法后，得到的值有相同的可能性。


### 10 考察System.out.println

```java
public class Test {
    public static void main(String args[]) {
        int i = 7;
        do {
            System.out.println(--i);
            --i;
        } while (i != 0);
            System.out.println(i);
    }
}

// 以下代码的循环次数是?
答案：无限次
```

### 11. 考察instanceof

```java
对于以下代码段，4个输出语句中输出true的个数是(    ) ?
class A{}
class B extends A{}
class C extends A{}
class D extends B{}
A obj = new D();
System.out.println(obj instanceof B);
System.out.println(obj instanceof C);
System.out.println(obj instanceof D);
System.out.println(obj instanceof A);

答案：3
```

```
    A
|        |
B     C
|
D
D属于B,D属于A,D属于D,D不属于C
所以选C

知识点：instanceof是判断前者是否可以类型可以转化为后者,可以转化即为true,分为向上转型和向下转型B D都是A的子类向下转型 
```

### 12. synchronized关键字和volatile关键字的说法？

1. volatile关键字是synchronized的轻量级实现，所以volatile性能肯定比synchronized关键字要好。
2. volatile关键字只能用于变量而synchronized关键字只可以修饰对象，方法以及代码块。
3. 多线程访问volatile关键字不会发生阻塞，而synchronized关键字可能会发生阻塞
4. volatile关键字能保证数据的可见性，但不能保证数据的原子性。synchronized关键字两者都能保证。
5. volatile关键字主要用于解决变量在多个线程之间的可见性，而 synchronized关键字解决的是多个线程之间访问资源的同步性。


### 13. 如果一个接口Cow有个public方法drink()，有个类Calf实现接口Cow，则在类Calf中正确的是？  ( )

答案：public void drink() { …}

解析：子类重写父类方法时，方法的访问权限不能小于原访问权限，在接口中，方法的默认权限就是public，所以子类重写后只能是public


### 14 final、finally、finalize三个关键字的区别是（） ？

final：可用来定义变量、方法传入的参数、类、方法。
finally：只能跟在try/catch语句中，并且附带一个语句块，表示最后执行。
finalize：是垃圾回收器操作的运行机制中的一部分，进行垃圾回收器操作时会调用finalize方法，因为finalize方法是object的方法，所以每个类都有这个方法并且可以重写这个方法，在这个方法里实现释放系统资源及其他清理工作，JVM不保证此方法总被调用。


### 15 将下面进行对象序列化为文件，并在另外一个JVM中读取文件，进行反序列化，请问此时读出的Data0bject对象中的word和i的值分别为？

```java
public class DataObject implements Serializable{
    private static int i=0;
    private String word=" ";
    public void setWord(String word){
        this.word=word;
    }
    public void setI(int i){
        Data0bject.i=i;
     }
}

创建一个如下方式的DataObject:
DataObject object=new Data0bject ( );
object.setWord("123");
object.setI(2);


答案：
"123", 0

```

知识点：
1. java序列化只针对对象进行序列化，不会针对类，类变量。
2. java在序列化时不会实例化static变量和transient修饰的变量，因为static代表类的成员，transient代表对象的临时数据，被声明这两种类型的数据成员不能被序列化。


### 16 以下代码执行的结果显示是多少（）？

```java
public static void main(String[] args) {
    int count =0;
    int num =0;
    for(int i=0;i<=100;i++){
        num = num + i;
        count = count++;
    }
    System.out.println("(num * count) = "+(num * count));
}

运行结果：
(num * count) = 0

```

知识点：
1. count = count++; 原理是 temp = count； count = count+1； count = temp；因此count始终是0。

