<template>
  <div>
    <el-dialog
      :title="info.isAdd ? ' 添加商品规格' : '编辑商品规格'"
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
        <el-form-item prop="specsname" label="规格名称">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="form.specsname"
            clearable
          ></el-input>
        </el-form-item>
        <!-- ------->
        <el-form-item label="规格属性" v-for="(item,index) in attrArr" :key="index" >
          <div class="con" >
            <div class="input-wrap">
              <el-input v-model="item.value"></el-input>
            </div>
            <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" v-else @click="del(index)">删除</el-button>
          </div>
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
  reSpecsAdd,
  reSpecsDetail,
  reSpecsUpdate,
} from "../../../utils/request";
import { warningAlert, succseeAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      attrArr:[{value:""},{value:""}],
      form: {
        specsname: "",
        attrs:"",
        status: 1,
      },
      addRules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
        ],
        attrs: [
          { required: true, message: "请输入规格属性", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
      reSpecsListAction: "specs/reListAction",
      reTotalListAction: "specs/reTotalAction",
    }),
    cancel() {
      this.info.showAddDialog = false;
      this.$refs.addFormRef.resetFields();
    },
    // 新增规格属性
    addAttr(){
      this.attrArr.push({value:""})
    },
    // 删除规格属性
    del(index){
      this.attrArr.splice(index,1)
    },
    // 数据重置
    empty() {
      this.attrArr=[{value:""},{value:""}],
      this.form = {
        specsname: "",
        attrs:"",
        status: 1,
      };
    },
    // 添加事件
    addFrom() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项！");
        }
        if(this.attrArr.some(item=>item.value=="")){
          warningAlert("所有属性值必填")
          return
        }
        this.form.attrs = JSON.stringify(this.attrArr.map((item)=>item.value))
        console.log(this.form);
        
        reSpecsAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            succseeAlert(res.data.msg);
            //弹框消失
            this.cancel();
            this.empty();
            // 刷新list数据
            this.reSpecsListAction();

            this.reTotalListAction()
          } else {
            warningAlert(res.data.msg);
          }
        });
      });
    },
    // 获取点击修改的数据
    look(id) {
      reSpecsDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          this.attrArr = JSON.parse(this.form.attrs).map((item)=>({
            value:item
          }))
          // this.form.password=""
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改
    update() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item)=>item.value))
      reSpecsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          succseeAlert(res.data.msg);
          //弹框消失
          this.cancel();
          this.empty();
          // 刷新list数据
          this.reSpecsListAction();
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
   
  },
};
</script>
<style scoped>
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
.con {
  display: flex;

}
.input-wrap {
  flex: 1;
}
</style>