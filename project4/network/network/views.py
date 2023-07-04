from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User, Post, Follower, Like



 ## TODO - Maybe break the loading of posts into a separate function?

def index(request):
 
    # extracting user name from request
    current_user = request.user
    #print(current_user)

    if request.method == "POST":

        # Processing a post to the network
        post_content = request.POST["post_content"]

        post = Post(content=post_content, user=current_user)
        post.save()
        # TODO - insert the post in the ddatabase?       
        return HttpResponseRedirect(reverse("index" ))

    # Default route
    else:              
        
        # get all posts
        posts = Post.objects.all().order_by("-timestamp")

        # if not logged in, show all posts only
        if request.user.is_authenticated == False:
            return render(request, "network/index.html",
                  {
                      "posts":posts, 
                  })
        # if logged in, get all user posts
        else:
            user_posts = Post.objects.filter(user = current_user).order_by("-timestamp")
            print(current_user)
            return render(request, "network/index.html",
                  {
                      "posts":posts, 
                      "user": current_user, "user_posts": user_posts,
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
