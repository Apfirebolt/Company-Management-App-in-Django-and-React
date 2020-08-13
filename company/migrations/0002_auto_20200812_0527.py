# Generated by Django 3.0.2 on 2020-08-12 12:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('company', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='company',
            old_name='name',
            new_name='company_name',
        ),
        migrations.RemoveField(
            model_name='company',
            name='capital',
        ),
        migrations.AddField(
            model_name='company',
            name='company_employees',
            field=models.IntegerField(default=0, verbose_name='Number of employees'),
        ),
        migrations.AddField(
            model_name='company',
            name='company_logo',
            field=models.ImageField(blank=True, null=True, upload_to='company_logo'),
        ),
        migrations.AddField(
            model_name='company',
            name='company_shares',
            field=models.IntegerField(default=0, verbose_name='Number of shares'),
        ),
        migrations.AddField(
            model_name='company',
            name='company_worth',
            field=models.IntegerField(default=0, verbose_name='Company worth in Millions'),
        ),
        migrations.AddField(
            model_name='company',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='all_companies', to=settings.AUTH_USER_MODEL),
        ),
    ]