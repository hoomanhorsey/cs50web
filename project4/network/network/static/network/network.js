
// Wait for page to load:

document.addEventListener('DOMContentLoaded', function() {


  
  // Display html triggered by Navbar selection
  document.querySelector('#all_posts').addEventListener('click', () => all_posts('all_posts'));
  document.querySelector('#new_post').addEventListener('click', () => new_post('new_post'));
  document.querySelector('#following').addEventListener('click', () => following('following'));

  //document.querySelector('#user').addEventListener('click', () => user('user'));

  document.querySelector('.user_page').addEventListener('click', () => userclass('user'));



//  const user_pags = document.querySelectorAll('.user_pag');
  //user_pags.forEach(p => {p.addEventListener('click', handleClick);
  //}) ;

  // creates a list of all the 'p's with the class name:
  const user_pags = document.querySelectorAll('.user_pag');

  // applies the addEventListener function to each of these 'p's using forEach:
  //user_pags.forEach(function(p) {
//    p.addEventListener('click', handleClick);
  //}) ;


  user_pags.forEach(function(p) {
    p.addEventListener('click', () => handleClick2(p.dataset.name));
  }) ;

    //document.querySelector('#userlink').addEventListener('click', () => user('userlink'));

    // by default, load all_posts 
  all_posts('all_posts')

});

const handleClick2 = (name) => {
  console.log("Foreach is being applied to each individual element! - Version 2")
  console.log(name)
  document.querySelector('#postform-view').style.display = 'none';
  document.querySelector('#all_post-view').style.display = 'none';
  document.querySelector('#follow-view').style.display = 'none';
  document.querySelector('#user_view').style.display = 'block';
}

//function handleClick(event, p) {
// console.log("Foreach is being applied to each individual element!")
 // console.log(event);
 // console.log(p);
//}


function test(message) {
  console.log("Test is getting through")
}

function all_posts(message) {
  console.log("which tab: ", message)
  

  document.querySelector('#postform-view').style.display = 'none';
  document.querySelector('#all_post-view').style.display = 'block';
  document.querySelector('#follow-view').style.display = 'none';
  document.querySelector('#user_view').style.display = 'none'; // DELETE IF USER USES A SEP ROUTE
}

function new_post(message) {
  console.log("which tab: ", message)

  document.querySelector('#postform-view').style.display = 'block';
  document.querySelector('#all_post-view').style.display = 'none';
  document.querySelector('#follow-view').style.display = 'none';
  document.querySelector('#user_view').style.display = 'none'; // DELETE IF USER USES A SEP ROUTE
}

function following(message) {
  console.log("which tab: ", message)

  document.querySelector('#postform-view').style.display = 'none';
  document.querySelector('#all_post-view').style.display = 'none';
  document.querySelector('#follow-view').style.display = 'block';
  document.querySelector('#user_view').style.display = 'none'; // DELETE IF USER USES A SEP ROUTE
}
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

