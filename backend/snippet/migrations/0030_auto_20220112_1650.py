# Generated by Django 3.1.2 on 2022-01-12 16:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('snippet', '0029_auto_20220112_1634'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='initialsnippetvariablevalue',
            name='initial_snippet_variable',
        ),
        migrations.DeleteModel(
            name='InitialSnippetVariable',
        ),
        migrations.DeleteModel(
            name='InitialSnippetVariableValue',
        ),
    ]