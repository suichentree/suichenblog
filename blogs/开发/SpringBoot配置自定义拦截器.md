---
title: SpringBoot配置自定义拦截器
date: 2023-11-14
sidebar: 'auto'
tags:
 - 开发
tags:
 - 开发
 - SpringBoot
---

[toc]

# SpringBoot配置自定义拦截器

> 1.编写自定义拦截器

```java
/**
 * 自定义拦截器
 */
public class MyInterceptor implements HandlerInterceptor {
    //log
    private static final Logger logger = LoggerFactory.getLogger(MyInterceptor.class);

    /**
     * 拦截器 在控制器执行之前执行 （Controller方法调用之前）
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //拦截代码
        return true;
    }

    /**
     * 拦截器 在控制器执行之后执行 （Controller方法调用之后）
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    /**
     * 最后执行 在请求结束之后、也就是视图被渲染之后进行调用（主要是用于进行资源清理工作）
     * @param request
     * @param response
     * @param handler
     * @param ex
     * @throws Exception
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    }

}
```

> 2.编写拦截器配置类

```java
/**
 * 拦截器配置注册
 */
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    /**
     * @Function: 将自定义拦截器注册到配置中，并附带拦截规则
     * @author: YangXueFeng
     * @Date: 2019/4/14 13:10
     */
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(
                //拦截规则
                new MyInterceptor()).addPathPatterns("/**")
                //排除规则
                .excludePathPatterns("/login","/register","/static");
    }
}
```

> 3.以上就完成了自定义拦截器实现

