from snippet.gql.serializers import GASnippetTemplateSerializer, GASnippetSerializer, CustomFieldSerializer, InitialSnippetSerializer, EventSerializer, EcommerceSnippetTemplateSerializer, EcommerceSnippetTemplateGA4Serializer
from graphene import Mutation, Field
from snippet.gql.types import *
from snippet.models import GASnippetTemplate, GASnippet, CustomField, InitialSnippet, Event, EcommerceSnippetTemplate, EcommerceSnippetTemplateGA4
from base.models import InitialSnippetVariable, InitialSnippetVariableValue, Variable, VariableValue, DocumentVariable, DocumentVariableValue, GASnippetVariable, GASnippetVariableValue, EcommerceSnippetVariableTemplate, EcommerceSnippetVariableTemplateValue
from document.models import Datalayer

''' ---------- GA SNIPPET TEMPLATE ------------- '''


class GASnippetTemplateCreate(Mutation):
    snippet_template = Field(GASnippetTemplateNode)

    class Arguments:
        input = GASnippetTemplateInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        snippet_data = data.get('input')
        event_category_data = snippet_data.pop('event_category')
        event_action_data = snippet_data.pop('event_action')
        event_label_data = snippet_data.pop('event_label')

        event_instance = Event.objects.get(pk=snippet_data['event'])
        ga_snippet_template_obj = GASnippetTemplate.objects.create(
            snippet_name=snippet_data['snippet_name'],
            event=event_instance
        )

        snippet_data['event'] = event_instance.pk

        if 'data_variable' in event_category_data.keys() and len(event_category_data['data_variable']) > 0:
            data_variable = event_category_data['data_variable']
            variable_instance = Variable.objects.get(pk=data_variable['variable_pk'])
            snippet_data['event_category_variable'] = variable_instance
            ga_snippet_template_obj.event_category_variable = variable_instance
            ga_snippet_template_obj.save()
        else:
            snippet_data['event_category'] = event_category_data['name']
            ga_snippet_template_obj.event_category = event_category_data['name']
            ga_snippet_template_obj.save()

        if 'data_variable' in event_action_data.keys() and len(event_action_data['data_variable']) > 0:
            data_variable = event_action_data['data_variable']
            variable_instance = Variable.objects.get(pk=data_variable['variable_pk'])
            snippet_data['event_action_variable'] = variable_instance
            ga_snippet_template_obj.event_action_variable = variable_instance
            ga_snippet_template_obj.save()
        else:
            snippet_data['event_action'] = event_action_data['name']
            ga_snippet_template_obj.event_action = event_action_data['name']
            ga_snippet_template_obj.save()

        if 'data_variable' in event_label_data.keys() and len(event_label_data['data_variable']) > 0:
            data_variable = event_label_data['data_variable']
            variable_instance = Variable.objects.get(pk=data_variable['variable_pk'])
            snippet_data['event_label_variable'] = variable_instance
            ga_snippet_template_obj.event_label_variable = variable_instance
            ga_snippet_template_obj.save()
        else:
            snippet_data['event_label'] = event_label_data['name']
            ga_snippet_template_obj.event_label = event_label_data['name']
            ga_snippet_template_obj.save()

        serializer = GASnippetTemplateSerializer(ga_snippet_template_obj, data=snippet_data)
        serializer.is_valid(raise_exception=True)

        return GASnippetTemplateCreate(snippet_template=serializer.save())


class GASnippetTemplateUpdate(Mutation):
    snippet_template = Field(GASnippetTemplateNode)

    class Arguments:
        input = GASnippetTemplateInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        snippet_data = data['input']
        event_category_data = snippet_data.pop('event_category')
        event_action_data = snippet_data.pop('event_action')
        event_label_data = snippet_data.pop('event_label')

        snippet_instance = GASnippetTemplate.objects.get(pk=snippet_data['id'])
        event_instance = Event.objects.get(pk=snippet_data['event'])

        snippet_data['event'] = event_instance.pk

        if 'data_variable' in event_category_data.keys() and len(event_category_data['data_variable']) > 0:
            data_variable = event_category_data['data_variable']
            variable_instance = Variable.objects.get(pk=data_variable['variable_pk'])
            snippet_data['event_category_variable'] = variable_instance
            snippet_instance.event_category_variable = variable_instance
            snippet_instance.save()
        else:
            snippet_data['event_category'] = event_category_data['name']
            snippet_instance.event_category = event_category_data['name']
            snippet_instance.save()

        if 'data_variable' in event_action_data.keys() and len(event_action_data['data_variable']) > 0:
            data_variable = event_action_data['data_variable']
            variable_instance = Variable.objects.get(pk=data_variable['variable_pk'])
            snippet_data['event_action_variable'] = variable_instance
            snippet_instance.event_action_variable = variable_instance
            snippet_instance.save()
        else:
            snippet_data['event_action'] = event_action_data['name']
            snippet_instance.event_action = event_action_data['name']
            snippet_instance.save()

        if 'data_variable' in event_label_data.keys() and len(event_label_data['data_variable']) > 0:
            data_variable = event_label_data['data_variable']
            variable_instance = Variable.objects.get(pk=data_variable['variable_pk'])
            snippet_data['event_label_variable'] = variable_instance
            snippet_instance.event_label_variable = variable_instance
            snippet_instance.save()
        else:
            snippet_data['event_label'] = event_label_data['name']
            snippet_instance.event_label = event_label_data['name']
            snippet_instance.save()

        serializer = GASnippetTemplateSerializer(snippet_instance, data=snippet_data)
        serializer.is_valid(raise_exception=True)
        return GASnippetTemplateUpdate(snippet_template=serializer.save())


class GASnippetTemplateDelete(Mutation):
    ok = Boolean()
    id = ID()
    name = String()

    class Arguments:
        id = ID(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        snippet  = GASnippetTemplate.objects.get(pk=data['id'])
        snippet_name = snippet.snippet_name
        snippet.delete()
        return GASnippetTemplateDelete(ok=True, id=data['id'], name=snippet_name)


''' ----------- GA SNIPPET ----------- '''


class GASnippetCreate(Mutation):
    ga_snippet = Field(GASnippetNode)

    class Arguments:
        input = GASnippetInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        snippet_data = data.get('input')
        custom_field_data = snippet_data.pop('custom_fields')
        event_category_data = snippet_data.pop('event_category')
        event_action_data = snippet_data.pop('event_action')
        event_label_data = snippet_data.pop('event_label')

        serializer = GASnippetSerializer(data=snippet_data)
        serializer.is_valid(raise_exception=True)
        ga_snippet = serializer.save()

        # EVENT CATEGORY
        if event_category_data['type'] == '':
            ga_snippet.event_category = event_category_data['name']
            ga_snippet.save()
        elif event_category_data['type'] == 'template':
            data_variable = event_category_data['data_variable']
            variable_instance = Variable.objects.get(pk=data_variable['variable_pk'])
            ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                name=variable_instance.name,
                is_template=True,
                old_idx=data_variable['variable_pk'],
                ga_snippet=ga_snippet
            )

            ga_snippet.event_category_variable = ga_snippet_variable_obj
            ga_snippet.save()

            for item in data_variable['values']:
                data_value = VariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=ga_snippet_variable_obj
                )
        elif event_category_data['type'] == 'document':
            data_variable = event_category_data['data_variable']
            doc_variable_instance = DocumentVariable.objects.get(pk=data_variable['variable_pk'])
            ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                name=doc_variable_instance.name,
                is_template=False,
                old_idx=data_variable['variable_pk'],
                ga_snippet=ga_snippet
            )

            ga_snippet.event_category_variable = ga_snippet_variable_obj
            ga_snippet.save()

            for item in data_variable.get('values'):
                data_value = DocumentVariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=ga_snippet_variable_obj
                )

        # EVENT ACTION
        if event_action_data['type'] == '':
            ga_snippet.event_action = event_action_data['name']
            ga_snippet.save()
        elif event_action_data['type'] == 'template':
            data_variable = event_action_data['data_variable']
            variable_instance = Variable.objects.get(pk=data_variable['variable_pk'])
            ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                name=variable_instance.name,
                is_template=True,
                old_idx=data_variable['variable_pk'],
                ga_snippet=ga_snippet
            )

            ga_snippet.event_action_variable = ga_snippet_variable_obj
            ga_snippet.save()

            for item in data_variable['values']:
                data_value = VariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=ga_snippet_variable_obj
                )
        elif event_action_data['type'] == 'document':
            data_variable = event_action_data['data_variable']
            doc_variable_instance = DocumentVariable.objects.get(pk=data_variable['variable_pk'])
            ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                name=doc_variable_instance.name,
                is_template=False,
                old_idx=data_variable['variable_pk'],
                ga_snippet=ga_snippet
            )

            ga_snippet.event_action_variable = ga_snippet_variable_obj
            ga_snippet.save()

            for item in data_variable['values']:
                data_value = DocumentVariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=ga_snippet_variable_obj
                )

        # EVENT LABEL
        if event_label_data['type'] == '':
            ga_snippet.event_label = event_label_data['name']
            ga_snippet.save()
        elif event_label_data['type'] == 'template':
            data_variable = event_label_data['data_variable']
            variable_instance = Variable.objects.get(pk=data_variable['variable_pk'])
            ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                name=variable_instance.name,
                is_template=True,
                old_idx=data_variable['variable_pk'],
                ga_snippet=ga_snippet
            )

            ga_snippet.event_label_variable = ga_snippet_variable_obj
            ga_snippet.save()

            for item in data_variable['values']:
                data_value = VariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=ga_snippet_variable_obj
                )
        elif event_label_data['type'] == 'document':
            data_variable = event_label_data['data_variable']
            doc_variable_instance = DocumentVariable.objects.get(pk=data_variable['variable_pk'])
            ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                name=doc_variable_instance.name,
                is_template=False,
                old_idx=data_variable['variable_pk'],
                ga_snippet=ga_snippet
            )

            ga_snippet.event_label_variable = ga_snippet_variable_obj
            ga_snippet.save()

            for item in data_variable['values']:
                data_value = DocumentVariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=ga_snippet_variable_obj
                )

        # CUSTOM FIELD
        if len(custom_field_data) > 0:

            for item in custom_field_data:
                if len(item.value) > 0:

                    CustomField.objects.create(
                        name=item.name,
                        value=item.value,
                        ga_snippet=ga_snippet,
                        is_dimension=item.is_dimension,
                        is_metric=item.is_metric
                    )

                else:
                    value_variable = item['value_variable']
                    data_variable = value_variable['data_variable']

                    is_temp = False if value_variable['type'] == 'document' else True if value_variable['type'] == 'template' else None

                    model_obj = DocumentVariable if is_temp == False else Variable
                    variable_instance = model_obj.objects.get(pk=data_variable['variable_pk'])

                    ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                        name=variable_instance.name,
                        is_template=is_temp,
                        old_idx=data_variable['variable_pk'],
                        ga_snippet=ga_snippet
                    )

                    for element in data_variable['values']:
                        model_obj = DocumentVariableValue if is_temp == False else VariableValue
                        data_value = model_obj.objects.get(pk=element)
                        ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                            name=data_value.name,
                            condition=data_value.condition,
                            ga_snippet_variable=ga_snippet_variable_obj
                        )

                    CustomField.objects.create(
                        name=item.name,
                        value_variable=ga_snippet_variable_obj,
                        ga_snippet=ga_snippet,
                        is_dimension=item.is_dimension,
                        is_metric=item.is_metric
                    )

        return GASnippetCreate(ga_snippet=ga_snippet)


class GASnippetUpdate(Mutation):
    ga_snippet = Field(GASnippetNode)

    class Arguments:
        input = GASnippetInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        snippet_data = data['input']
        event_category_data = snippet_data.pop('event_category')
        event_action_data = snippet_data.pop('event_action')
        event_label_data = snippet_data.pop('event_label')
        custom_field = snippet_data.pop('custom_fields')
        event_instance = Event.objects.get(pk=snippet_data['event'])

        snippet_instance = GASnippet.objects.get(pk=snippet_data['id'])
        snippet_instance.event_id_custom = snippet_data['event_id_custom'];
        snippet_instance.snippet_name = snippet_data['snippet_name'];
        snippet_instance.event = event_instance;
        snippet_instance.save()

        # EVENT CATEGORY
        if event_category_data['type'] == 'text':
            snippet_instance.event_category = event_category_data['name']
            snippet_instance.save()
            snippet_data['event_category'] = event_category_data['name']
            snippet_data['event_category_variable'] = None
        elif event_category_data['type'] == 'template':
            data_variable = event_category_data['data_variable']
            variable_instance = Variable.objects.get(pk=data_variable['variable_pk'])
            ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                name=variable_instance.name,
                is_template=True,
                old_idx=data_variable['variable_pk'],
                ga_snippet=snippet_instance
            )

            snippet_instance.event_category_variable = ga_snippet_variable_obj
            snippet_instance.save()
            snippet_data['event_category_variable'] = ga_snippet_variable_obj.pk
            snippet_data['event_category'] = ''

            for item in data_variable['values']:
                data_value = VariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=ga_snippet_variable_obj
                )
        elif event_category_data['type'] == 'document':
            data_variable = event_category_data['data_variable']
            doc_variable_instance = DocumentVariable.objects.get(pk=data_variable['variable_pk'])
            ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                name=doc_variable_instance.name,
                is_template=False,
                old_idx=data_variable['variable_pk'],
                ga_snippet=snippet_instance
            )

            snippet_instance.event_category_variable = ga_snippet_variable_obj
            snippet_instance.save()
            snippet_data['event_category_variable'] = ga_snippet_variable_obj.pk
            snippet_data['event_category'] = ''

            for item in data_variable.get('values'):
                data_value = DocumentVariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=ga_snippet_variable_obj
                )
        elif event_category_data['type'] == 'snippet':
            data_variable = event_category_data['data_variable']
            snippet_variable_instance = GASnippetVariable.objects.get(pk=data_variable['variable_pk'])

            snippet_instance.event_category_variable = snippet_variable_instance
            snippet_instance.save()
            snippet_data['event_category_variable'] = snippet_variable_instance.pk
            snippet_data['event_category'] = ''

            for item in data_variable.get('values'):
                data_value = GASnippetVariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=snippet_variable_instance
                )

        # EVENT ACTION
        if event_action_data['type'] == 'text':
            snippet_instance.event_action = event_action_data['name']
            snippet_instance.save()
            snippet_data['event_action'] = event_action_data['name']
            snippet_data['event_action_variable'] = None
        elif event_action_data['type'] == 'template':
            data_variable = event_action_data['data_variable']
            variable_instance = Variable.objects.get(pk=data_variable['variable_pk'])
            ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                name=variable_instance.name,
                is_template=True,
                old_idx=data_variable['variable_pk'],
                ga_snippet=snippet_instance
            )

            snippet_instance.event_action_variable = ga_snippet_variable_obj
            snippet_instance.save()
            snippet_data['event_action_variable'] = ga_snippet_variable_obj.pk
            snippet_data['event_action'] = ''

            for item in data_variable['values']:
                data_value = VariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=ga_snippet_variable_obj
                )
        elif event_action_data['type'] == 'document':
            data_variable = event_action_data['data_variable']
            doc_variable_instance = DocumentVariable.objects.get(pk=data_variable['variable_pk'])
            ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                name=doc_variable_instance.name,
                is_template=False,
                old_idx=data_variable['variable_pk'],
                ga_snippet=snippet_instance
            )

            snippet_instance.event_action_variable = ga_snippet_variable_obj
            snippet_instance.save()
            snippet_data['event_action_variable'] = ga_snippet_variable_obj.pk
            snippet_data['event_action'] = ''

            for item in data_variable['values']:
                data_value = DocumentVariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=ga_snippet_variable_obj
                )
        elif event_action_data['type'] == 'snippet':
            data_variable = event_action_data['data_variable']
            snippet_variable_instance = GASnippetVariable.objects.get(pk=data_variable['variable_pk'])

            snippet_instance.event_action_variable = snippet_variable_instance
            snippet_instance.save()
            snippet_data['event_action_variable'] = snippet_variable_instance.pk
            snippet_data['event_action'] = ''

            for item in data_variable.get('values'):
                data_value = GASnippetVariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=snippet_variable_instance
                )

        # EVENT LABEL
        if event_label_data['type'] == 'text':
            snippet_instance.event_label = event_label_data['name']
            snippet_instance.save()
            snippet_data['event_label'] = event_label_data['name']
            snippet_data['event_label_variable'] = None
        elif event_label_data['type'] == 'template':
            data_variable = event_label_data['data_variable']
            variable_instance = Variable.objects.get(pk=data_variable['variable_pk'])
            ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                name=variable_instance.name,
                is_template=True,
                old_idx=data_variable['variable_pk'],
                ga_snippet=snippet_instance
            )

            snippet_instance.event_label_variable = ga_snippet_variable_obj
            snippet_instance.save()
            snippet_data['event_label_variable'] = ga_snippet_variable_obj.pk
            snippet_data['event_label'] = ''

            for item in data_variable['values']:
                data_value = VariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=ga_snippet_variable_obj
                )
        elif event_label_data['type'] == 'document':
            data_variable = event_label_data['data_variable']
            doc_variable_instance = DocumentVariable.objects.get(pk=data_variable['variable_pk'])
            ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                name=doc_variable_instance.name,
                is_template=False,
                old_idx=data_variable['variable_pk'],
                ga_snippet=snippet_instance
            )

            snippet_instance.event_label_variable = ga_snippet_variable_obj
            snippet_instance.save()
            snippet_data['event_label_variable'] = ga_snippet_variable_obj.pk
            snippet_data['event_label'] = ''

            for item in data_variable['values']:
                data_value = DocumentVariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=ga_snippet_variable_obj
                )
        elif event_label_data['type'] == 'snippet':
            data_variable = event_label_data['data_variable']
            snippet_variable_instance = GASnippetVariable.objects.get(pk=data_variable['variable_pk'])

            snippet_instance.event_label_variable = snippet_variable_instance
            snippet_instance.save()
            snippet_data['event_label_variable'] = snippet_variable_instance.pk
            snippet_data['event_label'] = ''

            for item in data_variable.get('values'):
                data_value = GASnippetVariableValue.objects.get(pk=item)
                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                    name=data_value.name,
                    condition=data_value.condition,
                    ga_snippet_variable=snippet_variable_instance
                )

        # CUSTOM FIELD
        if len(custom_field) > 0:
            custom_field_instance = None

            for item in custom_field:
                if 'id' in item and item['id'] is not None:
                    #stiamo aggiornando un custom field oppure non è stata modificata
                    custom_field_instance = CustomField.objects.get(pk=item['id'])

                    if len(item.value) > 0 and custom_field_instance:
                        #se valore inserito è una stringa
                            custom_field_instance.name = item.name
                            custom_field_instance.value = item.value
                            custom_field_instance.value_variable = None
                            custom_field_instance.ga_snippet = snippet_instance
                            custom_field_instance.is_dimension = item.is_dimension
                            custom_field_instance.is_metric = item.is_metric
                            custom_field_instance.save()

                    else:
                        #se valore inserito è una variabile
                        value_variable = item['value_variable']
                        data_variable = value_variable['data_variable']

                        model_obj = DocumentVariable if value_variable['type'] == 'document' else Variable if value_variable['type'] == 'template' else None #CustomField if value_variable['type'] == 'snippet'
                        #se è None vuol dire che la custom dimension non è stata modificata e che value_variable['type'] == 'snippet'
                        if model_obj is not None:
                            #la custom dim è stata modificata
                            is_temp = True if value_variable['type'] == 'template' else False
                            variable_instance = model_obj.objects.get(pk=data_variable['variable_pk'])

                            ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                                name=variable_instance.name,
                                is_template=is_temp,
                                old_idx=data_variable['variable_pk'],
                                ga_snippet=snippet_instance
                            )

                            for element in data_variable['values']:
                                model_obj = DocumentVariableValue if is_temp == False else VariableValue
                                data_value = model_obj.objects.get(pk=element)
                                ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                                    name=data_value.name,
                                    condition=data_value.condition,
                                    ga_snippet_variable=ga_snippet_variable_obj
                                )

                            if custom_field_instance:
                                custom_field_instance.name = item.name
                                custom_field_instance.value_variable = ga_snippet_variable_obj
                                custom_field_instance.value = ''
                                custom_field_instance.ga_snippet = snippet_instance
                                custom_field_instance.is_dimension = item.is_dimension
                                custom_field_instance.is_metric = item.is_metric
                                custom_field_instance.save()

                else:
                    #stiamo creando un nuovo custom field
                    if len(item.value) > 0:
                        #se valore inserito è una stringa
                        CustomField.objects.create(
                            name=item.name,
                            value=item.value,
                            ga_snippet=snippet_instance,
                            is_dimension=item.is_dimension,
                            is_metric=item.is_metric
                        )
                    else:
                        # se valore inserito è una variabile
                        value_variable = item['value_variable']
                        data_variable = value_variable['data_variable']

                        model_obj = DocumentVariable if value_variable['type'] == 'document' else Variable if value_variable['type'] == 'template' else None

                        is_temp = True if value_variable['type'] == 'template' else False
                        variable_instance = model_obj.objects.get(pk=data_variable['variable_pk'])

                        ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                            name=variable_instance.name,
                            is_template=is_temp,
                            old_idx=data_variable['variable_pk'],
                            ga_snippet=snippet_instance
                        )

                        for element in data_variable['values']:
                            model_obj = DocumentVariableValue if is_temp == False else VariableValue
                            data_value = model_obj.objects.get(pk=element)
                            ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                                name=data_value.name,
                                condition=data_value.condition,
                                ga_snippet_variable=ga_snippet_variable_obj
                            )

                        CustomField.objects.create(
                            name=item.name,
                            value_variable=ga_snippet_variable_obj,
                            ga_snippet=snippet_instance,
                            is_dimension=item.is_dimension,
                            is_metric=item.is_metric
                        )

        serializer = GASnippetSerializer(snippet_instance, data=snippet_data)
        serializer.is_valid(raise_exception=True)
        return GASnippetUpdate(ga_snippet=serializer.save())


class GASnippetDelete(Mutation):
    ok = Boolean()

    class Arguments:
        id = ID(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        snippet = GASnippet.objects.get(pk=data['id'])
        snippet.delete()
        return GASnippetDelete(ok=True)


''' -------------- GA4 ECOMMERCE SNIPPET TEMPLATE ---------------- '''


def process_field(key, val, obj_instance):
    print(f'line 694: {key}, {val}')
    field = val['field']
    if val['type'] == 'text':
        obj_instance[field] = val['name']
        obj_instance.save()
    elif val['type'] == 'template':
        data_variable = val['data_variable']
        variable_instance = Variable.objects.get(pk=data_variable['variable_pk'])
        eco_var_temp_obj = EcommerceSnippetVariableTemplate.objects.create(
            name=variable_instance.name,
            old_idx=variable_instance.pk,
            eco_snippet_ga4_template=obj_instance
        )
        field_var = f'{field}_variable'
        obj_instance[field_var] = eco_var_temp_obj
        obj_instance.save()

        values = data_variable['values']
        for value in values:
            var_val = VariableValue.objects.get(pk=value)
            EcommerceSnippetVariableTemplateValue.objects.create(
                name=var_val.name,
                condition=var_val.condition,
                eco_snippet_variable_template=eco_var_temp_obj
            )


class EcommerceSnippetTemplateGA4Create(Mutation):
    ga4_ecommerce_snippet_template = Field(GA4EcommerceSnippetTemplateNode)

    class Arguments:
        input = GA4EcommerceSnippetTemplateInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        ga4_eco_snippet_data = data.pop('input')
        event_id = ga4_eco_snippet_data.pop('event')
        snippet_name = ga4_eco_snippet_data.pop('snippet_name')

        item_name = ga4_eco_snippet_data.get('item_name')
        item_id = ga4_eco_snippet_data.get('item_id')
        price = ga4_eco_snippet_data.get('price')
        item_brand = ga4_eco_snippet_data.get('item_brand')
        item_category = ga4_eco_snippet_data.get('item_category')
        item_category2 = ga4_eco_snippet_data.get('item_category2')
        item_category3 = ga4_eco_snippet_data.get('item_category3')
        item_category = ga4_eco_snippet_data.get('item_category4')
        item_variant = ga4_eco_snippet_data.get('item_variant')
        item_list_name = ga4_eco_snippet_data.get('item_list_name')
        item_list_id = ga4_eco_snippet_data.get('item_list_id')
        index = ga4_eco_snippet_data.get('index')
        quantity = ga4_eco_snippet_data.get('quantity')
        promotion_id = ga4_eco_snippet_data.get('promotion_id')
        promotion_name = ga4_eco_snippet_data.get('promotion_name')
        creative_name =  ga4_eco_snippet_data.get('creative_name')
        creative_slot = ga4_eco_snippet_data.get('creative_slot')
        location_id = ga4_eco_snippet_data.get('location_id')
        affiliation = ga4_eco_snippet_data.get('affiliation')
        coupon = ga4_eco_snippet_data.get('coupon')
        currency = ga4_eco_snippet_data.get('currency')
        discount = ga4_eco_snippet_data.get('discount')
        payment_type = ga4_eco_snippet_data.get('payment_type')
        shipping_tier = ga4_eco_snippet_data.get('shipping_tier')
        transaction_id = ga4_eco_snippet_data.get('transaction_id')
        value = ga4_eco_snippet_data.get('value')
        tax = ga4_eco_snippet_data.get('tax')
        shipping = ga4_eco_snippet_data.get('shipping')

        data['snippet_name'] = snippet_name
        data['event'] = event_id

        serializer = EcommerceSnippetTemplateGA4Serializer(data=data)
        serializer.is_valid(raise_exception=True)
        eco_snippet_temp_ga4 = serializer.save()

        # ITEM NAME
        if item_name['type'] == 'text':
            eco_snippet_temp_ga4.item_name = item_name['name']
            eco_snippet_temp_ga4.save()
        elif item_name['type'] == 'template':
            data_var = item_name['data_variable']
            variable_instance = Variable.objects.get(pk=data_var['variable_pk'])
            eco_var_temp_obj = EcommerceSnippetVariableTemplate.objects.create(
                name=variable_instance.name,
                old_idx=variable_instance.pk,
                eco_snippet_ga4_template=eco_snippet_temp_ga4
            )
            eco_snippet_temp_ga4.item_name_variable = eco_var_temp_obj
            eco_snippet_temp_ga4.save()

            var_values = data_var['values']
            for val in var_values:
                var_val = VariableValue.objects.get(pk=val)
                EcommerceSnippetVariableTemplateValue.objects.create(
                    name=var_val.name,
                    condition=var_val.condition,
                    eco_snippet_variable_template=eco_var_temp_obj
                )

        # PRICE
        if price['type'] == 'text':
            eco_snippet_temp_ga4.price = price['name']
            eco_snippet_temp_ga4.save()
        elif price['type'] == 'template':
            data_var = price['data_variable']
            variable_instance = Variable.objects.get(pk=data_var['variable_pk'])
            eco_var_temp_obj = EcommerceSnippetVariableTemplate.objects.create(
                name=variable_instance.name,
                old_idx=variable_instance.pk,
                eco_snippet_ga4_template=eco_snippet_temp_ga4
            )
            eco_snippet_temp_ga4.price_variable = eco_var_temp_obj
            eco_snippet_temp_ga4.save()

            var_values = data_var['values']
            for val in var_values:
                var_val = VariableValue.objects.get(pk=val)
                EcommerceSnippetVariableTemplateValue.objects.create(
                    name=var_val.name,
                    condition=var_val.condition,
                    eco_snippet_variable_template=eco_var_temp_obj
                )

        # for key, val in ga4_eco_snippet_data.items():
        #     process_field(key, val, eco_snippet_temp_ga4)

        return EcommerceSnippetTemplateGA4Create(ga4_ecommerce_snippet_template=eco_snippet_temp_ga4)


class EcommerceSnippetTemplateGA4Update(Mutation):
    ga4_ecommerce_snippet_template = Field(GA4EcommerceSnippetTemplateNode)

    class Arguments:
        input = GA4EcommerceSnippetTemplateInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        ga4_eco_snippet_data = data.get('input')

        ga4_eco_snippet_id = ga4_eco_snippet_data.get('id')
        ga4_eco_snippet_instance = EcommerceSnippetTemplateGA4.objects.get(pk=ga4_eco_snippet_id)

        if ga4_eco_snippet_instance:
            serializer = EcommerceSnippetTemplateGA4Serializer(ga4_eco_snippet_instance, data=ga4_eco_snippet_data)
            serializer.is_valid(raise_exception=True)
            return EcommerceSnippetTemplateGA4Update(ga4_ecommerce_snippet_template=serializer.save())
        else:
            raise Exception(f"Sorry, ecommerce snippet with ID {ga4_eco_snippet_id} does not exist")


class EcommerceSnippetTemplateGA4Delete(Mutation):
    ok = Boolean()
    id = ID()

    class Arguments:
        id = ID(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        snippet = EcommerceSnippetTemplateGA4.objects.get(pk=data.get('id'))
        snippet.delete()
        return EcommerceSnippetTemplateGA4Delete(ok=True, id=int(data['id']))


''' -------------- ECOMMERCE SNIPPET TEMPLATE ---------------- '''


class EcommerceSnippetTemplateCreate(Mutation):
    ecommerce_snippet_template = Field(EcommerceSnippetTemplateNode)

    class Arguments:
        input = EcommerceSnippetTemplateInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        eco_snippet_data = data.get('input')

        serializer = EcommerceSnippetTemplateSerializer(data=eco_snippet_data)
        serializer.is_valid(raise_exception=True)
        return EcommerceSnippetTemplateCreate(ecommerce_snippet_template=serializer.save())


class EcommerceSnippetTemplateUpdate(Mutation):
    ecommerce_snippet_template = Field(EcommerceSnippetTemplateNode)

    class Arguments:
        input = EcommerceSnippetTemplateInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        eco_snippet_data = data.get('input')

        eco_snippet_id = eco_snippet_data.get('eco_snippet_id')
        eco_snippet_instance = EcommerceSnippetTemplate.objects.get(pk=eco_snippet_id)

        if eco_snippet_instance:
            serializer = EcommerceSnippetTemplateSerializer(eco_snippet_instance, data=eco_snippet_data)
            serializer.is_valid(raise_exception=True)
            return EcommerceSnippetTemplateUpdate(ecommerce_snippet_template=serializer.save())
        else:
            raise Exception(f"Sorry, ecommerce snippet with ID {eco_snippet_id} does not exist")


class EcommerceSnippetTemplateDelete(Mutation):
    ok = Boolean()

    class Arguments:
        id = ID(required=True)

    def mutate(self, root, info, **data):
        snippet = EcommerceSnippetTemplate.objects.get(pk=data.get('id'))
        snippet.delete()
        return EcommerceSnippetTemplateDelete(ok=True)


''' -------------- ECOMMERCE SNIPPET --------------- '''




''' ----------- CUSTOM FIELD ----------- '''


class CustomFieldCreate(Mutation):
    custom_field = Field(CustomFieldNode)

    class Arguments:
        input = CustomFieldInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        custom_field_data = data.get('input')

        serializer = CustomFieldSerializer(data=custom_field_data)
        serializer.is_valid(raise_exception=True)
        return CustomFieldCreate(custom_field=serializer.save())


class CustomFieldUpdate(Mutation):
    custom_field = Field(CustomFieldNode)

    class Arguments:
        input = CustomFieldInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        custom_field_data = data.get('input')

        custom_field_instance = CustomField.objects.get(pk=custom_field_data['id'])
        serializer = CustomFieldSerializer(custom_field_instance, data=custom_field_data)
        serializer.is_valid(raise_exception=True)
        return CustomFieldUpdate(custom_field=serializer.save())


class CustomFieldDelete(Mutation):
    ok = Boolean()
    custom_field = Field(CustomFieldNode)

    class Arguments:
        id = ID(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        custom_field = CustomField.objects.get(pk=data.get('id'))
        custom_field.delete()
        return CustomFieldDelete(ok=True, custom_field=custom_field)


''' ------------ INITIAL SNIPPET ----------- '''


class InitialSnippetCreate(Mutation):
    initial_snippet = Field(InitialSnippetNode)

    class Arguments:
        input = InitialSnippetInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        initial_snippet_data = data.get('input')

        datalayer_instance = Datalayer.objects.get(pk=initial_snippet_data.pop('datalayer'))
        built_in_variables = initial_snippet_data.get('built_in_variables')
        event_instance = Event.objects.get(pk=initial_snippet_data.get('event'))
        document_variables = initial_snippet_data.get('document_variables')

        initial_snippet_data['event'] = event_instance.pk
        serializer = InitialSnippetSerializer(data=initial_snippet_data)
        serializer.is_valid(raise_exception=True)
        initial_snippet = serializer.save()

        datalayer_instance.initial_snippet = initial_snippet
        datalayer_instance.save()

        for item in built_in_variables:
            variable_instance = Variable.objects.get(pk=item['built_in_variable'])
            initial_snippet_variable_obj = InitialSnippetVariable.objects.create(
                name=variable_instance.name,
                initial_snippet=initial_snippet,
                type=variable_instance.type,
                is_template=variable_instance.is_template,
                old_idx=variable_instance.pk
            )
            for element in item['values']:
                variable_value_instance = VariableValue.objects.get(pk=element)
                initial_snippet_variable_value_obj = InitialSnippetVariableValue.objects.create(
                    name=variable_value_instance.name,
                    condition=variable_value_instance.condition,
                    initial_snippet_variable=initial_snippet_variable_obj,
                    old_idx=variable_value_instance.pk
                )

        for item in document_variables:
            variable_instance = DocumentVariable.objects.get(pk=item['document_variable'])
            initial_snippet_variable_obj = InitialSnippetVariable.objects.create(
                name=variable_instance.name,
                initial_snippet=initial_snippet,
                type=variable_instance.type,
                is_template=variable_instance.is_template,
                old_idx=variable_instance.pk
            )

            for element in item['values']:
                variable_value_instance = DocumentVariableValue.objects.get(pk=element)
                initial_snippet_variable_value_obj = InitialSnippetVariableValue.objects.create(
                    name=variable_value_instance.name,
                    condition=variable_value_instance.condition,
                    initial_snippet_variable=initial_snippet_variable_obj,
                    old_idx=variable_value_instance.pk
                )

        return InitialSnippetCreate(initial_snippet=initial_snippet)


class InitialSnippetUpdate(Mutation):
    initial_snippet = Field(InitialSnippetNode)

    class Arguments:
        input = InitialSnippetInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        initial_snippet_data = data.get('input')

        initial_snippet_instance = InitialSnippet.objects.get(pk=initial_snippet_data.pop('id'))

        built_in_variables = initial_snippet_data.get('built_in_variables')
        event_instance = Event.objects.get(pk=initial_snippet_data.get('event'))
        document_variables = initial_snippet_data.get('document_variables')

        initial_snippet_data['event'] = event_instance.pk
        serializer = InitialSnippetSerializer(initial_snippet_instance, data=initial_snippet_data)
        serializer.is_valid(raise_exception=True)
        initial_snippet = serializer.save()

        if len(built_in_variables) > 0:
            for item in built_in_variables:
                variable_instance = Variable.objects.get(pk=item['built_in_variable'])
                initial_snippet_variable_obj, created = InitialSnippetVariable.objects.get_or_create(
                    name=variable_instance.name,
                    initial_snippet=initial_snippet,
                    type=variable_instance.type,
                    is_template=variable_instance.is_template,
                    old_idx=variable_instance.pk
                )
                for element in item['values']:
                    variable_value_instance = VariableValue.objects.get(pk=element)
                    initial_snippet_variable_value_obj, created = InitialSnippetVariableValue.objects.get_or_create(
                        name=variable_value_instance.name,
                        condition=variable_value_instance.condition,
                        initial_snippet_variable=initial_snippet_variable_obj,
                        old_idx=variable_value_instance.pk
                    )

        if len(document_variables) > 0:
            for item in document_variables:
                variable_instance = DocumentVariable.objects.get(pk=item['document_variable'])
                initial_snippet_variable_obj, created = InitialSnippetVariable.objects.get_or_create(
                    name=variable_instance.name,
                    initial_snippet=initial_snippet,
                    type=variable_instance.type,
                    is_template=variable_instance.is_template,
                    old_idx=variable_instance.pk
                )

                for element in item['values']:
                    variable_value_instance = DocumentVariableValue.objects.get(pk=element)
                    initial_snippet_variable_value_obj, created = InitialSnippetVariableValue.objects.get_or_create(
                        name=variable_value_instance.name,
                        condition=variable_value_instance.condition,
                        initial_snippet_variable=initial_snippet_variable_obj,
                        old_idx=variable_value_instance.pk
                    )

        return InitialSnippetUpdate(initial_snippet=initial_snippet)


''' ------------- EVENT --------------- '''


class EventCreate(Mutation):
    event = Field(EventNode)

    class Arguments:
        input = EventInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        event_data = data.get('input')

        serializer = EventSerializer(data=event_data)
        serializer.is_valid(raise_exception=True)
        return EventCreate(event=serializer.save())


class EventUpdate(Mutation):
    event = Field(EventNode)

    class Arguments:
        input = EventInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        event_data = data['input']

        event_instance = Event.objects.get(pk=event_data['id'])
        serializer = EventSerializer(event_instance, data=event_data)
        serializer.is_valid(raise_exception=True)
        return EventUpdate(event=serializer.save())


class EventDelete(Mutation):
    ok = Boolean()
    id = ID()

    class Arguments:
        id = ID(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        event = Event.objects.get(pk=data['id'])
        event.delete()
        return EventDelete(ok=True, id=data['id'])
