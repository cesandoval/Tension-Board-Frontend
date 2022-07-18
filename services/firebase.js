import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

// Set the configuration for your app
const firebaseConfig = {
  apiKey: '<your-api-key>',
  projectId: 'tension-board-2b6c3',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: 'tension-board-2b6c3.appspot.com',
}
const firebaseApp = initializeApp(firebaseConfig)

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp)

export const db = getFirestore(firebaseApp)
