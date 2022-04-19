from django.db import models
from django_extensions.db.models import TimeStampedModel
from document.models import Datalayer, Document


class BaseGASnippet(TimeStampedModel):
    event_category = models.CharField(max_length=255, blank=True, null=False)
    event_action = models.CharField(max_length=255, blank=True, null=False)
    event_label = models.CharField(max_length=255, blank=True, null=False)
    snippet_name = models.CharField(max_length=255, blank=True, null=False)

    class Meta:
        abstract = True


class BaseEcommerceSnippet(TimeStampedModel):
    snippet_name = models.CharField(max_length=255, blank=True, null=False)
    name = models.CharField(max_length=255, blank=False, null=False)
    currency_code = models.CharField(max_length=255, blank=True, null=False)
    item_id = models.CharField(max_length=200, blank=False, null=False)
    price = models.CharField(max_length=200, blank=True, null=False)
    brand = models.CharField(max_length=255, blank=True, null=False)
    category = models.CharField(max_length=255, blank=True, null=False)
    variant = models.CharField(max_length=255, blank=True, null=False)
    list = models.CharField(max_length=255, blank=True, null=False)
    position = models.CharField(max_length=200, blank=True, null=False)
    quantity = models.CharField(max_length=200, blank=True, null=False)
    creative = models.CharField(max_length=255, blank=True, null=False)
    affiliation = models.CharField(max_length=255, blank=True, null=False)
    revenue = models.CharField(max_length=255, blank=True, null=False)
    tax = models.CharField(max_length=255, blank=True, null=False)
    shipping = models.CharField(max_length=255, blank=True, null=False)
    coupon = models.CharField(max_length=255, blank=True, null=False)

    class Meta:
        abstract = True


class BaseEcommerceSnippetGA4(TimeStampedModel):
    snippet_name = models.CharField(max_length=255, blank=True, null=False)
    item_name = models.CharField(max_length=255, blank=True, null=False)
    item_id = models.CharField(max_length=200, blank=True, null=False)
    price = models.CharField(max_length=255, blank=True, null=True)
    item_brand = models.CharField(max_length=255, blank=True, null=False)
    item_category = models.CharField(max_length=255, blank=True, null=False)
    item_category2 = models.CharField(max_length=255, blank=True, null=False)
    item_category3 = models.CharField(max_length=255, blank=True, null=False)
    item_category4 = models.CharField(max_length=255, blank=True, null=False)
    item_variant = models.CharField(max_length=255, blank=True, null=False)
    item_list_name = models.CharField(max_length=255, blank=True, null=False)
    item_list_id = models.CharField(max_length=255, blank=True, null=False)
    index = models.CharField(max_length=255, blank=True, null=True)
    quantity = models.CharField(max_length=255, blank=True, null=False)
    promotion_id = models.CharField(max_length=255, blank=True, null=False)
    promotion_name = models.CharField(max_length=255, blank=True, null=False)
    creative_name = models.CharField(max_length=255, blank=True, null=False)
    creative_slot = models.CharField(max_length=200, blank=True, null=False)
    location_id = models.CharField(max_length=255, blank=True, null=False)
    affiliation = models.CharField(max_length=255, blank=True, null=False)
    coupon = models.CharField(max_length=255, blank=True, null=False)
    currency = models.CharField(max_length=100, blank=True, null=False)
    discount = models.CharField(max_length=255, blank=True, null=False)
    payment_type = models.CharField(max_length=255, blank=True, null=False)
    shipping_tier = models.CharField(max_length=255, blank=True, null=False)
    transaction_id = models.CharField(max_length=255, blank=True, null=False)
    value = models.CharField(max_length=255, blank=True, null=False)
    tax = models.CharField(max_length=255, blank=True, null=False)
    shipping = models.CharField(max_length=255, blank=True, null=False)

    class Meta:
        abstract = True


class EventCategory(TimeStampedModel):
    CAT_CHOICES = [
        ('Ecommerce', 'Ecommerce'),
        ('Google Analytics', 'Google Analytics'),
        ('Custom', 'Custom')
    ]
    name = models.CharField(max_length=255, blank=False, null=False, choices=CAT_CHOICES, default='Custom')

    class Meta:
        verbose_name = 'Event Category'
        verbose_name_plural = 'Event Categories'

    def __str__(self):
        return self.name


class Event(TimeStampedModel):
    category = models.ForeignKey(EventCategory, on_delete=models.PROTECT, blank=False, null=True, related_name='event')
    name = models.CharField(max_length=255, blank=True, null=False)

    class Meta:
        ordering = ['-pk']
        verbose_name = 'Event'
        verbose_name_plural = 'Events'

    def __str__(self):
        return self.name


class GASnippetTemplate(BaseGASnippet):
    event = models.ForeignKey(Event, related_name='ga_snippet_template', on_delete=models.SET_NULL, null=True)
    event_category_variable = models.ForeignKey('base.Variable', related_name='event_category_variable', on_delete=models.CASCADE, blank=True, null=True)
    event_action_variable = models.ForeignKey('base.Variable', related_name='event_action_variable', on_delete=models.CASCADE, blank=True, null=True)
    event_label_variable = models.ForeignKey('base.Variable', related_name='event_label_variable', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        ordering = ['-pk']
        verbose_name = 'GA snippet template'
        verbose_name_plural = 'GA snippets template'

    def __str__(self):
        return '{0}/{1}'.format(self.pk, self.snippet_name)


class GASnippet(BaseGASnippet):
    event_id_custom = models.CharField(max_length=100, blank=True)
    event_category_variable = models.ForeignKey('base.GASnippetVariable', related_name='event_category_variable', on_delete=models.CASCADE, blank=True, null=True)
    event_action_variable = models.ForeignKey('base.GASnippetVariable', related_name='event_action_variable', on_delete=models.CASCADE, blank=True, null=True)
    event_label_variable = models.ForeignKey('base.GASnippetVariable', related_name='event_label_variable', on_delete=models.CASCADE, blank=True, null=True)
    event = models.ForeignKey(Event, related_name='ga_snippet', on_delete=models.SET_NULL, null=True)
    datalayer = models.ForeignKey(Datalayer, related_name='ga_snippet', on_delete=models.CASCADE, null=True)
    section = models.ForeignKey('document.Section', related_name='ga_snippet', on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name = 'GA Snippet'
        verbose_name_plural = 'GA snippets'

    def __str__(self):
        return f'GA Snippet {self.pk}'


class GASnippetOldIdx(TimeStampedModel):
    event_category_old_idx = models.IntegerField(null=True, blank=True)
    event_action_old_idx = models.IntegerField(null=True, blank=True)
    event_label_old_idx = models.IntegerField(null=True, blank=True)
    ga_snippet = models.OneToOneField(GASnippet, related_name='ga_snippet_old_idx', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'GA Snippet old idx'
        verbose_name_plural = 'GA Snippet old idxs'

    def __str__(self):
        return f'{self.pk}'


class EcommerceSnippetTemplate(BaseEcommerceSnippet):
    event = models.ForeignKey(Event, related_name='ecommerce_snippet_template', on_delete=models.SET_NULL, null=True)
    name_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_name_variable', on_delete=models.CASCADE, blank=True, null=True)
    currency_code_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_currency_code_variable', on_delete=models.CASCADE, blank=True, null=True)
    item_id_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_item_id_variable', on_delete=models.CASCADE, blank=True, null=True)
    price_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_price_variable', on_delete=models.CASCADE, blank=True, null=True)
    brand_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_brand_variable', on_delete=models.CASCADE, blank=True, null=True)
    category_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_category_variable', on_delete=models.CASCADE, blank=True, null=True)
    variant_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_variant_variable', on_delete=models.CASCADE, blank=True, null=True)
    list_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_list_variable', on_delete=models.CASCADE, blank=True, null=True)
    position_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_position_variable', on_delete=models.CASCADE, blank=True, null=True)
    quantity_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_quantity_variable', on_delete=models.CASCADE, blank=True, null=True)
    creative_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_creative_variable', on_delete=models.CASCADE, blank=True, null=True)
    affiliation_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_affiliation_variable', on_delete=models.CASCADE, blank=True, null=True)
    revenue_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_revenue_variable', on_delete=models.CASCADE, blank=True, null=True)
    tax_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_tax_variable', on_delete=models.CASCADE, blank=True, null=True)
    shipping_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_shipping_variable', on_delete=models.CASCADE, blank=True, null=True)
    coupon_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_coupon_variable', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = 'Ecommerce snippet template'
        verbose_name_plural = 'Ecommerce snippets template'

    def __str__(self):
        return self.name


class EcommerceSnippetTemplateGA4(BaseEcommerceSnippetGA4):
    event = models.ForeignKey(Event, related_name='ga4_ecommerce_snippet_template', on_delete=models.SET_NULL, null=True)
    item_name_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_item_name_variable', on_delete=models.SET_NULL, blank=True, null=True)
    item_id_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_item_id_variable', on_delete=models.SET_NULL, blank=True, null=True)
    price_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_price_variable', on_delete=models.SET_NULL, blank=True, null=True)
    item_brand_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_item_brand_variable', on_delete=models.SET_NULL, blank=True, null=True)
    item_category_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_item_category_variable', on_delete=models.SET_NULL, blank=True, null=True)
    item_category2_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_item_category2_variable', on_delete=models.SET_NULL, blank=True, null=True)
    item_category3_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_item_category3_variable', on_delete=models.SET_NULL, blank=True, null=True)
    item_category4_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_item_category4_variable', on_delete=models.SET_NULL, blank=True, null=True)
    item_variant_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_item_variant_variable', on_delete=models.SET_NULL, blank=True, null=True)
    item_list_name_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_item_list_name_variable', on_delete=models.SET_NULL, blank=True, null=True)
    item_list_id_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_item_list_id_variable', on_delete=models.SET_NULL, blank=True, null=True)
    index_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_index_variable', on_delete=models.SET_NULL, blank=True, null=True)
    quantity_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_quantity_variable', on_delete=models.SET_NULL, blank=True, null=True)
    promotion_id_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_promotion_id_variable', on_delete=models.SET_NULL, blank=True, null=True)
    promotion_name_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_promotion_name_variable', on_delete=models.SET_NULL, blank=True, null=True)
    creative_name_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_creative_name_variable', on_delete=models.SET_NULL, blank=True, null=True)
    creative_slot_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_creative_slot_variable', on_delete=models.SET_NULL, blank=True, null=True)
    location_id_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_location_id_variable', on_delete=models.SET_NULL, blank=True, null=True)
    affiliation_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_affiliation_variable', on_delete=models.SET_NULL, blank=True, null=True)
    coupon_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_coupon_variable', on_delete=models.SET_NULL, blank=True, null=True)
    currency_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_currency_variable', on_delete=models.SET_NULL, blank=True, null=True)
    discount_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_discount_variable', on_delete=models.SET_NULL, blank=True, null=True)
    payment_type_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_payment_type_variable', on_delete=models.SET_NULL, blank=True, null=True)
    shipping_tier_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_shipping_tier_variable', on_delete=models.SET_NULL, blank=True, null=True)
    transaction_id_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_transaction_id_variable', on_delete=models.SET_NULL, blank=True, null=True)
    value_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_value_variable', on_delete=models.SET_NULL, blank=True, null=True)
    tax_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_tax_variable', on_delete=models.SET_NULL, blank=True, null=True)
    shipping_variable = models.ForeignKey('base.EcommerceSnippetVariableTemplate', related_name='temp_ga4_shipping_variable', on_delete=models.SET_NULL, blank=True, null=True)

    class Meta:
        ordering = ['-pk']
        verbose_name = 'Ecommerce snippet template GA4'
        verbose_name_plural = 'Ecommerce snippets template GA4'

    def __str__(self):
        return f'{self.pk} - {self.snippet_name}'


class InitialSnippet(TimeStampedModel):
    event = models.ForeignKey(Event, related_name='initial_snippet', on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name = 'Initial snippet'
        verbose_name_plural = 'Initial snippets'

    def __str__(self):
        return f'{self.pk}'


class EcommerceSnippet(BaseEcommerceSnippet):
    event = models.ForeignKey(Event, related_name='ecommerce_snippet', on_delete=models.SET_NULL, null=True)
    name_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_name_variable', on_delete=models.CASCADE, blank=True, null=True)
    currency_code_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_currency_code_variable', on_delete=models.CASCADE, blank=True, null=True)
    item_id_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_item_id_variable', on_delete=models.CASCADE, blank=True, null=True)
    price_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_price_variable', on_delete=models.CASCADE, blank=True, null=True)
    brand_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_brand_variable', on_delete=models.CASCADE, blank=True, null=True)
    category_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_category_variable', on_delete=models.CASCADE, blank=True, null=True)
    variant_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_variant_variable', on_delete=models.CASCADE, blank=True, null=True)
    list_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_list_variable', on_delete=models.CASCADE, blank=True, null=True)
    position_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_position_variable', on_delete=models.CASCADE, blank=True, null=True)
    quantity_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_quantity_variable', on_delete=models.CASCADE, blank=True, null=True)
    creative_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_creative_variable', on_delete=models.CASCADE, blank=True, null=True)
    affiliation_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_affiliation_variable', on_delete=models.CASCADE, blank=True, null=True)
    revenue_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_revenue_variable', on_delete=models.CASCADE, blank=True, null=True)
    tax_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_tax_variable', on_delete=models.CASCADE, blank=True, null=True)
    shipping_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_shipping_variable', on_delete=models.CASCADE, blank=True, null=True)
    coupon_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_coupon_variable', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = 'Ecommerce snippet'
        verbose_name_plural = 'Ecommerce snippets'


class EcommerceSnippetGA4(BaseEcommerceSnippetGA4):
    event = models.ForeignKey(Event, related_name='ga4_ecommerce_snippet', on_delete=models.SET_NULL, null=True)
    item_name_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_item_name_variable', on_delete=models.CASCADE, blank=True, null=True)
    item_id_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_item_id_variable', on_delete=models.CASCADE, blank=True, null=True)
    price_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_price_variable', on_delete=models.CASCADE, blank=True, null=True)
    item_brand_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_item_brand_variable', on_delete=models.CASCADE, blank=True, null=True)
    item_category_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_item_category_variable', on_delete=models.CASCADE, blank=True, null=True)
    item_category2_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_item_category2_variable', on_delete=models.CASCADE, blank=True, null=True)
    item_category3_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_item_category3_variable', on_delete=models.CASCADE, blank=True, null=True)
    item_category4_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_item_category4_variable', on_delete=models.CASCADE, blank=True, null=True)
    item_variant_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_item_variant_variable', on_delete=models.CASCADE, blank=True, null=True)
    item_list_name_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_item_list_name_variable', on_delete=models.CASCADE, blank=True, null=True)
    item_list_id_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_item_list_id_variable', on_delete=models.CASCADE, blank=True, null=True)
    index_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_index_variable',on_delete=models.CASCADE, blank=True, null=True)
    quantity_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_quantity_variable', on_delete=models.CASCADE, blank=True, null=True)
    promotion_id_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_promotion_id_variable', on_delete=models.CASCADE, blank=True, null=True)
    promotion_name_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_promotion_name_variable', on_delete=models.CASCADE, blank=True, null=True)
    creative_name_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_creative_name_variable', on_delete=models.CASCADE, blank=True, null=True)
    creative_slot_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_creative_slot_variable', on_delete=models.CASCADE, blank=True, null=True)
    location_id_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_location_id_variable', on_delete=models.CASCADE, blank=True, null=True)
    affiliation_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_affiliation_variable', on_delete=models.CASCADE, blank=True, null=True)
    coupon_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_coupon_variable',on_delete=models.CASCADE, blank=True, null=True)
    currency_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_currency_variable', on_delete=models.CASCADE, blank=True, null=True)
    discount_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_discount_variable', on_delete=models.CASCADE, blank=True, null=True)
    payment_type_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_payment_type_variable', on_delete=models.CASCADE, blank=True, null=True)
    shipping_tier_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_shipping_tier_variable', on_delete=models.CASCADE, blank=True, null=True)
    transaction_id_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_transaction_id_variable', on_delete=models.CASCADE, blank=True, null=True)
    value_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_value_variable', on_delete=models.CASCADE, blank=True, null=True)
    tax_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_tax_variable', on_delete=models.CASCADE, blank=True, null=True)
    shipping_variable = models.ForeignKey('base.EcommerceSnippetVariable', related_name='eco_ga4_shipping_variable', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = 'Ecommerce snippet GA4'
        verbose_name_plural = 'Ecommerce snippets GA4'

    def __str__(self):
        return f'{self.pk} - {self.snippet_name}'


class CustomField(TimeStampedModel):
    eco_snippet = models.ForeignKey(EcommerceSnippet, related_name='custom_field', on_delete=models.CASCADE, blank=True, null=True)
    ga_snippet = models.ForeignKey(GASnippet, related_name='custom_field', on_delete=models.CASCADE, blank=True, null=True)
    ga4_eco_snippet = models.ForeignKey(EcommerceSnippetGA4, related_name='custom_field', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=255, blank=False, null=False)
    value = models.CharField(max_length=255, blank=True, null=False)
    value_variable = models.ForeignKey('base.GASnippetVariable', related_name='custom_field_value_variable', on_delete=models.CASCADE, blank=True, null=True)
    is_dimension = models.BooleanField(default=False, blank=False, null=False)
    is_metric = models.BooleanField(default=False, blank=False, null=False)
    document = models.ForeignKey(Document, related_name='custom_field', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = 'Custom field'
        verbose_name_plural = 'Custom fields'

    def __str__(self):
        return self.name


class CustomFieldOldIdx(TimeStampedModel):
    name_old_idx = models.IntegerField(null=True, blank=True)
    value_old_idx = models.IntegerField(null=True, blank=True)
    custom_field = models.OneToOneField(CustomField, related_name='custom_field_old_idx', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Custom field old idx'
        verbose_name_plural = 'Custom field old idxs'

    def __str__(self):
        return f'{self.pk} - Custom field: {self.custom_field}'


'''
class Snippet(TimeStampedModel):
    event = models.ForeignKey(Event, related_name='snippet', on_delete=models.SET_NULL, null=True)
    ga_event_snippet_custom = models.ForeignKey(GAeventSnippetCustom, related_name='snippet', on_delete=models.CASCADE, blank=True, null=True)
    ga_event_snippet_std = models.ForeignKey(GAeventSnippetStd, related_name='snippet', on_delete=models.CASCADE, blank=True, null=False)
    eco_snippet_std = models.ForeignKey(EcommerceSnippetStd, related_name='snippet', on_delete=models.CASCADE, blank=True, null=False)
    eco_snippet_custom = models.ForeignKey(EcommerceSnippetCustom, related_name='snippet', on_delete=models.CASCADE, blank=True, null=True)
    section = models.ForeignKey(Section, related_name='snippet', on_delete=models.SET_NULL, null=True, blank=True)
    init_snippet = models.ForeignKey(InitialSnippetCustom, related_name='snippet', on_delete=models.CASCADE, null=False, blank=True)

    class Meta:
        verbose_name = 'Snippet'
        verbose_name_plural = 'Snippets'

    def __str__(self):
        return self.name
'''