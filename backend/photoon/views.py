from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import viewsets

class OriginViewset(viewsets.ModelViewSet):
    queryset = OriginImage.objects.all()  
    serializer_class = OriginSerializer  