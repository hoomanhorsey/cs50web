// Event listeners to call functions, after page is loaded:

document.addEventListener('DOMContentLoaded', function() {
 
hide_all_posts('called hide_all_posts function - this may be redundant');
all_posts("called all_posts function");

// Functions

// New Posts Function

//all_posts('default loading')

  // All Posts Function
  function all_posts(message) {
    console.log("All Posts - which tab: ", message)
    document.querySelector('#postform-view').style.display = 'none';
    document.querySelector('#all_post-view').style.display = 'block';
    document.querySelector('#follow-view').style.display = 'none';
    document.querySelector('#selected_user_view').style.display = 'none';
    document.querySelector('#follower_view').style.display = 'none';
  }

   // All Posts Java Function
  function all_posts_java(message) {
    console.log("All Posts - which tab: ", message)
    document.querySelector('#postform-view').style.display = 'none';
    document.querySelector('#all_post-view').style.display = 'none';
    document.querySelector('#all_post_java-view').style.display = 'block';
    document.querySelector('#follow-view').style.display = 'none';
    document.querySelector('#selected_user_view').style.display = 'none';
    document.querySelector('#follower_view').style.display = 'none';

    fetch('/all_user_api/')
    .then(response => {
      console.log(response); // Log the response object
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => {
      console.log(posts[0].fields['content'])
      posts.forEach(display_all_user_posts);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

 
    function display_all_user_posts(posts) {
      console.log("post in display_user_posts", posts)
      console.log(posts)
      const post_content = document.createElement('p');

      post_content.innerHTML = 
      "<div class='post_style'> <p id='userlink' class='selected_user_page' style='font-size:25px; font-weight: bold;'> <a href='#'>"+`${posts.fields.user}`  + "</a> </p>" +
        "From api_user_view via javascript function <br> Post: " + `${posts.fields.content}` + 
        "<br> Timestamp: " + `${posts.fields.timestamp}`+  
        "<br> Likes: {{p.likes}}<br> <button> Like </button> TODO: <br>  <button> Edit </button> TODO <br>   <button> Comment </button> TODO <br> test div - referencing a context in javascript doesn't work. It would seem to need to come from the view and out put to the template {{ active_user }}</div>  <br>     <div>  </div>";

      document.querySelector('#all_posts_java_sep_post').append(post_content);
      
    }
    
    }
    
function new_post(message) {
  console.log("which tab: ", message)
  document.querySelector('#postform-view').style.display = 'block';
  document.querySelector('#all_post-view').style.display = 'none';
  document.querySelector('#follow-view').style.display = 'none';
  document.querySelector('#selected_user_view').style.display = 'none';
  document.querySelector('#api_user_view').style.display = 'none';
  document.querySelector('#follower_view').style.display = 'none';


}

// Following Posts Function
function following(message) {
  console.log("which tab: ", message)
  document.querySelector('#postform-view').style.display = 'none';
  document.querySelector('#all_post-view').style.display = 'none';
  document.querySelector('#follow-view').style.display = 'block';
  document.querySelector('#selected_user_view').style.display = 'none';
  document.querySelector('#api_user_view').style.display = 'none';
  document.querySelector('#follower_view').style.display = 'none';
}


function user_api_function(name){
    console.log("Extracted from the dataset, the name of the user is: ", name);
    //const selected_user = (name) => {
    console.log("iForeach is being applied to each individual element! - Version 2")
    document.querySelector('#postform-view').style.display = 'none';
    document.querySelector('#all_post-view').style.display = 'none';
    document.querySelector('#follow-view').style.display = 'none';
    document.querySelector('#selected_user_view').style.display = 'none';
    document.querySelector('#follower_view').style.display = 'block';
    document.querySelector('#api_user_view').style.display = 'block';


    // i have the dataset name of the user. I should be able to use this to call an API, using fetch, to extra the user info.
    // 1. Create API in the view....
    // 2. Call the API using 'fetch' and the 'username' found in the dataset
    // 3. extract the data and then populate it into the website using document.querySelector.....+ string literals 

    fetch('/user_api/' + `${name}`)
    .then(response => {
      console.log(response); // Log the response object
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => {
      console.log(posts[0].fields['content'])
      posts.forEach(display_user_posts);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });


    function display_user_posts(posts) {
      console.log("post in display_user_posts", posts)
      const post_content = document.createElement('p');

      post_content.innerHTML = 
      "<div class='post_style'> <p id='userlink' class='selected_user_page' style='font-size:25px; font-weight: bold;'> <a href='#'>" + `${name}` + "</a> </p>" +
        "From api_user_view via javascript function <br> Post: " + `${posts.fields.content}` + 
        "<br> Timestamp: " + `${posts.fields.timestamp}`+  
        "<br> Likes: {{p.likes}}<br> TODO: Like button<br>  TODO: Edit Button<br>   TODO: Comment Button <br> test div - referencing a context in javascript doesn't work. It would seem to need to come from the view and out put to the template {{ active_user }}</div>  <br>     <div>  </div>";

      document.querySelector('#api_user_test_div').append(post_content);
      
    }
    
  


  }
  



// Possible redundant function here.
function hide_all_posts() {
  console.log("called hide all posts function");
  document.querySelector('#postform-view').style.display = 'none';
  document.querySelector('#all_post-view').style.display = 'none';
  document.querySelector('#follow-view').style.display = 'none';
  document.querySelector('#selected_user_view').style.display = 'none';
  document.querySelector('#api_user_view').style.display = 'none';
  document.querySelector('#follower_view').style.display = 'none';

}


// User (Selected) Function
function selected_user(name) {
  console.log("dataset name: ", name);
  //const selected_user = (name) => {
  console.log("(Selected User) Foreach is being applied to each individual element! - Version 2")
  document.querySelector('#postform-view').style.display = 'none';
  document.querySelector('#all_post-view').style.display = 'none';
  document.querySelector('#follow-view').style.display = 'none';
  document.querySelector('#selected_user_view').style.display = 'block';
  document.querySelector('#api_user_view').style.display = 'none';
  document.querySelector('#follower_view').style.display = 'none';


  //}
}

// Navbar selection - display html 
// by default, load all_posts 
document.querySelector('#all_posts').addEventListener('click', () => all_posts('all_posts'));
document.querySelector('#all_posts_java').addEventListener('click', () => all_posts_java('all_posts_java'));
document.querySelector('#new_post').addEventListener('click', () => new_post('new_post'));
document.querySelector('#following').addEventListener('click', () => following('following'));

// User posts - display html
document.querySelectorAll('.api_user_post').forEach(function(p) {
  p.addEventListener('click', () => user_api_function(p.dataset.name));
  });

// I think this function is now redundant
//User posts - display html -
document.querySelectorAll('.user_post').forEach(function(p) {
  p.addEventListener('click', () => selected_user(p.dataset.name));
  });

// User posts - display html
document.querySelectorAll('.jav_user_post').forEach(function(p) {
    p.addEventListener('click', () => api_user_function(p.dataset.name));
    });

});























// Redundant functions

// Test function for 'user' javascript view
function user(message) {
  console.log("which tab: ", message)
  console.log("using id")
  document.querySelector('#postform-view').style.display = 'none';
  document.querySelector('#all_post-view').style.display = 'none';
  document.querySelector('#follow-view').style.display = 'none';
  document.querySelector('#user_view').style.display = 'block';
}

// Test function for 'user' javascript view, using classes to identify
// Test function for 'user' javascript view
function userclass(message) {
  console.log("which tab: ", message)
  console.log("using class")

  document.querySelector('#postform-view').style.display = 'none';
  document.querySelector('#all_post-view').style.display = 'none';
  document.querySelector('#follow-view').style.display = 'none';
  document.querySelector('#user_view').style.display = 'block';
}

function testuserclass(message, dataname) {
  // This function is redundant and a bit of a mess, can be deleted.
  document.querySelector('.user_page').addEventListener('click', function(event) {
    const dataname = event.target.dataset.name;
    console.log("const dataname", dataname);
   
  }); 
  console.log("which tab: ", message)
    console.log("using classes!")
    console.log("dataname", dataname)
  
    document.querySelector('#postform-view').style.display = 'none';
    document.querySelector('#all_post-view').style.display = 'none';
    document.querySelector('#follow-view').style.display = 'none';
    document.querySelector('#user_view').style.display = 'block';
}



  //document.querySelector('#user').addEventListener('click', () => user('user'));
  //document.querySelector('.user_page').addEventListener('click', () => userclass('user'));

//  const user_pags = document.querySelectorAll('.user_pag');
  //user_pags.forEach(p => {p.addEventListener('click', handleClick);
  //}) ;


  //user_pags.forEach(function(p) {
//    p.addEventListener('click', handleClick);
  //}) ;

  //function handleClick(event, p) {
// console.log("Foreach is being applied to each individual element!")
 // console.log(event);
 // console.log(p);
//}


