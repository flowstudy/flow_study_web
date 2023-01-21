<template>
  <el-container>
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
    <div class="main">
      <div class="search">
        <el-input
          v-model="keywords"
          placeholder="输入搜索关键字"
          @keyup.enter.native="onSearch"
        >
          <el-button slot="append" @click="onSearch">
            <i class="el-icon-search voice" />
          </el-button>
        </el-input>
      </div>

      <div class="container">
        <div class="box_header">
          <p class="total">
            找到{{ pagination.total }}条结果（用时{{ searchTime }}毫秒）
          </p>
          <el-select
            v-model="codeType"
            clearable
            class="select"
            style="margin-left: 10px"
            placeholder="请选择类型"
            @change="onSearch"
          >
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="codeCategory"
            clearable
            class="select"
            placeholder="请选择分类"
            @change="onSearch"
          >
            <el-option
              v-for="(item,index) in categories"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="box_main">
          <el-card
            v-for="code in codeList"
            :key="code.rowID"
            shadow="never"
            style="border-style:none"
            label="代码"
            class="box-card"
          >
            <div class="div_block">
              <div class="block_header">
                <p class="title" @click="goDetails(code)">{{ code.contractName }}</p>
<!--                <p class="r_title">call in last month: {{ code.callInLastMonth }}</p>-->
              </div>
              <div class="block_body">
                <pre v-highlight style="display:flex;margin:0">
                  <code class="python hljs" style="height:146px">{{ code.contractCode }}</code>
                </pre>
              </div>
            </div>
            <el-divider />
          </el-card>
        </div>
        <div class="box_footer">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            :page-count="7"
            @current-change="pageSearch"
          />
        </div>
      </div>
    </div>

  </el-container>
</template>
<script>
import ElContainer from "../../node_modules/element-ui/packages/container/src/main.vue";
import { searchCode } from "@/api/search";
import {getSimilarCode} from "@/api/code";
import {TypeCheck} from "@/app/typeCheck";

export default {
  components: { ElContainer },
  filters: {},
  data() {
    return {
      codeCategory: "",
      codeType: "",
      url: "",
      keywords: "", // 在搜索框中输入的关键字
      codeList: [],
      pagination: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      searchTime: "0",
      categories: [
        {
          value: 'nft',
          label: 'nft'
        },
        {
          value: 'token',
          label: 'token'
        },
        {
          value: 'other',
          label: 'other'
        }
      ],
      types: [
        {
          value: 'interface',
          label: 'interface'
        },
        {
          value: 'contract',
          label: 'contract'
        },
        {
          value: 'transaction',
          label: 'transaction'
        }
      ],
    };
  },
  mounted() {
  },
  activated() {
    this.keywords = this.$route.query.keywords;
    if (TypeCheck.isString(this.$route.query.keywords) && (this.$route.query.keywords !== '')) {
      this.searchCode(this.keywords);
    }
    else {
      if (TypeCheck.isString(this.$route.query.contractName) && (this.$route.query.contractName !== '') &&
          TypeCheck.isString(this.$route.query.contractAddress) && (this.$route.query.contractAddress !== '')) {
        this.getSimilarCode(this.$route.query.contractName, this.$route.query.contractAddress);
      }
      else {
        return this.$message.error('请输入搜索关键词！');
      }
    }
  },
  methods: {
    pageSearch(currentPage) {
      this.pagination.currentPage = currentPage;
      this.searchCode(this.keywords);
    },
    goHome() {
      this.$router.push({ path: "/" });
    },
    goDetails(code) {
      this.$router.push({
        path: "/codeDetail/2", // ??
        query: {
          contractName: code.contractName,
          contractAddress: code.contractAddress,
        },
      });
    },
    onSearch() {
      this.pagination.currentPage = 1;
      this.searchCode(this.keywords);
    },
    searchCode(keywords) {
      if ((keywords == null) || (keywords === '')) {
        return this.$message.error('请输入搜索关键词！');
      }
      this.codeList = [];
      this.pagination.total = 0;
      this.searchTime = 0;
      const params = {
        keywords: keywords,
        pageSize: this.pagination.pageSize,
        currentPage: this.pagination.currentPage,
        codeCategory: this.codeCategory,
        codeType: this.codeType,
      }
      searchCode(params).then((response) => {
        if (response == null) {
          return this.$message.error('搜索失败');
        }
        this.codeList = response.data;
        this.pagination.total = response.count;
        this.searchTime = response.searchTime ?? "0";
      }).catch((error) => {
        console.log(error);
        return this.$message.error('搜索失败');
      });
    },
    getSimilarCode(contractName, contractAddress) {
      const params = {contractName, contractAddress};
      getSimilarCode(params).then(response => {
        this.codeList = response;
      }).catch(error => {
        console.log('[DEBUG]' + new Date().toLocaleString() + '@/views/codeList.getSimilarCode - request\n' +
            'error: ' + JSON.stringify(error, null, '\t'));
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.search-logo{
  width: 200px;
}
.main {
  .search {
    width: 60%;
    margin:20px auto 5px;
    ::v-deep.el-input__inner {
      border-radius: 25px;
      height: 50px;
      // background: url(../assets/images/search.png) no-repeat 15px center;
      background-size: 20px;
      padding: 0px 50px 0 30px;
      position: relative;
    }
    ::v-deep .el-input-group__append {
      background-color: #fff;
      position: absolute;
      top: 5px;
      right: 8px;
      height: 40px;
      border: none;
      border-radius: 25px;
    }
    .voice {
      width: 20px;
      height: 20px;
      margin: 9px -15px;
      font-size: 22px;
    }
  }
  .container {
    margin:0 100px;
    .box_header{
      padding: 10px;
      border-bottom: 2px solid #dfe4ed ;
      height: 60px;
      clear: both;
      .total{
        float: left;
        color: #7F7F7F;
        font-size: 14px;
        line-height: 50px;
      }
      .select{
        width: 120px;
        float: right;
      }
    }
    .box_main{
      padding: 20px 10px;
      .div_block{
        margin-bottom: 20px;
        .block_header{
          clear: both;
          height: 30px;
          .title{
            font-size: 18px;
            color: #028DF1;
            float: left;
          }
          .r_title{
            float: right;
            font-weight: 500;
            font-size: 14px;

          }
        }
        .block_body{
          height: 150px;
          width: 100%;
          padding: 2px;
          background-color: rgba(250, 250, 250, 1);
          font-size: 14px;
          .p{
            color: #73705D;
            line-height: 25px;
            .span{
              color: #028DF1;
              margin-right: 20px;
            }
          }
        }
      }
    }
    .box_footer{
      width: 450px;
      margin: 0 auto;
      padding-bottom: 20px;
    }
  }
}
.hljs {
  display: block;
  width: 100%;
  margin: 0;
  padding: 1px;
  color: #abb2bf;
  font-weight: 200;
  font-size: 0.75rem;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
  line-height: 1.5;
  white-space: pre-wrap;
  border: 0;
}

</style>
