// Initialize Firebase
var config = {
  apiKey: "AIzaSyC-pMGLqJZUEvexMM2pFiIuyGW4zbjH6Kk",
  authDomain: "lavanya-beauty-clinic-website.firebaseapp.com",
  databaseURL: "https://lavanya-beauty-clinic-website.firebaseio.com",
  projectId: "lavanya-beauty-clinic-website",
  storageBucket: "lavanya-beauty-clinic-website.appspot.com",
  messagingSenderId: "613959501953"
};
firebase.initializeApp(config);

function makeid(name) {
  // Scraping file extension

  filename = name.substring(0, x.lastIndexOf("."));
  fileextension = name.substring(x.lastIndexOf("."));

  //Creating a timestamp
  var currentDate = new Date();

  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Note - January is 0 not 1
  var year = currentDate.getFullYear();
  var time = currentDate.getTime();

  var timestamp = date + "-" + (month + 1) + "-" + year + "-" + time;
  var newname = name + "_" + timestamp + "." + fileextension;

  // Add function for checking for duplications HERE (if necessary)
  return newname;
}

var fileButton = document.getElementById("fileButton");
fileButton.addEventListener("change", function(e) {
  var file = e.target.files[0];
  var storageRef = firebase.storage().ref();
  var metadata = {
    contentType: "image/jpeg"
  };

  //here .child function is to create new folder(randomfolder) for uploading images.
  //Its added to avoid replacing of the images with same name.

  // storageRef.child('/images/').put(file, metadata).then(function (snapshot) {
  var randomfolder = makeid(file.name);
  storageRef
    .child("images/" + randomfolder)
    .put(file, metadata)
    .then(function(snapshot) {
      console.log("Uploaded", snapshot.totalBytes, "bytes.");
      console.log(snapshot.metadata);

      var url = snapshot.downloadURL;

      console.log("File available at", url);

      // [START_EXCLUDE]
      // --->  Sample way to retireve data from firestore (download url is 'url')
      document.getElementById("linkbox").innerHTML =
        '<a href="' + url + '"> Click For File</a>';

      //   Add URL to firebase
      var database = firebase.database();
      var dataRef = database.ref("/Gallery/" + randomfolder);
      //.ref('/newData/' + "nameOfNewParent");
      console.log("url is " + url);
      dataRef.set({
        Name: "Heyy",
        Folder: randomfolder,
        //Description and other stuff goes here
        URL: url
      });
      //Ending Add URL to firebase section

      // [END_EXCLUDE]
    })
    .catch(function(error) {
      // [START onfailure]
      console.error("Upload failed:", error);
      // [END onfailure]
    });
  // [END oncomplete]
});

console.log("Welcome to the Admin Page!");
