<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{children:'children'}"
    >
      <el-table-column type="index" width="80px"></el-table-column>

      <el-table-column prop="id" label="规格编号" width="150px">
      </el-table-column>

      <el-table-column prop="specsname" label="规格名称" width="150px">
      </el-table-column>

      <el-table-column label="规格属性">
        <template slot-scope="scope" >
          <el-tag v-for="item in scope.row.attrs" :key="item" >{{item}}</el-tag>
        </template>
      </el-table-column>

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
          <el-button type="primary" size="mini" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <del-btn @confirm="dele(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页部分 -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" @current-change="changePage">
    </el-pagination>
    <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[15, 20,25,30]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total=list.length
      >
      </el-pagination> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { warningAlert, succseeAlert } from "../../../utils/alert";
import { reSpecsDetail, reSpecsDel } from "../../../utils/request";
export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      size: "specs/size",
      total:"specs/total",

    }),
  },
  methods: {
    ...mapActions({
      reListAction: "specs/reListAction",
      reTotalAction: "specs/reTotalAction",
      changePageAction: "specs/changePageAction",
    }),
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    dele(id) {
      reSpecsDel(id).then((res) => {
        if (res.data.code == 200) {
          succseeAlert(res.data.msg);
          this.reListAction();

          this.reTotalAction()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // handleSizeChange(newsize) {
    //   this.pagesize = newsize;
    //   this.reListAction();
    // },
    // handleCurrentChange(newpage) {
    //   this.pagenum = newpage;
    //   this.reListAction();
    // },
    changePage(e){
      this.changePageAction(e)
    }
  },
  mounted() {
    // 获取list
    this.reListAction();
    // 获取总数
    this.reTotalAction()
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