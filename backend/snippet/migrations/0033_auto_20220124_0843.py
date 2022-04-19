# Generated by Django 3.1.2 on 2022-01-24 08:43

from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('snippet', '0032_customfieldoldidx'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customfieldoldidx',
            name='custom_field',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='custom_field_old_idx', to='snippet.customfield'),
        ),
        migrations.CreateModel(
            name='GASnippetOldIdx',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('event_category_old_idx', models.IntegerField(blank=True, null=True)),
                ('event_action_old_idx', models.IntegerField(blank=True, null=True)),
                ('event_label_old_idx', models.IntegerField(blank=True, null=True)),
                ('ga_snippet', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='ga_snippet_old_idx', to='snippet.gasnippet')),
            ],
            options={
                'verbose_name': 'GA Snippet old idx',
                'verbose_name_plural': 'GA Snippet old idxs',
            },
        ),
    ]