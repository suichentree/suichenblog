---
title: SSL证书,把xxx_chain.crt和xxx_public.crt 合并为xxx.pem 文件
date: 2021-03-15
sidebar: 'auto'
categories:
 - 随笔
---

## SSL证书,把xxx_chain.crt和xxx_public.crt 合并为xxx.pem 文件

把xxxxxxx_public.crt 和 xxxxxxx_chain.crt合并成一个.pem 文件。

方法：直接txt打开两个文件，复制内容保存成一个文件，命名为.pem文件格式即可。需要注意的是xxxxxxx_public.crt内容放前面，不要留空行。