exports.handler = async (event) => {
    // Simulating in-memory storage (note: this data is not persistent across function invocations)
    let dictionary = [];
    let requestsReceived = 0;

    // Parsing the request URL and method
    const { httpMethod, queryStringParameters, body } = event;
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    };

    // Increment the requests counter
    requestsReceived++;

    if (httpMethod === 'OPTIONS') {
        // Return CORS headers for preflight requests
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "CORS preflight" })
        };
    }

    if (httpMethod === 'POST') {
        const { word, definition } = JSON.parse(body);

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
    }

    if (httpMethod === 'GET') {
        const { word } = queryStringParameters;
        const entry = dictionary.find(entry => entry.word === word);

        if (entry) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ found: true, definition: entry.definition, numberOfRequest: requestsReceived })
            };
        } else {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ found: false, numberOfRequest: requestsReceived })
            };
        }
    }

    // Fallback for unsupported methods
    return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ message: "Method Not Allowed" })
    };
};
