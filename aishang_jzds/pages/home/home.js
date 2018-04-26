//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        isTrue: false,
        answer_number:"",//答题次数
        surplus_number:"",//剩余挑战次数
        clearance_number:"",//通关次数
        record:""//最高分

    },

    onLoad: function () {
        app.getInfo();
        if (app.globalData.userInfo != null) {
            this.setData({
                userInfo: app.globalData.userInfo
            })
        }
    },
    //遮罩显示
    indexShare: function (e) {
        this.setData({
            isTrue: true
        })
    },
    //遮罩隐藏
    indexHide: function (e) {
        this.setData({
            isTrue: false
        })
    },
    //分享
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
                            if (res.shareTickets != undefined) {
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
                            } else {
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
    
    onShow: function () {
        wx.showShareMenu({
            withShareTicket: true,
            success: function (res) {

            },
            fail: function (res) {
                // 分享失败
                console.log(res)
            }
        })
        var _this = this;
        
        var answer_number = wx.getStorageSync('answer_number');
        var clearance_number = wx.getStorageSync('clearance_number');
        var surplue_number = wx.getStorageSync('surplus_number');
        var prize_number = wx.getStorageSync('prize_number');
        var record = wx.getStorageSync('record');
        var canGet = wx.getStorageSync('canGet');
        
        _this.setData({
            answer_number: answer_number,
            clearance_number: clearance_number,
            surplus_number: surplue_number,
            num: prize_number,
            record:record,
            canGet:canGet
        })
        
    }
})
