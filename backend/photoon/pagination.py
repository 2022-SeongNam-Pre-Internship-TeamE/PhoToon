from rest_framework.pagination import PageNumberPagination

class ImagesPageNumberPagination(PageNumberPagination):
    page_size = 6