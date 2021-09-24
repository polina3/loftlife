//= lib/Jquery.js
//= lib/bootstrap.bundle.min.js
//= lib/inputmask.js
//= lib/lazyload.js


$(document).ready(function(){  
    // прошлое положение страницы
    var lastScrollTop = 0;
    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            $("header").addClass("hidden");
        } else {
            
            $("header").removeClass("hidden");
        }
        lastScrollTop = st;
    });
})