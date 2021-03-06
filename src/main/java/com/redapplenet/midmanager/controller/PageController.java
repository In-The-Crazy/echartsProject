package com.redapplenet.midmanager.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * @ClassName PageController
 * @Description TODO
 * @Author yanqiong
 * @Date 2019/1/28 12:00
 */
@RequestMapping("/analysis")
@Controller
public class PageController {
    @RequestMapping(value = "/queryFirst", method = RequestMethod.GET)
    public ModelAndView queryAnalysisFirst() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/queryAnalysisFirst");
        return mav;
    }

    @RequestMapping(value = "/queryFlightPriceAnalysisFuture", method = RequestMethod.GET)
    public ModelAndView queryFlightPriceAnalysisFuture() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/flightPriceAnalysisFuture");
        return mav;
    }
    @RequestMapping(value = "/queryFlightPriceAnalysisHistory", method = RequestMethod.GET)
    public ModelAndView queryFlightPriceAnalysisHistory() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/flightPriceAnalysisHistory");
        return mav;
    }
    @RequestMapping(value = "/queryFlightPriceMaxAndMinAnalysisHistory", method = RequestMethod.GET)
    public ModelAndView queryFlightPriceMaxAndMinAnalysisHistory() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/flightPriceMaxAndMinAnalysisHistory");
        return mav;
    }
    @RequestMapping(value = "/queryFilghtPriceAnalysisCuttentDate", method = RequestMethod.GET)
    public ModelAndView queryFilghtPriceAnalysisCuttentDate() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/filghtPriceAnalysisCuttentDate");
        return mav;
    }

}
