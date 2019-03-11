package com.redapplenet.midmanager.controller;

import com.huicent.common.util.getCtrip;
import com.huicent.server.util.ChsLogicCmpUtil;
import com.redapplenet.midmanager.constant.CONST;
import com.redapplenet.midmanager.util.BaseEntity;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.*;

/**
 * @ClassName MainController
 * @Description TODO
 * @Author yanqiong
 * @Date 2019/1/28 12:37
 */
@RequestMapping("/mainSrv")
@Controller
public class MainController {
    @RequestMapping(value = "/queryChartOne", method = RequestMethod.POST)
    @ResponseBody
    public String queryChartOne(HttpServletRequest req) {
        String returnInfo = "-1";
        String fromCity = req.getParameter("fromCity");
        String arriveCity = req.getParameter("arriveCity");
        String takeOffTime = req.getParameter("takeOffTime");
        String intervalTime = req.getParameter("intervalTime");
        String firstFightNumber = req.getParameter("firstFightNumber");
        String secondFightNumber = req.getParameter("secondFightNumber");
        String thirdFightNumber = req.getParameter("thirdFightNumber");
        String startTime = req.getParameter("startTime");
        String endTime = req.getParameter("endTime");
        String fourthFightNumberOne = req.getParameter("fourthFightNumberOne");
        String fourthFightNumberTwo = req.getParameter("fourthFightNumberTwo");
        String fourthstartTime = req.getParameter("fourthstartTime");
        String fourthendTime = req.getParameter("fourthendTime");
        String dateTime = req.getParameter("dateTime");
        String queryType = req.getParameter("queryType");
        getCtrip gcp = new getCtrip();
        if (queryType.equals("1")) {
            returnInfo = gcp.getFight(fromCity, arriveCity, takeOffTime, intervalTime);
        } else if (queryType.equals("2")) {
            returnInfo = gcp.priceBetween(fromCity, arriveCity, takeOffTime, firstFightNumber, secondFightNumber, intervalTime);
        } else if (queryType.equals("3")) {
            try {
                returnInfo = gcp.flightDate(fromCity, arriveCity, takeOffTime, intervalTime, thirdFightNumber, startTime, endTime);
            } catch (ParseException e) {
                e.printStackTrace();
            }

        } else if (queryType.equals("4")) {
            try {
                returnInfo = gcp.flightDateTime(fromCity, arriveCity, takeOffTime, intervalTime, fourthFightNumberOne, fourthFightNumberTwo, fourthstartTime, fourthendTime ,dateTime);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        return returnInfo;
    }

    @RequestMapping(value = "/queryTableOne", method = RequestMethod.POST)
    @ResponseBody
    public BaseEntity queryTableOne(HttpServletRequest req) {
        String queryTime = req.getParameter("queryTime");
        int page = Integer.valueOf(req.getParameter("page"));
        int rows = Integer.valueOf(req.getParameter("rows"));
        int start = (page - 1) * rows;
        int end = (page - 1) * rows + rows;

        List<Map<String,Object>> list = new ArrayList<>();
        for (int i = 0; i < 60; i++) {
            Map<String,Object> map = new HashMap<>();
            map.put("sj","2019-01-28 至 2019-01-28");
            map.put("cxs",1+i);
            map.put("dzs",1+i);
            map.put("cps",1+i);
            map.put("zfje",1+i);
            map.put("tps",1+i);
            map.put("tpje",1+i);
            list.add(map);
        }
        if(end>list.size()){
            end = list.size();
        }
        List<Map<String,Object>> returnList = list.subList(start,end);
        BaseEntity baseEntity = new BaseEntity();
        baseEntity.setRows(returnList);
        baseEntity.setTotal(list.size());
        return baseEntity;
    }

    @RequestMapping(value = "/china", method = RequestMethod.POST)
    @ResponseBody
    public String queryTableOne() throws IOException {
        String json = "";
        try {
            File jsonFile = ResourceUtils.getFile("classpath:china.json");
            json = FileUtils.readFileToString(jsonFile,"UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return json;
    }

    @RequestMapping(value = "/flightPriceAnalysisFuture", method = RequestMethod.POST)
    @ResponseBody
    public BaseEntity flightPriceAnalysisFuture(HttpServletRequest req) {
        String returnInfo = null;
        BaseEntity baseEntity = new BaseEntity();
        try {
            String sort = req.getParameter("sort");
            String order = req.getParameter("order");
            String fromCity = req.getParameter("fromCity");
            String arriveCity = req.getParameter("arriveCity");
            String takeOffTimeStart = req.getParameter("takeOffTimeStart");
            String takeOffTimeEnd = req.getParameter("takeOffTimeEnd");
            String schedule = req.getParameter("schedule");
            int page = Integer.valueOf(req.getParameter("page"));
            int rows = Integer.valueOf(req.getParameter("rows"));
            int start = (page - 1) * rows;
            int end = (page - 1) * rows + rows;
            getCtrip gcp = new getCtrip();
            returnInfo = gcp.getForwardFight(fromCity, arriveCity, takeOffTimeStart, takeOffTimeEnd,schedule);
            JSONObject jsonObject = JSONObject.fromObject(returnInfo);
            Iterator<String> it = jsonObject.keys();
            List<Map<String,String>> list = new ArrayList();
            List titleList = new ArrayList();
            int count = 0;
            while(it.hasNext()){
                Map map = new HashMap();
                String key = it.next();
                String value = jsonObject.getString(key);
                JSONArray jsonArray = JSONArray.fromObject(value);
                map.put("flightNo",key);
                if (count==0){
                    titleList.add("flightNo");
                    titleList.add("flightDate");
                }
                map.put("flightDate", "");
                map.put("flightType", "");
                if(jsonArray.size()>0){
                    for(int i=0;i<jsonArray.size();i++){
                        String job = String.valueOf(jsonArray.get(i));  // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                        String[] jobs = job.split(",");

                        if(jobs.length>=5){
                            if(!StringUtils.isEmpty(jobs[4]) && !jobs[4].equals("null")) {
                                map.put("flightDate", jobs[4]);
                            }
                        }
                        if(jobs.length>=6){
                            if(!StringUtils.isEmpty(jobs[5]) && !jobs[5].equals("null")) {
                                map.put("flightType", jobs[5]);
                            }
                        }
                        if(StringUtils.isEmpty(jobs[1]) || jobs[1].equals("null")){
                            map.put(jobs[0],"");
                        } else {
                            map.put(jobs[0],jobs[2]);
                        }
                        //System.out.println(String.valueOf(job)) ;  // 得到 每个对象中的属性值
                        if (count==0) {
                            titleList.add(jobs[0]);
                        }


                    }
                }
                list.add(map);
                //System.out.println("key: "+key+",value:"+value);
                count++;

            }
            if(end>list.size()){
                end = list.size();
            }
            List<Map<String,String>> returnList = list.subList(start,end);
            if (!StringUtils.isEmpty(sort)) {
                String[] sortArray = new String[list.size()];
                for (int i = 0; i < list.size(); i++) {
                    sortArray[i] = list.get(i).get(sort).equals("")?"0":list.get(i).get(sort);
                }
                char [][] charArrray = ChsLogicCmpUtil.getCharArray(sortArray);
                Arrays.sort(charArrray,ChsLogicCmpUtil.getOrderType(order));
                List<Map<String,String>> sortList = new ArrayList();
                for (int j = 0; j < charArrray.length; j++) {
                    for (int i = 0; i < list.size(); i++) {
                        String value = list.get(i).get(sort).equals("")?"0":list.get(i).get(sort);
                        if(value.equals(new String(charArrray[j])) && !sortList.contains(list.get(i))) {
                            sortList.add(list.get(i));
                            break;
                        }

                    }
                }
                returnList = sortList;
            }


            baseEntity.setRows(returnList);
            baseEntity.setTotal(list.size());
            baseEntity.setObj(titleList);
        } catch (ParseException e) {
            baseEntity.setIsSuccessOrfail(CONST.FAIL);
            baseEntity.setMessage(e.getMessage());
            e.printStackTrace();
        }
        return baseEntity;
    }

    @RequestMapping(value = "/flightPriceFutureChart", method = RequestMethod.POST)
    @ResponseBody
    public String flightPriceFutureChart(HttpServletRequest req) {
        String returnInfo = "-1";
        try {
            String fromCity = req.getParameter("fromCity");
            String arriveCity = req.getParameter("arriveCity");
            String takeOffTimeStart = req.getParameter("takeOffTimeStart");
            String takeOffTimeEnd = req.getParameter("takeOffTimeEnd");
            String schedule = req.getParameter("schedule");
            getCtrip gcp = new getCtrip();
            returnInfo = gcp.getForwardFight(fromCity, arriveCity, takeOffTimeStart, takeOffTimeEnd,schedule);
            JSONObject jsonObject = JSONObject.fromObject(returnInfo);
            Iterator<String> it = jsonObject.keys();
            List<String> list = new ArrayList<>();
            while(it.hasNext()){
                String key = it.next();
                list.add(key);
            }
            String[] sortArray = new String[list.size()];
            list.toArray(sortArray);
            char [][] charArrray = ChsLogicCmpUtil.getCharArray(sortArray);
            Arrays.sort(charArrray,ChsLogicCmpUtil.getOrderType("asc"));
            List<Map<String,String>> sortList = new ArrayList();
            JSONObject jsonObjects = new JSONObject();

            for (int j = 0; j < charArrray.length; j++) {
                Iterator<String> its = jsonObject.keys();
                while(its.hasNext()){
                    String key = its.next();
                    if(key.equals(new String(charArrray[j]))) {
                        jsonObjects.put(key,jsonObject.getString(key));
                    }
                }

            }
            returnInfo = jsonObjects.toString();
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return returnInfo;
    }

    @RequestMapping(value = "/flightPriceHistoryChart", method = RequestMethod.POST)
    @ResponseBody
    public String flightPriceHistoryChart(HttpServletRequest req) {
        String returnInfo = "-1";
        try {
            String fromCity = req.getParameter("fromCity");
            String arriveCity = req.getParameter("arriveCity");
            String takeOffTimeStart = req.getParameter("takeOffTimeStart");
            String takeOffTimeEnd = req.getParameter("takeOffTimeEnd");
            String flightDate = req.getParameter("flightDate");
            getCtrip gcp = new getCtrip();
            returnInfo = gcp.getHistoryFight(fromCity, arriveCity,flightDate, takeOffTimeStart, takeOffTimeEnd,"30");
            JSONObject jsonObject = JSONObject.fromObject(returnInfo);
            Iterator<String> it = jsonObject.keys();
            List<String> list = new ArrayList<>();
            while(it.hasNext()){
                String key = it.next();
                list.add(key);
            }
            String[] sortArray = new String[list.size()];
            list.toArray(sortArray);
            char [][] charArrray = ChsLogicCmpUtil.getCharArray(sortArray);
            Arrays.sort(charArrray,ChsLogicCmpUtil.getOrderType("asc"));
            List<Map<String,String>> sortList = new ArrayList();
            JSONObject jsonObjects = new JSONObject();

            for (int j = 0; j < charArrray.length; j++) {
                Iterator<String> its = jsonObject.keys();
                while(its.hasNext()){
                    String key = its.next();
                    if(key.equals(new String(charArrray[j]))) {
                        jsonObjects.put(key,jsonObject.getString(key));
                    }
                }

            }
            returnInfo = jsonObjects.toString();
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return returnInfo;
    }

    @RequestMapping(value = "/flightPriceMaxAndMinHistoryChart", method = RequestMethod.POST)
    @ResponseBody
    public LinkedHashMap flightPriceMaxAndMinHistoryChart(HttpServletRequest req) {
        String returnInfo = "-1";
        LinkedHashMap linkedHashMap = new LinkedHashMap();
        try {
            String fromCity = req.getParameter("fromCity");
            String arriveCity = req.getParameter("arriveCity");
            String takeOffTimeStart = req.getParameter("takeOffTimeStart");
            String takeOffTimeEnd = req.getParameter("takeOffTimeEnd");
            String flightDate = req.getParameter("flightDate");
            getCtrip gcp = new getCtrip();
            returnInfo = gcp.getMaxMinPrice(fromCity, arriveCity,flightDate, takeOffTimeStart, takeOffTimeEnd);
            JSONObject jsonObject = JSONObject.fromObject(returnInfo);
            Iterator<String> it = jsonObject.keys();
            List<String> maxlist = new ArrayList<>();

                String maxvalue = jsonObject.getString("max");
                JSONObject maxJsonObject = JSONObject.fromObject(maxvalue);
                Iterator<String> maxfit = maxJsonObject.keys();
                while(maxfit.hasNext()){
                    String fkey = maxfit.next();
                    String fvalue = maxJsonObject.getString(fkey);
                    JSONArray jsonArray = JSONArray.fromObject(fvalue);
                    int num =0;
                    if(jsonArray.size()>0) {
                        for (int i = 0; i < jsonArray.size(); i++) {
                            String job = String.valueOf(jsonArray.get(i));  // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                            String[] jobs = job.split(",");
                            if (jobs.length >= 3) {
                                if (!StringUtils.isEmpty(jobs[2]) && !jobs[2].equals("null")) {
                                    maxlist.add(jobs[2]+"-"+fkey);
                                    num++;
                                    break;
                                }

                            }

                        }
                    }
                    if(num==0){
                        maxlist.add("00:00"+"-"+fkey);
                    }

                }
            String[] maxsortArray = new String[maxlist.size()];
            maxlist.toArray(maxsortArray);

            char [][] maxcharArrray = ChsLogicCmpUtil.getCharArray(maxsortArray);
            Arrays.sort(maxcharArrray,ChsLogicCmpUtil.getOrderType("asc"));
            JSONObject maxjsonObject = new JSONObject();
            LinkedHashMap maxlinkedHashMap = new LinkedHashMap();
            for (int j = 0; j < maxcharArrray.length; j++) {
                int index = ChsLogicCmpUtil.printArray(maxcharArrray[j],'-');
                Iterator<String> its = maxJsonObject.keys();
                while(its.hasNext()){
                    String key = its.next();
                    if(key.equals(new String(maxcharArrray[j]).substring(index+1))) {
                        maxlinkedHashMap.put(key,maxJsonObject.getString(key));
                        //maxjsonObject.put(key,maxJsonObject.getString(key));
                    }
                }

            }
            linkedHashMap.put("max",maxlinkedHashMap);
            //jsonObject.put("max",maxjsonObject);
            List<String> minlist = new ArrayList<>();

            String minvalue = jsonObject.getString("min");
            JSONObject minJsonObject = JSONObject.fromObject(minvalue);
            Iterator<String> minfit = minJsonObject.keys();
            while(minfit.hasNext()){
                String fkey = minfit.next();
                String fvalue = minJsonObject.getString(fkey);
                JSONArray jsonArray = JSONArray.fromObject(fvalue);
                int num =0;
                if(jsonArray.size()>0) {

                    for (int i = 0; i < jsonArray.size(); i++) {
                        String job = String.valueOf(jsonArray.get(i));  // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                        String[] jobs = job.split(",");
                        if (jobs.length >= 3) {
                            if (!StringUtils.isEmpty(jobs[2]) && !jobs[2].equals("null")) {
                                minlist.add(jobs[2]+"-"+fkey);
                                num++;
                                break;
                            }
                        }
                    }
                }
                if(num ==0){
                    minlist.add("00:00"+"-"+fkey);
                }
            }
            String[] minsortArray = new String[minlist.size()];
            minlist.toArray(minsortArray);

            char [][] mincharArrray = ChsLogicCmpUtil.getCharArray(minsortArray);
            Arrays.sort(mincharArrray,ChsLogicCmpUtil.getOrderType("asc"));
            //JSONObject minjsonObject = new JSONObject();
            LinkedHashMap minlinkedHashMap = new LinkedHashMap();

            for (int j = 0; j < mincharArrray.length; j++) {
                int index = ChsLogicCmpUtil.printArray(mincharArrray[j],'-');
                Iterator<String> its = minJsonObject.keys();
                while(its.hasNext()){
                    String key = its.next();
                    if(key.equals(new String(mincharArrray[j]).substring(index+1))) {
                        minlinkedHashMap.put(key,minJsonObject.getString(key));
                        //minjsonObject.put(key,minJsonObject.getString(key));
                    }
                }

            }
            linkedHashMap.put("min",minlinkedHashMap);

            //jsonObject.put("min",minjsonObject);

            //returnInfo = jsonObject.toString();
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return linkedHashMap;
    }

}
