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

class ConvNormLReLU(nn.Sequential):
    def __init__(self, in_ch, out_ch, kernel_size=3, stride=1, padding=1, pad_mode="reflect", groups=1, bias=False):
        
        pad_layer = {
            "zero":    nn.ZeroPad2d,
            "same":    nn.ReplicationPad2d,
            "reflect": nn.ReflectionPad2d,
        }
        if pad_mode not in pad_layer:
            raise NotImplementedError
            
        super(ConvNormLReLU, self).__init__(
            pad_layer[pad_mode](padding),
            nn.Conv2d(in_ch, out_ch, kernel_size=kernel_size, stride=stride, padding=0, groups=groups, bias=bias),
            nn.GroupNorm(num_groups=1, num_channels=out_ch, affine=True),
            nn.LeakyReLU(0.2, inplace=True)
        )


class InvertedResBlock(nn.Module):
    def __init__(self, in_ch, out_ch, expansion_ratio=2):
        super(InvertedResBlock, self).__init__()

        self.use_res_connect = in_ch == out_ch
        bottleneck = int(round(in_ch*expansion_ratio))
        layers = []
        if expansion_ratio != 1:
            layers.append(ConvNormLReLU(in_ch, bottleneck, kernel_size=1, padding=0))
        
        # dw
        layers.append(ConvNormLReLU(bottleneck, bottleneck, groups=bottleneck, bias=True))
        # pw
        layers.append(nn.Conv2d(bottleneck, out_ch, kernel_size=1, padding=0, bias=False))
        layers.append(nn.GroupNorm(num_groups=1, num_channels=out_ch, affine=True))

        self.layers = nn.Sequential(*layers)
        
    def forward(self, input):
        out = self.layers(input)
        if self.use_res_connect:
            out = input + out
        return out

class WebtoonGenerator(nn.Module):
    def __init__(self, ):
        super().__init__()
        
        self.block_a = nn.Sequential(
            ConvNormLReLU(3,  32, kernel_size=7, padding=3),
            ConvNormLReLU(32, 64, stride=2, padding=(0,1,0,1)),
            ConvNormLReLU(64, 64)
        )
        
        self.block_b = nn.Sequential(
            ConvNormLReLU(64,  128, stride=2, padding=(0,1,0,1)),            
            ConvNormLReLU(128, 128)
        )
        
        self.block_c = nn.Sequential(
            ConvNormLReLU(128, 128),
            InvertedResBlock(128, 256, 2),
            InvertedResBlock(256, 256, 2),
            InvertedResBlock(256, 256, 2),
            InvertedResBlock(256, 256, 2),
            ConvNormLReLU(256, 128),
        )    
        
        self.block_d = nn.Sequential(
            ConvNormLReLU(128, 128),
            ConvNormLReLU(128, 128)
        )

        self.block_e = nn.Sequential(
            ConvNormLReLU(128, 64),
            ConvNormLReLU(64,  64),
            ConvNormLReLU(64,  32, kernel_size=7, padding=3)
        )

        self.out_layer = nn.Sequential(
            nn.Conv2d(32, 3, kernel_size=1, stride=1, padding=0, bias=False),
            nn.Tanh()
        )
        
    def forward(self, input, align_corners=True):
        out = self.block_a(input)
        half_size = out.size()[-2:]
        out = self.block_b(out)
        out = self.block_c(out)
        
        if align_corners:
            out = F.interpolate(out, half_size, mode="bilinear", align_corners=True)
        else:
            out = F.interpolate(out, scale_factor=2, mode="bilinear", align_corners=False)
        out = self.block_d(out)

        if align_corners:
            out = F.interpolate(out, input.size()[-2:], mode="bilinear", align_corners=True)
        else:
            out = F.interpolate(out, scale_factor=2, mode="bilinear", align_corners=False)
        out = self.block_e(out)

        out = self.out_layer(out)
        return out


webtoon_v2_weight_path = './ai_model/weight/webtoon_v2_generator.pth'
webtoon_v2_model_weight = torch.load(webtoon_v2_weight_path)
webtoon_v2_generator = WebtoonGenerator()
webtoon_v2_generator.load_state_dict(webtoon_v2_model_weight)
webtoon_v2_generator.to('cpu')