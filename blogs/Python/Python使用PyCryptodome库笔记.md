---
title: Python使用PyCryptodome库笔记
date: 2024-07-15
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
---

[toc]

# Python使用PyCryptodome库笔记

PyCryptodome是Python的一个强大的加密库，适用于需要数据安全传输和存储的应用场景。

PyCryptodome同时也是基于PyCrypto项目的一个分支，旨在提供更多功能和更好的维护。

[PyCryptodome 官方文档](https://pycryptodome.readthedocs.io/en/latest/index.html#)

## PyCryptodome介绍

Python 的 pycryptodome 库是一个功能强大的密码学工具，提供了丰富的加密、解密、哈希和认证算法的实现。

它支持多种加密算法，包括对称加密（如AES、DES、Blowfish）、非对称加密（如RSA）、哈希算法（如SHA-256、SHA-512）、消息认证码（如HMAC）等。它提供了比较全面的加密功能，可以满足各种安全需求。

> PyCryptodome的功能特点
1. 丰富的模式和填充支持: 支持常见的加密模式，如ECB、CBC、CTR等，以及常见的填充方案，如PKCS7、ISO7816等。
2. 易用性: PyCryptodome提供了简单且一致的API，使得加密和解密过程相对容易。
3. 跨平台性: 支持在多个平台上运行，包括Windows、Linux、macOS等.
4. 活跃的社区和维护: PyCryptodome是一个活跃维护的项目，有一个专门的开发团队负责其更新和维护。
5. 文档和示例丰富。

## 安装

pip的方式安装PyCryptodome
```bash
pip install pycryptodome

# 将PyCryptodome升级到最新版本（可选）
pip install --upgrade pycryptodome

```

## 用法



### 非对称加密

非对称加密使用一对密钥，公钥用于加密，私钥用于解密。pycryptodome 支持多种非对称加密算法的实现，如 RSA、DSA、ElGamal 等。

```py
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP

# 生成密钥对
key = RSA.generate(2048)
# 获取公钥和私钥
public_key = key.publickey()
private_key = key

# 加密函数
def encrypt(message):
    cipher = PKCS1_OAEP.new(public_key)
    # 将字符串转换为byte，之后再进行加密
    ciphertext = cipher.encrypt(message.encode('utf-8'))
    return ciphertext

# 解密函数
def decrypt(encrypted_message):
    cipher = PKCS1_OAEP.new(private_key)
    # 将密文解密
    plaintext = cipher.decrypt(encrypted_message)
    # 将解密后的密文，从byte转换为字符串
    return plaintext.decode('utf-8')

# 测试加密解密过程
message = "Hello World"
print(f"原文 message = {message}")
encrypted_message = encrypt(message)
print(f"加密密文 encrypted_message = {encrypted_message}")
decrypted_message = decrypt(encrypted_message)
print(f"解密后的密文 decrypted_message = {decrypted_message}")
```

### AES加密和解密的简单示例

在这个示例中，使用了AES算法和ECB模式来加密和解密数据。
- 加密时，消息被填充到AES块大小的倍数，并使用Base64编码生成可打印的密文。
- 解密时，需要先解码Base64，然后使用相同的密钥和模式进行解密和填充去除。

```py
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad
import base64

# 生成一个随机的AES密钥
key = get_random_bytes(16)
cipher = AES.new(key, AES.MODE_ECB)

# 加密函数
def encrypt(message):
    # 把原文先进行填充一次
    padded_message = pad(message.encode('utf-8'), AES.block_size)
    # 加密填充后的数据
    ciphertext = cipher.encrypt(padded_message)
    return base64.b64encode(ciphertext).decode('utf-8')

# 解密函数
def decrypt(encrypted_message):
    ciphertext = base64.b64decode(encrypted_message)
    decrypted_message = cipher.decrypt(ciphertext)
    return unpad(decrypted_message, AES.block_size).decode('utf-8')

# 测试加密解密过程
message = "Hello, world!"
print(f"原文 message = {message}")
encrypted = encrypt(message)
print(f"加密密文Encrypted = {encrypted}")
decrypted = decrypt(encrypted)
print(f"解密后的原文Decrypted = {decrypted}")

```

### 哈希函数

哈希函数将任意长度的数据映射为固定长度的哈希值，常用于数据完整性校验和密码存储。

pycryptodome 提供了多种哈希函数的实现，如 SHA-256、MD5、SHA-1 等。

```py
from Crypto.Hash import SHA256
hash_object = SHA256.new(b'Message digest')
hex_dig = hash_object.hexdigest()
print(hex_dig)  # 打印哈希值
```

### 消息认证码

消息认证码是一种用于验证消息完整性和真实性的技术。

pycryptodome 提供了多种消息认证码算法的实现，如 HMAC、CMAC 等。

```py
# 计算 HMAC
from Crypto.Hash import HMAC, SHA256
key = b'123456'
message = b'hello world'
h = HMAC.new(key, message, digestmod=SHA256)
print(h.hexdigest())  # 打印HMAC值
```

### 密码学安全随机数生成器

```py
from Crypto.Random import random
# 生成密码学安全随机数
crypto_random = random.getrandbits(128)
print(f"crypto_random = {crypto_random}")
```
