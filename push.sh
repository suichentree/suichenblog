# 自动上传代码到博客源代码仓库 https://github.com/suichentree/suichenblog.git
# 注意1: 在git终端中运行脚本。
# 运行脚本命令 bash push.sh

# 定义提交方法
function commit() {
    #定义变量commitMessage,并接受外部输入赋值
    read -p "输入commitMessage: " commitMessage 
    echo "commitMessage is  $commitMessage"
    #将暂存区的文件提交到本地分支中
    git commit -m $commitMessage
}

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

# 本地分支推送最新文件到远程分支
git push -u origin master