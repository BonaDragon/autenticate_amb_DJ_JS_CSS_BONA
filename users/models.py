from django.db import models
from django import forms

class User(models.Model):
    ROLE_CHOICES = [
        ('teacher', 'Teacher'),
        ('student', 'Student'),
        ('admin', 'Admin'),
        ('visitant', 'Visitant'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    rol = models.CharField(max_length=10, choices=ROLE_CHOICES)
    birth_date = models.DateField()
    phone = models.CharField(max_length=15)
    dni = models.CharField(max_length=20)
    postal_code = models.CharField(max_length=10)
    password = models.CharField(max_length=128)  # texto plano

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nom

class RegisterForm(forms.ModelForm):
    # Sobrescribimos TODOS los campos para evitar validación automática de Django
    email = forms.CharField(widget=forms.EmailInput(attrs={
        "id": "id_email",
        "placeholder": "usuario@dominio.cat"
    }))

    phone = forms.CharField(widget=forms.TextInput(attrs={
        "id": "id_phone",
        "placeholder": "Ej: 612345678"
    }))

    postal_code = forms.CharField(widget=forms.TextInput(attrs={
        "id": "id_postal_code",
        "placeholder": "Ej: 08001"
    }))

    dni = forms.CharField(widget=forms.TextInput(attrs={
        "id": "id_dni",
        "placeholder": "DNI/NIE/Passaport en mayúsculas"
    }))

    birth_date = forms.CharField(widget=forms.TextInput(attrs={
        "id": "id_birth_date",
        "placeholder": "yyyy-mm-dd"
    }))

    password = forms.CharField(widget=forms.PasswordInput(attrs={
        "id": "id_password"
    }))

    class Meta:
        model = User
        fields = '__all__'


class LoginForm(forms.Form):
    email = forms.CharField(widget=forms.EmailInput)
    password = forms.CharField(widget=forms.PasswordInput)