<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column type="index" width="80px"></el-table-column>
      <el-table-column prop="id" label="角色编号" width="150px"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="250px"> </el-table-column>
      <el-table-column label="状态" sortable>
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 1"
            type="primary"
            size="mini"
            plain
            >启用</el-button
          >
          <el-button v-else type="danger" size="mini" plain>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)" ></del-btn>
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
import { reRoleDetail, reRoleDel } from "../../../utils/request";
export default {
  data() {
    return {
      pagesize: 15,
      total: 0,
      pagenum: 1,
    };
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reListAction: "role/reListAction",
    }),
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    del(id) {
      reRoleDel(id).then((res) => {
        if (res.data.code == 200) {
          succseeAlert(res.data.msg);
          this.reListAction();
        } else {
          warningAlert(res.data.msg);
        }
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
  },
};
</script>
<style>
.el-table .cell {
  text-align: center;
}
.el-table th > .cell {
  font-weight: bold;
}
.el-dialog__header {
  text-align: center;
}
</style>