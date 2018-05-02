//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        isTrue: false,
        isflag:null,
        answer_number:"",//答题次数
        surplus_number:"",//剩余挑战次数
        clearance_number:"",//通关次数
        record:"",//最高分
        bg:null,
        arrayList:[]
    },
    onLoad: function () {
        app.getInfo();
    },
    //遮罩显示
    indexShare: function (e) {
        this.setData({
            isTrue: true
        })
    },
    //打开外部小程序
    open:function(e){
        console.log(e);
        wx.navigateToMiniProgram({
            appId: e.target.dataset.appid,
            path: e.target.dataset.path,
            success(res) {
                console.log(res);
            }
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
        this.setData({
            isTrue:false
        })
        var share_text = wx.getStorageSync('share_text');
        let that = this
        return {
            title: share_text,
            path: '/aishang_jzmaster/pages/index/index?url=',
            success: function (res) {
                //getSystemInfo是为了获取当前设备信息，判断是android还是ios，如果是android
                //还需要调用wx.getShareInfo()，只有当成功回调才是转发群，ios就只需判断shareTickets
                //获取用户设备信息
                wx.getSystemInfo({
                    success: function (d) {
                        console.log(d);
                        //判断用户手机是IOS还是Android
                        if (d.platform == 'android') {
                            console.log(1)
                            wx.getShareInfo({//获取群详细信息
                                shareTicket: res.shareTickets,
                                success: function (res) {
                                    console.log(res);
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
                                            console.log(surplus_number);
                                            console.log(res.data.data.share_group);
                                            wx.setStorageSync('surplus_number', (parseInt(surplus_number) + parseInt(res.data.data.share_group)));
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
                            console.log(2);
                            if (res.shareTickets != undefined) {
                                console.log("分享的是群");
                                console.log(res);
                                wx.getShareInfo({
                                    shareTicket: res.shareTickets,
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
                                                wx.setStorageSync('surplus_number', (parseInt(surplus_number) + parseInt(res.data.data.share_group)));
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
                                    }
                                })

                            } else {
                                console.log(res);
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

                    }
                })
            }

        }
    },
    
    onShow: function () {
        var _this = this;
        var openId = wx.getStorageSync('openId');
        var bg = wx.getStorageSync('bg');
        _this.setData({
            bg:bg
        })
        app.util.request({
            'url': 'entry/wxapp/getUserInfo',
            data: {
                openId: openId
            },
            success: function (res) {
                console.log(res);
                wx.setStorageSync('clearance_number', res.data.data.userinfo[0].clearance_number);//获得娃娃数量
                wx.setStorageSync('prize_number', res.data.data.userinfo[0].prize_number);//已经领取娃娃数量
                wx.setStorageSync('name', res.data.data.userinfo[0].name);//姓名
                wx.setStorageSync('mobile', res.data.data.userinfo[0].mobile);//手机号
                wx.setStorageSync('address', res.data.data.userinfo[0].receivingAddress);//地址
                wx.setStorageSync('canGet', res.data.data.userinfo[0].clearance_number - res.data.data.userinfo[0].prize_number);//目前可领取的娃娃数量        
                _this.setData({
                    answer_number: res.data.data.userinfo[0].answer_number,
                    surplus_number: res.data.data.userinfo[0].surplus_number,
                    record: res.data.data.userinfo[0].record,
                    canGet: (res.data.data.userinfo[0].clearance_number - res.data.data.userinfo[0].prize_number),
                    arrayList:res.data.data.link
                })
            }
        })

        if (app.globalData.userInfo != null) {
            this.setData({
                userInfo: app.globalData.userInfo
            })
        }
        wx.setNavigationBarTitle({
            title: app.globalData.name
        })

        //设置分享获取shareTicket
        wx.showShareMenu({
            withShareTicket: true,
        })
        var share_number = wx.getStorageSync('share_number');
        if(share_number == 0){
            _this.setData({
                isflag: true
            })
        }else{
            _this.setData({
                isflag: false
            })
        }
        
    }
})
