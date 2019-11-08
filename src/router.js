//router.js

import Vue from 'vue'
import Router from 'vue-router'  //这里引用了vue-router 并且用Vue.use来使用Router
import HelloWorld from './components/HelloWorld.vue'
// import HelloWorld from  './components/notFound.vue'

Vue.use(Router)

// Router的内置属性
export default new Router({
  mode: 'history',  //要使用hash模式还是 history模式 我们一般情况下还是用 hash模式 history在后台支持的情况下可以开启
  base: process.env.BASE_URL,  // 应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"
  routes: [              //这就是真正写路由的地方了 
    {
      path: '/',        //  当路由是/的时候 我们匹配哪个组件(这里是Home.vue)
      name: 'HelloWorld',
      redirect:'/helloWorld'
      // component: HelloWorld
    },
    {
      path: '/helloWorld', 
      name: 'HelloWorld',
      component:HelloWorld  //路游懒加载，推荐使用这种模式，不过我们需要改写一下
    },
    // {
    //   path: '*',
    //   name: '404',
    //   component: NotFound,
    // }
  ]
})
