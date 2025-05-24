import React, { createContext, useState, useContext, ReactNode, useEffect, version } from 'react';
import { TOS_VERSION } from '../assets/tos';
import { useGlobalContext } from './GlobalContext';

const ToSContext = createContext(undefined);

export const TosProvider = ({ children }) => {
    const [tosAccepted, setTosaccepted] = useState({ accepted: false, version: '-1' });
    const version = TOS_VERSION;
    const { addAlert } = useGlobalContext();
    const [tosReady, setTosReady] = useState(false);
    const saveTos = (tos) => {
        localStorage.setItem('tos', JSON.stringify(tos));
    }
    const loadTos = () => {
        const localTOS = localStorage.getItem('tos');
        console.log("localTOS: ", localTOS);
        if (localTOS) {
            const parsedTOS = JSON.parse(localTOS);
            
            // Load the accepted TOS from local storage
            // If it doesn't exist, set the default value
            // If the version is different, set the accepted TOS to false
            if (parsedTOS.version !== version) {
                addAlert({
                    title: 'Terms of Service', text: 'The terms of service have changed. Please accept the new terms of service.', onClose: () => {
                        setTosaccepted({ accepted: false, version: version });
                    }
                });
                setTosaccepted(parsedTOS => ({ ...parsedTOS, accepted: false }));
                
            }
            else
                setTosaccepted(parsedTOS);

            return true;
        }
       setTosaccepted({ accepted: false, version: version });
        return false;
    }

    const AcceptTos = () => {
        setTosaccepted({ accepted: true, version: version });
        saveTos({ accepted: true, version: version });
        console.log("TOS Accepted");
        console.log(localStorage.getItem('tos'));
    }
    useEffect(() => {

        if (!loadTos()) {
            setTosaccepted({ accepted: false, version: version });
        }


    }, []);
    return (
        <ToSContext.Provider value={{ AcceptTos, tosAccepted }}>
            {children}
        </ToSContext.Provider>
    );
};

export const useTos = () => {
    const context = useContext(ToSContext);
    if (!context) {
        throw new Error('useTos must be used within a ThemeProvider');
    }
    return context;
};