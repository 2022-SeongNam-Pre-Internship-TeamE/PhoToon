from rest_framework import serializers
from .models import *


class OriginSerializer(serializers.ModelSerializer):
    class Meta:
        model = OriginImage
        fields = '__all__'


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultImage
        fields = '__all__'


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = '__all__'


class SpeechSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpeechBubble
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

    class Meta:
        model = User
        fields = '__all__'


