from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<str:title>", views.view_entry, name="viewentry"),
    path("wiki/<str:title>", views.view_entry, name="viewentry"), # consider consolidating to a dynamic url
    path("new/", views.new, name="new"),
    path("edit/", views.edit, name="edit"),
    path("random/", views.random, name="random")
    

]

#   path("", views.search, name="search"),