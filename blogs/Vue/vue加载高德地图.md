---
title: vue加载高德地图的API.js文件,页面渲染高德地图
date: 2021-03-19
sidebar: 'auto'
categories: 
 - 前端
tags:
 - Vue
---

<font color="red">ps：vue来加载外部js文件</font>

下面代码中使用了vant框架
```html
<template>
    <div class="gaud-map">
        <div class="map-header">
            <van-nav-bar
            title="地址"
            left-arrow
            @click-left="onClickLeft"
        </div>
        <div id='container' style="position: absolute; width: 100%; height: 100%"></div>
    </div>
</template>
<script scoped>
import { NavBar ,Image as VanImage} from 'vant';
import Axios from 'axios';
export default {
    data() {
        return {
            map:null
        }
    },
    components: {
        [NavBar.name]: NavBar,
        [VanImage.name]: VanImage,
    },
    methods: {
        //返回
        onClickLeft() {
            window.history.back(-1);
        },
        //获取坐标并绘制地图
        mapInit(address){
            var p = [];
            let that = this;
            const instance = Axios.create({
                baseURL: 'https://restapi.amap.com/v3'
            });
            //key是调用高德地图API的密钥参数
            instance.get("/geocode/geo?address="+address+"&key=XXXXXXX")
            .then(function (response) {
                //获取地址坐标
                console.log("地址格式化",response.data.geocodes[0].formatted_address);
                console.log("地址具体坐标",response.data.geocodes[0].location);
                p = response.data.geocodes[0].location.split(',');

                //显示地图
                 //导入高德地图的web_js_api
                var url = 'https://webapi.amap.com/maps?v=2.0&key=XXXXXXX&callback=onLoad';
                var jsapi = document.createElement('script');
                jsapi.src = url;
                document.head.appendChild(jsapi);
                window.onLoad  = function(){ 
                    //生成地图
                    this.map = new AMap.Map('container',{
                        resizeEnable: true,
                        center:p,//中心点
                        zoom: 14
                    });
                    //生成点标记,添加到地图
                    var marker = new AMap.Marker({
                        position:p, //点标记位置
                    })
                    this.map.add(marker);
                }
            }).catch(function (error) {
                console.log("error",error);
            　　 that.$toast("获取坐标失败");
            });
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        //从页面链接中获取地址信息
        var address = this.$route.query.address;
        //绘制地图
        this.mapInit(address);
        //加载动画
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
        });
    },
    destoryed() {
        this.map.destroy();
    },
}
</script>
```