import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useTheme } from './ThemeContext';
import { db } from '../../db';
import exploreSVG from '../assets/binoculars.svg';
import { Trans } from 'react-i18next';
import Translated from '../Translations/Translated';
const GlobalContext = createContext(undefined);

const defaultSlots = [
    { icon: 'bi bi-house', name: 'Home', text: 'navigation.home' },
    { icon: 'bi bi-pin-map', name: 'Map', text: 'navigation.map' },
    // { icon: 'bi bi-camera2', text: 'Camera' },
    { icon: 'bi bi-search', name: 'Identify', text: 'navigation.identify' },
    { icon: 'bi bi-info-circle', name: 'Info', text: 'navigation.info' },
    { icon: 'bi bi-gear', name: 'Settings', text: 'navigation.setting' },
    
];
if (process.env.NODE_ENV === 'development') {
    defaultSlots.push({ icon: 'bi bi-map', name: 'Explore', text: 'navigation.explore' });
}
export const GlobalProvider = ({ children }) => {
    const [loadingText, setLoadingText] = useState(null);
    const [alertStack, setAlertStack] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [slots, setSlots] = useState(defaultSlots)

    const getCurrentAlert = () => {
        return alertStack.length > 0 ? alertStack[alertStack.length - 1] : null;
    }
    const pushAlertToStack = (alert) => {
        // If we need to prevent duplicates, we can check for duplicates here
        setAlertStack((prevStack) => {
            // if (prevStack.length > 0) {
            //     for (let i = 0; i < prevStack.length; i++) {
            //         if (prevStack[i].title === alert.title) {
            //             return prevStack;
            //         }
            //     }
            // }
            return [...prevStack, alert]
        });
        // If we don't need to prevent duplicates, we can just add the alert to the stack
        // setAlertStack((prevStack) => [...prevStack, alert]);
    };

    const popAlertFromStack = () => {
        setAlertStack((prevStack) => prevStack.slice(0, -1));
    };

    const addAlert = ({ title, text, onClose }) => {
        pushAlertToStack({ title, text, onClose });
    }

    const closeAlert = () => {
        const alert = getCurrentAlert();
        if (alert) {
            alert.onClose?.();
            setTimeout(() => {
                popAlertFromStack()
            }, 100);
        }
    }
    const editPhoto = (photoName, obj) => {
        const current_raw = localStorage.getItem('photo');
        try {
            var current = JSON.parse(current_raw);
            const photo = current.find(item => item.name === photoName)
            if (photo) {
                for (const key in Object.keys(obj)) {
                    photo[key] = obj[key]
                }
                localStorage.setItem('photo', JSON.stringify(current));

            }
        }
        catch (e) {
            addAlert({ title: 'Error Editing Photo', text: e })
        }
    }
    function getImageDimensions(file) {
        return new Promise(function (resolved, rejected) {
            var i = new Image()
            i.onload = function () {
                resolved({ w: i.width, h: i.height })
            };
            i.src = file
        })
    }
    const savePhoto = async (photo, gps) => {
        try {
            const dim = await getImageDimensions(photo);
            // if (!gps || !gps.GPSLatitude || !gps.GPSLongitude) {
            //     console.log(gps);
            //     //addAlert({ title: 'Error Saving Photo', text: 'No GPS data found' });
            // }
            return db.photos.add({
                name: 'photo_' + Date.now(),
                image: photo,
                size: dim,
                gps: gps,
                species: 'Unknown',
                status: 'New',
                certainty: 0,
            });
        }
        catch (e) {
            addAlert({ title: 'Error Saving Photo', text: e.message });
        }
    };
    const deletePhoto = (id) => {
        try {
            return db.photos.delete(id);
        }
        catch (e) {
            addAlert({ title: 'Error Deleting Photo', text: e.message });
        }
    }
    useEffect(() => {
        if (alertStack.length > 0) {
            setShowAlert(true);
        }
        else {
            setShowAlert(false);
        }
    }, [alertStack]);

    const { theme } = useTheme();
    return (
        <GlobalContext.Provider value={{ addAlert, closeAlert, getCurrentAlert, savePhoto, deletePhoto, editPhoto, slots, setSlots }}>
            {children}
            <Modal show={showAlert} data-bs-theme={theme}
                style={{
                    color: theme === 'dark' ? 'white' : 'black',
                }}>
                <Modal.Title> <div
                    style={{
                        textAlign: 'center',
                        marginTop: '1vh',
                    }}

                >{getCurrentAlert()?.title}</div></Modal.Title>
                <Modal.Body
                    style={{
                        fontSize: '1.25em',
                        textIndent: '1em',
                    }}
                >
                    <div style={{ textAlign: 'justify' }}>

                        {getCurrentAlert()?.text}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeAlert} variant='danger'>
                        <Translated path='basics.close' as='none' />
                    </Button>
                </Modal.Footer>
            </Modal>
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};