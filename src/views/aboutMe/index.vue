<template>
  <div class="app-container">
    <h2>关于我</h2>
    <el-input v-model="url" :disabled="disabled"></el-input>
    <div style="margin-top: 20px">
      <el-button type="primary" @click="setAboutMeUrl">{{ font }}</el-button>
    </div>
  </div>
</template>

<script>
import { getAboutMe, setAboutMe } from "@/api/about";
export default {
  data() {
    return {
      url: "",
      disabled: true,
      font: "编辑",
    };
  },
  created() {
    this.getAboutMeUrl();
  },
  methods: {
    getAboutMeUrl() {
      getAboutMe().then((res) => {
        this.url = res.data;
      });
    },
    setAboutMeUrl() {
      if (this.font === "编辑") {
        this.disabled = false;
        this.font = "完成";
      } else if ((this.font = "完成")) {
        if (this.url) {
          setAboutMe({ url: this.url }).then((res) => {
            this.disabled = true;
            this.font = "编辑";
            this.getAboutMeUrl();
          });
        }
      }
    },
  },
};
</script>

<style>
</style>