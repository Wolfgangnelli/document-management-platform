# Generated by Django 3.1.2 on 2022-01-07 16:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('document', '0024_customer_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='section',
        ),
        migrations.AlterField(
            model_name='customer',
            name='image',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='customer', to='document.image'),
        ),
    ]