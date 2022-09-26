# import torchvision.transforms as T
from PIL import Image
import numpy as np
import io
from config.settings import AWS_REGION
from config.settings import AWS_STORAGE_BUCKET_NAME
from s3bucket.s3_connection import s3_connection
from .ai_init import *
import os
import face_recognition
from PIL import Image, ImageDraw, ImageFont


def ai_execute(email, origin_image, style, background, uuid, text):
    """
    style: 만화 선택: 1,2,3 : 1: 신카이마코토, 2:미야자키, 3:웹툰
    background: 배경선택 여부 : 1,2,3 : 1: 인물만, 2: 배경만, 3: 둘다.
    """

    # origin_image = './images/face2.jpg'
    
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
    
    def patch_bubble(image, x1, y1, x2, y2, select, text=' '):
        path = 'ai_model/images/speech_left2.png'
        speech_bubble = Image.open(path)
        shape = image.shape
        height = shape[0]
        width = shape[1]
        length = 5
        ratio = 5
        text = text if len(text) != 0 else ' '

        plus_height = (height//length)
        plus_height = plus_height+1 if plus_height % 2 == 1 else plus_height
        plus_width = (width//length)
        plus_width = plus_width+1 if plus_width % 2 == 1 else plus_width

        #######
        x1 = x1 + (width//(ratio*2))
        x2 = x2 + (width//(ratio*2))
        y1 = y1 + (height//(ratio*2))
        y2 = y2 + (height//(ratio*2))

        #######
        image[0:length,:,:] = 0
        image[:,0:length,:] = 0
        image[height-length:height,:,:] = 0
        image[:,width-length:width,:] = 0

        if select == 'left':
            resize_y = int(y1//(1.3))
            resize_x = int((x2-x1)*3/2)#(x1+(x2-x1)//2)

            resize_x += int((15/34) * (len(text)/(resize_x/resize_y)) * (4000/resize_x)) 
            b_height = height + plus_height
            b_width = width + plus_width
            background_white = np.full((b_height,b_width,3),255,dtype='uint8')
            background_white[(b_height - height)//2:b_height-(b_height - height)//2, (b_width - width)//2:b_width-(b_width - width)//2,:] = image

            image_pil = Image.fromarray(background_white)

            if not(not text or text.isspace()):

                speech_bubble_pil = setBubbleWithText(speech_bubble,text,resize_x,resize_y)
                image_pil.paste(speech_bubble_pil,(max(0,(x1+(x2-x1)//2)-resize_x),10),speech_bubble_pil)
            return image_pil
        
    def setBubbleWithText(speech_bubble, msg, width,height):
        def round2(num):
            #return int(num) + (-1 if num - int(num) >= 0.5 else 0)
            return int(num) -1

        W, H = (int(width//(1.5)),int(height//(1.5)))

        msg = msg
        msg_len = len(msg)
        if msg_len < 3:
            msg_len =  (width//height)+1
        if msg_len > 4:

            msg_len -= ( round2((24/33)*(msg_len)/(W/H)) - 2 )


        im = Image.new("RGBA",(W,H),)
        font = ImageFont.truetype("ai_model/font/TmoneyRoundWindExtraBold.ttf", W//msg_len)
        draw = ImageDraw.Draw(im)
        w, h = draw.textsize(msg,font=font)

        draw.text(((W-w)/2,(H-h)/2), msg, fill="black",font=font)

        speech_bubble = speech_bubble.resize((width,height))

        position_x = speech_bubble.size[0]//2 - im.size[0]//2
        position_y = speech_bubble.size[1]//2 - int(im.size[1]//(1.5))

        speech_bubble.paste(im,(position_x,position_y),im)

        return speech_bubble
        
    #####################################
    face_locations = face_recognition.face_locations(origin_image)
    try:
        y1, x2, y2, x1 = face_locations[0]
    except Exception as e:
        x1 = origin_image.shape[1]//2 - origin_image.shape[1]//4
        x2 = origin_image.shape[1]//2 + origin_image.shape[1]//4
        y1 = origin_image.shape[0]//2 - origin_image.shape[0]//6
        y2 = origin_image.shape[0]//2 + origin_image.shape[0]//6

    
    is_converted = False
    try:
        masks, pred_boxes, pred_class = get_prediction(origin_image,0.7)
    except Exception as e:
        print(e)
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
        output = webtoon_v2_generator(pre_image).detach()
    else:
        img_pil = Image.fromarray(origin_image)
        buffer_ = io.BytesIO()
        img_pil.save(buffer_, format='PNG')
        buffer_.seek(0)
        img_byte = buffer_.read()
        return (img_byte, style, background, is_converted, uuid)
    
    output = ( (((output[0].permute((1,2,0)).numpy()+1)/2)*255).astype('uint8') )
    
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
    
    result_image = result_image.astype('uint8')
    
    img_pil = patch_bubble(result_image,x1,y1,x2,y2,'left',text)
    
    buffer_ = io.BytesIO()
    img_pil.save(buffer_, format='PNG')
    buffer_.seek(0)
    img_byte = buffer_.read()

    s3_url = f'{email}/result/{uuid}.jpg'
    s3 = s3_connection()
    s3.put_object(Body=img_byte, Bucket=AWS_STORAGE_BUCKET_NAME, 
              Key = s3_url)
    result_url = f'https://{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{s3_url}'
    

    return (result_image, style, background, is_converted, result_url)



