(function($) {
    function fectchLanguageTranslation(options) {
        return $.get(`${options.path}/${options.prefix}${options.language}.json`);
    }

    function fectchLanguageTranslationError(error) {

    }

    function translateElement(element, text) {
        $(element).empty().append(text);
    }

    function translatePageElements(elements, translation, options) {
        elements.each(function() {
            let attrValue = $(this).attr(options.attribute);
            let translationText = translation[attrValue];

            if (translationText != undefined)
                translateElement(this, translationText)
            else
                console.warn(`Translation for ${attrValue} does not exists in ${options.language} language.`, this)
        });
    }

    $.fn.language = function(options) {
        return new Promise((resolve, reject) => {
            let settings = $.extend({
                attribute: 'data-i18n',
                language: $('html').attr('lang'),
                path: 'i18n',
                prefix: ''
            }, options);

            fectchLanguageTranslation(settings).then(
                translation => {
                    translatePageElements(this, translation, settings);
                    resolve(translation);
                },
                error => {
                    fectchLanguageTranslationError(error);
                    reject(translation);
                }
            );
        });
    }
}(jQuery))