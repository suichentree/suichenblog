---
title: FFmpeg的使用
date: 2022-07-01
sidebar: 'auto'
categories: 
 - 随笔
---

## FFmpeg的介绍

FFmpeg是一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序。有非常强大的功能包括视频采集功能、视频格式转换、视频抓图、给视频加水印等。

## FFmpeg的安装

① 下载FFmpeg

[下载地址:https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z](https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z)

将下载的安装包解压，将其重命名为 ffmpeg，将 ffmpeg 文件夹放置到某个程序文件夹中，如：D:\Program Files

② 配置电脑环境变量

此电脑 > 右键-属性 > 高级系统设置 > 环境变量->双击 Path(选择用户变量和系统变量都可以，可以只操作一个，也可以都操作)

![ffmpeg20221020174351.png](../blog_img/ffmpeg20221020174351.png)

新建path变量,变量值：D:\Program Files\ffmpeg\bin

③ 测试是否安装成功

win+r，输入cmd，在DOS界面直接输入ffmpeg，如果显示这样的界面，说明配置成功。

![ffmpeg20221020174539.png](../blog_img/ffmpeg20221020174539.png)


## FFmpeg的使用场景

例如：当你在b站上一个下载视频时。实际下载下来的是一个视频m4s文件和一个音频的m4s文件。此时可以使用FFmpeg将两个m4s文件混流为一个mp4文件。

```
//在文件所在的根目录。使用命令把video.m4s 和audio.m4s 混流为mp4文件
ffmpeg -i D:/B站下载视频/s_32356/311449/80/video.m4s -i D:/B站下载视频/s_32356/311449/80/audio.m4s -c:v copy -strict experimental xxx4.mp4

// blv文件，先改为flv文件，再把flv转换为mp4文件
ffmpeg -i D:/B站下载视频/s_1586/29134/lua.flv.bb2api.80/aaa.flv -c:v copy -strict experimental FateStayNight-UBW-07.mp4

 //avi转换为mp4
ffmpeg -i F:/B站下载视频/1111/Gantz.TV.2004.DVDRip-Hi.x264.AC3.1280.EP17-nezumi.avi -c copy -map 0 aaa.mp4  

```
