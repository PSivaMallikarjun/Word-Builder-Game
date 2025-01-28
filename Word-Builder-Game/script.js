let currentWord = "";
let currentPlayer = 1;
let totalPlayers = 2;

document.getElementById("startGame").addEventListener("click", () => {
  totalPlayers = parseInt(document.getElementById("players").value);
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("gameArea").classList.remove("hidden");
  document.getElementById("message").innerText = "Game Started! Player 1, start by entering a word.";
});

document.getElementById("submitWord").addEventListener("click", handleWordSubmission);

document.getElementById("voiceInput").addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    const spokenWord = event.results[0][0].transcript.trim();
    document.getElementById("wordInput").value = spokenWord;
    handleWordSubmission();
  };
});

function handleWordSubmission() {
  const wordInput = document.getElementById("wordInput");
  const word = wordInput.value.trim().toLowerCase();
  const message = document.getElementById("message");

  if (!word) {
    message.innerText = "Please enter a word.";
    return;
  }

  if (currentWord && word[0] !== currentWord.slice(-1)) {
    message.innerText = `Invalid word! It must start with "${currentWord.slice(-1)}".`;
    return;
  }

  currentWord = word;
  document.getElementById("currentWord").innerText = currentWord;
  wordInput.value = "";
  message.innerText = "";

  currentPlayer = currentPlayer % totalPlayers + 1;
  document.getElementById("currentPlayer").innerText = currentPlayer;
  message.innerText = `Player ${currentPlayer}, it's your turn!`;
}
