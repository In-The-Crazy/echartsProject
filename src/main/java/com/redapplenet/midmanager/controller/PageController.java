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


}