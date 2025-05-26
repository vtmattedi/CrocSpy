
import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { useTheme } from '../../Contexts/ThemeContext';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Placeholder } from 'react-bootstrap';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db';
import { useNavigate } from 'react-router-dom';
import ImgEqualizer from '../../Components/ImgEqualizer/ImgEqualizer';
import { saveAs } from 'file-saver';
import croclock from '../../assets/croclockhomes.png';
import croclock2 from '../../assets/croclockhomesclosed.png';
const Home = () => {
    const { locale } = useTheme();
    const photos = useLiveQuery(() => db.photos.toArray());
    const [carouselIndex, setCarouselIndex] = useState(0);
    const navigator = useNavigate();
    const handleSelect = (selectedIndex) => {
        setCarouselIndex(selectedIndex);
    };
    const CrocsInfo = () => {
        const lang = locale ? locale : 'en';
        if (lang === 'pt-br') {
            return `
            A crocodilian is a member of the order Crocodylia, a group of large, semi-aquatic reptiles that includes crocodiles, alligators, caimans, and gharials. These animals are known for their elongated bodies, powerful tails, strong jaws, and thick, armored skin. Crocodilians are apex predators in their ecosystems, often found in freshwater habitats like rivers, lakes, and wetlands, although some species can tolerate brackish or saltwater environments.

Key Features of Crocodilians:
Anatomy:

Long, streamlined bodies suited for swimming.
Powerful tails used for propulsion in water.
Four short, sturdy legs for walking on land.
Sharp teeth for gripping prey.
Behavior:

Carnivorous diet, feeding on fish, birds, mammals, and other animals.
Ambush predators, often waiting for prey near the water's edge.
Social behavior includes basking in groups and communication through vocalizations and body movements.
Families:

Crocodylidae: True crocodiles.
Alligatoridae: Alligators and caimans.
Gavialidae: Gharials, distinguished by their long, narrow snouts.
Evolution:

Crocodilians are ancient creatures, with a lineage dating back over 200 million years.
Modern species have changed little since the age of dinosaurs.
Distribution:

Found in tropical and subtropical regions around the world, including Africa, Asia, the Americas, and Australia.
`
        }
    }
    const { deletePhoto } = useGlobalContext();
    const hasGps = (photo) => {
        if (photo?.gps?.GPSLatitude && photo?.gps?.GPSLongitude) {
            return true;
        }
        return false;
    }
    const getCertColor = (certainty) => {
        if (certainty >= 0.9) {
            return 'green';
        }
        else if (certainty >= 0.7) {
            return 'yellow';
        } else if (certainty >= 0.5) {
            return 'orange';
        } else {
            return 'red';
        }
    }
    const getFamily = (species) => {
        const croc = species.toLowerCase().indexOf('crocodile');
        const alligator = species.toLowerCase().indexOf('alligator');
        const caiman = species.toLowerCase().indexOf('caiman');
        const gharial = species.toLowerCase().indexOf('gharial');
        if (croc !== -1) {
            return 'Crocodylidae';
        }
        else if (alligator !== -1) {
            return 'Alligatoridae';
        }
        else if (caiman !== -1) {
            return 'Alligatoridae';
        }
        else if (gharial !== -1) {
            return 'Gavialidae';
        }
        else {
            return '---';
        }
    }
    return (
        <>
            {/* <div className={styles.outerDiv}>
                <div>{CrocsInfo()}</div>
            </div> */}
            <div style={{ width: '100%', height: '100%' }}>
                <div className={'title'}> My Photos </div>
                {
                    photos ?
                        <>
                            {
                                photos?.length === 0 ?
                                    <div className={styles.noPhotosContainer}>
                                        You don't have any photos yet. Take a picture of a crocodile to start identifying them!
                                        <div className={styles.buttonsContainer}>
                                            <Button
                                                className={styles.button}
                                                onClick={() => {
                                                    navigator('/Camera');
                                                }}>
                                                <div className={styles.insideButton}>
                                                    <span className="bi bi-camera"></span>
                                                    <span>Take a picture!</span>
                                                </div>
                                            </Button>
                                            <Button
                                                className={styles.button}
                                                onClick={() => {
                                                    navigator('/Identify');
                                                }}>
                                                <div className={styles.insideButton}>
                                                    <span className="bi bi-search"></span>
                                                    <span>Identify a Croc!</span>
                                                </div>
                                            </Button>
                                        </div>
                                        <div className={styles.divider}>
                                            <img src={croclock} alt='Crocodile' className={styles.img} />
                                        </div>
                                    </div> :
                                    <>
                                        < Carousel activeIndex={carouselIndex} onSelect={handleSelect}
                                            className={styles.carousel}
                                            interval={null}
                                        >
                                            {
                                                photos?.map((photo, index) => {
                                                    return (
                                                        <Carousel.Item
                                                            onClick={() => {
                                                                navigator('/result/' + photo?.id);
                                                            }}
                                                            style={{ cursor: 'pointer' }}
                                                            key={index} >

                                                            <ImgEqualizer src={photo?.image} alt={photo?.name} width='100%' height='50vh' bgColor='00000000' />


                                                            <Carousel.Caption>
                                                                <div
                                                                    style={{
                                                                        alignItems: 'center',
                                                                        fontSize: '1.2em',
                                                                        color: hasGps(photo) ? 'green' : 'red',
                                                                    }}
                                                                >
                                                                    <span className='bi bi-geo'></span>
                                                                </div>

                                                            </Carousel.Caption>
                                                        </Carousel.Item>
                                                    )
                                                })
                                            }

                                        </Carousel>
                                        <div className={styles.carouselButtons}>
                                            <Button
                                                variant='outline-danger'
                                                className={styles.carouselButton}
                                                onClick={() => {
                                                    db.photos.delete(photos[carouselIndex]?.id)
                                                        .then(() => {
                                                            console.log('Photo deleted');
                                                        })
                                                        .catch((error) => {
                                                            addAlert(
                                                                {
                                                                    title: 'Error',
                                                                    message: 'Error deleting photo' + error.message,
                                                                    onClose: () => { },
                                                                }
                                                            );
                                                        });
                                                }}>
                                                <div className={styles.insideButton}>
                                                    <span className="bi bi-trash"></span>
                                                    <span>Delete</span>
                                                </div>
                                            </Button>
                                            <Button
                                                variant='outline-secondary'
                                                className={styles.carouselButton}
                                                onClick={() => {
                                                    saveAs(photos[carouselIndex]?.image, photos[carouselIndex]?.name + '.jpeg');
                                                }}>
                                                <div className={styles.insideButton}>
                                                    <span className="bi bi-download"></span>
                                                    <span>Download</span>
                                                </div>
                                            </Button>
                                            {
                                                photos[carouselIndex]?.status === 'New' ?
                                                    <Button
                                                        variant='outline-warning'
                                                        className={styles.carouselButton}
                                                        onClick={() => {
                                                            navigator('/Upload/' + photos[carouselIndex]?.id);
                                                        }}>
                                                        <div className={styles.insideButton}>
                                                            <span className="bi bi-upload"></span>
                                                            <span>Upload</span>
                                                        </div>
                                                    </Button> :
                                                    <Button
                                                        variant='outline-success'
                                                        className={styles.carouselButton}
                                                        onClick={() => {
                                                            navigator('/result/' + photos[carouselIndex]?.id);
                                                        }}>
                                                        <div className={styles.insideButton}>
                                                            <span className="bi bi-eye"></span>
                                                            <span>See Results</span>
                                                        </div>
                                                    </Button>
                                            }
                                        </div>
                                        <div>
                                            {photos[carouselIndex]?.status !== 'New' &&
                                                <div className={styles.resultContainer}>
                                                    <div className={styles.results}>
                                                        <span className={styles.resultTitle}>Species:</span>
                                                        <span className={styles.resultVal}>{photos[carouselIndex]?.species}</span>
                                                        <span className={styles.resultFamily}>({getFamily(photos[carouselIndex]?.species)})</span>
                                                    </div>
                                                    <div className={styles.results}>
                                                        <span className={styles.resultTitle}>Certainty:</span>
                                                        <span className={styles.resultVal}
                                                            style={{
                                                                color: getCertColor(photos[carouselIndex]?.certainty)
                                                            }}
                                                        >{(photos[carouselIndex]?.certainty * 100).toFixed(1)}%</span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </>
                            }
                        </> :
                        <>
                            <div className={styles.placeholder}>
                                <div className={styles.placeholderBars}>
                                    <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} />
                                    </Placeholder>
                                </div>
                            </div>
                        </>
                }
            </div >
        </>
    );
};

export default Home;    