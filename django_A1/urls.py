from django.urls import path, include
from django.shortcuts import redirect

urlpatterns = [
    path('', include('users.urls')),
    path('', lambda request: redirect('login')),

]