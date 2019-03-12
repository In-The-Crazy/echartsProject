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
        labelWidth : 80,
        labelAlign : 'right',
        width : 150
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
        //label : '采集结束时间：',
        label : '采集时间：',
        labelWidth : 80,
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
    $('#intervalTime').combobox({
        label : '采集时间间隔：',
        labelWidth : 100,
        labelAlign : "right",
        data : [/*{
            "id" : "5",
            "text" : "5分钟",
            "selected" : true
        },*/{
            "id" : "10",
            "text" : "10分钟",
            "selected" : true
        },{
            "id" : "30",
            "text" : "30分钟"
        },{
            "id" : "60",
            "text" : "60分钟"
        }],
        valueField : 'id',
        textField:'text',
        width : 230,
        required : true,
        editable : false,
        multiple : false,
        limitToList : true
    });

}


/** --------加载图表数据 ------ */
function ajaxTableAndCharts(queryType,flag) {
    var date = getAll($('#takeOffTimeStart').datebox('getValue'),$('#takeOffTimeEnd').datebox('getValue'));

    var firstChart = echarts.init(document.getElementById('firstChart'),'roma');
    var firstOption;
    var start =0;
    var end =100;
    var sendData = {};
    sendData.fromCity=$('#fromCity').val();
    sendData.arriveCity=$('#arriveCity').val();
    sendData.takeOffTimeStart=$('#takeOffTimeEnd').datebox('getValue');//$('#takeOffTimeStart').datebox('getValue');
    sendData.takeOffTimeEnd=$('#takeOffTimeEnd').datebox('getValue');
    sendData.flightDate=$('#flightDate').datebox('getValue');
    sendData.intervalTime=$('#intervalTime').combobox('getValue');
    var title = "历史航班运价分析"+"("+sendData.fromCity+"-"+sendData.arriveCity+")";

    if(queryType==1){
        sendData.queryType = '1';
        var firstLegendArray = [];
        var firstxArray = [];
        var firstSeriesArray = [];
        if(flag){

            $.ajax({
                type : 'post',
                async : false,
                url : root + '/mainSrv/flightPriceHistoryChart',
                dataType :'json',
                data: sendData,
                success : function(data) {
                    if (data != "-1") {
                        var num = 0;
                        for (var key in data) {
                            firstLegendArray.push(key);
                            var dataList = data[key];
                            var showData = {};
                            showData.name = key;
                            showData.type = 'line';
                            showData.data = [];
                            showData.zws = [];
                            for (var i = 0; i < dataList.length; i++) {
                                var item = dataList[i].split(",");
                                if(num==0){
                                    firstxArray.push(item[0]);
                                }
                                showData.data.push(item[2]);
                                //showData.zws.push(item[0]+'|'+item[3]);
                                showData.zws.push(item[0]+'|'+item[3]+'|'+item[4]+'|'+item[5]);

                            }
                            firstSeriesArray.push(showData);
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
                                $('#jzhb>fieldset>input[switchbuttonname="jzhb"]').each(function(){

                                    if($(this).prop("checked")){
                                        for(var i=0;i<firstSeriesArray.length;i++){
                                            if(firstSeriesArray[i].name==$(this).val()){
                                                firstLegendArrayOn.push($(this).val());
                                                firstSeriesArrayOn.push(firstSeriesArray[i]);

                                            }
                                        }
                                        //console.log($(this).val())
                                    }


                                });
                                firstOption.legend.data = firstLegendArrayOn;
                                firstOption.series = firstSeriesArrayOn;
                                firstChart.setOption(firstOption,true);
                            }
                        })*/
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
                    var zws ='';
                    var flightType='';

                    for(var k=0;k<firstSeriesArray.length;k++){
                        if(params.seriesName == firstSeriesArray[k].name){
                            for(var j=0;j<firstSeriesArray[k].zws.length;j++){
                                var item = firstSeriesArray[k].zws[j].split("|");
                                if(item[0] == params.name) {
                                    flightDate = item[2];
                                    zws = item[1];
                                    flightType =item[3];

                                    //info +="&nbsp;&nbsp;座位数："+ item[1];
                                }

                            }
                        }

                    }
                    info +="航班号："+params.seriesName+"</br>";
                    info +="起飞时间："+flightDate+"" +"</br>";
                    info +="机型："+flightType+"" +"</br>";
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
                bottom: '15%',
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
                    return value.min-20;
                    //return value.min/2;
                },
                max: function(value) {
                    return value.max+20;
                    //return value.max + value.min/2;
                }
            },
            series: firstSeriesArray
        };
        firstChart.setOption(firstOption);
    }

    window.onresize = function () {
        firstChart.resize();

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





