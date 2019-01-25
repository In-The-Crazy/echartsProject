<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<% String root = request.getContextPath(); %>
<script type="text/javascript">
    var root = "${pageContext.request.contextPath}";

</script>
<html>

<head>
    <title>数据分析</title>
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
    <link rel="shortcut icon" type="image/x-icon" href="<%=root%>/images/redlogo.png" />
    <script src="<%=root%>/js/common/custom.js" type="text/javascript"></script>
    <script src="<%=root%>/js/common/validator.js" type="text/javascript"></script>
    <script src="<%=root%>/js/ECharts/3.7.1/echarts.min.js"></script>
    <script src="<%=root%>/js/ECharts/3.7.1/theme/roma.js"></script>
    <script src="<%=root%>/js/project/common/formater.js" type="text/javascript"></script>
    <script src="<%=root%>/js/project/common/validator.js" type="text/javascript"></script>
    <script src="<%=root%>/js/ckeditor/ckeditor.js" type="text/javascript"></script>
    <script src="<%=root%>/js/common/handlebars.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="<%=root%>/js/echartsProject/dataAnalysis.js"></script>

</head>
<body>
<div class="div_grid" align="center">
    <div id="toolbar" class="toolbar" border="false">
        <div align="left">
        </div>
        <div id="firstChart" style="width: 45%;height: 350px;margin-left: 50px;margin-top: 20px;float: left"></div>
        <div align="left" style="margin-top: 30px">
        </div>
        <div id="secondChart" style="width: 45%;height: 350px;margin-left: 50px;margin-top: 20px;float: left"></div>
        <div align="left" style="margin-top: 30px">
        </div>
        <div id="thirdChart" style="width: 30%;height: 350px;margin-left: 50px;margin-top: 20px;float: left"></div>
    </div>


</div>


</body>
</html>