from django.shortcuts import render

# Create your views here.
def index(request):
	msg = "Something magnificent is being built here!"
	return render(request, 'index.html', context)