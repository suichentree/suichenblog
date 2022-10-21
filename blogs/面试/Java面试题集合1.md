---
title: Java面试题-集合
date: 2019-08-08
sidebar: 'auto'
categories:
 - 面试
tags:
 - Java
---

[toc]

## Java面试题-集合

### 1.List、Set、Map 是否继承自 Collection 接口？List、Map、Set 三个接口存取元素时，各有什么特点？

1. List、Set 是继承自 Collection 接口，Map 不是。
2. List,Set是线性结构的容器。其中List存储的是同一类对象或数据类型，可以有重复元素。Set可以存储不同数据类型，不能存放重复元素。Map是键值对容器。

### 2.阐述 ArrayList、LinkedList 的存储性能和特性?
ArrayList 使用数组方式存储数据，当最大存储空间 > 实际存储的数据的时候。便于增加和插入元素，它们都允许直接按序号索引元素，但是插入元素要涉及数组元素移动等内存操作，所以查询数据快而插入数据慢。

LinkedList使用双向链表实现存储，按序号索引数据需要进行前向或后向遍历，但是插入数据时只需要记录本项的前后项即可，所以插入速度较快，查询速度慢。

### 3.Collection 和 Collections 的区别？
Collection 是一个接口，它是 Set、List 等容器的父接口；
Collections 是个一个工具类，提供方法来辅助容器操作，这些方法包括对容器的搜索、排序、线程安全化等等。

### 4.TreeMap 和 TreeSet 在排序时如何比较元素？
TreeSet 要求存放的对象所属的类必须实现 Comparable 接口，该接口提供了比较元素的 compareTo()方法，当插入元素时会回调该方法比较元素的大小。
TreeMap 要求存放的键值对映射的键key必须实现 Comparable 接口从而根据键对元素进行排序。

### 5.Collections 工具类中的 sort()方法如何比较元素？
第一种要求传入的待排序容器中存放的对象比较实现Comparable 接口以实现元素的比较；
第二种不强制性的要求容器中的元素必须可比较，但是要求传入第二个参数，参数是Comparator 接口的子类型（需要重写 compare 方法实现元素的比较），相当于一个临时定义的排序规则，其实就是通过接口注入比较元素大小的算法，也是对回调模式的应用（Java 中对函数式编程的支持）。

### 6.用哪两种方式来实现集合的排序？
你可以使用有序集合，如 TreeSet 或 TreeMap，你也可以使用有顺序的的集合，如 list，然后通过 Collections.sort() 来排序。

### 7.LinkedList 是单向链表还是双向链表？
LinkedList是双向链表。

### 8.Java 中的 TreeMap 是采用什么树实现的？
TreeMap 是使用红黑树实现的。
红黑树是一种特化的AVL树（平衡二叉树），都是在进行插入和删除操作时通过特定操作保持二叉查找树的平衡，从而获得较高的查找性能。

### 9.ArrayList 和 HashMap 的默认大小是多数？
ArrayList 的默认大小是 10 个元素，HashMap 的默认大小是16 个元素（必须是 2 的幂）

### 10.介绍Map接口

java中集合按照存储结构的不同，分为单列集合Collection,双列集合Map

<font color="red">
单列集合是按照线性列表的方式存储元素，其根接口是Collection.
双列集合是按照键值对的方式存储元素，其根接口是Map.
</font>

<h4>Map接口的类结构图，其中最常用的是HashMap,LinkedHashMap,TreeMap,Hashtable.</h4>

![20201023142514.png](../blog_img/20201023142514.png)

### 11.详解HashMap

<h3>HashMap的数据存储结构</h3>
Hashmap实际上是一个数组和链表的结合体（在数据结构中，一般称之为“链表散列“）

![20201022134152.png](../blog_img/20201022134152.png)

1. 当往HashMap中put元素时，首先先根据key的hash值得到这个元素在数组中的位置（即下标），然后把这个元素放到对应的位置中了。
2. 如果这个元素所在的位子上已经存放有其他元素了，那么在同一个位子上的元素将以链表的形式存放，<font color="red">新加入的放在链头，最先加入的放在链尾。</font>
3. 当从HashMap中get元素时，首先计算key的hash值，找到数组中对应位置的某一元素，然后通过key的equals方法在对应位置的链表中找到需要的元素。

<h3>HashMap的构造函数：</h3>

```
HashMap()
HashMap(int initialCapacity, float loadFactor)
HashMap()
HashMap(Map<? extends K, ? extends V> m)
```
1. size：size为HashMap中键值对总数。
2. initialCapacity：初始容量，从上面第11行代码我们看到，初始容量数值没有存起来，而且使用它计算阀值threshold。计算方法就是返回大于initialCapacity且最接近initialCapacity的一个2的正数幂的数字作为初始阀值。
3. capacity：容量。capacity就是指HashMap中桶的数量。默认值为16。一般第一次扩容时会扩容到64，之后都是以2的幂数增加。
4. loadFactor：装载因子，用来衡量HashMap满的程度，加载因子越大,填满的元素越多,空间利用率越高。loadFactor的默认值为0.75f。计算HashMap的实时装载因子的方法为size/capacity。

threshold：阀值，满足公式threshold=loadFactor*capacity。当HashMap的size大于threshold时会执行扩容（resize）操作。

<h3>HashMap的put方法</h3>

![20201023150314.png](../blog_img/20201023150314.png)

首先根据key的hash值计算数组索引i.

①.判断键值对数组table[i]是否为空或为null，否则执行resize()进行扩容；
②.根据键值key计算hash值得到插入的数组索引i，如果table[i]==null，直接新建节点添加，转向⑥，如果table[i]不为空，转向③；
③.判断table[i]的首个元素是否和key一样，如果相同直接覆盖value，否则转向④，这里的相同指的是hashCode以及equals；
④.判断table[i] 是否为treeNode，即table[i] 是否是红黑树，如果是红黑树，则直接在树中插入键值对，否则转向⑤；
⑤.遍历table[i]，判断链表长度是否大于8，大于8的话把链表转换为红黑树，在红黑树中执行插入操作，否则进行链表的插入操作；遍历过程中若发现key已经存在直接覆盖value即可；
⑥.插入成功后，判断实际存在的键值对数量size是否超多了最大容量threshold，如果超过，进行扩容。

HashMap的常见问题：

>1. HashMap如果有很多相同key，导致链表很长的话，你会怎么优化？或者你会用什么数据结构来存储？针对HashMap中某个Entry链太长，查找的时间复杂度可能达到O(n)，怎么优化？
在jdk1.8中若HashMap中某一下标位置对应的链表长度>8时，会把链表部分转换为红黑树。利用红黑树快速增删改查的特点来提高HashMap的性能。这其中会涉及到红黑树的插入，删除，查找的算法。

>2. HashMap在高并发的情况下会发生什么问题？
会发送扩容问题。在jdk1.8的情况下，<font color="red">HashMap的扩容不是重新计算所有元素在数组中的位置。而是将原来数组的长度扩大为原来的2倍。</font>所有的之前元素的位置不是在原位置就是改变为原位置+2次幂的位置。

>3. HashMap对象的key、value值均可为null（key只能有一个为null，而value则可以有多个为null）？
HashMap在put的时候会调用hash()方法来计算key的hashcode值，当key==null时返回的值为0。因此key为null时，hash算法返回值为0，不会调用key的hashcode方法。之后会把数组中下标为0的元素覆盖。

>4. HashMap是线程安全的吗？
HashMap非线程安全，即任一时刻可以有多个线程同时写HashMap，会导致数据的不一致。<font color="red">如果需要满足线程安全，可以用 Collections的synchronizedMap方法使HashMap具有线程安全的能力，或者使用ConcurrentHashMap。</font>

### 12. Hashtable与HashMap的比较


1. 二者的存储结构和解决冲突的方法都是相同的。
2. HashTable在不指定容量的情况下的默认容量为11，而HashMap为16，<font color="red">Hashtable不要求底层数组的容量一定要为2的整数次幂，而HashMap则要求一定为2的整数次幂。</font>
3. Hashtable中key和value都不允许为null。但是如果在Hashtable中有类似put(null,null)的操作，编译同样可以通过，因为key和value都是Object类型，<font color="red">但运行时会抛出NullPointerException异常，这是JDK的规范规定的。</font>
4. HashTable是线程安全的，任一时间只有一个线程能写Hashtable，并发性不如ConcurrentHashMap，因为ConcurrentHashMap引入了分段锁。Hashtable不建议在新代码中使用，不需要线程安全的场合可以用HashMap替换，需要线程安全的场合可以用ConcurrentHashMap替换。


### 13 JDK7和JDK8中的HashMap有什么区别？

JDK7中的HashMap，是基于数组+链表来实现的，它的底层维护一个Entry数组。它会根据计算的hashCode将对应的KV键值对存储到该数组中，一旦发生hashCode冲突，那么就会将该KV键值对放到对应的已有元素的后面， 此时便形成了一个链表式的存储结构。

JDK7中HashMap的实现方案有一个明显的缺点，即当Hash冲突严重时，在桶上形成的链表会变得越来越长，这样在查询时的效率就会越来越低，其时间复杂度为O(N)。

JDK8中的HashMap，是基于数组+链表+红黑树来实现的，它的底层维护一个Node数组。当链表的存储的数据个数大于等于8的时候，不再采用链表存储，而采用了红黑树存储结构。这么做主要是在查询的时间复杂度上进行优化，链表为O(N)，而红黑树一直是O(logN)，可以大大的提高查找性能。