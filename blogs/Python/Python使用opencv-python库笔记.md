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

## 视频截图并对截图进行压缩和分辨率尺寸处理

```py
import cv2
import glob

# 新的视频截图方法，从多个视频中随机获得一个视频文件进行截图。
def new_video_capture(user):
    # 指定要查找文件的目录
    directory = "C:\\Users\\18271\\Desktop\\face_video"
    # 使用glob模块查找文件名包含'名字+身份证'的视频文件
    files = glob.glob(os.path.join(directory, f'*{user['name']+user['idCard']}*'))
    if files:
        random_user_video_path = random.choice(files)
    else:
        logger.error(f"{user["name"]} 在 C:\\Users\\18271\\Desktop\\face_video 没有找到视频文件")
        raise Exception(f"{user["name"]} 。没有找到视频文件。当前子线程终止运行")

    logger.info(f"{user["name"]} 开始执行 new_video_capture 方法 进行人脸视频截图。人脸视频文件为 {random_user_video_path} ====================== ")
    # 打开视频文件
    video = cv2.VideoCapture(random_user_video_path)
    # 获取视频的总帧数
    frame_count = int(video.get(cv2.CAP_PROP_FRAME_COUNT))
    # 获取视频的帧率
    fps = int(video.get(cv2.CAP_PROP_FPS))
    # 计算出视频时长
    video_time = int(frame_count / fps)
    # 截图成功判断
    is_success = False
    while is_success is False:
        # 随机生成一个秒数，范围在1-video_time之间
        rand_int = random.randint(1, video_time)
        # 计算要截取的帧数
        frame_to_capture = int(rand_int * fps)
        # 跳到视频文件的指定帧数
        video.set(cv2.CAP_PROP_POS_FRAMES, frame_to_capture)
        # 读取该帧数
        ret, frame = video.read()
        # 截图路径
        imgPath = "C:\\Users\\18271\\Desktop\\face_video\\img\\" + user['idCard'] + '.jpeg'
        # 如果成功读取到帧，则保存为图片
        if ret:
            # 把视频截图保持到指定路径中，截图成功返回Ture
            is_success = cv2.imwrite(imgPath, frame)
            logger.info(f'{user["name"]} 截图成功。is_success 为 {is_success}')
        else:
            logger.error(f'{user["name"]} 截图失败，开始重新截图。is_success 为 {is_success}')

        # 休眠
        time.sleep(5)

    # 释放视频文件
    video.release()
    newimgPath = "C:\\Users\\18271\\Desktop\\face_video\\img\\" + user['idCard'] + '.jpeg'
    # 对图片进行压缩和尺寸处理
    resize_and_compress_image(imgPath,newimgPath)
    # 转换图片为base64编码
    base64img = imgToBase64(newimgPath)
    # 删除旧图片
    os.remove(imgPath)
    # 返回新图片编码和新图片链接
    return base64img,newimgPath

# 图片大小压缩到90kb之内 和 重新设置图片尺寸
def resize_and_compress_image(input_path, output_path, target_size=90 * 1024):
    # 读取图片
    image = cv2.imread(input_path)

    # 调整图片分辨率尺寸
    # 获取原始图像的高度和宽度
    height,width = image.shape[:2]
    # 如果图片宽大于高，将设置图片宽为1170，高为对应的比例。如果图片高大于宽，将设置图片高为1170，宽为对应的比例。
    if width > height:
        # 定义目标宽度
        target_width = 1170
        # 根据原始宽高比计算目标高度
        target_height = int((target_width / width) * height)
    elif height > width:
        # 定义目标宽度
        target_height = 1170
        # 根据原始宽高比计算目标宽度
        target_width = int((target_height / height) * width)

    # 使用cv2.resize进行缩放，保持宽高比
    resized_img = cv2.resize(image, (target_width, target_height))

    # 重新赋值
    image = resized_img

    # 图片大小压缩,压缩到目标大小内
    # 设置图片初始质量
    quality = 95
    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), quality]
    while True:
        result, encimg = cv2.imencode('.jpeg', image, encode_param)
        if result:
            size = len(encimg)
            if size <= target_size:
                break
            quality -= 5
            encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), quality]

    with open(output_path, 'wb') as f:
        f.write(encimg)

```



