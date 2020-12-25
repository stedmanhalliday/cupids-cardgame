function getGradient(gradients) {
    // select random gradient from data and build style string
    const swatch = gradients[Math.floor(Math.random() * gradients.length)];
    const deg = swatch.deg;
    let gradient = "";
    for (const stop of swatch.gradient) {
        gradient += stop.color + " " + stop.pos + "%, ";
    }
    gradient = gradient.substring(0, gradient.length - 2);
    const styleVal = "linear-gradient(" + deg + "deg, " + gradient + ")";
    return styleVal;
}

function stackDecks(data) {  //initialize game decks from prompt data
    const promptData = JSON.parse(JSON.stringify(data));
    let gameDecks = [];
    for (let n = 0; n < 5 && promptData.length; n++) {   //max 5 decks per game
        const i = Math.floor(Math.random() * promptData.length);   //random deck index
        const deck = promptData.splice(i, 1);    //pull random deck
        gameDecks.push({     //name deck in game decks
            "promptGroup": deck[0].promptGroup,
            "prompts": []
        });
        const hand = deck[0].prompts;   //get cards from random deck
        for (let m = 0; m < 7 && hand.length; m++) {    //max 7 cards per deck
            const j = Math.floor(Math.random() * hand.length);    //random card index
            const card = hand.splice(j, 1);     //pull random card
            gameDecks[gameDecks.length - 1].prompts.push(card[0]);   //insert random card into game deck
        }
    }
    return gameDecks;
}

export { getGradient, stackDecks };