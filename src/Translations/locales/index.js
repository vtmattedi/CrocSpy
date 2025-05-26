
/*
    How to add a new language:
    1. Create a new file in the locales folder with the name of the language code (e.g. fr-FR.js for French)
    2. Copy the contents of the en-US.js file and translate the strings to the new language
    3. Import the new file in this index.js file
    
*/

import ptBrTranslations from './pt-BR'
import enUsTranslations from './en-US'

export default {
  'pt-BR': ptBrTranslations,  
  'en-US': enUsTranslations   
}