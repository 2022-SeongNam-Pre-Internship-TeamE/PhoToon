import torch
import torchvision.transforms as T
import torchvision
from torch import nn
import torch.nn.functional as F

## init 코드는 #으로 분리해주세요
#################################
# Segmentation
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

### AnimeGANv2 ###
class Generator(nn.Module):
    def __init__(self):
        super().__init__()
        
        self.conv1 = nn.Conv2d(3,64,7,1,padding=3)
        self.batch_norm1 = nn.BatchNorm2d(64)
        #self.relu = nn.ReLU()
        
        
        self.down_conv_layer1 = self.down_conv(64)
        self.down_conv_layer2 = self.down_conv(128)
        
        self.res_block_layer = self.res_block()
        
        self.up_conv_layer1 = self.up_conv(256)
        self.up_conv_layer2 = self.up_conv(128)
        
        self.conv2 = nn.Conv2d(64,3,7,1,padding=3)
        
        self.tanh = nn.Tanh()
        
        
    def forward(self,x):
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
    
    def down_conv(self,n_filter):
        down_ = nn.Sequential(
            nn.Conv2d(n_filter,n_filter*2,3,2,padding=1),
            nn.Conv2d(n_filter*2,n_filter*2,3,1,padding=1),
            nn.BatchNorm2d(n_filter*2),
            nn.ReLU(),
        )
        return down_
    
    def res_block(self):
        res_ = nn.Sequential(
            nn.Conv2d(256,256,3,1,padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(),
            nn.Conv2d(256,256,3,1,padding=1),
            nn.BatchNorm2d(256),
        )
        return res_
    
    def up_conv(self,n_filter):
        up_ = nn.Sequential(
            nn.ConvTranspose2d(n_filter,n_filter//2,3,2,padding=1,output_padding=1),
            nn.ConvTranspose2d(n_filter//2,n_filter//2,3,1,padding=1),
            nn.BatchNorm2d(n_filter//2),
            nn.ReLU()
        )
        return up_
        
shinkai_v1_weight_path = './ai_model/weight/shinkai_weight.pth' # 신카이 마코토 옵션1
shinkai_v2_weight_path = './ai_model/weight/shinkai_weightv2.pth' # 신카이 마코토 옵션2
hayao_v2_weight_path   = './ai_model/weight/hayao_v2_generator.pth' # 미야자키 하야오 옵션3

shinkaiv1_model_weight = torch.load(shinkai_v1_weight_path, map_location=torch.device('cpu'))
shinkaiv2_model_weight = torch.load(shinkai_v2_weight_path, map_location=torch.device('cpu'))
hayao_v2_model_weight = torch.load(hayao_v2_weight_path, map_location=torch.device('cpu'))


shinkaiv1_generator = Generator()
shinkaiv1_generator.load_state_dict(shinkaiv1_model_weight)
shinkaiv1_generator.to('cpu')

shinkaiv2_generator = Generator()
shinkaiv2_generator.load_state_dict(shinkaiv2_model_weight)
shinkaiv2_generator.to('cpu')


hayao_v2_generator = Generator()
hayao_v2_generator.load_state_dict(hayao_v2_model_weight)
hayao_v2_generator.to('cpu')