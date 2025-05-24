import React, { useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { useTheme } from '../../../Contexts/ThemeContext';
import usePageWidth from '../../../Hooks/PageWidth';
import styles from './IdentifyCroc.module.css';
import crocholmes from '../../../assets/croclockhomes.png';
import ImgEqualizer from '../../../Components/ImgEqualizer/ImgEqualizer';
const IdentifyCroc = () => {
    const { theme } = useTheme();
    const { mobile } = usePageWidth();
    return (
        <div>
            <h1>How to Identify a Crocodillian Species</h1>
            <div className={styles.container} >
                <ImgEqualizer src={crocholmes} bgColor='0' height='50vh' width='auto' />
                <div className={styles.textContainer}>
                    <p> Hello, I'm Croclock Holmes, and I'm here to help you identify crocodillians.</p>
                    <p>There are 24 recognized species of crocodilians around the world. With three families:</p>
                    <ul>
                        <li>Alligatoridae (Alligators and Caimans)</li>
                        <li>Crocodylidae (Crocodiles)</li>
                        <li>Gavialidae (Gharials and False Gharials)</li>
                    </ul>

                </div>
            </div>
            <div className={styles.container} >
                <div className={styles.textContainer}>
                    {mobile && <ImgEqualizer src={crocholmes} bgColor='0' height='50vh' width='auto' style={{ transform: 'scale(-1,1)' }} />}          
                    <p>To identify the species of an individual we can look to 4 key factors:</p>
                    <ul>
                        <li><strong>Head and Snout Shape</strong></li>
                        <ul>
                            <li> Crocodiles: V-shaped, narrow snout</li>
                            <li>Alligators: U-shaped, broad snout</li>
                            <li>Gharials: Long, thin snout with a bulbous tip</li>
                        </ul>
                        <li><strong>Geographic Location</strong></li>
                        <ul>
                            <li>Alligators: Found in the Americas and China</li>
                            <li>Crocodiles: Found in Africa, Asia, the Americas, and Australia</li>
                            <li>Gharials: Found in the Indian subcontinent</li>
                        </ul>
                        <li><strong>Teeth Visibility</strong></li>
                        <ul>
                            <li>Alligators: Upper teeth visible when mouth is closed</li>
                            <li>Crocodiles: Both upper and lower teeth visible when mouth is closed</li>
                            <li>Gharials: Long, thin snout with interlocking teeth</li>
                        </ul>
                        <li><strong>Size and Coloration</strong></li>
                        <ul>
                            <li>Alligators: Darker coloration, smaller size</li>
                            <li>Crocodiles: Lighter coloration, larger size</li>
                        </ul>
                    </ul>
                </div>
                {!mobile && <ImgEqualizer src={crocholmes} bgColor='0' height='50vh' width='auto' style={{ transform: 'scale(-1,1)' }} />}            </div>
            <div className={styles.container} >
                <ImgEqualizer src={crocholmes} bgColor='0' height='50vh' width='auto' />
                <div className={styles.textContainer}>
                    <p >
                        <span>With these factors in mind, you can start to identify the family and</span>
                        <span>then the species of crocodilian you are dealing with.</span>
                        <span> However, it is important to note that some species may have similar characteristics.</span>
                        <span> You can also use Croc Spy, and I will help you idententify the species using our AI.</span>
                        <span> You can also help us by cataloging the species you find in the wild.</span>

                    </p>

                </div>
            </div>


        </div >
    );
};

export default IdentifyCroc;