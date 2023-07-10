from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from django.core.paginator import Paginator

from .models import User, Post, Follower, Like


def index(request):
    # extracting user name from request
    current_user = request.user
    print("request.user", request.user)
    print("current user", current_user)

    if request.method == "POST":

        # Processing a post to the network
        post_content = request.POST["post_content"]

        post = Post(content=post_content, user=current_user)
        post.save()   
        return HttpResponseRedirect(reverse("index"))

    # Default route
    else:              

        # get all posts
        posts = Post.objects.all().order_by("-timestamp")
        paginator = Paginator(posts, 4)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)   

        return render(request, "network/index.html",
                {
                    "posts":posts, 
                    "page_obj": page_obj,
                })
    
def user_index(request, name):
    print("name", name)
    print(type(name))
   
    
    selected_user = User.objects.get(username=name)
    print("id", selected_user.id)  
    print("selected user:", selected_user)

    selected_user_posts = Post.objects.filter(user=selected_user.id).order_by("-timestamp")

    paginator_selected_user = Paginator(selected_user_posts, 2)
    
    page_number = request.GET.get('page')
    
    page_obj_selected_user = paginator_selected_user.get_page(page_number)

    return render(request, "network/user.html",{
                      "page_obj_selected_user": page_obj_selected_user,
                      "selected_user":
                      selected_user
                  })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
