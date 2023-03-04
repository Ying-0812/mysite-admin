<template>
  <div class="app-container">
    <div style="margin: 15px 0px 30px; width: 500px; display: flex">
      <el-input
        placeholder="请输入分类名称"
        v-model="input"
        class="input-with-select"
      >
        <el-select
          v-model="select"
          slot="prepend"
          placeholder="请选择"
          style="width: 60px"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" style="margin-left: 10px" @click="addBlogSort"
        >添加</el-button
      >
    </div>
    <el-table :data="data" border style="width: 100%">
      <el-table-column align="center" prop="date" label="序号" width="60">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="分类名称">
      </el-table-column>
      <el-table-column align="center" prop="articleCount" label="文章数量">
      </el-table-column>
      <el-table-column align="center" prop="order" label="分类等级">
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
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
              @click="deleteBlogSort(scope.row)"
            >
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="请编辑信息"
      :visible.sync="dialogVisible"
      width="36%"
      top="5vh"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="分类等级">
          <el-select v-model="form.order" placeholder="请选择分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBlogSort">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArticleSort,
  addArticleSort,
  getOnceArticle,
  updateArticleSort,
  deleteArticleSort,
} from "@/api/article";
export default {
  data() {
    return {
      data: [],
      input: "",
      select: "1",
      dialogVisible: false,
      form: {
        order: "",
        name: "",
      },
    };
  },
  created() {
    this.getBlogSort();
  },
  methods: {
    getBlogSort() {
      getArticleSort().then((res) => {
        this.data = res.data;
      });
    },
    addBlogSort() {
      if (this.input) {
        addArticleSort({
          name: this.input,
          order: this.select,
        }).then(() => {
          this.getBlogSort();
        });
      } else {
        this.$message.error("请输入添加的分类名称");
      }
    },
    editBlog(data) {
      this.dialogVisible = true;
      getOnceArticle(data._id).then((res) => {
        this.form = res.data;
      });
    },
    editBlogSort() {
      updateArticleSort({ id: this.form._id, data: this.form }).then(() => {
        this.$message.success("修改成功");
        this.dialogVisible = false;
        this.getBlogSort();
      });
    },
    deleteBlogSort(data) {
      this.$confirm(
        "删除分类后，分类下的所有文章将变为无分类状态, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteArticleSort(data._id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getBlogSort();
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

