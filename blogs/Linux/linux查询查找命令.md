---
title: linux查询查找命令
date: 2022-10-20
sidebar: 'auto'
categories: 
 - 系统
tags:
 - Linux
---

[toc]

# linux查询查找命令

## tail命令

① 全称和作用
* tail命令的全称即为tail(尾巴)。
* 因此tail命令作用是显示后边几行。默认显示最后10行

② 命令参数

```shell
-f 循环读取
-q 不显示处理信息
-v 显示详细的处理信息
-c <数目> 显示的字节数
-n <行数> 显示文件的尾部 n 行内容
--pid=PID 与-f合用,表示在进程ID,PID死掉之后结束
-q, --quiet, --silent 从不输出给出文件名的首部
-s, --sleep-interval=S 与-f合用,表示在每次反复的间隔休眠S秒
```


### 使用tail命令案例

```shell
$ tail aaa.txt      #默认显示最后10行
$ tail -5 aaa.txt   #显示aaa.txt文件最后5行的内容
$ tail -n +5 aaa.txt  #从第5行开始显示文件内容至文件末尾
$ tail -c 10 aaa.txt  #显示文件的最后10个字符

$ tail -f aaa.txt    # 此命令显示文件的最后 10 行。当aaa.txt文件有更新时，tail -f命令会实时显示。

$ tail -100f aaa.txt  # 显示最后100行文件内容，之后实时显示
```

* 当文件内容有更新时。tail -f 命令会实时显示出来。
* 若要结束tail -f命令，按CTRL + C组合键即可。

## cat命令

① 全称和作用
* cat（英文全拼：concatenate）命令：用于连接文件并打印到标准输出设备上。

cat 命令有3个作用：
1. 一次显示整个文件 
2. 创建一个文件 
3. 将几个文件合并为一个文件

② 完整语法格式
```
cat [-AbeEnstTuv] [--help] [--version] fileName
```

③ 命令参数
```
-n 或 --number：从 1 开始对所有输出的行数编号。
-b 或 --number-nonblank：和 -n 相似，只不过对于空白行不编号。
-s 或 --squeeze-blank：当遇到有连续两行以上的空白行，就代换为一行的空白行。
-v 或 --show-nonprinting：使用 ^ 和 M- 符号，除了 LFD 和 TAB 之外。
-E 或 --show-ends : 在每行结束处显示 $。
-T 或 --show-tabs: 将 TAB 字符显示为 ^I。
-A, --show-all：等价于 -vET。
-e：等价于"-vE"选项；
-t：等价于"-vT"选项；
```

### cat命令实例

```shell

# 显示整个文件内容
cat /etc/a.txt

# 创建b.txt文件
cat > b.txt

# 把 textfile1 的文档内容加上行号后，覆盖到 textfile2 这个文档里
# > 是覆盖
cat -n textfile1 > textfile2

# 把 textfile1 的文档内容加上行号后，附件加到 textfile2 这个文档末尾后
# >> 是附加
cat -n textfile1 >> textfile2

# 清空 /etc/a.txt 文档内容
cat /dev/null > /etc/a.txt

```


> tail和cat的区别：
1. cat显示文档的全部数据，是静态查看文件内容
2. tail可以查看文档更新情况，可以动态查看文件内容


## grep命令

① 全称和作用

* grep的全程是：Global search Regular Expression and Print out the line （全局 搜索 正则表达式 和 打印出来）。
* 作用：用正则表达式在文本中查找指定的字符串，类似于windows系统中用ctrl+F去查找一样。

② 完整语法结构
```
grep   [options]  [pattern]   file
命令   参数        匹配模式   文件
```

③ 命令参数
```
-i : 忽略大小写；
-o : 仅显示匹配到目标字符串；
-v : 显示不能被匹配到的字符串（反转）；
-E : 支持使用扩展的正则表达式字符串；
-q : 静默模式，不输出任何信息
-n : 显示匹配行与行号
-c ：只统计匹配行数
-w ：只输出过滤的单词
-l ：列出包含匹配项的文件名
-L ：列出不包含匹配项的文件名

```


### grep命令中常用到的正则表达式

表达式  | 解释说明 | 
------  | ------  | 
^       | 用于模式最左侧，如 “^yu” 即匹配以yu开头的单词               |
$       | 用于模式最右侧，如 “yu$” 即匹配以yu结尾的单词               |
^$      | 组合符，表示空行                                           | 
`|`     |	连接符。表示并且的意思                  |       
.       |	匹配任意一个且只有一个字符，不能匹配空行                  |
*       |	重匹配前一个字符连续出现0次或1次以上                      |
.*      |	匹配任意字符                                            |
^.*     |	组合符，匹配任意多个字符开头的内容                          |
.*$     |	组合符，匹配任意多个字符结尾的内容                          |
[^abc]  |	匹配除了 ^后面的任意一个字符，a或b或c，[]内 ^ 表示取反操作  |
[abc]   |	匹配 [] 内集合中的任意一个字符，a或b或c，也可以写成 [ac]    |

### 使用grep命令案例

自定义一个aaa.txt 的文件，内容如下
```txt
aaa
bbb
ccc
##这是注释行1
##这是注释行2
```

```shell
#从文件中输出注释行。
# "^#"匹配#开头
$ grep "^#" aaa.txt       

#从文件中输出注释行。-n显示匹配行与行号
$ grep -n "^#" aaa.txt    

# 找出文件中的非注释行，并且不是空行
# -v 反转的意思，| 并且的意思
$ grep  -v "^#" aaa.txt | grep  -v "^$"  

#从文件中输出以h开头的行,不区分大小写
$ grep -i "^h" aaa.txt    

#输出以txt结尾的行。显示匹配行与行号
$ grep -n "txt$" aaa.txt  

# 匹配文本中至少包含一个abc的行
$ grep -i ".abc" aaa.txt  

```


## 用tail和grep命令查看日志

```shell    
tail -f xxx.log             # 实时刷新最新日志
tail -100f xxx.log          # 实时刷新最新的100行日志
tail -100f xxx.log | grep [关键字]    # 查找最新的一百行中与关键字匹配的行
tail -100f xxx.log | grep '2019-10-29 16:4[0-9]'    # 查找最新的100行中时间范围在2019-10-29 16:40-2019-10-29 16:49范围中的行
tail -1000f xxx.log | grep -A 5 [关键字] # 查看最新的1000行中与关键字匹配的行加上匹配行后的5行
```




