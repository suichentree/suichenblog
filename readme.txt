# 个人博客
# 码云仓库：https://gitee.com/suichenTree/suichentree.git

# master主分支存储该项目打包编译后的静态文件
# develop分支存储项目的源代码

# 查询当前远程库
git remote -v

# 删除远程库
git remote rm origin

# 关联远程库
git remote add origin https://gitee.com/suichenTree/suichentree.git

# 查询分支
git branch
# 切换分支
git chechout 分支名
# 删除分支
git branch -d 分支名

# 提交全部
git add .
# 备注这次提交
git commit -m "xx"

# 有时候需要多次npm run build 才能成功打包public目录

# 查询当前远程库
git remote -v


############# 将博客源代码上传到https://github.com/suichentree/suichenblog.git仓库中

git remote -v
git status
git add .
git commit -m "xxx"
git remote -v
# 若远程库是suichenblog.git，则直接git push,否则需要改变远程库，再推送
git push 或者 git remote add origin https://github.com/suichentree/suichenblog.git

# 上传
git push -u origin master

############# 将打包后的public目录需要上传到https://github.com/suichentree/suichentree.github.io.git仓库中

npm run build
cd public
git init
git add .            ##提交到暂存区
git commit -m "xxx"  ##提交到本地库。注意是否提交成功
# 更换远程库为 suichentree.git ,再强制上传
git remote add origin https://github.com/suichentree/suichentree.github.io.git
# 强制上传
git push -f origin master