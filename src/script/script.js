setInterval(function() {
    $.ajax({
        url: '/list/photo',
        success: function(data) {
            if (data && data.length >= 3) {
                img1name = data[data.length - 3];
                img2name = data[data.length - 2];
                img3name = data[data.length - 1];
                $('#img1').attr('src', 'uploads/' + data[data.length - 3]);
                $('#img2').attr('src', 'uploads/' + data[data.length - 2]);
                $('#img3').attr('src', 'uploads/' + data[data.length - 1]);

                $('#img1-timestamp').text(img1name);
                $('#img2-timestamp').text(img2name);
                $('#img3-timestamp').text(img3name);
            }
        }
    });
}, 2000);

