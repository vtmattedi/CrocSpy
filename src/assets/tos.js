

const TOS_VERSION = '1.5.0';
const TOS_DATE = '2023-10-01';

const getTos = (locale) => {
    console.log('getTos', locale);

    if (locale === 'en-us') {
        return {
            title: 'Terms of Service',
            text: 'This is a sample text for the Terms of Service. Please replace this with your own text.',
            version: TOS_VERSION
        }
    }

    else if (locale === 'de-de') {
        return {
            title: 'Nutzungsbedingungen',
            text: 'Dies ist ein Beispieltext für die Nutzungsbedingungen. Bitte ersetzen Sie diesen durch Ihren eigenen Text.',
            version: TOS_VERSION
        }
    }

    else 
    {
        return {
            title: 'Termos de Serviço',
            text: 'Este é um texto de exemplo para os Termos de Serviço. Por favor, substitua-o pelo seu próprio texto.',
            version: TOS_VERSION
        }
    }

};

export { getTos, TOS_VERSION, TOS_DATE };