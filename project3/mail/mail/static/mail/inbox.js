document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});


function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-single-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Get Request that returns a list of all emails in that mailbox.
  fetch('/emails/'+`${mailbox}`)
  .then(response => response.json())
  .then(emails => {
     // 'forEach' applies 'printmail' function to each email
    emails.forEach(printmails);     
    }); 
  }

function printmails(emails) {
        
  // Creating div element for email
  const mail_div = document.createElement('div');  
  const sender = emails.sender;      
  const subject = emails.subject;
  const time = emails.timestamp;
  const email_id = emails.id;
  const read = emails.read;

    // TODO - DELETE. I THINK THIS WAS JUST FOR TESTING and CONSOLE LOGGING
    //Setting dynamically generated id for div 
    //mail_div.id = "email-"+`${email_id}`   
            
    // Check if email is read, render class for color   
    if (read === true) {
        mail_div.setAttribute("class", "email_unread")
      }
      else {
        mail_div.setAttribute("class", "email_read")
      }

    // insert email header details into the new mail_div
    mail_div.innerHTML = "<div class='flex-container'>"+ 
      "<div class='left-div'> <strong>"+ sender + "</strong></div>"+ 
      "<div class='left-div'>"+ subject +"</div>" + 
      "<div class='right-div'>"+ time + "</div> </div>" 

    // append the new mail_div object to the div
    document.querySelector('#emails-view').append(mail_div);

    // event handler is added to the newly created element, that triggers the get_email function to display single email
    mail_div.addEventListener('click', () => get_email(email_id));
  }


function get_email(email_id) {
  
  // Clear page
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-single-view').style.display = 'block';
  // Clear out previous entries in relevant div
  document.querySelector('#email-single-view').innerHTML = '';

  // create new element
  const email_div = document.createElement('p');  

  // fetch email based on email_id
  fetch('/emails/'+`${email_id}`)
  .then(response => response.json())
  .then(email => {
   
    // extract data from email object  
    const sender = email.sender;      
    const subject = email.subject;
    const recipient = email.recipients;
    const time = email.timestamp;
    const body = email.body;
    const archived = email.archived
     
    // insert data into email_div for individual email header
    email_div.innerHTML = 
      "<strong>From: </strong>" + sender +
      "<br><strong>To: </strong>" + recipient + 
      "<br> <strong>Subject: </strong>" + subject + 
      "<br> <strong>Timestamp: </strong>" + time;
      
    // Mark email as read:
      fetch('/emails/'+`${email_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            read: true
          })
        })    

    // append email headers info
    document.querySelector('#email-single-view').append(email_div);   

    // reply button
        // create element
    const reply_button = document.createElement('span');
        // insert button into innerHTML of element
      reply_button.innerHTML = 
          "<button style='margin-right:4px' id='reply_button' class='btn btn-sm btn-outline-primary' type='button'>Reply</button>"
        // append button to 'email-single=view' div
      document.querySelector("#email-single-view").append(reply_button);
      // add event listener to call compose function if clicked
      document.getElementById('reply_button').addEventListener('click', () => {compose_email(email)})
    
    // append archive/unarchive button
    button_unarchive = "<button id='archive_button' class='btn btn-sm btn-outline-primary' type='button'>Unarchive email</button>";
    button_archive = "<button id='archive_button' class='btn btn-sm btn-outline-primary' type='button'>Archive email</button>";

      // test for archive or unarchived
      if (archived === true) {
        button = button_unarchive;
        alert = false;
      } else {
        button = button_archive;
        alert = true;}
      // insert button into div
      button_span = document.createElement('span');
      button_span.innerHTML = button;

      // append button span to 'email-single-view' div
      document.querySelector("#email-single-view").append(button_span);   
        // update archived status in API
      document.getElementById('archive_button').addEventListener('click', () => {       
        fetch('/emails/'+`${email_id}`, {
          method: 'PUT',
          body: JSON.stringify({
              archived: alert
            })
          })           
          // setting a 50ms delay to allow API time to reset inbox
          setTimeout(load_mailbox, 50, 'inbox');

        }) 

        //TODO - DELETE< AS I REFACTORED IT ABOVE
      /*
    // append archive/unarchive button
    // Test for archived 
    if (archived === true) {
      button = "<button id='un_archive_button' class='btn btn-sm btn-outline-primary' type='button'>Unarchive email</button>"
        // insert button into div
        const button_div = document.createElement('span');
        button_div.innerHTML = button;
        // append button to 'email-single-view' div
        document.querySelector("#email-single-view").append(button_div);       
        // add event listener to set archive status if clicked
        document.getElementById('un_archive_button').addEventListener('click', () => {       
          fetch('/emails/'+`${email_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                archived: false
              })
            })           
            load_mailbox('inbox');
          }) 
      } else {
      button = "<button id='archive_button'class='btn btn-sm btn-outline-primary' type='button'>Archive email</button>"
        const button_div = document.createElement('span');
        button_div.innerHTML = button;
        document.querySelector("#email-single-view").append(button_div)
        document.getElementById('archive_button').addEventListener('click', () => {       
          fetch('/emails/'+`${email_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                archived: true              
              })
            })
            load_mailbox('inbox');
          });
      };
      */
      
    // append email body
    const body_div = document.createElement('p');  
    body_div.innerHTML = "<hr> </hr>"+ body;    
    
    //email_div.appendChild(body_div);  
    document.querySelector('#email-single-view').append(body_div);    
    })
       // Catch any errors and log them to the console
       .catch(error => {
        console.log('Error:', error);
        });
    // Prevent default submission
      return false;    
}


function compose_email(email) { 

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-single-view').style.display = 'none';

  // Rendering submission form, based on new email or reply:
  if (email.id === undefined) {    
      // Clear out composition fields
      document.querySelector('#compose-recipients').value = '';
      document.querySelector('#compose-subject').value = '';
      document.querySelector('#compose-body').value = '';
      } else {
      document.querySelector('#compose-recipients').value = email.sender;
      document.querySelector('#compose-subject').value = 're: ' + email.subject;
      document.querySelector('#compose-body').value = 
        '\n\n' + 'On ' + 
        email.timestamp + ', ' +
        email.sender +
        ' wrote: ' + '\n' + '| \t' +
        email.body;
      }

  // Listen for submission of email
  document.querySelector('#compose-form').onsubmit = function(){
    
      // Get email details from form
      const recipients = document.querySelector('#compose-recipients').value;
      const subject = document.querySelector('#compose-subject').value;
      const body = document.querySelector('#compose-body').value; 

          fetch('/emails', {
            method: 'POST',
            body: JSON.stringify({
                recipients: `${recipients}`,
                subject: `${subject}`,
                body: `${body}`
            })
          })
          .then(response => response.json())
          .then(result => {
            // Print result
              console.log(result)
          })
          // Catch any errors and log them to the console
          .catch(error => {
              console.log('Error:', error);
          });
          
          // setting a 50ms delay to allow API time to reset inbox
          setTimeout(load_mailbox, 50, 'sent');
          
          // Prevent default submission

          return false;    

   }
}




    