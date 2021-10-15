//= lib/Jquery.js
//= lib/bootstrap.bundle.min.js
//= lib/inputmask.js
//= lib/lazyload.js
//= lib/moment.min.js



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

    // валидация и отправка
    $('.js-validate').submit(function (e) {
        e.preventDefault();
        var form = $(this);
        var error = 0;
        form.find('*[data-validate]').each(function (i, elem) {
            var value = $(elem).val();
            var type = $(elem).attr("type");
            if ((!value || value === undefined || value === null || value === '' || value === '0')) {
                $(elem).addClass('is-invalid');
                setTimeout(function () {
                    $(elem).removeClass('is-invalid')
                }.bind(elem), 2000);
                error++;
            }
            if (type == "tel") {
                let s = $(elem).val().search('_')
                if (($(elem).val().length == 0) || (s != -1)) {
                    $(elem).addClass('is-invalid');
                    setTimeout(function () {
                        $(elem).removeClass('is-invalid')
                    }.bind(elem), 2000);
                    error++;
                }
            }
        })
        if(error == 0){
            var dataForm = form.serialize()+'&date='+moment().format("YYYY-MM-DD HH:mm:ss")
            
            $.ajax({
                url: '/controller/ajax/addLead.php',
                method: 'post',
                dataType: 'html',
                data: dataForm,
                success: function(data){
                    console.log(data);
                    form.find('.form-control').val('');
                    $('#modal--lead').modal('hide')
                    $('#modal--success').modal('show')
                }
            });
        }
    })
})