document.getElementById('definitionForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting in the traditional way

    var word = document.getElementById('wordInput').value;
    var definition = document.getElementById('definitionArea').value;
    var feedbackAlert = document.getElementById('feedbackAlert');

    // Function to display feedback messages
    function displayFeedback(message, isSuccess) {
        feedbackAlert.className = 'alert';
        if (isSuccess) {
            feedbackAlert.classList.add('alert-success');
        } else {
            feedbackAlert.classList.add('alert-danger');
        }
        feedbackAlert.textContent = message;
        feedbackAlert.classList.remove('d-none');
    }

    // Simple validation
    if (!word || !definition) {
        displayFeedback('Please fill in both the word and its definition.', false);
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://main--harmonious-belekoy-cd4e23.netlify.app/api/definitions', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.status == 200 || this.status == 201) {
            displayFeedback('Definition added successfully!', true);
        } else {
            displayFeedback('Failed to add definition. Please try again.', false);
        }
    };

    xhr.onerror = function () {
        // Handle network errors
        displayFeedback('Network error occurred. Please try again.', false);
    };

    xhr.send(JSON.stringify({ word: word, definition: definition }));
});
