---
title: Java IO(输入输出)
date: 2022-06-10
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Java
---

[toc]

## 1. IO(输入输出)

>==程序从输入流中读取数据，向输出流中写入数据。==
>IO流分为字节流，字符流。
>字节流用java.io.InputStream 和 java.io.OutputStream 表示输入输出流。
>字符流用java.io.Reader 和 java.io.Writer 表示输入输出流。

### 1.字节流

>java中字节流的最顶级的两个抽象类为InputStream 和 OutputStream

![48](../blog_img/java_img_48.png)

#### 1.抽象类InputStream，OutputStream

>InputStream的常用方法

方法 | 描述
----- |  -----
int read() | 读取一个字节，把它转换为0~255的整数，并返回该整数。
int read(byte[] b)  |  读取字节，并保存到字节数组b中，返回读取的字节数
int read(byte[] b,int off,int len) | 读取字节，并保存到b字符数组中，其中off为数组的开始下标，len为读取的字节数
void close() | 关闭输入流
 
>OutputStream的常用方法

方法 | 描述
----- |  -----
void writer(int b) | 向输出流写入一个字节b
void writer(byte[] b)  |  把字节数组写入到输出流中
void writer(byte[] b,int off,int len) | 把数组中从off下标开始的字节写入len个长度到输出流中。
void flush() | 刷新输出流
void close() | 关闭输出流

#### 2.字节流读写文件---FileInputStream和FileOutputStream

>Java提供FileInputStream 和 FileOutputStream来读写文件数据。
>FileInputStream 和 FileOutputStream 分别是InputStream，OutputStream的实现类。

```java
public class human{  
	public static void main(String[] args) throws Exception {
		//父类引用指向子类对象，创建文件字节输入流
		FileInputStream f = new FileInputStream("C:\\Users\\Desktop\\a.txt");
		int b=0;   //记住每次读取的一个字节
		while(true) {
			b=f.read();   //记住每次读取的一个字节
			if(b==-1) {
				break;
			}
			System.out.println(b);
		}
		f.close();  //关闭输入流
	}
}

/*
运行结果：（文件内容:this is a.txt）
116
104
105
115
32
105
115
32
97
46
116
120
116
13
10
*/

----------------------------

public static void main(String[] args) throws Exception {
	//创建文件字节输出流，用于写入数据到文件中
	FileOutputStream os = new FileOutputStream("C:\\Users\\Desktop\\a.txt");
	String str="hello world";
	byte[] b=str.getBytes();   //把字符串转换为字符数组
	for(int i=0;i<b.length;i++) {
		os.write(b[i]);   //把字符数组的数据写入到文件中
	}
	os.close(); 
}
/*
运行结果：hello world
*/
```

<font color="red">

通过FileOutputStream写入数据到文件：
1.步骤把原先文件内容清空，再写入数据。
2.如果文件不存在，会创建一个新的文件，再写入数据。 

</font>

<h4>如何写入数据时，原先的数据不会被清空？</h4>

>使用FileOutputStream的构造函数FileOutputStream(String fname,boolean append)，把append设置为true时，写入数据时，原先数据不会被清空。

```java
FileOutputStream os = new FileOutputStream("C:\\Users\\Desktop\\a.txt",true);
```
#### 3.文件拷贝

```java
public static void main(String[] args) throws Exception {
	//输入流读取文件数据
	FileInputStream fin=new FileInputStream("C:\\Users\\Desktop\\a.txt");
	//输出流写入数据到b文件
	FileOutputStream os = new FileOutputStream("C:\\Users\\Desktop\\b.txt");
	int t=0;   //存储读取的一个字节
	while(true) {
		t=fin.read();
		if(t==-1) {   //-1表示读取数据完毕
			break;
		}
		os.write(t);    //把从文件a读取的数据，写入到文件b中
	}
	
	fin.close();
	os.close(); 
	}
```

#### 4.字节流缓冲区

>通过定义一个字节数组作为缓冲区，来提高字节流读取写入的效率。
>例：通过缓冲区来拷贝文件：

```java
public static void main(String[] args) throws Exception {
	//输入流读取文件数据
	FileInputStream fin=new FileInputStream("C:\\Users\\Desktop\\a.txt");
	//输出流写入数据到b文件
	FileOutputStream os = new FileOutputStream("C:\\Users\\Desktop\\b.txt");
	byte[] b=new byte[1024];  //定义字节数组作为缓冲区
	int t;   //临时存储一个字节
	while(true) {
		t=fin.read(b);
		if(t==-1) {   //-1表示读取数据完毕
			break;
		}
		os.write(b);   //把缓冲区的数据写入到文件b中
	}
	
	fin.close();
	os.close(); 
	}
```

#### 5.字节缓冲流---BufferedInputStream , BufferedOutputStream 

>这两个流在读写数据时提供缓冲功能。
>BufferedInputStream的实例化需要FileInputStream的对象
>BufferedOutputStream的实例化需要FileOutputStream的对象

```java
public static void main(String[] args) throws Exception {
	FileInputStream fin=new FileInputStream("C:\\Users\\Desktop\\a.txt");
	BufferedInputStream bs=new BufferedInputStream(fin);

	FileOutputStream os = new FileOutputStream("C:\\Users\\Desktop\\b.txt");
	BufferedOutputStream bo=new BufferedOutputStream(os);
	int t;   //临时存储一个字节
	while(true) {
		t=bs.read();
		if(t==-1) {   //-1表示读取数据完毕
			break;
		}
		bo.write(t);   //把缓冲区的数据写入到文件b中
	}

	bs.close();
	bo.close(); 
	}
```

### 2.字符流

>字符流有两个顶级抽象类Reader,Writer.

![49](../blog_img/java_img_49.png)

#### 1.字符流读写文件---FileReader,FileWriter

```java
public static void main(String[] args) throws Exception {
	FileReader fr=new FileReader("C:\\Users\\Desktop\\a.txt");
	int t;   //存储一个字符
	while(true) {
		t=fr.read();  
		if(t==-1) {
			break;
		}
		System.out.println((char)t);  //强制转换为字符
	}
	fr.close();
	
}

//--------------------

public static void main(String[] args) throws Exception {
	FileWriter fw=new FileWriter("C:\\Users\\Desktop\\a.txt");
	String str="good bybe";
	fw.write(str);     //把字符串写入文件a中
	fw.close();
}

```

<font color="red">FileWriter会把文件原先的数据清空，在写入数据。</font>

>若向写入数据时，原先数据不被清空，则：

```java
FileWriter fw=new FileWriter("C:\\Users\\Desktop\\a.txt",true);
```

#### 2.字符缓冲流---BufferedReader , BufferedWriter 

>这两个流在读写数据时提供缓冲功能。
>BufferedReader的实例化需要FileReader的对象
>BufferedWriter的实例化需要FileWriter的对象

>例：拷贝文件

```java
public static void main(String[] args) throws Exception {
	FileReader fr=new FileReader("C:\\Users\\xxx\\Desktop\\a.txt");
	BufferedReader br=new BufferedReader(fr);

	FileWriter fw = new FileWriter("C:\\Users\\xxx\\Desktop\\b.txt");
	BufferedWriter bw=new BufferedWriter(fw);

	String str;
	while(true) {
		str=br.readLine();   //每次读取一行数据
		if(str==null) {   //null表示读取数据完毕
			break;
		}
		bw.write(str);   //把缓冲区的数据写入到文件b中
	}
	br.close();
	bw.close(); 
}
```


## 2.File类

>java提供File类用于操作文件。

File类的构造方法：
方法 | 描述
----- | -----
File(String pathname) | 通过路径名来创建一个File对象
File(String parent,String child) | 通过父路径，子路径创建一个File对象
File(File parent,String child) | 根据父文件与子路径来创建File对象

```java
public static void main(String[] args) throws Exception {
	//根据路径创建文件的实例化对象
	File file=new File("C:\\Users\\束永祥\\Desktop\\a.txt");
	System.out.println("文件名称 ："+file.getName());
	System.out.println("文件的相对路径："+file.getPath());
	System.out.println("文件的绝对路径："+file.getAbsolutePath());
	System.out.println("判断是否是一个文件："+file.isFile());
	System.out.println("判断是否是一个目录："+file.isDirectory());
	System.out.println("删除文件："+file.delete());
}
```
![50](../blog_img/java_img_50.png)
![51](../blog_img/java_img_51.png)
![52](../blog_img/java_img_52.png)


<h4>①遍历目录下的第一层文件（若目录有文件，则无法遍历）：</h4>

```java
public static void main(String[] args) throws Exception {
		//根据路径创建实例化对象
		File file=new File("D:\\study");
		//判断是否是一个目录
		if(file.isDirectory()) {
			String[] str=file.list();//获得该目录下的所有文件名
			for(String s:str) {
				System.out.println(s);
			}
			
		}
}
```

<h4>①遍历目录下的所有文件（包括子目录中的文件）：</h4>

```java
public static void main(String[] args) throws Exception {
		//根据路径创建实例化对象
		File file=new File("D:\\study");
		//判断是否是一个目录
		if(file.isDirectory()) {
			File[] f=file.listFiles();  //获取目录下的所有文件与子目录
			for(File fo:f) {
				System.out.println(fo);
				//对每一个文件对象再次遍历
				if(fo.isDirectory()) {
					String[] str=fo.list();  //获取目录下的所有文件名
					for(String s:str) {
						System.out.println(s);
					}
				}
			}
		}
	}
```

![537](../blog_img/java_img_53.png)
