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

## TypeScript 函数

函数是一组语句,一个函数用于实现一个功能。

> 函数定义

函数就是包裹在花括号中的代码块，代码块前面使用了关键词 function 和 函数名称。

```ts
// 语法格式
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

> 函数返回值

```ts
// 带有返回值的函数定义格式如下
function function_name():return_type { 
    // 语句
    return value; 
}

// return_type 是返回值的类型。
// return 关键词后跟着要返回的结果。
// 一般情况下，一个函数只有一个 return 语句。
// 返回值的类型需要与函数定义的返回类型(return_type)一致。

//例子
function greet():string { // 返回一个字符串
    return "Hello World" 
} 
 
function caller() { 
    var msg = greet() // 调用 greet() 函数 
    console.log(msg) 
} 
 
// 调用函数
caller()

```


