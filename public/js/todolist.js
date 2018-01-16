var incomplete=0;
    var completed=0;
   
$(document).ready(function(){
    getAllTodos();
    //   event.preventDefault();
// $("#addBtn").keypress(function(e){
//     console.log("Render to screen");
//     var key = e.which;
//     if(key == 13){
//         addTodo();
//     }
// });
$.ajaxSetup({
    error : function(jqXHR, textStatus) {
        if(jqXHR.status == 404){
            alert('Element not found');
        }
        else if(jqXHR.status === 400){
            // alert('Password and email doesnt exists');
        }
    }
        
});
$("#submitBtn").on('click',function(event){
    addTodo();
     
});
// $("addBtn").on('click',function(){
//     addTodo();
// });
$("#logOut").on('click',function(){
    $("#logOut").text("Loging Out");
    $.ajax({
        type: "GET",
        url: "/user/logout",
        beforeSend:function(xhr){xhr.setRequestHeader('x-auth',window.localStorage.getItem('token'))},
        success: function(data){
            // window.localStorage.clear();
            window.location.href="index.html";
        }
    })
});

$("#search-submit").on('click',function(event){
    event.preventDefault();
    searchTodo();
    // event.stopPropagation();
    
});
$("#searchBtn").keypress(function(event){
     
    //  event.stopPropagation();
    var keys= event.which;
   
    if(keys== 13){
        
       searchTodo();
       event.stopPropagation();
       event.preventDefault();
    }
    // event.stopPropagation();
    // event.preventDefault();
})
$('#resetBtn').on('click',function(event){
    event.preventDefault();
    jQuery("#todoList").empty();
    completed=0;
    incomplete=0;
    getAllTodos();
})
 function searchTodo(){
     console.log('inside serch');
     var text=jQuery("#searchBtn").val().trim();
     if((jQuery("#searchBtn").val()==="")|| !text){
        alert('Text is required!!!!');
    }else{
        console.log('Control is inside');
    $.ajax({
        type: "POST",
        url: "/todos/search",
        data: JSON.stringify({text:text}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend:function(xhr){xhr.setRequestHeader('x-auth',window.localStorage.getItem('token'))},
        success: function(todos){
                console.log('todos',todos);
                jQuery("#todoList").empty();
                 jQuery("#searchBtn").val("");
                 todos.forEach(function(todo){
                     displayTodo(todo.text,todo.completed);
                 })
                }
        })
    }
    
 }
});


function getAllTodos(){
    console.log('Getting all todos');
    createReq("GET","/todos")
    .done(function(todos){
        todos.todos.forEach(function(todo){
            displayTodo(todo.text,todo.completed);
            // console.log(todo.completed);
            if(todo.completed){
                completed++;
            }else{
                incomplete++;
            }
            
        });
        
           jQuery('.badge.badge-light').text(completed);
             jQuery('.badge.badge-danger').text(incomplete);
        console.log(todos);
    });
}

$("#completedBtn").on('click',function(){
createReq("GET","/todos")
.done(function(todos){
    jQuery("#todoList").empty();
    todos.todos.forEach(function(todo){
        if(todo.completed){
            displayTodo(todo.text,todo.completed);
        }

        // if(todo.completed){
        //  jQuery("#todoList")
        //     .append(jQuery('<li class="list-group-item list-group-item-success">')
        //     .append(jQuery('<span></span>').text(todo.text))
        //     .append(jQuery('<span class="indent"></span><button type="button" class="btn btn-outline-danger">Delete</button>'))
        //     .append(jQuery('<button type="button" class="btn btn-outline-info">Edit</button>')));
        // }
    });
});

});

$("#notCompletedBtn").on('click',function(){
createReq("GET","/todos")
.done(function(todos){
    console.log(todos);
    jQuery("#todoList").empty();
    todos.todos.forEach(function(todo){
        if(!todo.completed){
             displayTodo(todo.text,todo.completed);
        }
        // displayTodo(todo.text,todo.completed);
        // if(!todo.completed)
    });
});

});

$(document).on('click',".btn.btn-outline-danger.btn-sm", function(event){
    event.stopPropogation();
    console.log('Delete enterd');
    // var text= $(this).parent().attr('text');
    $(this).parent().children().each(function(child){
            if(this.tagName === "SPAN"){//text is inside the span tag
            text = this.innerText;
             return false;
             }
});
    console.log('Simple',text);
    findId(text)
    .done(function(id){
        console.log(id);
        $.ajax({
        type: "DELETE",
        url: "/todos/"+id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend:function(xhr){xhr.setRequestHeader('x-auth',window.localStorage.getItem('token'))},
        success: function(todo){
            if(todo.completed==true){
                completed--;
                 jQuery('.badge.badge-light').text(completed);
            }else{
                incomplete--;
                jQuery('.badge.badge-danger').text(incomplete);
            }
        }
    });
    jQuery("#todoList").empty();
    getAllTodos();
    }).catch((e)=>{
        // console.log(e);
    })
    
});

$(document).on('click',".btn.btn-outline-success.btn-sm",function(event){
    event.stopPropagation();
    var enterPress=false;
    $(this).parent().children().each(function(child){
        if(this.tagName==="SPAN"){
            text=this.innerText;
            this.innerText="";
            return false;
        }
    });
    $(this).parent().append(jQuery('<input autofocus></input>').addClass('input').val(text));
    $('.input').on('focus',function(e){
        $(this).keypress(function(event){
            event.preventDefault();
            event.stopPropagation();
            var key=event.keyCode;
            // console.log(key);
            if(key == 13){
                enterPress=true;
                newText=$(this).val(); 
                //  $(this).parent().children().remove("#input");
                // console.log(newText);
                    $(this).hide();
                if(newText.trim()){
                   $(this).parent().children().each(function(child){
                    if(this.tagName==="SPAN"){
                    this.innerText=newText;
                    console.log(this.innerText);
                     return false;
                  }
                }); 
                findId(text)
                .done(function(id){
                    console.log(id,newText)
                    $.ajax({
                         type:"PATCH",
                        url: "/todos/"+id,
                        data: JSON.stringify({"text":newText,"completed":false}),
                         contentType: "application/json; charset=utf-8",
                        dataType: "json",
                         beforeSend:function(xhr){xhr.setRequestHeader('x-auth',window.localStorage.getItem('token'))}
                    })
                    .fail(function(e){
                        alert(e);
                    })
                })
              }else{
                  alert('Cannot edit with empty string');
                  $(this).parent().children().each(function(child){
                    if(this.tagName==="SPAN"){
                    this.innerText=text;
                     return false;
                  }
                }); 
              }
            }
         })
        .promise().done(function(){
            $(this).on('focusout',function(e){
                if(!enterPress){
                    e.stopPropagation();
                    var newText=$(this).val();
                    $(this).hide();
                    if(newText.trim()){
                        $(this).parent().children().each(function(child){
                        if(this.tagName==="SPAN"){
                        this.innerText=newText;
                    //  console.log(this.innerText);
                        return false;
                         }
                        }); 
                        findId(text)
                        .done(function(id){
                            $.ajax({
                               type:"PATCH",
                                 url: "/todos/"+id,
                                 data: JSON.stringify({"text":newText,"completed":false}),
                                 contentType: "application/json; charset=utf-8",
                                 dataType: "json",
                                 beforeSend:function(xhr){xhr.setRequestHeader('x-auth',window.localStorage.getItem('token'))},
                            })  
                        .fail(function(e){
                        alert(e);
                         })
                        })
                        
                    }else{
                        alert('Cannot edit with empty string');
                         $(this).parent().children().each(function(child){
                        if(this.tagName==="SPAN"){
                        this.innerText=text;
                         return false;
                        }
                        }); 
                    }
                }
            });
                
        });
           
    });
});



function findId(text){
  return  $.ajax({
        type: "POST",
        url: "/todos/findId",
        data: JSON.stringify({text}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend:function(xhr){xhr.setRequestHeader('x-auth',window.localStorage.getItem('token'))}
    
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
                displayTodo(todo.text,todo.completed);
                 
            }
        });
    }
}

function displayTodo(text,completed){
    if(completed ===true){
            jQuery("#todoList")
            .append(jQuery('<li class="list-group-item list-group-item-success"></li>')
            .append(jQuery('<i class="fa fa-check" aria-hidden="true"></i>'))
            .append(jQuery('<span ></span>').text(text))                 
            .append(jQuery('<button type="button" class="btn btn-outline-danger btn-sm" id="deleteBtn">').append(' <i class="fa fa-trash-o" aria-hidden="true"></i>'))
            .append(jQuery('<button type="button" class="btn btn-outline-success btn-sm" id="editBtn">').append(' <i class="fa fa-pencil" aria-hidden="true"></i>')));

    }else{
        jQuery("#todoList")
            .append(jQuery('<li class="list-group-item list-group-item-danger">')
            .append(jQuery('<span ></span>').text(text))                    
            .append(jQuery('<button type="button" class="btn btn-outline-danger btn-sm" id="deleteBtn">').append(' <i class="fa fa-trash-o" aria-hidden="true"></i>'))
            .append(jQuery('<button type="button" class="btn btn-outline-success btn-sm" id="editBtn">').append('<i class="fa fa-pencil" aria-hidden="true"></i>')));

    }
}