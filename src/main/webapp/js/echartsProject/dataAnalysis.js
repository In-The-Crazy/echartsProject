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
			left: 'left',
			data: firstLegend
		},
		series : [
			{
				name: '乘客类型',
				type: 'pie',
				radius : '50%',
				center: ['50%', '60%'],
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
							formatter : "{b} : {c} ({d}%)",
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
	secondshowDataone.push({value:1548, name:'成人', selected:true});
	secondshowDataone.push({value:679, name:'儿童'});
	secondshowDataone.push({value:335, name:'婴儿'});
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
			right:50
		},
		series: [
			{
				name:'乘客类型',
				type:'pie',
				selectedMode: 'single',
				radius: [0, '30%'],

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
				label: {
					normal: {
						formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
						backgroundColor: '#eee',
						borderColor: '#aaa',
						borderWidth: 1,
						borderRadius: 4,
						rich: {
							a: {
								color: '#999',
								lineHeight: 22,
								align: 'center'
							},
							hr: {
								borderColor: '#aaa',
								width: '100%',
								borderWidth: 0.5,
								height: 0
							},
							b: {
								fontSize: 16,
								lineHeight: 33
							},
							per: {
								color: '#eee',
								backgroundColor: '#334455',
								padding: [2, 4],
								borderRadius: 2
							}
						}
					}
				},
				data:[
					{value:1048, name:'成人（男）'},
					{value:500, name:'成人（女）'},
					{value:544, name:'儿童（男）'},
					{value:135, name:'儿童（女）'},
					{value:200, name:'婴儿（男）'},
					{value:135, name:'婴儿（女）'},


				]
			}
		]
	};
	secondChart.setOption(secondOption);
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





