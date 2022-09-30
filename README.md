# Photoon 
<div align="center">
사진을 만화 그림체로 변경해주는 서비스 <br>
만화주인공이 되고싶은 어릴적 <b>꿈</b>을 이루어드리겠습니다.
</div>
<hr>

## 1. System Architecture
![image](https://user-images.githubusercontent.com/70627982/193271388-0d63f839-09d1-485c-af35-e7e94f6c19e0.png)


<hr>

## 2. Tech Stack
<div align =center> 
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> 
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=amazon%20ec2&logoColor=black">
  <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=amazon%20s3&logoColor=black">
  <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=amazon%20rds&logoColor=black">
  <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=black">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/django-528DD7?style=for-the-badge&logo=django&logoColor=white">
  <img src="https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray">
  <img src="https://img.shields.io/badge/gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=black">
  <!-- <img src="https://img.shields.io/badge/gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=black">
  <img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white"> -->
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/rabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white">
  <img src="https://img.shields.io/badge/celery-37814A?style=for-the-badge&logo=celery&logoColor=black">
  <!-- <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=black"> -->
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/pytorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white">
  <!-- <img src="https://img.shields.io/badge/google colaboratory-F9AB00?style=for-the-badge&logo=googlecolab&logoColor=black"> -->
  <img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=black">
  <img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=black">
  <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black">
  <img src="https://img.shields.io/badge/Git-73398D?style=for-the-badge&logo=git&logoColor=white">
   <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
</div>
<hr>

## 3. Installation
>### Clone Repository

```
git clone https://github.com/2022-SeongNam-Pre-Internship-TeamE/PhoToon
```

>### Set environment file
<!-- mask_rcnn.pth 설치여부 -->


Path : `/Photoon/backend/config/my_settings.py`  
Django secrect key & MySQL 환경변수
```
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent


MY_SECRET = {
    "SECRET_KEY" : ''
}

MY_DATABASES = {
    'default': {
    	'ENGINE': 'django.db.backends.mysql',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': 'mysql',
        'PORT': '3306',
     }
}
```

Path : `/Photoon/backend/.env`  
S3 bucket 및 MySQL container 환경변수
```
DEBUG=False
AWS_S3_ACCESS_KEY_ID=''
AWS_S3_SECRET_ACCESS_KEY=''
AWS_STORAGE_BUCKET_NAME=''

## RDS 연동 시 하단 부분은 필요없습니다.
## Mysql 컨테이너 연동 시 필요합니다.
MYSQL_DATABASE=
MYSQL_ROOT_PASSWORD=  
TZ=Asia/Seoul
```

Path : `/Photoon/frontend/.env`  
카카오톡 공유하기 환경변수
```
REACT_APP_KAKAO_KEY=''
REACT_APP_IMAGE_URL='https://{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_STORAGE_BUCKET_REGION}.amazonaws.com/'
```

Path : `/Photoon/.env`   
RabbitMQ 환경변수
```
RABBITMQ_HOST=
RABBITMQ_USER=
RABBITMQ_PASSWORD=
RABBITMQ_VHOST=
```

>### Run
```
cd frontend
npm install --legacy-peer-deps
cd ..
docker-compose -f docker-compose.prod.yml up —build
```


<hr>


## 4. ER Diagram
![photoon_erd](https://user-images.githubusercontent.com/70627982/192968756-168aa67c-e4e3-4dd4-8299-897eb37e2b78.png)


<hr>

## 5. API
<details>
<summary>swagger</summary>
<div markdown="1">

<br>
  
<!-- swagger 사진 -->
![image](https://user-images.githubusercontent.com/70627982/192964994-69bb23fe-e88b-4ced-8407-4483b51ee31c.png)
![image](https://user-images.githubusercontent.com/70627982/192965084-34cf7975-cdaa-45a5-914d-79f723017cec.png)
![image](https://user-images.githubusercontent.com/70627982/192965211-5c05658c-49ab-4023-a269-de090abb8f53.png)
![image](https://user-images.githubusercontent.com/70627982/192965269-37d76d65-4cff-442b-9d6f-db60aac2319f.png)
![image](https://user-images.githubusercontent.com/70627982/192965305-8e6b633e-661e-4926-b07c-dd203796fef3.png)

</div>
</details>

<hr>


## 6. Demo
<table  style="text-align: center; width=950px">
    <tbody>
        <tr>
          <th style="text-align: center;">메인 화면</th>
          <th style="text-align: center;">로그인</th>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th><img src="https://user-images.githubusercontent.com/70627982/193301713-d92f57bf-fe98-4e07-9e04-67b81e2c770a.gif"  width="450px" height="450px"/></th>
          <th><img src="https://user-images.githubusercontent.com/70627982/193300976-777f7438-ba12-409f-8629-e552ed661e6e.png"  width="450px" height="450px"/></th>
        </tr>
      </tbody>
      <tbody>
      <tr>
          <th style="text-align: center;">이미지 업로드 & 크롭</th>
          <th style="text-align: center;">말풍선 입력</th>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th><img src="https://user-images.githubusercontent.com/70627982/193301350-85228039-79d2-4823-a711-d5e893e59560.gif"  width="450px" height="450px"/></th>
          <th><img src="https://user-images.githubusercontent.com/70627982/193301447-420b1fc1-88c0-4774-a940-1f006dfed809.gif"  width="450px" height="450px"/></th>
        </tr>
      </tbody>
      <tbody>
      <tr>
          <th style="text-align: center;">옵션 선택</th>
          <th style="text-align: center;">결과 이미지</th>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th><img src="https://user-images.githubusercontent.com/70627982/193304079-7c868028-7279-4c83-b076-46f6c71bb4a6.gif"  width="450px" height="450px"/></th>
          <th><img src="https://user-images.githubusercontent.com/70627982/193304484-e86654b5-338e-449f-802e-0a4348a6618f.png"  width="450px" height="450px"/></th>
        </tr>
      </tbody>
    </table>

<hr>


## 7. Team Member
<table width="950">
    <thead>
    </thead>
    <tbody>
    <tr>
        <th>사진</th>
         <td width="100" align="center">
            <a href="https://github.com/KoneJ">
                <img src="https://avatars.githubusercontent.com/u/86594108?v=4" width="60" height="60">
            </a>
        </td>
        <td width="100" align="center">
            <a href="https://github.com/alswlfl29">
                <img src="https://avatars.githubusercontent.com/u/79428205?v=4" width="60" height="60">
            </a>
        </td>
        <td width="100" align="center">
            <a href="https://github.com/bjo6300">
                <img src="https://avatars.githubusercontent.com/u/70627982?v=4" width="60" height="60">
            </a>
        </td>
        <td width="100" align="center">
            <a href="https://github.com/gmlrude">
                <img src="https://avatars.githubusercontent.com/u/101381901?v=4" width="60" height="60">
            </a>
        </td>
        <td width="100" align="center">
            <a href="https://github.com/Haaein">
                <img src="https://avatars.githubusercontent.com/u/103196409?v=4" width="60" height="60">
            </a>
        </td>
        <td width="100" align="center">
            <a href="https://github.com/changminkim-329">
                <img src="https://avatars.githubusercontent.com/u/59727077?v=4" width="60" height="60">
            </a>
    </tr>
    <tr>
        <th>이름</th>
        <td width="100" align="center">고원준</td>
        <td width="100" align="center">이민지</td>
        <td width="100" align="center">배준일</td>
        <td width="100" align="center">박희경</td>
        <td width="100" align="center">라예진</td>
        <td width="100" align="center">김창민</td>
    </tr>
    <tr>
        <th>역할</th>
        <td width="150" align="center">
            Team Leader<br>
            frontend<br>
        </td>
        <td width="150" align="center">
            frontend<br>
        </td>
        <td width="150" align="center">
            backend<br>
            devops<br>
        </td>
        <td width="150" align="center">
            backend<br>
        </td>
        <td width="150" align="center">
            backend<br>
        </td>
        <td width="150" align="center">
            AI<br>
            frontend<br>
            backend<br>
        </td>
    </tr>
    <tr>
        <th>GitHub</th>
        <td width="100" align="center">
            <a href="https://github.com/KoneJ">
                <img src="http://img.shields.io/badge/KoneJ-green?style=social&logo=github"/>
            </a>
        </td>
        <td width="100" align="center">
            <a href="https://github.com/alswlfl29">
                <img src="http://img.shields.io/badge/alswlfl29-green?style=social&logo=github"/>
            </a>
        </td>
        <td width="100" align="center">
            <a href="https://github.com/bjo6300">  
                <img src="http://img.shields.io/badge/bjo6300-green?style=social&logo=github"/>
            </a>
        </td>
        <td width="100" align="center">
            <a href="https://github.com/gmlrude">
                <img src="http://img.shields.io/badge/gmlrude-green?style=social&logo=github"/>
            </a>
        </td>
        <td width="100" align="center">
            <a href="https://github.com/Haaein">
                <img src="http://img.shields.io/badge/Haaein-green?style=social&logo=github"/>
            </a>
        </td>
         <td width="100" align="center">
            <a href="https://github.com/changminkim-329">
                <img src="http://img.shields.io/badge/changminkim-329-green?style=social&logo=github"/>
            </a>
    </tr>
    </tbody>
</table>
<hr>

## 8. Reference

- [AnimeGan-v2](https://github.com/TachibanaYoshino/AnimeGANv2)

## 9. Copyright
Distributed under the Apache-2.0 License. See `LICENSE` for more information.
