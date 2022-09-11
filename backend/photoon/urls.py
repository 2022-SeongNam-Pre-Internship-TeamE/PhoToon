from django.urls import include, path
from .views import *
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'origins', OriginViewset)
router.register(r'results', ResultViewset)
router.register(r'styles', StyleViewset)
router.register(r'speech-bubbles', SpeechViewset)
router.register(r'users', UserViewSet) # header에 Authorize : Bearer <access 토큰> ### 테스트용

# postman으로 router에 있는 것을 테스트할 때 '/' 유무 안 중요함
# postman으로 urlpatterns에 있는 것을 테스트할 때 '/' 유무 중요함
urlpatterns = [
    path('', include(router.urls)),
    path("join", RegisterAPIView.as_view()), # post - 회원가입
    path("auth", AuthAPIView.as_view()), # post - 로그인
    path("auth/refresh", TokenRefreshView.as_view()), # jwt 토큰 재발급
]
