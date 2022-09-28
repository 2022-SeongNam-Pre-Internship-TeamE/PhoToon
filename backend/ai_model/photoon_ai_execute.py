# import torchvision.transforms as T
import numpy as np
import io
from config.settings import AWS_REGION
from config.settings import AWS_STORAGE_BUCKET_NAME
from s3bucket.s3_connection import s3_connection
from .ai_init import *
from .ai_sub_module import get_prediction, patch_bubble
import face_recognition
from PIL import Image
from config.celery import *

@app.task(name="photoon_ai_execute")
def photoon_ai_execute(email, origin_image, style, background, uuid, text):
    """
    style: 만화 선택: 1,2,3 : 1: 신카이마코토, 2:미야자키, 3:웹툰
    background: 배경선택 여부 : 1,2,3 : 1: 인물만, 2: 배경만, 3: 둘다.
    """

    if type(style) == type('라'):
        style = int(style)

    if type(background) == type('라'):
        background = int(background)

    # origin_image = './images/face2.jpg'
    
    s3 = s3_connection()
    buf = io.BytesIO()

    try:
        origin_image = s3.download_fileobj(Bucket=AWS_STORAGE_BUCKET_NAME, Key=f'{email}/origin/{uuid}.jpg', Fileobj=buf)
        # f'{email}/origin/{uuid}.jpg'
    except Exception as e:
        print(e)

    buf.seek(0)
    image_pil = Image.open(buf)
    origin_image = np.array(image_pil)
    print(origin_image.dtype)
        
    #####################################
    face_locations = face_recognition.face_locations(origin_image)
    try:
        y1, x2, y2, x1 = face_locations[0]
    except Exception as e:
        x1 = origin_image.shape[1]//2 - origin_image.shape[1]//4
        x2 = origin_image.shape[1]//2 + origin_image.shape[1]//4
        y1 = origin_image.shape[0]//2 - origin_image.shape[0]//6
        y2 = origin_image.shape[0]//2 + origin_image.shape[0]//6

    print("존명!!!!")
    is_converted = False
    try:
        masks, pred_boxes, pred_class = get_prediction(origin_image,0.7)
    except Exception as e:
        print("나나나")
        print(e)
        return "파일 없음"
    
    segmentation = np.zeros_like(masks[0])
    for i, value in enumerate(pred_class):
        if value =='person':
            segmentation += masks[i]
    print("크라이시스")
    segmentation = segmentation[0][:,:,np.newaxis]
    person_image = origin_image * segmentation
    landscape_image = origin_image * (1-segmentation)
    
    tf = T.ToTensor()
    pre_image = (tf(origin_image)*2 - 1).unsqueeze(0)

    print("스타일:",style)
    if style == 1:
        output = shinkaiv1_generator(pre_image).detach()
    elif style == 2:
        output = shinkaiv2_generator(pre_image).detach()
    elif style == 3:
        output = webtoon_v2_generator(pre_image).detach()
    else:
        img_pil = Image.fromarray(origin_image)
        buffer_ = io.BytesIO()
        img_pil.save(buffer_, format='PNG')
        buffer_.seek(0)
        img_byte = buffer_.read()
        print("레고")
        return (img_byte, style, background, is_converted, uuid)
    
    print("아이스 창")
    output = ( (((output[0].permute((1,2,0)).numpy()+1)/2)*255).astype('uint8') )
    
    print("페이커")
    #####
    h_,w_,d = np.array(output.shape) - segmentation.shape
    output = output[:-h_,:,:] if h_ >= 1 else output
    output = output[:,:-w_,:] if w_ >= 1 else output
    
    segmentation = segmentation[:-h_,:,:] if h_ <= -1 else segmentation
    segmentation = segmentation[:,:-w_,:] if w_ <= -1 else segmentation
    #####

    # 배경 설정
    if background == 1:
        output = output * segmentation
        result_image = output + landscape_image
    elif background == 2:
        output = output * (1-segmentation)
        result_image = output + person_image
    elif background == 3: 
        result_image = output
    else:
        img_pil = Image.fromarray(origin_image)
        buffer_ = io.BytesIO()
        img_pil.save(buffer_, format='PNG')
        buffer_.seek(0)
        img_byte = buffer_.read()
        return (img_byte, style, background, is_converted, uuid)
    
    is_converted = 1
    print("드래곤창")
    
    result_image = result_image.astype('uint8')
    
    img_pil = patch_bubble(result_image,x1,y1,x2,y2,'left',text)
    
    buffer_ = io.BytesIO()
    img_pil.save(buffer_, format='PNG')
    buffer_.seek(0)
    img_byte = buffer_.read()
    print("헬로 창민")

    s3_url = f'{email}/result/{uuid}.jpg'

    print(s3_url)
    #s3 = s3_connection()
    s3.put_object(Body=img_byte, Bucket=AWS_STORAGE_BUCKET_NAME, 
              Key = s3_url)
    result_url = f'https://{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{s3_url}'
    

    return result_url



