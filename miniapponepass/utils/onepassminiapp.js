function Onepass(config) {
  this.gtapi_domain = 'onepass.geetest.com';
  Object.assign(this, config);
  this.phone = 0;
  this.process_id = "";
  this.version = 'wx.1.0.0'
}
Onepass.prototype = {
  constructor: Onepass,
  gateway: function (phone, callback) {
    var that = this;
    this.phone = phone;
    wx.request({
      url: `https://${this.gtapi_domain}/web/pre_gateway`,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { app_id: this.app_id, sdk: this.version, phone: this.phone, clienttype:2 },
      success: function(res){
        var data = res.data;
        if (data && data.status === 200) {
          that.process_id = data.process_id;
          var query = []
          for(var op in data.data.option){
            query.push(encodeURIComponent(op)+'='+encodeURIComponent(data.data.option[op]))
          }
          callback && callback(null, data.data.url + '?' + query.join('&'))
        } else {
          callback && callback({code: 101})
        }
      },
      fail: function(){
        callback && callback({ code: 100 })
      }
    })
  },  
  getTokenStatus: function(callback){
    var that = this;
    wx.request({
      url: `https://${this.gtapi_domain}/web/token_status`,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { process_id: this.process_id},
      success: function(res){        
        var data = res.data;        
        if (data && data.status === 200 && data.data.result === true) {
          callback && callback(null, { process_id: that.process_id })          
        } else {
          callback && callback({ code: 103 })
        }
      },
      fail: function(){
        callback && callback({ code: 102 })
      }
    })
  }
}

module.exports = Onepass;

