$(function() {
    $(window).resize(function() {
        window.location.reload();
    });

    $.ajax({
        url: _PATH + '/qkk/travel/queryTravelShare?travelID=' + getRequest("travelID"),
        type: 'get',
        dataType: 'JSON',
        success: function(data) {
            var qkk = $.parseJSON(data);
            // console.info(qkk.title);
            var sd = $.parseJSON(qkk.travelContent);
            var ht = "";
            var i = 0;
            var j = 0;
            var wid = $(window).width();
            var hei = $(window).height();
            var day = "";
            $.each(sd, function(index, item) {
                if (undefined == item.day) {
                    var top = ((hei - wid/item.picWidth*item.picHeigh)/2).toFixed(0);
                    ht += '<li data-title="'+day+' '+(i+1)+'/" style="width: '+wid+'px; margin-top: '+top+'px">';
                    ht += '    <img src="' + _OSS + item.url + '">';
                    ht += '    <div class="des" style="width: '+wid+'px;left:'+i*wid+'px">';
                    ht += '        <p>' + item.des + item.des + '</p>';
                    ht += '    </div>';
                    ht += '    <div class="loc" style="width: '+wid+'px;left:'+i*wid+'px">';
                    if (item.picPlace!=undefined && item.picPlace.trim()!='' && item.picPlace!=null && item.picPlace != '北京市荣华中路与万源街交叉口' && item.picPlace != '未知位置') {
                        ht += '        <img src="./images/loc.png">';
                        ht += '        <p>' + item.picPlace + '</p>';
                    }
                    ht += '    </div>';
                    ht += '</li>';
                    i++;
                } else {
                    day = item.day;
                }
            });
            $("head title").text(qkk.title);
            $(".title").css("width", wid+"px");
            $("#scroll_pic_view_ul").html(ht);
            $(".title span").text($("#scroll_pic_view_ul li").eq(0).attr("data-title")+i);
            
            var scrollPicView = document.getElementById("scroll_pic_view"),
                scrollPicViewDiv = document.getElementById("scroll_pic_view_div"),
                lis = scrollPicViewDiv.querySelectorAll("li"),
                w = scrollPicView.offsetWidth,
                len = lis.length;
            for (var i = 0; i < len; i++) {
                if (i == len - 1) {
                    // console.info(_width);
                    scrollPicViewDiv.style.width = w * len + "px";
                }
            }

            var scroll_pic_view = new iScroll('scroll_pic_view', {
                snap: true,
                momentum: false,
                hScrollbar: false,
                useTransition: true,
                onScrollEnd: function() {
                    $(".title span").text($("#scroll_pic_view_ul li").eq(this.currPageX).attr("data-title")+i);
                }
            });
            //定位到第几页
            var idx = ""==getRequest("idx")?1:getRequest("idx");
            scroll_pic_view.scrollToPage(idx, 0, 20);
        }
    });

    $(".body").on("click", function() {
        $(".des").fadeToggle(300);
        $(".title").fadeToggle(300);
        $(".loc").slideToggle(300);
    });

});