import React from 'react';
import styles from './ImgEqualizer.module.css';
const ImgEqualizer = ({src,alt, width='auto', height='auto', bgColor=' #00000057', ...props}) => {
    return (
        <div className={styles.imgContainerBg} style={{ width: width, backgroundColor: bgColor }}>
            <div className={styles.imgContainer} style={{ height: height }}>
                <img src={src} alt={alt}
                {...props}
                ></img>
            </div>
        </div>
    );
};

export default ImgEqualizer;