//= lib/Jquery.js
//= lib/bootstrap.bundle.min.js
//= lib/inputmask.js


$(document).ready(function(){  

    $('.js-validate').submit(function (e) {
        var form = $(this);
        form.find('*[data-validate]').each(function (i, elem) {
            var value = $(elem).val();
            if ((!value || value === undefined || value === null || value === '')) {
                $(elem).addClass('is-invalid');
                setTimeout(function () {
                    $(elem).removeClass('is-invalid')
                }.bind(elem), 2000);
                e.preventDefault();
            }
        })
    })

    $('.nav-call-item').on('click', function(){
        var section = '.'+$(this).attr('data-section');
        $('.call-section').removeClass('active');
        $(section).addClass('active');
    })

    $('.table-call__status').on('change', function(){
        var idRow = $(this).attr('data-id');
        var newStatus = $(this).val();
        console.log(newStatus);     
        $.ajax({
            url: '/modules/admin/controller/ajax/leadEditingStatus.php',        
            method: 'post',                     
            data: {id: idRow, status: newStatus},     
            success: function(data){   
                location.reload();         
            }
        });
    })

    $('.table-call__del').on('click', function(){
        var idRow = $(this).attr('data-id');  
        $.ajax({
            url: '/modules/admin/controller/ajax/leadDel.php',        
            method: 'post',                     
            data: {id: idRow},     
            success: function(data){   
                location.reload();         
            }
        });
    })

    $('.btn-av').on('click', function(){  
        $.ajax({
            url: '/modules/admin/controller/ajax/leadDel.php',        
            method: 'post',                     
            data: {id: idRow},     
            success: function(data){   
                location.reload();         
            }
        });
    })


    
})