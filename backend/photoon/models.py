from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from datetime import datetime


class BaseModel(models.Model):  # 수정시간, 생성시간 모델
    created_at = models.DateTimeField(default=datetime.now)  # 해당 레코드 생성시 현재 시간 자동저장
    updated_at = models.DateTimeField(auto_now=True)  # 해당 레코드 갱신시 현재 시간 자동저장

    class Meta:
        abstract = True  # 상속


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

    # 관리자 생성
    def create_superuser(self, email, password=None):
        user = self.create_user(
            email=email,
            password=password
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    id = models.AutoField(primary_key=True)  # pk
    email = models.EmailField(default='', max_length=100, null=False, blank=False, unique=True)
    is_deleted = models.BooleanField(default=False, null=False)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    # True를 반환하여 권한이 있는 것을 알림
    # Object 반환 시 해당 Object로 사용 권한을 확인하는 절차가 필요함
    def has_perm(self, perm, obj=None):
        return True

    # True를 반환하여 주어진 App의 Model에 접근 가능하도록 함 -> 없으면 접근 권한 없다고 뜬다.
    def has_module_perms(self, app_label):
        return True

    # True 반환 시 Django의 관리자 화면에 로그인 가능
    @property
    def is_staff(self):
        return self.is_admin

    def __str__(self):
        id = str(self.id)
        return id


class OriginImage(BaseModel):
    origin_id = models.AutoField(primary_key=True)  # pk
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False)  # fk
    is_deleted = models.BooleanField(null=False, default=False)
    image_url = models.CharField(max_length=100, null=False)

    def __str__(self):
        origin_id = str(self.origin_id)
        return origin_id


class Style(BaseModel):
    style = models.AutoField(primary_key=True)  # pk

    def __str__(self):
        style = str(self.style)
        return style


class SpeechBubble(BaseModel):
    speech_bubble = models.AutoField(primary_key=True)  # pk
    text = models.CharField(max_length=10, null=True)

    def __str__(self):
        speech_bubble = str(self.speech_bubble)
        return speech_bubble


class ResultImage(BaseModel):
    result_id = models.AutoField(primary_key=True)  # pk
    origin_id = models.OneToOneField(OriginImage, on_delete=models.CASCADE, null=False)  # 1:1 관계
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False)  # fk
    style = models.ForeignKey(Style, on_delete=models.CASCADE, null=False)  # fk
    speech_bubble = models.ForeignKey(SpeechBubble, on_delete=models.CASCADE, null=True)  # fk
    # text = models.ForeignKey(SpeechBubble, on_delete=models.CASCADE, null=True)  # fk
    background = models.IntegerField(null=False, default='')
    is_converted = models.BooleanField(null=False, default=False)
    is_deleted = models.BooleanField(null=False, default=False)
    image_url = models.CharField(null=False, max_length=100)

    def __str__(self):
        result_id = str(self.result_id)
        return result_id


