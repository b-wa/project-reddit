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

var commentsHTML = '<div class="comments-container">' + '<div class="comments-list">' + '<div class="col-sm-4">' + '<input type="text" class="form-control comment-text" placeholder="Comment Text">' + '</div>' + '<div class="col-sm-4">' + '<input type="text" class="form-control user-name" placeholder="User Name">' + '</div>' + '<div class="col-sm-4">' + '<button type="button" class="btn post-comment">Post Comment</button>' + '</div>' + '</div>';


//add an event listener that executes the function whenever the post button is clicked.
$('#post-button').click(function (e) {
  e.preventDefault();
  createPost()


//empty out your posts div so that you aren't replicating your posts
  $('.posts').empty();


//loop through our array containing the name and posts of our users and append the posts to our page. Everything is working as it should.
  for (var i = 0; i < userPosts.length; i++) {
    var post = userPosts[i];

    $('.posts').append('<div class="post">'
    + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.message +
    commentsHTML + '<div> Posted By: <strong>' + post.name + '</strong></div> <hr> </div>')
  }
});

//adds an event listener that upon clicking post adds our new post to the page as well as a comment section and a remove button for that post. The remove button and the post comment button are currently not working. Also, whenever a new post is added, it should be added above the previous post. Right now, anytime a new post is added, a duplicate of the old post is made and the new post is added to the bottom.Not sure how to fix this

// $('#post-button').click(function (e) {
//   $('.posts').append('<div class="post">' + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + ' Posted By: ' + '<strong>' + '</strong>' + commentsHTML + '</div>');
// });

var createComment = function(name, text, postIndex) {
  var comment = {
    name: name,
    text: text
  }

  userPosts[postIndex].comments.push(comment);

  var $post = $('.posts').find('.post').eq(postIndex);

  $post.find('.comments-list').append(
    '<div class="comment">' + comment.name +
    'Posted By: <strong>' + comment.text + '</strong>' + '<a href= "#" class="delete-comment"><i class="fa fa-times" aria-hidden="true"></i></a>' +
    '</div>'
  );
};

var deleteComment = function(postIndex, commentIndex) {
  userPosts[postIndex].comments.splice(commentIndex, 1);
}

var deletePost = function(postIndex) {
  userPosts.splice(postIndex, 1);
}

//show all your comments for a given post
$('.posts').on('click', '.show-comments', function (e) {
  e.preventDefault();
  $(this).parent().children('.comments').toggle('.show');
});

//creates a comment
$('.posts').on('click', '.post-comment', function (e) {
  e.preventDefault();
  var name = $(this).siblings('.name').val()
  var text = $(this).siblings('.text').val()
  var postIndex = $(this).closest('.post').index();
  createComment(name, text, postIndex);
});

//deletes a comment
$('.posts').on('click', '.delete-comment', function () {
  var commentIndex = $(this).closest('.comment').index();
  var postIndex = $(this).closest('.post').index();
  deleteComment(postIndex, commentIndex);
  $(this).closest('.comment').remove();
});

// deletes the post (comments included)
$('.posts').on('click', '.remove', function () {
  var postIndex = $(this).closest('.post').index();
  deletePost(postIndex);
  $(this).closest('.post').remove();
});
