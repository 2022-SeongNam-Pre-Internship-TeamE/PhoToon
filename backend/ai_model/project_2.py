import numpy as np
import matplotlib.pyplot as plt
import photoon_ai as ai
import cv2
from PIL import Image
import io

def imread(path):
    image = cv2.imread(path)
    image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
    image = cv2.resize(image,(512,512))
    return image


path = './images/face2.jpg'

image = imread(path)
plt.imshow(image)
plt.show()

user_id, origin_id, result_image, style, background, is_converted = ai.ai_execute("ckdals","5931391",image,2,1)

data_io = io.BytesIO(result_image)
img = Image.open(data_io)

print('user_id: ',user_id)
print('origin_id: ',origin_id)
print('background: ',background)
print('is_converted: ',is_converted)
print('img_byte 일부', result_image[:10])

img.show()