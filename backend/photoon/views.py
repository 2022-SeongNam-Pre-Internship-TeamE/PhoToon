from ai_model.photoon_ai_execute import ai_execute
from s3bucket.s3_upload import s3_upload
from s3bucket.s3_connection import s3_connection
from config.settings import *
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.shortcuts import render, get_object_or_404
import jwt
from config.settings import SECRET_KEY
from rest_framework.permissions import IsAuthenticated
from .pagination import ImagesPageNumberPagination

import numpy as np
from PIL import Image

from PIL import Image
import numpy as np
import io
import  os

@csrf_exempt
@api_view(['POST'])
def TransferAPIView(request):
    data = JSONParser().parse(request)
    email = data['email']
    uuid = data['uuid']
    style = data['style']
    background = data['background']
    text = data['text']

    try:
        image = data['image']
        shape = data['shape']
        image = np.array(image)
        image = np.reshape(image,shape)

        image = image.astype('uint8')
    except Exception as e:
        image = None;

    if request.method == 'POST':
        
        img_byte, style, background, is_converted, result_url = ai_execute(email, image, style, background, uuid,text)
        return Response({
            'datas':'성공!!!',
        }, status=status.HTTP_201_CREATED)
        

class RegisterAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # jwt 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "register successs",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )

            # jwt 토큰 => 쿠키에 저장
            # httponly -> javascript에서 쿠키 조회 불가능 XSS로부터 안전 그러나 csrf 해야함
            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)

            return res
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def S3APIView(request):
    data = JSONParser().parse(request)
    email = data['email']
    condition = data['condition'] # origin인지 result인지
    uuid = data['uuid']
    image = data['image'] # byte file
    shape = data['shape']
    text = data['text']

    image = np.array(image)
    image = np.reshape(image,shape)

    image = image.astype('uint8')
    image_pil = Image.fromarray(image)
    print("문자자:")
    print(text)

    buffer_ = io.BytesIO()
    image_pil.save(buffer_, format='PNG')
    buffer_.seek(0)
    image = buffer_.read()
    

    if request.method == 'POST':
        try:
            s3_upload(condition, email, uuid, image)
            print('success!!')
            # return Response에 어떤거 들어가야할지 연동해보고 결정
            return Response({"status" : "성공"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            
            return Response(status=status.HTTP_400_BAD_REQUEST)       

class AuthAPIView(APIView):
    # 유저 정보 확인
    def get(self, request):
        try:
            # access token을 decode 해서 유저 id 추출 => 유저 식별
            access = request.COOKIES['access']
            payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
            pk = payload.get('user_id')
            user = get_object_or_404(User, pk=pk)
            serializer = UserSerializer(instance=user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except(jwt.exceptions.ExpiredSignatureError):
            # 토큰 만료 시 토큰 갱신
            data = {'refresh': request.COOKIES.get('refresh', None)}
            serializer = TokenRefreshSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                access = serializer.data.get('access', None)
                refresh = serializer.data.get('refresh', None)
                payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
                pk = payload.get('user_id')
                user = get_object_or_404(User, pk=pk)
                serializer = UserSerializer(instance=user)
                res = Response(serializer.data, status=status.HTTP_200_OK)
                res.set_cookie('access', access)
                res.set_cookie('refresh', refresh)
                return res
            raise jwt.exceptions.InvalidTokenError
            
        except jwt.exceptions.InvalidTokenError:

            # 사용 불가능한 토큰일 때
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # 로그인
    def post(self, request):
        # 유저 인증

        user = authenticate(
            email=request.data.get("email"), password=request.data.get("password")
        )
        # 이미 회원가입 된 유저일 때
        if user is not None:
            serializer = UserSerializer(user)
            # jwt 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "login success",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            # jwt 토큰 => 쿠키에 저장
            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)
            return res
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # 로그아웃
    def delete(self, request):
        # 쿠키에 저장된 토큰 삭제 => 로그아웃 처리
        response = Response({
            "message": "Logout success"
        }, status=status.HTTP_202_ACCEPTED)

        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response

# jwt 토근 인증 확인용 뷰셋
# Header - Authorization : Bearer <발급받은토큰>
class UserViewSet(viewsets.ModelViewSet):
    """
    User
    ---
    사용자를 생성합니다.
    """
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class OriginViewset(viewsets.ModelViewSet):
    queryset = OriginImage.objects.all()
    serializer_class = OriginSerializer

    def destroy(self, request, *args, **kwargs):
        origin = self.get_object()
        origin.is_deleted = True # 원본 이미지 is_deleted = true
        result_origin_id = ResultViewset.get_origin_id(origin.origin_id) # origin_id에 따른 result 클래스 객체 가져오기
        result_origin_id.is_deleted = True # result table의 is_deleted = true
        origin.save()
        result_origin_id.save()

        return Response(data='change is_deleted = True')

class ResultViewset(viewsets.ModelViewSet):
    queryset = ResultImage.objects.all()
    serializer_class = ResultSerializer
    pagination_class = ImagesPageNumberPagination 

    def get_queryset(self):
        results = ResultImage.objects.filter(is_deleted = False)
        return results

    def get(self, request, *args, **kwargs):
        results = self.get_queryset()
        serializer = ResultSerializer(results, many=True)
        return Response(serializer.data)

    def get_origin_id(origin_origin_id):
        return ResultImage.objects.get(origin_id=origin_origin_id)

class StyleViewset(viewsets.ModelViewSet):
    queryset = Style.objects.all()
    serializer_class = StyleSerializer


class SpeechViewset(viewsets.ModelViewSet):
    queryset = SpeechBubble.objects.all()
    serializer_class = SpeechSerializer

