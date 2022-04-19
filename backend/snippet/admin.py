from django.contrib import admin
from .models import *

# Register your models here.

classes = [
    GASnippetTemplate,
    GASnippet,
    EcommerceSnippetTemplate,
    EcommerceSnippet,
    CustomField,
    InitialSnippet,
    Event,
    EventCategory,
    EcommerceSnippetGA4,
    EcommerceSnippetTemplateGA4,
    GASnippetOldIdx,
    CustomFieldOldIdx,
]

for model in classes:
    admin.site.register(model)
