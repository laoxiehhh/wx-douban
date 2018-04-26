// pages/movie-more/movie-more.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showing: false,
    coming: false,
    intheaters: {},
    comingSoon: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.typeId == 'showing') {
      this.toShowing();
    } else {
      this.toComing();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  toShowing() {
    if (this.data.showing == true) {
      return;
    } else {
      this.setData({showing: true, coming: false});
      if (!this.data.intheaters.movies) {
        this.getMovieList('intheaters');
      }
    }
  },
  toComing() {
    if (this.data.coming == true) {
      return;
    } else {
      this.setData({showing: false, coming: true});
      console.log(this.data.comingSoon.movies)
      if (!this.data.comingSoon.movies) {
        this.getMovieList('comingSoon');
      }
    }
  },
  getMovieList(_type) {
    let url = app.globalData.doubanBase + app.globalData[_type];
    let start = this.data[_type].start || 0;
    let count = 5;
    let movies = this.data[_type].movies || [];
    let total = this.data[_type].total || 9999;
    if (start < total) {
      wx.request({
        url,
        method: 'GET',
        header: { 'content-type': 'json' },
        data: { start, count },
        success: res => {
          res.data.subjects.forEach(ele => {
            let movie = {};
            movie.title = ele.title;
            movie.director = ele.directors.map(i => i.name).join("");
            movie.casts = ele.casts.map(i => i.name).join('/');
            movie.genres = ele.genres.join('/');
            movie.image = ele.images.medium;
            movie.id = ele.id;
            movie.count = ele.collect_count;
            movie.rating = ele.rating;
            movies.push(movie);
          });
          this.setData({
            [_type]: {
              movies,
              start: start + res.data.subjects.length,
              total: res.data.total
            }
          })
        },
        fail: err => {
          console.log(err);
        }
      });
    } 
  },
  loadMore() {
    if (this.data.showing) {
      this.getMovieList('intheaters');
    } else {
      this.getMovieList('comingSoon');
    }
  },
  toDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id,
    })
  }
})