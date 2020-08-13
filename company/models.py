from django.db import models
from django.contrib.auth.models import User


class Company(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='all_companies', null=True, blank=True)
    company_name = models.CharField("Company Name", max_length=100)
    company_owner = models.CharField("Company Owner", max_length=100)
    company_worth = models.IntegerField("Company worth in Millions", default=0)
    company_shares = models.IntegerField("Number of shares", default=0)
    company_logo = models.ImageField(upload_to='company_logo', null=True, blank=True)
    company_employees = models.IntegerField("Number of employees", default=0)
    created_at = models.DateTimeField("Created at", auto_now=True)


    def __str__(self):
        return self.company_name + ' - ' + self.company_owner

    class Meta:
        verbose_name_plural = "Companies"



