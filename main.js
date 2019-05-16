var userPosts = [];

//creates a function that holds user input(name and post values) in an object
var createPost = function() {
  var post = {
    name: $('#name').val(),
    message: $('#post').val(),
    comments: []
  };

var commentsHTML = '<div class="commentsContainer">' + '<div class="comments-list"></div>' + '<input type="text" class="text" placeholder="Comment">' + '<input type="text" class="name" placeholder="Name"><button class="btn post-comment">Post Comment</button></div>';


//adds the value of our user input to an empty array and checks to make sure everything is working so far.
userPosts.push(post);

//append to DOM;
$('.posts').append('<div class="post">'
+ '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.message +
commentsHTML + '<div> Posted By: <strong>' + post.name + '</strong></div> <hr> </div>');

//empty out your posts div so that you aren't replicating your posts
$('#name').val("");
$('#post').val("");

};

$('#post-button').click(function (e) {
  e.preventDefault();
  createPost()
});

var createComment = function(name, text, postIndex) {
  var comment = {
    name: name,
    text: text
  }

  userPosts[postIndex].comments.push(comment);
    
  var $post = $('.posts').find('.post').eq(postIndex);
  
  $post.find('.comments-list').append(
    '<div class="comment">' + comment.text +
    ' Posted By: <strong>' + comment.name + ' </strong>' + '<a href="#" class="delete-comment">Delete<i class="fa fa-times" aria-hidden="true"></i></a>' +
    '</div>'
  );
  
  $('.name').val("");
  $('.text').val("");
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
  var name = $(this).siblings('.name').val();
  var text = $(this).siblings('.text').val();
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


