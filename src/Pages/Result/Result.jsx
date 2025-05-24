import React, { useState } from 'react';
import styles from './Result.module.css';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../../../db';
import { Placeholder, ProgressBar, Button } from 'react-bootstrap';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import ImgEqualizer from '../../Components/ImgEqualizer/ImgEqualizer';

const SkeletonRect = ({ width = 200, height = 20, borderRadius = 4 }) => (
    <svg width={width} height={height} role="img" aria-label="Loading">
        <rect
            x="0"
            y="0"
            width={width}
            height={height}
            rx={borderRadius}
            fill="url(#skeleton-gradient)"

        />
        <defs>
            <linearGradient id="skeleton-gradient">
                <stop offset="0%" stopColor="red">
                    <animate attributeName="offset" values="-2; 1" dur="1.5s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#888">
                    <animate attributeName="offset" values="-1.5; 1.5" dur="1.5s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="red">
                    <animate attributeName="offset" values="-1; 2" dur="1.5s" repeatCount="indefinite" />
                </stop>
            </linearGradient>
        </defs>
    </svg>
);


const Result = () => {
    const [result, setResult] = useState(null);
    const [barVal, setBarVal] = useState(0);
    const navigator = useNavigate();
    const location = useLocation();
    const { deletePhoto } = useGlobalContext();
    function getCrocodilianInfo(speciesName) {

        const crocodilians = {
            "American alligator": {
                family: "Alligatoridae",
                habits: "semi-aquatic, often basking on riverbanks or lurking in freshwater swamps and marshes",
                location: "southeastern United States, especially Florida and Louisiana",
                funFact: "They can survive in water temperatures close to freezing by slowing their metabolism and even sticking their snouts through ice to breathe."
            },
            "Chinese alligator": {
                family: "Alligatoridae",
                habits: "prefers slow-moving rivers and ponds, hibernates in burrows during winter",
                location: "eastern China, particularly the lower Yangtze River",
                funFact: "It is critically endangered and much smaller than the American alligator."
            },
            "Spectacled caiman": {
                family: "Alligatoridae",
                habits: "active mostly at night, adapts to many habitats",
                location: "Central and South America",
                funFact: "Named for the bony ridge between its eyes, resembling spectacles."
            },
            "Yacare caiman": {
                family: "Alligatoridae",
                habits: "thrives in swamps, marshes, and slow rivers",
                location: "Brazil, Bolivia, Argentina, and Paraguay",
                funFact: "Often called the piranha caiman due to its diet including piranhas."
            },
            "Broad-snouted caiman": {
                family: "Alligatoridae",
                habits: "prefers still or slow-moving freshwater",
                location: "eastern and southern Brazil, northern Argentina, and Uruguay",
                funFact: "Its broad snout helps it crush hard-shelled prey."
            },
            "Black caiman": {
                family: "Alligatoridae",
                habits: "nocturnal apex predator",
                location: "Amazon Basin",
                funFact: "The largest species of caiman, growing up to 6 meters."
            },
            "Cuvier’s dwarf caiman": {
                family: "Alligatoridae",
                habits: "reclusive and nocturnal, lives in forest streams",
                location: "northern and central South America",
                funFact: "The smallest living crocodilian, rarely exceeding 1.5 meters."
            },
            "Schneider’s smooth-fronted caiman": {
                family: "Alligatoridae",
                habits: "solitary and shy, prefers forested rivers and streams",
                location: "northern South America",
                funFact: "Has smooth skin on the snout and a stocky body."
            },
            "Saltwater crocodile": {
                family: "Crocodylidae",
                habits: "ambush predator, travels between landmasses",
                location: "Southeast Asia, northern Australia, coastal India",
                funFact: "Largest living reptile, with males exceeding 6 meters."
            },
            "Nile crocodile": {
                family: "Crocodylidae",
                habits: "aggressive ambush hunter",
                location: "sub-Saharan Africa",
                funFact: "One of the most dangerous crocodilians to humans."
            },
            "American crocodile": {
                family: "Crocodylidae",
                habits: "prefers coastal and brackish waters",
                location: "Florida, Central America, Caribbean",
                funFact: "More tolerant of saltwater than alligators."
            },
            "Morelet’s crocodile": {
                family: "Crocodylidae",
                habits: "inhabits freshwater rivers and lakes",
                location: "Mexico, Belize, Guatemala",
                funFact: "Also called the Mexican crocodile, medium-sized and shy."
            },
            "Orinoco crocodile": {
                family: "Crocodylidae",
                habits: "prefers rivers and savannas",
                location: "Orinoco River basin, Colombia and Venezuela",
                funFact: "Critically endangered with fewer than 1,500 individuals left."
            },
            "Mugger crocodile": {
                family: "Crocodylidae",
                habits: "generalist predator, uses burrows for shelter",
                location: "Indian subcontinent",
                funFact: "Can walk long distances over land between water bodies."
            },
            "Philippine crocodile": {
                family: "Crocodylidae",
                habits: "lives in small lakes and rivers",
                location: "Philippines",
                funFact: "One of the most threatened crocodile species."
            },
            "Siamese crocodile": {
                family: "Crocodylidae",
                habits: "freshwater habitats like rivers, swamps",
                location: "Southeast Asia",
                funFact: "Critically endangered due to habitat loss and hybridization."
            },
            "New Guinea crocodile": {
                family: "Crocodylidae",
                habits: "freshwater lakes and swamps",
                location: "New Guinea",
                funFact: "Recently split into two species: northern and southern."
            },
            "Cuban crocodile": {
                family: "Crocodylidae",
                habits: "lives in swamps, more terrestrial than others",
                location: "Cuba",
                funFact: "Known for its leaping ability and possible intelligence."
            },
            "Johnston’s crocodile": {
                family: "Crocodylidae",
                habits: "freshwater only, timid",
                location: "northern Australia",
                funFact: "Also called freshwater crocodile, not dangerous to humans."
            },
            "West African crocodile": {
                family: "Crocodylidae",
                habits: "similar to Nile crocodile, but less aggressive",
                location: "West Africa",
                funFact: "Once thought to be Nile crocodile, recognized as distinct in 2011."
            },
            "Hall's New Guinea crocodile": {
                family: "Crocodylidae",
                habits: "inhabits southern parts of New Guinea",
                location: "southern New Guinea",
                funFact: "Split from the New Guinea crocodile in 2019."
            },
            "Borneo crocodile": {
                family: "Crocodylidae",
                habits: "rare and poorly understood",
                location: "Borneo island",
                funFact: "Taxonomic status is debated; may be a population of saltwater crocodile."
            },
            "African dwarf crocodile": {
                family: "Crocodylidae",
                habits: "nocturnal, hides in burrows by day",
                location: "West and Central Africa",
                funFact: "Smallest true crocodile, reaching only about 1.5 meters."
            },
            "Gharial": {
                family: "Gavialidae",
                habits: "strictly riverine, fish specialist",
                location: "northern India and Nepal",
                funFact: "Has a very narrow snout and males grow a bulbous 'ghara' at the tip."
            },
            "False gharial": {
                family: "Gavialidae",
                habits: "reclusive and aquatic, eats fish and mammals",
                location: "Malay Peninsula and Borneo",
                funFact: "Despite the long snout, it's not a true gharial but genetically related."
            }
        };
        if (!speciesName) {
            return "Please enter a species name.";
        }
        if (!isNaN(parseInt(speciesName))) {
            speciesName = Object.keys(crocodilians)[parseInt(speciesName)];
        }

        const species = crocodilians[speciesName];

        if (!species) {
            return `Sorry, I don't have information on the "${speciesName}". Try another crocodilian species.`;
        }

        return `The ${speciesName} belongs to the ${species.family} family. It is known for being ${species.habits}. You can find it in ${species.location}. Fun fact: ${species.funFact}`;
    }
    const getColor = (certainty) => {
        if (certainty > 0.9) {
            return 'darkgreen';
        }
        else if (certainty > 0.8) {
            return 'green';
        }
        else if (certainty > 0.5) {
            return 'yellow';
        }
        else {
            return 'red';
        }
    };

    useEffect(() => {
        //Fake Loading percentage
        const interval = setInterval(() => {
            setBarVal((prev) => {
                return Math.min(prev + Math.floor(Math.random() * 20), 99);
            });
        }, 10);
        const path = location.pathname.split('/');
        if (path.length > 2) {
            const id = parseInt(path[2]);
            db.photos.where('id').equals(id).toArray().then((photos) => {
                if (photos.length > 0) {
                    setBarVal(100);
                    clearInterval(interval);
                    setResult(photos[0]);
                }
                else {
                    navigator('/404');
                }
            });
        }

        return () => {
            clearInterval(interval);
        }

    }, [location]);

    return (
        <div>
            {
                result ?
                    result.status !== 'New' ?
                        <div>
                            <div className={styles.title}><span>Result</span>
                                {result?.status === 'Identified' &&
                                    <div>
                                        (<span style={{ color: getColor(result.certainty) }}>{(result.certainty * 100).toFixed(2)}%</span>)
                                    </div>

                                }

                            </div>
                            <h2><span
                                style={{
                                    color: '#aaa',
                                }}
                            >Species:</span> {result.species}
                            </h2>
                            <img src={result.image} alt={result.name} className={styles.image} />
                            {
                                result.status === 'Identified' ?
                                    <div className={styles.resultInfo}>
                                        {getCrocodilianInfo(result.species)}
                                    </div>
                                    :
                                    <div className={styles.resultInfo}>
                                        We were unable to identify the species. Please try again with a clearer image.
                                    </div>
                            }

                            <div className={styles.buttonsDiv}>
                                <div className={styles.buttonsInnerDiv}>
                                <Button
                                    onClick={() => {
                                        navigator('/identify');
                                    }}
                                    className={styles.anotherButton}
                                >
                                    <div className={styles.insideButtonIcon}>
                                        <span className="bi bi-search"></span>
                                        Identify another
                                    </div>
                                </Button>
                                {
                                    result?.status === 'Not Identified' &&
                                    <>
                                        <Button
                                            onClick={() => {
                                                navigator('/upload/' + result.id);
                                            }}
                                            className={styles.anotherButton}
                                            variant='outline-warning'
                                        >
                                            <div className={styles.insideButtonIcon}>
                                                <span className="bi bi-arrow-counterclockwise"></span>
                                                Retry
                                            </div>
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                deletePhoto(result.id).then(() => {
                                                    navigator('/home');
                                                });
                                            }}
                                            className={styles.anotherButton}
                                            variant='outline-danger'
                                        >
                                            <div className={styles.insideButtonIcon}>
                                                <span className="bi bi-trash"></span>
                                                Delete
                                            </div>
                                        </Button>
                                    </>
                                }
                                </div>
                            </div>
                        </div>
                        :
                        <>
                            <h2>Photo not yet analyzed</h2>
                            <h2><span
                                style={{
                                    color: '#aaa',
                                }}
                            >Species:</span> {"---"}
                            </h2>
                            <div className={styles.notUploadedContainer}>
                                <ImgEqualizer src={result.image} alt={result.name} width={'100%'} height={'45vh'} bgColor={'#00000000'} />
                                <Button
                                    onClick={() => {
                                        navigator('/upload/' + result.id);
                                    }}
                                    className={styles.anotherButton}
                                ><div className={styles.insideButtonIcon}>
                                        <span className="bi bi-upload"></span>
                                        Upload
                                    </div></Button>
                                    <p>
                                        Upload the photo to our AI to identify the croc species.
                                    </p>
                            </div>
                        </>

                    :
                    // Placeholder (Only for loading | Result is null)
                    <div className={styles.placeholderContainer}>
                        <div className={styles.placeholderContainerInner}>
                            <span className={styles.placeholderTitle}>Loading...</span>
                            <div className={styles.placeholderPb}>
                                <ProgressBar animated variant='success' now={barVal} label={barVal + '%'} />
                            </div>
                            <div className={styles.placeholderBars}>
                                <Placeholder as="p" animation="wave">
                                    <Placeholder xs={12} />
                                    <Placeholder xs={12} />
                                    <Placeholder xs={12} />
                                </Placeholder>
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
};

export default Result;