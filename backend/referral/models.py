from django.db import models


class Link(models.Model):
    """
    Represents a referral link:
        title: The title of the link
        clicks: The number of times a link has been clicked
    """

    title = models.CharField(unique=True, max_length=36)
    clicks = models.IntegerField()
