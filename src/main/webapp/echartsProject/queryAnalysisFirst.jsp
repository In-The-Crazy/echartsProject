<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>

<head>
    <title>综合查询</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <%@ include file="../common/js_cs.jsp"%>

    <script type="text/javascript" src="<%=root%>/js/echartsProject/queryAnalysisFirst.js"></script>

</head>
<body>
<%--
<div class="easyui-layout" fit="true"
     style="width: 100%; height: 100%;">
    <div style="width:15%" region="west" split="true" id="west" title="导航菜单">
        <ul id="menuTree">
        </ul>
    </div>

    <div style="width: 85%" region="center" split="true" id="center">
        <div class="easyui-tabs" id="centerTab" fit="true" border="false">
            <div title="首页" style="padding: 20px; overflow: hidden;">
                <div style="margin-top: 20px;">
                    <h2 id="loginDiv"></h2>
                </div>
            </div>
        </div>
--%>


<div class="div_grid" >
    <div id="toolbar" class="toolbar" border="false">
        <div class="buttonbar">

        </div>
        <div align="left">
            <form id="conditionForm" name="conditionForm">
                <fieldset>
                    <input id="queryTime" name="queryTime">
                </fieldset>
                <a href="javascript:void(0);" class="easyui-linkbutton" icon="icon-search"
                   onclick="ajaxTable()">查询</a>
            </form>
        </div>


    </div>
    <div class="tableList" border="false">
        <table id="queryTable" title="综合查询" cellspacing="0"
               cellpadding="0" width="100%" iconCls="icon-edit" height="100%"></table>
    </div>


</div>
<%--        <div region="south" border="false" id="south" style="overflow: hidden;">
            <h3 align="center" style="color: #666; font: 12px arial;">Copyright&nbsp;&copy;&nbsp;2015&nbsp;南京红苹果网络科技有限公司版权所有&nbsp;</h3>
        </div>
</div>
    </div>--%>

</body>
</html>