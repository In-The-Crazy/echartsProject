package com.redapplenet.midmanager.controller;
import com.huicent.common.util.getCtrip;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;

/**
 * @ClassName MainSrv
 * @Description TODO
 * @Author yanqiong
 * @Date 2019/1/22 17:02
 */
public class MainSrv extends HttpServlet{
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
        doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String fromCity = req.getParameter("fromCity");
        String arriveCity = req.getParameter("arriveCity");
        String takeOffTime = req.getParameter("takeOffTime");
        String intervalTime = req.getParameter("intervalTime");
        String firstFightNumber = req.getParameter("firstFightNumber");
        String secondFightNumber = req.getParameter("secondFightNumber");
        String thirdFightNumber = req.getParameter("thirdFightNumber");
        String startTime = req.getParameter("startTime");
        String endTime = req.getParameter("endTime");
        String queryType = req.getParameter("queryType");
        resp.setContentType("text/html; charset=utf-8");
        req.setCharacterEncoding("utf-8");
        getCtrip gcp = new getCtrip();
        String returnInfo = "-1";
        if (queryType.equals("1")){
            returnInfo = gcp.getFight(fromCity,arriveCity,takeOffTime,intervalTime);
        } else if(queryType.equals("2")) {
            returnInfo = gcp.priceBetween(fromCity,arriveCity,takeOffTime,firstFightNumber,secondFightNumber,intervalTime);
        } else if(queryType.equals("3")){
            try {
                returnInfo = gcp.flightDate(fromCity,arriveCity,takeOffTime,intervalTime,thirdFightNumber,startTime,endTime);
            } catch (ParseException e) {
                e.printStackTrace();
            }

        }
        PrintWriter out = resp.getWriter();
        out.println(returnInfo);

    }
}
