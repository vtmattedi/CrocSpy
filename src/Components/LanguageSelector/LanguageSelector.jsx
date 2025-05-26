import React, { useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTheme } from '../../Contexts/ThemeContext';
import { Button, Dropdown } from 'react-bootstrap';
import styles from './LanguageSelector.module.css';
import availableLanguages from '../../Translations/availableLenguages';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import { use } from 'react';
const LanguageSelector = (props) => {
    const { theme, locale, setLocale } = useTheme();
    const { addAlert } = useGlobalContext();
    const invertedTheme = (t) => {
        if (t === 'light') {
            return 'dark';
        } else {
            return 'light';
        }
    }
    useEffect(() => {
        const t = availableLanguages.filter((language) => language.locale === locale)
        console.log("Language: ", locale);
        console.log("al: ", availableLanguages);
    }, [locale]);
    return (
        <Dropdown data-bs-theme={invertedTheme(theme)}>
            <Dropdown.Toggle id="dropdown-split-basic" data-bs-theme={invertedTheme(theme)}
                className={theme === 'dark' ? styles.languageButton : styles.languageButtonLight}>
                <ReactCountryFlag countryCode={availableLanguages.filter((language) => language.locale === locale)[0]?.flag} svg
                    style={{
                        fontSize: props.fontSize || '2em',
                    }}
                />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    availableLanguages.filter((language) => language.locale !== locale).map((language) => {
                        return (
                            <Dropdown.Item key={language.locale}

                                onClick={() => {
                                    //console.log("Language: ", language.locale);

                                    if (process.env.REACT_APP_USE_TRANSLATION === 'true') {
                                        setLocale(language.locale);
                                    }
                                    else {

                                        addAlert({
                                            title: 'English Only',
                                            text: `Altough this button is here, the app is only available in English for now.\n Once the translations are ready, the app will automatically swap to the prefered language.`,
                                        })
                                    }
                                }
                                }>
                                <div className={styles.languageItem}>
                                    <ReactCountryFlag countryCode={language.flag} svg />
                                    <p>{language.name}</p>
                                </div>
                            </Dropdown.Item>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>


    );
};

export default LanguageSelector;