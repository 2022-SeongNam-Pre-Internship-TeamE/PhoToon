import torchvision.transforms as T
from PIL import Image
import numpy as np
import io
from config.settings import AWS_REGION
from config.settings import AWS_STORAGE_BUCKET_NAME
from s3bucket.s3_connection import s3_connection

def ai_execute(email, origin_image, style, background, uuid):
    """
    style: 만화 선택: 1,2,3 : 1: 신카이_v1, 2:신카이_v2, 3:미야자키_v2
    background: 배경선택 여부 : 1,2,3 : 1: 인물만, 2: 배경만, 3: 둘다.
    """

    origin_image = './images/face2.jpg'
    
    def get_prediction(img, threshold):
        transform = T.Compose([T.ToTensor()])
        img = transform(img)

        pred = model([img])
        pred_score = list(pred[0]['scores'].detach().numpy())

        pred_t = [pred_score.index(x) for x in pred_score if x>threshold][-1]

        masks = (pred[0]['masks']>0.5).detach().cpu().numpy()

        pred_class = [COCO_INSTANCE_CATEGORY_NAMES[i] for i in list(pred[0]['labels'].numpy())]
        pred_boxes = [[(i[0], i[1]), (i[2], i[3])] for i in list(pred[0]['boxes'].detach().numpy())]

        masks = masks[:pred_t+1]
        pred_boxes = pred_boxes[:pred_t+1]
        pred_class = np.array(pred_class[:pred_t+1])
        return masks, pred_boxes, pred_class
    
    is_converted = False
    try:
        masks, pred_boxes, pred_class = get_prediction(origin_image,0.7)
    except Exception as e:
        return "파일 없음"
    
    segmentation = np.zeros_like(masks[0])
    for i, value in enumerate(pred_class):
        if value =='person':
            segmentation += masks[i]
    
    segmentation = segmentation[0][:,:,np.newaxis]
    person_image = origin_image * segmentation
    landscape_image = origin_image * (1-segmentation)
    
    tf = T.ToTensor()
    pre_image = (tf(origin_image)*2 - 1).unsqueeze(0)

    if style == 1:
        output = shinkaiv1_generator(pre_image).detach()
    elif style == 2:
        output = shinkaiv2_generator(pre_image).detach()
    elif style == 3:
        output = hayao_v2_generator(pre_image).detach()
    else:
        img_pil = Image.fromarray(origin_image)
        buffer_ = io.BytesIO()
        img_pil.save(buffer_, format='PNG')
        buffer_.seek(0)
        img_byte = buffer_.read()
        return (img_byte, style, background, is_converted, uuid)
    
    output = ( (((output[0].permute((1,2,0)).numpy()+1)/2)*255).astype('uint8') )
    
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
    
    result_image = result_image.astype('uint8')
    img_pil = Image.fromarray(result_image)
    buffer_ = io.BytesIO()
    img_pil.save(buffer_, format='PNG')
    buffer_.seek(0)
    img_byte = buffer_.read()

    s3_url = f'result/{email}/{uuid}.jpg'
    s3_connection.put_object(Body=img_byte, Bucket=AWS_STORAGE_BUCKET_NAME, 
              Key = s3_url)
    result_url = f'https://{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{s3_url}'
    

    return (img_byte, style, background, is_converted, result_url)


