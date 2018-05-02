const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        bg: "",
        tabArr: {
            curHdIndex: 0,
            curBdIndex: 0
        },
        isTrue: null,
        rongyu: null,//荣誉排行
        yili: null,//毅力排行
        wawa: [],//娃娃数据
        number: null,//答对多少道题
        share_group: null,//分享一次，获得多少次机会
        share: null,//每天分享群的次数
        title: "",//标题
        title_2: "",
        advertising:null,
        logoImg:"",//分享logo
        bgColor:"",//榜单背景颜色
        isflag: null//控制分享按钮显示隐藏
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
    //跳转外部网页
    linked:function(){
      wx.navigateTo({
          url: '../webpage/webpage',
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
        var surplus_number = wx.getStorageSync('surplus_number');
        var uniacid = wx.getStorageSync('uniacid');
        if (openId == "" || openId == null) {
            app.getInfo();
        } else {
            if (surplus_number <= 0) {
                wx.showModal({
                    title: '提示',
                    content: "您已经没有挑战次数了",
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) {

                        } else if (res.cancel) {
                            
                        }
                    }
                })
            } else {
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
                wx.redirectTo({
                    url: '../transfer/transfer'
                })
            }

        }

    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function (options) {
        app.getInfo();
    },

    //领取娃娃按钮
    jinru: function () {
        wx.navigateTo({
            url: '../doll/doll',
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _this = this;
        app.util.request({
            url: 'entry/wxapp/SysInfo',
            success: function (res) {
                console.log(res);
                if (res.data.data.sysInfo.share_number == 0) {
                    _this.setData({
                        share: "每天可以分享不同的群"
                    })
                } else {
                    _this.setData({
                        share: "每天可以分享" + res.data.data.sysInfo.share_number + "次群"
                    })
                }
                if (res.data.data.sysInfo.title == "") {
                    _this.setData({
                        title: "答题赢娃娃"
                    })
                } else {
                    _this.setData({
                        title: res.data.data.sysInfo.title
                    })
                }
                if (res.data.data.sysInfo.share_number == 0) {
                    _this.setData({
                        isflag: true
                    })
                } else {
                    _this.setData({
                        isflag: false
                    })
                }
                _this.setData({
                    rongyu: res.data.data.rongyu,
                    yili: res.data.data.yili,
                    num: res.data.data.sysInfo.challenge_time,
                    wawa: res.data.data.prize,
                    bg: res.data.data.sysInfo.bg,
                    number: res.data.data.sysInfo.answer_number,
                    share_group: res.data.data.sysInfo.share_group,
                    title_2: res.data.data.sysInfo.title_2
                })
                wx.setStorageSync('wawa', res.data.data.prize);//奖品列表
                wx.setStorageSync('number', res.data.data.sysInfo.answer_number);
                wx.setStorageSync('answer_time', res.data.data.sysInfo.answer_time);//开始时间
                wx.setStorageSync('end_time', res.data.data.sysInfo.end_time);//结束时间
                wx.setStorageSync('bg', res.data.data.sysInfo.bg);//背景图
                wx.setStorageSync('uniacid', res.data.data.sysInfo.uniacid);//uniacid
                wx.setStorageSync('name', res.data.data.sysInfo.name);//标题
                wx.setStorageSync('share_number', res.data.data.sysInfo.share_number);
                wx.setStorageSync('title_2', res.data.data.sysInfo.title_2);
                wx.setStorageSync('share_text', res.data.data.sysInfo.share_text);//分享标题
                // wx.setStorageSync('challenge_img', res.data.data.sysInfo.challenge_img);//挑战图标选中
                // wx.setStorageSync('challenge_img_2', res.data.data.sysInfo.challenge_img_2);//挑战图标未选中
                // wx.setStorageSync('personal_img', res.data.data.sysInfo.personal_img);//挑战图标选中
                // wx.setStorageSync('personal_img_2', res.data.data.sysInfo.personal_img_2);//挑战图标未选中
                wx.setStorageSync('bd_color', res.data.data.sysInfo.bd_color);//榜单背景颜色
                wx.setStorageSync('share_img', res.data.data.sysInfo.share_img);//群分享图标
                wx.setStorageSync('share_content', res.data.data.sysInfo.share_content);//群分享
                wx.setStorageSync('link', res.data.data.sysInfo.advert_url);//外部链接
                if(res.data.data.sysInfo.advert_img == ""){
                    _this.setData({
                        advertising:true
                    })
                }else{
                    _this.setData({
                        advertising: false,
                        guanggao: res.data.data.sysInfo.advert_img
                    })
                }
                if (res.data.data.sysInfo.bd_color == ""){
                    _this.setData({
                        bgColor: "#fbeeed"
                    })
                }else{
                    _this.setData({
                        bgColor: res.data.data.sysInfo.bd_color
                    }) 
                }
                if (res.data.data.sysInfo.share_img == ""){
                    
                    _this.setData({
                        logoImg:"../../images/wx-logo.png"
                    })
                }else{
                    _this.setData({
                        logoImg: res.data.data.sysInfo.share_img
                    }) 
                }
                if (res.data.data.sysInfo.share_content == ""){
                    _this.setData({
                        share_content:"邀请好友一起来挑战"
                    })
                }else{
                    _this.setData({
                        share_content: res.data.data.sysInfo.share_content
                    })
                }
                var name = wx.getStorageSync('name');
                var surplus_number = wx.getStorageSync('surplus_number');
                _this.setData({
                    surplus_number: surplus_number
                })
                app.globalData.name = res.data.data.sysInfo.name;
                wx.setNavigationBarTitle({
                    title: name
                })

            }
        })
        wx.showShareMenu({
            withShareTicket: true,
        })

    },
    //预览图片
    previewImage: function (e) {
        var current = e.target.dataset.src;
        var imgList = [];
        for (let i = 0; i < this.data.wawa.length; i++) {
            imgList.push(this.data.wawa[i].img_url);
        }
        wx.previewImage({
            current: current,
            urls: imgList
        })
    },
    //分享
    onShareAppMessage: function (res) {
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
                        //判断用户手机是IOS还是Android
                        if (d.platform == 'android') {
                            wx.getShareInfo({
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
                                                        
                                                    } else if (res.cancel) {
                                                        
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
                                                
                                            } else if (res.cancel) {
                                                
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