---
title: VueRouter基础
date: 2019-12-12
sidebar: 'auto'
categories: 
 - 前端
tags:
 - VueRouter
---

# VueRouter基础

Vue Router 是 Vue.js 官方的路由管理器。

路由可以通过不同的 URL 访问不同的页面。类似于a标签。**使用Vue.js路由需要载入 vue-router库**

## 1.vue-router库的安装：

1. CDN方式: `https://unpkg.com/vue-router/dist/vue-router.js`
2. NPM方式：`npm install vue-router`

**注意:CDN方式，需要先引入vue.js文件**

如果在一个模块化工程(webpack + vue-cli)中使用它，必须要通过 Vue.use() 明确地在工程的main.js文件中全局安装路由功能：

```js
//这是模块化工程项目中的main.js文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

```


## 2.基础使用

>步骤：1.创建组件。2，创建路由对象，并且配置路由规则(把路由路径和组件进行键值对匹配)。3，把路由对象加载到Vue实例中

```html
<!--引入必要的js文件-->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="vue_det">
    <router-link to="/login">登录路由</router-link>
    <router-link to="/register">注册路由</router-link>
    <!--显示当前路由路径匹配的组件页面-->
    <router-view></router-view>
</div>

<script>
// 1. 定义组件
var loginView = { template: '<div>登录组件</div>' }
var registerView = { template: '<div>注册组件</div>' }
var rootView = { template:'<div>初始化组件</div>' }

// 2.创建路由对象.并且配置路由规则routes
//路由规则为键值对数据。分别是路由路径path,和匹配的组件component
var routerObj = new VueRouter({
  routes : [
    { path: '/', component: rootView },
    { path: '/login', component: loginView },
    { path: '/register', component: registerView }
  ]
})

// 3.把路由对象挂载道vue实例中
// 从而让页面有路由功能
var vm = new Vue({
    el: '#vue_det',   
    //把路由对象加载到Vue实例中
    router:routerObj    
})
</script>
```

<font color="red">

PS:
`<router-view></router-view>`是显示当前路由路径下匹配的组件的标签

</font>

## 3.`<router-link>`导航标签

1. to属性

to属性的几种使用方式
```js
//login是目标路由路径
<router-link to="/login">Login路由</router-link>
//to属性可以绑定vue实例中的data值
<router-link v-bind:to = "{path:'/login1'}">Login路由1</router-link>
//to属性可以传递参数
//请求变为：/login?id=1&name=qwe
<router-link v-bind:to = "{path:'/route1', query: { id:'1',name:'qwe' }}">Login路由2</router-link>
```

2. replace属性

使用replace属性。导航后不会留下 history 记录
```js
<router-link to="/login" replace>Login路由</router-link>
```

3. append属性

 设置append属性后，则在当前路径前添加基路径。

 ```js
//若当前页面路径为/a.点击下面的标签后。跳转的页面路径是 /b
<router-link to="/b"></router-link>

//若当前页面路径为/a.点击下面的标签后。跳转的页面路径是 /a/b
<router-link to="/b" append></router-link>
 ```

4. tag属性

使用tag属性，把标签改变为其他标签

```js
<router-link to="/login" tag="li">login</router-link>
//会渲染为li标签
<li>login</li>
```

## 4.路由的两种方式（router-link和JS），并进行路由传值

>特别注意：path匹配路由传参只能用query去接收参数，name来匹配路由只能用params去接收参数


### 1. 通过`<router-link>`实现

1. 简单写法

```
<router-link to="demo2">demo2</router-link>

// v-bind写法
<router-link :to="demo2">demo2</router-link>

```

2.传参写法.通过name来匹配路由并传值.需要配置 router.js

```
<router-link :to="{ name: 'demo2', params: { userId: 123 }}">demo2</router-link>

传参写法需要先在 router.js 中对 demo2 的路由路径进行配置
{
  path: '/demo2/:userId',
  name: 'demo2',
  component: demo2
}
配置完成后,页面跳转的结果就为 /demo2/123

```

如何接受参数：

```

需要在新页面中使用 mounted 钩子函数。用 this.$route.params.xx 获取传过来的参数，如下：
mounted () {
    alert(this.$route.params.userId)
}

```

3.传参写法.通过path来匹配路由并传值.不需要配置 router.js

```

<router-link :to="{ path: '/demo2', query: { userId: 123 }}">demo2</router-link>

页面跳转的结果为 /demo2?userId=123

（注意这里不用在 router.js 里配置路径）

```
如何在新页面接受参数
```
mounted () {
  alert(this.$route.query.plan)
}

```


> 2.通过 JS 实现

```
template 部分：
<button @click="toURL">跳转页面</button>

script 部分：
（注意这里是 router，上面是 route）


## 1简单写法
methods:{
  toURL(){
    this.$router.push({ path: '/demo2' })
  }
}

#################################

## 2name来配置路由并传参
methods:{
  toURL(){
    this.$router.push({ name: 'demo2', params: { userId: 123 }})
  }
}

由于上面是name来配置路由。所有需要通过params来接受参数
console.log(this.$route.params.userId)

#################################

## 3path来配置路由并传参
methods:{
  toURL(){
    this.$router.push({ path: '/demo2', query: { plan: 'private' } })
  }
}

由于上面是path来配置路由。所有需要通过query来接受参数
console.log(this.$route.query.plan)



```


## 5.vue + router通过访问相同路由来进行当前组件刷新

**每次点击相同的路由地址都去渲染组件页面**

> 1. 创建空组件Empty.vue，作为中转

```html
//Empty.vue
<template>
    <div>
        <!--空组件，该组件的作用是充当跳板。来实现组件刷新问题。-->
    </div>
</template>

<script>
export default {
    data() {
      return {
      }
    },
    created() {
      //接受参数
      let url = this.$route.query;
      let str = '';
      for(let i in url) {
        str += url[i];
      }
      const path = this.$route.query;
      console.log("path",path);
      console.log("str",str);
      this.$router.push({
        path: str,
      });
    }  
}
</script>

```


> 2. 将空组件与路由绑定

```js
 {
    path: '/home',
    name:"主页面",
    component: home,
    redirect: "/home/dashboard", //默认加载的路由
    children:[
      {
        name:"空组件",
        path:"/empty",
        component: () => import('@/components/admin/Empty.vue')
      }
 }
```



> 3. 在当前组件中调用方法

 1. 方法2
 当作参数的路由是没有参数的
 例如：/exam/list

```js
 //通过空组件中转，来实现当前组件刷新
  this.$router.push({path: '/empty',query:this.$route.path})
  //--------
  //this.$route.path = "/exam/list" 
```

 1. 方法2
 当作参数的路由是有参数的
 例如：/exam/list?examId=1
 

```js
 //通过空组件中转，来实现当前组件刷新
  this.$router.push({path: '/empty',query:this.$router.currentRoute.fullPath})
  //--------
  //this.$router.currentRoute.fullPath = "/exam/list?examId=1" 
```


<font color="red">
通过调用方法，进入中转路由，再通过参数传的值，返回到之前的路由中去。
</font>