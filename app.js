//app.js
import util from './we7/resource/js/util.js';
import s from './siteinfo.js';

App({
    getInfo:function(){
        var _this = this;
        wx.login({
            success: res => {
                var code = res.code;
                wx.getUserInfo({
                    success: res => {
                        var userInfo = res.userInfo;
                        _this.globalData.userInfo = res.userInfo; 
                            util.request({
                                'url': 'entry/wxapp/Login',
                                'data': {
                                    code: code,
                                    encryptedData: res.encryptedData,
                                    iv: res.iv,
                                    m:s.name
                                }, 
                                success:function(res){
                                    console.log(res);
                                    _this.globalData.openId = res.data.data.userInfo.openId;
                                    wx.setStorageSync('openId', res.data.data.userInfo.openId);
                                    wx.setStorageSync('session3rd', res.data.data.session3rd);
                                    
                                    var openId = wx.getStorageSync('openId');
                                    util.request({
                                        'url': 'entry/wxapp/getUserInfo',
                                        data: {
                                            openId: openId,
                                            m:s.name
                                        },
                                        success:function(res){
                                            console.log(res);
                                            wx.setStorageSync('answer_number', res.data.data.userinfo[0].answer_number);
                                            wx.setStorageSync('clearance_number', res.data.data.userinfo[0].clearance_number);
                                            wx.setStorageSync('surplus_number', res.data.data.userinfo[0].surplus_number);
                                            wx.setStorageSync('prize_number', res.data.data.userinfo[0].prize_number);
                                            wx.setStorageSync('record', res.data.data.userinfo[0].record);
                                            wx.setStorageSync('name', res.data.data.userinfo[0].name);
                                            wx.setStorageSync('mobile', res.data.data.userinfo[0].mobile);
                                            wx.setStorageSync('address', res.data.data.userinfo[0].receivingAddress);
                                            wx.setStorageSync('canGet', res.data.data.userinfo[0].clearance_number - res.data.data.userinfo[0].prize_number);
                                        }
                                    })
                                }
                            });
                           
                            
                    },
                    fail: function (res) {
                        wx.showModal({
                            content: '检测到您没打开权限，是否去设置打开？',
                            confirmText: "确认",
                            cancelText: "取消",
                            success: function (res) {
                                console.log(res);
                                //点击“确认”时打开设置页面
                                if (res.confirm) {
                                    console.log('用户点击确认')
                                    wx.openSetting({
                                        success: (res) => {
                                            wx.getUserInfo({
                                                success:res =>{
                                                    console.log(res);
                                                    var userInfo = res.userInfo;
                                                    _this.globalData.userInfo = res.userInfo;
                                                    
                                                }
                                            })

                                         },
                                         complete:function(res){
                                             console.log(1);
                                             wx.switchTab({
                                                 url: '../index/index'
                                                 
                                             })
                                         }
                                    })
                                } 
                            }
                        });
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
    onLaunch: function (opt) {
        //调用API从本地缓存中获取数据
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
        openId: 333,
        session3rd:null
    },
    siteInfo: require('siteinfo.js')
});