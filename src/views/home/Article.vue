<template>
   <div class='container'>
     <!-- fixed是固定定位，left-arrow则是左边的点击事件，title是标题 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="文章详情"></van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'home-article'
}
</script>

<style lang="less" scoped>
</style>
