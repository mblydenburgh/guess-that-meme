// Define variables to use
const names = ["doge", "grumpy cat", "dat boi", "scumbag steve", "distracted boyfriend", "aliens", "philosoraptor", "success kid", "dramatic prarie dog", "squinting fry", "thanks obama", "sarcastic willy wonka", "nyan cat", "crying michael jordan", "harambe", "u mad bro", "rick rolling", "all your base are belong to us", "trollface"];
let guessedLetters = [];
let lives = 10;
let wins = 0;
const guessedLetterSpan = document.getElementById("guessed");
const blankWordP = document.getElementById("blankWordDisplay");
const lifeDisplaySpan = document.getElementById("lifeDisplay");
const letterRegex = /[a-z]/;
const keyFilter = ["shift", "alt", "control", "arrowdown", "arrowup", "arrowleft", "arrowright", "meta", "space","escape"];

//choose random number to act as an index for the names array
let wordIndex = Math.floor(Math.random() * names.length);
console.log(names[wordIndex]);
let secretWord = names[wordIndex];
let blankWord = []

//loop through the randomly chosen word to make a blank to display on game start
for (let i = 0; i < secretWord.length; i++) {
    blankWord.push("_");
}

//console.log(blankWord.join(''));
blankWordP.textContent = blankWord.join('');
lifeDisplaySpan.textContent = lives;

//listen to key presses, execute code when a letter is hit
document.onkeyup = function (event) {
    let keyPressed = event.key.toLowerCase();

    /* Used charCodeAt to filter key presses originally-
     if(keyPressed.charCodeAt(0) >= 87 && keyPressed.charCodeAt(0) <= 122){
         console.log(`letter hit`);
     } else{
         console.log(`not a letter hit`);
     }*/


    /*Notes about things to implement:
        replace all instances of correct guessed letter, not just first
        when blankWord === secretWord, win
        loop while lives > 0
    */

    // the outter if state validates key presses, only executing game code for letters hit, ignoring all numbers, symbols, and other keys
    if (letterRegex.test(keyPressed) && !keyFilter.includes(keyPressed)) {
        //console.log(`letter hit`);
        //If letter has not been guessed yet, add to array and check names. If key has been guessed already, nothing will happen
        if (guessedLetters.includes(keyPressed)) {
            console.log(`Already guessed ${keyPressed}`);
        } else {
            guessedLetters.push(keyPressed);
            console.log(keyPressed);
            if (secretWord.includes(keyPressed)) {
                // pressed key in word - display the letter and continue
                // console.log(`${keyPressed} is in the secret word`);
                // let index = secretWord.indexOf(keyPressed);
                // console.log(`${keyPressed} is in the ${index} index`);
                // blankWord[index] = keyPressed;
                // blankWordP.textContent = blankWord.join('');

                // since a word can have more than one instance of a letter, 
                let indexArr = [];
                for(let i = 0; i < secretWord.length; i++){
                    if(secretWord[i] === keyPressed){
                        indexArr.push(i);
                    }
                }
                console.log(`indexes for ${keyPressed} in ${secretWord} are ${indexArr}`);

                for(let i = 0; i < indexArr.length; i++){ //Loop through indexArr to replace all instances of correct letter
                    blankWord[indexArr[i]] = keyPressed;
                }
                blankWordP.textContent = blankWord.join('');

            } else {
                // pressed key is not in word - take away life
                console.log(`${keyPressed} is not in the secret word`);
                lives = lives - 1;
            }
        }
    } else {
        //console.log(`non letter hit`);
    }




    lifeDisplaySpan.textContent = lives;
    guessedLetterSpan.textContent = guessedLetters; //update screen with guessed letters for user to see
} // end keyup event