const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const output = document.getElementById('output');

let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        output.textContent = 'Translating...';
        const translatedText = await translateText(transcript);
        output.textContent = translatedText;
    };

    recognition.onerror = (event) => {
        console.error(event.error);
    };

    startBtn.addEventListener('click', () => {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
    });

    stopBtn.addEventListener('click', () => {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });
} else {
    alert('Speech recognition not supported in this browser.');
}

async function translateText(text) {
    const response = await fetch('https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=en|te');
    const data = await response.json();
    return data.responseData.translatedText || "Translation error";
}