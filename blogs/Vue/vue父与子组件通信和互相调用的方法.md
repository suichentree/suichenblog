---
title: vue父与子组件通信和互相调用的方法
date: 2021-03-19
sidebar: 'auto'
categories: 
 - 前端
tags:
 - Vue
---

有些时候，我们需要在父组件页面中触发操作时会修改子组件的某个数据。因此需要组件之间可以互相通信。

<font color="red">PS:子与子之间通信的前提是有一个共同的父亲.</font>

```
1. 父组件对子组件方法的调用：this.$refs.childRef.childMethod(....)。前提要在引用子组件的地方给子组件设置标签。

2. 子组件对父组件的方法的调用：this.$parent.fatherMethod(....)。还能隔辈引用，this.$parent.$parent，对爷爷辈的引用。

3. 子组件1对子组件2的方法调用：this.$parent.$refs.child2Ref.child2Method(...)，同样可推隔辈使用的方法。
```

父组件code:

```html
<template>
<div id="parent">
    <!--这里一定要通过ref标签进行注册，父组件才能调用子组件方法-->
    <child1Label ref="child1Ref"></child1Label>
    <child2Label ref="child2Ref"></child2Label>
    <button @click="fatherMethod2">调c2方法</button>
</div>
</template>
<script>
import child1 from "@/components/child1"
import child2 from "@/components/child2"
export default{
 
    data(){
        return{
        }
    },
    methods:{
        fatherMethod1:function(){
              console.log('这是父组件的方法');
        },//子组件能调用父组件方法，就能通过方法修改父组件属性字段的值,也就相当于实现了通信功能
        fatherMethod2:function(){
            this.$refs.child2Ref.child2Method();
        }
    },
    components:{
        child1Label:child1,
        child2Label:child2,
    },
}
</script>
```


子组件code

```html
<template>
<div id="child1">
    <button @click="child1Method">子组件1</button>
</div>
</template>
<script>
export default{
    data(){
        return{
 
        }
    },
    methods:{
        child1Method:function(){
              console.log('这里使子组件1的方法');
               this.$parent.fatherMethod1();//调用父组件的方法
               this.$parent.$refs.child2Ref.child2Method();//调用子组件2的方法
        }
    },
}
</script>
```