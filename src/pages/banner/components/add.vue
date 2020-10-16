<template>
  <div>
    <el-dialog
      :title="info.isAdd ? ' 添加轮播图' : '编辑轮播图'"
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

        <el-form-item  label="标题" prop="title">
          <el-input v-model="form.title"  ></el-input>
        </el-form-item>

         <el-form-item label="图片" prop="image">
          <div class="my-upload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt="">
            <input  class="my-input" type="file" @change="getFile" v-if="info.showAddDialog" />
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
import { reBannerAdd, reBannerDetail, reBannerUpdate } from "../../../utils/request";
import { warningAlert, succseeAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      imgUrl:"",
      form: {
        title: "",
        img: null,
        status: 1,
      },
      addRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        image: [{ required: true, message: "请上传图片", trigger: "change" }],
       
      },
    };
  },
  computed: {
    ...mapGetters({
      //获取菜单list
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      reListAction: "banner/reListAction",
    }),
    //获取文件
    getFile(e) {
      let file = e.target.files[0];
      console.log(e);
      
      //1.大小不超过2M 1M=1024KB 1KB=1024B
      if(file.size>2*1024*1024){
        warningAlert("文件不能超过2M")
        return;
      }

      //2.是图片
      let imgExtArr=['.jpg','.png','.jpeg','.gif'];
      let extname=file.name.slice(file.name.lastIndexOf("."));//'.jpg'
      if(!imgExtArr.some(item=>item==extname)){
        warningAlert("文件格式不正确")
        return;
      }
      
      //URL.createObjectURL() 可以通过文件生成一个地址
      this.imgUrl=URL.createObjectURL(file)

      //将文件保存在form.img 
      this.form.img=file;
    },
    
    cancel() {
      this.info.showAddDialog = false;
      this.empty()
      this.$refs.addFormRef.resetFields();
    },
    // 数据重置
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
    },
    // 添加事件
    addFrom() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项！");
        }
        reBannerAdd(this.form).then((res) => {
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
    // 获取点击修改的数据
    look(id) {
      reBannerDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id =id
          this.imgUrl = this.$imgPre + this.form.img
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改
    update() {
      reBannerUpdate(this.form).then((res) => {
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
   
  },
};
</script>
<style  scoped >
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
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}
.my-upload h3 {
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: 400;
}
.my-upload .my-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}
.my-upload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}



</style>