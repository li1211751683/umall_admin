import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

Vue.use(Router)

const login =() =>Promise.resolve(import('../pages/login/login.vue'))
const index =() =>Promise.resolve(import('../pages/index/index.vue'))
// 路由独享守卫   判断 登录人员是否有携带 访问此路由的路径
function checkedEnter(path,next) {
  let menus_url = store.state.userInfo.menus_url;
  if(menus_url.includes(path)){
    next()
  }else {
    next("/")
  }
}

export let indexRouters = [
  {
    path: "banner",
    component: () =>Promise.resolve(import('../pages/banner/banner.vue')),
    name:"轮播图管理",
    beforeEnter (to, from, next) {
      checkedEnter("/banner",next)
    }
  },
  {
    path: "cate",
    component: () =>Promise.resolve(import('../pages/cate/cate.vue')),
    name:"商品分类",
    beforeEnter (to, from, next) {
      checkedEnter("/cate",next)
    }
  },
  {
    path: "goods",
    component: () =>Promise.resolve(import('../pages/goods/goods.vue')),
    name:"商品管理",
    beforeEnter (to, from, next) {
      checkedEnter("/goods",next)
    }
  },
  {
    path: "manage",
    component: () =>Promise.resolve(import('../pages/manage/manege.vue')),
    name:"管理员管理",
    beforeEnter (to, from, next) {
      checkedEnter("/manage",next)
    }
  },
  {
    path: "member",
    component: () =>Promise.resolve(import('../pages/member/member.vue')),
    name:"会员管理",
    beforeEnter (to, from, next) {
      checkedEnter("/member",next)
    }
  },
  {
    path: "menu",
    component: () =>Promise.resolve(import('../pages/menu/menu.vue')),
    name:"菜单管理",
    beforeEnter (to, from, next) {
      checkedEnter("/menu",next)
    }
  },
  {
    path: "role",
    component: () =>Promise.resolve(import('../pages/role/role.vue')),
    name:"角色管理",
    beforeEnter (to, from, next) {
      checkedEnter("/role",next)
    }
  },
  {
    path: "seckill",
    component:() =>Promise.resolve(import('../pages/seckill/seckill.vue')),
    name:"秒杀管理",
    beforeEnter (to, from, next) {
      checkedEnter("/seckill",next)
    }
  },
  {
    path: "spec",
    component:() =>Promise.resolve(import('../pages/specs/specs.vue')),
    name:"商品规格",
    beforeEnter (to, from, next) {
      checkedEnter("/spec",next)
    }
  },
]

let router = new Router({
  routes: [
    {
      path: "/login",
      component: login,
    },
  
    {
      path: "/",
      component: index,
      children:[
        {
          path: "",
          component: () =>Promise.resolve(import('../pages/home/home.vue')),
        },
        ...indexRouters

      ]
    },
    
  ]
})




// 全局守卫   
router.beforeEach((to,from,next)=>{
  //如果直接访问登录页  则正常执行  
  if(to.path==="/login") return next()
  
  //否则 验证是否登录成功过    验证token  有token正常执行 
  if(store.state.userInfo.token)  return next()
  //没有 token 跳转登录页
   next("/login")
})

export default router
