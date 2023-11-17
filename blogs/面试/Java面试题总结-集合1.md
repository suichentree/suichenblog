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

## 为什么要使用集合？如何选择集合？

当需要保存一组类型相同的数据，就可以使用集合。之所以不用数组，是因为数组的长度不可变，数组存储的元素是可重复的，类型单一的。

当有多种需求的时候，集合比数组有优势。

> 如何选择集合？

- 可以根据key来获取value的，就选择TreeMap，HashMap，或者ConcurrentHashMap
- 需要元素唯一的，选择TreeSet，HashSet。
- 需要元素重复的，选择ArryList,LinkedList。

## 介绍一下java中各个集合的底层数据结构

List
* Arraylist： 对象数组，线程不安全
* Vector： 对象数组，线程安全，所有方法被同步锁synchrionzed关键字修饰。
* LinkedList： 双向链表，线程不安全

Set
* HashSet（无序，唯一）： 基于 HashMap 实现的，底层采⽤ HashMap 来保存元素。
* LinkedHashSet： LinkedHashSet 是 HashSet 的⼦类，并且其内部是通过 LinkedHashMap 来实现的。
* TreeSet（有序，唯一）： 底层是红黑树(自平衡的排序二叉树).

Map
* HashMap: JDK1.8 之前 HashMap 由数组+链表组成的，数组是 HashMap 的主体，链表则是主要为了解决哈希冲突⽽存在的（“拉链法”解决冲突）。JDK1.8 以后，当链表⻓度⼤于阈值（默认为 8）（将链表转换成红⿊树前会判断，如果当前数组的⻓度⼩于 64，那么会选择先进⾏数组扩容，⽽不是转换为红⿊树）时，将链表转化为红⿊树，以减少搜索时间.
* LinkedHashMap ： LinkedHashMap 继承⾃ HashMap ，所以它的底层仍然是由数组和链表或红⿊树组成。另外， LinkedHashMap 在链表的基础上，修改为双向链表，使得上⾯的结构可以保持键值对的插⼊顺序。同时通过对链表进⾏相应的操作，实现了访问顺序相关逻辑。
* HashTable： 底层是数组+链表组成的，数组是 HashMap 的主体，链表则是主要为 了解决哈希冲突而存在的
* TreeMap： 底层是红黑树（自平衡的排序二叉树）

## 哪些集合类是线程安全的？

java.uti包中的集合类大部分都是非线程安全的。其中Vector和Hashtable是线程安全的，对于这些非线程安全的类，可以利用Collections工具类提供的synchronizedXxx()方法,可以将这些集合类包装成线程安全的集合类。

另外java.util.concurrent包中的提供了大量的支持并发访问的集合类。例如ConcurrentHashMap和ConcurrentMap等线程安全的集合类。


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

List中的Vector类是线程安全的,其他类不是线程安全的，如果要实现线程安全，可以使用工具类 Collections.synchronizedList(new ArrayList())方法。

## List 和 数组Array 之间如何互相转换？

- List 集合可以使用 toArray 方法，转换为Array数组。  
- Array 使用 Arrays.asList(array)方法，转换为List集合。

## TreeMap 和 TreeSet 在排序时如何比较元素？

TreeMap和TreeSet底层都是红黑树数据结构。

TreeSet 要求存放入集合的对象必须实现 Comparable 接口的 compareTo() 方法，当插入元素到TreeSet容器的时候会回调该方法比较元素的大小。

TreeMap 要求存放的键值对映射的键key必须实现 Comparable 接口从而根据键对元素进行排序。

## Collections 工具类中的 sort()方法如何比较元素？

```
void sort(List list)
void sort(List list, Comparator c)
```

第一种要求传入的待排序容器中存放的对象比较实现Comparable 接口以实现元素的比较；

第二种不强制性的要求容器中的元素必须可比较，但是要求传入第二个参数，参数是Comparator 接口的子类型（需要重写 compare 方法实现元素的比较），相当于一个临时定义的排序规则，其实就是通过接口注入比较元素大小的算法，也是对回调模式的应用（Java 中对函数式编程的支持）。


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

HashMap非线程安全，即任一时刻可以有多个线程同时写HashMap，会导致数据的不一致。

如果需要满足线程安全，可以用 Collections的synchronizedMap方法使HashMap具有线程安全的能力，或者使用ConcurrentHashMap。

## Hashtable与HashMap的区别？

- HashMap 允许 key 和 value 为 null，而 HashTable 不允许。
- HashMap不是线程安全的。HashTable是线程安全的，内部方法通过synchronizedMap关键字修饰。

## 为什么HashMap 允许 key 和 value 为 null，而 HashTable 不允许？

HashMap添加元素的时候，会判断key的hash值。当key为null的时候，则手动设置hash值为0。

HashTable添加元素的时候，若key和value为null,会手动抛出空指针异常。

## HashMap 和 HashSet 区别

HashSet 底层就是基于 HashMap 实现的。

其中 clone() 、 writeObject() 、 readObject() 是 HashSet ⾃⼰不得不实现之外，其他⽅法都是直接调⽤ HashMap 中的⽅法。

## HashMap 和 TreeMap 区别

TreeMap 和 HashMap 都继承⾃ AbstractMap ，但是需要注意的是TreeMap 它还实现了NavigableMap 接⼝和 SortedMap 接⼝。

实现 NavigableMap 接⼝让 TreeMap 有了对集合内元素的搜索的能⼒。实现 SortMap 接⼝让 TreeMap 有了对集合中的元素根据键排序的能⼒。

综上所述，相⽐于 HashMap 来说 TreeMap 主要多了对集合中的元素根据键排序的能⼒以及对集合内元素的搜索的能⼒。

## JDK7和JDK8中的HashMap有什么区别？

JDK7中的HashMap，是基于数组+链表来实现的，它的底层维护一个Entry数组。它会根据计算的hashCode将对应的KV键值对存储到该数组中，一旦发生hashCode冲突，那么就会将该KV键值对放到对应的已有元素的后面， 此时便形成了一个链表式的存储结构。

JDK7中HashMap的实现方案有一个明显的缺点，即当Hash冲突严重时，在桶上形成的链表会变得越来越长，这样在查询时的效率就会越来越低，其时间复杂度为O(N)。

JDK8中的HashMap，是基于数组+链表+红黑树来实现的，它的底层维护一个Node数组。当链表的存储的数据个数大于等于8的时候，不再采用链表存储，而采用了红黑树存储结构。这么做主要是在查询的时间复杂度上进行优化，链表为O(N)，而红黑树一直是O(logN)，可以大大的提高查找性能。



## List 和 Set 和 Map的使用场景

1）如果你经常会使用索引来对容器中的元素进行访问，那么 List 是你的正确的选择。如果你已经知道索引了的话，那么 List 的实现类比如 ArrayList 可以提供更快速的访问,如果经常添加删除 元素的，那么肯定要选择LinkedList。

2）如果你想容器中的元素能够按照它们插入的次序进行有序存储，那么还是 List，因为 List 是 一个有序容器，它按照插入顺序进行存储。

3）如果你想保证插入元素的唯一性，也就是你不想有重复值的出现，那么可以选择一个 Set 的 实现类，比如 HashSet、LinkedHashSet 或者 TreeSet。所有 Set 的实现类都遵循了统一约束 比如唯一性，而且还提供了额外的特性比如 TreeSet 还是一个 SortedSet，所有存储于 TreeSet 中的元素可以使用Java 里的 Comparator 或者 Comparable 进行排序。LinkedHashSet 也按 照元素的插入顺序对它们进行存储。

4）如果你以键和值的形式进行数据存储那么 Map 是你正确的选择。你可以根据你的后续需要 从Hashtable、HashMap、TreeMap 中进行选择。


## 说一下 HashSet 的实现原理？

HashSet 是基于 HashMap 实现的，HashSet的值存放于HashMap的key上，HashMap的value统一为PRESENT，因此 HashSet 的实现比较简单，相关 HashSet 的操作，基本上都是直接调用底层HashMap 的相关方法来完成，HashSet 不允许重复的值。

## HashSet如何检查重复？HashSet是如何保证数据不可重复的？

当你把对象加⼊ HashSet 时，HashSet 会先计算对象的 hashcode 值来判断对象加⼊的位置，同时也会与其他加⼊的对象的 hashcode 值作⽐较，如果没有相符的 hashcode，HashSet 会假设对象没有重复出现。但是如果发现有相同 hashcode 值的对象，这时会调⽤ equals() ⽅法来检查 hashcode 相等
的对象是否真的相同。如果两者相同，HashSet 就不会让加⼊操作成功。


## HashMap 的实现原理？

HashMap实际上是数组和链表的结合体。

> jdk1.8之前

JDK1.8 之前 HashMap 底层是 数组和链表。
- 向 HashMap集合中加入某个 k-v 元素。
- HashMap 通过 key 的 hashCode方法 得到 hash 值，然后通过 hash值 判断当前元素存放的位置
- 如果当前位置存在元素的话，就判断该元素与要存⼊的元素的 hash
值以及 key 是否相同，如果相同的话，直接覆盖，不相同就把value值加入到链表数组中。

> jdk1.8之后

1. 当向Hashmap中添加k-v元素时，利用hashCode方法重新计算出key的hash值。然后通过hash值计算出元素存放的位置。
2. 如果当前位置没有存放元素，则把新添加的元素，存放到该位置中。
3. 如果当前位置已经存储了元素。需要通过equals()方法判断value是否相同。此时有两种情况。(1)如果value相同，则覆盖原始值；(2)如果value不同（出现冲突），则将当前的value 放入链表中。
4. 理解了以上过程就不难明白HashMap是如何解决hash冲突的问题，核心就是使用了数组的存储方式，然后将冲突的key的对象放入链表中，一旦发现冲突就在链表中做进一步的对比。当链表⻓度⼤于阈值（默认为8）（将链表转换成红⿊树前会判断，如果当前数组的⻓度⼩于 64，那么会选择先进⾏数组扩容，⽽不是转换为红⿊树）时，将链表转化为红⿊树，以减少搜索时间。


## Collection 和 Collections 的区别

Collection 是集合类的上级接口，继承与他的接口主要有 Set接口 和 List接口

Collections 是针对集合类的一个工具类，他提供一系列静态方法实现对各种集合的搜索、排序、线程安全化等操作。

## 迭代器 Iterator 是什么？

Iterator 迭代器可以对集合进⾏遍历。由于每⼀个集合内部的数据结构是不尽相同的，所以每⼀个集合存和取都很可能是不⼀样的。虽然可以⼈为地在每⼀个集合类中定义 hasNext() 和 next() ⽅法，但这样做会让整个集合体系过于臃肿。于是就有了迭代器。

迭代器 Iterator 是将 hasNext() 和 next() 方法聚合的一个接⼝。每个集合类可以实现该接口，然后在类的内部，定义⾃⼰迭代⽅式。

这样做就规定了整个集合体系的遍历⽅式都是 hasNext() 和 next() ⽅法，使⽤者不⽤管怎么实现的，会⽤即可。迭代器的定义为：提供⼀种⽅法访问⼀个容器对象中各个元素，⽽⼜不需要暴露该对象的内部细节。

> 迭代器 Iterator 有啥⽤？

Iterator 主要是⽤来遍历集合⽤的，它的特点是更加安全，因为它可以确保，在当前遍历的集合元
素被更改的时候，就会抛出 ConcurrentModificationException 异常。

##  Hashcode方法的作用

hashCode方法：它根据对象的内存地址换算出的一个hashCode值。当集合
要添加新的元素时，先调用这个元素的hashCode方法，就能定位到它应该放置的物理位置上。

如果这个位置上没有元素，它就可以直接存储在这个位置上，不用再进行任何比较了；如果这个位置上已经有元素了，就调用它的equals方法与新元素进行比较，相同的话就不存了，不相同就散列其它的地址。这样一来实际调用equals方法的次数就大大降低了，几乎只需要一两次。

