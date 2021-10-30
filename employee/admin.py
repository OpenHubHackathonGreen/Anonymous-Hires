from django.contrib import admin
from main.models import Entity
# Register your models here.
class EntityAdmin(admin.ModelAdmin):
	fields = ['user_id','company_name', 'first_name', 'last_name', 'address', 'entity_type']

admin.site.register(Entity, EntityAdmin)