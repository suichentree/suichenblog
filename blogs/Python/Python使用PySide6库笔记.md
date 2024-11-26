---
title: Python使用PySide6库笔记
date: 2024-05-23
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
---

[toc]

# Python使用PySide6库笔记

当我们想要使用Python语言来开发桌面GUI程序工具的时候，我们往往有多个选择。
- Tkinter 是Python的标准GUI库，无需额外安装。但是可选的GUI组件和样式较少，功能相对较少。
- PyQt 提供了大量的GUI组件和功能，可用于构建复杂和精美的界面。
- PySide 提供了与PyQt类似的功能和GUI组件。
- wxPython 学习曲线较陡峭。

其中 PyQt和PySide都是基于Qt框架开发的，PyQt和PySide具有相似的API和功能，学习难度也都差不多；区别在于 PySide 是免费的，而 PyQt 需要付费使用。

并且 Qt公司 打算着力培养PySide，所以PySide是更有前途的，所以选择Pyside作为GUI程序开发的框架；

> PySide 的版本选择

目前最新的 PySide 版本是 PySide6

> Python 安装 PySide6

```bash
# 使用pip 安装 PySide6
pip install pyside6
```

## 第一个 PySide6 应用程序

```py
# 导入PySide6中的各个组件
from PySide6.QtWidgets import QApplication,QWidget

# 创建一个桌面应用app实例
app = QApplication([])

# 创建一个QWidget（通用窗口）实例
widget = QWidget()
# 设置窗口标题
widget.setWindowTitle('hello world')
# 设置窗口大小
widget.setGeometry(100, 100, 300, 300)
# 显示窗口
widget.show()

# 运行应用程序
app.exec()
```

执行程序后，运行结果如图所示。

![python_20240523112233.png](../blog_img/python_20240523112233.png)

## QApplication 应用程序

QApplication类 是QT应用程序中用来进行全局管理和程序流的。简而言之，一个QApplication类的实例对象代表一个QT应用程序本身。

因此一个QT应用程序应该只定义一个 QApplication类的实例对象。

## QWidget 窗口

QWidget是指一个基础通用的窗口组件，使用QWidget类可以创建一个窗口。如上面代码所示。

QWidget类具有很多属性，可以在实例化一个窗口时，对窗口进行各种各样的设置。

> geometry属性：窗口出现的位置和大小。

geometry 是一个包含 x、y、width 和 height 的 QRect 对象，表示窗口或组件在其父坐标系统中的位置和大小。

父坐标通常是显示屏幕的左上角。

```py
widget = QWidget()

# setGeometry(x, y, w, h)
# x是横坐标，y是纵坐标，w是窗口宽度，h是窗口高度
widget.setGeometry(100,100,300,200)
```

> WindowTitle属性：窗口左上角的标题

```py
widget = QWidget()
# 设置窗口标题
widget.setWindowTitle('hello world')
```

> maximized属性：检测窗口是否最大化

maximized 是 QWidget 类的一个只读属性，用于获取窗口是否被最大化。如果窗口当前处于最大化状态，则 maximized 返回 True，否则返回 False。

```py
widget = QWidget()
isMax = widget.isMaximized()
```

> minimized属性：检测窗口是否最小化

minimized 是 QWidget 类的一个只读属性，用于指示窗口是否被最小化。如果窗口当前处于最小化状态，则 minimized 返回 True，否则返回 False

```py
widget = QWidget()
isMin = widget.isMinimized()
```

> maximumSize属性，minimumSize属性：窗口最大和最小的宽度和高度

```py
widget = QWidget()
widget.setMaximumSize(400, 300)  # 设置最大宽度为 400，最大高度为 300
widget.setMinimumSize(200, 150)  # 设置最小宽度为 200，最小高度为 150
```

## 布局管理器

当我们创建一个窗口，我们希望在这个窗口中添加各种各样的组件。而布局管理器就是用来管理窗口的组件如何摆放的。

### QHBoxLayout 水平布局管理器

水平布局管理器中各个组件按照从左到右的顺序水平排列。

```py
from PySide6.QtWidgets import QApplication, QWidget, QHBoxLayout, QPushButton

app = QApplication([])
widget = QWidget()
widget.setGeometry(300,300,300,300)

#创建一个水平布局管理器，接受参数widget，表示把水平布局管理器放在widget窗口组件中
layout = QHBoxLayout(widget)

#创建多个按钮
button1=QPushButton('Button 1')
button2=QPushButton('Button 2')
button3=QPushButton('Button 3')
button4=QPushButton('Button 4')
button5=QPushButton('Button 5')

#将多个按钮添加到水平布局管理器中
layout.addWidget(button1)
layout.addWidget(button2)
layout.addWidget(button3)
layout.addWidget(button4)
layout.addWidget(button5)

widget.show()
app.exec()
```

运行结果如下

![python_20240523143129.png](../blog_img/python_20240523143129.png)

### QVBoxLayout 垂直布局管理器

垂直布局管理器中各个组件按照从上到下的顺序垂直排列。

```py
from PySide6.QtWidgets import QApplication, QWidget, QVBoxLayout, QPushButton

app = QApplication([])
widget = QWidget()
widget.setGeometry(300,300,300,300)

#创建一个垂直布局管理器，接受参数widget，表示把垂直布局管理器放在widget窗口组件中
layout = QVBoxLayout(widget)

#创建多个按钮
button1=QPushButton('Button 1')
button2=QPushButton('Button 2')
button3=QPushButton('Button 3')
button4=QPushButton('Button 4')
button5=QPushButton('Button 5')

#将多个按钮添加到垂直布局管理器中
layout.addWidget(button1)
layout.addWidget(button2)
layout.addWidget(button3)
layout.addWidget(button4)
layout.addWidget(button5)

widget.show()
app.exec()
```

运行结果如下
![python_20240523143507.png](../blog_img/python_20240523143507.png)

### QGridLayout 网格布局管理器

网格布局管理器，用于将子组件放置在一个网格中。每个子组件可以占据一个或多个网格单元。

网格布局管理器相当于把窗口划分成多个网格，就像excel表格那样，每个格子可以放一个子组件。

```py
from PySide6.QtWidgets import QApplication, QWidget, QGridLayout, QPushButton

app = QApplication([])
widget = QWidget()
widget.setGeometry(300,300,300,300)

#创建一个网格布局管理器，接受参数widget，表示放在widget窗口组件中
layout = QGridLayout(widget)

#创建多个按钮
button1=QPushButton('Button 1')
button2=QPushButton('Button 2')
button3=QPushButton('Button 3')
button4=QPushButton('Button 4')
button5=QPushButton('Button 5')

#将多个按钮添加到网格布局管理器中。第一个参数是组件，后面的参数是行和列的索引

## 按钮1，2在第一行的第 1，2 个单元格
layout.addWidget(button1,0,0)
layout.addWidget(button2,0,1)
## 按钮3，4，5 在第二行的第1，2，3 个单元格
layout.addWidget(button3,1,0)
layout.addWidget(button4,1,1)
layout.addWidget(button5,1,2)

widget.show()
app.exec()
```

运行结果如下
![python_20240524153911.png](../blog_img/python_20240524153911.png)


### QFormLayout 表单布局管理器

表单布局管理器，用于将标签和输入字段配对显示。适用于创建表单式的用户界面。

```PY
from PySide6.QtWidgets import QApplication, QWidget, QFormLayout, QLineEdit, QLabel,QPushButton

app = QApplication([])
widget = QWidget()

#创建表单布局管理器
layout = QFormLayout(widget)

#创建多个标签和单行文本框
label1 = QLabel('Name:')
line_edit1 = QLineEdit()

label2 = QLabel('Age:')
line_edit2 = QLineEdit()

#创建多个按钮
button1=QPushButton('Button 1')
button2=QPushButton('Button 2')
button3=QPushButton('Button 3')

#添加标签和字段对，每一对成为布局中的一行，还有相应设列的函数
layout.addRow(label1, line_edit1)
layout.addRow(label2, line_edit2)
#将多个按钮加入到表单布局中
layout.addRow(button1, button2)
layout.addRow(button3)

widget.show()
app.exec()
```

运行结果如下
![python_20240524154530.png](../blog_img/python_20240524154530.png)


## QLabel标签 QLineEdit单行文本框

QLabel用于显示文本或图像的标签。QLineEdit用于单行文本输入框，用于接受用户的文本输入。

基本用法如下
```py
from PySide6.QtWidgets import QApplication, QWidget, QFormLayout, QLineEdit, QLabel,QPushButton

app = QApplication([])
widget = QWidget()

#创建表单布局管理器
layout = QFormLayout(widget)

#创建多个标签和单行文本框
label1 = QLabel('Name:')
line_edit1 = QLineEdit()

label2 = QLabel('Age:')
line_edit2 = QLineEdit()

#添加标签和字段对，每一对成为布局中的一行，还有相应设列的函数
layout.addRow(label1, line_edit1)
layout.addRow(label2, line_edit2)

widget.show()
app.exec()
```

运行结果如下
![python_20240524161708.png](../blog_img/python_20240524161708.png)


> QLabel标签 常用属性和方法

```py
from PySide6.QtGui import QPixmap
from PySide6.QtWidgets import QLabel
from PySide6.QtCore import Qt

# ..... 省略部分代码

#创建标签
label = QLabel()

# 设置文本内容
label.setText("这是一个label")
# 设置对齐方式
label.setAlignment(Qt.AlignCenter)
# 设置缩进
label.setIndent(20)
# 设置边距
label.setMargin(10)
# 设置图片
pixmap = QPixmap("980.jpg")
label.setPixmap(pixmap)
# 设置文本格式
label.setTextFormat(Qt.RichText)
# 启用自动换行
label.setWordWrap(True)

```

注意：当QLabel同时设置了文本和图片，会优先显示图片。

> QLineEdit单行文本框 常用属性和方法

```py
# 创建单行文本框
line_edit = QLineEdit()

# 设置文本框的内容
line_edit.setText("New Text")
# 获取文本框的内容，将内容打印出来
line_edit.text() 

#设置占位符文本
line_edit.setPlaceholderText("this is 占位符文本")

# 限制用户输入的最大字符数
line_edit.setMaxLength(10)

# 设置为 True 可以将 QLineEdit 设置为只读模式，用户无法编辑其中的文本
line_edit.setReadOnly(True)

# 设置文本在 QLineEdit 中的对齐方式
line_edit.setAlignment(QtCore.Qt.AlignRight)

# 设置文本的显示方式，可以是正常显示、密码显示等
line_edit.setEchoMode(QLineEdit.Password)

# 设置输入掩码，限制用户输入的格式
line_edit.setInputMask("000-00-00")

# 启用或禁用清除按钮，允许用户一键清空输入内容
line_edit.setClearButtonEnabled(True)

```

## QPushButton按钮

```py
from PySide6.QtWidgets import QApplication, QVBoxLayout, QWidget, QPushButton
#定义的按钮函数
def on_button_click(self):
    # 打印日志
    print('Button clicked!')

# 创建应用实例
app = QApplication([])

#创建主窗口
widget = QWidget()
widget.setGeometry(100,100,200,200)

#创建布局管理器
layout = QVBoxLayout(widget)
#创建按钮
button = QPushButton('按钮')
#按钮加入到布局管理器中
layout.addWidget(button)

#将按钮的点击事件与函数进行绑定
button.clicked.connect(on_button_click)

widget.show()
app.exec()
```

上面代码中定义了函数，并将按钮的点击事件与函数进行绑定。

运行结果如下,点击按钮会触发函数，打印日志
![python_20240524164548.png](../blog_img/python_20240524164548.png)

> QQPushButton按钮 常用属性和方法

```py
#创建按钮
button = QPushButton('按钮')

# 设置按钮的背景色为红色
button.setStyleSheet('QPushButton { background-color: red; }')

# 设置按钮的图标
button.setIcon(QIcon('path/to/icon.png'))

# 设置按钮的状态是否启用，False为禁用
button.setEnabled(False)

# 设置按钮的快捷键
button.setShortcut('Ctrl+C')

# setAutoRepeat 方法用于启用或禁用按钮的自动重复功能。自动重复是指当用户按住按钮时，按钮会自动多次触发点击事件
## 启用按钮的自动重复功能
button.setAutoRepeat(True)
## 设置按钮的自动重复间隔（毫秒）
button.setAutoRepeatInterval(500)

```

## QTextEdit 多行文本输入框

多行文本输入框用于接受用户的多行文本输入。

```py
from PySide6.QtWidgets import QApplication, QTextEdit,  QVBoxLayout, QWidget
app = QApplication([])
window = QWidget()
window.setWindowTitle('QTextEdit 示例')
layout = QVBoxLayout()

# 创建 QTextEdit
text_edit = QTextEdit()
# 把 QTextEdit 添加到 布局中
layout.addWidget(text_edit)

window.setLayout(layout)
window.setGeometry(100, 100, 400, 300)
window.show()
# 运行应用事件循环
app.exec()
```

运行结果如下
![python_20240524165251.png](../blog_img/python_20240524165251.png)

## QFileDialog 文件目录对话框

QFileDialog 是 Qt 中用于显示文件对话框的部件，允许用户选择文件或目录。

```py
from PySide6.QtWidgets import QApplication, QWidget, QPushButton, QFormLayout, QFileDialog,QLabel

# 创建自定义MainQWidget类，继承QWidget类
class MainQWidget(QWidget):
    def __init__(self):
        super().__init__()

        # 创建表单布局
        self.layout = QFormLayout(self)

        # 创建按钮和label
        self.info_label = QLabel("No file selected")
        self.open_button = QPushButton("选择Excel文件")
        # 按钮的点击信号和槽函数进行绑定
        self.open_button.clicked.connect(self.choose_excel)

        # 创建按钮和label
        self.info_label2 = QLabel("No file selected")
        self.open_button2 = QPushButton("选择视频目录")
        self.open_button2.clicked.connect(self.choose_directory)

        # 设置各个组件的布局方式
        self.layout.addRow(self.open_button,self.info_label)
        self.layout.addRow(self.open_button2, self.info_label2)

    def choose_excel(self):
        # 创建文件对话框
        file_dialog = QFileDialog(self)
        # 设置文件对话框的标题
        file_dialog.setWindowTitle("Choose a File")
        # 设置对话框模式为打开文件
        file_dialog.setFileMode(QFileDialog.ExistingFile)
        # 显示文件对话框，并获取用户选择的文件路径
        file_path, _ = file_dialog.getOpenFileName(self, "Open File", "", "All Files (*);")

        # 如果用户选择了文件，将文件路径输出到控制台
        if file_path:
            print(f"excel文件路径为 {file_path}")
            self.info_label.setText(file_path)

    def choose_directory(self):
        # 创建文件对话框
        file_dialog = QFileDialog(self)
        # 设置文件对话框的标题
        file_dialog.setWindowTitle("Choose a Directory")
        # 设置对话框模式为打开文件
        file_dialog.setFileMode(QFileDialog.ExistingFile)
        # 显示文件对话框，并获取用户选择的文件路径
        directory_path  = file_dialog.getExistingDirectory(self, "Open Directory", "")

        # 如果用户选择了文件，将文件路径输出到控制台
        if directory_path:
            print(f"视频目录路径为 {directory_path}")
            self.info_label2.setText(directory_path)

if __name__ == "__main__":
    # 创建应用实例
    app = QApplication([])
    # 实例化MainQWidget
    example = MainQWidget()
    example.setGeometry(300,300,700,700)
    example.show()
    # 运行应用实例
    app.exec()

```

运行结果如下,点击按钮会弹出文件对话框，选择文件或目录。并把文件或目录的路径显示出来。

![python_20240524172504.png](../blog_img/python_20240524172504.png)

> QFileDialog 常用方法和属性如下

```py
# 打开文件对话框，返回用户选择的文件路径和文件过滤器。
getOpenFileName(parent, caption, directory, filter)
# 打开文件对话框，允许用户选择多个文件，返回文件路径列表和文件过滤器。
getOpenFileNames(parent, caption, directory, filter)
# 打开目录对话框，返回用户选择的目录路径。
getExistingDirectory(parent, caption, directory)
# 打开保存文件对话框，返回用户选择的文件路径和文件过滤器。
getSaveFileName(parent, caption, directory, filter)
```


## QTableWidget 表格组件

示例1
```py
from PySide6.QtWidgets import QApplication, QPushButton, QTableWidget,QTableWidgetItem

class MyTableWidget(QTableWidget):
    def __init__(self):
        super().__init__()

    def init(self,array_data):

        # 计算出数组的元素个数
        row_num = len(array_data)
        # 设置行数
        self.setRowCount(row_num)
        # 表头列
        header_cloumn = ["姓名", "身份证", "密码", "人脸视频路径", "备注","操作"]
        # 设置列数
        self.setColumnCount(len(header_cloumn))
        # 设置表头
        self.setHorizontalHeaderLabels(header_cloumn)

        # 遍历数组数据，添加到表格组件中
        for i,user in enumerate(array_data):
            self.setItem(i,0,QTableWidgetItem(user['name']))
            self.setItem(i, 1, QTableWidgetItem(user['idCard']))
            self.setItem(i, 2, QTableWidgetItem(user['pwd']))
            self.setItem(i, 3, QTableWidgetItem(user['video_path']))
            self.setItem(i, 4, QTableWidgetItem(user['remark']))

            # 创建按钮控件，设置文本并连接槽函数
            button = QPushButton("无效按钮", self)
            button.clicked.connect(self.button_clicked)  # 按钮点击事件处理函数
            # 将按钮控件添加到单元格中
            self.setCellWidget(i, 5, button)

    def button_clicked(self):
        # 按钮点击事件处理函数
        button = self.sender()  # 获取发送信号的按钮
        cell_widget = self.indexAt(button.pos())  # 获取按钮所在的单元格
        row = cell_widget.row()  # 获取单元格的行号
        col = cell_widget.column()  # 获取单元格的列号
        print(f"按钮位于第 {row + 1} 行，第 {col + 1} 列被点击")  # 打印按钮被点击的位置信息

# 单独运行，用于查看效果
if __name__ == '__main__':
    app = QApplication([])
    table = MyTableWidget()

    # 自定义数据
    current_user_list = [
        {'idCard': '1111111111', 'name': '蔡11', 'remark': '5月', 'pwd': 'Dp111111','video_path': 'C:/Users/18271/Desktop/face_video\\蔡11.mp4'},
        {'idCard': '2222222222', 'name': '曾22', 'remark': '5月', 'pwd': 'Dp111111','video_path': 'C:/Users/18271/Desktop/face_video\\曾22.mp4'}]

    # 把数据填充到表格组件中
    table.init(current_user_list)
    table.show()
    app.exec()
```

运行结果如下
![python_20240527180805.png](../blog_img/python_20240527180805.png)


示例2

```py
import sys
from PySide6.QtWidgets import (QApplication, QWidget, QVBoxLayout, QHBoxLayout, QPushButton, QTableWidget, QTableWidgetItem, QLabel, QFormLayout, QFileDialog, QFrame, QHeaderView,
                               QGroupBox, QSizePolicy, QMessageBox, QListWidget, QListWidgetItem, QAbstractItemView)

# 主窗口类
class MyMainWindow(QWidget):
    def __init__(self):
        super().__init__()
        # 初始化
        self.init_ui()
        # 设置MainWindow的大小
        self.resize(800,400)
        # 设置MainWindow的标题
        self.setWindowTitle("刷时")

    def init_ui(self):
        # 创建主布局（垂直布局）
        main_layout = QFormLayout()
        # 设置MainWindow的布局为主布局
        self.setLayout(main_layout)

        # 选择名单文件按钮
        self.btn_import_excel = QPushButton("选择名单文件")
        self.btn_import_excel.clicked.connect(self.choose_excel)
        # 标签
        self.file_info_label = QLabel("暂无文件")
        self.file_info_label.setFixedHeight(30)
        # 选择视频目录按钮
        self.btn_import_dir = QPushButton("选择视频目录")
        self.btn_import_dir.clicked.connect(self.choose_dir)
        # 标签
        self.dir_info_label = QLabel("暂无目录")
        self.dir_info_label.setFixedHeight(30)
        # 初始化按钮
        self.btn_init = QPushButton("初始化")
        self.btn_init.clicked.connect(self.init_table)
        # 开始按钮
        self.btn_start = QPushButton("开始")
        self.btn_start.clicked.connect(self.start_all_run)
        self.btn_start.setEnabled(False)
        # 标签
        self.run_info_label = QLabel("运行信息如下")
        # 表格组件
        self.tableWidget1 = QTableWidget()
        # 禁止编辑表格
        self.tableWidget1.setEditTriggers(QAbstractItemView.NoEditTriggers)

        # 将上面的各个组件添加到主布局中
        main_layout.addRow(self.btn_import_excel,self.file_info_label)
        main_layout.addRow(self.btn_import_dir, self.dir_info_label)
        main_layout.addRow(self.btn_init)
        main_layout.addRow(self.btn_start)
        main_layout.addRow(self.run_info_label)
        main_layout.addRow(self.tableWidget1)

    # 选择文件方法
    def choose_excel(self):
        # 创建文件对话框
        file_dialog = QFileDialog()
        file_path, _ = file_dialog.getOpenFileName(self, "选择名单文件")
        if file_path:
            print(f"excel文件路径为 {file_path}")
            self.file_info_label.setText(file_path)
    # 选择目录方法
    def choose_dir(self):
        # 创建文件对话框
        file_dialog = QFileDialog()
        directory_path = file_dialog.getExistingDirectory(self, "选择视频目录")
        if directory_path:
            print(f"目录路径为 {directory_path}")
            self.dir_info_label.setText(directory_path)

    # 初始化表格组件
    def init_table(self):
        # 测试路径
        self.file_info_label.setText("C:/Users/18271/Desktop/xdj_shangde_gui/尚德名单.xlsx")
        self.dir_info_label.setText("C:/Users/18271/Desktop/xdj_shangde_gui")

        if (self.file_info_label.text() != "暂无文件" and self.dir_info_label.text() != "暂无目录"):
            try:
                # 设置用户列表数据
                self.user_list = [{'name': '付法强', 'idCard': '11111', 'pwd': '264430', 'org': '广东xxx有限公司'},
                                  {'name': '邓田忠', 'idCard': '11111', 'pwd': '035639', 'org': '广东xxx有限公司'},
                                  {'name': '罗健华', 'idCard': '11111', 'pwd': '305414', 'org': '广东xxx有限公司'}]

                # 清空表格组件中数据
                self.tableWidget1.clearContents()
                # 遍历数据，填充到表格组件中
                for row, user in enumerate(self.user_list):
                    # 设置表头
                    header_cloumn = ["姓名", "身份证", "密码", "机构", "操作", "信息"]
                    self.tableWidget1.setHorizontalHeaderLabels(header_cloumn)
                    # 设置列数，行数
                    self.tableWidget1.setColumnCount(len(header_cloumn))
                    self.tableWidget1.setRowCount(len(self.user_list))

                    # setItem方法的第一个参数为行，第二个参数为列，第三个参数为具体数据
                    self.tableWidget1.setItem(row, 0, QTableWidgetItem(user['name']))
                    self.tableWidget1.setItem(row, 1, QTableWidgetItem(user['idCard']))
                    self.tableWidget1.setItem(row, 2, QTableWidgetItem(user['pwd']))
                    self.tableWidget1.setItem(row, 3, QTableWidgetItem(user['org']))

                    # 创建按钮控件，设置文本并连接槽函数
                    button = QPushButton()
                    button.setText("按钮")
                    # 按钮点击事件连接槽函数button_clicked。
                    # 直接使用传入参数row 会直接触发该函数。因此通过lambda表达式传入参数row。
                    button.clicked.connect(lambda _, r=row: self.button_clicked(r))  # 按钮点击事件处理函数
                    # 将按钮控件添加单元格中
                    self.tableWidget1.setCellWidget(row, 4, button)

            except Exception:
                QMessageBox.warning(None, "Title", "初始化错误")
            finally:
                # 初始化按钮禁用，开始按钮启用
                self.btn_init.setEnabled(False)
                self.btn_start.setEnabled(True)
        else:
            QMessageBox.warning(None, "Title", "请选择名单文件和视频目录")

    # 按钮点击事件
    def button_clicked(self, row):
        print(f"按钮位于第 {row} 行")
        name = self.tableWidget1.item(row, 0).text()
        idCard = self.tableWidget1.item(row, 1).text()
        pwd = self.tableWidget1.item(row, 2).text()
        org = self.tableWidget1.item(row, 3).text()
        print(name, idCard, pwd, org)
        self.tableWidget1.setItem(row, 5, QTableWidgetItem(f"{name}"))

    # 全部运行
    def start_all_run(self):
        # 禁用开始按钮
        self.btn_start.setEnabled(False)
        # ....其他逻辑

if __name__ == "__main__":
    app = QApplication(sys.argv)
    main_window = MyMainWindow()
    main_window.show()
    app.exec()

```

运行截图如下
![python_20241126172350.png](../blog_img/python_20241126172350.png)


## QTimer 定时器

QTimer是PySide6中提供的定时器类，它可以用来实现定时触发特定槽函数的功能。

定时器类提供了start()、stop()、setInterval()等方法，可以用来控制定时器的启动、停止和间隔时间设置。

在GUI应用程序中，定时器通常用来实现定时刷新界面、定时处理数据等功能。

> QTimer提供了一些定时器的常用方法

```py
# 启动定时器，并设置定时器触发的时间间隔为msec毫秒。
start(msec)
# 停止定时器，定时器不再触发。
stop()
# 设置定时器触发的时间间隔为msec毫秒。
setInterval(msec)
# 判断定时器是否处于活动状态。
isActive()
# 返回定时器还剩余多少时间才会触发，单位为毫秒。
remainingTime()

```

> 定时器的注意事项

在使用定时器时，需要注意以下几点
1. 定时器是单线程的，如果槽函数执行时间过长，可能会导致定时器信号的阻塞。
2. 定时器应该在主线程中使用，不要在子线程中创建和操作定时器。
3. 定时器需要手动启动，可以在构造函数中调用start()方法启动定时器。


> 基本示例

```py
from PySide6.QtWidgets import QApplication,QWidget
from PySide6.QtCore import QTimer

class MyWidget(QWidget):
    def __init__(self):
        super().__init__()

        # 创建一个定时器
        self.timer = QTimer()
        # 将定时器与函数绑定
        self.timer.timeout.connect(self.timer_task)
        # 设置定时器的触发时间，单位为毫秒。 1000毫秒为1秒
        self.timer.setInterval(1000)
        # 开始运行定时器
        self.timer.start()

    def timer_task(self):
        print(111)


    def stop(self):
        # 停止运行定时器
        self.timer.stop()
    

if __name__ == "__main__":
    app = QApplication([])
    example = MyWidget()
    example.show()
    app.exec()
```

1. 创建了一个MyWidget类，继承自QWidget类。
2. 在MyWidget类的构造函数中，创建了一个QTimer对象，并将其timeout信号连接到timer_task槽函数。
3. 最后设置了时间间隔为1000毫秒(即1秒)，并启动了定时器。
4. 运行结果如下，每隔1秒定时执行一次timer_task方法，在终端打印111

![python_20240527180839.png](../blog_img/python_20240527180839.png)

## QMessageBox 消息框

消息框，常用于显示普通、警告和错误消息。

```py
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton, QVBoxLayout, QWidget, QMessageBox

class MyQWidget(QWidget):
    def __init__(self):
        super().__init__()
        # 创建窗口标题
        self.setWindowTitle("MessageBox Example")

        # 设置窗口布局为垂直布局
        layout = QVBoxLayout()
        self.setLayout(layout)

        # 创建按钮
        self.show_info_button = QPushButton("Show Info Message")
        self.show_warning_button = QPushButton("Show Warning Message")
        self.ask_question_button = QPushButton("Ask Question")

        # 将按钮添加到布局
        layout.addWidget(self.show_info_button)
        layout.addWidget(self.show_warning_button)
        layout.addWidget(self.ask_question_button)

        # 连接按钮的点击信号到槽函数
        self.show_info_button.clicked.connect(self.show_info_message)
        self.show_warning_button.clicked.connect(self.show_warning_message)
        self.ask_question_button.clicked.connect(self.ask_question)

    def show_info_message(self):
        # 创建信息消息框
        QMessageBox.information(self, "Info", "This is an information message.")
        print("this is info message")

    def show_warning_message(self):
        # 创建警告消息框
        QMessageBox.warning(self, "Warning", "This is a warning message.")
        print("this is warning message")

    def ask_question(self):
        # 创建询问消息框
        result = QMessageBox.question(self, "Question", "Do you want to proceed?", QMessageBox.Yes | QMessageBox.No)

        if result == QMessageBox.Yes:
            print("User clicked Yes.")
        else:
            print("User clicked No.")

        print("this is question message")

if __name__ == "__main__":
    app = QApplication([])
    example = MyQWidget()
    example.show()
    app.exec()
```

运行效果如图所示
![python_20240528163203.png](../blog_img/python_20240528163203.png)
![python_20240528163251.png](../blog_img/python_20240528163251.png)
![python_20240528163321.png](../blog_img/python_20240528163321.png)
![python_20240528163351.png](../blog_img/python_20240528163351.png)

## Pyside6 信号（Signal）和槽（Slot）

在PySide6中，信号（Signal）和槽（Slot）机制用于组件之间的通信。信号是组件对象发出的事件通知，槽是接收到信号后执行的函数。

> 无参数信号与槽

```py
import sys
from PySide6.QtWidgets import QApplication, QWidget, QPushButton, QVBoxLayout

class MainWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.button = QPushButton("点击我")
        # 按钮点击信号绑定槽函数button_clicked
        self.button.clicked.connect(self.button_clicked)
        self.layout = QVBoxLayout()
        self.layout.addWidget(self.button)
        self.setLayout(self.layout)
    def button_clicked(self):
        print("按钮被点击了")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    app.exec()

```

> 有参数信号与槽

有时候，我们可能希望在槽函数中使用额外的参数，这些参数不是信号本身传递的。lambda表达式可以用于传递额外的参数给槽函数。

如果我们直接在槽函数中传递参数的话，在初始化组件的时候，就会触发一次槽函数。因此我们需要通过lambda表达式来连接按钮的clicked信号到button_clicked槽函数。

```py
import sys
from PySide6.QtWidgets import QApplication, QWidget, QPushButton, QVBoxLayout

class MainWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        button1 = QPushButton("按钮1")
        # 按钮点击信号绑定槽函数button_clicked,并通过lambda表达式向槽函数传递参数
        button1.clicked.connect(lambda: self.button_clicked("按钮1"))
        button2 = QPushButton("按钮2")
        button2.clicked.connect(lambda: self.button_clicked("按钮2"))
        self.layout.addWidget(button1)
        self.layout.addWidget(button2)
        self.setLayout(self.layout)
        
    def button_clicked(self, button_name):
        print(f"{button_name}被点击了")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    app.exec()

```


## PySide6 UI 组件库

记录几个比较好看的UI 组件库。

### QFluentWidgets

QFluentWidgets 是一个基于 C++ Qt/PyQt/PySide 的 Fluent Design 风格组件库，包含数以百计的流畅设计组件，为简化开发、提高效率而生。

[QFluentWidgets 官网地址https://qfluentwidgets.com/zh/](https://qfluentwidgets.com/zh/)

![python_20240604120408.png](../blog_img/python_20240604120408.png)