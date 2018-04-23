// pages/home/home.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        bg:"",
        color:'#ccc',
        idx:'',
        tabArr: {
            curHdIndex: 0,
            curBdIndex: 0
        },
        isTrue: null,
        rongyu: null,
        yili: null,
        wawa: null,
        number: null,
        initial_number:null//分享一次，获得多少次机会
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
        console.log(this.data.idx)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    //领取娃娃按钮局
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
                if (res.data.data.sysInfo.share_group){

                }
                _this.setData({
                    rongyu:res.data.data.rongyu,
                    yili:res.data.data.yili,
                    num:res.data.data.sysInfo.challenge_time,
                    title: res.data.data.sysInfo.title,
                    wawa:res.data.data.prize,
                    bg:res.data.data.sysInfo.bg,
                    number: res.data.data.sysInfo.answer_number,
                    initial_number: res.data.data.sysInfo.initial_number
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
            success: function (res) {
               
            },
            fail: function (res) {
                // 分享失败
                console.log(res)
            }
        })
    
    },
    //分享
    onShareAppMessage: function () {
        return {
            title: '加减大师',
            path: '/aishang_jzds/pages/index/index',
            success: function (res) {
                console.log(res);
                console.log(res.shareTickets[0])
                if (res.shareTickets[0]!=""){
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
                                        content: res.message+"",
                                        success: function (res) {
                                            if (res.confirm) {
                                                console.log('用户点击确定')
                                            } else if (res.cancel) {
                                                console.log('用户点击取消')
                                            }
                                        }
                                    })   
                                    
                                },
                                fail: res=>{
                                    wx.showModal({
                                        title: '提示',
                                        content: res.message+"",
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
                }else{
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