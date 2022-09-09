from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from datetime import datetime


class BaseModel(models.Model):  # base class should subclass 'django.db.models.Model'

    created_at = models.DateTimeField(default=datetime.now) # 해당 레코드 생성시 현재 시간 자동저장
    updated_at = models.DateTimeField(auto_now=True) # 해당 레코드 갱신시 현재 시간 자동저장

    class Meta:
        abstract=True # 상속

class UserManager(BaseUserManager):
    # 일반 유저 생성
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('must have user email')
        user = self.model(
            email=self.normalize_email(email)  # 중복 최소화를 위한 정규화
        )
        user.set_password(password)  # django에서 제공하는 password 설정 함수
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(
            email=email,
            password=password
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(default='', max_length=100, null=False, blank=False, unique=True)
    is_deleted = models.BooleanField(default=False, null=False)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

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
