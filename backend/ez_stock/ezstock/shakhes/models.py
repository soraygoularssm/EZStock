from django.contrib.postgres.fields import JSONField
from django.db import models


class Shakhes(models.Model):
    shakheses = models.JSONField(null=True)