<template>
  <!-- <div>    -->
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../../assets/img/logo.gif" alt="" />
        <span>&nbsp;小米商城后台管理系统</span>
      </div>
      <div class="header-con">
        <span>{{userInfo.username}}</span>
        <el-button type="danger" @click="logout">退出</el-button>
      </div>
    </el-header>

    <!-- 中间内容区域 -->
    <el-container>
      <!-- 左侧 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 折叠按钮 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
        >
          <el-menu-item index="/">
            <i class="iconfont icon-shouye"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 目录 -->
            <el-submenu :index="item.id +''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 菜单 -->
            <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
          </div>

















          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-shezhi"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu">
                <i class="iconfont icon-caidan"> </i>
                <span> 菜单管理</span>
              </el-menu-item>
              <el-menu-item index="/role">
                <i class="iconfont icon-jiaoseguanli"> </i>
                <span> 角色管理</span>
              </el-menu-item>
              <el-menu-item index="manage">
                <i class="iconfont icon-guanliyuan"> </i>
                <span>管理员管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->

          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-shangping"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/cate">
                <i class="iconfont icon-fenlei"> </i>
                <span>商品分类</span>
              </el-menu-item>
              <el-menu-item index="/specs">
                <i class="iconfont icon-guigeguanli"> </i>
                <span>商品规格</span>
              </el-menu-item>
              <el-menu-item index="/goods">
                <i class="iconfont icon-shangpinguanli"> </i>
                <span>商品管理</span>
              </el-menu-item>
              <el-menu-item index="/member">
                <i class="iconfont icon-huiyuan"> </i>
                <span>会员管理</span>
              </el-menu-item>
              <el-menu-item index="/banner">
                <i class="iconfont icon-lunbotu"> </i>
                <span>轮播图管理</span>
              </el-menu-item>
              <el-menu-item index="/seckill">
                <i class="iconfont icon-miaosha"> </i>
                <span>秒杀管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->




        </el-menu>
      </el-aside>

      <!-- 中间 -->
      <el-main class="main">
        <el-breadcrumb v-if="$route.name" separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
let baseUrl = "/api";
export default {
  data() {
    return {
      menulist: [],
      isCollapse: false,
    };
  },
  computed: {
    ...mapGetters({
      userInfo:"userInfo"
    })
  },
  methods: {
    ...mapActions({
      changeUserInfoAction: "changeUserInfoAction",
    }),
    logout() {
      this.changeUserInfoAction({});
      this.$router.push("/login");
    },
    // 获取左侧菜单栏数据
    getMenuList() {
      this.axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        data: { istree: true },
      }).then((res) => {
        this.menulist = res.data.list;
        console.log(res.data.list);
      });
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
  created() {
    this.getMenuList();
  },
};
</script>
<style scoped>

.el-header {
  background-color: #373d41;
  line-height: 60px;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
}
.el-header img {
  vertical-align: middle;
  height: 62px;
}
.el-aside {
  background-color: #333744;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  /* text-align: center; */
  line-height: 160px;
}

.home-container {
  height: 100%;
}
.iconfont {
  margin-right: 10px;
}
.el-menu {
  border-right: none;
}
.toggle-button {
  background: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-main {
  line-height: normal !important;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
.box-card {
  margin-top: 15px;
}
</style>
