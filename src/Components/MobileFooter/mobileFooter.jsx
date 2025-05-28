import React, { useState, useEffect } from 'react';
import { Container, Offcanvas } from 'react-bootstrap';
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
import { Trans } from 'react-i18next';
import Translated from '../../Translations/Translated';
import { use } from 'react';
const MobileFooter = () => {
    const { theme, toggleTheme } = useTheme();
    const { width, mobile } = usePageWidth();
    const [showAdmin, setShowAdmin] = useState(false);
    const navigator = useNavigate();
    const [ios, setIos] = useState(false);

    const [showSettings, setShowSettings] = useState(false);
    const { slots, forceIos } = useGlobalContext();
    const handleClick = (page) => {
        navigator('/' + page);
    }

    useEffect(() => {
        const agent = window.navigator.userAgent;
        if (agent.includes('iPhone') || agent.includes('iPod')) {
            setIos(true);
        } else {
            setIos(false);
        }
    }, []);
    useEffect(() => {
        console.log('ios', ios);
    }, [ios]);

    return (

        mobile ? (
            <>
                <div className={`${styles.spaceReserve}  ${((ios || forceIos)? styles.iosSpaceReserve : "")}`}></div>
                <div className={`${styles.bar}  ${((ios || forceIos)? styles.iosBar : "")}`}>
                    {slots.map((page, index) => (
                        <div key={index} className={`${styles.slot}  ${(ios && index === 0 ? styles.slotIosLeft : "")} ${(ios && index === slots.length-1 ? styles.slotIosRight: "")}`}
                            onClick={() => {
                                if (page.name === 'Settings') {
                                    setShowSettings(true);
                                    return;
                                }
                                else {
                                    setShowSettings(false);
                                    handleClick(page.name);
                                }
                            }}>
                            <div className={styles.icon}>
                                <i className={page.icon}></i>
                            </div>
                            <span className={styles.text}>
                                <Translated path={page.text} as='none' />
                            </span>
                        </div>
                    ))
                    }
                    <Offcanvas show={showSettings} onHide={() => setShowSettings(false)} placement='end' data-bs-theme={theme} style={{
                        maxWidth: '80%',
                        color: theme === 'dark' ? 'white' : 'black'
                    }}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title><span className='bi bi-gear-fill' style={{ marginRight: '10px' }} /><Translated path='footer.title' /></Offcanvas.Title>
                        </Offcanvas.Header>
                        <hr></hr>
                        <Offcanvas.Body>
                            <div className={styles.setting}>
                                <span>
                                    <Translated path='basics.theme' as='none' />:
                                </span>
                                <ThemeButton className={styles.themeButton} borderwidth={'0'} />
                            </div>
                            <div className={styles.setting}>
                                <span>
                                    <Translated path='basics.language' as='none' />:
                                </span>
                                <LanguageSelector theme={theme} />
                            </div>
                            <div className={styles.setting}>
                                <Button data-bs-theme={theme} onClick={() => {
                                    setShowAdmin(true);
                                }} className={styles.adminButton}> <div
                                    style={{
                                        color: theme === 'dark' ? 'white' : 'black',
                                    }}
                                >
                                        Admin Panel
                                    </div><div className='bi bi-arrow-right' style={{
                                        color: theme === 'dark' ? 'white' : 'black',
                                    }}></div></Button>
                            </div>
                            <div className={styles.offcanvasfooter}>
                                <span><Translated path='basics.version' />: {Version.version}</span>
                                <i>MattediWorks© 2025</i>
                                <a><Translated path='basics.tos' />: {TOS_VERSION}</a>
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