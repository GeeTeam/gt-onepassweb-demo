//index.js
//获取应用实例
const app = getApp()
const Onepass = require('../../utils/onepasswx.js')

Page({
  data: {
    phoneborderbottomcolor: '#ced2d7',
    msgcodeborderbottomcolor: '#ced2d7',
    btndisabled: true,
    isbtnloading: false,
    showSendMsg: false,
    seconds: 0,
    phone: '',
    messagecode:'',
    operator_url: '',
    app_id: '1312d02ed91865c8817959a39ecf2f75',
    checkGatewayUrl: 'https://onepass.geetest.com/web/result', 
    randomcode: '',
    showToast: false,
    toast_txt: '',
    width: 300,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  phoneinput: function(e){    
    const target = e.detail;
    if (!target.value) { return; }
    // 去掉空格
    let val = target.value.replace(/[^\d]/g, '');
    
    if (val.length > 11) {
      val = val.substring(0, 11);
    }    
    this.setData({ btndisabled: val.length !== 11, phone: val.replace(/[^\d]/g, '') })
    return val;
  },
  msgcodeinput: function(e){
    this.setData({ messagecode: e.detail.value })
  },
  bindfocus: function(e) {    
    var target = e.currentTarget || e.target;
    if (target.id === 'phonenumber'){
      this.setData({ phoneborderbottomcolor: '#3973ff' })
    } else {
      this.setData({ msgcodeborderbottomcolor: '#3973ff' })
    }    
  },
  bindblur: function(e){    
    var target = e.currentTarget || e.target;
    if (target.id === 'phonenumber') {
      this.setData({ phoneborderbottomcolor: '#ced2d7' })
    } else {
      this.setData({ msgcodeborderbottomcolor: '#ced2d7' })
    }    
  },
  btnClick: function(e){    
    if (this.data.btndisabled === true || this.data.isbtnloading === true){
      return;
    }
    if(this.data.showSendMsg) {
      if(!this.data.messagecode){
        this.showToastTip('短信验证码必填!');        
        return;
      }
      // check msg
      if(this.data.messagecode === this.data.randomcode){        
        wx.redirectTo({
          url: '/pages/success/index',
        })
        return;
      } else {
        this.showToastTip('短信验证码填写错误!');        
        return;
      }
    }
    this.setData({ isbtnloading: true , operator_url: ''})    
    var that = this;
    this.opInstance.gateway(this.data.phone, function(err, data){
      if(!err){
        that.setData({operator_url: data})
      } else {
        // 调用失败降级走短信
        that.setData({ isbtnloading: false })        
        that.setData({ showSendMsg : true })
        that.sendMsg();
      }
    })
  },

  imgload: function(e){    
    var that = this;
    // get token
    this.opInstance.getTokenStatus(function(err, data){
      if(!err){
        //网关调用成功，调用服务端接口去获取校验结果 check gateway
        wx.request({
          url: that.data.checkGatewayUrl,
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: {
            phone: that.data.phone,
            process_id: data.process_id,
            app_id: that.data.app_id,
            accesscode: data.accesscode
          },
          success: function (res) {
            var data = res.data;
            if (data && data.status === 200 && data.data.result === '0') {
              // success 跳转到成功页面
              wx.redirectTo({
                url: '/pages/success/index?op=true',
              })
              // that.showToastTip('本机校验成功');
              that.setData({ isbtnloading: false })
            } else {
              that.setData({ isbtnloading: false })
              that.setData({ showSendMsg: true })
              that.sendMsg();
            }
          },
          fail: function () { 
            that.setData({ isbtnloading: false })
            that.setData({ showSendMsg: true })
            that.sendMsg();
          }
        })
      } else {
        // 调用失败降级走短信
        that.setData({ isbtnloading: false })        
        that.setData({ showSendMsg : true })
        that.sendMsg();
      }
    })

  },
  sendMsg: function(){
    if (!/^1\d{10}$/.test(this.data.phone)) {
      this.showToastTip('请输入正确的手机号');      
      return;
    }
    var randomcode = '';
    for (let len = 6; len > 0; len--) {
      randomcode += `${Math.floor(Math.random() * (10))}`;
    }
    this.setData({ randomcode: randomcode });
    var that = this;
    that.showToastTip('短信已发送，请注意查收')
    that.setData({ seconds: 59 })
    that.timerInterval = setInterval(() => {
      const sec = that.data.seconds - 1;
      that.setData({ seconds: sec })
      if (sec === 0) {
        clearInterval(that.timerInterval);
      }
    }, 1000);
    wx.request({
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      url: 'https://onepass.geetest.com/web/send_message',
      data: { app_id: this.data.app_id, phone: this.data.phone, code: randomcode }      
    })    
  },
  showToastTip(txt) {
    this.setData({
      showToast : true,
      toast_txt : txt
    })
    setTimeout(() => {
      this.setData({
        showToast: false,
        toast_txt: ''
      })
    }, 2000);
  },  
  onLoad: function () {
    try {
      let that = this;
      wx.getSystemInfo({
        success(res){
          that.width = res.screenWidth;
        }
       } 
       );
    } catch (error) {
      
    }
    this.opInstance = new Onepass({
      app_id: this.data.app_id,
      // timeout: 3000,// 超时时间
      // pre_init: true // 默认为true 提前获取运营商参数
    })
  },
})
