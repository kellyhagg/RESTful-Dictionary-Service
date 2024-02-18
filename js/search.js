// Example dictionary object
const dictionary = {
    "book": "A set of printed pages, bound together and published.",
    "apple": "A round fruit of a tree of the rose family, which typically has thin green or red skin and crisp flesh."
};

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting traditionally

    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultArea = document.getElementById('resultArea');

    // Check if the term exists in the dictionary
    if (dictionary[searchTerm]) {
        // If the term is found, display it with its definition
        resultArea.innerHTML = `<div class="alert alert-success"><strong>${searchTerm}</strong>: ${dictionary[searchTerm]}</div>`;
    } else {
        // If the term is not found, display an appropriate message
        resultArea.innerHTML = `<div class="alert alert-danger">Request# 103, word '${searchTerm}' not found!</div>`;
    }
});