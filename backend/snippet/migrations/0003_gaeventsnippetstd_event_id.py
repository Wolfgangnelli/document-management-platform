# Generated by Django 3.1.2 on 2021-12-10 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snippet', '0002_auto_20211210_0904'),
    ]

    operations = [
        migrations.AddField(
            model_name='gaeventsnippetstd',
            name='event_id',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
