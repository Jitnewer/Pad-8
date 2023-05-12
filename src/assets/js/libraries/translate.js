/**
 * Localization-extension for the FYS.Cloud library
 *
 * @author Lennard Fonteijn
 *
 * @namespace Localization
 *
 * @since 0.0.3
 */

export class Translate {
    static localization;
    static activeLanguage;


    static setTranslations(translations) {
        Translate.localization = translations;
    }

    static switchLanguage(language) {
        Translate.activeLanguage = language;
        Translate.translate(true);
    }


    static translate(force) {
        var selector = force
            ? "[data-translate]"
            : "[data-translate]:not([localized])";
        document.querySelectorAll(selector).forEach(function (element) {
            var localizeKey = element.dataset.translate;
            var localizeKeys = localizeKey.split(".");
            var result = Translate.localization;

            for (var i = 0; i < localizeKeys.length; i++) {
                result = result[localizeKeys[i]];
                if (result === undefined) {
                    break;
                }
            }
            element.setAttribute("translated", "");
            element.innerHTML = result && result[Translate.activeLanguage]
                ? result[Translate.activeLanguage]
                : "[".concat(localizeKey, "]");
        });
    }
}