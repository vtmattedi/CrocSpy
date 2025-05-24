
import styles from './FileUploader.module.css';
import { useEffect, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import Loader from '../Loader/Loader';
import usePageWidth from '../../../Hooks/PageWidth';
import Eye from '../../../Components/Eye/eye';
import { useNavigate } from 'react-router-dom';
const FileUploader = ({ setFile, setGPS }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const parseGpsInfo = (info, ref) => {
        if (!info) {
            return null;
        }
        if (!Array.isArray(info)) {
            info = [info];
        }
        let neg = 1;
        if (ref === 'S' || ref === 'W') {
            neg = -1;
        }
        let res = 0;
        const denominator = [1, 60, 3600];
        for (let i = 0; i < info.length; i++) {
            res += info[i] / denominator[i];
        }
        return res * neg;
    };
    const handlePicture = (e) => {
        setLoading(true);
        const file = e.target.files[0];
        handleFile(file);
    }
    const handleFile = (file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            setFile(base64String);
        };
        reader.readAsDataURL(file);
    }
    const onDrop = (e) => {
        const file = e[0];
        setLoading(true);
        handleFile(file);
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const { mobile } = usePageWidth();

    return (
        <>
            <div className={styles.buttonsDiv}>
                <div className={'title'}>Identify <Eye color={"var(--accent-color)"} /> A Croc </div>
                {mobile &&
                    <>
                        <Button
                            className={styles.button}
                            onClick={() => {
                                document.getElementById('camera_input').click();
                            }}><div className={styles.insideButtonIcon}>
                                <span className="bi bi-camera"></span>
                                <span>Take a picture</span>
                            </div>
                        </Button>
                        <div className={styles.divider}>OR</div>
                    </>
                }
                <Button
                    {...getRootProps()}
                    id='btn_file_input'
                    className={styles.button}
                    onClick={() => {
                        document.getElementById('upload_file_input').click();
                    }}><div className={styles.insideButton}>
                        <div className={styles.insideButtonIcon}>
                            <span className={isDragActive ? 'bi bi-folder-fill' : 'bi bi-folder'}></span>
                            <span>{isDragActive ? "Drop file here!" : "Upload a file"} </span>
                        </div>
                        {(!mobile && !isDragActive) && <span>{"(or drag in a photo)"} </span>}

                    </div>
                </Button>
                <div className={styles.divider}>OR</div>
                <Button
                    variant='outline-primary'
                    className={styles.openCameraButton}
                    onClick={() => {
                        navigate('/camera')
                    }}><div className={styles.openCameraButtonIcon}>
                        <span className="bi bi-camera2"></span>
                        <span>Open Camera</span>
                    </div>
                </Button>

                <input id='camera_input' type='file' capture='environment' style={{ display: "none" }}
                    onChange={handlePicture}
                />
                <input id='drag_file_input' type='file' accept='image/*'
                    onChange={handleFile} style={{ display: "none" }}
                    {...getInputProps()}
                />
                <input id='upload_file_input' type='file' accept='image/*'
                    onChange={handlePicture} style={{ display: "none" }}
                />
            </div>
            <Loader show={loading} />
        </>
    );
};
export default FileUploader;