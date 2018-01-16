// $("input[name=nameGoesHere]").val();
$.ajaxSetup({
    error : function(jqXHR, textStatus) {
        if(jqXHR.status == 400){
            alert('Password and email doesnt match');
        }
    }
        
});

$('#signup-form').on('submit',function(event){
    event.preventDefault();
 if(validateEmail($("#user-email2").val())){
     if(validatePassword($("#password2").val())){
        $.ajax({
            type: "POST",
            url: "/user",
            data: JSON.stringify({
                'email': $("#user-email2").val(),
                'password': $("#password2").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data,textStatus,response){
                var token = response.getResponseHeader('x-auth');
                window.localStorage.setItem('token',token);
                window.location.href = "todolist.html";
            }
        });
     }else{
         alert('Password should be of minimum 6 characters');
     }
 }else{
     alert('Email adress is not valid');
 }
});

$('#login-form').on('submit',function(event){
    event.preventDefault();
 if(validateEmail($("#user-email").val())){
     if(validatePassword($("#password").val())){
        $.ajax({
            type: "POST",
            url: "/user/login",
            data: JSON.stringify({
                'email': $("#user-email").val(),
                'password': $("#password").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data,textStatus,response){
                var token = response.getResponseHeader('x-auth');
                window.localStorage.setItem('token',token);
                window.location.href = "todolist.html";
            }
        });
     }else{
         alert('Wrong password');
     }
 }else{
     alert('Email adress is not valid');
 }
});



function validateEmail(email){
     emailPattern= /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
// return $.trim(Email).match(pattern) ? true : false;
if(emailPattern.test(email)){
    return true;
} 
else{
    return false;
}
}

function validatePassword(password){
    if(password.length<6){
        return false;
    }
    else{
        return true;
    }
}