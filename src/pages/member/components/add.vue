<template>
  <div>
    <el-dialog
      title="会员修改"
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
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

         <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>

        <el-form-item label="密码" >
          <el-input v-model="form.password"></el-input>
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
        <el-button type="primary" @click="update">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reMemberDetail,reMemberUpdate } from "../../../utils/request";
import { warningAlert, succseeAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    let checkMobile = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入合法的手机号"));
      }
    };
    return {
      
      form: {
        nickname: "",
        phone:"",
        password:"",
        status: 1,
      },
      
      addRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
         nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
        ],
      },
      //  
    };
  },
  computed: {
    ...mapGetters({
      //获取菜单list
      list: "member/list",
      // showAddDialog:"member/showAddDialog"
    }),
  },
  methods: {
    ...mapActions({
      reListAction: "member/reListAction",
      // reShowAddDialogAction:"member/reShowAddDialogAction"

    }),
    cancel() {
      // this.reShowAddDialogAction()
       this.info.showAddDialog  = false
      this.$refs.addFormRef.resetFields();
    },
    // 数据重置
    empty() {
      this.form = {
        nickname: "",
        phone:"",
        password:"",
        status: 1,
      };
      
    },

    // 获取点击修改的数据
    look(uid) {
      // this.reShowAddDialogAction()
      this.info.showAddDialog  = true
      reMemberDetail(uid).then((res) => {
        if (res.data.code == 200) {         
          this.form = res.data.list;
          this.form.password=""
          this.form.uid = uid
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改
    update() {
      reMemberUpdate(this.form).then((res) => {
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
     
        this.empty();
        this.$refs.addFormRef.resetFields();
     
    },
  },
  mounted() {
    // 如果菜单列表没有请求数据 就请求数据   请求过就无须请求
    // if(this.menuList.length == 0){
    //   this.reMenuListAction()
    // }
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