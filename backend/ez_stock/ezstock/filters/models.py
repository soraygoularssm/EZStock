from django.db import models

class Filter(models.Model):
    IMPORTANCE = (
        (1, 'مهم'),
        (2, 'متوسط'),
        (3, 'بی اهمیت'),
    )
    name = models.CharField(null=False , max_length=50)
    filter = models.TextField(null=False)
    order = models.IntegerField(null=False, default=3 , choices=IMPORTANCE)
    category = models.CharField(null=True , blank=True , max_length=50)

    def __str__(self):
        return self.name