# -*- coding: utf-8 -*-

from django.contrib import admin
from django.urls import path
#from graphene_django.views import GraphQLView
from graphene_file_upload.django import FileUploadGraphQLView

urlpatterns = [
    path('admin/', admin.site.urls),
]

import sys
from django.contrib import admin
from django.conf import settings
from django.urls import include, path, re_path
from django.conf.urls.static import static


from django.views.decorators.csrf import csrf_exempt


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .schema import JWTGraphQLView

urlpatterns = [
    # re_path(r"^jwt/token/$", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # re_path(r"^jwt/token/refresh/$", TokenRefreshView.as_view(), name="token_refresh"),

    re_path(r"^admin/?", admin.site.urls),
    # re_path(r"^/", include("base.urls")),
    path(
        "graphql",
        csrf_exempt(
            FileUploadGraphQLView.as_view(graphiql=settings.GRAPHQL_ENABLE_PLAYGROUND)
        ),
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# if settings.DEBUG and sys.argv[1] == "runserver":
#     import debug_toolbar
#
#     urlpatterns += [
#         re_path(r"^__debug__/", include(debug_toolbar.urls)),
#     ]
