<template>
  <div class="home">
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    //退出
    logout() {
      //清空token
      window.sessionStorage.clear()
      //重定向到login页面
      this.$router.push('login')
    },
  },
}
</script>

<style lang="less" scoped>
</style>