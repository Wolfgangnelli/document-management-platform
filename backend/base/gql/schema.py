# -*- coding: utf-8 -*-
import graphene
from base.models import DocumentVariable, Variable

from .mutations import VariableValueUpdate, VariableCreate, VariableUpdate, VariableValueCreate, VariableDelete, \
    VariableTypeMutation, DocumentVariableCreate, DocumentVariableUpdate, DocumentVariableDelete, \
    InitialSnippetVariableCreate, InitialSnippetVariableDelete, VariableValueDelete, InitialSnippetVariableValueUpdate, \
    InitialSnippetVariableUpdate, InitialSnippetVariableValueDelete
from graphene import relay, ObjectType
from graphene_django.filter import DjangoFilterConnectionField
#from graphene_django_pagination import DjangoPaginationConnectionField
from .types import VariableValueNode, VariableNode, VariableTypeNode, DocumentVariableValueNode, DocumentVariableNode, InitialSnippetVariableNode
from ..filters import VariableValueFilter, VariableFilter, VariableTypeFilter
#from graphene_django.fields import DjangoConnectionField


class Query(ObjectType):
    variable_value = relay.Node.Field(VariableValueNode)
    variable_values = DjangoFilterConnectionField(VariableValueNode, filterset_class=VariableValueFilter)

    variable = relay.Node.Field(VariableNode)
    #variables = DjangoFilterConnectionField(VariableNode, filterset_class=VariableFilter, page=graphene.Int())
    variables = DjangoFilterConnectionField(VariableNode, filterset_class=VariableFilter)

    variable_types = DjangoFilterConnectionField(VariableTypeNode, filterset_class=VariableTypeFilter)

    document_variable = relay.Node.Field(DocumentVariableNode)
    document_variables = DjangoFilterConnectionField(DocumentVariableNode)

    document_variable_value = relay.Node.Field(DocumentVariableValueNode)
    document_variable_values = DjangoFilterConnectionField(DocumentVariableValueNode)

    initial_snippet_variable = relay.Node.Field(InitialSnippetVariableNode)
    initial_snippet_variables = DjangoFilterConnectionField(InitialSnippetVariableNode)


class Mutation(ObjectType):
    create_variable_value = VariableValueCreate.Field()
    update_variable_value = VariableValueUpdate.Field()
    delete_variable_value = VariableValueDelete.Field()

    create_variable = VariableCreate.Field()
    update_variable = VariableUpdate.Field()
    delete_variable = VariableDelete.Field()

    var_type_mutation = VariableTypeMutation.Field()

    create_document_variable = DocumentVariableCreate.Field()
    update_document_variable = DocumentVariableUpdate.Field()
    delete_document_variable = DocumentVariableDelete.Field()

    create_initial_snippet_variable = InitialSnippetVariableCreate.Field()
    update_initial_snippet_variable = InitialSnippetVariableUpdate.Field()
    delete_initial_snippet_variable = InitialSnippetVariableDelete.Field()

    update_initial_snippet_variable_value = InitialSnippetVariableValueUpdate.Field()
    delete_initial_snippet_variable_value = InitialSnippetVariableValueDelete.Field()
