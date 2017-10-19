var _PATH = 'http://s.squizzz.com/'
var _OSS = 'http://oss.squizzz.com/'

//获得url上参数
var getRequest = function (key) {
  var url = location.search //获取url中"?"符后的字串 
  var req = new Object()
  if (url.indexOf('?') != -1) {
    var str = url.substr(1)
    strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      if (key == strs[i].split('=')[0]) {
        return strs[i].split('=')[1]
      }
    }
  }
  return ''
}

// 微信分享
var wxShare = function (qkk) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxcc33720dd6c23ba0', // 必填，公众号的唯一标识
    timestamp: qkk.timestamp, // 必填，生成签名的时间戳
    nonceStr: qkk.noncestr, // 必填，生成签名的随机串
    signature: qkk.signature1, // 必填，签名，见附录1
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
  wx.ready(function () {
    wx.checkJsApi({
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function (res) {
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
    })
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.onMenuShareTimeline({
      title: qkk.title, // 分享标题
      link: qkk.url2, // 分享链接
      imgUrl: _OSS + qkk.picUrl, // 分享图标
      trigger: function () {
        // 用户点击了分享到朋友圈按钮
        // alert('您点击了分享朋友圈');
      },
      success: function () {
        // 用户确认分享后执行的回调函数
        // alert('分享朋友圈成功了')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        // alert('您取消了分享朋友圈操作')
      }
    })
    wx.onMenuShareAppMessage({
      title: qkk.title, // 分享标题
      desc: qkk.describe, // 分享描述
      link: qkk.url2, // 分享链接
      imgUrl: _OSS + qkk.picUrl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      trigger: function () {
        // 用户点击了分享给朋友按钮
        // alert('您点击了分享给朋友');
      },
      success: function () {
        // 用户确认分享后执行的回调函数
        // alert('分享给朋友成功了')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        // alert('您取消了分享给朋友的操作')
      }
    })
  })
  wx.error(function (res) {
    // alert(res);
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  })
  // }
}
