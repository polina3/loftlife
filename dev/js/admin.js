//= lib/Jquery.js
//= lib/bootstrap.bundle.min.js
//= lib/inputmask.js


$(document).ready(function(){  
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
})