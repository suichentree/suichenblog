---
title: Windows下把SSL证书导入JDK的cacerts证书库
date: 2022-11-10
sidebar: 'auto'
categories: 
 - 随笔
---

# Windows下如何把安全证书导入到JDK的cacerts证书库

使用场景：当你在本地环境下调用其他网站的服务时。由于其他网站地址是HTTPS开头的，这时你的java代码中必须包含该网站的SSL安全证书。因此如何把SSL证书导入JDK中的cacerts的证书库呢？

## 下载网站的SSL证书

1. 点击网站的小锁的图标，弹出网站证书信息，点击“证书信息”，再点击详细信息。
2. 此时弹出一个证书导出的向导对话框，按提示就可以将证书导出到本地。


## 把SSL证书导入到JDK 中的cacerts的证书库里

① 以管理员身份运行cmd
② 假设jdk安装在C:/Program Files/Java/jdk1.8.0_111目录上。需要运行以下命令

```
keytool -import -v -trustcacerts -alias chutianyun.gov.cn -file C:/Users/Administrator/Desktop/chutianyun.gov.cn.cer -storepass changeit -keystore "C:/Program Files/Java/jdk1.8.0_111/jre/lib/security/cacerts"
```

1. chutianyun.gov.cn 为证书名称，名称随便取。需要保证jdk中没有同名证书。
2. C:/Users/Administrator/Desktop/chutianyun.gov.cn.cer 为证书所在地址
3. changeit是密码，jdk默认的
4. 如果提示：“是否信任此证书？[ 否]：”，那么请输入“y” 。当出现：“证书已添加到密钥库中[ 正在存储cacerts] ”的时候，那么恭喜你已经添加成功

③ keytool 常用命令

```
//查看的jdk cacerts证书库中的证书列表
keytool -list -keystore"C:/Program Files/Java/jdk1.8.0_111/jre/lib/security/cacerts"-storepass changeit

// 删除cacerts证书库中指定名称的证书：
keytool -delete -alias chutianyun.gov.cn -keystore"C:/ProgramFiles/Java/jdk1.8.0_65/jre/lib/security/cacerts"-storepass changeit
```

