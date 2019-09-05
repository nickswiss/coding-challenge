from django.db import models


class Link(models.Model):

    title = models.CharField(unique=True, max_length=36)
    clicks = models.IntegerField()
