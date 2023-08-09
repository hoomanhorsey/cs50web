from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from django.core.paginator import Paginator

from .models import User, Post, Follower, Like


def index(request, request_name=None):

    # Checking for name argument


    # Test for name....
    if request_name == None:
        print("Name = None")
    else:
        print("Name from request: ", request_name)


  # extracting username from request
    current_user = request.user
    print("Print checks when requesting 'index' page, triggered by clicking 'all posts'")
    print("contents of 'request.user' = '",request.user,"'")
    print("variable current user = '", current_user, "'")
    
    #TODO - Do I need to extract the name of user for both post and get routes, or is it only used in the post route?

    # Post route, when posting a new 'post'.
    if request.method == "POST":
        # Extracting content from post request
        post_content = request.POST["post_content"]
        # Renderation post and user into form for table
        post = Post(content=post_content, user=current_user)
        # Saving new post
        post.save()   
        # Redirect to url associated with route named 'index' 
        return HttpResponseRedirect(reverse("index"))

    # Default route
    else:             

      # Test if user is logged in:
        if request.user.is_authenticated:
          print("YEST")

          # get selected user
          selected_user = User.objects.get(username=current_user)
          print("selected user", selected_user)
          print("type", type(selected_user))
          
          # get posts of selected user
          selected_user_posts = Post.objects.filter(user=selected_user.id).order_by("-timestamp")
          print("selected user posts", selected_user_posts)
          # paginate posts of selected users
          paginator_selected_user = Paginator(selected_user_posts, 2)
          page_number = request.GET.get('page')
          page_obj_selected_user = paginator_selected_user.get_page(page_number)

          # get posts of all users
          posts = Post.objects.all().order_by("-timestamp")
          # paginate posts of all users
          paginator = Paginator(posts, 4)
          page_number = request.GET.get('page')
          page_obj = paginator.get_page(page_number)   
          
          return render(request, "network/index.html",
          { "page_obj" : page_obj,
          "current_user" : current_user, #get rid of if user has it's own path
          "page_obj_selected_user": page_obj_selected_user,
          "selected_user": selected_user, 
            })

        # if user is not authenticated, i.e if no-one logged in
        else:
          print("NOZE")
          # get all posts
          posts = Post.objects.all().order_by("-timestamp")
          # render for pagination
          paginator = Paginator(posts, 4)
          page_number = request.GET.get('page')
          page_obj = paginator.get_page(page_number)   
      
          return render(request, "network/index.html",
            {"page_obj" : page_obj,
            "current_user" : current_user, })

#this function is no longer really needed, as it is a one page app
def user_index(request, name):
    print("Printing checks when route is directed to user_index:")
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
                      "selected_user": selected_user
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
