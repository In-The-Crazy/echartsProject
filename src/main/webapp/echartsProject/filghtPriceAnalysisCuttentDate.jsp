<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<% String root = request.getContextPath(); %>
<script type="text/javascript">
    window.devicePixelRatio = 2;
    var root = "${pageContext.request.contextPath}";
</script>
<html>

<head>
    <title>航班维度数据分析</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <link href="<%=root%>/js/jquery/jquery-easyui-1.7.5/themes/default/easyui.css" rel="stylesheet" type="text/css"/>
    <link href="<%=root%>/js/jquery/jquery-easyui-1.7.5/themes/icon.css" rel="stylesheet" type="text/css" />
    <link href="<%=root%>/js/jquery/jquery-easyui-1.7.5/demo/demo.css" rel="stylesheet" type="text/css" />
    <link href="<%=root%>/css/layout.css" rel="stylesheet" type="text/css" />
    <link href="<%=root%>/css/custom.css" rel="stylesheet" type="text/css" />
    <script src="<%=root%>/js/jquery/jquery-easyui-1.7.5/jquery.min.js" type="text/javascript"></script>
    <script src="<%=root%>/js/jquery/jquery-easyui-1.7.5/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="<%=root%>/js/jquery/jquery-easyui-1.7.5/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <script src="<%=root%>/js/jquery/jquery-easyui-1.7.5/plugins/jquery.form.js" type="text/javascript"></script>
    <script src="<%=root%>/js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <link rel="shortcut icon" type="image/x-icon" href="<%=root%>/images/redlogo.png" />
    <script src="<%=root%>/js/common/custom.js" type="text/javascript"></script>
    <script src="<%=root%>/js/common/validator.js" type="text/javascript"></script>
    <script src="<%=root%>/js/ECharts/3.7.1/echarts.min.js"></script>
    <script src="<%=root%>/js/ECharts/3.7.1/theme/roma.js"></script>
    <script src="<%=root%>/js/project/common/formater.js" type="text/javascript"></script>
    <script src="<%=root%>/js/project/common/validator.js" type="text/javascript"></script>
    <script src="<%=root%>/js/ckeditor/ckeditor.js" type="text/javascript"></script>
    <script src="<%=root%>/js/common/handlebars.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="<%=root%>/js/echartsProject/flightPriceAnalysisCurrentDaten.js"></script>

</head>
<body>

<div class="div_grid" align="center">
    <div id="toolbar" class="toolbar" border="false">
        <div class="buttonbar">

        </div>
        <div align="left" style="margin-bottom: 10px">
            <form id="conditionForm" name="conditionForm">
                <fieldset style="width: 500px;!important;margin-left: 25px">
                    <span id="today" style="font-size: 16px;font-weight: 600"></span>
                </fieldset><br>
                <fieldset style="width: 230px; !important;margin-left: 15px">
                    <input type="text" id="fromCity" name="fromCity" value="TAO"/>
                    -
                    <input type="text" id="arriveCity" name="arriveCity" value="XMN"/>
                </fieldset>
                <fieldset style="margin-left: -50px!important;display: none">
                    <input id="takeOffTime" name="takeOffTime">
                </fieldset>
                <fieldset style="margin-left: -50px!important;">
                    <select id="intervalTime" name="intervalTime" class="easyui-combobox" editable="false">
                    </select>
                </fieldset>
                <a href="javascript:void(0);" class="easyui-linkbutton" icon="icon-search"
                   onclick="initCharts(1,true)">查询</a>
            </form>
        </div>
        <table id="queryTable" title="当日运价监控" cellspacing="0"
               cellpadding="0" width="95%" iconCls="icon-edit" height="300px"></table>
        <div id="firstChart" style="width: 95%;height: 350px;margin-top: 20px;margin-bottom: 50px"></div>


</div>


</body>
</html>