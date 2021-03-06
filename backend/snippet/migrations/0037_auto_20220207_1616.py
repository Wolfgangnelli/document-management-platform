# Generated by Django 3.1.2 on 2022-02-07 16:16

from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('document', '0030_auto_20220113_0942'),
        ('base', '0024_auto_20220202_1757'),
        ('snippet', '0036_customfield_value_variable'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customfield',
            name='value_variable',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='custom_field_value_variable', to='base.gasnippetvariable'),
        ),
        migrations.CreateModel(
            name='GASnippetSection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('event_category', models.CharField(blank=True, max_length=255)),
                ('event_action', models.CharField(blank=True, max_length=255)),
                ('event_label', models.CharField(blank=True, max_length=255)),
                ('snippet_name', models.CharField(blank=True, max_length=255)),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ga_snippet_section', to='document.section')),
            ],
            options={
                'verbose_name': 'GA Snippet section',
                'verbose_name_plural': 'GA Snippets section',
            },
        ),
    ]
