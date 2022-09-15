import numpy as np
import matplotlib.pyplot as plt
import photoon_ai as ai
import cv2

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


print('user_id: ',user_id)
print('origin_id: ',origin_id)
print('background: ',background)
print('is_converted: ',is_converted)

plt.imshow(result_image)
plt.show()