(function() {

    /* Setup video introduction  */

    let introVideo = document.getElementById('video-introduction');
    if (introVideo) {
        introVideo.addEventListener('ended', event => $('.video-introduction').fadeOut(1200));
        introVideo.oncanplaythrough = event => introVideo.play()
    }

    /* Setup dragable element */

    $('.dragend').dragend({
        afterInitialize: function() {
            let dragend = this;
            this.pages.map(function() {
                let page = $(this);
                let pageHeight = page.height();
                page.height(pageHeight / (dragend.pages.length + .7));
            });
        },
        onDragEnd: function(activeElement, e, pageNumber) {
            if ($(activeElement).parent().hasClass('carousel-services')) {
                let carousel = $($(activeElement).parent()).carousel();
                carousel.carousel(pageNumber);
            }
        }
    }).find('.dragend-page').addClass('p-2');

    /* Contact Us Form Submition */

    $('#contact-us-form').submit(function(event) {
        let form = $(this);
        let alerts = form.find('.alert');
        let alertSuccess = form.find('.alert.alert-success');
        let alertDanger = form.find('.alert.alert-danger');
        let loader = $('.loader.sending-contact-form')

        function displayMessage(response) {
            alertSuccess.find('.title').html(response.message);
            alertSuccess.removeClass('d-none');
        }

        function displayError(error) {
            let err = error.responseJSON;
            if (err) {
                let htmlErrors = '';
                Object.values(err.errors)
                    .map(e => htmlErrors += '<li>' + e.toString().split(',').join('.<br>') + '.</li>');
                alertDanger.find('.title').html(err.message);
                alertDanger.find('.errors').html(htmlErrors);
            } else {
                alertDanger.find('.title').html('Something went wrong when tring to send message.');
                alertDanger.find('.errors').html('');
            }
            alertDanger.removeClass('d-none');
        }

        alerts.addClass('d-none');
        loader.removeClass('d-none');

        $.post('api/contact-us.php', form.serialize())
            .done(function(message) {
                displayMessage(message);
                form.trigger('reset');
                $('.loader.sending-contact-form').toggleClass('d-none');
            })
            .fail(function(error) {
                displayError(error);
                loader.addClass('d-none');
            });

        event.preventDefault();
    });
}());