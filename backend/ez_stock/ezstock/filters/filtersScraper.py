import pandas as pd
from bs4 import BeautifulSoup
import requests
from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.options import Options
import json
import time


class FilterCls:
    def __init__(self, cmd_exctr='http://selenium:4444/wd/hub', page_addr="http://www.tsetmc.com/Loader.aspx?ParTree=15131F"):
        self.initial_settings = "mw.Settings.Market=0;mw.SaveParams();mw.ShowSettings();HideAllWindow();mw.RemoveAllData();mw.RenderData();mw.Settings.GroupBySector=0;mw.SaveParams();mw.ShowSettings();HideAllWindow();mw.RemoveAllData();mw.RenderData();mw.SortData();mw.Settings.ShowPayeFarabourse=1-mw.Settings.ShowPayeFarabourse;mw.SaveParams();mw.ShowSettings();HideAllWindow();mw.ShowAllSettings();mw.RemoveAllData();mw.RenderData();mw.SortData();mw.Settings.LoadClientType=1-mw.Settings.LoadClientType;mw.SaveParams();HideAllWindow();mw.LoadClientType();mw.Settings.LoadInstStat=1-mw.Settings.LoadInstStat;mw.SaveParams();HideAllWindow();mw.LoadInstStat();mw.Settings.LoadInstHistory=1-mw.Settings.LoadInstHistory;mw.SaveParams();HideAllWindow();mw.LoadInstHistory();mw.SaveBasket();mw.Settings.Filters.push(0);mw.SaveParams();"
        layout = {
        'title': "شخصی",
        'all': "<style>.t0head{cursor:pointer;border:0px solid #eeeeee;font-size:12px;direction:ltr;text-align:left;display:inline-block;overflow:hidden;white-space:nowrap;margin:0px;padding:0px}.t0c{border:0px solid #ffffff;font-size:12px;direction:ltr;text-align:left;display:inline-block;overflow:hidden;white-space:nowrap;margin:0px;padding:0px;line-height:20px;}.secSep{background-color:rgba(0,170,220,1) !important;;font-size:14px !important;font-weight:bold !important;color:white !important;}.ch1,.ch2,.ch3,.ch4,.ch5,.ch6,.ch7,.ch8{background-color:#ffa5a5}div#main>div:nth-child(2n){background-color:#e2e2e2;}.sr{background-color:#aaaaff !important;}</style><div class=\"other\" id=\"header\" style=\"white-space:nowrap;position:fixed;top:50px;height:18px;right:3px;left:283px;overflow-y:hidden;overflow-x:hidden;background-color:#eeeeee;z-index:9\"><div style=\";;background-color:;text-align:left;width:100px;text-align:left\" class=\"t0head\" onclick=\"mw.ChSortF('l18')\">نماد</div><div style=\";;background-color:;text-align:left;width:100px;text-align:left\" class=\"t0head\" onclick=\"mw.ChSortF('cfield0')\">ارزش</div></div><div class=\"other\" id=\"main\" style=\"{s};top:68px;left:283px;right:3px;overflow-y:scroll;\" onscroll=\"document.getElementById('header').scrollLeft=document.getElementById('main').scrollLeft\"></div><div id=\"footer\"></div>",
        'rowStyle': "cursor:pointer;height:20px;white-space:nowrap;line-height:20px;",
        'row': "<div style=\";;background-color:;text-align:left;width:100px\" class=\"t0c\"><a style='color:#000000;' class='inst' href='loader.aspx?ParTree=151311&i={i}' target='{i}'>{l18}</a></div><div style=\";;text-align:left;background-color:;color:#000000;width:100px\" class=\"t0c ch{_cfield0}\">{cfield0}</div>",
        'excel': {'header': "</tr>",'row': "</tr>"}
        }
        self.layout_settings = "MWTemplates[MWTemplates.length - 1] =" + json.dumps(layout) + ";mw.changeTemplate(MWTemplates.length - 1);mw.SaveParams();"
        self.lateral_settings = "mw.SelectFilter(0);mw.ShowSettings();mw.SaveParams();mw.QueryWindowFilterNames();HideAllWindow();"

        caps = DesiredCapabilities.CHROME
        caps["pageLoadStrategy"] = "eager"

        options = Options()
        options.add_argument("start-maximized")
        options.add_argument("enable-automation")
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-infobars")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--disable-browser-side-navigation")
        options.add_argument("--disable-gpu")

        self.driver = webdriver.Remote(command_executor=cmd_exctr , desired_capabilities=caps , options=options)

        self.driver.get(page_addr)
        self.driver.execute_script(self.initial_settings)
        self.driver.execute_script(self.layout_settings)

    def apply_filter(self, filter, filter_id):
        filter = {'FilterCode': filter, 'FilterName': str(filter_id)}
        filter = json.dumps(filter, ensure_ascii=True)
        filter = f"mw.Settings.Filters[0] = {filter};"
        self.driver.execute_script(filter)
        self.driver.execute_script(self.lateral_settings)
        time.sleep(1)

    def get_output(self):
        output = self.driver.page_source.encode('utf-8')
        soup = BeautifulSoup(output, 'html.parser')

        schema = [
            '.t0c .inst', '.t0c+ .t0c'
        ]

        signs = [j.get_text() for j in soup.select(schema[0])]

        values = [j.text for j in soup.select(schema[1])]

        try:
            values = [int(v) if v else 1 for v in values]
        except:
            pass

        return tuple(zip(signs , values))

    def shutdown(self):
        self.driver.quit()
