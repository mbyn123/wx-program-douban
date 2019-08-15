Page({
  tapnext:function(){
    //路由api
  //   wx.navigateTo({
  //     url: '../posts/posts',
  //   })

    // wx.redirectTo({
    //   url: '../posts/posts',
    // })

  // 带有tab栏页面跳转使用switchTab
    wx.switchTab({
      url: '../posts/posts',
    })
  }
})