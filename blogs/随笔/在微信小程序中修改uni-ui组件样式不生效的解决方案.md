---
title: 在微信小程序中修改uni-ui组件样式不生效的解决方案
date: 2025-03-18
sidebar: 'auto'
categories: 
 - 随笔
---

[toc]

# 在微信小程序中修改uni-ui组件样式不生效的解决方案

在使用uniapp框架开发微信小程序时，使用到了uni-ui的组件。由于需要修改组件的某些样式，因此在微信开发工具中使用调试工具审查元素获取其class名称。

但是直接再页面中对该class添加样式，发现不生效。

> 问题原因：

查询微信平台官方开发文档得知，微信中的组件存在组件样式隔离，即自定义组件的样式只受到自定义组件 wxss 的影响。

> 解决方法：

1. 使用深度选择器，修改组件样式

```css
::v-deep .uni-table-th {
	background-color: #ddd;
}
```

2. 如果想在页面修改该组件的样式，需要在施加影响的页面中加入选项：

```js
  export default {
        options: {
            styleIsolation: 'shared', // 解除微信小程序的样式隔离
        },
        data() {
           ....
        }
    }
```