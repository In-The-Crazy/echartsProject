/** ----------------加载整体表格-------------------------* */
$(function() {
    // 初始化页面角色
    initPage();
    // 加载日历选择
    initDatebox();
    // 加载树型
    ajaxTree();
    // 加载图表数据
    ajaxTableAndCharts(1,false);
});


/** --------初始化页面模块 ------ */
function initPage() {


    $("#fromCity").textbox({
        label : '航段：',
        labelWidth : 50,
        labelAlign : 'right',
        width : 120
    });
    $("#arriveCity").textbox({
        label : '',
        labelWidth : 0,
        labelAlign : 'right',
        width : 70
    });


}

/** --------加载日历选择 ------ */
function initDatebox() {
    var today = new Date();
    today = today.pattern("yyyy-MM-dd");
    var todayTwo = new Date();
    var daysAgo = new Date(todayTwo.getTime()-30*24*60*60*1000);
    var daysAgoTemp = daysAgo.pattern("yyyy-MM-dd");

    $('#takeOffTimeStart').datebox({
        label : '采集开始时间：',
        labelWidth : 100,
        labelAlign : 'right',
        width : 230,
        value : daysAgoTemp,
        editable : false,
        required : false
    });

    $('#takeOffTimeStart').datebox().datebox('calendar').calendar({
        validator: function(date){
            var now = new Date();
            var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var temp = new Date(now.getTime()-30*24*60*60*1000);
            var d2 = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
            return d2<=date && date<=d1;
        }
    });


    $('#takeOffTimeEnd').datebox({
        label : '采集结束时间：',
        labelWidth : 100,
        labelAlign : 'right',
        width : 230,
        value : today,
        editable : false,
        required : false
    });

    $('#takeOffTimeEnd').datebox().datebox('calendar').calendar({
        validator: function(date){
            var now = new Date();
            var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var temp = new Date(now.getTime()-30*24*60*60*1000);
            var d2 = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
            return d2<=date && date<=d1;
        }
    });

    $('#flightDate').datebox({
        label : '航班起飞时间：',
        labelWidth : 100,
        labelAlign : 'right',
        width : 230,
        value : today,
        editable : false,
        required : false
    });

    $('#flightDate').datebox().datebox('calendar').calendar({
        validator: function(date){
            var now = new Date();
            var temp1 = new Date(now.getTime()-30*24*60*60*1000);
            var d1 = new Date(temp1.getFullYear(), temp1.getMonth(), temp1.getDate());
            var temp = new Date(now.getTime()+30*24*60*60*1000);
            var d2 = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
            return d2>=date && date>=d1;
        }
    });








}

/**
 * 加载树型
 */
function ajaxTree() {

}


/** --------加载图表数据 ------ */
function ajaxTableAndCharts(queryType,flag) {
    var firstChart = echarts.init(document.getElementById('firstChart'),'roma');
    var firstOption;
    var secondChart = echarts.init(document.getElementById('secondChart'),'roma');
    var secondOption;
    var thirdChart = echarts.init(document.getElementById('thirdChart'),'roma');
    var thirdOption;
    var start =0;
    var end =100;
    var sendData = {};
    sendData.fromCity=$('#fromCity').val();
    sendData.arriveCity=$('#arriveCity').val();
    sendData.takeOffTimeStart=$('#takeOffTimeStart').datebox('getValue');
    sendData.takeOffTimeEnd=$('#takeOffTimeEnd').datebox('getValue');
    sendData.flightDate=$('#flightDate').datebox('getValue');
    var title = "历史航班运价分析（最高价）"+"("+sendData.fromCity+"-"+sendData.arriveCity+")";
    var title2 = "历史航班运价分析（最低价）"+"("+sendData.fromCity+"-"+sendData.arriveCity+")";
    var title3 = "历史航班运价分析（最高价和最低价）"+"("+sendData.fromCity+"-"+sendData.arriveCity+")";

    if(queryType==1){
        sendData.queryType = '1';
        var firstLegendArray = [];
        var firstxArray = [];
        var firstSeriesArray = [];
        var secondLegendArray = [];
        var secondxArray = [];
        var secondSeriesArray = [];
        var thirdLegendArray = [];
        var thirdxArray = [];
        var thirdSeriesArray = [];
        if(flag){
            var posList = [
                'left', 'right', 'top', 'bottom',
                'inside',
                'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
                'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
            ];

            var app={};
            app.configParameters = {
                rotate: {
                    min: -90,
                    max: 90
                },
                align: {
                    options: {
                        left: 'left',
                        center: 'center',
                        right: 'right'
                    }
                },
                verticalAlign: {
                    options: {
                        top: 'top',
                        middle: 'middle',
                        bottom: 'bottom'
                    }
                },
                position: {
                    options: echarts.util.reduce(posList, function (map, pos) {
                        map[pos] = pos;
                        return map;
                    }, {})
                },
                distance: {
                    min: 0,
                    max: 100
                }
            };

            app.config = {
                rotate: 90,
                align: 'left',
                verticalAlign: 'middle',
                position: 'insideBottom',
                distance: 15,
                onChange: function () {
                    var labelOption = {
                        normal: {
                            rotate: app.config.rotate,
                            align: app.config.align,
                            verticalAlign: app.config.verticalAlign,
                            position: app.config.position,
                            distance: app.config.distance
                        }
                    };
                    myChart.setOption({
                        series: [{
                            label: labelOption
                        }, {
                            label: labelOption
                        }, {
                            label: labelOption
                        }, {
                            label: labelOption
                        }]
                    });
                }
            };


            var labelOption = {
                normal: {
                    show: true,
                    position: app.config.position,
                    distance: app.config.distance,
                    align: app.config.align,
                    verticalAlign: app.config.verticalAlign,
                    rotate: app.config.rotate,
                    formatter: '{c}  {a}',
                    fontSize: 16,
/*                    rich: {
                        name: {
                            textBorderColor: '#fff'
                        }
                    }*/
                }
            };
            $.ajax({
                type : 'post',
                async : false,
                url : root + '/mainSrv/flightPriceMaxAndMinHistoryChart',
                dataType :'json',
                data: sendData,
                success : function(data) {
                    if (data != "-1") {
                        var num = 0;
                        var num2 = 0;
                        for (var key in data) {
                            if(key =='max') {
                                var dataInfo = data[key];
                                for (var key in dataInfo) {
                                    firstLegendArray.push(key);
                                    var dataList = JSON.parse(dataInfo[key]);
                                    var showData = {};
                                    showData.name = key;
                                    showData.type = 'bar';
                                    showData.barGap=0;
                                    showData.data = [];
                                    showData.zws = [];
                                    showData.label =labelOption;
                                    showData.barMaxWidth = 50;
                                    showData.barMinWidth = 50;
                                    for (var i = 0; i < dataList.length; i++) {
                                        var item = dataList[i].split(",");
                                        if(num==0){
                                            firstxArray.push(item[0]);
                                        }
                                        showData.data.push(item[1]);
                                        showData.zws.push(item[0]+'|'+item[2]);

                                    }
                                    firstSeriesArray.push(showData);
                                    num++;
                                }
                            }
                            if(key =='min') {
                                var dataInfo = data[key];
                                for (var key in dataInfo) {
                                    secondLegendArray.push(key);
                                    var dataList = JSON.parse(dataInfo[key]);
                                    var showData = {};
                                    showData.name = key;
                                    showData.type = 'bar';
                                    showData.barGap=0;
                                    showData.data = [];
                                    showData.zws = [];
                                    showData.barMaxWidth = 50;
                                    showData.barMinWidth = 50;

                                    showData.label =labelOption;
                                    for (var i = 0; i < dataList.length; i++) {
                                        var item = dataList[i].split(",");
                                        if(num2==0){
                                            secondxArray.push(item[0]);
                                        }
                                        showData.data.push(item[1]);
                                        showData.zws.push(item[0]+'|'+item[2]);

                                    }
                                    secondSeriesArray.push(showData);
                                    num2++;
                                }
                            }

                        }
                        thirdLegendArray.push("最高价");
                        thirdLegendArray.push("最低价");
                        thirdxArray = firstxArray;
                        var thirdSeriesOne = deepCopy(firstSeriesArray[0]);
                        var thirdSeriesTwo = deepCopy(secondSeriesArray[0]);
                        thirdSeriesOne.name ='最高价';
                        thirdSeriesTwo.name ='最低价';
                        thirdSeriesOne.hbh =firstLegendArray[0];
                        thirdSeriesTwo.hbh =firstLegendArray[0];
                        thirdSeriesOne.barMaxWidth = 50;
                        thirdSeriesOne.barMinWidth = 50;
                        thirdSeriesTwo.barMaxWidth = 50;
                        thirdSeriesTwo.barMinWidth = 50;

                        thirdSeriesArray.push(thirdSeriesOne);
                        thirdSeriesArray.push(thirdSeriesTwo);

                        var html='';
                        for(var i=0;i<firstLegendArray.length;i++){
                            $('#jzhb').empty();

                            if(i==0){
                                html+='<fieldset style="width: 200px !important;">';
                                html+='<label style="width: 120px !important;">选择航班&nbsp;&nbsp;&nbsp;'+firstLegendArray[i]+':</label>';
                                html+='<input name="xzhb" value="'+firstLegendArray[i]+'" class="easyui-checkbox" style="margin-top: 10px" checked></fieldset>';

                            } else {
                                html+='<fieldset style="width: 140px !important;">';
                                html+='<label style="width: 60px !important;">'+firstLegendArray[i]+':</label>';
                                html+='<input name="xzhb" value="'+firstLegendArray[i]+'" class="easyui-checkbox" style="margin-top: 10px"></fieldset>';

                            }
                        }
                        $('#jzhb').append(html);
                        $.parser.parse($("[name=xzhb]"));
                        $('#jzhb input').checkbox({
                            onChange: function(checked){
                                $(this).parent('fieldset').siblings().find('input[name="xzhb"]').prop("checked",false);
                                //console.log($(this).parent('fieldset').siblings().find('input[checkboxname="xzhb"]').length);
                                $(this).parent('fieldset').siblings().find('span.checkbox-inner').hide();
                                thirdSeriesArray = [];

                                        for(var i=0;i<firstSeriesArray.length;i++){
                                            if(firstSeriesArray[i].name==$(this).val()){
                                                var thirdSeriesOne = deepCopy(firstSeriesArray[i]);
                                                var thirdSeriesTwo = deepCopy(secondSeriesArray[i]);
                                                thirdSeriesOne.name ='最高价';
                                                thirdSeriesOne.hbh =$(this).val();
                                                thirdSeriesTwo.name ='最低价';
                                                thirdSeriesTwo.hbh =$(this).val();
                                                thirdSeriesOne.barMaxWidth = 50;
                                                thirdSeriesOne.barMinWidth = 50;
                                                thirdSeriesTwo.barMaxWidth = 50;
                                                thirdSeriesTwo.barMinWidth = 50;
                                                thirdSeriesArray.push(thirdSeriesOne);
                                                thirdSeriesArray.push(thirdSeriesTwo);

                                            }
                                        }

                                thirdOption.series = thirdSeriesArray;
                                thirdChart.setOption(thirdOption,true);
                            }
                        })
                    }
                }
            });
        }
        firstOption = {
            dataZoom : [
                {
                    type: 'slider',
                    show: true,
                    start: start,
                    end: end,
                    handleSize: 8
                },
                {
                    type: 'inside',
                    start: start,
                    end: end
                }
            ],
            title: {
                text: title,
                left: '45%',
            },
            tooltip: {
                /*trigger: 'axis',*/
                trigger: 'item',
                formatter:function(params){//数据格式
                    var info =params.name+"</br>";
                    var flightDate ='';
                    for(var k=0;k<firstSeriesArray.length;k++){
                        if(params.seriesName == firstSeriesArray[k].name){
                            for(var j=0;j<firstSeriesArray[k].zws.length;j++){
                                var item = firstSeriesArray[k].zws[j].split("|");
                                if(item[0] == params.name) {
                                    flightDate = item[1];
                                    //info +="&nbsp;&nbsp;座位数："+ item[1];
                                }

                            }
                        }

                    }
                    info +="航班号："+params.seriesName+"</br>";
                    info +="起飞时间："+flightDate+"" +"</br>";
                    info +="价格："+params.value+"</br>";
                    info+="</br>";

                    return info;
                },
                extraCssText:"text-align:left"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                y: 'middle',
                data: firstLegendArray
            },
            grid: {
                left: '15%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                },
                right:20
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: firstxArray,
                    axisLabel: {
                        interval:0,
                        rotate:20
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: firstSeriesArray
        };
        secondOption = {
            dataZoom : [
                {
                    type: 'slider',
                    show: true,
                    start: start,
                    end: end,
                    handleSize: 8
                },
                {
                    type: 'inside',
                    start: start,
                    end: end
                }
            ],
            title: {
                text: title2,
                left: '45%',
            },
            tooltip: {
                /*trigger: 'axis',*/
                trigger: 'item',
                formatter:function(params){//数据格式
                    var info =params.name+"</br>";
                    var flightDate ='';
                    for(var k=0;k<secondSeriesArray.length;k++){
                        if(params.seriesName == secondSeriesArray[k].name){
                            for(var j=0;j<secondSeriesArray[k].zws.length;j++){
                                var item = secondSeriesArray[k].zws[j].split("|");
                                if(item[0] == params.name) {
                                    flightDate = item[1];
                                    //info +="&nbsp;&nbsp;座位数："+ item[1];
                                }

                            }
                        }

                    }
                    info +="航班号："+params.seriesName+"</br>";
                    info +="起飞时间："+flightDate+"" +"</br>";
                    info +="价格："+params.value+"</br>";
                    info+="</br>";

                    return info;
                },
                extraCssText:"text-align:left"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                y: 'middle',
                data: secondLegendArray
            },
            grid: {
                left: '15%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                },
                right:20
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: secondxArray,
                    axisLabel: {
                        interval:0,
                        rotate:20
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: secondSeriesArray
        };
        thirdOption = {
            dataZoom : [
                {
                    type: 'slider',
                    show: true,
                    start: start,
                    end: end,
                    handleSize: 8
                },
                {
                    type: 'inside',
                    start: start,
                    end: end
                }
            ],
            title: {
                text: title3,
                left: '45%',
            },
            tooltip: {
                /*trigger: 'axis',*/
                trigger: 'item',
                formatter:function(params){//数据格式
                    var info =params.name+"</br>";
                    var flightDate ='';
                    var hbh='';
                    for(var k=0;k<thirdSeriesArray.length;k++){
                        if(params.seriesName == thirdSeriesArray[k].name){
                            hbh =thirdSeriesArray[k].hbh;
                            for(var j=0;j<thirdSeriesArray[k].zws.length;j++){
                                var item = thirdSeriesArray[k].zws[j].split("|");
                                if(item[0] == params.name) {
                                    flightDate = item[1];
                                    //info +="&nbsp;&nbsp;座位数："+ item[1];
                                }

                            }
                        }

                    }
                    info +="航班号："+hbh+"</br>";
                    info +="起飞时间："+flightDate+"" +"</br>";
                    info +="价格："+params.value+"</br>";
                    info+="</br>";

                    return info;
                },
                extraCssText:"text-align:left"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                y: 'middle',
                data:thirdLegendArray
            },
            grid: {
                left: '15%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                },
                right:20
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: thirdxArray,
                    axisLabel: {
                        interval:0,
                        rotate:20
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: thirdSeriesArray
        };
        firstChart.setOption(firstOption);
        secondChart.setOption(secondOption);
        thirdChart.setOption(thirdOption);

    }

    window.onresize = function () {
        firstChart.resize();
        secondChart.resize();
        thirdChart.resize();
    }
}

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

var compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (Number(val1) < Number(val2)) {
            return 1;
        } else if (Number(val1) > Number(val2)) {
            return -1;
        } else {
            return 0;
        }
    }
}

var compareDate = function (x,y) {
    x = x.replace(/-/g,'/');
    var xtimestamp = new Date(x).getTime();
    y = y.replace(/-/g,'/');
    var ytimestamp = new Date(y).getTime();
    if (Number(xtimestamp) < Number(ytimestamp)) {
        return -1;
    } else if (Number(xtimestamp) > Number(ytimestamp)) {
        return 1;
    } else {
        return 0;
    }
}

var compareNum = function (x, y) {
    if (Number(x) < Number(y)) {
        return 1;
    } else if (Number(x) > Number(y)) {
        return -1;
    } else {
        return 0;
    }
}

Date.prototype.format = function() {
    var s = '';		        　　　　　
    var mouth = (this.getMonth() + 1)>=10?(this.getMonth() + 1):('0'+(this.getMonth() + 1));
    var day = this.getDate()>=10?this.getDate():('0'+this.getDate());		        　　　　　
    s += this.getFullYear() + '-'; // 获取年份。		        　　　　　
    s += mouth + "-"; // 获取月份。		        　　　　　
    s += day; // 获取日。		        　　　　　
    return (s); // 返回日期。		    　　
};

function getAll(begin, end) {		    	　　　　
    var arr = [];		        　　　　
    var ab = begin.split("-");		        　　　　
    var ae = end.split("-");		        　　　　
    var db = new Date();		        　　　　
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);		        　　　　
    var de = new Date();		        　　　　
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);		        　　　　
    var unixDb = db.getTime() - 24 * 60 * 60 * 1000;		        　　　　
    var unixDe = de.getTime() - 24 * 60 * 60 * 1000;		        　　　　
    for (var k = unixDb; k <= unixDe;) {		            　　　　　　
        //console.log((new Date(parseInt(k))).format());		            　　　　　　
        k = k + 24 * 60 * 60 * 1000;		            　　　　　　
        arr.push((new Date(parseInt(k))).format());		        　　　
    }		        　　　　
    return arr;
}

function deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                result[key] = deepCopy(obj[key]);   //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}





