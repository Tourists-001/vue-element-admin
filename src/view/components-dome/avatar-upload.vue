<template>
  <div class="components-container">
    <aside>
      This is based on
      <a class="link-type" href="//github.com/dai-siki/vue-image-crop-upload">
        vue-image-crop-upload
      </a>
      . Since I was using only the vue@1 version, and it is not compatible with
      mockjs at the moment, I modified it myself, and if you are going to use
      it, it is better to use official version.
    </aside>
    <panThumb :image="image" />
    <el-button type="primary" icon="el-icon-upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">
      Change Avatar
    </el-button>
  </div>
</template>

<script>
import panThumb from '@/components/PanThumb'
export default {
  components: { panThumb },
  data() {
    return {
      imagecropperShow: false,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  }
}
</script>

<style></style>
