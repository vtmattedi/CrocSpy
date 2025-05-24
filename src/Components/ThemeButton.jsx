import React from 'react';
import { useTheme } from '../Contexts/ThemeContext';
import { Button } from 'react-bootstrap';

const ThemeButton = (props) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            {...props}
            variant='outline'
            bs-data-theme={theme}
            style={{
                color: theme === 'dark' ? 'LightBlue ' : ' rgba(204, 161, 6, 0.834)',
                borderColor: theme === 'dark' ? 'white' : 'black',
                borderWidth: props.borderwidth || '1px',
                background: 'argba(0, 0, 0, 0)',
            }}
            onClick={() => {
                toggleTheme();
            }}
        >
            <div > <i className={theme === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-brightness-high-fill'}></i></div>
        </Button>
    );
};

export default ThemeButton;