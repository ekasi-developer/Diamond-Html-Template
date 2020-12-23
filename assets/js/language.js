(function() {
    const LangaugesIcon = { en: 'flag-icon flag-icon-gb-eng', pt: 'flag-icon flag-icon-mz' };
    let btnSelectLanguage = $('.select-language');
    let mainIcon = $('#seleted-language-icon');
    let displayTyped;

    function getCurrentLanguage() {
        return $.cookie('language') ? $.cookie('language') : $('html').attr('lang');
    }

    function setLanguage(language) {
        if (LangaugesIcon[language] == undefined) return;
        $.cookie('language', language, { expires: 7, path: '/' })
        fetchLanguage(language);
    }

    function changeLanguagesIcon(language) {
        btnSelectLanguage.map(function() {
            let elem = $(this).addClass('d-none');
            if (elem.attr('value') != language) elem.removeClass('d-none');
        });
        mainIcon.removeClass().addClass(LangaugesIcon[language]);
    }

    function fetchLanguage(language) {
        $('[data-i18n]').language({ language: language })
            .then(_ => setTimeout(_ => homeTypeSetup(), setUpEqualContainerHeight(), 1500));
        changeLanguagesIcon(language);
    }

    function homeTypeSetup() {
        if (displayTyped) displayTyped.destroy();
        if ($('.display-typed').length == 1) {
            var typed_strings = $('.home-typed').text();
            displayTyped = new Typed('.display-typed', {
                strings: typed_strings.split(','),
                typeSpeed: 80,
                loop: true,
                backDelay: 1100,
                backSpeed: 80
            });
        }
    }

    function setUpEqualContainerHeight() {
        $('.card-what-we-offer').matchHeight();
        $('.card-career').matchHeight();
    }

    // Language Setup

    setLanguage(getCurrentLanguage());

    btnSelectLanguage.click(function() { setLanguage($(this).attr('value')); });


}());