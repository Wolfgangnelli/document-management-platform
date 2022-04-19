from graphene_django import DjangoObjectType
from document.models import Section, Image, Document, Customer, Datalayer, Container, Chapter, SubChapter, SectionTemplate, Category
from graphene import relay, String, Int, InputObjectType, ID, List, InputField, Enum
from snippet.gql.types import EcommerceSnippetInputType, GASnippetInputType
from graphene_file_upload.scalars import Upload


''' ------------ SECTION ----------- '''
class SectionNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = Section
        interfaces = (relay.Node, )
        fields = '__all__'

        filter_fields = {
            'id': ('exact', ),
            'title': ('iexact', 'icontains', ),
            'sub_chapter': ('exact', )
        }

class SectionInputType(InputObjectType):
    title = String()
    action = String()
    note = String()
    priority = String()
    category = String()
    eco_snippet_id = ID()
    ga_snippet_id = ID()
    eco_snippet_template = ID(required=False)
    ga_snippet_template = ID(required=False)
    eco_snippet = InputField(EcommerceSnippetInputType)
    ga_snippet = InputField(GASnippetInputType)
    id = ID()
    datalayer= ID()
    sub_chapter = ID()
    page_link = String()
    image_pk = ID()


''' -------------- SECTION TEMPLATE ------------- '''
class SectionTemplateNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = SectionTemplate
        interfaces = (relay.Node, )
        fields = '__all__'

        filter_fields = {
            'id': ('exact', ),
            'title': ('icontains', ),
        }

class SectionTemplateInputType(InputObjectType):
    title = String()
    action = String()
    note = String()
    priority = String()
    category = String()
    eco_snippet_template = ID()
    ga4_eco_snippet_template = ID()
    ga_snippet_template = ID()
    id = ID()


''' -------------- IMAGE -------------- '''
class ImageNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = Image
        interfaces = (relay.Node, )
        fields = '__all__'

        filter_fields = {
            'id': ('exact', ),
            'section_id': ('exact', )
        }

''' ----------- CATEGORY ---------------'''

class CategoryNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = Category
        interfaces = (relay.Node, )
        fields = '__all__'
        filter_fields = {
            'id': ('exact', ),
        }

''' ------------- CUSTOMER ---------------- '''
class CustomerNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = Customer
        interfaces = (relay.Node, )
        fields = '__all__'

        filter_fields = {
            'id': ('exact', ),
        }

class CustomerInputType(InputObjectType):
    name = String()
    category = ID()
    id = ID()

''' ------------- DOCUMENT --------------- '''
class SubChapterNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = SubChapter
        interfaces = (relay.Node, )
        fields = '__all__'

        filter_fields = {
            'id': ('exact', ),
        }

class SubChapterInputType(InputObjectType):
    title = String()

class ChapterNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = Chapter
        interfaces = (relay.Node, )
        fields = '__all__'

        filter_fields = {
            'id': ('exact', ),
            'document_id': ('exact', )
        }

class ChapterInputType(InputObjectType):
    title = String()
    sub_chapter = InputField(List(SubChapterInputType))


class ContainerNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = Container
        interfaces = (relay.Node, )
        fields = '__all__'
        filter_fields = {
            'id': ('exact', ),
        }

class ContainerInputType(InputObjectType):
    name = String()
    document = ID()
    id = ID()

class DatalayerNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = Datalayer
        interfaces = (relay.Node, )
        fields = '__all__'

        filter_fields = {
            'id': ('exact', ),
        }

class DatalayerInputType(InputObjectType):
    name = String()
    document = ID()
    container = InputField(ContainerInputType)
    id = ID()

class DocumentNode(DjangoObjectType):
    pk = Int()

    def resolve_pk(self, info):
        return self.pk

    class Meta:
        model = Document
        interfaces = (relay.Node, )
        fields = '__all__'

        filter_fields = {
            'id': ('exact', ),
            'customer_id': ('exact', )
        }

class DocumentInputType(InputObjectType):
    id = ID()
    url = String()
    title = String()
    customer = InputField(CustomerInputType)
    chapter = InputField(List(ChapterInputType))
