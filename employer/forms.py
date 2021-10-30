from django.forms import ModelForm
from .models import JobListing

class JobListingForm(ModelForm):
	class Meta:
		model = JobListing
		fields = '__all__'



