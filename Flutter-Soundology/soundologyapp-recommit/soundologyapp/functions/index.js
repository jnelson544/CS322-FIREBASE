/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");


Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
const firebaseConfig = {
    apiKey: "AIzaSyAnKJnt72UsVkr3arcXEFN6d4K_OtNGOjc",
    authDomain: "flutter-project-3586f.firebaseapp.com",
    projectId: "flutter-project-3586f",
    storageBucket: "flutter-project-3586f.appspot.com",
    messagingSenderId: "646682797522",
    appId: "1:646682797522:web:dc30b657635899e496140b",
    measurementId: "G-QHHNV8JF7X"
};
admin.initializeApp(firebaseConfig);
const db = admin.firestore();
const labRef = db.collection('lab').doc('test');
exports.readLab = (0, https_1.onRequest)({ timeoutSeconds: 15, cors: true, maxInstances: 10 }, (request, response) => {
    labRef.get().then((doc) => {
        if (doc.exists) {
            response.send(doc.data());
        }
        else {
            logger.info("No such Document!", { structuredData: true });
        }
    });
});