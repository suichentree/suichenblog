---
title: java运行shell脚本
date: 2023-01-09
sidebar: 'auto'
categories: 
 - 系统
tags:
 - Linux
---

[toc]

# java运行shell脚本

使用场景：用shell脚本，快速运行，停止，重启jar包。注意修改脚本中的配置信息。

```shell
#!/bin/sh   
# 指此脚本使用/bin/sh来解释执行

# 该脚本为Linux下启动java程序的脚本
# 特别注意：
# 该脚本使用系统kill命令来强制终止指定的java程序进程。
# 所以在杀死进程前，可能会造成数据丢失或数据不完整。如果必须要考虑到这类情况，则需要改写此脚本，
# 
# 根据实际情况来修改以下配置信息 ##################################

# JAVA应用程序的名称
APP_NAME=electronic-prescription
# jar包存放路径
JAR_PATH='/home/elec-prcs'
# jar包名称
JAR_NAME=electronic-prescription-0.0.1-SNAPSHOT.jar

# ######### Shell脚本中$0、$?、$!、$$、$*、$#、$@等的说明 #########

# $$ Shell本身的PID（ProcessID，即脚本运行的当前 进程ID号）
# $! Shell最后运行的后台Process的PID(即后台运行的最后一个进程的进程ID号)
# $? 最后运行的命令的结束代码（返回值）即执行上一个指令的返回值 (函数的返回值可以通过$?来获得)
# $- 显示shell使用的当前选项，与set命令功能相同
# $* 所有参数列表。如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数，此选项参数可超过9个。
# $@ 所有参数列表。如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。
# $# 添加到Shell的参数个数
# $0 Shell本身的文件名
# $1～$n 添加到Shell的各参数值。$1是第1参数、$2是第2参数…。

# kill与kill -9的区别: 
  # kill默认是kill -15。kill -15命令告诉进程，请自行停止运行并退出,会给目标进程一个清理善后工作的机会。
  # kill -9命令告诉进程，请立刻退出。kill -9 可能会留下一些不完整的文件或状态，从而影响服务的再次启动。


# 检查程序是否处于运行状态。并返回程序进程对应的pid
isRun() {
  # 查询出对应名称服务的进程id，(添加 -v grep是为了避免匹配到 grep 进程)
  pid=`ps -ef | grep $JAR_NAME | grep -v grep | awk '{print $2}' `
  # [ ]表示条件测试。注意这里的空格很重要。要注意在'['后面和']'前面都必须要有空格
  # [ -z STRING ] 表示：如果STRING的长度为零则返回为真。即变量pid为空是真
  # 如果存在进程id返回进程id，不存在进程id返回0。
  if [ -z "$pid" ]; 
  then
    return 0
  else
    return $pid
  fi
}


# 服务运行状态查看方法
status() {
  isRun
  # 此处的$?获取的是isRun方法的返回值。0表示没有进程pid，否则有进程pid
  if [ $? -ne "0" ]; 
  then
    echo "$APP_NAME is running......, pid is $pid"
  else
    echo "$APP_NAME is not running!"
  fi
}

# 服务启动方法
start() {
  isRun
  if [ $? -ne "0" ]; 
  then
    echo "$APP_NAME is already running....., pid is $pid"
  else
    echo "begin run $APP_NAME ....."
    # java -jar启动脚本
    # /dev/null指向一个黑洞目录，使得nohup命令不打印本地日志。从而使用jar包中logback的日志配置
    nohup java -jar $JAR_PATH/$JAR_NAME > /dev/null 2>&1 &
    # 输出日志
    echo "$APP_NAME is run success。pid is $!"
  fi
}

# 服务停止方法
stop() {
    # 判断服务进程是否存在
    isRun
    if [ $? -ne "0" ]; 
    then
        echo "begin stop ${APP_NAME}。pid is $pid"
        # 若服务进程存在,kill有时停止进程太慢或者无法停止进程
        kill $pid
        sleep 3

        # 再次判断进程是否存在
        isRun
        if [ $? -ne "0" ];
        then
            echo "Failed to stop ${APP_NAME} , begin force stop ${APP_NAME}, pid is $pid"
            kill -9 $pid
            sleep 3
            echo "$APP_NAME force stop success！" 
        else
            echo "$APP_NAME is stop success！"
        fi
    else
        echo "$APP_NAME is not running！"
    fi
    
}

# 重启服务方法
restart() {
  # 调用服务停止命令
  stop
  # 调用服务启动命令
  start
}


# 帮助说明，用于提示输入参数信息
usage() {
    echo "用法: sh xxx.sh [ status | start | stop | restart ]"
    exit 1
}

###################################
# 读取脚本的第一个参数($1)，进行判断
# 参数取值范围：{ status | start | stop | restart }
# 如参数不在指定范围之内，则打印帮助信息
###################################
#根据输入参数，选择执行对应方法，其他任何输入参数，都执行帮助说明方法
case "$1" in
'start')
start
;;
'stop')
stop
;;
'restart')
restart
;;
'status')
status
;;
*)
usage
;;
esac
exit 0

```