import { openDB } from 'idb';

const initdb = async () =>
  openDB('text', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('text')) {
        console.log('db text already exits');
        return;
      }
      db.createObjectStore('text', { keyPath: 'id', autoIncrement: true });
      console.log('text database created');
    },
  });

// Logic to a method that accepts some content and adds it to the database

export const putDb = async (content) => {
  console.log('PUT to the database');

  const editorDb = await openDB('text', 1);

  const tx = editorDb.transaction('text', 'readwrite');

  const store = tx.objectStore('text');

  const request = store.put({ id: 1, content: content });

  const result = await request;

console.log('put request to the db', result);
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log ('GET from the database');

  const editorDb = await openDB('text', 1);

  const tx = editorDb.transaction('text', 'readonly');

  const store = tx.objectStore('text');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
