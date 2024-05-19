---
title: Python使用opencv-python库笔记
date: 2024-05-19
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
---

[toc]

# Python使用opencv-python库笔记

OpenCV（Open Source Computer Vision Library）是一个广泛使用的开源计算机视觉库，它提供了用于处理图像和视频的各种功能和算法。

> OpenCV的用法
- 图像和视频的读取和写入。
- OpenCV 提供了许多图像处理和操作功能，如调整大小、裁剪、旋转、翻转、平移、滤波、边缘检测、直方图均衡化等。
- OpenCV 在计算机视觉领域有广泛的应用，包括人脸检测和识别、目标跟踪、图像拼接、图像增强、实时图像处理、虚拟和增强现实等。

在 Python 中使用 OpenCV，可以通过安装相应的 Python 库 opencv-python 来使用。


## 安装

安装 opencv-python 库

```bash
pip install opencv-python
```

## 视频截图

```py
import cv2
import time

def video_capture(video_directory,video_path):
    print(f"=========== 开始执行video_capture方法 进行视频截图 ===========")
    # 打开视频文件 获取视频总帧数和帧率
    cap = cv2.VideoCapture(video_path)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    # 计算出视频时长
    vide_time = int(frame_count / fps)

    is_success = False
    while is_success is False:
        # 随机生成一个秒数，范围在1-vide_time之间
        rand_int = random.randint(1, vide_time)
        # 计算要截取的帧数。并跳到指定帧数
        frame_to_capture = int(rand_int * fps)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_to_capture)
        # 读取一帧并保存为图片
        ret, frame = cap.read()

        # 截图路径
        jpgPah = video_directory + "/img/" +  str(rand_int) + '.png'
        print(f"本地存储的视频截图路径 jpgPah 为 {jpgPah}")
        if ret:
            # 把视频截图保持到指定路径中
            is_success = cv2.imwrite(jpgPah, frame)
            print(f'--------截图成功--------is_success 为 {is_success}')
        else:
            print(f'--------截图失败，开始重新截图--------is_success 为 {is_success}')

        # 休眠1s
        time.sleep(1)

    # 释放视频文件
    cap.release()
    return jpgPah


if __name__ == "__main__":
    video_directory = "C:\\Users\\86182\\Desktop"
    video_path = "C:\\Users\\86182\\Desktop\\demo.mp4"

    s = video_capture(video_directory,video_path)
    print("视频截图路径为",s)

```



