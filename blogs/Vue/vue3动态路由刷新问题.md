---
title: vue3的动态路由刷新后页面空白或404页面的问题
date: 2024-01-20
sidebar: 'auto'
categories: 
 - 前端
tags:
 - Vue
---

[toc]

# vue3的动态路由刷新后页面空白或404页面的问题

通常来说，vue-router的路由有两部分组成。一部分是常规路由，即任何用户都能访问的路由。

另一部分是动态路由，即前台调用后台接口，后台返回该用户能访问的菜单数据。然后前台将菜单数据转换为可用被vue-router使用的路由数据，最后前台将该路由数据，添加到vue-router中。

由于动态路由是在vue-router初始化后才添加到全局路由中的。因此当页面刷新，vue-router开始重新初始化，并且立即匹配当前路由的页面。由于此时动态路由还尚未添加到全局路由中，因此vue-router会找不到当前路由的页面，从而导致整个页面空白。若常规路由中配置了404页面，那么会匹配到404页面。

## 页面刷新后的vue-router加载顺序：

页面刷新-> vue-router初始化 -> 匹配当前路由的页面（若找不到对应路由，则页面空白或匹配到404页面） -> 最后才把动态路由添加到全局路由中。

## 问题总结

问题的根源就是，页面刷新后，在把动态路由添加到全局路由之前，vue-router就没找到当前路由页面，从而导致页面空白或匹配到404页面。

## 解决问题方式

由于页面刷新后，vue-router开始重新初始化，并且第一时间匹配当前路由的页面。因此我们必须让vue-router再次匹配路由，即让vue-router匹配两次路由。

在vue-router第一次匹配路由的时候，此时全局路由中没有动态路由，因此要把动态路由加入到全局路由中，然后手动添加404页面路径。最后要让vue-router再次匹配。

在vue-router第二次匹配路由的时候，此时全局路由已经有动态路由了。这时vue-router就能匹配上动态路由，从而显示对应的页面了。

## 解决代码

/router/index.js的代码如下

在vue-router的前置守卫中把动态路由添加到全局路由中。

```js
import { createRouter, createWebHistory } from 'vue-router'
import { useMenuStore } from '@/stores/menuStore'

//常规路由,任何用户都可访问的路由
const constantRoutes = [
  {
    path: '/',
    redirect: '/login', //根路由默认重定向到/login路由
  },
  {
    path: '/login',
    component: () => import('@/views/login/LoginView.vue'),
  },
  {
    path: '/register',
    component: () => import('@/views/register/RegisterView.vue'),
  }
]

//动态路由,此处用于模拟。真正的动态路由，主要是从后台获取。
const dynamicRoutes = [
  {
    path: '/system/user',
    component: () => import('@/views/user/user.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  //加载常规路由到全局路由
  routes: constantRoutes
})

//是否加载动态路由变量
let isAddDynamicRouter = false

//router路由前置守卫
router.beforeEach(async (to,from,next) => {
  //判断是否添加了动态路由
  if(!isAddDynamicRouter){
    //获取动态路由
    let dynamicRoute = dynamicRoutes
    if (dynamicRoute.length !== 0) {
        //把动态路由添加到全局路由中
        await dynamicRoute.forEach(obj =>{
            router.addRoute(obj)
        })
        //最后手动添加，若路由路径无法匹配，就会自动匹配到404页面
        router.addRoute({
            path: '/:catchAll(.*)',
            name: '404',
            component: () => import('@/views/other/404View.vue')
        })   
    }
    isAddDynamicRouter = true
    //中断此次的路由，重新进行下一次路由。即重新执行beforeEach
    next({ ...to, replace: true })
  }else{
    //放行路由
    next()
  }
})

export default router

```

## next() 函数讲解

路由前置守卫如下
```js
router.beforeEach((to, from, next) => {
	to // 要去的路由
	from // 当前路由
	next() // 放行的意思
}
```

- next() 是放行路由的意思。
- 例如`next('login')`，`next(to)`，`next({ ...to, replace: true })`等都不是放行，而是中断此次的路由，进行下一次新的路由。即重新执行一次beforeEach函数。

> 以`next(‘login’)`举例。

```js
router.beforeEach((to, from, next) => {
    //如果没有login路由，会一直循环下去。
	next('login')
}

//执行逻辑：
//1. 当vue-router初始化，会执行一次beforeEach函数。
//2. 进入beforeEach函数后，执行next('login')。此时会中断当前路由，重新执行一次路由，并寻找login路由，如果找不到就继续执行beforeEach函数。
//3. 再次进入beforeEach函数后，继续执行next('login')。
//4. 最终会一直循环下去。。。
```

> 以`next({ …to, replace: true })`举例。

`next({ …to, replace: true })`的作用如果to,找不到对应的路由，就再执行beforeEach函数，直到找到对应路由位置。

`next(to)`与`next({ ...to, replace: true })`与`next({ ...to })`的作用类似。
