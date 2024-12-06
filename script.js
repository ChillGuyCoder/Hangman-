const words = [
    'fashion', 'trendy', 'stylish', 'elegant', 'vogue', 'chic', 'couture', 
    'glamour', 'luxury', 'model', 'runway', 'dazzling', 'design', 'artistic', 
    'couture', 'celebrity', 'catwalk', 'jewelry', 'couturier', 'makeup', 
    'highfashion', 'cosmetic', 'runway', 'editorial', 'iconic', 'art',
    'expression', 'avantgarde', 'vintage', 'classic', 'designer', 'sophisticated',
    'luxurious', 'couture', 'elegance', 'glamorous', 'hairstyle', 'trendy', 
    'makeupartist', 'style', 'couture', 'polished', 'supermodel', 'avantgarde', 
    'exquisite', 'superstar', 'haute', 'fashionista', 'glam', 'couturier', 'diva', 
    'stylist', 'fashionweek', 'boutique', 'couture', 'ensemble', 'makeover', 
    'shoes', 'handbag', 'bracelet', 'necklace', 'couture', 'highend', 'modeling', 
    'chic', 'styling', 'wardrobe', 'beauty', 'fashionicon', 'luxe', 'paris', 'lux', 
    'vintage', 'sophisticated', 'fabulous', 'couturist', 'designers', 'runway', 
    'apparel', 'couture', 'glam', 'designer'
];

let wordToGuess = '';
let guessedLetters = [];
let remainingGuesses = 6;

const wordDisplay = document.getElementById('word-display');
const guessedLettersDisplay = document.getElementById('guessed-letters');
const remainingGuessesDisplay = document.getElementById('remaining-guesses');
const gameMessage = document.getElementById('game-message');
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');
const guessButton = document.getElementById('guess-button');
const letterInput = document.getElementById('letter-input');

// Start a new game
function startGame() {
    guessedLetters = [];
    remainingGuesses = 6;
    wordToGuess = words[Math.floor(Math.random() * words.length)];
    updateWordDisplay();
    guessedLettersDisplay.textContent = '';
    remainingGuessesDisplay.textContent = remainingGuesses;
    gameMessage.textContent = '';
}

// Update the word display with guessed letters
function updateWordDisplay() {
    const displayWord = wordToGuess.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    wordDisplay.textContent = displayWord;
}

// Handle guess
function handleGuess() {
    const guess = letterInput.value.toLowerCase();
    if (guess && !guessedLetters.includes(guess)) {
        guessedLetters.push(guess);
        if (wordToGuess.includes(guess)) {
            correctSound.play();
            updateWordDisplay();
        } else {
            remainingGuesses--;
            incorrectSound.play();
            remainingGuessesDisplay.textContent = remainingGuesses;
        }

        if (remainingGuesses <= 0) {
            gameMessage.textContent = `Game Over! The word was: ${wordToGuess}`;
            setTimeout(startGame, 2000); // Restart the game after a delay
        } else if (wordToGuess.split('').every(letter => guessedLetters.includes(letter))) {
            gameMessage.textContent = `Congratulations! You guessed the word: ${wordToGuess}`;
            setTimeout(startGame, 2000); // Restart the game after a delay
        }

        guessedLettersDisplay.textContent = guessedLetters.join(', ');
    }
    letterInput.value = '';
}

// Event listener for the guess button
guessButton.addEventListener('click', handleGuess);

// Start a new game when the page loads
startGame();
