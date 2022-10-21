---
title: java随笔1
date: 2021-03-15
sidebar: 'auto'
categories: 
 - 后端
 - 随笔
tags:
 - Java
---

[toc]

### 1.Java的打包jar、war包的作用与区别详解

>jar包
包含内容：class、properties文件，是文件封装的最小单元；包含Java类的普通库、资源（resources）、辅助文件（auxiliary files）等

>war包
包含内容：Servlet、JSP页面、JSP标记库、JAR库文件、HTML/XML文档和其他公用资源文件，如图片、音频文件等

### 2.java中两个double类型相加为什么会变成有很多小数位的小数?

问题：
```java
Double d1=904163.08;
Double d2=210298.99;
Double totalmoney1=d1+d2; 
// 结果是：1114462.0699999998
```

解决方法：
```java
BigDecimal b1 = new BigDecimal(Double.toString(904163.08));
BigDecimal b2 = new BigDecimal(Double.toString(210298.99));
System.out.println(b1.add(b2).doubleValue());
//结果1114462.07
```

原因：浮点数没有办法是用二进制进行精确表示。例如：2.4的二进制表示并非就是精确的2.4。反而最为接近的二进制表示是 2.3999999999999999。所以才会出现很多为小数的情况。

### 3.JAVA 根据时间戳判断日期是否为今天、昨天

原理：计算两个时间之间的天数差，用SimpleDateFormat对时间进行一次格式化，丢掉天数之外的精度，再计算时间差

```java
private static String handleDate(long time) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(time);
        Date old = sdf.parse(sdf.format(date));
        Date now = sdf.parse(sdf.format(new Date()));
        long oldTime = old.getTime();
        long nowTime = now.getTime();

        long day = (nowTime - oldTime) / (24 * 60 * 60 * 1000);

        if (day < 1) {  //今天
            SimpleDateFormat format = new SimpleDateFormat("HH:mm");
            return format.format(date);
        } else if (day == 1) {     //昨天
            SimpleDateFormat format = new SimpleDateFormat("HH:mm");
            return "昨天 " + format.format(date);
        } else {    //可依次类推
            SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
            return format.format(date);
        }
    }
```

### 4 Java中List集合去除重复数据的四种方法

1. 循环list中的所有元素然后删除重复

```java
public static List removeDuplicate(List list)  {       
  for  ( int  i  =   0 ; i  <  list.size()  -   1 ; i ++ )  {       
      for  ( int  j  =  list.size()  -   1 ; j  >  i; j -- )  {       
           if  (list.get(j).equals(list.get(i)))  {       
              list.remove(j);       
            }        
        }        
      }        
    return list;       
}
```

2. 通过HashSet踢除重复元素

<font color="red">注意：用HashSet的话，需要给目标类重写equals() 和 hashcode() ，才能去重。</font>

```java
public static List removeDuplicate(List list) {   
    HashSet h = new HashSet(list);   
    list.clear();   
    list.addAll(h);   
    return list;   
}
```

3. 删除ArrayList中重复元素，保持顺序

```java
// 删除ArrayList中重复元素，保持顺序     
public static void removeDuplicateWithOrder(List list) {    
    Set set = new HashSet();    
     List newList = new ArrayList();    
    for (Iterator iter = list.iterator(); iter.hasNext();) {    
         Object element = iter.next();    
         if (set.add(element))    
            newList.add(element);    
      }     
     list.clear();    
     list.addAll(newList);    
    System.out.println( " remove duplicate " + list);    
}
```

4. 把list里的对象遍历一遍，用list.contains()，如果不存在就放入到另外一个list集合中

```java
public static List removeDuplicate(List list){  
    List listTemp = new ArrayList();  
    for(int i=0;i<list.size();i++){  
        if(!listTemp.contains(list.get(i))){  
            listTemp.add(list.get(i));  
        }  
    }  
    return listTemp;  
}
```

### 5 java多线程文件下载


```java
public class TestDemo {
    public static void main(String[] args) throws IOException {

        threadDownload a = new threadDownload();
        a.threadPoolDownloadFile("C:\\Users\\Administrator\\Desktop\\xxx.zip",
                "C:\\Users\\Administrator\\Desktop\\targetFile\\xxx.zip");
    }
}
```

```java
import java.io.*;
import java.util.Arrays;
import java.util.concurrent.CompletableFuture;
import java.util.stream.IntStream;

public class threadDownload {
    private Integer paralleThread = 3;  //设置下载文件的多线程数量
    private Long totalLength; //传输的文件总长度
    private Long eachSize;//单个线程处理的数据长度

    /**
     * 多线程下载文件
     * @param sourceUrl 源文件地址
     * @param targetUrl 目标文件地址
     */
    public void threadPoolDownloadFile(String sourceUrl,String targetUrl) throws IOException {
        File sourcefile = new File(sourceUrl);
        File targetfile = new File(targetUrl);
        //传输的文件总长度
        totalLength = sourcefile.length();
        //以读写的方式访问文件流任意位置
        RandomAccessFile raf = new RandomAccessFile(targetfile, "rw");
        raf.close();
        //计算每个线程需要读取的数据长度 = 总长度 / 多线程并行数量
        eachSize = totalLength / paralleThread;

        CompletableFuture[] completableFutures = IntStream.range(0, paralleThread).boxed().map(i -> CompletableFuture
                .runAsync(() -> download(i,sourcefile,targetfile)).whenComplete((result, e) -> System.out.println(i + "-> over..."))).toArray(CompletableFuture[]::new);
        CompletableFuture.allOf(completableFutures).join();


    }
    //下载文件
    private void download(Integer index,File sourcefile,File targetfile) {
        System.out.println("download,index="+index);
        try (FileInputStream is = new FileInputStream(sourcefile);
             ByteArrayOutputStream baos = new ByteArrayOutputStream();
             RandomAccessFile accessFile = new RandomAccessFile(targetfile, "rw")) {
            //每次读取1024
            byte[] buff = new byte[1024];
            //todo 待优化
            //获取当前线程读取区间,最后一个读取剩余部分
            int start = (int) (index * eachSize);
            int end = (int) (index == paralleThread - 1 ? totalLength - 1 : (index + 1) * eachSize - 1);
            int length = end - start + 1;
            int readLength = 0;
            is.skip(start);
            int len;
            //下载文件并写入本地
            while ((len = is.read(buff)) != -1 && readLength <= length) {
                baos.write(buff, 0, len);
                readLength += len;
            }
            byte[] readData = baos.toByteArray();
            byte[] result = baos.size() > length ? Arrays.copyOf(readData, length) : readData;
            System.out.println(result.length);
            accessFile.seek(start);
            accessFile.write(result);
            System.out.println(start + "-" + end + " over.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```





