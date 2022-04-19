# Generated by Django 3.1.2 on 2022-01-11 08:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('snippet', '0028_auto_20220105_1551'),
        ('document', '0026_container_document'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datalayer',
            name='initial_snippet',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='snippet.initialsnippet'),
        ),
    ]