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
    <style>
        html, body, #map {
            height: 100%;
            padding: 0;
            margin: 0;
        }
        #forkongithub a{background:#000;color:#fff;text-decoration:none;font-family:arial,sans-serif;text-align:center;font-weight:bold;padding:5px 40px;font-size:1rem;line-height:2rem;position:relative;transition:0.5s;}#forkongithub a:hover{background:#c11;color:#fff;}#forkongithub a::before,#forkongithub a::after{content:"";width:100%;display:block;position:absolute;top:1px;left:0;height:1px;background:#fff;}#forkongithub a::after{bottom:1px;top:auto;}@media screen and (min-width:800px){#forkongithub{position:fixed;display:block;top:0;right:0;width:200px;overflow:hidden;height:200px;z-index:9999;}#forkongithub a{width:200px;position:absolute;top:60px;right:-60px;transform:rotate(45deg);-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);box-shadow:4px 4px 10px rgba(0,0,0,0.8);}}
    </style>
    <html>

    <head>
        <title>航线地图</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <link rel="stylesheet" href="<%=root%>/leaflet/leaflet.css">
        <script src="<%=root%>/dist/main.min.js"></script>
        <script type="text/javascript" src="<%=root%>/js/echartsProject/map.js"></script>




    </head>
<body>
<div class="div_grid" align="center">
    <div id="toolbar" class="toolbar" border="false" >
        <div align="left" style="width: 100%;height: 10px;margin-left: 0px;float: left;">
        </div>
        <div id="map" style="width: 100%;float: left"></div>



    </div>


</div>


</body>
</html>