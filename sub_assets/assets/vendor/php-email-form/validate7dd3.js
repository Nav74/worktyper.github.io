/**
* PHP Email Form Validation - v3.2
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let from_page = thisForm.getAttribute('data-type');

      if(from_page != 'applypublisher'){

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.querySelector('#captcha').value;
      let name = thisForm.querySelector('#name').value;
      let email = thisForm.querySelector('#email').value;
      let budget = thisForm.querySelector('#budget').value;
      let number = thisForm.querySelector('#phone').value;
      let product = thisForm.querySelector('#product').value;
      let message = thisForm.querySelector('#comment-content').value;
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!')
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha === '' || name === '' || email === '' || budget === '' || number === '' || product === '' || message === '') {
        displayError(thisForm, 'Please fill all the blank fields.');
        return;
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
      
      }else if(from_page === 'applypublisher'){
          
      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.querySelector('#captcha').value;
      let name = thisForm.querySelector('#name').value;
      let email = thisForm.querySelector('#email').value;
      let views = thisForm.querySelector('#views').value;
      let number = thisForm.querySelector('#phone').value;
      let youtubelink = thisForm.querySelector('#youtube_link').value;
      let message = thisForm.querySelector('#comment-content').value;
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!')
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha === '' || name === '' || email === '' || views === '' || number === '' || youtubelink === '' || message === '') {
        displayError(thisForm, 'Please fill all the blank fields.');
        return;
      } else {
        if(matchYoutubeUrl(youtubelink)){
            php_email_form_submit(thisForm, action, formData);
        }else{
            displayError(thisForm, 'Please enter valid youtube channel link.');
        }
      }
          
      }
      
    });
  });
  
  function matchYoutubeUrl(url) {
    var p = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    if(url.match(p)){
        return true;
    }
    return false;
  }

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      if( response.ok ) {
        return response.text()
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.trim() == '1') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
