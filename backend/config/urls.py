from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include, url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('photoon.urls')),
    url('', include('django_prometheus.urls')),

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)