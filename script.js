// let inputEl = document.querySelector("#boggletext");
// let queryBtn = document.querySelector(".queryBtn");
// let output = document.querySelector(".output");

//global answers array
let answerWords = [];

//global variable for random letters generated
let letters = "";

//Function to query boggle api and then return answer to global answerwords array
const queryBoggleAPI = (letters) => {

    //Set query URL
    let queryURL = `https://codebox-boggle-v1.p.rapidapi.com/${letters}`;

    //Make api call
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            //Auth headers
            "x-rapidapi-host": "codebox-boggle-v1.p.rapidapi.com",
            "x-rapidapi-key": "022db4a757msh43b4c58fa247ec3p1f954ejsn28f1e76c07fb"
        },
        //Function to run on successful response
        success: (response) => {

            //Testing
            console.log(response);
            //output.innerText = "";

            //For each word in response array convert to lowercase then push to global answer words array
            response.forEach(word => {
                answerWords.push(word.toLowerCase());

                //Testing
                //output.innerText += word.toLowerCase() + "\n";
            });

            //Testing
            console.log(answerWords);

        },
        //Function to run on error
        error: (xhr, status, error) => {
            console.log(`status: ${status}, Error: ${error}`);
        }
    });
}
//Have two here to choose between.
//Giphy API for just a search
//what will trigger this? i've used button below
$("button").on("click", function() {
    //note that the variable (and the output from the boggle is called "word")
    var word = $(this).attr("word");
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${word}&api_key=kqQyG8Y7gjqsyjEcFmZd3qBhbj2KBn5i&limit="1"`;

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.prepend(personImage);
            //note that the area that gifs appear (card?)
            $("#gifs-appear-here").prepend(gifDiv);
            }
        });
});



//Timer object
/*
To start timer call, 
timer.start()

To stop timer call, 
timer.stop()

to reset timer call,
timer.reset()

*/
const timer = {
    //Default start seconds
    startSecs: 180,
    //Tracks the current
    currSecs: 180,
    increment: 1000,
    timerRunning: false,

    //Start timer Fn
    start: function () {
        //set timer running to true
        this.timerRunning = true;

        //interval function to run until finish
        var intervalFn = setInterval(() => {

            //if the timer is running continue
            if (this.timerRunning) {

                //decrement
                this.currSecs -= 1;

                //Display on page
                this.display();

                //if reached 0 stop timer and call endgame fn
                if (this.currSecs <= 0) {
                    this.timerRunning = false;

                    //call end game events after small delay otherwise display isn't updated
                    setTimeout(endGame, 4);
                }
            } else {
                //if timer is not running clears interval
                clearInterval(intervalFn);
            }
        }, this.increment);
    },

    //stop timer function
    stop: function () {
        this.timerRunning = false;
    },

    //reset timer function
    reset: function (seconds) {
        this.startSecs = seconds;
        this.currSecs = this.startSecs;
        this.display();
    },

    //Fn to display secs to page
    display: function () {
        console.log(this.currSecs);
    }
}
//Timer object
/*
To start timer call, 
timer.start()

To stop timer call, 
timer.stop()

to reset timer call,
timer.reset()

*/
// creating a function for start button and to reveal boggle containers
start.addEventListener("click",function(){
    InputEl.classList.remove("hidden");
    //Starting page: instruction page to be hidden
    startpage.classList.add("hidden");
    timer.start();
    
});

//For testing purposes

// Start with an array with the 16 above strings in it
function randomLetterGenerator() {
    var boggleCombinations = ["AAEEGN", "ELRTTY", "AOOTTW", "ABBJOO", "EHRTVW", "CIMOTU", "DISTTY", "EIOSST", "DELRVY", "ACHOPS", "HIMNQU", "EEINSU", "EEGHNW", "AFFKPS", "HLNNRZ", "DEILRX"];
    
    //Choose a random string from the array
    var randomLetters = "";
    
    //Generate 0 to 16. runs for loop 16 times. 
    for (let i = 0; i < 16; i++) {
        
        //picks string from 1- 16 (different dice)
        var randomIndex = Math.floor(Math.random() * boggleCombinations.length);
        
        //pulls out string. set to current string.
        var currentString = boggleCombinations[randomIndex];
        
        // random letter from string between 0-5. Saved to letter variable 
        var letter = currentString[Math.floor(Math.random() * currentString.length)];
        //console.log(letter);
        
        //append letter onto random letter string. 
        randomLetters += letter;
        
        //remove from array
        boggleCombinations.splice(randomIndex, 1)
        //console.log(boggleCombinations)
    };
    console.log(randomLetters);
    //return the string.
    return randomLetters;
}

function BoggleBlocks() {
    console.log("Here");
    for (let i = 0; i < 16; i++) {
        let boggleCube = document.getElementById(`boggleBox${i}`);
        console.log(boggleCube);
    }
}

const startGame = () => {
    letters = randomLetterGenerator();
    queryBoggleAPI(letters);
}

// queryBtn.addEventListener("click", (event) => {

//     startGame();

// });
//End the Game function
function endGame() {
    clearInterval(TIMER);
    //do we need to hide/ unhide something here
    //
    //
    //
    //
    var playerName = prompt("Type in your first name!")
    var scoreboard = {
        name: playerName,
        score: score
    }
    // 
    //
    //
    //
    //
    //get item current "score" and historical scores
    var loadScores = localStorage.getItem("score")
    //check for storage
    if (loadScores) {
        loadScores = JSON.parse(loadScores);

    } else {
        loadScores = []
    }
    //push adds on to the existing array
    loadScores.push(scoreboard);
    console.log(loadScores);
    //change to string
    var loadScoresstring = JSON.stringify(loadScores);
    console.log(loadScoresstring);
    //send array back to local storage
    localStorage.setItem("score", loadScoresstring);
    //append list

    loadScores.forEach(function (entry) {
        //to construct html input for list 
        var listhtml = "<li>" + entry.name + "  -  " + entry.score + "</li>";
        //+ = appends to the end 
        list.innerHTML += listhtml;
    });
}

BoggleBlocks();


//Input checker
$("#input-text").on("keyup",function () {
    let enteredWord = input.value.toLowerCase();
    if (boggleArray.includes(enteredWord)) {
        console.log(enteredWord);
        input.value = "";
        //Increase score
        //Create gif card createCard(input)
        input.value = "";
        let wordScore = 0;
        if (wordlength < 3 ) {         
            wordScore = 0;
        }
        if (wordlength < 4 ) {  // 3
            wordScore = 1;
        }
        if (wordlength < 5 ) {  // 4
            wordScore = 2;
        }
        if (wordlength < 6 ) {  // 5
            wordScore = 3;
        }
        if (wordlength < 7 ) {  // 6
            wordScore = 4;
        }
        if (wordlength < 8 ) {  // 7
            wordScore = 5;
        }
        else {
            wordScore = 6;
        }
        score += wordScore;
    }
});
// document.querySelector(".resetTimer").addEventListener("click", () => {
//     timer.reset();
// });


var boggleLetters = randomLetterGenerator();
// var boggleLetters = "ADRGYUIQHNJKIUYT";

 // dewwefewfefew

console.log(boggleLetters);

function BoggleBlocks() {

for (let i= 0; i < 16; i++) {
let boggleCube= document.getElementById(`boggleBox${i}`);
console.log(boggleCube);

let letter = boggleLetters[i];

    if (letter == "Q") { 
        letter = "QU";
    }

console.log(letter);
boggleCube.innerText = letter;
}
}

BoggleBlocks ();

//   randomLetterGenerator.push("");
//   document.getElementById(".boogleCube").innerHTML = localStprage.randomLetterGenerator;
//   return randomLetterGenerator;

// console.log(BoggleBlocks);
