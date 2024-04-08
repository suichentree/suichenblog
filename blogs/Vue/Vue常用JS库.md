---
title: Vue常用JS库
date: 2024-04-08
sidebar: 'auto'
categories:
 - 前端
tags:
 - Vue
---

[toc]

# Vue常用JS库

此处记载在vue工程中常用的JS库。

## CryptoJS库：加密解密

### 加密介绍

加密分为对称加密和非对称加密。

> 对称加密

对称加密是指使用相同的密钥来进行加密和解密。

对称加密的使用场景：对大量数据或关键数据的加密，如请求参数。

常见的对称加密算法有：DES、3DES、AES和RC4等。
- AES使用固定长度的密钥（128位、192位或256位）对数据进行加密和解密，相较于DES和3DES更为安全。
- AES使用代替、置换和混淆等操作来实现高强度的加密。
- AES的加密速度较快，因为它使用了高度优化的算法，目前被广泛应用于各种安全领域。

对称加密的优点：算法公开、计算量小、加解密速度快、适合对大量数据进行加密处理。

对称加密的缺点：发送方和接收方必须商定好密钥，并使用该密钥进行加密和解密操作。并确保密钥的安全管理。

> 非对称加密

非对称加密是指使用一对不同但相关的密钥，分别称为公钥（Public Key）和私钥（Private Key）。公钥用于加密数据，而私钥用于解密数据或者进行数字签名。公钥可以被公开传播，而私钥则必须私密保存。

非对称加密的使用场景：对安全性要求很高的场景，适合加密少量数据，如支付数据、CA数字证书、身份验证等。

常见的非对称加密算法：RSA、DSA 和ECC。RSA2比RSA有更强的安全能力。

非对称加密优点：密钥管理较为方便，不需要事先共享密钥。

非对称加密缺点：加解密速度较慢，不适合对大量数据进行加密处理。

### CryptoJS库使用

crypto-js是一个用于对称加密的加密解密JS库。

> 安装依赖

```js
import CryptoJS from 'crypto-js'
```

> 在vue组件中使用CryptoJS进行加密和解密

```html
<template>
  <div>
    <input v-model="inputData"/>
    <button @click="encryptData">Encrypt</button>
    <button @click="decryptData">Decrypt</button>
    <p>Encrypted Data: {{ encryptedData }}</p>
    <p>Decrypted Data: {{ decryptedData }}</p>
  </div>
</template>
 
<script>
import CryptoJS from 'crypto-js'

export default {
  data() {
    return {
      inputData: '',
      encryptedData: '',
      decryptedData: ''
    }
  },
  methods: {
    encryptData() {
      const secretKey = 'your-secret-key' // 一个复杂的密钥
      //AES加密
      this.encryptedData = CryptoJS.AES.encrypt(this.inputData, secretKey).toString()
    },
    decryptData() {
      const secretKey = 'your-secret-key'
      //AES解密
      const bytes = CryptoJS.AES.decrypt(this.encryptedData, secretKey)
      this.decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    }
  }
}
</script>
```

## js-cookie库：处理cookie

js-cookie是一个简单的,轻量级的处理cookies的JS库。

> 安装依赖

```
npm install js-cookie
```

> 使用

```js
import Cookies from 'js-cookie'

// 添加cookie ======================
// 创建一个名称为name，对应值为value的cookie，由于没有设置失效时间，默认失效时间为该网站关闭时
Cookies.set(name, value)
// 创建一个有效时间为7天的cookie
Cookies.set(name, value, { expires: 7 })
// 创建一个带有路径的cookie
Cookies.set(name, value, { path: '' })
// 创建一个对象的cookie
const obj = { name: 'ryan' }
Cookies.set('user', JSON.stringify(obj))

// 获取cookie ======================
// 获取指定名称的cookie
Cookies.get(name) // value
// 获取对象的cookie
const obj = { name: 'ryan' }
Cookies.set('user', JSON.stringify(obj))
JSON.parse(Cookies.get('user'))
// 获取所有cookie
Cookies.get()

// 删除cookie ======================
// 删除指定名称的cookie
Cookies.remove(name) // value
// 删除带有路径的cookie
Cookies.set(name, value, { path: '' })
Cookies.remove(name, { path: '' })


```