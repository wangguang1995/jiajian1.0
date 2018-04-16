// pages/answer/answer.js
var timer;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    jindu: 100,
    value:1,
    now:50,
    isJson: [
      {          
        id: 0,
        num1: 7,
        fuhao: "+",
        num2: 6,
        result: 15,
        istrue: false
      }

    ],
    isJson2: [
      {
        id: 1,
        num1: 5,
        fuhao: "+",
        num2: 1,
        result: 6,
        istrue: true
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {

},
  //进度条动画
  progress: function (e) {
    var progressNum = 100;
    var _this = this;
    timer = setInterval(function () {
      progressNum--;
      if (progressNum <= 0) {
        clearInterval(timer);
        wx.showToast({
          title: '挑战失败',
          icon: 'success',
          duration: 2000
        })
      }
      _this.setData({
        jindu: progressNum
      })
    }, _this.data.now)
  },
  //点击事件
  answerTrue: function (e) {
    var num = this.data.value;
    num++;
    if (this.data.isJson[0].istrue == true) {
      this.setData({
        value:num++
      })
      clearInterval(timer);
    } else {
      wx.showToast({
        title: '挑战失败',
        icon: 'none',
        duration: 2000
      })
      clearInterval(timer);
    }
  },
  answerFalse: function (e) {
    var num = this.data.value;
    num++;
    if (this.data.isJson[0].istrue == false) {
      clearInterval(timer);
      this.setData({
        isJson: this.data.isJson2,
        value:num,
        now:this.data.now-20
      })
      console.log(this.data.now);
      
      this.progress();
    } else {
      wx.showToast({
        title: '挑战失败',
        icon: 'success',
        duration: 2000
      })
      clearInterval(timer);
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    timer = setInterval(function(){
      _this.progress();
    },10000)
  },
  start:function(e){
    clearInterval(timer);
    this.progress();
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