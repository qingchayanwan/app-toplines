<template>
 <div class="container">
   <!-- 我们给搜索组件设置一个头部标签导航，left-arrow为左边的提示图标，改图标是个x图标
    click-left则是左边点击图标的点击事件，当点击则返回上一级路由
    -->
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()" />
  </div>
</template>

<script>
export default {
  name: 'search-index'
}
</script>

<style lang="less" scoped>
</style>
