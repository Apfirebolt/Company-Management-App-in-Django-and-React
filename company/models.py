from django.db import models


class Company(models.Model):
    name = models.CharField("Company Name", max_length=100)
    company_owner = models.CharField("Company Owner", max_length=100)
    created_at = models.DateTimeField("Created at", auto_now=True)
    capital = models.IntegerField("In Millions", default=0)

    def __str__(self):
        return self.name + ' - ' + self.company_owner

    class Meta:
        verbose_name_plural = "Companies"



