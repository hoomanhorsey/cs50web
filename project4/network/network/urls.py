
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
     
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
 
    #path("<str:name>", views.user_index, name="user_index"),

    path("<str:request_name>", views.index_selecteduser, name="index_selecteduser"),
    
    path("demo_user/<str:request_name>", views.demo_user, name="demo_user"),
]
