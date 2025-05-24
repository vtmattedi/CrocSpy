import React, { useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { useTheme } from '../../../Contexts/ThemeContext';
import usePageWidth from '../../../Hooks/PageWidth';
import styles from './InstallApp.module.css';
const InstallApp = () => {
    const { theme } = useTheme();
    const { mobile } = usePageWidth();
    const [activeKey, setActiveKey] = React.useState('0');

    const customSetKey = (key) => {
        setActiveKey((prev) => {
            return key;
        });
    };
    useEffect(() => {
        const agent = window.navigator.userAgent;
        //console.log(agent, agent.includes('Android'), agent.includes('iPhone'), agent.includes('iPad'), agent.includes('Windows'), agent.includes('Macintosh'));
        if (agent.includes('Android')) {
            customSetKey('0');
        } else if (agent.includes('iPhone') || agent.includes('iPad')) {
            customSetKey('1');
        } else if (agent.includes('Windows') || agent.includes('Macintosh')) {
            customSetKey('2');
        } else {
            customSetKey('0');
        }

    }, []);



    return (
        <div>
            <h1>How to Install the App</h1>
            <p>Croc Spy is a PWA and it should prompt the use to install it on supported plataforms such as Windows and Andriod.</p>
            <p>If you are not prompted, you can follow these steps to install the app on your device.</p>
            <Accordion id={'accord-ia'} activeKey={activeKey} data-bs-theme={theme}
                style={{ width: mobile ? '90%' : '60%', margin: '0 auto' }}>
                <Accordion.Item eventKey="0" onClick={() => { customSetKey('0'); }} >
                    <Accordion.Header>Android</Accordion.Header>
                    <Accordion.Body>
                        <ol className={styles.list}>
                            <li>Open the app on Chrome</li>
                            <li>Click on <span className='bi bi-three-dots-vertical' /> at the top right corner.</li>
                            <li>Click on add to home screen.</li>
                            <li>Select the install option.</li>
                            <li>Confirm Installation.</li>
                        </ol>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" onClick={() => { customSetKey('1'); }} >
                    <Accordion.Header>IOS</Accordion.Header>
                    <Accordion.Body>
                        <ol className={styles.list}>
                            <li>Open the app on Safari</li>
                            <li>Click on share <span className='bi bi-box-arrow-up' /> .</li>
                            <li>Click on add to home screen.</li>
                            <li>Select the install option.</li>
                            <li>Confirm Installation.</li>
                        </ol>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" onClick={() => { customSetKey('2'); }} >
                    <Accordion.Header>Desktop</Accordion.Header>
                    <Accordion.Body>
                        <ol className={styles.list}>
                            <li>Open the app on Chrome</li>
                            <li>Click on <span className='bi bi-three-dots-vertical' /> at the top right corner.</li>
                            <li>Click on Cast, save and share.</li>
                            <li>Click on install page as app.</li>
                            <li>Confirm Installation.</li>
                        </ol>
                        <>
                        <i> Not Running chrome? search for 'How to install a PWA using [my browser]'!</i>
                            
                        </>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default InstallApp;