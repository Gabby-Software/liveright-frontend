# Translations

**_Configuration_**
all translations configured in `/assets/strings`  
 **_Usage_**
The hook `useTranslation` return object with following data:

- `t` - a function to receive key (and optional object) and return translated value. working as the common i18n
- `lang` - current language (string)
- `setLang` - function to update language (receive new language as a parameter)
  Above values can be inserted into class component by wrapping the component in `withTranslation` function. In this case component will get the above values as props.

**_Related Commands_**

- `liveright export locales` - export existing translations into .xlsx file
- `liveright translations add <-f | -file> {filename}` - add new translation file
- `liveright translations populate <-f | -file> {filename} <-d | -dest> {destination-language}` - populate existing file from `en` to given language
