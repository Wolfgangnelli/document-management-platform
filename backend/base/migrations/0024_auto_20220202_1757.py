# Generated by Django 3.1.2 on 2022-02-02 17:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0023_auto_20220202_1313'),
    ]

    operations = [
        migrations.RenameField(
            model_name='gasnippetvariable',
            old_name='id_template',
            new_name='is_template',
        ),
    ]
