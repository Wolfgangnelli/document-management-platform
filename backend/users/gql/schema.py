from graphene import Field, List, ObjectType, Int
from .mutations import UserCreate, UserUpdate
from .types import UserType
from django.contrib.auth import get_user_model
from graphql_jwt.decorators import login_required
from graphql_jwt import Verify, Refresh
import graphql_jwt


User = get_user_model()


class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)


class Query(ObjectType):
    user = Field(UserType, id=Int(required=True))
    current_user = Field(UserType)
    users = List(UserType)

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_user(self, info, id):
        return User.objects.get(id=id)

    @login_required
    def resolve_current_user(self, info):
        user = info.context.user
        return user


class Mutation(ObjectType):
    user_create = UserCreate.Field()
    user_update = UserUpdate.Field()
    token_auth = ObtainJSONWebToken.Field()
    verify_token = Verify.Field()
    refresh_token = Refresh.Field()

