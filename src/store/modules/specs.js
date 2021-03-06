import {reSpecsList,reSpecsCount} from "../../utils/request"
const state ={
  list:[],
  // 每页数量
  size:5,
  page:1,
  total:0
 
}
const mutations = {
  changeList(state,arr){
    state.list = arr
  },
  changeTotal(state,num){
    state.total = num
  },
  changePage(state,page){
    state.page = page
  },
}

const actions = {
  reListAction(context,bool){
    let params = bool?{}:{page:context.state.page,size:context.state.size}
    reSpecsList(params).then(res=>{
      let list = res.data.list?res.data.list:[]

      if(context.state.page>1 & list.length ==0){
        context.commit("changePage",context.state.page-1)
        context.dispatch("reListAction")
      }

      list.forEach(item=>{
        item.attrs = JSON.parse(item.attrs)
      })
      context.commit("changeList",list)
    })
  },
  // 获取总数
  reTotalAction(context){
    reSpecsCount().then(res=>{
      context.commit("changeTotal",res.data.list[0].total)
    })
  },
  // 组件修改页码
  changePageAction(context,page){
    context.commit("changePage",page)
    // 发起list请求
    context.dispatch("reListAction")
  }
}

const getters = {
  list(state) {
    return state.list
  },
  size(state) {
    return state.size
  }, 
  total(state) {
    return state.total
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}