import React from 'react';
import styles from './Upload.module.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../../db';
import { Button, ProgressBar } from 'react-bootstrap';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import Poke from './Poke/Poke';
const Upload = () => {

    const [state, setState] = useState(0);
    const [stateLabel, setStateLabel] = useState('loading photo');
    const [fileData, setFileData] = useState(null);
    const [fileAlreadyUploaded, setfileAlreadyUploaded] = useState(false);
    const location = useLocation();
    const { addAlert } = useGlobalContext();
    const navigate = useNavigate();

    const fakeApi = () => {
        const getRandomCrocodilian = () => {

            // const species = [
            //     // Alligatoridae
            //     "American Alligator",
            //     "Chinese Alligator",
            //     "Spectacled Caiman",
            //     "Broad-snouted Caiman",
            //     "Yacare Caiman",
            //     "Black Caiman",
            //     "Cuvier's Dwarf Caiman",
            //     "Schneider's Smooth-fronted Caiman",

            //     // Crocodylidae
            //     "American Crocodile",
            //     "Hall's Crocodile",
            //     "Orinoco Crocodile",
            //     "Australian Freshwater Crocodile",
            //     "Philippine Crocodile",
            //     "Morelet's Crocodile",
            //     "Nile Crocodile",
            //     "Northern New Guinea Freshwater Crocodile",
            //     "Mugger Crocodile",
            //     "Saltwater Crocodile",
            //     "Cuban Crocodile",
            //     "Siamese Crocodile",
            //     "West African Crocodile",
            //     "West African Slender-snouted Crocodile",
            //     "Central African Slender-snouted Crocodile",
            //     "Congo Dwarf Crocodile",
            //     "West African Dwarf Crocodile",

            //     // Gavialidae
            //     "Indian Gharial",
            //     "Malayan Gharial"
            // ];

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
            const species = Object.keys(crocodilians);
            const randomIndex = Math.floor(Math.random() * species.length);
            return species[randomIndex];
        }

        const species = Math.random() > 0.2 ? getRandomCrocodilian() : 'Unknown';
        const certainty = 0.99 - Math.random() * 0.4;

        return {
            species: species,
            certainty: certainty
        };

    }
    const uploadFile = (file) => {
        setState(3);
        setStateLabel('Uploading photo');

        //Here we will upload the file to the server
        //This will be async call instead of setTimeout
        //console.log('Uploading file', file);
        setTimeout(() => {
            setState(4);
            setStateLabel('Identifying photo');
            const res = fakeApi();
            //console.log('File uploaded', res);
            const newStatus = res.species === 'Unknown' ? 'Not Identified' : 'Identified';
            db.photos.update(file.id, { status: newStatus, species: res.species, certainty: res.certainty })
                .then(() => {
                    setState(5);
                    setStateLabel('Done');
                    navigate('/result/' + file.id);
                }).catch((error) => {
                    addAlert({
                        title: 'Error updating file',
                        text: error.message,
                        onClose: () => {
                            navigate('/home');
                        }
                    });
                });
        }, 2000);
    }

    useEffect(() => {
        setState(1);
        const id = parseInt(location.pathname.split('/')[2]);
        if (isNaN(id)) {
            navigate('/home');
            console.log('Invalid id', location.pathname.split('/')[2]);
            return;
        }
        db.photos.where('id').equals(parseInt(id)).toArray().then((photos) => {
            if (photos.length > 0) {
                setFileData(photos[0]);
                setState(2);

                if (photos[0].status !== 'New') {
                    setStateLabel('Photo already uploaded');
                    setfileAlreadyUploaded(true);
                    setState(5);
                }
                else {
                    db.photos.update(photos[0].id, { status: 'Uploaded' }).then(() => {
                        uploadFile(photos[0])
                    });
                }
            } else {
                setState(5);
                console.log('Photo not found');
                // addAlert(
                //     {
                //         title: 'Error',
                //         text: `Photo with id ${id} not found`,
                //         onClose: () => {
                //             // navigate('/home');
                //         }
                //     }

                // )

            }
        })
    }
        , [location])

    return (

        <div>
            <div className={styles.title}>Analyzing image</div>
            {state === 0 && <></>}
            <div className={styles.pbContainerOuter}>
                <div className={styles.pbContainer}>
                    <ProgressBar animated now={state * 100 / 5} variant={fileAlreadyUploaded ? 'warning' : 'success'}
                        label={stateLabel} />
                </div>
            </div>
            {
                !fileAlreadyUploaded ? <Poke /> :
                    <>
                        <div className={styles.uploaded}><span className={styles.uploadedText}>This photo was already uploaded and analyzed by our IA</span>
                            <div className={styles.btnsDiv}>
                                <Button className={styles.button} variant='outline-warning'
                                    onClick={() => {
                                        uploadFile(fileData);
                                        setfileAlreadyUploaded(false);
                                    }}>
                                    <div className={styles.insideButtonIcon}>
                                        <span className="bi bi-arrow-clockwise"></span>
                                        <span>Re-Upload</span>

                                    </div>
                                </Button>
                                <Button className={styles.button} variant='outline-success'
                                    onClick={() => {
                                        navigate('/result/' + fileData.id);
                                    }}
                                >
                                    <div className={styles.insideButtonIcon}>
                                        <span>Check the result</span>
                                        <span className="bi bi-arrow-right"></span>
                                    </div>
                                </Button>
                            </div>

                        </div>

                    </>
            }



        </div >
    );
};

export default Upload;