---
title: Git笔记
date: 2021-03-12
sidebar: 'auto'
tags:
 - Git
---

[toc]

## Git笔记

Git是一个开源的分布式版本控制系统.

### 1.Git安装与配置

当git安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明Git安装成功！
在Git Bash中进行全局个人配置，配置你的git用户名和git邮箱
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

### 2.常用命令

```
1. 进入到blog目录中使用该命令，给该目录创建版本库
> cd blog
> git init

2. 创建txt文件并添加文件到版本库中
> git add readme.txt

3. 提交所有修改文件，并记录这次提交的标题 
> git commit -m "add a readme file"

提示：git add . 是提交所有修改文件。
```

<font color="red">使用git init命令后会在当前目录创建一个隐藏的.git的目录，这个目录是Git来跟踪管理当前目录的版本库，不要轻易修改和删除。</font>

<font color="red">当提交commit完后，若想把本地版本库最近的修改推送到网上的github远程版本库中，则需要git push origin master把本地库的内容推送到远程库的master分支中</font>

<h5>工作区,版本库和暂存区</h5>

1. 工作区：就是当前git仓库所在的目录。
2. 版本库：工作区中的一个隐藏目录`.git`,这个目录就是版本库。
3. 暂存区：Git的版本库中最重要的就是称为stage（或者叫index）的暂存区和自动创建的第一个分支master(主分支)。

git add把文件添加进去，实际上就是把文件添加到暂存区；
git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支的版本库中。
git remote -v 查询当前git连接的远程项目地址

```
3. 查询当前仓库的状态
$ git status

4. 查询某个文件的修改内容
$ git diff readme.txt 

5. 显示版本库中从最近到最远的提交日志
$ git log

```

```
6. 版本回退
$ git reset --hard HEAD^   #回退到上一个版本
$ git reset --hard HEAD^^   #回退到上上一个版本

....

$ git reset --hard HEAD~10   #回退到往上10一个版本

$ git reset --hard commit_id  #回退到某一个具体的版本。根据commit_id
```
PS: 在Git中，用HEAD表示当前版本，上一个版本就是HEAD^。


```
7. 记录你的每一次命令历史内容
$ git reflog 

```

```
8.撤销修改

情况1: 当你工作区中某个文件的修改想要撤销时
$ git checkout -- readme.txt

情况2：当你git add后，想要撤销暂存区中某个文件的修改时
    1. $ git reset HEAD readme.txt       #先把暂存区中readme文件的修改撤销掉
    2. $ git checkout -- readme.txt      #再把工作区中readme文件的修改撤销掉

情况3： 当你git commit后，想要撤销修改，则必须进行版本回退。
```

```
9.删除文件

情况1：当你在工作区中删除某个无用的文件后。并且也把版本库中的该文件也删除。
$ git rm test.txt                   #删除版本库中的无用文件 
$ git commit -m "remove test.txt"   #更新版本库

情况2：当你把工作区中有用的文件删除了，想要恢复过来。
$ git checkout -- test.txt          #用版本库里的版本替换工作区的版本

```
PS：从来没有被添加到版本库的文件。被删除后是无法恢复的！ 


### 3.远程仓库

#### 1.创建SSH key

本地Git仓库和GitHub仓库之间的传输是通过SSH加密的。

<font color="red">

为什么需要在GitHub中配置SSH Key呢？
因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。

GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的SSH Key都添加到你的GitHub，就可以在每台电脑上往你的GitHub推送了。

</font>

>连接github远程仓库的步骤

1. 先查找`.ssh`目录，看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件。若有，则不需要创建SSH key。

id_rsa是私钥文件，id_rsa.pub是公钥文件。


2. 若无`.ssh`目录，则创建SSH Key(在Git bash 界面中)

```
$ ssh-keygen -t rsa -C "youremail@example.com"
```

3. 登录你的github账号

打开 Account settings ->进入到 SSH Keys 页面 -> 点击 Add SSH Key -> 填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容.

4. 你的github中保存了你本地电脑上的SSH key,则你本地的电脑可以推送内容到你的github上去了。

#### 2.将远程库与你本地的git库进行关联

```
1.关联
$ git remote add origin git@github.com:你的github上的某个仓库的全称.git

## origin 是指远程库的名字，可以更改。

2.把本地库的所有内容推送到远程库上
$ git push -u origin master     # 第一次把本地库的内容推送到远程库时的命令
$ git push origin master        # 之后把本地库的内容推送到远程库时的命令
```

#### 3.从远程库克隆到本地库中

ps：首先创建一个新的空目录

```
$ git clone git@github.com:你github上的某个仓库的全称.git
```


## 2.Git(Centos版本)

### 1.安装git

>方式一：yum命令安装：

`sudo yum install -y git`

>方式二：源码安装

1. 首先安装下依赖包（可使用rpm -qa | grep wget命令查看是否有安装包）

```
sudo yum install -y wget
sudo yum install -y gcc-c++
sudo yum install -y zlib-devel perl-ExtUtils-MakeMaker
```

2. 通过官网链接下载git源码包

`wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.9.0.tar.gz`

3. 解压，配置，安装

```
tar -zxvf git-2.9.0.tar.gz
cd git-2.9.0
./configure --prefix=/usr/local  
make
sudo make install

## ./configure后面的–prefix=/usr/local，指定安装路径为usr/local
```

4. 查看安装好的git版本

`git --version`

### 2.配置git用户信息

**首先创建一目录，下面所有操作在目录中执行。**

```
## 配置用户信息

git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

### 3.创建公钥私钥

```
1. 输入命令：
ssh-keygen -t rsa -C "youremail@example.com"

2. 属于文件名，用于保存密钥（不输入文件名，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件）

Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa):

3. 提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码。
不输入密码，直接按回车。那么push的时候就不需要输入密码，直接提交到github上了）

Enter passphrase (empty for no passphrase): 
Enter same passphrase again:

4.之后密钥就会创建好,一般在/root/.ssh/id_rsa目录中

```

### 4.关联github

进入到密钥目录中，将生成的id_rsa.pub的内容存储到github中


## 常用命令

```

安装git后
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

$ ssh-keygen -t rsa -C "youremail@example.com" 创建ssh key，用于和github通信
(秘钥存储于C:\Users\27634\.ssh，把公钥id_rsa.pub存储于github)

创建版本库
$ pwd 命令用于显示当前目录(没啥用)
$ git init 把这个目录变成Git可以管理的仓库(后续新建提交和ssh克隆需要)	

操作版本库
$ git add 文件名 添加文件(新增或者更改都需要先add)
$ git commit -m "说明" 提交到本地版本库

$ git status 查看仓库状态
$ git diff 文件名 查看修改的地方

版本回退(从一个commit恢复)
$ git log 查看版本历史
$ git reset --hard HEAD^ 回退到上个版本
$ git reset --hard 1094a 回退到特定版本号(commit以后回退)
$ git reflog 记录每一次命令

$ git checkout -- file 直接丢弃工作区的修改(add以前回退)
$ git reset HEAD <file> 添加到了暂存区时，想丢弃修改(add以后回退)

删除文件
$ git rm file(已经add/commit,在目录中删除)
$ git checkout -- file 删错了回退

远程仓库
$ git remote add origin git@server-name:path/repo-name.git 关联远程库
$ git push -u origin master 第一次的push
$ git push origin master 常用的push，本地分支会在服务器上新建分支
$ git pull 需要有关联的分支，第一次下拉最好新建一个空文件夹
$ git branch --set-upstream-to=origin/远程分支 本地分支 关联分支
$ git clone git@server-name:path/repo-name.git 克隆(不需要另建文件夹)

更换远程仓库
方式1：
git remote -v                       #查看远端地址
git remote                          #查看远端仓库名
git remote set-url origin 新地址    #更换远程仓库地址，仓库别名origin
方式2：
git remote rm origin                 #删除远程的仓库origin
git remote add origin 新地址         #重新添加远程仓库,远程仓库别名为origin,注意 origin是默认的别名。

git remote add github-origin 新地址     # github上的远程仓库地址 
git remote add gitee-origin 新地址      # gitee上的远程仓库地址


分支
$ git branch -a                         #查看所有分支
$ git branch -vv                        #查看分支关联
$ git branch dev                        #创建分支
$ git checkout dev                      #切换分支
$ git merge dev                         #合并某分支到当前分支
$ git merge --no-ff -m "msg" dev        #普通模式合并，合并后的历史有分支
$ git branch -d dev                     #删除分支
$ git checkout -b dev                   #创建并切换分支
$ git branch -m 旧分支名称 新分支名称    #更换当前本地分支名称

合并分支,无法merge
$ git stash save 名字 暂存工作状态
$ git pull origin dev 拉下来 
$ git stash list 查看已经暂存的状态
$ git stash pop stash@{0} 将暂存状态merge到当前分支
还有冲突时,手动修改文件,然后add/commit
$ git log --graph 分支合并图

bug分支issue
$ git stash 暂存工作状态
$ git stash list 查看暂存工作状态
$ git stash pop 恢复暂存状态并删除状态

开发分支feature
$ git branch -D <name> 强制删除未合并的分支

rebase
$ git rebase 本地未push的分叉提交历史整理成直线

标签
$ git tag 标签名 打在最新提交的commit上
$ git tag 查询所有标签
$ git tag 标签名 f52c633 给特定的commit打标签
$ git tag -a 标签名 -m "msg" commit的id 给标签设置说明
$ git show 标签名 查询标签内容
$ git tag -d 标签名 删除标签
$ git push origin 标签名 推送某个标签到远程
$ git push origin --tags 推送所有标签
$ git push origin :refs/tags/<tagname> 可以删除一个远程标签。

```

## Git的使用

### 1.Git单个仓库的用户名邮箱配置

如果你公司的项目是放在自建的gitlab上面, 如果你不对单个仓库配置用户名和邮箱的话, 则会使用全局的, 这个时候是错误的, 正确的做法是针对公司的项目, 在项目根目录下进行单独配置。

git单个仓库配置
```
git config user.name "userName" ## 配置当前仓库的用户名
git config user.email "xxx@xx.com" ## 配置当前仓库的邮箱
git config --list ## 查看当前仓库的配置
```

<font color="red">git config --list查看当前配置, 在当前项目下面查看的配置是全局配置+当前项目的配置, 使用的时候会优先使用当前项目的配置</font>

git全局配置
```
git config --global user.name "github's Name"
git config --global user.email "github@xx.com"
git config --list
```

### 2.windows下升级git版本

1. 先查看当前安装的git版本 ```git --version```

2. 更新
git版本是2.17.1之前的，使用 ```git update```
git版本是2.17.1之后的，使用 ```git update-git-for-windows```


## Git的忽略文件.gitignore

注意：
* <font color="red">.gitignore只对从来没有commit过的文件起作用。否则是无效的。</font>
* 一个git项目中可以有多个.gitignore文件
* 每个.gitigore文件只对所处目录和其子目录有作用。
* 若要配置全局.gitignore文件。则需要将.gitignore文件放在git项目根目录中。


### .gitignore文件中的匹配语法规则

```
1 空格不匹配任意文件，可作为分隔符，可用反斜杠转义
2 开头的文件标识注释，可以使用反斜杠进行转义
3 ! 开头的模式标识否定，该文件将会再次被包含，如果排除了该文件的父级目录，则使用 ! 也不会再次被包含。可以使用反斜杠进行转义
4 / 结束的模式只匹配文件夹以及在该文件夹路径下的内容，但是不匹配该文件
5 / 开始的模式匹配项目跟目录
6 如果一个模式不包含斜杠，则它匹配相对于当前 .gitignore 文件路径的内容，如果该模式不在 .gitignore 文件中，则相对于项目根目录
7 ** 匹配多级目录，可在开始，中间，结束
8 ? 通用匹配单个字符
9 * 通用匹配零个或多个字符
10 [] 通用匹配单个字符列表
```

.gitignore文件用法举例

```
bin/        忽略bin目录内的所有内容，不忽略bin目录本身
/bin        忽略根目录下的bin文件或bin目录
/*.c        忽略cat.c等后缀为c的文件，不忽略 build/cat.c
debug/*.obj 忽略 debug/io.obj，不忽略 debug/common/io.obj 和 tools/debug/io.obj
**/foo      忽略/foo, a/foo, a/b/foo等
a/**/b      忽略a/b, a/x/b, a/x/y/b等
!/bin/a.sh  不忽略 bin 目录下的a.sh 文件
*.log       忽略所有 .log 文件
config.php  忽略当前路径的 config.php 文件
```

### .gitignore文件常用模板

```
# java
*.class

# package file
*.war
*.ear
*.zip
*.tar.gz
*.rar

# maven ignore
target/
build/

# eclipse ignore
.settings/
.project
.classpatch

# Intellij idea
.idea/
/.idea
*.ipr
*.iml
*.iws

# temp file
*.log
*.cache
*.diff
*.patch
*.tmp

```

### 已经提交过无效文件的处理方法

.gitignore只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。解决方法就是先把本地缓存删除（改变成未track状态），然后再提交。

```
git rm -r --cached .                            // 删除本地缓存,命令最后有个点.
git add .                                       // 添加要提交的文件
git commit -m "update .gitignore"               // 更新本地的缓存
git config core.excludesfile .gitignore         //让配置文件生效
```

