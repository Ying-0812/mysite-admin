<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
      <el-form-item label="文章标题">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章编辑"><br/><Editor height="500px" :initialValue="form.htmlContent" ref="toastuiEditor" /></el-form-item>
      <el-form-item label="文章描述"
        ><el-input
          v-model="form.description"
          placeholder="请输入文章描述"
          type="textarea"
        ></el-input
      ></el-form-item>
      <el-form-item label="文章头图"><br/></uploadImg><uploadImg v-model="form.thumb"></uploadImg></el-form-item>
      <el-form-item label="文章分类"><br/>
          <el-select v-model="form.select" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item._id"
      :label="item.name"
      :value="item._id">
    </el-option>
  </el-select>
      </el-form-item>
      <el-button type="primary" @click="addBlog">添加文章</el-button>
    </el-form>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import { getArticleSort, addArticle } from "@/api/article";
import uploadImg from "@/components/uploadImg";
export default {
  components: {
    uploadImg,
    Editor,
  },
  created() {
    getArticleSort().then((res) => {
      this.options = res.data;
    });
  },
  data() {
    return {
      options: [],
      form: {
        title: "",
        description: "",
        htmlContent: "",
        thumb: "",
        markdownContent: "",
        select: "",
      },
    };
  },
  methods: {
    addBlog() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };
      addArticle(obj).then(() => {
        this.$router.push("/articleList");
      });
    },
  },
};
</script>

<style scoped>
.app-container {
  padding: 30px 20px;
}
</style>