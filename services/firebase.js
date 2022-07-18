import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// const { getFirestore } = require('firebase-admin/firestore')

// import { getFirestore } from 'firebase/firestore'

// Set the configuration for your app
// TODO: Replace with your app's config object
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

// export const FirebaseApp = Firebase.initializeApp(firebaseConfig)
// export const db = FirebaseApp.firestore()
// export const db = getFirestore(firebaseApp)
