import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(4).stores({
  photos: '++id, name, image, size, gps, species, status, certainty', // Primary key and indexed props
  currentIdentifyer: 'id, image, gps' // Primary key and indexed props
});

