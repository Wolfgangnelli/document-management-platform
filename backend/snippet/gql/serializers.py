from base.models import Variable
from rest_framework import serializers
from snippet.models import GASnippetTemplate, GASnippet, CustomField, InitialSnippet, EventCategory, Event, EcommerceSnippet, EcommerceSnippetTemplate, EcommerceSnippetTemplateGA4, EcommerceSnippetGA4
from base.gql.serializers import InitialSnippetVariableSerializer, VariableSerializer


class EcommerceSnippetTemplateGA4Serializer(serializers.ModelSerializer):
    class Meta:
        model = EcommerceSnippetTemplateGA4
        fields = '__all__'

class EcommerceSnippetGA4Serializer(serializers.ModelSerializer):
    class Meta:
        model = EcommerceSnippetGA4
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class GASnippetTemplateSerializer(serializers.ModelSerializer):
    event_category_variable = serializers.SerializerMethodField(read_only=True)
    event_action_variable = serializers.SerializerMethodField(read_only=True)
    event_label_variable = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = GASnippetTemplate
        fields = '__all__'

    def get_event_category_variable(self, obj):
        if obj.event_category_variable:
            serializer = VariableSerializer(obj.event_category_variable, many=False)
            return serializer.data
        else:
            return None

    def get_event_action_variable(self, obj):
        if obj.event_action_variable:
            serializer = VariableSerializer(obj.event_action_variable, many=False)
            return serializer.data
        else:
            return None

    def get_event_label_variable(self, obj):
        if obj.event_label_variable:
            serializer = VariableSerializer(obj.event_label_variable, many=False)
            return serializer.data
        else:
            return None

class GASnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = GASnippet
        fields = '__all__'

class CustomFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomField
        fields = '__all__'


class InitialSnippetSerializer(serializers.ModelSerializer):
    initialSnippetVariables = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = InitialSnippet
        fields = '__all__'

    def get_initialSnippetVariables(self, obj):
        items = obj.initialsnippetvariable_set.all()
        serializer = InitialSnippetVariableSerializer(items, many=True)
        return serializer.data

class EventCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventCategory
        fields = '__all__'

class EcommerceSnippetTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EcommerceSnippetTemplate
        fields = '__all__'

class EcommerceSnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = EcommerceSnippet
        fields = '__all__'