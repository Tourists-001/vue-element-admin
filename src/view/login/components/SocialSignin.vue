<template>
  <div class="social-signup-container">
    <div class="sign-btn" @click="wechatHandleClick('wechart')">
      <span class="vx-svg-container">
        <svg-icon icon-class="wechat" class="icon" />
      </span>
      Wechart
    </div>
    <div class="sign-btn" @click="tencentHandleClick('tencent')">
      <span class="qq-svg-container">
        <svg-icon icon-class="qq" class="icon" />
      </span>
      QQ
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialSignin',
  methods: {
    wechatHandleClick() {
      alert('ok')
    },
    tencentHandleClick() {
      alert('ok')
    }
  }
}
</script>

<style lang="scss" scoped>
.social-signup-container {
  margin: 20px 0;
  .sign-btn {
    display: inline-block;
    cursor: pointer;
  }
  .icon {
    color: #fff;
    font-size: 24px;
    margin-top: 8px;
  }
  .vx-svg-container,
  .qq-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-right: 5px;
  }
  .vx-svg-container {
    background-color: #24da70;
  }
  .qq-svg-container {
    background-color: #6ba2d6;
    margin-left: 50px;
  }
}
</style>
