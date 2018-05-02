// pages/answer/answer.js
const app = getApp();
var timer;
//算取每一题递减的时间  
function bili(startTime, endTime, answerNumber) {
    var start_time = startTime * 1000 / 100;
    var end_timer = endTime * 1000 / 100;
    var djTime = ((start_time - end_timer) / answerNumber).toFixed(2);
    return { "start_time": start_time, "djTime": djTime };
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        jindu: 100,//进度条
        value: 1,//当前答到第几题
        now: 50,
        zhezhao: false,
        id: "0",//当前题目写的下标
        startTime: null,//开始持续时间
        endTime: null,//结束持续时间
        isFlag: null,//遮罩显示或隐藏
        answerNumber: null,//一共多少道题
        bg: '',//背景图
        isJson: [],
        answerNumber: null,
        shibai:false

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
    returnIndex: function () {
        this.setData({
            isFlag: false
        })
        wx.switchTab({
            url: '../index/index',
        })
    },
    //进度条动画
    progress: function (e) {
        var progressNum = 100;
        var _this = this;
        timer = setInterval(function () {
            progressNum--;
            if (progressNum <= 0) {
                this.audioCtx = wx.createAudioContext('chenggong');
                this.audioCtx.setSrc('http://p82x8el6i.bkt.clouddn.com/shibai.mp3');
                this.audioCtx.play();

                clearInterval(timer);
                _this.setData({
                    isFlag: true,
                    shibai:true
                })
                if (_this.data.shibai == true) {
                    this.audioCtx = wx.createAudioContext('bgAudio')
                    this.audioCtx.setSrc('http://p82x8el6i.bkt.clouddn.com/beijing.mp3')
                    this.audioCtx.pause()
                }
            }
            _this.setData({
                jindu: progressNum
            })
        }, _this.data.now)
    },
    //点击事件
    answerTrue: function (e) {
        var startTime = this.data.startTime;
        var endTime = this.data.endTime;
        var answerNumber = this.data.answerNumber;
        var dj_time = bili(startTime, endTime, answerNumber).djTime;
        var num = this.data.value;
        console.log(this.data.now)
        num++;
        
        var id = this.data.id;
        id++;
        
        if (id == answerNumber) {
            this.audioCtx = wx.createAudioContext('bgAudio')
            this.audioCtx.setSrc('http://p82x8el6i.bkt.clouddn.com/beijing.mp3')
            this.audioCtx.pause()
            clearInterval(timer);
            var openId = wx.getStorageSync('openId');
            app.util.request({
                'url': 'entry/wxapp/clearance',
                data: {
                    openId: openId
                },
                success(res) {
                    console.log(res);

                }
            })
            app.util.request({
                'url': 'entry/wxapp/record',
                data: {
                    openId: openId,
                    record: num - 1
                },
                success(res) {
                    console.log(res);
                    wx.setStorageSync('record', res.data.record);
                }
            })
            wx.showModal({
                title: '提示',
                content: '恭喜你，挑战成功',
                success: function (res) {
                    if (res.confirm) {
                        wx.switchTab({
                            url: '../index/index',
                        })
                    } else if (res.cancel) {
                        wx.switchTab({
                            url: '../index/index',
                        })
                    }
                }
            })

        } else {
            clearInterval(timer);
            if (this.data.isJson[this.data.id].is_yes == "1") {
                console.log(timer)
                this.setData({
                    value: num++,
                    id: id,
                    now: this.data.now - dj_time
                })
                this.progress();
                this.audioCtx = wx.createAudioContext('chenggong')
                this.audioCtx.setSrc('http://p82x8el6i.bkt.clouddn.com/chenggong.mp3')
                this.audioCtx.play()
            } else {
                this.progress();
                this.audioCtx = wx.createAudioContext('chenggong')
                this.audioCtx.setSrc('http://p82x8el6i.bkt.clouddn.com/shibai.mp3')
                this.audioCtx.play()
                var openId = wx.getStorageSync('openId');
                app.util.request({
                    'url': 'entry/wxapp/record',
                    data: {
                        openId: openId,
                        record: num - 1
                        
                    },
                    success(res) {
                        console.log(res);
                        wx.setStorageSync('record', res.data.record);
                    }
                })
                clearInterval(timer);
                this.setData({
                    isFlag: true,
                    shibai: true
                })
                if (this.data.shibai == true) {
                    this.audioCtx = wx.createAudioContext('bgAudio')
                    this.audioCtx.setSrc('http://p82x8el6i.bkt.clouddn.com/beijing.mp3')
                    this.audioCtx.pause()
                }

            }

        }


    },
    answerFalse: function (e) {
        var startTime = this.data.startTime;
        var endTime = this.data.endTime;
        var answerNumber = this.data.answerNumber;
        var di_time = bili(startTime, endTime, answerNumber).djTime;
        console.log(this.data.now)
        var num = this.data.value;
        num++;
        var _this = this;
        var id = this.data.id;
        id++;
        if (id == answerNumber) {
            this.audioCtx = wx.createAudioContext('bgAudio')
            this.audioCtx.setSrc('http://p82x8el6i.bkt.clouddn.com/beijing.mp3')
            this.audioCtx.pause()
            clearInterval(timer);
            wx.showModal({
                title: '提示',
                content: '恭喜你，挑战成功',
                success: function (res) {
                    if (res.confirm) {
                        wx.switchTab({
                            url: '../index/index',
                        })
                    } else if (res.cancel) {
                        wx.switchTab({
                            url: '../index/index',
                        })
                    }
                }
            })
            var openId = wx.getStorageSync('openId');
            app.util.request({
                'url': 'entry/wxapp/clearance',
                data: {
                    openId: openId
                },
                success(res) {
                    console.log(res);

                }
            })
            app.util.request({
                'url': 'entry/wxapp/record',
                data: {
                    openId: openId,
                    record: num - 1
                },
                success(res) {
                    console.log(res);
                    wx.setStorageSync('record', res.data.record);
                }
            })
        } else {
            clearInterval(timer);
            if (this.data.isJson[this.data.id].is_yes == "0") {
                clearInterval(timer);
                this.setData({
                    id: id,
                    value: num,
                    now: this.data.now - di_time
                })
                this.audioCtx = wx.createAudioContext('chenggong')
                this.audioCtx.setSrc('http://p82x8el6i.bkt.clouddn.com/chenggong.mp3')
                this.audioCtx.play()
                this.progress();
            } else {
                clearInterval(timer);
                this.audioCtx = wx.createAudioContext('chenggong')
                this.audioCtx.setSrc('http://p82x8el6i.bkt.clouddn.com/shibai.mp3')
                this.audioCtx.play()
                var openId = wx.getStorageSync('openId');
                app.util.request({
                    'url': 'entry/wxapp/record',
                    data: {
                        openId: openId,
                        record: num - 1
                        
                    },
                    success(res) {
                        console.log(res);
                        wx.setStorageSync('record', res.data.record);
                    }
                })
                
                this.setData({
                    isFlag: true,
                    shibai: true
                })
                if (this.data.shibai == true) {
                    this.audioCtx = wx.createAudioContext('bgAudio')
                    this.audioCtx.setSrc('http://p82x8el6i.bkt.clouddn.com/beijing.mp3')
                    this.audioCtx.pause()
                }

            }
        }

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log(this.data.shibai);
        
       
            this.audioCtx = wx.createAudioContext('bgAudio')
            this.audioCtx.setSrc('http://p82x8el6i.bkt.clouddn.com/beijing.mp3')
            this.audioCtx.play()
        
        var bg = wx.getStorageSync('bg');
        var uniacid = wx.getStorageSync('uniacid');
        console.log(bg)
        this.setData({
            bg: bg
        })
        var _this = this;
        app.util.request({
            'url': 'entry/wxapp/answer',
            data: {
                m: "aishang_jzmaster",
                uniacid: uniacid
            },
            success(res) {
                console.log(res);
                _this.setData({
                    isJson: res.data.data.question,
                    startTime: res.data.data.sysInfo.answer_time,
                    endTime: res.data.data.sysInfo.end_time,
                    answerNumber: res.data.data.sysInfo.answer_number,
                    now: bili(res.data.data.sysInfo.answer_time, res.data.data.sysInfo.end_time, res.data.data.sysInfo.answer_number).start_time
                })

            }

        })

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