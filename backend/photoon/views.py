from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import viewsets

class OriginViewset(viewsets.ModelViewSet):
    queryset = OriginImage.objects.all()  
    serializer_class = OriginSerializer  

class ResultViewset(viewsets.ModelViewSet):
    queryset = ResultImage.objects.all()  
    serializer_class = ResultSerializer    

class StyleViewset(viewsets.ModelViewSet):
    queryset = Style.objects.all()  
    serializer_class = StyleSerializer  

class SpeechViewset(viewsets.ModelViewSet):
    queryset = SpeechBubble.objects.all()  
    serializer_class = SpeechSerializer  