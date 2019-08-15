// pages/posts/post-detail/post-detail.js

var postsData = require("../../../data/posts-data.js")
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    isplayMusic: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id
    this.data.currentpostId = postId
    var post = postsData.postlist[this.data.currentpostId]
    this.setData({ ...post
    })

    //使用缓存，来进行收藏功能 
    var postcollects = wx.getStorageSync('postcollects')
    if (postcollects) {
      var collected = postcollects[this.data.currentpostId]
      if (collected) {
        this.setData({
          collected: postcollects
        })
      }
    } else {
      var postcollects = {}
      postcollects[postId] = false
      wx.setStorageSync('postcollects', postcollects)
    }
    if (app.globalData.g_isplayMusic && app.globalData.g_isplayMusicId === this.data.currentpostId) { //全局变量app
      this.setData({
        isplayMusic: true
      })
    }
    this.setAudio()

  },
  //音乐监听
  setAudio() {
    wx.onBackgroundAudioPause(() => { //暂停状态
      this.setData({
        isplayMusic: false
      })
      app.globalData.g_isplayMusic = false
      app.globalData.g_isplayMusicId = null
    })
    wx.onBackgroundAudioPlay(() => { //播放状态
      this.setData({
        isplayMusic: true
      })
      app.globalData.g_isplayMusic = true
      app.globalData.g_isplayMusicId = this.data.currentpostId
    })
    wx.onBackgroundAudioStop(()=>{//停止状态
      this.setData({
        isplayMusic: false
      })
      app.globalData.g_isplayMusic = false
      app.globalData.g_isplayMusicId = null
    })
  },

  //点击收藏
  onsetstorage() {
    // wx.showToast({
    //   title: collected?'收藏成功':'取消成功',
    //   icon: 'success',
    //   duration: 1000
    // })
    var postcollcets = wx.getStorageSync('postcollects')
    var collected = postcollcets[this.data.currentpostId]
    wx.showModal({
      // title: '提示',
      content: collected ? '是否取消收藏' : '是否收藏',
      confirmText: '确定',
      cancelText: '取消',
      showCancel: true,
      success: (res) => { //使用箭头函数修改this的指向问题
        if (res.confirm) {
          collected = !collected
          postcollcets[this.data.currentpostId] = collected
          wx.setStorageSync('postcollects', postcollcets)
          this.setData({
            collected
          })
        } else if (res.cancel) {}
      }
    })
  },

  //点击分享
  onshare(event) {
    var itemlist = ['分享到朋友圈', '分享给微信好友', '分享到微博']
    wx.showActionSheet({
      itemList: itemlist,
      itemColor: '#405F80',
      success(res) {
        //res.cancel 用户是不是点击了取消按钮
        //res.tapIndex 数组元素的序号，从0开始 点击的哪个功能
        wx.showModal({
          title: '是否' + itemlist[res.tapIndex],
          //  content:,
        })
      }
    })
  },
  //点击音乐
  onMusic(event) {
    var postid = this.data.currentpostId //获取data数据的id
    var isplayMusic = this.data.isplayMusic
    if (isplayMusic) { //播放
      wx.pauseBackgroundAudio()
      this.setData({
        isplayMusic: false
      })
    } else { //暂停
      wx.playBackgroundAudio({
        dataUrl: postsData.postlist[postid].music.url,
        title: postsData.postlist[postid].music.title,
        coverImgUrl: postsData.postlist[postid].music.img,
      })
      this.setData({
        isplayMusic: true
      })

    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})