<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
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
      <el-button type="primary" @click="addProject">添加文章</el-button>
    </el-form>
  </div>
</template>

<script>
import uploadImg from "@/components/uploadImg";
import { addProject } from "@/api/project";
export default {
  components: {
    uploadImg,
  },
  data() {
    return {
      options: [1, 2, 3, 4, 5],
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
  methods: {
    addProject() {
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
        addProject(obj).then(() => {
          this.$router.push("/projectList");
          this.$message.success("添加成功");
        });
      } else {
        this.$message.error("请填写所有项");
      }
    },
  },
};
</script>

<style>
</style>
