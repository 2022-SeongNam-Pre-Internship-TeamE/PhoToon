from django.urls import include, path
from .views import *
from rest_framework import routers
from rest_framework import permissions

router = routers.DefaultRouter()
router.register(r'api/v1/origins', OriginViewset)

urlpatterns = [
    path('', include(router.urls)),
]