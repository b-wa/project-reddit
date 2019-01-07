var userPosts = [];

//creates a function that holds user input(name and post values) in an object
var createPost = function() {
  var post = {
    name: $('#name').val(),
    message: $('#post').val(),
    comments: []
  };



//adds the value of our user input to an empty array and checks to make sure everything is working so far.
  userPosts.push(post);
}



//add an event listener that executes the function whenever the post button is clicked.
$('#post-button').click(function (e) {
  e.preventDefault();
  createPost()


//empty out your posts div so that you aren't replicating your posts
  $('.posts').empty();


//loop through our array containing the name and posts of our users and append the posts to our page. Everything is working as it should.
  for (var i = 0; i < userPosts.length; i++) {
    $('.posts').append('<p>' + userPosts[i].message +  '<br>' + '<b>'+ " Posted by: " + '</b>' + userPosts[i].name + '</p>')
  }
});

//create our HTML container for the comments section of our page.

var commentsHTML = '<div class="comments-container">' + '<div class="row">' + '<div class="col-sm-4">' + '<input type="text" class="form-control comment-text" placeholder="Comment Text">' + '</div>' + '<div class="col-sm-4">' + '<input type="text" class="form-control user-name" placeholder="User Name">' + '</div>' + '<div class="col-sm-4">' +
'<button type="button" class="btn btn-primary" id="add-comment">Post Comment</button>' + '</div>' + '</div>';

//adds an event listener that upon clicking post adds our new post to the page as well as a comment section and a remove button for that post. The remove button and the post comment button are currently not working. Also, whenever a new post is added, it should be added above the previous post. Right now, anytime a new post is added, a duplicate of the old post is made and the new post is added to the bottom.Not sure how to fix this

$('#post-button').click(function (e) {
  $('.posts').append('<div class="post">' + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="view-comments">comments</a> ' + ' Posted By: ' + '<strong>' + '</strong>' + commentsHTML + '</div>');
});

