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
      <el-table-column prop="id" label="编号" width="150px">
      </el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="150px">
      </el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt="" v-if="scope.row.img !='null'">
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
  
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { warningAlert, succseeAlert } from "../../../utils/alert";
import { reBannerDetail, reBannerDel } from "../../../utils/request";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      reListAction: "banner/reListAction",
    }),
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    dele(id) {
      reBannerDel(id).then((res) => {
        if (res.data.code == 200) {
          succseeAlert(res.data.msg);
          this.reListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // 获取list
    this.reListAction();
  },
};
</script>
<style scoped>
.el-table .cell {
  text-align: center;
}
.el-table th > .cell {
  font-weight: bold;
}
.el-dialog__header {
  text-align: center;
}
img {
  width: 100px;
  height: 100px;
}
.el-table__row {
  height: 130px!important;
}
</style>