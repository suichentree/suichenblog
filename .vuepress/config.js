module.exports = {
  "port":"9099",
  "title": "suichenTree BLOG",
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
            "link": "https://github.com/SuichenTree",
            "icon": "reco-github"
          },
          {
            "text": "码云",
            "link": "https://gitee.com/suichenTree",
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
      ],
      //面试文档的侧边栏
      "/blogs/Java/": [
        "",
        "Java基础",
        "Java面向对象",
        "Java集合容器",
        "Java异常",
        "Java多线程",
        "Java输入输出流",
        "Java设计模式",
        "JavaWeb"
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
    "logo": "/user.jpg",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "suichenTree",
    "authorAvatar": "/user.jpg",
    "record": "xxxx",
    "startYear": "2017"
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": [
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
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
    ]
  ]
}