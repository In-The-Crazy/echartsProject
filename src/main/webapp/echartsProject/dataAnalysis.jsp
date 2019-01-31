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
    <style type="text/css">

        body{background-image: url(../images/nybj.png);background-size:100% 100%;font-weight:bold;}
        .layer{position:relative;width:100%;}
        #layer01 > div{height:100%;float:left;position:relative;}
        .layer01-data{position: absolute;width: auto;height: 100px;color: white;top: 15px;left: 45%;}
        #layer02 > div{height:100%;float:left;position:relative;}
        .layer02-data{position: absolute;width: auto;height: 100px;color: white;top: 45px;left: 65px;}

    </style>
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
        <script src="<%=root%>/js/ECharts/3.7.1/theme/chalk.js"></script>
        <script src="<%=root%>/js/project/common/formater.js" type="text/javascript"></script>
        <script src="<%=root%>/js/project/common/validator.js" type="text/javascript"></script>
        <script src="<%=root%>/js/ckeditor/ckeditor.js" type="text/javascript"></script>
        <script src="<%=root%>/js/common/handlebars.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="<%=root%>/js/echartsProject/dataAnalysis.js"></script>
</head>
<body>
<div  class="main">
    <div id="layer01" class="layer" style="height:50px;">
        <div id="layer01_01" style="width:100%;">
            <div class="layer01-data">
                <span style="font-size:26px;">航班数据分析</span>
            </div>
        </div>

    </div>
    <div id="layer02" class="layer" style="height:15%;">
        <div id="layer02_01" style="width:20%;">
            <div class="layer02-data">
                <span style="font-size:26px;">400000</span>
                <span style="font-size:16px;">人次</span>
            </div>
            <canvas width="200" height="100"></canvas>
        </div>
        <div id="layer02_02" style="width:20%;">
            <div class="layer02-data">
                <span style="font-size:26px;">400000</span>
                <span style="font-size:16px;">张</span>
            </div>
            <canvas width="200" height="100"></canvas>
        </div>
        <div id="layer02_03" style="width:20%;">
            <div class="layer02-data">
                <span style="font-size:26px;">2000</span>
                <span style="font-size:16px;">张</span>
            </div>
            <canvas width="200" height="100"></canvas>
        </div>
        <div id="layer02_04" style="width:20%;">
            <div class="layer02-data">
                <span style="font-size:26px;">50000</span>
                <span style="font-size:16px;">kg</span>
            </div>
            <canvas width="200" height="100"></canvas>
        </div>
        <div id="layer02_05" style="width:10%;">
            <div class="layer02-data">
                <span style="font-size:26px;">50</span>
                <span style="font-size:16px;">次</span>
            </div>
            <canvas width="120" height="100"></canvas>
        </div>
        <div id="layer02_06" style="width:10%;">
            <div class="layer02-data">
                <span style="font-size:26px;">5</span>
                <span style="font-size:16px;">次</span>
            </div>
            <canvas width="120" height="100"></canvas>
        </div>
    </div>

<div class="div_grid" align="center">
    <div id="toolbar" class="toolbar" border="false" >

        <div align="left">

        </div>
        <div id="seventhChart" style="width: 30%;height: 500px;margin-left: 60px;margin-top: 10px;float: left"></div>
        <div id="eighthChart" style="width: 30%;height: 500px;margin-top: 10px;float: left"></div>
        <div id="ninthChart" style="width: 30%;height: 500px;margin-top: 10px;float: left"></div>
        <div id="tenthChart" style="width: 50%;height: 250px;margin-top: -100px;float: left"></div>
        <div id="elevthChart" style="width: 50%;height: 250px;margin-top: -100px;float: left"></div>

        <div id="firstChart" style="width: 50%;height: 400px;margin-left: 0px;margin-top: 40px;float: left"></div>
<%--        <div align="left" style="margin-top: 30px">
        </div>--%>
        <div id="secondChart" style="width: 50%;height: 400px;margin-left: 0px;margin-top: 40px;float: left"></div>
<%--        <div align="left" style="margin-top: 30px">
        </div>--%>
        <div id="thirdChart" style="width: 100%;height: 800px;margin-left: 50px;margin-top: 40px;float: left"></div>
        <div id="fifthChart" style="width: 55%;height: 500px;margin-left: 50px;margin-top: 40px;float: left"></div>
        <div id="sixthChart" style="width: 35%;height: 500px;margin-left: 50px;margin-top: 40px;float: left"></div>
        <div id="fourthChart" style="width: 95%;height: 700px;margin-left: 50px;margin-top: 40px;float: left"></div>
        <div id="twelfthChart" style="width: 100%;height: 500px;margin-left: 50px;margin-top: 40px;float: left"></div>

    </div>


</div>
</div>

</body>
</html>