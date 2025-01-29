const chosenMove = document.querySelectorAll(".moveSelector");
const textBlock = document.querySelector(".text-block")

chosenMove.forEach((button) => {
    const textSelector = document.createElement("div");

        button.addEventListener("mouseover", (event) => {
            const blinkSpeed = 850;
            const blinkEffect = (element) => {
                element.classList.toggle("blink");
            }
            
            event.target.classList.add("chosen");
            textSelector.textContent = `You select ${button.id.toUpperCase()} as your weapon`;
            textSelector.classList.add("select");
            
            blinkInterval = setInterval(() => blinkEffect(textSelector), blinkSpeed);

            textBlock.appendChild(textSelector);
        });
        
        button.addEventListener("mouseout", (event) => {
            clearInterval(blinkInterval);
            event.target.classList.remove("chosen");
            textSelector.remove();
        });
});


let tieCount = 0;
let playerWon = 0;
let playerLost = 0;

const validMove = ["rock", "paper", "scissors"];

function getComputerSelection () {
    return validMove[Math.floor(Math.random() * validMove.length)];
}

function getPlayerSelection() {
    let getPlayerSelection;
        if (getPlayerSelection === null) {
              return;
        }

    getPlayerSelection = prompt("Select your weapon!").toLowerCase();

        while (!(validMove.includes(getPlayerSelection))) {
            getPlayerSelection = prompt(`Ah, a surprising turn! You've chosen ${getPlayerSelection}, an unconventional option in our rock-paper-scissors arena. We honor tradition here with the classics. Kindly select a standard choice to continue the battle!`);
        };

    return getPlayerSelection;
}

function playRound (playerSelection, computerSelection) {

    if (playerSelection === computerSelection) {
        alert(`A most curious encounter! Thy ${playerSelection} clashes against the foe's ${computerSelection} — and lo, neither triumphs! Surely thou canst do better!`);
        return tieCount++;
    } else if (playerSelection === "rock" && computerSelection === "scissors") {
        alert("Thy mighty rock hath shattered yon puny scissors! A victory worthy of song, albeit a short one.");
        return playerWon++;
    } else if (playerSelection === "paper" && computerSelection === "rock") {
        alert("With cunning craft, thy paper doth smother the foe's rock! Verily, a victory most unexpected!");
        return playerWon++;
    } else if (playerSelection === "scissors" && computerSelection === "paper") {
        alert("Like a knight wielding a blade, thou hast cut down the foe's paper. Victory is thine!");
        return playerWon++;
    } else if (playerSelection === "rock" && computerSelection === "paper") {
        alert("Woe betide thee! The foe's treacherous parchment hath ensnared thy stalwart rock.");
        return playerLost++;
    } else if (playerSelection === "paper" && computerSelection === "scissors") {
        alert("Alas! Thy noble parchment hath been shredded by the foe's dastardly scissors. Tarry not in thy grief!");
        return playerLost++;
    } else if (playerSelection === "scissors" && computerSelection === "rock") {
        alert("Thy valiant shears stand no chance against the foe's boulder of doom. Persevere, brave knight!");
        return playerLost++;
    } else {
        alert("What sorcery is this? Thy choice defies comprehension! Mayhaps consult the rulebook next time.");
        return tieCount++;
    }
}

function playGame() { 
    
    for (let i = 0; i < 5; i++) {
        let computerSelection = getComputerSelection();
        let playerSelection = getPlayerSelection();
        playRound(playerSelection, computerSelection);
    }

    if (playerWon > playerLost) {
        alert("Huzzah! After five fierce bouts, thou hast bested the cunning contraption! Revel in thy triumph, brave knight!");
    } else if (playerWon < playerLost) {
        alert("Alack! The infernal machine hath claimed victory after five hard-fought rounds. Chin up, noble one, thy time shall come!");
    } else if (playerWon === playerLost && tieCount === 1) {
        alert("A true nail-biter! The contest ends in a tie—both combatants proving equally formidable. Prepare for a rematch, good knight!");
    } else if (tieCount === 5) {
        alert("Zounds! Five rounds, five ties. Is this a tournament or a dance of indecision? Sharpen thy wits for the next fray!");
    }
}

playGame();