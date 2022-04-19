import django_filters
from snippet.models import GASnippetTemplate, GASnippet, CustomField, EventCategory

class GASnippetTemplateFilter(django_filters.FilterSet):
    class Meta:
        model = GASnippetTemplate
        fields = {
            'event_category': ['iexact', 'icontains'],
            'event_action': ['iexact', 'icontains'],
            'event_label': ['iexact', 'icontains'],
        }

class GASnippetFilter(django_filters.FilterSet):
    class Meta:
        model = GASnippet
        fields = {
            'event_category': ['iexact', 'icontains'],
            'event_action': ['iexact', 'icontains'],
            'event_label': ['iexact', 'icontains'],
        }

class CustomFieldFilter(django_filters.FilterSet):
    class Meta:
        model = CustomField
        fields = {
            'name': ['iexact', 'icontains', ],
        }

