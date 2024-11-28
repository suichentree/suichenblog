---
title: Python使用Dlib机器学习库笔记
date: 2024-11-28
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
---

[toc]

# Python使用Dlib机器学习库笔记

dlib库是一个机器学习的开源库，包含了机器学习的很多算法，使用起来很方便。

Dlib可以帮助您创建很多复杂的机器学习方面的软件来帮助解决实际问题。

目前Dlib已经被广泛的用在行业和学术领域,包括机器人,嵌入式设备,移动电话和大型高性能计算环境。


## 安装 dlib 库

```bash
# 注意你需要在电脑中先安装cmake环境等
pip install dlib

```

## 检测视频中的人脸部分并截图

```py
import cv2
import dlib

# 加载人脸检测器（基于dlib的预训练模型）
detector = dlib.get_frontal_face_detector()

def face_capture():
    random_user_video_path = 'C:\\Users\\18271\\Desktop\\face_video\\卢豪421222199405106815.mp4'
    # 打开视频文件 获取视频总帧数和帧率
    cap = cv2.VideoCapture(random_user_video_path)
    while True:
        # 读取视频的每一帧
        ret, frame = cap.read()
        if not ret:
            break

        # 将帧转换为灰度图像，这有助于提高人脸检测的准确性
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        # 使用人脸检测器检测人脸,返回视频中的人脸坐标数组。
        faces = detector(gray_frame)
        for face in faces:
            # 获取人脸的矩形框坐标
            x1, y1, x2, y2 = face.left(), face.top(), face.right(), face.bottom()
            # 截取人脸部分图像
            face_image = frame[y1:y2, x1:x2]

            # 对截取的人脸图像进行进一步处理，比如保存、显示等
            # cv2.imshow("Face Image", face_image)
            is_success = cv2.imwrite("face_snapshot2.jpg", face_image)

            # 若处理成功，则跳出for循环q
            if is_success:
                break

        # 等待按键事件，按 'q' 键退出while循环
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # 释放视频捕获对象和关闭所有窗口
    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    face_capture()

```
