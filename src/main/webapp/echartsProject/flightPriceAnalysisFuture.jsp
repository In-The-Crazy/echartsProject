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

    <script type="text/javascript" src="<%=root%>/js/echartsProject/flightPriceAnalysisFuturen.js"></script>

</head>
<body>
<div class="div_grid" align="center">
    <div id="toolbar" class="toolbar" border="false">

        <div class="buttonbar">
            <div align="left">
                <form id="conditionForm" name="conditionForm">

                    <fieldset style="width: 230px;!important;">
                        <input type="text" id="fromCity" name="fromCity" value="TAO"/>
                        -
                        <input type="text" id="arriveCity" name="arriveCity" value="XMN"/>
                    </fieldset>
                    <fieldset  style="width: 290px;!important;">
                        <input id="takeOffTimeStart" name="takeOffTimeStart">
                    </fieldset>
                    <fieldset  style="width: 290px;!important;">
                        <input id="takeOffTimeEnd" name="takeOffTimeEnd">
                    </fieldset>
                    <br>
                    <fieldset class="scheduleOne" style="width: 125px;!important;margin-left: 10px">
                        <input class="easyui-checkbox" name="schedule" value="1" label="班期：星期一" checked>
                    </fieldset>
                    <fieldset class="schedule" style="width: 90px;!important;">
                        <input class="easyui-checkbox" name="schedule" value="2" label="星期二">
                    </fieldset>
                    <fieldset class="schedule" style="width: 90px;!important;">
                        <input class="easyui-checkbox" name="schedule" value="3" label="星期三">
                    </fieldset>
                    <fieldset class="schedule" style="width: 90px;!important;">
                        <input class="easyui-checkbox" name="schedule" value="4" label="星期四">
                    </fieldset>
                    <fieldset class="schedule" style="width: 90px;!important;">
                        <input class="easyui-checkbox" name="schedule" value="5" label="星期五">
                    </fieldset>
                    <fieldset class="schedule" style="width: 90px;!important;">
                        <input class="easyui-checkbox" name="schedule" value="6" label="星期六">
                    </fieldset>
                    <fieldset class="schedule" style="width: 90px;!important;">
                        <input class="easyui-checkbox" name="schedule" value="0" label="星期日">
                    </fieldset>
                  <a href="javascript:void(0);" class="easyui-linkbutton" icon="icon-search"
                       onclick="ajaxTableAndCharts(1,true)">查询</a>

                </form>
            </div>


        </div>
        <table id="queryTable" title="远期航班运价分析" cellspacing="0"
               cellpadding="0" width="95%" iconCls="icon-edit" height="300px"></table>
<%--        <div id="jzhb" align="left" style="margin-top: 30px;width: 95%">


        </div>--%>
        <div id="firstChart" style="width: 95%;height: 300px;margin-top: 50px;margin-left: 50px;"></div>
        <div id="secondChart" style="width: 95%;height: 350px;margin-top: 50px;margin-left: 50px;margin-bottom: 50px;"></div>

    </div>

</div>


</body>
</html>