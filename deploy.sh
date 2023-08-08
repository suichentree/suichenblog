
#---------------------------------------------------------------------------
# 部署博客页面代码到https://github.com/suichentree/suichentree.github.io.git仓库

# 注意1: 在git终端中运行脚本。
# 注意2: 使用 source deploy.sh 命令运行该文件。bash 命令无法执行脚本中的cd命令,source命令可以。

生成博客静态文件
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

# 强制上传
# git push -f origin master

check_push=`git push -f origin master`
echo "$check_push is "
echo $?
if [ $? -ne 0 ] 
then 
    # 上传失败，重新执行上传命令
    echo "ERROR , git push fail"
else     
    # 上传成功，结束运行
    echo "SUCCESS , git push success"
fi
