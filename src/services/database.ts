import dotenv from "dotenv";
import * as firebase from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import serviceAccount from "./service-account.json";

dotenv.config();

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const mediaStorage = firebase.storage().bucket();
export const firestore = firebase.firestore();
export const firestoreAuth = firebase.auth();
