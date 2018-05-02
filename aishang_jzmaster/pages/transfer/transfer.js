// pages/transfer/transfer.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        animationData: {},
        num: 3,
        num2: 3,
        src:''
        
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
                }, 1500)

            }

            _this.setData({
                num2: num
            })

        }, 1000)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (e) {
        // 使用 wx.createAudioContext 获取 audio 上下文 context
        this.audioCtx = wx.createAudioContext('myAudio');   
        this.audioCtx.setSrc('http://p82x8el6i.bkt.clouddn.com/321gogo.mp3');
        this.audioCtx.play();
    },
    audioPlay: function () {
        this.audioCtx.play()
    },
    audioPause: function () {
        this.audioCtx.pause()
    },
    audio14: function () {
        this.audioCtx.seek(14)
    },
    audioStart: function () {
        this.audioCtx.seek(0)
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

    }
})