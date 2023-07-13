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
          },
          {
            //Java文档
            "text": "Java",
            "icon":"reco-other",
            "link": "/blogs/Java/"
          }
        ]
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
        "Java面试题基础1",
        "Java面试题基础2",
        "Java面试题集合1",
        "Java面试题设计模式1",
        "Java面试题线程1",
        "Java面试题File和IO流1",
        "Java面试题JavaWeb1",
        "Java面试题jdbc和反射1",
        "Linux面试题1",
        "Mybatis面试题1",
        "Redis面试题1",
        "Spring面试题1",
        "SpringBoot面试题1",
        "SpringCloud面试题1"
      ]
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
        "态度是心的面具。 ——《蛊真人》",
        "我们既然意识到自己的渺小，那就更应该变得强大。我们本来就是渺小的，只是从无知变得有知。你感到痛苦，是因为你在成长。 ——《蛊真人》", 
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