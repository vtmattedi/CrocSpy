import React, { useEffect, useState, useRef } from 'react';
import styles from './Loader.module.css';
import { TrophySpin } from 'react-loading-indicators';
import { Modal } from 'react-bootstrap';
import { useTheme } from '../../../Contexts/ThemeContext';
const Loader = ({ show }) => {
    const [dots, setDots] = useState(0);
    const {theme} = useTheme();
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => { return (prev + 1) % 4 });
        }, 500);
        return () => clearInterval(interval);
    }, []);
    return (
        <Modal show={show} data-bs-theme={theme} >

            <div className={styles.loader}>
                <div className={styles.loaderText}>
                    {"Loading image" + ".".repeat(dots)}
                </div>
                <div >
                    {/* <HashLoader
                    loading={true}
                    color="#f9c74f"
                    size={300}
                /> */}
                    <TrophySpin
                        size='large'
                    />
                </div>
            </div>

        </Modal>
    );
};

export default Loader;