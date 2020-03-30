let inputEl = document.querySelector("#boggletext");
let queryBtn = document.querySelector(".queryBtn");
let output = document.querySelector(".output");

//global answers array
let answerWords = [];

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
            output.innerText = "";

            //For each word in response array convert to lowercase then push to global answer words array
            response.forEach(word => {
                answerWords.push(word.toLowerCase());

                //Testing
                output.innerText += word.toLowerCase() + "\n";
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

//For testing purposes
queryBtn.addEventListener("click", (event) => {

    let queryLetters = inputEl.value;
    queryBoggleAPI(queryLetters);

});

document.querySelector(".startTimer").addEventListener("click", () => {
    timer.start();
});

document.querySelector(".stopTimer").addEventListener("click", () => {
    timer.stop();
});

document.querySelector(".resetTimer").addEventListener("click", () => {
    timer.reset();
});