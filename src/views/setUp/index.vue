<template>
  <div class="app-container">
    <el-form :model="form" class="demo-ruleForm">
      <el-form-item label="菜单栏头像"
        ><br />
        <el-image
          :src="url + form.avatar"
          style="width: 180px; height: 180px; border-radius: 6px"
        ></el-image>
      </el-form-item>
      <el-form-item label="网站标题">
        <el-input v-model="form.siteTitle" type="text" disabled></el-input>
      </el-form-item>
      <el-form-item label="GitHub地址">
        <el-input v-model="form.github" type="text" disabled></el-input>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input v-model="form.qq" type="text" disabled></el-input>
      </el-form-item>
      <el-form-item label="QQ二维码"
        ><br />
        <el-image
          :src="url + form.qqQrCode"
          style="width: 180px; height: 180px; border-radius: 6px"
        ></el-image>
      </el-form-item>
      <el-form-item label="微信">
        <el-input v-model="form.weixin" type="text" disabled></el-input>
      </el-form-item>
      <el-form-item label="微信二维码"
        ><br />
        <el-image
          :src="url + form.weixinQrCode"
          style="width: 180px; height: 180px; border-radius: 6px"
        ></el-image>
      </el-form-item>
      <el-form-item label="邮箱地址">
        <el-input v-model="form.mail" type="text" disabled></el-input>
      </el-form-item>
      <el-form-item label="网站备案号">
        <el-input v-model="form.icp" type="text" disabled></el-input>
      </el-form-item>
      <el-form-item label="GitHub名称">
        <el-input v-model="form.githubName" type="text" disabled></el-input>
      </el-form-item>
      <el-form-item label="网站图标"
        ><br />
        <el-image
          :src="url + form.favicon"
          style="width: 180px; height: 180px; border-radius: 6px"
        ></el-image>
      </el-form-item>
    </el-form>
    <div class="edit">
      <el-button type="primary" @click="editSetting">编辑</el-button>
    </div>
    <el-dialog
      title="编辑信息"
      :visible.sync="dialogVisible"
      width="50%"
      top="0vh"
    >
      <el-form :model="updateForm" class="demo-ruleForm">
        <el-form-item label="菜单栏头像"
          ><br />
          <uploadImg v-model="updateForm.avatar"></uploadImg>
        </el-form-item>
        <el-form-item label="网站标题">
          <el-input v-model="updateForm.siteTitle" type="text"></el-input>
        </el-form-item>
        <el-form-item label="GitHub地址">
          <el-input v-model="updateForm.github" type="text"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="updateForm.qq" type="text"></el-input>
        </el-form-item>
        <el-form-item label="QQ二维码"
          ><br />
          <uploadImg v-model="updateForm.qqQrCode"></uploadImg>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="updateForm.weixin" type="text"></el-input>
        </el-form-item>
        <el-form-item label="微信二维码"
          ><br />
          <uploadImg v-model="updateForm.weixinQrCode"></uploadImg>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input v-model="updateForm.mail" type="text"></el-input>
        </el-form-item>
        <el-form-item label="网站备案号">
          <el-input v-model="updateForm.icp" type="text"></el-input>
        </el-form-item>
        <el-form-item label="GitHub名称">
          <el-input v-model="updateForm.githubName" type="text"></el-input>
        </el-form-item>
        <el-form-item label="网站图标"
          ><br />
          <uploadImg v-model="updateForm.favicon"></uploadImg>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setSettingMsg">确认更改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uploadImg from "@/components/uploadImg";
import { getSetting, setSetting } from "@/api/setting";
import { serverUrl } from "@/serverPath.js";
export default {
  components: {
    uploadImg,
  },
  data() {
    return {
      form: {
        avatar: "",
        siteTitle: "",
        github: "",
        qq: "",
        qqQrCode: "",
        weixin: "",
        weixinQrCode: "",
        mail: "",
        icp: "",
        githubName: "",
        favicon: "",
      },
      updateForm: {},
      dialogVisible: false,
      url: serverUrl,
    };
  },
  created() {
    this.getSettingMsg();
  },
  methods: {
    getSettingMsg() {
      getSetting().then((res) => {
        this.form = res.data;
      });
    },
    editSetting() {
      this.updateForm = { ...this.form };
      this.dialogVisible = true;
      console.log(this.updateForm);
    },
    setSettingMsg() {
      setSetting(this.updateForm).then(() => {
        this.getSettingMsg();
        this.dialogVisible = false;
        this.$message.success("更改成功");
      });
    },
  },
};
</script>

<style scoped>
.app-container {
  width: 30%;
  margin: 0px 30px;
}
.edit {
  margin: 0px 10px;
}
</style>