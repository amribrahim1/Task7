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
      database.ref().child('Blogs/').once('value', function(snapshot){
          if(snapshot.exists()){
              var content = '';
              snapshot.forEach(function(data){
                  var childKey = data.key;
                  var val = data.val();
                  var blogID = val.id;
                  content +='<li>';
                  content += '<dev>TITLE:<h2>' + val.Title + '</h2></dev><br>';
                  content += '<dev>' + '<img src="https://firebasestorage.googleapis.com/v0/b/test-a2f63.appspot.com/o/blogtImages%2F'+val.id+'?alt=media&token=f323e748-d698-4a1f-8845-4fe0e7f1a103"></dev></li>';
                  content += '<p>' + val.Description + '</p><br>';
                  content += '<dev>ID:&nbsp;&nbsp;&nbsp;' + val.id + '</dev><br>';
                  content += '<dev>' + '<button onClick="delete_blog(\''+childKey+'\')">delete blog</button></dev><br></li>';
                  content += '<dev><h2>Comments</h2></dev><br>';
                  content += '<table dir="ltr" class="'+blogID+'"><tr id="tr"><th>Name</th><th>Comment</th><th>Delete</th></tr></table>'; 
                  
                  firebase.database().ref('comments/'+blogID+'/').once('value')
                    .then(function(shot) {
                        if(shot.exists()){
                            var content = '';
                            shot.forEach(function(child){
                            var valo = child.val();
                            var Key = child.key;
                            content +='<tr>';
                            content += '<td>' + valo.Name + '</td>';
                            content += '<td>' + valo.notes + '</td>';
                            content += '<td>' + '<button onClick="delete_comment(\''+Key+'\','+blogID+')">delete comment</button></td></tr>';
                            content += '</tr>';
                            });
                        $('.'+blogID+'').append(content);
                        }
                    });
                  
                  content += '</li><br><br><br><br><br><br>';
              });
              $('#ex-list').append(content);
          }
        });
      
        function delete_blog(childKey){
            var result = confirm("Are you sure you want to delete?");
            if (result) {
                firebase.database().ref().child('Blogs/'+ childKey +'/').remove();
                alert('Deleted !');
                location.reload(true);	// To reload (refresh) the page after deleting.
            }
        }

        function delete_comment(Key,blogID){
            var result = confirm("Are you sure you want to delete?");
            if (result) {
                firebase.database().ref().child('comments/'+blogID+'/'+ Key +'/').remove();
                location.reload(true);	// To reload (refresh) the page after deleting.
            }
        }