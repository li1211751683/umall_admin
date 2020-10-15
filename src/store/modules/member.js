import {reMemberList} from "../../utils/request"
const state ={
  list:[],
  showAddDialog:false
}
const mutations = {
  changeList(state,arr){
    state.list = arr
  },

  changeShowAddDialog(state){
    state.showAddDialog = !state.showAddDialog
  },
}
const actions = {
  reListAction(context){
    reMemberList().then(res=>{
      let list = res.data.list?res.data.list:[]
      context.commit("changeList",list)
    })
  },

  reShowAddDialogAction(context){    
    context.commit("changeShowAddDialog")
  
  }
}

const getters = {
  list(state) {
    return state.list
  },
  showAddDialog(state) {
    return state.showAddDialog
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}