
var btnLogin = document.getElementById('btnLogin');
var btnLogout = document.getElementById('btnLogout');
var welcome = document.getElementById('welcome');

function setCookie(uid) {
    document.cookie = 'uid=' + uid +'; path=/';
}

function getCookie() {
    return document.cookie;
}

/**
 * Writes the user's data to the database.
 */
// [START basic_write]
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
// [END basic_write]

/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
function onAuthStateChanged(user) {
var currentUID = getCookie();
  // We ignore token refresh events.
  if (user && currentUID === user.uid) {
    return;
  }

  if (user) {
      setCookie(user.uid);
  } else {
    // Set currentUID to null.
      setCookie(null);
  }
}

// Bindings on load.
window.addEventListener('load', function() {
  // Bind Sign in button.
  btnLogin.addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });

  // Bind Sign out button.
  btnLogout.addEventListener('click', function() {
    firebase.auth().signOut();
  });

  // Listen for auth state changes
  firebase.auth().onAuthStateChanged(onAuthStateChanged);

}, false);
