/*
    How to add a new language:
    1. Create a new file in the locales folder with the name of the language code (e.g. fr-FR.js for French)
    2. Copy the contents of the en-US.js file and translate the strings to the new language
    3. Import the new file in ./locales/index.js file
    4. Add the new language to the availableLanguages.js file:
    
*/

/*
    Flag uses React Country Flag:
    the flag is passed as the code prop to the component
    https://www.npmjs.com/package/react-country-flag
*/
const availableLanguages = [
    {
        locale: 'en-US',
        name: 'English',
        flag: 'US'
    },
    {
        locale: 'pt-BR',
        name: 'Português',
        flag: 'BR'
    },
]

export default availableLanguages;