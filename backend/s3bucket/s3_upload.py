import boto3
from s3bucket.s3_connection import s3_connection
from config.settings import *

def s3_upload(status, email, created_at, image):
    try:
        # 업로드 할 파일 / 버킷 이름 / 폴더경로 & 저장할 파일 명칭 
        s3.upload_file(image, AWS_STORAGE_BUCKET_NAME, f"{email}/{status}/{status}{created_at}.jpg")
        
    except Exception as e:
        s3 = s3_connection()
        s3.upload_file(image, AWS_STORAGE_BUCKET_NAME, f"{email}/{status}/{status}{created_at}.jpg")
        # s3.upload_file("./ai_model/images/face2.jpg", AWS_STORAGE_BUCKET_NAME, "origin/face2.jpg") # 테스트 해본 예시 코드
    
