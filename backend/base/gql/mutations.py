from base.gql.serializers import VariableValueSerializer, VariableSerializer, VariableTypeSerializer, \
    DocumentVariableSerializer, InitialSnippetVariableSerializer, InitialSnippetVariableValueSerializer
from graphene_django.rest_framework.mutation import SerializerMutation
from graphene import  Mutation, Field, Boolean, ID
from snippet.gql.types import InitialSnippetNode
from snippet.models import InitialSnippet, Event
from rest_framework.parsers import JSONParser
from .types import VariableInputType, VariableNode, DocumentVariableNode, VariableValueInputType, \
    DocumentVariableInputType, InitialSnippetVariableNode, InitialSnippetVariableInputType, VariableValueNode, \
    InitialSnippetVariableValueNode, InitialSnippetVariableValueInputType
from base.models import Variable, VariableType, VariableValue, DocumentVariable, DocumentVariableValue, InitialSnippetVariable, InitialSnippetVariableValue


class VariableValueCreate(Mutation):
    variable_value = Field(VariableValueNode)

    class Arguments:
        input = VariableValueInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        var_value_data = data.get('input')

        var_value, created = VariableValue.objects.get_or_create(**var_value_data)
        serializer = VariableValueSerializer(var_value, data=var_value_data)
        serializer.is_valid(raise_exception=True)
        return VariableValueCreate(variable_value=serializer.save())

class VariableValueUpdate(Mutation):
    variable_value = Field(VariableValueNode)

    class Arguments:
        input = VariableValueInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        var_value_data = data.get('input')
        var_val_id = var_value_data.pop('id')

        var_value_instance = VariableValue.objects.get(pk=var_val_id)
        var_value_instance.name = var_value_data['name']
        var_value_instance.condition = var_value_data['condition']
        var_value_instance.save()

        serializer = VariableValueSerializer(var_value_instance, data=var_value_data)
        serializer.is_valid(raise_exception=True)
        return VariableValueUpdate(variable_value=serializer.save())

class VariableValueDelete(Mutation):
    ok = Boolean()
    variable_value = Field(VariableValueNode)

    class Arguments:
        id = ID(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        data_id = data.get('id')
        var_value_instance = VariableValue.objects.get(pk=data_id)
        var_value_instance.delete()
        return VariableValueDelete(ok=True, variable_value=var_value_instance)

# 1 WAY
class VariableCreate(Mutation):
    # output
    variable = Field(VariableNode)

    # pass in args
    class Arguments:
        input = VariableInputType(required=True)

    # create new variable
    @classmethod
    def mutate(cls, root, info, **data):
        var_data = data.get('input')
        type_data = var_data.pop('type')
        var_value_data = var_data.pop('variable_values')

        # Create variable type
        var_type_obj = VariableType.objects.create(**type_data)
        var_data['type'] = var_type_obj
        # Create variable
        variable_obj, created = Variable.objects.get_or_create(**var_data)
        for item in var_value_data:
            item['variable'] = variable_obj
            # Create variable value
            var_value_obj, created = VariableValue.objects.get_or_create(**item)

        var_data['type'] = var_type_obj.pk
        serializer = VariableSerializer(variable_obj, data=var_data)
        serializer.is_valid(raise_exception=True)
        return VariableCreate(variable=serializer.save())

class VariableUpdate(Mutation):
    #output
    variable = Field(VariableNode)

    #pass in some args
    class Arguments:
        input = VariableInputType(required=True)

    #update variable
    @classmethod
    def mutate(cls, root, info, **data):
        var_data = data.get('input')
        type_data = var_data.pop('type')
        variable_values_data = var_data.pop('variable_values')

        var_instance =  Variable.objects.get(pk=var_data.get('id'))

        type_instance = VariableType.objects.get(pk=var_instance.type_id)
        type_instance.reference = type_data['reference']
        type_instance.scope = type_data['scope']
        type_instance.priority = type_data['priority']
        type_instance.save()

        for var_value in variable_values_data:
            var_value['variable'] = var_instance
            var_value_obj, created = VariableValue.objects.get_or_create(**var_value)

        var_data['type'] = type_instance.pk
        serializer = VariableSerializer(var_instance, data=var_data)
        serializer.is_valid(raise_exception=True)
        return VariableUpdate(variable=serializer.save())

class VariableDelete(Mutation):
    #output
    ok = Boolean()
    id = ID()

    #pass in one args
    class Arguments:
        id = ID(required=True)

    #delete variable
    @classmethod
    def mutate(cls, root, info, **data):
        variable = Variable.objects.get(pk=data.get('id'))
        variable.delete()
        return VariableDelete(ok=True, id=data['id'])


# 2 WAY
class VariableTypeMutation(SerializerMutation):
    class Meta:
        serializer_class = VariableTypeSerializer


#### DOCUMENT VARIABLE
class DocumentVariableCreate(Mutation):
    document_variable = Field(DocumentVariableNode)

    class Arguments:
        input = DocumentVariableInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        all_data = data.get('input')
        document_variable_value_data = all_data.pop('document_variable_values')
        variable_type_data = all_data.get('type')

        variable_type_obj = VariableType.objects.create(reference=variable_type_data['reference'], scope=variable_type_data['scope'], priority=variable_type_data['priority'])

        all_data['type'] = variable_type_obj.pk
        serializer = DocumentVariableSerializer(data=all_data)
        serializer.is_valid(raise_exception=True)
        document_variable = serializer.save()

        for item in document_variable_value_data:
            item['document_variable'] = document_variable
            document_variable_value_obj, created = DocumentVariableValue.objects.get_or_create(**item)

        return DocumentVariableCreate(document_variable=document_variable)


class DocumentVariableUpdate(Mutation):
    document_variable = Field(DocumentVariableNode)

    class Arguments:
        input = DocumentVariableInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        all_data = data.get('input')
        document_variable_value_data = all_data.pop('document_variable_values')
        variable_type_data = all_data.get('type')

        document_variable_instance = DocumentVariable.objects.get(pk=all_data.get('id'))

        variable_type_obj = VariableType.objects.get(pk=variable_type_data.get('id'))
        variable_type_obj.reference = variable_type_data['reference']
        variable_type_obj.scope = variable_type_data['scope']
        variable_type_obj.priority = variable_type_data['priority']
        variable_type_obj.save()

        all_data['type'] = variable_type_obj.pk
        serializer = DocumentVariableSerializer(document_variable_instance, data=all_data)
        serializer.is_valid(raise_exception=True)
        document_variable = serializer.save()

        for var_value in document_variable_value_data:
            var_value['document_variable'] = document_variable
            var_value_obj, created = DocumentVariableValue.objects.get_or_create(**var_value)

        return DocumentVariableUpdate(document_variable=document_variable)

class DocumentVariableDelete(Mutation):
    #output
    ok = Boolean()
    id = ID()

    #pass in one args
    class Arguments:
        id = ID(required=True)

    #delete variable
    @classmethod
    def mutate(cls, root, info, **data):
        variable = DocumentVariable.objects.get(pk=data.get('id'))
        variable.delete()
        return DocumentVariableDelete(ok=True, id=data['id'])


#### INITIAL SNIPPET VARIABLE
class InitialSnippetVariableCreate(Mutation):
    initial_snippet_variable = Field(InitialSnippetVariableNode)

    class Arguments:
        input = InitialSnippetVariableInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        all_data = data.get('input')
        initial_snippet_instance = InitialSnippet.objects.get(pk=all_data.pop('initial_snippet'))

        if len(all_data.get('built_in_variables')) > 0:
            built_in_variables = all_data.pop('built_in_variables')
        else:
            built_in_variables = None

        if len(all_data.get('document_variables')) > 0:
            document_variables = all_data.pop('document_variables')
        else:
            document_variables = None

        if built_in_variables and len(built_in_variables) > 0:
            for item in built_in_variables:
                variable_instance = Variable.objects.get(pk=item['built_in_variable'])

                all_data['name'] = variable_instance.name
                all_data['initial_snippet'] = initial_snippet_instance.pk
                all_data['type'] = variable_instance.type.pk
                all_data['is_template'] = variable_instance.is_template
                all_data['old_idx'] = variable_instance.pk

                serializer = InitialSnippetVariableSerializer(data=all_data)
                serializer.is_valid(raise_exception=True)
                initial_snippet_variable = serializer.save()

                for element in item['values']:
                    variable_value_instance = VariableValue.objects.get(pk=element)
                    initial_snippet_variable_value_obj, created = InitialSnippetVariableValue.objects.get_or_create(
                        name=variable_value_instance.name,
                        condition=variable_value_instance.condition,
                        initial_snippet_variable=initial_snippet_variable,
                        old_idx=variable_value_instance.pk
                    )
                return InitialSnippetVariableCreate(initial_snippet_variable=initial_snippet_variable)


        if document_variables and len(document_variables) > 0:
            for item in document_variables:
                variable_instance = DocumentVariable.objects.get(pk=item['document_variable'])

                all_data['name'] = variable_instance.name
                all_data['initial_snippet'] = initial_snippet_instance.pk
                all_data['type'] = variable_instance.type.pk
                all_data['is_template'] = variable_instance.is_template
                all_data['old_idx'] = variable_instance.pk

                serializer = InitialSnippetVariableSerializer(data=all_data)
                serializer.is_valid(raise_exception=True)
                initial_snippet_variable = serializer.save()

                for element in item['values']:
                    variable_value_instance = DocumentVariableValue.objects.get(pk=element)
                    initial_snippet_variable_value_obj, created = InitialSnippetVariableValue.objects.get_or_create(
                        name=variable_value_instance.name,
                        condition=variable_value_instance.condition,
                        initial_snippet_variable=initial_snippet_variable,
                        old_idx=variable_value_instance.pk
                    )
                return InitialSnippetVariableCreate(initial_snippet_variable=initial_snippet_variable)

class InitialSnippetVariableUpdate(Mutation):
    initial_snippet_variable = Field(InitialSnippetVariableNode)

    class Arguments:
        input = InitialSnippetVariableInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        initial_snippet_variable_data = data.get('input')
        initial_snippet_variable_value_data = initial_snippet_variable_data.pop('initial_snippet_variable_value')

        initial_snippet_variable_instance = InitialSnippetVariable.objects.get(pk=initial_snippet_variable_data['id'])

        initial_snippet_variable_instance.name = initial_snippet_variable_data['name']
        initial_snippet_variable_instance.save()

        for item in initial_snippet_variable_value_data:
            if 'id' in item:
                instance = InitialSnippetVariableValue.objects.get(pk=item['id'])
                instance.name = item['name']
                instance.condition = item['condition']
                instance.save()
            else:
                InitialSnippetVariableValue.objects.create(
                    name=item['name'],
                    condition=item['condition'],
                    initial_snippet_variable=initial_snippet_variable_instance,
                    old_idx=None
                )

        initial_snippet_variable_data['initial_snippet'] = initial_snippet_variable_instance.initial_snippet.pk
        serializer = InitialSnippetVariableSerializer(initial_snippet_variable_instance,data=initial_snippet_variable_data)
        serializer.is_valid(raise_exception=True)

        return InitialSnippetVariableUpdate(initial_snippet_variable=serializer.save())


class InitialSnippetVariableDelete(Mutation):
    ok = Boolean()
    id = ID()
    initial_snippet = Field(InitialSnippetNode)

    class Arguments:
        id = ID(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        initial_snippet_variable = InitialSnippetVariable.objects.get(pk=data.get('id'))
        initial_snippet = initial_snippet_variable.initial_snippet
        initial_snippet_variable.delete()

        return InitialSnippetVariableDelete(ok=True, id=data['id'], initial_snippet=initial_snippet)


# Initial Snippet Variable Value
class InitialSnippetVariableValueUpdate(Mutation):
    initial_snippet_variable_value = Field(InitialSnippetVariableValueNode)

    class Arguments:
        input = InitialSnippetVariableValueInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        variable_value_data = data.get('input')

        initial_snippet_variable_value_instance = InitialSnippetVariableValue.objects.get(pk=variable_value_data['id'])

        serializer = InitialSnippetVariableValueSerializer(initial_snippet_variable_value_instance, data=variable_value_data)
        serializer.is_valid(raise_exception=True)
        return InitialSnippetVariableValueUpdate(initial_snippet_variable_value=serializer.save())

class InitialSnippetVariableValueDelete(Mutation):
    ok = Boolean()
    id = ID()
    initial_snippet_variable_value = Field(InitialSnippetVariableValueNode)

    class Arguments:
        id = ID(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        initial_snippet_variable_value_instance = InitialSnippetVariableValue.objects.get(pk=data.get('id'))
        initial_snippet_variable_value_instance.delete()

        return InitialSnippetVariableValueDelete(ok=True, id=data['id'], initial_snippet_variable_value=initial_snippet_variable_value_instance)