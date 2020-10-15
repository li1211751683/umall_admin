<template>
  <div>
    <el-dialog
      :title="info.isAdd ? ' 添加活动' : '修改活动'"
      :visible.sync="info.showAddDialog"
      width="50%"
      @closed="close"
    >
      <el-form
        ref="addFormRef"
        :model="form"
        label-width="80px"
        :rules="addRules"
      >
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="活动日期" prop="time">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" prop="first_cateid">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" prop="second_cateid">
          <el-select v-model="form.second_cateid" @change="GetGoodsList">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" prop="goodsid">
          <el-select v-model="form.goodsid">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option
              v-for="item in goodCateList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addFrom" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  reSeckAdd,
  reSeckDetail,
  reSeckUpdate,
  reCateList,
  reGoodsList,
} from "../../../utils/request";
import { warningAlert, succseeAlert } from "../../../utils/alert";
import { getters } from "../../../store/mutitions";

export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "",
        begintime:"",
        endtime: "",
        first_cateid:"",
        second_cateid: "",
        goodsid: "",
        statue: 1,
      },
      secondCateList: [],
      goodCateList: [],
      goodsname: "",
      time: [],
      addRules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        time: [
          { required: true, message: "请选择时间", trigger: "blur" },
        ],
        goodsid: [
          { required: true, message: "请选择商品", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reCateList: "cate/reListAction",
      reListAction: "seck/reListAction",
    }),
    changeFirst() {
      this.form.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reCateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
        console.log(this.secondCateList);
      });
    },
    GetGoodsList() {
      reGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.goodCateList = res.data.list;
      });
    },

    cancel() {
      this.info.showAddDialog = false;
      this.$refs.addFormRef.resetFields();
    },
    // 数据重置
    empty() {
      this.form = {
        title: "",
        begintime:"",
        endtime: "",
        first_cateid:"",
        second_cateid: "",
        goodsid: "",
        statue: 1,
      },
      this.secondCateList=[],
      this.goodCateList= [],
      this.goodsname="",
      this.time=[]
    },
    // 添加事件
    addFrom() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项！");
        }
        this.form.begintime = Date.parse(this.time[0])
        this.form.endtime = Date.parse(this.time[1])
        reSeckAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            succseeAlert(res.data.msg);
            //弹框消失
            this.cancel();
            this.empty();
            
            // 刷新list数据
            this.reListAction();
          } else {
            warningAlert(res.data.msg);

          }
        });
      });
    },
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 获取点击修改的数据
    look(id) {
      reSeckDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          // 获取二级分类list
          this.getSecondList()
          // 获取商品list
          this.GetGoodsList()
          // 获取设置 时间
          this.time=[new Date(res.data.list.begintime*1),new Date(res.data.list.endtime*1)]
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改
    update() {
      this.form.begintime = Date.parse(this.time[0])
      this.form.endtime = Date.parse(this.time[1])
      reSeckUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          succseeAlert(res.data.msg);
          //弹框消失
          this.cancel();
          this.empty();
          // 刷新list数据
          this.reListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 弹窗消失，清除form
    close() {
      this.$refs.addFormRef.resetFields();
      if (!this.info.isAdd) {
        this.empty();
      }
    },
  },
  mounted() {
    this.reCateList();
  },
};
</script>
<style >
.el-main {
  /* text-align:none!important */
  text-align: left !important;
}
.el-dialog__body {
  padding: 30px 30px !important;
}
.el-dialog__footer {
  padding: 10px 30px 30px;
}
.el-dialog__header {
  padding: 30px 30px 10px;
}
.el-dialog__title {
  font-size: 24px;
  line-height: 24px;
}
</style>