// const http = require('http');
// const url = require('url');

// const dictionary = [];
// let requestsReceived = 0;

// const server = http.createServer((req, res) => {
//     const parseUrl = url.parse(req.url, true);

//     if (req.method === 'OPTIONS') {
//         res.writeHead(200, {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'GET, POST',
//             'Access-Control-Allow-Headers': 'Content-Type',
//         });
//         res.end();
//         return;
//     }

//     if (parseUrl.pathname === '/api/definitions' && req.method === 'POST') {
//         let body = '';

//         req.on('data', (chunk) => { if (chunk != null) body += chunk });

//         req.on('end', () => {
//             const data = JSON.parse(body);
//             const word = data.word;
//             const definition = data.definition;

//             const existingEntry = dictionary.find(entry => entry.word === word);

//             if (existingEntry) {
//                 res.writeHead(400, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: `Warning! ${word} already exists` }));
//             } else {
//                 dictionary.push({ word, definition });
//                 res.writeHead(200, {
//                     'Content-Type': 'application/json',
//                     'Access-Control-Allow-Origin': '*',
//                     'Access-Control-Allow-Methods': 'GET, POST',
//                 });
//                 res.end(JSON.stringify({ message: `Request #${++requestsReceived}`, newEntry: { word, definition } }));
//             }
//         });
//     } else if (parseUrl.pathname === '/api/definitions' && req.method === 'GET') {
//         const word = parseUrl.query.word;

//         const entry = dictionary.find(entry => entry.word === word);

//         if (entry) {
//             res.writeHead(200, {
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'GET, POST',
//             });
//             res.end(JSON.stringify({ found: true, definition: entry.definition, numberOfRequest: requestsReceived }));
//         } else {
//             res.writeHead(400, {
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'GET, POST',
//             });
//             res.end(JSON.stringify({ found: false, numberOfRequest: requestsReceived }));
//         }
//     } else {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ result: 'Not Found' }));
//     }
// });

// server.listen(3000, () => {
//     console.log('Server is running on port 3000...');
// });