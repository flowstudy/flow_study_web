<template>
  <div class="home">
    <el-container>
      <!--导航-->
      <el-header style=" box-shadow: 0 1px 5px 0 #20212447;">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item style="clear: both">
            <img
              src="@/assets/images/FS_LOGO_MAIN.jpg"
              alt=""
              class="search-logo"
              @click="goHome"
            >
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <div class="home-logo">
          <img src="@/assets/images/FS_MAIN.jpg" alt="">
          <p>Flow learning community, tens of millions of blockchain codes available for search</p>
        </div>
        <div class="home-search">
          <el-input
            v-model="keywords"
            placeholder="请输入关键词,或者输入一个网址"
            @keyup.enter.native="onSearch"
          >
            <el-button slot="append" @click="onSearch">
              <i class="el-icon-search voice" />
            </el-button>
          </el-input>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ElContainer from "../../node_modules/element-ui/packages/container/src/main.vue";
import ElMain from "../../node_modules/element-ui/packages/main/src/main.vue";

export default {
  name: "Home",
  components: {
    ElMain,
    ElContainer
  },
  data() {
    return {
      keywords: "",
    };
  },
  methods: {
    onSearch() {
      this.$router.push({ path: "/codeList", query: { keywords: this.keywords }});
    },
    goHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style lang="scss" scoped>
  .el-menu--horizontal > .el-menu-item.is-active{
    border-bottom: none!important;
  }
.home {
  text-align: center;
  .search-logo{
    width: 200px;
    float: left;
  }
  &-logo {
    margin: 120px auto 0 auto;

    img {
      width: 550px;
    }
    p{
      color: #48465B;
    }

  }
  &-search {
    width: 55%;
    margin: 40px auto;
    box-shadow: 0 1px 5px 0 #20212447;
    border-radius: 30px;
    height: 60px;

    ::v-deep.el-input__inner {
      border-radius: 30px;
      height: 60px;
      // background: url(../assets/images/search.png) no-repeat 15px center;
      background-size: 20px;
      padding: 0 50px 0 30px;
      position: relative;
    }
    ::v-deep .el-input-group__append {
      background-color: #fff;
      position: absolute;
      top: 9px;
      right: 16px;
      height: 40px;
      border: none;
      border-radius: 30px;
    }

    .voice {
      width: 20px;
      height: 20px;
      margin: 9px -15px;
      font-size: 22px;
    }
  }
  &-button {
    display: flex;
    justify-content: space-around;
    width: 20%;
    margin: 20px auto;
    div {
      background-color: #f1f3f4;
      font-size: 14px;
      padding: 10px 20px;
    }
  }
  &-tips {
    font-size: 16px;
    padding-top: 5px;
    span {
      color: #242ede;
    }
  }
}
</style>
