// pages/movie-detail/movie-detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    movie: {},
    key: true,
    more: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({id: options.id});
    this.getDetail();
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
  getDetail() {
    let url = app.globalData.doubanBase + app.globalData.movieId + this.data.id;
    wx.request({
      url,
      method: 'GET',
      header: {'content-type': 'json'},
      success: res => {
        console.log(res);
        let data = res.data;
        let movie = {};
        let summary = '';
        movie.image = data.images.large;
        movie.title = data.title;
        movie.desc = data.year + '/' + data.genres.join('/');
        movie.original_title = data.original_title;
        movie.countries = data.countries.join('');
        // movie.rating = data.rating;
        movie.summary= data.summary;
        movie.casts = data.casts;
        movie.count = data.collect_count;
        this.setData({movie});
        this.setData({rating: data.rating});
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  textMore() {
    if (this.data.more) {
      this.setData({more: false});
    } else {
      this.setData({ more: true});
    }
  },
  wantSee() {
    wx.showModal({
      title: '想看？',
      content: '想得美',
    })
  },
  haveSeen() {
    wx.showModal({
      title: '看过？',
      content: '去吧去吧',
    })
  }
})