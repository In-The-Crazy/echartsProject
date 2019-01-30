/** ----------------加载整体表格-------------------------* */
$(function() {
	drawLayer02Label($("#layer02_01 canvas").get(0),"乘客数",60,200);
	drawLayer02Label($("#layer02_02 canvas").get(0),"售票数",60,400);
	drawLayer02Label($("#layer02_03 canvas").get(0),"退票数",60,400);
	drawLayer02Label($("#layer02_04 canvas").get(0),"载运量",60,400);
	drawLayer02Label($("#layer02_05 canvas").get(0),"起飞班次",60,200);
	drawLayer02Label($("#layer02_06 canvas").get(0),"延误班次",60,200);

	// 初始化页面角色
	initPage();
	// 加载日历选择
	initDatebox();
	// 加载树型
	ajaxTree();
	// 加载图表数据
	initCharts();

	$('label').css('color','white');
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
function initCharts() {
	var firstChart = echarts.init(document.getElementById('firstChart'),'chalk');
	var secondChart = echarts.init(document.getElementById('secondChart'),'chalk');
	var thirdChart = echarts.init(document.getElementById('thirdChart'),'chalk');
	var fourthChart = echarts.init(document.getElementById('fourthChart'),'chalk');
	var fifthChart = echarts.init(document.getElementById('fifthChart'),'chalk');
	var sixthChart = echarts.init(document.getElementById('sixthChart'),'chalk');

	var firstLegend = [];
	firstLegend.push('成人');
	firstLegend.push('儿童');
	firstLegend.push('婴儿');
	var firstshowData = [];
	firstshowData.push({value:1548, name:'成人'});
	firstshowData.push({value:679, name:'儿童'});
	firstshowData.push({value:335, name:'婴儿'});
	var firstOption = {
		backgroundColor: {
			type: 'pattern',
			repeat: 'repeat'
		},
		title : {
			text: '乘客类型',
			x:'center',
			left:'55%'
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
		backgroundColor: {
			type: 'pattern',
			repeat: 'repeat'
		},
		title : {
			text: '乘客类型',
			x:'center',
			left:'60%'
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
						position: 'inner',
						color :  'black'
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
				start: 20,
				end:80,
				left:'55%'
			},

			{
				type: 'inside',
				start: 20,
				end:80,
				yAxisIndex: 0,
			},

			{
				type: 'slider',
				yAxisIndex: 1,
				start: 20,
				end:80,
				left:'55%'
			},

			{
				type: 'inside',
				start: 20,
				end:80,
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


	var timeData = [
		'2009/6/13 0:00', '2009/6/13 1:00', '2009/6/13 2:00', '2009/6/13 3:00', '2009/6/13 4:00', '2009/6/13 5:00', '2009/6/13 6:00', '2009/6/13 7:00', '2009/6/13 8:00', '2009/6/13 9:00', '2009/6/13 10:00', '2009/6/13 11:00', '2009/6/13 12:00', '2009/6/13 13:00', '2009/6/13 14:00', '2009/6/13 15:00', '2009/6/13 16:00', '2009/6/13 17:00', '2009/6/13 18:00', '2009/6/13 19:00', '2009/6/13 20:00', '2009/6/13 21:00', '2009/6/13 22:00', '2009/6/13 23:00',
		'2009/6/14 0:00', '2009/6/14 1:00', '2009/6/14 2:00', '2009/6/14 3:00', '2009/6/14 4:00', '2009/6/14 5:00', '2009/6/14 6:00', '2009/6/14 7:00', '2009/6/14 8:00', '2009/6/14 9:00', '2009/6/14 10:00', '2009/6/14 11:00', '2009/6/14 12:00', '2009/6/14 13:00', '2009/6/14 14:00', '2009/6/14 15:00', '2009/6/14 16:00', '2009/6/14 17:00', '2009/6/14 18:00', '2009/6/14 19:00', '2009/6/14 20:00', '2009/6/14 21:00', '2009/6/14 22:00', '2009/6/14 23:00',
		'2009/6/15 0:00', '2009/6/15 1:00', '2009/6/15 2:00', '2009/6/15 3:00', '2009/6/15 4:00', '2009/6/15 5:00', '2009/6/15 6:00', '2009/6/15 7:00', '2009/6/15 8:00', '2009/6/15 9:00', '2009/6/15 10:00', '2009/6/15 11:00', '2009/6/15 12:00', '2009/6/15 13:00', '2009/6/15 14:00', '2009/6/15 15:00', '2009/6/15 16:00', '2009/6/15 17:00', '2009/6/15 18:00', '2009/6/15 19:00', '2009/6/15 20:00', '2009/6/15 21:00', '2009/6/15 22:00', '2009/6/15 23:00',
		'2009/6/16 0:00', '2009/6/16 1:00', '2009/6/16 2:00', '2009/6/16 3:00', '2009/6/16 4:00', '2009/6/16 5:00', '2009/6/16 6:00', '2009/6/16 7:00', '2009/6/16 8:00', '2009/6/16 9:00', '2009/6/16 10:00', '2009/6/16 11:00', '2009/6/16 12:00', '2009/6/16 13:00', '2009/6/16 14:00', '2009/6/16 15:00', '2009/6/16 16:00', '2009/6/16 17:00', '2009/6/16 18:00', '2009/6/16 19:00', '2009/6/16 20:00', '2009/6/16 21:00', '2009/6/16 22:00', '2009/6/16 23:00',
		'2009/6/17 0:00', '2009/6/17 1:00', '2009/6/17 2:00', '2009/6/17 3:00', '2009/6/17 4:00', '2009/6/17 5:00', '2009/6/17 6:00', '2009/6/17 7:00', '2009/6/17 8:00', '2009/6/17 9:00', '2009/6/17 10:00', '2009/6/17 11:00', '2009/6/17 12:00', '2009/6/17 13:00', '2009/6/17 14:00', '2009/6/17 15:00', '2009/6/17 16:00', '2009/6/17 17:00', '2009/6/17 18:00', '2009/6/17 19:00', '2009/6/17 20:00', '2009/6/17 21:00', '2009/6/17 22:00', '2009/6/17 23:00',
		'2009/6/18 0:00', '2009/6/18 1:00', '2009/6/18 2:00', '2009/6/18 3:00', '2009/6/18 4:00', '2009/6/18 5:00', '2009/6/18 6:00', '2009/6/18 7:00', '2009/6/18 8:00', '2009/6/18 9:00', '2009/6/18 10:00', '2009/6/18 11:00', '2009/6/18 12:00', '2009/6/18 13:00', '2009/6/18 14:00', '2009/6/18 15:00', '2009/6/18 16:00', '2009/6/18 17:00', '2009/6/18 18:00', '2009/6/18 19:00', '2009/6/18 20:00', '2009/6/18 21:00', '2009/6/18 22:00', '2009/6/18 23:00',
		'2009/6/19 0:00', '2009/6/19 1:00', '2009/6/19 2:00', '2009/6/19 3:00', '2009/6/19 4:00', '2009/6/19 5:00', '2009/6/19 6:00', '2009/6/19 7:00', '2009/6/19 8:00', '2009/6/19 9:00', '2009/6/19 10:00', '2009/6/19 11:00', '2009/6/19 12:00', '2009/6/19 13:00', '2009/6/19 14:00', '2009/6/19 15:00', '2009/6/19 16:00', '2009/6/19 17:00', '2009/6/19 18:00', '2009/6/19 19:00', '2009/6/19 20:00', '2009/6/19 21:00', '2009/6/19 22:00', '2009/6/19 23:00',
	];

	var data1 =[
		597,596,596,695,595,594,594,794,594,594,594,594,597,596,596,595,595,594,494,594,594,594,594,594,
		597,596,596,695,595,594,594,794,594,594,594,594,597,596,596,595,595,594,494,594,594,594,594,594,
		597,596,596,695,595,594,594,794,594,594,594,594,597,596,596,595,595,594,494,594,594,594,594,594,
		597,596,596,695,595,594,594,794,594,594,594,594,597,596,596,595,595,594,494,594,594,594,594,594,
		597,596,596,695,595,594,594,794,594,594,594,594,597,596,596,595,595,594,494,594,594,594,594,594,
		597,596,596,695,595,594,594,794,594,594,594,594,597,596,596,595,595,594,494,594,594,594,594,594,
		597,596,596,695,595,594,594,794,594,594,594,594,597,596,596,595,595,594,494,594,594,594,594,594

	];
	var data2 =[
		10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4,
		10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4,
		10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4,
		10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4,
		10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4,
		10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4,
		10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4,10,5,2,3,10,6,7,4

	];
	var max1 = Math.max.apply(null, data1);
	var min1 = Math.min.apply(null, data1);
	var max2 = Math.max.apply(null, data2);
	var min2 = Math.min.apply(null, data2);
	timeData = timeData.map(function (str) {
		return str.replace('2009/', '');
	});

	var fourthOption = {
		backgroundColor: {
			type: 'pattern',
			image: canvas,
			repeat: 'repeat'
		},
		title: {
			text: '航班价格与剩余座位',
			x: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				animation: false
			}
		},
		legend: {
			data:['航班价格','剩余座位'],
			x: 'left'
		},
		toolbox: {

		},
		axisPointer: {
			link: {xAxisIndex: 'all'}
		},
		dataZoom: [
			{
				show: true,
				realtime: true,
				start: 20,
				end: 80,
				xAxisIndex: [0, 1]
			},
			{
				type: 'inside',
				realtime: true,
				start: 20,
				end: 80,
				xAxisIndex: [0, 1]
			}
		],
		grid: [{
			left: 50,
			right: 50,
			height: '35%'
		}, {
			left: 50,
			right: 50,
			top: '55%',
			height: '35%'
		}],
		xAxis : [
			{
				type : 'category',
				boundaryGap : false,
				axisLine: {onZero: true},
				data: timeData
			},
			{
				gridIndex: 1,
				type : 'category',
				boundaryGap : false,
				axisLine: {onZero: true},
				data: timeData,
				position: 'top'
			}
		],
		yAxis : [
			{
				name : '航班价格',
				type : 'value',
				min:min1-min1/4,
				max:max1+min1/4
			},
			{
				name : '剩余座位',
				gridIndex: 1,
				type : 'value',
				inverse: true,
				min:min2-min2/4,
				max:max2+min2/4
			}
		],
		series : [
			{
				name:'航班价格',
				type:'line',
				symbolSize: 8,
				hoverAnimation: false,
				data:data1
			},
			{
				name:'剩余座位',
				type:'line',
				xAxisIndex: 1,
				yAxisIndex: 1,
				symbolSize: 8,
				hoverAnimation: false,
				data: data2
			}
		]
	};

	fourthChart.setOption(fourthOption);

	var posList = [
		'left', 'right', 'top', 'bottom',
		'inside',
		'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
		'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
	];
	var app ={}

	app.configParameters = {
		rotate: {
			min: -90,
			max: 90
		},
		align: {
			options: {
				left: 'left',
				center: 'center',
				right: 'right'
			}
		},
		verticalAlign: {
			options: {
				top: 'top',
				middle: 'middle',
				bottom: 'bottom'
			}
		},
		position: {
			options: echarts.util.reduce(posList, function (map, pos) {
				map[pos] = pos;
				return map;
			}, {})
		},
		distance: {
			min: 0,
			max: 100
		}
	};

	app.config = {
		rotate: 90,
		align: 'left',
		verticalAlign: 'middle',
		position: 'insideBottom',
		distance: 15,
		onChange: function () {
			var labelOption = {
				normal: {
					rotate: app.config.rotate,
					align: app.config.align,
					verticalAlign: app.config.verticalAlign,
					position: app.config.position,
					distance: app.config.distance
				}
			};
			myChart.setOption({
				series: [{
					label: labelOption
				}, {
					label: labelOption
				}, {
					label: labelOption
				}, {
					label: labelOption
				}]
			});
		}
	};


	var labelOption = {
		normal: {
			show: true,
			position: app.config.position,
			distance: app.config.distance,
			align: app.config.align,
			verticalAlign: app.config.verticalAlign,
			rotate: app.config.rotate,
			formatter: '{c}  {name|{a}}',
			fontSize: 16,
			rich: {

			},
			color :  '#eeeeee'
		}
	};
	var fifthLegend = ['支付宝', '微信', '银联', '现金', '其他']
	var fifthOption = {
		title : {
			text: '各航班订单支付渠道统计',
			x:'center'
		},
		dataZoom: [
			{
				show: true,
				start: 0,
				end: 100,
			},
			{
				type: 'inside',
				start: 20,
				end: 80,
			}
		],
		grid:{
			x:'6%',
			y:'20%'

		},
		backgroundColor: {
			type: 'pattern',
			repeat: 'repeat'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			data: fifthLegend,
			top:'10%'
		},
		toolbox: {

		},
		calculable: true,
		xAxis: [
			{
				type: 'category',
				axisTick: {show: false},
				data: [
				"MF8527",
				"SC8748",
				"SC4599",
				"SC4960",
				"MF8581"]
			}
		],
		yAxis: [
			{
				type: 'value'
			}
		],
		series: [
			{
				name: '支付宝',
				type: 'bar',
				barGap: 0,
				label: labelOption,
				data: [320, 332, 301, 334, 390]
			},
			{
				name: '微信',
				type: 'bar',
				label: labelOption,
				data: [220, 182, 191, 234, 290]
			},
			{
				name: '银联',
				type: 'bar',
				label: labelOption,
				data: [150, 232, 201, 154, 190]
			},
			{
				name: '现金',
				type: 'bar',
				label: labelOption,
				data: [98, 77, 101, 99, 40]
			},
			{
				name: '其他',
				type: 'bar',
				label: labelOption,
				data: [98, 77, 101, 99, 40]
			}
		]
	};
	fifthChart.setOption(fifthOption);
    var sixSeriesDataSort = [50000, 35000, 28000, 35000, 10000];
	var sixSeriesData = [50000, 35000, 28000, 35000, 10000];
	var indicatorMax = sixSeriesDataSort.sort(compareNum)[0]+sixSeriesDataSort.sort(compareNum)[sixSeriesDataSort.length-1];
	var sixOption = {
		grid:{
			x:'4%',
			y:'30%'

		},
		backgroundColor: {
			type: 'pattern',
			repeat: 'repeat'
		},
		title: {
			text: '订单支付渠道雷达图',
			x:"center"
		},
		tooltip: {},
		legend: {
			top : '6%',
			data: ['支付雷达'],
			orient: 'horizontal',
		},
		radar: {
			// shape: 'circle',
			center: ['50%', '60%'],
			name: {
				textStyle: {
					color: '#fff',
					backgroundColor: '#72ccff',
					borderRadius: 3,
					padding: [3, 5]
				}
			},
			indicator: [
				{ name: '支付宝', max: indicatorMax},
				{ name: '微信', max: indicatorMax},
				{ name: '银联', max: indicatorMax},
				{ name: '现金', max: indicatorMax},
				{ name: '其他', max: indicatorMax}
			],
			splitArea : {
				show : true,
				areaStyle : {
					color: 'rgba(0,0,0,0)'
				}
			},
			splitLine : {
				show : true,
				lineStyle : {
					width : 1,
					color : '#72ccff'
				}
			}

		},
		series: [{
			name: '订单支付统计',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : sixSeriesData,
					name : '支付雷达'
				}
			]
		}]
	};
	sixthChart.setOption(sixOption);

	window.onresize = function () {
		firstChart.resize();
		secondChart.resize();
		thirdChart.resize();
		fourthChart.resize();
		fifthChart.resize();
		sixthChart.resize();

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

function drawLayer02Label(canvasObj,text,textBeginX,lineEndX){
	var colorValue = '#04918B';

	var ctx = canvasObj.getContext("2d");

	ctx.beginPath();
	ctx.arc(35,55,2,0,2*Math.PI);
	ctx.closePath();
	ctx.fillStyle = colorValue;
	ctx.fill();

	ctx.moveTo(35,55);
	ctx.lineTo(60,80);
	ctx.lineTo(lineEndX,80);
	ctx.lineWidth = 1;
	ctx.strokeStyle = colorValue;
	ctx.stroke();

	ctx.font='12px Georgia';
	ctx.fillStyle = colorValue;
	ctx.fillText(text,textBeginX,92);
}

function sum(arr) {
	return arr.reduce(function(prev, curr, idx, arr){
		return prev + curr;
	});
}





