const chosenMove = document.querySelectorAll(".moveSelector");
const textBlock = document.querySelector(".text-block")

//this part adds button functionality and effects
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

// function getPlayerSelection() { -> since there' no prompt now, this part is no longer needed. will keep it for reference for now
//     let getPlayerSelection;
//         if (getPlayerSelection === null) {
//               return;
//         }

//     getPlayerSelection = prompt("Select your weapon!").toLowerCase();

//         while (!(validMove.includes(getPlayerSelection))) {
//             getPlayerSelection = prompt(`Ah, a surprising turn! You've chosen ${getPlayerSelection}, an unconventional option in our rock-paper-scissors arena. We honor tradition here with the classics. Kindly select a standard choice to continue the battle!`);
//         };

//     return getPlayerSelection;
// }


const paperTies = [
"A clash of spells! Thou and the foe conjure matching incantations, leaving naught but swirling winds of indecision.",
"Arcane energies collide and dissipate, leaving both combatants unharmed. The scrolls remain unread.",
"A scholarly standstill! Thy scroll meets the foe's, and both spells fizzle into harmless sparks.",
"Parchments flutter as thy spell mirrors the foe's, neither gaining the upper hand. A curious impasse."
];

const rockTies = [
"Two unyielding shields collide with a thunderous crash, yet neither doth falter. A stalemate of sheer might!",
"Thy steadfast defense meets the foe’s granite resolve—neither yielding ground. The earth itself trembles!",
"Two immovable bulwarks grind against each other, neither crumbling. A contest of sheer fortitude!",
"Two titanic defenses lock in a contest of immobility, neither giving an inch. Verily, a stubborn draw!"
];

const scissorTies = [
"Blades flash and parry in a dazzling dance, neither finding purchase. A duel too swift for mere mortals to judge.",
"A furious clanging of blades echoes through the field, but neither strikes true. A draw most skillful!",
"A storm of blades clashes in vain—both thou and the foe art equally nimble, yet neither victorious.",
"Blades flash and flicker, yet neither strikes true. A masterclass in defense and aggression alike!"
]

const paperLoss = [
"Alas! Thy enchanted scroll is shredded to tatters by the foe's swift and ruthless blades. Magic undone, yet thy courage endures!",
"Alack! The foe's blades carve through thy precious spellwork. Perhaps next time, the arcane winds shall favor thee.",
"A grim fate! Thy spell is cut short by the foe's relentless steel. Take heart, valiant mage.",
"Curses! The foe’s blades shred thy mystical scroll. Recover thy strength and press onward."
];

const paperWin = [
"With a flourish of arcane might, thou overcomes the foe’s futile defense. A glorious victory wrought by spellcraft and cunning!",
"Thy arcane scroll glows with triumph as it unravels the foe's futile defenses. Let magic reign supreme!",
"The ancient arts prevail! Thy enchanted scroll renders the foe's defenses utterly moot. A splendid victory!",
"Thy spellcraft proves superior, reducing the foe's defenses to mere rubble. A victory well-earned!"
];

const scissorsLoss = [
"Like a frenzied fencer, thou slashes at the foe’s stalwart defense, but thy blades clang uselessly upon the impregnable shield. Withdraw and rethink thy approach, valiant knight!",
"Thy swift blades strike true, but alas, they clang uselessly upon the foe's unyielding shield. Time to rethink thy tactics, nimble one.",
"Thy nimble blades strike with fury, but the foe's sturdy defense remains unbroken. Frustrating, nay?",
"Thy blades meet the foe’s unyielding shield and falter. Steel alone shall not prevail this day."
];

const scissorsWin = [
"Thy swift blades cut cleanly through the sorcerer's parchment! A dazzling triumph worthy of song, if only the scribes cared for such skirmishes.",
"Like a whirlwind of steel, thou dost shred the foe’s parchment spell. The arcane shall tremble at thy blade!",
"Swift and decisive, thy blades make confetti of the foe's parchment. Victory by a thousand cuts!",
"A flourish of steel, and the foe’s parchment is no more. A swift and decisive victory!"
];

const rockLoss = [

];

const rockWin = [

];


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