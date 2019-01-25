<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<% String root = request.getContextPath(); %>
<script type="text/javascript">
    var root = "${pageContext.request.contextPath}";

</script>
<html>

<head>
    <title>运价对比</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <link href="<%=root%>/js/jquery/themes/default/easyui.css" rel="stylesheet" type="text/css" id="themes" />
    <link href="<%=root%>/js/jquery/themes/icon.css" rel="stylesheet" type="text/css" />
    <link href="<%=root%>/css/layout.css" rel="stylesheet" type="text/css" />
    <link href="<%=root%>/css/custom.css" rel="stylesheet" type="text/css" />
    <script src="<%=root%>/js/jquery/jquery.min.js" type="text/javascript"></script>
    <script src="<%=root%>/js/jquery/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="<%=root%>/js/jquery/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <script src="<%=root%>/js/jquery/plugins/jquery.form.js" type="text/javascript"></script>
    <script src="<%=root%>/js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <link rel="shortcut icon" type="image/x-icon" href="<%=root%>/images/shandongair.png" />
    <script src="<%=root%>/js/common/custom.js" type="text/javascript"></script>
    <script src="<%=root%>/js/common/validator.js" type="text/javascript"></script>
    <script src="<%=root%>/js/ECharts/3.7.1/echarts.min.js"></script>
    <script src="<%=root%>/js/ECharts/3.7.1/theme/roma.js"></script>
    <script src="<%=root%>/js/project/common/formater.js" type="text/javascript"></script>
    <script src="<%=root%>/js/project/common/validator.js" type="text/javascript"></script>
    <script src="<%=root%>/js/ckeditor/ckeditor.js" type="text/javascript"></script>
    <script src="<%=root%>/js/common/handlebars.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="<%=root%>/js/echartsProject/priceAnalysis.js"></script>

</head>
<body>
<div class="div_grid" align="center">
    <div id="toolbar" class="toolbar" border="false">
        <div class="buttonbar">

        </div>
        <div align="left">
            <form id="conditionForm" name="conditionForm">
                <fieldset>
                    <input type="text" id="fromCity" name="fromCity" value="TAO"/>
                </fieldset>
                <fieldset style="margin-left: -50px!important;">
                    <input type="text" id="arriveCity" name="arriveCity" value="XMN"/>
                </fieldset>
                <fieldset style="margin-left: -50px!important;">
                    <input id="takeOffTime" name="takeOffTime">
                </fieldset>
                <fieldset style="margin-left: -50px!important;">
                    <select id="intervalTime" name="intervalTime" class="easyui-combobox" editable="false">
                    </select>
                </fieldset>
                <a href="javascript:void(0);" class="easyui-linkbutton" icon="icon-search"
                   onclick="initCharts(1)">查询</a>
            </form>
        </div>
        <div id="firstChart" style="width: 90%;height: 350px;margin-top: 20px"></div>
        <div align="left" style="margin-top: 30px">
            <form id="conditionFormtwo" name="conditionFormtwo">
                <fieldset>
                    <input type="text" id="firstFightNumber" name="firstFightNumber" value="MF8528"/>
                </fieldset>
                <fieldset style="margin-left: -50px!important;">
                    <input type="text" id="secondFightNumber" name="secondFightNumber" value="SC4956"/>
                </fieldset>
                <a href="javascript:void(0);" class="easyui-linkbutton" icon="icon-search"
                   onclick="initCharts(2)">查询</a>
            </form>
        </div>
        <div id="secondChart" style="width: 90%;height: 350px;margin-top: 20px"></div>
        <div align="left" style="margin-top: 30px">
            <form id="conditionFormThree" name="conditionFormThree">
                <fieldset>
                    <input type="text" id="thirdFightNumber" name="thirdFightNumber" value="SC8749"/>
                </fieldset>
                <fieldset style="margin-left: -30px!important;">
                    <input id="startTime" name="startTime">
                </fieldset>
                <fieldset style="margin-left: -30px!important;">
                    <input id="endTime" name="endTime">
                </fieldset>
                <a href="javascript:void(0);" class="easyui-linkbutton" icon="icon-search"
                   onclick="initCharts(3)">查询</a>
            </form>
        </div>
        <div id="thirdChartDivs"></div>
    </div>
    <div id="thirdChart" style="width: 90%;height: 350px;margin-top: 20px;margin-bottom: 100px;"></div>


</div>


</body>
</html>