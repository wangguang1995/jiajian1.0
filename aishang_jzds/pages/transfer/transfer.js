// pages/transfer/transfer.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        animationData: {},
        num: 3,
        num2: 3
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    animation: function () {
        var animation = wx.createAnimation({
            duration: 3000,
            timingFunction: 'linear',
        })
        this.animation = animation;
        animation.scale(0.5, 0.5).step();
        var timer = setTimeout(function () {
            animation.scale(0.5, 0.5).step();
            this.setData({
                animationData: animation.export(),
            })

        }.bind(this), 1000);

    },
    tranfer: function (e) {
        var num = 3;
        var _this = this;
        var timer = setInterval(function () {
            num--;

            if (num < 1) {
                num = 'GO';
                clearInterval(timer);
                var a = setTimeout(function () {
                    wx.redirectTo({
                        url: '../answer/answer',
                    })
                }, 1000)

            }

            _this.setData({
                num2: num
            })

        }, 1000)
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
        this.animation();
        this.tranfer();
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