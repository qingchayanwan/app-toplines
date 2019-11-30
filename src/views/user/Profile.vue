<template>
<!-- class类选择器的名字是根据文档获取的 -->
  <div class="page-user-profile">
    <!-- left-arrow是左边的图标，click-left是左边图标的点击事件，title是标题，right-text是右边的
    问题提示内容，如果入arrow则是图标，text则是我们需要给文字提示信息，click-right是右边的点击事件
     -->
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存" @click-right="save()"></van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'user-profile',
  methods: {
    save () {
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
