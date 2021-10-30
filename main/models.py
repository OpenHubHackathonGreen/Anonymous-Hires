from django.db import models
import random
import string

# Create your models here.

class State(models.Model):
	name = models.CharField(max_length=50)
	abbr = models.CharField(max_length=2)

	def __unicode__(self):
		return self.abbr

class Location(models.Model):
	street = models.CharField(max_length=50)
	city = models.CharField(max_length=50)
	state = models.ForeignKey(State)
	zip_code = models.CharField(max_length=5)

class EntityType(models.Model):
	e_type = models.CharField(max_length=50)

	def __unicode__(self):
		return self.e_type

class Entity(models.Model):
	company_name = models.CharField(max_length=50, blank=True)
	first_name = models.CharField(max_length=50, blank=True)
	last_name = models.CharField(max_length=50, blank=True)
	address = models.ForeignKey(Location)
	entity_type = models.ForeignKey(EntityType)

	def user_id(self):
		digits = string.digits
		generated_id = ''.join(random.choice(digits) for i in range(8))
		return generated_id

	def __unicode__(self):
		return self.user_id