<template>
  <div>
    <!--编写页面静态部分，即view部分-->
    <!--查询表单-->
    <el-form :model="params">
      站点名称：<el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面名称：<el-input v-model="params.pageName"  style="width: 100px"></el-input>
      页面别名：<el-input v-model="params.pageAliase"  style="width: 100px"></el-input>
      页面类型：<el-select v-model="params.pageType" placeholder="请选择页面类型">
        <el-option
          v-for="item in pageTypeList"
          :key="item.pageTypeId"
          :label="item.pageTypeName"
          :value="item.pageTypeId">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" v-on:click="query">查询</el-button>
      <router-link :to="{path:'/cms/page/add',query:{
        page:this.params.page,
        siteId:this.params.siteId
      }}">
         <el-button  type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>

    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180" >
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="page">
          <el-button
            size="small"type="text"
            @click="edit(page.row.pageId)">编辑
          </el-button>
          <el-button
            size="small"type="text"
            @click="del(page.row.pageId)">删除
          </el-button>
          <el-button
            @click="preview(page.row.pageId)"
            type="text"
            size="small">页面预览
            </el-button>
        </template>
      </el-table-column>
      <el-table-column label="发布" width="80">
      <template slot‐scope="scope">
        <el-button
        size="small" type="primary" plain @click="postPage(scope.row.pageId)">发布
        </el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      v-on:current-change="changePage"
      style="float:right">
    </el-pagination>
  </div>
</template>
<script>
  /*编写页面静态部分，即model及vm部分。*/
  import * as cmsApi from '../api/cms'
  export default {
    data() {
      return {
        siteList:[],//站点列表
        pageTypeList:[],//页面类型列表
        list: [],
        total:0,
        params:{
          siteId:'',
          pageAliase:'',
          pageName:'',
          pageType:'',
          page:1,
          size:10
        }
      }
    },
    methods:{
      //页面查询
      query:function(){
        // alert('查询')
        //调用服务端的接口
        cmsApi.page_list(this.params.page,this.params.size,this.params).then((res)=>{
          //将res结果数据赋值给数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })

      },
      changePage:function(page){//形参就是当前页码
        //调用query方法
        // alert(page)
        this.params.page = page;
        this.query()
      },
      edit:function(pageId){
        //打开修改页面
        this.$router.push({
          path:'/cms/page/edit/'+pageId
        })
      },
      del:function (pageId) {
        this.$confirm('您确认删除吗?', '提示', { }).then(() => {
          //调用服务端接口
          cmsApi.page_del(pageId).then(res=>{

            if(res.success){
              this.$message.success("删除成功")
              //刷新页面
              this.query()
            }else{
              this.$message.error("删除失败")
            }
          })
        })
      },
      //页面预览
      preview:function (pageId){
        window.open("http://www.xuecheng.com/cms/preview/"+pageId)
      },
      //页面发布
      postPage (id) {
        this.$confirm('确认发布该页面吗?', '提示', {
        }).then(() => {
          cmsApi.page_postPage(id).then((res) => {
            if(res.success){
              console.log('发布页面id='+id);
              this.$message.success('发布成功，请稍后查看结果');
            }else{
              this.$message.error('发布失败');
            }
          });
        }).catch(() => {
        });
      },
    },
    created(){
      //取出路由中的参数，赋值给数据对象
      this.params.page = Number.parseInt(this.$route.query.page || 1)
      this.params.siteId = this.$route.query.siteId || ''

    },
    mounted(){
      //当DOM元素渲染完成后调用query
      this.query()
      //初始化站点列表
      this.siteList = [
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          siteName:'门户主站'
        },
        {
          siteId:'102',
          siteName:'测试站'
        }
      ]
      this.pageTypeList = [
        {
          pageTypeId:'0',
          pageTypeName:'静态'
        },
        {
          pageTypeId:'1',
          pageTypeName:'动态'
        }
      ]
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
