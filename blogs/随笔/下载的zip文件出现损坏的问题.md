---
title: 本地下载zip文件有可能导致zip损坏
date: 2021-03-19
sidebar: 'auto'
categories: 
 - 随笔
tags:
 - Java
---

本地下载文件导致文件损坏，特别是下载带有中文名称的zip压缩包。有可能wps能打开，但是office打不开。或者导致压缩包里面的文件损坏？

主要有两个原因：
1. 当下载路径出现中文,并且带有中文的下载路径层级太多导致的。
2. 代码出现小问题。通过缓存数组读取文件流时，最后一次读取有可能没填充满缓存数组。导致写入数据时异常


```java
    //下载文件到本地
    public static boolean downloadFile(String fileUrl, String fileLocal) throws Exception {
        boolean flag = false;
        URL url = new URL(fileUrl);
        HttpURLConnection urlCon = (HttpURLConnection) url.openConnection();
        urlCon.setConnectTimeout(6000);
        urlCon.setReadTimeout(6000);
        int code = urlCon.getResponseCode();
        if (code != HttpURLConnection.HTTP_OK) {
            throw new Exception("文件读取失败");
        }
        //读文件流
        DataInputStream in = new DataInputStream(urlCon.getInputStream());
        DataOutputStream out = new DataOutputStream(new FileOutputStream(fileLocal));
        byte[] buffer = new byte[1024];
        int count = 0;
        while ((count = in.read(buffer)) > 0) {
            out.write(buffer, 0, count); //并不是每次都能读到1024个字节，所有用readTmp作为每次读取数据的长度，否则会出现文件损坏的错误
        }
        try {
            if (out != null) {
                out.close();
            }
            if (in != null) {
                in.close();
            }
 
        } catch (Exception e) {
            e.printStackTrace();
        }
        flag = true;
        return flag;
    }
```