---
title: vue-cli脚手架项目中使用自定义组件,父组件向子组件传递数据
date: 2022-07-18
sidebar: 'auto'
categories: 
 - 前端
tags:
 - Vue
---


## 使用自定义组件,父组件向子组件传递数据

1. vue-cli中的所有组件都是存放在components文件夹下面的，在components文件夹下面创建一个名为detail-model.vue的自定义组件。

```vue
<template>
    <div>
        <h1>111111</h1>
    </div>
</template>
<script>
export default {
    // name 表示设置别名。建议和组件的名称一致
    name:"DetailModel",
    data(){
        return{
        }
    }
}
</script>
```

2. 在主页面中引入自定义组件detail-model，并在主组件中设置传递给子组件的数据

```vue
<template>
  <div>
      <!--自定义组件-->
      <!-- 可以通过props向子组件传值，子组件里要用props接受 -->
      <Detail-Model :storyInfo="storyInfo" :allUserInfo="allUserInfo"></Detail-Model>
  </div>
</template>

<script>
// 1、导入自定义组件。DetailModel即自定义组件设置的name值
import DetailModel from './components/detail-model'
export default {
    data() {
      return {
        //3. 传给子组件的数据
        storyInfo:"",
        allUserInfo:[]
      }
    },
    // 2、添加自定义组件
    components:{
        First
    }
}
</script>
```

3. 在子组件中接受父组件传过来的数据

<font color="red">注意：props中的数据不能修改，所以需要中转</font>

```vue
<template>
    <div>
        <h1>111111</h1>
    </div>
</template>
<script>
export default {
    name:"DetailModel",
    //1. 通过props接受父组件的传值
    props: ["storyInfo","allUserInfo"],
    data(){
        return{
            //2.接受props中的值
            MyStoryInfo:this.storyInfo,
            MyAllUserInfo:this.allUserInfo
        }
    }
}
</script>
```