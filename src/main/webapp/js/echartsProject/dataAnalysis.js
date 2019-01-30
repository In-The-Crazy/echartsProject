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
	var seventhChart = echarts.init(document.getElementById('seventhChart'),'chalk');
	var eighthChart = echarts.init(document.getElementById('eighthChart'),'chalk');
	var ninthChart = echarts.init(document.getElementById('ninthChart'),'chalk');
	var tenthChart = echarts.init(document.getElementById('tenthChart'),'chalk');
	var elevthChart = echarts.init(document.getElementById('elevthChart'),'chalk');

	var firstLegend = [];
	firstLegend.push("会员");
	firstLegend.push("非会员");
	firstLegend.push("成人（会员）");
	firstLegend.push("成人（非会员）");
	firstLegend.push("儿童（会员）");
	firstLegend.push("儿童（非会员）");
	firstLegend.push("婴儿（会员）");
	firstLegend.push("婴儿（非会员）");
	var firstshowDataone = [];
	firstshowDataone.push({value: 1548, name: '会员'});
	firstshowDataone.push({value: 1014, name: '非会员'});
	var firstshowDatatwo = [];
	firstshowDatatwo.push({value: 1048, name: '成人（会员）'});
	firstshowDatatwo.push({value: 300, name: '儿童（会员）'});
	firstshowDatatwo.push({value: 200, name: '婴儿（会员）'});
	firstshowDatatwo.push({value: 500, name: '成人（非会员）'});
	firstshowDatatwo.push({value: 300, name: '儿童（非会员）'});
	firstshowDatatwo.push({value: 214, name: '婴儿（非会员）'});
	var firstOption = {
		backgroundColor: {
			type: 'pattern',
			repeat: 'repeat'
		},
		title: {
			text: '乘客类型(会员)',
			x: 'center',
			left: '50%'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data: firstLegend,
			left: '10%'
		},
		series: [
			{
				name: '乘客类型',
				type: 'pie',
				selectedMode: 'single',
				radius: [0, '30%'],
				center: ['60%', '50%'],
				label: {
					normal: {
						position: 'inner',
						color: 'black'
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: firstshowDataone
			},
			{
				name: '乘客类型',
				type: 'pie',
				radius: ['40%', '55%'],
				center: ['60%', '50%'],
				label: {
					normal: {
						position: 'outside',
						formatter: "{b} : {c} \n ({d}%)",

					}
				},
				data: firstshowDatatwo
			}
		]
	};
	firstChart.setOption(firstOption);
	firstChart.on('legendselectchanged', function (obj) {
		var selected = obj.selected[obj.name];
		var legend = obj.name;
		if (legend == '会员') {
			obj.selected["成人（会员）"] = selected;
			obj.selected["儿童（会员）"] = selected;
			obj.selected["婴儿（会员）"] = selected;

		}
		if (legend == '非会员') {
			obj.selected["成人（非会员）"] = selected;
			obj.selected["儿童（非会员）"] = selected;
			obj.selected["婴儿（非会员）"] = selected;
		}
/*		if (legend == '婴儿') {


		}*/
		firstOption.legend.selected = obj.selected;
		firstChart.setOption(firstOption, true);
	});
	firstChart.on('pieselectchanged', function (obj) {
		debugger;
		var selected = obj.selected[obj.name];
		console.log(obj.selected);
		var name = obj.name;
		firstshowDatatwo = [];
		if (selected) {
			if (name == '会员') {
				firstshowDataone[0].selected = true;
				firstshowDatatwo.push({value: 1048, name: '成人（会员）'});
				firstshowDatatwo.push({value: 300, name: '儿童（会员）'});
				firstshowDatatwo.push({value: 200, name: '婴儿（会员）'});
			}
			if (name == '非会员') {
				firstshowDataone[1].selected = true;
				firstshowDatatwo.push({value: 500, name: '成人（非会员）'});
				firstshowDatatwo.push({value: 300, name: '儿童（非会员）'});
				firstshowDatatwo.push({value: 214, name: '婴儿（非会员）'});

			}
/*			if (name == '婴儿') {
				firstshowDataone[2].selected = true;
			}*/
		} else {
			firstshowDataone[0].selected = false;
			firstshowDataone[1].selected = false;
			//firstshowDataone[2].selected = false;
			firstshowDatatwo.push({value: 1048, name: '成人（会员）'});
			firstshowDatatwo.push({value: 300, name: '儿童（会员）'});
			firstshowDatatwo.push({value: 200, name: '婴儿（会员）'});
			firstshowDatatwo.push({value: 500, name: '成人（非会员）'});
			firstshowDatatwo.push({value: 300, name: '儿童（非会员）'});
			firstshowDatatwo.push({value: 214, name: '婴儿（非会员）'});
		}
		firstOption.series[1].data = firstshowDatatwo;
		firstChart.setOption(firstOption, true);

	});
	firstChart.setOption(firstOption);
	var secondLegend = [];
	secondLegend.push("男");
	secondLegend.push("女");
	secondLegend.push("成人（男）");
	secondLegend.push("成人（女）");
	secondLegend.push("儿童（男）");
	secondLegend.push("儿童（女）");
	secondLegend.push("婴儿（男）");
	secondLegend.push("婴儿（女）");
	var secondshowDataone = [];
	secondshowDataone.push({value:1548, name:'男'});
	secondshowDataone.push({value:1041, name:'女'});
	var secondshowDatatwo = [];
	secondshowDatatwo.push({value:1048, name:'成人（男）'});
	secondshowDatatwo.push({value:300, name:'儿童（男）'});
	secondshowDatatwo.push({value:200, name:'婴儿（男）'});
	secondshowDatatwo.push({value:500, name:'成人（女）'});
	secondshowDatatwo.push({value:300, name:'儿童（女）'});
	secondshowDatatwo.push({value:214, name:'婴儿（女）'});
	var secondOption = {
		backgroundColor: {
			type: 'pattern',
			repeat: 'repeat'
		},
		title : {
			text: '乘客类型(性别)',
			x:'center',
			left:'50%'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data:secondLegend,
			left:'10%'
		},
		series: [
			{
				name:'乘客类型',
				type:'pie',
				selectedMode: 'single',
				radius: [0, '30%'],
				center: ['60%', '50%'],
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
				center: ['60%', '50%'],
				label: {
					normal: {
						position: 'outside',
						formatter : "{b} : {c}\n ({d}%)",

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
		if (legend=='男') {
			obj.selected["成人（男）"]=selected;
			obj.selected["儿童（男）"]=selected;
			obj.selected["婴儿（男）"]=selected;

		}
		if (legend=='女') {
			obj.selected["成人（女）"]=selected;
			obj.selected["儿童（女）"]=selected;
			obj.selected["婴儿（女）"]=selected;
		}
/*		if (legend=='婴儿') {


		}*/
		secondOption.legend.selected = obj.selected;
		secondChart.setOption(secondOption, true);
	});
	secondChart.on('pieselectchanged', function (obj) {
		var selected = obj.selected[obj.name];
		console.log(obj.selected);
		var name = obj.name;
		secondshowDatatwo = [];
		if(selected){
			if (name=='男') {
				secondshowDataone[0].selected=true;
				secondshowDatatwo.push({value:1048, name:'成人（男）'});
				secondshowDatatwo.push({value:300, name:'儿童（男）'});
				secondshowDatatwo.push({value:200, name:'婴儿（男）'});

			}
			if (name=='女') {
				secondshowDataone[1].selected=true;
				secondshowDatatwo.push({value:500, name:'成人（女）'});
				secondshowDatatwo.push({value:300, name:'儿童（女）'});
				secondshowDatatwo.push({value:214, name:'婴儿（女）'});
			}
	/*		if (name=='婴儿') {
				secondshowDataone[2].selected=true;


			}*/
		} else {
			secondshowDataone[0].selected=false;
			secondshowDataone[1].selected=false;
			//secondshowDataone[2].selected=false;
			secondshowDatatwo.push({value:1048, name:'成人（男）'});
			secondshowDatatwo.push({value:300, name:'儿童（男）'});
			secondshowDatatwo.push({value:200, name:'婴儿（男）'});
			secondshowDatatwo.push({value:500, name:'成人（女）'});
			secondshowDatatwo.push({value:300, name:'儿童（女）'});
			secondshowDatatwo.push({value:214, name:'婴儿（女）'});
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

	var seventhOption = {
		backgroundColor: {
			type: 'pattern',
			repeat: 'repeat'
		},
		tooltip : {
			formatter: "{a} <br/>{b} : {c}%"
		},
		toolbox: {

		},
		series : [
			{
				name:'业务指标',
				type:'gauge',
				min:0,
				max:100,
				splitNumber:10,
				radius: '55%',
				axisLine: {            // 坐标轴线
					lineStyle: {       // 属性lineStyle控制线条样式
						color: [[0.2, '#ff4500'],[0.8, '#1e90ff'],[1,'lime' ]],
						width: 3,
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				axisLabel: {            // 坐标轴小标记
					textStyle: {       // 属性lineStyle控制线条样式
						fontWeight: 'bolder',
						color: '#fff',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				axisTick: {            // 坐标轴小标记
					length :15,        // 属性length控制线长
					lineStyle: {       // 属性lineStyle控制线条样式
						color: 'auto',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				splitLine: {           // 分隔线
					length :25,         // 属性length控制线长
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						width:3,
						color: '#fff',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				pointer: {           // 分隔线
					shadowColor : '#fff', //默认透明
					shadowBlur: 5
				},
				title : {
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight: 'bolder',
						fontSize: 16,
						color: '#fff',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				detail : {
					backgroundColor: '#d4a4eb',
					borderWidth: 1,
					borderColor: '#fff',
					shadowColor : '#fff', //默认透明
					shadowBlur: 5,
					offsetCenter: [0, '50%'],       // x, y，单位px
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight: 'bolder',
						color: '#fff'
					},
					fontSize :16,
					formatter:'{value}%'
				},
				data:[{value: 80, name: '客座率'}]
			}
		]
	};

	seventhChart.setOption(seventhOption);

	var eighthOption = {
		backgroundColor: {
			type: 'pattern',
			repeat: 'repeat'
		},
		tooltip : {
			formatter: "{a} <br/>{b} : {c}%"
		},
		toolbox: {

		},
		series : [
			{
				name:'业务指标',
				type:'gauge',
				min:0,
				max:100,
				splitNumber:10,
				radius: '55%',
				axisLine: {            // 坐标轴线
					lineStyle: {       // 属性lineStyle控制线条样式
						color: [[0.2, '#ff4500'],[0.8, '#1e90ff'],[1,'lime' ]],
						width: 3,
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				axisLabel: {            // 坐标轴小标记
					textStyle: {       // 属性lineStyle控制线条样式
						fontWeight: 'bolder',
						color: '#fff',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				axisTick: {            // 坐标轴小标记
					length :15,        // 属性length控制线长
					lineStyle: {       // 属性lineStyle控制线条样式
						color: 'auto',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				splitLine: {           // 分隔线
					length :25,         // 属性length控制线长
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						width:3,
						color: '#fff',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				pointer: {           // 分隔线
					shadowColor : '#fff', //默认透明
					shadowBlur: 5
				},
				title : {
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight: 'bolder',
						fontSize: 16,
						color: '#fff',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				detail : {
					backgroundColor: '#d4a4eb',
					borderWidth: 1,
					borderColor: '#fff',
					shadowColor : '#fff', //默认透明
					shadowBlur: 5,
					offsetCenter: [0, '50%'],       // x, y，单位px
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight: 'bolder',
						color: '#fff'
					},
					fontSize :16,
					formatter:'{value}%'
				},
				data:[{value: 90, name: '完成率'}]
			}
		]
	};

	eighthChart.setOption(eighthOption);
	var ninthOption = {
		backgroundColor: {
			type: 'pattern',
			repeat: 'repeat'
		},
		tooltip : {
			formatter: "{a} <br/>{b} : {c}%"
		},
		toolbox: {

		},
		series : [
			{
				name:'业务指标',
				type:'gauge',
				min:0,
				max:100,
				splitNumber:10,
				radius: '55%',
				axisLine: {            // 坐标轴线
					lineStyle: {       // 属性lineStyle控制线条样式
						color: [[0.2, '#ff4500'],[0.8, '#1e90ff'],[1,'lime' ]],
						width: 3,
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				axisLabel: {            // 坐标轴小标记
					textStyle: {       // 属性lineStyle控制线条样式
						fontWeight: 'bolder',
						color: '#fff',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				axisTick: {            // 坐标轴小标记
					length :15,        // 属性length控制线长
					lineStyle: {       // 属性lineStyle控制线条样式
						color: 'auto',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				splitLine: {           // 分隔线
					length :25,         // 属性length控制线长
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						width:3,
						color: '#fff',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				pointer: {           // 分隔线
					shadowColor : '#fff', //默认透明
					shadowBlur: 5
				},
				title : {
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight: 'bolder',
						fontSize: 16,
						color: '#fff',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				detail : {
					backgroundColor: '#d4a4eb',
					borderWidth: 1,
					borderColor: '#fff',
					shadowColor : '#fff', //默认透明
					shadowBlur: 5,
					offsetCenter: [0, '50%'],       // x, y，单位px
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight: 'bolder',
						color: '#fff'
					},
					fontSize :16,
					formatter:'{value}%'
				},
				data:[{value: 20, name: '载运率'}]
			}
		]
	};

	ninthChart.setOption(ninthOption);


	var tenthData = [
		335,
		679,
		1548
	]
	var tenthData2 = [
		335,
		679,
		1548
	]
	tenthData2.sort(compareNum);
	var tenthOption = {
		backgroundColor: {
			type: 'pattern',
			repeat: 'repeat'
		},
		"title": {
			"text": "乘客类型统计",
			"left": "center",
			"y": "0",
			"textStyle": {
				"color": "#fff"
			}
		},
		"grid": {
			"left": "15%",
			"top": "10%",
			"bottom": 10
		},
		"tooltip": {
			"trigger": "item",
			"textStyle": {
				"fontSize": 12
			},
			"formatter": "{b0}:{c0}"
		},
		"xAxis": {
			"max": tenthData2[0]+tenthData2[tenthData2.length-1],
			"splitLine": {
				"show": false
			},
			"axisLine": {
				"show": false
			},
			"axisLabel": {
				"show": false
			},
			"axisTick": {
				"show": false
			}
		},
		"yAxis": [
			{
				"type": "category",
				"inverse": false,
				"data": [
					"婴儿",
					"儿童",
					"成人",
				],
				"axisLine": {
					"show": false
				},
				"axisTick": {
					"show": false
				},
				"axisLabel": {
					"margin": -4,
					"textStyle": {
						"color": "#fff",
						"fontSize": 16.25
					}
				}
			},

		],
		"series": [
			{
				"type": "pictorialBar",
				"symbol": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
				"symbolRepeat": "fixed",
				"symbolMargin": "5%",
				"symbolClip": true,
				"symbolSize": 22.5,
				"symbolPosition": "start",
				"symbolOffset": [
					20,
					0
				],
				"symbolBoundingData": tenthData2[0]+tenthData2[tenthData2.length-1],
				"data": tenthData,
				"z": 10
			},
			{
				"type": "pictorialBar",
				"itemStyle": {
					"normal": {
						"opacity": 0.3
					}
				},
				"label": {
					"normal": {
						"show": false
					}
				},
				"animationDuration": 0,
				"symbolRepeat": "fixed",
				"symbolMargin": "5%",
				"symbol": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
				"symbolSize": 22.5,
				"symbolBoundingData": tenthData2[0]+tenthData2[tenthData2.length-1],
				"symbolPosition": "start",
				"symbolOffset": [
					20,
					0
				],
				"data": tenthData,
				"z": 5
			}
		]
	};

	tenthChart.setOption(tenthOption);

	var elevthLegend = [];
	elevthLegend.push('成人');
	elevthLegend.push('儿童');
	elevthLegend.push('婴儿');
	var elevthshowData = [];
	elevthshowData.push({value:1548, name:'成人'});
	elevthshowData.push({value:679, name:'儿童'});
	elevthshowData.push({value:335, name:'婴儿'});
	var elevthOption = {
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
			data: elevthLegend
		},
		series : [
			{
				name: '乘客类型',
				type: 'pie',
				radius: [0, '80%'],
				center: ['60%', '55%'],
				data:elevthshowData,
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
	elevthChart.setOption(elevthOption);
	window.onresize = function () {
		firstChart.resize();
		secondChart.resize();
		thirdChart.resize();
		fourthChart.resize();
		fifthChart.resize();
		sixthChart.resize();
		seventhChart.resize();
		eighthChart.resize();
		ninthChart.resize();
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





