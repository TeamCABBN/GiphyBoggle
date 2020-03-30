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
                output.innerText += word.toLowerCase()+ "\n";
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

//For testing purposes
queryBtn.addEventListener("click", (event) => {

    let queryLetters = inputEl.value;
    queryBoggleAPI(queryLetters);

})
