// we7/pages/address/address.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: [],
        name:"",
        phone:"",
        address:"",
        wawaId:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var name = wx.getStorageSync('name');
        var mobile = wx.getStorageSync('mobile');
        var address = wx.getStorageSync('address');
        
        this.setData({
            wawaId:options.id,
            name:name,
            phone:mobile,
            address:address
        })

    },
    bindRegionChange: function (e) {

        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value
        })
    },
    getName:function(e){
        this.setData({
            name: e.detail.value
        })
        
    },
    getPhone:function(e){
        this.setData({
            phone: e.detail.value
        })
        
    },
    formSubmit:function(e){
        
        var _this = this;
        if(e.detail.value.name == ""){
            wx.showToast({
                title: '姓名不能为空',
                icon: 'none',
                duration: 2000
            })
            return false;
        }
        if (e.detail.value.phone == ""){
            wx.showToast({
                title: '手机号不能为空',
                icon: 'none',
                duration: 2000
            })
            return false;
        }
        if((e.detail.value.address) == ""){
            wx.showToast({
                title: '请输入收货地址',
                icon: 'none',
                duration: 2000
            })
            return false;
        }else{
            var openId = wx.getStorageSync('openId');
            app.util.request({
                'url': 'entry/wxapp/Receive',
                data:{
                    pid:_this.data.wawaId,
                    openId:openId,
                    name: e.detail.value.name,
                    mobile:e.detail.value.phone,
                    address:e.detail.value.address

                },
                method:'POST',
                header:{
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                    console.log(res);
                    wx.setStorageSync('name', e.detail.value.name);
                    wx.setStorageSync('mobile', e.detail.value.phone);
                    wx.setStorageSync('address', e.detail.value.address);
                    wx.showModal({
                        title: '提示',
                        content:'领取成功,请联系客服获取核实信息！',
                        success: function (res) {
                            if (res.confirm) {
                                wx.switchTab({
                                    url: '../index/index'
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                },
                fail: res=> {
                    console.log(res);
                }

            })
        }
        
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