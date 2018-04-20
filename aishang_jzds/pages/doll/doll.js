// aishang_jzds/pages/doll/doll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr:{
        index:0,
        index2:0
    },
    wawa:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  getDoll:function(e){
      var detaid = e.currentTarget.id;
      var obj = {};
      obj.index = detaid;
      obj.index2 = detaid;
      this.setData({
          tabArr:obj
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
      var wawa = wx.getStorageSync('wawa');
      
      console.log(wawa);
      this.setData({
            wawa:wawa
      })
  },
  goWawa:function(e){
      var canGet = wx.getStorageSync('canGet');
      console.log(canGet);
      if(canGet <= 0){
          wx.showModal({
              title: '没有领取机会，请前往答题',

              success: function (res) {
                  if (res.confirm) {
                      wx.switchTab({
                          url: '../index/index'
                      })
                  } else if (res.cancel) {
                      console.log('用户点击取消')
                  }
              }
          })
      }else{
          wx.navigateTo({
              url: '../address/address?id=' + e.currentTarget.id,
          })
      }
      
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
  
  }
})