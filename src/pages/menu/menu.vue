<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button type="primary" @click="showAdd">添加</el-button>
      </el-col>
    </el-row>
    <!-- 列表区 -->
    <v-list @editList="editList"></v-list>
    <!-- 添加弹出框 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import vList from "./components/list";
import vAdd from "./components/add";

export default {
  // 组件注册
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info:{
        showAddDialog:false,
        isAdd:true
      }

    };
  },
  methods: {
    showAdd(){
      this.info.showAddDialog = true;
      this.info.isAdd = true

    },
    editList(id){
      this.info.showAddDialog = true
      this.info.isAdd = false
      // 获取详情一条信息
       this.$refs.add.look(id)
    }
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