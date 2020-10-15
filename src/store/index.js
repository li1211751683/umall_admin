import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import {state,getters,mutations} from "./mutitions"
import menu from "./modules/menu"
import role from "./modules/role"
import manage from "./modules/manage.js"
import cate from "./modules/cate"
import specs from "./modules/specs"
import member from "./modules/member"
import banner from "./modules/banner"
import seck from "./modules/seck"
import goods from "./modules/goods"

import {actions} from "./actions"

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules:{
    menu,
    role,
    manage,
    cate,
    specs,
    member,
    banner,
    seck,
    goods
  }
})