from django.contrib import admin
from .models import .
# Register your models here.
class EntityAdmin(admin.ModelAdmin):
	fields = ['user_id','company_name', 'first_name', 'last_name', 'address', 'entity_type']

admin.site.register(Entity, EntityAdmin)