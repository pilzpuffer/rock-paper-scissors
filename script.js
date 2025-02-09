const body = document.querySelector("body");
const chosenMove = document.querySelectorAll(".moveSelector");
const textBlock = document.querySelector(".text-block");
const action = document.querySelector("action");
const actionText = document.querySelector(".action-text");
const actionButton = document.querySelector(".action-button");
const bottomPart = document.querySelector(".bottom-part");
const middleBlock = document.querySelector(".middle-block");
const talkingBlock = document.querySelector(".talking-block");

const mainTheme = document.querySelector(".main-theme");
const fontButton = document.querySelector(".font");
const musicButton = document.querySelector(".music");

const playerCounterScore = document.querySelector(".counter-player .score");
const tieCounterScore = document.querySelector(".counter-ties .score"); 
const enemyCounterScore = document.querySelector(".counter-enemy .score"); 

playerCounterScore.textContent = "0";
tieCounterScore.textContent = "0";
enemyCounterScore.textContent = "0";
actionButton.hidden = true;

actionText.textContent = "Salutations, valiant knight! Strike yonder buttons sixfold to earn thy place in this grand contest. Beneath thee, loyal servants stand prepared to fulfill thy every whim. And should the mood strike, spare a glance at the knights — they may surprise thee with wit and wisdom as the tournament unfolds.";

//this part adds button effects
const textSelector = document.createElement("div");

function handleMouseOver(event) {
    const button = event.currentTarget; // Get the button that triggered the event
    const blinkSpeed = 850;
    const blinkEffect = (element) => {
        element.classList.toggle("blink");
    };

    button.classList.add("chosen");
    textSelector.classList.add("select");

    textSelector.textContent = "";
    let buttonIdSpan = document.createElement("span");
    buttonIdSpan.textContent = `${button.id}`;
    textSelector.append("You select ");
    textSelector.append(buttonIdSpan);
    textSelector.append(" as your weapon");

    blinkInterval = setInterval(() => blinkEffect(buttonIdSpan), blinkSpeed);

    textBlock.appendChild(textSelector);
}

function handleMouseOut(event) {
    clearInterval(blinkInterval);
    event.currentTarget.classList.remove("chosen");
    textSelector.remove();
}

chosenMove.forEach((button) => {
    button.disabled = false;
    button.addEventListener("mouseover", handleMouseOver);
    button.addEventListener("mouseout", handleMouseOut);
    textSelector.textContent = "";
});

const gameState = {
  tieCount: 0,
  playerWon: 0,
  playerLost: 0,
  playerChoice: null,
  enemyChoice: null,
  matchesPlayed: 0,
  tournamentsPlayed: 0,
  tournamentOutcome: null
};

const validMove = ["rock", "paper", "scissors"];
let seenLines = [] //we'll need to push the seen lines into this array to make sure that the player won't get repeat lines

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
        gameState.matchesPlayed++;
        tieCounterScore.textContent = gameState.tieCount;
    } else if (outcome === "win") {
        gameState.playerWon++;
        gameState.matchesPlayed++;
        playerCounterScore.textContent = gameState.playerWon;
    } else if (outcome === "loss") {
        gameState.playerLost++;
        gameState.matchesPlayed++;
        enemyCounterScore.textContent = gameState.playerLost;
    }

    actionText.textContent = generate;
    seenLines.push(generate);
}
// match resolutions
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

//tournament resolutions
const finalVictory = [
"Huzzah! Thou hath bested the foe in five fierce bouts. Thy mastery is unmatched — though one wonders if thou enjoy being admired so much.",
"Rejoice, noble champion! Thy triumph is the stuff of legends—and possibly tavern gossip.",
"A glorious victory! The bards shall sing of thy cunning and courage, though mayhap they’ll leave out the blushing admirers.",
"Thou hath conquered all! Thy deeds shall echo through the realm, though one suspects thy ego needs no help with that.",
"Huzzah! Thy triumph is undisputed, though one imagines thou art quite accustomed to basking in such admiration.",
"Rejoice, noble champion! Thy foes have fallen before thee—one wonders who shall fall next under thy spell.",
"A victory most glorious! Thy deeds shall be sung far and wide, though mayhap some verses shall be whispered in private.",
"Thou hath conquered all! Thy mastery is unmatched—though one suspects thou enjoyeth being told as much."
];

const finalDefeat = [
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



//icon lines - mage
const mageHover = [
"An incantation for readability awaits thy click.",
"Click henceforth for a script gentler on thine eyes.",
"A single touch shall unveil a font most considerate.",
"Desire clearer parchment? A mere click shall conjure it."
];

const mageHoverLots = [
"Hovering like a moth to a flame, eh? What dost thou seek?",
"Be ye casting a spell upon me, or merely testing mine patience?",
"Ah, a scholar of hovering arts, I see.",
"If thou seeketh answers, speak plainly, not with thy timid dance!"
];

const mageClick = [
"By the stars, clarity cometh!",
"The runes align for thy comfort.",
"Magic hath sharpened thy sight!"
];

const mageUnClick = [
"Thy scroll once more wears its regal attire.",
"The arcane whispers return.",
"The ancient script reigns once more."
];

const mageClickLots = [
"Back again? Dost thou think I’m a common scribe for thy whims?",
"By the stars! Do ye take joy in tormenting this poor mage?",
"Art thou conducting some experiment on mine patience?",
"This hath become a farce most tiresome — yet here I am!"
];

const mageUnClickLots = [
"And off it goes again! Hast thou nothing better to do with my magic?",
"Hmph. Toggle it one more time, and I’ll conjure thee a headache!",
"Oh, verily — this is the fifth time today. What next, invisible ink?",
"A dance betwixt fonts? Mayhap I should charge admission."
];


//icon lines - jester
const jesterHover = [
"Fancy a tune? Click, and I shall jig merrily!",
"Let the revelry begin — if thou darest click.",
"Silence or serenade? A single click decides!",
"Click me flute, and I shall prance with glee!"
];

const jesterHoverLots = [
"A fleeting glance, then gone again — oh, how mysterious!",
"Oh! Back so soon? Thou art a most curious audience!",
"Ah, thou teases me! Come now, I’m but a humble jester!",
"Flitting about like a merry sprite — dost thou wish to dance?"
];

const jesterClick = [
"A jaunty jig cometh forth! Dance if ye dare, milord!",
"I prance and pipe in thy honor!",
"Music fills the air — let mirth abound!",
"The revels commence — tap thy toes!"
];

const jesterUnClick = [
"Hark, silence descends — nay flute, nay frolic.",
"Very well, I shall rest my flute... though it weeps without melody.",
"If that’s your wish, I’ll stow my songs... but the air feels hollow now.",
"No music? My heart breaks like a lute string."
];

const jesterClickLots = [
"Thou can’t resist my melodies, can thee? Let’s play on!",
"Flip that switch a thousand times — I shall serenade thee still!",
"On, off, on, off — just say the word, friend, and I shall play!",
"Again we sing! Thy whims keep me spry and ever ready!",
];

const jesterUnClickLots = [
"Another silence? Surely, thou takest delight in my heartbreak!",
"Oh woe, the silence returns! Thou dost torment me for sport!",
"Ah, the music fades again! I shall mourn… until thy next whim!",
"A sad jester am I, toggled like a mere bell-pull."
];


//knight lines

//left knight lines
//head lines
const leftKnightHeadBefore = [
"What is it? You admire my rugged looks, eh? Thought not.",
"What, never seen a handsome devil before?",
"Look all you want, but I ain’t signing autographs.",
"Trying to guess my hat size? Mind your own business.",
"Gawking at me won't win you the tournament."
];

const leftKnightHeadDuring = [
"Thinking too hard? I wouldn't recommend it.",
"Staring hard enough to bore a hole, are we?",
"Careful now, thinking can be dangerous.",
"I can feel your thoughts bouncing off my skull."
];

const leftKnightHeadAfterVictory = [
"Well, I'll be—miracles do happen. Victory's yours, champ.",
"Miracles don’t come cheap, but you cashed in today.",
"Victory suits you. Barely.",
"Guess that wasn’t dumb luck after all."
];

const leftKnightHeadAfterTie = [
"A tie? What an exciting waste of time.",
"A tie? Thrilling. Shall we hold hands and skip off into the sunset?",
"This tie's about as satisfying as cold porridge.",
"Well, that was a magnificent waste of effort."
];

const leftKnightHeadAfterDefeat = [
"Ha! I saw that coming from a mile away.",
"Should’ve stuck to knitting.",
"I’d say ‘better luck next time,’ but who are we kidding?",
"Defeat suits you. Wear it proudly.",
"I’d offer advice, but I enjoy watching you fail.",
"You fumbled harder than a jester on stilts.",
"Next time, maybe try swinging your weapon upright.",
"A loss well-earned. Bravo, truly."
];

//arm lines
const leftKnightArmsBefore = [
"Touch the arm, eh? Hoping some strength will rub off? Fat chance.",
"Touch all you like; strength ain’t contagious.",
"What, expecting a flex? Dream on."
];

const leftKnightArmsDuring = [
"A fine arm for swinging... but it's mine, not yours.",
"Careful, you might sprain your imagination.",
"Careful now — don’t get too attached to this fine arm.",
"That’s close enough unless you're proposing.",
"Easy there, it’s not a handshake competition."
];

const leftKnightArmsAfterVictory = [
 "Guess that arm of yours isn’t entirely useless.",
 "Well, well, you actually used those arms for something useful.",
 "Miracles do happen. Guess that arm of yours isn't just for decoration.",
 "Managed to swing straight, eh? Good for you.",
 "Well, well, looks like you can put those arms to work.",
 "Victory thanks to those noodles you call arms. Remarkable.",
 "Guess brute force occasionally works, even for you."
];

const leftKnightArmsAfterTie = [
"A draw? Riveting stuff. Absolutely riveting.",
"At least our arms are well-rested from all the nothing.",
"Call it balanced, call it boring. Same thing, really.",
"At least neither of us embarrassed ourselves. This time.",
"Neither win nor loss — a true testament to mediocrity."
];

const leftKnightArmsAfterDefeat = [
"Maybe practice swinging that arm of yours... someday.",
"Maybe use those arms for waving a white flag next time.",
"Flailing isn’t a strategy, but hey, you tried.",
"Better luck next lifetime, champ."
];

//groin lines
const leftKnightGroinBefore = [
"Oi! This isn’t that kind of tournament!",
"Personal space, ever heard of it?",
"Touch me there again, and we’re dueling.",
"Oi! Hands off the goods, thank you.",
"Bold move — unwise, but bold.",
"I think you're reaching for the wrong kind of sword"
];

const leftKnightGroinDuring = [
"Still?! You're bold, I'll give you that.",
"Persistent, aren’t you? Annoyingly so.",
"You’ve got nerve, I’ll give you that.",
"Look, I’m flattered, but this is getting weird.",
"Still at it? You’ve got guts, I’ll give you that."
];

const leftKnightGroinAfterVictory = [
"Whatever works, I guess. Not judging.",
"Victory and scandal in one — you're a real overachiever.",
"Is that your lucky charm, or are do you just like me that much?",
"Well, well, aren’t we daring today?",
"Well, you certainly made an impression... down there.",
"Your strategy is questionable, but effective."
];

const leftKnightGroinAfterTie = [
"A tie? About as satisfying as this jab. Wonderful.",
"Next time, dinner first, perhaps?",
"Neither of us comes out a champion, but you sure made it memorable.",
"Stalemate? At least you're consistent with poor decisions.",
"If this was a strategy, I’d love to hear the explanation.",
"Next time, let's skip the jabs and go straight for the drinks."
];

const leftKnightGroinAfterDefeat = [
"If misery loves company, my groin's feeling awfully friendly.",
"Next time, maybe aim higher — metaphorically.",
"Defeat stings, but you seem to enjoy it.",
"If you're trying to distract me, it's working.",
"That’s one way to soften the blow of losing.",
"Well, you certainly had fun, didn’t you?"
];

//legs lines
const leftKnightLegsBefore = [
"Legs of steel, these. Don't need your approval, though.",
"Yep, still got two of 'em.",
"Planning on writing a poem about my calves?",
"These legs are made for marching, not gawking."
];

const leftKnightLegsDuring = [
"Marching to victory — or disgrace. Who knows?",
"One foot in front of the other... barely."
];

const leftKnightLegsAfterVictory = [
"Stepping up in the world, eh? Well done.",
"Looks like we actually got somewhere. Shocking.",
"Well, I’ll be — victory’s within our stride.",
"Stepped up and didn’t trip. Huzzah."
];

const leftKnightLegsAfterTie = [
"Standing still, going nowhere. Sounds about right.",
"Treading water, but on land.",
"What a graceful display of going nowhere.",
"Standing still never looked so pointless.",
"Legwork without results. Thrilling.",
"Neither advancing nor retreating. Perfect limbo."
];

const leftKnightLegsAfterDefeat = [
"Tripped at the finish line, did we? Happens to the best.",
"Flat on our backs, huh? Typical.",
"Better luck next time, assuming you can stand.",
"Try walking upright next time.",
"Fell flat, eh? Hope the ground was comfy.",
"Well, that was a graceful tumble.",
"Better luck next time — if you can get up, that is.",
"On the bright side, falling builds character."
];


//right knight lines
//head lines
const rightKnightHeadBefore = [
"Ah, you honor me, good traveler... oh, did I bow too low? I may have strained my neck.",
"Ah, my good traveler, you've caught me daydreaming again.",
"My helm may gleam, but does it inspire courage?",
"You honor me with your attention, though I blush beneath this helm."
];

const rightKnightHeadDuring = [
"The tension mounts. Do you think my helm looks crooked?",
"Steady now, my focus wavers under such scrutiny.",
"Does my helm glint too brightly for your eyes?",
"I shall endeavor to stay composed under your gaze."
];

const rightKnightHeadAfterVictory = [
"Victory! By your valor, we stand triumphant! Forgive me, I may need to sit — my head spins with pride.",
"A triumph worthy of song! Though perhaps a quiet one...",
"Victory fills my heart, though modesty bids me hide it.",
"Huzzah! Erm... was that too loud?"
];

const rightKnightHeadAfterTie = [
"A draw, as balanced as the scales of fate.",
"A balance, as fate decrees. Perhaps a sign of harmony?",
"A tie — neither triumph nor defeat, yet noble all the same.",
"We stand on equal footing with our noble adversary."
];

const rightKnightHeadAfterDefeat = [
"A humbling defeat... but every noble heart learns from adversity.",
"Defeat humbles us, but we rise stronger, do we not?",
"Every knight must taste defeat to grow wiser.",
"I bow to our better. Next time, courage shall not falter."
];

//arm lines
const rightKnightArmsBefore = [
"A sturdy arm, I hope... though I wouldn’t boast.",
"Prepared to defend, though perhaps a bit tremulous.",
"May this arm serve honorably, though I remain humble.",
"I lend my strength to your cause, such as it is.",
"A steady arm, if not a remarkable one."
];

const rightKnightArmsDuring = [
"I lend thee my resolve, such as it is.",
"Steady now, strength lies in resolve.",
"A firm grip, though trembling slightly..."
];

const rightKnightArmsAfterVictory = [
"We triumphed! A toast to teamwork... perhaps with juice?",
"Glory through valor! My arm feels lighter now.",
"We triumphed, though I must thank fate as well as strength.",
"Glory is ours! I shall cherish this moment quietly, of course.",
"We prevailed! I must confess, my arm did not tremble this time.",
"Glory be! Though I must credit your valor more than my arm.",
"Our combined strength brought us triumph!"
];

const rightKnightArmsAfterTie = [
"A contest most evenly matched! Erm... a handshake, perhaps?",
"An even match! Shall we clasp hands in respect?",
"Neither forward nor backward, yet we remain steadfast.",
"A noble contest, if inconclusive."
];

const rightKnightArmsAfterDefeat = [
"Next time, I shall lend even firmer resolve... or at least, a steadier grip.",
"Defeat only steels my resolve.",
"We faltered, but honor remains."
];

//groin lines
const rightKnightGroinBefore = [
"I... um... surely that was unintended? We shan't speak of this.", //add blush effect
"Ahem! That’s quite forward, milord!",
"I... um... can we pretend that didn’t happen?"
];

const rightKnightGroinDuring = [
"In the heat of battle, decorum remains... mostly... intact.", //add blush
"Ahem, that’s a rather bold maneuver.",
"In battle, all focus must remain pure..."
];

const rightKnightGroinAfterVictory = [
"Ahem... Even such moments can lead to triumph, I suppose.",
"We stand victorious, despite certain... awkward tactics.",
"Um... huzzah? Let’s pretend this never happened.",
"Triumph, even in moments best left unspoken.",
"Well... I suppose all is fair in love and tournaments?",
"Victory is sweet, though embarrassment lingers.",
"Triumph, though I shall blush for days.",
"Ahem... Victory, despite the rather unconventional tactics."
];

const rightKnightGroinAfterTie = [
"Ahem... Let’s not dwell on how near that was.",
"Well, that was... memorable.",
"A tie, close in more ways than one.",
"We remain even, though dignity wavers.",
"A draw, though I shall remember this for... reasons.",
"Neither triumph nor defeat, but plenty of blushes."
];

const rightKnightGroinAfterDefeat = [
"Defeat is not the only embarrassment today, alas.", //blush
"A double loss, both in combat and decorum.",
"Ahem... I shall endure this indignity with grace.",
"Embarrassment and defeat — a humbling day indeed.",
"Ah... we lost, and dignity suffers still.",
"Defeat is humbling, as is this entire situation.",
"Defeat stings, but perhaps not as much as this moment."
];

//legs lines
const rightKnightLegsBefore = [
"Steady legs, though my knees may knock under scrutiny.",
"Prepared to march forth, though my step may falter."
];

const rightKnightLegsDuring = [
"Ready to march forth, though my gait may falter under such pressure.",
"A valiant stride, though wobbly under such pressure.",
"I march with purpose, though nerves weigh heavy.",
"Each step taken with honor, if not confidence."
];

const rightKnightLegsAfterVictory = [
"Victory lifts even the heaviest step!",
"Steady strides led us to triumph! Onward!",
"Our legs carried us well today, noble champion."
];

const rightKnightLegsAfterTie = [
"We held steady, neither advancing nor retreating.",
"We held our ground, neither retreating nor advancing.",
"A noble stalemate, steadfast and true.",
"No step forward, yet no ground lost."
];

const rightKnightLegsAfterDefeat = [
"Our steps faltered, but we shall rise anew.",
"Defeat is heavy, but I shall march on.",
"A stumble today, but tomorrow holds steadier ground."
];


const knightLines = {
    left: {
        before: {
            head: leftKnightHeadBefore,
            arms: leftKnightArmsBefore,
            groin: leftKnightGroinBefore,
            legs: leftKnightLegsBefore
        },
        during: {
            head: leftKnightHeadDuring,
            arms: leftKnightArmsDuring,
            groin: leftKnightGroinDuring,
            legs: leftKnightLegsDuring
        },
        afterVictory: {
            head: leftKnightHeadAfterVictory,
            arms: leftKnightArmsAfterVictory,
            groin: leftKnightGroinAfterVictory,
            legs: leftKnightLegsAfterVictory
        },
        afterTie: {
            head: leftKnightHeadAfterTie,
            arms: leftKnightArmsAfterTie,
            groin: leftKnightGroinAfterTie,
            legs: leftKnightLegsAfterTie
        },
        afterDefeat: {
            head: leftKnightHeadAfterDefeat,
            arms: leftKnightArmsAfterDefeat,
            groin: leftKnightGroinAfterDefeat,
            legs: leftKnightLegsAfterDefeat
        }
    },
    right: {
        before: {
            head: rightKnightHeadBefore,
            arms: rightKnightArmsBefore,
            groin: rightKnightGroinBefore,
            legs: rightKnightLegsBefore
        },
        during: {
            head: rightKnightHeadDuring,
            arms: rightKnightArmsDuring,
            groin: rightKnightGroinDuring,
            legs: rightKnightLegsDuring
        },
        afterVictory: {
            head: rightKnightHeadAfterVictory,
            arms: rightKnightArmsAfterVictory,
            groin: rightKnightGroinAfterVictory,
            legs: rightKnightLegsAfterVictory
        },
        afterTie: {
            head: rightKnightHeadAfterTie,
            arms: rightKnightArmsAfterTie,
            groin: rightKnightGroinAfterTie,
            legs: rightKnightLegsAfterTie
        },
        afterDefeat: {
            head: rightKnightHeadAfterDefeat,
            arms: rightKnightArmsAfterDefeat,
            groin: rightKnightGroinAfterDefeat,
            legs: rightKnightLegsAfterDefeat
        }
    }
}

const iconSpokenLines = {
    mage: { 
        hover: mageHover,
        click: mageClick,
        unclick: mageUnClick 
    },

    mageLots: { 
        hover: mageHoverLots,
        click: mageClickLots,
        unclick: mageUnClickLots
    },

    jester: { 
        hover: jesterHover,
        click: jesterClick,
        unclick: jesterUnClick
    },

    jesterLots: { 
        hover: jesterHoverLots,
        click: jesterClickLots,
        unclick: jesterUnClickLots
    }
}



const iconTalking = document.createElement("div");
let timeouts = [];
let shownLine = "";
let jesterClickCounter = 0;
let jesterHoverCounter = 0;
let mageClickCounter = 0;
let mageHoverCounter = 0;
let attempts = 0;

function clearUpTimeouts () {
    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
}

function talk(selectedLine, parameter) {
    const lotsThreshholds = { click: 2, unclick: 2, hover: 2 };

    const counters = {
        jester: { click: jesterClickCounter, unclick: jesterClickCounter, hover: jesterHoverCounter },
        mage: { click: mageClickCounter, unclick: mageClickCounter, hover: mageHoverCounter }
    }

    const category = counters[selectedLine][parameter] > lotsThreshholds[parameter] ? `${selectedLine}Lots` : selectedLine;
    shownLine = randomize(iconSpokenLines[category][parameter]);
    iconTalking.textContent = shownLine;


    iconTalking.classList.toggle("blue", selectedLine === "mage");
    iconTalking.classList.toggle("red", selectedLine !== "mage");


    talkingBlock.appendChild(iconTalking);

    clearUpTimeouts();
    timeouts.push(setTimeout(function() {
        iconTalking.remove();
        iconTalking.classList.remove("blue", "red");
    }, 3500));
}

function shutUp() {
    iconTalking.remove();
    iconTalking.classList.remove("blue", "red");
    clearUpTimeouts();
}

//initially, I've planned to add more sound effects, but as of now, just the main theme seems to be sufficient enough

musicButton.addEventListener("click", () => {
    jesterClickCounter++;
    mainTheme.volume = 0.1;
    mainTheme.play();
    talk("jester", "click");

    if (jesterClickCounter % 2 === 0) {
        mainTheme.pause();
        mainTheme.currentTime = 0;
        talk("jester", "unclick");
    }
});

musicButton.addEventListener("mouseover", () => {
    jesterHoverCounter++;
    talk("jester", "hover");
});

musicButton.addEventListener("mouseout", () => {
    shutUp();
});

//font button functionality is meant to change the font to one that is still thematic, but more readable
fontButton.addEventListener("click", () => {
    mageClickCounter++;
    body.classList.toggle("fontReadable");

    if (mageClickCounter % 2 === 0) { //re-enables the default font
        document.documentElement.style.setProperty('--title-size', '4.5vw');
        document.documentElement.style.setProperty('--action-title-size', '3.5vw');
        document.documentElement.style.setProperty('--action-text-size', '1.8vw');
        document.documentElement.style.setProperty('--action-text-button', '2vw');
        document.documentElement.style.setProperty('--score-size', '5vw');
        document.documentElement.style.setProperty('--name-size', '4vw');
        document.documentElement.style.setProperty('--select-size', '2.5vw');
        document.documentElement.style.setProperty('--talking-block-size', '2vw');
        document.documentElement.style.setProperty('--talking-bubble-size', '1.8vw');
        talk("mage", "unclick");
    } else { //sets the alternative font
            document.documentElement.style.setProperty('--title-size', '3.8vw');
            document.documentElement.style.setProperty('--action-title-size', '3vw');
            document.documentElement.style.setProperty('--action-text-size', '1.5vw');
            document.documentElement.style.setProperty('--action-text-button', '1.5vw');
            document.documentElement.style.setProperty('--score-size', '4.5vw');
            document.documentElement.style.setProperty('--name-size', '3vw');
            document.documentElement.style.setProperty('--select-size', '2vw');
            document.documentElement.style.setProperty('--talking-block-size', '1.5vw');
            document.documentElement.style.setProperty('--talking-bubble-size', '1.5vw');
            talk("mage", "click");
        }
    });

fontButton.addEventListener("mouseover", () => {
    mageHoverCounter++;
    talk("mage", "hover");  
});

fontButton.addEventListener("mouseout", () => {
    shutUp();
});

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

let tournamentActive = false;
let finalLine = "";
let final = document.createElement("div");
final.textContent = ""

function tournamentHelper(outcome, end) {
    finalLine = randomize(outcome); 
    actionText.textContent = finalLine;
    final.classList.add("action-title");
    final.textContent = end;

    textBlock.appendChild(final);
}


function tournamentFinal() {
    actionButton.hidden = false;
    tournamentActive = true;
    textSelector.remove();
    tournamentsPlayed++;
    
    chosenMove.forEach((button) => {
        button.classList.add('disabled'); // Add a 'disabled' class to prevent interaction
        button.classList.remove("chosen")
        button.removeEventListener("mouseover", handleMouseOver);
        button.removeEventListener("mouseout", handleMouseOut);
    });

    if (gameState.playerWon > gameState.playerLost) {
        tournamentHelper(finalVictory, "Victory!");
        gameState.tournamentOutcome = "Victory";
    } else if (gameState.playerWon < gameState.playerLost) {
        tournamentHelper(finalDefeat, "Defeat...");
        gameState.tournamentOutcome = "Defeat";
    } else if (gameState.playerWon === gameState.playerLost) {
        tournamentHelper(finalTie, "Tie");
        gameState.tournamentOutcome = "Tie";
    } else if (gameState.tieCount === 5) {
        tournamentHelper(finalAllTie, "Tie?");
        gameState.tournamentOutcome = "Tie";
    } else {
        actionText.textContent = "Milord! Thy contraption hath broken";
    }
}

function reenable() {
    final.remove();
    tournamentActive = false;

    // Remove the 'disabled' class and re-enable events
    chosenMove.forEach((button) => {
        button.classList.remove('disabled');
        button.addEventListener("mouseover", handleMouseOver);
        button.addEventListener("mouseout", handleMouseOut);
    });
}


function playMatch(playerChoice, enemyChoice) {
    let generate;

    if (gameState.matchesPlayed === 5) {
        tournamentFinal();
        return;
    }

    if (seenLines.includes(generate)) {
        playMatch(playerChoice, enemyChoice);
    }

    if (seenLines.length === 8) {
        seenLines = [];
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
    }
};

setupMoveSelection();

actionButton.addEventListener("click", () => {
    reenable();

    gameState.tieCount = 0;
    gameState.playerWon = 0;
    gameState.playerLost = 0;
    gameState.matchesPlayed = 0;
    gameState.tournamentOutcome = null;

    tieCounterScore.textContent = gameState.tieCount;
    playerCounterScore.textContent = gameState.playerWon;
    enemyCounterScore.textContent = gameState.playerLost;

    actionText.textContent = "";

    actionButton.hidden = true;
});

const rightKnightButtons = document.querySelectorAll(".right-knight-buttons button");
const leftKnightButtons = document.querySelectorAll(".left-knight-buttons button");
const rightKnightBubble = document.querySelector(".right-knight-bubble");
const leftKnightBubble = document.querySelector(".left-knight-bubble");

function squire (placement, part) {
    let time;

    if (gameState.matchesPlayed === 0) {
        time = "before"; 
    } else {
        time = tournamentActive ? `after${gameState.tournamentOutcome}` : "during";
    }

    spokenLine = randomize(knightLines[placement][time][part]);
    const knightBubble = placement === "right" ? rightKnightBubble : leftKnightBubble;
    knightBubble.textContent = spokenLine;

    clearUpTimeouts();
    timeouts.push(setTimeout(function() {
        knightBubble.textContent = "";
    }, 4000))

}

function parting (event) {
    const partId = event.currentTarget.getAttribute("id");
    const part = partId.split("-")[1];
    return part;
}

rightKnightButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        squire("right", parting(event));
});
      });


leftKnightButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        squire("left", parting(event));
}); 
      });

