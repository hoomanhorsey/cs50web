from django.shortcuts import render
from markdown2 import Markdown

from random import randint

from . import util

def index(request):  # Index, home page

    # Search form route. Ref to "q" is the search term variable
    if request.method == "GET" and "q" in request.GET:  # checks for presence of "q", which signifies a search
        query = request.GET.get('q','')                 # extracts "q", which is the search term/name of file.  name attribute = q, only form elements with a name attribute will have their values passed when submitting  a form
        file = util.get_entry(query)                    # gets file contents based on "q" 
        if file == None:                                # if no file is found matching "q", then search for sub string
            searchresults = []                          # declare list to populate search results
            entries = util.list_entries()               # get full list of entries into list, and loop through list to match for substring
            for entry in entries:  
                a = entry.upper()
                b = query.upper()
                value = a.find(b)                       # find() gives -1 if substring not found, otherwise gives position of substring in integer, 0, 1, 2 etc
                if value > -1:                          # if substring is found, then append name of item into 'results' list
                    searchresults.append(entry)
            if not searchresults:                       # If after the substring search there are no results, then render error
                return render(request, "encyclopedia/error.html", { 
                "message": "No items matching your search were found. Is it possible you could have mispelt the page?  We'd love to help you find the page you were looking for. Please check and re-enter."}) 
                                                        # Otherwise, render index page with results of substring search
            return render(request, "encyclopedia/index.html", { 
                "entries": searchresults}) 
     
    # General deafult route listing all entries where no search is conducted
    return render(request, "encyclopedia/index.html", {
            "entries": util.list_entries()    
            })

def view_entry(request, title):
    markdowner = Markdown()
    content = util.get_entry(title)
    if content == None:
        return render(request, "encyclopedia/error.html",  {
            "message": "Oh no! There are no entries by that title.  Please check your spelling and try again"})  
    content = markdowner.convert(content)
    return render(request, "encyclopedia/entry.html", { 
        "entries": content, "entry": title     
        })
      
def save_edit(request):
    
    if request.method == "POST":
        title = request.POST.get('title')
        content = request.POST.get('content')
        
        util.save_entry(title, content)
        
        markdowner = Markdown()
   
        file = markdowner.convert(util.get_entry(title))
        
        return render(request, "encyclopedia/entry.html", { 
            "entries": file, "entry": title     
            })

def new(request):
    # If content is posted
    if request.method == "POST":
        title = request.POST.get('title')               # retrieving 'title' variable from form
        submittedcontent = request.POST.get('content')           # retrieving 'content' variable from form

        # Check to see if title already exists, render error if title exists
        if util.get_entry(title) != None:
            return render(request, "encyclopedia/error.html", { "message": "Sorry but an entry with this title already exists. Please resubmit with a new title."}) 
        # Saves new entry
        util.save_entry(title, submittedcontent)
        
        # sets up entry for display
        markdowner = Markdown()
        newsavedcontent = markdowner.convert(util.get_entry(title))
        return render(request, "encyclopedia/entry.html", { 
            "entries": newsavedcontent, "entry" : title     
            })

    # Default landing page, directs to new.html
    return render(request, "encyclopedia/new.html")
    
def edit(request): 

    # default landing page for edit:
    if request.method == "GET":
        title = request.GET.get('title','')
        markdowner = Markdown()
        content = util.get_entry(title)       
        content = markdowner.convert(content)
        return render(request, "encyclopedia/edit.html", { 
            "entries": content, "title": title     
            })
    
    # route once content is posted in edit page form:
    elif request.method == "POST":
        title = request.POST.get('title')
        editedcontent = request.POST.get('content')     
        util.save_entry(title, editedcontent)
        
        #markdowner = Markdown()
        #editedcontent = markdowner.convert(util.get_entry(title))
        
        return render(request, "encyclopedia/entry.html", { 
            "entries": editedcontent, "entry": title
            })

def random(request):
    listofentries = util.list_entries()                     # extract list of entries

    randomnumber = randint(0, (len(listofentries)-1))       # generate random int from range of '0 to list of entries'

    randomtitle = listofentries[randomnumber]               # extract title from 'listofentries' using index
    content = util.get_entry(randomtitle)                   # retrieve content based on title, convert to markdown and then produce entry
    markdowner = Markdown()
    content = markdowner.convert(content)
    return render(request, "encyclopedia/entry.html", { 
        "entries": content, "entry": randomtitle     
        })


"""
"""