<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      
      :tree-props="{ children: 'children' }"
    >
      <el-table-column type="index" width="80px"></el-table-column>
      <el-table-column prop="id" label="菜单编号" width="150px">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="150px">
      </el-table-column>
      <el-table-column label="菜单图标" width="150px">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="地址" width="150px"> </el-table-column>
      <el-table-column label="状态" sortable >
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary"
            size="mini" plain>启用</el-button
          >
          <el-button v-else type="danger" size="mini" plain>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editList(scope.row.id)" size="mini">编辑</el-button>
          <el-button type="danger" @click="delList(scope.row.id)" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页部分 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[15, 20,25,30]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total=list.length
      >
      </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { warningAlert, succseeAlert } from "../../../utils/alert";
import { reMenuDel } from "../../../utils/request";
export default {
  data() {
    return {
      pagesize:15,
      total:0,
      pagenum: 1,
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",         
    }),
  },
  methods: {
    ...mapActions({
      reListAction: "menu/reListAction",
    }),
    //编辑
    editList(id){
      this.$emit("editList",id)
    },
    // 删除
    delList(id) {
      this.$confirm("你确定要删除吗?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reMenuDel(id).then(res=>{
            if(res.data.code == 200){
              succseeAlert(res.data.msg)
              this.reListAction();
            }else {
              warningAlert(res.data.msg)
            }
          })
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(newsize) {
      this.pagesize = newsize;
      this.reListAction();
    },
    handleCurrentChange(newpage) {
      this.pagenum = newpage;
      this.reListAction();
    },
  },
  mounted() {
    this.reListAction();
    
    // console.log($store.state.list.length);
    
  },
};
</script>
<style>
.el-table .cell {
  text-align: center;
}
.el-table th>.cell {
  font-weight: bold;
}
.el-dialog__header {
  text-align: center;
}
</style>