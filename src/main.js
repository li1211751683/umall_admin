// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// 1.公共样式  字体
import "../src/assets/css/base.css"
import "../src/assets/fonts/iconfont.css"

// 2.公共组件
import "./components"

//3.路由组件格式

//4.utils 

//5.过滤器
import "../src/filters/index"

//6.vuex
 import store from "./store"

//7.elment-ui
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import { Message } from 'element-ui';
Vue.prototype.$message=Message
import { MessageBox } from 'element-ui'
Vue.prototype.$confirm = MessageBox
Vue.use(ElementUI)

import TreeTable from "vue-table-with-tree-grid"
Vue.component("tree-table",TreeTable)

import NProgress from "nprogress"
import "nprogress/nprogress.css"


import axios from "axios"
Vue.prototype.axios=axios

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
//8.utils/alter.js










/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
