---
title: Java面试知识点总结2
date: 2022-10-31
sidebar: 'auto'
categories: 
 - 面试
tags:
 - Java
---

[toc]

# Java面试知识点总结2

## String相关

### 什么是字符串常量池？

字符串常量池位于堆内存中，专门用来存储字符串常量，可以提高内存的使用率，避免开辟多块空间存储相同的字符串，在创建字符串时 JVM 会首先检查字符串常量池，如果该字符串已经存在池中，则返回它的引用，如果不存在，则实例化一个字符串放到池中，并返回其引用。

### String有哪些特性

* 不变性：String 是只读字符串，对它进行任何操作，其实都是创建一个新的对象，再把引用指向该对象。不变模式的主要作用在于当一个对象需要被多线程共享并频繁访问时，可以保证数据的一致性。
* 常量池优化：String 对象创建之后，会在字符串常量池中进行缓存，如果下次创建同样的对象时，会直接返回缓存的引用。
* final：使用 final 来定义 String 类，表示 String 类不能被继承，提高了系统的安全性。

### 是否可以继承 String 类

String 类是 final 类，不可以被继承。

String str="i"与 String str=new String(“i”)一样吗？不一样，因为内存的分配方式不一样。String str="i"的方式，java 虚拟机会将其分配到常量池中；而 String str=new String(“i”) 则会被分到堆内存中。 

String s = new String(“xyz”);创建了几个字符串对象? 两个对象，一个是静态区的"xyz"，一个是用new创建在堆上的对象。

# 线程

# 反射


# 集合容器

## 集合和数组的区别

* 数组是固定长度的；集合可变长度的。
* 数组可以存储基本数据类型，也可以存储引用数据类型；集合只能存 储引用数据类型。
* 数组存储的元素必须是同一个数据类型；集合存储的对象可以是不同 数据类型。

## 各个集合容器的底层数据结构

List
* Arraylist： Object数组
* Vector： Object数组
* LinkedList： 双向循环链表

Set
* HashSet（无序，唯一）：基于 HashMap 实现的，底层采用 HashMap 来保存元素
* LinkedHashSet： LinkedHashSet 继承与 HashSet，并且其内部是通过 LinkedHashMap 来实现的。有点类似于我们之前说的LinkedHashMap 其内部是基 于 Hashmap 实现一样，不过还是有一点点区别的。
* TreeSet（有序，唯一）： 红黑树(自平衡的排序二叉树。) 

Map
* HashMap： JDK1.8之前HashMap由数组+链表组成的，数组是HashMap的主体，链表则是主要为了解决哈希冲突而存在的（“拉链法”解决冲突）.JDK1.8以后在解决哈希冲突时有了较大的变化，当链表长度大于阈值（默认为8）时，将链表转化为红黑树，以减少搜索时间
* LinkedHashMap：LinkedHashMap 继承自 HashMap，所以它的底层仍然是 基于拉链式散列结构即由数组和链表或红黑树组成。另外，LinkedHashMap 在上面 结构的基础上，增加了一条双向链表，使得上面的结构可以保持键值对的插入顺序。 同时通过对链表进行相应的操作，实现了访问顺序相关逻辑。
* HashTable： 数组+链表组成的，数组是 HashMap 的主体，链表则是主要为 了解决哈希冲突而存在的
* TreeMap： 红黑树（自平衡的排序二叉树）

## 哪些集合类是线程安全的？

java.uti包中的集合类大部分都是非线程安全的，例如：ArrayList/LinkedList/HashMap等等，其中Vector和Hashtable是线程安全的，但是这两个类性能很差，在实际的开发中不常用。对于这些非线程安全的类，可以利用Collections工具类提供的synchronizedXxx()方法,可以将这些集合类包装成线程安全的集合类。

另外java.util.concurrent包中的提供了大量的支持并发访问的集合类。例如ConcurrentHashMap和ConcurrentMap等线程安全的集合类。


## List 和 Set 和 Map的使用场景

1）如果你经常会使用索引来对容器中的元素进行访问，那么 List 是你的正确的选择。如果你已经知道索引了的话，那么 List 的实现类比如 ArrayList 可以提供更快速的访问,如果经常添加删除 元素的，那么肯定要选择LinkedList。

2）如果你想容器中的元素能够按照它们插入的次序进行有序存储，那么还是 List，因为 List 是 一个有序容器，它按照插入顺序进行存储。

3）如果你想保证插入元素的唯一性，也就是你不想有重复值的出现，那么可以选择一个 Set 的 实现类，比如 HashSet、LinkedHashSet 或者 TreeSet。所有 Set 的实现类都遵循了统一约束 比如唯一性，而且还提供了额外的特性比如 TreeSet 还是一个 SortedSet，所有存储于 TreeSet 中的元素可以使用Java 里的 Comparator 或者 Comparable 进行排序。LinkedHashSet 也按 照元素的插入顺序对它们进行存储。

4）如果你以键和值的形式进行数据存储那么 Map 是你正确的选择。你可以根据你的后续需要 从Hashtable、HashMap、TreeMap 中进行选择。


# Collection接口

## List接口

### 说一下 ArrayList 的优缺点

ArrayList的优点如下：
* ArrayList 底层以数组实现，是一种随机访问模式。ArrayList 实现了 RandomAccess 接口，因此查找的时候非常快。
* ArrayList 在顺序添加一个元素的时候非常方便。

ArrayList 的缺点如下：
* 删除元素的时候，需要做一次元素复制操作。如果要复制的元素很多，那么就会比较耗费性能。 
* 插入元素的时候，也需要做一次元素复制操作，缺点同上。

ArrayList 比较适合顺序添加、随机访问的场景。

### 如何实现数组和 List 之间的转换？

数组转 List：使用 Arrays. asList(array) 进行转换。

List 转数组：使用 List 自带的 toArra() 方法   

### ArrayList 和 LinkedList 的区别是什么？

* 数据结构实现：ArrayList 是动态数组的数据结构实现，而 LinkedList 是双向链表的数据结构实现。
* 查询效率：ArrayList 比 LinkedList 效率要高。ArrayList通过数组下标访问，LinkedList通过遍历访问。
* 增删效率：LinkedList 比 ArrayList 效率要高，因为ArrayList增删会影响数组内的其他数据的下标。
* 内存空间占用：LinkedList 比 ArrayList 更占内存，因为 LinkedList 的节点除了存储数据，还存储了两个引用，一个指向前一个元素，一个指向后一个元素。
* 线程安全：ArrayList 和 LinkedList 都是不同步的，都不保证线程安全。

## Set接口

### 说一下 HashSet 的实现原理？

HashSet 是基于 HashMap 实现的，HashSet的值存放于HashMap的key上，HashMap的value统一为PRESENT，因此 HashSet 的实现比较简单，相关 HashSet 的操作，基本上都是直接调用底层HashMap 的相关方法来完成，HashSet 不允许重复的值。

### HashSet如何检查重复？HashSet是如何保证数据不可重复的？

向HashSet 中add ()元素时，判断元素是否存在的依据，不仅要比较hash值，同时还要结合equles 方法比较。

HashSet 中的add ()方法会使用HashMap 的put()方法。

HashMap 的 key 是唯一的，HashSet 添加进去的值就是作为 HashMap 的key，并且在HashMap中如果K/V相同时，会用新的V覆盖掉旧的V，然后返回旧的V。所以不会重复（ HashMap比较key是否相等是先比较 hashcode 再比较equals ）。

### hashCode（）与equals（）的相关规定

1. 如果两个对象相等，则hashcode一定也是相同的
2. 两个对象相等,对两个equals方法返回true
3. 两个对象有相同的hashcode值，它们也不一定是相等的
4. 综上，equals方法被覆盖过，则hashCode方法也必须被覆盖
5. hashCode()的默认行为是对堆上的对象产生独特值。如果没有重写hashCode()，则该class的两个对象无论如何都不会相等（即使这两个对象指向相同的数据）。


# Map接口

## HashMap 的实现原理？

HashMap实际上是数组和链表的结合体。

HashMap 基于 Hash 算法实现的
1. 当我们往Hashmap中put元素时，利用key的hashCode重新hash计算出当前对象的元素在数组中的下标
2. 存储时，如果出现hash值相同的key，此时有两种情况。(1)如果key相同，则覆盖原始值；(2)如果key不同（出现冲突），则将当前的key-value 放入链表中
3. 获取时，直接找到hash值对应的下标，在进一步判断key是否相同，从而找到对应值。
4. 理解了以上过程就不难明白HashMap是如何解决hash冲突的问题，核心就是使用了数组的存储方式，然后将冲突的key的对象放入链表中，一旦发现冲突就在链表中做进一步的对比。当链表中的节点数据超过八个之后，该链表会转为红黑树来提高查询效率，从原来的O(n)到O(logn)

## HashMap为什么使用红黑树替换链表?

当HashMap的链表长度>8时，会把链表转换为红黑树。

原因：开始使用链表，占用空间少，查询性能也相差不大。但是当链表越来越长，查询效率逐渐变低，为保证查询效率才会舍弃链表转为红黑树，以空间换时间。









