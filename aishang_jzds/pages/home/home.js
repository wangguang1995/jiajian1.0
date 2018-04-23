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
    
    indexShare: function (e) {
        this.setData({
            isTrue: true
        })
    },
    indexHide: function (e) {
        this.setData({
            isTrue: false
        })
    },
    onShareAppMessage: function () {
        return {
            title: '加减大师',
            path: '/aishang_jzds/pages/index/index',
            success: function (res) {
                console.log(res);
                console.log(res.shareTickets[0])
                if (res.shareTickets[0] != "") {
                    // console.log
                    wx.getShareInfo({
                        shareTicket: res.shareTickets[0],
                        success: function (res) {
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
                                        content: '分享成功，挑战次数 + 2',
                                        success: function (res) {
                                            if (res.confirm) {
                                                console.log('用户点击确定')
                                            } else if (res.cancel) {
                                                console.log('用户点击取消')
                                            }
                                        }
                                    })

                                },
                                fail: res => {
                                    wx.showModal({
                                        title: '提示',
                                        content: '一个群一天只能分享一次',
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
                        fail: function (res) { console.log(res) }
                    })
                } else {
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

            },
            fail: function (res) {
                // 分享失败
                console.log(res)
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
