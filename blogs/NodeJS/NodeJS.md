---
title: NodeJs笔记
date: 2023-01-12
sidebar: 'auto'
categories: 
 - 前端
tags:
 - NodeJs
---

[toc]

## 前言

1. 为什么JavaScript可以在浏览器上运行？

因为浏览器中包含JavaScript引擎，JavaScript引擎专门用于解析JavaScript代码并执行。
不同的浏览器使用的JavaScript引擎不同。例如Chrome浏览器使用的JavaScript引擎是V8引擎。V8引擎在众多JavaScript引擎中性能非常好。

2. 为什么JavaScript能操作浏览器中的DOM,BOM?

因为每个浏览器都内置了操作DOM,BOM的api函数。js代码通过调用这些api函数来操作浏览器中的DOM,BOM。

3. 什么是Node.js?

Node.js是一个JavaScript运行环境，其内置了V8引擎。因此Node.js可以解析JavaScript代码并执行。

![20230104115819.png](../blog_img/20230104115819.png)

node.js中没有内置浏览器的DOM,BOM的api函数。因此node.js无法操作DOM,BOM。


## 1.安装Node.js

1. 下载Node.js安装包:
[Node.js中文网](http://nodejs.cn/)
下载node.js安装包，一路默认即可
2. 安装node.js：
在Windows上安装时务必选择全部组件，包括勾选Add to Path
3. 执行语句：
Windows系统中，打开cmd,输入node -v，出现版本号，表示安装正常。

```
>node -v
v8.11.1
```

4. 更换为cnpm,下载更快

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm -v
```

5. 如何卸载node.js

Windows版本：
```
1.在控制面板-程序-程序和功能中卸载

2.文件夹中进行进一步的删除
C:\Program Files (x86)\Nodejs
C:\Program Files\Nodejs
C:\Users\Administrator\AppData\Roaming\npm
C:\Users\Administrator\AppData\Roaming\npm-cache

3.检查环境变量中Path中有没有,有的话 进行删除
4. 最后 重启一下 结束

```

## 2.NPM

### 1.认识NPM：

<font color="red">Node.js内置了npm包管理工具。安装了node.js就安装了npm。</font>

```
npm其实是Node.js的包管理工具（node.js package manager）。
当我们在Node.js上开发时，会用到很多别人写的JavaScript代码。
如果我们要使用别人写的某个包，每次都根据名称搜索一下官方网站，下载代码，解压，再使用，非常繁琐。
于是一个集中管理的工具应运而生：大家都把自己开发的模块打包后放到npm官网上，如果要使用，直接通过npm安装就可以直接用，不用管代码存在哪，应该从哪下载。
如果我们要使用模块A，而模块A又依赖于模块B，模块B又依赖于模块X和模块Y，npm可以根据依赖关系，把所有依赖的包都下载下来并管理起来。否则，靠我们自己手动管理，肯定既麻烦又容易出错。

常见的使用场景有以下几种：
①：允许用户从NPM服务器下载别人编写的三方包到本地使用。
②：允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
③：允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。
```


查看npm包管理工具的版本
```
C:\>npm -v
5.6.0
```

### 2.常用NPM命令：

[NPM官网https://www.npmjs.com/](https://www.npmjs.com/)

命令参数：

```js
-g： 为 --global 的缩写，表示安装到全局目录里
-S： 为 --save 的缩写，表示安装的包将写入package.json里面的dependencies
-D： 为 --save-dev 的缩写，表示将安装的包将写入packege.json里面的devDependencies
i： 为install的缩写，表示安装

```

常用命令：
```js
npm -v  //查看npm的版本

//安装包，默认会安装最新的版本，安装到项目node_modules目录中
//之后在代码中只需要通过`require('包名')`的方式就可以引用，无需指定三方包路径。
npm install <package>   　　　
npm install <package>@<version>      //安装指定版本
npm install <package> -g 或 npm install <package> --global  //全局安装包
npm install <package> --save 或 npm install <package> -S  //安装包并将安装包信息将加入到dependencies（生产阶段的依赖）
npm install <package> --save-dev 或 npm install <package> -D //安装包并将安装包信息将加入到devDependencies（开发阶段的依赖），所以开发阶段一般使用它

npm uninstall <package> --save-dev 或 npm uninstall <package> -D       //卸载开发版本的模块
npm uninstall <package> --save 或 npm uninstall <package> -S 　　　　　 //卸载生产版本的模块
npm uninstall <package> --save-optional 或 npm uninstall <package> -O  //卸载可选依赖版本的模块

npm update              //更新包，将包更新到最新版本
npm update <package>    //更新指定包
npm update -g           //更新全局包
npm update -g <package> //更新指定的全局包
npm outdated [-g]       //列出所有已经过时的包，可以及时进行包的更新


//获取当前npm的镜像仓库
npm config get registry
//设置全局的npm淘宝镜像
npm config set registry https://registry.npm.taobao.org
//设置默认全局镜像
npm config set registry https://registry.npmjs.org

//清除npm的缓存
npm cache clean

```


### 3. -g 和 --save 和 --save-dev 的区别

```js
//全局安装包
npm install <package> -g 或 npm install <package> --global 
//安装包并将安装包信息将加入到dependencies（生产阶段的依赖）
npm install <package> --save 或 npm install <package> -S  
//安装包并将安装包信息将加入到devDependencies（开发阶段的依赖），所以开发阶段一般使用它
npm install <package> --save-dev 或 npm install <package> -D 
```
1. -g 全局安装的意思是把模块包安装到电脑的操作系统上，一般会安装到AppData\Roaming\npm目录下。在操作系统的任何一个目录下都可以通过命令行使用该模块包

2. --save 的意思是把模块包安装到项目node_modules目录下。然后把模块依赖写入项目的dependencies节点。当npm install 初始化项目时，会将该模块下载到项目目录下。dependencies节点下的模块包是开发和生产都需要的。例如axios

3. --save-dev 的意思是安装模块包到项目node_modules目录下。把模块依赖写入到项目的devDependencies节点。当npm install 初始化项目时，会将该模块下载到项目目录下。devDependencies节点下的模块包是在开发时需要用的（例如压缩css、js的模块包），但是生产时是不需要的。

### 4. node_modules目录和package-lock.json配置文件等

node_modules目录：用来存放所有已安装到项目的包。require()方法会从该目录下查找包并加载包。

package-lock.json文件：记录node_modules目录中包的各种信息。例如包的名字，版本等

### 5. 包管理配置文件package.json


```
package.json文件： 用来记录与项目有关的配置文件。
例如：
1. 项目名称，版本号，描述等
2. 项目中使用的包等

若项目的根目录没有package.json文件
npm提供了一个快速创建package.json的命令
npm init -y
```


## 3.用nodejs执行js代码：

1. 编写hello.js文件：
```js
'use strict';  //以严格模式运行JavaScript代码，避免各种潜在陷阱。
console.log('Hello, world');
```

2. 打开命令行,运行该js文件：
```js
// node js文件路径
C:\nodejs>node hello.js
Hello, world
```

### 什么是严格模式 use strict

```
严格模式通过在脚本或函数的头部添加 "use strict"; 表达式来声明。

为什么使用严格模式:
1. 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
2. 消除代码运行的一些不安全之处，保证代码运行的安全；
3. 提高编译器效率，增加运行速度；
4. 为未来新版本的Javascript做好铺垫。

如何使用严格模式：
1. 如果在JavaScript文件开头写上'use strict';，那么Node在执行该JavaScript时将使用严格模式。
```

## 6.模块

根据模块来源进行分类：
* 内置模块：nodejs内置的，由nodejs官方提供的模块。例如http,fs模块等。
* 第三方模块：非官方提供的模块，由第三方开发出来的模块。
* 自定义模块：用户自己创建的每一个js文件，都可以称为自定义模块。

```
模块的好处：
1 当一个模块编写完毕，就可以被其他地方引用。我们在编写程序的时候，也经常引用其他模块，包括NodeJs内置的模块和来自第三方的模块。
2 模块中定义的变量,方法，只能在当前模块中使用。相同名字的函数和变量完全可以分别存在不同的模块中。不必考虑名字会与其他模块冲突。
```

<font color="red">每个模块中都内置有require、exports、module可供使用。</font>

### module对象 用来表示当前模块对象

module对象存储了当前模块的一些相关信息。

```js
console.log(module);

//下面是module对象中的属性
Module {
  id: '.',
  path: '',
  exports: {},   //exports就是module的一个属性。
  parent: null,
  filename: '',
  loaded: false,
  children: [],
  paths: [
  ]
}
```

### exports对象 用于导出模块

exports对象用于导出模块（js文件）中的公有方法和属性。注意在同一个模块中module.exports和 exports 不要一起用。

注意
1. module.exports 与 exports 两个写法具有相同功能。因为exports就是module的属性。
2. 当一个模块中有多个module.exports导出对象，新的对象会覆盖旧的对象，以最新的module.exports对象为准。

```js
//编写hello.js文件
var str = 'Hello';
function greet(name) {
    console.log(str + ', ' + name + '!');
}

//module.exports 与 exports 两个写法具有相同功能
exports=str;              //导出一个变量
module.exports = greet;   //导出一个函数
```

### require方法 用于加载模块

require方法用于加载某个模块。加载模块得到的值就是该模块的module.exports对象。

```js
//加载hello模块:
var greet = require('./hello');   
var str = 'Michael';
greet(str); // Hello, Michael!
```

```js
var he1 = require('./hello');
var he2 = require('./hello.js'); //模块名中的.js扩展名可以省略。
var jsonstr = require('./data.json'); //require也可以加载json文件
```


### 4.小结：

1. 每个模块内部，module对象代码当前模块。
2. module对象中的exports属性，是模块对外的接口
3. require方法加载某个模块，就是加载该模块的module.exports属性。

## 7.包

模块的基本单位是单个JS文件，但复杂些的模块往往由多个子模块组成。为了便于管理和使用，可以把由多个子模块组成的大模块称做包，并把所有子模块放在同一个目录里。

世界上最大的包共享平台NPM：[官网https://www.npmjs.com/](https://www.npmjs.com/)

<font color="red">在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象。</font>

例如有以下目录结构(lib目录下有cat目录，该文件里有三个模块):
```
- /home/user/lib/
    - cat/
        head.js
        body.js
        main.js
```

main.js作为入口模块，其内容如下：

```js
var head = require('./head');     //导入head模块
var body = require('./body');     //导入body模块
exports.create = function (name) {    //把main模块的暴露出去
    return {
        name: name,
        head: head.create(),
        body: body.create()
    };
};
```

其他js文件中导入cat模块的入口main.js文件：
```js
require('/home/user/lib/cat/main')
```

## 8.标准工程目录：
一个标准的工程目录都看起来像下边这样:
```
- /home/user/workspace/node-echo/   # 工程目录
    - bin/                          # 存放命令行相关代码
        node-echo
    + doc/                          # 存放文档
    - lib/                          # 存放API相关代码
        echo.js
    - node_modules/                 # 存放三方包
        + argv/
    + tests/                        # 存放测试用例
    package.json                    # 元数据文件
    README.md                       # 说明文件
```

## 9. global全局对象，全局变量，process进程对象：

### global全局对象

在Node.js环境中，也有唯一的全局对象，叫global，这个对象的属性和方法和浏览器环境的window不同。进入Node.js交互环境，可以直接输入：

```
> global.console
Console {
  log: [Function: bound ],
  info: [Function: bound ],
  warn: [Function: bound ],
  error: [Function: bound ],
  dir: [Function: bound ],
  time: [Function: bound ],
  timeEnd: [Function: bound ],
  trace: [Function: bound trace],
  assert: [Function: bound ],
  Console: [Function: Console] }

```

### 全局变量

Node.js 中的全局对象是global，global对象的属性就是全局变量。

在 Node.js可以直接访问到global全局对象的属性，因此无需直接引入全局对象global。 

1. 全局变量 __filename，__dirname

```js
// __filename 表示当前正在执行的脚本的文件绝对路径。
console.log( __filename );
// __dirname 表示当前执行脚本所在的目录。
console.log( __dirname );
```

2. 全局函数setTimeout(cb, ms); 只执行一次的定时器。作用是在指定的毫秒(ms)数后执行指定函数(cb)。

```js
function printHello(){
   console.log( "Hello, World!");
}
// 两秒后执行以上函数
var t = setTimeout(printHello, 2000);  //t代表该定时器本身

// 运行结果：
// `Hello, World!`
```


3. 全局函数：clearTimeout(t);

用于停止setTimeout()函数创建的定时器。 参数 t 是通过 setTimeout() 函数创建的定时器的返回值，代表该定时器本身。

```JS
function printHello(){
   console.log( "Hello, World!");
}
// 两秒后执行以上函数
var t = setTimeout(printHello, 2000);
// 通过定时器的返回值t，来清除定时器t
clearTimeout(t);   
```

4. 全局函数：setInterval(cb, ms); 执行多次的定时器

作用是在指定的毫秒(ms)数后执行指定函数(cb)。返回一个代表定时器的句柄值。
etInterval() 方法会不停地调用函数，直到使用clearInterval()函数来清除或窗口被关闭。

```js
function printHello(){
   console.log( "Hello, World!");
}
// 每隔两秒执行以上函数,会永久执行下去，直到你按下 ctrl + c 按钮。
setInterval(printHello, 2000);
```


6. 全局函数 console  用于提供控制台标准输出.

```js
console.log("xxxxxxx")
console.info("xxxxxxx")
console.error("xxxxxxx")
console.warn("xxxxxxx")
```
![13-png](../blog_img/Node_js_img_13.png)
![14-png](../blog_img/Node_js_img_14.png)




### process进程对象

process也是Node.js提供的一个对象，它代表当前Node.js进程。通过process对象可以拿到许多有用信息：

```
> process === global.process;
true
> process.version;
'v5.2.0'
> process.platform;
'darwin'
> process.arch;
'x64'
> process.cwd();                   //返回当前工作目录
'/Users/michael'
> process.chdir('/private/tmp');   // 切换当前工作目录
undefined
> process.cwd();
'/private/tmp'
```

## 10. Node.js提供的官方模块

### fs模块---文件系统模块

fs模块是 Node.js官方提供的，用来操作文件的模块(读取/写入)。它提供了一些属性和方法，用来满足用户对文件的操作。

> 1.读取文件内容

readFile方法语法格式：
```
fs.readFile(path[,options],callback)

参数path：必选参数，表示文件的路径
参数options：可选参数，表示什么编码格式来去读文件
参数callback：必选参数，文件读取完成后，通过回调函数拿到读取的结果
```

```js
//获取fs模块
var fs = require("fs"); 
// 异步读取
fs.readFile('1.txt','utf8',function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("异步读取: " + data.toString());
});


// readFile方法的同步版本,即同步读取
var data = fs.readFileSync('1.txt');
console.log("同步读取: " + data.toString());
console.log("程序执行完毕。");
```

运行结果：
![1-png](../blog_img/Node_js_img_1.png)


> 2.获取文件属性

```
获取文件信息的语法格式：
fs.stat(path, callback);

path参数: 文件路径。
callback参数：回调函数。带有两个参数如：(err, stats)。
```

```js
var fs = require("fs");      //引入内置模块js
console.log("准备打开文件！");
fs.stat('./1.txt', function (err, stats) {
   if (err) {
       return console.error(err);
   }
   console.log(stats);
   console.log("读取文件信息成功！");
   // 检测文件类型
   console.log("是否为文件(isFile) ? " + stats.isFile());
   console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
});
```

![4-png](../blog_img/Node_js_img_4.png)
![5-png](../blog_img/Node_js_img_5.png)


> 3.写入文件内容

```
写入文件的语法格式([...]表示参数为可选参数)：
fs.writeFile(file, data[,options],callback)

参数file：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径
参数data：必选参数，表示要写入的内容
参数options：可选参数，该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
参数callback：必选参数，文件写入完成后的回调函数
```
![3-png](../blog_img/Node_js_img_3.png)

**writeFile 直接写入文件默认是 w 模式，即如果文件存在，该方法写入的内容会覆盖旧的文件内容。**

例子：
```js
var fs = require("fs");
console.log("准备写入文件");
fs.writeFile('./1.txt', '我是通过fs.writeFile 写入文件的内容',  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------");
   console.log("读取写入的数据！");
   fs.readFile('./1.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
```

运行结果：
![2-png](../blog_img/Node_js_img_2.png)

> 4. 删除文件

```
以下为删除文件的语法格式：
fs.unlink(path, callback);

path - 文件路径。
callback - 回调函数，没有参数。
```

DEMO:
```js
var fs = require("fs");
console.log("准备删除文件！");
fs.unlink('./1.txt', function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("文件删除成功！");
});
```

![6-png](../blog_img/Node_js_img_6.png)

> 5.创建目录

```
以下为创建目录的语法格式：
fs.mkdir(path,[mode], callback)

path - 文件路径。
mode - 设置目录权限，默认为 0777。
callback - 回调函数，没有参数。
```

DEMO：
```js
var fs = require("fs");
console.log("创建目录 ./testA/testB/");
fs.mkdir("./testA/testB/",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("目录创建成功。");
});
```

![7-png](../blog_img/Node_js_img_7.png)


> 6.读取目录信息

```
以下为读取目录的语法格式：
fs.readdir(path, callback);

path - 文件路径。
callback - 回调函数,有两个参数(err, files)，err 为错误信息，files 为 目录下的文件数组列表。
```

DEMO:
```js
var fs = require("fs");
console.log("查看 /test 目录");
fs.readdir("./test/",function(err, files){     
   if (err) {
       return console.error(err);
   }
   files.forEach( function (file){     //循环输出文件信息列表
       console.log(file);
   });
});
```

![8-png](../blog_img/Node_js_img_8.png)

> 7.删除空目录

```
以下为删除空目录的语法格式：
fs.rmdir(path, callback);

path - 文件路径。
callback - 回调函数，没有参数。
```

DEMO:
```js
var fs = require("fs");
// 执行前创建一个空的 ./test 目录
console.log("准备删除空目录 ./test");
fs.rmdir("./test",function(err){      //删除当前目录下的test文件夹
   if (err) {
       return console.error(err);
   }else{
       console.log("删除成功");
   }
});
```

![9-png](../blog_img/Node_js_img_9.png)


### http模块---提供处理web请求的模块

```js
// 1. 导入 http 模块
const http = require('http')
// 2. 创建 web 服务
const server = http.createServer()
// 3. 为web服务实例绑定 request 事件，监听客户端的请求
//只要客户端请求服务端，就会触发on方法
server.on('request', function (req, res) {
  console.log('Someone visit our web server.',req, res)
  const url = req.url
  const method = req.method

  // 设置 Content-Type 响应头，解决中文乱码的问题
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  //res.end() 方法，向客户端响应一些内容,并结束这次请求的处理过程
  res.end("this is a response content")
})
// 4. 启动web服务并监听服务端的8080端口
server.listen(8080, function () {  
  console.log('server running at http://127.0.0.1:8080')
})
```

### util模块---提供常用函数的集合：

> 1.util.inspect 返回对象的字符串形式

```
语法：
util.inspect(object,[showHidden],[depth],[colors]);

object: 即要转换的对象。
showHidden: 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
depth 表示最大递归的层数.
如果color 值为 true，输出格式将会以ANSI 颜色编码，通常用于在终端显示更漂亮的效果。
```

DEMO:
```js
var util = require('util'); 
function Person() { 
    this.name = 'byvoid'; 
    this.toString = function() { 
    return this.name; 
    }; 
} 
var obj = new Person(); 
console.log("输出正常信息："+util.inspect(obj)); 
console.info("=================");
console.log("输出更多信息："+util.inspect(obj, true));   //这里的showHidden参数为true
```

![15-png](../blog_img/Node_js_img_15.png)

> 2.util.isArray(object);

如果参数 "object" 是一个数组返回true，否则返回false。

```js
var util = require('util');
util.isArray([]);
  // true
util.isArray(new Array);
  // true
util.isArray({});
  // false
```


> 3.util.isRegExp(object);

如果参数 "object" 是一个正则表达式返回true，否则返回false。
```js
var util = require('util');
util.isRegExp(/some regexp/);
  // true
util.isRegExp(new RegExp('another regexp'));
  // true
util.isRegExp({});
  // false
```


> 4.util.isDate(object)

如果参数 "object" 是一个日期返回true，否则返回false。
```js
var util = require('util');
util.isDate(new Date());
  // true
util.isDate({})
  // false
```

> 5.util.isError(object);

如果给定的参数 "object" 是一个错误对象返回true，否则返回false。

```js
var util = require('util');
util.isError(new Error())
  // true
util.isError(new TypeError())
  // true
util.isError({ name: 'Error', message: 'an error occurred' })
  // false
```

## 11. Node.js 函数：

Node.js中函数的使用与Javascript类似。

### 1.把函数作为另一个函数的变量:

DEMO:
```js
function say(word) {     //定义一个say函数。
  console.log(word);
}

function execute(someFunction, value) {   
  someFunction(value);
}

execute(say, "Hello");   
```

运行结果：
```
Hello
```

### 2.匿名函数：

DEMO:
```JS
function execute(someFunction, value) {
  someFunction(value);
}

/*
在 execute 接受第一个参数的地方直接定义了我们准备传递给 execute 的函数。
这样的函数参数不用写函数名，称为匿名函数。
*/
execute(function(word){ console.log(word) }, "Hello");
```

