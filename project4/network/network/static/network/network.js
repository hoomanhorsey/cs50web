// Event listeners to call functions, after page is loaded:

document.addEventListener('DOMContentLoaded', function() {

// Functions

// New Posts Function

all_posts('default loading')

function new_post(message) {
  console.log("which tab: ", message)
  document.querySelector('#postform-view').style.display = 'block';
  document.querySelector('#all_post-view').style.display = 'none';
  document.querySelector('#follow-view').style.display = 'none';
  document.querySelector('#selected_user_view').style.display = 'none';
  document.querySelector('#jav_selected_user_view').style.display = 'none';

}

// Following Posts Function
function following(message) {
  console.log("which tab: ", message)
  document.querySelector('#postform-view').style.display = 'none';
  document.querySelector('#all_post-view').style.display = 'none';
  document.querySelector('#follow-view').style.display = 'block';
  document.querySelector('#selected_user_view').style.display = 'none';
  document.querySelector('#jav_selected_user_view').style.display = 'none';

}

// User (Selected) Function
function selected_user(name) {
  console.log("dataset name: ", name);
  //const selected_user = (name) => {
  console.log("Foreach is being applied to each individual element! - Version 2")
  document.querySelector('#postform-view').style.display = 'none';
  document.querySelector('#all_post-view').style.display = 'none';
  document.querySelector('#follow-view').style.display = 'none';
  document.querySelector('#selected_user_view').style.display = 'block';
  document.querySelector('#jav_selected_user_view').style.display = 'none';

  //}
}

function jav_selected_user(name){
    console.log("dataset name: ", name);
    //const selected_user = (name) => {
    console.log("Foreach is being applied to each individual element! - Version 2")
    document.querySelector('#postform-view').style.display = 'none';
    document.querySelector('#all_post-view').style.display = 'none';
    document.querySelector('#follow-view').style.display = 'none';
    document.querySelector('#selected_user_view').style.display = 'none';
    document.querySelector('#jav_selected_user_view').style.display = 'block';

    //}
  }

  // All Posts Function
  function all_posts(message) {
    console.log("All Posts - which tab: ", message)
    document.querySelector('#postform-view').style.display = 'none';
    document.querySelector('#all_post-view').style.display = 'block';
    document.querySelector('#follow-view').style.display = 'none';
    document.querySelector('#selected_user_view').style.display = 'none';
  }

// Navbar selection - display html 
// by default, load all_posts 
document.querySelector('#all_posts').addEventListener('click', () => all_posts('all_posts'));
document.querySelector('#new_post').addEventListener('click', () => new_post('new_post'));
document.querySelector('#following').addEventListener('click', () => following('following'));

// User posts - display html
document.querySelectorAll('.user_post').forEach(function(p) {
  p.addEventListener('click', () => selected_user(p.dataset.name));
  });

// User posts - display html
document.querySelectorAll('.jav_user_post').forEach(function(p) {
    p.addEventListener('click', () => jav_selected_user(p.dataset.name));
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
