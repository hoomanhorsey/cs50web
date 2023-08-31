
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
     
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
 

    # So this is a apth for an API - it is called by a fetch within javascript. It usn't used directly in the URL.

    path("all_user_api/", views.all_user_api, name="all_user_api"),

    path("user_api/<str:request_name>", views.user_api, name="user_api"),


   # This path used to be <str:request_name> but I've kept it here to include reference to the 'view of index_selecteduser', otherwise the program breaks.
   # path("user/<str:mailbox>", views.index_selecteduser, name="index_selecteduser"),


]
#path("<str:name>", views.user_index, name="user_index"),

#    path("<str:request_name>", views.user_api, name="user_api"),

#path("demo_user/<str:request_name>", views.demo_user, name="demo_user"),
