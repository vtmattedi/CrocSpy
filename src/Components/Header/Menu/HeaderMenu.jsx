import React, { useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTheme } from '../../../Contexts/ThemeContext';
import { Button, Dropdown, DropdownMenu } from 'react-bootstrap';
import styles from './HeaderMenu.module.css';
import availableLanguages from '../../../assets/languges';
import { Offcanvas } from 'react-bootstrap';
import LanguageSelector from '../../LanguageSelector/LanguageSelector';

const HeaderMenu = ({ show, handleClose }) => {
    const { theme, locale, toggleTheme, setLocale } = useTheme();

    const getClassName = () => {
        if (theme === 'light') {
            return "bi bi-moon-stars-fill";
        } else {
            return "bi bi-sun-fill";
        }
    }
    return (
        <Offcanvas show={show} onHide={handleClose} data-bs-theme={theme}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Button
                    onClick={() => {
                        toggleTheme();
                    }}
                    className={styles.themeButton}
                    data-bs-theme={theme}
                >
                    <div className={getClassName()}></div>
                </Button>
                <LanguageSelector />
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default HeaderMenu;