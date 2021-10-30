from django.contrib import admin
from main.models import Entity, EntityType, State, Location
# Register your models here.
class EntityAdmin(admin.ModelAdmin):
	fields = ['user_id','company_name', 'first_name', 'last_name', 'address', 'entity_type']

class EntityTypeAdmin(admin.ModelAdmin):
	fields = ['e_type']

class StateAdmin(admin.ModelAdmin):
	fields = ['name', 'abbr']

class LocationAdmin(admin.ModelAdmin):
	fields = ['street', 'city', 'state', 'zip_code']

admin.site.register(Entity, EntityAdmin)
admin.site.register(EntityType, EntityTypeAdmin)
admin.site.register(State, StateAdmin)
admin.site.register(Location, LocationAdmin)