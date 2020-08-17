$(document).ready(function(){
    $('#timerButton').click(function(){
        $.ajax({
            type: 'POST',
            url: '/start-timer',
            data: {user: 'George'}
        })
            .done(function (data) {
                alert(data);
            });
    })
});