
import React, { useEffect, useState } from 'react';
import styles from './InnerMap.module.css';
import { MapContainer, TileLayer, useMap, Marker, Popup, WMSTileLayer } from 'react-leaflet'
import { db } from '../../../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import croclock from '../../../assets/croclockhomes.png';
import { useNavigate } from 'react-router-dom';

const InnerMap = ({photos}) => {
    const map = useMap();
    const [usedPhotos, setUsedPhotos] = useState([]);
    const navigator = useNavigate();
  
    useEffect(() => {
        if (photos?.length > 0) {
            const photosWithGPS = photos.filter(t => t.gps?.GPSLatitude && t.gps?.GPSLongitude);
            setUsedPhotos(photosWithGPS);
            if (photosWithGPS.length === 0) {
                map.setView([-13.001141057866581, -38.50836045397077], 13);
                return;
            }
            const avg = photosWithGPS.reduce((acc, photo) => {
                acc.GPSLatitude += photo.gps.GPSLatitude;
                acc.GPSLongitude += photo.gps.GPSLongitude;
                console.log(photo.gps.GPSLatitude, photo.gps.GPSLongitude);
                return acc;
            }, { GPSLatitude: 0, GPSLongitude: 0 });
            avg.GPSLatitude /= photosWithGPS.length;
            avg.GPSLongitude /= photosWithGPS.length;
            map.setView([avg.GPSLatitude, avg.GPSLongitude], 5);
        }
        // console.log(`https://www.google.com/maps/embed/v1/place?key=${key}&q=Ibio${genMarkers()}`);
    }, [photos]);

    return (

        <>

            <TileLayer
                url="https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />

            {
                usedPhotos?.length>0 && usedPhotos.map((photo, index) => {
                    return (
                        <Marker key={index} position={[photo.gps.GPSLatitude + 0.01 * Math.sin(index), photo.gps.GPSLongitude + 0.01 * Math.cos(index)]}
                            icon={L.icon({
                                iconUrl: croclock,
                                iconSize: [33, 50], // size of the icon
                                iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
                                popupAnchor: [0, -50] // point from which the popup should open relative to the iconAnchor
                            })}
                        >
                            <Popup>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                    onClick={() => { navigator('/result/' + photo.id); }}
                                >   <div className={styles.imgContainerBg}>
                                        <div className={styles.imgContainer}>
                                            <img src={photo.image}  ></img>
                                        </div>
                                    </div>
                                    {/* <div>{photo.id}</div> */}
                                    <div><span style={{ color: '#aaa', fontWeight: 'bold' }}> Species:</span>
                                        {photo.species}</div>
                                    <span style={{
                                        color: photo.status === 'Identified' ? 'green' : photo.status === 'New' ? 'blue' : 'red',
                                        fontWeight: 'bold'
                                    }}>{photo.status}</span>
                                </div>
                            </Popup>
                        </Marker>
                    )
                })
            }
        </>

    );
};

export default InnerMap;