from django.db import models
from django import forms

class User(models.Model):
    ROLE_CHOICES = [
        ('teacher', 'Teacher'),
        ('student', 'Student'),
        ('admin', 'Admin'),
        ('visitant', 'Visitant'),
    ]

    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    rol = models.CharField(max_length=10, choices=ROLE_CHOICES)
    data_naixement = models.DateField()
    telefon = models.CharField(max_length=15)
    dni = models.CharField(max_length=20)
    codi_postal = models.CharField(max_length=10)
    password = models.CharField(max_length=128)  # texto plano

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nom

class RegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = '__all__'


class LoginForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)