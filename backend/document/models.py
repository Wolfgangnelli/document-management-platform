from django.db import models
from django_extensions.db.models import TimeStampedModel
#from snippet.models import GASnippetTemplate, EcommerceSnippet, GASnippet, InitialSnippet, EcommerceSnippetTemplateGA4, EcommerceSnippetGA4, EcommerceSnippetTemplate


class BaseSection(TimeStampedModel):
    title = models.CharField(max_length=255, blank=False, null=False)
    action = models.TextField(blank=False, null=False)
    note = models.TextField(blank=True, null=False)
    priority = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

    class Meta:
        abstract = True

class Category(TimeStampedModel):
    name = models.CharField(max_length=255, blank=False, null=False)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name

class Image(TimeStampedModel):
    name = models.CharField(max_length=255, blank=True, null=False)
    url = models.CharField(max_length=255, blank=True, null=False)
    page_link = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = 'Image'
        verbose_name_plural = 'Images'

    def __str__(self):
        return f'{self.pk} - {self.name} / {self.url}'

class Customer(TimeStampedModel):
    name = models.CharField(max_length=255, blank=True, null=False)
    image = models.ForeignKey(Image, on_delete=models.SET_NULL, blank=False, null=True, related_name='customer')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True, related_name='customer')

    class Meta:
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

    def __str__(self):
        return f'{self.pk}-{self.name}'

class Document(TimeStampedModel):
    url = models.CharField(max_length=255, blank=True, null=False)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=False, related_name='document')
    title = models.CharField(max_length=255, blank=False, null=True)

    class Meta:
        ordering = ['-pk']
        verbose_name = 'Document'
        verbose_name_plural = 'Documents'

    def get_customer_name(self):
        client = Customer.objects.get(pk=self.customer.pk)
        if client:
            return client.name
        else:
            return self.pk

    def __str__(self):
        return f'{self.pk}- Documento operativo {self.get_customer_name()}'

class Datalayer(TimeStampedModel):
    name = models.CharField(max_length=255, blank=False, null=False, default='datalayer')
    initial_snippet = models.OneToOneField('snippet.InitialSnippet', on_delete=models.SET_NULL, null=True, blank=True)
    document = models.OneToOneField(Document, on_delete=models.CASCADE, null=True, related_name='datalayer')

    class Meta:
        verbose_name = 'Datalayer'
        verbose_name_plural = 'Datalayers'

    def get_document_name(self):
        doc_instance = Document.objects.get(pk=self.document.pk)
        doc_name = doc_instance.title
        return doc_name

    def __str__(self):
        return f'{self.name} / {self.get_document_name()}'

class Container(TimeStampedModel):
    name = models.CharField(max_length=255, blank=True, null=False)
    datalayer = models.OneToOneField(Datalayer, related_name='container', on_delete=models.CASCADE, null=True, blank=True)
    document = models.ForeignKey(Document, related_name='container', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = 'Container'
        verbose_name_plural = 'Containers'

    def __str__(self):
        return self.name

class Environment(TimeStampedModel):
    ENV_CHOICES = [
        ('P', 'production'),
        ('S', 'staging')
    ]
    name = models.CharField(max_length=25, choices=ENV_CHOICES, default='P', blank=False, null=False)
    container = models.ForeignKey(Container, related_name='environment', on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name = 'Environment'
        verbose_name_plural = 'Environments'

    def get_container_name(self):
        instance = Container.objects.get(pk=self.container.pk)
        container_name = instance.name
        return container_name

    def __str__(self):
        return f'{self.name} / {self.get_container_name()}'


class Version(TimeStampedModel):
    document = models.ForeignKey(Document, related_name='version', on_delete=models.SET_NULL, null=True, blank=False)
    author = models.CharField(max_length=255, blank=True, null=False)
    auditor = models.CharField(max_length=255, blank=True, null=False)
    version = models.CharField(max_length=100, blank=True, null=False, default='1.0')
    note = models.TextField(max_length=1000, blank=True, null=False)

    class Meta:
        verbose_name = 'Version'
        verbose_name_plural = 'Versions'

    def get_created(self):
        return self.created.strftime("%m/%d/%Y, %H:%M")

    def __str__(self) -> str:
        return str(self.get_created())

class Chapter(TimeStampedModel):
    title = models.CharField(max_length=255, blank=False, null=False)
    path = models.CharField(max_length=255, blank=False, null=False)
    icon = models.CharField(max_length=255, blank=True, null=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, blank=False, null=True, related_name='chapter')

    class Meta:
        verbose_name = 'Chapter'
        verbose_name_plural = 'Chapters'

    def __str__(self):
        return self.title

class SubChapter(TimeStampedModel):
    title = models.CharField(max_length=255, blank=False, null=False)
    path = models.CharField(max_length=255, blank=False, null=False)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, blank=False, null=True, related_name='subChapter')

    class Meta:
        verbose_name = 'Sub Chapter'
        verbose_name_plural = 'Sub Chapters'

    def __str__(self):
        return self.title


class Section(BaseSection):
    eco_snippet = models.ForeignKey('snippet.EcommerceSnippet', on_delete=models.SET_NULL, null=True, blank=True, related_name='section')
    ga4_eco_snippet = models.ForeignKey('snippet.EcommerceSnippetGA4', on_delete=models.SET_NULL, null=True, blank=True, related_name='section')
    #ga_snippet = models.ForeignKey('snippet.GASnippet', on_delete=models.SET_NULL, null=True, blank=True, related_name='section')
    sub_chapter = models.ForeignKey(SubChapter, on_delete=models.CASCADE, blank=False, null=True, related_name='section')
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, blank=True, related_name='section')

    class Meta:
        verbose_name = 'Section'
        verbose_name_plural = 'Sections'

    def __str__(self):
        return f'{self.pk}-{self.title}'


class SectionTemplate(BaseSection):
    ga_snippet_template = models.ForeignKey('snippet.GASnippetTemplate', on_delete=models.SET_NULL, null=True, blank=True, related_name='section_template')
    eco_snippet_template = models.ForeignKey('snippet.EcommerceSnippetTemplate', on_delete=models.SET_NULL, null=True, blank=True, related_name='section_template')
    ga4_eco_snippet_template = models.ForeignKey('snippet.EcommerceSnippetTemplateGA4', on_delete=models.SET_NULL, null=True, blank=True, related_name='section_template')

    class Meta:
        ordering = ['-pk']
        verbose_name = 'Section template'
        verbose_name_plural = 'Sections template'

    def __str__(self):
        return f'{self.pk}'

