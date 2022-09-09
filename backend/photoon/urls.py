from django.urls import include, path
# from rest_framework_simplejwt.views import TokenRefreshView

from .views import *
from rest_framework import routers
from rest_framework import permissions

router = routers.DefaultRouter()
router.register(r'api/v1/origins', OriginViewset)
router.register(r'api/v1/results', ResultViewset)
router.register(r'api/v1/styles', StyleViewset)
router.register(r'api/v1/speech-bubbles', SpeechViewset)

router.register(r'api/v1/list', UserViewSet)  # 유저리스트 (테스트용)

urlpatterns = [
    path('', include(router.urls)),
    path('api/v1/join', RegisterAPIView.as_view()),
    path('api/v1/auth', AuthAPIView.as_view()),
]
