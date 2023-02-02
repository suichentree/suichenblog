---
title: File类读取resources目录文件
date: 2023-02-02
sidebar: 'auto'
categories: 
 - 后端
 - 随笔
tags:
 - Java
---

## File类读取resource/static目录下某个文件（适用于jar包部署到Ubuntu/Linux）

### 读取json文件中的json数据，用来模拟接口返回数据

aaa.json文件中的json数据
```json
{
"accessToken":"1111111111111",
"expiresIn":"111111111"
}
```

```java
    /**
     * 读取static目录中的json文件，用于模拟接口返回数据
     * @return
     */
    @PostMapping(value="/test/aaa")
    public Object aaa() throws IOException {
        ClassPathResource classPathResource = new ClassPathResource("static/aaa.json");
        InputStream inputStream = classPathResource.getInputStream();
        Reader reader = new InputStreamReader(inputStream,"utf-8");
        int ch = 0;
        StringBuffer sb2 = new StringBuffer();
        while ((ch = reader.read()) != -1) {
            sb2.append((char) ch);
        }
        reader.close();
        log.info("sb2="+String.valueOf(sb2));
        return sb2;
    }
```
