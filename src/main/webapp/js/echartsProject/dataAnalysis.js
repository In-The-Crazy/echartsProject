/** ----------------加载整体表格-------------------------* */
$(function() {
	// 初始化页面角色
	initPage();
	// 加载日历选择
	initDatebox();
	// 加载树型
	ajaxTree();
	// 加载图表数据
	initCharts();
	//map();

});


/** --------初始化页面模块 ------ */
function initPage() {

}

/** --------加载日历选择 ------ */
function initDatebox() {


}

/**
 * 加载树型
 */
function ajaxTree() {
}


/** --------加载图表数据 ------ */
function initCharts(queryType) {
	var firstChart = echarts.init(document.getElementById('firstChart'),'roma');
	var secondChart = echarts.init(document.getElementById('secondChart'),'roma');
	var thirdChart = echarts.init(document.getElementById('thirdChart'),'roma');
	var firstLegend = [];
	firstLegend.push('成人');
	firstLegend.push('儿童');
	firstLegend.push('婴儿');
	var firstshowData = [];
	firstshowData.push({value:1548, name:'成人'});
	firstshowData.push({value:679, name:'儿童'});
	firstshowData.push({value:335, name:'婴儿'});
	var firstOption = {
		title : {
			text: '乘客类型',
			x:'center'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left:'20%',
			data: firstLegend
		},
		series : [
			{
				name: '乘客类型',
				type: 'pie',
				radius: [0, '50%'],
				center: ['60%', '55%'],
				data:firstshowData,
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					},
					normal:{
						label: {
							show : true,
							formatter : "{b} : {c} \n ({d}%)",
						}
					}
				}
			}
		]
	};
	firstChart.setOption(firstOption);
	var secondLegend = [];
	secondLegend.push("成人");
	secondLegend.push("儿童");
	secondLegend.push("婴儿");
	secondLegend.push("成人（男）");
	secondLegend.push("成人（女）");
	secondLegend.push("儿童（男）");
	secondLegend.push("儿童（女）");
	secondLegend.push("婴儿（男）");
	secondLegend.push("婴儿（女）");
	var secondshowDataone = [];
	secondshowDataone.push({value:1548, name:'成人'});
	secondshowDataone.push({value:679, name:'儿童'});
	secondshowDataone.push({value:335, name:'婴儿'});
	var secondshowDatatwo = [];
	secondshowDatatwo.push({value:1048, name:'成人（男）'});
	secondshowDatatwo.push({value:500, name:'成人（女）'});
	secondshowDatatwo.push({value:544, name:'儿童（男）'});
	secondshowDatatwo.push({value:135, name:'儿童（女）'});
	secondshowDatatwo.push({value:200, name:'婴儿（男）'});
	secondshowDatatwo.push({value:135, name:'婴儿（女）'});
	var secondOption = {
		title : {
			text: '乘客类型',
			x:'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data:secondLegend,
			left:'20%'
		},
		series: [
			{
				name:'乘客类型',
				type:'pie',
				selectedMode: 'single',
				radius: [0, '30%'],
				center: ['65%', '50%'],
				label: {
					normal: {
						position: 'inner'
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data:secondshowDataone
			},
			{
				name:'乘客类型',
				type:'pie',
				radius: ['40%', '55%'],
				center: ['65%', '50%'],
				label: {
					normal: {
						position: 'outside',
						formatter : "{b} : {c} ({d}%)",

					}
				},
				data:secondshowDatatwo
			}
		]
	};
	secondChart.setOption(secondOption);
	secondChart.on('legendselectchanged', function (obj) {
		var selected = obj.selected[obj.name];
		var legend = obj.name;
		if (legend=='成人') {
			obj.selected["成人（男）"]=selected;
			obj.selected["成人（女）"]=selected;
		}
		if (legend=='儿童') {
			obj.selected["儿童（男）"]=selected;
			obj.selected["儿童（女）"]=selected;
		}
		if (legend=='婴儿') {
			obj.selected["婴儿（男）"]=selected;
			obj.selected["婴儿（女）"]=selected;
		}
		secondOption.legend.selected = obj.selected;
		secondChart.setOption(secondOption, true);
	});
	secondChart.on('pieselectchanged', function (obj) {
		var selected = obj.selected[obj.name];
		console.log(obj.selected);
		var name = obj.name;
		secondshowDatatwo = [];
		if(selected){
			if (name=='成人') {
				secondshowDataone[0].selected=true;
				secondshowDatatwo.push({value:1048, name:'成人（男）'});
				secondshowDatatwo.push({value:500, name:'成人（女）'});
			}
			if (name=='儿童') {
				secondshowDataone[1].selected=true;
				secondshowDatatwo.push({value:544, name:'儿童（男）'});
				secondshowDatatwo.push({value:135, name:'儿童（女）'});
			}
			if (name=='婴儿') {
				secondshowDataone[2].selected=true;
				secondshowDatatwo.push({value:200, name:'婴儿（男）'});
				secondshowDatatwo.push({value:135, name:'婴儿（女）'});
			}
		} else {
			secondshowDataone[0].selected=false;
			secondshowDataone[1].selected=false;
			secondshowDataone[2].selected=false;
			secondshowDatatwo.push({value:1048, name:'成人（男）'});
			secondshowDatatwo.push({value:500, name:'成人（女）'});
			secondshowDatatwo.push({value:544, name:'儿童（男）'});
			secondshowDatatwo.push({value:135, name:'儿童（女）'});
			secondshowDatatwo.push({value:200, name:'婴儿（男）'});
			secondshowDatatwo.push({value:135, name:'婴儿（女）'});
		}
		secondOption.series[1].data=secondshowDatatwo;
		secondChart.setOption(secondOption, true);
	});

	var builderJson = {
		"all": 1800,
		"charts": {
			"MF8528": 200,
			"SC8749": 150,
			"SC4596": 150,
			"SC4968": 100,
			"MF858": 200,
			"MF847": 100,
			"MF8527": 200,
			"SC8748": 150,
			"SC4599": 150,
			"SC4960": 100,
			"MF8581": 200,
			"MF8472": 100,
			"MF85271": 200,
			"SC87482": 150,
			"SC45993": 150,
			"SC49604": 100,
			"MF85815": 200,
			"MF84726": 100
		},
		"all2": 180000,
		"components": {
			"MF8528": 20000,
			"SC8749": 15000,
			"SC4596": 15000,
			"SC4968": 10000,
			"MF858": 20000,
			"MF847": 10000,
			"MF8527": 20000,
			"SC8748": 15000,
			"SC4599": 15000,
			"SC4960": 10000,
			"MF8581": 20000,
			"MF8472": 10000
		}
	};

	var downloadJson = {
		"MF8528": 200,
		"SC8749": 150,
		"SC4596": 150,
		"SC4968": 100,
		"MF858": 200,
		"MF847": 100,
		"MF8527": 200,
		"SC8748": 150,
		"SC4599": 150,
		"SC4960": 100,
		"MF8581": 200,
		"MF8472": 100,
		"MF85271": 200,
		"SC87482": 150,
		"SC45993": 150,
		"SC49604": 100,
		"MF85815": 200,
		"MF84726": 100

	};

	var themeJson = {
		"MF8528": 20000,
		"SC8749": 15000,
		"SC4596": 15000,
		"SC4968": 10000,
		"MF858": 20000,
		"MF847": 10000,
		"MF8527": 20000,
		"SC8748": 15000,
		"SC4599": 15000,
		"SC4960": 10000,
		"MF8581": 20000,
		"MF8472": 10000
	};
	var chartsArray = [];
	Object.keys(builderJson.charts).map(function (key) {
		chartsArray.push(builderJson.charts[key])
		return chartsArray;
	});
	chartsArray.sort(compareNum);
	var componentsArray = [];
	Object.keys(builderJson.components).map(function (key) {
		componentsArray.push(builderJson.components[key])
		return componentsArray;
	});

	componentsArray.sort(compareNum);

	var waterMarkText = 'ECHARTS';

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = canvas.height = 100;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.globalAlpha = 0.08;
	ctx.font = '20px Microsoft Yahei';
	ctx.translate(50, 50);
	ctx.rotate(-Math.PI / 4);
	ctx.fillText(waterMarkText, 0, 0);

	var thirdOption = {
		backgroundColor: {
			type: 'pattern',
			image: canvas,
			repeat: 'repeat'
		},

		tooltip: {
			trigger: 'item',
			formatter:function(params) {//数据格式
				if(params.seriesIndex==0) {
					return "航班号："+params.name+"&nbsp;&nbsp;人次："+params.value;
				}
				if(params.seriesIndex==2) {
					return "航班号："+params.name+"&nbsp;&nbsp;载重："+params.value;
				}
				if(params.seriesIndex==4){
					return "航班号："+params.name+"&nbsp;&nbsp;人次："+params.value+"("+(params.value/builderJson.all*100).toFixed(2)+"%)";
				}
				if(params.seriesIndex==5){
					return "航班号："+params.name+"&nbsp;&nbsp;载重："+params.value+"("+(params.value/builderJson.all2*100).toFixed(2)+"%)";
				}
			}
		},
		title: [{
			text: '各航班客座人数',
			subtext: '总计 ' + builderJson.all+'(单位：人次)',
			x: '25%',
			textAlign: 'center'
		},{
			text: '各航班载运重量',
			subtext: '总计 ' + builderJson.all2+'(单位：kg)',
			x: '25%',
			y: '45%',
			textAlign: 'center'
		}, {
			text: '各航班客座占比',
			subtext: '总计 ' + Object.keys(downloadJson).reduce(function (all, key) {
				return all + downloadJson[key];
			}, 0),
			x: '75%',
			textAlign: 'center'
		}, {
			text: '各航班载运占比',
			subtext: '总计 ' + Object.keys(themeJson).reduce(function (all, key) {
				return all + themeJson[key];
			}, 0),
			x: '75%',
			y: '45%',
			textAlign: 'center'
		}],
		dataZoom: [

			{
				type: 'slider',
				yAxisIndex: 0,
				left:'55%'
			},

			{
				type: 'inside',
				yAxisIndex: 0,
			},

			{
				type: 'slider',
				yAxisIndex: 1,
				left:'55%'
			},

			{
				type: 'inside',
				yAxisIndex: 1,

			}
		],
		grid: [{
			top: 50,
			width: '50%',
			bottom: '55%',
			left: 10,
			containLabel: true
		}, {
			top: '55%',
			width: '50%',
			bottom: '5%',
			left: 10,
			containLabel: true
		}],
		xAxis: [{
			type: 'value',
			max: chartsArray[0],
			splitLine: {
				show: false
			}
		}, {
			type: 'value',
			max: componentsArray[0],
			gridIndex: 1,
			splitLine: {
				show: false
			}
		}],
		yAxis: [{
			type: 'category',
			data: Object.keys(builderJson.charts),

		}, {
			gridIndex: 1,
			type: 'category',
			data: Object.keys(builderJson.components),

		}],
		series: [{
			type: 'bar',
			stack: 'chart',
			z: 3,
			label: {
				normal: {
					position: 'right',
					show: true
				}
			},
			data: Object.keys(builderJson.charts).map(function (key) {
				return {
					name: key.replace('.js', ''),
					value: builderJson.charts[key]
				}
			})
		}, {
			type: 'bar',
			stack: 'chart',
			silent: true,
			itemStyle: {
				normal: {
					color: '#eee'
				}
			},
			data: Object.keys(builderJson.charts).map(function (key) {
				return {
					name: key.replace('.js', ''),
					value:chartsArray[0] - builderJson.charts[key]
				}
			})
		}, {
			type: 'bar',
			stack: 'component',
			xAxisIndex: 1,
			yAxisIndex: 1,
			z: 3,
			label: {
				normal: {
					position: 'right',
					show: true
				}
			},
			data: Object.keys(builderJson.components).map(function (key) {
				return {
					name: key.replace('.js', ''),
					value:builderJson.components[key]
				}
			})
		}, {
			type: 'bar',
			stack: 'component',
			silent: true,
			xAxisIndex: 1,
			yAxisIndex: 1,
			itemStyle: {
				normal: {
					color: '#eee'
				}
			},
			data: Object.keys(builderJson.components).map(function (key) {
				return {
					name: key.replace('.js', ''),
					value:componentsArray[0] - builderJson.components[key]
				}
			})
		}, {
			type: 'pie',
			radius: [0, '30%'],
			center: ['75%', '25%'],
			data: Object.keys(downloadJson).map(function (key) {
				return {
					name: key.replace('.js', ''),
					value: downloadJson[key]
				}
			}),
			label: {
				normal: {
					position: 'outside',
					formatter : "{b} : {c} \n({d}%)",

				}
			}
		}, {
			type: 'pie',
			radius: [0, '30%'],
			center: ['75%', '75%'],
			data: Object.keys(themeJson).map(function (key) {
				return {
					name: key.replace('.js', ''),
					value: themeJson[key]
				}
			}),
			label: {
				normal: {
					position: 'outside',
					formatter : "{b} : {c}\n ({d}%)",

				}
			}
		}]
	}
	thirdChart.setOption(thirdOption);
	window.onresize = function () {
		firstChart.resize();
		secondChart.resize();
		thirdChart.resize();
	}
}

/** --------自定义文本 ------ */

/** --------自定义单元格样式 ------ */
function rownumSytler(value, row, index) {
	return "background-color: #F2F2F2;"
			+ "color: #333;"
			+ "background: -webkit-linear-gradient(top,#ffffff 0,#F2F2F2 100%);"
			+ "background: -moz-linear-gradient(top,#ffffff 0,#F2F2F2 100%);"
			+ "background: -o-linear-gradient(top,#ffffff 0,#F2F2F2 100%);"
			+ "background: linear-gradient(to bottom,#ffffff 0,#F2F2F2 100%);"
			+ "background-repeat: repeat-x;"
			+ "filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffffff,endColorstr=#F2F2F2,GradientType=0);"
};

var compare = function (prop) {
	return function (obj1, obj2) {
		var val1 = obj1[prop];
		var val2 = obj2[prop];
		if (Number(val1) < Number(val2)) {
			return 1;
		} else if (Number(val1) > Number(val2)) {
			return -1;
		} else {
			return 0;
		}
	}
}

var compareDate = function (x,y) {
	x = x.replace(/-/g,'/');
	var xtimestamp = new Date(x).getTime();
	y = y.replace(/-/g,'/');
	var ytimestamp = new Date(y).getTime();
	if (Number(xtimestamp) < Number(ytimestamp)) {
		return -1;
	} else if (Number(xtimestamp) > Number(ytimestamp)) {
		return 1;
	} else {
		return 0;
	}
}

var compareNum = function (x, y) {
	if (Number(x) < Number(y)) {
		return 1;
	} else if (Number(x) > Number(y)) {
		return -1;
	} else {
		return 0;
	}
}

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
		"立体地图": L.tileLayer('https://a.tiles.mapbox.com/v3/examples.c7d2024a/{z}/{x}/{y}.png', {
			attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			key: 'BC9A493B41014CAABB98F0471D759707',
			styleId: 22677
		}),
		"Foursquare": L.tileLayer('https://a.tiles.mapbox.com/v3/foursquare.map-0y1jh28j/{z}/{x}/{y}.png', {
			attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			key: 'BC9A493B41014CAABB98F0471D759707',
			styleId: 22677
		}),
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
						opacity: 0.4,
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





