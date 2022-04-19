# -*- coding: utf-8 -*-
import json
import graphene
from django.http import HttpResponse
from graphene_django.debug import DjangoDebug
# graphql/views.py
from django.utils.functional import cached_property
import base.gql.schema
import snippet.gql.schema
import document.gql.schema
import users.gql.schema
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import exceptions
from rest_framework_simplejwt.authentication import JWTAuthentication
from graphene_django.views import GraphQLView
# from graphql.loaders import CommentsByArticleIdLoader


class GQLContext:
    def __init__(self, request):
        self.request = request

    @cached_property
    def user(self):
        return self.request.user

    #
    # @cached_property
    # def movies_by_company_id_loader(self):
    #     return movies.schemas.movie_schema.MoviesByCompanyIdLoader()


class JWTGraphQLView(JWTAuthentication, GraphQLView):
    # ALLE: prendendo spunto da https://github.com/graphql-python/graphene-django/issues/264#issuecomment-330684934
    def dispatch(self, request, *args, **kwargs):
        try:
            # if not already authenticated by django cookie sessions
            # check the JWT token by re-using our DRF JWT
            if not request.user.is_authenticated:
                user_jwt: tuple = self.authenticate(request)
                if user_jwt:
                    request.user, request.token = user_jwt
        except exceptions.AuthenticationFailed as e:
            response = HttpResponse(
                json.dumps({"errors": [str(e)]}),
                status=401,
                content_type="application/json",
            )
            return response
        return super().dispatch(request, *args, **kwargs)

    def get_context(self, request):
        return GQLContext(request)


class Query(
    base.gql.schema.Query, snippet.gql.schema.Query, document.gql.schema.Query, users.gql.schema.Query, graphene.ObjectType,
):
    debug = graphene.Field(DjangoDebug, name="__debug")
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


class Mutation(
    base.gql.schema.Mutation, snippet.gql.schema.Mutation, document.gql.schema.Mutation, users.gql.schema.Mutation, graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
