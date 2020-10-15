<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{children:'children'}"
    >
      <el-table-column type="index" width="50px"></el-table-column>
      <el-table-column prop="id" label="商品编号">
      </el-table-column>
       <el-table-column prop="goodsname" label="商品名称" >
      </el-table-column>
      <el-table-column prop="price" label="商品价格" >
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" >
      </el-table-column>

      <el-table-column label="图片" width="150px">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt="" v-if="scope.row.img !='null'">
        </template>
      </el-table-column>

      <el-table-column label="是否新品" sortable>
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isnew == 1"
            type="primary"
            size="mini"
            plain
            >是</el-button
          >
          <el-button v-else type="danger" size="mini" plain>否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="是否热卖" sortable>
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.ishot == 1"
            type="primary"
            size="mini"
            plain
            >是</el-button
          >
          <el-button v-else type="danger" size="mini" plain>否</el-button>
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


      <el-table-column label="操作"  width="150px">
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
     
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { warningAlert, succseeAlert } from "../../../utils/alert";
import { reGoodsDel } from "../../../utils/request";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      list: "goods/list",
      size: "goods/size",
      total:"goods/total",
    }),
  },
  methods: {
    ...mapActions({
      reListAction: "goods/reListAction",
      reTotalAction: "goods/reTotalAction",
      changePageAction: "goods/changePageAction",
    }),
     changePage(e){
      this.changePageAction(e)
    },
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    dele(id) {
      reGoodsDel({id:id}).then((res) => {
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
    this.reTotalAction()
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