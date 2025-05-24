import React from 'react';
import styles from './HowTo.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import InstallApp from './InstallApp/InstallApp';
import IdentifyCroc from './IdentifyCroc/IdentifyCroc';
const HowTo = () => {
    const navigator = useNavigate();
    const [what, setWhat] = React.useState('');
    const whatList = ['installapp', 'identifycroc'];
    const location = useLocation();
    React.useEffect(() => {
        setWhat(location.pathname.split('/')[2]);
    }, [location]);

    const goBack = () => {
        navigator(-1);
    };
    return (
        <div>
            {!whatList.includes(what) &&
                <>
                    <h1>How To</h1>
                    <div className='d-flex gap-4 align-items-center w-100 justify-content-center'>
                        <Button
                         onClick={() => { navigator('/howto/identifycroc');}}
                        
                       >
                            Identify A Croc
                        </Button>
                        <Button
                         onClick={() => { navigator('/howto/installapp');}}
                        >
                            Install the App
                        </Button>
                    </div>

                </>

            }

            {what === 'installapp' && <InstallApp />}
            {what === 'identifycroc' && <IdentifyCroc />}
            <Button variant="outline-warning"
                className={styles.button}
                onClick={() => { goBack() }}>I've got it!</Button>
        </div>
    );
};

export default HowTo;