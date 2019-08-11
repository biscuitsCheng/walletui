// pages/index/count.js
const util = require("../../utils/util.js");
import Dialog from '../../dist/dialog/dialog';

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    current: 1,
    size: 10,
    bills:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      size,
      current
    } = this.data;
    if(app.globalData.userNo){
      this.loadPage(size, current);
    }else{
      this.selectComponent("#init").init();
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  onChange(event){
    const { index } = event.detail;

    this.setData({
      active: index,
    });
    const {size,current} = this.data;
    this.loadPage(size,current);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getInitInfo(){
    const {size,current} = this.data;
    this.loadPage(size, current);
  },
  loadPage(size, current) {
    const {
      active
    } = this.data;
    let type = '';
    if (active != 0) {
      type = active - 1
    }
    util.getReq("/bill/" + app.globalData.userNo, {
      size,
      current,
      type,
    }).then(res => {
      if(res.data.success){
        this.setData({
          bills:res.data.data
        })
      }

    }).catch(res => {});
  },
  onClose(event) {
    const { position, instance } = event.detail;
    console.log(instance.dataset);
    switch (position) {
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          util.delReq("/bill/"+instance.dataset.billno).then(res=>{
            const {size,current} = this.data;
            instance.close();
            this.loadPage(size,current);
          })
        }).catch(res=>{
          instance.close();
        });
        break;
    }

    }
})