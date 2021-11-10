from __future__ import absolute_import , unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE' , 'ezstock.settings')

app = Celery('ezstock')

app.config_from_object('django.conf:settings' , namespace='CELERY') 

app.conf.beat_schedule = {
    'get_filters_data_1s' : {
        'task' : 'shakhes.tasks.shakhes_trend_changes',
        'schedule' :  60.0
    }
}

app.autodiscover_tasks()
