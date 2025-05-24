
import React, { useEffect, useState } from 'react';
import styles from './Landing.module.css';
import Landing1 from './Landing1';
import Landing2 from './Landing2';
import Landing3 from './Landing3';
import ThemeButton from '../../Components/ThemeButton';
import LanguageSelector from '../../Components/LanguageSelector/LanguageSelector';
const Landing = () => {

    const opts = [
        {
            icon: 'bi bi-1-circle',
            alt: 'bi bi-1-circle-fill',
            value: 1,
        },
        {
            icon: 'bi bi-3-circle',
            alt: 'bi bi-3-circle-fill',
            value: 3,
        }
    ]
    const [currOpt, setCurrOpt] = useState(1);

    return (
        <>
            <div className={styles.opts}>
                <div className={styles.optsBg}>
                    {
                        opts.map((item, index) => {
                            return (
                                <div key={index} className={styles.optDiv}>
                                    <div
                                        style={{
                                            color: item.value === currOpt ? 'var(--accent-color)' : 'white',
                                        }}
                                        onClick={() => {
                                            setCurrOpt(item.value);
                                        }}>
                                        <span className={item.value === currOpt ? item.alt : item.icon}></span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <ThemeButton borderwidth={'0'} />
                    <LanguageSelector />
                </div>
            </div>
            {currOpt === 1 && <Landing1 />}
            {currOpt === 3 && <Landing3 />}



        </>
    );
};

export default Landing;