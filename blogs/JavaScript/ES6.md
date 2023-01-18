---
title: ES6笔记
date: 2023-01-18
sidebar: 'auto'
categories: 
 - 前端
tags:
 - JavaScript
---

[toc]

## ES6笔记

>JavaScript是由三部分组成：
1. ECMAScript(核心)：规定了语言的组成部分。即语法、类型、语句、关键字、保留字、操作符、对象等。
2. BOM(浏览器对象模型): 支持访问和操作浏览器窗口，可以控制浏览器显示页面以外的部分。
3. DOM(文档对象模型): 把整个页面映射为一个多层节点树，可借助DOM提供的API，可删除、添加和修改任何节点。

>什么是ES6？

ES6,全称 ECMAScript 6.0 ,是ECMAScripts的第六次修订，又称 ES2015，于2015年06月发版，是JavaScript的下一个版本标准。

ES6 主要是为了解决 ES5 的先天不足，目前浏览器的 JavaScript 是 ES5 版本，大多数高版本的浏览器也支持 ES6，不过只实现了 ES6 的部分特性和功能。ES6 是继 ES5 之后的一次改进，相对于 ES5 更加简洁，提高了开发效率。


## ES6的特性

### 关键字let和const

在 ES6 中通常用let和const来声明。let表示变量、const表示常量。


### 对象中属性和方法简写

```js
//对象中属性的简写
//ES6 允许在对象中，直接写变量。此时属性名就是变量名, 属性值就是变量的值
var foo = 'bar';
var baz = {foo}; // 等同于 var baz = {foo: foo};

//对象中方法的简写
//ES6 允许在对象中，方法可以省略冒号与 function 关键字
var obj = {
  methodName() {
    return "Hello!";
  }
};

// 等同于
var obj = {
  methodName: function () {
    return "Hello!";
  }
};

```

### 展开运算符(...)

展开运算符（spread operator）允许一个表达式在某处展开。展开运算符在多个参数（用于函数调用）或多个元素（用于数组字面量）或者多个变量（用于解构赋值）的地方可以使用。

例子：
```js
let obj1 = {
 value1: 1,
 value2: 2
};
//将obj1对象展开在obj2对象(即把obj1对象的属性一一展开，交给obj2对象)
let obj2 = {...obj1};
console.log(obj2);  // {value1: 1, value2: 2}

//上面的用法相当于这个
let obj2 = {value1: 1, value2: 2}
```

展开运算符的各个用法：
```js
//在函数中使用展开运算符
function test(a, b, c){};
let arr = [1, 2, 3];
test(...arr);   //相当于test(arr[0],arr[1],arr[2]);

//数组中使用展开运算符
// 使用push方法
let arr1 = [1, 2];
let arr2 = [3. 4];
arr1.push(...arr2); // [1, 2, 3, 4]

//将一个对象插入另外一个对象当中
let z={a:3,b:4};
let n={x:1,y:2,...z};
console.log(n); //{x:1,y:2,a:3,b:4}
```

### 箭头函数

在 ES6 中，提供了一种简洁的函数写法，称作“箭头函数”。

箭头函数写法：
```js
函数名=(形参)=>{…表达式…}

//常规函数写法
function sum(a) {
   return a + b
}
//箭头函数写法
let sum = (a, b) => a + b


//当函数只有一个参数时
const addOne = num => num + 1
//当函数没有参数时
const sayHello = () => { console.log("Hello") }

```

1. 当函数体中只有一个表达式时，{}和 return 可以省略。
2. 当函数体中形参只有一个时，()可以省略。
3. 箭头函数特点：箭头函数中的 this 始终指向箭头函数定义时的离 this 最近的一个函数，如果没有最近的函数就指向 window。

### 模板字符串

用一对反引号(`)标识，它可以当作普通字符串使用，也可以用来定义多行字符串，也可以在字符串中嵌入变量，表达式或函数。只不过需要写在${}中。

```js
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
//实际返回 "Hello Bob, how are you today?"
```

### for...of循环

```js
var arr=["小林","小吴","小佳"];
for(var v of arr){
console.log(v);
}
//小林 //小吴 //小佳
```