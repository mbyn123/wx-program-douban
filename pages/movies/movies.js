var utils = require('../../utils/utils.js')
var app = getApp()
Page({
  data: {
    intheaters: {},
    comingSoon: {},
    top250: {},
    searchResult:{},
    issearch: false,
    ismovies: true,
    requestUrl: '',
    text:''
  },
  onLoad() {
    var intheatersUrl = app.globalData.doubanUrl + "/v2/movie/in_theaters" + "?start=0&count=3"
    var comingSoonUrl = app.globalData.doubanUrl + "/v2/movie/coming_soon" + "?start=0&count=3"
    var top250Url = app.globalData.doubanUrl + "/v2/movie/top250" + "?start=0&count=3"
    this.getMovielistData(intheatersUrl, "intheaters", "正在热映")
    this.getMovielistData(comingSoonUrl, "comingSoon", "即将上映")
    this.getMovielistData(top250Url, "top250", "豆瓣Top250")
    this.data.requestUrl = top250Url
  },
  getMovielistData(url, settedkey, classify) {
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
        that.processDouBanData(res.data, settedkey, classify)
      },
      fail(error) {

      },
      complete() {}
    })
  },
  processDouBanData(moviedata, settedkey, classify) {
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
        images: subject.images ? subject.images.large : "",
        grade: subject.rating.average,
        id: subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    readyData[settedkey] = {
      movies: movies,
      classify: classify
    }
    this.setData(
      readyData
    )
    wx.hideNavigationBarLoading()
  },
  //显示搜索页面
  onfcors() {
    this.setData({
      issearch: true,
      ismovies: false,
    })
  },
  //搜索
  onSearchMovies(event) {
    var text = event.detail.value
    var searchUrl = app.globalData.doubanUrl + "/v2/movie/search?q=" + text
    this.getMovielistData(searchUrl, "searchResult", "")
    wx.showNavigationBarLoading()
    this.data.requestUrl = searchUrl
    this.data.text = text
  },
  //刷新搜索页面
  onPullDownRefresh(event) {
    var refreshUrl = this.data.requestUrl 
    this.data.movies = {}
    this.data.ismore = true
    this.getMovielistData(refreshUrl)
    // wx.showNavigationBarLoading()
  },

  //取消搜索
  oncancel() {
    this.setData({
      issearch: false,
      ismovies: true,
      searchResult: {},
      text:''
    })
    console.log(this.data.text)
  },
  //点击跳转更多详情页面
  movietap(event) {
    var classifytitle = event.currentTarget.dataset.classifytitle
    wx.navigateTo({
      url: 'more-movie/more-movie?classifytitle=' + classifytitle
    })
  },
  //点击跳转电影详情页面
  onmovieDeatil(event){
    var movieid = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: 'movie-deatil/movie-deatil?movieid=' + movieid
    })
  }

})