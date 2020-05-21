    var config = {
    apiKey: "AIzaSyAqpot2vodBMGEuW9VWCbqu-DFeKsLOyLo",
    authDomain: "test-a2f63.firebaseapp.com",
    databaseURL: "https://test-a2f63.firebaseio.com",
    projectId: "test-a2f63",
    storageBucket: "test-a2f63.appspot.com",
    messagingSenderId: "153323254705",
    appId: "1:153323254705:web:32f4522a0d2f80577a4390"
    };
    firebase.initializeApp(config);
database = firebase.database();

var database = firebase.database();
    database.ref('Blogs/').orderByKey().once('value')
    .then(function(snapshot) {
        if(snapshot.exists()){
            var content = '';
            snapshot.forEach(function(data){               
                var val = data.val();
                var blogID = val.id;
                content +='<li>';
                content += '<h2>' + val.Title + '</h2><br>';
                content += '<dev>' + '<img src="https://firebasestorage.googleapis.com/v0/b/test-a2f63.appspot.com/o/blogtImages%2F'+val.id+'?alt=media&token=f323e748-d698-4a1f-8845-4fe0e7f1a103"></dev></li>';
                content += '<div class="description">' + val.Description + '</div><br>';
                content += '<h3>Comments:</h3>';
                content += '<form id="'+blogID+'form"><input class="form-group" id="'+blogID+'n" type="text" placeholder="Your Name" required><br><textarea class="form-group" id="'+blogID+'" placeholder="Your Comment" required></textarea><br><input type="submit" class="btn btn-default" onclick="submitComment('+blogID+')" value="add comment"></form><br></li>';
                content += '<div class="comments" id="'+blogID+'c"></div>'; 
                
                firebase.database().ref('comments/'+blogID+'/').once('value')
                .then(function(shot) {
                    if(shot.exists()){
                        var allCommentsHtml = "";  
                        shot.forEach(function(child){
                            var valo = child.val();
                            console.log(valo);
                            var individialCommentHtml = '<div class="comment"><p>Name:&nbsp;&nbsp;' + valo.Name + '</p><p>Comment:&nbsp;&nbsp;' + valo.notes + '</p></div><hr>';
                            allCommentsHtml = allCommentsHtml + individialCommentHtml;
                        });
                        $('#'+blogID+'c').html(allCommentsHtml);
                    }
                });
            

                content += '</li><br>';
            });
            
            $('#ex-list').append(content);
        }
        
    });


    // ---------------------------------------------------------------------- //

    // add comments under all the blogs.    
    //initialize your firebase
		
		var database = firebase.database();
		
		//create a variable to hold our orders list from firebase
		var firebaseOrdersCollection = database.ref().child('BlogComments');

		//this function is called when the submit button is clicked
		function submitComment() {

			//Grab order data from the form
			var order = {
				fullName: $('#Name').val(), //another way you could write is $('#myForm [name="fullname"]').
				notes: $('#Comment').val(), //another way you could write is $('#myForm [name="fullname"]').
			};
			
			//'push' (aka add) your order to the existing list
			firebaseOrdersCollection.push(order); //'orders' is the name of the 'collection' (aka database table)
			
		};
		
		//create a 'listener' which waits for changes to the values inside the firebaseOrdersCollection 
		firebaseOrdersCollection.on('value',function(orders){
			
			//create an empty string that will hold our new HTML
			var allOrdersHtml = "";
			
			//this is saying foreach order do the following function...
			orders.forEach(function(firebaseOrderReference){
				
				//this gets the actual data (JSON) for the order.
				var order = firebaseOrderReference.val();
				console.log(order); //check your console to see it!
				
				//create html for the individual order
				//note: this is hard to make look pretty! Be sure to keep your indents nice :-)
				//IMPORTANT: we use ` here instead of ' (notice the difference?) That allows us to use enters
				var individialOrderHtml =	`<div class='item'>
												<p>Name: `+order.fullName+`</p>
												<p>Comment: `+order.notes+`</p><br>
											</div>`;
				
				//add the individual order html to the end of the allOrdersHtml list
				allOrdersHtml = allOrdersHtml + individialOrderHtml;
			});
			
			//actaull put the html on the page inside the element with the id PreviousOrders
			$('#previousComments').html(allOrdersHtml);
			
			//note: an alternative approach would be to create a hidden html element for one order on the page, duplicate it in the forEach loop, unhide it, and replace the information, and add it back. 
		});

// -----------------------------------------------------------------------------------------//

// add comment for each blog only and display it under the blog
function submitComment(blogID) {

    //initialize your firebase
              
    var firebaseOrders = database.ref().child('comments/'+ blogID +'/');
    //Grab order data from the form
    var comment = {
        Name: $('#'+blogID+'n').val(),
        notes: $('#'+blogID+'').val(), //another way you could write is $('#myForm [name="fullname"]').
    };
                    
    //'push' (aka add) your order to the existing list
    firebaseOrders.push(comment); //'orders' is the name of the 'collection' (aka database table)
        
};
// -------------------------------------------------------------------------- //
