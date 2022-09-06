from rest_framework import serializers
from .models import OriginImage

class OriginSerializer(serializers.ModelSerializer):
    class Meta:
        model = OriginImage
        fields = '__all__'