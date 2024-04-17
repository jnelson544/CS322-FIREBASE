/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const pug = require('pug');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//lab added code
exports.test = onRequest((requestAnimationFrameuest, response) => {
    let template = pug.compileFile('views/test.pug');
    let markup = template({
        name: requestAnimationFrameuest.query.name,
        major: requestAnimationFrameuest.query.major,
        quote: requestAnimationFrameuest.query.quote
    });
    response.writeHead(200, { 'Content-Type' : 'text/html'});
    response.end(markup);
});