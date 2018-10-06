// Define variables to use
//
const memes = [
    { name: "doge", url: "assets/images/doge.jpg" },
    { name: "grumpy cat", url: "assets/images/grumpycat.jpg" },
    { name: "dat boi", url: "assets/images/datboi.png" },
    { name: "scumbag steve", url: "assets/images/steve.png" },
    { name: "distracted boyfriend", url: "assets/images/distracted.jpg" },
    { name: "aliens", url: "assets/images/aliens.jpg" },
    { name: "philosoraptor", url: "assets/images/philosoraptor.jpg" },
    { name: "success kid", url: "assets/images/success.jpg" },
    { name: "dramatic chipmunk", url: "assets/images/dchipmunk.gif" },
    { name: "squinting fry", url: "assets/images/fry.png" },
    { name: "thanks obama", url: "assets/images/obama.jpg" },
    { name: "sarcastic willy wonka", url: "assets/images/willywonka.jpg" },
    { name: "nyan cat", url: "assets/images/nyan.gif" },
    { name: "crying michael jordan", url: "assets/images/jordan.jpg" },
    { name: "harambe", url: "assets/images/harambe.jpg" },
    { name: "u mad bro", url: "assets/images/youmad.jpg" },
    { name: "rick rolling", url: "assets/images/rick.jpg" },
    { name: "all your base are belong to us", url: "assets/images/allyourbase.jpg" },
    { name: "trollface", url: "assets/images/troll.jpg" }
];

let guessedLetters = []; //holds the key presses so use cannot waste life on same guess
let lives = 10;
let wins = 0;
const guessedLetterSpan = document.getElementById("guessed");
const blankWordP = document.getElementById("blankWordDisplay");
const lifeDisplaySpan = document.getElementById("lifeDisplay");
const winsDisplaySpan = document.getElementById("winsDisplay");
const imgDiv = document.getElementById("imgDiv");
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

    let wordIndex = Math.floor(Math.random() * memes.length); // generates a random number to pick a random name
    //console.log(names[wordIndex]);
    let secretWord = memes[wordIndex].name; // the randomly selected meme name
    //console.log(`secret word: ${secretWord}`)
    let blankWord = makeBlankWord(secretWord); // a copy of the meme name, with all letters replaced with _
    //console.log(blankWord);
    let words = { //holds the meme name and empty copy to return
        secretWord: secretWord,
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
        // window.setTimeout(window.alert, 500, `Winner winner chicken dinner!`);
        makeMeme();
        wins++;
        winsDisplaySpan.textContent = wins;

        words = window.setTimeout(restartGame, 3500);
        window.setTimeout(destroyMeme, 3500);
        return words
    }
}

function makeMeme() {
    let img = document.createElement("img");
    let path = memes.find(function (obj) {
        if (obj.name === words.secretWord) {
            console.log(`obj url: ${obj.url}`)
            return obj.url;
        }
    })

    img.setAttribute("src", path.url);
    imgDiv.appendChild(img);
}

function destroyMeme() {
    imgDiv.innerHTML = "";
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