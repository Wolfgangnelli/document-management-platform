from graphene_django import DjangoObjectType
from graphene import String, relay, Int, InputObjectType, ID, Boolean, List, Float, InputField, Connection, JSONString
from snippet.models import GASnippetTemplate, GASnippet, CustomField, InitialSnippet, EventCategory, Event, EcommerceSnippet, EcommerceSnippetTemplate, EcommerceSnippetTemplateGA4, EcommerceSnippetGA4


# CONNECTION


class MyConnection(Connection):
    class Meta:
        abstract = True

    total_count = Int()

    def resolve_total_count(self, info, **kwargs):
        return self.length


class VariableInfoInputType(InputObjectType):
    variable_pk = ID()
    values = InputField(List(ID))


class EventVariableObjInputType(InputObjectType):
    name = String()
    data_variable = InputField(VariableInfoInputType)
    type = String()


class VariableObjInputType(InputObjectType):
    name = String()
    data_variable = InputField(VariableInfoInputType)
    type = String()
    field = String()


''' ------------ CUSTOM FIELD ----------------- '''


class CustomFieldNode(DjangoObjectType):
    pk = Int()
    value = String()

    def resolve_pk(self, info):
        return self.pk

    def resolve_value(self, info):
        if self.value and len(self.value) > 0:
            result = self.value
        else:
            result = f'$$${self.value_variable.name}$$$'

        return result

    class Meta:
        model = CustomField
        interfaces = (relay.Node, )
        fields = '__all__'
        filter_fields = {
            'id': ('exact', ),
            'name': ('iexact', 'icontains', )
        }


class CustomFieldInputType(InputObjectType):
    name = String()
    value = String()
    value_variable = InputField(EventVariableObjInputType)
    is_dimension = Boolean()
    is_metric = Boolean()
    eco_snippet = ID()
    ga_snippet = ID()
    initial_snippet = ID()
    id = ID()


''' ---------- GA SNIPPET TEMPLATE ------------- '''


class GASnippetTemplateNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = GASnippetTemplate
        interfaces = (relay.Node, )
        connection_class = MyConnection
        fields = '__all__'

        filter_fields = {
            "id": ("exact",),
        }


class GASnippetTemplateInputType(InputObjectType):
    # customizing input type
    event_category = InputField(EventVariableObjInputType)
    event_action = InputField(EventVariableObjInputType)
    event_label = InputField(EventVariableObjInputType)
    id = ID()
    event = ID()
    snippet_name = String()


''' ----------- GA SNIPPET ----------- '''


class GASnippetNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = GASnippet
        interfaces = (relay.Node, )
        connection_class = MyConnection
        fields = '__all__'

        filter_fields = {
            "id": ("exact", ),
            "datalayer": ("exact", ),
        }


class GASnippetInputType(InputObjectType):
    event_id_custom = String()
    event_category = InputField(EventVariableObjInputType) #String()
    event_action = InputField(EventVariableObjInputType) #String()
    event_label = InputField(EventVariableObjInputType) #String()
    snippet_name = String()
    datalayer = ID()
    event = ID()
    id = ID()
    ga_snippet_template_id = ID()
    custom_fields = InputField(List(CustomFieldInputType))


''' ------------ ECO SNIPPET ------------------ '''


class EcommerceSnippetNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = EcommerceSnippet
        interfaces = (relay.Node, )
        fields = '__all__'

        filter_fields = {
            "id": ("exact", ),
        }


class EcommerceSnippetInputType(InputObjectType):
    name = String()
    currency_code = String()
    item_id = String()
    price = String()
    brand = String()
    category = String()
    variant = String()
    list = String()
    position = String()
    quantity = String()
    creative = String()
    affiliation = String()
    revenue = String()
    tax = String()
    shipping = String()
    coupon = String()
    event = ID()
    ecommerce_snippet_template_id = ID()
    custom_fields = InputField(List(CustomFieldInputType))
    id = ID()
    snippet_name = String()


''' ------------ ECO SNIPPET TEMPLATE --------- '''


class EcommerceSnippetTemplateNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = EcommerceSnippetTemplate
        interfaces = (relay.Node, )
        fields = '__all__'

        filter_fields = {
            "id": ("exact", ),
        }


class EcommerceSnippetTemplateInputType(InputObjectType):
    name = String()
    currency_code = String()
    item_id = String()
    price = String()
    brand = String()
    category = String()
    variant = String()
    list = String()
    position = String()
    quantity = String()
    creative = String()
    affiliation = String()
    revenue = String()
    tax = String()
    shipping = String()
    coupon = String()
    event = ID()
    eco_snippet_id = ID()


''' --------- GA4 ECO SNIPPET TEMPLATE -------------'''

class GA4EcommerceSnippetTemplateNode(DjangoObjectType):
    pk = Int()
    # item_name = JSONString()

    def resolve_pk(self, info):
        return self.pk

    # def resolve_item_name(self, info):
    #     if self.item_name and len(self.item_name) > 0:
    #         result = {'name': self.item_name}
    #     elif self.item_name_variable:
    #         result = {'variable': self.item_name_variable}
    #
    #     return result

    class Meta:
        model = EcommerceSnippetTemplateGA4
        interfaces = (relay.Node, )
        fields = '__all__'
        filter_fields = {
            "id": ("exact", ),
        }


class GA4EcommerceSnippetTemplateInputType(InputObjectType):
    item_name = InputField(VariableObjInputType)
    item_id = InputField(VariableObjInputType)
    price = InputField(VariableObjInputType)
    item_brand = InputField(VariableObjInputType)
    item_category = InputField(VariableObjInputType)
    item_category2 = InputField(VariableObjInputType)
    item_category3 = InputField(VariableObjInputType)
    item_category4 = InputField(VariableObjInputType)
    item_variant = InputField(VariableObjInputType)
    item_list_name = InputField(VariableObjInputType)
    item_list_id = InputField(VariableObjInputType)
    index = InputField(VariableObjInputType)
    quantity = InputField(VariableObjInputType)
    promotion_id = InputField(VariableObjInputType)
    promotion_name = InputField(VariableObjInputType)
    creative_name = InputField(VariableObjInputType)
    creative_slot = InputField(VariableObjInputType)
    location_id = InputField(VariableObjInputType)
    affiliation = InputField(VariableObjInputType)
    coupon = InputField(VariableObjInputType)
    currency = InputField(VariableObjInputType)
    discount = InputField(VariableObjInputType)
    payment_type = InputField(VariableObjInputType)
    shipping_tier = InputField(VariableObjInputType)
    transaction_id = InputField(VariableObjInputType)
    value = InputField(VariableObjInputType)
    tax = InputField(VariableObjInputType)
    shipping = InputField(VariableObjInputType)
    event = ID()
    snippet_name = String()
    id = ID()


''' --------------- GA4 ECO SNIPPET ------------ '''


class GA4EcommerceSnippetNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = EcommerceSnippetGA4
        interfaces = (relay.Node, )
        fields = '__all__'

        filter_fields = {
            "id": ("exact", ),
        }


class GA4EcommerceSnippetInputType(InputObjectType):
    item_name = InputField(VariableObjInputType)
    item_id = InputField(VariableObjInputType)
    price = InputField(VariableObjInputType)
    item_brand = InputField(VariableObjInputType)
    item_category = InputField(VariableObjInputType)
    item_category2 = InputField(VariableObjInputType)
    item_category3 = InputField(VariableObjInputType)
    item_category4 = InputField(VariableObjInputType)
    item_variant = InputField(VariableObjInputType)
    item_list_name = InputField(VariableObjInputType)
    item_list_id = InputField(VariableObjInputType)
    index = InputField(VariableObjInputType)
    quantity = InputField(VariableObjInputType)
    promotion_id = InputField(VariableObjInputType)
    promotion_name = InputField(VariableObjInputType)
    creative_name = InputField(VariableObjInputType)
    creative_slot = InputField(VariableObjInputType)
    location_id = InputField(VariableObjInputType)
    affiliation = InputField(VariableObjInputType)
    coupon = InputField(VariableObjInputType)
    currency = InputField(VariableObjInputType)
    discount = InputField(VariableObjInputType)
    payment_type = InputField(VariableObjInputType)
    shipping_tier = InputField(VariableObjInputType)
    transaction_id = InputField(VariableObjInputType)
    value = InputField(VariableObjInputType)
    tax = InputField(VariableObjInputType)
    shipping = InputField(VariableObjInputType)
    event = ID()
    snippet_name = String()
    id = ID()


''' ---------- INITIAL SNIPPET ----------- '''


class InitialSnippetNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = InitialSnippet
        interfaces = (relay.Node, )
        fields = '__all__'

        filter_fields = {
            'id': ('exact', )
        }


class BuiltInVariableIdInputType(InputObjectType):
    built_in_variable = ID()
    values = InputField(List(ID))


class DocumentVariableIdInputType(InputObjectType):
    document_variable = ID()
    values = InputField(List(ID))


class InitialSnippetInputType(InputObjectType):
    event = ID()
    datalayer = ID()
    built_in_variables = InputField(List(BuiltInVariableIdInputType))
    document_variables = InputField(List(DocumentVariableIdInputType))
    id = ID()


''' ----------- EVENT CATEGORY -------------- '''


class EventCategoryNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = EventCategory
        convert_choices_to_enum = False
        interfaces = (relay.Node, )
        fields = '__all__'
        filter_fields = {
            'name': ('iexact', 'icontains', )
        }


''' ------------- EVENT ---------------- '''


class EventNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = Event
        interfaces = (relay.Node, )
        fields = '__all__'
        filter_fields = {
            'category': ('exact', ),
            'name': ('iexact', 'icontains', )
        }


class EventInputType(InputObjectType):
    name = String()
    category = ID()
    id = ID()
