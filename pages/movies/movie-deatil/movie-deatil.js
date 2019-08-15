// pages/movies/movie-deatil/movie-deatil.js
var utils = require('../../../utils/utils.js')
var app = getApp()
Page({
  data: {
    movies:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var movieid = options.movieid
    var url = app.globalData.doubanUrl+ "/v2/movie/subject/"+movieid
    this.getMovielistData(url)
  
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
      complete() { }
    })
  },
  processDouBanData(moviedata, settedkey, classify) {
    var movies ={
      originaltitle: moviedata.original_title,
      countries: moviedata.countries.join([]),
      year: moviedata.year,
      wishCount: moviedata.wish_count,
      comments: moviedata.comments_count,
      title: moviedata.title,
      averge: moviedata.rating.average,
      stars: utils.moviestar(moviedata.rating.stars) ,
      director: utils.ondirectors(moviedata.directors),
      grenres: moviedata.genres.join(",") ,
      summary: moviedata.summary,
      castsname: utils.castsname(moviedata.casts),
      castsimg: utils.cancatImg(moviedata.casts),
      movieimg: moviedata.images ? moviedata.images.large:""
    }
   this.setData({
     movies:movies
   })

    wx.hideNavigationBarLoading()
   
  },
//查看图片
  onMovieImg(event){
    var src = event.currentTarget.dataset.src
    wx.previewImage({
      current: 'src', // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  }

})