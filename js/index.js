// 百度统计
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement('script')
  hm.src = '//hm.baidu.com/hm.js?73d1ac23a3d9b64c46bcef3fe88a6b73'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
})()
// 去看看
var topVideo
var qkk
var sd

function toTravelIDUrl () {
  //如果url上有"&from=" 说明是从微信分享过来的地址，有可能二次分享不成功，手动跳转到 `我们的域名 + /index.html?travelID`这个地址
  var isFromWeiXin = location.href.indexOf('&from=')
  var newUrl = location.href.substr(0, isFromWeiXin)
  if (isFromWeiXin > -1) {
    location.href = newUrl
  }
}

toTravelIDUrl()

$(function () {
  var winWid = $(window).width()
  var winHei = $(window).height()
  var wrapBgWid = $('.wrap_bg_img').width()
  $('.onePage').height(winHei)
  var travelId = getRequest('travelID')
  $.ajax({
    url: _PATH + '/qkk/travel/queryTravelShare?travelID=' + travelId,
    type: 'get',
    dataType: 'JSON',
    success: function (data) {
      qkk = $.parseJSON(data)

      // 网页title
      $('head title').html('去看看 -- ' + qkk.describe)
      // 文章名
      $('.head_title').html(qkk.title)
      // 文章封面图片
      $('.wrap_bg_img').attr('src', _OSS + qkk.picUrl)
      $('.wrap_bg_img').load(function () {
        var bgWid = $('.wrap_bg_img').width()
        var bgHei = $('.wrap_bg_img').height()
        if (winWid / winHei > bgWid / bgHei) {
          $('.wrap_bg_img').attr('width', winWid)
          $('.wrap_bg_img').show()
        } else {
          $('.wrap_bg_img').attr('height', winHei)
          $('.wrap_bg_img').show()
        }

      })
      // 文章封面视频
      if ('' != qkk.videoUrl && qkk.videoUrl.length > 0) {
        $('.wrapVideoBtn').show()
        $('#videoUrl').attr('src', _OSS + qkk.videoUrl)
        var topVideo = document.getElementById('videoUrl')
        $('.wrapVideoBtn').click(function () {
          $('.wrapVideo').show()
          topVideo.play()
        })
        $('.wrapVideo a').click(function () {
          topVideo.pause()
          $('.wrapVideo').hide(200)
        })
      }

      // 副标题
      $('.summary_text').html(qkk.describe)
      // 用户头像
      if (qkk.headUrl.substr(0, 7) == 'http://') {
        $('.account_pic img').attr('src', qkk.headUrl)
      } else {
        $('.account_pic img').attr('src', _OSS + qkk.headUrl)
      }
      // 用户名
      $('.qkk_userName').html(qkk.userName)

      // 出行日期
      function dateFormat (date) {
        var date = new Date(date * 1000)
        Y = date.getFullYear() + '-'
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        D = date.getDate() + ' '
        h = date.getHours() + ':'
        m = date.getMinutes() + ':'
        s = date.getSeconds()
        return Y + M + D
      }

      $('.qkk_startDate').html(dateFormat(qkk.startTime))

      // 出行天数
      $('.qkk_days').html(qkk.days)
      // 地点
      $('.qkk_site span').html(qkk.dest)
      // 人数
      $('.qkk_peoples span').html(qkk.peoples)

      // 出行方式
      function travelTypeFormat () {
        switch (qkk.travelType) {
          case 1:
            return '组团游'
          case 2:
            return '自由行'
          case 3:
            return '自驾游'
        }

      }

      $('.qkk_travelType span').html(travelTypeFormat())
      // 人均费用
      $('.qkk_perCost span').html(qkk.perCost)

      // 行程内容
      // qkk.travelContent;
      var tmp = 0
      var idx = 0
      sd = $.parseJSON(qkk.travelContent)
      $.each(sd, function (i, v) {
        i++
        for (var j = tmp; j < i; j++) {
          var obj = v
          var picLongtitude = obj.picLongtitude
          var picLatitude = obj.picLatitude

          var tripCon_head = '<div class="tripCon"><div class="tripCon_head"><img src="images/tripCon_head.png" alt=""></div><div class="trip_date"><span>' + obj.day + '</span></div>'
          var tripCon_pic = '<div class="trip_pic"><p class="trip_pic_img"><a href="./slide.html?travelID=' + travelId + '&idx=' + idx + '" target="_blank"><img src="' + _OSS + obj.url + '" alt=""></a></p><p class="trip_pic_text">' + obj.des + '</p><p class="trip_pic_place">'
          //添加判断 如果地点为空不显示位置图标
          if (obj.picPlace != undefined && obj.picPlace.trim() != '' && obj.picPlace != null && obj.picPlace != '北京市荣华中路与万源街交叉口' && obj.picPlace != '未知位置') {
            tripCon_pic += '<img src="images/icon_pictureLocation.png" alt=""><span>' + obj.picPlace + '</span>'
          }
          tripCon_pic += '</p></div>'
          //添加判断 如果地点为空不显示位置图标
          var tripCon_video = '<div class="trip_pic"><p class="trip_pic_img"><video width="100%" controls="controls" src="' + _OSS + obj.videoUrl + '"></video></p><p class="trip_pic_text">' + obj.des + '</p><p class="trip_pic_place">'
          if (obj.picPlace != undefined && obj.picPlace.trim() != '' && obj.picPlace != null && obj.picPlace != '北京市荣华中路与万源街交叉口' && obj.picPlace != '未知位置') {
            tripCon_video += '<img src="images/icon_pictureLocation.png" alt=""><span>' + obj.picPlace + '</span>'
          }
          tripCon_video += '</p></div>'
          var tripCon_foot = '<div class="tripCon_foot"><img src="images/tripCon_foot.png" alt=""></div></div>'
          if (obj.day != undefined && j == 0) {
            $('.tripWrap').append(tripCon_head)
          } else if (obj.day != undefined && j != 0) {
            //$('.tripWrap').append(tripCon_foot + tripCon_head);
            $('.tripWrap').append(tripCon_head)
          } else if (obj.des != undefined) {
            idx++
            if (obj.videoUrl && obj.videoUrl.length > 0) {
              $('.tripWrap').append(tripCon_video)
            } else {
              $('.tripWrap').append(tripCon_pic)
            }

          }
          tmp = i
        }
      })
      wxShare(qkk)//微信分享
      gdMap(sd) //高德地图
    },
    error: function (e) {
      console.log(e)
    }
  })

  function isWeiXin () {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  }

  $('.btn_toAppStore').click(function () {
    if (isWeiXin()) {
      $('.maskLayer').show()
    }

  })

  $('.maskLayer').click(function () {
    $(this).hide()
  })

})