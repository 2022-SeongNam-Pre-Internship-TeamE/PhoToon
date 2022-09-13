import torch
import cv2
import matplotlib.pyplot as plt
import time
from PIL import Image
import torchvision.transforms as T
import torchvision
import numpy as np
from torch import nn
import torch.nn.functional as F
import face_recognition
from torchsummary import summary


# 이미지 불러오기
def imread(path):
    image = cv2.imread(path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (512, 512))
    return image


path = './images/face2.jpg'
image = imread(path)
plt.imshow(image)
# plt.show()

# segmentation weight파일 불러오기
# Mask_RCNN을 사용해서 인물이랑 배경을 분리
detectron = torch.load('./weight/mask_rcnn.pth', map_location=torch.device('cpu'))

model = torchvision.models.detection.maskrcnn_resnet50_fpn(pretrained=True)
model.eval()
COCO_INSTANCE_CATEGORY_NAMES = [
    '__background__', 'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus',
    'train', 'truck', 'boat', 'traffic light', 'fire hydrant', 'N/A', 'stop sign',
    'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
    'elephant', 'bear', 'zebra', 'giraffe', 'N/A', 'backpack', 'umbrella', 'N/A', 'N/A',
    'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball',
    'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard', 'tennis racket',
    'bottle', 'N/A', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl',
    'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza',
    'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed', 'N/A', 'dining table',
    'N/A', 'N/A', 'toilet', 'N/A', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',
    'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'N/A', 'book',
    'clock', 'vase', 'scissors', 'teddy bear', 'hair drier', 'toothbrush'
]


def get_prediction(img, threshold):
    transform = T.Compose([T.ToTensor()])
    img = transform(img)

    pred = model([img])
    pred_score = list(pred[0]['scores'].detach().numpy())
    print(pred_score)
    for i in pred_score:
        print(i)
    pred_t = [pred_score.index(x) for x in pred_score if x > threshold][-1]
    print(pred_t)
    print(pred[0]['masks'].shape)
    print((pred[0]['masks'] > 0.5).shape)

    masks = (pred[0]['masks'] > 0.5)[0].detach().cpu().numpy()
    print(masks.shape)
    plt.imshow(masks[0])
    # plt.show()
    print(np.unique(masks))

    pred_class = [COCO_INSTANCE_CATEGORY_NAMES[i] for i in list(pred[0]['labels'].numpy())]
    pred_boxes = [[(i[0], i[1]), (i[2], i[3])] for i in list(pred[0]['boxes'].detach().numpy())]

    print(masks)
    print(np.unique(masks))
    print(masks.shape)
    masks = masks[:pred_t + 1]
    print(masks.shape)
    print(np.unique(masks))
    pred_boxes = pred_boxes[:pred_t + 1]
    print(pred_class)
    pred_class = pred_class[:pred_t + 1]
    return masks, pred_boxes, pred_class


masks, pred_boxes, pred_class = get_prediction(image, 0.7)

segmenation = masks[0][:, :, np.newaxis]

person_image = image * segmenation
landscape_image = image * (1 - segmenation)

plt.subplot(1, 2, 1)
plt.title(pred_class[0])
plt.imshow(person_image)

plt.subplot(1, 2, 2)
plt.imshow(landscape_image)
# plt.show()

# Face Detection
import face_recognition

face_locations = face_recognition.face_locations(image)

# face_locations

try:
    y1, x2, y2, x1 = face_locations[0]

    cropped_face = image[y1:y2, x1:x2, :]

    plt.imshow(cropped_face)
    # plt.show()
except Exception as e:
    pass


# AnimeV2
class Generator(nn.Module):
    def __init__(self):
        super().__init__()

        self.conv1 = nn.Conv2d(3, 64, 7, 1, padding=3)
        self.batch_norm1 = nn.BatchNorm2d(64)
        # self.relu = nn.ReLU()

        self.down_conv_layer1 = self.down_conv(64)
        self.down_conv_layer2 = self.down_conv(128)

        self.res_block_layer = self.res_block()

        self.up_conv_layer1 = self.up_conv(256)
        self.up_conv_layer2 = self.up_conv(128)

        self.conv2 = nn.Conv2d(64, 3, 7, 1, padding=3)

        self.tanh = nn.Tanh()

    def forward(self, x):
        x = self.conv1(x)
        x = self.batch_norm1(x)
        x = F.relu(x)

        # down sample
        # 1/2
        x = self.down_conv_layer1(x)
        # 1/4
        x = self.down_conv_layer2(x)

        # resblock
        for i in range(8):
            y = self.res_block_layer(x)
            x = x + y

        # up sample
        x = self.up_conv_layer1(x)
        x = self.up_conv_layer2(x)

        x = self.conv2(x)
        x = self.tanh(x)

        return x

    def down_conv(self, n_filter):
        down_ = nn.Sequential(
            nn.Conv2d(n_filter, n_filter * 2, 3, 2, padding=1),
            nn.Conv2d(n_filter * 2, n_filter * 2, 3, 1, padding=1),
            nn.BatchNorm2d(n_filter * 2),
            nn.ReLU(),
        )
        return down_

    def res_block(self):
        res_ = nn.Sequential(
            nn.Conv2d(256, 256, 3, 1, padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(),
            nn.Conv2d(256, 256, 3, 1, padding=1),
            nn.BatchNorm2d(256),
        )
        return res_

    def up_conv(self, n_filter):
        up_ = nn.Sequential(
            nn.ConvTranspose2d(n_filter, n_filter // 2, 3, 2, padding=1, output_padding=1),
            nn.ConvTranspose2d(n_filter // 2, n_filter // 2, 3, 1, padding=1),
            nn.BatchNorm2d(n_filter // 2),
            nn.ReLU()
        )
        return up_


shinkai_v1_weight_path = './weight/shinkai_weight.pth'  # 신카이 마코토
shinkai_v2_weight_path = './weight/shinkai_weightv2.pth'  # 신카이 마코토

hayao_v2_weight_path = './weight/hayao_v2_generator.pth'

shinkaiv1_model_weight = torch.load(shinkai_v1_weight_path, map_location=torch.device('cpu'))
shinkaiv2_model_weight = torch.load(shinkai_v2_weight_path, map_location=torch.device('cpu'))

hayao_v2_model_weight = torch.load(hayao_v2_weight_path, map_location=torch.device('cpu'))

shinkaiv1_generator = Generator()
shinkaiv1_generator.load_state_dict(shinkaiv1_model_weight)

shinkaiv2_generator = Generator()
shinkaiv2_generator.load_state_dict(shinkaiv2_model_weight)

hayao_v2_generator = Generator()
hayao_v2_generator.load_state_dict(hayao_v2_model_weight)

tf = T.ToTensor()
pre_image = (tf(image) * 2 - 1).unsqueeze(0)

# hayao_v2_generator.to('cpu')

shinkaiv1_output = shinkaiv1_generator(pre_image).detach()
shinkaiv2_output = shinkaiv2_generator(pre_image).detach()

hayaov1_output = hayao_v2_generator(pre_image).detach()

# output.shape

# 신카이 마코도 모델 v1 
plt.imshow((shinkaiv1_output[0].permute((1, 2, 0)) + 1) / 2)
plt.title("shinkai v1")
plt.show()

# 신카이 마코도 모델 v2
plt.imshow((shinkaiv2_output[0].permute((1, 2, 0)) + 1) / 2)
plt.title("shinkai v2")
plt.show()

# 미야자키 하야오 v1 모델 이미지
plt.imshow((hayaov1_output[0].permute((1, 2, 0)) + 1) / 2)
plt.title("")
plt.show()

### 배경 적용
from torch.utils.data import DataLoader, Dataset
import os
from torchvision import transforms
import PIL

test_path = './images/background/bg1.jpg'
image = imread(test_path)

tf = T.ToTensor()
pre_image = (tf(image) * 2 - 1).unsqueeze(0)
shinkaiv1_output_background = shinkaiv1_generator(pre_image).detach()

plt.imshow((shinkaiv1_output_background[0].permute((1, 2, 0)) + 1) / 2)
plt.title("")
plt.show()

###### 여기까지 됨 ######
