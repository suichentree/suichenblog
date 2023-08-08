# 该脚本主要分两个部分。
# 第一个部分: 提交代码到博客源代码仓库 https://github.com/suichentree/suichenblog.git
# 第一个部分: 将源代码打包运行，生成博客页面代码后。将页面代码提交到博客页面仓库 https://github.com/suichentree/suichentree.github.io.git

# 注意1: 在git终端中运行脚本。
# 注意2: 使用 source push.sh 命令运行该文件。bash push.sh 命令无法执行脚本中的cd命令,source命令可以。

# 定义commit方法
function commit() {
    #定义变量commitMessage,并接受外部输入赋值
    read -p "输入commitMessage: " commitMessage 
    echo "commitMessage is  $commitMessage"
    #将暂存区的文件提交到本地分支中
    git commit -m $commitMessage
}

# 定义push方法
function push(){
    # 本地分支强制推送最新文件到远程分支
    git push -f origin master
    # $?可以获取git push -f origin master命令是否运行成功，成功返回0，否则非0。
    if [ $? -eq 0 ] 
    then
        # 上传成功，方法结束
        echo "SUCCESS , git push success"
    else     
        # 上传失败，重新执行上传命令
        echo "ERROR , git push fail"
        # 重新执行push方法
        echo "Push Code to Remote Repository Again -------------------"
        push
    fi
}


# 脚本从这里开始--------------
echo "Start Run push.sh -------------------"

# 第一部分 start--------------------------
echo "Start Run Part1 -------------------"

# 将所有变动文件添加到暂存区
git add -A

# 检查是否有文件需要提交
check_commit=`git status`
if [[ $check_commit =~ "Changes to be committed:" ]] 
then 
    # 还有文件要提交
    echo "YES,some file need commit."
    # 执行提交方法
    commit
else     
    # 没有文件需要提交
    echo "NO, no file need commit"
fi

# 执行push方法
push

# 第二部分 start--------------------------
echo "Start Run Part2 -------------------"

# 生成博客静态文件
npm run build

# 进入生成的文件夹
cd public

# 初始化为git仓库
git init

# 添加到暂存区
git add -A

# 获取当前时间
time3=$(date "+%Y-%m-%d %H:%M:%S")

# 提交到本地分支
git commit -m "deploy blog $time3"

# 添加远程库地址
git remote add origin https://github.com/suichentree/suichentree.github.io.git

# 执行push方法
push

# 回到上级目录中
cd ..

# 脚本从这里结束--------------
echo "push.sh run finish -------------------"