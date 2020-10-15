export const state = {
  //用户信息
  userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}
export const mutations={
  changeUserInfo(state,info){
    state.userInfo = info
    sessionStorage.setItem("userInfo",JSON.stringify(info))
  }
}
export const getters = {
  userInfo(state){
    return state.userInfo
  }
}