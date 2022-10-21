---
title: Docker笔记
date: 2021-04-19
sidebar: 'auto'
categories: 
 - 后端
tags:
 - Docker
---

## docker介绍

1. Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。
2. 容器是完全使用沙箱机制，相互之间不会有任何接口,更重要的是容器性能开销极低。
3. Docker 从 17.03 版本之后分为 CE（Community Edition: 社区版） 和 EE（Enterprise Edition: 企业版）
4. Docker实质上是在已经运行的 Linux 下制造了一个隔离的文件环境。因此，Docker 必须部署在 Linux 内核的系统上。如果其他系统想部署 Docker 就必须安装一个虚拟 Linux 环境。


Docker 包括三个基本概念:

1. 镜像：Docker 镜像是用于创建 Docker 容器的模板，比如 Ubuntu 系统。
2. 容器：镜像和容器的关系，就像是面向对象程序设计中的类和实例一样。容器可以被创建、启动、停止、删除、暂停等。
3. 仓库：仓库可看成一个代码控制中心，用来保存镜像。

<font color="red">PS:相对于完整的centos系统，docker中的centos镜像仅仅只是最基础版本</font>

<font color="red">PS:举例：在docker中创建tomcat容器和nginx容器.由于这两个容器都依赖于centos等linux系统镜像，则这两个容器会共用一个docker中的linux镜像。</font>


> docker和虚拟机的区别？

虚拟机的本质，是将硬件进行虚拟化，一套硬件上可以虚拟化多套硬件，可以安装多个操作系统，每个系统之间相互独立，可以各自运行互不干扰。

容器技术，本质上也是一种虚拟化技术。只不过，容器封装的并不是一个操作系统，而是一个程序及其运行环境。由于容器只需要虚拟一个小规模的环境，它的量级更轻，启动更快，占用资源更少。


## Centos安装docker

>1.使用脚本自动安装

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

>2.手动安装

1. 卸载旧版本docker,以及相关的依赖项

```shell
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

2. 下载安装docker所需要的依赖项，设置yun源

```shell
$ sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2

# 阿里云仓库源
$ sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

3. 开始安装docker,并启动docker

```shell
$ sudo yum install docker-ce docker-ce-cli containerd.io
$ sudo systemctl start docker

# 测试是否安装成功
$ docker version
```

PS:卸载docker
```shell
# 删除之前安装的安装包
sudo yum remove docker-ce docker-ce-cli containerd.io
# 删除镜像、容器、配置文件等内容。/var/lib/docker是docker的默认工作路径
sudo rm -rf /var/lib/docker
```


## docker基本命令

> 帮助命令

```shell
docker help  #查询帮助信息
docker version #查询docker基本信息
```

> 镜像命令

```shell
# 镜像命令
docker images #查询当前的镜像
docker search <镜像名>  #从dockerhub中查询镜像
docker pull <镜像名>  #下载一个镜像
docker rmi <镜像名>  #删除一个镜像
```

更改镜像：当 docker 镜像仓库中下载的镜像不能满足我们的需求时.可通过修改容器的方式，创建一个新的镜像。

两种方式对镜像进行更改：
1. 若容器对应的镜像为a,修改容器的内容,之后commit该容器。从而创建一个新的镜像b。（镜像b = 镜像a + 你改动的地方）
2. 使用 Dockerfile 指令来创建一个新的镜像

```shell
# 命令 docker commit 来提交容器副本
$ docker commit -m="备注" -a="作者" <容器ID> 目标镜像名:tag
$ docker commit -m="update file" -a="shuyx" xxxxx shuyx/ubuntu008:v2
```


> 容器命令

```shell
# 创建一个容器并启动
语法：docker run [可选参数] <镜像名>

可选参数：
  --name="name" 容器名字，用来区别容器
  -d           后台方式运行，默认不会进行该容器中
  -it          以命令行交互的方式运行
  -p           指定容器端口 （例如 -p 主机端口：容器端口）

##例子：根据ubuntu镜像创建一个容器，以交互模式进入该容器中
docker run -it ubuntu /bin/bash

# 创建并后台运行容器
# -d 后台运行，默认不会进行该容器中
docker run -d --name ubuntu01 ubuntu


## 退出容器
exit          # 退出并停止容器
Ctrl + p + q  # 退出容器，不停止容器

```
```shell
# 查询当前运行容器
docker ps
# 查询所有运行中的容器 + 历史运行的容器
docker ps -a

# 启动容器
docker start <容器ID>

# 停止容器
docker stop <容器ID>

# 强制停止容器
docker kill <容器ID>

# 重启容器
docker restart <容器ID>

# 删除容器
docker rm -f <容器ID>

# 从某个容器中退出
exit

```

进入容器终端命令。分为：docker attach和docker exec。其中使用docker exec命令退出容器终端，不会导致容器的停止。

```shell
# 以交互终端的方式，进入到容器终端
# 退出的时候会导致容器停止
docker attach -it <容器ID> /bin/bash

# 以交互终端的方式，进入到容器终端
# 退出的时候不会导致容器停止
docker exec -it <容器ID> /bin/bash
```

查询容器日志
```shell
#查看容器运行的日志，显示日志条数为n
# -f实时查看，-t显示时间 ，-tail n表示日志条数

docker logs -f <容器ID>
docker logs –tf –tail n <容器ID>
```


查询容器的内部进程信息和元数据
```shell
docker top <容器ID> #查询容器内部的进程信息

docker inspect <容器ID> #查询容器内部元数据
```

从容器中复制文件到主机中
```shell
docker cp <容器id>：容器内路径  目的主机路径		#将特定容器内特定路径下的文件复制到主机的特定路径中

#例子：将docker中home目录中为java文件拷贝到主机的root目录中
docker cp xxxxxx:/home/a.java /root
```

导出容器和导入容器
```shell
# 导出容器
# 将容器快照到本地文件 ubuntu.tar
docker export <容器ID> > ubuntu.tar

# 导入容器
# 将ubuntu.tar容器快照文件导入为镜像test/ubuntu:v1
cat ubuntu.tar | docker import - test/ubuntu:v1

```

### docker run 命令

```shell
docker run [可选参数] <镜像名>

可选参数：
  -d: 后台运行容器，并返回容器ID；
  -i: 以交互模式运行容器，通常与 -t 同时使用；
  -p: 指定端口映射，格式为：主机端口:容器端口
  -t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
  --name="new-name": 为容器指定一个名称；
  --dns 8.8.8.8: 指定容器使用的DNS服务器，默认和宿主一致；
  --dns-search example.com: 指定容器DNS搜索域名，默认和宿主一致；
  -h "mars": 指定容器的hostname；
  -e username="ritchie": 设置环境变量；
  --env-file=[]: 从指定文件读入环境变量；
  -m :设置容器使用内存最大值；
  --net="bridge": 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；
  --link=[]: 添加链接到另一个容器；
  --expose=[]: 开放一个端口或一组端口；
  --volume , -v: 绑定一个数据卷

```






## 容器数据卷

容器数据卷就是将容器内的某个目录的数据映射到容器外某个目录中（容器内外数据同步），从而防止删除容器就会导致容器内数据也被删除的事情。

<font color="red">好处：修改容器内数据，只需修改对应的容器数据卷的目录，容器会自动同步该卷中的数据</font>

方式1：命令行
```shell
# 创建容器并启动，将某个主机目录映射到某个容器目录中
docker run -it -v 主机目录:容器目录 镜像名 /bin/bash

# 这两个目录中的文件会自动同步
docker run -it -v /home/webapps:/usr/local/tomcat/webapps tomcat
```

方式2：docker file方式添加


## Dockerfile

Dockerfile是一个用来构建镜像的脚本文件，文件内容包含了一条条构建镜像所需的指令和说明,可以使用Dockerfile来自定义镜像。

docker build命令
```shell
# -f 指定Dockerfile路径
# -t 指定镜像的名字
$ docker build -f /path/to/a/Dockerfile -t nginx001
```


```shell
# 进入到某个目录
$ cd /root/docker_demo/
# 创建Dockerfile文件,注意Dockerfile的D需要大写
$ touch Dockerfile
# 编辑Dockerfile文件
$ vim Dockerfile

# 执行Dockerfile文件，构建镜像
# 注意：在Dockerfile文件所在的目录中执行命令
#  nginx:v3 创建的镜像名以及对应的tag
# . 表示当前目录，而 Dockerfile 就在当前目录
$ docker build -t nginx:v3 .
```

Dockerfile文件内容
```shell
# base image 基础镜像
FROM centos
 
# MAINTAINER 制作人
MAINTAINER json_hc@163.com

# 将nginx压缩包放到指定目录并解压
ADD /root/nginx-1.18.0.tar.gz /usr/local/src

# 执行命令
RUN yum install -y gcc gcc-c++ glibc make autoconf openssl openssl-devel
RUN yum install -y libxslt-devel -y gd gd-devel GeoIP GeoIP-devel pcre pcre-devel
RUN useradd -M -s /sbin/nologin nginx

# 跳转到对应目录，若目录不存在则会创建它
WORKDIR /usr/local/src/nginx-1.12.2

# 执行命令编译nginx
RUN ./configure --user=nginx --group=nginx --prefix=/usr/local/nginx --with-file-aio --with-http_ssl_module --with-http_realip_module --with-http_addition_module --with-http_xslt_module --with-http_image_filter_module --with-http_geoip_module --with-http_sub_module --with-http_dav_module --with-http_flv_module --with-http_mp4_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_auth_request_module --with-http_random_index_module --with-http_secure_link_module --with-http_degradation_module --with-http_stub_status_module && make && make install

# 暴露端口
EXPOSE 80
```


### Dockerfile的各种指令

<font color="red">Dockerfile 的指令每执行一次都会在原有基础上新建一层新的镜像。所以过多的指令，会造成镜像膨胀过大。</font>

1. FROM 指定基础镜像
2. RUN 执行命令
```shell
RUN有两种格式：
格式1：RUN <命令行命令>
# <命令行命令> 等同于，在终端操作的 shell 命令。

格式2：RUN ["可执行文件", "参数1", "参数2"]
# RUN ["./test.php", "dev", "offline"] 等价于 RUN ./test.php dev offline
```

3. MAINTAINER 指定创建镜像的用户
4. CMD 用于运行程序，类似于 RUN 指令但二者运行的时间点不同
```shell
CMD 在docker run 时运行，在容器运行的时候。
RUN 是在 docker build，在镜像创建的时候。
# 注意：如果 Dockerfile 中如果存在多个 CMD 指令，仅最后一个生效。
```

5. ENV 设置环境变量
```shell
ENV <key1>=<value1> <key2>=<value2>...
示例：
ENV VERSION=1.0 DEBUG=on NAME="tomcat"
```

6. VOLUME 定义匿名数据卷
```shell
VOLUME ["/data"]
```

7. COPY 复制文件
```shell
COPY <源路径1> <目标路径>
# <源路径>：源文件或者源目录，这里可以是通配符表达式
# <目标路径>：容器内的指定路径。路径不存在的话，会自动创建。
```

6. ADD 更高级的复制文件
```shell
ADD <源路径1> <目标路径>
# ADD：若源文件为 tar 压缩文件的话，会自动复制并解压到 <目标路径>下。
```

## Docker网络

当安装docker的时候,它会自动创建三个网络，bridge（创建容器会默认连接到此网络）,none,host。

```shell
# 可以通过 docker network ls 命令来显示这三个网络
qwe@ubuntu:~/Desktop$ docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
e806a6373a89   bridge    bridge    local
ea48da9dbf76   host      host      local
f3ab3fef5588   none      null      local
```
<font color="red">PS:使用 –network 可以指定容器应连接到那个网络。默认连接到bridge网络中</font>

```shell
# 用ubuntu容器创建容器，指定该容器连接host网络
docker run -it --network=host ubuntu
```

### docker0虚拟网桥

Docker启动的时候会在主机上自动创建一个docker0网桥，每个容器的启动如果在docker run的时候没有指定网络模式的情况下都会挂载到docker0网桥上。这样容器就可以和主机甚至是其他容器之间通讯了。

ps:具体表现为docker每运行一个容器，docker0网桥会分配一个ip给该容器。容器会记录下网桥的ip。网桥会记录分配给容器的ip。这样容器和网桥就会记住双方的ip，因此双方就可以进行通讯。

<font color="red">

1. 主机和docker通讯是通过docker0网桥实现的。
2. docker容器之间的通过docker0网桥中转的,因为docker0会记录下所有运行容器的ip。

</font>


### docker的网络模式

主机与docker容器之间的网络模式分为4种：host,bridge,none,container。

网络模式   | 介绍 
-------   | ------
bridge    | 默认网络模式。此模式会为每一个容器分配、设置IP等，并将容器连接到一个docker0虚拟网桥，通过docker0网桥以及Iptables nat表配置与宿主机通信。  
host      | 容器将不会虚拟出自己的网卡，配置自己的IP等，而是使用宿主机的IP和端口
none      |	该模式关闭了容器的网络功能。
container |	创建的容器不会创建自己的网卡，配置自己的IP，而是和一个指定的容器共享IP、端口范围。

<font color="red">PS:使用 –net 可以指定容器使用那种网络模式。</font>

```shell
host模式：使用 --net=host 指定。
none模式：使用 --net=none 指定。
bridge模式：使用 --net=bridge 指定，默认设置。
container模式：使用 --net=container:NAME_or_ID 指定。
```

## docker安装案例

### docker安装nginx

```shell
# 下载nginx镜像
docker pull nginx

# 创建并后台启动nginx镜像的容器
# --name nginx01 镜像重取名
# -p 8081:80 主机的8081端口映射到容器的80端口
# -d 后台运行，默认不会进入容器
# nginx 镜像名，指定生成该容器的镜像
docker run --name nginx01 -p 8081:80 -d nginx

# 进入到该镜像中
docker exec -it nginx01 /bin/bash

# 查询该容器中nginx文件
root@36432ae018b1:/$ whereis nginx 
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx

# 可以在主机访问ip:port来测试nginx是否安装成功
$ curl localhost:3344

<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>

```

### docker安装tomcat

```shell
# 下载tomcat镜像
docker pull tomcat

# 创建容器并运行
docker run -d -p 3355:8080 --name="tomcat01" tomcat

# 进入到该容器中
docker exec -it tomcat01 /bin/bash

# 可以在主机访问链接来验证tomcat安装是否成功
$ curl localhost:3355

```

### docker安装portainer

portainer：管理docker的可视化界面工具

```shell
# 创建并启动portainer容器
docker run -d -p 9000:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer

# portainer/portainer 镜像全名

# --restart选项，可以设置容器的重启策略。
## always重启策略，在容器退出时总是重启容器

# -v 设置数据卷

# --privileged=true 是否在容器中开启root管理员权限。容器默认是不开启root权限的

```

之后，访问http://localhost:9000/，即可进入portainer界面

### docker安装mysql

```shell
# 下载mysql镜像
docker pull mysql

# 创建容器并启动
# --name mysql01 容器命名
# -d 后台启动
# -e MYSQL_ROOT_PASSWORD=123456 , -e 设置环境变量。此处是设置mysql密码
# -p 3306:3306 , 主机的3306端口映射到容器的3306端口
# -v 设置容器数据卷
# mysql 最后是该容器所需的镜像
docker run -d -p 3306:3306 --name mysql01 -e MYSQL_ROOT_PASSWORD=123456 -v /my/custom:/etc/mysql/conf.d mysql

# 进入到mysql容器中
docker exec -it mysql01 /bin/bash

# 进入到mysql命令行模式
$ mysql -uroot -p123456

```

### docker安装redis

```shell
# 下载redis镜像
docker pull redis

# 创建容器并启动
# -p 6379:6379 映射容器的6379端口到宿主机的6379端口
docker run -itd --name redis01 -p 6379:6379 redis

# 进入到redis01容器中
docker exec -it redis01 /bin/bash

```

