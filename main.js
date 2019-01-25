//I have completed most of the basic logic of the game, however a quite a few tweaks need to be made.
//I have a bug I was unable to fix, where if the following word had more letters than the previous word, 
//there are letters from the previous word that are not cleared (ex. chicken --> dolly results in __ __ __ __ __ en)
//I did clear the #word, so that's something I need to work on. 
//Other things to do: 
//JS: "start game" button, win and loss counter, creating an actual hangman instead of using "lives", obviously hiding the word to guess (kept it in for testing)
//CSS: maintain underline of letter when guessed
//My goal eventually was to make a "hipster hangman" with words like "kombucha" and "suspenders", and a coffee shop background



var word = ["chicken", "dolly", "piggy", "yellow"];
var userGuess = 0;
var strike = 0;
var targetWord = "";
var guessArray = [];
var correctLetters = 0;
var wordArray = [];
var answerArray = [];
var s;
var replace;



//random word function

function randWord() {
    let randWord = word[Math.floor(Math.random() * word.length)]; //word in play //choosing a random word from array word
    return randWord;
}

//This loads the blank spaces

function getBlanks(targetWord) {
    for (let j = 0; j < targetWord.length; j++) {
        answerArray[j] = " ___ ";
        s = answerArray.join(' ');

    }
    $("#word").text(s);

}

function wait(text) {
    setTimeout(function () {
        alert(text)
        loadGame();
    }, 100);
}

function evaluateWin() {
    if (correctLetters === targetWord.length) {
        wait("You Won")
        console.log(`${answerArray.toString()}`)
        console.log("you win!")

    } else if (strike > 4) {
        $("#word").empty();

        wait("You lost")

    }

}

//Load the game and also re-set
function loadGame() {
    $("#word").empty();
    //Set the value of target word equal to the value that comes out of the randWord function
    targetWord = randWord();
    //Get the blanks
    getBlanks(targetWord);
    $("#theWord").text(targetWord);
    //clear letters from previous word
    $("#letter").empty();
    $("#guesses").empty();
    //loading strike amount and text
    strike = 0;
    $("#strikes").text("You have used " + strike + " of 5 lives");
    guessArray.length = 0;
    correctLetters = 0;

}




$(document).ready(function () {
    loadGame();
    console.log(`Here is the ${targetWord}`);

    document.onkeyup = function (element) {

        //storing users key choice in userGuess
        console.log(element.key);
        var numKey = element.keyCode;
        var userGuess = element.key;
        $("#letter").text(userGuess);
        //If user guesses a character outside of lowercase a-z then alert them to guess a
        //valid character.
        if (65 <= numKey && numKey <= 122) {
            console.log(`Key works ${element.key} with the number ${numKey}`);
        } else {
            alert(`${element.key} is outside with the key of ${numKey}`);
            return;

        }



        //Logic to push the letter to the array. Prevents double guessing letters
        if (guessArray.includes(userGuess)) {
            console.log("you already guessed this letter");
        } else if (!targetWord.includes(userGuess)) {
            console.log("strike");
            strike++;
            console.log(strike);
            guessArray.push(userGuess);
            $("#guesses").text(guessArray);
            $("#strikes").text("You have used " + strike + " of 5 lives");
            evaluateWin();
        } else {
            guessArray.push(userGuess);
            $("#guesses").text(guessArray);
            for (let j = 0; j < targetWord.length; j++) {
                if (targetWord[j] === userGuess) {
                    answerArray[j] = userGuess;
                    s = answerArray.join(' ');
                    $("#word").text(s);
                    // wait();
                    // console.log("correctLetters");
                    correctLetters++;
                    evaluateWin()
                    // console.log(correctLetters);
                }
            }
        }
    }
});