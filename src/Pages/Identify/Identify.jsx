import React from 'react';
import FileUploader from './FileUploader/FileUploader';
import styles from './Identify.module.css';
import { Button, Dropdown, Offcanvas, Spinner } from 'react-bootstrap';
import { useBeforeUnload, useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../Contexts/GlobalContext';
import { db } from '../../../db';
import ExifReader from 'exifreader';
import usePageWidth from '../../Hooks/PageWidth';
import { useTheme } from '../../Contexts/ThemeContext';
import crocklock from '../../assets/croclockhomes.png';
const Identify = () => {
    const navigate = useNavigate();
    const [file, setFile] = React.useState(undefined);
    const [gps, setGPS] = React.useState(null);
    const [gpsLatInput, setGpsLatInput] = React.useState("");
    const [gpsLonInput, setGpsLonInput] = React.useState("");
    const [loadingGps, setLoadingGps] = React.useState(false);
    const { savePhoto, addAlert } = useGlobalContext()
    const [showInputs, setShowInputs] = React.useState(false)
    const { mobile } = usePageWidth();
    const { theme } = useTheme();


    const parseGpsInfo = (info, ref) => {
        if (!info) {
            return null;
        }
        if (!Array.isArray(info)) {
            info = [info];
        }
        let neg = 1;
        if (Array.isArray(ref)) {
            ref = ref[0];
        };
        if (ref === 'S' || ref === 'W') {
            neg = -1;
        }
        let res = 0;
        const denominator = [1, 60, 3600];
        for (let i = 0; i < info.length; i++) {
            if (Array.isArray(info[i])) {
                info[i] = info[i][0] / info[i][1];
            }
            res += info[i] / denominator[i];
        }
        return res * neg;
    };
    const getGpsFromFile = (file) => {
        setLoadingGps(true);
        ExifReader.load(file).then((tags) => {
            const lat = parseGpsInfo(tags.GPSLatitude?.value, tags.GPSLatitudeRef?.value);
            const lon = parseGpsInfo(tags.GPSLongitude?.value, tags.GPSLongitudeRef?.value);
            setGPS({
                GPSLatitude: isNaN(lat) ? null : lat,
                GPSLongitude: isNaN(lon) ? null : lon,
            });
        }).catch((error) => {
            console.error("Error reading EXIF data:", error);
        }).finally(() => {
            setLoadingGps(false);
        });
    };

    const newFile = (file) => {
        if (file === undefined || file === null) {
            setFile(null);
            setGPS(null);
            return;
        }
        setFile(file);
        getGpsFromFile(file);
    };

    React.useEffect(() => {
        if (file === undefined) {
            db.currentIdentifyer.toArray().then((data) => {
                if (data.length > 0) {
                    const obj = data[0];
                    setFile(obj.file);
                    setGPS(obj.gps);
                }
            });
            return;
        }

        if (file === null)
            db.currentIdentifyer.clear();
        else {
            db.currentIdentifyer.count().then((count) => {
                if (count > 0) {
                    db.currentIdentifyer.update(1, {
                        id: 1,
                        file: file,
                        gps: gps,
                    })
                }
                else {
                    db.currentIdentifyer.add({
                        id: 1,
                        file: file,
                        gps: gps,
                    })
                }

            })
        }
    }, [file, gps])

    const useCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setGPS({
                    GPSLatitude: position.coords.latitude,
                    GPSLongitude: position.coords.longitude,
                });
            }, (error) => {
                addAlert({ title: "Error Getting Location", text: "" + error.message });
            });
        } else {
            addAlert({ title: "Geolocation not Enable", text: "Your device has no geolocation support." });
        }
    };

    const GpsOptions = [
        { text: "Use Current Location", onClick: useCurrentLocation, icon: "bi bi-geo-fill" },
        { text: "Use Image's Location", onClick: () => { getGpsFromFile(file) }, icon: "bi bi-file-earmark-image" },
        { text: "Use Coordinates", onClick: () => { setShowInputs(true) }, icon: "bi bi-input-cursor-text" },

    ]
    return (
        <div className={styles.IdentifyContainer} data-bs-theme={theme}>

            {/*Load a file*/}
            {!file && <FileUploader setFile={newFile} />}
            {/*Preview file before sending to backend*/}
            {
                file &&
                <div className={styles.fileContainer}>
                     <div className='title'>Preview</div>
                    <img src={file} alt="Uploaded" style={{ height: '40vh', width: 'auto' }} />
                    <div className={styles.gpsInfoContainer}>
                        <span className='bi bi-geo-alt'></span>
                        <span>{"GPS Data:"}</span> {
                            (gps?.GPSLatitude && gps?.GPSLongitude) ?
                                <span className='bi bi-check-circle-fill' style={{ color: 'Green' }} />
                                :
                                <span className='bi bi-x-circle' style={{ color: 'Red' }} />
                        }
                        {
                            (mobile && !loadingGps && !(gps?.GPSLatitude && gps?.GPSLongitude)) &&
                            <Dropdown data-bs-theme={theme} className={styles.gpsDropdown}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className={styles.gpsDropdownToggle}>
                                    <span className='bi bi-list'></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    {GpsOptions.map((option, index) => (
                                        <Dropdown.Item key={index} onClick={option.onClick}>
                                            <div className={styles.gpsButtonsInner}><span className={option.icon} />{option.text}</div>
                                        </Dropdown.Item>
                                    ))}

                                </Dropdown.Menu>
                            </Dropdown>

                        }
                        {
                            (loadingGps) &&
                            <Spinner animation="grow" role="status" className={styles.gpsSpinner}>

                            </Spinner>
                        }
                        {
                            (gps?.GPSLatitude && gps?.GPSLongitude) &&
                            <span onClick={() => {
                                setGPS({
                                    GPSLatitude: null,
                                    GPSLongitude: null,
                                });
                            }} className={'bi bi-x-square ' + styles.clearGpsBtn}></span>
                        }

                    </div>
                    <div className={styles.gpsDiv}>
                        <div>Latitude: {gps?.GPSLatitude?.toFixed(4) || "---"} </div><span> | </span>
                        <div>Longitude: {gps?.GPSLongitude?.toFixed(4) || "---"}</div>
                    </div>
                    {(!mobile && !(gps?.GPSLatitude && gps?.GPSLongitude)) &&
                        <div className={styles.gpsButtonsContainer}>
                            <hr></hr>
                            {
                                GpsOptions.map((option, index) => (
                                    <Button key={index} variant="outline-primary" onClick={option.onClick} className={styles.gpsButtons}>
                                        <div className={styles.gpsButtonsInner}><span className={option.icon} />{option.text}</div>
                                    </Button>
                                ))
                            }
                        </div>
                    }
                    {/*Input coordinates*/}
                    <Offcanvas show={showInputs} onHide={() => setShowInputs(false)} placement='top'
                        className={styles.coordOffcanvas}
                        data-bs-theme={theme}>
                        <Offcanvas.Header >
                            <Offcanvas.Title>Input GPS Coordinates</Offcanvas.Title>
                        </Offcanvas.Header>
                        <div className={styles.inputsOuterDiv}>
                            <div className={styles.inputContainer}>
                                <label>Latitude: </label>
                                <input value={gpsLatInput}
                                    type='number'
                                    onChange={(e) => setGpsLatInput(e.target.value)} placeholder='Latitude (in decimal)' />

                            </div>
                            <div className={styles.inputContainer}>
                                <label>Longitude: </label>
                                <input value={gpsLonInput}
                                    type='number'
                                    onChange={(e) => setGpsLonInput(e.target.value)} placeholder='Longitude (in decimal)' />
                            </div>

                        </div>
                        <div className={styles.inputButtons}>
                            <Button variant='outline-success' onClick={() => {
                                let lat = parseFloat(gpsLatInput);
                                let lon = parseFloat(gpsLonInput);
                                if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
                                    addAlert({ title: "Error", text: "Invalid Coordinates" });
                                }
                                else {
                                    setGPS({
                                        GPSLatitude: lat,
                                        GPSLongitude: lon,
                                    });
                                }
                                setGpsLatInput("");
                                setGpsLonInput("");
                                setShowInputs(false);
                            }}>Confirm</Button>
                            <Button variant='outline-danger' onClick={() => {
                                setGpsLatInput("");
                                setGpsLonInput("");
                                setShowInputs(false);
                            }}>Cancel</Button>
                        </div>
                    </Offcanvas>
                    {/*Discard, Sav, Identify Species*/}
                    <div className={styles.actionButtons}>
                        <Button
                            variant='outline-primary'
                            onClick={() => {
                                savePhoto(file, gps);
                                setFile(null)
                                setGPS(null)

                            }}
                        >
                            <div className={styles.buttons}>
                                <span className='bi bi-floppy' />
                                Save
                            </div>
                        </Button>
                        <Button
                            className={styles.IdentifyBtn}
                            onClick={() => {
                                setLoadingGps(true);
                                savePhoto(file, gps).then((id) => {
                                    console.log("ID: ", id);
                                    db.currentIdentifyer.clear();
                                    navigate('/Upload/' + id)
                                }).catch((error) => {
                                    console.error("Error saving photo: ", error);
                                }).finally(() => {
                                });
                            }}
                        >
                            <div className={styles.buttons} onClick={() => { }}>
                                <span className='bi bi-search' />
                                Identify
                            </div>
                        </Button>
                        <Button variant="outline-danger" onClick={() => setFile(null)}>
                            <div className={styles.buttons}>
                                <span className='bi bi-x-circle' />

                                Discard
                            </div>
                        </Button>

                    </div>
                </div>
            }
            {!file && <img src={crocklock} className={styles.croclock} />}
        </div >
    );
};

export default Identify;