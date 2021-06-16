# Translations
 ***Configuration***
 all translations configured in `/assets/strings`
 ***Usage***
 The hook `useTranslation` return object with following data:
 * `t` - a function to receive key (and optional object) and return translated value. working as the common i18n
 * `lang` - current language (string)
 * `setLang` - function to update language (receive new language as a parameter) 
Above values can be inserted into class component by wrapping the component in `withTranslation` function. In this case component will get the above values as props.
