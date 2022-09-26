from __future__ import absolute_import, unicode_literals
from celery import Celery

app = Celery('config',
             broker=f'amqp://photoon:photoon123@photoon_host/photoon_host',
             backend='rpc://',
             include=['photoon.tasks'])
