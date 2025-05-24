import React from 'react';
import croc0 from '../Assets/croc0.png';
import croc1 from '../Assets/croc1.png';
import croc2 from '../Assets/croc2.png';
import croc3 from '../Assets/croc3.png';
import croc4 from '../Assets/croc4.png';
import croc5 from '../Assets/croc5.png';
import croc6 from '../Assets/croc6.png';
import croc7 from '../Assets/croc7.png';
import croc8 from '../Assets/croc8.png';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSound } from 'use-sound';
import whoisthatMp3 from '../Assets/whoisthat.mp3';
const Poke = ({ className }) => {
    const pokeCrocs = [croc0, croc1, croc2, croc3, croc4, croc5, croc6, croc7, croc8];
    const pokeNames = ['Totodile', 'Croconaw', 'Feraligatr', 'Sandile', 'Krokorok', 'Krookodile', 'Fuecoco', 'Crocalor', 'Skeledirge'];
    const [pokeIndex, setPokeIndex] = useState(null);
    const [showPoke, setShowPoke] = useState(false);
    const [used, setUsed] = useState([]);
    const [sound] = useSound(whoisthatMp3);
    const newPoke = () => {

        if (used.length === pokeCrocs.length) {
            setUsed([]);
        };
        let seed = Math.floor(Math.random() * pokeCrocs.length);
        while (used.includes(seed)) {
            seed = (seed + 1) % pokeCrocs.length;
        }
        setUsed((prev) => [...prev, seed]);
        setPokeIndex((prev) => {
            setShowPoke(false);
            return seed;
        }
        );
    };

    useEffect(() => {
        newPoke();
    }, [])
    return (
        <div>
            {
                pokeIndex === null ? <></> :
                    <div>
                        <div style={{
                            fontSize: '2em',
                        }}>
                            Who is that crocodilian?
                        </div>
                        <img src={pokeCrocs[pokeIndex]} alt="pokeCroc" className={className}
                            style={{
                                filter: showPoke ? 'drop-shadow(0px 0px 5px #111)' : 'brightness(0)',
                                transition: 'filter 0.3s ease-in-out',
                                height: '30vh',
                                width: 'auto',
                                margin: '10px auto',
                            }}

                        />
                        <div style={{
                            margin: '10px auto',
                            height: '1.5em',
                            fontSize: '1.5em',
                        }}>
                            {showPoke && <span>It is...{pokeNames[pokeIndex]}!</span>}
                        </div>
                        {
                            showPoke ?
                                <div>

                                    <Button onClick={() => {

                                        newPoke();
                                    }}
                                        variant='outline-primary'
                                        style={{ fontSize: '1.2 em' }}>Next</Button>
                                </div>
                                :
                                <div>
                                    <Button onClick={() => {
                                        setShowPoke(true);
                                        sound();
                                    }} variant='outline-primary'
                                        style={{ fontSize: '1.2 em' }}>Reveal</Button>
                                </div>
                        }
                    </div>

            }
        </div>
    );
};

export default Poke;