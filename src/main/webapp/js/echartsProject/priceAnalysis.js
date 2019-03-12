/** ----------------加载整体表格-------------------------* */
$(function() {
	// 初始化页面角色
	initPage();
	// 加载日历选择
	initDatebox();
	// 加载树型
	ajaxTree();
	// 加载图表数据
	initCharts(1,false);
	initCharts(2,false);
	initCharts(3,false);
	initCharts(4,false);
});


/** --------初始化页面模块 ------ */
function initPage() {

	$("#fromCity").textbox({
		label : '出发城市：',
		labelWidth : 100,
		labelAlign : 'right',
		width : 250
	});
	$("#arriveCity").textbox({
		label : '到达城市：',
		labelWidth : 100,
		labelAlign : 'right',
		width : 250
	});
	$("#firstFightNumber").textbox({
		label : '基准航班：',
		labelWidth : 100,
		labelAlign : 'right',
		width : 250
	});
	$("#secondFightNumber").textbox({
		label : '比对航班：',
		labelWidth : 100,
		labelAlign : 'right',
		width : 250
	});
	$("#thirdFightNumber").textbox({
		label : '航班号：',
		labelWidth : 100,
		labelAlign : 'right',
		width : 250
	});
	$("#fourthFightNumberOne").textbox({
		label : '航班号：',
		labelWidth : 100,
		labelAlign : 'right',
		width : 250
	});
	$("#fourthFightNumberTwo").textbox({
		label : '航班号：',
		labelWidth : 100,
		labelAlign : 'right',
		width : 250
	});

}

/** --------加载日历选择 ------ */
function initDatebox() {
	var today = new Date();
	today = today.pattern("yyyy-MM-dd");
	$('#takeOffTime').datebox({
		label : '起飞日期：',
		labelWidth : 100,
		labelAlign : 'right',
		width : 250,
		value : today,
		editable : false,
		required : false
	});

	$('#takeOffTime').datebox().datebox('calendar').calendar({
		validator: function(date){
			var now = new Date();
			var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			var temp = new Date(now.getTime()+30*24*60*60*1000);
			var d2 = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
			return d2>=date && date>=d1;
		}
	});

	var todayTwo = new Date();
	var daysAgo = new Date(todayTwo.getTime()-6*24*60*60*1000);
	var todayTemp  = todayTwo.pattern("yyyy-MM-dd");
	var daysAgoTemp = daysAgo.pattern("yyyy-MM-dd");

	$('#startTime').datebox({
		label : '采集开始日期：',
		labelWidth : 100,
		labelAlign : 'right',
		width : 250,
		value : daysAgoTemp,
		editable : false,
		required : false
	});
	$('#endTime').datebox({
		label : '采集结束日期：',
		labelWidth : 100,
		labelAlign : 'right',
		width : 250,
		value : todayTemp,
		editable : false,
		required : false
	});
	$('#startTime').datebox().datebox('calendar').calendar({
		validator: function(date){
			var d1 = new Date(daysAgo.getFullYear(), daysAgo.getMonth(), daysAgo.getDate());
			var temp = new Date(daysAgo.getTime()+6*24*60*60*1000);
			var d2 = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
			return d2>=date && date>=d1;
		}
	});

	$('#endTime').datebox().datebox('calendar').calendar({
		validator: function(date){
			var now = new Date();
			var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			var temp = new Date(now.getTime()-6*24*60*60*1000);
			var d2 = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
			return d2<=date && date<=d1;
		}
	});

	$('#fourthstartTime').datebox({
		label : '采集开始日期：',
		labelWidth : 100,
		labelAlign : 'right',
		width : 250,
		value : daysAgoTemp,
		editable : false,
		required : false
	});
	$('#fourthendTime').datebox({
		label : '采集结束日期：',
		labelWidth : 100,
		labelAlign : 'right',
		width : 250,
		value : todayTemp,
		editable : false,
		required : false
	});
	$('#fourthstartTime').datebox().datebox('calendar').calendar({
		validator: function(date){
			var d1 = new Date(daysAgo.getFullYear(), daysAgo.getMonth(), daysAgo.getDate());
			var temp = new Date(daysAgo.getTime()+6*24*60*60*1000);
			var d2 = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
			return d2>=date && date>=d1;
		}
	});

	$('#fourthendTime').datebox().datebox('calendar').calendar({
		validator: function(date){
			var now = new Date();
			var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			var temp = new Date(now.getTime()-6*24*60*60*1000);
			var d2 = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
			return d2<=date && date<=d1;
		}
	});

}

/**
 * 加载树型
 */
function ajaxTree() {
	$('#intervalTime').combobox({
		label : '时间间隔：',
		labelWidth : 100,
		labelAlign : "right",
		data : [{
			"id" : "5",
			"text" : "5分钟",
			"selected" : true
		},{
			"id" : "10",
			"text" : "10分钟"
		},{
			"id" : "30",
			"text" : "30分钟"
		},{
			"id" : "60",
			"text" : "60分钟"
		}],
		valueField : 'id',
		textField:'text',
		width : 250,
		required : true,
		editable : false,
		multiple : false,
		limitToList : true
	});

	$('#fourthHour').combobox({
		label : '小时：',
		labelWidth : 100,
		labelAlign : "right",
		data : [{
			"id" : "00",
			"text" : "00",
			"selected" : true
		},{
			"id" : "01",
			"text" : "01"
		},{
			"id" : "02",
			"text" : "02"
		},{
			"id" : "03",
			"text" : "03"
		},{
			"id" : "04",
			"text" : "04"
		},{
			"id" : "05",
			"text" : "05"
		},{
			"id" : "06",
			"text" : "06"
		},{
			"id" : "07",
			"text" : "07"
		},{
			"id" : "08",
			"text" : "08"
		},{
			"id" : "09",
			"text" : "09"
		},{
			"id" : "10",
			"text" : "10"
		},{
			"id" : "11",
			"text" : "11"
		},{
			"id" : "12",
			"text" : "12"
		},{
			"id" : "13",
			"text" : "13"
		},{
			"id" : "14",
			"text" : "14"
		},{
			"id" : "15",
			"text" : "15"
		},{
			"id" : "16",
			"text" : "16"
		},{
			"id" : "17",
			"text" : "17"
		},{
			"id" : "18",
			"text" : "18"
		},{
			"id" : "19",
			"text" : "19"
		},{
			"id" : "20",
			"text" : "20"
		},{
			"id" : "21",
			"text" : "21"
		},{
			"id" : "22",
			"text" : "22"
		},{
			"id" : "23",
			"text" : "23"
		}],
		valueField : 'id',
		textField:'text',
		width : 250,
		required : true,
		editable : false,
		multiple : false,
		limitToList : true
	});
	$('#fourthMin').combobox({
		label : '分钟：',
		labelWidth : 100,
		labelAlign : "right",
		data : [{
			"id" : "00",
			"text" : "00",
			"selected" : true
		},{
			"id" : "05",
			"text" : "05"
		},{
			"id" : "10",
			"text" : "10"
		},{
			"id" : "15",
			"text" : "15"
		},{
			"id" : "20",
			"text" : "20"
		},{
			"id" : "25",
			"text" : "25"
		},{
			"id" : "30",
			"text" : "30"
		},{
			"id" : "35",
			"text" : "35"
		},{
			"id" : "40"
		},{
			"id" : "45",
			"text" : "45"
		},{
			"id" : "50",
			"text" : "50"
		},{
			"id" : "55",
			"text" : "55"
		}],
		valueField : 'id',
		textField:'text',
		width : 250,
		required : true,
		editable : false,
		multiple : false,
		limitToList : true
	});
}


/** --------加载图表数据 ------ */
function initCharts(queryType,flag) {
	var firstChart = echarts.init(document.getElementById('firstChart'),'roma');
	var secondChart = echarts.init(document.getElementById('secondChart'),'roma');
	var thirdChart = echarts.init(document.getElementById('thirdChart'),'roma');
	var fourthChart = echarts.init(document.getElementById('fourthChart'),'roma');
	var firstOption;
	var secondOption;
	var thirdOption;
	var fourthOption;
	var start =0;
	var end =100;
	var sendData = {};
	sendData.fromCity=$('#fromCity').val();
	sendData.arriveCity=$('#arriveCity').val();
	sendData.takeOffTime=$('#takeOffTime').datebox('getValue');
	sendData.intervalTime=$('#intervalTime').combobox('getValue');
	sendData.firstFightNumber=$('#firstFightNumber').val();
	sendData.secondFightNumber=$('#secondFightNumber').val();
	sendData.thirdFightNumber=$('#thirdFightNumber').val();
	sendData.startTime=$('#startTime').datebox('getValue');
	sendData.endTime=$('#endTime').datebox('getValue');
	sendData.fourthFightNumberOne=$('#fourthFightNumberOne').val();
	sendData.fourthFightNumberTwo=$('#fourthFightNumberTwo').val();
	sendData.fourthstartTime=$('#fourthstartTime').datebox('getValue');
	sendData.fourthendTime=$('#fourthendTime').datebox('getValue');
	sendData.dateTime = $('#fourthHour').combobox('getValue')+":"+$('#fourthMin').combobox('getValue');
	if(queryType==1){
		sendData.queryType = '1';
		var firstLegendArray = [];
		var firstxArray = [];
		var firstSeriesArray = [];
		if(flag){
			$.ajax({
				type : 'post',
				async : false,
				url : root + '/mainSrv/queryChartOne',
				dataType :'json',
				data: sendData,
				success : function(data) {
					if (data != "-1") {
						var num = 0;
						for (var key in data) {
							firstLegendArray.push(key);
							var dataList = data[key];
							var showData = {};
							showData.name = key;
							showData.type = 'line';
							showData.data = [];
							showData.zws = [];
							for (var i = 0; i < dataList.length; i++) {
								var item = dataList[i].split(",");
								if(num==0){
									firstxArray.push(item[0]);
								}
								showData.data.push(item[2]);
								showData.zws.push(item[0]+'-'+item[3])
							}
							firstSeriesArray.push(showData);
							num++;
						}
					}
				}
			});
		}
		firstOption = {
			dataZoom : [
				{
					type: 'slider',
					show: true,
					start: start,
					end: end,
					handleSize: 8
				},
				{
					type: 'inside',
					start: start,
					end: end
				}
			],
			title: {
				text: '航班价格'
			},
			tooltip: {
				/*trigger: 'axis',*/
				trigger: 'item',
				formatter:function(params){//数据格式
					var info =params.name+"</br>";
						info +="航班号："+params.seriesName+"&nbsp;&nbsp;价格："+params.value;
						for(var k=0;k<firstSeriesArray.length;k++){
							if(params.seriesName == firstSeriesArray[k].name){
								for(var j=0;j<firstSeriesArray[k].zws.length;j++){
									var item = firstSeriesArray[k].zws[j].split("-");
									if(item[0] == params.name) {
										info +="&nbsp;&nbsp;座位数："+ item[1];
									}

								}
							}

						}
						info+="</br>";
					//排序显示所有信息
					/*params.sort(compare("value"));
					var info =params[0].name+"</br>";
					for (var i=0;i<params.length;i++){
						info +="航班号："+params[i].seriesName+"&nbsp;&nbsp;价格："+params[i].value;
						for(var k=0;k<firstSeriesArray.length;k++){
							if(params[i].seriesName == firstSeriesArray[k].name){
								for(var j=0;j<firstSeriesArray[k].zws.length;j++){
									var item = firstSeriesArray[k].zws[j].split("-");
									if(item[0] == params[i].name) {
										info +="&nbsp;&nbsp;座位数："+ item[1];
									}

								}
							}

						}

						info+="</br>";
					}*/
					return info;
				}
			},
			legend: {
				data:firstLegendArray
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				},
				right:20
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: firstxArray
			},
			yAxis: {
				type: 'value',
				min: function(value) {
					return value.min/2;
				},
				max: function(value) {
					return value.max + value.min/2;
				}
			},
			series: firstSeriesArray
		};
		firstChart.setOption(firstOption);
	} else if(queryType==2) {
		var secondLegendArray = [];
		secondLegendArray.push("差价");
		var secondxArray = [];
		var secondSeriesArray = [];
		var secondShowData = {};
		secondShowData.name='差价';
		secondShowData.type='line';
		secondShowData.data=[];
		sendData.queryType = '2';
		if(flag) {
			$.ajax({
				type: 'post',
				async: false,
				url: root + '/mainSrv/queryChartOne',
				dataType: 'json',
				data: sendData,
				success: function (data) {
					if (data != -1) {
						for (var i = 0; i < data.length; i++) {
							var item = data[i].split(",");
							secondxArray.push(item[0]);
							secondShowData.data.push(item[1]);
						}
					}

				}
			});
			secondSeriesArray.push(secondShowData);
		}

		secondOption = {
			dataZoom : [
				{
					type: 'slider',
					show: true,
					start: start,
					end: end,
					handleSize: 8,

				},
				{
					type: 'inside',
					start: start,
					end: end
				}
			],
			title: {
				text: '航班价差'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data:secondLegendArray
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				},
				right:20
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: secondxArray
			},
			yAxis: {
				type: 'value',
				min: function(value) {
					return value.min - value.min/2;
				},
				max: function(value) {
					return value.max + value.min/2;
				}
			},
			series: secondSeriesArray
		};
		secondChart.setOption(secondOption);

	} else if(queryType==3){
		var thirdLegendArray = [];
		thirdLegendArray.push('价格');
		var thirdxArray = [];
		var thirdSeriesArray = [];
		sendData.queryType = '3';
		if(flag) {
			$.ajax({
				type: 'post',
				async: false,
				url: root + '/mainSrv/queryChartOne',
				dataType: 'json',
				data: sendData,
				success: function (data) {
					if (data != -1) {
						var thirdShowData = {};
						thirdShowData.name = '价格';
						thirdShowData.type = 'line';
						thirdShowData.data = [];
						thirdShowData.zws = [];
						var num = 1;
						var keys = [];
						for (var key in data) {
							keys.push(key);
						}
						keys.sort(compareDate);
						for (var k = 0; k < keys.length; k++) {
							var date = keys[k].substring(5).replace("-", "/");
							var dataList = data[keys[k]];
							for (var i = 0; i < dataList.length; i++) {
								var item = dataList[i].split(",");
								thirdxArray.push(date + ' ' + item[0]);
								thirdShowData.data.push(item[2]);
								thirdShowData.zws.push(date + ' ' + item[0] + '-' + item[3])
							}
							num++;
						}
						thirdSeriesArray.push(thirdShowData);
					}

				}
			});
		}
		thirdOption = {
			dataZoom : [
				{
					type: 'slider',
					show: true,
					start: start,
					end: end,
					handleSize: 8,

				},
				{
					type: 'inside',
					start: start,
					end: end
				}
			],
			title: {
				text: '航班价格'
			},
			tooltip: {
				trigger: 'axis',
				formatter:function(params){//数据格式
					var info =params[0].name+"</br>";
					info +="航班号："+$('#thirdFightNumber').val()+"&nbsp;&nbsp;价格："+params[0].value;
					console.log(thirdSeriesArray.length);
					for(var k=0;k<thirdSeriesArray.length;k++){
						if(params[0].seriesName == thirdSeriesArray[k].name){
							for(var j=0;j<thirdSeriesArray[k].zws.length;j++){
								var item = thirdSeriesArray[k].zws[j].split("-");
								if(item[0] == params[0].name) {
									info +="&nbsp;&nbsp;座位数："+ item[1];
									break;
								}

							}
						}

					}
					info+="</br>";

					return info;
				}
			},
			legend: {
				data:thirdLegendArray
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				},
				right:20
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: thirdxArray
			},
			yAxis: {
				type: 'value',
				min: function(value) {
					return value.min/2;
				},
				max: function(value) {
					return value.max + value.min/2;
				}
			},
			series: thirdSeriesArray
		};
		thirdChart.setOption(thirdOption);

	} else if(queryType==4){
		sendData.queryType = '4';
		var fourthLegendArray = [];
		var fourthxArray = [];
		var fourthSeriesArray = [];
		if(flag) {
			$.ajax({
				type: 'post',
				async: false,
				url: root + '/mainSrv/queryChartOne',
				dataType: 'json',
				data: sendData,
				success: function (data) {
					if (data != "-1") {
						var num = 0;
						for (var key in data) {
							fourthLegendArray.push(key);
							var dataList = data[key];
							var showData = {};
							showData.name = key;
							showData.type = 'line';
							showData.data = [];
							showData.zws = [];
							for (var i = 0; i < dataList.length; i++) {
								var item = dataList[i].split(",");
								//if (item[1]!=null && item[1]!='' && item[1]!='null'){
									if (num == 0) {
										fourthxArray.push(item[0].substring(5).replace("-", "/"));
									}
									showData.data.push(item[2]);
									showData.zws.push(item[0].substring(5).replace("-", "/") + '-' + item[3])
								//}

							}
							fourthSeriesArray.push(showData);
							num++;
						}
					}
				}
			});
		}
		fourthOption = {
			dataZoom : [
				{
					type: 'slider',
					show: true,
					start: start,
					end: end,
					handleSize: 8
				},
				{
					type: 'inside',
					start: start,
					end: end
				}
			],
			title: {
				text: '航班价格'
			},
			tooltip: {
				/*trigger: 'axis',*/
				trigger: 'item',
				formatter:function(params){//数据格式
					var info =params.name+"</br>";
					info +="航班号："+params.seriesName+"&nbsp;&nbsp;价格："+params.value;
					for(var k=0;k<fourthSeriesArray.length;k++){
						if(params.seriesName == fourthSeriesArray[k].name){
							for(var j=0;j<fourthSeriesArray[k].zws.length;j++){
								var item = fourthSeriesArray[k].zws[j].split("-");
								if(item[0] == params.name) {
									info +="&nbsp;&nbsp;座位数："+ item[1];
								}

							}
						}

					}
					info+="</br>";
					return info;
				}
			},
			legend: {
				data:fourthLegendArray
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				},
				right:20
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: fourthxArray
			},
			yAxis: {
				type: 'value',
				min: function(value) {
					return value.min/2;
				},
				max: function(value) {
					return value.max + value.min/2;
				}
			},
			series: fourthSeriesArray
		};
		fourthChart.setOption(fourthOption);
	}

	window.onresize = function () {
		firstChart.resize();
		secondChart.resize();
		thirdChart.resize();
		fourthChart.resize();

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





