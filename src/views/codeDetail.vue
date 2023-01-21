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
    <div class="header">
      <el-row :gutter="20">
        <el-col :span="6">
          <p class="p_title">Name: <span class="span">{{ contract.name }}</span></p>
        </el-col>
        <el-col :span="6">
          <p class="p_title">Type: <span class="span">{{ contract.type }}</span></p>
        </el-col>
        <el-col :span="6">
          <p class="p_title">Category: <span class="span">{{ contract.category }}</span></p>
        </el-col>
        <el-col :span="6">
          <p class="p_title">Call in last month: <span class="span">{{ contract.callInLastMonth }}</span></p>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="onTabChange">
        <el-tab-pane label="Code" name="code">
          <div class="code_area_header">
            <el-button type="text" @click="getSimilarCode">
              Similar Codes
            </el-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="bg">
                <el-tree
                  :data="contract.codeStructure"
                  :props="codeStructureTreeProps"
                  style="background-color: rgba(250, 250, 250, 1)!important;"
                  @node-click="selectCodeSection"
                />
              </div>
            </el-col>
            <el-col :span="18">
              <div class="bg code_area_container">
                <pre v-highlight class="code_area_content" style="height:90%">
                  <code id="selectedCode" class="python hljs" style="height:100%">{{ selectedCode }}</code>
                </pre>
                <div class="code_area_footer">
                  <el-button style="padding:10px;" type="primary" class="button" @click="getCodePlayground">
                    run in playground
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Contracts" name="relatedContracts">
          <div class="code_area_header">
            <el-button type="text" @click="getSimilarCode">
              Similar Codes
            </el-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="bg">
                <el-tree
                  :data="contract.relatedContracts"
                  :props="codeStructureTreeProps"
                  style="background-color: rgba(250, 250, 250, 1)!important;"
                  @node-click="selectRelatedContract"
                />
              </div>
            </el-col>
            <el-col :span="18">
              <div class="bg code_area_container">
                <pre v-highlight class="code_area_content" style="height:90%">
                  <code id="selectedRelatedContractCode" class="python hljs" style="height:100%">{{ selectedRelatedContractCode }}</code>
                </pre>
                <div class="code_area_footer">
                  <el-button style="padding:10px;" type="primary" class="button" @click="getCodePlayground">
                    run in playground
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Scripts" name="relatedScripts">
          <div class="code_area_header">
            <el-button type="text" @click="getSimilarCode">
              Similar Codes
            </el-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="bg">
                <el-tree
                  :data="contract.relatedScripts"
                  :props="codeStructureTreeProps"
                  style="background-color: rgba(250, 250, 250, 1)!important;"
                  @node-click="selectRelatedScript"
                />
              </div>
            </el-col>
            <el-col :span="18">
              <div class="bg code_area_container">
                <pre v-highlight class="code_area_content" style="height:90%">
                  <code id="selectedRelatedScriptCode" class="python hljs" style="height:100%">{{ selectedRelatedScriptCode }}</code>
                </pre>
                <div class="code_area_footer">
                  <el-button style="padding:10px;" type="primary" class="button" @click="getCodePlayground">
                    run in playground
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Transactions" name="relateTransactions">
          <div class="code_area_header">
            <el-button type="text" @click="getSimilarCode">
              Similar Codes
            </el-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="bg">
                <el-tree
                  :data="contract.relatedTransactions"
                  :props="codeStructureTreeProps"
                  style="background-color: rgba(250, 250, 250, 1)!important;"
                  @node-click="selectRelatedTransaction"
                />
              </div>
            </el-col>
            <el-col :span="18">
              <div class="bg code_area_container">
                <pre v-highlight class="code_area_content" style="height:90%">
                  <code id="selectedRelatedTransactionCode" class="python hljs" style="height:100%">{{ selectedRelatedTransactionCode }}</code>
                </pre>
                <div class="code_area_footer">
                  <el-button style="padding:10px;" type="primary" class="button" @click="getCodePlayground">
                    run in playground
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-container>
</template>
<script>

import {
  getCode,
  getCodeInfo,
  getCodeStructure,
  getRelatedContracts,
  // getRelatedScripts,
  getRelatedTransactions,
  getCodePlayground,
} from "@/api/code";

export default {
  data() {
    return {
      contract: {
        name: '',
        address: '',
        code: ``,
        type: '',
        category: '',
        callInLastMonth: 0,
        codeStructure: [{
          id: 0,
          type: '',
          name: 'All',
          startPosition: 1,
          endPosition: 0,
        }],
        relatedContracts: [{
          name: '',
          address: '',
        }],
        relatedScripts: [],
        relatedTransactions: [{
          name: '',
          address: '',
        }],
        similarCode: [{
          id: 0,
          index: 0,
          type: '',
          score: 0,
          code: {
            id: 0,
            contractName: '',
            contractAddress: '',
            contractCode: '',
            contractType: '',
          },
        }],
      },
      selectedCode: '',
      selectedRelatedContractCode: '',
      selectedRelatedScriptCode: '',
      selectedRelatedTransactionCode: '',
      activeName: "code", // tab切换
      codeStructureTreeProps: {
        children: 'children',
        label: 'name'
      },

    };
  },
  created() {
    this.contract.name = this.$route.query.contractName;// 'NWayUtilityCoin';
    this.contract.address = this.$route.query.contractAddress;// '0x011b6f1425389550';
    this.getCodeDetail(this.contract.name, this.contract.address);
  },
  methods: {
    // handleNodeClick(codeSection) {
    //   this.selectCodeSection(codeSection);
    // },
    goHome() {
      this.$router.push({ path: "/" });
    },
    onTabChange(tab, event) {
      switch (tab.name) {
        case 'code':
          if (this.selectedCode === '') {
            if (this.contract.codeStructure.length > 0) {
              this.selectCodeSection(this.contract.codeStructure[0]);
            }
          }
          break;
        case 'relatedContracts':
          if (this.selectedRelatedContractCode === '') {
            if (this.contract.relatedContracts.length > 0) {
              this.selectRelatedContract(this.contract.relatedContracts[0]);
            }
          }
          break;
        case 'relatedScripts':
          if (this.selectedRelatedScriptCode === '') {
            if (this.contract.relatedScripts.length > 0) {
              this.selectRelatedScript(this.contract.relatedScripts[0]);
            }
          }
          break;
        case 'relateTransactions':
          if (this.selectedRelatedTransactionCode === '') {
            if (this.contract.relatedTransactions.length > 0) {
              this.selectRelatedTransaction(this.contract.relatedTransactions[0]);
            }
          }
          break;
      }
    },
    selectCodeSection(codeSection) {
      if (codeSection == null) {
        return;
      }
      const codes = this.contract.code.split('\n');
      if (codeSection.endPosition === 0) {
        this.selectedCode = codes.slice(codeSection.startPosition - 1).join('\n');
      }
      else {
        this.selectedCode = codes.slice(codeSection.startPosition - 1, codeSection.endPosition).join('\n');
      }
      document.getElementById('selectedCode').innerHTML = this.selectedCode;
    },
    selectRelatedContract(contract) {
      const params = {
        contractName: contract.name,
        contractAddress: contract.address,
      };
      getCode(params).then(response => {
        this.selectedRelatedContractCode = response.code;
        document.getElementById('selectedRelatedContractCode').innerHTML = this.selectedRelatedContractCode;
      }).catch(error => {
        console.error(error);
      });
    },
    selectRelatedScript(script) {
      const params = {
        contractName: script.name,
        contractAddress: script.address,
      };
      getCode(params).then(response => {
        this.selectedRelatedScriptCode = response.code;
        document.getElementById('selectedRelatedScriptCode').innerHTML = this.selectedRelatedScriptCode;
      }).catch(error => {
        console.error(error);
      });
    },
    selectRelatedTransaction(transaction) {
      const params = {
        contractName: transaction.name,
        contractAddress: transaction.address,
      };
      getCode(params).then(response => {
        this.selectedRelatedTransactionCode = response.code;
        document.getElementById('selectedRelatedTransactionCode').innerHTML = this.selectedRelatedTransactionCode;
      }).catch(error => {
        console.error(error);
      });
    },
    getCodeDetail(contractName, contractAddress) {
      const params = {contractName, contractAddress};
      getCode(params).then(response => {
        this.contract.name = contractName;
        this.contract.address = contractAddress;
        this.contract.code = response.code;
      }).catch(error => {
        console.log('[DEBUG]' + new Date().toLocaleString() + '@/views/codeDetail.getCode - request\n' +
            'error: ' + JSON.stringify(error, null, '\t'));
      });
      getCodeStructure(params).then(response => {
        this.contract.codeStructure = [{
          id: 0,
          type: '',
          name: 'All',
          startPosition: 1,
          endPosition: 0,
        }, ...response];
        if (this.contract.codeStructure.length > 0) {
          this.selectCodeSection(this.contract.codeStructure[0]);
        }
      }).catch(error => {
        console.log('[DEBUG]' + new Date().toLocaleString() + '@/views/codeDetail.getCodeStructure - request\n' +
            'error: ' + JSON.stringify(error, null, '\t'));
      });
      getRelatedContracts(params).then(response => {
        this.contract.relatedContracts = response;
      }).catch(error => {
        console.log('[DEBUG]' + new Date().toLocaleString() + '@/views/codeDetail.getRelatedContracts - request\n' +
            'error: ' + JSON.stringify(error, null, '\t'));
      });

      this.contract.relatedScripts = [];
      // getRelatedScripts(params).then(response => {
      //   this.contract.relatedScripts = response;
      // }).catch(error => {
      //   console.error(error);
      // });

      getRelatedTransactions(params).then(response => {
        this.contract.relatedTransactions = response;
      }).catch(error => {
        console.log('[DEBUG]' + new Date().toLocaleString() + '@/views/codeDetail.getRelatedTransactions - request\n' +
            'error: ' + JSON.stringify(error, null, '\t'));
      });
      getCodeInfo(params).then(response => {
        this.contract.type = response.contractType;
        this.contract.category = response.contractCategory;
        this.contract.callInLastMonth = response.callInLastMonth;
      }).catch(error => {
        console.log('[DEBUG]' + new Date().toLocaleString() + '@/views/codeDetail.getCodeInfo - request\n' +
            'error: ' + JSON.stringify(error, null, '\t'));
      });
    },
    getSimilarCode() {
      const { href } = this.$router.resolve({
        path: "/codeList",
        query: {
          contractName: this.contract.name,
          contractAddress: this.contract.address,
        },
      });
      window.open(href, '_blank');
    },
    getCodePlayground() {
      const params = {
        contractName: this.contract.name,
        contractAddress: this.contract.address,
      };
      getCodePlayground(params).then(response => {
        window.open(response.playgroundUrl, '_blank');
      }).catch(error => {
        console.log('[DEBUG]' + new Date().toLocaleString() + '@/views/codeDetail.getCodePlayground - request\n' +
            'error: ' + JSON.stringify(error, null, '\t'));
      });
    }
  },
};
</script>
<style lang="scss" scoped>
  .search-logo{
    width: 200px;
  }
  .header{
    width: 90%;
    height: 80px;
    margin: 20px auto;
    box-shadow: 1px 1px 3px 1px #20212447;
  }
  .p_title{
    font-size: 18px;
    font-weight: 400;
    line-height: 80px;
    margin-left: 25px;
    .span{
      color: #028DF1;
      font-weight: 600;
    }
  }
  .content{
    width: 90%;
    height: 520px;
    margin: 0px auto 20px;
    box-shadow: 1px 1px 3px 1px #20212447;
    padding: 10px 20px;
  }
  .bg{
    background-color: rgba(250, 250, 250, 1);
    height: 420px;
    width: 100%;
    padding: 10px;
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
  .code_area_container{
    display: flex;
    flex-direction: column;
  }
  .code_area_content{
    display:flex;
    margin:0;
  }
  .code_area_header {
    display: flex;
    height: 25px;
    justify-content: flex-end;
  }
  .code_area_footer {
    margin-top: auto;
    padding: 5px;
    display: flex;
    height: 50px;
    justify-content: flex-end;
  }
  pre {
    position: relative;
    min-width: 600px;
    margin: 0;
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
