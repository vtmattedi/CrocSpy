import React, { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import styles from './mobileFooter.module.css';
import { useTheme } from '../../Contexts/ThemeContext';
import { Button } from 'react-bootstrap';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import ThemeButton from '../ThemeButton';
import { useNavigate } from 'react-router-dom';
import usePageWidth from '../../Hooks/PageWidth';
import AdminPanel from '../AdminPanel/AdminPanel';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import Version from '../../version';
import { TOS_VERSION } from '../../assets/tos';
import Social from '../Social/Social';
const MobileFooter = () => {
    const { theme, toggleTheme } = useTheme();
    const { width, mobile } = usePageWidth();
    const [showAdmin, setShowAdmin] = useState(false);
    const navigator = useNavigate();

    const [showSettings, setShowSettings] = useState(false);
    const { slots } = useGlobalContext();
    const handleClick = (page) => {
        navigator('/' + page);
    }

    return (

        mobile ? (
            <>
                <div style={{
                    width: '100%', height: '4em',
                    backgroundColor: 'argb(255, 255, 255, 0)',
                }}></div>
                <div className={styles.bar}>
                    {slots.map((div, index) => (
                        <div key={index} className={styles.slot}
                            onClick={() => {
                                if (div.text === 'Settings') {
                                    setShowSettings(true);
                                    return;
                                }
                                else {
                                    setShowSettings(false);
                                    handleClick(div.text);
                                }
                            }}>
                            <div className={styles.icon}>
                                <i className={div.icon}></i>
                            </div>
                            <span className={styles.text}>{div.text}</span>
                        </div>
                    ))
                    }
                    <Offcanvas show={showSettings} onHide={() => setShowSettings(false)} placement='end' data-bs-theme={theme} style={{ maxWidth: '80%', 
                        color: theme === 'dark' ? 'white' : 'black'
                    }}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title><span className='bi bi-gear-fill' style={{ marginRight: '10px' }} />Settings</Offcanvas.Title>
                        </Offcanvas.Header>
                        <hr></hr>
                        <Offcanvas.Body>
                            <div className={styles.setting}>
                                <span>
                                    Theme:
                                </span>
                                <ThemeButton className={styles.themeButton} borderwidth={'0'} />
                            </div>
                            <div className={styles.setting}>
                                <span>
                                    Language:
                                </span>
                                <LanguageSelector theme={theme} />
                            </div>
                            <div className={styles.setting}>
                                <Button data-bs-theme={theme}  onClick={() => {
                                    setShowAdmin(true);
                                }} className={styles.adminButton}> <div
                                    style={{
                                        color: theme === 'dark' ? 'white' : 'black',
                                    }}
                                >
                                        Admin Panel
                                    </div><div className='bi bi-arrow-right'  style={{
                                        color: theme === 'dark' ? 'white' : 'black',
                                    }}></div></Button>
                            </div>
                            <div className={styles.offcanvasfooter}>
                                <span>Version: {Version.version}</span>
                                <i>MattediWorks© 2025</i>
                                <a>Terms and Conditions: {TOS_VERSION}</a>
                                <Social
                                    size='2em'
                                    color={theme === 'dark' ? 'white' : 'black'}
                                />
                            </div>
                        </Offcanvas.Body>


                    </Offcanvas>

                </div>
                <AdminPanel show={showAdmin} setShow={setShowAdmin} setShowParent={setShowSettings} />
            </>
        ) : <></>
    );
};

export default MobileFooter;