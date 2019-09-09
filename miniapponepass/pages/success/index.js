// pages/success/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onepassSuccess: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    this.setData({ onepassSuccess: options.op})
  },
  tryagain: function(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  gotoGeetest: function(){
    wx.navigateTo({
      url: '/pages/geetest/index',
    })
  }
})