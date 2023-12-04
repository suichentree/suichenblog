---
title: JavaScript基础
date: 2016-04-12
sidebar: 'auto'
categories: 
 - 前端
tags:
 - JavaScript
---

[toc]

## JavaScript基础

## 概述：
JavaScript是世界上最流行的脚本语言，因为你在电脑、手机、平板上浏览的所有的网页，以及无数基于HTML5的手机App，交互逻辑都是由JavaScript驱动的。<font color="red">简单地说，JavaScript是一种运行在浏览器中的解释型的编程语言。</font>

>JS的特性：
1. JavaScript 是脚本语言
2. JavaScript 是一种轻量级的编程语言。
3. JavaScript 是可插入 HTML 页面的编程代码。
4. JavaScript 插入 HTML 页面后，可由所有的现代浏览器执行。

## 1.js代码的三种使用方式：

**理论上JavaScript代码可以直接嵌在网页的任何地方,JS代码一般写在`<script>`标签中**

```html
<script>   
  ...//这里编写js代码
</script>
```

>方式1.放置于`<head></head>`标签之间:

```html
<html>
<head>
  <script>
    alert('Hello, world');  //JS代码将直接被浏览器执行
  </script>
</head>
<body>
  ...
</body>
</html>
```

![2.png](../blog_img/js_img_2.png)

> 方式2. 放置于`<body></body>`标签之间:

```html
<html>
<head>
</head> 
<body> 

<script> 
....            //这里编写js代码
</script> 

</body> 
</html>

```

>方式3. 把JavaScript代码放到一个单独的.js文件，然后在HTML中引入这个文件：

把JavaScript代码放入一个单独的.js文件中更利于维护代码，并且可以多个页面可以各自引用同一份js文件。

```html
<html>
<head>
  <script src="/static/js/abc.js"></script>  

  <!--   在head 标签中使用script标签引用-->
</head>
<body>
  ...
</body>
</html>
```

![1.png](../blog_img/js_img_1.png)

> PS

![3.png](../blog_img/js_img_3.png)

注意: <font color="blue">浏览器解释html时是按先后顺序的，所以前面的script就先被执行。比如进行页面显示初始化的js必须放在head里面，因为初始化都要求提前进行（如给页面body设置css等）；而如果是通过事件调用执行的function那么对位置没什么要求的。</font>


## 2.基础知识：

>①JS变量是弱类型的

JavaScript是一门弱类型语言。因此变量声明不需要指定类型。变量赋值时会自动判断类型并进行转换。

```js
var a="str";     //a为字符串类型
var b=3;         //b为整型
```

>② 使用 var 来声明变量

```js
var x = 1;   //每个语句用';'表示语句结束：

```

> ③ JS区分大小写

```js
var num=1;    //这是两个变量
var Num=2;
```

## 3. 注释(单行注释，多行注释)

以`//`开头直到行末的字符被视为行注释，注释是给开发人员看到，JavaScript引擎会自动忽略：

```js
// 这是单行注释
alert('hello'); // 这也是单行注释

/* 从这里开始是多行注释
仍然是注释
仍然是注释
注释结束 */
```

## 4. 声明变量与常量

### 1.声明变量

> JS使用 var 来声明变量

```js
var a;  // 申明了变量a，此时a的值为undefined
var $b = 1; // 申明了变量$b，同时给$b赋值，此时$b的值为1
var s_007 = '007'; // s_007是一个字符串
var Answer = true; // Answer是一个布尔值true
var t = null; // t的值是null

var y = 1;   
var y = 2;   
console.log(y);   //打印为2，后声明的同名变量会覆盖先声明的变量
```

**如果没有给变量赋值，那么系统会自动为其赋值为undefined。后声明的同名变量会覆盖先声明的变量**

> ①：变量不仅可以是数字，还可以是任意数据类型。
> ②：变量名是大小写英文、数字、$和_的组合，且不能用数字开头。<font color="red">变量名也不能是JavaScript的关键字，如if、while等.</font>

**图片是JS中的关键字**

![4.png](../blog_img/js_img_4.png)

### 2.声明常量

ES6标准引入了新的关键字const来定义常量：
```js
//通常用全部大写的变量来表示“这是一个常量，不要修改它的值”
const PI = 3.14;
PI = 3; // 某些浏览器不报错，但是无效果！
alert(PI); // 3.14

```


## 3. 数据类型

JavaScript中有两大类数据类型:分别为值类型与引用类型:

>值类型

String、Number、Boolean、Symbol（ES2015新增）、null和undefined。

>引用类型:

引用类型都是Object或者其子类（ES2015新增类的概念），比如Date，Array,Math和RegExp等。

### 1.值类型

#### 1.Number

<font color="red">此类型表示整型和浮点型数字,Infinity和特殊的NaN。</font>

```js
var q=12;          //整型
var w=23.1;        //浮点型
var e=1.2345e3;    //极大或极小的数字可以通过科学（指数）计数法来表示
var r=-99;          // 负数

NaN; // NaN表示Not a Number，当无法计算结果时用NaN表示
Infinity; // Infinity表示无限大，当数值超过了JavaScript的Number所能表示的最大值时，就表示为Infinity
```

NaN的特点:
1.任何NaN参与的操作返回值都是NaN。
2.任何值和NaN都不相等，甚至和其本身都不相等。```console.log(NaN==NaN);  //false```
3.isNaN()方法可以判断一个值是否是数值类型，

#### 2.Boolean

该类型只有两个值，false和true。

```js
true; // 这是一个true值
false; // 这是一个false值
2 > 1; // 这是一个true值
2 >= 3; // 这是一个false值
7 == 7; // true
```

**其他类型转化boolean类型的转化规则：**

![5](../blog_img/js_img_5.png)


#### 3.String

字符串类型可以使用单引号或者双引号包裹形成。

```js
var name1 = "xiaoming";
var name2 = 'xiaoming';
```

#### 4.undefined类型

此类型只有一个值，即undefined。当一个变量声明但未赋值的时候，它的缺省值就是undefined。

```js
var a;  // 申明了变量a，此时a的值为undefined
```

#### 5.Null类型

null表示一个空对象.如果我们声明一个变量用来保存对象，那么可以将此变量设置缺省值为null.

#### 6.undefined与null区别

>undefined通常是指未初始化变量的值

```js
var num;
console.log(num);    //num为undefined
```

>null通常用来标识一个空对象


### 2.引用类型

引用类型都是Object。比如Date，Array,Math和RegExp等。在其他地方介绍。

## 4.字符串的使用：

<font color="red">注意：字符串一旦创建，值不可更改</font>

>①字符串拼接 

```js
console.log("小明"+"你好");   //用+号连接把多个字符串连接起来
var name = '小明';
var age = 20;
var message = `你好, ${name}, 你今年${age}岁了!`;
```

**ES6新增了一种方法`${变量}`。它会自动替换字符串中的变量**

>②字符串与非字符串数据拼接

```js
console.log(5+"5");   //结果为 55
```

首先会将数字转换为字符串，然后再进行拼接操作。

>③：操作字符串：
1. 获取字符串长度（length 属性）：

```js
var s = 'Hello, world!';
s.length; // 13
```

2. 要获取字符串某个指定位置的字符，使用类似Array的下标操作，索引号从0开始：

```js
var s = 'Hello, world!';

s[0]; // 'H'
s[6]; // ' '
s[7]; // 'w'
s[12]; // '!'
s[13]; // undefined 超出范围的索引不会报错，但一律返回undefined
```

3. toUpperCase()把一个字符串全部变为大写：

```js
var s = 'Hello';
s.toUpperCase(); // 返回'HELLO'
```

4. toLowerCase()把一个字符串全部变为小写：
```js
var s = 'Hello';
var lower = s.toLowerCase(); // 返回'hello'并赋值给变量lower
lower; // 'hello'
```

5. indexOf()会搜索指定字符串出现的位置：
```js
var s = 'hello, world';
s.indexOf('world'); // 返回7
s.indexOf('World'); // 没有找到指定的子串，返回-1
```

6. substring()返回指定索引区间的子串：
```js
var s = 'hello, world'
s.substring(0, 5); // 从索引0开始到5（不包括5），返回'hello'
s.substring(7); // 从索引7开始到结束，返回'world'
```

## 5. JS转义字符

转义字符 | 含义
 ------ | ------ 
\n      |      	换行            
\t      |     	制表符            
\b      |    	退格符            
\r      |    	回车            
\f      |    	换页符            
`\\`      |    	反斜杠            
\'      |    	单引号            
\"      |    	双引号            


## 6.运算符

### 1.&&，||，! 运算符

```js
/* &&运算是与运算，只有所有都为true，&&运算结果才是true */
true && true; // 这个&&语句计算结果为true
true && false; // 这个&&语句计算结果为false
false && true && false; // 这个&&语句计算结果为false

/* ||运算是或运算，只要其中有一个为true，||运算结果就是true  */
false || false; // 这个||语句计算结果为false
true || false; // 这个||语句计算结果为true
false || true || false; // 这个||语句计算结果为true

/* !运算是非运算，它是一个单目运算符，把true变成false，false变成true */
! true; // 结果为false
! false; // 结果为true
! (2 > 5); // 结果为true

```

### 2.== 与 ===运算符

```js
false == 0; // true，false会转换为整数类型0
false === 0; // false
```

<font color="red">注意：</font>
 `==`与`===`：
> `==`比较，**它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果**.
> `===`比较，**它不会自动转换数据类型，如果数据类型不一致，返回false，如果一致，再比较。**

### 3. typeof 运算符

typeof 运算符可以判断数据类型。

```js
console.log(typeof 5);            //number
console.log(typeof "xiaoming");   //string
console.log(typeof []);          //object
console.log(typeof null);       //null
console.log(typeof undefined);  //undefined
console.log(typeof {});            //object          
```

## 7.语句

### 1. if语句

例如，下面的代码先做了一个判断：

```js
var age = 20;

if (age >= 18) { // 如果age >= 18为true，则执行if语句块
    alert('adult');
} else { // 否则执行else语句块
    alert('teenager');
}

//{...}还可以嵌套，形成层级结构：

var age = 3;
if (age >= 18) {
    alert('adult');
} else {
    if (age >= 6) {
        alert('teenager');
    } else {
        alert('kid');
    }
}
```

### 2. 循环语句

>1. for循环：

```js
/*
i=1 这是初始条件，将变量i置为1；
i<=10000 这是判断条件，满足时就继续循环，不满足就退出循环；
i++ 这是每次循环后的递增条件，由于每次循环后变量i都会加1
*/

var x = 0;
var i;
for (i=1; i<=10000; i++) {
    x = x + i;
    if(x=1000){
       break; // 通过if判断来退出循环
    }
}
x; // 50005000

```

>2. for ... in循环：**它可以把一个对象的所有属性依次循环出来**

```js
var o = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
};

for (var key in o) {
    console.log(key); // 'name', 'age', 'city'
}
//要过滤掉对象继承的属性，用hasOwnProperty()来实现：

var o = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
};
for (var key in o) {
    if (o.hasOwnProperty(key)) {
        console.log(key); // 'name', 'age', 'city'
    }
}

//由于Array也是对象，而它的每个元素的索引被视为对象的属性，因此，for ... in循环可以直接循环出Array的索引：

var a = ['A', 'B', 'C'];
for (var i in a) {
    console.log(i); // '0', '1', '2'
    console.log(a[i]); // 'A', 'B', 'C'
}
//请注意，for ... in对Array的循环得到的是String而不是Number。
```

>3. while

<font color="red">while循环只有一个判断条件，条件满足，就不断循环，条件不满足时则退出循环。</font>
比如我们要计算100以内所有奇数之和，可以用while循环实现：

```js
var x = 0;
var n = 99;
while (n > 0) {
    x = x + n;
    n = n - 2;
}
x; // 2500
在循环内部变量n不断自减，直到变为-1时，不再满足while条件，循环退出。
```


>4. do ... while

do { ... } while()循环，它和while循环的唯一区别在于，不是在每次循环开始的时候判断条件，而是在每次循环完成的时候判断条件：

```js
var n = 0;
do {
    n = n + 1;
} while (n < 100);
n; // 100
//用do { ... } while()循环要小心，循环体会至少执行1次，而for和while循环则可能一次都不执行。

```

### 3.switch

switch是流程控制语句,可以根据条件来执行指定的语句。

```js
switch(表达式){
  case 表达式一:
    代码语句
    break;     
  case 表达式二:
    代码语句
    break; 
  case 表达式三:
    代码语句
    break; 
  default:
    代码语句
}
```

**若某个case相关联的代码没有break语句，那么执行它后面的所有case（包括default）相关联的代码直到遇到break语句，即便case后面的表达式条件不成立也无妨。。**

### 4.try catch finally 语句

try...catch...finally语句能够处理指定代码错误，并且能够保证代码正常运行。

```js
try{
  //此语句从第一行开始执行，如果遇到错误（抛出异常），该代码块就会结束执行
}
catch(e){
  //如果try语句块遇到错误（抛出异常），此语句块就会得到执行
  //e是一个对象，含有与异常相关的信息
}
finally{
  //无论try中代码是否有异常抛出，finally代码块中始终会被执行。
}
```

**catch(){}和finally{}可以有多个同时存在**


## 8.对象

### 1.自定义对象

JavaScript的对象是一组由键-值组成的无序集合

例如
```js
var person = {
    name: 'Bob',
    age: 20,
    tags: ['js', 'web', 'mobile'],
    city: 'Beijing',
    hasCar: true,
    zipcode: null
};
```
JavaScript对象的键都是字符串类型，值可以是任意数据类型。

用对象变量.属性名的方式,要获取一个对象的属性：
```js
person.name; // 'Bob'
person.zipcode; // null
```

#### 1.对象的属性,方法

 属性名称 | 描述
 ------ | ------ 
constructor	| 返回创建当前对象的构造函数。
prototype  | 设置或返回数组的原型对象。

 方法名称 | 描述
 ------ | ------ 
Object.create()  |	创建一个具有指定原型和指定属性的对象。
Object.defineProperties()	| 可以一次性为对象修改或者添加多个属性。
Object.defineProperty()	| 可以将指定属性添加到对象或修改现有属性的特性。
Object.freeze()	| 冻结一个对象。
Object.getOwnPropertyDescriptor() 	|  获取对象的指定属性描述。
Object.getOwnPropertyNames() | 获取对象的属性名称
Object.getPrototypeOf()	| 返回创建当前对象的构造函数。
Object.isExtensible()  |  判断是否能够向一个对象添加属性。
Object.isFrozen()  |  判断是否无法在对象中修改现有属性的特性和值，且无法向对象添加新属性
Object.isSealed()  |  判断一个对象是否被密封。
Object.keys()	|  返回对象的可枚举属性或者方法名称。
Object.preventExtensions()	|  阻止向对象添加新的属性，也就是阻止扩展对象。
Object.prototype.hasOwnProperty()	|  判断对象是否拥有指定的属性。
Object.prototype.isPrototypeOf()  |	判断一个对象是否在另一个对象的原型链中。
Object.prototype.propertyIsEnumerable()	|  检测一个对象的属性是否可以被枚举。
Object.seal()	|  把对象密封，也就是让对象既不可以拓展也不可以删除属性。


### 2.JS写好的其他对象

#### 1. new Array()，数组包装对象

**数组是一组按顺序排列的集合，集合的每个值称为元素。JavaScript的数组可以包括任意数据类型。**

例如：
`[1, 2, 3.14, 'Hello', null, true];`
上述数组包含6个元素。数组用[]表示，元素之间用,分隔。

另一种创建数组的方法是通过Array()函数实现：
`new Array(1, 2, 3); // 创建了数组[1, 2, 3]`

数组的元素可以通过索引来访问。请注意，索引的起始值为0：
```js
var arr = [1, 2, 3.14, 'Hello', null, true];
arr[0]; // 返回索引为0的元素，即1
arr[5]; // 返回索引为5的元素，即true
arr[6]; // 索引超出了范围，返回undefined
```

##### 1.数组的使用

1. 数组长度

```js
var arr = [1, 2, 3.14, 'Hello', null, true];
arr.length; // length获取数组长度


var arr = [1, 2, 3];
arr.length; // 3
arr.length = 6;           //修改length的大小，也会改变数组长度
arr; // arr变为[1, 2, 3, undefined, undefined, undefined]
arr.length = 2;
arr; // arr变为[1, 2]

//Array可以通过索引把对应的元素修改为新的值，因此，对Array的索引进行赋值会直接修改这个Array：

var arr = ['A', 'B', 'C'];
arr[1] = 99;
arr; // arr现在变为['A', 99, 'C']
//请注意，如果通过索引赋值时，索引超过了范围，同样会引起Array大小的变化：

var arr = [1, 2, 3];
arr[5] = 'x';
arr; // arr变为[1, 2, 3, undefined, undefined, 'x']

```
<font color="red">在编写代码时，不建议直接修改Array的大小，访问索引时要确保索引不会越界。</font>


2. indexOf,返回数组某个元素的索引
```js
//与String类似，Array也可以通过indexOf()来搜索一个指定的元素的位置：

var arr = [10, 20, '30', 'xyz'];
arr.indexOf(10); // 元素10的索引为0
arr.indexOf(20); // 元素20的索引为1
arr.indexOf(30); // 元素30没有找到，返回-1
arr.indexOf('30'); // 元素'30'的索引为2

//注意了，数字30和字符串'30'是不同的元素。
```

3. slice
```js
//slice(),它截取Array的部分元素，然后返回一个新的Array：

var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(0, 3); // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']
arr.slice(3); // 从索引3开始到结束: ['D', 'E', 'F', 'G']
//注意到slice()的起止参数包括开始索引，不包括结束索引。

//如果不给slice()传递任何参数，它就会从头到尾截取所有元素。利用这一点，我们可以很容易地复制一个Array

var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var aCopy = arr.slice();
aCopy; // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
aCopy === arr; // false
```

4. push和pop
```js
//push()向Array的末尾添加若干元素，pop()则把Array的最后一个元素删除掉：

var arr = [1, 2];
arr.push('A', 'B'); // 返回Array新的长度: 4
arr; // [1, 2, 'A', 'B']
arr.pop(); // pop()返回'B'
arr; // [1, 2, 'A']
arr.pop(); arr.pop(); arr.pop(); // 连续pop 3次
arr; // []
arr.pop(); // 空数组继续pop不会报错，而是返回undefined
arr; // []
```

5. unshift和shift和sort
```js
//如果要往Array的头部添加若干元素，使用unshift()方法，
//shift()方法则把Array的第一个元素删掉：

var arr = [1, 2];
arr.unshift('A', 'B'); // 返回Array新的长度: 4
arr; // ['A', 'B', 1, 2]
arr.shift(); // 'A'
arr; // ['B', 1, 2]
arr.shift(); arr.shift(); arr.shift(); // 连续shift 3次
arr; // []
arr.shift(); // 空数组继续shift不会报错，而是返回undefined
arr; // []

//sort()可以对当前Array进行排序，它会直接修改当前Array的元素位置，直接调用时，按照默认顺序排序：
var arr = ['B', 'C', 'A'];
arr.sort();
arr; // ['A', 'B', 'C']
//能否按照我们自己指定的顺序排序呢？完全可以，我们将在后面的函数中讲到。
```

6. 多维数组

如果数组的某个元素又是一个Array，则可以形成多维数组.
例如：
```js
var arr = [[1, 2, 3], [400, 500, 600], '-'];
//上述Array包含3个元素，其中头两个元素本身也是Array。
```

##### 2.数组的常用属性,方法

 属性名称 | 描述
 ------ | ------ 
constructor  | 返回创建当前数组的构造函数。
length | 设置或返回数组中元素的数目。
Prototype | 设置或返回数组的原型对象。


 方法名称 | 描述
 ------ | ------ 
Array.isArray() |	判断参数是否是一个数组。
concat()       |     	创建一个具有指定原型和指定属性的对象。
every()  |  确定数组的所有成员是否满足指定的规则。
filter()  | 返回数组中的满足回调函数中指定的条件的元素。
forEach()  |  为数组中的每个元素执行指定操作。
join()  |   把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
indexOf()  |  返回某个值在数组中的第一个匹配项的索引。
lastIndexOf() |  	返回指定值在数组中的最后一个匹配项的索引。
map()  |  对数组的每个元素调用定义的回调函数并返回包含结果的数组。
pop()   |  删除并返回数组的最后一个元素。
push()    |  向数组的末尾添加一个或更多元素，并返回新的长度。
shift()   |    删除并返回数组的第一个元素。
unshift()    |    	向数组的开头添加一个或更多元素，并返回新的长度。
reverse()  |   颠倒数组中元素的顺序。
reduce()  |   对数组中的所有元素调用指定的回调函数。 该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供。
reduceRight()   |  按降序顺序对数组中的所有元素调用指定的回调函数。 该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供。
slice()  |   从某个已有的数组返回选定的元素。
sort()    |   对数组的元素进行排序。
splice()   |  删除元素，并向数组添加新元素。
some()      |    	确定指定的回调函数是否为数组中的任何元素均返回true。
toString()    |   把数组转换为字符串，并返回结果。

---

#### 2. new String(),字符串包装对象

**字符串可以用单引号或者双引号包裹,也可以使用String构造函数创建字符串对象**

```js
var str1= "xiaoming";
var str2=new String("xiaoming");
```

**字符串对象常用的属性和方法**

属性名称 | 描述
 ------ | ------ 
constructor  | 返回创建当前数组的构造函数。
length | 设置或返回数组中元素的数目。
Prototype | 设置或返回数组的原型对象。


 方法名称 | 描述
 ------ | ------ 
charAt()    |   返回指定位置的字符。
charCodeAt()    |  返回字符串中指定位置字符的Unicode编码。
concat() |  合并字符串，并返回合并后的结果。
fromCharCode()	| 接受一个或多个Unicode值，并返回这些Unicode值对应的字符组成的字符串。
indexOf()   | 返回指定的字符串在字符串中首次出现的位置。
lastIndexOf()	|  返回指定的字符串在字符串中最后出现的位置。
match()	| 在字符串内检索指定的字符串，或找到一个或多个正则表达式匹配字符串。
localeCompare()	| 用本地特定的顺序来比较两个字符串。
replace()    	|  将字符串中的子字符串用指定的字符串替换,并返回新产生的字符串。
search()	    |  检索字符串中指定的子字符串。
slice()        	| 截取字符串中的一段，并返回由被截取字符组成的新字符串。
split()	        | 利用字符串的子字符串的作为分隔符将字符串分割为字符串数组，并返回此数组。
substr()	|   在字符串中从指定位置开始截取指定长度的字符串。          
substring()	|  截取字符串中介于两个指定位置之间的字符。
toLocaleLowerCase()	|  用本地方式把字符串转换为小写。
toLocaleUpperCase()	|  用本地方式把字符串转换为大写。
toLowerCase()	|  将字符串转换为小写，并返回一个新的字符串。       
toUpperCase()   |  将字符串转换为大写，并返回一个新的字符串。
trim()	        |  删除字符串两端的空格。


#### 3. new Number(),number包装对象

```js
var n = new Number(5);    //把5变成一个包装对象
```

**number包装对象常用的属性和方法**

属性名称 | 描述
 ------ | ------ 
constructor   	|  返回对创建此对象的 Number函数的引用。
Number.MAX_VALUE  |  可表示的最大的数。
Number.MIN_VALUE  |	可表示的最小的数。
Number.NaN 	|  非数字值。
Number.ATIVE_INFINITY  	| 负无穷大，溢出时返回该值。
Number.POSITIVE_INFINITY  	|  正无穷大，溢出时返回该值。
prototype 	|  设置或返回原型对象。


 方法名称 | 描述
 ------ | ------ 
toString()   	|  把数字转换为字符串，使用指定的基数。
toLocaleString()   	|  把数字转换为字符串，使用本地数字格式顺序。
toFixed()     	|  把数字转换为字符串，结果的小数点后有指定位数的数字。
toExponential()	| 把对象的值转换为指数计数法。
toPrecision()  |  把数字格式化为指定的长度。


#### 4.Date 对象

通过构造函数Date可以创建一个时间日期对象。

```js
var date = new Date();

//这些是Date对象不同的构造函数
new Date(milliseconds);  //milliseconds是时间戳，new Date(1488561742509);
new Date(datestring);     //datestring时间日期字符，2017/8/20 18:20:30 或者 2017-8-20 18:20:30
new Date(year, month);
new Date(year, month, day);
new Date(year, month, day, hours);
new Date(year, month, day, hours, minutes);
new Date(year, month, day, hours, minutes, seconds);
new Date(year, month, day, hours, minutes, seconds, microseconds);

/*
year，是一个整数，如果是0-99，那么在此基础上加1900，其他的都原样返回。
month,是一个整数，范围是0-11。
day，是一个整数，范围是1-31。
hours，是一个整数，范围是0-23。
minutes，是一个整数，范围是0-59。
seconds，是一个整数，范围是0-59.
*/
```

**Date对象常用的属性和方法**

属性名称 | 描述
 ------ | ------ 
constructor   	|  返回创建时间日期对象的构造函数。
prototype 	|  设置或返回原型对象。


 方法名称 | 描述
 ------ | ------ 
Date() 	| 返回当前时间和日期。
getDate() 	| 此方法返回服务器当前日期的天。
getDay() 	| 返回服务器当前日期的周。
getMonth()	| 返回服务器当前日期的月。
getFullYear() 	| 返回服务器当前日期的年。
getYear()    	| 返回表示年份的两位或四位的数字。
getHours()     |  返回时间的小时部分。
getMinutes()   |  返回时间的分钟部分。
getSeconds()  |  返回时间的秒部分。
getMilliseconds()	|  返回时间的毫秒部分。
getTime()     |   返回当前时间距1970年1月1日之间的毫秒数。
getTimezoneOffset()  |  返回格林威治时间和本地时间之间的时差。
getUTCDate()	|  返回世界标准时间的一个月中的某一天。
getUTCDay()  |	返回世界时间的一周中的一天。
getUTCMonth()	|  返回世界时间的表示月份的数字。
getUTCFullYear()  |	返回世界标准时间表示的四位数来代表年份。
getUTCHours() 	| 返回值是世界标准时间表示的小时。
getUTCMinutes()	| 返回世界标准时间表示时间的分钟。
getUTCSeconds()  |  返回世界标准时间表示时间的秒。
getUTCMilliseconds()  |  返回世界标准时间表示时间的毫秒。
Date.parse()  |  可以解析指定时间日期字符串，并返回此日期距1970/1/1午夜的毫秒数
setDate()       |  设置月份中的天。
setMonth() 	|  设置月份，并返回日期的毫秒表示。
setFullYear()     |  设置年份，并返回日期的毫秒表示。
setYear()      |  设置年份，并返回日期的毫秒表示。
setHours() 	| 设定时间的小时字段，并返回日期的毫秒表示。
setMinutes()    | 设置时间的分钟字段，并返回日期的毫秒表示。
setSeconds()    |  设置时间的秒字段，并返回日期的毫秒表示。
setMilliseconds()   |  设置指定时间的毫秒字段，并返回日期的毫秒表示。
setTime()	| 以毫秒设置日期和时间。
setUTCDate()	| 设置用世界标准时间表示的月份中的一天。
setUTCMonth()     |  设置用世界标准时间表示的月份和天。
setUTCFullYear() | 设置用世界标准时间表示的年份、月份和天。
setUTCHours() |  	设置用世界标准时间表示的小时、分钟、秒和毫秒。
setUTCMinutes()	| 设置用世界标准时间表示的分钟、秒和毫秒。
setUTCSeconds() 	|  设置用世界标准时间表示的秒和毫秒。
setUTCMilliseconds()  | 	设置用世界标准时间表示的毫秒数。
toTimeString()    |  把Date对象的时间部分转换为字符串，并返回此字符串。
toDateString()   |  把Date对象的日期部分转换成字符串，并返回此字符串。
toGMTString()     |	可根据格林威治时间 (GMT) 把Date对象转换为字符串，并返此字符串。
toUTCString()  |  把Date对象转换成世界标准时间形式的字符串，并返回该字符串。
toLocaleString()   |  根据本地时间把 Date 对象转换为字符串，并返此字符串。
toLocaleTimeString()  |	根据本地时间把 Date 对象的时间部分转换为字符串，并返回此字符串。
toLocaleDateString() | 根据本地时间把 Date 对象的日期部分转换为字符串，并返回此字符串。
Date.UTC() |  根据世界时返回1970年1月1日到指定日期的毫秒数。
valueOf() 	|  返回Date对象的原始值。


#### 5.new Boolean()，Boolean包装对象

可以通过构造函数构建它们对应的Boolean对象。

```js
var s=new Boolean(value);
```

**Boolean对象常用的属性和方法**

属性名称 | 描述
 ------ | ------ 
constructor   	|  返回对创建此对象的 Boolean函数的引用。
prototype 	|  设置或返回原型对象。


 方法名称 | 描述
 ------ | ------ 
toString()	|  把逻辑值转换为字符串，并返回结果。
valueOf()	|  返回 Boolean对象的原始值。


#### 6. Math 对象

```js
var math = new Math();
math.abs(-4);
```

**Math对象常用的属性和方法**

属性名称 | 描述
 ------ | ------ 
Math.E	    | 返回算术常量e，即自然对数的底数（约等于2.718）。
Math.LN2	|  返回2的自然对数（约等于0.693）。
Math.LN10	| 返回10的自然对数（约等于2.302）。
Math.LOG2E	| 返回以2为底的e的对数（约等于 1.414）。
Math.LOG10E	| 返回以10为底的e的对数（约等于0.434）。
Math.PI	    | 返回圆周率（约等于3.14159）。
Math.SQRT1_2 | 	返回返回2的平方根的倒数（约等于0.707）。
Math.SQRT2	| 返回2的平方根（约等于1.414）。


 方法名称 | 描述
 ------ | ------ 
Math.abs(x)	    | 返回数的绝对值。
Math.acos(x)	| 返回数的反余弦值。
Math.asin(x)	| 返回数的反正弦值。
Math.atan(x)	| 以介于-PI/2与PI/2弧度之间的数值来返回x的反正切值。
Math.atan2(y,x)	| 返回从x轴到点(x,y) 的角度（介于-PI/2 与 PI/2 弧度之间）。
Math.ceil(x)	| 对数字进行舍入。
Math.cos(x)	    | 返回一个数字的余弦。
Math.exp(x)	    | 返回e的指数。
Math.floor(x)	| 对一个数字进行下舍入。
Math.log(x)	    | 返回一个数的自然对数。
Math.max(x,y)	| 返回指定的数中较大的一个。
Math.min(x,y)	| 返回指定数字中较小的一个。
Math.pow(x,y) 	| 返回x的y次幂的值。
Math.random()	| 返回介于 0 ~ 1 之间的一个随机数。
Math.round(x)	| 把一个数字舍入为最接近的整数。
Math.sin(x)	    | 返回一个数字的正弦。
Math.sqrt(x)	| 返回一个数的平方根。
Math.tan(x)	    | 返回一个数的正切。


#### 7.window 全局对象

JavaScript默认有一个全局对象window，调用该对象方法属性时，可以省略window不写。

```js
var course = 'Learn JavaScript';
alert(course);             // 'Learn JavaScript'
alert(window.course);      // 'Learn JavaScript'
//因此，直接访问全局变量course和访问window.course是完全一样的。

function foo() {
    alert('foo');
}

foo(); // 直接调用foo()
window.foo(); // 通过window.foo()调用
```

<font color="red">JavaScript实际上只有一个全局作用域。任何变量（函数也视为变量），如果没有在当前函数作用域中找到，就会继续往上查找，最后如果在全局作用域中（window中）也没有找到，则报ReferenceError错误。</font>

**window对象常用的属性和方法**

属性名称 | 描述
 ------ | ------ 
Infinity	| 代表正的无穷大的数值。
NaN	| 指示某个值是不是数字值。
undefined | 指示未定义的值。

方法名称 | 描述
 ------ | ------ 
Boolean()	| 将参数解析为布尔值。
decodeURI()	| 解码编码的URI。
decodeURIComponent()	 | 对encodeURIComponent() 函数编码的URI进行解码。
encodeURI()	| 把字符串作为URI 进行编码。
encodeURIComponent()	| 把字符串作为URI组件进行编码。
escape()	| 对字符串进行编码，这样就可以在所有的计算机上读取该字符串。
eval()	|  执行由JavaScript代码组成的字符串，并返回计算得到的值（如果有）。
isFinite()	| 检测一个数值是否是无穷大。
isNaN()	| 检测其参数是否为非数值类型。
Number()	| 把参数转换为数字,并返回此数字。
parseFloat()	| 解析一个字符串，并返回一个浮点数。
parseInt()	| 解析一个字符串，并返回一个整数。
String()	 | 把参数转换为字符串。
unescape()	| 可解码通过escape()编码后的字符串。

##### 1.命名空间

全局变量都会绑定到window上，不同的JavaScript文件如果使用了相同的全局变量，或者定义了相同命名空间的顶层函数，都会造成命名冲突，并且很难被发现。

<font color="red">减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。</font>

例如：
```js
// 唯一的全局变量MYAPP:   
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};

//把自己的代码全部放入唯一的命名空间MYAPP中，会大大减少全局变量冲突的可能。
//许多著名的JavaScript库都是这么干的：jQuery，YUI，underscore等等。
```


#### 8.Map和Set 对象

##### 1. Map
<font color="red">Map是一组键值对的结构，具有极快的查找速度。</font>

```js
//初始化Map需要一个二维数组，或者直接初始化一个空Map。Map具有以下方法：

var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
m.get('Michael'); // 95

var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined

//由于一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉：

var m = new Map();
m.set('Adam', 67);
m.set('Adam', 88);
m.get('Adam'); // 88

```
##### 2. Set

<font color="red">Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。</font>

```js
要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set：

var s1 = new Set(); // 空Set
var s2 = new Set([1, 2, 3]); // 含1, 2, 3
//重复元素在Set中自动被过滤：

var s = new Set([1, 2, 3, 3, '3']);
s; // Set {1, 2, 3, "3"}
//注意数字3和字符串'3'是不同的元素。

//通过add(key)方法可以添加元素到Set中，可以重复添加，但不会有效果：
s.add(4);
s; // Set {1, 2, 3, 4}
s.add(4);
s; // 仍然是 Set {1, 2, 3, 4}
//通过delete(key)方法可以删除元素：

var s = new Set([1, 2, 3]);
s; // Set {1, 2, 3}
s.delete(3);
s; // Set {1, 2}
```


##### 3.iterable

遍历Array可以采用下标循环，遍历Map和Set就无法使用下标。ES6标准引入了新的iterable类型，Array、Map和Set都属于iterable类型。
具有iterable类型的集合可以通过新的for ... of循环来遍历。

用for ... of循环遍历集合，用法如下：
```js
var a = ['A', 'B', 'C'];
var s = new Set(['A', 'B', 'C']);
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
for (var x of a) { // 遍历Array
    console.log(x);
}
for (var x of s) { // 遍历Set
    console.log(x);
}
for (var x of m) { // 遍历Map
    console.log(x[0] + '=' + x[1]);
}

```

## 9.函数：

函数是完成某个特定功能的一组语句。

### 1.函数的定义与调用：

```js
function 函数名(函数形参)      //function是定义函数的关键字
{
     函数代码;
}
//==========================
function func(a,b){
  var num=a+b;
  return num;
}
console.log(func(1,2));    //函数的调用,打印3
```
<font color="red">注意：函数体内部的语句在执行时，一旦执行到return时，函数就执行完毕，并将结果返回。</font>


### 2. 匿名函数 

**JavaScript的函数也可以看作一个对象**，函数名可以视为指向该函数的变量。

```js
var abs = function (x) {    //这是一个匿名函数
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
};

var qwe=function(y){.....};   //匿名函数,需要在函数体末尾加一个;表示赋值语句结束。
qwe("xiaoming");              //匿名函数的调用
```

<h4>匿名函数的自己调用方式</h4>

下面三个方式都可以实现匿名函数立即执行效果

```js
// !运算符
!function(webName){
  console.log(webName);
}("xiaoming")

// +运算符
+function(webName){
  console.log(webName);
}("xiaoming")

// 分组运算符
(function(webName){
  console.log(webName);
})("xiaoming")

```

### 3.函数作用域(原则：由内到外)：

> 1. 如果一个变量在函数体内部申明，则该变量的作用域为整个函数体，在函数体外不可引用该变量
> 2. 不同函数内部的同名变量互相独立，互不影响：
> 3. <font color="red">内部函数可以访问外部函数定义的变量，反过来则不行</font>
> 4. 如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量.互不相干。

```js
function foo() {
    var x = 1;
    x = x + 1;
}

x = x + 2; // ReferenceError! 无法在函数体外引用变量x
//不同函数内部的同名变量互相独立，互不影响：
function foo() {
    var x = 1;
    x = x + 1;
}
function bar() {
    var x = 'A';
    x = x + 'B';
}
//由于JavaScript的函数可以嵌套，此时，内部函数可以访问外部函数定义的变量，反过来则不行：
function foo() {
    var x = 1;
    function bar() {
        var y = x + 1; // bar可以访问foo的变量x!
    }
    var z = y + 1; // ReferenceError! foo不可以访问bar的变量y!
}
//如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量.互不相干。
function foo() {
    var x = 1;
    function bar() {
        var x = 'A';
        console.log('x in bar() = ' + x); // 'A'
    }
    console.log('x in foo() = ' + x); // 1
    bar();
}
foo();     //x in foo() = 1 ，x in bar() = A
```

### 4.对象中的方法（对象中的函数）

在一个对象中绑定函数，称为这个对象的方法。

对象的定义是这样的：
```js
var xiaoming = {
    name: '小明',
    birth: 1990
};
//写个age()方法，返回xiaoming的年龄：
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};
 
xiaoming.age;    // function xiaoming.age()
xiaoming.age(); // 今年调用是25,明年调用就变成26了

```

**注意：**
<font color="blue">this:它是一个特殊变量，它始终指向当前对象，也就是xiaoming这个变量。所以，this.birth可以拿到xiaoming的birth属性.</font>


#### 1. 如果把对象的方法写在对象外面

```js
function getAge() {        
    var y = new Date().getFullYear();
    return y - this.birth;
}
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge               
};

xiaoming.age(); // 25, 正常结果
getAge(); // NaN     
/*
getAge(); 的结果为什么是 NaN

1. 如果以对象的方法形式调用，比如xiaoming.age()，该函数的this指向被调用的对象，也就是xiaoming，这是符合我们预期的。
2. 如果单独调用函数，比如getAge()，此时，该函数的this指向全局对象，也就是window。
*/
```

#### 2. 如果在对象的方法里面定义函数：

```js
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        function getAgeFromBirth() {      //在方法的里面定义函数
            var y = new Date().getFullYear();
            return y - this.birth;
        }
        return getAgeFromBirth();
    }
};

xiaoming.age(); // Uncaught TypeError: Cannot read property 'birth' of undefined
/*
为什么是这个结果：
 原因是this指针只在age方法的函数内指向xiaoming，在方法内部定义的函数，this又指向undefined或window了！
*/
//修复的办法也不是没有，我们用一个that变量首先捕获this：

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var that = this; // 在方法内部一开始就捕获this
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - that.birth; // 用that而不是this
        }
        return getAgeFromBirth();
    }
};
xiaoming.age(); // 25

//用var that = this;，你就可以放心地在方法内部定义其他函数，而不是把所有语句都堆到一个方法中。
```

### 5.闭包

**闭包就是函数中嵌套函数。**

>闭包的特性：
>（1）嵌套的函数可以使用外层函数中的变量和参数。
>（2）参数和变量不会被垃圾回收机制回收。==闭包就可以使函数的局部变量驻留在内存中。==

```js
function func() { 
  var num = 1; 
  //闭包
  return function(){
    console.log(num++)
  }; 
}     
var foo=func();     //当函数执行完时，num局部应该被销毁
foo();//1，        
foo();//2           //这里num变量还存在
```

## 10.JS操作DOM的常用方法

### 1.获取指定的标签对象

#### 1.通过id获取标签对象，document.getElementById(elementID) 

```html
<html>
<head>
<script>
  var obox = document.getElementById("box");    //获取id为box的标签对象
  obox.style.backgroundColor = "red";    //把这个对象的背景色改为红色
</script>
</head>
<body>
<div id="box"></div>
</body>
</html>
```

#### 2.通过name获取指定对象的集合，document.getElementsByName(name)

```html
<html>
<head>
<script>
  var ants = document.getElementsByName("ant");   //获取name为ant的标签对象的集合
  ants[1].style.color = "red";                    //把第二个对象的颜色变红
</script>
</head>
<body>
<div name="ant">1</div>
<ul>
  <li name="ant">2</li>
  <li>3</li>
</ul>
</body>
</html>
```

#### 3.通过标签名称获取指定对象的集合，document.getElementsByTagName(tagname)

```html
<html>
<head>
<script> 
  var lis = document.getElementsByTagName("li");    //获取li标签的集合对象
</script> 
</head> 
<body> 
<ul id="box">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
</body> 
</html>
```

#### 4.通过ClassName称获取指定对象的集合，document.getElementsByClassName(classname)

```html
<html>
<head>
<script>
  let lis = document.getElementsByClassName("ant");  //获取class="ant"的标签对象集合
  let len=lis.length;

  for (let index = 0; index < len; index++) {
    lis[index].style.color = "blue";
  }
</script>
</head>
<body>
<ul id="box">
  <li>1</li>
  <li class="ant">2</li>
  <li>3</li>
  <li class="ant">4</li>
  <li>5</li>
  <li>6</li>
</ul>
</body>
</html>
```

#### 5.querySelector()方法，返回与选择器匹配的第一个元素对象

```html
<html>
<head>
<script> 
  var li=document.querySelector("li");   //获取第一个li标签对象
</script> 
</head> 
<body>
<div id="show"></div>
<ul id="box">
  <li class="ant">1</li>
  <li>2</li>
  <li ant="abc">3</li>
  <li>4</li>
  <li>5</li>
</ul>
</body> 
</html>

//==================其他参数

var li=document.querySelector("li:last-child");     //li:last-child可以匹配最后一个li元素
var li=document.querySelector("li[ant='abc']");     //返回li标签中ant属性为abc的对象
var odiv=document.querySelector("#show");           //获取id为show的对象
var li=document.querySelector(".ant");             //返回class为ant的对象
```

---

#### 6.querySelectorAll()方法，返回与选择器匹配的所有元素的集合

querySelectorAll方法可以获取与指定选择器匹配的所有元素的集合。如果没有匹配到任何元素，返回null。

```html
<html>
<head>
<script> 
  var lis=document.querySelectorAll(".a,.b");   //获取所有class为a,b的对象集合
</script> 
</head> 
<body> 
<div id="show"></div>
<ul id="box">
  <li>1</li>
  <li class="a">2</li>
  <li class="b">3</li>
  <li>4</li>
  <li>5</li>
</ul>
</body> 
</html>

//===========其他参数

var x = document.querySelectorAll("a[target]");   //查找所有a标签内有target属性的集合
var x = document.querySelectorAll("p.example")[0];  // 获取p标签中所有 class="example" 的第一个对象
var x = document.querySelectorAll("div > p");   //查找父元素为div的p标签的集合

```


### 2.操作标签属性

#### 1.setAttribute(),getAttribute(),createAttribute() 

```js
element.setAttribute(name, value);  //动态设置标签的指定属性的值。  
element.getAttribute(attributename);   //返回元素指定属性的值
document.createAttribute(attributename);  //可以创建并返回一个属性节点。
```

```html
<html>
<head>
<script type="text/javascript">
  var odiv=document.createElement("div");   //创建 div 元素
  odiv.setAttribute("id", "ant");           //设置div标签的id为ant
  obt.onclick=function(){
    odiv.innerHTML=odiv.getAttribute("id");
  }
  var lis = document.getElementsByTagName("li");  
  var attr = document.createAttribute("class");
  attr.value = "antzone";
  lis[1].setAttributeNode(attr);    //给第二个li标签设置 class=“antzone”
</script>
</head>
<body>
</body>
</html>
```

#### 2.hasAttribute(),removeAttribute()

```js
element.hasAttribute(name);  //判断一个元素节点是否具有指定的属性节点 
elementNode.removeAttribute(name);  //可以删除DOM元素的指定属性。
```

```html
<html> 
<head> 
<script type="text/javascript"> 
  var odiv=document.getElementById("ant");
  odiv.innerHTML=odiv.hasAttribute("antzone");   
  var obt=document.getElementById("btn");
  var otxt=document.getElementById("txt");
  obt.onclick=function(){
    otxt.removeAttribute("disabled");  //删除文本框的disabled属性，那么文本框就是可用的。
  }

</script>  
</head> 
<body> 
<div id="ant" antzone="蚂蚁部落">蚂蚁部落</div>
</body> 
</html>
```

### 3.操作子标签:appendChild(),removeChild(),replaceChild(),hasChildNodes().

```js
target.appendChild(newChild);  //为指定标签在尾部追加一个子标签
fatherObj.removeChild(childrenObj);  //删除指定元素的子节点
nodeObject.replaceChild(new_node,old_node);   //使用一个节点替换指定子节点
element.hasChildNodes();            //判断当前节点是否包含子节点
```

```html
<html>
<head>
<script> 

  let obox=document.getElementById("box");
  let newLi=document.createElement("li");
  newLi.innerHTML="5";
  obox.appendChild(newLi);     //将新创建的li元素追加到ul元素的尾部。
  let lis=obox.getElementsByTagName("li");
  obox.removeChild(lis[1]);   //删除ul元素下的第二个li元素。
  let newNode=document.createElement("li");
  newNode.innerHTML="plus";
  obt.onclick=function(){
    obox.replaceChild(newNode,lis[1]);   //第二个li元素可以被新创建的li元素替代
  }
</script> 
</head> 
<body> 
<ul id="box">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
</body> 
</html>
```


## 11.JS操作DOM的常用属性

### 1.style 属性

>对于没有中划线的CSS属性，直接使用

```js
divObj.style.width="100px";   //设置标签的宽度为100px
```

>对于带有中划线的CSS属性(例如：background-color),将中划线去掉，然后单词第一个字母大写.
```js
divObj.style.backgroundColor="#ccc";
```

### 2.firstChild,lastChild属性,firstElementChild,lastElementChild属性

**子节点并不一定都是元素节点，还有可能包含文本节点或者注释节点等节点.**

```js
elementNode.firstChild;    //获取指定元素节点下的第一个子节点
elementNode.lastChild;    //返回指定节点的最后一个子节点
elementNode.firstElementChild;   //获取指定元素下第一个子元素节点
elementNode.lastElementChild;    //返回指定元素的最后一个子元素节点。
```

```html
<html>
<head>
<script> 
  let box=document.getElementById("box");
  let show=document.getElementById("show");
  show.innerHTML=box.firstChild.nodeType;
  show.innerHTML=box.lastChild.nodeType;

   //obox会获取ul元素对象，它的第一个子元素节点就是第一个li元素。
    //然后将第一个li元素中的内容写入oshow中。
  var obox = document.getElementById("box");
  var oshow = document.getElementById("show");
  var oli = obox.firstElementChild; 
  oshow.innerHTML = oli.innerHTML;

  let oli = obox.lastElementChild;
  oshow.innerHTML = oli.innerHTML;
</script> 
</head> 
<body> 
<div id="show"></div>
<ul id="box">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
</body> 
</html>
```

### 3.childNodes,parentNode 属性 

```js
elementNode.childNode;       //获取指定元素的所有直接子节点
node.parentNode;            //返回指定节点的父节点
```

### 4.innerHTML,innerText属性

HTML内容是包括html代码的，文本内容就是标签里的内容

```js
htmlContent=domObj.innerHTML;     //返回指定元素的HTML内容
domObj.innerHTML=htmlContent;     //设置指定元素的HTML内容

textContent=domObj.innerText;       //获取指定元素内的文本内容
domObj.innerText=textContent;       //为指定元素设置HTML内容
```

## 12.JS操作table的DOM

>cells 属性, insertCell(),deleteCell()

```js
trObject.cells;         
//cells可以获取表格中某一行所有单元格的集合。
//可以通过索引获取集合中的指定td单元格。

tablerowObject.insertCell(index);  //在表格中行的指定位置插入一个td单元格
tablerowObject.deleteCell(index);   //删除table中指定的单元格
```

```html
<html>
<head>
<script type="text/javascript">  
  var otable=document.getElementById("thetable");
  var otrbt=document.getElementById("trbt");
  otrbt.onclick=function(){
    var rows=otable.rows;
    trcell.innerHTML="第一行中单元格数量是:"+rows[0].cells.length;   //计算出第一行单元格的数量；注意的是cells属性的引用对象必须是tr对象。
  }
</script>
</head>
<body>
<table id="thetable" border="1">
  <tr>
    <td>序号</td>
    <td>教程</td>
    <td>作者</td>
  </tr>
  <tr>
    <td>1</td>
    <td>javascript教程</td>
    <td>antzone</td>
  </tr>
  <tr>
    <td>2</td>
    <td>div css教程</td>
    <td>html</td>
  </tr>
</table>
<ul>
  <li id="trcell"></li>
  <li><input type="button" id="trbt" value="查看指定行单元格"/></li>
</ul>
</body>
</html>
```


>rowIndex 属性,rows 属性 

```js
tablerowObject.rowIndex;        //获取当前tr行在table表格tr行集合中的索引位置，索引值从0开始。
tableObject.rows;               
//rows可以获取表格中所有行的集合。
//利用集合的length属性可以获取具体的行数。
```

>insertRow(),deleteRow()  

```js
tableObject.insertRow(index);       //创建并在表格的指定位置插入一个新行
tableObject.deleteRow(index);       //删除表格中指定的行
```


## 13.JS操作select下拉框的DOM

```js
select.length;   //返回下拉列表中的选项数目
select.multiple=布尔值;   //设置或返回下拉列表是否可以选择多个项目
select.selectedIndex=number;  //返回被选中option项的索引值,将指定索引位置的option项设置为被选中状态
select.size;    //设置或返回下拉列表中的可见选项数目
select.value=value;    //返回被选中option项的value属性值
option.value;           //获取指定的option选项中的文本内容
select.options;             //返回包含下拉列表中的所有选项的一个集合
select.add(option,before);      //add方法可以向下拉列表添加一个项目
select.remove(index);           //从下拉列表中删除一个选项
```