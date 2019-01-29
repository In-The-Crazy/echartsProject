package com.redapplenet.midmanager.controller;

import com.huicent.common.util.getCtrip;
import com.redapplenet.midmanager.util.BaseEntity;
import net.sf.json.JSONObject;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
}
