from django.shortcuts import render

# Create your views here.
def employee(request):
	msg = "This is Employee dashboard"
	context = {
		'msg': msg
	}
	return render(request, "employee/employeedashboard.html", context)