import React, { useState, useEffect } from 'react';
import { Container, Offcanvas } from 'react-bootstrap';
import styles from './mobileFooter.module.css';
import { useTheme } from '../../Contexts/ThemeContext';
import { Button } from 'react-bootstrap';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import ThemeButton from '../ThemeButton';
import { useNavigate, useLocation } from 'react-router-dom';
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
    const location = useLocation();
    const [showSettings, setShowSettings] = useState(false);
    const { slots, testAB } = useGlobalContext();
    const handleClick = (page) => {
        navigator('/' + page);
    }
    const isActive = (page) => {
        const loc = '/' + location.pathname.split('/')[1].toLowerCase();
        if (page === 'Home') {
            return loc === '/' || loc === '/home';
        }
        if (page === 'Map') {
            return loc === '/map';
        }
        if (page === 'Identify') {
            const valid = ['/identify', '/upload', '/result', '/camera'];
            return valid.some(path => loc.startsWith(path));
        }
        if (page === 'Info') {
            const valid = ['/info', '/howto'];
            return valid.some(path => loc.startsWith(path));
        }
    }

    useEffect(() => {
        const agent = window.navigator.userAgent;
        if (agent.includes('iPhone') || agent.includes('iPod')) {
            setIos(true);
        } else {
            setIos(testAB.forceios);
        }
    }, [testAB.forceios]);

    useEffect(() => {
        console.log('ios', ios);
    }, [ios]);
    const getHeight = (plus) => {
        let base = 3
        if (plus)
            base += plus;
        if (testAB.biggericons)
            base += 1;
        if (testAB.iconstext)
            base += 1;
        return `${base}em`;
    }
    return (

        mobile ? (
            <>
                <div className={`${styles.spaceReserve}  ${(ios ? styles.iosSpaceReserve : "")}`}
                    style={{height: getHeight(ios ? 2 : 1)}}
                ></div>
                <div className={`${styles.bar}  ${(testAB.altcolor ? styles.barAlt : "")}`}
                
                >
                    <div className={`${styles.container}  ${(ios ? styles.iosContainer : "")}`} data-bs-theme={theme}
                      style={{
                        height: getHeight( ios? 2 : 1),
                      }}
                    >
                        {slots.map((page, index) => (
                            <div key={index} className={`${styles.slot}  } ${styles.border}`}
                                style={{
                                    borderLeft: testAB.border && index !== 0 ? '1px solid' : '0px',
                                    borderBottom: testAB.border ? '1px solid' : '0px',
                                    backgroundColor: (page.name === 'Settings' && showSettings) ? (testAB.altcolor ? '#888' : 'var(--bs-secondary-bg)') : '',
                                    borderRadius: index === 0 ? '10px 0 0px 0px' : (index === slots.length - 1 ? '0 10px 0 0' : '0'),
                                    height: getHeight(),
                                }}
                                onClick={() => {
                                    if (page.name === 'Settings') {
                                        setShowSettings((prev) => !prev);
                                        return;
                                    }
                                    else {
                                        setShowSettings(false);
                                        handleClick(page.name);
                                    }
                                }}>
                                <div className={`${(isActive(page.name) ? styles.slotActive : "")} ${styles.icon}`}
                                    style={{
                                        fontSize: testAB.biggericons ? '2em' : '1.5em',
                                        color: isActive(page.name) ? (testAB.altcolor ? 'var(--accent-color)' : 'var(--accent-color-alt)' ) : (testAB.altcolor ? 'black' : 'white'),
                                        }}>
                                    <i className={page.icon}></i>
                                </div>
                                {
                                    testAB.iconstext &&
                                    <span className={styles.text}
                                        style={{
                                            fontWeight: isActive(page.name) ? 'bold' : 'normal',
                                        }}
                                    >
                                        <Translated path={page.text} as='none' />
                                    </span>
                                }

                            </div>
                        ))
                        }
                    </div>
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