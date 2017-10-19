var lineArr = [];
var mapXArr = [];
var mapYArr = [];
var pathArr = '';
var mapImg = 'http://restapi.amap.com/v3/staticmap?size=500*350&paths=10,0x5cd4a4,1,,:';

var gdMap = function (sd) {
    // 高德导航
    for (var i = 0; i < sd.length; i++) {
        lng = parseFloat(Number(sd[i].picLongtitude).toFixed(6));
        lat = parseFloat(Number(sd[i].picLatitude).toFixed(6));
        if (!isNaN(lng) && lng != 0 && !isNaN(lat) && lat != 0) {
            lineArr.push([lng, lat]);
            mapXArr.push(lng);
            mapYArr.push(lat);
        }
    }
    if (lineArr.length > 0) {
        for (var j = 0; j < 5; j++) {
            pathArr = pathArr + mapXArr[j] + ',' + mapYArr[j] + ';';
        }
        pathArr = pathArr.substring(0, pathArr.length - 1);
        var gaodeImgUrl = mapImg + pathArr + '&key=e8dd09f08ab2da2f2c8ae22023cf0d99';
        $('.mapImg img').attr('src', gaodeImgUrl);
    } else {
        $('.mapTitle').hide();
        $('.mapImg').hide();
        // $('.mapImg img').attr('src', '../images/mapImg.png');
    }
    // 高德画线
    $('.mapImg').click(function() {
        $('.mapClose').show();
        $('#mapContainer').show();
        $('.mapClose').click(function() {
            $('.mapClose').hide();
            $('#mapContainer').hide();
        })
        var map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            // center: [116.397428, 39.90923],
            zoom: 13
        })
        var mapX = mapXArr;
        var mapY = mapYArr;

        // 覆盖物 折线
        function addPolyline() {
            polyline = new AMap.Polyline({
                path: lineArr, //设置线覆盖物路径
                strokeColor: '#5cd4a4', //线颜色
                strokeOpacity: 0.8, //线透明度
                strokeWeight: 10, //线宽
                strokeStyle: 'solid', //线样式
                strokeDasharray: [10, 5] //补充线样式
            })
            polyline.setMap(map);
        }

        addPolyline();

        // 覆盖物  点
        function addMarker() {
            for (var i = 0; i < mapX.length; i++) {
                objX = mapX[i];
                objY = mapY[i];
                marker = new AMap.Marker({
                    icon: 'images/marker_sprite.png',
                    offset: new AMap.Pixel(-18, -45),
                    position: [objX, objY]
                })
                marker.setMap(map);
                // 覆盖物文字
                marker.setLabel({ //label的父div默认蓝框白底右下角显示，样式className为：amap-marker-label
                    offset: new AMap.Pixel(11, 8), //修改父div相对于maker的位置
                    content: i + 1
                })
            }

        }

        addMarker();
        map.setFitView();
    })
}
            