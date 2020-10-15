<template>
  <div>
    <el-dialog
      :title="info.isAdd ? ' 添加管理人员' : '编辑管理人员'"
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
        <el-form-item label="所属角色" prop="roleid">
          <el-select v-model="form.roleid" placeholder="请选择上级菜单">
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="username" label="用户名">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="form.username"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="form.password"
            clearable
          ></el-input>
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
  reManagerAdd,
  reManagerDetail,
  reManagerUpdate,
} from "../../../utils/request";
import { warningAlert, succseeAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      form: {
        username: "",
        roleid:"",
        password:"",
        status: 1,
      },
      addRules: {
        roleid: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      //获取菜单list
      roleList: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reManagerListAction: "manage/reListAction",
      reTotalListAction: "manage/reTotalAction",
      reRoleListAction: "role/reListAction",
    }),
    cancel() {
      this.info.showAddDialog = false;
      this.$refs.addFormRef.resetFields();
    },
    // 数据重置
    empty() {
      this.form = {
        username: "",
        roleid:"",
        password:"",
        status: 1,
      };
    },
    // 添加事件
    addFrom() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项！");
        }
        reManagerAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            succseeAlert(res.data.msg);
            //弹框消失
            this.cancel();
            this.empty();
            // 刷新list数据
            this.reManageListAction();

            this.reTotalListAction()
          } else {
            warningAlert(res.data.msg);
          }
        });
      });
    },
    // 获取点击修改的数据
    look(uid) {
      reManagerDetail(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // this.form.password=""
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改
    update() {
      reManagerUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          succseeAlert(res.data.msg);
          //弹框消失
          this.cancel();
          this.empty();
          // 刷新list数据
          this.reManagerListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 弹窗消失，清除form
    close() {
      if (!this.info.isAdd) {
        this.empty();
        this.$refs.addFormRef.resetFields();
      }
    },
  },
  mounted() {
    // 如果菜单列表没有请求数据 就请求数据   请求过就无须请求
    if (this.roleList.length == 0) {
      this.reRoleListAction();
    }
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