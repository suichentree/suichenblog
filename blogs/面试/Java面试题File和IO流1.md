---
title: Java面试题-File/IO/NIO
date: 2020-11-24
sidebar: 'auto'
categories:
 - 面试
tags:
 - Java
---

[toc]

## Java面试题-File/IO/NIO

### 1.Java 中有几种类型的流？
字节流和字符流。字节流继承于 InputStream、OutputStream，字符流继承于Reader、Writer。

### 2.写一个方法，输入一个文件名和一个字符串，统计这个字符串在这个文件中出现的次数？

```java
public static int countWordInFile(String filename, String word) {
		int counter = 0;
		try (FileReader fr = new FileReader(filename)) {
			try (BufferedReader br = new BufferedReader(fr)) {
				String line = null;
				while ((line = br.readLine()) != null) {
					int index = -1;
					while (line.length() >= word.length() && (index =
					line.indexOf(word)) >= 0) {
						counter++;
						line = line.substring(index + word.length());
					}
				}
			}
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return counter;
}
```

### 3.如何用 Java 代码列出一个目录下所有的文件？

```java
public static void aaa() {
	File f = new File("/Users/Hao/Downloads");
	for (File temp : f.listFiles()) {
		if(temp.isFile()) {
			System.out.println(temp.getName());
		}
	}
}
```

### 4.Java怎么获取一个文件中单词出现的最高频率？
1. 将文件内容存入String字符串中。
2. 利用split()函数分割字符串，因为直接替换英文空格或者,逗号分隔就可以了，中文类似，分隔得到一个数组。 
3. 遍历数组中所有的单词，统计结果Map 中,key=单词，value=单词出现的次数。 
4. 使用TreeSet类型，对Map中的结果进行排序，依据统计次数。
5. 输出最高的排序的前N名结果
