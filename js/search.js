function searchDefinition() {
    const word = document.getElementById('searchInput').value;

    if (!word) {
        document.getElementById('searchResult').textContent = 'Please enter a word to search.';
        return;
    }

    const xhr = new XMLHttpRequest();

    // TODO: Change URL when not local, to whatever the backend is
    xhr.open('GET', `https://restful-dictionary-service.vercel.app/api/definitions/?word=${encodeURIComponent(word)}`, true);

    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.found) {
                    document.getElementById('searchResult').textContent = `Word: ${word}\nDefinition: ${response.definition}\nRequest #: ${response.numberOfRequest}`;
                } else {
                    document.getElementById('searchResult').textContent = `Word '${word}' not found.\nRequest #: ${response.numberOfRequest}`;
                }
            } else {
                document.getElementById('searchResult').textContent = 'Error: ' + xhr.status;
            }
        }
    };

    xhr.send();
}

// document.getElementById('searchForm').addEventListener('submit', function (e) {
//     e.preventDefault(); // Prevent the form from submitting the traditional way

//     var word = document.getElementById('searchInput').value; // Updated to match the input ID
//     var resultArea = document.getElementById('resultArea'); // For displaying results

//     // Simple validation
//     if (!word) {
//         resultArea.innerHTML = '<p class="text-danger">Please enter a word to search.</p>';
//         return;
//     }

//     var xhr = new XMLHttpRequest();
// xhr.open('GET', `https://restful-dictionary-service.vercel.app/api/definitions/?word=${encodeURIComponent(word)}`, true);

//     xhr.onload = function () {
//         if (this.status == 200) {
//             var response = JSON.parse(this.responseText);
//             if (response.definition) {
//                 resultArea.innerHTML = `<p class="text-success">Definition: ${response.definition}</p>`;
//             } else {
//                 resultArea.innerHTML = '<p class="text-warning">Word not found.</p>';
//             }
//         } else {
//             resultArea.innerHTML = '<p class="text-danger">Failed to retrieve definition.</p>';
//         }
//     };

//     xhr.onerror = function () {
//         // Handle network errors
//         resultArea.innerHTML = '<p class="text-danger">Network error occurred.</p>';
//     };

//     xhr.send();
// });
