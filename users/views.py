from django.shortcuts import render, redirect
from .models import User, RegisterForm, LoginForm
from django.contrib import messages

def home(request):
    return render(request, "base.html")
def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()  # Guarda el usuario en la base de datos
            messages.success(request, "Usuario registrado correctamente")
            return redirect("login")  # Redirige al login
        else:
            messages.error(request, "Formulario no válido")
    else:
        form = RegisterForm()

    return render(request, "register.html", {"form": form})


def login_view(request):
    error = None
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            password = form.cleaned_data["password"]
            try:
                user = User.objects.get(email=email, password=password)
                request.session['user_id'] = user.id
                request.session['rol'] = user.rol
                return redirect("home")
            except User.DoesNotExist:
                error = "Email o password incorrecto"
        else:
            error = "Formulario no válido"
    else:
        form = LoginForm()

    return render(request, "login.html", {"form": form, "error": error})