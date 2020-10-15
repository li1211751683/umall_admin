<template>
  <div>
    <el-dialog
      :title="info.isAdd ? ' 添加商品' : '编辑商品'"
      :visible.sync="info.showAddDialog"
      width="50%"
      @closed="close"
      @opened="opened"
    >
      <el-form
        ref="addFormRef"
        :model="form"
        label-width="80px"
        :rules="addRules"
      >
        <el-form-item label="一级分类" prop="first_cateid">
          <el-select v-model="form.first_cateid" @change="changeFrist">
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
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" prop="goodsname">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" prop="market_price">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="图片" v-if="form.pid != 0">
          <div class="my-upload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt="" />
            <input
              class="my-input"
              type="file"
              @change="getFile"
              v-if="info.showAddDialog"
            />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" prop="specsid">
          <el-select v-model="form.specsid" @change="changeSpecs">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性" prop="specsattr">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in goodsAttrList"
              :key="item.id"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述">
          <!-- 富文本编辑器组件 -->
          <div v-if="info.showAddDialog" id="editor"></div>
          <!-- <textarea name="" id="" v-model="form.description"></textarea> -->
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
import E from "wangeditor"
import {
  reGoodsAdd,
  reGoodsDetail,
  reGoodsUpdate,
  reCateList,
} from "../../../utils/request";
import { warningAlert, succseeAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      imgUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      addRules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择商品属性", trigger: "blur" },
        ],
      },
      secondCateList: [],
      goodsAttrList: [],
    };
  },
  computed: {
    ...mapGetters({
      //获取商品分类list
      cateList: "cate/list",

      // 获取商品规格
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reCateList: "cate/reListAction",
      reSpecsList: "specs/reListAction",
      reListAction: "goods/reListAction",
      reTotalAction: "goods/reTotalAction",
    }),
    // 获取二级分类数据
    changeFrist() {
      (this.form.second_cateid = ""),
       this.getSecondList()
    },
    // 获得二级分类list
    getSecondList(){
       reCateList({ pid: this.form.first_cateid }).then((res) => {
          this.secondCateList = res.data.list;
        });
    },
    changeSpecs() {
      this.form.specsattr = [];
      this.getAttrArr();
    },
    getAttrArr() {
      // 在specsList找到和this.form.specsid 和id相同的数据
      let obj = this.specsList.find((item) => item.id == this.form.specsid);
      this.goodsAttrList = obj.attrs;
    },
    opened() {
      this.editor = new E("#editor");
      this.editor.create()
      // 编辑器创建完成以后复制
      this.editor.txt.html(this.form.description)
    },
    //获取文件
    getFile(e) {
      let file = e.target.files[0];
      console.log(e);

      //1.大小不超过2M 1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("文件不能超过2M");
        return;
      }

      //2.是图片
      let imgExtArr = [".jpg", ".png", ".jpeg", ".gif"];
      let extname = file.name.slice(file.name.lastIndexOf(".")); //'.jpg'
      if (!imgExtArr.some((item) => item == extname)) {
        warningAlert("文件格式不正确");
        return;
      }

      //URL.createObjectURL() 可以通过文件生成一个地址
      this.imgUrl = URL.createObjectURL(file);

      //将文件保存在form.img
      this.form.img = file;
    },

    cancel() {
      this.info.showAddDialog = false;
      this.$refs.addFormRef.resetFields();
    },
    // 数据重置
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
        this.secondCateList=[],
        this.goodsAttrList=[],
        this.imgUrl=""
    },
    // 添加事件
    addFrom() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项！");
        }
        this.form.description = this.editor.txt.html()
        let data = this.form;
        data.specsattr = JSON.stringify(this.form.specsattr);
        reGoodsAdd(data).then((res) => {
          if (res.data.code == 200) {
            succseeAlert(res.data.msg);
            //弹框消失
            this.cancel();
            this.empty();
            // 刷新list数据
            this.reListAction();
            this.reTotalAction()
          } else {
            warningAlert(res.data.msg);
          }
        });
      });
    },
    // 获取点击修改的数据
    look(id) {
      reGoodsDetail({id:id}).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;

          // 请求二级分类
          this.getSecondList()
          this.form.id = id;
          this.imgUrl = this.$imgPre + this.form.img;

          // 商品属性转为数组
          this.form.specsattr = JSON.parse(this.form.specsattr)
          // 获得商品属性数组
          this.getAttrArr()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改
    update() {
      this.form.description = this.editor.txt.html()
      let data = this.form;
        data.specsattr = JSON.stringify(this.form.specsattr);
      reGoodsUpdate(data).then((res) => {
        if (res.data.code == 200) {
          succseeAlert(res.data.msg);
          //弹框消失
          this.cancel();
          this.empty();
          // 刷新list数据
          this.reListAction();
          this.reTotalAction()
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
    if (this.cateList.length == 0) {
      this.reCateList();
    }
    //  获取全部specs数据  而不仅是单页数据
    this.reSpecsList(true);


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
.ql-editor {
  min-height: 300px;
}
</style>