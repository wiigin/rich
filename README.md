# h5_godleopard

## Project setup
```
npm install
```

### 启动项目并打开浏览器
```
npm run dev
```

### 打包项目，打包后将使用产线接口
```
npm run build
```

### api文件夹内
```
index.js文件主要封装几个常用的方法，get、post、put、delete

install.js文件可以把所有的api接口安装到全局，之后在main.js文件中导入就可以了。

main.js中添加：
import api from './api/install'
Vue.use(api)

apiList.js把所有的api文件夹导入到这一个文件中来。

baseUrl.js中配置各个环境所需用到的域名
```

### 包含的组件
```
element-ui

swiper4 轮播插件

vue-scroller上拉加载，下拉刷新

lib-flexible屏幕适应性

px2rem-loader单位px转rem

less样式

axios接口，已封装

vue-router路由
```

