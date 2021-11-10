from ezstock.celery import app
from celery import Task
import requests
import math
from .models import Shakhes
import json

shakheses = []
url = 'http://www.tsetmc.com/tsev2/data/MarketWatchPlus.aspx'
myobj = {'h': 5 * math.floor(0 / 5),'r': 25 * math.floor(0 / 25)}

@app.task
def shakhes_trend_changes():
    data = requests.post(url, data = myobj)
    data = data.text
    all = data.split("@")

    if (len(all[1]) != 0):
        a = all[1].split(",")

        queryset = Shakhes.objects.all()
        if queryset.exists():
            shakhes = queryset[0]
            if not isinstance(shakhes.shakheses, dict):
                shakhes.shakheses = {'shakheses' : [a[2]]}
            else:
                if shakhes.shakheses['shakheses'][-1] != a[2]:
                    if len(shakhes.shakheses['shakheses']) < 4:
                        shakhes.shakheses['shakheses'].append(a[2])
                    else:
                        shakhes.shakheses['shakheses'].pop(0)
                        shakhes.shakheses['shakheses'].append(a[2])
                
            shakhes.save(update_fields=['shakheses'])

        # + "   " + a[3]
    else:
        shakhes_trend_changes()

# UpdateShakhes() {
#         return axios({
#           method: "POST",
#           url:
#             "/tsetmc",
#           // this.heven == 0
#           //   ? "https://cors-anywhere.herokuapp.com/"
#           //   : ,
#           data: 
#           headers: {
#             "Content-Type": "text/html",
#           },
#         })
#         .then((data) => {
#           var all = data.data.split("@");
          
#           if (all[1].length != 0) {
#             var a = all[1].split(",");
#             return (a[2]) 
#             // + "   " + a[3]
#           } else {
#             return this.UpdateShakhes();
#           }
#         })
#         .catch((e) => {
#           console.log(e);
#           setTimeout(this.UpdateShakhes, 500);
#         });
#     },