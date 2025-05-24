import React from 'react';
import styles from './Social.module.css';

const Social = ({ size='1em', color = 'var(--text-color)' }) => {
    const socalLinks = [
        { icon: 'bi bi-github', url: 'https://github.com/vtmattedi' },
        { icon: 'bi bi-linkedin', url: 'https://www.linkedin.com/in/vitor-mattedi-dev/' },
    ]
    return (
        <div className={styles.container}>
            {socalLinks.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className='mx-1'>
                        <span className={link.icon + ' ' + styles.icon} style={
                            {
                                fontSize: size,
                                color: color,
                            }
                        }></span>
                </a>
            ))}
        </div>
    );
};

export default Social;