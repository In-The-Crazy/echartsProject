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
    var daysAgo = new Date(todayTwo.getTime()+60*24*60*60*1000);
    var daysAgoTemp = daysAgo.pattern("yyyy-MM-dd");

    $('#takeOffTimeStart').datebox({
        label : '航班起飞（开始日期）：',
        labelWidth : 140,
        labelAlign : 'right',
        width : 270,
        value : today,
        editable : false,
        required : false
    });

    $('#takeOffTimeStart').datebox().datebox('calendar').calendar({
        validator: function(date){
            var now = new Date();
            var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var temp = new Date(now.getTime()+60*24*60*60*1000);
            var d2 = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
            return d2>=date && date>=d1;
        }
    });

    $('#takeOffTimeEnd').datebox({
        label : '航班起飞（截止日期）：',
        labelWidth : 140,
        labelAlign : 'right',
        width : 270,
        value : daysAgoTemp,
        editable : false,
        required : false
    });

    $('#takeOffTimeEnd').datebox().datebox('calendar').calendar({
        validator: function(date){
            var d1 = new Date(daysAgo.getFullYear(), daysAgo.getMonth(), daysAgo.getDate());
            var temp = new Date(daysAgo.getTime()-60*24*60*60*1000);
            var d2 = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
            return d2<=date && date<=d1;
        }
    });







}

/**
 * 加载树型
 */
function ajaxTree() {
    $('#schedule').combobox({
        label : 'D',
        labelWidth : 100,
        labelAlign : "right",
        data : [{
            "id" : "1",
            "text" : "星期一",
            "selected" : true
        },{
            "id" : "2",
            "text" : "星期二"
        },{
            "id" : "3",
            "text" : "星期三"
        },{
            "id" : "4",
            "text" : "星期四"
        },{
            "id" : "5",
            "text" : "星期五"
        },{
            "id" : "6",
            "text" : "星期六"
        },{
            "id" : "0",
            "text" : "星期日"
        }],
        valueField : 'id',
        textField:'text',
        width : 250,
        required : false,
        editable : false,
        multiple : true,
        limitToList : false
    });
}


/** --------加载图表数据 ------ */
function ajaxTableAndCharts(queryType,flag) {
    var weeks=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    var checkID = [];//定义一个空数组
    $("input[name='schedule']:checked").each(function(i){//把所有被选中的复选框的值存入数组
        checkID[i] =$(this).val();
    });
    var schedule = checkID.join(',');
    var date = getAll($('#takeOffTimeStart').datebox('getValue'),$('#takeOffTimeEnd').datebox('getValue'),schedule);

    var firstChart = echarts.init(document.getElementById('firstChart'),'roma');
    var secondChart = echarts.init(document.getElementById('secondChart'),'roma');
    var firstOption;
    var secondOption;
    var start =0;
    var end =100;
    var sendData = {};
    sendData.fromCity=$('#fromCity').val();
    sendData.arriveCity=$('#arriveCity').val();
    sendData.takeOffTimeStart=$('#takeOffTimeStart').datebox('getValue');
    sendData.takeOffTimeEnd=$('#takeOffTimeEnd').datebox('getValue');
    sendData.schedule=schedule;
    var title = "远期航班运价分析"+"("+sendData.fromCity+"-"+sendData.arriveCity+")";
    //var params = {"fromCity":"TAO","arriveCity":"XMN","takeOffTime":"2019-03-07","intervalTime":"60"};
    //var params ={"fromCity":sendData.fromCity,"arriveCity":sendData.arriveCity,"takeOffTimeStart":sendData.takeOffTimeStart,"takeOffTimeEnd":sendData.takeOffTimeEnd,"schedule":sendData.schedule,"flightNo":sendData.flightNo};
    //date =["00-00","01-00","02-00","03-00","04-00","05-00","06-00","07-00","08-00","09-00","10-00","11-00","12-00","13-00","14-00","15-00","16-00","17-00","18-00","19-00","20-00","21-00","22-00","23-00"];
    var columns = [];
    var column = [];
    var columnObj = {};
    columnObj.field="rownumbers";
    columnObj.title="";
    columnObj.styler= rownumSytler,
    columnObj.align="center";
    columnObj.formatter=rownumFormater;
    columnObj.width=25;
    column.push(columnObj);
    var columnObj = {};
    columnObj.field="flightNo";
    columnObj.title="航班号";
    columnObj.align="center";
    columnObj.formatter=baseFormater;
    columnObj.width=100;
    columnObj.sortable=true;
    column.push(columnObj);
    var columnObj2 = {};
    columnObj2.field="flightDate";
    columnObj2.title="起飞时间";
    columnObj2.align="center";
    columnObj2.formatter=baseFormater;
    columnObj2.width=100;
    columnObj2.sortable=true;
    column.push(columnObj2);
    var columnObj3 = {};
    columnObj3.field="flightType";
    columnObj3.title="客机名称";
    columnObj3.align="center";
    columnObj3.formatter=baseFormater;
    columnObj3.width=100;
    columnObj3.sortable=true;
    column.push(columnObj3);
    for(var i=0;i<date.length;i++){
        var dates = date[i].split('|');
        var columnObj = {};
        columnObj.field=dates[0];
        columnObj.title=dates[0]+'('+weeks[dates[1]]+')';
        columnObj.align="center";
        columnObj.formatter=baseFormater;
        columnObj.width=120;
        columnObj.sortable=true;
        column.push(columnObj);
    }

    columns.push(column);
    var fitColumns = true;
    if(column.length>10){
        fitColumns = false;
    }
    $('#queryTable').datagrid({
        checkOnSelect : true,// 是否选中/取消复选框
        pagination : true,// 是否分页
        autoRowHeight : true,// 定义是否设置基于该行内容的行高度
        pageNumber : 1,
        pageSize : 10,
        fitColumns : fitColumns,// 列自适应表格宽度
        striped : true,// 当true时，单元格显示条纹
        rownumbers : false,// 是否显示行号
        singleSelect : false,// 是否只能选中一条
        nowrap:true,
        loadMsg : '数据加载中,请稍后...',
        onLoadError : function() {
            alert('数据加载失败!');
        },
        onLoadSuccess : function(data) {
            console.log(data);
        },
        columns : columns
    });
    if(queryType==1){
        sendData.queryType = '1';
        var firstLegendArray = [];
        var firstxArray = [];
        var firstSeriesArray = [];
        var secondLegendArray = [];
        var secondxArray = [];
        var secondSeriesArray = [];
        if(flag){
            $('#queryTable').datagrid({
                url : root + '/mainSrv/flightPriceAnalysisFuture',
                checkOnSelect : true,// 是否选中/取消复选框
                pagination : true,// 是否分页
                autoRowHeight : true,// 定义是否设置基于该行内容的行高度
                pageNumber : 1,
                pageSize : 10,
                fitColumns : fitColumns,// 列自适应表格宽度
                striped : true,// 当true时，单元格显示条纹
                rownumbers : false,// 是否显示行号
                singleSelect : false,// 是否只能选中一条
                queryParams : sendData,
                nowrap:true,
                loadMsg : '数据加载中,请稍后...',
                onLoadError : function() {
                    alert('数据加载失败!');
                },
                onLoadSuccess : function(data) {
                    console.log(data);
                },
                columns : columns
            });
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
                url : root + '/mainSrv/flightPriceFutureChart',
                dataType :'json',
                data: sendData,
                success : function(data) {
                    if (data != "-1") {
                        var num = 0;
                        for (var key in data) {
                            firstLegendArray.push(key);
                            secondLegendArray.push(key);
                            var dataList = data[key];
                            var showData = {};
                            showData.name = key;
                            showData.type = 'line';
                            showData.data = [];
                            showData.zws = [];
                            var showDataTwo = {};
                            showDataTwo.name = key;
                            showDataTwo.type = 'bar';
                            showDataTwo.barGap=0;
                            showDataTwo.label =labelOption;
                            showDataTwo.data = [];
                            showDataTwo.zws = [];
                            showDataTwo.barMaxWidth = 50;
                            showDataTwo.barMinWidth = 50;
                            var normal ={'borderWidth':3}
                            showData.itemStyle={'normal':normal};
                            for (var i = 0; i < dataList.length; i++) {
                                var item = dataList[i].split(",");
                                if(num==0){
                                    firstxArray.push(item[0]);
                                    secondxArray.push(item[0]);
                                }
                                showData.data.push(item[2]);
                                showData.zws.push(item[0]+'|'+item[3]+'|'+item[4]);
                                showDataTwo.data.push(item[2]);
                                showDataTwo.zws.push(item[0]+'|'+item[3]+'|'+item[4])
                            }
                            firstSeriesArray.push(showData);
                            secondSeriesArray.push(showDataTwo);
                            num++;
                        }

/*                        var html='';
                        for(var i=0;i<firstLegendArray.length;i++){
                            $('#jzhb').empty();

                            if(i==0){
                                html+='<fieldset style="width: 200px !important;">';
                                html+='<label style="width: 120px !important;">基准航班&nbsp;&nbsp;&nbsp;'+firstLegendArray[i]+':</label>';
                                html+='<input name="jzhb" value="'+firstLegendArray[i]+'" class="easyui-switchbutton" style="margin-top: 10px" checked></fieldset>';

                            } else {
                                html+='<fieldset style="width: 140px !important;">';
                                html+='<label style="width: 60px !important;">'+firstLegendArray[i]+':</label>';
                                html+='<input name="jzhb" value="'+firstLegendArray[i]+'" class="easyui-switchbutton" style="margin-top: 10px" checked></fieldset>';

                            }
                        }
                        $('#jzhb').append(html);
                        $.parser.parse($("#jzhb").parent());
                        $('#jzhb input').switchbutton({
                                onChange: function(checked){
                                    var firstSeriesArrayOn =[];
                                    var firstLegendArrayOn =[];
                                    var secondLegendArrayOn =[];
                                    var secondSeriesArrayOn =[];
                                    $('#jzhb>fieldset>input[switchbuttonname="jzhb"]').each(function(){

                                        if($(this).prop("checked")){
                                            for(var i=0;i<firstSeriesArray.length;i++){
                                                if(firstSeriesArray[i].name==$(this).val()){
                                                    firstLegendArrayOn.push($(this).val());
                                                    firstSeriesArrayOn.push(firstSeriesArray[i]);
                                                    secondLegendArrayOn.push($(this).val());
                                                    secondSeriesArrayOn.push(secondSeriesArray[i]);
                                                }
                                            }
                                            //console.log($(this).val())
                                        }


                                    });
                                    console.log(secondSeriesArrayOn);
                                    firstOption.legend.data = firstLegendArrayOn;
                                    firstOption.series = firstSeriesArrayOn;
                                    secondOption.legend.data = secondLegendArrayOn;
                                    secondOption.series = secondSeriesArrayOn;
                                    firstChart.setOption(firstOption,true);
                                    secondChart.setOption(secondOption,true);
                                }
                        })*/

                    }
                }
            });
        }
        //console.log(firstSeriesArray);
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
                    var zws ='';
                    for(var k=0;k<firstSeriesArray.length;k++){
                        if(params.seriesName == firstSeriesArray[k].name){
                            for(var j=0;j<firstSeriesArray[k].zws.length;j++){
                                var item = firstSeriesArray[k].zws[j].split("|");
                                if(item[0] == params.name) {
                                    flightDate = item[2];
                                    zws = item[1];
                                    //info +="&nbsp;&nbsp;座位数："+ item[1];
                                }

                            }
                        }

                    }
                    info +="航班号："+params.seriesName+"</br>";
                    info +="起飞时间："+flightDate+"" +"</br>";
                    info +="价格："+params.value+"</br>";
                    info +="座位数："+ zws+"</br>";
                    info+="</br>";
                    //排序显示所有信息
                    /*params.sort(compare("value"));
                     var info =params[0].name+"</br>";
                     for (var i=0;i<params.length;i++){
                     info +="航班号："+params[i].seriesName+"&nbsp;&nbsp;价格："+params[i].value;
                     for(var k=0;k<firstSeriesArray.length;k++){
                     if(params[i].seriesName == firstSeriesArray[k].name){
                     for(var j=0;j<firstSeriesArray[k].zws.length;j++){
                     var item = firstSeriesArray[k].zws[j].split("-");
                     if(item[0] == params[i].name) {
                     info +="&nbsp;&nbsp;座位数："+ item[1];
                     }

                     }
                     }

                     }

                     info+="</br>";
                     }*/
                    return info;
                },
                extraCssText:"text-align:left"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                y: 'middle',
                data:firstLegendArray
            },
            grid: {
                left: '15%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                },
                right:20
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: firstxArray
            },
            yAxis: {
                type: 'value',
                min: function(value) {
                    return value.min/2;
                },
                max: function(value) {
                    return value.max + value.min/2;
                }
            },
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
                text: title,
                left: '45%',
            },
            tooltip: {
                /*trigger: 'axis',*/
                trigger: 'item',
                formatter:function(params){//数据格式
                    var info =params.name+"</br>";
                    var flightDate ='';
                    var zws ='';
                    for(var k=0;k<firstSeriesArray.length;k++){
                        if(params.seriesName == firstSeriesArray[k].name){
                            for(var j=0;j<firstSeriesArray[k].zws.length;j++){
                                var item = firstSeriesArray[k].zws[j].split("|");
                                if(item[0] == params.name) {
                                    flightDate = item[2];
                                    zws = item[1];
                                    //info +="&nbsp;&nbsp;座位数："+ item[1];
                                }

                            }
                        }

                    }
                    info +="航班号："+params.seriesName+"</br>";
                    info +="起飞时间："+flightDate+"" +"</br>";
                    info +="价格："+params.value+"</br>";
                    info +="座位数："+ zws+"</br>";
                    info+="</br>";
                    //排序显示所有信息
                    /*params.sort(compare("value"));
                     var info =params[0].name+"</br>";
                     for (var i=0;i<params.length;i++){
                     info +="航班号："+params[i].seriesName+"&nbsp;&nbsp;价格："+params[i].value;
                     for(var k=0;k<firstSeriesArray.length;k++){
                     if(params[i].seriesName == firstSeriesArray[k].name){
                     for(var j=0;j<firstSeriesArray[k].zws.length;j++){
                     var item = firstSeriesArray[k].zws[j].split("-");
                     if(item[0] == params[i].name) {
                     info +="&nbsp;&nbsp;座位数："+ item[1];
                     }

                     }
                     }

                     }

                     info+="</br>";
                     }*/
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
        firstChart.setOption(firstOption);
        secondChart.setOption(secondOption);

    }
    //console.log(firstChart);
    window.onresize = function () {
        firstChart.resize();
        secondChart.resize();

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

function getAll(begin, end ,schedule) {		    	　　　　
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
        var day = new Date((new Date(parseInt(k))).format()).getDay();
        if(schedule==''){
            arr.push((new Date(parseInt(k))).format());
        } else {
            var schedules = schedule.split(',').map(Number);
            if(schedules.indexOf(day)>-1) {
                arr.push((new Date(parseInt(k))).format()+"|"+day);
            }
        }
                　　　　　　
    }		        　　　　
    return arr;
}





