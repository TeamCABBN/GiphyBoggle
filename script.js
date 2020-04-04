/* 
########################################
Global variable declarations here
########################################
*/

//global answers array
let answerWords = [];
const correctWords = [];  //generates new array with correctly guessed words

//global variable for random letters generated
let letters = "";

//Init score
let score = 0;

//Page elements
const inputEl = $("#search-bar");
const scoreEl = document.querySelector(".score-display");
const timeEl = document.querySelector(".time-display");
const gifBoxContainer = document.querySelector(".gifCardStorageBox");
const startBtn = document.querySelector(".startBtn");
const preGameEl = document.querySelector(".preGame");
const duringGameEl = document.querySelector(".during-game");
const playAgainBtn = document.querySelector(".play-again-btn");

/* 
########################################
Function declarations start here
########################################
*/


//Function to query boggle api and then return answer to global answerwords array
//By Ben
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

//Function to query Gify API
//By Nima
//Have two here to choose between.
//Giphy API for just a search
//what will trigger this? i've used button below


//Timer object
//By Ben F
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
    reset: function (seconds = this.startSecs) {
        this.startSecs = seconds;
        this.currSecs = this.startSecs;
        this.display();
    },

    //Fn to display secs to page
    display: function () {
        // console.log(this.currSecs);
        let mins = Math.floor(this.currSecs/60);
        let secs = this.currSecs % 60;
        secs = secs<10? "0" + secs: secs;
        formattedString = mins + ":" + secs;
        
        // timeEl.innerText = this.currSecs;
        timeEl.innerText = formattedString;
    }
}


// creating a function for start button and to reveal boggle containers
//By Nima
const startGame = (event) => {
    preGameEl.classList.add("hidden");
    duringGameEl.classList.remove("hidden");
    //Starting page: instruction page to be hidden
    // startpage.classList.add("hidden");
    letters = randomLetterGenerator();
    score = 0;
    timer.reset();
    queryBoggleAPI(letters);
    BoggleBlocks(letters);
    timer.start();
};

//Generates letters used in boggle from availble letters
//By Claire
const randomLetterGenerator = () => {
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
    // console.log(randomLetters);
    //return the string.
    return randomLetters;
}

//Function that fills page elements with letters passed into it
//By Claire
const BoggleBlocks = (letters) => {

    for (let i = 0; i < 16; i++) {
        let boggleCube = document.getElementById(`boggleBox${i}`);
        // console.log(boggleCube);

        let letter = letters[i];

        if (letter == "Q") {
            letter = "QU";
        }
        // console.log(letter);
        boggleCube.innerText = letter;
    }
}

//End the Game function
//By Nima
const endGame = () => {
    timer.stop();
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

//array depricator
//By Ben C
//creates new array with correctly guessed words removed - also creates a new array of corect words
function remove(enteredWord) {
    let index = answerWords.indexOf(enteredWord);
    console.log(index);
    if (index !== -1) {
        answerWords.splice(index, 1);
        correctWords.push(enteredWord);
    }
}

//Input checker
//By Ben C
const validateInput = (event) => {  // Ben F why have you used event here? Just wondering?
    console.log("Test");
    let enteredWord = inputEl.val().toLowerCase();
    
    console.log("before", answerWords.length);
    
    if (answerWords.includes(enteredWord)) {
        remove(enteredWord);
        
        console.log("after", answerWords.length);
        console.log(enteredWord);
        inputEl.val("");
        createCard(enteredWord);
        
        //Increase score
        let wordScore = 0;
        let wordlength = enteredWord.length;
        
        if (wordlength < 3) {
            wordScore = 0;
        }else if (wordlength < 4) {  // 3
            wordScore = 1;
        }else if (wordlength < 5) {  // 4
            wordScore = 2;
        }else if (wordlength < 6) {  // 5
            wordScore = 3;
        }else if (wordlength < 7) {  // 6
            wordScore = 4;
        } else if (wordlength < 8) {  // 7
            wordScore = 5;
        }
        else {
            wordScore = 6;
        }
        score += wordScore;
        scoreEl.innerText = score;
    }
}
//create card gipphy 
const createCard = (word) => {
<<<<<<< HEAD

        //note that the variable (and the output from the boggle is called "word")
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${word}&limit=1&api_key=kqQyG8Y7gjqsyjEcFmZd3qBhbj2KBn5i`;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
    
                let gifURL = response.data[0].images.original.url;

                let cardHTML = `
                <div class="column">
                <div class="ui fluid card spacer">
                    <div class="image">
                        <img
                            src="${gifURL}">
                    </div>
                    <div class="content">
                        <p class="header">${word.toUpperCase()}</p>
                    </div>
                </div>
            </div>
                `

                let currentHTML = gifBoxContainer.innerHTML;
                let newHtml = cardHTML + currentHTML;

                gifBoxContainer.innerHTML = newHtml;

                // // set src attribute to images and append to html 
                // var wordImage = $("<img>");
                // wordImage.attr("img", gifURL);
                // $(searchedWord).append(word);
                // $(searchedWord).append(gifURL);
                // console.log("Create card for word "+ word);
                // console.log("create gif image" + gifURL);
                // $("#gifs-appear-here").prepend(gifURL.word);
            });
            console.log(word);
        }

        // generating new cards. 
        // for (let i = 0; i > createCard.length; i ++);
        // searchedWord.innerText = createCard,
        //  gifURL
        


                    //Old code,
                // for (var i = 0; i < results.length; i++) {
                //     var gifDiv = $("<div>");
                //     var personImage = $("<img>");
                //     personImage.attr("src", results[i].images.fixed_height.url);
                //     gifDiv.prepend(personImage);
                //     //note that the area that gifs appear (card?)
                //     // $("#gifs-appear-here").prepend(gifDiv);
                // }
      



// url will be returned from api plus word it represents.
// filling in the cards with word and url of giff. Add fucntion that adds fucntion to the page. 

//when user clicks submit (giphy click event)
// // $(".searchedWord").on("click", function () {
// console.log(searchedWord);
// // // word property value being stored

// //query URL of word 
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//     word + "&api_key=dc6zaTOxFJmzC&limit=10";

// // Ajax request with queryURL 
// $.ajax({
//     url: queryURL,
//     method: "GET"
// })

// .then(function(response) {
//     console.log(queryURL);
//     console.log(response);

//store requested data 



// })
=======
    console.log("Create card for word "+ word);
    gifURL = queryGiphyAPI(word);




}
>>>>>>> 536d15c7bd93787beaef6c2ac28af74ddaa62dae

/* 
########################################
Code to run on page load
########################################
*/



/* 
########################################
Event Listeners here
########################################
*/
inputEl.on("keyup", validateInput);

<<<<<<< HEAD

=======
startBtn.addEventListener("click", startGame);
>>>>>>> 536d15c7bd93787beaef6c2ac28af74ddaa62dae
