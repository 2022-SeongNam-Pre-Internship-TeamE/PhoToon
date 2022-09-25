import boto3
from config.settings import *

def s3_connection():
    try:
        s3 = boto3.client(
            service_name = 's3',
            region_name = AWS_REGION,
            aws_access_key_id = AWS_S3_ACCESS_KEY_ID,
            aws_secret_access_key = AWS_S3_SECRET_ACCESS_KEY
        )
    except Exception as e:
        print(e)
        
    else:
        print("s3 bucket connected!")
        return s3
    