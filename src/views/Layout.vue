<template>
    <!-- 路由规则以及懒加载设置完毕之后，开始使用vue的移动布局插件，vant
        使用npm i vant -S来进行插件的下载，下载完毕后我们在main.js里面进行相关的配置工作
     -->
     <div class="container">
    <!-- 当路由地址（path === $route.path）不是`我的`才显示 -->
    <!-- 我们使用vant组件库中的导航来设置黑马头条的nav标题 -->
    <!-- fixed是固定定位，title是该nav标题的内容， right-text是右边按钮的文字提示 -->
    <!-- click-right是右边提示文字的点击事件 -->
    <van-nav-bar fixed title="黑马头条" right-text="搜索"
      @click-right="$router.push('/search')"/>
    <div class="my-wrapper">
      <router-view></router-view>
    </div>
    <van-tabbar route>
      <!-- 该底部导航也是从vant组件库里面获取的，to是需要跳转的路由地址
        icon则是字体图标
       -->
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question"  icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video"  icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user"  icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
