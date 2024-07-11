# 脚本说明： push.sh 脚本用于将代码提交到本地和远程仓库。

# 远程仓库有两个，一个是gitee,一个是github
# 博客源代码的gitee远程仓库 https://gitee.com/suichentree/suichenblog.git    main分支   这个远程仓库的仓库别名是 origin ，是默认仓库
# 博客源代码的github远程仓库 https://github.com/suichentree/suichenblog.git  main分支   这个远程仓库的仓库别名是 github-origin ，非默认仓库

# 注意1: 需要在git终端中运行脚本。
# 注意2: 使用 bash push.sh 命令运行该文件。
# 注意3: 如果需要查询远程仓库地址，可以使用 git remote -v 命令查询远程仓库


# 定义commit方法
function commit() {
    #定义变量commitMessage,并接受外部输入赋值
    # read -p "输入 commit 备注: " commitMessage 
    # echo "commit 备注 is  $commitMessage"
    # #将本地暂存区的文件提交到本地分支中
    # git commit -m $commitMessage

    # 获取当前时间
    time1=$(date "+%Y-%m-%d %H:%M:%S")
    #将本地暂存区的文件提交到本地分支中
    git commit -m "up$time1"
}

# 定义push方法
function push(){
    # 推送文件到远程仓库origin的main分支
    git push origin main
    # $?可以获取git push 命令是否运行成功，成功返回0，否则非0。
    if [ $? -eq 0 ] 
    then
        # 输出上传成功消息
        echo "SUCCESS , git push success"
    else     
        # 上传失败，重新执行上传命令
        echo "ERROR , git push  fail"
        # 延迟5秒
        sleep 5s
        # 重新执行push方法
        echo "Push Code to Remote Repository Again -------------------"
        push
    fi

    # 推送文件到远程仓库github-origin的main分支
    git push github-origin main
    # $?可以获取git push 命令是否运行成功，成功返回0，否则非0。
    if [ $? -eq 0 ] 
    then
        # 输出上传成功消息
        echo "SUCCESS , git push success"
    else     
        # 上传失败，重新执行上传命令
        echo "ERROR , git push fail"
        # 延迟5秒
        sleep 5s
        # 重新执行push方法
        echo "Push Code to Remote Repository Again -------------------"
        push
    fi

}

# 脚本从这里开始--------------
echo "start run push.sh -------------------"

# 将所有改变的文件添加到本地暂存区
git add -A

# 执行 git status 命令检查是否有文件需要提交
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

# 脚本从这里结束--------------
echo "push.sh run finish -------------------"