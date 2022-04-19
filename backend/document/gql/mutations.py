from base.models import Variable, GASnippetVariable, VariableValue, GASnippetVariableValue, DocumentVariable, \
    DocumentVariableValue
from graphene import Mutation, Field, Boolean, ID, String, List
from graphene_django.rest_framework.mutation import SerializerMutation
from .serializers import SectionSerializer, SectionTemplateSerializer, DocumentSerializer, DatalayerSerializer
from .types import SectionNode, SectionInputType, DocumentNode, DocumentInputType, SectionTemplateNode, SectionTemplateInputType, DatalayerNode, DatalayerInputType
from document.models import Section, Image, Customer, Document, SectionTemplate, Chapter, SubChapter, Category, Container, Datalayer
from  snippet.models import CustomField, Event, InitialSnippet, EcommerceSnippetTemplate, EcommerceSnippet, GASnippet, GASnippetTemplate
import boto3
from graphene_file_upload.scalars import Upload
import uuid
from django.http.response import  HttpResponse

# AWS S3 Bucket
S3_BASE_URL = 's3.amazonaws.com'
BUCKET = 'django-libbys3bucket' # è un bucket che uso io per altri esercizi (per fare test)

''' -------------- SECTION --------------- '''
class SectionCreate(Mutation):
    section = Field(SectionNode)

    class Arguments:
        input = SectionInputType(required=True)
        file = Upload(required=True)  #List(Upload)

    @classmethod
    def mutate(cls, root, info, file, **data):
        section_data = data.get('input')
        page_link = section_data.pop('page_link')
        photo_file = file

        if photo_file:
                s3 = boto3.client('s3', aws_access_key_id='', aws_secret_access_key='')
                key = uuid.uuid4().hex[:6] + photo_file.name[photo_file.name.rfind("."):]
                try:
                    s3.upload_fileobj(photo_file, BUCKET, key)
                    url = f"https://{BUCKET}.{S3_BASE_URL}/{key}"
                    photo = Image(name=photo_file.name, url=url, page_link=page_link)
                    photo.save()
                except Exception as err:
                    print("Oops! C'è un problema nel caricamento dell'image: %s" % err)
        else:
            print("Perso section ID o file image")

        section_data['image'] = photo.pk
        sub_chapter_instance = SubChapter.objects.get(pk=section_data['sub_chapter'])

        section_obj = Section.objects.create(
            title=section_data['title'],
            action=section_data['action'],
            priority=section_data['priority'],
            category=section_data['category'],
            note=section_data['note'],
            image=photo,
            sub_chapter=sub_chapter_instance
        )

        if 'eco_snippet_template' in section_data.keys(): # DA VERIFICARE QUANDO IMPLEMENTO ECOMMERCE
            eco_snippet_template_id = section_data.pop('eco_snippet_template')
            eco_snippet_template_instance = EcommerceSnippetTemplate.objects.get(pk=eco_snippet_template_id)
            eco_snippet, created = EcommerceSnippet.objects.get_or_create(
                name=eco_snippet_template_instance.name,
                currency_code=eco_snippet_template_instance.currency_code,
                item_id=eco_snippet_template_instance.item_id,
                price=eco_snippet_template_instance.price,
                brand=eco_snippet_template_instance.brand,
                category=eco_snippet_template_instance.category,
                variant=eco_snippet_template_instance.variant,
                list=eco_snippet_template_instance.list,
                position=eco_snippet_template_instance.position,
                quantity=eco_snippet_template_instance.quantity,
                creative=eco_snippet_template_instance.creative,
                affiliation=eco_snippet_template_instance.affiliation,
                revenue=eco_snippet_template_instance.revenue,
                tax=eco_snippet_template_instance.tax,
                shipping=eco_snippet_template_instance.shipping,
                coupon=eco_snippet_template_instance.coupon,
                event=eco_snippet_template_instance.event
            )

        elif 'ga_snippet_template' in section_data.keys():
            ga_snippet_template_id = section_data.pop('ga_snippet_template')
            ga_snippet_template_instance = GASnippetTemplate.objects.get(pk=ga_snippet_template_id)
            datalayer_instance = Datalayer.objects.get(pk=section_data['datalayer'])

            ga_snippet = GASnippet.objects.create(
                event_category=ga_snippet_template_instance.event_category,
                event_action=ga_snippet_template_instance.event_action,
                event_label=ga_snippet_template_instance.event_label,
                snippet_name=ga_snippet_template_instance.snippet_name,
                section=section_obj,
                event=ga_snippet_template_instance.event,
                datalayer=datalayer_instance
            )

            if ga_snippet_template_instance.event_category_variable is not None :
                category_variable_instance = Variable.objects.get(pk=ga_snippet_template_instance.event_category_variable.pk)
                ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                    name=category_variable_instance.name,
                    is_template=True,
                    old_idx=category_variable_instance.pk,
                    ga_snippet=ga_snippet
                )
                ga_snippet.event_category_variable = ga_snippet_variable_obj
                ga_snippet.save()

                values = VariableValue.objects.filter(variable=category_variable_instance)

                for var_value in values:
                    ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                        name=var_value.name,
                        condition=var_value.condition,
                        ga_snippet_variable=ga_snippet_variable_obj
                    )

            if ga_snippet_template_instance.event_action_variable is not None:
                action_variable_instance = Variable.objects.get(pk=ga_snippet_template_instance.event_action_variable.pk)
                ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                    name=action_variable_instance.name,
                    is_template=True,
                    old_idx=action_variable_instance.pk,
                    ga_snippet=ga_snippet
                )
                ga_snippet.event_action_variable = ga_snippet_variable_obj
                ga_snippet.save()

                values = VariableValue.objects.filter(variable=action_variable_instance)

                for var_value in values:
                    ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                        name=var_value.name,
                        condition=var_value.condition,
                        ga_snippet_variable=ga_snippet_variable_obj
                    )

            if ga_snippet_template_instance.event_label_variable is not None:
                label_variable_instance = Variable.objects.get(pk=ga_snippet_template_instance.event_label_variable.pk)
                ga_snippet_variable_obj, created = GASnippetVariable.objects.get_or_create(
                    name=label_variable_instance.name,
                    is_template=True,
                    old_idx=label_variable_instance.pk,
                    ga_snippet=ga_snippet
                )
                ga_snippet.event_label_variable = ga_snippet_variable_obj
                ga_snippet.save()

                values = VariableValue.objects.filter(variable=label_variable_instance)

                for var_value in values:
                    ga_snippet_variable_value_obj, created = GASnippetVariableValue.objects.get_or_create(
                        name=var_value.name,
                        condition=var_value.condition,
                        ga_snippet_variable=ga_snippet_variable_obj
                    )

        serializer = SectionSerializer(section_obj, data=section_data)
        serializer.is_valid(raise_exception=True)

        return SectionCreate(section=serializer.save())

class SectionUpdate(Mutation):   # DA TESTARE
    section = Field(SectionNode)

    class Arguments:
        input = SectionInputType(required=True)
        file = Upload(required=False)

    @classmethod
    def mutate(cls, root, info, file=None, **data):
        section_data = data.get('input')
        page_link = section_data['page_link']
        image_instance = None
        photo_file = None
        image_id = None

        if section_data['image_pk'] is not None:
            image_id = section_data.pop('image_pk')

        if file:
            photo_file = file

        if image_id is not None:
            image_instance = Image.objects.get(pk=image_id)

        # da fare: cancellare l'immagine da AWS (https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Bucket.delete_objects)
        if photo_file is not None:
            s3 = boto3.client('s3', aws_access_key_id='', aws_secret_access_key='')
            key = uuid.uuid4().hex[:6] + photo_file.name[photo_file.name.rfind("."):]
            try:
                s3.upload_fileobj(photo_file, BUCKET, key)
                url = f"https://{BUCKET}.{S3_BASE_URL}/{key}"
                if image_instance is not None:
                    image_instance.name = photo_file.name
                    image_instance.url = url
                    image_instance.page_link = page_link
                    image_instance.save()
                else:
                    photo = Image(name=photo_file.name, url=url, page_link=page_link)
                    photo.save()
            except Exception as err:
                print("Oops! C'è un problema nel caricamento dell'image: %s" % err)
        elif photo_file is None and image_instance is not None:
            image_instance.page_link = page_link
        else:
            print("Perso section ID o file image")


        section_instance = Section.objects.get(pk=section_data['id'])
        section_instance.title = section_data['title']
        section_instance.action = section_data['action']
        section_instance.note = section_data['note']
        section_instance.priority = section_data['priority']
        section_instance.category = section_data['category']
        section_instance.image = image_instance if image_instance else photo
        section_instance.save()

        section_data['image'] = image_instance if image_instance else photo
        serializer = SectionSerializer(section_instance, data=section_data)
        serializer.is_valid(raise_exception=True)
        return SectionUpdate(section=serializer.save())


class SectionDelete(Mutation):
    ok = Boolean()
    id = ID()

    class Arguments:
        id = ID(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        section = Section.objects.get(pk=data['id'])
        section.delete()
        return SectionDelete(ok=True, id=data['id'])

class SectionUpload(Mutation):
    uploaded = Boolean() # section = Field(SectionNode)

    class Arguments:
        id = List(ID)
        datalayer = ID(required=True)
        document = ID(required=True)
        sub_chapter = ID(required=True)

    def process_creation_variables(*args):
        event_var_instance = args[0]
        ga_snippet_obj = args[1]
        document_instance = args[2]

        var_values_query_set = VariableValue.objects.filter(variable=event_var_instance.pk)

        doc_var_obj, created = DocumentVariable.objects.get_or_create(
            name=event_var_instance.name,
            type=event_var_instance.type,
            is_template=False,
            document=document_instance
        )

        for var_value in var_values_query_set:
            DocumentVariableValue.objects.get_or_create(
                name=var_value.name,
                condition=var_value.condition,
                document_variable=doc_var_obj
            )

        var_obj, created = GASnippetVariable.objects.get_or_create(
            name=event_var_instance.name,
            old_idx=event_var_instance.pk,
            ga_snippet=ga_snippet_obj
        )

        for var_value in var_values_query_set:
            GASnippetVariableValue.objects.get_or_create(
                name=var_value.name,
                condition=var_value.condition,
                ga_snippet_variable=var_obj
            )

        return var_obj

    @classmethod
    def mutate(cls, root, info, **data):
        section_template_ids = data.get('id')
        datalayer_id = data.get('datalayer')
        document_id = data.get('document')
        sub_chapter_id = data.get('sub_chapter')
        event_category_variable_obj = None
        event_action_variable_obj = None
        event_label_variable_obj = None

        datalayer_instance = Datalayer.objects.get(pk=datalayer_id)
        document_instance = Document.objects.get(pk=document_id)
        sub_chapter_id_instance = SubChapter.objects.get(pk=sub_chapter_id)

        for idx in section_template_ids:
            if SectionTemplate.objects.get(pk=idx):
                section_template_instance = SectionTemplate.objects.get(pk=idx)
                if section_template_instance and sub_chapter_id_instance:
                    section_obj, created = Section.objects.get_or_create(
                        title = section_template_instance.title,
                        action = section_template_instance.action,
                        note = section_template_instance.note,
                        priority = section_template_instance.priority,
                        category = section_template_instance.category,
                        sub_chapter=sub_chapter_id_instance
                    )

                if section_template_instance.ga_snippet_template:
                    ga_snippet_template_instance = GASnippetTemplate.objects.get(pk=section_template_instance.ga_snippet_template.pk) #section_template__ga_snippet_template

                    if ga_snippet_template_instance:
                        ga_snippet_obj, created = GASnippet.objects.get_or_create(
                            event_category=ga_snippet_template_instance.event_category,
                            event_action=ga_snippet_template_instance.event_action,
                            event_label=ga_snippet_template_instance.event_label,
                            event=ga_snippet_template_instance.event,
                            snippet_name=ga_snippet_template_instance.snippet_name,
                            section=section_obj,
                            datalayer=datalayer_instance
                        )

                        if ga_snippet_template_instance.event_category_variable is not None and ga_snippet_obj:
                            event_var_instance = Variable.objects.get(pk=ga_snippet_template_instance.event_category_variable.pk)
                            event_category_variable_obj = cls.process_creation_variables(event_var_instance, ga_snippet_obj, document_instance)
                        if ga_snippet_template_instance.event_action_variable is not None and ga_snippet_obj:
                            event_var_instance = Variable.objects.get(pk=ga_snippet_template_instance.event_action_variable.pk)
                            event_action_variable_obj = cls.process_creation_variables(event_var_instance, ga_snippet_obj, document_instance)
                        if ga_snippet_template_instance.event_label_variable is not None and ga_snippet_obj:
                            event_var_instance = Variable.objects.get(pk=ga_snippet_template_instance.event_label_variable.pk)
                            event_label_variable_obj = cls.process_creation_variables(event_var_instance, ga_snippet_obj, document_instance)

                        ga_snippet_obj.event_category_variable = event_category_variable_obj
                        ga_snippet_obj.event_action_variable = event_action_variable_obj
                        ga_snippet_obj.event_label_variable = event_label_variable_obj
                        ga_snippet_obj.save()

                    uploaded = True if created else False
                    if not uploaded:
                        return SectionUpload(uploaded=uploaded)

                elif section_template_instance.eco_snippet_template:
                    eco_snippet_template_instance = EcommerceSnippetTemplate.objects.get(section_template__eco_snippet_template=section_template_instance.eco_snippet_template)
                    eco_snippet_obj = EcommerceSnippet.objects.create(
                        name = eco_snippet_template_instance.name,
                        currency_code = eco_snippet_template_instance.currency_code,
                        item_id = eco_snippet_template_instance.item_id,
                        price = eco_snippet_template_instance.price,
                        brand = eco_snippet_template_instance.brand,
                        category = eco_snippet_template_instance.category,
                        variant = eco_snippet_template_instance.variant,
                        list = eco_snippet_template_instance.list,
                        position = eco_snippet_template_instance.position,
                        quantity = eco_snippet_template_instance.quantity,
                        creative = eco_snippet_template_instance.creative,
                        affiliation = eco_snippet_template_instance.affiliation,
                        revenue = eco_snippet_template_instance.revenue,
                        tax = eco_snippet_template_instance.tax,
                        shipping = eco_snippet_template_instance.shipping,
                        coupon = eco_snippet_template_instance.coupon,
                        event = eco_snippet_template_instance.event
                    )
                    section_obj, created = Section.objects.get_or_create(
                        title = section_template_instance.title,
                        action = section_template_instance.action,
                        note=section_template_instance.note,
                        priority=section_template_instance.priority,
                        category=section_template_instance.category,
                        eco_snippet=eco_snippet_obj
                    )

                    uploaded = True if created else False
                    if not uploaded:
                        return SectionUpload(uploaded=uploaded)

            else:
                raise Exception(f"Sorry, section template with ID {idx} does not exist")

        return SectionUpload(uploaded=uploaded)



''' --------------- SECTION TEMPLATE ------------------- '''
class SectionTemplateCreate(Mutation):
    section_template = Field(SectionTemplateNode)

    class Arguments:
        input = SectionTemplateInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        section_data = data.get('input')

        serializer = SectionTemplateSerializer(data=section_data)
        serializer.is_valid(raise_exception=True)
        return SectionTemplateCreate(section_template=serializer.save())

class SectionTemplateUpdate(Mutation):
    section_template = Field(SectionTemplateNode)

    class Arguments:
        input = SectionTemplateInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        section_data = data.get('input')

        instance = SectionTemplate.objects.get(pk=section_data['id'])
        serializer = SectionTemplateSerializer(instance, data=section_data)
        serializer.is_valid(raise_exception=True)
        return SectionTemplateUpdate(section_template=serializer.save())

class SectionTemplateDelete(Mutation): # DA TESTARE
    ok = Boolean()
    id = ID()

    class Arguments:
        id = ID(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        section = SectionTemplate.objects.get(pk=data['id'])
        section.delete()
        return SectionTemplateDelete(ok=True, id=int(data['id']))



''' --------------- SECTION IMAGE ----------------- '''
class SectionImageMutation(Mutation):
    class Arguments:
        file = Upload(required=True)
        id = ID(required=True)
        name = String(required=True)

    success = Boolean()
    msg = String()


    def mutate(self, info, file, **data):
        photo_file = file
        if photo_file:
            s3 = boto3.client('s3', aws_access_key_id='', aws_secret_access_key='')
            key = uuid.uuid4().hex[:6] + photo_file.name[photo_file.name.rfind("."):]
            try:
                s3.upload_fileobj(photo_file, BUCKET, key)
                url = f"https://{BUCKET}.{S3_BASE_URL}/{key}"
                photo = Image(name=data.get('name'), url=url)
                photo.save()
            except Exception as err:
                print("Oops! C'è un problema nel caricamento dell'image: %s" %err)
                return SectionImageMutation(success=False, msg=f'Error: {err}')
        else:
            print("Perso section ID o file image")
            return SectionImageMutation(success=False, msg='Perso section id o file img')
        return SectionImageMutation(success=True, msg='Tutto liscio')


'''
 CUSTOMER 
class CustomerCreate(Mutation):
    customer = Field(CustomerNode)

    class Arguments:
        input = CustomerInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        customer_data = data.get('input')

        serializer = CustomerSerializer(data=customer_data)
        serializer.is_valid(raise_exception=True)
        return CustomerCreate(customer=serializer.save())

'''

class DocumentMutation(SerializerMutation):
    class Meta:
        serializer_class = DocumentSerializer

''' --------------- DOCUMENT ------------------ '''
class DocumentCreate(Mutation):
    document = Field(DocumentNode)
    success = Boolean()

    class Arguments:
        input = DocumentInputType(required=True)
        file = Upload(required=True)


    def mutate(self, root, file, **data):
        photo_file = file
        document_data = data.get('input')
        customer_data = document_data.get('customer')
        category_instance = Category.objects.get(pk=customer_data.get('category'))
        customer_data['category'] = category_instance
        chapters = document_data.pop('chapter')
        customer, created = Customer.objects.get_or_create(**customer_data)
        document_data['customer'] = customer
       # document = Document.objects.create(**document_data)

        document_data['customer'] = customer.pk
        serializer = DocumentSerializer(data=document_data)
        serializer.is_valid(raise_exception=True)
        document = serializer.save()


        if photo_file and customer:
            s3 = boto3.client('s3', aws_access_key_id='', aws_secret_access_key='')
            key = uuid.uuid4().hex[:6] + photo_file.name[photo_file.name.rfind("."):]
            try:
                s3.upload_fileobj(photo_file, BUCKET, key)
                url = f"https://{BUCKET}.{S3_BASE_URL}/{key}"
                photo = Image(name=customer.name, url=url)
                photo.save()
            except Exception as err:
                print("Oops! C'è un problema nel caricamento dell'image: %s" %err)
        else:
            print("Perso customer o file image")
        if photo:
            customer.image = photo
            customer.save()

        for chapter in chapters:
            if 'sub_chapter' in chapter:
                sub_chapters = chapter.pop('sub_chapter')
                chapter_obj = Chapter.objects.create(title=chapter.title, path=f'/{chapter.title.replace(" ", "-")}', document=document)
                for sub_chapter in sub_chapters:
                    SubChapter.objects.create(title=sub_chapter.title, path=f'/{sub_chapter.title.replace(" ", "-")}', chapter=chapter_obj)
            else:
                Chapter.objects.create(title=chapter.title, path=f'/{chapter.title.replace(" ", "-")}', document=document)

        # Creo InitialSnippet
        w_setup_event = Event.objects.get(name='wSetup')
        initial_snippet_obj = InitialSnippet.objects.create(event=w_setup_event)

        # Creo Datalayer
        datalayer_obj = Datalayer.objects.create(name='dataLayer', document=document, initial_snippet=initial_snippet_obj)

        # Creo Container
        Container.objects.create(datalayer=datalayer_obj, document=document)


        return DocumentCreate(document=document, success=True)


''' ------------ DATALAYER E CONTAINER ----------- '''
# class DatalayerCreate(Mutation):
#     datalayer = Field(DatalayerNode)
#
#     class Arguments:
#         input = DatalayerInputType(required=True)
#
#
#     @classmethod
#     def mutate(cls, root, info, **data):
#         all_data = data.get('input')
#         container_data = all_data.pop('container')
#
#         serializer = DatalayerSerializer(data=all_data)
#         serializer.is_valid(raise_exception=True)
#         datalayer = serializer.save()
#
#         container_instance = Document.objects.get(pk=container_data['document'])
#         Container.objects.create(name=container_data['name'], document=container_instance, datalayer=datalayer)
#
#         return DatalayerCreate(datalayer=datalayer)

class DatalayerUpdate(Mutation):
    datalayer = Field(DatalayerNode)

    class Arguments:
        input = DatalayerInputType(required=True)

    @classmethod
    def mutate(cls, root, info, **data):
        all_data = data.get('input')
        container_data = all_data.pop('container')

        datalayer_instance = Datalayer.objects.get(pk=all_data['id'])
        serializer = DatalayerSerializer(datalayer_instance, data=all_data)
        serializer.is_valid(raise_exception=True)
        datalayer = serializer.save()

        document_instance = Document.objects.get(pk=all_data.get('document'))
        container_obj = Container.objects.get(datalayer=datalayer, document=document_instance)
        container_obj.name = container_data['name']
        container_obj.save()

        return DatalayerUpdate(datalayer=datalayer)
