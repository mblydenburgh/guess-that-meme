const names = ["doge","grumpy cat","dat boi","scumbag steve","distracted boyfriend","aliens","philosoraptor","success kid","dramatic prarie dog","squinting fry","thanks obama","sarcastic willy wonka","nyan cat","crying miochael jordan","harambe","u mad bro","rick rolling","all your base are belong to us","trollface"];

let guessedLetters = [];

document.onkeyup = function(event){
    let keyPressed = event.key;
    //alert(keyPressed);

    //If letter has not been guessed yet, add to array and check names. If key has been guessed already, nothing will happen
    if(guessedLetters.includes(keyPressed)){
        console.log(`Already guessed ${keyPressed}`)        
    }else {
        guessedLetters.push(keyPressed);
        console.log(keyPressed);
        
    }

}