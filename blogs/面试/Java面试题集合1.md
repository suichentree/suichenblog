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


### 4.TreeMap 和 TreeSet 在排序时如何比较元素？
TreeSet 要求存放的对象所属的类必须实现 Comparable 接口，该接口提供了比较元素的 compareTo()方法，当插入元素时会回调该方法比较元素的大小。
TreeMap 要求存放的键值对映射的键key必须实现 Comparable 接口从而根据键对元素进行排序。

### 5.Collections 工具类中的 sort()方法如何比较元素？
第一种要求传入的待排序容器中存放的对象比较实现Comparable 接口以实现元素的比较；
第二种不强制性的要求容器中的元素必须可比较，但是要求传入第二个参数，参数是Comparator 接口的子类型（需要重写 compare 方法实现元素的比较），相当于一个临时定义的排序规则，其实就是通过接口注入比较元素大小的算法，也是对回调模式的应用（Java 中对函数式编程的支持）。

### 6.用哪两种方式来实现集合的排序？
你可以使用有序集合，如 TreeSet 或 TreeMap，你也可以使用有顺序的的集合，如 list，然后通过 Collections.sort() 来排序。


### 8.Java 中的 TreeMap 是采用什么树实现的？
TreeMap 是使用红黑树实现的。
红黑树是一种特化的AVL树（平衡二叉树），都是在进行插入和删除操作时通过特定操作保持二叉查找树的平衡，从而获得较高的查找性能。

### 9.ArrayList 和 HashMap 的默认大小是多数？
ArrayList 的默认大小是 10 个元素，HashMap 的默认大小是16 个元素（必须是 2 的幂）

### 11.HashMap的常见问题：

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