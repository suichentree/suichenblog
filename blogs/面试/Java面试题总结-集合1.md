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

## 介绍一下List集合中有哪些常用类？以及各自的区别。

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

## List 是线程安全的吗？如果要线程安全要怎么做？

List中的Vector是线程安全的,其他类不是线程安全的，如果要实现线程安全，需要使用工具类 Collections.synchronizedList(new ArrayList())方法。

## List 和 数组Array 之间如何互相转换？

- List 集合可以使用 toArray 方法，转换为Array数组。  
- Array 使用 Arrays.asList(array)方法，转换为List集合。


## TreeMap 和 TreeSet 在排序时如何比较元素？

TreeSet 要求存放的对象的类必须实现 Comparable 接口的 compareTo() 方法，当插入元素到TreeSet容器的时候会回调该方法比较元素的大小。

TreeMap 要求存放的键值对映射的键key必须实现 Comparable 接口从而根据键对元素进行排序。

## Collections 工具类中的 sort()方法如何比较元素？

第一种要求传入的待排序容器中存放的对象比较实现Comparable 接口以实现元素的比较；

第二种不强制性的要求容器中的元素必须可比较，但是要求传入第二个参数，参数是Comparator 接口的子类型（需要重写 compare 方法实现元素的比较），相当于一个临时定义的排序规则，其实就是通过接口注入比较元素大小的算法，也是对回调模式的应用（Java 中对函数式编程的支持）。

## 用哪两种方式来实现集合的排序？

你可以使用有序集合，如 TreeSet 或 TreeMap，你也可以使用有顺序的的集合，如 list，然后通过 Collections.sort() 来排序。


## Java 中的 TreeMap 是采用什么树实现的？

TreeMap 是使用红黑树实现的。
红黑树是一种特化的AVL树（平衡二叉树），都是在进行插入和删除操作时通过特定操作保持二叉查找树的平衡，从而获得较高的查找性能。

## ArrayList 和 HashMap 的默认大小是多数？

ArrayList 的默认大小是 10 个元素，HashMap 的默认大小是16 个元素（必须是 2 的幂）

## HashMap的常见问题

>1. HashMap如果有很多相同key，导致链表很长的话，你会怎么优化？或者你会用什么数据结构来存储？针对HashMap中某个Entry链太长，查找的时间复杂度可能达到O(n)，怎么优化？
在jdk1.8中若HashMap中某一下标位置对应的链表长度>8时，会把链表部分转换为红黑树。利用红黑树快速增删改查的特点来提高HashMap的性能。这其中会涉及到红黑树的插入，删除，查找的算法。

>2. HashMap在高并发的情况下会发生什么问题？
会发送扩容问题。在jdk1.8的情况下，<font color="red">HashMap的扩容不是重新计算所有元素在数组中的位置。而是将原来数组的长度扩大为原来的2倍。</font>所有的之前元素的位置不是在原位置就是改变为原位置+2次幂的位置。

>3. HashMap对象的key、value值均可为null（key只能有一个为null，而value则可以有多个为null）？
HashMap在put的时候会调用hash()方法来计算key的hashcode值，当key==null时返回的值为0。因此key为null时，hash算法返回值为0，不会调用key的hashcode方法。之后会把数组中下标为0的元素覆盖。

>4. HashMap是线程安全的吗？
HashMap非线程安全，即任一时刻可以有多个线程同时写HashMap，会导致数据的不一致。<font color="red">如果需要满足线程安全，可以用 Collections的synchronizedMap方法使HashMap具有线程安全的能力，或者使用ConcurrentHashMap。</font>

## Hashtable与HashMap的比较

- HashMap 允许 key 和 value 为 null，而 HashTable 不允许。
- HashTable是线程安全的，HashMap不是线程安全的。如果需要线程安全的场合可以用ConcurrentHashMap替换。

## JDK7和JDK8中的HashMap有什么区别？

JDK7中的HashMap，是基于数组+链表来实现的，它的底层维护一个Entry数组。它会根据计算的hashCode将对应的KV键值对存储到该数组中，一旦发生hashCode冲突，那么就会将该KV键值对放到对应的已有元素的后面， 此时便形成了一个链表式的存储结构。

JDK7中HashMap的实现方案有一个明显的缺点，即当Hash冲突严重时，在桶上形成的链表会变得越来越长，这样在查询时的效率就会越来越低，其时间复杂度为O(N)。

JDK8中的HashMap，是基于数组+链表+红黑树来实现的，它的底层维护一个Node数组。当链表的存储的数据个数大于等于8的时候，不再采用链表存储，而采用了红黑树存储结构。这么做主要是在查询的时间复杂度上进行优化，链表为O(N)，而红黑树一直是O(logN)，可以大大的提高查找性能。


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


### 说一下 HashSet 的实现原理？

HashSet 是基于 HashMap 实现的，HashSet的值存放于HashMap的key上，HashMap的value统一为PRESENT，因此 HashSet 的实现比较简单，相关 HashSet 的操作，基本上都是直接调用底层HashMap 的相关方法来完成，HashSet 不允许重复的值。

### HashSet如何检查重复？HashSet是如何保证数据不可重复的？

向HashSet 中add ()元素时，判断元素是否存在的依据，不仅要比较hash值，同时还要结合equles 方法比较。

HashSet 中的add ()方法会使用HashMap 的put()方法。

HashMap 的 key 是唯一的，HashSet 添加进去的值就是作为 HashMap 的key，并且在HashMap中如果K/V相同时，会用新的V覆盖掉旧的V，然后返回旧的V。所以不会重复（ HashMap比较key是否相等是先比较 hashcode 再比较equals ）。


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

