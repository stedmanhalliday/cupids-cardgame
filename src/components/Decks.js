import React from "react";
import Deck from "./Deck.js";
import promptsLibrary from "../data/prompts.json";

let stackDecks = (promptsLibrary) => {
    let gameDecks = [];
    for (let n=0; n<5 && promptsLibrary.length; n++) {   //max 5 decks per game
        const i = Math.floor(Math.random()*promptsLibrary.length);   //random deck index
        const deck = promptsLibrary.splice(i, 1);    //pull random deck
        gameDecks.push({     //name deck in game decks
            "promptGroup": deck[0].promptGroup,
            "prompts": []
        });
        const hand = deck[0].prompts;   //get cards from random deck
        for (let m=0; m<7 && hand.length; m++) {    //max 7 cards per deck
            const j = Math.floor(Math.random()*hand.length);    //random card index
            const card = hand.splice(j, 1);     //pull random card
            gameDecks[gameDecks.length-1].prompts.push(card);   //insert random card into game deck
        }
    }
    return gameDecks;
}

let gameDecks = stackDecks(promptsLibrary);   //initialize game decks from card library

class Decks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gameDecks: gameDecks
        }
    }

    render() {
        return (
            <section className="Decks flex overflow-scroll w-full h-full items-center space-x-6 transition-all">
                <Deck flipCard={this.props.flipCard} promptGroup="Pleasure to meet you" />
                <Deck flipCard={this.props.flipCard} promptGroup="'Tis the season" />
                <Deck flipCard={this.props.flipCard} promptGroup="Art, music &amp; creativity" />
                <Deck flipCard={this.props.flipCard} promptGroup="Looking back" />
                <Deck flipCard={this.props.flipCard} promptGroup="Moving forward" />
            </section>
        );
    }
}

export default Decks;