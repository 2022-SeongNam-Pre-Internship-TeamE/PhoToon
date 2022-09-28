from django.urls import include, path, re_path
from .views import *
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="PhoToon API",
        default_version='v1', # API 버전
        description='''
        사용자의 사진을 만화 그림체로 변경해주는 서비스
        ''',
        terms_of_service="",
        contact=openapi.Contact(name='', email='bjo6300@naver.com'),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
router.register(r'origins', OriginViewset)
router.register(r'results', ResultViewset)
router.register(r'styles', StyleViewset)
router.register(r'users', UserViewSet) # header에 Authorize : Bearer <access 토큰> ### 테스트용

# postman으로 router에 있는 것을 테스트할 때 '/' 유무 안 중요함
# postman으로 urlpatterns에 있는 것을 테스트할 때 '/' 유무 중요함
urlpatterns = [
    path('', include(router.urls)),
    path("join", RegisterAPIView.as_view()), # post - 회원가입
    path("auth", AuthAPIView.as_view()), # post - 로그인
    path("auth/refresh", TokenRefreshView.as_view()), # jwt 토큰 재발급

    path("s3", S3APIView),

    path("style_transfer", TransferAPIView),

    # drf-yasg
    path('swagger<str:format>', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
