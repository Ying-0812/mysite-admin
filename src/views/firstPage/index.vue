<template>
  <div class="firstPage">
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column label="序号" align="center" width="100%">
        <template slot-scope="scope">{{ scope.$index + 1 }} </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        align="center"
        width="180%"
      ></el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        align="center"
        width="788%"
      ></el-table-column>
      <el-table-column
        label="中图预览"
        align="center"
        width="200%"
      >
        <template slot-scope="scope">
          <el-image style="width: 100px" :src="scope.row.midImg2" :preview-src-list="srcList"></el-image
        ></template>
      </el-table-column>
      <el-table-column
        label="大图预览"
        align="center"
        width="200%"
      >
        <template slot-scope="scope"
          ><el-image style="width: 100px" :src="scope.row.bigImg2" :preview-src-list="srcList"></el-image
        ></template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200%">
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
              @click="editBanner(scope.row)"
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
      <el-form ref="form" :model="msgForm">
        <el-form-item label="标题">
          <el-input v-model="msgForm.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="msgForm.description"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12"
            ><div style="margin-bottom: 10px">首页中图</div>
            <uploadImg v-model="msgForm.midImg"
          /></el-col>
          <el-col :span="12"
            ><div style="margin-bottom: 10px">首页大图</div>
            <uploadImg v-model="msgForm.bigImg"
          /></el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateBanner">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uploadImg from "@/components/uploadImg";
import { getBanner, postBanner } from "@/api/banner";
import { serverUrl } from "@/serverPath.js";
export default {
  components: {
    uploadImg,
  },
  data() {
    return {
      dataList: [],
      srcList:[],
      dialogVisible: false,
      msgForm: {
        title: "",
        description: "",
        midImg: "",
        bigImg: "",
      },
    };
  },
  mounted() {
    this.getBannerList();
  },
  methods: {
    getBannerList() {
      getBanner().then((res) => {
        this.dataList = res.data;
        for (let item of this.dataList) {
          item.midImg2 = serverUrl + item.midImg;
          item.bigImg2 = serverUrl + item.bigImg;
          this.srcList.push(item.midImg2,item.bigImg2);
        }
      });
    },
    editBanner(data) {
      this.msgForm = { ...data };
      this.dialogVisible = true;
    },
    updateBanner() {
      let newArr = [...this.dataList];
      for (var i = 0; i < newArr.length; i++) {
        if (newArr[i]._id === this.msgForm._id) {
          newArr[i] = this.msgForm;
        }
      }
      postBanner(newArr).then(() => {
        this.dialogVisible = false;
        this.$message.success("修改成功");
        this.getBannerList();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.firstPage {
  margin: 30px 20px;
}
</style>