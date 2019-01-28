<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<% String root = request.getContextPath(); %>
<script type="text/javascript">
    window.devicePixelRatio = 2;
    var root = "${pageContext.request.contextPath}";
</script>
<head>

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
        <link rel="shortcut icon" type="image/x-icon" href="<%=root%>/images/redlogo.png" />
        <script src="<%=root%>/js/common/custom.js" type="text/javascript"></script>
        <script src="<%=root%>/js/common/validator.js" type="text/javascript"></script>
        <script src="<%=root%>/js/ECharts/3.7.1/echarts.min.js"></script>
        <script src="<%=root%>/js/ECharts/3.7.1/theme/roma.js"></script>
        <script src="<%=root%>/js/project/common/formater.js" type="text/javascript"></script>
        <script src="<%=root%>/js/project/common/validator.js" type="text/javascript"></script>
        <script src="<%=root%>/js/ckeditor/ckeditor.js" type="text/javascript"></script>
        <script src="<%=root%>/js/common/handlebars.min.js" type="text/javascript"></script>
        <link rel="stylesheet" href="<%=root%>/leaflet/leaflet.css">
        <script src="<%=root%>/dist/main.min.js"></script>

    <script type="text/javascript" src="<%=root%>/js/echartsProject/dataAnalysis.js"></script>

    <style>
        html, body, #map {
            height: 100%;
            padding: 0;
            margin: 0;
        }
        #forkongithub a{background:#000;color:#fff;text-decoration:none;font-family:arial,sans-serif;text-align:center;font-weight:bold;padding:5px 40px;font-size:1rem;line-height:2rem;position:relative;transition:0.5s;}#forkongithub a:hover{background:#c11;color:#fff;}#forkongithub a::before,#forkongithub a::after{content:"";width:100%;display:block;position:absolute;top:1px;left:0;height:1px;background:#fff;}#forkongithub a::after{bottom:1px;top:auto;}@media screen and (min-width:800px){#forkongithub{position:fixed;display:block;top:0;right:0;width:200px;overflow:hidden;height:200px;z-index:9999;}#forkongithub a{width:200px;position:absolute;top:60px;right:-60px;transform:rotate(45deg);-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);box-shadow:4px 4px 10px rgba(0,0,0,0.8);}}
    </style>
</head>
<body>
<div class="div_grid" align="center">
    <div id="toolbar" class="toolbar" border="false" >
<%--       <div align="left">
        </div>
        <div id="map" style="width: 100%;height: 500px;float: left"></div>--%>
        <div align="left">

        </div>
        <div id="firstChart" style="width: 40%;height: 450px;margin-left: 0px;margin-top: 20px;float: left"></div>
<%--        <div align="left" style="margin-top: 30px">
        </div>--%>
        <div id="secondChart" style="width: 60%;height: 450px;margin-left: 0px;margin-top: 20px;float: left"></div>
<%--        <div align="left" style="margin-top: 30px">
        </div>--%>
        <div id="thirdChart" style="width: 100%;height: 900px;margin-left: 50px;margin-top: 20px;margin-bottom: 100px;float: left"></div>
    </div>


</div>


</body>
</html>