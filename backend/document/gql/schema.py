from graphene import ObjectType, relay
from .mutations import *
from graphene_django.filter import DjangoFilterConnectionField
from .types import SectionNode, SectionTemplateNode, DocumentNode, CategoryNode, DatalayerNode, CustomerNode
from document.filters import SectionFilter

class Query(ObjectType):
    section_template = relay.Node.Field(SectionTemplateNode)
    sections_template = DjangoFilterConnectionField(SectionTemplateNode)

    document = relay.Node.Field(DocumentNode)
    documents = DjangoFilterConnectionField(DocumentNode)

    section = relay.Node.Field(SectionNode)
    sections = DjangoFilterConnectionField(SectionNode, filterset_class=SectionFilter)

    customer = relay.Node.Field(CustomerNode)
    customers = DjangoFilterConnectionField(CustomerNode)

    category = relay.Node.Field(CategoryNode)
    categories = DjangoFilterConnectionField(CategoryNode)

    datalayer = relay.Node.Field(DatalayerNode)
    datalayers = DjangoFilterConnectionField(DatalayerNode)

class Mutation(ObjectType):
    create_section_template = SectionTemplateCreate.Field()
    update_section_template = SectionTemplateUpdate.Field()
    delete_section_template = SectionTemplateDelete.Field()

    create_section = SectionCreate.Field()
    update_section = SectionUpdate.Field()
    delete_section = SectionDelete.Field()
    upload_section = SectionUpload.Field()

    section_image_mutation = SectionImageMutation.Field()

    #document_mutation = DocumentMutation.Field()
    create_document = DocumentCreate.Field()

    #create_datalayer = DatalayerCreate.Field()
    update_datalayer = DatalayerUpdate.Field()

