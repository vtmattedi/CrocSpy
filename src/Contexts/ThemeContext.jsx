import { add } from 'dexie';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
    const [theme, _setTheme] = useState('light');
    const [locale, _setLocale] = useState('en-us');
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
        console.log("localTheme: ", localTheme);
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
            _setLocale(localLocale);
        }

    }
    // set the locale from external source
    const setLocale = (newLocale) => {
        //Maybe add some validation here
        i18n.changeLanguage(newLocale);
        _setLocale(newLocale);
        saveState(theme, newLocale);
    }
    useEffect(() => {
        loadState();
    }, []);
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, locale, setLocale }}>
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