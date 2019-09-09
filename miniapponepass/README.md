# onepass demo 微信小程序

# 接入步骤
1. 引用`utils/onepass.js`

2. 初始化onepass对象

```js
  this.opInstance = new Onepass({
    app_id: '您申请的ID',
  })
```

3. 调用`gateway`方法，返回运营商地址
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
```html
<image style='width: 0; height:0' bindload='imgload' binderror='imgload' src="{{operator_url}}"></image>
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

# 错误码说明

错误码|说明
--|--
`100`|gateway接口网络请求失败，网络超时或失败
`101`|gateway接口返回失败，检查app_id是否合法
`102`|getTokenStatus接口网络请求失败，网络超时或失败
`103`|getTokenStatus接口返回失败