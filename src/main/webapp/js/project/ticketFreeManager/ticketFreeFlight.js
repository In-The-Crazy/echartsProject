var channels=[];
/** ----------------加载整体表格-------------------------* */
$(function() {
	// 初始化页面模块
	initPage();
	// 加载树型
	ajaxTree();
	// 加载日历选择
	initDatebox();
	// 加载表格数据
	ajaxTable();
	
});

/** --------加载日历选择 ------ */
function initDatebox() {
	$('#add_startSdate,#edit_startSdate').datebox({
		label: '销售开始日期：',
		labelWidth: 100,
		labelAlign: "right",
		required : false,
		editable : false,
		width: 250
	});
	$('#add_endSdate,#edit_endSdate').datebox({
		label: '销售截止日期：',
		labelWidth: 100,
		labelAlign: "right",
		required : false,
		editable : false,
		width: 250
	});
	$('#add_startFdate,#edit_startFdate').datebox({
		label: '航班开始日期：',
		labelWidth: 100,
		labelAlign: "right",
		required : false,
		editable : false,
		width: 250
	});
	$('#add_endFdate,#edit_endFdate').datebox({
		label: '航班截止日期：',
		labelWidth: 100,
		labelAlign: "right",
		required : false,
		editable : false,
		width: 250
	});
}

/** --------初始化页面模块 ------ */
function initPage() {
	$("#add_cabin,#edit_cabin").textbox({
		label: '舱位：',
		labelWidth: 100,
		labelAlign: "right",
		required: true,
		width: 250
	});
	
	var dialog_add = {
		id : "ticketFreeFlightAdd",
		title : "添加"
	};
	var dialog_edit = {
		id : "ticketFreeFlightEdit",
		title : "修改"
	};
	
	// 添加窗口
	initDialog(dialog_add);
	$('#ticketFreeFlightAdd').dialog('close');
	// 修改窗口
	initDialog(dialog_edit);
	$('#ticketFreeFlightEdit').dialog('close');
}
/** --------加载表格数据 ------ */
function ajaxTable() {
	// 加载表格
	$('#ticketFreeFlightTable').datagrid({
		url : root+'/ticketFree/queryFlightList',
		toolbar : "#toolbar",
		checkOnSelect : true,// 是否选中/取消复选框
		pagination : true,// 是否分页
		autoRowHeight : false,// 定义是否设置基于该行内容的行高度
		showHeader : true,
		pageNumber : 1,
		pageSize : 20,
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		rownumbers : false,// 是否显示行号
		singleSelect : false,// 是否只能选中一条
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			$.messager.alert('错误提示', '数据加载失败!', 'error');
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
			field : 'freeId',
			checkbox : 'true',
			align : 'center',
			width : 25
		}, {
			field : 'startSdate',
			title : '销售开始日期',
			align : 'center',
			formatter : baseFormater,
			width : 150
		}, {
			field : 'endSdate',
			title : '销售截止日期',
			align : 'center',
			formatter : baseFormater,
			width : 150
		}, {
			field : 'startFdate',
			title : '航班开始日期',
			align : 'center',
			formatter : baseFormater,
			width : 150
		}, {
			field : 'endFdate',
			title : '航班截止日期',
			align : 'center',
			formatter : baseFormater,
			width : 150
		}, {
			field : 'cabin',
			title : '舱位',
			align : 'center',
			formatter : baseFormater,
			width : 50
		}  ] ]
	});
}

/** --------加载树形 ------ */
function ajaxTree() {
}

/** --------根据页面宽度重置表格宽度 ------ */
window.onresize = function() {
	$('#ticketFreeFlightTable').datagrid('resize');
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

/** --------查看详情 ------ */
function getInfo(flag) {
	var selecteds = $('#ticketFreeFlightTable').datagrid('getSelections');
	if(selecteds.length!=1){
		$.messager.alert('错误提示', '请选择一条记录!', 'error');
		return false;
	}
	
	var selected = $('#ticketFreeFlightTable').datagrid('getSelected');
	$('#ticketFreeFlightEditForm').form('load',selected);
	$("#edit_freeId").val(selected.freeId);
	$('#ticketFreeFlightEdit').dialog('open');
}

/** -------- 添加 ------ */
function addTicketFreeFlight(){
	var addflag = $("#ticketFreeFlightAddForm").form('validate');
	if(!addflag){
		$.messager.alert('错误提示', '请按照规则填写参数！', 'error');
		return false;
	}
	var params = serializeJson("ticketFreeFlightAddForm");
	var add = {
		url : root+'/ticketFree/addTicketFreeFlight',
		data : params,
		callBackFun : function(data) {
			if (data.isSuccessOrfail == "SUCCESS") {
				reloadTable("ticketFreeFlightTable");
			}
			$('#ticketFreeFlightAdd').dialog('close');
			showMessage(data);
			ticketFreeFlightAddReset();
		}
	}
	sendAjaxRequest(add);
}
/** -------- 修改------ */
function editTicketFreeFlight(){
	var editflag = $("#ticketFreeFlightEditForm").form('validate');
	if(!editflag){
		$.messager.alert('错误提示', '请按照规则填写参数！', 'error');
		return false;
	}
	var params = serializeJson("ticketFreeFlightEditForm");
	
	var edit = {
		url : root+'/ticketFree/updateTicketFreeFlight',
		data : params,
		callBackFun : function(data) {
			if (data.isSuccessOrfail == "SUCCESS") {
				reloadTable("ticketFreeFlightTable");
			}
			$('#ticketFreeFlightEdit').dialog('close');
			showMessage(data);
		}
	}
	sendAjaxRequest(edit);
}

/** -------- 批量删除 ------ */
function deleteTicketFreeFlight() {
	var selecteds = $('#ticketFreeFlightTable').datagrid('getSelections');
	if(selecteds.length==0){
		$.messager.alert('错误提示', '请选择记录!', 'error');
		return false;
	}
	if ($('#ticketFreeFlightTable').datagrid('getSelected')) {
		var ids = [];
		var selectedRow = $('#ticketFreeFlightTable').datagrid('getSelections');
		for (var i = 0; i < selectedRow.length; i++) {
			ids.push(selectedRow[i].freeId);//记得改ID
		}
		var dpid = ids.join(',');
		$.messager.confirm('删除提示', '是否确认删除? ', function(r) {
			// 首先如果用户选择了数据，则获取选择的数据集合
			if (r) {
				var url = root+'/ticketFree/deleteTicketFreeFlight';
				var options = {
					url : url,
					data : {
						"ids" : dpid
					},
					callBackFun : function(data) {
						if (data.isSuccessOrfail == "SUCCESS") {
							reloadTable("ticketFreeFlightTable");
						}
						showMessage(data);
					}
				}
				sendAjaxRequest(options);
			}
		});
	}
}

/** -------- 重置条件 ------ */
function ticketFreeFlightAddReset() {
	$('#ticketFreeFlightAddForm').form('reset');
}