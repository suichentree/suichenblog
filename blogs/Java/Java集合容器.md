---
title: Java集合容器
date: 2022-06-10
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Java
---

[toc]

## 1.集合

>集合：一些可以存储任意类型的对象，并且长度可变的类。

<font color="red">

集合按照存储结构分为单列集合与双列集合
1. 单列集合是按照线性列表的方式存储元素，其根接口是Collection.
2. 双列集合是按照键值对的方式存储元素，其根接口是Map.

</font>

![44](../blog_img/java_img_44.png)


### 1.单列集合根接口-Collection接口

>Collection接口是单列集合类的根接口，其有两个重要的子接口，List和Set.
>List的存储的元素有序，可重复.
>Set的特点是存储的元素无序，不可重复.

![43](../blog_img/java_img_43.png)

>Collection接口的常用方法：

<font color="red">Collection接口或其子接口的具体实现类也可以使用这些方法。</font>


方法 | 描述
------------ | -------------
boolean add(Object obj)  | 把元素obj加入到集合中
boolean addAll(Collection c)  | 把集合c的元素加入到集合中
void clear()  |  删除集合所有元素
Object remove(Object obj) | 删除集合的obj元素
Object removeAll(Collection c) | 删除集合c的所有元素
boolean isEmpty() | 判断集合是否为空
boolean contains(Object obj)  |  判断集合是否包含obj
Iterator iterator() | 返回该集合的迭代器，用来遍历该集合下的所有元素
int size()  |  获取该集合的元素个数


#### 1.List 接口

>List的存储的元素有序，可重复。List接口的主要实现类是 ArrayList,LinkedList.

List集合常用方法：
方法 | 描述
------------ | -------------
void add(int index,Object obj)  | 把元素obj加入到集合的index处
boolean addAll(int index,Collection c)  | 把集合c的元素加入到index处
Object get(int index) |  返回index处的元素
Object remove(int index) | 删除index处的元素
Object set(int index,Object obj) | 把index处的元素替换为obj对象，并把替换后的元素返回。
int indexOf(Object obj) | 返回obj对象在集合中的位置
int lastIndexOf(Object obj) | 返回obj对象在集合的最后一个的位置


##### 1.ArrayList集合---适合查找元素：

<font color="red">ArrayList是List接口的一个实现类。可以把其看成一个长度可变的数组对象。</font>

```java
ArrayList ar=new ArrayList();   //创建ArrayList集合
//向集合中添加元素
ar.add("xiaoming");
ar.add("xiaohua");
ar.add("xiaoqiang");
System.out.println("此时集合的长度 "+ar.size());
//索引从0开始
System.out.println("集合的第二个元素是："+ar.get(1));
```

##### 2.LinkedList集合---适合元素的增删改操作：

<font color="red">LinkedList是List接口的一个实现类。可以把其看成一个长度可变的双向循环链表。</font>

LinkedList集合中的方法
方法 | 描述
------------ | -------------
void add(int index,Object obj)  | 把元素obj加入到集合的index处
void addFirst(Object obj)  | 把obj元素插入到集合的开头
void addLast(Object obj)  | 把obj元素插入到集合的末尾
Object getFirst() |  返回集合开头的元素
Object getLast() |  返回集合末尾的元素
Object removeFirst() | 删除第一个元素，并把它返回
Object removeLast() | 删除最后一个元素，并把它返回

```java
LinkedList link=new LinkedList();   //创建linklist集合
link.add("xiao");
link.add("ming");
link.add("hua");
link.add("qiang");
//打印集合中的元素
System.out.println(link.toString());
```
>运行结果：[xiao, ming, hua, qiang]

#### 2.Set接口

>Set的特点是存储的元素无序,不可重复.Set接口的主要实现类是HashSet 和 TreeSet.
>1. HashSet是根据对象的哈希值来确定元素在集合的存储位置，有好的存取，查找性能。
>2. TreeSet是以二叉树的方式来存储元素,可以对集合的元素进行排序。


##### 1.HashSet集合
<font color="red">HashSet是Set接口的一个实现类。其根据对象的哈希值来确定元素在集合的存储位置，有好的存取，查找性能。允许包含值为null的元素，但最多只能一个</font>

![45](../blog_img/java_img_45.png)

>HashSet集合不出现重复元素。主要是hashCode(),equals()方法的原因。
>因此当HashSet集合存储对象类型的元素时，需要重写该对象的hashCode(),equals()方法。

```java
public class human {
	private String name;
	private int age;
	
	human(String name,int age){
		this.name=name;
		this.age=age;
	}
	//重写toString方法
	public String toString() {
		return name+": "+age;
	}
	//重写hashCode方法
	public int hashCode() {
		return name.hashCode();
	}
	//重写equals方法
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		human other = (human) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
	public static void main(String[] args) {
		HashSet hSet=new HashSet();
		hSet.add(new human("xiaoming",22));
		hSet.add(new human("xiaoqiang",23));
		hSet.add(new human("xiaohua",23));
		hSet.add(new human("xiaoqiang",23));
		hSet.add(new human("xiaoming",22));
		System.out.println(hSet);
	}
}
```

![46](../blog_img/java_img_46.png)


##### 2.TreeSet集合

<font color="red">TreeSet是以平衡的二叉排序树的方式来存储元素,可以对集合的元素进行排序。
存储的元素会按照从大小排序，并且去除重复元素。</font>

>TreeSet集合在插入元素时，通过调用compareTo()方法，对集合中的元素进行比较，从而进行排序。因此，当TreeSet集合存储对象类型数据时，需要该对象实现Comparable接口，并重写compareTo()方法

```java
//实现Comparable接口
public class human implements Comparable{
	private String name;
	private int age;
	human(String name,int age){
		this.name=name;
		this.age=age;
	}
	//重写该方法
	public String toString() {
		return name+"： "+age;
	}
	//重写Comparable接口的compareTo方法
	public int compareTo(Object o) {
		human h=(human)o;     //强制转换为human类型
		if(this.age==h.age) {    
			return 0;     //表示相等
		}else if(this.age>h.age){
			return 1;    //从小到大，升序排序
		}else {
			return -1;
		}
	}
	public static void main(String[] args) {
		TreeSet tSet=new TreeSet();
		tSet.add(new human("xiaoming",22));
		tSet.add(new human("xiaoqiang",24));
		tSet.add(new human("xiaohua",23));
		tSet.add(new human("xiaohua",23));
		System.out.println(tSet);
	}
}

```

![47](../blog_img/java_img_47.png)

### 2.双列集合根接口-Map接口

>Map接口是双列集合根接口,用键值对方式来存储元素，其有两个重要实现类，HashMap,TreeMap.
>Map接口接口的常用方法：

<font color="red">Map接口的具体实现类也可以使用这些方法。</font>

方法 | 描述
------------ | -------------
void put(Object key,Object value)| 把元素的键值对加入到集合中
Object get(Object key)| 通过元素的键，把元素取出来
boolean containsKey(Object key) | 根据key判断元素是否在集合中
boolean containsValue(Object value)  |  根据value判断元素是否在集合中
Set keySet() | 返回集合中所有的key
`Collection<V> values()`  |  返回集合中所有的value
`Set<Map.Entry<K,V>> entrySet()`  |  以(key,value)的形式，返回集合所有元素
 

#### 1.HashMap集合

>用于存储键值对关系，且保证没有重复的key值。

**遍历HashMap集合元素的两种方式：①先遍历集合中的所有key,再根据key来获取value。②先获取集合中的映射关系，再根据关系取出key和value。**

```java
public static void main(String[] args) {
	HashMap hm=new HashMap ();
        hm.put(1, "小明");
        hm.put(2, "小华");
        hm.put(3, "小强");
        System.out.println(hm);
        //遍历HashMap集合的方式1：
        //先获取集合的所有key序列
        //再根据key序列找到value，用迭代器进行遍历
        Set ks=hm.keySet();
        Iterator ite=ks.iterator();    		
        while(ite.hasNext())  //判断该对象是否有下一个元素
        {	  
        	Object key=ite.next();   //获得一个key值
        	Object value=hm.get(key); //根据key序列找到value
        	System.out.println(key+":"+value);  
        }
        
        System.out.println("-------------");
        
        //遍历HashMap集合的方式2：
        //先获取集合中所有的映射关系
        //再从映射关系中取出key,value
        Set entryset=hm.entrySet();
        Iterator ite2=entryset.iterator();
        while(ite2.hasNext())  //判断该对象是否有下一个元素
        {	
        	Map.Entry entry=(Map.Entry)(ite2.next());   //获取某一个映射关系
        	Object key=entry.getKey(); //根据映射关系找到key值
        	Object value=entry.getValue(); //找到value
        	System.out.println(key+":"+value);  
        }
	}

/*
运行结果：
{1=小明, 2=小华, 3=小强}
1:小明
2:小华
3:小强
-------------
1:小明
2:小华
3:小强

*/
```

#### 2.TreeMap集合

>TreeMap是通过二叉树的原理来保证键的唯一性。
>TreeMap 要注意的事项：
　　1. 往TreeMap添加元素的时候，如果元素的键具备自然顺序，那么就会进行排序存储。
　　2. 往TreeMap添加元素的时候，如果元素的键不具备自然顺序特性， 那么键所属的类必须要实现Comparable接口，把键的比较规则定义在CompareTo方法上。
　　3. 往TreeMap添加元素的时候，如果元素的键不具备自然顺序特性，而且键所属的类也没有实现Comparable接口，那么就必须自定义比较器。

通过自定义比较器对所有的键进行排序

```java
//实现Comparator接口,重写compare方法
public class human implements Comparator{
	private String name;
	private int age;
	
	human(String name,int age){
		this.name=name;
		this.age=age;
	}
	//重写该方法
	public String toString() {
		return name+":"+age;
	}
	//重写该方法
	public int compare(Object o1, Object o2) {
		human h1=(human)o1;
		human h2=(human)o2;
		if(h1.age==h2.age) {    
			return 0;     //表示相等
		}else if(h1.age>h2.age){
			return 1;    //从小到大，升序排序
		}else {
			return -1;
		}
	}
	public static void main(String[] args) {
		human h1=new human("小明", 22);
		human h2=new human("小华", 19);
		human h3=new human("小强", 26);
		
		TreeMap tMap=new TreeMap();
		tMap.put(12, h1);
		tMap.put(2, h2);
		tMap.put(3, h3);
		
		Set ks=tMap.keySet();
        Iterator ite=ks.iterator();    		
        while(ite.hasNext())  //判断该对象是否有下一个元素
        {	  
        	Object key=ite.next();   //获得一个key值
        	Object value=tMap.get(key); //根据key序列找到value
        	System.out.println(key+":"+value);  
        }
	}
}

/*
运行结果：
2:小华:19
3:小强:26
12:小明:22
*/
```


### 3.Iterator 接口---主要用于迭代Collection单列集合中的元素

```java
ArrayList list=new ArrayList();
list.add("Hello");
list.add("World");
list.add("HAHAHAHA");

//使用迭代器进行相关遍历,先获取该集合的迭代对象
Iterator ite=list.iterator();    		
while(ite.hasNext())  //判断该对象是否有下一个元素
{
	//使用迭代器本身的删除方法
	if("tom".equals(ite.next())){
		it.remove();
	}
	System.out.println(ite.next());  //ite.next()取出集合中的元素
}
```
<font color="red">

注意：
1.通过迭代器遍历的元素，会把这些元素当作Object类型对待，若想得到特定类型的元素，需要进行强制类型转换。
2.在对集合元素进行迭代时，若在该过程中删除其中一个元素，迭代器对象会抛出一个异常。可以使用迭代器本身的删除方法remove(),来解决。

</font>


### 4.ListIterator 接口---Iterator接口的子类

>ListIterator迭代器在Iterator迭代器上添加一些特有的方法.

方法 | 描述
----- | -----
void add(Object o)  | 把元素o插入到集合中
boolean hasPrevious()  | 用于逆序遍历时，判断集合是否有上一个元素
Object previous()  |  用于逆序遍历时，遍历集合的上一个元素
void remove()  |  删除有next(),previous()方法返回的最后一个元素 

```java
ArrayList list = new ArrayList();
list.add("Hello");
list.add("World");
list.add("HAHAHAHA");

// 使用ListIterator迭代器进行相关遍历,先获取该集合的迭代对象
ListIterator it = list.listIterator();
while (it.hasNext()) {
	String str = (String) it.next();
	if ("Hello".equals(str)) {
		it.add("aaa");
	}
}
System.out.println(list);
```


### 5.泛型---用于规定参数类型：

>当把元素存入到集合中时，集合会转换Object类型。同样从集合中取出元素时，该元素类型会变为Object类型。
>==泛型可以指定集合存入取出的参数数据类型==

```java
ArrayList<String> al=new ArrayList<String>();   //指定该集合只能存取String类型的参数元素。
ArrayList<Human> al=new ArrayList<Human>();   //指定该集合只能存取Human对象类型的参数元素。
```

<font color="red">
使用泛型后，每次遍历集合元素不用把Object类型强制转换为其他类型。
</font>

<h4>自定义泛型：</h4>

>自定义泛型的作用是用来规定一个==类, 接口或方法所能接受的参数数据的类型==。

```java
//自定义泛型类 human，T为参数数据类型
public class human<T>{  
	private T temp;   
	public void save(T temp) {
		this.temp=temp;
	}
	public T get() {
		return temp;
	}
	
	public static void main(String[] args) {
		//这里可以随机定humanl类的参数数据类型
		human<Integer> h=new human<Integer>(); //定义human类的参数数据类型为Integer
		h.save(new Integer(3));
		Integer a=h.get();
		System.out.println(a);
	}
}
```
