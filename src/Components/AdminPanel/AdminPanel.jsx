import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useTheme } from '../../Contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import { Button } from 'react-bootstrap';
import { db } from '../../../db';
import Version from '../../version';

const AdminPanel = ({ show, setShow, setShowParent }) => {
    const navigator = useNavigate();
    const { theme, forceEnable, setForceEnable } = useTheme();
    const { addAlert, testAB, setTestAB } = useGlobalContext();
    const pages = [
        { name: '404', path: '/404' },
        { name: 'Install App', path: '/howto/installapp' },
        { name: 'Identify Croc', path: '/howto/identifycroc' },
        { name: 'Camera', path: '/camera' },
        { name: 'Landing', path: '/?stay' }
    ];
    if (process.env.NODE_ENV === 'development') pages.push({ name: 'Test', path: '/test' });


    const getDatediff = () => {
        const date1 = new Date(Version.buildDate);
        const date2 = new Date(new Date().toUTCString()); // convert date2 to gmt 0 (assume -3 gmt)
        const diffTime = (date2 - date1);
        //console.log('diffTime', diffTime);
        const diffMinutes = Math.floor(diffTime / (1000 * 60 * 60));
        return `${diffMinutes} Hours ago`;
    }
    return (
        <Offcanvas show={show} onHide={() => setShow(false)} placement='end' data-bs-theme={theme}
            style={{ overflowY: 'scroll', height: '100vh', maxWidth: '80%' }}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><span className='bi bi-gear-fill' style={{ marginRight: '10px' }} />Admin Panel</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body >
                <div className='d-flex flex-column align-items-center'>
                    <h5>Pages</h5>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px', fontSize: '1.2em' }}>
                    {
                        pages.map((page, index) => {
                            return (
                                <div key={index} >
                                    <button className='btn btn-outline-primary w-100' onClick={() => {
                                        navigator(page.path);
                                        setShow(false);
                                        setShowParent(false);
                                    }}>{page.name}</button>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='d-flex flex-column align-items-center mt-3'>
                    <h5 style={{ textDecoration: 'underline', textDecorationColor: 'red' }}>Danger</h5>
                </div>
                <div className='d-flex gap-2 justify-content-center'>
                    <Button variant='outline-danger'
                        onClick={() => {
                            db.currentIdentifyer.clear().then(() => {
                                addAlert({ title: 'Identifyer DB Cleared', text: 'Identifyer DB Cleared' });
                            }).catch((e) => { console.log(e) });
                        }}>
                        Clear DB
                    </Button>
                    <Button variant='outline-danger'
                        onClick={() => {
                            db.photos.clear().then(() => {
                                addAlert({ title: 'Photos DB Cleared', text: 'Photos DB Cleared' });
                            }).catch((e) => { console.log(e) });
                        }}>
                        Clear Photos
                    </Button>
                    <Button variant='outline-danger'
                        onClick={() => {
                            localStorage.removeItem('tos');
                            window.location.reload();
                        }}>
                        Clear TOS
                    </Button>
                </div>
                <div className='d-flex flex-column align-items-center mt-3'>
                    <span>Build date: </span>
                    <span style={{ fontSize: '1.2em' }}>{Version.buildDate}</span>
                </div>
                <div className='d-flex flex-column align-items-center mt-1'>
                    <span style={{ fontSize: '1em' }}>{getDatediff()}</span>
                </div>
                <div className='d-flex align-items-center mt-1 justify-content-center align-items-center gap-2'>
                    Force iOS:
                    <div className='form-check form-switch' style={{ alignContent: "center" }} >
                        <input type='checkbox' className='form-check-input' checked={testAB.forceios} onChange={(e) => setTestAB((prev) => { return { ...prev, forceios: e.target.checked } })} />
                    </div>
                </div>
                <div className='d-flex align-items-center mt-1 justify-content-center align-items-center gap-2'>
                    Border:
                    <div className='form-check form-switch' style={{ alignContent: "center" }} >
                        <input type='checkbox' className='form-check-input' checked={testAB.border} onChange={(e) => setTestAB((prev) => { return { ...prev, border: e.target.checked } })} />
                    </div>
                </div>
                <div className='d-flex align-items-center mt-1 justify-content-center align-items-center gap-2'>
                    Alt color:
                    <div className='form-check form-switch' style={{ alignContent: "center" }} >
                        <input type='checkbox' className='form-check-input' checked={testAB.altcolor} onChange={(e) => setTestAB({ ...testAB, altcolor: e.target.checked })} />
                    </div>
                </div>
                <div className='d-flex align-items-center mt-1 justify-content-center align-items-center gap-2'>
                    Bigger Icons:
                    <div className='form-check form-switch' style={{ alignContent: "center" }} >
                        <input type='checkbox' className='form-check-input' checked={testAB.biggericons} onChange={(e) => setTestAB({ ...testAB, biggericons: e.target.checked })} />
                    </div>
                </div>
                <div className='d-flex align-items-center mt-1 justify-content-center align-items-center gap-2'>
                    Icons With Text:
                    <div className='form-check form-switch' style={{ alignContent: "center" }} >
                        <input type='checkbox' className='form-check-input' checked={testAB.iconstext} onChange={(e) => setTestAB({ ...testAB, iconstext: e.target.checked })} />
                    </div>
                </div>
                {/* <div className='d-flex align-items-center mt-1 justify-content-center align-items-center gap-2'>
                    Enable parcial Translations:
                    <div className='form-check form-switch' style={{ alignContent: "center" }} >
                        <input type='checkbox' className='form-check-input' checked={forceEnable} onChange={(e) => ssetForceEnable(e.target.checked)} />
                    </div>
                </div> */}
                <div className='d-flex align-items-center mt-1 justify-content-center align-items-center gap-2'>
                    No Margin Bottom:
                    <div className='form-check form-switch' style={{ alignContent: "center" }} >
                        <input type='checkbox' className='form-check-input' checked={testAB.noMargin} onChange={(e) => setTestAB({ ...testAB, noMargin: e.target.checked })} />
                    </div>
                </div>
                <div
                    style={{
                        height: '15em',
                    }}
                >

                </div>
            </Offcanvas.Body>
        </Offcanvas>

    );
};

export default AdminPanel;