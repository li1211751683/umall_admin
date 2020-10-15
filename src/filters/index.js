import Vue from "vue"
import filterPrice from "./filterPrice"
import filterTime from "./filterTime"


// Vue.filter("filterPrice",filterPrice)
// Vue.filter("filterTime",filterTime)

let obj={
    filterPrice,
    filterTime
}
for(let i in obj){
    Vue.filter(i,obj[i])
}