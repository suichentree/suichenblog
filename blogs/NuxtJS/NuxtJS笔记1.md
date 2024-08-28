---
title: NuxtJS笔记1
date: 2024-08-28
sidebar: 'auto'
categories: 
 - 前端
tags:
 - NuxtJS
---

[toc]

# NuxtJS笔记1

## NuxtJS 介绍

> 什么是NuxtJS

Nuxt.js 是一个基于 Vue.js 的开源框架，用于创建服务端渲染（SSR）的应用程序，或者静态生成的网站。

Nuxt.JS的功能如下
- 服务端渲染（SSR）：可以在服务器上渲染 Vue 组件，生成的 HTML 会被发送到客户端，从而改善 SEO 和加载时间。
- 静态站点生成：可以将网站的所有页面预先生成成静态文件，适用于静态网站托管。
- 路由管理：自动生成路由，减少手动配置。
- 插件支持：支持 Vue 插件和中间件的集成。
- 模块系统：提供了一些官方模块（例如 @nuxt/auth、@nuxt/http 等）和社区模块以扩展功能。
- 配置和开发工具：提供开发工具、配置选项和构建工具，以简化开发和部署过程。

另外, Nuxt.js 的简称或缩写为Nuxt。在日常交流中，开发者们通常使用 Nuxt 这个简短的名称来指代 Nuxt.js 框架。

## 创建 Nuxt 项目

① 安装 Nuxt之前，我们需要先更换一下NPM的仓库源。从而防止Nuxt安装失败。

```js
// 最新地址 淘宝的 NPM 镜像
npm config set registry https://registry.npmmirror.com

//查询npm使用的镜像
npm config get registry

//如果不想用淘宝镜像，也可以更换为官方镜像
npm config set registry https://registry.npmjs.org

```

② 安装并创建Nuxt项目

```js
// 
npx nuxi@latest init <project-name>

```









