import jwt
from django.contrib.auth import authenticate
from django.shortcuts import render, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer

from .serializers import *
from .models import *
from rest_framework import viewsets, status

from config.settings import SECRET_KEY


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


# 회원가입
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
                    'user': serializer.data,
                    "message": "register success",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            # jwt 토큰 -> 쿠키에 저장
            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)

            return res
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 로그인/로그아웃
class AuthAPIView(APIView):
    def get(self, request):
        try:
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

        except(jwt.exceptions.InvalidTokenError):
            # 사용 불가능한 토큰일 때
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request):
    #     # 유저 인증
    #     user = authenticate(
    #         email=request.data.get("email"), password=request.data.get("password")
    #     )
    #     # 이미 회원가입 된 유저일 때
    #     if user is not None:
    #         serializer = UserSerializer(user)
    #         # jwt 토큰 접근
    #         token = TokenObtainPairSerializer.get_token(user)
    #         refresh_token = str(token)
    #         access_token = str(token.access_token)
    #         res = Response(
    #             {
    #                 "user": serializer.data,
    #                 "message": "login success",
    #                 "token": {
    #                     "access": access_token,
    #                     "refresh": refresh_token,
    #                 },
    #             },
    #             status=status.HTTP_200_OK,
    #         )
    #         # jwt 토큰 => 쿠키에 저장
    #         res.set_cookie("access", access_token, httponly=True)
    #         res.set_cookie("refresh", refresh_token, httponly=True)
    #         return res
    #     else:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)

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
# Header - Authorization : JWT <발급받은토큰>
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
