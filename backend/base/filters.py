import django_filters
from .models import VariableValue, Variable, VariableType

class VariableValueFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')
    condition = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = VariableValue
        fields = ('name', 'condition')

class VariableFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')
    is_custom = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Variable
        fields = ('name', )


class VariableTypeFilter(django_filters.FilterSet):
    reference = django_filters.CharFilter(lookup_expr='icontains')
    scope = django_filters.CharFilter(lookup_expr='icontains')
    priority = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = VariableType
        fields = ('reference', 'scope', 'priority')