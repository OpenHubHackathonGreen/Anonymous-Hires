from django.db import models
from main.models import Location

# Create your models here.
class JobPosition(models.Model):
	onet_code = models.CharField(max_length=15)
	title = models.CharField(max_length=50)
	description = models.TextField()

class JobCommuteType(models.Model):
	commute = models.CharField(max_length=50)

class JobListing(models.Model):
	title = models.CharField(max_length=50)
	date = models.DateField()
	location = models.ForeignKey(Location, on_delete=models.CASCADE)
	description = models.TextField()
	requirements = models.ManyToManyField(JobPosition)
	commute = models.ForeignKey(JobCommuteType, on_delete=models.CASCADE)