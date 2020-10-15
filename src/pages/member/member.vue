<template>
  <div>
    <!-- 列表区 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加弹出框 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
import {mapGetters,mapActions} from "vuex"
export default {
  components:{
    vAdd,
    vList
  },
  data() {
    return {
      info:{
        showAddDialog:false,
        isAdd:true
      }
    }
  },
  methods: {
    // 编辑
    edit(uid){
      this.showAddDialog  = true
      this.$refs.add.look(uid)
    }
  },
  mounted() {
    
  },
};
</script>
<style scoped>
.el-button {
  /* float: left; */
  margin-bottom: 15px;
}
.el-dialog__body {
  padding: 30px 30px!important;
}
</style>