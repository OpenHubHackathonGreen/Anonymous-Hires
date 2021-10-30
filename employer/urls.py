from django.urls import path
from . import views

urlpatterns = [
	path('employer', views.employer, name='employer'),
	path('newlisting', views.job_listing, name='newlisting'),
]