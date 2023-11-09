const buttons = document.querySelectorAll(".dice-button");
const contentDiv = document.getElementById("content");
const changeDiceButton = document.getElementById("dice-change");
const mainContainerDisplay = document.getElementById("main-container");
const selectedDiceDisplay = document.getElementById("selected-dice");
const rollResult = document.getElementById("roll-result");
const rollButton = document.getElementById("roll-the-dice");
const numOfDiceInput = document.getElementById("num-of-dice");

let selectedDiceType = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        contentDiv.style.display = "none";
        changeDiceButton.classList.remove("hidden");
        mainContainerDisplay.classList.remove("hidden");
    });
});

changeDiceButton.addEventListener("click", () => {
    contentDiv.style.display = "flex";
    changeDiceButton.classList.add("hidden");
    mainContainerDisplay.classList.add("hidden");
    rollButton.classList.remove("four-sided");
    rollButton.classList.remove("six-sided");
    rollButton.classList.remove("eight-sided");
    rollButton.classList.remove("ten-sided");
    rollButton.classList.remove("twelve-sided");
    rollButton.classList.remove("twenty-sided");
    numOfDiceInput.value = 1;
});

const rollTheDice = document.getElementById("roll-the-dice");
rollTheDice.addEventListener("click", rollDiceClick);
rollButton.addEventListener("click", rollDiceClick);

function rollDiceClick() {

    rollCount++
    let numOfDice = parseInt(numOfDiceInput.value);

    if (isNaN(numOfDice) || numOfDice <= 0 || numOfDice > 99) {
        alert("Please enter a valid number of dice between 1 and 99.");
        return;
    }

    let individualResults = [];
    let totalRollResult = 0;

    for (let i = 0; i < numOfDice; i++) {

        let randomAmount = 0;

        switch (selectedDiceType) {
            case "d4":
                randomAmount = Math.floor(Math.random() * 4) + 1;
                break;
            case "d6":
                randomAmount = Math.floor(Math.random() * 6) + 1;
                break;
            case "d8":
                randomAmount = Math.floor(Math.random() * 8) + 1;
                break;
            case "d10":
                randomAmount = Math.floor(Math.random() * 10) + 1;
                break;
            case "d12":
                randomAmount = Math.floor(Math.random() * 12) + 1;
                break;
            case "d20":
                randomAmount = Math.floor(Math.random() * 20) + 1;
                break;
        }
        individualResults.push(randomAmount);
        totalRollResult += randomAmount;
    }

    let averageResults = Math.round(totalRollResult / individualResults.length);

    if (individualResults.length === 1) {
        rollResult.innerHTML = `<span class="result-text">Result</span> 
        <div class="line">
        </div><p class="individual-rolls">Your Roll: </p>
        ${individualResults.join(", ")}
        <div class="lineBottom"></div>`;
    } else {
        rollResult.innerHTML = `<span class="result-text">Result</span> 
        <div class="line">
        </div><p class="individual-rolls">Individual Rolls: </p>
        ${individualResults.join(", ")}<br><br>
        <p class="total-numbers">Total: </p>
        ${totalRollResult}<br><br>
        <p class="average-numbers">Average: </p>
        ${averageResults}
        <div class="lineBottom"></div>`;
    }

    resultsArray.push({
        individualResults: individualResults,
        total: totalRollResult,
        average: averageResults,
        diceType: selectedDiceType,
        numOfDice: numOfDice,
        rollNumber: rollCount
    });

    updateLog();
}

let rollCount = 0;

function formatResults(result) {

    if (result.numOfDice === 1) {
        return `<div class="log-entry">
            <div class="log-roll-number">Roll #${result.rollNumber}</div>
            <div><span class="log-headers">Dice:</span> ${result.diceType} x 1</div>
            <div><span class="log-headers">Result:</span> ${result.individualResults.join(", ")}</div>
        </div>
        <div class="lineBottom"></div>
        <br>`
    } else {
        return `<div class="log-entry">
            <div class="log-roll-number">Roll #${result.rollNumber}</div>
            <div><span class="log-headers">Dice:</span> ${result.diceType} x ${result.numOfDice}</div>
            <div><span class="log-headers">Rolls:</span> ${result.individualResults.join(", ")}</div>
            <div><span class="log-headers">Total:</span> ${result.total}</div>
            <div><span class="log-headers">Average:</span> ${result.average}</div>
        </div>
        <div class="lineBottom"></div>
        <br>`
    }
}

let resultsArray = [];

const expandLogButton = document.getElementById("expandLogButton");
const logContainer = document.querySelector(".log-container");


expandLogButton.addEventListener("click", () => {
    if (resultsArray.length > 0) {
        isLogExpanded = !isLogExpanded;
        updateLog();
        expandLogButton.innerText = isLogExpanded ? "Close Results Log" : "Expand Results Log";
        logContainer.classList.remove("hidden");
    }
});

let isLogExpanded = false;

function updateLog() {

    const logContainer = document.querySelector(".log-container");
    logContainer.innerHTML = "";

    const button = createButton()
    logContainer.appendChild(button);

    resultsArray.slice().reverse().forEach(result => {
        const entry = document.createElement("div");
        entry.className = "log-entry";
        entry.innerHTML = formatResults(result);
        entry.style.display = isLogExpanded ? "block" : "none";
        logContainer.appendChild(entry);
    });

    logContainer.style.display = isLogExpanded ? "block" : "none";

}

function createButton() {
    const button = document.createElement("img");
    button.setAttribute("src", "https://img.icons8.com/emoji/96/Save.png");
    button.setAttribute("alt", "Save Log Results");
    button.setAttribute("title", "Download Your Roll Results");
    button.classList.add("save-button");
    button.addEventListener("click", function () {
        downloadLog();
    });

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("save-button-container");
    buttonDiv.appendChild(button);

    return buttonDiv;
}


const d4 = document.getElementById("dice-button1");
const d6 = document.getElementById("dice-button2");
const d8 = document.getElementById("dice-button3");
const d10 = document.getElementById("dice-button4");
const d12 = document.getElementById("dice-button5");
const d20 = document.getElementById("dice-button6");

d4.addEventListener("click", diceChoiceClick);
d6.addEventListener("click", diceChoiceClick);
d8.addEventListener("click", diceChoiceClick);
d10.addEventListener("click", diceChoiceClick);
d12.addEventListener("click", diceChoiceClick);
d20.addEventListener("click", diceChoiceClick);

function diceChoiceClick(event) {

    const clickedButton = event.target;

    if (clickedButton === d4) {
        selectedDiceType = "d4";
        selectedDiceDisplay.innerHTML = "d4";
        rollResult.innerHTML = "";
        rollButton.classList.add("four-sided");
    } else if (clickedButton === d6) {
        selectedDiceType = "d6";
        selectedDiceDisplay.innerHTML = "d6";
        rollResult.innerHTML = "";
        rollButton.classList.add("six-sided");
    } else if (clickedButton === d8) {
        selectedDiceType = "d8";
        selectedDiceDisplay.innerHTML = "d8";
        rollResult.innerHTML = "";
        rollButton.classList.add("eight-sided");
    } else if (clickedButton === d10) {
        selectedDiceType = "d10";
        selectedDiceDisplay.innerHTML = "d10";
        rollResult.innerHTML = "";
        rollButton.classList.add("ten-sided");
    } else if (clickedButton === d12) {
        selectedDiceType = "d12";
        selectedDiceDisplay.innerHTML = "d12";
        rollResult.innerHTML = "";
        rollButton.classList.add("twelve-sided");
    } else if (clickedButton === d20) {
        selectedDiceType = "d20";
        selectedDiceDisplay.innerHTML = "d20";
        rollResult.innerHTML = "";
        rollButton.classList.add("twenty-sided");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const cube = document.querySelector('.cube');

    let cubeAnimation = cube.animate([
        { transform: 'rotateX(0deg) rotateY(0deg)' },
        { transform: 'rotateX(-360deg) rotateY(-360deg)' }
    ], {
        duration: 8000,
        iterations: Infinity
    });

    cubeAnimation.play();

    cubeAnimation.addEventListener('finish', function () {
        if (cubeAnimation.playbackRate < 0) {
            cubeAnimation.currentTime = cubeAnimation.effect.getTiming().duration;
        }
    });

    cube.addEventListener('click', function () {
        cubeAnimation.playbackRate *= -1;
        if (cubeAnimation.playState == 'paused') {
            cubeAnimation.play();
        }
    });

});


// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js')
//         .then(function (registration) {
//             console.log('Service Worker registered with scope:', registration.scope);
//         })
//         .catch(function (error) {
//             console.log('Service Worker registration failed:', error);
//         });
// }


function downloadLog() {
    const logString = resultsArray.map(result => {
        if (result.individualResults.length === 1) {
            return `Roll #${result.rollNumber}, Dice: ${result.diceType}, Roll: ${result.individualResults.join(", ")}`
        } else {
            return `Roll #${result.rollNumber}, Dice: ${result.diceType} x ${result.numOfDice}, Rolls: ${result.individualResults.join(", ")}, Total: ${result.total}, Average: ${result.average}`
        }
    }).join('\n\n');

    const blob = new Blob([logString], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = 'Dice Roll Log.txt';
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}