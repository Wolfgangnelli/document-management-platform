import graphene
from base.models import VariableValue, Variable, VariableType, DocumentVariable, DocumentVariableValue, InitialSnippetVariable, InitialSnippetVariableValue, GASnippetVariable, GASnippetVariableValue
from snippet.gql.types import BuiltInVariableIdInputType, DocumentVariableIdInputType
from graphene_django.types import DjangoObjectType
from graphene import relay, InputObjectType, String, ID, Int, Boolean, InputField, List, Connection


# CONNECTION
class MyConnection(Connection):
    class Meta:
        abstract = True

    total_count = Int()

    def resolve_total_count(root, info, **kwargs):
        return root.length

#### VARIABLE TYPES
class VariableTypeNode(DjangoObjectType):
    pk = Int()

    def resolve_id(self, info):
        return self.pk

    class Meta:
        model = VariableType
       #convert_choices_to_enum = False
        interfaces = (relay.Node, )
        fields = '__all__'
        filter_fields = {
            "reference": ("icontains", "exact", ),
            "scope": ("icontains", "exact", ),
            "priority": ("icontains", "exact", ),
        }

class VariableTypeInputType(InputObjectType):
    reference = String()
    scope = String()
    priority = String()
    id= ID()


#### TEMPLATE VARIABLES
class VariableValueNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = VariableValue
        interfaces = (relay.Node, )
        fields = "__all__"

        filter_fields = {
            "id": ("exact",),
            "name": (
                "icontains",
                "iexact",
            ),
            "condition": (
                "icontains",
                "iexact",
            ),
        }

class VariableValueInputType(InputObjectType):
    name = String()
    condition = String()
    id = ID()
    variable = ID()


class VariableNode(DjangoObjectType):
    pk = Int()

    def resolve_id(self, info):
        return self.pk

    class Meta:
        model = Variable
        interfaces = (relay.Node, )
        connection_class = MyConnection
        fields = "__all__"
        filter_fields = {
            "id": ("exact",),
            "name": ("icontains", "exact", ),
        }

class VariableInputType(InputObjectType):
    name = String()
    type = InputField(VariableTypeInputType)
    variable_values = InputField(List(VariableValueInputType))
    id = ID()
    is_template = Boolean()


#### DOCUMENT VARIABLE VALUE
class DocumentVariableValueNode(DjangoObjectType):
    pk = Int()

    def resolve_id(self, info):
        return self.pk

    class Meta:
        model = DocumentVariableValue
        interfaces = (relay.Node, )
        fields = "__all__"
        filter_fields = {
            "id": ("exact", ),
        }

class DocumentVariableValueInputType(InputObjectType):
    name = String()
    condition = String()
    document_variable = ID()
    id = ID()

#### DOCUMENT VARIABLE
class DocumentVariableNode(DjangoObjectType):
    pk = Int()

    def resolve_id(self, info):
        return self.pk

    class Meta:
        model = DocumentVariable
        interfaces = (relay.Node, )
        connection_class = MyConnection
        fields = "__all__"
        filter_fields = {
            "id": ("exact", ),
            "document": ("exact", ),
        }

    #@classmethod
    #def get_connection(cls):
    #    class CountableConnection(graphene.relay.Connection):
    #        total_count = graphene.Int()

    #        @staticmethod
    #        def resolve_total_count(root, args, context, info):
    #            return root.lenght
    #    return CountableConnection



class DocumentVariableInputType(InputObjectType):
    name = String()
    type = InputField(VariableTypeInputType)
    document_variable_values = InputField(List(DocumentVariableValueInputType))
    document = ID()
    id = ID()


#### INITIAL SNIPPET VARIABLE VALUE
class InitialSnippetVariableValueNode(DjangoObjectType):
    pk = Int()

    def resolve_id(self, info):
        return self.pk

    class Meta:
        model = InitialSnippetVariableValue
        interfaces = (relay.Node, )
        fields = '__all__'
        filter_fields = {
            "id": ("exact", ),
        }

class InitialSnippetVariableValueInputType(InputObjectType):
    id = ID()
    name = String()
    condition = String()
    initial_snippet_variable = ID()
    old_idx = ID()


#### INITIAL SNIPPET VARIABLE
class InitialSnippetVariableNode(DjangoObjectType):
    pk = Int()

    def resolve_id(self, info):
        return self.pk

    class Meta:
        model = InitialSnippetVariable
        interfaces = (relay.Node, )
        fields = '__all__'
        filter_fields = {
            "id": ("exact", ),
        }

class InitialSnippetVariableInputType(InputObjectType):
    initial_snippet = ID()
    built_in_variables = InputField(List(BuiltInVariableIdInputType))
    document_variables = InputField(List(DocumentVariableIdInputType))
    id = ID()
    name = String()
    type = ID()
    is_template = Boolean()
    old_idx = Int()
    initial_snippet_variable_value = InputField(List(InitialSnippetVariableValueInputType))


#### GA SNIPPET VARIABLE
class GASnippetVariableNode(DjangoObjectType):
    pk = Int()

    def resolve_id(self, info):
        return self.pk

    class Meta:
        model = GASnippetVariable
        interfaces = (relay.Node,)
        fields = '__all__'

        filter_fields = {
            "id": ("exact", ),
        }


class GASnippetVariableValueNode(DjangoObjectType):
    pk = Int()

    def resolve_id(self, info):
        return self.pk

    class Meta:
        model = GASnippetVariableValue
        interfaces = (relay.Node,)
        fields = '__all__'

        filter_fields = {
            "id": ("exact",),
        }
