function addDefinition() {
    const word = document.getElementById('wordInput').value;
    const definition = document.getElementById('definitionInput').value;

    if (!word || !definition) {
        document.getElementById('storeResult').textContent = 'Please enter both the word and definition fields.';
        return;
    }

    const xhr = new XMLHttpRequest();

    // TODO: Change URL when not local, to whatever the backend is
    xhr.open('POST', 'https://restful-dictionary-service.vercel.app/api/definitions', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById('storeResult').textContent = JSON.parse(xhr.responseText).message;
            } else {
                document.getElementById('storeResult').textContent = 'Error: ' + xhr.status;
            }
        }
    };

    const data = JSON.stringify({ word, definition });
    xhr.send(data);
}

// document.getElementById('definitionForm').addEventListener('submit', function (e) {
//     e.preventDefault(); // Prevent the form from submitting in the traditional way

//     var word = document.getElementById('wordInput').value;
//     var definition = document.getElementById('definitionArea').value;
//     var feedbackAlert = document.getElementById('feedbackAlert');

//     // Function to display feedback messages
//     function displayFeedback(message, isSuccess) {
//         feedbackAlert.className = 'alert';
//         if (isSuccess) {
//             feedbackAlert.classList.add('alert-success');
//         } else {
//             feedbackAlert.classList.add('alert-danger');
//         }
//         feedbackAlert.textContent = message;
//         feedbackAlert.classList.remove('d-none');
//     }

//     // Simple validation
//     if (!word || !definition) {
//         displayFeedback('Please fill in both the word and its definition.', false);
//         return;
//     }

//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', 'https://restful-dictionary-service.vercel.app/api/definitions', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');

//     xhr.onload = function () {
//         if (this.status == 200 || this.status == 201) {
//             displayFeedback('Definition added successfully!', true);
//         } else {
//             displayFeedback('Failed to add definition. Please try again.', false);
//         }
//     };

//     xhr.onerror = function () {
//         // Handle network errors
//         displayFeedback('Network error occurred. Please try again.', false);
//     };

//     xhr.send(JSON.stringify({ word: word, definition: definition }));
// });
