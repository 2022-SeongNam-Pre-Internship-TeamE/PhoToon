from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('photoon.urls')),
    path('api/v1/auth', TokenObtainPairView.as_view(), name="Login Api"),
    path('api/v1/auth/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    #path('verify/', TokenVerifyView.as_view(), name='token_verify'),
]
