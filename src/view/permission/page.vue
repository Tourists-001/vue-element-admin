<template>
  <div class="app-contaienr">
    <switch-roles @change="headleRoleChange" />
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'
export default {
  components: {
    SwitchRoles
  },
  methods: {
    headleRoleChange() {
      this.$router.push({ path: '/permission/index?' + +new Date() })
    }
  }
}
</script>

<style></style>
