---
title: Java设计模式基础
date: 2018-04-12
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Java
---

[toc]

# Java设计模式基础

Java、C#、C++等编程语言，Eclipse、Visual Studio等开发工具，JSP、ASP.net等开发技术，Struts、Hibernate、JBPM等框架技术，都可以认为是招式；而数据结构、算法、设计模式、重构、软件工程等则为内功。
设计模式的一般定义如下：设计模式是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。
使用设计模式的目的：使用设计模式是为了可重用代码、让代码更容易被他人理解并且保证代码可靠性。

>学习设计模式的好处？
>让你知道，如何将代码分散在几个不同的类中？为什么要有“接口”？什么是对抽象编程？何时不应该使用继承？如果不修改源代码增加新功能？同时还让你能够更好地阅读和理解现有类库（如JDK）与其他系统中的源代码。

# 1.单例模式-Singleton Pattern---用于确保对象的唯一性

为了节约系统资源，有时系统中某个类只有唯一一个实例。当这个唯一实例创建成功之后，我们无法再创建一个同类型的其他对象，所有的操作都只能基于这个唯一实例。为了确保对象的唯一性，我们可以通过单例模式来实现。

>用单例模式实现某个类（单例类）：
>①：禁止类的外部直接使用new来创建对象，因此需要将类的构造函数的可见性改为private。
>②：在类的内部，创建唯一的类的实例对象。
>③：在类的内部编写方法，让外界能够访问这个唯一的类的实例对象。

**总结：1. 私有构造函数；2.私有静态类变量；3.公有静态成员方法，返回唯一实例。**

**设置static 可以保证直接通过类名调用变量和方法，而不需要通过创建对象来调用。**

```java
public class Singleton {
	private static Singleton singleton=null;   	//单例类的唯一的实例对象
	private Singleton() {} 						//禁止使用new创建实例对象
	//第一次调用getSingleton()方法时将创建唯一实例，再次调用时将返回第一次创建的实例，从而确保实例对象的唯一性。
	public static Singleton getSingleton() {
		if(singleton==null) {
			singleton = new Singleton();    	
		}
		return singleton;
	}
}
```

## 1.饿汉式写法：

```java
public class Singleton {  
    private static Singleton instance = new Singleton();  
    private Singleton (){}  
    public static Singleton getSingleton() {  
    return instance;  
    }  
}

```

当类被加载时，静态变量instance会被初始化，此时类的私有构造函数会被调用，单例类的唯一实例将被创建。


## 2.懒汉式写法（线程安全）：
懒汉式写法就是普通写法的方法上加上synchronized进行线程锁。

```java
public class Singleton {  
    private static Singleton instance=null;  
    private Singleton (){}  
    public static synchronized Singleton getSingleton() {  
        if (instance == null) {  
            instance = new Singleton();  
        }  
        return instance;  
    }  
}

```

## 3.静态内部类写法：

**饿汉式写法不管将来用不用始终占据内存；懒汉式写法线程安全控制烦琐，而且性能受影响。因此出现饿汉式写法与懒汉式写法合一的写法---静态内部类写法。**

在单例类中增加一个静态内部类，在该内部类中创建单例对象，并通过方法返回给外部使用。

```java
public class Singleton {  
    //静态内部类
    private static class SingletonHolder {  
        private static final Singleton instance = new Singleton();  
    }  
    private Singleton (){}  
    //方法中调用内部类
    public static final Singleton getInstance() {  
        return SingletonHolder.instance;  
    }  
}

```

# 2.简单工厂模式-Simple Factory Pattern

简单工厂模式：定义一个工厂类，它可以根据参数的不同返回不同类的实例，被创建的实例通常都具有共同的父类。

![1](../blog_img/JavaDesignPatterns_img_1.png)

>简单工厂模式的使用方法：
>①：编写一个产品类接口。
>②：编写多个继承产品类的具体产品类。
>③：编写工厂类，根据传入的参数不同，生产不同的产品。

```java
public interface Animal {
	public void say();
}

public class Cat implements Animal {
	@Override
	public void say() {
		System.out.println("喵喵");
	}
}

public class Dog implements Animal {
	@Override
	public void say() {
		System.out.println("旺旺");
	}
}

public class Factory {
	//创建工厂类，通过输入的参数不同，生产不同的类实例
	public static Animal getAnimal(String str) {
		Animal animal=null;
		if(str.equals("Cat")) {
			animal=new Cat();				//父类引用指向子类对象
		}else if(str.equals("Dog")) {
			animal=new Dog();
		}
		return animal;
	}
}

public class Test {
	public static void main(String[] args) {
		//根据传入的数据不同，创建不同的类实例
		Animal a=Factory.getAnimal("Cat");
		a.say();
		Animal b=Factory.getAnimal("Dog");
		b.say();
	}
}

```

# 3.工厂方法模式-Factory Method Pattern

简单工厂模式的缺点：系统扩展不灵活，工厂类过于庞大。当系统中需要引入新产品时，由于通过所传入参数的不同来创建不同的产品，这必定要修改工厂类的源代码，这违反了“开闭原则”。如何实现增加新产品而不影响已有代码？工厂方法模式应运而生。

<font color="red">工厂方法模式不再提供一个统一的工厂类来创建所有的产品对象，而是提供一个抽象工厂接口，由其实现类来具体实现不同的工厂方法。与简单工厂模式相比，最重要的区别是引入了抽象工厂，抽象工厂可以是接口，也可以是抽象类或者具体类，</font>

<font color="blue">工厂方法模式：有四个类，抽象工厂类，抽象工厂实现类，抽象产品类，抽象产品实现类。不再是由一个工厂类去实例化所有的具体产品，而是由不同的抽象工厂实现类去实例化不同的具体产品。</font>

![2](../blog_img/JavaDesignPatterns_img_2.png)

```java
//抽象产品类
public interface Animal {
	public void say();
}
//抽象工厂类
public interface Factory {
	public Animal createAnimal();
}
//具体产品类
public class Cat implements Animal {
	@Override
	public void say() {
		System.out.println("喵喵");
	}
}
//具体产品类
public class Dog implements Animal {
	@Override
	public void say() {
		System.out.println("旺旺");
	}
}
//具体工厂类
public class CatFactory implements Factory{
	//实现抽象工厂类，生产某个具体的产品
	@Override
	public Animal createAnimal() {
		return new Cat();
	}
}
//具体工厂类
public class DogFactory implements Factory{
	//实现抽象工厂类，生产某个具体的产品
	@Override
	public Animal createAnimal() {
		return new Dog();
	}
}
//test
public class Test {
	public static void main(String[] args) {
		//创建具体产品的工厂类
		Factory cf=new CatFactory();
		//通过该类创建某个具体的产品，并用父类引用指向子类对象
		Animal a=cf.createAnimal();
		a.say();
		
		Factory df=new DogFactory();
		Animal b=df.createAnimal();
		b.say();
	}
}
```

>总结：
> 1.优点：在系统中加入新产品时，无须修改抽象工厂和抽象产品提供的接口，无须修改其他的具体工厂和具体产品，而只要添加一个具体工厂和具体产品就可以了。系统的可扩展性也就变得非常好，完全符合“开闭原则”。
> 2.缺点：在添加新产品时，需要编写新的具体产品类，和与之对应的具体工厂类，系统中类的个数将成对增加。


# 4.抽象工厂模式-Abstract Factory Pattern

抽象工厂模式为创建一组对象提供了一种解决方案。**与工厂方法模式相比，抽象工厂模式中的具体工厂不只是创建一种产品，它负责创建一系列产品。** 每一个具体工厂都提供了多个方法用于产生多种不同类型的产品。

![3](../blog_img/JavaDesignPatterns_img_3.png)

```java
//抽象动物类
public interface Animal {
	public void say();
}
//具体动物类
public class Cat implements Animal {
	@Override
	public void say() {
		System.out.println("喵喵");
	}
}
//具体动物类
public class Dog implements Animal {
	@Override
	public void say() {
		System.out.println("旺旺");
	}
}
//抽象工厂类
public interface Factory {
	public Animal createCat();
	public Animal createDog();
}
//具体工厂类
public class concentrateFactory implements Factory {
	@Override
	public Animal createCat() {
		return new Cat();
	}
	@Override
	public Animal createDog() {
		return new Dog();
	}
}
//测试类
public class Test {
	public static void main(String[] args) {
		Factory factory=new concentrateFactory();
		Animal cat = factory.createCat();
		Animal dog = factory.createDog();
		cat.say();
		dog.say();
	}
}

```

>总结：
> 1.优点：增加新的产品很方便，无须修改已有系统结构。
> 2.缺点：增加新的产品类的方法麻烦，需要对原有系统进行较大的修改，甚至需要修改接口层代码。


# 5.原型模式（克隆模式,用于对象的克隆）-Prototype Pattern

原型模式：可以通过一个原型对象克隆出多个一模一样的对象。 创建克隆对象的工厂就是原型类自身。

<font color="red">

1.注意的是通过克隆方法所创建的对象是全新的对象，它们在内存中拥有新的地址。
2.注意的是被克隆的Java类必须实现一个标识接口Cloneable，表示这个Java类支持被复制。如果一个类没有实现这个接口但是调用了clone()方法，Java编译器将抛出一个CloneNotSupportedException异常。

</font>

> 原型模式分为浅克隆与深克隆方式。
>1. 浅克隆:若被复制对象是基本数据类型，则复制一份给克隆对象。若是引用数据类型，则把地址复制一份给克隆对象，使原型对象和克隆对象指向相同的内存地址。
>2. 深克隆:无论原型对象的成员变量是值类型还是引用类型，都将复制一份给克隆对象。除了原型对象本身被复制外，原型对象包含的所有成员变量也将复制。

![4](../blog_img/JavaDesignPatterns_img_4.png)
![5](../blog_img/JavaDesignPatterns_img_5.png)


①：浅克隆：

```java
public class Person implements Cloneable {
	private String name;
	private int age;
	
	//当clone()方法出现问题，会出现CloneNotSupportedException异常
	public Person Clone() throws CloneNotSupportedException{
		Object object=super.clone();
		return (Person)object;
	}
}
```

①：深克隆：
在Java语言中，如果需要实现深克隆，有两个方法。①：对原型对象附属引用类型也进行clone方法。 ②：可以通过序列化(Serialization)等方式来实现，即原型类以及附属的引用类型需要实现Serializable接口。

```java

//第一种方式
public class Person implements Cloneable {
	private String name;
	private int age;
	private Child child; 
	public Object DeepClone() throws CloneNotSupportedException{
		Object obj = super.clone();  //直接调用object对象的clone()方法！
        Person person = (Person) obj;
        person.child = (Child)this.child.clone(); //把属性类child也进行克隆
        return obj;
	}
	
}
class Child implements Cloneable{
	private String childname;
	public void brith() {
		System.out.println("小孩子的生日");
	}
	protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}


//第二种方式
public class Person implements Serializable {
	private String name;
	private int age;
	private Child child; 
	public Person DeepClone() throws IOException,ClassNotFoundException{
		/* 写入当前对象的二进制流 */ 
		ByteArrayOutputStream bos = new ByteArrayOutputStream(); 
		ObjectOutputStream oos = new ObjectOutputStream(bos); 
		oos.writeObject(this); 
		/* 读出二进制流产生的新对象 */ 
		ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray()); 
		ObjectInputStream ois = new ObjectInputStream(bis); 
		return (Person) ois.readObject(); 
	}
}

class Child implements Serializable{
	private String childname;
	public void brith() {
		System.out.println("小孩子需要过生日");
	}
}

```

# 6.建造者模式（用于复杂对象的组装与创建）-Builder Pattern

**建造者模式：将一个复杂对象的构建与它的表现分离，使得同样的构建过程可以创建不同的表现。**
建造者模式一步一步创建一个复杂的对象，它允许用户只通过指定复杂对象的类型和内容就可以构建它们，用户不需要知道内部的具体构建细节。

![6](../blog_img/JavaDesignPatterns_img_6.png)

>在建造者模式中存在以下4个角色：
>1. builder:类似于抽象工厂。为创建一个产品Product对象的各个部件指定抽象接口，一般声明两类方法，一是buildPartX()，它们用于创建复杂对象的各个部件；另一方法是getProduct()，它们用于返回复杂对象。
>2. ConcreteBuilder:类似于具体工厂。实现了Builder接口，实现各个方法，也可以提供一个方法返回创建好的复杂产品对象。
>3. Director:类似于工厂里的工程师。它负责安排复杂产品的建造次序。
>4. Product:是产品，包含多个组成部件。

```java
//Product，把房子当作产品
public class Product {
	private String basic;//地基
    private String wall;//墙
    private String roofed;//楼顶
	public String getBasic() {
		return basic;
	}
	public void setBasic(String basic) {
		this.basic = basic;
	}
	public String getWall() {
		return wall;
	}
	public void setWall(String wall) {
		this.wall = wall;
	}
	public String getRoofed() {
		return roofed;
	}
	public void setRoofed(String roofed) {
		this.roofed = roofed;
	}
	@Override
	public String toString() {
		return "Product [basic=" + basic + ", wall=" + wall + ", roofed=" + roofed + "]";
	}
}

//builder
public interface Build {
	public void build_basic();//建造地基
	public void build_wall();
	public void build_roofed();
	public Product getProduct(); //返回具体产品
}

//ConcreteBuilder
public class ConcreteBuilder implements Build {
	private Product p;

	@Override
	public void build_basic() {
		p.setBasic("建造地基");
	}

	@Override
	public void build_wall() {
		p.setWall("建造围墙");
	}

	@Override
	public void build_roofed() {
		p.setRoofed("建造屋顶");
	}

	@Override
	public Product getProduct() {
		return p;
	}
}

//Director
public class Director {
	private Build builder;
	public Product construct() {
		builder.build_basic();   //先建造地基
		builder.build_roofed();  //再建造屋顶
		builder.build_wall();	 //再建造围墙
		return builder.getProduct();
	}
}

```

>建造者模式优点缺点：
>1. 优点：可以更加精细地控制产品的创建过程。将复杂产品的创建步骤分解在不同的方法中。
>2. 缺点：①：建造者模式创建的产品一般有较多的共同点，如果产品之间的差异性很大，例如很多组成部分都不相同，不适合使用建造者模式。②：同样，如果产品的内部变化复杂会导致需要定义很多具体建造者类来实现这种变化，导致系统变得很庞大。


# 7.适配器模式（用于不兼容结构的协调）-Adapter Pattern

![7](../blog_img/JavaDesignPatterns_img_7.png)

适配器模式：在软件开发中，有时也存在类似这种不兼容的情况，我们也可以像引入一个电源适配器一样引入一个称之为适配器的角色来协调这些存在不兼容的结构。

适配器模式有三种：类适配器、对象适配器、接口适配器。在对象适配器中，适配器与适配者之间是关联关系；在类适配器中，适配器与适配者之间是继承（或实现）关系。

>在适配器中包含如下角色：
>1. Target（目标抽象类）：用来定义客户所需接口，可以是一个抽象类或接口，也可以是具体类。
>2. Adaptee（适配者类）：被适配的角色，它定义了一个需要被适配的接口，适配者类一般是一个具体类，包含了客户希望使用的业务方法。在某些情况下可能没有适配者类的源代码。
>3. Adapter（适配器类）：适配器可以作为一个转换器，对Adaptee和Target进行适配。在对象适配器中，它通过继承Target并关联一个Adaptee对象使二者产生联系。


## 1.类适配器

![9](../blog_img/JavaDesignPatterns_img_9.png)

```java
// 已存在的、具有特殊功能、但不符合我们既有的标准接口的类  
class Adaptee {  
    public void specificRequest() {  
        System.out.println("被适配类具有 特殊功能...");  
    }  
}  
// 目标接口，或称为标准接口  
interface Target {  
    public void request();  
}  
// 具体目标类，只提供普通功能  
class ConcreteTarget implements Target {  
    public void request() {  
        System.out.println("普通类 具有 普通功能...");  
    }  
}   
// 适配器类，继承了被适配类，同时实现标准接口  
class Adapter extends Adaptee implements Target{  
    public void request() {  
        super.specificRequest();  
    }  
}   
// 测试类  
public class Client {  
    public static void main(String[] args) {  
        // 使用普通功能类  
        Target concreteTarget = new ConcreteTarget();  
        concreteTarget.request();  
        // 使用特殊功能类，即适配类  
        Target adapter = new Adapter();  
        adapter.request();  
    }  
}  

```

>测试结果：
普通类 具有 普通功能...
被适配类具有 特殊功能... 

## 2.对象适配器

![8](../blog_img/JavaDesignPatterns_img_8.png)

```java

// 适配器类，直接关联被适配类，同时实现标准接口  
class Adapter implements Target{  
    // 直接关联被适配类  
    private Adaptee adaptee;  
    // 可以通过构造函数传入具体需要适配的被适配类对象  
    public Adapter (Adaptee adaptee) {  
        this.adaptee = adaptee;  
    }  
    public void request() {  
        // 这里是使用委托的方式完成特殊功能  
        this.adaptee.specificRequest();  
    }  
}  
// 测试类  
public class Client {  
    public static void main(String[] args) {  
        // 使用普通功能类  
        Target concreteTarget = new ConcreteTarget();  
        concreteTarget.request();  
        
		// 使用特殊功能类，即适配类，  
        // 需要先创建一个被适配类的对象作为参数  
        Target adapter = new Adapter(new Adaptee());  
        adapter.request();  
    }  
}  
```

>测试结果：
普通类 具有 普通功能...
被适配类具有 特殊功能... 


# 8.桥接模式-Bridge Pattern

[参考链接](http://www.jasongj.com/design_pattern/bridge/)

桥接模式：将可抽象部分与它的可实现部分分离，使它们都可以独立地变化。
![10](../blog_img/JavaDesignPatterns_img_10.png)

<h3>举例：</h3>

汽车可按品牌分（BMT，BenZ，LandRover），也可按手动档、自动档来分。如果对于每一种车都实现一个具体类，则一共要实现3*3=9个类。
![11](../blog_img/JavaDesignPatterns_img_11.png)

>当对这个继承结构图使用桥接模式重新设计后
![12](../blog_img/JavaDesignPatterns_img_12.png)

<font color="blue">图中把整个结构图分为品牌和驾驶方式两个部分，当增加车品牌时和增加车的驾驶方式时，方便后续的更新。</font>

```java
//车的品牌抽象类
public abstract class AbstractCar {
	protected Tranmisson tranmisson;  //方便子类继承该属性
	public Tranmisson getTranmisson() {
		return tranmisson;
	}
	public void setTranmisson(Tranmisson tranmisson) {
		this.tranmisson = tranmisson;
	}
	public abstract void run();
}
//
public class BenZCar extends AbstractCar {
	@Override
	public void run() {
		System.out.println("这是BenZCar");
	}
}
//
public class BMWCar extends AbstractCar {
	@Override
	public void run() {
		System.out.println("这是BMW 车");
	}
}
//.....
//车的驾驶方式抽象类
public abstract class Tranmisson {
	protected AbstractCar abstractCar;   //方便子类继承该属性

	public AbstractCar getAbstractCar() {
		return abstractCar;
	}
	public void setAbstractCar(AbstractCar abstractCar) {
		this.abstractCar = abstractCar;
	}
	public abstract void gear();
}
//
public class Manual extends Tranmisson {
	@Override
	public void gear() {
		System.out.println("这是手动档");
	}
}
//
public class Auto extends Tranmisson {
	@Override
	public void gear() {
		System.out.println("这是自动挡");
	}
}

//
public class Test {
	public static void main(String[] args) {
		AbstractCar benz=new BenZCar();
		AbstractCar bmw=new BMWCar();
		AbstractCar landr=new LandRoverCar();
		Tranmisson auto=new Auto();
		Tranmisson manual=new Manual();
		
		benz.setTranmisson(auto);   //设置奔驰车的驾驶方式为自动档
		benz.run();
		
		bmw.setTranmisson(manual); //设置宝马为手动档
		bmw.run();
	}
}
```

# 9.组合模式（用于树形结构的处理）-Composite Pattern

树形结构在软件中随处可见，例如操作系统中的目录结构、应用软件中的菜单、办公系统中的公司组织结构等等，组合模式为处理树形结构提供了一种较为完美的解决方案。
组合模式：组合多个对象形成树形结构以表示具有“整体—部分”关系的层次结构。

![13](../blog_img/JavaDesignPatterns_img_13.png)

>组合模式结构图中包含如下几个角色:
>1. Component：它可以是接口或抽象类，为叶子构件和容器构件公共父类或接口，在该角色中可以包含所有子类共有行为的声明和实现。如增加子构件、删除子构件、获取子构件等。
>2. Leaf：表示叶子节点对象，叶子节点没有子节点，它实现了Component中定义的行为。对于那些访问及管理子构件的方法，可以通过异常等方式进行处理。
>3. Composite（容器构件）：表示容器节点对象，它提供一个集合用于存储子节点，它实现了Component中定义的行为，包括那些访问及管理子构件的方法.

```java
//根节点
public interface Component {
	public  void add(Component c); //增加成员
	public  void remove(Component c); //删除成员
	public  Component getChild(int i); //获取成员
	public  void operation(); //业务方法
}
//容器节点
public class Composite implements Component{
	private ArrayList<Component> list = new ArrayList<Component>();  //容器中可以存在容器或叶子节点
	
	@Override
	public void add(Component c) {
		list.add(c);
	}
	@Override
	public void remove(Component c) {
		list.remove(c);
	}
	@Override
	public Component getChild(int i) {
		return (Component)list.get(i);
	}
	@Override
	public void operation() {
		for(Object obj:list) {
			((Component)obj).operation();
		}
	}
}
//叶子节点
public class Leaf implements Component {
	public void add(Component c) {
		System.out.println("增加节点");
	}
	public void remove(Component c) {
		System.out.println("移除节点");
	}
	public Component getChild(int i) {
		return null;
	}
	public void operation() {
		System.out.println("操作节点");
	}
}

```

>优点缺点：
>1. 优点：①在组合模式中增加新的容器构件和叶子构件都很方便，无须对现有类库进行任何修改，②通过叶子对象和容器对象的递归组合，可以形成复杂的树形结构，但对树形结构的控制却非常简单。
>2. 缺点：增加新构件时很难对容器中的构件类型进行限制。


# 10.装饰模式（用于扩展对象功能）-Decorator Pattern

装饰模式是处理如何让系统中的类可以进行扩展但是又不会导致类数目的急剧增加的问题。
装饰模式可以在不改变一个对象本身功能的基础上给对象增加额外的新行为。可以在不需要创造更多子类的情况下，将对象的功能加以扩展。

![14](../blog_img/JavaDesignPatterns_img_14.png)

>在装饰模式结构图中包含如下几个角色：
>1. Component（抽象构件）：它是具体构件和抽象装饰类的共同父类，声明了在具体构件中实现的业务方法。
>2. ConcreteComponent（具体构件）：用于定义具体的构件对象，实现了在抽象构件中声明的方法，装饰器可以给它增加额外的职责（方法）。
>3. Decorator（抽象装饰类）：用于给具体构件增加职责，但是具体方法在其子类中实现。它有一个指向父类的引用，通过该引用可以调用构件对象，并通过其子类扩展该方法，以达到装饰的目的。
>4. ConcreteDecorator（具体装饰类）：负责向构件添加新的装饰。每一个具体装饰类都定义了一些新的行为，它可以调用在父类中定义的方法，并可以增加新的方法用以扩充对象的行为。

<h3>举例：人类是可以跑的，但是不能飞。现在，给人类进行装饰，要人类会飞。</h3>

```java
//被装饰对象的抽象接口
public interface Human {
	public void run();
}

//具体的被装饰对象
public class Man implements Human {
	@Override
	public void run() {
		System.out.println("人会跑步");
	}
}

//抽象装饰类
public abstract class AbstractDecorator implements Human{
	//被装饰对象的引用 
	private Human human;
	//构造函数注入被装饰者
	public AbstractDecorator(Human human) {
		this.human = human;
	}
	//调用被装饰对象的方法
	@Override
	public void run() {
		human.run();
	}
}

//具体装饰类
public class ManDecorator extends AbstractDecorator {
	public ManDecorator(Human human) {
		//调用父类的构造方法
		super(human);
	}
	//装饰类增加的功能
	private void fly() {
		System.out.println("人可以飞");
	}
	//增强了功能的run方法
	@Override
	public void run() {
		super.run();
		fly();
	}
}

//测试
public class Test {
	public static void main(String[] args) {
		//创建被装饰的类
		Human human = new Man();
		
		//创建装饰的类，并添加被装饰类的引用
		Human superMan = new ManDecorator(human);
		
		//执行增强后的run方法
		superMan.run();
	}
}
```

---

# 11.外观模式-Facade Pattern

外观模式又称为门面模式，为子系统中的提供一个统一的入口。这个入口使得这一子系统更加容易使用。子系统类通常是一些业务类，实现了一些具体的、独立的业务功能。

![15](../blog_img/JavaDesignPatterns_img_15.png)

>外观模式包含如下两个角色：
>(1) Facade（外观角色）：其可以是普通类，也可以是接口。用户可以调用它的方法，在外观角色中可以知道子系统的功能和责任；在正常情况下，它将所有从客户端发来的请求委派到相应的子系统去，传递给相应的子系统对象处理。
>(2) SubSystem（子系统角色）：可以有一个或者多个子系统角色，每一个子系统可以不是一个单独的类，而是一个类的集合，它实现子系统的功能；每一个子系统都可以被客户端直接调用，或者被外观角色调用，它处理由外观类传过来的请求；子系统并不知道外观的存在，对于子系统而言，外观角色仅仅是另外一个客户端而已。

```java

//子系统A
class SubSystemA
{   
	public void MethodA(){
	//业务实现代码
	}
}
//子系统B
class SubSystemB
{   
	public void MethodB(){
	//业务实现代码
	}
}
//子系统C
class SubSystemC
{
	public void MethodC(){
	//业务实现代码
	}
}

//外观类
class Facade
{
	private SubSystemA obj1 = new SubSystemA();
	private SubSystemB obj2 = new SubSystemB();
	private SubSystemC obj3 = new SubSystemC();
	public void Method(){
	obj1.MethodA();
	obj2.MethodB();
	obj3.MethodC();
	}
}

//测试
class Program
{
	static void Main(string[] args){
		Facade facade = new Facade();
		facade.Method();
	}
}

```

>外观模式的优缺点：
>优点：实现了子系统与客户端之间的松耦合关系，一个子系统的修改对其他子系统没有任何影响，而且子系统内部变化也不会影响到外观对象。
>缺点：不能很好地限制客户端直接使用子系统类。如果设计不当，增加新的子系统可能需要修改外观类的源代码，违背了开闭原则。


# 12.享元模式（用于节约内存使用空间）-Flyweight Pattern

享元模式主要实现对同或者相似对象的共享访问，从而节约内存使用空间。

<h3>举例</h3>
一个文本字符串中存在很多重复的字符，若每个字符代表一个对象，将会出现大量的对象，从而浪费系统资源？而享元模式通过建立享元池来解决这个问题。

![16](../blog_img/JavaDesignPatterns_img_16.png)

>享元对象能做到共享的关键是区分了内部状态和外部状态.
>1. 内部状态：是存储在享元对象内部并且不会随环境改变而改变的状态，内部状态可以共享。例如字符内容。
>2. 外部状态：是随环境改变而改变的、不可以共享的状态。其通常由客户端保存，并在享元对象被创建之后，需要使用的时候再传入到享元对象内部。例如字符大小与颜色。

<font color="red">

享元模式的实现过程：
1. 将具有相同内部状态的对象存储在享元池中.
2. 需要的时候就将对象从享元池中取出，实现对象的复用。
3. 通过向取出的对象注入不同的外部状态，可以得到一系列相似的对象,而这些对象在内存中实际上只存储一份。

</font>

![17](../blog_img/JavaDesignPatterns_img_17.png)

>享元模式角色划分
FlyWeightFactory 享元工厂类，将各种类型的具体享元对象存储在一个享元池中
FlyWeight 享元接口或者（抽象享元类），声明了具体享元类公共的方法
ConcreteFlyWeight 具体享元类，其实例称为享元对象
UnSharedConcreteFlyWeight 非共享享元实现类

```java
//享元工厂
class FlyweightFactory {
	//定义一个HashMap用于存储享元对象，实现享元池
	private HashMap flyweights = new HashMap();
	
	public Flyweight getFlyweight(String key){
		//如果对象存在，则直接从享元池获取
		if(flyweights.containsKey(key)){
			return(Flyweight)flyweights.get(key);
		}else {
			//如果对象不存在，先创建一个新的对象添加到享元池中，然后返回

			Flyweight fw = new ConcreteFlyweight();
			flyweights.put(key,fw);
			return fw;
		}
	}
}

//
public interface FlyWeight {
  void operation(String externalState);
}

//
public class ConcreteFlyWeight implements FlyWeight {
		//内部状态intrinsicState作为成员变量，同一个享元对象其内部状态是一致的
		private String intrinsicState;
		
		public Flyweight(String intrinsicState) {
		this.intrinsicState=intrinsicState;
		}
		
		//外部状态extrinsicState在使用时由外部设置，不保存在享元对象中，即使是同一个对象，在每一次调用时也可以传入不同的外部状态
		public void operation(String extrinsicState) {
				....
		}
}

```

>享元模式的优缺点：
>优点：极大减少内存中对象的数量，使得相同或相似对象在内存中只保存一份。
>缺点：使得系统变得复杂，需要分离出内部状态和外部状态。


# 13.代理模式-Proxy Pattern

**代理模式：给某一个对象提供一个代理或占位符，并由代理对象来控制对原对象的访问。代理对象起到中介的作用，它可以为客户去掉一些服务或者增添额外的服务。**

![18](../blog_img/JavaDesignPatterns_img_18.png)

>代理模式角色划分
(1) Subject（抽象角色）：是代理角色和真实角色的父接口。
(2) Proxy（代理角色）：它包含了对真实角色的引用，
(3) RealSubject（真实角色）：它定义了代理角色所代表的真实对象，在真实角色中实现了真实的业务操作，客户可以通过代理角色间接调用真实角色。

```java
abstract class Subject
{
	public abstract void Request();
}
//
class RealSubject extends Subject
{
	public override void Request()
	{
		//业务方法具体实现代码
	}
}
//代理类
class Proxy extends Subject
{
		private RealSubject realSubject = new RealSubject(); //维持一个对真实主题对象的引用
		public void PreRequest(){    //代理类添加的多余方法
			…...
		}
		public override void Request(){
			PreRequest();
			realSubject.Request(); //调用真实对象的方法，执行目标对象的方法
			PostRequest();
		}
		public void PostRequest(){  //代理类添加的多余方法
			……
		}
}

//测试
public class Client {
	public static void main(String[] args) {
		Subject subject = new Proxy();  //父类引用指向子类对象
		subject.Request();      		//这个方法被代理进行修饰
	}
}
```

>代理模式的优缺点：
>优点：协调调用者和被调用者，在一定程度上降低了系统的耦合度。
>缺点：代理模式可能会造成请求的处理速度变慢。


# 14.命令模式（用于请求发送者与接收者解耦）-Command Pattern

命令模式：将请求发送者和接收者完全解耦，发送者与接收者之间没有直接引用关系，发送请求的对象只需要知道如何发送请求，而不必知道如何完成请求。

**发送者与接收者之间存在第三方（命令者），通过命令者来执行请求。**

![19](../blog_img/JavaDesignPatterns_img_19.png)

>在命令模式结构图中包含如下几个角色：
* Command（抽象命令类）：是一个抽象类或接口，声明了用于执行请求的execute()等方法.
* ConcreteCommand（具体命令类）：是抽象命令类的子类，实现了在抽象命令类中声明的方法，在实现execute()方法时，将调用接收者对象的相关操作(Action)。
* Invoker（调用者）：调用者即请求发送者，它通过命令对象来执行请求。在程序运行时可以将一个具体命令对象注入其中，再调用具体命令对象的execute()方法，从而实现间接调用请求接收者的相关操作。
* Receiver（接收者）：接收者执行与请求相关的操作，它具体实现对请求的业务处理。

```java
//抽象命令类
public interface Command {
	public void excute();
}
//具体命令类
public class ConcreteCommand implements Command {
	public Reciver r;
	
	public ConcreteCommand(Reciver r){   //把接受者用构造方法注入到类中
		this.r=r;
	}
	@Override
	public void excute() {
		System.out.println("具体命令，让接受者执行请求");
		r.run();      
	}
}
//调用者，发送请求者
public class Invoker {
	private Command command;
	//构造注入
	public Invoker(Command command) {
		this.command = command;
	}
	//设值注入
	public void setCommand(Command command) {
		this.command = command;
	}
	//业务方法，用于调用命令类的execute()方法
	public void call() {
		command.excute();
	}
}
//接受请求者
public class Reciver {
	public void run() {
		System.out.println("接受者执行请求");
	}
}
//测试
public class Test {
	public static void main(String[] args) {
		Reciver reciver=new Reciver();
		Command c=new ConcreteCommand(reciver);   //父类引用指向子类对象
		Invoker invoker=new Invoker(c);   //把命令类注入到发送者类中
		invoker.call();         		//发送者执行请求，实际是命令对象执行请求
	}
}

```

>运行结果：
具体命令，让接受者执行请求
接受者执行请求

>命令模式的优缺点：
>优点：新的命令可以很容易地加入到系统中，无须修改原有系统源代码。
>缺点：可能会导致某些系统有过多的具体命令类。

# 15.迭代器模式（用于遍历对象中的元素）-Iterator Pattern

迭代器模式：提供一种方法来访问对象，而不用暴露这个对象的内部方法表示，其别名为游标(Cursor)。

![20](../blog_img/JavaDesignPatterns_img_20.png)

>在迭代器模式结构图中包含如下几个角色：
* Iterator（抽象迭代器）：它定义了访问和遍历元素的接口，声明了用于遍历数据元素的方法。
* ConcreteIterator（具体迭代器）：它实现了抽象迭代器接口，在具体迭代器中通过游标来记录在聚合对象中所处的当前位置，游标通常是一个表示位置的非负整数。
* Aggregate（抽象聚合类）：它用于存储和管理元素对象，声明一个createIterator()方法用于创建一个迭代器对象，充当抽象迭代器工厂角色。
* ConcreteAggregate（具体聚合类）：它实现了createIterator()方法，该方法返回一个与该具体聚合类对应的具体迭代器ConcreteIterator实例。

```java

//抽象迭代器
interface Iterator {
	public void first(); //将游标指向第一个元素
	public void next(); //将游标指向下一个元素
	public boolean hasNext(); //判断是否存在下一个元素
	public Object currentItem(); //获取游标指向的当前元素
}
//抽象聚合类
interface Aggregate {
Iterator createIterator();
}
//具体聚合类
class ConcreteAggregate implements Aggregate {
	......
		public Iterator createIterator() {
			return new ConcreteIterator(this);
		}
	......
}

//具体迭代器
class ConcreteIterator implements Iterator {
	private ConcreteAggregate objects; //对具体聚合对象的引用，以便于访问存储在聚合对象中的数据
	private int cursor; //定义一个游标，用于记录当前访问位置
	//构造函数注入
	public ConcreteIterator(ConcreteAggregate objects) {
		this.objects=objects;
	}
	public void first() { ...... }
	public void next() { ...... }
	public boolean hasNext() { ...... }
	public Object currentItem() { ...... }
}

```

>迭代器模式的优缺点：
>优点：对同一个聚合对象上可以定义多种遍历方式，增加新的聚合类和迭代器类都很方便。
>缺点：增加新的聚合类需要对应增加新的迭代器类，类的个数成对增加。

---

# 16.观察者模式(用于对象间的联动)-Observer Pattern

<font color="blue">一个对象的状态或行为的变化将导致其他对象的状态或行为也发生改变，它们之间将产生联动。为了更好地描述对象之间的联动，观察者模式定义了对象之间一对多（包括一对一）的依赖关系，让一个对象的改变能够影响其他对象。</font>

<font color="red">观察者模式的定义：观察者模式定义了对象之间的一种一对多依赖关系，使得每当一个对象状态发生改变时，其相关依赖对象皆得到通知并被自动更新。</font>

![21](../blog_img/JavaDesignPatterns_img_21.png)

>在观察者模式结构图中包含如下几个角色：
* Subject（目标）:被观察的对象。它提供一系列方法来增加和删除观察者对象，同时它定义了通知方法notify()。
* ConcreteSubject（具体目标）：是目标类的子类，当它的状态发生改变时，向它的各个观察者发出通知；同时它还实现了在目标类中定义的抽象业务逻辑方法。
* Observer（观察者）：观察者将对观察目标的改变做出反应，观察者一般定义为接口，该接口声明了更新数据的方法update()，因此又称为抽象观察者。
* ConcreteObserver（具体观察者）：在具体观察者中有一个指向具体目标的引用，它实现了在抽象观察者Observer中定义的update()方法。通常在实现时，调用具体目标类的attach()方法将自己添加到目标类的集合中或通过detach()方法将自己从目标类的集合中删除。

```java
abstract class Subject {
	//定义一个观察者集合用于存储所有观察者对象
	protected ArrayList observers<Observer> = new ArrayList();
	//注册方法，用于向观察者集合中增加一个观察者
	public void attach(Observer observer) {
	observers.add(observer);
	}
	//注销方法，用于在观察者集合中删除一个观察者
	public void detach(Observer observer) {
	observers.remove(observer);
	}
	//声明抽象通知方法
	public abstract void notify();
}

class ConcreteSubject extends Subject {
	//实现通知方法
		public void notify() {
		//遍历观察者集合，调用每一个观察者的响应方法
			for(Object obs:observers) {
				((Observer)obs).update();
			}
		}
}

interface Observer {
	//声明响应方法
	public void update();
}

class ConcreteObserver implements Observer {
	//实现响应方法
	public void update() {
	//具体响应代码
	}
}

```

>观察者模式的优缺点：
>优点：观察者模式可以实现表示层和数据逻辑层的分离，增加新的具体观察者无须修改原有系统代码。
>缺点：如果一个观察目标对象有很多直接和间接观察者，将所有的观察者都通知到会花费很多时间。

# 16.策略模式（用于算法的封装与切换）-Strategy Pattern

策略模式： 定义一系列算法类，将每一个算法封装起来，并让它们可以相互替换。策略模式的主要目的是将算法的定义与使用分开。

![22](../blog_img/JavaDesignPatterns_img_22.png)

>在策略模式结构图中包含如下几个角色：
* Context（环境类）：是使用算法的角色，它在解决某个问题时可以采用多种策略。其有一个对抽象策略类的引用实例，用于定义所采用的策略。
* Strategy（抽象策略类）：它为所支持的算法声明了抽象方法，是所有策略类的父类。
* ConcreteStrategy（具体策略类）：它实现了在抽象策略类中声明的算法，在运行时，使用一种具体的算法实现某个业务处理。

```java
abstract class AbstractStrategy {
	public abstract void algorithm(); //声明抽象算法
}
class ConcreteStrategyA extends AbstractStrategy {
	//算法的具体实现
	public void algorithm() {
		//算法A
	}
}
//环境类
class Context {
	private AbstractStrategy strategy; //有一个对抽象策略类的引用
	//运用构造方法进行注入操作
	public void setStrategy(AbstractStrategy strategy) {
		this.strategy= strategy;
	}
	//调用策略类中的算法
	public void algorithm() {
		strategy.algorithm();
	}
}
//测试类
public class Test {
	public static void main(String[] args) {
		Context context = new Context();
		AbstractStrategy strategy;
		strategy = new ConcreteStrategyA(); //可在运行时指定类型
		context.setStrategy(strategy);
		context.algorithm();
	}
}

```

>策略模式的优缺点：
>优点：用户可以在不修改原有系统的基础上选择算法或行为，也可以灵活地增加新的算法或行为。使用策略模式可以避免多重条件选择语句。
>缺点：策略模式将造成系统产生很多具体策略类。


# 17.模板方法模式（用于提高代码的复用性）-Template Method Pattern

<h3>举例：</h3>

**对于 点单 -> 吃东西 -> 买单 这一流程来说**

在模板方法模式中，可以将相同的代码放在父类中，例如将方法“点单”以及“买单”的实现放在父类中，而对于方法“吃东西”，在父类中只做一个声明，将其具体实现放在不同的子类中，在一个子类中提供“吃面条”的实现，而另一个子类提供“吃饭”的实现。

![23](../blog_img/JavaDesignPatterns_img_23.png)

>模板方法模式包含如下两个角色：
* (1) AbstractClass（抽象类）：在抽象类中定义了一系列基本操作.每一个基本操作对应算法的一个步骤，在其子类中可以重定义或实现这些步骤。同时，在抽象类中实现了一个模板方法，用于定义一个算法的框架，模板方法不仅可以调用在抽象类中实现的基本方法，也可以调用在抽象类的子类中实现的基本方法，还可以调用其他对象中的方法。
* (2) ConcreteClass（具体子类）：它是抽象类的子类，用于实现在父类中声明的抽象基本操作以完成子类特定算法的步骤，也可以覆盖在父类中已经实现的具体基本操作。

```java

abstract class AbstractClass
{
	//模板方法,可以调用在抽象类中实现的基本方法
	public void TemplateMethod()
	{
		PrimitiveOperation1();
		PrimitiveOperation2();
		PrimitiveOperation3();
	}
	//基本方法—具体方法
	public void PrimitiveOperation1(){
		//实现代码
	}
	
	//基本方法—抽象方法
	public abstract void PrimitiveOperation2();
	
	//基本方法—钩子方法
	public virtual void PrimitiveOperation3(){ 
		//实现代码
	}
}

class ConcreteClass extends AbstractClass{
	public override void PrimitiveOperation2(){
	//实现代码
	}
	//对方法3的重写
	public override void PrimitiveOperation3(){
	//实现代码
	}
}

```

>模板方法模式的优缺点：
>优点：模板方法模式是一种代码复用技术，可实现一种反向控制结构，通过子类覆盖父类的钩子方法来决定某一特定步骤是否需要执行。
>缺点：如果父类中可变的基本方法太多，将会导致类的个数增加，系统更加庞大。此时，可结合桥接模式来进行设计。

# 18.状态模式（用于处理对象的多种状态及其相互转换）-State Pattern

在状态模式中，把对象在每一个状态下的行为和状态转移语句封装在一个个状态类中，通过这些状态类来分散冗长的条件转移语句，让系统具有更好的灵活性和可扩展性。用于解决系统中复杂对象的状态转换以及不同状态下行为的封装问题

![24](../blog_img/JavaDesignPatterns_img_24.png)

>在状态模式结构图中包含如下几个角色：
* Context（环境类）：它是拥有多种状态的对象。由于环境类的状态存在多样性且在不同状态下对象的行为有所不同，因此将状态独立出去形成单独的状态类。在环境类中维护一个抽象状态类State的实例，这个实例定义当前状态，在具体实现时，它是一个State子类的对象。
* State（抽象状态类）：它用于定义一个接口以封装与环境类的一个特定状态相关的行为。其中声明了各种不同状态对应的方法，而在其子类中实现类这些方法。
* ConcreteState（具体状态类）：它是抽象状态类的子类，每一个子类实现一个与环境类的一个状态相关的行为，每一个具体状态类对应环境的一个具体状态，不同的具体状态类其行为有所不同。

```java
abstract class State {
	//声明抽象业务方法，不同的具体状态类可以不同的实现
	public abstract void handle();
}
class ConcreteState extends State {
	public void handle() {
	//方法具体实现代码
	}
}
class Context {
	private State state; //维持一个对抽象状态对象的引用
	private int value; //其他属性值，该属性值的变化可能会导致对象状态发生变化
	//设置状态对象
	public void setState(State state) {
		this.state = state;
	}
	public void request() {
		//其他代码
		state.handle(); //调用状态对象的业务方法
		//其他代码
	}
}

```

>状态模式的优缺点：
>优点：状态模式可以让我们避免使用庞大的条件语句来将业务方法和状态转换代码交织在一起。
>缺点：状态模式的使用必然会增加系统中类和对象的个数，导致系统运行开销增大。

# 19.职责链模式（用于请求的链式处理）-Chain of Responsibility Pattern

职责链模式可以将请求的处理者组织成一条链，并让请求沿着链传递，由链上的处理者对请求进行相应的处理，客户端无须关心请求的处理细节以及请求的传递，只需将请求发送到链上即可，实现请求发送者和请求处理者解耦。

![25](../blog_img/JavaDesignPatterns_img_25.png)

>在职责链模式中包含如下几个角色：
* Handler（抽象处理者）：它定义了一个处理请求的接口，在其中定义了抽象请求处理方法。因为每一个处理者的下家还是一个处理者，因此在抽象处理者中定义了一个抽象处理者类型的对象（如结构图中的successor），作为其对下家的引用。通过该引用，处理者可以连成一条链。
* ConcreteHandler（具体处理者）：是抽象处理者的子类，实现了抽象处理者中定义的抽象请求处理方法，在处理请求之前需要进行判断，看是否有相应的处理权限，如果可以处理请求就处理它，否则将请求转发给后继者；在具体处理者中可以访问链中下一个对象，以便请求的转发。

```java
abstract class Handler {
	//对下一个处理者的引用
	protected Handler successor;
	//注入对象
	public void setSuccessor(Handler successor) {
		this.successor=successor;
	}
	//请求处理方法
	public abstract void handleRequest(String request);
}

class ConcreteHandler extends Handler {
	public void handleRequest(String request) {
		if (请求满足条件) {
			//具体处理请求
		}else {
			this.successor.handleRequest(request); //转发请求
		}
	}
}

```

>职责链模式的优缺点：
>优点：请求处理对象仅需维持一个指向其后继者的引用，而不需要维持它对所有的候选处理者的引用，可简化对象的相互连接。
>缺点：对于比较长的职责链，请求的处理可能涉及到多个处理对象。


# 20.中介者模式（用于协调多个对象之间的交互）-Mediator Pattern

中介者模式是来协调某些类或对象之间的复杂关系。以降低系统的耦合度。又称为调停者模式，它是一种对象行为型模式。

![26](../blog_img/JavaDesignPatterns_img_26.png)
![27](../blog_img/JavaDesignPatterns_img_27.png)

>如果在一个系统中对象之间存在多对多的相互关系，可以将对象之间的一些交互行为从各个对象中分离出来，并集中封装在一个中介者对象中，并由该中介者进行统一协调，这样对象之间多对多的复杂关系就转化为相对简单的一对多关系。通过引入中介者来简化对象之间的复杂交互。

![28](../blog_img/JavaDesignPatterns_img_28.png)

>在中介者模式结构图中包含如下几个角色：
* Mediator（抽象中介者）：它定义一个接口，该接口用于与各同事对象之间进行通信。
* ConcreteMediator（具体中介者）：通过协调各个同事对象来实现协作行为，它有对各个同事对象的引用。
* Colleague（抽象同事类）：它定义各个同事类公有的方法，并声明了一些抽象方法来供子类实现，同时它有一个对抽象中介者类的引用，其子类可以通过该引用来与中介者通信。
* ConcreteColleague（具体同事类）：它是抽象同事类的子类；每一个同事对象在需要和其他同事对象通信时，先与中介者通信，通过中介者来间接完成与其他同事类的通信；在具体同事类中实现了在抽象同事类中声明的抽象方法。

```java
abstract class Mediator {
	protected ArrayList<Colleague> colleagues; //用于存储同事对象
	//注册方法，用于增加同事对象
	public void register(Colleague colleague) {
		colleagues.add(colleague);
	}
	//声明抽象的业务方法
	public abstract void operation();
}
class ConcreteMediator extends Mediator {
	//实现业务方法，封装同事之间的调用
	public void operation() {
		//通过中介者调用同事类的方法
	}
}
abstract class Colleague {
	protected Mediator mediator; //维持一个抽象中介者的引用

	public abstract void method1(); //声明自身方法，处理自己的行为
	public Colleague(Mediator mediator) {
		this.mediator=mediator;
	}
	//定义依赖方法，与中介者进行通信
	public void method2() {
		mediator.operation();
	}
}
class ConcreteColleague extends Colleague {
	public ConcreteColleague(Mediator mediator) {
		super(mediator);
	}
	//实现自身方法
	public void method1() {
		......
	}
}
```

>中介者模式的优缺点：
>优点：简化了对象之间的交互，它用中介者和同事的一对多交互代替了原来同事之间的多对多交互。增加新的中介者和新的同事类都比较方便。
>缺点：在具体中介者类中包含了大量同事之间的交互细节，可能会导致具体中介者类非常复杂。

# 21.备忘录模式（用于撤销功能的实现）-Memento Pattern

备忘录模式可以使系统恢复到某一特定的历史状态。

<font color="blue">备忘录模式的定义：在不破坏封装的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，这样可以在以后将对象恢复到原先保存的状态。它是一种对象行为型模式，其别名为Token。</font>

![29](../blog_img/JavaDesignPatterns_img_29.png)

>备忘录模式结构图中包含如下几个角色：
* Originator（原发器）：一个普通类，一般将需要保存内部状态的类设计为原发器。
* Memento（备忘录)：存储原发器的内部状态，根据原发器来决定保存哪些内部状态。一般参考原发器的设计，根据实际需要确定备忘录类中的属性。==需要注意的是，除了原发器本身与负责人类之外，备忘录对象不能直接供其他类使用==。
* Caretaker（负责人）：负责人又称为管理者，==它负责保存备忘录，但是不能对备忘录的内容进行操作或检查==。在负责人类中可以存储一个或多个备忘录对象，它只负责存储对象，而不能修改对象，也无须知道对象的实现细节。

```java
public class Originator {
	private String state;
	public Originator(){}
	// 创建一个备忘录对象
	public Memento createMemento() {
		return new Memento(this);
	}
	// 根据备忘录对象恢复原发器状态
	public void restoreMemento(Memento m) {
		state = m.state;
	}
	public void setState(String state) {
		this.state=state;
	}
	public String getState() {
		return this.state;
	}
}

//除了Originator类，若允许其他类来调用备忘录类Memento的构造函数与相关方法，将导致在备忘录中保存的历史状态发生改变，
//通过撤销操作所恢复的状态就不再是真实的历史状态。
class Memento {
	private String state;
	public Memento(Originator o) {
		state = o.getState();
	}
	public void setState(String state) {
		this.state=state;
	}
	public String getState() {
		return this.state;
	}
}

//Caretaker类中不应该直接调用Memento中的状态改变方法，它的作用仅仅用于存储备忘录对象。
//将原发器备份生成的备忘录对象存储在其中，当用户需要对原发器进行恢复时再将存储在其中的备忘录对象取出。
public class Caretaker {
	private Memento memento;
	public Memento getMemento() {
		return memento;
	}
	public void setMemento(Memento memento) {
		this.memento=memento;
	}
}

```

>备忘录模式的优缺点：
>优点：它提供了一种状态恢复的实现机制，使得用户可以方便地回到一个特定的历史步骤。
>缺点：资源消耗过大，如果需要保存的原发器类的成员变量太多，就不可避免需要占用大量的存储空间，每保存一次对象的状态都需要消耗一定的系统资源。


# 22.访问者模式（用于操作复杂对象结构）-Visitor Pattern

访问者模式，它包含访问者和被访问元素两个主要组成部分。被访问的元素通常具有不同的类型，且不同的访问者可以对它们进行不同的访问操作。==例如处方单中的各种药品信息就是被访问的元素，而划价人员和药房工作人员就是访问者==。访问者模式使得用户可以在不修改现有系统的情况下扩展系统的功能，为这些不同类型的元素增加新的操作。

<font color="blue">使用访问者模式时，被访问元素通常不是单独存在的，它们存储在一个集合中，这个集合被称为“对象结构”，访问者通过遍历对象结构实现对其中存储的元素的逐个操作。</font>

![30](../blog_img/JavaDesignPatterns_img_30.png)

>访问者模式结构图中包含如下几个角色：
* Vistor（抽象访问者）：抽象访问者为对象结构中每一个具体元素类ConcreteElement声明一个访问操作，具体访问者需要实现这些操作方法，定义对这些元素的访问操作。
* ConcreteVisitor（具体访问者）：具体访问者实现了每个由抽象访问者声明的操作，每一个操作用于访问对象结构中一种类型的元素。
* Element（抽象元素）：它定义一个accept()方法，该方法通常以一个抽象访问者作为参数。
* ConcreteElement（具体元素）：具体元素实现了accept()方法，在accept()方法中调用访问者的访问方法以便完成对一个元素的操作。
* ObjectStructure（对象结构）：对象结构是一个元素的集合，它用于存放元素对象，并且提供了遍历其内部元素的方法。它可以结合组合模式来实现，也可以是一个简单的集合对象，如一个List对象或一个Set对象。

```java

abstract class Visitor{
	public abstract void visit(ConcreteElementA elementA);
	public abstract void visit(ConcreteElementB elementB);
	public void visit(ConcreteElementC elementC)
	{
		//元素ConcreteElementC操作代码
	}
}
class ConcreteVisitor extends Visitor{
	public void visit(ConcreteElementA elementA)
	{
		//元素ConcreteElementA操作代码
	}
	public void visit(ConcreteElementB elementB)
	{
		//元素ConcreteElementB操作代码
	}
}
interface Element{
	public void accept(Visitor visitor);
}
class ConcreteElementA implements Element
{
	public void accept(Visitor visitor)
	{
		visitor.visit(this);
	}
	public void operationA()
	{
		//业务方法
	}
}

```

>其具体执行过程如下：
(1) 调用具体元素类的accept(Visitor visitor)方法，并将Visitor子类对象作为其参数；
(2) 在具体元素类accept(Visitor visitor)方法内部调用传入的Visitor对象的visit()方法，如
visit(ConcreteElementA elementA)，将当前具体元素类对象(this)作为参数，如visitor.visit(this)；
(3) 执行Visitor对象的visit()方法，在其中还可以调用具体元素对象的业务方法。

>访问者模式的优缺点：
>优点：增加新的访问操作很方便。将有关元素对象的访问行为集中到一个访问者对象中，而不是分散在一个个的元素类中。
>缺点：在访问者模式中，每增加一个新的元素类都意味着要在抽象访问者角色中增加一个新的抽象操作。