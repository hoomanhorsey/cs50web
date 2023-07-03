
// Wait for page to load:

document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#user').addEventListener('click', () => user('user'));
    document.querySelector('#all_posts').addEventListener('click', () => all_posts('all_posts'));
    document.querySelector('#following').addEventListener('click', () => following('following'));





function all_posts(message) {
    console.log("which tab: ", message)

    document.querySelector('#postform-view').style.display = 'block';
    document.querySelector('#post-view').style.display = 'block';
    document.querySelector('#user-view').style.display = 'none';
    document.querySelector('#follow-view').style.display = 'none';
}

function user(message) {
    console.log("which tab: ", message)

    document.querySelector('#postform-view').style.display = 'none';
    document.querySelector('#post-view').style.display = 'none';
    document.querySelector('#user-view').style.display = 'block';
    document.querySelector('#follow-view').style.display = 'none';

}

function following(message) {
    console.log("which tab: ", message)

    document.querySelector('#postform-view').style.display = 'none';
    document.querySelector('#post-view').style.display = 'none';
    document.querySelector('#user-view').style.display = 'none';
    document.querySelector('#follow-view').style.display = 'block';
}

});

