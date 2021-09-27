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

    // маска для input
    //tel
    if ($('.input-phone').length > 0) {
        $('.input-phone').inputmask({
            "mask": "+7 (999) 999-9999[9]",
            clearMaskOnLostFocus: true,
        })
        $('.input-phone').keydown(function (event) {
            var value = ($(this).val().replace(/[^\d;]/g, '')) + event.key;
            var error_list = ['789', '779', '777', '788', '787', '786', '785', '784', '783', '782', '781', '780', '0', '1', '2', '3', '4', '5', '6', '7', '8']
            if (error_list.indexOf(value) != -1) {
                $(this).val('9').trigger('input');
                return false;
            }
        });
        $('.input-phone').focusout(function () {
            $(this).attr('placeholder', "Телефон")
        })
    }

})