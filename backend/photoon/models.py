from django.db import models
from datetime import datetime

class BaseModel(models.Model):  # base class should subclass 'django.db.models.Model'

    created_at = models.DateTimeField(default=datetime.now) # 해당 레코드 생성시 현재 시간 자동저장
    updated_at = models.DateTimeField(auto_now=True) # 해당 레코드 갱신시 현재 시간 자동저장

    class Meta:
        abstract=True # 상속

class OriginImage(BaseModel):
    origin_id = models.AutoField(primary_key=True)  # pk
    user_id = models.IntegerField(default='') # fk  // cascade 할 에정
    is_deleted = models.BooleanField(null=False, default='False')
    image_url = models.CharField(max_length=100, null=False) 

class ResultImage(BaseModel):
    result_id = models.AutoField(primary_key=True)  # pk
    origin_id = models.IntegerField(default='') # fk  // cascade 할 에정
    user_id = models.IntegerField(default='') # fk  // cascade 할 에정
    style = models.IntegerField(default='') # fk  // cascade 할 에정
    speech_bubble = models.IntegerField(default='') # fk  // cascade 할 에정
    text = models.CharField(max_length=10, default='') # fk  // cascade 할 에정
    background = models.IntegerField(null=False, default='')
    is_converted = models.BooleanField(null=False, default='False')
    is_deleted = models.BooleanField(null=False, default='False')
    image_url = models.CharField(null=False, max_length=100) 

class Style(BaseModel):
    style = models.AutoField(primary_key=True)  # pk

class SpeechBubble(BaseModel):
    speech_bubble = models.AutoField(primary_key=True)  # pk
    text = models.CharField(max_length=10, null=False, default='')