// pages/home/home.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        bg:"",
        tabArr: {
            curHdIndex: 0,
            curBdIndex: 0
        },
        isTrue: null,
        rongyu: null,//荣誉排行
        yili: null,//毅力排行
        wawa: null,//娃娃数据
        number: null,//答对多少道题
        share_group:null,//分享一次，获得多少次机会
        share:null//每天分享群的次数
    },
    display: function (e) {
        this.setData({
            isTrue: true
        })

    },
    displayHide: function (e) {
        this.setData({
            isTrue: false
        })
    },
    //tab切换
    listSwitching: function (e) {
        var dataId = e.currentTarget.id;
        var obj = {};
        obj.curHdIndex = dataId;
        obj.curBdIndex = dataId;
        this.setData({
            tabArr: obj
        })
    },
    //答题按钮
    answer: function (e) {
        var openId = wx.getStorageSync('openId');
        if(openId == "" ||openId == null){
            app.getInfo();
        }else{
            app.util.request({
                'url': 'entry/wxapp/reduce',
                data: {
                    openId: openId
                },
                success(res) {
                    console.log(res);
                    wx.setStorageSync('surplus_number', res.data.data.surplus_number);
                    wx.setStorageSync('answer_number', res.data.data.answer_number);
                }
            })
            var answer_number = wx.getStorageSync('answer_number');
            console.log(answer_number);
            wx.redirectTo({
                url: '../transfer/transfer'
            })
        }
        
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
    //领取娃娃按钮
    jinru:function(){
        wx.navigateTo({
            url: '../doll/doll',
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        app.getInfo();
        var _this = this;
        app.util.request({
            url: 'entry/wxapp/SysInfo',
            'cachetime': '30',
            success:function(res) {
                console.log(res);
                if (res.data.data.sysInfo.share_number ==0){
                    _this.setData({
                        share:"每天可以分享不同的群"
                    })
                }else{
                    _this.setData({
                        share: "每天可以分享" + res.data.data.sysInfo.share_number + "次群"
                    })
                }
                _this.setData({
                    rongyu:res.data.data.rongyu,
                    yili:res.data.data.yili,
                    num:res.data.data.sysInfo.challenge_time,
                    title: res.data.data.sysInfo.title,
                    wawa:res.data.data.prize,
                    bg:res.data.data.sysInfo.bg,
                    number: res.data.data.sysInfo.answer_number,
                    share_group: res.data.data.sysInfo.share_group
                })
                wx.setStorageSync('wawa', res.data.data.prize);
                wx.setStorageSync('number', res.data.data.sysInfo.answer_number);
                wx.setStorageSync('answer_time', res.data.data.sysInfo.answer_time);//开始时间
                wx.setStorageSync('end_time', res.data.data.sysInfo.end_time);//结束时间
                wx.setStorageSync('bg', res.data.data.sysInfo.bg);

            }
        })
        wx.showShareMenu({
            withShareTicket: true,
        })
    
    },
    
    onShareAppMessage: function (res) {
        let that = this
        return {
            title: '加减大师',
            path: '/aishang_jzds/pages/index/index',
            success: function (res) {
                //getSystemInfo是为了获取当前设备信息，判断是android还是ios，如果是android
                //还需要调用wx.getShareInfo()，只有当成功回调才是转发群，ios就只需判断shareTickets

                wx.getSystemInfo({
                    success: function (d) {
                        console.log(d);
                        if (d.platform == 'android') {
                            console.log(1)
                            wx.getShareInfo({
                                shareTicket: res.shareTickets,
                                success: function (res) {
                                    console.log(res);
                                    console.log(2);
                                    var openId = wx.getStorageSync('openId');
                                    var session3rd = wx.getStorageSync('session3rd');
                                    app.util.request({
                                        url: 'entry/wxapp/Increase',
                                        data: {
                                            openId: openId,
                                            session3rd: session3rd,
                                            iv: res.iv,
                                            encryptedData: res.encryptedData
                                        },
                                        success: function (res) {
                                            console.log(res);
                                            var surplus_number = wx.getStorageSync('surplus_number');
                                            wx.setStorageSync('surplus_number', (parseInt(surplus_number) + 2));
                                            wx.showModal({
                                                title: '提示',
                                                content: res.data.message,
                                                showCancel: false,
                                                success: function (res) {
                                                    if (res.confirm) {
                                                        console.log('用户点击确定')
                                                    } else if (res.cancel) {
                                                        console.log('用户点击取消')
                                                    }
                                                }
                                            })

                                        }
                                    })
                                },
                                fail: function (res) {
                                    wx.showModal({
                                        title: '提示',
                                        content: '分享好友无效，请分享群',
                                        success: function (res) {
                                            if (res.confirm) {
                                                console.log('用户点击确定')
                                            } else if (res.cancel) {
                                                console.log('用户点击取消')
                                            }
                                        }
                                    })
                                }
                            })
                        }
                        if (d.platform == 'ios') {
                            if (res.shareTickets != undefined){
                                console.log("分享的是群");
                                console.log(res.shareTickets);
                                var openId = wx.getStorageSync('openId');
                                var session3rd = wx.getStorageSync('session3rd');
                                app.util.request({
                                    url: 'entry/wxapp/Increase',
                                    data: {
                                        openId: openId,
                                        session3rd: session3rd,
                                        iv: res.iv,
                                        encryptedData: res.encryptedData
                                    },
                                    success: function (res) {
                                        console.log(res);
                                        var surplus_number = wx.getStorageSync('surplus_number');
                                        wx.setStorageSync('surplus_number', (parseInt(surplus_number) + 2));
                                        wx.showModal({
                                            title: '提示',
                                            content: res.data.message,
                                            showCancel: false,
                                            success: function (res) {
                                                if (res.confirm) {
                                                    console.log('用户点击确定')
                                                } else if (res.cancel) {
                                                    console.log('用户点击取消')
                                                }
                                            }
                                        })

                                    }
                                })
                            }else{
                                console.log("分享的是个人");
                                wx.showModal({
                                    title: '提示',
                                    content: '分享好友无效，请分享群',
                                    success: function (res) {
                                        if (res.confirm) {
                                            console.log('用户点击确定')
                                        } else if (res.cancel) {
                                            console.log('用户点击取消')
                                        }
                                    }
                                })
                            }
                        }
                            
                    },
                    fail: function (res) {
                        wx.showToast({
                            title: "转发失败",
                            duration: 2000
                        });
                    }
                })
            },
            fail: function (res) {
                // 转发失败
            }
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
    onReachBottom: function (res) {

    }
})