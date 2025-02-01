const chosenMove = document.querySelectorAll(".moveSelector");
const textBlock = document.querySelector(".text-block");
const actionText = document.querySelector(".action-text");

const playerCounterScore = document.querySelector(".counter-player .score");
const tieCounterScore = document.querySelector(".counter-ties .score"); 
const enemyCounterScore = document.querySelector(".counter-enemy .score"); 

playerCounterScore.textContent = "0";
tieCounterScore.textContent = "0";
enemyCounterScore.textContent = "0";

//this part adds button effects
chosenMove.forEach((button) => {
    const textSelector = document.createElement("div");

        button.addEventListener("mouseover", (event) => {
            const blinkSpeed = 850;
            const blinkEffect = (element) => {
                element.classList.toggle("blink");
            }
            
            event.target.classList.add("chosen");
            textSelector.classList.add("select");

            textSelector.textContent = "";
            let buttonIdSpan = document.createElement("span");
            buttonIdSpan.textContent = `${button.id}`;
            textSelector.append("You select ");
            textSelector.append(buttonIdSpan);
            textSelector.append(" as your weapon");    
            
            blinkInterval = setInterval(() => blinkEffect(buttonIdSpan), blinkSpeed);

            textBlock.appendChild(textSelector);
        });
        
        button.addEventListener("mouseout", (event) => {
            clearInterval(blinkInterval);
            event.target.classList.remove("chosen");
            textSelector.remove();
        });
        });

const gameState = {
  tieCount: 0,
  playerWon: 0,
  playerLost: 0,
  playerChoice: null,
  enemyChoice: null,
};

const validMove = ["rock", "paper", "scissors"];
const seenLines = [] //we'll need to push the seen lines into this array to make sure that the player won't get repeat lines

function randomize (arr) {
    return arr[Math.floor(Math.random() * arr.length)]; //bread and butter of this entire project
}

function setupMoveSelection() {
    chosenMove.forEach((button) => {
        button.addEventListener("click", (event) => {
            gameState.playerChoice = event.currentTarget.getAttribute("id");
            gameState.enemyChoice = randomize(validMove);
            playMatch(gameState.playerChoice, gameState.enemyChoice); // Pass the selection to a function
        });
    });
}

function updateGameState(outcome, generate) {
    if (outcome === "tie") {
        gameState.tieCount++;
        tieCounterScore.textContent = gameState.tieCount;
    } else if (outcome === "win") {
        gameState.playerWon++;
        playerCounterScore.textContent = gameState.playerWon;
    } else if (outcome === "loss") {
        gameState.playerLost++;
        enemyCounterScore.textContent = gameState.playerLost;
    }

    actionText.textContent = generate;
    seenLines.push(generate);
}

const paperTies = [
"Ah, thou and the foe conjure spells in tandem, only to fizzle out before the fun begins. Mayhap practice makes perfect?",
"Two arcane sparks meet, only to leave both parties unsatisfied. One hopes thy next encounter yields more… fireworks.",
"A curious stalemate, where thy scrolls promise much but deliver little. Perhaps thou needs a firmer grip on thy incantations?",
"Matching spells, matching disappointment. Truly, thou dost tease but fail to enchant.",
"Oh, thou conjureth matching spells? How delightfully synchronized. Mayhap ye should hold hands next time.",
"Matching spells and naught but sparks? One wonders if thou art as underwhelming elsewhere.",
"Thy scroll and the foe’s fizzle in harmony—truly, a duet of disappointment.",
"Two arcane flops colliding. Perchance thou seeketh a better match for thy magic?"
];

const paperLoss = [ 
"The foe’s ruthless blades shred thy scroll to tatters. Next time, try not to be caught so exposed.",
"Swift steel rends thy parchment asunder. Perhaps thou ought to cover thy vulnerabilities more carefully?",
"Thy spell is cut down most decisively. Mayhap wielding a scroll leaves thee a bit... open.",
"Thy scroll lies in tatters, a cautionary tale for those too quick to reveal their magic.",
"Oh dear, thy scroll is torn to shreds! Perhaps thou should stick to simpler enchantments—like impressing tavern maids.",
"Thy spell fizzles under the foe’s blades. One hopes thou art not so easily cut down elsewhere.",
"A grim fate! Thy spell lies in tatters. One wonders if thy magical prowess is merely for show.",
"Curses! Thy parchment is no more. One hopes thou art less fragile in other pursuits."
];

const paperWin = [
"With a flourish of arcane mastery, thou dost unravel the foe’s defenses. One hopes thy prowess extends beyond mere scrollwork.",
"Thy enchanted parchment leaves the foe defenseless. A dazzling show—though perhaps thou enjoy putting others on their knees?",
"A spell well-cast! The foe is left speechless, likely wondering what else thou might conjure.",
"Thy sorcery overwhelms the foe. A triumph most magical—pray tell, do thou always leave such an impression?",
"Thy enchanted scroll leaves the foe exposed and trembling. One wonders if all thy performances leave others so vulnerable.",
"With but a flick of parchment, thou hath disarmed the foe. Perhaps thy foes should brace themselves better for such wizardry.",
"A spell well-cast! The foe falters, left in awe of thy commanding presence — though who could blame them?",
"Thy arcane prowess overwhelms the foe. One imagines thou art accustomed to leaving others speechless."
];

const scissorTies = [
"A frenzied clash of blades, yet neither strikes true. Perhaps thou wert distracted by the foe’s fancy footwork?",
"Blades flash and clang, but neither finds purchase. Perchance thou both prefer the chase to the conquest?",
"A storm of steel with naught to show for it. Were ye dueling or merely flirting?",
"Thy blades flurry in vain, like lovers unsure who should lead. A most curious dance indeed.",
"Blades flash, but neither lands a blow. One might think thou art trying to impress the foe instead.",
"A dazzling duel that ends in nothing. Perhaps thou art too busy admiring thy reflection on thy blade?",
"A storm of blades, and yet neither triumphs. Perchance thou enjoyeth these close encounters too much.",
"Thy blades dance without result. Mayhap thou art flirting rather than fighting?"
]

const scissorsLoss = [
"Thy nimble blades clang uselessly against the foe’s shield. Art thou compensating for something?",
"Thy swift strikes falter most pathetically. Perchance thou wert over-eager to impress?",
"Steel meets stone, and thou art left wanting. Perhaps slow and steady wins more than battles.",
"Thy blades bounce off the foe’s shield like nervous jests at a courtly feast. Practice, perchance?",
"Thy blades clang uselessly upon the foe’s shield. Perhaps thou enjoyeth this futile thrusting?",
"A valiant effort, but thy steel is repelled. One imagines thou art accustomed to premature retreats.",
"Thy frenzied strikes falter against the foe’s shield. Perchance thou wert too eager?",
"Thy blades falter before the foe's defense. One wonders if thou art always so easily disarmed."
];

const scissorsWin = [
"Thy blade flashes true, cutting down the foe's petty magic. Swift, sharp, and satisfying—one imagines thou art a favorite at court.",
"Like a lover scorned, thou dost shred the foe’s parchment with ruthless precision. A victory most cutting!",
"Thy nimble blades dance and slice with elegance. One wonders if thou art as deft in all pursuits.",
"A dazzling display of steel! The foe is left in tatters — mayhaps they’ll think twice before crossing thee again.",
"Thy blades dance with ruthless elegance, leaving the foe’s scroll in tatters. One imagines thou art as sharp with words as with steel.",
"With a wicked flourish, thou dost shred the foe’s parchment. Perhaps thou taketh pleasure in leaving others undone?",
"A dazzling display of steel! The foe is left scattered like confetti at a jester’s feast. Thou dost cut deeply indeed.",
"Thy blade carves through the foe’s parchment with ease. Perhaps thou art as cutting in thy courtly dealings?"
];

const rockTies = [
"Two unyielding shields press together with great vigor, yet neither breaks through. Methinks thou both enjoy the tension a bit too much.",
"A stalemate of sheer might—though one wonders if thy foe lingers for reasons beyond battle.",
"Thy shields lock in fruitless combat. Surely there’s more satisfying pursuits than grinding without gain?",
"Two mighty defenses grind together stubbornly. Were ye hoping for sparks?",
"Two stubborn shields grind together, but neither yields. One wonders if thou art always this difficult to move.",
"A clash of defenses, yet neither buckles. Perhaps thou dost enjoy this prolonged friction?",
"Thou lockest horns with the foe, but neither relents. A most stubborn dance, wouldn’t thou agree?",
"Two mighty defenses grind in vain. One imagines thou art no stranger to such drawn-out affairs."
];

const rockLoss = [
"Bewitched! Thy mighty shield crumbles beneath flimsy parchment. Looks like even the strongest have soft spots.",
"Crushed by parchment? Perhaps thy defenses aren’t as... firm as thou didst believe.",
"The foe’s parchment wraps around thy shield most decisively. A tender embrace, nay?",
"Thy shield undone by mere parchment. I’d wager thou weren’t expecting such a gentle touch.",
"Beware the foe's parchment! Thy shield is undone by mere paper. One hopes thou art not so easily swayed elsewhere.",
"Thy defense crumbles before arcane trickery. Perhaps thou should reconsider relying on brute strength alone.",
"Oh, thy mighty shield falls to parchment! Perchance thou art not as impregnable as thou thinkest.",
"Dark magics render thy defense moot. One imagines thou art not accustomed to being outwitted."
];

const rockWin = [
"Thy shield withstands the foe’s feeble onslaught. One imagines thou art accustomed to handling such desperate advances.",
"With unyielding resolve, thou dost weather the foe’s storm. A triumph of sheer fortitude — impressive, nay?",
"Thy defense holds firm, leaving the foe flustered and defeated. One wonders if thou often leaves others so breathless.",
"A mighty stance, noble knight! Thou hast bested the foe and stood tall — quite the impressive showing, I’d wager.",
"Thy defense holds firm, leaving the foe bewildered and bested. One wonders if thou art always this difficult to topple.",
"Like a mountain unyielding, thou withstands the foe’s paltry assault. One imagines thou art accustomed to being admired for thy strength.",
"The foe’s efforts crumble against thy steadfast shield. Verily, thy resolve is as impressive as it is impenetrable.",
"Thy defense stands resolute, leaving the foe flustered and defeated. One wonders how often thou leaves others so frustrated."
];

const finalVictory = [
"Huzzah! Thou hath bested the foe in five fierce bouts. Truly, thy mastery of sword, shield, and spell is unmatched—though one wonders if thou enjoy being admired so much.",
"Rejoice, noble champion! Thy triumph is the stuff of legends—and possibly tavern gossip.",
"A glorious victory! The bards shall sing of thy cunning and courage, though mayhap they’ll leave out the blushing admirers.",
"Thou hath conquered all! Thy deeds shall echo through the realm, though one suspects thy ego needs no help with that.",
"Huzzah! Thy triumph is undisputed, though one imagines thou art quite accustomed to basking in such admiration.",
"Rejoice, noble champion! Thy foes have fallen before thee—one wonders who shall fall next under thy spell.",
"A victory most glorious! Thy deeds shall be sung far and wide, though mayhap some verses shall be whispered in private.",
"Thou hath conquered all! Thy mastery is unmatched—though one suspects thou enjoyeth being told as much."
];

const finalDefeat = [
"Alack! Thy foe claims victory after five fierce rounds. Thy shield splintered, thy spells spent, thy blade dulled—yet I suspect thy spirit shall rise again (along with thy temper).",
"The foe hath triumphed, leaving thee humbled yet undaunted. Mayhap thou art used to bouncing back from such entanglements.",
"Defeated, but not broken! Thy valor remains intact — along with thy tendency to linger where thou art bested.",
"Though the foe stands victorious, thy spirit doth remain unyielding. Verily, thou art persistent if naught else.",
"Alack! Thy defeat is assured—but then, mayhap thou art accustomed to such humbling encounters.",
"The foe hath bested thee, leaving thy pride in tatters. One hopes thou art as graceful in defeat as in pursuit.",
"Thy shield is shattered, thy blade dulled — but despair not! One imagines thou art adept at bouncing back from such disappointments.",
"Defeat is thine, yet thy spirit remains unbroken. One wonders if thou art simply too stubborn to quit."
];

const finalTie = [
"A nail-biting contest! Neither thou nor the foe emerges victorious—though I suspect both of ye secretly enjoyed the back-and-forth.",
"Neither thy cunning nor the foe’s could tip the scales. Perhaps next time thou might charm fate itself?",
"A stalemate most curious! Mayhap thou both lingered a touch too long, unwilling to let the fray end.",
"Neither victorious nor defeated. One wonders if thou art simply prolonging the encounter for reasons best left unsaid.",
"A fierce contest ends in stalemate. One wonders if thou art simply prolonging the encounter for thine own amusement.",
"Neither victorious nor vanquished—mayhap thou enjoyeth keeping the foe in suspense?",
"A stalemate most curious! Perchance thou both enjoy dancing this close to victory without claiming it.",
"Neither side prevails, though one imagines both of ye savor the tension."
];

const finalAllTie = [
"Zounds! Five ties in a row? One might suspect thou and the foe art enjoying each other’s company a bit too much.",
"Five rounds, five ties! Mayhaps thou and the foe art perfectly matched — in more ways than one, methinks.",
"By the stars! Five ties? One imagines thou art either destined for each other or simply too stubborn to admit otherwise.",
"Five ties in a row? Surely fate weaves a tangled web for thee and thy foe. One wonders what else binds ye together.",
"Five ties? One might suspect thou and the foe enjoy these endless entanglements a touch too much.",
"Five ties in a row? Surely fate itself blushes at thy prolonged dance with the foe.",
"By the gods! Five ties? One wonders if thou art courting the foe instead of defeating them.",
"Five ties—surely this doth border on flirtation. Pray, sort out thy affections and claim victory next time."
];

const tieScenarios = {
    rock: rockTies,
    paper: paperTies,
    scissors: scissorTies
};

const outcomeScenarios = {
    rock: { 
        paper: { type: "loss", message: rockLoss }, 
        scissors: { type: "win", message: rockWin },
    },
    paper: { 
        scissors: { type: "loss", message: paperLoss }, 
        rock: { type: "win", message: paperWin } 
    },
    scissors: { 
        rock: { type: "loss", message: scissorsLoss }, 
        paper: { type: "win", message: scissorsWin }  
    }
}

function playMatch(playerChoice, enemyChoice) {
    actionText.textContent = "";
    let generate = "";
    if (seenLines.includes(generate)) {
        playMatch(playerChoice, enemyChoice);
    }

    //ties are handled here
        if (playerChoice === enemyChoice) {
            generate = randomize(tieScenarios[playerChoice]);
            updateGameState("tie", generate)
    } 
    
    //all other scenarios are handled here
        else if (playerChoice !== enemyChoice) {
            const outcome = outcomeScenarios[playerChoice][enemyChoice];
            if (outcome.type === "win") {
                generate = randomize(outcome.message);
                updateGameState("win", generate);
            } else {
                generate = randomize(outcome.message);
                updateGameState("loss", generate);
            }

    }
    //catch-all if something breaks in this logic
    else if (playerWon === playerLost === tieCount === 0) {
        actionText.textContent = "Milord! Thy contraption hath broken";
        } else {
            actionText.textContent = "";
        }
};
setupMoveSelection();
playMatch(); 

