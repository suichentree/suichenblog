---
title: Java面试题总结-集合1
date: 2023-08-11
sidebar: 'auto'
categories: 
 - 面试
tags:
 - Java
---

[toc]

# Java面试题总结-集合1

## 常用集合类有哪些？

Map接口和Collection接口是所有集合框架的父接口：
1. Collection接口的子接口包括：Set接口和List接口。
2. Map接口的实现类主要有：HashMap、TreeMap、Hashtable、ConcurrentHashMap等
3. Set接口的实现类主要有：HashSet、TreeSet、LinkedHashSet等
4. List接口的实现类主要有：ArrayList、LinkedList、Stack以及Vector等

## List集合，Set集合，Map集合的区别？

> List集合

- List是存储单列数据的集合。
- List集合可以存储多个重复的元素。
- List是一个有序集合，能够保证集合中每个元素的存储顺序。


> Set集合

- Set是存储单列数据的集合。
- Set集合不允许存储多个重复的元素。
- Set是一个无序集合，无法保证集合中每个元素的存储顺序。
- TreeSet 底层是 TreeMap。因此TreeSet也通过 Comparator 或Comparable 维护了一个排序顺序。


> Map集合

- Map是存储键值对数据的集合。
- Map集合不允许存储多个相同key的元素。即元素的key唯一。
- TreeMap 也通过 Comparator 或者 Comparable 维护了一个排序顺序。


## 介绍一下java中各个集合的底层数据结构

List接口
* Arraylist：Object数组，线程不安全
* LinkedList： 双向循环链表，线程不安全
* Vector：Object数组，线程安全，所有方法被同步锁synchrionzed关键字修饰。

Set接口
* HashSet（无序，唯一）： 基于 HashMap 实现的，底层采⽤ HashMap的key来保存元素，因此能保证元素不重复。
* LinkedHashSet： LinkedHashSet继承HashSet类，并且其内部是通过 LinkedHashMap 来实现的。
* TreeSet（有序，唯一）： 底层是红黑树(自平衡的排序二叉树).

Map接口
* HashMap: 
  * JDK1.8 之前 HashMap 由数组+链表组成的，数组是 HashMap 的主体，链表则是主要为了解决哈希冲突⽽存在的。
  * JDK1.8 以后，当链表⻓度⼤于8，并且数组的长度大于64时，会将链表转化为红⿊树。
* LinkedHashMap ： LinkedHashMap 继承⾃ HashMap类 ，所以它的底层仍然是由数组和链表或红⿊树组成。另外 LinkedHashMap 在链表的基础上，修改为双向链表，使得上⾯的结构可以保持键值对的插⼊顺序。同时通过对链表进⾏相应的操作，实现了访问顺序相关逻辑。
* TreeMap： 底层是红黑树（自平衡的排序二叉树）

HashTable： 底层是数组+链表组成的，数组是 HashMap 的主体，链表则是主要为 了解决哈希冲突而存在的。是线程安全的。

## List 和 Set 和 Map 的使用场景

1）如果你经常会使用索引来对容器中的元素进行访问，那么 List 是你的正确的选择。如果你已经知道索引了的话，那么 List 的实现类比如 ArrayList 可以提供更快速的访问,如果经常添加删除 元素的，那么肯定要选择LinkedList。

2）如果你想容器中的元素能够按照它们插入的次序进行有序存储，那么还是 List，因为 List 是 一个有序容器，它按照插入顺序进行存储。

3）如果你想保证插入元素的唯一性，也就是你不想有重复值的出现，那么可以选择一个 Set 的 实现类，比如 HashSet、LinkedHashSet 或者 TreeSet。所有 Set 的实现类都遵循了统一约束 比如唯一性，而且还提供了额外的特性比如 TreeSet 还是一个 SortedSet，所有存储于 TreeSet 中的元素可以使用Java 里的 Comparator 或者 Comparable 进行排序。LinkedHashSet 也按 照元素的插入顺序对它们进行存储。

4）如果你以键和值的形式进行数据存储那么 Map 是你正确的选择。你可以根据你的后续需要 从Hashtable、HashMap、TreeMap 中进行选择。

## 哪些集合类是线程安全的？

java中的集合类在设计之初都是线程安全的。例如Vector和HashTable是线程安全的。后来设计者考虑线程安全会影响集合的性能。因此后续的集合类大部分都是非线程安全的。

对于这些非线程安全的类，可以利用Collections工具类提供的synchronizedXxx()方法,可以将这些非线程安全的集合类转换成线程安全的集合类。

另外java.util.concurrent包中的提供了大量的线程安全的集合类。例如ConcurrentHashMap和ConcurrentMap等线程安全的集合类。

## Collection 和 Collections 的区别

Collection 是集合类的根接口，它提供了对集合对象的基本操作方法。Collection接口的设计意义是为各种集合提供统一的操作规范，其直接继承接口有List与Set接口。

Collections 是针对集合类的一个工具类，它提供一系列静态方法，用于对集合中元素进
行排序、搜索以及线程安全等各种操作。

## 迭代器 Iterator

### 迭代器 Iterator 是什么？

不同的集合类，底层的数据结构不相同。因此不同集合类的遍历方式都不相同。

而Iterator是一个接口，这个接口提供了Collection集合类的遍历规范。

Collection集合类都内置了一个迭代器方法。我们可以使用迭代器方法来获取当前集合类的迭代器实例对象。然后通过迭代器实例对象，可以遍历当前集合类。

> Iterator 使用代码如下

```java
List<String> list = new ArrayList<Stirng>();
Iterator<String> it = list.iterator();
while(it.hasNext()){
  String obj = it.next();
  System.out.println(obj);
}
```

### 迭代器 Iterator 有啥⽤？

Iterator 主要是⽤来遍历集合⽤的，它的特点是更加安全，因为它可以确保，在遍历集合的过程中，如果集合被更改，就会抛出 ConcurrentModificationException 异常。

## List接口

### 介绍一下List集合中有哪些常用类？以及各自的区别。

常用类有 ArrayList、LinkedList、Vector。

ArrayList
- 底层通过动态数组存储元素。
- 查询快，修改慢。因为ArrayList修改元素会影响数组内的其他元素的下标。
- 线程不安全
- 默认数组容量为0，每次扩容按之前的1.5倍扩容

LinkedList
- 底层通过双向链表存储元素。
- 查询慢，修改快。因为LinkedList要通过遍历查询。
- 线程不安全

Vector
- 底层通过动态数组存储元素。
- 线程安全。Vector类中的每个方法都有synchronized关键字修饰。可以把Vector类看作线程安全的ArrayList类。

ArrayList 的缺点如下：
- 删除元素的时候，需要做一次元素复制操作。如果要复制的元素很多，那么就会比较耗费性能。 

### 阐述 ArrayList、Vector、LinkedList 的性能和特性？

ArrayList是使用数组方式存储数据。ArrayList可以通过数组下标来查询元素的。但是插入元素要涉及数组元素移动等内存操作，所以查询快而插入慢。

Vector也是使用数组方式存储数据。但是线程安全的，因为加了synchronized修饰。因此性能比ArrayList差。

LinkedList底层是使用双向链表实现存储，按序号索引数据需要进行前向或后向遍历，但插入数据时只需要记录当前项的前后项即可。因此LinkedList查询慢，插入快。


## Set接口

### HashSet的实现原理是什么？

HashSet 是基于 HashMap 实现的，HashSet的值存放于HashMap的key上,HashMap的value统一为 PRESENT。

因此 HashSet 的实现比较简单，相关 HashSet 的操作，基本上都是直接调用底层HashMap 的相关方法来完成。HashSet 不允许重复的值。

### HashSet如何检查重复？HashSet是如何保证数据不可重复的？

由于HashSet中的add() 方法内部使用的是HashMap的put()方法。

当你把对象加⼊ HashSet 时。
- 先计算元素的 hashcode 值来判断元素加⼊的位置。
- 如果没有相同的 hashcode，HashSet 会假设元素之前没有出现。但是如果发现有相同 hashcode 值的元素，这时会调⽤ equals() ⽅法来检查新旧元素内容是否相同。如果两者相同，HashSet 就不会让加⼊操作成功。

## Map接口

### HashMap 的实现原理是什么？

JDK8中的HashMap是基于数组+链表+红黑树来实现的。

1. 当向HashMap中添加k-v元素时，利用hashCode方法重新计算出key的hash值。然后通过hash值计算出元素存放的位置。
2. 如果当前位置没有存放元素，则把新添加的元素，存放到该位置中。
3. 如果当前位置已经存储了元素。需要通过equals()方法判断key是否相同。此时有两种情况。
   1. 如果key相同，则新元素覆盖旧元素。
   2. 如果key不同（出现冲突），则将当前的元素放入到旧元素的后面，此时新旧元素便形成了一个链表。
4. 当链表⻓度⼤于8并且数组长度大于64时（如果当前数组的⻓度⼩于 64，那么会选择先进⾏数组扩容，⽽不是转换为红⿊树）时，将链表转化为红⿊树，以减少搜索时间。


### HashMap的put方法的具体流程是什么？

1. 首先判断HashMap集合中的数组是否为空，否则对数组进行扩容。
2. 对元素的key计算hash值，得到插入位置。如果当前位置没有元素，则将元素加入到该位置中。如果当前位置有元素，则进行步骤3.
3. 如果当前位置有元素存在。则判断新旧元素的key是否相同。如果相同则新元素覆盖旧元素。如果不相同，则将新元素加入到旧元素后面。
4. 如果旧元素是链表，则判断链表是否大于8。如果大于8则将链表转为红黑树，然后将新元素加入到红黑树中。如果不大于8，则将新元素添加到链表中。
5. 在将新元素添加到链表或红黑树中的时候，会进行遍历操作。如果遍历过程中，发现与新元素相同的key,则新元素直接覆盖即可。
6. 当新元素插入成功后，会判断元素的个数是否超容。否则需要对HashMap进行扩容。

### HashMap与HashTable的区别？

HashMap
- 非线程安全，性能高
- 允许一个 key 为null。允许多个value为null。
- 初始容量为16，每次扩容为之前的2倍。

HashTable
- 线程安装，部方法通过synchronizedMap关键字修饰。性能低，已淘汰。
- 不允许key和value是null
- 初始容量为11，每次扩容为之前的2n + 1。

### 为什么HashMap 允许 key 和 value 为 null，而 HashTable 不允许？

- HashMap添加元素的时候，会判断key的hash值。当key为null的时候，则手动设置hash值为0。
- HashTable添加元素的时候，若key和value为null,会手动抛出空指针异常。

### ConcurrentHashMap 底层具体实现知道吗？实现原理是什么？

在JDK1.8中，ConcurrentHashMap 采用Node数组 + CAS算法 + Synchronized修饰符 来保证线程安全。synchronized只锁定当前链表或红黑二叉树的首节点，这样只要hash不冲突，就不会产生并发。

### TreeMap 是采用什么树实现的？

TreeMap 底层是使用红黑树实现的。

红黑树是一种特化的平衡二叉树，都是在进行插入和删除操作时通过特定操作保持二叉树的平衡，从而获得较高的查找性能。


### HashMap的死循环问题？

HashMap不是线程安全的。因此在多线程并发使用HashMap的情况下，HashMap可能会发生死循环问题，导致cpu占用率直接100%。

即当多线程并发使用HashMap时，若HashMap发生扩容，可能会产生循环链表，在执行get的时候，会触发死循环，引起CPU的100%问题，所以一定要避免在并发环境下使用HashMap。

### ConcurrentHashMap的线程安全是如何实现的？




