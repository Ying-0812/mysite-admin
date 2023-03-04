<template>
  <div class="app-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名">
        <el-input
          v-model="ruleForm.name"
          autocomplete="new-password"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input
          v-model="ruleForm.oldLoginPwd"
          show-password
          autocomplete="new-password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="loginPwd">
        <el-input
          v-model="ruleForm.loginPwd"
          show-password
          type="password"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="loginPwdSure">
        <el-input
          v-model="ruleForm.loginPwdSure"
          show-password
          type="password"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即更改</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateAdmin } from "@/api/user";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.loginPwdSure !== "") {
          this.$refs.ruleForm.validateField("loginPwdSure");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.loginPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        loginId: "admin",
        loginPwd: "",
        oldLoginPwd: "",
        loginPwdSure: "",
      },
      rules: {
        oldLoginPwd: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        loginPwd: [
          {
            validator: validatePass,
            required: true,
            trigger: "blur",
          },
        ],
        loginPwdSure: [
          {
            validator: validatePass2,
            required: true,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            name: this.ruleForm.name,
            loginId: this.ruleForm.loginId,
            loginPwd: this.ruleForm.loginPwd,
            oldLoginPwd: this.ruleForm.oldLoginPwd,
          };
          updateAdmin(obj).then((res) => {
            if (typeof res == "object") {
              this.$message.success("修改成功");
              this.resetForm("ruleForm");
              this.$store.dispatch("user/logout").then(() => {
                this.$router.push("/login");
              });
            } else {
              let resp = JSON.parse(res);
              this.$message.error(resp.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.app-container {
  width: 28%;
  margin: 50px 25px;
}
</style>