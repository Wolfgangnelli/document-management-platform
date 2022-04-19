from django.db import models
from django_extensions.db.models import TimeStampedModel
from snippet.models import GASnippetTemplate, GASnippet, EcommerceSnippetTemplate, EcommerceSnippet, InitialSnippet, EcommerceSnippetTemplateGA4, EcommerceSnippetGA4
from document.models import Document


class VariableType(TimeStampedModel):
    reference = models.CharField(max_length=255, blank=False, null=None)
    scope = models.CharField(max_length=255, blank=False, null=None)
    priority = models.CharField(max_length=255, blank=False, null=None)

    def __str__(self):
        return '{0} - {1} - {2}'.format(self.scope, self.reference, self.priority)


# Template Variable
class Variable(TimeStampedModel):
    name = models.CharField(max_length=255, blank=False, null=None)
    type = models.ForeignKey(VariableType, related_name='variables', on_delete=models.CASCADE)
    is_template = models.BooleanField(default=True)

    class Meta:
        ordering = ['-pk']
        verbose_name = 'Variable'
        verbose_name_plural = 'Variables'

    def __str__(self):
        return self.name


class VariableValue(TimeStampedModel):
    name = models.CharField(max_length=255, blank=False, null=None) #cambiare in TextField
    condition = models.TextField(null=True, blank=True)
    variable = models.ForeignKey(Variable, related_name='variableValue', on_delete=models.CASCADE, null=False)

    class Meta:
        verbose_name = 'Variable Value'
        verbose_name_plural = 'Variable Values'

    def __str__(self):
        return '{0} - {1}'.format(self.pk, self.name)


# Initial Snippet Variable

class InitialSnippetVariable(TimeStampedModel):
    name = models.CharField(max_length=255, blank=False, null=False)
    type = models.ForeignKey(VariableType, on_delete=models.SET_NULL, null=True, related_name='initial_snippet_variable')
    initial_snippet = models.ForeignKey(InitialSnippet, on_delete=models.CASCADE, related_name='initial_snippet_variable')
    is_template = models.BooleanField(default=True)
    old_idx = models.IntegerField(null=True, blank=True)

    class Meta:
        verbose_name = 'Initial snippet variable'
        verbose_name_plural = 'Initial snippet variables'

    def __str__(self):
        return f'{self.pk} - {self.name}'


class InitialSnippetVariableValue(TimeStampedModel):
    name = models.CharField(max_length=255, blank=False, null=False)
    condition = models.CharField(max_length=255, blank=False, null=False)
    initial_snippet_variable = models.ForeignKey(InitialSnippetVariable, on_delete=models.CASCADE, related_name='initial_snippet_variable_value')
    old_idx = models.IntegerField(null=True, blank=True)

    class Meta:
        verbose_name = 'Initial snippet variable value'
        verbose_name_plural = 'Initial snippet variable values'

    def __str__(self):
        return '{0} - {1}'.format(self.pk, self.name)


# Document Variable

class DocumentVariable(TimeStampedModel):
    name = models.CharField(max_length=255, blank=False, null=False)
    type = models.ForeignKey(VariableType, related_name='document_variable', on_delete=models.SET_NULL, null=True)
    document = models.ForeignKey(Document, related_name='document_variable', on_delete=models.CASCADE)
    is_template = models.BooleanField(default=False)

    class Meta:
        ordering = ['-pk']
        verbose_name = 'Document variable'
        verbose_name_plural = 'Document variables'

    def __str__(self):
        return f'{self.pk} - {self.name}'


class DocumentVariableValue(TimeStampedModel):
    name = models.CharField(max_length=255, blank=False, null=False)
    condition = models.CharField(max_length=255, blank=False, null=False)
    document_variable = models.ForeignKey(DocumentVariable, related_name='document_variable_value', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Document variable value'
        verbose_name_plural = 'Document variable values'

    def __str__(self):
        return '{0} - {1}'.format(self.pk, self.name)


# GA Snippet Variable

class GASnippetVariable(TimeStampedModel):
    name = models.CharField(max_length=255, blank=False, null=False)
    is_template = models.BooleanField(default=False)
    old_idx = models.IntegerField(null=True, blank=True)
    ga_snippet = models.ForeignKey(GASnippet, related_name='ga_snippet_variable', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'GA snippet variable'
        verbose_name_plural = 'GA snippet variables'

    def __str__(self):
        return f'{self.pk} - {self.name}'


class GASnippetVariableValue(TimeStampedModel):
    name = models.CharField(max_length=255, blank=False, null=False)
    condition = models.CharField(max_length=255, blank=False, null=False)
    ga_snippet_variable = models.ForeignKey(GASnippetVariable, related_name='ga_snippet_variable_value', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'GA snippet variable value'
        verbose_name_plural = 'GA snippet variable values'

    def __str__(self):
        return f'{self.pk} - {self.name}'


# Base Ecommerce Variable

class BaseEcommerceVariable(TimeStampedModel):
    name = models.CharField(max_length=255, blank=False, null=False)

    class Meta:
        abstract = True

    def __str__(self):
        return f'{self.pk} - {self.name}'


class BaseEcommerceVariableValue(TimeStampedModel):
    name = models.CharField(max_length=255, blank=False, null=False)
    condition = models.CharField(max_length=255, blank=False, null=False)

    class Meta:
        abstract = True

    def __str__(self):
        return f'{self.pk} - {self.name}'


# Ecommerce Variable

class EcommerceSnippetVariable(BaseEcommerceVariable):
    is_template = models.BooleanField(default=False)
    old_idx = models.IntegerField(null=True, blank=True)
    eco_snippet = models.ForeignKey(EcommerceSnippet, related_name='eco_snippet_variable', on_delete=models.CASCADE)
    eco_snippet_ga4 = models.ForeignKey(EcommerceSnippetGA4, related_name='eco_snippet_variable', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Ecommerce snippet variable'
        verbose_name_plural = 'Ecommerce snippet variables'

    # def __str__(self):
    #     return f'{self.pk} - {self.name}'


class EcommerceSnippetVariableValue(BaseEcommerceVariableValue):
    eco_snippet_variable = models.ForeignKey(EcommerceSnippetVariable, related_name='eco_snippet_variable_value', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Ecommerce snippet variable value'
        verbose_name_plural = 'Ecommerce snippet variable values'

    # def __str__(self):
    #     return f'{self.pk} - {self.name}'


# Ecommerce Variable Template

class EcommerceSnippetVariableTemplate(BaseEcommerceVariable):
    old_idx = models.IntegerField(null=True, blank=True)
    eco_snippet_template = models.ForeignKey(EcommerceSnippetTemplate, related_name='eco_snippet_variable_template', on_delete=models.CASCADE, blank=True, null=True)
    eco_snippet_ga4_template = models.ForeignKey(EcommerceSnippetTemplateGA4, related_name='eco_snippet_variable_template', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = 'Ecommerce snippet variable template'
        verbose_name_plural = 'Ecommerce snippet variables template'

    # def __str__(self):
    #     return f'{self.pk} - {self.name}'


class EcommerceSnippetVariableTemplateValue(BaseEcommerceVariableValue):
    eco_snippet_variable_template = models.ForeignKey(EcommerceSnippetVariableTemplate, related_name='eco_snippet_variable_template_value', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Ecommerce snippet variable template value'
        verbose_name_plural = 'Ecommerce snippet variable template values'

    # def __str__(self):
    #     return f'{self.pk} - {self.name}'
