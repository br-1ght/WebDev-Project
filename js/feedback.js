var firebaseConfig = {
    apiKey: "AIzaSyAS-yCvwnSFCDtDDoRAuoJ0fkhCaxQIpeE",
    authDomain: "displayfinder-a1bae.firebaseapp.com",
    databaseURL: "https://displayfinder-a1bae-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "displayfinder-a1bae",
    storageBucket: "displayfinder-a1bae.appspot.com",
    messagingSenderId: "1004333568102",
    appId: "1:1004333568102:web:f4b7318505687730059da7"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref('suggestions');

// Listen for form submit
document.getElementById("feedback_form").addEventListener("submit", submitForm);

// Send to firebase
function submitForm(event) {
  event.preventDefault();
  let name = getUserInput("Name")
  let email = getUserInput("Email")
  let reason = getUserInput("reason")
  let suggestion = getUserInput("suggestion")
  dataToFirebase(name, email, reason, suggestion)
  window.location.replace("feedback_success.html")
}

// Get value of user input
function getUserInput(id) {
  return document.getElementById(id).value;
}

// Save form data for firebase
function dataToFirebase(name, email, reason, suggestion) {
  var newMessageRef = messagesRef.push()
  newMessageRef.set({
    name: name,
    email: email,
    reason: reason,
    suggestion: suggestion,
  })
}