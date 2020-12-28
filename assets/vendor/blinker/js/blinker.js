(function($) {
    $.fn.blinker = function(options) {
        let interval;
        let stringPosition = 0;

        let settings = $.extend({
            strings: [],
            delay: '1500ms',
            duration: '1500ms',
            speed: '500ms'
        }, options);

        // first element
        $(this).html(settings.strings[stringPosition])
            .addClass('blinker')
            .css({
                'animation-timing-function': 'ease-in',
                'animation-iteration-count': 'infinite',
                'animation-duration': settings.duration,
                'animation-delay': settings.delay,
                'animation-name': 'blinkerFrames'
            });

        console.log(settings.duration)

        interval = setInterval(_ => {
            ++stringPosition;
            stringPosition = stringPosition > settings.strings.length - 1 ? 0 : stringPosition;
            $(this).html(settings.strings[stringPosition]);
        }, settings.delay);


        this.destroy = () => {
            clearInterval(interval);
            stringPosition = 0;
            $(this).html(settings.strings[0])
        };

        return this;
    }
}(jQuery));