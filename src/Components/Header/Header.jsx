import { useEffect } from 'react';
import { useTheme } from '../../Contexts/ThemeContext';
import styles from './Header.module.css';
import { useState } from 'react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ThemeButton from '../ThemeButton';
import { useTos } from '../../Contexts/TOSContext';
import { useNavigate } from 'react-router-dom';
import usePageWidth from '../../Hooks/PageWidth';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import AdminPanel from '../AdminPanel/AdminPanel';
import Social from '../Social/Social';
const Header = () => {
    const { slots } = useGlobalContext();
    const { mobile } = usePageWidth();
    const navigator = useNavigate();
    const { tosAccepted } = useTos();
    const [showAdmin, setShowAdmin] = useState(false);
    // const navigator = useNavigate();
    useEffect(() => {

        if (!tosAccepted.accepted && tosAccepted.version !== '-1') {
            navigator('/');
        }
    }, [tosAccepted]);

    const handleClick = (page) => {
        navigator('/' + page);
    }

    return (
        <>
            {
                !mobile ?
                    <div className={styles.blockdiv}>
                        <div className={styles.outerdiv}>
                            <div className={styles.navdiv}>
                                <Navbar className={styles.navbar}>
                                    {
                                        slots.filter(t => t.text !== "Settings").map((page, index) => {
                                            return (
                                                <Nav.Link key={index} onClick={() => { handleClick(page.text) }}> <div className={
                                                    styles.itemDiv + (window.location.pathname === '/' + page.text ? ' ' + styles.active : '')}
                                                ><span className={page.icon} />{page.text} </div></Nav.Link>)
                                        })
                                    }

                                </Navbar>
                            </div>

                            <div className={styles.settings}>
                                <Social
                                    size='1.2em'
                                />
                                <span onClick={() => setShowAdmin(true)} className={'bi bi-toggles ' + styles.adminSpan}></span>
                                <LanguageSelector fontSize='1.25em' />
                                <ThemeButton className={styles.themeBtn} borderwidth={'0'} />
                            </div>
                        </div>
                        <AdminPanel
                            show={showAdmin}
                            setShow={setShowAdmin}
                            setShowParent={() => { }}
                        />
                    </div> : <></>
                // <div style={{
                //     width: '100%', height: '0.5em',
                //     backgroundColor: 'argb(255, 255, 255, 0)',
                // }}></div>
            }
        </>
    );
};

export default Header;