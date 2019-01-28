/** ----------------加载整体表格-------------------------* */
var channels=[];
$(function() {
	// 初始化页面角色
	initPage();
	// 加载日历选择
	initDatebox();
	// 加载树型
	ajaxTree();
	// 加载表格数据
	ajaxTable();

});

/**
 * 加载树型
 */
function ajaxTree() {

}

/** --------初始化页面模块 ------ */
function initPage() {

}

/** --------加载日历选择 ------ */
function initDatebox() {
	var today = new Date();
	today = today.pattern("yyyy-MM-dd");
	$('#queryTime').datebox({
		label : '查询日期：',
		labelWidth : 100,
		labelAlign : 'right',
		width : 250,
		editable : false,
		required : false,
		value : today
	});
}



/** --------加载表格数据 ------ */
function ajaxTable() {
	// 验证时间
	var queryTime = $('#queryTime').datebox('getValue');
	var params = {"queryTime":queryTime};
	// 加载表格
	$('#queryTable').datagrid({
		url : root + '/mainSrv/queryTableOne',
		toolbar : '#toolbar',
		checkOnSelect : true,// 是否选中/取消复选框
		pagination : true,// 是否分页
		autoRowHeight : true,// 定义是否设置基于该行内容的行高度
		pageNumber : 1,
		pageSize : 30,
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		rownumbers : false,// 是否显示行号
		singleSelect : false,// 是否只能选中一条
		queryParams : params,
		nowrap:false,
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			alert('数据加载失败!');
		},
		onLoadSuccess : function(data) {
			console.log(data);
		},
		columns : [ [ {
			field : 'rownumbers',
			title : '',
			align : 'center',
			styler : rownumSytler,
			formatter : rownumFormater,
			width : 25
		}, {
			field : 'sj',
			title : '时间',
			align : 'center',
			formatter : baseFormater,
			width : 100
		}, {
			field : 'cxs',
			title : '查询数',
			align : 'center',
			formatter : baseNumFormater,
			width : 50
		}, {
			field : 'dzs',
			title : '定座数',
			align : 'center',
			formatter : baseNumFormater,
			width : 50
		}, {
			field : 'cps',
			title : '出票数',
			align : 'center',
			formatter : baseNumFormater,
			width : 50
		}, {
			field : 'zfje',
			title : '支付金额',
			align : 'center',
			formatter : baseNumFormater,
			width : 50
		}, {
			field : 'tps',
			title : '退票数',
			align : 'center',
			formatter : baseNumFormater,
			width : 50
		}, {
			field : 'tpje',
			title : '退票金额',
			align : 'center',
			formatter : baseNumFormater,
			width : 50
		}] ]
	})

}



/** --------根据页面宽度重置表格宽度 ------ */
window.onresize = function() {
	$('.easyui-panel').panel('resize');
};

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













