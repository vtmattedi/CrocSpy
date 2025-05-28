import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import styles from './Landing3.module.css';
import Form from 'react-bootstrap/Form';
import { useTos } from '../../Contexts/TOSContext';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../Contexts/ThemeContext';
import { useSound } from 'use-sound';
import biteMp3 from './Assets/bite.mp3';
import LanguageSelector from '../../Components/LanguageSelector/LanguageSelector';
import { saveAs } from 'file-saver';
import { TOS_VERSION, getTos } from '../../assets/tos';
import Eye from '../../Components/Eye/eye';
import usePageWidth from '../../Hooks/PageWidth';
import { useLocation } from 'react-router-dom';
const Landing3 = () => {
    const [bite] = useSound(biteMp3, { volume: 0.5 })
    const { AcceptTos, tosAccepted } = useTos();
    const [showTos, setShowTos] = useState(false);
    const [tosOpened, setTosOpened] = useState(false);
    const [toggle, setToggle] = useState(false);
    const { mobile } = usePageWidth();
    const navigate = useNavigate();
    const rep = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const { theme, locale } = useTheme();
    const start = () => {
        const div = document.getElementById('start');
        div?.classList.add(styles.anim);
        document.getElementById('startbtn').classList.add(styles.anim2);
        AcceptTos();
        console.log('TOS Accepted');
        bite();
        setTimeout(() => {
            navigate('/home');
        }, 2000);
    };
    const location = useLocation();

    useEffect(() => {
        if (tosAccepted.accepted) {
            if (location.search.indexOf('stay') === -1) {
                navigate('/home');
            }
            else {
                setToggle(true);
                setTosOpened(true);
            }
        }

    }, [tosAccepted, location]);
    return (
        <>
            <div className={styles.logoDiv} style={{
                backgroundImage: `url(${mobile ? './crocPartyMobile.png' : './crocParty.png'})`,
            }}>

                <div className={styles.contentContainer}>
                    <div className={styles.contentDiv}>
                        <div className={styles.outText}>Welcome to <div className={styles.inText}>Croc <div className={styles.eye}><Eye color={'green'} /></div> Spy</div></div>

                        <Form className={styles.form}>
                            <div className={styles.tosDiv}>
                                <Form.Label>I accept the <a
                                    onClick={() => {
                                        setTosOpened(true);
                                        setShowTos(true);
                                    }}
                                    className={styles.tos}>terms and conditions</a></Form.Label>
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                    disabled={!tosOpened}
                                    checked={toggle}
                                    className={styles.switch}
                                    onChange={() => {
                                        setToggle(!toggle);
                                    }}

                                />
                            </div>
                        </Form>
                        <div className={styles.buttonContainer}>
                            <Button
                                onClick={() => {
                                    start();
                                }}
                                disabled={!toggle}
                                className={styles.acceptButton}
                                id={'startbtn'}
                            ><div className={styles.startbtn}>Start <div id={'start'} className='bi bi-arrow-right'></div></div></Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showTos} onHide={() => setShowTos(false)} data-bs-theme={theme}
                style={{
                    color: theme === 'dark' ? 'white' : 'black',

                }}>
                <Modal.Header>
                    <Modal.Title>Terms and Conditions</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowY: 'scroll' }}>

                    <div className={styles.tosText}>
                        {
                            rep.map((item, index) => {
                                return (<p key={index}>
                                    By clicking the "I accept the terms and conditions" switch, you agree to the terms and conditions of this website.
                                    By clicking the "I accept the terms and conditions" switch, you agree to the terms and conditions of this website.
                                    By clicking the "I accept the terms and conditions" switch, you agree to the terms and conditions of this website.
                                    By clicking the "I accept the terms and conditions" switch, you agree to the terms and conditions of this website.
                                    By clicking the "I accept the terms and conditions" switch, you agree to the terms and conditions of this website.
                                    By clicking the "I accept the terms and conditions" switch, you agree to the terms and conditions of this website.
                                </p>)
                            })
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{
                            color: theme === 'dark' ? 'white' : 'black',

                        }}
                        onClick={() => {
                            let txt = "Terms and Conditions For Croc Eye Usage\n\n";
                            txt += "version: " + TOS_VERSION + "\n";
                            txt += getTos(locale).text;
                            const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
                            saveAs(blob, 'CrocTerms.txt',);

                        }}
                        variant="secondary" className={styles.downbtn}><span className='bi bi-download'></span></Button>
                    <Button variant="secondary" onClick={() => setShowTos(false)}>Close</Button>
                    <Button variant="primary" onClick={() => {
                        setShowTos(false)
                        setToggle(true);
                    }}>Accept</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default Landing3;