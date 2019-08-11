const app = getApp();
const util = require("../utils/util.js")
Page({
  data: {
    isAuthorization: true
  },

  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({
      close: false
    });
  },
  init() {
    wx.login({
      success: res => {
        this.setData({
          code: res.code,
        });
        this.authorization();
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  authorization: function() {
    console.log("授权")
    var that = this;
    wx.getSetting({
      success: res => {
        if (!res.authSetting.hasOwnProperty('scope.userInfo') || res.authSetting['scope.userInfo'] == false) {
          that.setData({
            isAuthorization: false
          })
          return;
        }
        that.setData({
          isAuthorization: true
        })

        that.getUserInfo();

      },
      fail: res => {
        console.log("授权失败" + res);
      }
    })
  },
  getUserInfo() {
    wx.getSetting({
      success: res => {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            app.globalData.userInfo = JSON.stringify(res.userInfo)
            this.login();
          }
        })
      }
    })
  },
  login(){
    util.postReq("/user/login",{
      code: this.data.code,
      userInfo: app.globalData.userInfo
    }).then(res=>{
      if(res.data.success){
        app.globalData.userNo=res.data.data;
      }
      this.triggerEvent('delaydo', {});

    }).catch(res=>{

    })

  }
});