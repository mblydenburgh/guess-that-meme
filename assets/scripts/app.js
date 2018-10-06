// Define variables to use
//
const names = ["doge", "grumpy cat", "dat boi", "scumbag steve", "distracted boyfriend", "aliens", "philosoraptor", "success kid", "dramatic chipmunk", "squinting fry", "thanks obama", "sarcastic willy wonka", "nyan cat", "crying michael jordan", "harambe", "u mad bro", "rick rolling", "all your base are belong to us", "trollface"];
let guessedLetters = []; //holds the key presses so use cannot waste life on same guess
let lives = 10;
let wins = 0;
const guessedLetterSpan = document.getElementById("guessed");
const blankWordP = document.getElementById("blankWordDisplay");
const lifeDisplaySpan = document.getElementById("lifeDisplay");
const winsDisplaySpan = document.getElementById("winsDisplay");
const letterRegex = /[a-z]/;
const keyFilter = ["shift", "alt", "control", "arrowdown", "arrowup", "arrowleft", "arrowright", "meta", "space", "escape", "enter", "tab", "backspace"];

/* words is an object that will be used to hold the randomly selected meme name (secretWord),
and a copy of that word with underscores for all letters (blankWord) */
let words = {};

// The game's functions are defined below
//

/* on every game start:
1)choose new secretWord
2)make blankWord copy
3)refresh game display for guesses and lives

*/
let newGame = function startGame() {

    let wordIndex = Math.floor(Math.random() * names.length); // generates a random number to pick a random name
    //console.log(names[wordIndex]);
    let secretWord = names[wordIndex]; // the randomly selected meme name
    //console.log(`secret word: ${secretWord}`)
    let blankWord = makeBlankWord(secretWord); // a copy of the meme name, with all letters replaced with _
    //console.log(blankWord);
    let words = { //holds the meme name and empty copy to return
        secretWord: names[wordIndex],
        blankWord: blankWord
    }
    blankWordP.textContent = words.blankWord.join('');
    lifeDisplaySpan.textContent = lives;
    //console.log(`inside newGame function: ${words.secretWord}`)
    return words;
}

// Makes a copy of the selected secret wored and replaces letters with _
let makeBlankWord = function makeBlankWord(str) {
    var blankWord = []; //array to push _ into
    for (let i = 0; i < str.length; i++) { // loop through the meme name's length
        if (str.charCodeAt(i) === 32) { // preserve spaces
            blankWord.push(" ");
        } else { //replace letters with _
            blankWord.push("_")
        }
    }
    return blankWord;
}

// Reset lives and initiate a new game
let restartGame = function restartGame() {
    lives = 10;
    guessedLetters = [];
    lifeDisplaySpan.textContent = lives;
    guessedLetterSpan.textContent = guessedLetters;
    words = newGame();
    console.log(`restart game function, new secret word : ${words.secretWord}`)
    return words;
}


// on a correct key press, updates the letters in the blankWord
function updateLetters(words, keyPressed) {
    // pressed key is in secretWord - display the letter and continue.
    // since a word can have more than one instance of a letter, loop through
    // entire word to capture all instances.

    let indexArr = [];
    for (let i = 0; i < words.secretWord.length; i++) {
        if (words.secretWord[i] === keyPressed) {
            indexArr.push(i);
        }
    }
    console.log(`indexes for ${keyPressed} in ${words.secretWord} are ${indexArr}`);

    for (let i = 0; i < indexArr.length; i++) { //Loop through indexArr to replace all instances of correct letter
        words.blankWord[indexArr[i]] = keyPressed;
    }
    let solvedWord = words.blankWord.join(''); //join blankWord array to display correctly and to compare to the secretWord string correctly to check for win condition.

    blankWordP.textContent = solvedWord;
    if (solvedWord === words.secretWord) { // after blankWord updates, check if it was the last missing letter
        setTimeout(alert(`Winner winner chicken dinner!`), 2000);
        wins++;
        winsDisplaySpan.textContent = wins;
        words = restartGame();
        return words
    }
}

// Main logic below

window.onload = function () {
    words = newGame(); //on window load, begin a new game
    //console.log(`on window load, secret word: ${words.secretWord}`);

    //listen to key presses, execute code when a letter is hit
    document.onkeyup = function (event) {

        let keyPressed = event.key.toLowerCase(); // in case caps-lock is on

        // the outter if state validates key presses, only executing game code for letters hit, ignoring all numbers, symbols, and other keys
        if (letterRegex.test(keyPressed) && !keyFilter.includes(keyPressed)) {

            if (guessedLetters.includes(keyPressed)) { // letter has been guessed, skip
                console.log(`Already guessed ${keyPressed}`);
            } else { // letter has not been guessed yet, add to guessed letter array, and check if it is a correct guess or not
                guessedLetters.push(keyPressed);

                // after pushing into guessed letters, check if guess is correct or not
                if (words.secretWord.includes(keyPressed)) { //correct guess
                    updateLetters(words, keyPressed);

                } else { //incorrect guess - take life away
                    console.log(`${keyPressed} is not in the secret word`);
                    lives = lives - 1;
                    if (lives === 0) { //when life is deducted, check if that was the last life
                        alert(`game over man!`);
                        words = restartGame();
                    }
                } // end incorrect guess
            } //end new letter guess
        } //end correct keypress code

        //after game logic runs, update lives and any guessed letters in the DOM
        lifeDisplaySpan.textContent = lives;
        guessedLetterSpan.textContent = guessedLetters;

    }// end keyup event
}// end parent window.onload funcion