<template>
  <div class="app-container">
    <el-table :data="data" border style="width: 100%" v-loading="loading">
      <el-table-column align="center" prop="date" label="序号" width="60">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="项目名称">
        <template slot-scope="scope"
          ><a :href="scope.row.url" target="_blank">{{
            scope.row.name
          }}</a></template
        >
      </el-table-column>
      <el-table-column align="center" label="项目描述">
        <template slot-scope="scope">{{
          scope.row.description.toString()
        }}</template>
      </el-table-column>
      <el-table-column align="center" label="项目预览图" width="200">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.thumb2"
            :preview-src-list="srcList"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="GitHub"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="info"
              icon="iconfont icon-github"
              circle
              @click="goGithub(scope.row)"
            >
            </el-button>
          </el-tooltip>
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
              @click="editProject(scope.row)"
            ></el-button>
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
              @click="delProject(scope.row)"
            >
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" top="0vh" width="60%">
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目描述（每一项描述以英文逗号分隔）"
          ><el-input
            v-model="form.description"
            placeholder="请输入项目描述"
            type="textarea"
          ></el-input
        ></el-form-item>
        <el-form-item label="项目链接"
          ><el-input v-model="form.url" placeholder="请输入项目链接"></el-input
        ></el-form-item>
        <el-form-item label="GitHub地址"
          ><el-input
            v-model="form.github"
            placeholder="请输入GitHub地址"
          ></el-input
        ></el-form-item>
        <el-form-item label="预览图"
          ><br /><uploadImg v-model="form.thumb"></uploadImg
        ></el-form-item>
        <el-form-item label="排序等级"
          ><br />
          <el-select v-model="form.order" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="renew">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProject, updateProject, delProject } from "@/api/project";
import { serverUrl } from "@/serverPath";
import uploadImg from "@/components/uploadImg";
export default {
  components: {
    uploadImg,
  },
  data() {
    return {
      loading: true,
      data: [],
      srcList: [],
      options: [1, 2, 3, 4, 5],
      dialogFormVisible: false,
      form: {
        name: "",
        description: "",
        url: "",
        thumb: "",
        github: "",
        order: "",
      },
    };
  },
  created() {
    this.getProjectList();
  },
  methods: {
    getProjectList() {
      getProject().then((res) => {
        this.data = res.data;
        for (let item of this.data) {
          item.thumb2 = serverUrl + item.thumb;
          this.srcList.push(item.thumb);
        }
        this.loading = false;
      });
    },
    editProject(data) {
      this.dialogFormVisible = true;
      this.data.forEach((item) => {
        if (item._id === data._id) {
          item.description = item.description.toString();
          this.form = {...item};
        }
      });
    },
    renew() {
      let newString = this.form.description.split(",");
      let obj = {
        name: this.form.name,
        description: newString,
        url: this.form.url,
        thumb: this.form.thumb,
        github: this.form.github,
        order: this.form.order,
      };
      if (
        obj.name &&
        obj.description &&
        obj.url &&
        obj.thumb &&
        obj.github &&
        obj.order
      ) {
        updateProject({ id: this.form._id, data: obj }).then(() => {
          this.$message.success("修改成功");
          this.dialogFormVisible = false;
          this.getProjectList();
        });
      } else {
        this.$message.error("请填写所有项");
      }
    },
    delProject(data) {
      this.$confirm("是否删除该项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delProject(data._id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getProjectList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    goGithub(data) {
      window.open(data.github);
    },
  },
};
</script>

<style>
</style>
