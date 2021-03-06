// 这是后处理的配置文件
// 我们需要导出我们所写的配置文件，所以此时我们先把文件设置一个导出操作
module.exports = {
  // 设置完完整导出之后，我们根据笔记和文档需求来进行导出操作
  // 首先设置一个plugins对象
  plugins: {
    // 首先我们要设置的是我们在书写css的时候帮我们加上私有前缀
    // 设置'autoprefixer': {},则为自动帮我们加上私有前缀
    'autoprefixer': {},
    // 第二条配置是将我们书写的css代码单位的px值都换成rem值，此时我们再设置一个对象
    'postcss-pxtorem': {
      // 首先我们要先设置一个rem的基准值
      // 主流的标准一般是375px，此时转换成rem则为37.5rem，我们就以37.5为基础
      rootValue: 37.5,
      // 在这里我们需要所有的px都设置成rem值，所以要设置一个全部替换的设置
      // 该属性是一个数组，需要谁替换就加上去，如果是全部就设置一个*即可
      porpList: ['*']
    }
  }
}
