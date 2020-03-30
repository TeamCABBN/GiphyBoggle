let inputEl = document.querySelector("#boggletext");
let queryBtn = document.querySelector(".queryBtn");
let output = document.querySelector(".output");

queryBtn.addEventListener("click", (event) => {

    let queryLetters = inputEl.value;

    let queryURL = `https://codebox-boggle-v1.p.rapidapi.com/${queryLetters}`;

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "x-rapidapi-host": "codebox-boggle-v1.p.rapidapi.com",
            "x-rapidapi-key": "022db4a757msh43b4c58fa247ec3p1f954ejsn28f1e76c07fb"
        },
        success: (response) => {
            console.log(response);
            output.innerText = "";
            response.forEach(word => {
                output.innerText += word + "\n  ";
            })
        },
        error: (xhr, status, error) => {
            console.log(`status: ${status}, Error: ${error}`);
        }
    });
})
