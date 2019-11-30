<template>
 <!-- div的class类名是根据笔记来写的 -->
   <div class="page-user-chat">
     <!-- flxed是固定定位， left-arrow是一个x的字体图标， click-left是左边的点击按钮title是标题 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="登录"></van-nav-bar>
  </div>
</template>

<script>
export default {
  // 登录组件
  name: 'login'
}
</script>

<style lang="less" scoped>
</style>
