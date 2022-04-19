from rest_framework import serializers
from document.models import Section, Image, Document, Chapter, SubChapter, Customer, Container, SectionTemplate, Category, Datalayer
from snippet.gql.serializers import EcommerceSnippetSerializer, GASnippetSerializer


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(read_only=True)
    eco_snippet = EcommerceSnippetSerializer(read_only=True)
    ga_snippet = GASnippetSerializer(read_only=True)

    class Meta:
        model = Section
        fields = '__all__'  #('title', 'action', 'note', 'priority', 'category', 'eco_snippet', 'ga_snippet', 'image')

    def get_image(self, obj):
        image = obj.image
        serializer = ImageSerializer(image, many=False)
        return serializer.data

class SectionTemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = SectionTemplate
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Customer
        fields = '__all__'

    def get_image(self, obj):
        image = Image.objects.get(pk=obj.image)
        serializer = ImageSerializer(image, many=False)
        return serializer.data

class SubChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubChapter
        fields = '__all__'

class ChapterSerializer(serializers.ModelSerializer):
    subChapters = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Chapter
        fields = '__all__'

    def get_subChapters(self, obj):
        sub_chapters = obj.subchapter_set.all()
        serializer = SubChapterSerializer(sub_chapters, many=True)
        return serializer.data


class DocumentSerializer(serializers.ModelSerializer):
    chapters = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Document
        fields = '__all__'
        extra_kwargs = {
            "id": {
                'read_only': False,
                'required': False
            }
        }

    def get_chapters(self, obj):
        chapters = obj.chapter_set.all()
        serializer = ChapterSerializer(chapters, many=True)
        return serializer.data
'''
    def create(self, validated_data):
        customer_data = validated_data.pop('customer')
        customer, created = Customer.objects.get_or_create(**customer_data)
        document = Document.objects.create(customer=customer, **validated_data)
        return document
'''

class ContainerSerializer(serializers.ModelSerializer):
    model = Container
    fields = '__all__'

class DatalayerSerializer(serializers.ModelSerializer):
    container = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Datalayer
        fields = '__all__'

    def get_container(self, obj):
        container = obj.container_set.all()
        serializer = ContainerSerializer(container, many=False)
        return serializer.data
