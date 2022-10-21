---
title: java爬虫基础
date: 2018-04-12
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Java
---

# java爬虫基础：

## 网络爬虫概述：

&emsp;&ensp;网络爬虫是一个自动提取网页的程序，它为搜索引擎从万维网上下载网页，是搜索引擎的重要组成。<font color="red">传统爬虫从一个或若干初始网页的URL开始，获得初始网页上的URL，在抓取网页的过程中，不断从当前页面上抽取新的URL放入队列,直到满足系统的一定停止条件。</font>

网络爬虫按照系统结构和实现技术，大致可以分为以下几种类型：
1. 通用网络爬虫（General Purpose Web Crawler）.
2. 聚焦网络爬虫（Focused Web Crawler）.
3. 增量式网络爬虫（Incremental Web Crawler）.
4. 深层网络爬虫（Deep Web Crawler）。
实际的网络爬虫系统通常是几种爬虫技术相结合实现的.

**想要了解更多信息，请百度**

## jsoup：

&emsp;&emsp;jsoup 是一款Java 的HTML解析器，可直接解析某个URL地址、HTML文本内容。它提供了一套非常省力的API，可通过DOM，CSS以及类似于jQuery的操作方法来取出和操作数据。

jsoup的主要功能如下：
1. 从一个URL，文件或字符串中解析HTML；
2. 使用DOM或CSS选择器来查找、取出数据；
3. 可操作HTML元素、属性、文本；

jsoup需要的jar包： jsoup-1.10.3.jar


## 例子（爬取目标网址的20页商品数据）：

Goods.java
```java
package com.entity;
public class Goods {
	private Integer id;
	private String name;
	private Double price;
	private String introduce;
	public Goods(){}
	public Goods(Integer id, String name, Double price, String introduce) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.introduce = introduce;
	}
		
	/*
	 * 重写商品类的hashcode方法 ， equals 方法,
	 * 当java爬虫 爬去相同id的数据时，
	 * 把数据放到hash中，进行爬取数据的去重处理。
	 * 根据id 判断是不是相同的商品。
	 * 
	 * */
	public int hashCode()//重写    
    {  
        return id.hashCode();  
    }  
	public boolean equals(Object obj)//重写   Object不能换  
    {  
          if(!(obj instanceof Goods))  
              return false;  
          Goods g=(Goods)obj;  
          return this.id.equals(g.id);  
    }  
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getIntroduce() {
		return introduce;
	}
	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}
	@Override
	public String toString() {
		return "Goods [id=" + id + ", name=" + name + ", price=" + price
				+ ", introduce=" + introduce + "]";
	}
}

```

主方法：
```java
package com.test;
import java.io.IOException;
import java.util.HashSet;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import com.entity.Goods;

public class test_worm3 {
	public static void main(String[] args) throws IOException {
		Goods goods=new Goods();   //商品类
		HashSet<Goods> ghash=new HashSet<Goods>();   //存放不重复的商品数据
		/*
		 * 1. 设置目标页面：URL：https://search.jd.com/Search?keyword=java&enc=utf-8&wq=java&page= 1 ~ 20 。
		 * 2. 通过url 发送post 请求，获取对应网页的 Document 对象。
		 * 3. 通过Document 对象的 select 选择器 获取网页中的对应的标签（重复操作）。
		 * 4. 获取标签中的的属性值。
		 * 
		 * */
		//爬去不同页数的数据：
		for(int i=1;i<20;i++) {
			String URL="https://search.jd.com/Search?keyword=java&enc=utf-8&wq=java&page="+i;
			Document doc = Jsoup.connect(URL).post();
		
			//System.out.println(doc);
			//获取id="J_goodsList"下的ul中class=”gl-warp clearfix“ 下的li 中的class=”gl-item“的一些元素对象
			Elements goodslist = doc.select("#J_goodsList").select("ul[class=gl-warp clearfix]").select("li[class=gl-item]");
			
			System.out.println("商品信息：=============");
		
			//遍历商品信息
			for(Element e:goodslist){
				System.out.println("商品id：  "+e.attr("data-sku"));
				System.out.println("商品名称： "+e.select(".gl-i-wrap").select("div[class=p-name p-name-type-2]").select("a em").text());
				System.out.println("商品价格：  "+e.select(".gl-i-wrap").select("div[class=p-price]").select("i").text());
				System.out.println("商品介绍：  "+e.select(".gl-i-wrap").select("div[class=p-name p-name-type-2]").select("a i").text());
				/*
				 * 1. 这里是防止爬去重复数据（通过 id 判断是否是同一个商品）
				 * 2. 如果爬去数据过程中 发生NumberFormatException， 跳过该次循环（不爬取该数据）
				 * 3. 把爬去的数据存放到Goods 对象中，再放到 hash 集合中 ，由于hash 集合 不能存放重复数据，根据这个原理，实现去掉重复数据的操作。
				 * 4. 注意：需要在 Goods类中重写 hashcode ，equals 方法，手动设置hash集合的判断重复数据的条件。
				 * */
				try {
					Integer id=Integer.valueOf(e.attr("data-sku"));
					String name=e.select(".gl-i-wrap").select("div[class=p-name p-name-type-2]").select("a em").text();
					Double price=Double.valueOf(e.select(".gl-i-wrap").select("div[class=p-price]").select("i").text());
					String introduce=e.select(".gl-i-wrap").select("div[class=p-name p-name-type-2]").select("a i").text();
					ghash.add(new Goods(id,name,price,introduce));
				}catch(NumberFormatException ne) {
				}finally {
					continue;
				}
			}
		}
		System.out.println(ghash);
	}
}

```