# Generated by Django 3.1.2 on 2021-12-13 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('document', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='section',
            name='priority',
            field=models.IntegerField(choices=[(3, 'Alta'), (2, 'Media'), (1, 'Bassa')], default=1),
        ),
    ]
