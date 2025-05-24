import React from 'react';
import styles from './NoCameras.module.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const NoCamera = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1 className='mt-2'>No cameras available</h1>
            <span className='bi bi-camera-video-off' style={{ fontSize: '5rem', color: '#ccc' }} />
            <h5>How to enable camera access?</h5>
            <div className={styles.listContainer}>
                <ul className={styles.list}>
                    <li>Check if your camera is connected and working properly.</li>
                    <li>Ensure that you have granted permission to access the camera in your browser settings.</li>
                    <li>Try refreshing the page or restarting your browser.</li>
                    <li>If you are using a mobile device, make sure the camera is not being used by another app.</li>
                    <li>Check if your browser supports camera access.</li>
                    <li>Web RTC only works on secure contexts, make sure you are connected via https.</li>
                </ul>
            </div>
            <h5>Still having issues?</h5>
            <div className={styles.buttonsDiv}>
                <div>Try using the Identify page instead:</div>
                <Button className={styles.button} variant='outline-primary' onClick={() => navigate('/identify')}>
                    Go to Identify <span className='bi bi-arrow-right' />
                </Button>
            </div>

        </>
    );
};
export default NoCamera;