from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from graphene import InputObjectType, String

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude = ('password', )


class UserInputType(InputObjectType):
    username = String()
    email = String()
    password = String()

