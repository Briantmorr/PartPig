import React from "react";
import "./registerForm.css";

const registerForm = () => (
//     <div id="fb-root"></div>
// <script>(function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12';
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));</script>

    <div class="fb-login-button" data-max-rows="1" data-size="large"
     data-button-type="continue_with" data-show-faces="false"
      data-auto-logout-link="false" data-use-continue-as="false">
    </div>
);

export default registerForm;