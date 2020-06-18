# onepass demo 微信小程序

# 接入步骤
1. 引用[utils/onepasswx.js](https://github.com/GeeTeam/gt-onepassweb-demo/tree/master/miniapponepass/utils)

2. 初始化onepass对象

```js
  this.opInstance = new Onepass({
    app_id: '您申请的ID',
    timeout: 3000, // 超时时间，默认3000
    pre_init: true // 是否初始化时获取运营商参数；默认为true
  })
```

3. 调用`gateway`方法，返回运营商地址

> 说明： 可调用小程序 wx.getNetworkType进行网络判断后调用gateway方法；该方法可提升非纯4G网络环境下用户的使用体验，为可选方法，不使用该方法不影响正常接入使用; 


```js
  this.opInstance.gateway('phone', function(err, url){
    if(!err){
      // 设置image控件的src属性
      that.setData({ operator_url: url })
    } else {
      // 失败，调用短信        
    }
  })
```

4. wxml文件中放入一个image控件，image的图片地址是运营商地址
> 说明： 用户如果有多次请求gateway接口的业务需要，请在调用gateway方法前将image里的路径清空；`this.setData({ operator_url: '')`

```html
<image style='width: 0; height:0' bindload='imgload' binderror='imgload' referrerPolicy="no-referrer" src="{{operator_url}}" wx:if="operator_url"></image>
```

5. 在image控件的load和error事件处理函数中调用onepass的`getTokenStatus`方法
```js
  this.opInstance.getTokenStatus(function(err, data){
    if(!err){
      // token调用成功，调用check gateway接口，服务端校验是否成功
      
    } else {
      // 失败，调用短信
    }
  })
```
>说明： 开发者在本地进行移动网络调试时，需要在真机调试模式下进行调试。

# 错误码说明

错误码|说明
--|--
`100`|gateway接口网络请求失败，网络超时或失败
`101`|gateway接口返回失败，检查app_id是否合法
`102`|电信接口网络请求失败，网络超时或失败
`103`|电信接口返回失败（检查是否开启4G，查看接口返回数据）
`104`|移动取号失败
`107`|联通取号失败
