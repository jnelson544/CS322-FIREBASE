

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const pug = require('pug');

exports.Search = onRequest((request, response) => {
    let template = pug.compileFile('views/Search.pug');
    let markup = template();
        response.writeHead(200, { 'Content-Type' : 'text/html'});
        response.end(markup)
});

exports.Home = onRequest(async (request, response) => {
    let template = pug.compileFile('views/Home.pug');
    let markup = template();
        response.writeHead(200, { 'Content-Type' : 'text/html'});
        response.end(markup)

});

exports.Login = onRequest(async (request, response) => {
    let template = pug.compileFile('views/Login.pug');
    let markup = template();
        response.writeHead(200, { 'Content-Type' : 'text/html'});
        response.end(markup)

});

exports.Signup = onRequest(async (request, response) => {
    let template = pug.compileFile('views/Signup.pug');
    let markup = template();
        response.writeHead(200, { 'Content-Type' : 'text/html'});
        response.end(markup)

});

const cors = require('cors')({ origin: true });

exports.Favorites = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        try {
            let template = pug.compileFile('views/Favorites.pug');
            let markup = template();
            response.status(200).send(markup);
        } catch (error) {
            console.error('Error rendering Pug template:', error);
            response.status(500).send('Internal Server Error');
        }
    });
});

exports.Playlists = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        
            let template = pug.compileFile('views/Playlist.pug');
            let markup = template();
            response.writeHead(200, { 'Content-Type' : 'text/html'});
            response.end(markup)
            
        })    
});

