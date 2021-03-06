# Generated by Django 3.1.2 on 2022-01-01 11:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0012_auto_20211221_1819'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='variable',
            options={'ordering': ['-pk'], 'verbose_name': 'Variable', 'verbose_name_plural': 'Variables'},
        ),
        migrations.AlterField(
            model_name='variablevalue',
            name='variable',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variableValue', to='base.variable'),
        ),
    ]
