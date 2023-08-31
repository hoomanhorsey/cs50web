from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse

from django.core.paginator import Paginator

from django.core.serializers import serialize


from .models import User, Post, Follower, Like


def index(request, request_name=None):
    
    # Checking for name argument - #print test, can delete
    if (request_name == None): 
        print("Name = None")  
    else:
        print("Name from request: ", request_name)

    # Post route, when posting a new 'post'.
    if request.method == "POST":
        # Extracting content from post request
        post_content = request.POST["post_content"]
        # Renderation post and user into form for table
        post = Post(content=post_content, user=request.user)
        # Saving new post
        post.save()   
        # Redirect to url associated with route named 'index' 
        return HttpResponseRedirect(reverse("index"))

    # Default route
    else:             

      # Path if user is logged in:
        if request.user.is_authenticated:
        
          # sub-route if url is blank, i.e. All Post
          if (request_name == None): 
            print("Name = None") #print test, can delete

            # get active user
            active_user = User.objects.get(username=request.user)
                     
            # get posts of active user
            active_user_posts = Post.objects.filter(user=active_user.id).order_by("-timestamp")

            # paginate posts of active users
            paginator_active_user = Paginator(active_user_posts, 2)
            page_number = request.GET.get('page')
            page_obj_active_user = paginator_active_user.get_page(page_number)

            # get posts of all users
            posts = Post.objects.all().order_by("-timestamp")
            # paginate posts of all users
            paginator = Paginator(posts, 4)
            page_number = request.GET.get('page')
            page_obj = paginator.get_page(page_number)   

            return render(request, "network/index.html",
            {"page_obj" : page_obj,
            "page_obj_active_user": page_obj_active_user,
            "active_user": active_user})

          # Path for selected user
          else:

            print(request_name)  #print test, can delete

            selected_user = User.objects.get(username=request_name)
            print("selected user: ", selected_user)
    
            selected_user_posts = Post.objects.filter(user=selected_user.id).order_by("-timestamp")

            paginator_selected_user = Paginator(selected_user_posts, 2)
            page_number = request.GET.get('page')
            page_obj_selected_user = paginator_selected_user.get_page(page_number)
            
            return render(request, "network/index.html",   
            {"page_obj_selected_user": page_obj_selected_user,
            "selected_user": selected_user})

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
            {"page_obj": page_obj})
        
def all_user_api(request):
     #insert API here, that returns the posts
    # get active user
    print("The all_user_api has been called!")
    
    # get posts of active user
    
    all_user_posts = Post.objects.select_related().order_by("-timestamp")
    print("all user posts ", all_user_posts)
    

    # Note: accessing the related object 'user' of the 'post object' by using dot notation
    # But how do we include the user in the json?
    for p in all_user_posts:
        print(p.user)
    
    serial_posts = serialize('json', all_user_posts)
    print(serial_posts)
    print("Queryset has been seriazlied")
    
    
    return HttpResponse(serial_posts, content_type='application/json')
    #return JsonResponse(serial_posts, safe=False)

def user_api(request, request_name=None):
    #insert API here, that returns the posts
    # get active user
    print("The user_api has been called!")
    active_user = User.objects.get(username=request_name)
    print("active user: ", active_user)

    # get posts of active user
    active_user_posts = Post.objects.filter(user=active_user.id).order_by("-timestamp")
    print("active user posts: ", active_user_posts)
    
    serial_posts = serialize('json', active_user_posts)
    print("Queryset has been seriazlied")


    return HttpResponse(serial_posts, content_type='application/json')
    #return JsonResponse(serial_posts, safe=False)
        

    # How to return the Queryset as a JsonResponse?   
    return JsonResponse([active_user_posts.serialize() for post in active_user_posts], safe=False)

"""
def index_selecteduser(request, request_name=None):

    print("We have traversed the index_selected user function, even if the html doesn't stay with the view that is rendered")
    # Checking for name argument - #print test, can delete
    if (request_name == None): 
        print("Name = None")  
    else:
        print("Name from request: ", request_name)
   
    # Path if user is logged in:
    if request.user.is_authenticated:
        
        # sub-route if url is blank, i.e. All Post
        if (request_name == None): 
            print("Name = None") #print test, can delete

            # get active user from request
            active_user = User.objects.get(username=request.user)
                        
            # get posts of active user
            active_user_posts = Post.objects.filter(user=active_user.id).order_by("-timestamp")

            # paginate posts of active users
            paginator_active_user = Paginator(active_user_posts, 2)
            page_number = request.GET.get('page')
            page_obj_active_user = paginator_active_user.get_page(page_number)

            # get posts of all users
            posts = Post.objects.all().order_by("-timestamp")
            # paginate posts of all users
            paginator = Paginator(posts, 4)
            page_number = request.GET.get('page')
            page_obj = paginator.get_page(page_number)   

            return render(request, "network/index_user.html",
            { "page_obj" : page_obj,
            "page_obj_active_user": page_obj_active_user,
            "active_user": active_user })

        # Path for selected user
        else:

            print("Request Name: ", request_name)  #print test, can delete

            selected_user = User.objects.get(username=request_name)
            print("selected user: ", selected_user)

            selected_user_posts = Post.objects.filter(user=selected_user.id).order_by("-timestamp")

            paginator_selected_user = Paginator(selected_user_posts, 2)
            page_number = request.GET.get('page')
            page_obj_selected_user = paginator_selected_user.get_page(page_number)
            
            return render(request, "network/index.html",               
            {"page_obj_selected_user": page_obj_selected_user,
            "selected_user": selected_user})

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
        {"page_obj" : page_obj})        

    """
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

