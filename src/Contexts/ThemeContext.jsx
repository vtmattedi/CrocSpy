import { add } from 'dexie';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import availableLanguages from '../Translations/availableLenguages';


const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
    const [theme, _setTheme] = useState('light');
    const [locale, _setLocale] = useState('en-US');
    const [forceEnable, setForceEnable] = useState(false)
    const { i18n } = useTranslation();

    // Toggle between light and dark theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        //console.log("newTheme: ", newTheme);
        _setTheme(newTheme);
        saveState(newTheme, locale);
    };
    // Save theme and locale to local storage
    const saveState = (saveTheme, saveLocale) => {
        if (!saveTheme) {
            saveTheme = theme;
        }
        if (!saveLocale) {
            saveLocale = locale;
        }
        const savedThemes = localStorage.getItem('theme');
        if (savedThemes) {
            localStorage.removeItem('theme');
        }
        localStorage.setItem('theme', saveTheme);

        const savedLocale = localStorage.getItem('locale');
        if (savedLocale) {
            localStorage.removeItem('locale');
        }
        localStorage.setItem('locale', saveLocale);
    }
    // Load theme and locale from local storage
    const loadState = () => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            _setTheme(localTheme);
        }
        else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                _setTheme('dark');
            }
        }
        const localLocale = localStorage.getItem('locale');
        if (localLocale) {
            const isValidLocale = availableLanguages.find(lang => lang.locale === localLocale);
            // If the locale is not valid, remove it from local storage
            if (!isValidLocale) {
                localStorage.removeItem('locale');
                loadState();
                return;       
            }
            // If the locale is valid, set it
            if (process.env.REACT_APP_USE_TRANSLATION === 'true') {
                _setLocale(localLocale);
                i18n.changeLanguage(localLocale);
            }
            else {
                i18n.changeLanguage('en-US');
            }
        }
        else {
            if (process.env.REACT_APP_USE_TRANSLATION === 'true') {
                // If translations are enabled, set the locale to the browser's default language
                _setLocale(i18n.language);
            }
            else {
                // If translations are not enabled, set the locale to 'en-US'
                _setLocale('en-US');
                i18n.changeLanguage('en-US')
            }
        }

    }
    // set the locale from external source
    const setLocale = (newLocale) => {
        if (process.env.REACT_APP_USE_TRANSLATION === 'true' || forceEnable) {
                                    
                                    //Maybe add some validation here
                                    i18n.changeLanguage(newLocale);
                                    _setLocale(newLocale);
                                    saveState(theme, newLocale);
        }
        else {

                                        addAlert({
                                            title: 'English Only',
                                            text: `Altough this button is here, the app is only available in English for now.\n Once the translations are ready, the app will automatically swap to the prefered language.`,
                                        })
                                    }
    }
    useEffect(() => {
        loadState();
    }, []);
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, locale, setLocale, forceEnable, setForceEnable }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};