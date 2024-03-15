# 二手市场前端代码 UNI-APP

## 如何运行
* git clone https://github.com/hc-tec/black-market-frontend.git
* uni-app需要使用专用的编辑器 [Hbuilder X](https://www.dcloud.io/hbuilderx.html) 进行开发，首先需要进官网安装这个软件
* 提前注册一个 dcloud 账号
* 运行 Hbuilder X，打开 black-market-frontend 项目，接着在标签页中选择运行->运行到浏览器->chrome(edge)，选择完成后，项目会开始编译。
* 编译结束之后，会自动打开一个页面
* 后续，编写代码，保存后会自动热更新

# 参考
## 项目关键结构

common 放置一些配置文件、API文件、封装的HTTP请求和其他通用的文件。
components 组件目录。uni-app中不用手动导入注册组件，此目录下的文件会自动注册为全局可见的组件。
pages 页面组件。管理一个完整的大页面。同vue中的 views 目录。
static 放置一些静态资源。
App.vue 主要配置全局数据





