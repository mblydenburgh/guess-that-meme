// Define variables to use
//
const names = ["doge", "grumpy cat", "dat boi", "scumbag steve", "distracted boyfriend", "aliens", "philosoraptor", "success kid", "dramatic prarie dog", "squinting fry", "thanks obama", "sarcastic willy wonka", "nyan cat", "crying michael jordan", "harambe", "u mad bro", "rick rolling", "all your base are belong to us", "trollface"];
let guessedLetters = [];
let lives = 10;
let wins = 0;
const guessedLetterSpan = document.getElementById("guessed");
const blankWordP = document.getElementById("blankWordDisplay");
const lifeDisplaySpan = document.getElementById("lifeDisplay");
const letterRegex = /[a-z]/;
const keyFilter = ["shift", "alt", "control", "arrowdown", "arrowup", "arrowleft", "arrowright", "meta", "space", "escape", "enter", "tab"];

// The game's functions are defined below
//
let newGame = function gameStart() {

    let wordIndex = Math.floor(Math.random() * names.length);
    //console.log(names[wordIndex]);
    let secretWord = names[wordIndex];
    //console.log(`secret word: ${secretWord}`)
    let blankWord = makeBlankWord(secretWord);
    //console.log(blankWord);
    let words = {
        secretWord: names[wordIndex],
        blankWord: blankWord
    }


    blankWordP.textContent = words.blankWord.join('');
    lifeDisplaySpan.textContent = lives;
    console.log(words)
    return words;
}

let makeBlankWord = function makeBlankWord(str) {
    var blankWord = [];
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) === 32) {
            blankWord.push(" ");
        } else {
            blankWord.push("_")
        }

    }
    return blankWord;
}

function restartGame() {
    lives = 10;
    guessedLetters = [];
    lifeDisplaySpan.textContent = lives;
    guessedLetterSpan.textContent = guessedLetters;
    words = newGame();
    return words;
}

window.onload = function () {
    let words = newGame(); //
    console.log(`secret word: ${words.secretWord}`);



    //listen to key presses, execute code when a letter is hit
    document.onkeyup = function (event) {

        let keyPressed = event.key.toLowerCase(); // in case caps-lock is on

        if (lives > 0) { // check lives on each keypress
            if (words.secretWord !== words.blankWord.join('')) { // check if the blankword equals the chosen word, if they do, player wins
                // the outter if state validates key presses, only executing game code for letters hit, ignoring all numbers, symbols, and other keys
                if (letterRegex.test(keyPressed) && !keyFilter.includes(keyPressed)) {
                    //console.log(`letter hit`);
                    //If letter has not been guessed yet, add to array and check names. If key has been guessed already, nothing will happen
                    if (guessedLetters.includes(keyPressed)) {
                        console.log(`Already guessed ${keyPressed}`);
                    } else {
                        guessedLetters.push(keyPressed);
                        console.log(keyPressed);
                        if (words.secretWord.includes(keyPressed)) {
                            // pressed key in word - display the letter and continue
                            // since a word can have more than one instance of a letter, 
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
                            let solvedWord = words.blankWord.join('');
                            blankWordP.textContent = solvedWord;

                        } else {
                            // pressed key is not in word - take away life
                            console.log(`${keyPressed} is not in the secret word`);
                            lives = lives - 1;
                        }
                    }
                } else {
                    //console.log(`non letter hit`);
                }

                //update lives and any guessed letters
                lifeDisplaySpan.textContent = lives;
                guessedLetterSpan.textContent = guessedLetters;
            } else { // the blank word equals the chosen word - player wins
                console.log(words);
                alert(`Winner winner chicken dinner!`);
                words = restartGame();
            }

        } else { // no lives left
            alert(`game over man!`)
            words = restartGame();
        }
    }// end keyup event

}// end parent window.onload funcion