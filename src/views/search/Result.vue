<template>
  <!-- class样式是根据笔记来写的 -->
  <div class="container">
    <!-- title是标题，left-arrow是左边的x图标，click-left是左边图标的点击事件，$router.back()"
    是返回上一级路由的意思
     -->
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" />
  </div>
</template>

<script>
export default {
  name: 'search-result'
}
</script>

<style lang="less" scoped>
</style>
