from django.urls import include, path
from .views import *
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'api/v1/origins', OriginViewset)
router.register(r'api/v1/results', ResultViewset)
router.register(r'api/v1/styles', StyleViewset)
router.register(r'api/v1/speech-bubbles', SpeechViewset)
router.register(r'api/v1/list', UserViewSet) # header에 Authorize : Bearer <acess 토큰>

urlpatterns = [
    path('', include(router.urls)),
    path("api/v1/register/", RegisterAPIView.as_view()), # post - 회원가입
    path("api/v1/auth/", AuthAPIView.as_view()), # post - 로그인
    path("api/v1/auth/refresh/", TokenRefreshView.as_view()), # jwt 토큰 재발급
]
