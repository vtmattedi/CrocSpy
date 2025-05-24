import { Button } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import React, { useEffect, useState } from 'react';
import styles from './Info.module.css';
import Form from 'react-bootstrap/Form';
import { useTheme } from '../../Contexts/ThemeContext';
import { Nav } from 'react-bootstrap';
import crocHistoryImg from './Assets/ChatGPTcrocHist.png';
import crocAnatomyImg from './Assets/ChatGPTcrocAnatomy.png';
import crocBehaviourImg from './Assets/ChatGPTcrocBehaviour.png';
import crocFamilyImg from './Assets/ChatGPTcrocFamily.png';
import crocEvolutionImg from './Assets/ChatGPTcrocEvolution.png';
import crocDistributionImg from './Assets/ChatGPTcrocDistribution.png';
import { Dropdown } from 'react-bootstrap';
import usePageWidth from '../../Hooks/PageWidth';

import { t } from 'i18next';
import MobileFooter from '../../Components/MobileFooter/mobileFooter';
const Info = () => {
    const { locale, theme } = useTheme();
    const {width, mobile} = usePageWidth();

    const titles = [
        { Text: 'History', Img: crocHistoryImg },
        { Text: 'Anatomy', Img: crocAnatomyImg },
        { Text: 'Behavior', Img: crocBehaviourImg },
        { Text: 'Families', Img: crocFamilyImg },
        { Text: 'Evolution', Img: crocEvolutionImg },
        { Text: 'Distribution', Img: crocDistributionImg },
    ]


    const CrocsInfo = (title) => {
        const lang = locale ? locale : 'en';
        if (title === 'History') {
            return `
            Crocodilians have existed for over 200 million years, appearing in the Late Triassic period, around the same time as dinosaurs. Early crocodilian ancestors (called crocodylomorphs) were more diverse and occupied a range of ecological niches — some even lived entirely on land and walked upright.

After the mass extinction 66 million years ago that wiped out the non-avian dinosaurs, crocodilians survived and evolved into the semi-aquatic ambush predators we know today. They are considered "living fossils" due to their relatively unchanged body structure over millions of years.`
        }
        else if (title === 'Anatomy') {
            return `
            Crocodilians are built for strength, stealth, and survival in aquatic environments:

Skull & Teeth: Strong, flattened skull with conical teeth perfect for gripping prey (not chewing). The teeth are constantly replaced.

Eyes & Nostrils: Positioned on top of the head, allowing for partial submersion while seeing and breathing.

Scales: Tough, keratinized scales and bony plates called osteoderms for armor.

Tail: Long, muscular tail used for propulsion in water.

Heart: Four-chambered heart (like birds and mammals), allowing for more efficient blood circulation.

Respiration: Efficient lungs and a valve system that allows them to hold their breath for long periods underwater.


        `
        }
        else if (title === 'Behavior') {
            return `
    Crocodilians exhibit complex behaviors for reptiles:

Territoriality: Males are territorial, especially during mating season.

Communication: Use vocalizations (e.g., bellows, hisses), body postures, and vibrations for communication.

Parental Care: Remarkably attentive — mothers build nests, guard them, and may even help hatchlings reach the water and protect them afterward.

Hunting: Primarily ambush predators; they lie still, partially submerged, and launch surprise attacks.

Thermoregulation: Ectothermic (cold-blooded), so they bask in the sun to warm up and retreat to shade or water to cool down.
    `
        }
        else if (title === 'Families') {
            return `
        There are three extant (currently living) families:

Crocodylidae (Crocodiles)

Found in Africa, Asia, the Americas, and Australia.

V-shaped snout, exposed teeth when mouth is closed.

Includes Nile crocodile, saltwater crocodile, etc.

Alligatoridae (Alligators and Caimans)

Mostly in the Americas and China.

U-shaped snout, upper teeth visible only.

Includes American alligator, black caiman, etc.

Gavialidae (Gharials)

Found in parts of India and Nepal.

Very long, narrow snout adapted for catching fish.

Only one surviving species: the gharial (Gavialis gangeticus).
`}
        else if (title === 'Evolution') {
            return `
        Crocodilians are archosaurs, a group that also includes dinosaurs and birds. They evolved from land-dwelling ancestors and diversified into aquatic predators.

Modern crocodilians appeared in the Late Cretaceous, with characteristics similar to today's species. Despite some evolutionary changes, they have retained much of their ancient form, earning them the term "living fossils".

Genetically, they are more closely related to birds than to other reptiles like lizards and snakes — both crocodilians and birds share a common ancestor among the archosaurs.
`
        }
        else if (title === 'Distribution') {
            return `
                Crocodilians are found in tropical and subtropical regions across the world:

Crocodiles: Widely distributed — Africa (Nile), Asia (India, Southeast Asia), Australia, and the Americas.

Alligators: U.S. (Southeast states like Florida and Louisiana) and China (critically endangered Chinese alligator).

Caimans: Central and South America (Amazon basin, wetlands).

Gharials: Restricted to a few river systems in northern India and Nepal.

They typically inhabit rivers, swamps, marshes, lakes, and estuaries — places with abundant water and prey.
            `
        }



    }

    const getSection = (title) => {

        const res = [];
        res.push(
            <img src={title.Img} alt="Crocodile Eye" className={styles.crocEyeImg} />
        )
        res.push(
            <div className={styles.sectionText}>
                <h2>{title.Text}</h2>
                <div className={styles.contentDiv}>
                    {CrocsInfo(title.Text)}
                </div>
            </div>
        )
        return res;

    };

    return (
        <div className={styles.outerDiv} data-bs-theme={theme}>
            <div className={styles.title}>
                <div className={'title '+ styles.title}>Crocodillians</div>
                {
                    (width < 768) && (
                        <>
                            <Dropdown>

                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <i className="bi bi-list"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        titles.map((title, index) => {
                                            return (
                                                <Dropdown.Item key={index}
                                                    onClick={() => {
                                                        const div = document.getElementById('t' + index);
                                                        div?.scrollIntoView({ behavior: 'smooth' });
                                                    }
                                                    }
                                                > {title.Text}</Dropdown.Item>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    )
                }
            </div>
            {(width >= 768) && (
                <div className={styles.navDiv}>
                    {
                        titles.map((title, index) => {
                            return (
                                <Nav.Link key={index}
                                    onClick={() => {
                                        const div = document.getElementById('t' + index);
                                        div?.scrollIntoView({ behavior: 'smooth' });

                                    }
                                    }
                                > {title.Text}</Nav.Link>

                            )
                        })
                    }
                </div>
            )}
            {
                titles.map((title, index) => {
                    const sections = getSection(title);
                    return (
                        width > 768 ?
                            <div className={styles.section} key={index} id={'t' + index}>
                                <>
                                    {sections[index % 2 === 0 ? 0 : 1]}
                                    {sections[index % 2 === 0 ? 1 : 0]}
                                </>
                            </div>
                            :
                            <div className={styles.mobilesection} key={index} id={'t' + index}>
                                <>
                                    {sections[1]}
                                    {sections[0]}
                                </>
                            </div>
                    )
                })
            }

        </div>
    );
};

export default Info;