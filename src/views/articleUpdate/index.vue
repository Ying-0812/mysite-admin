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
          <el-select v-model="form.select" placeholder="请选择" @change="selectChange">
    <el-option
      v-for="item in options"
      :key="item._id"
      :label="item.name"
      :value="item._id">
    </el-option>
  </el-select>
      </el-form-item>
      <el-button type="primary" @click="addBlog">修改文章</el-button>
    </el-form>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import { getArticleSort, getOncearticle, updateArticle } from "@/api/article";
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
    this.id = this.$route.query.id;
    getOncearticle(this.id).then((res) => {
      this.form = res.data;
      this.form.select =
        res.data.category === null ? "" : res.data.category._id;
      this.form.htmlContent = this.$refs.toastuiEditor.invoke(
        "setHTML",
        res.data.htmlContent
      );
    });
  },
  data() {
    return {
      id: "",
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
    selectChange() {
      this.$forceUpdate();
    },
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
      if (obj.title && obj.description && obj.categoryId && obj.htmlContent) {
        updateArticle({ id: this.id, data: obj }).then(() => {
          this.$router.push("/articleList");
          this.$message.success("修改成功");
        });
      } else {
        this.$message.error("请填写所有内容");
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  padding: 30px 20px;
}
</style>