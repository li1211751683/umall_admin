import axiso from "axios"
import qs from "qs"
// 引入仓库 
import store from "../store"
import { warningAlert} from "../utils/alert";
import router from "../router"

let baseUrl = "/api"

import Vue from "vue"
Vue.prototype.$imgPre = "http://localhost:3000"
// 请求拦截
axiso.interceptors.request.use(req=>{
  console.log("-------请求拦截------");
  console.log(req);
  if(req.url!=baseUrl +"/api/userlogin"){
    req.headers.authorization = store.state.userInfo.token
  }
    return req
  
})

// 响应拦截
axiso.interceptors.response.use(res => {
  console.group("========本次请求路径：" + res.config.url);
  console.log(res);
  console.groupEnd();

  // 用户掉线
  if(res.data.msg =="登录已过期或访问权限受限"){
    warningAlert(res.data.msg)
    router.push("/login")
  }

  return res
})

//菜单添加
export const reMenuAdd = (params) => {
  return axiso({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(params)
  })
}

//获取菜单列表
export const reMenuList = () => {
  return axiso({
    url: baseUrl + "/api/menulist",
    method: 'get',
    params: {
      istree: true
    }
  })
}


// 菜单获取一条
export const reMuneDetail = (id) => {
  return axiso({
    url: baseUrl + "/api/menuinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

//菜单修改
export const reMenuUpdate = (params) => {
  return axiso({
    url: baseUrl + "/api/menuedit",
    method: "post",
    data: qs.stringify(params)
  })
}

//菜单删除
export const reMenuDel = (id) => {
  return axiso({
    url: baseUrl + "/api/menudelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}
// *****************************************************
// 角色添加
export const reRoleAdd = (params) => {
  return axiso({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: qs.stringify(params)
  })
}
//角色列表获取
export const reRoleList = () => {
  return axiso({
    url: baseUrl + "/api/rolelist",
    method: 'get'
  })
}
//角色获取一条
export const reRoleDetail = (id) => {
  return axiso({
    url: baseUrl + "/api/roleinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
//角色修改
export const reRoleUpdate = (params) => {
  return axiso({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: qs.stringify(params)
  })
}
//角色删除
export const reRoleDel = (id) => {
  return axiso({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}
// *****************************************************
// 管理员添加
export const reManagerAdd = (params) => {
  return axiso({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(params)
  })
}
//管理员列表获取
export const reManagerList = (params) => {
  return axiso({
    url: baseUrl + "/api/userlist",
    method: 'get',
    params: params

  })
}
//管理员获取一条
export const reManagerDetail = (uid) => {
  return axiso({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params: {
      uid: uid
    }
  })
}
//管理员修改
export const reManagerUpdate = (params) => {
  return axiso({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(params)
  })
}
//管理员删除
export const reManagerDel = (uid) => {
  return axiso({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify({
      uid: uid
    })
  })
}
//管理员总数
export const reManagerCount = () => {
  return axiso({
    url: baseUrl + "/api/usercount",
    method: "get",
  })
}
//管理员登录
export const reManagerLogin = (params) => {
  return axiso({
    url: baseUrl + "/api/userlogin",
    method: "post",
    data: qs.stringify(params)
  })
}
// **********************************************
// 商品分类添加

export const reCateAdd = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }
  return axiso({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: data
  })
}
//商品列表获取
export const reCateList = (params) => {
  return axiso({
    url: baseUrl + "/api/catelist",
    method: 'get',
    params:params
  })
}
//商品分类获取一条
export const reCateDetail = (id) => {
  return axiso({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
//商品分类修改
export const reCateUpdate = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }

  return axiso({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: data
  })
}
//管理员删除
export const reCateDel = (id) => {
  return axiso({
    url: baseUrl + "/api/catedelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}

// **********************************************
// 商品规格添加
export const reSpecsAdd = (params) => {
  return axiso({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: qs.stringify(params)
  })
}
//商品规格列表获取
export const reSpecsList = (params) => {
  return axiso({
    url: baseUrl + "/api/specslist",
    method: 'get',
    params: params
  })
}
//商品规格获取一条
export const reSpecsDetail = (id) => {
  return axiso({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
//商品规格修改
export const reSpecsUpdate = (params) => {
  return axiso({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: qs.stringify(params)
  })
}
//商品规格删除
export const reSpecsDel = (id) => {
  return axiso({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}
//商品规格总数
export const reSpecsCount = () => {
  return axiso({
    url: baseUrl + "/api/specscount",
    method: "get",
  })
}

// **********************************************
// 商品添加
export const reGoodsAdd = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }
  return axiso({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: data
  })
}
//商品列表获取
export const reGoodsList = (params) => {
  return axiso({
    url: baseUrl + "/api/goodslist",
    method: 'get',
    params: params
  })
}
//商品获取一条
export const reGoodsDetail = (params) => {
  return axiso({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params:params
  })
}
//商品修改
export const reGoodsUpdate = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }

  return axiso({
    url: baseUrl + "/api/goodsedit",
    method: "post",
    data: data
  })
}
//商品删除
export const reGoodsDel = (params) => {
  return axiso({
    url: baseUrl + "/api/goodsdelete",
    method: "post",
    data: qs.stringify(params)
  })
}
//商品总数
export const reGoodsCount = () => {
  return axiso({
    url: baseUrl + "/api/goodscount",
    method: "get",
  })
}
// **********************************************
//会员列表获取
export const reMemberList = () => {
  return axiso({
    url: baseUrl + "/api/memberlist",
    method: 'get'
  })
}
//会员获取一条
export const reMemberDetail = (uid) => {
  return axiso({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params: {
      uid: uid
    }
  })
}
//会员修改
export const reMemberUpdate = (params) => {
  return axiso({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: qs.stringify(params)
  })
}



// **********************************************
// 限时秒杀添加
export const reSeckAdd = (params) => {
  return axiso({
    url: baseUrl + "/api/seckadd",
    method: "post",
    data: qs.stringify(params)
  })
}
//限时秒杀列表获取
export const reSeckList = () => {
  return axiso({
    url: baseUrl + "/api/secklist",
    method: 'get',

  })
}
//限时秒杀获取一条
export const reSeckDetail = (id) => {
  return axiso({
    url: baseUrl + "/api/seckinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
//限时秒杀修改
export const reSeckUpdate = (params) => {
  return axiso({
    url: baseUrl + "/api/seckedit",
    method: "post",
    data: qs.stringify(params)
  })
}
//限时秒杀删除
export const reSeckDel = (id) => {
  return axiso({
    url: baseUrl + "/api/seckdelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}

// **********************************************
// 轮播图添加
export const reBannerAdd = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }
  return axiso({
    url: baseUrl + "/api/banneradd",
    method: "post",
    data: data
  })
}
//商品列表获取
export const reBannerList = () => {
  return axiso({
    url: baseUrl + "/api/bannerlist",
    method: 'get',
  })
}
//商品分类获取一条
export const reBannerDetail = (id) => {
  return axiso({
    url: baseUrl + "/api/bannerinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
//商品分类修改
export const reBannerUpdate = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }

  return axiso({
    url: baseUrl + "/api/banneredit",
    method: "post",
    data: data
  })
}
//管理员删除
export const reBannerDel = (id) => {
  return axiso({
    url: baseUrl + "/api/bannerdelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}