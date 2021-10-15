//= lib/Jquery.js
//= lib/bootstrap.bundle.min.js
//= lib/inputmask.js


$(document).ready(function(){  
    $('.nav-call-item').on('click', function(){
        var section = '.'+$(this).attr('data-section');
        $('.call-section').removeClass('active');
        $(section).addClass('active');
    })
})