from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin) :
    list_display = ('email',)
    list_filter = ('is_admin',)

    fieldsets = (
        (None, {'fields': ('email',)}),
        ('Permissions', {'fields': ('is_admin',)}),
    )

    search_fields =  ('email',)
    ordering = ('email',)

    filter_horizontal = ()

admin.site.register(User, UserAdmin) #site에 등록