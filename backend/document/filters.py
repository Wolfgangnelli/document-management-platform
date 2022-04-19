import django_filters
from document.models import Section

class SectionFilter(django_filters.FilterSet):
    class Meta:
        model = Section
        fields = {
            'sub_chapter': ['exact', ]
        }