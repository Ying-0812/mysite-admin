<template>
  <div class="app-container">
    <el-table :data="Data" border style="width: 100%" v-loading="loading">
      <el-table-column align="center" prop="date" label="序号" width="60">
        <template slot-scope="scope">{{ scope.$index + (nowCurrent - 1) * pageSize + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" prop="title" label="文章名称" width="180">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="200"
            trigger="hover"
          >
            <el-image :src="scope.row.thumb"></el-image>
            <a
              href="#"
              @click.prevent="goSite"
              slot="reference"
              target="_blank"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="description"
        label="文章描述"
        width="180"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="scanNumber"
        label="浏览数"
        width="180"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="commentNumber"
        label="评论量"
        width="180"
      >
      </el-table-column>
      <el-table-column align="center" label="所属分类" width="180">
        <template slot-scope="scope">
          {{ scope.row.category === null ? "未分类" : scope.row.category.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createDate" label="创建日期">
      </el-table-column>
      <el-table-column align="center" label="操作" width="140">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editBlog(scope.row)"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteBlog(scope.row)"
            >
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-pagination
        background
        layout="prev, pager, next, total, ->, sizes, jumper"
        :total="total"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        :current-page="nowCurrent"
        @size-change="pageSizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { formDate } from "@/utils/dateUtils";
import { getArticle, deleteArticle } from "@/api/article";
import { serverUrl } from "@/serverPath.js";
export default {
  filters: {},
  data() {
    return {
      loading:true,
      Data: [],
      total: 0,
      pageSize: 5,
      nowCurrent: 1,
    };
  },
  created() {
    this.getBlogList(this.nowCurrent,this.pageSize);
  },
  methods: {
    pageSizeChange(num) {
      this.nowCurrent = 1
      this.pageSize = num
      this.getBlogList(this.nowCurrent,num);
    },
    currentChange(page) {
      this.nowCurrent = page
      this.getBlogList(page,this.pageSize);
    },
    editBlog(data) {
      this.$router.push({
        path: "/articleUpdate",
        query: {
          id: data._id,
        },
      });
    },
    deleteBlog(data) {
      this.$confirm("删除此文章会将文章所有评论一并删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteArticle(data._id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getBlogList(this.nowCurrent = 1,this.pageSize);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    goSite() {},
    getBlogList(page,limit) {
      this.loading = true
      this.Data = []
      getArticle(page,limit).then((res) => {
        this.loading = false
        this.Data = res.data.rows;
        this.total = res.data.total;
        this.Data.forEach((item) => {
          item.createDate = formDate(item.createDate);
          item.thumb = serverUrl + item.thumb;
        });
      });
    },
  },
};
</script>
