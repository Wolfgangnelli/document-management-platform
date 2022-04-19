from rest_framework import serializers
from base.models import VariableValue, Variable, VariableType, DocumentVariable, DocumentVariableValue, InitialSnippetVariable, InitialSnippetVariableValue

class VariableValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariableValue
        fields = "__all__"

    #def create(self, validated_data):
    #    var_value = VariableValue.objects.create(**validated_data)
    #    return var_value


class VariableSerializer(serializers.ModelSerializer):
    variableValue = VariableValueSerializer(many=True, read_only=True)

    class Meta:
        model = Variable
        fields = "__all__"


class VariableTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariableType
        fields = ('reference', 'scope', 'priority')

    def create(self, validated_data):
        var_type = VariableType.objects.create(**validated_data)
        return  var_type



class InitialSnippetVariableValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = InitialSnippetVariableValue
        fields = '__all__'

class InitialSnippetVariableSerializer(serializers.ModelSerializer):
    initialSnippetVariableValues = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = InitialSnippetVariable
        fields = '__all__'

    def get_initialSnippetVariableValues(self, obj):
        items = obj.initialsnippetvariablevalue_set.all() #InitialSnippetVariableValue.objects.filter(initial_snippet_variable=obj.pk)
        serializer = InitialSnippetVariableValueSerializer(items, many=True)
        return serializer.data



class DocumentVariableSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentVariable
        fields = '__all__'

class DocumentVariableValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentVariableValue
        fields = '__all__'