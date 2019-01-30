/** ----------------加载整体表格-------------------------* */
$(function() {
    $('#map').height($(window).height()-8);
    map();

});


function map(){
    var map = L.map('map');
    var baseLayers = {
        "高德地图": L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
            subdomains: "1234"
        }),
        '高德影像': L.layerGroup([L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
            subdomains: "1234"
        }), L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}', {
            subdomains: "1234"
        })]),
/*        "立体地图": L.tileLayer('https://a.tiles.mapbox.com/v3/examples.c7d2024a/{z}/{x}/{y}.png', {
            attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            key: 'BC9A493B41014CAABB98F0471D759707',
            styleId: 22677
        }),
        "Foursquare": L.tileLayer('https://a.tiles.mapbox.com/v3/foursquare.map-0y1jh28j/{z}/{x}/{y}.png', {
            attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            key: 'BC9A493B41014CAABB98F0471D759707',
            styleId: 22677
        }),*/
        'GeoQ灰色底图': L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}').addTo(map)
    };
    L.tileLayer('https://a.tiles.mapbox.com/v3/foursquare.map-0y1jh28j/{z}/{x}/{y}.png', {
        attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        key: 'BC9A493B41014CAABB98F0471D759707',
        styleId: 22677
    });
    var layercontrol = L.control.layers(baseLayers,{}, {
        position: "topleft"
    }).addTo(map);
    map.setView(L.latLng(37.550339, 104.114129), 4);
    var overlay = new L.echartsLayer3(map, echarts);
    var chartsContainer = overlay.getEchartsContainer();
    var myChart = overlay.initECharts(chartsContainer);
    var geoCoordMap ={};
    $.ajax({
        type: 'post',
        async: false,
        url:root+"/mainSrv/china",
        dataType: 'json',
        success: function (data) {
            $.each(data, function (infoIndex, info) {
                if (info.name == '北京' || info.name == '上海' || info.name == '天津' || info.name == '重庆') {
                    var name = info.name;
                    geoCoordMap[name] = [info.log, info.lat];
                } else {
                    var data2 = info.children;
                    $.each(data2, function (infoIndex2, info2) {
                        var name = info2.name;
                        geoCoordMap[name] = [info2.log, info2.lat];
                    });
                }

            });
        }
    });

    var BJData = [
        [{name: '马鞍山'}, {name: '上海', value: 95}],
        [{name: '马鞍山'}, {name: '广州', value: 90}],
        [{name: '马鞍山'}, {name: '大连', value: 80}],
        [{name: '马鞍山'}, {name: '南宁', value: 70}],
        [{name: '马鞍山'}, {name: '南昌', value: 60}],
        [{name: '马鞍山'}, {name: '拉萨', value: 50}],
        [{name: '马鞍山'}, {name: '长春', value: 40}],
        [{name: '马鞍山'}, {name: '包头', value: 30}],
        [{name: '马鞍山'}, {name: '重庆', value: 20}],
        [{name: '马鞍山'}, {name: '常州', value: 10}]
    ];
    var SHData = [
        [{name: '上海'}, {name: '包头', value: 95}],
        [{name: '上海'}, {name: '昆明', value: 90}],
        [{name: '上海'}, {name: '广州', value: 80}],
        [{name: '上海'}, {name: '郑州', value: 70}],
        [{name: '上海'}, {name: '长春', value: 60}],
        [{name: '上海'}, {name: '重庆', value: 50}],
        [{name: '上海'}, {name: '长沙', value: 40}],
        [{name: '上海'}, {name: '北京', value: 30}],
        [{name: '上海'}, {name: '丹东', value: 20}],
        [{name: '上海'}, {name: '大连', value: 10}]
    ];
    var GZData = [
        [{name: '广州'}, {name: '福州', value: 95}],
        [{name: '广州'}, {name: '太原', value: 90}],
        [{name: '广州'}, {name: '长春', value: 80}],
        [{name: '广州'}, {name: '重庆', value: 70}],
        [{name: '广州'}, {name: '西安', value: 60}],
        [{name: '广州'}, {name: '成都', value: 50}],
        [{name: '广州'}, {name: '常州', value: 40}],
        [{name: '广州'}, {name: '北京', value: 30}],
        [{name: '广州'}, {name: '北海', value: 20}],
        [{name: '广州'}, {name: '海口', value: 10}]
    ];
    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push([{
                    coord: fromCoord
                }, {
                    coord: toCoord
                }]);
            }
        }
        return res;
    };
    var color = ['#a6c84c', '#ffa022', '#46bee9'];
    var series = [];
    var showData = [[]];
    showData[0]=['马鞍山', BJData];
    showData[1]=['上海', SHData];
    showData[2]=['广州', GZData];
    showData.forEach(function (item, i) {

        series.push({
                name: item[0],
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0],
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 540,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
    });
    var option = {
//        backgroundColor: '#404a59',
        title: {
            text: '航线展示',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter:function(params){
                var returnInfo = params.seriesName;
                $.each(showData, function (infoIndex, info) {
                    if(info[0]==params.seriesName){
                        returnInfo+="->"+info[1][params.dataIndex][1].name;
                        return false;
                    }
                });
                return returnInfo;
            }
        },
        legend: {
            orient: 'vertical',
            top: 'bottom',
            left: 'right',
            data: ['马鞍山', '上海', '广州'],
            textStyle: {
                color: '#fff'
            },
            selectedMode: 'single'
        },
        geo: {
            map: '',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#404a59',

                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: series
    };
    // 使用刚指定的配置项和数据显示图表。
    overlay.setOption(option);

}





