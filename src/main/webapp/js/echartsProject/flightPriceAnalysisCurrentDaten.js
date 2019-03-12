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
});


/** --------初始化页面模块 ------ */
function initPage() {

	$("#fromCity").textbox({
		label : '航段：',
		labelWidth : 50,
		labelAlign : 'right',
		width : 120
	});
	$("#arriveCity").textbox({
		label : '',
		labelWidth : 0,
		labelAlign : 'right',
		width : 70
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
	var today = new Date();
	today = today.pattern("yyyy-MM-dd");
	var weeks=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
	var day = new Date(today).getDay();
	$('#today').html("采样时间："+today+'&nbsp;&nbsp;'+weeks[day]+"&nbsp;&nbsp;起飞时间："+today);


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
			"text" : "5分钟"
		},{
			"id" : "10",
			"text" : "10分钟"
		},{
			"id" : "30",
			"text" : "30分钟"
		},{
			"id" : "60",
			"text" : "60分钟",
			"selected" : true
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
	var firstOption;

	var start =0;
	var end =100;
	var sendData = {};
	sendData.fromCity=$('#fromCity').val();
	sendData.arriveCity=$('#arriveCity').val();
	sendData.takeOffTime=$('#takeOffTime').datebox('getValue');
	sendData.intervalTime=$('#intervalTime').combobox('getValue');
	var title = '当日运价监控'+"("+sendData.fromCity+"-"+sendData.arriveCity+")";
	var columns = [];
	var column = [];
	var columnObj = {};
	columnObj.field="rownumbers";
	columnObj.title="";
	columnObj.styler= rownumSytler,
		columnObj.align="center";
	columnObj.formatter=rownumFormater;
	columnObj.width=25;
	column.push(columnObj);
	var columnObj1 = {};
	columnObj1.field="flightNo";
	columnObj1.title="航班号";
	columnObj1.align="center";
	columnObj1.formatter=baseFormater;
	columnObj1.width=100;
	columnObj1.sortable=true;
	column.push(columnObj1);
	var columnObj2 = {};
	columnObj2.field="flightDate";
	columnObj2.title="起飞时间";
	columnObj2.align="center";
	columnObj2.formatter=baseFormater;
	columnObj2.width=100;
	columnObj2.sortable=true;
	column.push(columnObj2);
	var columnObj3 = {};
	columnObj3.field="flightType";
	columnObj3.title="机型";
	columnObj3.align="center";
	columnObj3.formatter=baseFormater;
	columnObj3.width=150;
	columnObj3.sortable=true;
	column.push(columnObj3);
	columns.push(column);
	$('#queryTable').datagrid({
		checkOnSelect : true,// 是否选中/取消复选框
		pagination : true,// 是否分页
		autoRowHeight : true,// 定义是否设置基于该行内容的行高度
		pageNumber : 1,
		pageSize : 10,
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		rownumbers : false,// 是否显示行号
		singleSelect : false,// 是否只能选中一条
		queryParams : sendData,
		nowrap:true,
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			alert('数据加载失败!');
		},
		onLoadSuccess : function(data) {
			console.log(data);
		},
		columns : columns
	});



	if(queryType==1){
		sendData.queryType = '1';
		var firstLegendArray = [];
		var firstxArray = [];
		var firstSeriesArray = [];
		if(flag){
			$.ajax({
				type : 'post',
				async : false,
				url : root + '/mainSrv/flightPriceAnalysisCurrentDate',
				dataType :'json',
				data: {"fromCity":$('#fromCity').val(),"arriveCity":$('#arriveCity').val(),"takeOffTime":$('#takeOffTime').datebox('getValue'),"intervalTime":$('#intervalTime').combobox('getValue'),"page":1,"rows":10},
				success : function(data) {
					if (data.isSuccessOrfail=='SUCCESS') {
						var titleList = data.obj;
						columns = [];
						column = [];
						var columnObj = {};
						columnObj.field="rownumbers";
						columnObj.title="";
						columnObj.styler= rownumSytler,
							columnObj.align="center";
						columnObj.formatter=rownumFormater;
						columnObj.width=25;
						column.push(columnObj);
						var columnObj1 = {};
						columnObj1.field="flightNo";
						columnObj1.title="航班号";
						columnObj1.align="center";
						columnObj1.formatter=baseFormater;
						columnObj1.width=100;
						columnObj1.sortable=true;
						column.push(columnObj1);
						var columnObj2 = {};
						columnObj2.field="flightDate";
						columnObj2.title="起飞时间";
						columnObj2.align="center";
						columnObj2.formatter=baseFormater;
						columnObj2.width=100;
						columnObj2.sortable=true;
						column.push(columnObj2);
						var columnObj3 = {};
						columnObj3.field="flightType";
						columnObj3.title="机型";
						columnObj3.align="center";
						columnObj3.formatter=baseFormater;
						columnObj3.width=150;
						columnObj3.sortable=true;
						column.push(columnObj3);

						for (var key in titleList) {
							var field = titleList[key];
							var columnObj = {};
							columnObj.field=field;
							columnObj.title=field;
							columnObj.align="center";
							columnObj.formatter=baseFormater;
							columnObj.width=100;
							columnObj.sortable=true;
							column.push(columnObj);

						}
						columns.push(column);
					}
				}
			});
			var fitColumns = true;
			if(column.length>10){
				fitColumns = false;
			}
			$('#queryTable').datagrid({
				url : root + '/mainSrv/flightPriceAnalysisCurrentDate',
				checkOnSelect : true,// 是否选中/取消复选框
				pagination : true,// 是否分页
				autoRowHeight : true,// 定义是否设置基于该行内容的行高度
				pageNumber : 1,
				pageSize : 10,
				fitColumns : fitColumns,// 列自适应表格宽度
				striped : true,// 当true时，单元格显示条纹
				rownumbers : false,// 是否显示行号
				singleSelect : false,// 是否只能选中一条
				queryParams : sendData,
				nowrap:true,
				loadMsg : '数据加载中,请稍后...',
				onLoadError : function() {
					alert('数据加载失败!');
				},
				onLoadSuccess : function(data) {
					console.log(data);
				},
				columns : columns
			});
			$.ajax({
				type : 'post',
				async : false,
				url : root + '/mainSrv/flightPriceCurrentDateChart',
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
								showData.zws.push(item[0]+'|'+item[3]+'|'+item[4]+'|'+item[5])
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
				text:title ,
				left: '45%',

			},
			tooltip: {
				/*trigger: 'axis',*/
				trigger: 'item',
				formatter:function(params){//数据格式
					var info =params.name+"</br>";
					var flightDate ='';
					var zws ='';
					var flightType='';

					for(var k=0;k<firstSeriesArray.length;k++){
						if(params.seriesName == firstSeriesArray[k].name){
							for(var j=0;j<firstSeriesArray[k].zws.length;j++){
								var item = firstSeriesArray[k].zws[j].split("|");
								if(item[0] == params.name) {
									flightDate = item[2];
									zws = item[1];
									flightType =item[3];

									//info +="&nbsp;&nbsp;座位数："+ item[1];
								}

							}
						}

					}
					info +="航班号："+params.seriesName+"</br>";
					info +="起飞时间："+flightDate+"" +"</br>";
					info +="机型："+flightType+"" +"</br>";
					info +="价格："+params.value+"</br>";
					info +="座位数："+ zws+"</br>";
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
				},
				extraCssText:"text-align:left"
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				y: 'middle',
				data:firstLegendArray
			},
			grid: {
				left: '15%',
				right: '4%',
				bottom: '10%',
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
					return value.min-20;
					//return value.min/2;
				},
				max: function(value) {
					return value.max +20;
					//return value.max + value.min/2;
				}
			},
			series: firstSeriesArray
		};
		firstChart.setOption(firstOption);
	}

	window.onresize = function () {
		firstChart.resize();

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





