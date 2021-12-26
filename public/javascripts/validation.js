function validateForm(){
    var valid = $("#signUpForm").validate({
        rules:{
            fname:{
                required: true,
                maxlength: 30,
                lettersonly: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            lname:{
                required: true,
                maxlength: 30,
                lettersonly: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            number:{
                required: true,
                maxlength: 10,
                lettersonly: false,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            mail:{
                required: true,
                email: true,
                minlength: 5,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            pass:{
                required: true,
                minlength: 8,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            ConfirmPassword: {
                required: true,
                minlength: 8,
                normalizer: function(value) {
                    return $.trim(value);
                },
                equalTo: "#Password"
            }
        }
    })
    return valid;
}


jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z," "]+$/i.test(value);
}, "Only letters and spaces are allowed");


$(document).ready(function(){
    validateForm();
})