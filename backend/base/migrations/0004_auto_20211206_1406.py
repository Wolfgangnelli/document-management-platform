# Generated by Django 3.1.2 on 2021-12-06 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_auto_20211206_1405'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='variabletype',
            name='name',
        ),
        migrations.AddField(
            model_name='variabletype',
            name='reference',
            field=models.CharField(default='dataLayer', max_length=255, null=None),
        ),
    ]
