//app.js
import util from 'we7/resource/js/util.js';
App({
  
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this;
    wx.login({
      success: res => {
        var code = res.code;
        wx.getUserInfo({
          success: res => {
            var userInfo = res.userInfo;
            this.globalData.userInfo = res.userInfo;
            console.log(res)
            util.request({
              'url': 'entry/wxapp/log',
              'data': {
                code: code,
                encryptedData: res.encryptedData,
                iv: res.iv,
              },
              'cachetime': '30',
              success: function (res) {
                console.log(res.data.data.session3rd)
                try {
                  wx.setStorageSync('s3rd', res.data.data.session3rd)
                  that.setData({
                    s3rd: res.data.data.session3rd
                  })
                } catch (e) {

                }
              }
            })
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
  })  
    
  },  
  onShow: function () {
  },
  onHide: function () {
  },
  onError: function (msg) {
    console.log(msg)
  },
  util: util,
  globalData: {
    userInfo: null,
    s3rd: 333
  },
  siteInfo: require('siteinfo.js')
});