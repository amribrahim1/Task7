
// Reference Users collection
var databaseRef = firebase.database().ref('Blogs');

// Listen for form submit
document.forms.RegForm.addEventListener('submit', submitForm);

// Submit form
function submitForm() {
    $("#add-blog").submit();
    // Get values
    var Description = getInputVal('Description');
    var id1 = getInputVal('id');
    var Title = getInputVal('title');
    var imageFile = document.getElementById('img').files[0];

    //this VAR's are used in 'saveBlog()'; function. ---NOT IN USE---
    // unused value=5;  if false value=0; if true value=1
    var isSavedDatabase = false; //  if user data successfully commited to Firebase Database.
    var isSavedImage = false; //  if user image successfully commited to Firebase Storage.

    // Save User
    saveBlog(Title, Description, id1, imageFile);

}
    // Function to get get form values
    function getInputVal(id) {
        return document.getElementById(id).value;
    }

    // Save User to firebase
function saveBlog(Title, Description, id1, imageFile) {

    // reference to image path in storage 'passportImages/id1' (id1 is current user ID)
    var storage = firebase.storage();
	var imageRef = storage.ref().child('blogImages/' + id1);
	

    //save User to database
    var newUserRef = databaseRef.child(id1);
    newUserRef.set({
        Description: Description,
        Title: Title,
        id: id1,
    }, function (error) {
        if (error) {
            // The write failed
            console.log("Blog could not be added: " + error);
        } else {
            // Data saved successfully!
            isSavedDatabase = true;
            console.log("Blog added successfully!");
            saveImage(imageFile, id1);


            //imageRef.delete(); // remove user image from storage if his info could not be saved t database.
        }
    });




    //save image to storage by ID
    function saveImage(imageFile, id) {
        // Upload file to the object 'passportImages/id1' (id1 is current user ID)
        var uploadTask = firebase.storage().ref().child('blogtImages/' + id).put(imageFile);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {
                databaseRef.child(id).remove(); //remove user info from database if his image could not be uploaded to storage too.
                console.log(error);
                window.alert("Something went wrong, please try again");

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.log("Image: User doesn't have permission to access the object");
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        console.log("Image: User canceled the upload");
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        console.log("Image: Unknown error occurred, inspect error.serverResponse");
                        break;
                }
            }, function () {
                // Upload completed successfully!
                isSavedImage = true;
                console.log("Image uploaded successfully!");
                finalCall();
            });
        //if all data commited successfully to Firebase pop a massage and reset form.
        function finalCall() {


            // Show alert
            window.alert("Blog has been added!");



            // Clear form
            document.forms.RegForm.reset();
            window.location.reload();
        }
    }
    //}
}