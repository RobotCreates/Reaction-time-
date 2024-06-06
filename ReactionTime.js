const clickArea = document.querySelector(".click-area");
const displayText = document.querySelector(".display-text");
const scoreElements = document.querySelectorAll(".score");

const scoreHistory = [];

const MINIMUM_MS_TILL_CHANGE = 1000;
const MAXIMUM_MS_TILL_CHANGE = 5000;

let msSinceEpochOnTimeout = 0;
let waitingForClick = false;
let gameCounter = 0; // Counter to keep track of the number of times the game has been played

function play() {
    const msTillChange = Math.floor(Math.random() * (MAXIMUM_MS_TILL_CHANGE-MINIMUM_MS_TILL_CHANGE)) + MINIMUM_MS_TILL_CHANGE;

    console.log(msTillChange);

    clickArea.style.backgroundColor = null;

    displayText.textContent = "";

    setTimeout(() => {

        msSinceEpochOnTimeout = Date.now();
        clickArea.style.backgroundColor = "#009578";
        waitingForClick = true;
    }, msTillChange);
}

function addscore(score) {
    scoreHistory.unshift(score);

    for (let i = 0; i < Math.min(scoreHistory.length, 5); i++) {
        const score = scoreHistory[i];

        scoreElements[i].textContent = `${score} ms` ;
    }
}

clickArea.addEventListener("click", () => {
    if (waitingForClick) {
        const score = Date.now() - msSinceEpochOnTimeout;

        waitingForClick = false;
        displayText.textContent = `Your time was ${score} ms! Click to play again.`;

        addscore(score);
        gameCounter++; // Increment gameCounter

        if (gameCounter === 3) { // After playing 3 times
            let totalScore = 0;
            scoreHistory.forEach(score => totalScore += score); // Calculate total score
            const averageScore = (totalScore / 3).toFixed(3); // Calculate average score

            if (averageScore > 300) {
                displayText.innerHTML = `Your average reaction time is too high: ${averageScore}. 
                <a href="AimTrainer.html">Click here to improve your reaction time.</a>`;
            } else {
                displayText.textContent = `You have a good reaction time: ${averageScore}.`;
            }

            clickArea.removeEventListener("click", handleClick); // Remove click event listener to stop further repetitions
        }

    } else {
       play();
    }
});
