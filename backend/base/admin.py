#from base.models import VariableType, Variable, VariableValue
from django.contrib import admin
from .models import *

# Register your models here.

classes = [
    Variable,
    VariableType,
    VariableValue,
    InitialSnippetVariable,
    InitialSnippetVariableValue,
    DocumentVariable,
    DocumentVariableValue,
    GASnippetVariable,
    GASnippetVariableValue,
    EcommerceSnippetVariableTemplate,
    EcommerceSnippetVariableTemplateValue
]

for model in classes:
    admin.site.register(model)

#admin.site.register(VariableType)
#admin.site.register(Variable)
#admin.site.register(VariableValue)