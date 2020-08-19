$(document).ready(function(){
    $('#timerButton').click(function(){
        $.ajax({
            type: 'POST',
            url: '/start-timer',
            data: {
                user: 'George',
                timerButtonText : $('#timerButton').text()
            }
        })
        .done(function (data) {
            if(data && data.error){
                alert(data.message);
            }
            $('#timerButton').text(data.buttonText);
        });
    })
});