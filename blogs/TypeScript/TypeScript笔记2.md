---
title: TypeScript笔记2
date: 2024-08-20
sidebar: 'auto'
categories: 
 - 前端
tags:
 - TypeScript
---

[toc]

# TypeScript笔记2

## 函数

函数是一组语句,一个函数用于实现一个功能。

### 无返回值函数

```ts
// 定义格式
function function_name()
{
    // 执行代码
}

//例子,定义一个函数,函数名称为a
function a() {   
    // 函数定义
    console.log("调用函数") 
}

a()    // 调用函数a
```

### 有返回值函数

```ts
// 带有返回值的函数定义格式如下
function function_name():return_type { 
    //执行代码

    //返回语句    
    return value; 
}

//例子
function greet():string { // 返回一个字符串
    return "Hello World" 
} 
 
// 调用函数
var msg = greet() // 调用 greet() 函数

```

- return_type 是返回值的类型。
- return 关键词后跟着要返回的结果。
- 一般情况下，一个函数只有一个 return 语句。
- 返回值的类型需要与函数定义的返回类型(return_type)一致。

### 有参函数

在调用函数时，您可以向其传递值，这些值被称为参数。

```ts
//语法格式如下
function func_name( param1 [:datatype], param2 [:datatype]) {
    //函数内部代码
}

//例子
function add(x: number, y: number): number {
    return x + y;
}

//调用函数
var a = add(1,2)
console.log(a)

```

- param1、param2 为参数名。
- datatype 为参数类型。参数的类型是可选的。

### 可选参数

在 TypeScript 函数里，如果定义了参数，调用函数的时候，必须传入这些参数。除非将这些参数设置为可选，可选参数使用问号标识 ？。

```ts
//可选参数例子如下
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
 
let result1 = buildName("Bob");  // 正确
let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
let result3 = buildName("Bob", "Adams");  // 正确
```

注意：可选参数必须跟在必需参数后面。如果都是可选参数就没关系。

### 默认参数

在函数中，也可以设置参数的默认值，这样在调用函数的时候，如果不传入该参数的值，则使用默认参数。

注意：一个参数不能同时设置为可选和默认。

```ts
//语法如下
function function_name(param1[:type],param2[:type] = default_value) { 
    //函数内代码
}

//例子
function calculate_discount(price:number,rate:number = 0.50) { 
    var discount = price * rate; 
    console.log("计算结果: ",discount); 
} 
calculate_discount(1000) 
//计算结果:  500

```

### 剩余参数

有一种情况，我们不知道要向函数传入多少个参数，这时候我们就可以使用剩余参数来定义。

剩余参数语法允许我们将一个不确定数量的参数作为一个数组传入。

```ts
//例子1
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
 
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

//例子2
function addNumbers(...nums:number[]) {  
    var i;   
    var sum:number = 0; 
    
    for(i = 0;i<nums.length;i++) { 
       sum = sum + nums[i]; 
    } 
    console.log("和为：",sum) 
 } 
 addNumbers(1,2,3) 

```

- buildName函数的最后一个命名参数 restOfName 以 ... 为前缀。表示它将成为一个由剩余参数组成的数组，索引值从0（包括）到 restOfName.length（不包括）。

### 匿名函数

- 匿名函数是一个没有函数名的函数。
- 匿名函数在程序运行时动态声明，除了没有函数名外，其他的与标准函数一样。
- 可以将匿名函数赋值给一个变量，这种表达式就成为函数表达式。

```ts
//语法如下
var res = function( [arguments] ) { ... }


//不带参数的匿名函数
var msg = function() { 
    return "hello world";  
} 
console.log(msg())   //hello world

//带参数匿名的函数
var res = function(a:number,b:number) { 
    return a*b;  
}; 
console.log(res(12,2))  //24

//自调用的匿名函数
(function () { 
    var x = "Hello!!";   
    console.log(x)     //  Hello!!
})()


```

- 自调用的匿名函数在后面加上 () 即可。当程序加载，该自调用的匿名函数会运行一次。


### 构造函数

TypeScript 也支持使用 JavaScript 内置的构造函数 Function() 来定义函数。

```ts
//语法如下
var res = new Function ([arg1[, arg2[, ...argN]],] functionBody)
//例子
var myFunction = new Function("a", "b", "return a * b"); 
var x = myFunction(4, 3); 
console.log(x);  //12
```

- arg1, arg2, ... argN：参数列表。
- functionBody：一个含有包括函数定义的 JavaScript 语句的字符串。

### 递归函数

递归函数即在函数内调用函数本身。

```ts
function factorial(number) {
    if (number <= 0) {         // 停止执行
        return 1; 
    } else {     
        return (number * factorial(number - 1));     // 调用自身
    } 
}; 
console.log(factorial(6));      // 输出 720
```

### Lambda 函数(箭头函数)

Lambda 函数也称之为箭头函数。箭头函数表达式的语法比函数表达式更短。箭头函数只有一行语句。

```ts
// Lambda 函数 中只有一行语句，语法如下
( [param1, param2,…param n] )=>statement;
//例子
var foo = (x:number)=>10 + x 
console.log(foo(100))      //输出结果为 110

// Lambda 函数 中有多行语句，语法如下
( [param1, param2,…param n] )=> {
    // 代码块
}
//例子
var foo = (x:number)=> {    
    x = 10 + x 
    console.log(x)  
} 
foo(100)  //110

//当Lambda 函数只有一个参数的时候，可省略()括号
var display = x => { 
    console.log("输出为 "+x) 
} 
display(12)  // 12

```

- Lambda 函数(箭头函数) 省略了函数名。当函数内部只有一行语句时，则可以省略`{}`。

### 函数重载

函数重载是指，多个函数的名字可以相同，但是函数参数必须不同，返回类型可以相同也可以不同。

```ts
function disp(s1:string):void; 
function disp(n1:number,s1:string):void; 
function disp(x:any,y?:any):void { 
    console.log(x); 
    console.log(y); 
} 
disp("abc") 
disp(1,"xyz");

```


## 对象

对象是包含一组键值对的实例。 键值对的值可以是字符串、函数、数组、另一个对象等。

TypeScript 中的对象，基本类似JavaScript 中的对象。

示例如下
```ts
var object_name = { 
    key1: "value1", // 标量
    key2: "value",  
    key3: function() {
        // 函数代码
    }, 
    key4:["content1", "content2"] //数组
}

// 访问对象中的某个键值对
console.log(object_name.key2)  //value
```



## 类

TypeScript 是面向对象的 JavaScript。TypeScript 支持面向对象的所有特性，比如 类、接口等。

而类描述了所创建的对象共同的属性和方法。

```ts
// 类定义
class class_name { 
    // 类的代码
}

```

- 定义类的关键字为 class，后面紧跟类名。

### 类的成员

类可以包含以下几个模块（类的成员）：
- 字段 ：字段是类里面声明的变量。字段表示对象的有关数据。
- 构造函数 : 类实例化时调用，可以为类的对象分配内存。
- 方法 : 方法为对象要执行的操作。

```ts
class Car { 
    // 字段 
    engine:string; 
 
    // 构造函数 
    constructor(engine:string) { 
        this.engine = engine 
    }  
    // 方法 
    disp():void { 
        console.log("发动机为 :   "+this.engine) 
    } 
}
```


### 创建实例化类对象

可以使用 new 关键字来实例化类的对象，即创建一个类对象。语法格式如下

```ts
class Car { 
   // 字段
   engine:string; 
   // 构造函数
   constructor(engine:string) { 
      this.engine = engine 
   }  
   // 方法
   disp():void { 
      console.log("函数中显示发动机型号  :   "+this.engine) 
   } 
} 
 
// 实例化一个对象
var obj = new Car("XXSY1")
// 访问类的字段
console.log("读取发动机型号 :  "+obj.engine)  //读取发动机型号 :  XXSY1
// 访问类的方法
obj.disp()      //函数中显示发动机型号  :   XXSY1
```

### 类的继承

TypeScript 支持继承类，即我们可以在创建类的时候继承一个已存在的类，这个已存在的类称为父类，继承它的类称为子类。

- 类继承使用关键字 extends，子类除了不能继承父类的私有成员(方法和属性)和构造函数，其他的都可以继承。
- TypeScript 一次只能继承一个类，不支持继承多个类，但 TypeScript 支持多重继承（A 继承 B，B 继承 C）。
- 注意的是子类只能继承一个父类，TypeScript 不支持继承多个父类。

```ts
//例子
class Shape { 
   Area:number 
   constructor(a:number) { 
      this.Area = a 
   } 
} 
 
// 类Circle 继承 类Shape
class Circle extends Shape { 
   disp():void { 
      console.log("圆的面积:  "+this.Area) 
   } 
}
  
// 创建类Circle的实例化对象
var obj = new Circle(223); 
obj.disp()   //圆的面积:  223
```

### 方法重写

类继承后，子类可以对父类的方法重新定义，这个过程称之为方法的重写。

其中 super 关键字是对父类的直接引用，该关键字可以引用父类的属性和方法。

```ts
class PrinterClass { 
   doPrint():void {
      console.log("父类的 doPrint() 方法。") 
   } 
} 
class StringPrinter extends PrinterClass { 
   doPrint():void { 
      super.doPrint() // 调用父类的函数
      console.log("子类的 doPrint()方法。")
   } 
}

var obj = new StringPrinter();
obj.doPrint();  

//运行结果
// 父类的 doPrint() 方法。
// 子类的 doPrint()方法。
```

### static 关键字 

static 关键字用于定义类的数据成员（属性和方法）为静态的，静态成员可以直接通过类名调用。

```ts
class StaticMem {  
   static num:number; 
   static disp():void { 
      console.log("num 值为 "+ StaticMem.num) 
   } 
} 
 
StaticMem.num = 12     // 初始化静态变量
StaticMem.disp()       // 通过类名调用静态方法
```

### instanceof 运算符

instanceof 运算符可以用于判断对象是否是指定的类型，如果是返回 true，否则返回 false。

```ts
class Person{ } 
var obj = new Person() 
var isPerson = obj instanceof Person; 
console.log("obj 对象是 Person 类实例化来的吗？ " + isPerson);
// obj 对象是 Person 类实例化来的吗？ true
```

### 访问权限修饰符

TypeScript 中，可以使用访问权限修饰符来保护对类、变量、方法和构造方法的访问。

TypeScript 支持 3 种不同的访问权限修饰符。
- public（默认） : 公有，可以在任何地方被访问。
- protected : 受保护，可以被其自身以及其子类访问。
- private : 私有，只能被其定义所在的类访问。

```ts
class Encapsulate { 
   str1:string = "hello" 
   private str2:string = "world" 
}
 
var obj = new Encapsulate() 
console.log(obj.str1)       // 可访问 
console.log(obj.str2)       // 编译错误， str2 是私有的，只能在类内部中访问str2变量。
```

### 类实现接口

类可以实现接口，使用关键字 implements，并将 interest 字段作为类的属性使用。

```ts
//定义接口ILoan
interface ILoan { 
   interest:number 
} 
//定义类AgriLoan 实现接口ILoan
class AgriLoan implements ILoan { 
   interest:number 
   rebate:number 
   
   constructor(interest:number,rebate:number) { 
      this.interest = interest 
      this.rebate = rebate 
   } 
} 
 
var obj = new AgriLoan(10,1) 
console.log("利润为 : "+obj.interest+"，抽成为 : "+obj.rebate )
//利润为 : 10，抽成为 : 1
```


## String 类对象

String 对象是TypeScript官方提供的。主要用于处理文本（字符串）。

```ts
// 创建一个String 对象，赋值给变量txt
var txt = new String("string");
```

### String 对象属性

> constructor 对创建该对象的函数的引用。

```ts
var str = new String( "This is string" ); 
console.log("str.constructor is:" + str.constructor)
// str.constructor is:function String() { [native code] }
```

> length 返回字符串的长度。

```ts
var uname = new String("Hello World") 
console.log("Length "+uname.length)  // 输出 11
```

> prototype 允许您向对象添加属性和方法。

```ts
function employee(id:number,name:string) { 
    this.id = id 
    this.name = name 
 } 
 var emp = new employee(123,"admin") 
 employee.prototype.email="admin@runoob.com" // 添加属性 email
 console.log("员工号: "+emp.id) 
 console.log("员工姓名: "+emp.name) 
 console.log("员工邮箱: "+emp.email)
```

### String 对象方法

下面列出了部分 String 对象常用的方法

> concat() 连接两个或更多字符串，并返回新的字符串。

```ts
var str1 = new String( "RUNOOB" ); 
var str2 = new String( "GOOGLE" ); 
var str3 = str1.concat( str2 ); 
console.log("str1 + str2 : "+str3) // RUNOOBGOOGLE
```

> indexOf() 返回某个指定的字符串值在字符串中首次出现的位置。

```ts
var str1 = new String( "RUNOOB" ); 
var index = str1.indexOf( "OO" ); 
console.log("查找的字符串位置 :" + index );  // 3
```

> replace() 替换与正则表达式匹配的子串

```ts
var re = /(\w+)\s(\w+)/; 
var str = "zara ali"; 
var newstr = str.replace(re, "$2, $1"); 
console.log(newstr); // ali, zara
```

> split() 把字符串分割为子字符串数组。

```ts
var str = "Apples are round, and apples are juicy."; 
var splitted = str.split(" ", 3); 
console.log(splitted)  // [ 'Apples', 'are', 'round,' ]
```

> substring() 提取字符串中两个指定的索引号之间的字符。

```ts
var str = "RUNOOB GOOGLE TAOBAO FACEBOOK"; 
console.log("(1,2): "    + str.substring(1,2));   // U
console.log("(0,10): "   + str.substring(0, 10)); // RUNOOB GOO
console.log("(5): "      + str.substring(5));     // B GOOGLE TAOBAO FACEBOOK
```

> toString() 返回字符串。

```ts
var str = "Runoob"; 
console.log(str.toString( )); // Runoob
```


## Array 类对象

Array 对象是TypeScript官方提供的。可以使用 Array 对象创建数组。

Array 对象的构造函数接受以下两种值：
- 表示数组大小的数值。
- 初始化的数组列表，元素使用逗号分隔值。

示例如下
```ts
// 使用 Array 对象创建数组 arr_names
var arr_names:number[] = new Array(4)  
//或者
var sites:string[] = new Array("Google","Runoob","Taobao","Facebook") 
```

## Map 类对象

Map 是 ES6 中引入的一种新的数据结构。

Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。

### 创建Map

TypeScript 使用 Map 类型和 new 关键字来创建 Map。

```ts
// 创建Map实例化对象
let myMap = new Map();

//创建Map实例化对象，并初始化
let myMap2 = new Map([
        ["key1", "value1"],
        ["key2", "value2"]
]); 

```

### Map对象的常用方法和属性

> map.set() 向 Map 中添加或更新键值对,返回该 Map 对象。

```ts
map.set('key1', 'value1');
```

> map.get() 根据键获取值，如果键不存在则返回 undefined。

```ts
const value = map.get('key1');
```

> map.has() 返回一个布尔值，用于判断 Map 中是否包含键对应的值。

```ts
const exists = map.has('key1');
```

> map.delete() 删除 Map 中的指定键值对，删除成功返回 true，失败返回 false。

```ts
const removed = map.delete('key1');
```

> map.clear() 移除 Map 对象的所有键值对 。

```ts
map.clear();
```

> map.size 返回 Map 对象键/值对的数量。

```ts
const size = map.size;
```

> map.key() 方法：返回一个包含 Map 中所有键的迭代器

```ts
for (const key of map.keys()) {
  console.log(key);
}
```

> map.values() 方法：返回一个包含 Map 中所有值的迭代器。

```ts
for (const value of map.values()) {
  console.log(value);
}
```

> map.entries() 方法：返回一个包含 Map 中所有键值对的迭代器，每个元素是一个 [key, value] 数组。

```ts
for (const [key, value] of map.entries()) {
  console.log(key, value);
}
```

> map.forEach() 方法：对 Map 中的每个键值对执行一次提供的回调函数。

```ts
map.forEach((value, key) => {
  console.log(key, value);
});
```

### 迭代Map对象

TypeScript使用 for...of 来实现迭代Map对象

```ts
let nameSiteMapping = new Map();
//向Map对象添加键值对
nameSiteMapping.set("Google", 1);
nameSiteMapping.set("Runoob", 2);
nameSiteMapping.set("Taobao", 3);
 
// 迭代 Map 中的 key
for (let key of nameSiteMapping.keys()) {
    console.log(key);                  
}
 
// 迭代 Map 中的 value
for (let value of nameSiteMapping.values()) {
    console.log(value);                 
}
 
// 迭代 Map 中的 key => value
for (let entry of nameSiteMapping.entries()) {
    console.log(entry[0], entry[1]);   
}
 
// 使用对象解析
for (let [key, value] of nameSiteMapping) {
    console.log(key, value);            
}

```

## 接口

接口是一系列抽象方法的声明，是一些方法特征的集合。

这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。

示例如下
```ts
//定义一个IPerson接口
interface IPerson { 
    firstName:string, 
    lastName:string, 
    sayHi: ()=>string 
} 

//定义了一个变量 customer，它的类型是 IPerson
var customer:IPerson = { 
    firstName:"Tom",
    lastName:"Hanks", 
    sayHi: ():string =>{return "Hi there"} 
} 
 
console.log("Customer 对象 ")  
console.log(customer.firstName)  //Tom
console.log(customer.lastName)  //Hanks
console.log(customer.sayHi())  // Hi there
```

### 接口继承

接口继承是指接口可以通过其他接口来扩展自己。

Typescript 允许接口继承多个接口。继承使用关键字 extends。

单继承示例如下
```ts
//定义一个 Person 接口
interface Person { 
   age:number 
} 

//定义一个 Musician 接口,该接口继承 Person 接口
interface Musician extends Person { 
   instrument:string 
} 
 
var drummer = <Musician>{}; 
drummer.age = 27 
drummer.instrument = "Drums" 
console.log("年龄:  "+drummer.age)
console.log("喜欢的乐器:  "+drummer.instrument)
```

多继承示例如下
```ts
//定义一个 IParent1 接口
interface IParent1 { 
    v1:number 
} 
//定义一个 IParent2 接口
interface IParent2 { 
    v2:number 
} 
//定义一个 Child 接口，多继承 IParent1接口和IParent2接口
interface Child extends IParent1, IParent2 { } 

//定义一个变量Iobj，类型为Child接口
var Iobj:Child = { v1:12, v2:23} 
console.log("value 1: "+Iobj.v1+" value 2: "+Iobj.v2)
// value 1: 12 value 2: 23

```


## 泛型

泛型（Generics）是一种编程语言特性，允许在定义函数、类、接口等时使用占位符来表示类型，而不是具体的类型。

使用泛型的主要目的是为了处理不特定类型的数据，使得代码可以适用于多种数据类型而不失去类型检查。

泛型的特点：
- 代码重用： 可以编写与特定类型无关的通用代码，提高代码的复用性。
- 类型安全： 在编译时进行类型检查，避免在运行时出现类型错误。
- 抽象性： 允许编写更抽象和通用的代码，适应不同的数据类型和数据结构。

### 泛型标识符

在泛型中，通常使用一些约定俗成的标识符，比如常见的 T（表示 Type）、U、V 等，但实际上你可以使用任何标识符。

关键是泛型标识符使得代码易读和易于理解，所以建议在泛型类型参数上使用描述性的名称，以便于理解其用途。

> T: 代表 "Type"，是最常见的泛型类型参数名。

```ts
// 定义一个函数，它的参数类型，返回值类型，用T表示。
// identity<T> 表示这是一个泛型函数
function identity<T>(arg: T): T {
    return arg;
}
```

> K, V: 用于表示键（Key）和值（Value）的泛型类型参数。

```ts
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}
```

> E: 用于表示数组元素的泛型类型参数。

```ts
function printArray<E>(arr: E[]): void {
    arr.forEach(item => console.log(item));
}
```

> R: 用于表示函数返回值的泛型类型参数。

```ts
function getResult<R>(value: R): R {
    return value;
}
```

> U, V: 通常用于表示第二、第三个泛型类型参数。

```ts
function combine<U, V>(first: U, second: V): string {
    return `${first} ${second}`;
}
```

### 泛型函数

```ts
function identity<T>(arg: T): T {
    return arg;
}

// 使用泛型函数
let result = identity<string>("Hello");
console.log(result); // 输出: Hello

let numberResult = identity<number>(42);
console.log(numberResult); // 输出: 42

```

解析： 上面例子中，identity 是一个泛型函数，使用 `<T>` 表示泛型类型。它接受一个参数 arg 和返回值都是泛型类型 T。在使用时，可以通过尖括号 <> 明确指定泛型类型。第一个调用指定了 string 类型，第二个调用指定了 number 类型。

### 泛型接口

可以使用泛型来定义接口，使接口的成员能够使用任意类型。

```ts
// 基本语法
interface Pair<T, U> {
    first: T;
    second: U;
}

// 使用泛型接口
let pair: Pair<string, number> = { first: "hello", second: 42 };
console.log(pair); // 输出: { first: 'hello', second: 42 }
```

解析： 这里定义了一个泛型接口 Pair，它有两个类型参数 T 和 U。然后，使用这个泛型接口创建了一个对象 pair，其中 first 是字符串类型，second 是数字类型。

### 泛型类

泛型也可以应用于类的实例变量和方法。

```ts
// 基本语法
class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }
}

// 使用泛型类
let stringBox = new Box<string>("TypeScript");
console.log(stringBox.getValue()); // 输出: TypeScript

```

解析： 在这个例子中，Box 是一个泛型类，使用 `<T>` 表示泛型类型。构造函数和方法都可以使用泛型类型 T。通过实例化 `Box<string>`，我们创建了一个存储字符串的 Box 实例，并通过 getValue 方法获取了存储的值。

### 泛型默认值

可以给泛型设置默认值，使得在不指定类型参数时能够使用默认类型

```ts
// 基本语法
function defaultValue<T = string>(arg: T): T {
    return arg;
}

// 使用带默认值的泛型函数
let result1 = defaultValue("hello"); // 推断为 string 类型
let result2 = defaultValue(42);      // 推断为 number 类型
```

这个例子展示了带有默认值的泛型函数。函数 defaultValue 接受一个泛型参数 T，并给它设置了默认类型为 string。在使用时，如果没有显式指定类型，会使用默认类型。在例子中，第一个调用中 result1 推断为 string 类型，第二个调用中 result2 推断为 number 类型。

### 泛型约束

有时候你想限制泛型的类型范围，可以使用泛型约束。

```ts
// 基本语法
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
    console.log(arg.length);
}

// 正确的使用
logLength("hello"); // 输出: 5

// 错误的使用，因为数字没有 length 属性
logLength(42); // 错误
```

解析： 在这个例子中，定义了一个泛型函数 logLength，它接受一个类型为 T 的参数，但有一个约束条件，即 T 必须实现 Lengthwise 接口，该接口要求有 length 属性。因此，可以正确调用 logLength("hello")，但不能调用 logLength(42)，因为数字没有 length 属性。


## 模块

TypeScript 模块的设计理念是可以更换的组织代码。

模块是在其自身的作用域里执行，并不是在全局作用域，这意味着定义在模块里面的变量、函数和类等在模块外部是不可见的，除非明确地使用 export 导出它们。

两个模块之间的关系是通过在文件级别上使用 import 和 export 建立的。

import 和 export关键字用法如下
```ts
//模块导出需要使用关键字 export 关键字
// 文件名 : SomeInterface.ts 
export interface SomeInterface { 
   // 代码部分
}

//要在另外一个文件使用该模块就需要使用 import 关键字来导入
import someInterfaceRef = require("./SomeInterface");
```

示例如下
```ts
// IShape.ts 文件 
export interface IShape { 
   draw(); 
}

// Circle.ts 文件
import shape = require("./IShape");  //导入IShape.ts 文件中的模块

//定义一个类Circle，继承shape模块中的IShape类，并通过export关键字导出类Circle
export class Circle implements shape.IShape { 
    //重写接口方法
   public draw() { 
      console.log("Cirlce is drawn (external module)"); 
   } 
}

```
