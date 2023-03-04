<template>
  <div class="app-container">
    <el-table :data="data" border style="width: 100%" v-loading="loading">
      <el-table-column align="center" prop="date" label="序号" width="60">
        <template slot-scope="scope">{{
          scope.$index + (nowCurrent - 1) * pageSize + 1
        }}</template>
      </el-table-column>
      <el-table-column align="center" prop="avatar" label="头像" width="120">
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar"></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="nickname" label="昵称">
      </el-table-column>
      <el-table-column align="center" prop="blog.title" label="评论文章">
      </el-table-column>
      <el-table-column align="center" prop="content" label="评论内容">
      </el-table-column>
      <el-table-column align="center" prop="createDate" label="评论日期">
      </el-table-column>
      <el-table-column align="center" label="操作" width="140">
        <template slot-scope="scope">
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
              @click="deleteMessage(scope.row)"
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
import { getMessage, delMessage } from "@/api/message";
import { formDate } from "@/utils/dateUtils";
import { serverUrl } from "@/serverPath.js";
export default {
  data() {
    return {
      data: [],
      loading: false,
      total: 0,
      pageSize: 5,
      nowCurrent: 1,
    };
  },
  created() {
    this.getMessageList(this.nowCurrent, this.pageSize);
  },
  methods: {
    pageSizeChange(num) {
      this.nowCurrent = 1;
      this.pageSize = num;
      this.getMessageList(this.nowCurrent, num);
    },
    currentChange(page) {
      this.nowCurrent = page;
      this.getMessageList(page, this.pageSize);
    },
    getMessageList(page, limit) {
      this.loading = true;
      this.data = [];
      getMessage(page, limit).then((res) => {
        this.loading = false;
        this.data = res.data.rows;
        this.total = res.data.total;
        this.data.forEach((item) => {
          item.createDate = formDate(item.createDate);
          item.avatar = serverUrl + item.avatar;
        });
      });
    },
    deleteMessage(data) {
      this.$confirm("确定删除该评论吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMessage(data._id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getMessageList(this.nowCurrent = 1, this.pageSize);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
</style>