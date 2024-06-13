---
title: Python使用oss2库笔记
date: 2024-06-13
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
---

[toc]

# Python使用oss2库笔记

oss2 是阿里云面向对象存储服务的Python开发工具库。简单来说就是通过 oss2 库可以方便操作阿里云面向对象存储OSS。


## 安装

```bash
pip install oss2
```

## 上传文件到阿里云的面向对象存储OSS 方式1

```py
import oss2
import random

def test_oss():
    # 阿里云的ak和密钥
    access_key_id = "LTAxxxxxxxxxxxxxxxxxx"
    access_key_secret = "whCxxxxxxxxxxxxxxxxxxxxx"
    # 阿里云OSS的网址
    endpoint = 'https://oss-cn-guangzhou.aliyuncs.com'
    # 对象桶名称
    bucket_name = 'shuyx01'

    # 根据上面的信息来创建OSS的权限对象
    auth = oss2.Auth(access_key_id, access_key_secret)
    # 通过权限对象来初始化Bucket对象
    bucket = oss2.Bucket(auth, endpoint, bucket_name)

    # 本地上传文件的路径
    jpgPah = "C:\\Users\\18271\\Desktop\\face_video\\img\\35.png"

    # 被上传文件，在OSS中新的文件名称
    oss_file_path = "2024/06/aaa"

    # 上传文件到阿里云oss上
    result = bucket.put_object_from_file(oss_file_path, jpgPah)

    print(f"上传结果 result 为 {result.resp.response.url}")


if __name__ == '__main__':
    test_oss()

```

## 上传文件到阿里云的面向对象存储OSS 方式2

```py
def test_oss2():
    # 阿里云的临时 ak和密钥
    accessKeyId = 'STS.NU7xxxxxxxxxxxxxxxxxxxxx'
    accessKeySecret = '6Hxxxxxxxxxxxxxxxxxxxxx'
    # 阿里云的stsToken
    stsToken = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    
    endpoint = 'https://oss-cn-guangzhou.aliyuncs.com'
    bucket_name = 'safetysystem'

    # 获取STS临时访问密钥和安全令牌配置访问凭证。
    auth = oss2.StsAuth(accessKeyId,accessKeySecret,stsToken)
    # 初始化Bucket对象
    bucket = oss2.Bucket(auth, endpoint, bucket_name)

    # 阿里云OSS上的文件路径 注意结尾的斜杠
    oss_file_dir = "default/202406/12/"
    # 拼接完整文件路径
    oss_file_path = oss_file_dir + random.choice('abcdefghijklmnopqrstuvwxyz')
    # 本地上传文件路径
    jpgPah = "C:\\Users\\18271\\Desktop\\face_video\\img\\35.png"

    # 上传文件到阿里云oss上
    result = bucket.put_object_from_file(oss_file_path, jpgPah)

    print(f"截图上传结果 result 为 {result.resp.response.url}")


if __name__ == '__main__':
    test_oss2()

```