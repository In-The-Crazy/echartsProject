/** ----------------加载整体表格-------------------------* */
$(function() {
	// 初始化页面模块
	initPage();
	// 加载日历选择
	initDatebox();
	// 加载树型
	ajaxTree();
	// 加载表格数据
	ajaxTable();
});

/** --------加载日历选择 ------ */
function initDatebox() {
}

/** --------初始化页面模块 ------ */
function initPage() {
	var dialog_add = {
		id : "payParamAdd",
		title : "添加"
	};
	
	// 添加窗口
	initDialog(dialog_add);
	$('#payParamAdd').dialog('close');
}
/** --------加载表格数据 ------ */
function ajaxTable() {
	var params = serializeJson("conditionForm");
	// 加载表格
	$('#payParamPreTable').datagrid({
		url : 'payParamPreList.action',
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
		queryParams : params,
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			$.messager.alert('错误提示', '数据加载失败!', 'error');
		},
		onLoadSuccess : function(data) {
		},
		columns : [ [ {
			field : 'rownumbers',
			title : '',
			align : 'center',
			styler : rownumSytler,
			formatter : rownumFormater,
			width : 5
		}, {
			field : 'id',
			checkbox : 'true',
			align : 'center',
			width : 25
		}, {
			field : 'codeType',
			title : '支付参数类型',
			align : 'center',
			formatter : baseFormater,
			width : 75
		}, {
			field : 'codeValue',
			title : '支付参数代码',
			align : 'center',
			formatter : baseFormater,
			width : 75
		}, {
			field : 'codeName',
			title : '支付参数名称',
			align : 'center',
			formatter : baseFormater,
			width : 75
		}, {
			field : 'codeDesc',
			title : '支付参数描述',
			align : 'center',
			formatter : baseFormater,
			width : 75
		} ] ]
	});
}

/** --------加载树形 ------ */
function ajaxTree() {
	$('#add_codeType').combobox({
		data: [{
			"id" : "PAY_CODE",
			"text" : "支付通道"
		},{
			"id" : "PAY_METHOD",
			"text" : "支付方式"
		}],
		valueField:'id',
		textField:'text'
	});
	$('#add_codeType').combobox('select', 'PAY_CODE');
}

/** --------根据页面宽度重置表格宽度 ------ */
window.onresize = function() {
	$('#payParamPreTable').datagrid('resize');
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

/** --------查看会员详情 ------ */
function getInfo(id, flag) {
}

/** -------- 添加 ------ */
function addpayParam(){
	var params = serializeJson("payParamAddForm");
	var add = {
		url : 'addPayCodeOrMethod.action',
		data : params,
		callBackFun : function(data) {
			if (data.isSuccessOrfail == "SUCCESS") {
				reloadTable("payParamPreTable");
			}
			$('#payParamAdd').dialog('close');
			showMessage(data);
			SoftwareVersionAddReset();
		}
	}
	sendAjaxRequest(add);
}

/** -------- 批量删除 ------ */
function payParamPredelete() {
	var selecteds = $('#payParamPreTable').datagrid('getSelections');
	if(selecteds.length==0){
		$.messager.alert('错误提示', '请选择记录!', 'error');
		return false;
	}
	if ($('#payParamPreTable').datagrid('getSelected')) {
		var ids = [];
		var codeTypes = [];
		var selectedRow = $('#payParamPreTable').datagrid('getSelections');
		for (var i = 0; i < selectedRow.length; i++) {
			ids.push(selectedRow[i].codeValue);//记得改ID
			codeTypes.push(selectedRow[i].codeType);//记得改ID
		}
		var dpid = ids.join(',');
		var type = codeTypes.join(',');
		$.messager.confirm('删除提示', '是否确认删除? ', function(r) {
			// 首先如果用户选择了数据，则获取选择的数据集合
			if (r) {
				var url = 'deletePayCodeOrMethod.action';
				var options = {
					url : url,
					data : {
						"codeType" : type,
						"ids" : dpid
					},
					callBackFun : function(data) {
						if (data.isSuccessOrfail == "SUCCESS") {
							reloadTable("payParamPreTable");
						}
						showMessage(data);
					}
				}
				sendAjaxRequest(options);
			}
		});
	}
}

/** -------- 重置查询条件 ------ */
function payParamPreReset() {
	$('#conditionForm').form('clear');
	$('#sourceid').val('sdal');
	initDatebox();
}
function payParamAddReset() {
	$('#payParamAddForm').form('clear');
	$('#add_codeType').combobox('select', '0');
}
