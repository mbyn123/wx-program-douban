// pages/movies/more-movie/more-movie.js
var utils = require('../../../utils/utils.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitle: '',
    movies: {},
    requestUrl: '',
    count: 0,
    ismore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var classifytitle = options.classifytitle
    console.log(classifytitle)
    this.data.navigationBarTitle = classifytitle
    var dataurl = ""
    switch (classifytitle) {
      case "正在热映":
        dataurl = app.globalData.doubanUrl + "/v2/movie/in_theaters"
        break;
      case "即将上映":
        dataurl = app.globalData.doubanUrl + "/v2/movie/coming_soon"
        break;
      case "豆瓣Top250":
        dataurl = app.globalData.doubanUrl + "/v2/movie/top250"
        break;
    }
    this.getMovielistData(dataurl)
    this.data.requestUrl = dataurl
  },
  //下拉加载更多
  onReachBottom(event) {
    //拼接请求url
    var nextUrl = this.data.requestUrl + "?start=" + this.data.count + "&count=20"
    this.getMovielistData(nextUrl)
    wx.showNavigationBarLoading()
  },
  //点击跳转电影详情页面
  onmovieDeatil(event) {
    var movieid = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-deatil/movie-deatil?movieid=' + movieid,
    })
  },
  //上拉刷新
  onPullDownRefresh(event) {
    var refreshUrl = this.data.requestUrl + "?start=0&count=20"
    this.setData({
      movies: {},
      ismore: true
    })

    this.getMovielistData(refreshUrl)
    wx.showNavigationBarLoading()
  },

  getMovielistData(url) {
    var that = this
    wx.request({
      url: url,
      data: {},
      methods: 'GET', //POST PUT DELEFE OPTIONS HEAD
      header: {
        "Content-type": ""
      },
      success(res) {
        // console.log(res)
        that.processDouBanData(res.data)
      },
      fail(error) {

      },
      complete() {}
    })
  },
  processDouBanData(moviedata) {
    var movies = []
    for (var idx in moviedata.subjects) {
      var subject = moviedata.subjects[idx];
      var title = subject.original_title
      if (title.length > 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        title: title,
        stars: utils.moviestar(subject.rating.stars),
        images: subject.images.large,
        grade: subject.rating.average,
        id: subject.id
      }
      movies.push(temp)
    }
    //将加载的数据加到之前请求的的数据中
    var moreMovies = {}
    if (!this.data.ismore) {
      moreMovies = this.data.movies.concat(movies) //使用数组中的concat方法连接每次请求的数据数组
    } else {
      moreMovies = movies
      this.data.ismore = false
    }
    this.data.count += 20
    this.setData({
      movies: moreMovies
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  //动态显示标题栏文字
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.navigationBarTitle
    })
  },


})