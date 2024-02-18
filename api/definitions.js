// Assuming use in environments like AWS Lambda, Vercel, or Netlify
// This example uses the async handler format suitable for these platforms

let dictionary = []; // This will reset for every new instance of the function
let requestsReceived = 0; // Same as above, not persistent across invocations

exports.handler = async (event) => {
    // Increment the requests counter
    requestsReceived++;

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "CORS preflight successful" })
        };
    }

    try {
        if (event.httpMethod === 'POST') {
            const { word, definition } = JSON.parse(event.body);
            const existingEntry = dictionary.find(entry => entry.word === word);

            if (existingEntry) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ message: `Warning! ${word} already exists` })
                };
            } else {
                dictionary.push({ word, definition });
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({ message: `Request #${requestsReceived}`, newEntry: { word, definition } })
                };
            }
        } else if (event.httpMethod === 'GET') {
            const word = event.queryStringParameters.word;
            const entry = dictionary.find(entry => entry.word === word);

            if (entry) {
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({ found: true, definition: entry.definition, numberOfRequest: requestsReceived })
                };
            } else {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ found: false, message: `The word "${word}" was not found.` })
                };
            }
        } else {
            // Method not allowed
            return {
                statusCode: 405,
                headers,
                body: JSON.stringify({ message: "Method Not Allowed" })
            };
        }
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    }
};
