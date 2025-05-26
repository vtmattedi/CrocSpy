import React from 'react';
import styles from './Camera.module.css';
import { Camera } from 'react-camera-pro';
import { Button, Offcanvas, Spinner } from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import { useTheme } from '../../Contexts/ThemeContext';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import shutterMp3 from './Assets/shutter.mp3';
import NoCamera from './NoCameras/NoCameras';
import ImgEqualizer from '../../Components/ImgEqualizer/ImgEqualizer';
import Translated from '../../Translations/Translated';

const CameraPage = () => {
    const camera = useRef(null);
    const [shutter] = useSound(shutterMp3);
    const [numberOfCameras, setNumberOfCameras] = useState(0);
    const [image, setImage] = useState(null);
    const [photoId, setPhotoId] = useState(null);
    const [devices, setDevices] = useState([]);
    const [activeDeviceId, setActiveDeviceId] = useState(undefined);
    const [aspectRatio, setAspectRatio] = useState(window.innerWidth / (window.innerHeight * 0.75));
    const [showConfig, setShowConfig] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [light, setLight] = useState(false);
    const { savePhoto, addAlert, deletePhoto } = useGlobalContext();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [error, setError] = useState(false);


    const aspectRatioOptions = [
        { value: 16 / 9, label: '16:9' },
        { value: 4 / 3, label: '4:3' },
        { value: 1, label: '1:1' },
        { value: -1, label: 'Auto' }
    ];

    const base64ToArrayBuffer = (base64) => {
        var binaryString = atob(base64);
        var bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    useEffect(() => {
        (async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            console.log(devices);
            const videoDevices = devices.filter((i) => i.kind == 'videoinput');
            setDevices(videoDevices);
        })();

        const calcAspectRatio = () => {
            const aspectRatio = window.innerWidth / (window.innerHeight * 0.75);
            setAspectRatio(aspectRatio);
        }

        window.addEventListener('resize', calcAspectRatio);
        return () => {
            window.removeEventListener('resize', calcAspectRatio);
        }

    }, []);

    const takePhoto = () => {
        if (camera.current) {
            const photo = camera.current.takePhoto();
            setImage(photo);
            setShowPreview(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    savePhoto(photo, {
                        GPSLatitude: position.coords.latitude,
                        GPSLongitude: position.coords.longitude,
                    }).then((id) => {
                        setPhotoId(id);
                    }).catch((err) => {
                        addAlert({
                            title: 'Error saving photo',
                            text: 'We were unable to save the photo. Please try again later.\n#rror Message:\n' + err.message,
                            onClose: () => { hidePreview() }
                        });
                    }
                    );
                },
                (error) => {
                    addAlert({
                        title: 'Error getting geo location',
                        text: 'We were unable to get your location. Please check your location settings. This photo will be saved without location data.',
                        onClose: () => { }
                    });
                    savePhoto(photo, {
                        GPSLatitude: null,
                        GPSLongitude: null,
                    }).then((id) => {
                        setPhotoId(id);
                    }).catch((err) => {
                        console.log(err);
                        addAlert({
                            title: 'Error saving photo',
                            text: 'We were unable to save the photo. Please try again later.\nError Message:\n' + err.message,
                            onClose: () => { hidePreview() }
                        });
                    }
                    );

                }
            )

        }
    }

    const changeAspectRatio = (value) => {
        value = parseFloat(value);
        if (aspectRatioOptions.find((option) => option.value === value) && value !== -1) {
            setAspectRatio(value);
        } else {
            const aspectRatio = window.innerWidth / (window.innerHeight * 0.9);
            setAspectRatio(aspectRatio);
        }
        console.log('Aspect ratio changed to: ', value, aspectRatioOptions.find((option) => option.value === value));
    }

    const hidePreview = () => {
        setShowPreview(false);
        setImage(null);
        setPhotoId(null);
    }


    return (
        <>
            {
                (devices.length > 0 && !error) ? <>
                    <div className={styles.outerDiv}>
                        <div className={styles.cameraDiv}>
                            <div className={styles.camera}>
                                <Camera ref={camera}
                                    torch={light}
                                    numberOfCamerasCallback={setNumberOfCameras}
                                    errorMessages={
                                        {
                                            permissionDenied: 'Permission denied. Please give camera permission and refresh page.',
                                            noCameraAccessible: 'Permission denied. Please give camera permission and refresh page',
                                            switchCamera:
                                                'It is not possible to switch camera to different one because there is only one video device accessible.',
                                            canvas: 'Canvas is not supported.',
                                        }
                                    }
                                    videoSourceDeviceId={activeDeviceId}
                                    aspectRatio={aspectRatio} />
                            </div>
                            <div className={styles.cameraButtons}>
                                {numberOfCameras > 1 &&
                                    <button variant='outline'
                                        className={styles.auxBtns}
                                        onClick={() => {
                                            camera.current.switchCamera();
                                            setLight(false);
                                        }}>
                                        <div className='bi bi-phone-flip' /></button>}
                                <button
                                    className={styles.cameraBtn}
                                    onClick={() => {
                                        shutter();
                                        takePhoto();
                                    }}
                                >{<div className='bi bi-camera-fill' />}</button>
                                <button variant='outline'
                                    className={styles.auxBtns}
                                    style={{
                                        color: light ? 'Black' : 'white',
                                        backgroundColor: light ? 'Yellow' : '#00000000',
                                    }}
                                    onClick={() => {
                                        camera.current.toggleTorch();
                                        setLight(!light);
                                    }}
                                >
                                    <div className={'bi' + light ? 'bi-lightning-fill' : 'bi-lightning'} /></button>

                                <Button
                                    onClick={() => {
                                        setShowConfig(true);
                                    }}
                                >
                                    <div className={'bi bi-gear'} /></Button>



                            </div>
                        </div>

                    </div>
                </> : <>

                    <NoCamera />
                </>
            }
            {/* Settings Offcanvas */}
            <Offcanvas show={showConfig} onHide={() => { setShowConfig(false) }} data-bs-theme={theme}
                style={{ maxWidth: '80%' }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{'Camera Settings'} <span className='bi bi-gear' /></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <span>
                            {'Camera: '}
                        </span>
                        <select
                            onChange={(event) => {
                                setActiveDeviceId(event.target.value);
                            }}
                            defaultValue={activeDeviceId}
                        >
                            {devices.map((d) => (
                                <option key={d.deviceId} value={d.deviceId}>
                                    {d.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <span>
                            {'Aspect Ratio: '}
                        </span>
                        <select
                            onChange={(event) => {
                                changeAspectRatio(event.target.value);
                            }}
                        >
                            {aspectRatioOptions.map((option, index) => (
                                <option key={'aropt_' + index} value={option.value} 
                                selected={option.value === aspectRatio || (option.value === -1 && !aspectRatioOptions.find((option) => option.value === aspectRatio))}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            {/* Preview Model */}
            <Modal show={showPreview} data-bs-theme={theme} >
                <Modal.Title> <div
                    style={{
                        textAlign: 'center',
                        marginTop: '1vh',
                        color: theme === 'light' ? 'black' : 'white'
                    }}>
                    {"Photo Preview"}
                </div>
                </Modal.Title>
                <Modal.Body
                    style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        <ImgEqualizer src={image} alt='Image preview' width= "100%" height="60vh" bgColor="0"  />
                </Modal.Body>
                <Modal.Footer>
                    {
                        photoId ? <>
                            <Button onClick={() => {
                                // simply close the modal
                                // we have already saved the photo
                                hidePreview();
                            }} >
                                <Translated path='basics.save' as='none' />

                                </Button>
                            <Button onClick={() => {
                                navigate('/Upload/' + photoId);

                            }} >
                                <Translated path='basics.upload' as='none' />
                            </Button>
                            <Button onClick={() => {
                                hidePreview();
                                deletePhoto(photoId).then().catch((err) => {
                                    addAlert({
                                        title: 'Error deleting photo',
                                        text: 'We were unable to delete the photo. Please try again later.',
                                        onClose: () => { }
                                    });
                                });


                            }} variant='danger'>{'Discard'}</Button>
                        </> :
                            <div className={styles.loadingDiv}
                                style={{ color: theme === 'light' ? 'black' : 'white' }}>
                                <Spinner animation="border" />
                                <span>Processing</span>
                            </div>

                    }
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default CameraPage;