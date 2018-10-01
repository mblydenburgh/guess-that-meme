const names = ["doge","grumpy cat","dat boi","scumbag steve","distracted boyfriend","aliens","philosoraptor","success kid","dramatic prarie dog","squinting fry","thanks obama","sarcastic willy wonka","nyan cat","crying miochael jordan","harambe","u mad bro","rick rolling","all your base are belong to us","trollface"];
let guessedLetters = [];
let lives = 10;
const guessedLetterSpan = document.getElementById("guessed");
const blankWordP = document.getElementById("blankWordDisplay");
const letterRegex = /[a-z]/;
const keyFilter = ["shift","alt","control","arrowdown","arrowup","arrowleft","arrowright","meta","space"];

//choose random number to act as an index for the names array
let wordIndex = Math.floor(Math.random()*names.length);
console.log(names[wordIndex]);
let secretWord = names[wordIndex];
let blankWord = []

//loop through the randomly chosen word to make a blank to display on game start
for(let i = 0; i < secretWord.length; i++){
    blankWord.push("_");
}

blankWordP.textContent = blankWord;

//listen to key presses, execute code when a letter is hit
document.onkeyup = function(event){
    let keyPressed = event.key.toLowerCase();

    // if(keyPressed.charCodeAt(0) >= 87 && keyPressed.charCodeAt(0) <= 122){
    //     console.log(`letter hit`);
    // } else{
    //     console.log(`not a letter hit`);
    // }


    // the outter if state validates key presses, only executing game code for letters hit, ignoring all numbers, symbols, and other keys
    if(letterRegex.test(keyPressed) && !keyFilter.includes(keyPressed)){
        console.log(`letter hit`);


        //If letter has not been guessed yet, add to array and check names. If key has been guessed already, nothing will happen
        if(guessedLetters.includes(keyPressed)){
        console.log(`Already guessed ${keyPressed}`)        
        } else { 
            guessedLetters.push(keyPressed);
            console.log(keyPressed);
        
    }
    } else{
        console.log(`non letter hit`);
    }
    
    
    


    guessedLetterSpan.textContent = guessedLetters; //update screen with guessed letters for user to see
} // end keyup event