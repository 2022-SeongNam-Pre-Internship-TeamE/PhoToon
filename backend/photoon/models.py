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
    is_deleted = models.BooleanField(default='False')
    image_url = models.CharField(max_length=100, default='') 
