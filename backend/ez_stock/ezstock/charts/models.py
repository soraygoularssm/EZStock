from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils import timezone
from ezstock.settings import MEDIA_ROOT
import os

# Create your models here.

def upload_to(instance, filename):
    path = MEDIA_ROOT + '/r_scripts'

    filename = str(instance.id) + "." + filename.split('.')[-1]
    filepath = os.path.join(path, filename)
    
    return filepath

def last_order():
    last_order_number = 1

    while True:
        if Chart.objects.filter(order = last_order_number).count() == 0:
            break
        else:
            last_order_number = last_order_number + 1

    return last_order_number

class Chart(models.Model):
    CATEGORY = (
        (1, 'دیدبان'),
        (2, 'بنیادی'),
        (3, 'تکنیکال'),
    )
    name = models.CharField(null=False , max_length=50 , unique=True)
    order = models.IntegerField(null=False , default=last_order)
    category = models.IntegerField(null=False, default=1 , choices=CATEGORY)
    data = JSONField(null=False , default='.')
    last_update = models.DateTimeField(default = timezone.now)
    r_file = models.FileField(null=True , blank=True , upload_to=upload_to , max_length=500)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        self.last_update = timezone.now()

        try:
            this = Chart.objects.get(id=self.id)
            if this.r_file != self.r_file:
                this.r_file.delete()
        except:
            pass

        return super(Chart, self).save(*args, **kwargs)
    
    def delete(self,*args,**kwargs):
        this = Chart.objects.get(id=self.id)
        this.r_file.delete()

        return super(Chart, self).delete(*args,**kwargs)