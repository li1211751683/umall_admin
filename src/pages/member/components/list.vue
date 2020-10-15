<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column type="index" width="80px"></el-table-column>
      <el-table-column prop="id" label="用户编号" width="150px"> </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="250px"> </el-table-column>
      <el-table-column prop="phone" label="手机号" width="250px"> </el-table-column>

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
          <el-button type="primary" size="mini" @click="edit(scope.row.uid)">编辑</el-button>
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
import { reMemberDetail, reMemberDel } from "../../../utils/request";
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
      list: "member/list",
      //  showAddDialog:"member/showAddDialog"
    }),
  },
  methods: {
    ...mapActions({
      reListAction: "member/reListAction",
    }),
    //编辑
    edit(uid) {
      this.$emit("edit", uid);
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