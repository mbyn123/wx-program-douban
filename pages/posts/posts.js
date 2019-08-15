// pages/posts/posts.js

var postsData= require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ posts_key: postsData.postlist })
   
  },

   //跳转下级详情页
  postTap(event){
    var postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  },
 
 //轮播图跳转详情页面
  swiperTap(event){
    var postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  }


})