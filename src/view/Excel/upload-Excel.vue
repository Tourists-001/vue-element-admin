<template>
  <div class="app-container">
    <UploadExcel :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script>
import UploadExcel from '@/components/UploadExcel'
export default {
  components: { UploadExcel },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    }
  }
}
</script>

<style></style>
