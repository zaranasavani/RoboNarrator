const form = document.getElementById('text-form');
const highlightedTextDiv = document.getElementById('highlightedText');
const playButton = document.getElementById('playBtn');
const pauseButton = document.getElementById('pauseBtn');
const stopButton = document.getElementById('stopBtn');
const resumeButton = document.getElementById('resumeBtn');
let speechSynthesis = window.speechSynthesis;
let utterance; // Store the utterance for playback control
let currentIndex = 0; // Index for highlighted words
let isSpeaking = false; // Flag to track if speaking

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = document.getElementById('text').value;
    highlightText(text);
    speakText(text);
});

function highlightText(text) {
    const words = text.split(' ').map(word => `<span>${word} </span>`).join('');
    highlightedTextDiv.innerHTML = words; // Show the highlighted words
    highlightedTextDiv.style.display = 'block'; // Display the highlighted text div
}

function speakText(text) {
    // Reset previous utterance
    if (utterance) {
        speechSynthesis.cancel(); // Cancel previous speech if any
    }

    utterance = new SpeechSynthesisUtterance(text);

    utterance.onstart = function () {
        isSpeaking = true; // Update speaking flag
        playButton.style.display = 'none'; // Hide play button
        pauseButton.style.display = 'inline-block'; // Show pause button
        stopButton.style.display = 'inline-block'; // Show stop button
        resumeButton.style.display = 'none'; // Hide resume button
    };

    // Event handler for when a word is being spoken
    utterance.onboundary = function (event) {
        if (event.name === 'word') {
            // Highlight the current word
            const spans = highlightedTextDiv.querySelectorAll('span');
            if (currentIndex < spans.length) {
                spans[currentIndex].classList.add('highlight');
                currentIndex++;
            }
        }
    };

    // Event handler for when speech has finished
    utterance.onend = function () {
        const spans = highlightedTextDiv.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('highlight')); // Remove highlights
        currentIndex = 0; // Reset current index
        isSpeaking = false; // Update speaking flag

        // Display message after speech has finished
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('alert', 'alert-info', 'mt-3');
        messageDiv.textContent = 'Speech has been spoken';
        highlightedTextDiv.appendChild(messageDiv); // Append message to highlighted text div

        playButton.style.display = 'inline-block'; // Show play button
        pauseButton.style.display = 'none'; // Hide pause button
        stopButton.style.display = 'none'; // Hide stop button
        resumeButton.style.display = 'none'; // Hide resume button
    };

    // Speak the text
    speechSynthesis.speak(utterance);
}

// Play audio functionality
playButton.addEventListener('click', function () {
    if (isSpeaking) {
        speechSynthesis.resume(); // Resume if paused
    } else {
        speechSynthesis.speak(utterance); // Speak the text again
    }
    playButton.style.display = 'none'; // Hide play button
    pauseButton.style.display = 'inline-block'; // Show pause button
    stopButton.style.display = 'inline-block'; // Show stop button
    resumeButton.style.display = 'none'; // Hide resume button
});

// Pause audio functionality
pauseButton.addEventListener('click', function () {
    speechSynthesis.pause(); // Pause the speech
    playButton.style.display = 'inline-block'; // Show play button
    pauseButton.style.display = 'none'; // Hide pause button
    stopButton.style.display = 'inline-block'; // Show stop button
    resumeButton.style.display = 'inline-block'; // Show resume button
});

// Stop audio functionality
stopButton.addEventListener('click', function () {
    speechSynthesis.cancel(); // Stop the speech
    const spans = highlightedTextDiv.querySelectorAll('span');
    spans.forEach(span => span.classList.remove('highlight')); // Remove highlights
    currentIndex = 0; // Reset current index
    playButton.style.display = 'inline-block'; // Show play button
    pauseButton.style.display = 'none'; // Hide pause button
    stopButton.style.display = 'none'; // Hide stop button
    resumeButton.style.display = 'none'; // Hide resume button
    isSpeaking = false; // Update speaking flag
});

// Resume audio functionality
resumeButton.addEventListener('click', function () {
    speechSynthesis.resume(); // Resume the speech
    playButton.style.display = 'none'; // Hide play button
    pauseButton.style.display = 'inline-block'; // Show pause button
    stopButton.style.display = 'inline-block'; // Show stop button
    resumeButton.style.display = 'none'; // Hide resume button
});
