import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: 'tension-board-2b6c3.appspot.com',
}
const firebaseApp = initializeApp(firebaseConfig)

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp)
