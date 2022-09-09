from django.urls import include, path
from .views import *
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'api/v1/origins', OriginViewset)
router.register(r'api/v1/results', ResultViewset)
router.register(r'api/v1/styles', StyleViewset)
router.register(r'api/v1/speech-bubbles', SpeechViewset)
router.register('list', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("register/", RegisterAPIView.as_view()), # post - 회원가입
    path("auth/", AuthAPIView.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view()), # jwt 토큰 재발급
]
