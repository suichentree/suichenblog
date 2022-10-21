---
title: 云服务器(Centos系统)的学习笔记
date: 2020-02-12
sidebar: 'auto'
categories: 
 - 系统
tags:
 - Linux
---

[toc]

## 云服务器(Centos系统)


### 1.安装java环境-tar.gz解压安装

oracle官网账号：

```
2696671285@qq.com 
密码：Oracle123
```


1. 从oracle官网下载jdk源码包。例如jdk-8u221-linux-x64.tar.gz

2. 在/usr/local 中创建java目录

3. 把下载好的jdk转移到java目录中，之后使用命令解压 `tar -xzvf jdk-8u221-linux-x64.tar.gz`

4. 配置Java的环境变量

```
1. 使用vim打开文件(vim编辑器中，按i进入编辑模式，编辑好后，在按esc退出编辑模式。并按:wq 保存并退出文件)
vim /etc/profile 

2. 在末尾添加
export JAVA_HOME=/usr/local/java/jdk1.8.0_221
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH

3.保存退出
esc 
:wq

4. 使环境变量生效
source /etc/profile
```

5. 检查java是否安装成功
```
[root@VM_0_4_centos java]# java -version
java version "1.8.0_221"
Java(TM) SE Runtime Environment (build 1.8.0_221-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.221-b11, mixed mode)

#表示jdk安装成功

```

#### 1.java 运行 jar包

1. 当安装好java运行环境后,为了方便在centos系统根目录创建文件夹/root/shu_miniprogram

/root/shu_miniprogram 表示是专门属于微信小程序的

2. 把springboot项目，通过maven打包好的jar包，放到该目录中

3. 创建该jar包的启动脚本,并把这个脚本文件与jar包放到同一目录中。通过该脚本可方便运行，停止，重启该jar包

shu_miniprogram.sh
```sh
#!/bin/bash

#你jar包所在的目录 这里可替换为你自己的执行程序，其他代码无需更改
APP_NAME=/root/shu_miniprogram/shu_miniprogram.jar

currentTime=`date '+%Y%m%d'`


#使用说明，用来提示输入参数
usage() {
    echo "Usage: sh robotcenter.sh [start|stop|restart|status]"
    exit 1
}
 
#检查程序是否在运行
is_exist(){
  pid=`ps -ef|grep $APP_NAME|grep -v grep|awk '{print $2}'`
  #如果不存在返回1，存在返回0     
  if [ -z "${pid}" ]; then
   return 1
  else
    return 0
  fi
}
 
#启动方法
start(){
  is_exist
  if [ $? -eq 0 ]; then
    echo "${APP_NAME} is already running. pid=${pid}"
  else
    nohup java -jar ${APP_NAME}  >/root/shu_miniprogram/mpLogs/shu_miniprogram$currentTime.log
    ##上面是项目运行后产生的日志文件设置
    2>&1 &
    echo "..."
    sleep 2
    echo "..."
    sleep 3
    is_exist
    if [ $? -eq 0 ]; then
      echo "${APP_NAME} is running success. pid=${pid}"
    fi
  fi
}
 
#停止方法
stop(){
  is_exist
  if [ $? -eq "0" ]; then
    kill -9 $pid
    echo "..."
    sleep 2
    is_exist
    if [ $? -eq 0 ]; then
      echo "${APP_NAME} still in the running. pid=${pid}"
    else
      echo "${APP_NAME} has stopped running."
    fi
  else
    echo "${APP_NAME} is not running"
  fi  
}
 
#输出运行状态
status(){
  is_exist
  if [ $? -eq "0" ]; then
    echo "${APP_NAME} is running. Pid is ${pid}"
  else
    echo "${APP_NAME} is NOT running."
  fi
}
 
#重启
restart(){
  stop
  #sleep 5
  start
}
 
#根据输入参数，选择执行对应方法，不输入则执行使用说明
case "$1" in
  "start")
    start
    ;;
  "stop")
    stop
    ;;
  "status")
    status
    ;;
  "restart")
    restart
    ;;
  *)
    usage
    ;;
esac


```

4. 在脚本文件所属目录中，运行该脚本

```
[root@VM_0_4_centos shu_miniprogram]# ./shu_miniprogram.sh start   #运行项目
[root@VM_0_4_centos shu_miniprogram]# ./shu_miniprogram.sh stop   #停止项目
[root@VM_0_4_centos shu_miniprogram]# ./shu_miniprogram.sh restart   #重启项目
[root@VM_0_4_centos shu_miniprogram]# ./shu_miniprogram.sh status   #查询项目状态
```

### 2.安装Mysql环境(通过yum的方式安装mysql)

**CentOS7 一般有自带的mariadb数据库，若想使用mysql,先卸载它。**

1. 卸载原系统中的mariadb

```
查看是否有mariadb的安装包，没有可以无视
rpm -qa|grep mariadb

命令删除它
rpm -e --nodeps mariadb-libs

```

2. 下载rpm链接文件。之后通过rpm链接文件下载yum安装软件

```
在官方网站下载mysql的yum源文件
https://dev.mysql.com/downloads/repo/yum/

或者通过命令下载
wget http://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
```

3. 将下载好的rpm文件拖到服务器中，在同级目录中执行命令,下载mysql文件

```
yum -y install mysql57-community-release-el7-11.noarch.rpm
```

4. 查看一下下载了那些

```
yum repolist enabled | grep mysql.*
```

5. 安装MySQL服务器

```
yum install mysql-community-server
中间会弹出是与否的选择，选择y即可
```

6. 处理MySQL中文乱码问题

```
1.  vim /etc/my.cnf  打开mysql配置文件
2.
    在[mysqld]前面加
    [client]  
    default-character-set=utf8 

    在[mysqld]后面加
    default-storage-engine=INNODB  
    character-set-server=utf8 
    collation-server=utf8_general_ci
```

7. mysql服务命令

```
启动mysql服务
systemctl start  mysqld.service
运行一下命令查看一下运行状态 
systemctl status mysqld.service
重启mysql服务
systemctl restart mysqld.service
```

8. 登录Mysql
```
1.查看一下Mysql的初始密码
grep "password" /var/log/mysqld.log

2.通过初始密码登录mysql
mysql -uroot -p

3.修改密码
mysql>ALTER USER 'root'@'localhost' IDENTIFIED BY '****************';

4.输入后使修改生效还需要下面的语句
mysql>flush privileges;

5.查询mysql编码
mysql>status
看到里面的编码格式都变成utf8时就表示可以支持中文了.

退出mysql命令行
mysql>exit
```

9. 设置Mysql自动启动

```
systemctl enable mysqld
systemctl daemon-reload
```

10. 重启mysql服务,使之前的修改生效

```
systemctl restart mysqld.service
```

11. 服务器上安装mysql已经完成，接下来需要使用navicat操控服务器中的mysql数据库


#### 1.若使用navicat连接远程数据库，出现1130错误码！

当连接远程数据库时，出现错误代码是1130，ERROR 1130: Host X.X.X.X is not allowed to connect to this MySQL server

原因：安装mysql数据库时，默认是只能是本地ip(localhost)，才能连接mysql

解决方法：

```
1. mysql -u root -p;  #进入mysql控制台

2. 输入命令,%表示所有的ip都可以连接这个数据库，root是指mysql中的root用户
mysql>grant all privileges on *.* to 'root'@'%' identified by '密码' with grant option;

3.刷新并退出控制台
mysql>flush privileges;
mysql>exit

4.重启mysql服务,使之前的修改生效
systemctl restart mysqld.service

```

### 3.安装nginx

**Centos环境安装nginx有两种方式：yum安装和源代码安装。下面主要描述源代码安装**

centos系统中安装nginx一般安装在/usr/local/nginx目录中

>源代码安装：

0. 在nginx 官网中下载nginx的安装包 nginx-1.18.0.tar.gz

1. 检查之前是否安装nginx

```
rpm -qa | grep nginx
#有返回值表示已经安装nginx
```

2. 安装nginx前，需要安装其他依赖库包

```
1. 安装 gcc 环境
    # nginx编译时依赖gcc环境
    # 先检查是否安装gcc环境,有返回值表示已经安装gcc环境
    gcc --version
    $ sudo yum -y install gcc gcc-c++ 

2. 安装 pcre
    # 让nginx支持重写功能
    # 先检查是否安装过
    rpm -qa pcre
    $ sudo yum -y install pcre pcre-devel

3.安装 zlib
    # zlib库提供了很多压缩和解压缩的方式，nginx使用zlib对http包内容进行gzip压缩
    # 先查询是否安装过
    yum info zlib
    $ sudo yum -y install zlib zlib-devel 

4. 安装 openssl
    # 安全套接字层密码库，用于通信加密
    # 先检查时安装过
    openssl version -a
    $ sudo yum -y install openssl openssl-devel

```

3. 开始安装nginx

```
1. 从官网上下载源码包nginx-1.18.0.tar.gz,一般放在/usr/lcoal目录中解压
$ cd /usr/local/

2. 解压，并生成nginx安装目录nginx-1.18.0
$ tar -zxvf nginx-1.18.0.tar.gz 

3. 解压缩后，进入安装目录nginx-1.18.0进行源码编译安装,执行以下命令。
$ cd nginx-1.18.0
$ ./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module

$ make          #编译
$ make install  #编译安装

# 将安装后的nginx源码配置到usr/local/nginx目录下
# --prefix=/usr/local/nginx  是设置nginx编译安装后的目录（推荐），安装完后会在此目录下生成相关文件
# --with-http_stub_status_module --with-http_ssl_module 是开启nginx的ssl模块，可以方便用https来访问nginx
# make是指编译
# make install是指安装

4. 以上命令执行完成后，会创建/usr/local/nginx，并在目录中产生nginx安装后的文件。
5. 除/usr/local/nginx中的文件。之前的nginx-1.18.0.tar.gz压缩文件和nginx-1.18.0安装包文件删除即可。

```

**一般都会在/usr/lcoal目录中出现nginx目录，这个就是nginx安装后产生的文件夹。然后删除源码包nginx-1.18.0.tar.gz，和安装包目录nginx-1.18.0**


3. nginx的一些基本命令

<font color="red">注意：nginx的安装目录为/usr/local/nginx</font>

```
 #方式1

/usr/local/nginx/sbin/nginx            #启动nginx服务器
/usr/local/nginx/sbin/nginx -s stop    #强制停止nginx服务器，如果有未处理的数据，丢弃
/usr/local/nginx/sbin/nginx -s quit    #正常关闭服务器。如果有未处理的数据，等待处理完成之后停止
/usr/local/nginx/sbin/nginx -s reload  #重新加载配置文件
/usr/local/nginx/sbin/nginx -s reopen  #重新打开日志文件
/usr/local/nginx/sbin/nginx -v         #显示 nginx 的版本。
/usr/local/nginx/sbin/nginx -V         #显示 nginx 的版本，编译器版本和配置参数。
/usr/local/nginx/sbin/nginx -c filename  #为 Nginx 指定一个配置文件，来代替缺省的.
/usr/local/nginx/sbin/nginx -t          #不运行，而仅仅测试配置文件，检查配置文件中是否有错。

 #方式2
 cd /usr/local/nginx/sbin/ #切换目录执行以下命令
./nginx 
./nginx -s stop
./nginx -s quit
./nginx -s reload
./nginx -s quit  #此方式停止步骤是待nginx进程处理任务完毕进行停止。
./nginx -s stop  #此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程。

 #查看nginx服务进程
$ ps -ef | grep nginx # 查看服务进程
```

4. 修改nginx的启动端口

```
1.nginx的配置文件的绝对路径 ginx/conf/nginx.conf
2.使用vim编辑器修改该配置文件。 
3.修改80端口为8090。
4.重新启动nginx服务
5.在浏览器中输入ip:8090访问
```





