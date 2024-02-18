// File: /api/definitions.js for Vercel

// This array and counter will reset on each cold start of the function.
// For persistent storage, consider using an external database.
let dictionary = [];
let requestsReceived = 0;

export default async (req, res) => {
    // Increment the requests counter
    requestsReceived++;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).json({ message: "CORS preflight successful" });
    }

    try {
        if (req.method === 'POST') {
            // Ensure you parse the body only if it's expected to be JSON
            const { word, definition } = JSON.parse(req.body);
            const existingEntry = dictionary.find(entry => entry.word === word);

            if (existingEntry) {
                return res.status(400).json({ message: `Warning! ${word} already exists` });
            } else {
                dictionary.push({ word, definition });
                return res.status(200).json({ message: `Request #${requestsReceived}`, newEntry: { word, definition } });
            }
        } else if (req.method === 'GET') {
            const { word } = req.query; // Using req.query for GET request parameters
            const entry = dictionary.find(entry => entry.word === word);

            if (entry) {
                return res.status(200).json({ found: true, definition: entry.definition, numberOfRequest: requestsReceived });
            } else {
                return res.status(404).json({ found: false, message: `The word "${word}" was not found.` });
            }
        } else {
            // Method not allowed
            return res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

