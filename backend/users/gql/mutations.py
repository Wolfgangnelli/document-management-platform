from graphene import Field, Mutation, String, Int
from django.contrib.auth import get_user_model
from .types import UserType, UserInputType

User = get_user_model()


class UserCreate(Mutation):
    user = Field(UserType)

    class Arguments:
        input = UserInputType(required=True)

    @staticmethod
    def mutate(cls, info, **data):
        user_data = data['input']
        username = user_data.get('username')
        email = user_data.get('email')
        password = user_data.get('password')

        user = User(username=username, email=email)
        user.set_password(password)
        user.save()
        return UserCreate(user=user)


class UserUpdate(Mutation):
    user = Field(UserType)

    class Arguments:
        input = UserInputType()
        id = Int(required=True)

    @staticmethod
    def mutate(cls, info, **data):
        user_data = data['input']
        user_id = data['id']
        username = user_data.get('username')
        email = user_data.get('email')
        password = user_data.get('password') if len(user_data.get('password')) > 0 else None

        user = User.objects.get(id=user_id)
        user.username = username
        user.email = email

        if password is not None:
            user.set_password(password)
        user.save()

        return UserCreate(user=user)

