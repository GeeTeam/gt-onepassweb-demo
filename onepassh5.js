!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof def&&def.amd?def("GOP",t):(n=n||self).GOP=t()}(this,function(){"use strict";var uid=function(){return parseInt(1e4*Math.random())+(new Date).valueOf()},guid=function(){return c()+c()+c()+c()+c()+c()+c()+c()};function c(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function PureEvent(){this.n={}}function extend(n,t){for(var e in t)if(t.hasOwnProperty(e)){var o=t[e];n[e]=o}}PureEvent.prototype={t:function(n,t){var e=this;return e.n[n]?e.n[n].push(t):e.n[n]=[t],e},e:function(n,t){var e=this.n[n];if(e){for(var o=0,i=e.length;o<i;o+=1)e[o](t);return this}},o:function(){this.n={}}};var GATEWAY_FAIL="gateway_fail",GATEWAY_SUCCESS="gateway_success",_Promise=(q=function(n){return"function"==typeof n},s=function(n){n()},u=function(t,n){if(t===n)t.i(new TypeError);else if(n instanceof v)n.then(function(n){u(t,n)},function(n){t.i(n)});else if(q(n)||"object"==typeof(i=n)&&null!==i){var e;try{e=n.then}catch(r){return v.r(r),void t.i(r)}var o=!1;if(q(e))try{e.call(n,function(n){o||(o=!0,u(t,n))},function(n){o||(o=!0,t.i(n))})}catch(r){if(o)return;o=!0,t.i(r)}else t.c(n)}else t.c(n);var i},w=!(t.prototype={enqueue:function(n){var t=this,e={ele:n,next:null};null===t.u?t.u=this.a=e:(t.a.next=e,t.a=t.a.next)},dequeue:function(){var n=this;if(null===n.u)throw new Error("queue is empty");var t=n.u.ele;return n.u=n.u.next,t},isEmpty:function(){return null===this.u},clear:function(){this.u=this.s=null},each:function(n){var t=this;t.isEmpty()||(n(t.dequeue()),t.each(n))}}),v.debug=function(){w=!0},v.r=function(n){w&&"undefined"!=typeof console&&console.error(n)},v.prototype={PENDING:0,RESOLVED:1,REJECTED:-1,c:function(n){var t=this;t.f===t.PENDING&&(t.f=t.RESOLVED,t.d=n,t.m())},i:function(n){var t=this;t.f===t.PENDING&&(t.f=t.REJECTED,t.p=n,t.m())},m:function(){var n,t,e=this,o=e.f;o===e.RESOLVED?(n=e.h,e._.clear(),t=e.d):o===e.REJECTED&&(n=e._,e.h.clear(),t=e.p),n.each(function(n){s(function(){n(o,t)})})},l:function(e,o,i){var r=this;s(function(){if(q(o)){var n;try{n=o(i)}catch(t){return v.r(t),void r.i(t)}u(r,n)}else e===r.RESOLVED?r.c(i):e===r.REJECTED&&r.i(i)})},then:function(e,o){var n=this,i=new v;return n.h.enqueue(function(n,t){i.l(n,e,t)}),n._.enqueue(function(n,t){i.l(n,o,t)}),n.f===n.RESOLVED?n.m():n.f===n.REJECTED&&n.m(),i}},v.all=function(s){return new v(function(o,i){var r=s.length,c=0,u=!1,a=[];function e(n,t,e){u||(null!==n&&(u=!0,i(n)),a[e]=t,(c+=1)===r&&(u=!0,o(a)))}for(var n=0;n<r;n+=1)!function(t){var n=s[t];n instanceof v||(n=new v(n)),n.then(function(n){e(null,n,t)},function(n){e(n||!0)})}(n)})},v.race=function(a){return new v(function(e,o){var n,i=a.length,r=!1,c=0;function t(n,t){r||(null==n?(r=!0,e(t)):i<=(c+=1)&&(r=!0,o(n)))}for(var u=0;u<i;u+=1)n=void 0,(n=a[u])instanceof v||(n=new v(n)),n.then(function(n){t(null,n)},function(n){t(n||!0)})})},v.step=function(e){var o=e.length,i=new v,r=function(t,n){if(o<=t)return i.c(n);new v(e[t]).then(function(n){r(t+1,n)},function(n){i.i(n)})};return new v(e[0]).then(function(n){r(1,n)},function(n){i.i(n)}),i},v.prototype.g=function(n,t){return this.then(n,t)},v),q,s,u,w;function t(){this.u=this.a=null}function v(n){var e=this;if(e.f=e.PENDING,e.h=new t,e._=new t,q(n))try{n(function(n){e.c(n)},function(n){e.i(n)})}catch(o){v.r(o)}}_Promise.debug();var ajax={v:function(){return window.XMLHttpRequest&&window.JSON},w:function(n,t,e,o,i,r,c){var u=window.JSON.stringify(t);if(t&&"object"==typeof t&&"jsonp"===o){var a=[];for(var s in t)a.push(encodeURIComponent(s)+"="+encodeURIComponent(t[s]));u=a.join("&")}var f=new window.XMLHttpRequest;if(f.open("POST",n,!0),e)for(var s in e)f.setRequestHeader(s,e[s]);else f.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),f.setRequestHeader("Accept","application/json");f.timeout=c,f.onload=function(){i(window.JSON.parse(f.responseText))},f.ontimeout=function(){r({error:"timeout"})},f.onreadystatechange=function(){4===f.readyState&&(200===f.status?i(window.JSON.parse(f.responseText)):r({error:"status: "+f.status}))},f.send(u)}},TIMEOUT=3e4,TIMEOUT_ERROR="网络不给力",loadJS=function(i,r){return new _Promise(function(n,t){var e=document.getElementsByTagName("head")[0],o=document.createElement("script");o.onload=o.onreadystatechange=function(){o.readyState&&"loaded"!==o.readyState&&"complete"!==o.readyState?t(TIMEOUT_ERROR):n(o)},o.onerror=function(){t(TIMEOUT_ERROR),o.parentNode.removeChild(o)},o.src=i,e.appendChild(o),setTimeout(function(){t(TIMEOUT_ERROR),o.parentNode.removeChild(o)},r||TIMEOUT)})},normalizeDomain=function(n){return n.replace(/^https?:\/\/|\/$/g,"")},normalizePath=function(n){return 0!==(n=n.replace(/\/+/g,"/")).indexOf("/")&&(n="/"+n),n},normalizeQuery=function(n){if(!n)return"";var t="?";for(var e in n)if(n.hasOwnProperty(e)){var o=n[e];t=t+encodeURIComponent(e)+"="+encodeURIComponent(o)+"&"}return"?"===t&&(t=""),t.replace(/&$/,"")},makeURL=function(n,t,e,o){if(!0===o)return e;n=n||location.protocol+"//",t=normalizeDomain(t);var i=normalizePath(e);return t&&(i=n+t+i),i},jsonp=function(r){var n=makeURL(r.protocol,r.domain,r.path,r.fullurl),c=r.query,o=r.headers||null,i=r.format||"jsonp";return ajax.v()&&!r.get?new _Promise(function(t,e){ajax.w(n,c,o,i,function(n){t(n)},function(n){e(n)},r.timeout||TIMEOUT)}):new _Promise(function(e,t){var o=r.cb||"geetest_"+uid();r.cb?o=r.cb:c.callback=o;var i=n+normalizeQuery(c);window[o]=function(n){r&&r.recordurl&&((n=n||{}).url=i),e(n),window[o]=undefined;try{delete window[o]}catch(t){}},loadJS(i,r.timeout||TIMEOUT).g(function(){},function(n){t(n)})})},YDRZ=function(win,doc){var chrsz=8;function hex_md5(n){return binl2hex(core_md5(str2binl(n),n.length*chrsz))}function core_md5(n,t){n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;for(var e=1732584193,o=-271733879,i=-1732584194,r=271733878,c=0;c<n.length;c+=16){var u=e,a=o,s=i,f=r;e=md5_ff(e,o,i,r,n[c+0],7,-680876936),r=md5_ff(r,e,o,i,n[c+1],12,-389564586),i=md5_ff(i,r,e,o,n[c+2],17,606105819),o=md5_ff(o,i,r,e,n[c+3],22,-1044525330),e=md5_ff(e,o,i,r,n[c+4],7,-176418897),r=md5_ff(r,e,o,i,n[c+5],12,1200080426),i=md5_ff(i,r,e,o,n[c+6],17,-1473231341),o=md5_ff(o,i,r,e,n[c+7],22,-45705983),e=md5_ff(e,o,i,r,n[c+8],7,1770035416),r=md5_ff(r,e,o,i,n[c+9],12,-1958414417),i=md5_ff(i,r,e,o,n[c+10],17,-42063),o=md5_ff(o,i,r,e,n[c+11],22,-1990404162),e=md5_ff(e,o,i,r,n[c+12],7,1804603682),r=md5_ff(r,e,o,i,n[c+13],12,-40341101),i=md5_ff(i,r,e,o,n[c+14],17,-1502002290),e=md5_gg(e,o=md5_ff(o,i,r,e,n[c+15],22,1236535329),i,r,n[c+1],5,-165796510),r=md5_gg(r,e,o,i,n[c+6],9,-1069501632),i=md5_gg(i,r,e,o,n[c+11],14,643717713),o=md5_gg(o,i,r,e,n[c+0],20,-373897302),e=md5_gg(e,o,i,r,n[c+5],5,-701558691),r=md5_gg(r,e,o,i,n[c+10],9,38016083),i=md5_gg(i,r,e,o,n[c+15],14,-660478335),o=md5_gg(o,i,r,e,n[c+4],20,-405537848),e=md5_gg(e,o,i,r,n[c+9],5,568446438),r=md5_gg(r,e,o,i,n[c+14],9,-1019803690),i=md5_gg(i,r,e,o,n[c+3],14,-187363961),o=md5_gg(o,i,r,e,n[c+8],20,1163531501),e=md5_gg(e,o,i,r,n[c+13],5,-1444681467),r=md5_gg(r,e,o,i,n[c+2],9,-51403784),i=md5_gg(i,r,e,o,n[c+7],14,1735328473),e=md5_hh(e,o=md5_gg(o,i,r,e,n[c+12],20,-1926607734),i,r,n[c+5],4,-378558),r=md5_hh(r,e,o,i,n[c+8],11,-2022574463),i=md5_hh(i,r,e,o,n[c+11],16,1839030562),o=md5_hh(o,i,r,e,n[c+14],23,-35309556),e=md5_hh(e,o,i,r,n[c+1],4,-1530992060),r=md5_hh(r,e,o,i,n[c+4],11,1272893353),i=md5_hh(i,r,e,o,n[c+7],16,-155497632),o=md5_hh(o,i,r,e,n[c+10],23,-1094730640),e=md5_hh(e,o,i,r,n[c+13],4,681279174),r=md5_hh(r,e,o,i,n[c+0],11,-358537222),i=md5_hh(i,r,e,o,n[c+3],16,-722521979),o=md5_hh(o,i,r,e,n[c+6],23,76029189),e=md5_hh(e,o,i,r,n[c+9],4,-640364487),r=md5_hh(r,e,o,i,n[c+12],11,-421815835),i=md5_hh(i,r,e,o,n[c+15],16,530742520),e=md5_ii(e,o=md5_hh(o,i,r,e,n[c+2],23,-995338651),i,r,n[c+0],6,-198630844),r=md5_ii(r,e,o,i,n[c+7],10,1126891415),i=md5_ii(i,r,e,o,n[c+14],15,-1416354905),o=md5_ii(o,i,r,e,n[c+5],21,-57434055),e=md5_ii(e,o,i,r,n[c+12],6,1700485571),r=md5_ii(r,e,o,i,n[c+3],10,-1894986606),i=md5_ii(i,r,e,o,n[c+10],15,-1051523),o=md5_ii(o,i,r,e,n[c+1],21,-2054922799),e=md5_ii(e,o,i,r,n[c+8],6,1873313359),r=md5_ii(r,e,o,i,n[c+15],10,-30611744),i=md5_ii(i,r,e,o,n[c+6],15,-1560198380),o=md5_ii(o,i,r,e,n[c+13],21,1309151649),e=md5_ii(e,o,i,r,n[c+4],6,-145523070),r=md5_ii(r,e,o,i,n[c+11],10,-1120210379),i=md5_ii(i,r,e,o,n[c+2],15,718787259),o=md5_ii(o,i,r,e,n[c+9],21,-343485551),e=safe_add(e,u),o=safe_add(o,a),i=safe_add(i,s),r=safe_add(r,f)}return Array(e,o,i,r)}function md5_cmn(n,t,e,o,i,r){return safe_add(bit_rol(safe_add(safe_add(t,n),safe_add(o,r)),i),e)}function md5_ff(n,t,e,o,i,r,c){return md5_cmn(t&e|~t&o,n,t,i,r,c)}function md5_gg(n,t,e,o,i,r,c){return md5_cmn(t&o|e&~o,n,t,i,r,c)}function md5_hh(n,t,e,o,i,r,c){return md5_cmn(t^e^o,n,t,i,r,c)}function md5_ii(n,t,e,o,i,r,c){return md5_cmn(e^(t|~o),n,t,i,r,c)}function safe_add(n,t){var e=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(e>>16)<<16|65535&e}function bit_rol(n,t){return n<<t|n>>>32-t}function str2binl(n){for(var t=Array(),e=(1<<chrsz)-1,o=0;o<n.length*chrsz;o+=chrsz)t[o>>5]|=(n.charCodeAt(o/chrsz)&e)<<o%32;return t}function binl2hex(n){for(var t="0123456789abcdef",e="",o=0;o<4*n.length;o++)e+=t.charAt(n[o>>2]>>o%4*8+4&15)+t.charAt(n[o>>2]>>o%4*8&15);return e}var opts={getMobileUrl:{test01:"http://120.197.235.102/NumberAbility/h5/getMobile.htm?",pro:"http://www.cmpassport.com/NumberAbility/h5/getMobile.htm?"},getToken:{test01:"http://120.197.235.102/NumberAbility/h5/getToken.htm",pro:"https://www.cmpassport.com/NumberAbility/h5/getToken.htm"},optparams:{uuid:"",msgId:"",timestamp:dateFormat(new Date,"yyyyMMddhhmmssSSS"),userInformation:getFingerPrint(),isimge:!1}};function uuid(n,t){var e,o,i="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),r=[];if(t=t||i.length,n)for(e=0;e<n;e++)r[e]=i[0|Math.random()*t];else for(r[8]=r[13]=r[18]=r[23]="-",r[14]="4",e=0;e<36;e++)r[e]||(o=0|16*Math.random(),r[e]=i[19==e?3&o|8:o]);return r.join("")}function getFingerPrint(){return encodeURIComponent(base64encode(getBrowserInfo()))}function dateFormat(n,t){var e={"M+":n.getMonth()+1,"d+":n.getDate(),"h+":n.getHours(),"m+":n.getMinutes(),"s+":n.getSeconds(),"q+":Math.floor((n.getMonth()+3)/3),"S+":n.getMilliseconds()};for(var o in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(n.getFullYear()+"").substr(4-RegExp.$1.length))),e)new RegExp("("+o+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[o]:((3==RegExp.$1.length&&"S+"==o?"000":"00")+e[o]).substr((""+e[o]).length)));return t}var YDRZ={getSign:function(n,t){return opts.optparams.uuid=uuid(32,32),opts.optparams.msgId=uuid(32,32),n+opts.optparams.msgId+opts.optparams.timestamp+opts.optparams.uuid+t},getTokenInfo:function(o){var n=""===o.data.expandParams?"callType=6005":"callType=6005|"+o.data.expandParams,i=""===o.data.expandParams?"callType=6006":"callType=6006|"+o.data.expandParams,r={version:o.data.version,appId:o.data.appId,openType:o.data.openType,expandParams:o.data.expandParams,isTest:o.data.isTest,sign:o.data.sign,uuid:opts.optparams.uuid,msgId:opts.optparams.msgId,timestamp:opts.optparams.timestamp,userInformation:opts.optparams.userInformation},t=("0"===r.isTest?opts.getMobileUrl.test01:opts.getMobileUrl.pro)+"version="+r.version+"&appId="+r.appId+"&openType="+r.openType+"&expandParams="+encodeURIComponent(n)+"&msgId="+r.msgId+"&timestamp="+r.timestamp+"&uuid="+r.uuid+"&userInformation="+r.userInformation,c=this;this.isLoaded=!1,this.isTimeout=!1;var u=doc.createElement("img");u.style.display="none",u.src=t,doc.body.appendChild(u);var a=null;0<o.data.timeout&&(a=setTimeout(function(){c.isTimeout=!0,o.error({code:"500",message:"超时",msgId:r.msgId})},o.data.timeout)),u.onload=function(){if(clearTimeout(a),!c.isTimeout){c.isLoaded=!0,doc.body.removeChild(u);var n={header:{version:r.version,msgId:r.msgId,timestamp:r.timestamp,appId:r.appId},body:{expandParams:i,sign:r.sign,uuid:r.uuid}},t="0"===r.isTest?opts.getToken.test01:opts.getToken.pro;try{request.ajax({request:{url:t,method:"post",data:JSON.stringify(n),timeout:o.data.timeout},success:function(n){if(""==n.result.body.token){t={code:n.result.header.resultCode,message:n.result.body.resultDesc};return o.error({code:t.code,message:t.message,msgId:r.msgId}),t}var t={code:n.result.header.resultCode,token:n.result.body.token,userInformation:r.userInformation,message:"获取token成功"};o.success({code:t.code,message:t.message,token:t.token,userInformation:t.userInformation})},error:function(n){var t={code:"500",message:"接口异常，获取token失败"};return o.error({code:t.code,message:t.message,msgId:r.msgId}),t}})}catch(e){throw new Error(e)}}},u.onerror=function(){c.isTimeout||(clearTimeout(a),o.error({code:"500",message:"取号失败",msgId:r.msgId}),c.isLoaded=!0,doc.body.removeChild(u))}}};function getBrowserInfo(){var n=navigator.userAgent,t=(-1<n.indexOf("Android")||n.indexOf("Linux"),window.navigator.platform+"@@"+window.navigator.userAgent+"@@"+window.navigator.appVersion+"@@"+window.navigator.cookieEnabled+"@@"+window.navigator.cpuClass+"@@"+window.navigator.hardwareConcurrency+"@@"+window.navigator.language+"@@"+window.navigator.plugins+"@@"+window.screen.availWidth+"@@"+window.navigator.availHeight+"@@"+window.screen.colorDepth+"@@"+window.Date.getTimezoneOffset);return window.navigator.platform+"@@"+window.navigator.userAgent+"@@"+hex_md5(t)}function base64encode(n){var t,e,o,i,r,c,u,a="",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",f=0;for(n=_utf8_encode(n);f<n.length;)i=(t=n.charCodeAt(f++))>>2,r=(3&t)<<4|(e=n.charCodeAt(f++))>>4,c=(15&e)<<2|(o=n.charCodeAt(f++))>>6,u=63&o,isNaN(e)?c=u=64:isNaN(o)&&(u=64),a=a+s.charAt(i)+s.charAt(r)+s.charAt(c)+s.charAt(u);return a}function _utf8_encode(n){n=n.replace(/\r\n/g,"\n");for(var t="",e=0;e<n.length;e++){var o=n.charCodeAt(e);o<128?t+=String.fromCharCode(o):(127<o&&o<2048?t+=String.fromCharCode(o>>6|192):(t+=String.fromCharCode(o>>12|224),t+=String.fromCharCode(o>>6&63|128)),t+=String.fromCharCode(63&o|128))}return t}var request={utilCreateXHR:function(n){var t=n&&n.window||window;if(t.XMLHttpRequest)return new t.XMLHttpRequest;for(var e=["MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","Microsoft.XMLHTTP"],o=0;o<e.length;o++)try{return new t.ActiveXObject(e[o])}catch(i){}},parseJson:function(text){var obj=!1;if(text||(obj={code:"ER_NOBODY",summary:"responseText is empty"}),win.JSON&&JSON.parse)try{obj=JSON.parse(text)}catch(ex){}if(!obj)try{obj=eval("("+text+")")}catch(ex){obj={code:"ER_INVALIDJSON",summary:"responseText is invalid json"}}return obj},ajax:function(n){var t=this,e=(n=n||{}).request||{},o=this.utilCreateXHR(n),i=n.success||new Function,r=n.error||new Function,c=e.timeout,u=null;0<c&&(u=setTimeout(function(){3==o.readyState&&200==o.status||(o.abort(),r({result:{code:"ER_TIMEOUT",summary:"timeout"}}))},c)),o.onreadystatechange=function(n){4==o.readyState&&(clearTimeout(u),0!=o.status?304==o.status||200<=o.status&&o.status<300?i({result:t.parseJson(o.responseText),text:o.responseText,status:o.status}):r({result:{code:"ER_NETWORK",summary:"network has error"},text:o.responseText,status:o.status}):r({result:{code:"ER_STATUS",summary:"status is 0"}}))};var a=e.method&&e.method.toLowerCase();o.open(a||"get",e.url,!0);var s=e.data;if(!e.isFormData&&"object"==typeof s){for(var f in s=[],e.data)s.push(f+"="+encodeURIComponent(e.data[f]));s=s.join("&")}if(e.headers)for(var f in e.headers)o.setRequestHeader(f,e.headers[f]);"post"==a&&s||(s=null),o.send(s)}};return YDRZ}(window,document),CUAU=(ye={precheckUrl:{test:"https://opencloud.wostore.cn/openapi-test/netauth/precheck/u3",pro:"https://opencloud.wostore.cn/openapi/netauth/precheck/u3"},optparams:{uuid:"",timestamp:Date.now(),version:"v4.0",clientType:"2",format:"jsonp",clientId:"",timeout:5e3,result:""}},{getSign:function(n){return"cuCallback"+n+ye.optparams.clientType+ye.optparams.format+ye.optparams.timestamp+ye.optparams.version},getAuthCode:function(n){if("[object Function]"!==Object.prototype.toString.call(n.result))throw{error:"arguments invalid"};ye.optparams.clientId=n.clientId,ye.optparams.timeout=n.timeout,ye.optparams.result=n.result,ye.optparams.uuid=function c(n,t){var e,o,i="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),r=[];if(t=t||i.length,n)for(e=0;e<n;e++)r[e]=i[0|Math.random()*t];else for(r[8]=r[13]=r[18]=r[23]="-",r[14]="4",e=0;e<36;e++)r[e]||(o=0|16*Math.random(),r[e]=i[19==e?3&o|8:o]);return r.join("")}(32,32),function r(n){var t=ye.optparams.timeout,e="cuCallback",o={callback:e,timestamp:ye.optparams.timestamp,client_id:ye.optparams.clientId,client_type:ye.optparams.clientType,version:ye.optparams.version,format:ye.optparams.format,sign:n},i={code:"408",msg:"请求超时"};jsonp({get:!0,path:ye.precheckUrl.pro,query:o,fullurl:!0,cb:e,timeout:t}).g(function(n){var t={code:n.code,msg:n.msg};0==n.code?(t.accesscode=n.data.accessCode,t.operatorType=n.data.operatorType):t.msgId=n.data,ye.optparams.result(t)},function(n){("网络不给力"==n||n.status&&"timeout"==n.status)&&!function t(n){ye.optparams.result({code:n.code,msg:n.msg})}(i)})}(n.sign)}}),ye;function Error$1(){}Error$1.pre_gateway_net=function(){return{code:100}},Error$1.pre_gateway_result=function(){return{code:101}},Error$1.pre_getmobile_net=function(){return{code:102}},Error$1.pre_getmobile_result=function(){return{code:103}},Error$1.cm_token_error=function(){return{code:104}},Error$1.record_token_net=function(){return{code:105}},Error$1.record_token_result=function(){return{code:106}},Error$1.cu_token_error=function(){return{code:107}},Error$1.change_gateway=function(n){return{code:n&&n.code||108}};var common_cell=["cellular","2g","3g","4g","5g","3G/2G"],checkNetInfo=function(){var t,n=navigator.userAgent.toLowerCase(),e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{type:"unknown"};if(/micromessenger/.test(n))if(-1!==n.indexOf("nettype"))t=(t=n.match(/nettype\/\w+/)?n.match(/nettype\/\w+/)[0]:"nettype/unknow").replace("nettype/","");else{var o={"network_type:wifi":"wifi","network_type:edge":"3G/2G","network_type:fail":"fail","network_type:wwan":"3G/2G"};document.addEventListener("WeixinJSBridgeReady",function(){WeixinJSBridge.invoke("getNetworkType",{},function(n){t=o[n.err_msg]})})}else t=e&&e.type||"unknown";return t&&-1!==common_cell.indexOf(t)?"cellular":"wifi"===t?"wifi":"unknown"},canClick=!0;function Onepass(n){this.gtapi_domain="onepass.geetest.com",this.protocol=n.protocol?n.protocol+"//":location.protocol+"//",extend(this,n),this.phone=0,this.process_id="",this.y=new PureEvent,this.presign=YDRZ.getSign("","1.2"),this.presign_cu=CUAU.getSign("{client_id}"),this.OnepassConfig={haspreASK:!1,presign:this.presign,presign_cu:this.presign_cu,data:{},cb:"geetest_"+uid(),ip:!1},this.pre_init=n.pre_init===undefined||n.pre_init,this.pre_init&&this.T()}Onepass.prototype={constructor:Onepass,A:function(n){var e=this;if(e.phone=n&&n.phone||"",canClick){canClick=!1;var t=e.OnepassConfig.haspreASK&&e.OnepassConfig.data.data&&!e.OnepassConfig.ip&&!e.phone;if(e.OnepassConfig.haspreASK&&e.OnepassConfig.data.data&&e.OnepassConfig.ip||t)e.I(e.OnepassConfig.data,e.OnepassConfig.cb);else{var o=e.y,i="geetest_"+uid(),r=YDRZ.getSign("","1.2"),c=CUAU.getSign("{client_id}");jsonp({protocol:this.protocol,domain:this.gtapi_domain,path:"/web/pre_gateway",query:{app_id:e.app_id,sdk:"2.3.0",phone:e.phone,presign:r,presign_cu:c,clienttype:1,callback:i},timeout:this.timeout}).g(function(n){if(n&&200===n.status)e.I(n,i);else{canClick=!0;var t=guid();o.e(GATEWAY_FAIL,Error$1.pre_gateway_result()),e.k({process_id:t,msg:"请求pregateway出错",phone:e.phone},"101")}},function(){canClick=!0,o.e(GATEWAY_FAIL,Error$1.pre_gateway_net());var n=guid();e.k({process_id:n,msg:"请求pregateway失败",phone:e.phone},"100")})}}},S:function(n,t,e){var o=this,i=o.y;jsonp({get:!0,path:n.url,query:n.option[t],fullurl:!0,cb:e,timeout:o.timeout}).g(function(n){canClick=!0,!n||1e4!==n.result&&0!==n.result?(i.e(GATEWAY_FAIL,Error$1.pre_getmobile_result()),o.k(n,"103")):(i.e(GATEWAY_SUCCESS,{process_id:o.process_id,phone:o.phone,accesscode:n.data}),o.k(n,"0"))},function(){canClick=!0,i.e(GATEWAY_FAIL,Error$1.pre_getmobile_net()),o.k({code:400,msg:"接口请求失败 ||超时"},"400")})},b:function(n,t){var e=this,o=e.y,i=n.option[t].appid,r=n.option[t].sign;YDRZ.getTokenInfo({data:{version:"1.2",appId:i,sign:r,openType:"1",timeout:e.timeout||3e4},success:function(n){canClick=!0,o.e(GATEWAY_SUCCESS,{process_id:e.process_id,phone:e.phone,accesscode:n.token+"||"+n.userInformation}),e.k(n,"0")},error:function(n){canClick=!0,o.e(GATEWAY_FAIL,Error$1.cm_token_error()),e.k(n,"104")}})},C:function(n,t){var e=this,o=e.y;CUAU.getAuthCode({clientId:n.option[t].client_id,sign:n.option[t].sign,timeout:e.timeout||3e4,result:function(n){"0"==n.code?n.operatorType&&"CU"===n.operatorType&&(canClick=!0,o.e(GATEWAY_SUCCESS,{process_id:e.process_id,phone:e.phone,accesscode:n.accesscode}),e.k(n,"0")):(canClick=!0,o.e(GATEWAY_FAIL,Error$1.cu_token_error()),e.k(n,"107"))}})},R:function(n,t){var e=this,o=e.y;jsonp({path:n.option[t].url,query:{custId:n.option[t].custid},headers:{"Content-Type":"application/json;chartset=UTF-8",seqId:guid(),Authorization:n.option[t].auth,appId:n.option[t].appid},fullurl:!0,timeout:e.timeout,format:"json"}).g(function(n){canClick=!0,n&&n.success&&n.data.sessionId?(o.e(GATEWAY_SUCCESS,{process_id:e.process_id,phone:e.phone,accesscode:n.data.sessionId}),e.k(n,"0")):(o.e(GATEWAY_FAIL,Error$1.pre_getmobile_result()),e.k(n,"103"))},function(){canClick=!0,o.e(GATEWAY_FAIL,Error$1.pre_getmobile_net()),e.k({code:400,msg:"接口请求失败 ||超时"},"400")})},U:function(){this.process_id=""},t:function(n,t){return this.y.t(n,t),this},k:function(n,t){var e=t||"undefined";n&&"object"==typeof n&&(n=JSON.stringify(n));var o=this.process_id||n&&n.process_id,i=checkNetInfo();jsonp({protocol:this.protocol,domain:this.gtapi_domain,query:{process_id:o,code:e,metadata:n,cell:i},path:"/web/client_report",timeout:this.timeout})},T:function(){var e=this;jsonp({protocol:this.protocol,domain:this.gtapi_domain,path:"/web/pre_gateway",query:{app_id:e.app_id,sdk:"2.3.0",presign:e.OnepassConfig.presign,presign_cu:e.OnepassConfig.presign_cu,clienttype:1,callback:e.OnepassConfig.cb,type:"pre"},timeout:this.timeout}).g(function(n){if(e.OnepassConfig.haspreASK=!0,n&&200===n.status)e.OnepassConfig.data=n,e.OnepassConfig.ip=n.data&&1===n.data.operator_rule||!1;else{var t=guid();e.OnepassConfig.haspreASK=!0,e.OnepassConfig.ip=!1,e.k({process_id:t,msg:"请求pregateway出错"},"101")}},function(){var n=guid();e.OnepassConfig.haspreASK=!1,e.OnepassConfig.ip=!1,e.k({process_id:n,msg:"请求pregateway失败"},"100")})},I:function(n,t){var e=this;e.process_id=n.process_id,e.OnepassConfig.haspreASK=!1,n.data&&1===n.data.operator?e.b(n.data,n.data.operator):n.data&&3===n.data.operator?e.C(n.data,n.data.operator):n.data&&4===n.data.operator?this.R(n.data,n.data.operator):e.S(n.data,n.data.operator,t)}};var data=(_f=[],{x:function(n,t){_f[n]=t},M:function(n){return _f[n]}}),_f;function GOP(n){this.j=uid(),this.G=!0,data.x(this.j,new Onepass(n))}return GOP.version="2.3.0",GOP.prototype={gateway:function(n){return this.G&&data.M(this.j).A(n),this},onGatewaySuccess:function(n){return this.G&&data.M(this.j).t(GATEWAY_SUCCESS,n),this},onGatewayFail:function(n){return this.G&&data.M(this.j).t(GATEWAY_FAIL,n),this},checkNetInfo:function(){return checkNetInfo()}},GOP});
