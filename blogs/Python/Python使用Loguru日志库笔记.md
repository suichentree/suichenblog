---
title: Python使用Loguru日志库笔记
date: 2024-05-18
sidebar: 'auto'
categories: 
 - Python
tags:
 - Python
---

[toc]

# Python使用Loguru日志库笔记

Loguru是目前最流行的python第三方日志库。

## 安装

Loguru 仅支持 Python 3.5 及以上的版本，使用 pip 安装即可。

```bash
pip install loguru
```

## 默认使用

Loguru 的主要使用对象只有一个：logger

```py
# 导入loguru模块
from loguru import logger
# 打印各种级别的日志消息
logger.info("This is log info!")
logger.warning("This is log warn!")
logger.error("This is log error!")
logger.debug("This is log debug!")
```

控制台输入如下
![python_20240517174100.png](../blog_img/python_20240517174100.png)

Loguru 会提前配置一些基础信息，自动输出时间、日志级别、模块名、行号等信息，而且根据等级的不同，还自动设置了不同的颜色，方便观察，真正做到了开箱即用。

## 自定义日志文件

通过 add() 函数。我们可以自定义日志文件配置，从而将日志保存到文件上。

```py
# 导入loguru模块
from loguru import logger
# 设置日志文件为test01.log
logger.add('test01.log')

# 打印各种级别的日志消息
logger.info("This is log info!")
logger.warning("This is log warn!")
logger.error("This is log error!")
logger.debug("This is log debug!")
```

程序运行结束后，不光会在控制台上输出日志信息。同时也会在当前目录中创建一个test01.log日志文件，并把日志信息输出到日志文件中。

## add()方法完整参数

我们可以通过add()方法来进行各种自定义日志配置。下面是add()方法的完整参数：

```py
add(sink, *, level='DEBUG', 
format='<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>', 
filter=None, colorize=None, serialize=False, backtrace=True, 
diagnose=True, enqueue=False, catch=True, **kwargs)
```

基本参数
- sink：可以是一个file对象，也可以是一个文件路径，也可以是一个方法名称。
    - 当sink是一个file对象的时候，日志信息会传输给该文件对象。
    - 当sink是一个文件路径的时候，loguru会根据这个文件路径，创建一个日志文件，然后将日志信息写入到日志文件中。
    - 当sink是一个方法的时候，日志信息会传递给方法参数。从而可以在方法中自定义日志输出方式。
- level：日志输出和保存级别。
- format：日志格式模板。
- filter：一个可选的指令，用于决定每个记录的消息是否应该发送到 sink。
- serialize：在发送到 sink 之前，是否应首先将记录的消息转换为 JSON 字符串。
- backtrace：格式化的异常跟踪是否应该向上扩展，超出捕获点，以显示生成错误的完整堆栈跟踪。
- diagnose：异常跟踪是否应显示变量值以简化调试。建议在生产环境中设置 False，避免泄露敏感数据。
- enqueue：要记录的消息是否应在到达 sink 之前首先通过多进程安全队列，这在通过多个进程记录到文件时很有用，这样做的好处还在于使日志记录调用是非阻塞的。
- catch：是否应自动捕获 sink 处理日志消息时发生的错误，如果为 True，则会在 sys.stderr 上显示异常消息，但该异常不会传播到 sink，从而防止应用程序崩溃。
- **kwargs：附加参数（见下文）。


当且仅当 sink 是文件路径时，可以有以下附加参数：
- rotation：一种条件，指示何时关闭当前日志文件并开始使用新的日志文件。
- compression：日志文件在关闭时应转换为的压缩或存档格式。
- delay：是在配置 sink 后立即创建文件，还是延迟到第一条记录的消息时再创建。默认为 False。
- mode：内置 open() 函数的打开模式，默认为 a（以追加模式打开文件）。
- buffering：内置 open() 函数的缓冲策略，默认为1（行缓冲文件）。
- encoding：内置 open() 函数的文件编码，如果 None，则默认为 `locale.getpreferredencoding()`。
- \kwargs：其他传递给内置 open() 函数的参数。

当且仅当 sink 是函数时，可以有以下附加参数：
- loop：将在其中调度和执行异步日志记录任务的事件循环。如果为 None，将使用 asyncio.get_event_loop() 返回的循环。

### format 日志格式模板

当我们需要自定义日志格式的时候，我们需要先移除默认的日志格式，然后再添加自定义的日志格式。

```py
from loguru import logger
import sys

# 移除默认的控制台日志格式
logger.remove(0)

# 自定义日志信息格式
# 里面添加了process和thread记录，方便查看多进程和线程的信息
log_format= '<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | <level>{level}</level> ' \
            '| <magenta>{process}</magenta>:<yellow>{thread}</yellow> ' \
            '| <cyan>{name}</cyan>:<cyan>{function}</cyan>:<yellow>{line}</yellow> - <level>{message}</level>'

# 添加自定义的控制台日志输出格式
logger.add(sys.stdout,colorize=True,format=log_format)

# 设置不同级别日志文件中的自定义日志格式
# 分别是info级别的日志文件，和 waring级别的日志文件。并且每天7点进行日志文件分割
logger.add("./log/run_info_log_{time:YYYY-MM-DD}.log",format=log_format,level="INFO",rotation="07:00")
logger.add("./log/run_warning_log_{time:YYYY-MM-DD}.log",format=log_format,level="WARNING",rotation="07:00")
```

### rotation 日志文件分割

add() 函数的 rotation 参数，可以根据不同的方式来进行日志文件分割。

> 按时间分割日志文件

按照固定时间创建新的日志文件，比如设置每天 0 点新创建一个 log 文件。

```py
# 导入loguru模块
from loguru import logger
# 设置 rotation 参数 每天0点进行日志分割
logger.add('runtime_{time}.log', rotation='00:00')

```

> 按大小分割日志文件

设置超过 500 MB 新创建一个 log 文件

```py
logger.add('runtime_{time}.log', rotation="500 MB")
```

> 按日期分割日子文件

设置每隔一个周新创建一个 log 文件

```py
logger.add('runtime_{time}.log', rotation='1 week')
```

### retention 日志文件保留

add() 函数的 retention 参数，可以设置日志文件。

> 设置日志文件保留时间

```py
from loguru import logger
import datetime

# 设置日志文件最长保留 15 天
logger.add('runtime_{time}.log', retention='15 days')

# 设置日志文件最长保留 5 个小时
logger.add('runtime_{time}.log', retention=datetime.timedelta(hours=5))
```

> 设置日志文件保留个数

```py
# 设置日志文件最多保留 10 个
logger.add('runtime_{time}.log', retention=10)
```

### compression 日志压缩格式

add() 函数的 compression 参数，可以配置日志文件的压缩格式。

```py
# 设置使用 zip 文件格式保存
logger.add('runtime_{time}.log', compression='zip')
```

另外还支持的格式有：gz、bz2、xz、lzma、tar、tar.gz、tar.bz2、tar.xz

