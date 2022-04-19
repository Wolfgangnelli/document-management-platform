from django.contrib import admin
from .models import *

classes = [
    Datalayer,
    Environment,
    Container,
    Version,
    Customer,
    Document,
    Chapter,
    SubChapter,
    Section,
    Image,
    SectionTemplate,
    Category,
]

for model in classes:
    admin.site.register(model)