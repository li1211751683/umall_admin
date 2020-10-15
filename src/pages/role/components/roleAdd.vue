<template>
  <div>
    <el-dialog
      :title="info.isAdd ? ' 添加角色' : '编辑角色'"
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
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
          <!-- 树形控件部分 -->
        <el-form-item label="角色权限">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{children: 'children',label: 'title'}"
          >
          </el-tree>
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
import { reRoleAdd,reRoleDetail,reRoleUpdate } from "../../../utils/request";
import { warningAlert, succseeAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
      addRules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      //获取菜单list
      menuList: "menu/list",

    }),
  },
  methods: {
    ...mapActions({
      reMenuListAction: "menu/reListAction",
      reRoleList: "role/reListAction",

    }),
    cancel() {
      this.info.showAddDialog = false;
      this.$refs.addFormRef.resetFields();
    },
    // 数据重置
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
      // 树形控件 设置 空值
      this.$refs.tree.setCheckedKeys([])
    },
    // 添加事件
    addFrom() {
      // 树形控件取值
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())      
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项！");
        }
        reRoleAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            succseeAlert(res.data.msg);
            //弹框消失
            this.cancel();
            this.empty();
            // 刷新list数据
            this.reRoleList();
          } else {
            warningAlert(res.data.msg);
          }
        });
      });
    },
    // 获取点击修改的数据
    look(id) {
      reRoleDetail(id).then((res) => {
        if (res.data.code == 200) {         
          this.form = res.data.list;
          this.form.id = id
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      reRoleUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          succseeAlert(res.data.msg);
          //弹框消失
          this.cancel();
          this.empty();
          // 刷新list数据
          this.reRoleList();
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
    if(this.menuList.length == 0){
      this.reMenuListAction()
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