//index.js
//获取应用实例
const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    activeType: 0,
    infoTypes:[],
    changeInfoType:false,
    infoTypesIndex: 0,
    typeInfoNo:'',
    price:null,
    remark:"",
    infoTypeOnOut: [],
    infoTypeOnIn: []
  },
  onLoad: function () {
    this.selectComponent("#init").init();

    
    
  },
  getInitInfo(){
    util.getReq("/typeInfo/" + app.globalData.userNo,{
    }).then(res=>{
      if(res.data.success){
        const { expenses, income} = res.data.data;
        this.setData({
          infoTypeOnOut: expenses,
          infoTypeOnIn: income,
          infoTypes: expenses,
          typeInfoNo: expenses[0].typeInfoNo,
        });

      }

    }).catch(res=>{
      
    })
    

  },

  changeType: function(data){
    const type = data.target.dataset.type;

    let infoType;
    if(type == 0){
      infoType = this.data.infoTypeOnOut;
    }else{
      infoType = this.data.infoTypeOnIn;
    }

    this.setData({
      activeType: type,
      infoTypes:  infoType,
      infoTypesIndex:0,
      typeInfoNo: infoType[0].typeInfoNo
    });
  },
  changeInfoType() {
    this.setData({
      changeInfoType:true
    })
  },
  unchooseInfoType() {
    this.setData({
      changeInfoType: false
    })
  },

  chooseInfoType(event){
    const { picker, value, index } = event.detail;

    this.setData({
      typeInfoNo:value.typeInfoNo,
      infoTypesIndex:index,
      changeInfoType:false
    })
  },
  inputRemark(event){
    console.log("123");
    this.setData({
      remark: event.detail.value
    })
  },
  inputPrice(event) {

    this.setData({
      price: event.detail.value
    })
  },
  submit(){
    
    const { activeType, typeInfoNo, price ,remark } = this.data;
    const userNo = app.globalData.userNo;
    util.postReq("/bill/",{
      type:activeType,
      typeInfoNo,
      price,
      remark,
      userNo
    }).then(res=>{
      if(res.data.success){
        wx.switchTab({
          url: './count',
          success:res=>{
            this.setData({
              remark:'',
              price:null,
            })
          }
        })
      }

    }).catch(res=>{
      });

  }

})
