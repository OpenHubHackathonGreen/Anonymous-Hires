from django.shortcuts import render

# Create your views here.
def employer(request):
	msg = "This is Employer dashboard"
	context = {
		'msg': msg
	}
	return render(request, "employer/employerdashboard.html", context)