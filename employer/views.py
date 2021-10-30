from django.shortcuts import render
from .models import *
from .forms import JobListingForm

# Create your views here.
def employer(request):
	msg = "This is Employer dashboard"
	context = {
		'msg': msg
	}
	return render(request, "employer/employer.html", context)

def job_listing(request):
	context = {
		'joblistform': JobListingForm(),
	}
	return render(request, "employer/newlisting.html", context)