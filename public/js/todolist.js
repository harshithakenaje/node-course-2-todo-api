$(document).ready(function(){
    getAllTodos();
// $("#addBtn").keypress(function(e){
//     console.log("Render to screen");
//     var key = e.which;
//     if(key == 13){
//         addTodo();
//     }
// });

$("#submitBtn").on('click',function(){
    addTodo();
});
$("#logOut").on('click',function(){
    $.ajax({
        type: "GET",
        url: "/user/logout",
        beforeSend:function(xhr){xhr.setRequestHeader('x-auth',window.localStorage.getItem('token'))},
        success: function(data){
            window.localStorage.clear();
            window.location.href="index.html";
        }
    })
});

$("#search-submit").on('click',function(event){
    event.preventDefault();
    // event.stopPropagation();
    if((jQuery("#searchBtn").val()==="")|| !jQuery("#searchBtn").val().trim()){
        alert('Text is required!!!!');
    }else{
    $.ajax({
        type: "POST",
        url: "/todos/search",
        data: JSON.stringify({text:$("#searchBtn").val().trim()}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend:function(xhr){xhr.setRequestHeader('x-auth',window.localStorage.getItem('token'))},
        success: function(todos){
            jQuery("#todoList").empty();
            jQuery("#searchBtn").val("");
            console.log('Here comes',todos);
            // todos.forEach(function(todo){
                console.log(todos);
                jQuery("#todoList")
                .append(jQuery('<li class="list-group-item">Match found</li>'))
                .append(jQuery('<li class="list-group-item list-group-item-primary">')
                // .append(jQuery('<li class="list-group-item list-group-item-success">')
                .append(jQuery('<span></span>').text(todos.text))
                .append(jQuery('<br/><li>Creator-id:</li>')
                .append(jQuery('<span></span>').text(todos._creator))));
            // });

        }
    })
    }
    
})

});


function getAllTodos(){
    var count=0;
    createReq("GET","/todos")
    .done(function(todos){
        todos.todos.forEach(function(todo){
            count++;
            jQuery("#todoList")
            .append(jQuery('<li class="list-group-item list-group-item-success">')
            .append(jQuery('<span></span>').text(todo.text)));
            jQuery("span.badge badge-light").text(count);
            
        });
        console.log(todos);
    });
}

function createReq(type,url){
    return $.ajax({
        type,
        url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend:function(xhr){xhr.setRequestHeader('x-auth',window.localStorage.getItem('token'))}

    });
}



function addTodo(){
    if((jQuery("#addBtn").val()==="")|| !jQuery("#addBtn").val().trim()){
        alert('Message is required!!!!');
    }
    else{
            var count=0;
        $.ajax({
            type: "POST",
            url: "/todos",
            data: JSON.stringify({text:$("#addBtn").val()}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend:function(xhr){xhr.setRequestHeader('x-auth',window.localStorage.getItem('token'))},
            success: function(todo){
                jQuery("#todoList")
                .append(jQuery('<li class="list-group-item list-group-item-success">')
                .append(jQuery('<span></span>').text(todo.text)));
                count++;
                jQuery("span.badge badge-light").text(count);
                // .prepend(jQuery('<i class="fa fa-check-square-o" aria-hidden="true"></i>')) ;
                // jQuery("#addBtn").val("");
                
            }
        });
    }
}
