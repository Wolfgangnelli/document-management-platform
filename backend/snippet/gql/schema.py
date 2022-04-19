from graphene import ObjectType, Field, List, Schema, relay
from graphene_django.filter import DjangoFilterConnectionField
from snippet.gql.mutations import *
from snippet.gql.types import GASnippetTemplateNode, GASnippetNode, CustomFieldNode, InitialSnippetNode, EventCategoryNode, EventNode, GA4EcommerceSnippetTemplateNode
from snippet.filters import GASnippetTemplateFilter, CustomFieldFilter


class Query(ObjectType):
    ga_snippet_template = relay.Node.Field(GASnippetTemplateNode)
    ga_snippets_template = DjangoFilterConnectionField(GASnippetTemplateNode, filterset_class=GASnippetTemplateFilter)

    ga4_eco_snippet_template = relay.Node.Field(GA4EcommerceSnippetTemplateNode)
    ga4_eco_snippets_template = DjangoFilterConnectionField(GA4EcommerceSnippetTemplateNode)

    ga_snippet = relay.Node.Field(GASnippetNode)
    ga_snippets = DjangoFilterConnectionField(GASnippetNode)

    custom_field = relay.Node.Field(CustomFieldNode)
    custom_fields = DjangoFilterConnectionField(CustomFieldNode, filterset_class=CustomFieldFilter)

    initial_snippet = relay.Node.Field(InitialSnippetNode)
    initial_snippets = DjangoFilterConnectionField(InitialSnippetNode)

    event_category = relay.Node.Field(EventCategoryNode)
    event_categories = DjangoFilterConnectionField(EventCategoryNode)

    event = relay.Node.Field(EventNode)
    events = DjangoFilterConnectionField(EventNode)


class Mutation(ObjectType):
    create_ga_snippet_template = GASnippetTemplateCreate.Field()
    update_ga_snippet_template = GASnippetTemplateUpdate.Field()
    delete_ga_snippet_template = GASnippetTemplateDelete.Field()

    create_ga_snippet = GASnippetCreate.Field()
    update_ga_snippet = GASnippetUpdate.Field()
    #delete_ga_snippet = GASnippetDelete.Field()

    create_eco_snippet_template = EcommerceSnippetTemplateCreate.Field()
    update_eco_snippet_template = EcommerceSnippetTemplateUpdate.Field()
    delete_eco_snippet_template = EcommerceSnippetTemplateDelete.Field()

    create_ga4_eco_snippet_template = EcommerceSnippetTemplateGA4Create.Field()
    update_ga4_eco_snippet_template = EcommerceSnippetTemplateGA4Update.Field()
    delete_ga4_eco_snippet_template = EcommerceSnippetTemplateGA4Delete.Field()

    create_custom_field = CustomFieldCreate.Field()
    update_custom_field = CustomFieldUpdate.Field()
    delete_custom_field = CustomFieldDelete.Field()

    create_initial_snippet = InitialSnippetCreate.Field()
    update_initial_snippet = InitialSnippetUpdate.Field()

    create_event = EventCreate.Field()
    update_event = EventUpdate.Field()
    delete_event = EventDelete.Field()