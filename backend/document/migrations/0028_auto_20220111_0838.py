# Generated by Django 3.1.2 on 2022-01-11 08:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('document', '0027_auto_20220111_0827'),
    ]

    operations = [
        migrations.RenameField(
            model_name='container',
            old_name='container',
            new_name='name',
        ),
    ]
