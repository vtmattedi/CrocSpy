
import React, { useEffect, useState } from 'react';
import styles from './Map.module.css';
import { MapContainer, TileLayer, useMap, Marker, Popup, WMSTileLayer } from 'react-leaflet'
import { db } from '../../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import croclock from '../../assets/croclockhomes.png';
import InnerMap from './InnerMap/InnerMap';
import ImgEqualizer from '../../Components/ImgEqualizer/ImgEqualizer';
import { use } from 'react';
import { Table } from 'react-bootstrap';

const Map = () => {

    const position = [-13.001141057866581, -38.50836045397077];
    const photos = useLiveQuery(() => db.photos.toArray());
    const [species, setSpecies] = useState(null);
    useEffect(() => {
        if (photos && photos.length > 0) {
            for (let i = 0; i < photos.length; i++) {
                const specie = photos[i].species;
                if (specie !== null && specie !== 'Unknown') {
                    setSpecies((prev) => {
                        if (prev === null) {
                            return [{ species: specie, count: 1 }];
                        }
                        const found = prev.find((s) => s.species === specie);
                        if (found) {
                            // If the species is already in the list, increment the count
                            return prev.map((s) => {
                                if (s.species === specie) {
                                    return { ...s, count: s.count + 1 };
                                }
                                return s;
                            });
                        } else {
                            return [...prev, { species: specie, count: 1 }];
                        }
                    });
                }
            }

        }
    }, [photos]);
    return (
        <div>
            <div className='title'>Map Page</div>
            Here We can see the crocodilian species that were identified by our AI.
            <div className={styles.mapContainer}>
                <MapContainer center={position} zoom={16} scrollWheelZoom={true} >
                    <InnerMap photos={photos} />
                </MapContainer>
            </div>
            <div>
                <br />
                {
                    species &&
                    <div>
                        <h3>Species Identified:</h3>
                        <Table striped bordered hover data-bs-theme="dark" className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Species</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {species.map((s, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{s.species}</td>
                                            <td>{s.count}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                }

            </div>
        </div>
    );
};

export default Map;