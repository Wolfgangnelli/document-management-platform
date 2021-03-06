# Generated by Django 3.1.2 on 2022-01-03 09:03

from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('snippet', '0023_auto_20220101_1130'),
    ]

    operations = [
        migrations.CreateModel(
            name='EcommerceSnippetTemplateGA4',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('item_name', models.CharField(max_length=255)),
                ('item_id', models.CharField(max_length=200)),
                ('price', models.FloatField(blank=True, null=True)),
                ('item_brand', models.CharField(blank=True, max_length=255)),
                ('item_category', models.CharField(blank=True, max_length=255)),
                ('item_category2', models.CharField(blank=True, max_length=255)),
                ('item_category3', models.CharField(blank=True, max_length=255)),
                ('item_category4', models.CharField(blank=True, max_length=255)),
                ('item_variant', models.CharField(blank=True, max_length=255)),
                ('item_list_name', models.CharField(blank=True, max_length=255)),
                ('item_list_id', models.CharField(blank=True, max_length=255)),
                ('index', models.IntegerField(blank=True, null=True)),
                ('quantity', models.IntegerField(blank=True, default=0)),
                ('promotion_id', models.CharField(blank=True, max_length=255)),
                ('promotion_name', models.CharField(blank=True, max_length=255)),
                ('creative_name', models.CharField(blank=True, max_length=255)),
                ('creative_slot', models.CharField(blank=True, max_length=200)),
                ('location_id', models.CharField(blank=True, max_length=255)),
                ('affiliation', models.CharField(blank=True, max_length=255)),
                ('coupon', models.CharField(blank=True, max_length=255)),
                ('currency', models.CharField(blank=True, max_length=100)),
                ('discount', models.FloatField(blank=True, null=True)),
                ('payment_type', models.CharField(blank=True, max_length=255)),
                ('shipping_tier', models.CharField(blank=True, max_length=255)),
                ('transaction_id', models.CharField(blank=True, max_length=255)),
                ('value', models.FloatField(blank=True, default=0)),
                ('tax', models.FloatField(blank=True, default=0)),
                ('shipping', models.FloatField(blank=True, default=0)),
                ('snippet_name', models.CharField(blank=True, max_length=255)),
                ('event', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ga4_ecommerce_snippet_template', to='snippet.event')),
            ],
            options={
                'verbose_name': 'Ecommerce snippet template GA4',
                'verbose_name_plural': 'Ecommerce snippets template GA4',
            },
        ),
        migrations.CreateModel(
            name='EcommerceSnippetGA4',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('item_name', models.CharField(max_length=255)),
                ('item_id', models.CharField(max_length=200)),
                ('price', models.FloatField(blank=True, null=True)),
                ('item_brand', models.CharField(blank=True, max_length=255)),
                ('item_category', models.CharField(blank=True, max_length=255)),
                ('item_category2', models.CharField(blank=True, max_length=255)),
                ('item_category3', models.CharField(blank=True, max_length=255)),
                ('item_category4', models.CharField(blank=True, max_length=255)),
                ('item_variant', models.CharField(blank=True, max_length=255)),
                ('item_list_name', models.CharField(blank=True, max_length=255)),
                ('item_list_id', models.CharField(blank=True, max_length=255)),
                ('index', models.IntegerField(blank=True, null=True)),
                ('quantity', models.IntegerField(blank=True, default=0)),
                ('promotion_id', models.CharField(blank=True, max_length=255)),
                ('promotion_name', models.CharField(blank=True, max_length=255)),
                ('creative_name', models.CharField(blank=True, max_length=255)),
                ('creative_slot', models.CharField(blank=True, max_length=200)),
                ('location_id', models.CharField(blank=True, max_length=255)),
                ('affiliation', models.CharField(blank=True, max_length=255)),
                ('coupon', models.CharField(blank=True, max_length=255)),
                ('currency', models.CharField(blank=True, max_length=100)),
                ('discount', models.FloatField(blank=True, null=True)),
                ('payment_type', models.CharField(blank=True, max_length=255)),
                ('shipping_tier', models.CharField(blank=True, max_length=255)),
                ('transaction_id', models.CharField(blank=True, max_length=255)),
                ('value', models.FloatField(blank=True, default=0)),
                ('tax', models.FloatField(blank=True, default=0)),
                ('shipping', models.FloatField(blank=True, default=0)),
                ('snippet_name', models.CharField(blank=True, max_length=255)),
                ('event', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ga4_ecommerce_snippet', to='snippet.event')),
            ],
            options={
                'verbose_name': 'Ecommerce snippet GA4',
                'verbose_name_plural': 'Ecommerce snippets GA4',
            },
        ),
        migrations.AddField(
            model_name='customfield',
            name='ga4_eco_snippet',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='custom_field', to='snippet.ecommercesnippetga4'),
        ),
    ]
