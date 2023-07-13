---
title: Java 详解HashMap
date: 2023-07-12
sidebar: 'auto'
categories: 
 - Java
---

[toc]

# Java 详解HashMap

## HashMap的数据存储结构

Hashmap实际上是一个数组和链表的结合体（在数据结构中，一般称之为“链表散列“）

![20201022134152.png](../blog_img/20201022134152.png)

1. 当往HashMap中put元素时，首先先根据key的hash值得到这个元素在数组中的位置（即下标），然后把这个元素放到对应的位置中了。
2. 如果这个元素所在的位子上已经存放有其他元素了，那么在同一个位子上的元素将以链表的形式存放，<font color="red">新加入的放在链头，最先加入的放在链尾。</font>
3. 当从HashMap中get元素时，首先计算key的hash值，找到数组中对应位置的某一元素，然后通过key的equals方法在对应位置的链表中找到需要的元素。

## HashMap的构造函数

```
HashMap()
HashMap(int initialCapacity)
HashMap(int initialCapacity, float loadFactor)
HashMap(Map<? extends K, ? extends V> m)
```

1. initialCapacity：初始容量，从上面第11行代码我们看到，初始容量数值没有存起来，而且使用它计算阀值threshold。计算方法就是返回大于initialCapacity且最接近initialCapacity的一个2的正数幂的数字作为初始阀值。
2. capacity：容量。capacity就是指HashMap中桶的数量。默认值为16。一般第一次扩容时会扩容到64，之后都是以2的幂数增加。
3. loadFactor：装载因子，用来衡量HashMap满的程度，加载因子越大,填满的元素越多,空间利用率越高。loadFactor的默认值为0.75f。计算HashMap的实时装载因子的方法为size/capacity。

threshold：阀值，满足公式threshold=loadFactor*capacity。当HashMap的size大于threshold时会执行扩容（resize）操作。

## HashMap的put方法

![20201023150314.png](../blog_img/20201023150314.png)

首先根据key的hash值计算数组索引i.

①.判断键值对数组table[i]是否为空或为null，否则执行resize()进行扩容；
②.根据键值key计算hash值得到插入的数组索引i，如果table[i]==null，直接新建节点添加，转向⑥，如果table[i]不为空，转向③；
③.判断table[i]的首个元素是否和key一样，如果相同直接覆盖value，否则转向④，这里的相同指的是hashCode以及equals；
④.判断table[i] 是否为treeNode，即table[i] 是否是红黑树，如果是红黑树，则直接在树中插入键值对，否则转向⑤；
⑤.遍历table[i]，判断链表长度是否大于8，大于8的话把链表转换为红黑树，在红黑树中执行插入操作，否则进行链表的插入操作；遍历过程中若发现key已经存在直接覆盖value即可；
⑥.插入成功后，判断实际存在的键值对数量size是否超多了最大容量threshold，如果超过，进行扩容。

## HashMap为什么使用红黑树替换链表?

当HashMap的链表长度>8时，会把链表转换为红黑树。

原因：开始使用链表，占用空间少，查询性能也相差不大。但是当链表越来越长，查询效率逐渐变低，为保证查询效率才会舍弃链表转为红黑树，以空间换时间。

## 红黑树

红黑树本质上是平衡二叉树。有时不太平衡。

红黑树和平衡二叉树的区别：
* 平衡二叉树的左右子树的高度差绝对值不超过1，但是红黑树在某些时刻可能会超过1，只要符合红黑树的规则即可。
* 平衡二叉树只要不平衡时就会进行旋转，而红黑树不符合规则时，有些情况只用改变颜色不用旋转，就能达到平衡。

红黑树的红黑规则：
1. 每个节点要么是黑色，要么是红色。
2. 根节点是黑色。叶子节点（NIL）也是黑色。
3. 若一个节点是红色的，则它的子节点必须是黑色的。(父子节点不能同时为红色)
4. 从一个节点到该节点的子孙节点的所有路径上包含相同数目的黑节点。

![20221109162317.png](../blog_img/20221109162317.png)
上图中根节点到叶子节点的所有路径都包含3个黑节点。

红黑树使用红黑二色进行“着色”，目的是利用颜色值作为二叉树的平衡对称性的检查，只要插入的节点“着色”满足红黑二色的规定，那么最短路径与最长路径不会相差的太远，红黑树的节点分布就能大体上达至均衡。

## HashMap的常见问题：

>1. HashMap如果有很多相同key，导致链表很长的话，你会怎么优化？或者你会用什么数据结构来存储？针对HashMap中某个Entry链太长，查找的时间复杂度可能达到O(n)，怎么优化？
在jdk1.8中若HashMap中某一下标位置对应的链表长度>8时，会把链表部分转换为红黑树。利用红黑树快速增删改查的特点来提高HashMap的性能。这其中会涉及到红黑树的插入，删除，查找的算法。

>2. HashMap在高并发的情况下会发生什么问题？
会发送扩容问题。在jdk1.8的情况下，<font color="red">HashMap的扩容不是重新计算所有元素在数组中的位置。而是将原来数组的长度扩大为原来的2倍。</font>所有的之前元素的位置不是在原位置就是改变为原位置+2次幂的位置。

>3. HashMap对象的key、value值均可为null（key只能有一个为null，而value则可以有多个为null）？
HashMap在put的时候会调用hash()方法来计算key的hashcode值，当key==null时返回的值为0。因此key为null时，hash算法返回值为0，不会调用key的hashcode方法。之后会把数组中下标为0的元素覆盖。

>4. HashMap是线程安全的吗？
HashMap非线程安全，即任一时刻可以有多个线程同时写HashMap，会导致数据的不一致。<font color="red">如果需要满足线程安全，可以用 Collections的synchronizedMap方法使HashMap具有线程安全的能力，或者使用ConcurrentHashMap。</font>

>5. HashMap的扩容操作是怎么实现的？
HashMap的初始容量为16。扩容是当hashMap中的键值对数量大于阀值时或者初始化时，就调用resize方法进行扩容；每次扩展的时候，都是扩展2倍；扩展后Node节点对象的位置要么在原位置，要么移动到原始位置+增加的数组大小这个位置上。

>6. HashMap是怎么解决哈希冲突的？
1. 使用链地址法（使用散列表）来链接拥有相同hash值的数据；
2. 使用2次扰动函数（hash函数）来降低哈希冲突的概率，使得数据分布更平均；
3. 引入红黑树进一步降低遍历的时间复杂度，使得遍历更快；

>7. HashMap 与 HashTable 的区别？
* 线程安全：HashMap 是非线程安全的，HashTable 是线程安全的；HashTable 内部方法都经过synchronized修饰。
* 性能：HashMap > HashTable
* null: HashMap中null可以作为键值，但只能有一个。Hashtable不允许存入null
* 底层: HashMap和HashTable都是用数组+链表作为底层数据结构的。但是HashMap的链表长度>8时，链表会转换为红黑树。

>8. HashMap的死循环问题？
由于HashMap并非是线程安全的，所以在高并发的情况下必然会出现一个问题。即在并发的情况，当HashMap要扩容时，可能会产生循环链表，在执行get的时候，会触发死循环，引起CPU的100%问题，因此一定要避免在并发环境下使用HashMap。建议并发环境下使用ConcurrentHashMap。

>9. HashMap 和 ConcurrentHashMap 的区别
1. ConcurrentHashMap对整个桶数组进行了分割分段(Segment)，然后在每一个分段上都用lock锁进行保护，而HashMap没有锁机制，不是线程安全的。（JDK1.8之后ConcurrentHashMap启了一种全新的方式实现,利用CAS算法。）
2. HashMap的键值对允许有null，但是ConCurrentHashMap都不允许。