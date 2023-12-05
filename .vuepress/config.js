module.exports = {
  "port":"10~099",
  "title": "suichentree's blog",
  "description": "(;-_-)ᴇᴍᴍᴍ",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    [
      'script',{},`
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?58657c617e14a7184e841a80d36a78ce";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    //关闭404腾讯公益
    "noFoundPageByTencent": false,
    //头部导航栏
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间线",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "文档",
        "icon": "reco-message",
        "items": [
          {
            "text": "vuepress-reco",
            "link": "/docs/theme-reco/"
          },
          {
            //简历文档
            "text": "简历",
            "icon": "reco-account",
            "link": "/blogs/简历/"
          },
          {
            //面试文档
            "text": "面试",
            "icon":"reco-other",
            "link": "/blogs/面试/"
          }
        ]
      },
      //留言板配置
      {
        "text": "留言板",
        "link": "/blogs/留言板/messageBoard.html",
        "icon": "reco-suggestion",
      },
      {
        "text": "联系",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/suichentree",
            "icon": "reco-github"
          },
          {
            "text": "码云",
            "link": "https://gitee.com/suichentree",
            "icon": "reco-mayun"
          },
          {
            "text": "CSDN",
            "link": "https://blog.csdn.net/sui_chen_tree",
            "icon": "reco-csdn"
          },
          {
            "text": "邮件",
            "link": "mailto:18271801652@163.com",
            "icon": "reco-mail"
          }
        ]
      }
    ],
    //文档的侧边栏
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ],
      //面试文档的侧边栏
      "/blogs/面试/": [
        "",
        "Java面试题总结-基础1",
        "Java面试题总结-集合1",
        "Java面试题总结-事务1",
        "Java面试题总结-线程1",
        "Java面试题总结-锁1",
        "MySql面试题总结1",
        "MySql面试题总结2",
        "Mybatis面试题总结",
        "Redis面试题总结1",
        "Spring面试题总结1",
        "SpringBoot面试题总结",
        "SpringMVC面试题总结",
        "SpringCloud面试题总结"
      ]
    },
    //评论配置
    "vssueConfig": {
      "platform": 'github',
      "owner": 'suichentree',
      "repo": 'suichentree.github.io',
      "clientId": 'cff5f03ebccc27f18362',
      "clientSecret": '5671ddca8e4eb07d91587f94bb16ac3421305a81',
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/user2.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "suichentree",
    "authorAvatar": "/user2.png",
    "record": "xxxx",
    "startYear": "2017"
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": [
    //看板娘插件
    ["@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        "theme": ["wanko"],
        "clean": false,
        "messages": {
          "welcome": '随便看看把',
          "home": '回到主页',
          "theme": '好吧，希望你能喜欢我的其他小伙伴。',
          "close": '再见哦'
        }
      }
    ],
    //副标题-打字机效果的插件
    ['typed',{
      // 首页副标题对应的标签选择器
      selector: '.home-blog .hero .description',
      // 打字内容
      strings: [
        "在寻找成功的过程中，人往往会变得面目全非，而人最大的失败，就是失去自我。 ——《蛊真人》",
        "种一棵树最好的时间是十年前,其次是现在。",
        "海里的咸鱼 (;-_-)ᴇᴍᴍᴍ ——suichentree",
        "路漫漫其修远兮，吾将上下而求索 ——屈原"
      ],
      typeSpeed: 150, // 打字速度
      backSpeed: 100, // 回退速度
      showCursor: true, //是否显示光标
      startDelay: 1000,    //延迟开始打字
      backDelay: 2000,  //延迟多少时间开始回退
      }
    ]
  ]
  
}