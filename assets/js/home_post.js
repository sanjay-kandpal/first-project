{
    console.log("home.ejs is running");
    // method to submit the from data for new post using ajax
let createPost = function(){
    let newPostForm = $('#new-post-form'); 

    newPostForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostForm.serialize(),
            success: function(data){
                let newPost = newPostDOM(data.data.post);
                $('#posts-list-container>ul').prepend.(newPost); 
                console.log(data);
            },error: function(err){
                console.log(error.responseText);
            }
        })
    });
}
 // method to create a post in DOM
 let newPostDOM = function(post){
     return $(` <li id="post-${post._id}"> 
     <p>
        
            <a class="delete-post-button" href="/posts/destroy/ ${post.id }" type="submit">Delete Post</a>
            <%}%>
        ${ post.content }
        <br>
        <small>
             ${post.user.name}
        </small>
     </p>
     <div class="post-comments">
       
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                <input type="hidden" name="post" value="${ post._id}" >
                <input type="submit" value="Add Comment">
                
            </form>
    
      
    
        <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
                
            </ul>
        </div>
     </div>
    
    </li> `)
 }
createPost();

}