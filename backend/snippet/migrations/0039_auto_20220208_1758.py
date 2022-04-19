# Generated by Django 3.1.2 on 2022-02-08 17:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0024_auto_20220202_1757'),
        ('snippet', '0038_auto_20220208_1140'),
    ]

    operations = [
        migrations.AddField(
            model_name='gasnippettemplate',
            name='event_action_variable',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='event_action_variable', to='base.variable'),
        ),
        migrations.AddField(
            model_name='gasnippettemplate',
            name='event_category_variable',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='event_category_variable', to='base.variable'),
        ),
        migrations.AddField(
            model_name='gasnippettemplate',
            name='event_label_variable',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='event_label_variable', to='base.variable'),
        ),
    ]